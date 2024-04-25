"use client";

import { getRecentPosts, getSelf } from "@/lib/api";
import { getCookie } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PostCard, { PostCardSkeleton } from "./_components/post-card";
import { Skeleton } from "@/components/ui/skeleton";

const App = () => {
	const [user, setUser] = useState<User | null>(null);
	const [posts, setPosts] = useState<Post[] | null>(null);
	const router = useRouter();

	useEffect(() => {
		const initUser = async () => {
			const token = getCookie("token");
			if (!token) return router.push("/login");

			const newUser = await getSelf(token);
			if (!newUser) return router.push("/login");

			setUser(newUser);
		};

		const initPosts = async () => {
			const newPosts = await getRecentPosts();
			setPosts(newPosts);
		};

		initUser();
		initPosts();
	}, [router])

	return (
		<div>
			{!user || !posts ? (
				<>
					<Skeleton className="h-10 w-56 my-5 ml-10" />
					<ul className="mx-10 md:mx-32 lg:mx-40 flex flex-col gap-y-10">
						{[...Array(6)].map((_, i) => (
							<PostCardSkeleton key={i} />
						))}
					</ul>
				</>
			) : (
				<>
					<h1 className="ml-10 my-5 text-2xl font-bold">
						Posts you may like
					</h1>
					<ul className="mx-10 md:mx-32 lg:mx-40 flex flex-col gap-y-10">
						{
							posts?.map(post => (
								<PostCard userId={user.id} post={post} key={post.id} />
							))
						}
					</ul>
				</>
			)}
		</div>
	);
};

export default App;