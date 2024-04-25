"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSelf, postComment } from "@/lib/api";
import { getCookie } from "@/lib/utils";
import { FormEvent, useEffect, useState } from "react";

interface CommentInputProps {
	postId: string;
}

const CommentInput = ({ postId }: CommentInputProps) => {
	const [self, setSelf] = useState(null);
	const [isPending, setIsPending] = useState<boolean>(false);
	const [content, setContent] = useState<string>('');

	useEffect(() => {
		const initSelf = async () => {
			const token = getCookie("token");
			const newSelf = await getSelf(token);
			setSelf(newSelf);
		};

		initSelf();
	}, []);

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsPending(true);

		const token = getCookie("token");
		const newSelf = await getSelf(token);
		const response = await postComment(token, content, postId, newSelf.id);
		console.log(response);
		setContent('');
		setIsPending(false);
	}

	return (
		<form className="flex gap-x-3" onSubmit={(e) => onSubmit(e)}>
			<Input
				value={content}
				onChange={(e) => setContent(e.target.value)}
				disabled={isPending}
				placeholder="Your comment"
			/>
			<Button
				disabled={isPending}
				type="submit"
				variant="secondary"
			>
				Send
			</Button>
		</form>
	);
};

export default CommentInput;