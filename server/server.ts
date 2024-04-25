import express from 'express';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'
import { sign } from 'jsonwebtoken';
import session from 'express-session';
import cors from 'cors';
import multer from 'multer';
import path from 'path';

dotenv.config();

const app = express();
const port = 3333;

const db = new PrismaClient();

const saltRounds = 10;

// ========
// Passport
// ========
declare global {
	namespace Express {
		interface User {
			id: string
		}
	}
}

passport.serializeUser((user: any, done) => {
	done(null, user.id);
});
passport.deserializeUser(async (id: string, done) => {
	const user = await db.user.findUnique({
		where: { id },
		include: {
			comments: true,
			likes: true,
			posts: true,
			_count: true,
		},
	});

	done(null, user);
});
passport.use(new JwtStrategy({
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET!,
}, async (jwt_payload, done) => {
	const { username, password } = jwt_payload;

	const user = await db.user.findUnique({
		where: { username },
		include: {
			_count: true,
			comments: true,
			likes: true,
			posts: true,
		},
	});

	if (!user) return done(null, null, { msg: "User not found" });

	const same = await bcrypt.compare(password, user.password);

	if (!same) return done(null, null, { msg: "Wrong password" });

	return done(null, user);
}));

// ==========
// Middleware
// ==========
app.use(cors({
	origin: "*",
	credentials: true,
}));
app.use(session({
	secret: process.env.JWT_SECRET!,
	resave: false,
	saveUninitialized: false,
}));
app.use(passport.initialize());

app.use("/uploads", express.static("uploads"));

// ===========
// Auth routes
// ===========
app.post("/register", express.json(), async (req, res) => {
	const { username, password } = req.body;

	const hashedPassword = await bcrypt.hash(password, saltRounds);

	const user = await db.user.create({
		data: {
			username,
			password: hashedPassword,
		},
	});

	const token = sign({ username, password }, process.env.JWT_SECRET!);

	res.json({ token });
});

app.post("/login", express.json(), async (req, res) => {
	const { username, password } = req.body;

	const user = await db.user.findUnique({
		where: { username }
	});

	if (!user) return res.json({ msg: "User not found" });

	const same = await bcrypt.compare(password, user.password);

	if (!same) return res.json({ msg: "Wrong password" });

	const token = sign({ username, password }, process.env.JWT_SECRET!);

	res.json({ token });
});

app.get("/self", passport.authenticate("jwt"), (req, res) => {
	res.json({ user: req.user });
});

// ============
// Posts routes
// ============
app.post("/post", express.json(), async (req, res) => {
	const { content, ownerId, imageUrl } = req.body;

	if (!content || !ownerId || !imageUrl) return res.status(400).json({ msg: "Could not create post" });

	const response = await db.post.create({
		data: {
			content,
			ownerId,
			imageUrl,
		},
	});

	res.status(200).json({ msg: "Post created successfully" })
});

app.get("/recentPosts", async (req, res) => {
	const posts = await db.post.findMany({
		orderBy: {
			createdAt: 'desc',
		},
		include: {
			owner: {
				select: {
					username: true,
					imageUrl: true,
				}
			},
			_count: {
				select: {
					comments: true,
					likes: true,
				}
			},
			likes: true,
		}
	});

	res.json({ posts });
});

app.get("/post/:postId", async (req, res) => {
	const { postId } = req.params;

	const post = await db.post.findUnique({
		where: {
			id: postId,
		},
		select: {
			owner: {
				select: {
					_count: true,
					bio: true,
					likes: true,
					createdAt: true,
					id: true,
					posts: true,
					updatedAt: true,
					username: true,
					imageUrl: true,
				}
			},
			imageUrl: true,
			createdAt: true,
			content: true,
			id: true,
		},
	});

	res.json({ post });
});

app.delete("/post/:postId", passport.authenticate("jwt"), async (req, res) => {
	const { postId } = req.params;

	const response = await db.post.delete({
		where: { id: postId }
	});

	res.json({ msg: "Post deleted successfully" });
});

// ===============
// Comments routes
// ===============
app.get("/comments/:postId", async (req, res) => {
	const { postId } = req.params;

	const comments = await db.comment.findMany({
		where: {
			postId
		},
		include: {
			owner: {
				select: {
					username: true,
					id: true,
					imageUrl: true,
				}
			}
		}
	});

	res.json({ comments });
});

