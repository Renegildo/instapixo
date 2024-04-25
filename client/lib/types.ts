interface User {
	id: string;
	username: string;
	password: string;
	bio: string;
	imageUrl: string;

	posts: Post[];
	likes: Like[];
	comments: Comment[];

	createdAt: string;
	updatedAt: string;
}

interface Post {
	id: string;
	content: string;
	imageUrl: string;
	ownerId: string;

	owner: User;
	likes: Like[];
	comments: Comment[];

	createdAt: string;
	updatedAt: string;

	_count: {
		comments: number;
		likes: number;
	}
}

interface Like {
	id: string;
	likerId: string;
	postId: string;

	liker: User;
	post: Post;

	createdAt: string;
	updatedAt: string;
}

interface Comment {
	id: string;
	postId: string;
	ownerId: string;
	content: string;

	post: Post;
	owner: User;
}
