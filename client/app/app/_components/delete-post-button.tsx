"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { deletePost, getSelf } from "@/lib/api";
import { getCookie } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface DeletePostButtonProps {
	postId: string;
}

const DeletePostButton = ({ postId }: DeletePostButtonProps) => {
	const onClick = async () => {
		const token = getCookie("token");

		const response = await deletePost(postId, token);
		toast({
			description: response.msg,
		});
	};

	return (
		<Button onClick={onClick} size="icon" variant="ghost" >
			<Trash2 />
		</Button>
	);
};

export default DeletePostButton;