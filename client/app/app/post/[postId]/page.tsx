import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getComments, getPost } from "@/lib/api";
import { MessageCircleOff } from "lucide-react";
import Image from "next/image";
import CommentInput from "./_components/comment-input";
import CommentCard from "./_components/comment-card";

interface PostPageProps {
	params: {
		postId: string;
	};
};

const PostPage = async ({ params }: PostPageProps) => {
	const post = await getPost(params.postId);

	const comments = await getComments(post.id);

	if (!post) return <p>loading...</p>

	return (
		<div className="h-full w-full flex items-center justify-center">
			<div className="flex flex-col md:flex-row max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg mx-10">
				<div className="relative h-72 md:h-96 aspect-square">
					{post.imageUrl && (<Image
						className="object-cover"
						alt={`Post image by ${post.owner.username}`}
						src={post.imageUrl}
						fill
					/>)}
				</div>
				<div className="p-4 bg-slate-900">
					<div className="flex gap-x-2 items-center">
						<Avatar>
							<AvatarImage src={post.owner.username} />
							<AvatarFallback>
								{post.owner.username[0].toUpperCase()}
								{post.owner.username[1].toLowerCase()}
							</AvatarFallback>
						</Avatar>
						<div className="flex flex-col">
							<p className="font-semibold">
								{post.owner.username}
							</p>
							<p className="text-muted-foreground text-xs">
								{new Date(post.createdAt).toDateString()}
							</p>
						</div>
					</div>
					<p className="mt-2.5">
						{post.content}
					</p>
				</div>
				<div className="p-4 bg-slate-900 border-t">

					<CommentInput postId={post.id} />

					<div className="space-y-5 mt-5">
						{comments.length === 0 && (
							<div className="text-center text-xl text-muted-foreground font-bold mt-3 flex flex-col items-center justify-center">
								<p>
									No comments.
								</p>
								<MessageCircleOff className="h-10 w-10" />
							</div>
						)}
						{comments.length > 0 && (
							comments.map((comment: Comment) => (
								<CommentCard
									key={comment.id}
									content={comment.content}
									owner={comment.owner}
								/>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostPage;