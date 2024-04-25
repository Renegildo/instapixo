"use client";

import PostCard, { PostCardSkeleton } from "@/app/app/_components/post-card";
import { getSelf } from "@/lib/api";
import { getCookie } from "@/lib/utils";
import { useEffect, useState } from "react";

interface PostsListProps {
	posts: Post[];
}

const PostsList = ({ posts }: PostsListProps) => {
	const [self, setSelf] = useState<User | null>(null);
	const [isPending, setIsPending] = useState<boolean>(false);

	useEffect(() => {
		const initSelf = async () => {
			setIsPending(true);

			const token = getCookie("token");
			const newSelf = await getSelf(token);
			setSelf(newSelf);

			setIsPending(false);
		}

		initSelf();
	}, [])

	return (
		<div className="flex flex-col gap-10 max-w-screen-sm mx-10 mb-10">
			{(isPending || !self) ? (
				[...Array(3)].map((_, i) => (
					<PostCardSkeleton key={i} />
				))
			) : (
				posts.map(post => (
					<PostCard userId={self.id} post={post} key={post.id} />
				))
			)}
		</div>
	);
};

export default PostsList;