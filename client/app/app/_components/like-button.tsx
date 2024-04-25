"use client";

import { Button } from "@/components/ui/button";
import { getSelf, hasLikedPost, likePost, removeLike } from "@/lib/api";
import { cn, getCookie } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface LikeButtonProps {
	initialLikes: Like[];
	postId: string;
};

const LikeButton = ({ initialLikes, postId }: LikeButtonProps) => {
	const [isPending, setIsPending] = useState<boolean>(false);
	const [self, setSelf] = useState(null);
	const [likes, setLikes] = useState<number>(initialLikes.length);
	const [isLiked, setIsLiked] = useState<boolean>(false);

	const onLike = async () => {
		console.log("like ! ! ! !");
		if (isLiked) return;
		setIsPending(true);

		const token = getCookie("token");
		const self = await getSelf(token);

		const response = await likePost(postId, self.id, token);
		setIsLiked(true);
		setLikes(likes => likes + 1);
		setIsPending(false);
	};

	const onDeslike = async () => {
		console.log("deslike!!!!");
		if (!isLiked) return;
		setIsPending(true);

		const token = getCookie("token");
		const self = await getSelf(token);

		const response = await removeLike(postId, token);
		setIsLiked(false);
		setLikes(likes => likes - 1);
		setIsPending(false);
	};

	useEffect(() => {
		const initSelfAndIsLiked = async () => {
			setIsPending(true);
			const token = getCookie("token");
			const newSelf = await getSelf(token);

			for (let i = 0; i < initialLikes.length; i++) {
				if (initialLikes[i].likerId === newSelf.id) {
					setIsLiked(true);
					break;
				}
			}

			setSelf(newSelf);
			setIsPending(false);
		};

		initSelfAndIsLiked();
	}, [initialLikes])

	return (
		<Button
			variant="ghost"
			className="flex items-center justify-between gap-x-1"
			onClick={isLiked ? onDeslike : onLike}
			disabled={isPending}
		>
			<Heart className={cn(
				"h-6 w-6",
				isLiked && "fill-white",
			)} />
			<span className="font-semibold text-lg">
				{likes}
			</span>
		</Button>
	);
};

export default LikeButton;