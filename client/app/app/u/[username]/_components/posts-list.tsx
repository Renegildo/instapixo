"use client";

import PostCard from "@/app/app/_components/post-card";

interface PostsListProps {
	posts: Post[];
}

const PostsList = ({ posts }: PostsListProps) => {
	return (
		<div className="flex flex-col gap-10 max-w-screen-sm mx-10 mb-10">
			{posts.map(post => (
				<PostCard post={post} key={post.id} />
			))}
		</div>
	);
};

export default PostsList;