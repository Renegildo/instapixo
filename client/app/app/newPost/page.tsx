"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { createPost, getSelf, uploadImage } from "@/lib/api";
import { getCookie } from "@/lib/utils";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

import { v4 } from 'uuid';

const NewPost = () => {
	const [content, setContent] = useState<string>('');
	const [imageUrl, setImageUrl] = useState<string>('');
	const [ownerId, setOwnerId] = useState<string>('');
	const [imageFile, setImageFile] = useState<File | null>(null);

	const { toast } = useToast();

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (imageFile) {
			const uploadResponse = await uploadImage(imageFile, v4());

			const newImageUrl = "http://localhost:3333/uploads/" + uploadResponse.imageId + uploadResponse.extName;

			setImageUrl(newImageUrl);

			const postResponse = await createPost(content, ownerId, newImageUrl);
			toast({
				description: `${postResponse.msg}`
			});
		}
		const postResponse = await createPost(content, ownerId, imageUrl);
		console.log(postResponse);
	};

	useEffect(() => {
		const initOwnerId = async () => {
			const token = getCookie("token");
			const self = await getSelf(token);
			setOwnerId(self.id)
		};

		initOwnerId();
	}, []);

	return (
		<main className="w-full h-[calc(100vh-64px)] flex flex-col items-center justify-center">
			<div className="bg-slate-900 p-10 mb-10 rounded-lg shadow-lg">
				<h1 className="text-4xl font-bold mb-5 text-center">
					Create new Post
				</h1>
				<form
					className="flex flex-col max-w-screen-sm mx-10 gap-y-4"
					onSubmit={(e) => onSubmit(e)}
				>
					<div>
						<Label htmlFor="content">
							Post content
						</Label>
						<Input placeholder="Post content" name="content" onChange={(e) => setContent(e.target.value)} />
					</div>
					<div>
						<Label htmlFor="image">
							Image
						</Label>
						<Input
							id="image"
							name="image"
							type="file"
							className=""
							onChange={(e) => {
								if (!e.target.files) return;
								setImageFile(e.target.files[0])
							}}
						/>
					</div>
					<Button type="submit">
						Create post
					</Button>
					<Button variant="secondary" asChild>
						<Link href={"/app"}>
							Cancel
						</Link>
					</Button>
				</form>
			</div>
		</main>
	);
};

export default NewPost;