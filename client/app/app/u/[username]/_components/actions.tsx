"use client";

import { Button } from "@/components/ui/button";
import { followUser, isFollowing, unfollowUser } from "@/lib/api";
import { getCookie } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ActionsProps {
	userId: string;
}

const Actions = ({ userId }: ActionsProps) => {
	const [isFollowingUser, setIsFollowingUser] = useState<boolean>(false);

	const router = useRouter();

	useEffect(() => {
		const initIsFollowing = async () => {
			const token = getCookie("token");
			const newIsFollowingUser = await isFollowing(userId, token);
			setIsFollowingUser(newIsFollowingUser);
		};

		initIsFollowing();
	}, [userId]);

	const handleFollow = async () => {
		const token = getCookie("token");
		const response = await followUser(userId, token);
		router.refresh();
		setIsFollowingUser(true);
	};

	const handleUnfollow = async () => {
		const token = getCookie("token");
		const response = await unfollowUser(userId, token);
		router.refresh();
		setIsFollowingUser(false);
	};

	return (
		<div className="mb-5 w-full flex justify-center">
			{isFollowingUser ? (
				<Button
					className="w-44"
					onClick={handleUnfollow}
					variant="outline"
				>
					Unfollow
				</Button>
			) : (
				<Button
					className="w-44"
					onClick={handleFollow}
				>
					Follow
				</Button>
			)}
		</div>
	);
};

export default Actions;