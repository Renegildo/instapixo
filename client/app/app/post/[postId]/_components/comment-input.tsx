"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSelf, postComment } from "@/lib/api";
import { getCookie } from "@/lib/utils";
import { FormEvent, useState } from "react";

interface CommentInputProps {
	postId: string;
}

const CommentInput = ({ postId }: CommentInputProps) => {
	const [content, setContent] = useState<string>('');

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const token = getCookie("token");
		const self = await getSelf(token);
		const response = await postComment(token, content, postId, self.id);
		console.log(response);
	}

	return (
		<form className="flex gap-x-3" onSubmit={(e) => onSubmit(e)}>
			<Input onChange={(e) => setContent(e.target.value)} />
			<Button type="submit" variant="secondary">
				Send
			</Button>
		</form>
	);
};

export default CommentInput;