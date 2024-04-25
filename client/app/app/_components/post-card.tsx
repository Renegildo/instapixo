import Image from "next/image";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from '@/components/ui/avatar';
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import ShareButton from "./share-button";
import LikeButton from "./like-button";
import { Skeleton } from "@/components/ui/skeleton";

interface PostCardProps {
	post: Post;
	userId: string;
}

const PostCard = ({ post, userId }: PostCardProps) => {
	let isSelf = post.ownerId === userId;

	return (
		<div className="relative">
			<div className="bg-slate-900 p-5 rounded-lg flex flex-col gap-y-5 shadow">
				<div>
					<ShareButton postId={post.id} />
					<h2 className="font-medium text-md">
						{post.content}
					</h2>
				</div>
				{post.imageUrl && (
					<figure className="w-full aspect-square relative ">
						<Image
							alt={`Post image by ${post.owner.username}`}
							src={post.imageUrl}
							className="rounded-lg object-cover"
							fill
						/>
					</figure>
				)}
				<div className="flex justify-between items-center">
					<Link
						href={`/app/u/${post.owner.username}`}
						className="hover:bg-slate-800/60 rounded-lg p-2 transition-colors"
					>
						<div className="flex items-center gap-x-2">
							<Avatar>
								<AvatarImage src={post.owner.imageUrl} />
								<AvatarFallback>{`${post.owner.username[0].toUpperCase()}${post.owner.username[1].toLowerCase()}`}</AvatarFallback>
							</Avatar>
							<div>
								<p className="font-semibold">
									{post.owner.username}
								</p>
								<p className="text-xs text-muted-foreground">
									{new Date(post.createdAt).toDateString()}
								</p>
							</div>
						</div>
					</Link>
					<div className="flex gap-x-2">
						<Button variant="ghost" className="flex items-center justify-between gap-x-1" asChild>
							<Link href={`/app/post/${post.id}`}>
								<MessageCircle />
								<span className="font-semibold text-lg">
									{post._count.comments}
								</span>
							</Link>
						</Button>
						<LikeButton initialLikes={post.likes} postId={post.id} />
					</div>
				</div>
			</div>
			<div className="absolute bg-transparent w-full h-full top-0 left-0 -z-10 rounded-lg" />
		</div>
	);
};

export const PostCardSkeleton = () => {
	return (
		<div className="bg-slate-900 p-5 rounded-lg flex flex-col gap-y-5 shadow md:mx-32 lg:mx-40">
			<div>
				<Skeleton className="h-10 w-10 float-right rounded-md" />
				<Skeleton className="h-5 w-60" />
				<Skeleton className="h-5 w-72 mt-2" />
				<Skeleton className="h-5 w-96 mt-2" />
			</div>
			<div className="w-full aspect-square">
				<Skeleton className="w-full h-full" />
			</div>
			<div className="flex justify-between items-center">
				<div className="flex items-center gap-x-2">
					<Skeleton className="w-10 h-10 rounded-full" />
					<div className="space-y-2">
						<Skeleton className="h-5 w-32" />
						<Skeleton className="h-4 w-16" />
					</div>
				</div>
				<div className="flex gap-x-5">
					<Skeleton className="h-10 w-20" />
					<Skeleton className="h-10 w-20" />
				</div>
			</div>
		</div>
	);
};

export default PostCard;