app.post("/comment", passport.authenticate("jwt"), express.json(), async (req, res) => {
	const { content, postId, ownerId } = req.body;

	if (!postId) return res.status(400).json({ msg: "postId is required" });

	const response = await db.comment.create({
		data: {
			content,
			postId,
			ownerId,
		},
	});

	res.json({ msg: "Comment created successfully" });
});

app.delete(`/comment/:commentId`, passport.authenticate("jwt"), async (req, res) => {
	const { commentId } = req.params;

	const response = await db.comment.delete({
		where: {
			id: commentId,
		},
	});

	res.status(200).json({ msg: "Comment deleted successfully" });
});

// ===========
// Like routes
// ===========
app.post("/like", passport.authenticate("jwt"), express.json(), async (req, res) => {
	const { postId, likerId } = req.body;

	const response = await db.like.create({
		data: {
			postId,
			likerId,
		}
	});

	res.json({ msg: "Liked post successfully" });
});

app.get("/hasLiked/:postId", passport.authenticate("jwt"), async (req, res) => {
	const { postId } = req.params;
	if (!req.user) return;
	const like = await db.like.findUnique({
		where: {
			likerId_postId: {
				likerId: req.user.id,
				postId: postId,
			},
		},
	});

	res.json({ hasLiked: !!like });
});

app.delete("/like/:postId", passport.authenticate("jwt"), express.json(), async (req, res) => {
	const { postId } = req.params;

	const response = await db.like.delete({
		where: {
			likerId_postId: {
				likerId: req.user!.id,
				postId,
			},
		},
	});

	res.status(200).json({ msg: "Like removed successfully" })
});

// ===========
// User routes
// ===========
app.get("/user/:username", async (req, res) => {
	const { username } = req.params;

	const user = await db.user.findUnique({
		where: { username },
		include: {
			posts: {
				select: {
					owner: true,
					comments: true,
					content: true,
					createdAt: true,
					id: true,
					imageUrl: true,
					likes: true,
					ownerId: true,
					updatedAt: true,
					_count: true,
				}
			},
			comments: true,
			_count: true,
			likes: true,
		},
	})

	res.json({ user });
});

app.put("/user", passport.authenticate("jwt"), express.json(), async (req, res) => {
	const userId = req.user!.id;

	const response = await db.user.update({
		where: { id: userId },
		data: {
			...req.body.payload,
		},
	});

	res.json({ msg: "User updated successfully" });
})

// =============
// Follow routes
// =============
app.get("/followers/:userId", async (req, res) => {
	const { userId } = req.params;

	const followers = await db.follow.findMany({
		where: {
			followingId: userId,
		},
		include: {
			follower: true,
		},
	});

	res.json({ followers });
});

app.get("/followings/:userId", async (req, res) => {
	const { userId } = req.params;

	const followings = await db.follow.findMany({
		where: {
			followerId: userId,
		},
		include: {
			following: true,
		},
	});

	res.json({ followings });
});

app.post("/follow",
	passport.authenticate("jwt"),
	express.json(),
	async (req, res) => {
		const { userId } = req.body;

		const response = await db.follow.create({
			data: {
				followerId: req.user!.id,
				followingId: userId,
			},
			include: {
				following: {
					select: {
						username: true,
					},
				},
			},
		});

		res.json({ msg: `You followed ${response.following.username}` });
	}
);

app.post("/unfollow",
	passport.authenticate("jwt"),
	express.json(),
	async (req, res) => {
		const { userId } = req.body;

		const response = await db.follow.delete({
			where: {
				followerId_followingId: {
					followerId: req.user!.id,
					followingId: userId,
				}
			},
			include: {
				following: {
					select: {
						username: true,
					},
				},
			},
		});

		res.json({ msg: `You unfollowed ${response.following.username}` });
	}
);

app.get("/isFollowing/:userId", passport.authenticate("jwt"), async (req, res) => {
	const { userId } = req.params;

	const response = await db.follow.findUnique({
		where: {
			followerId_followingId: {
				followerId: req.user!.id,
				followingId: userId,
			},
		},
	});

	res.json({ isFollowing: !!response });
});

// ===================
// Upload files routes
// ===================
const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, "uploads/")
	},
	filename(req, file, cb) {
		cb(null, req.body.imageId + path.extname(file.originalname));
	},
});

const upload = multer({ storage });

app.post("/upload", upload.single('image'), (req, res) => {
	if (!req.file) return res.status(400).json({ msg: "Image was not provided" })

	res.json({
		imageId: req.body.imageId,
		extName: path.extname(req.file.originalname)
	});
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
