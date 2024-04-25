"use client"

import { Button } from "@/components/ui/button";
import { getSelf } from "@/lib/api";
import { getCookie } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface DeleteCommentProps {
	ownerId: string;
};

const DeleteComment = ({ ownerId }: DeleteCommentProps) => {
	const [isPending, setIsPending] = useState<boolean>(false);
	const [self, setSelf] = useState<User | null>(null);

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

	return (
		<Button
			variant="ghost"
			size="icon"
			disabled={isPending}
		>
			<Trash2 className="h-5 w-5" />
		</Button>
	);
};

export default DeleteComment;