"use client";

import { Button } from "@/components/ui/button";
import { getSelf, hasLikedPost, likePost } from "@/lib/api";
import { cn, getCookie } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface LikeButtonProps {
	likes: Like[];
	postId: string;
};

const LikeButton = ({ likes, postId }: LikeButtonProps) => {
	const [self, setSelf] = useState(null);
	const [isLiked, setIsLiked] = useState<boolean>(false);

	const onLike = async () => {
		if (isLiked) return;

		const token = getCookie("token");
		const self = await getSelf(token);

		const response = await likePost(postId, self.id, token);
		setIsLiked(true);
	}

	useEffect(() => {
		const initSelfAndIsLiked = async () => {
			const token = getCookie("token");
			const newSelf = await getSelf(token);

			for (let i = 0; i < likes.length; i++) {
				if (likes[i].likerId === newSelf.id) {
					setIsLiked(true);
					break;
				}
			}

			setSelf(newSelf);
		};

		initSelfAndIsLiked();
	}, [likes])

	return (
		<Button
			variant="ghost"
			className="flex items-center justify-between gap-x-1"
			onClick={onLike}
		>
			<Heart className={cn(
				"h-6 w-6",
				isLiked && "fill-white"
			)} />
			<span className="font-semibold text-lg">
				{likes.length}
			</span>
		</Button>
	);
};

export default LikeButton;