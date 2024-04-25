"use client"

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { getSelf, removeComment } from "@/lib/api";
import { getCookie } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface DeleteCommentProps {
	ownerId: string;
	commentId: string;
};

const DeleteComment = ({ ownerId, commentId }: DeleteCommentProps) => {
	const [isPending, setIsPending] = useState<boolean>(false);
	const [self, setSelf] = useState<User | null>(null);

	const toast = useToast();
	const router = useRouter();

	useEffect(() => {
		const initSelf = async () => {
			setIsPending(true);

			const token = getCookie("token");
			const newSelf = await getSelf(token);
			setSelf(newSelf);

			setIsPending(false);
		}

		initSelf();
	}, []);


	if (!self) return;
	if (self.id !== ownerId) return;

	const onDelete = async () => {
		setIsPending(true);

		const token = getCookie("token");
		const response = await removeComment(commentId, token);
		toast.toast({
			description: response.msg,
		});
		router.refresh();
	};

	return (
		<Button
			variant="ghost"
			size="icon"
			disabled={isPending}
			onClick={onDelete}
		>
			<Trash2 className="h-5 w-5" />
		</Button>
	);
};

export default DeleteComment;