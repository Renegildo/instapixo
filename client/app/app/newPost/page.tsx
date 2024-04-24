"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { createPost, getSelf, uploadImage } from "@/lib/api";
import { getCookie } from "@/lib/utils";
import { UploadCloud } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

import { v4 } from 'uuid';

const NewPost = () => {
	const [content, setContent] = useState<string>('');
	const [imageUrl, setImageUrl] = useState<string>('');
	const [ownerId, setOwnerId] = useState<string>('');
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [previewImage, setPreviewImage] = useState<string>('');

	const { toast } = useToast();

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!content && !imageFile) {
			return toast({
				description: "Provide a post content and a image and try again"
			});
		}

		if (!content) {
			return toast({
				description: "Provide a post content and try again"
			});
		}

		if (!imageFile) {
			return toast({
				description: "Provide a image and try again"
			});
		}

		if (content.length > 100) {
			return toast({
				description: "Content too long, make it smaller and try again"
			});
		}

		if (imageFile) {
			const uploadResponse = await uploadImage(imageFile, v4());

			const newImageUrl = "http://localhost:3333/uploads/" + uploadResponse.imageId + uploadResponse.extName;

			setImageUrl(newImageUrl);

			const postResponse = await createPost(content, ownerId, newImageUrl);
			toast({
				description: `${postResponse.msg}`
			});
		}

		try {
			const postResponse = await createPost(content, ownerId, imageUrl);
			toast({
				description: `${postResponse.msg}`
			});
		} catch (error) {
			toast({
				description: `Something went wrong, please try again`
			});
		}
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
						<Input placeholder="Post content" id="content" onChange={(e) => setContent(e.target.value)} />
					</div>
					<label className="relative aspect-square" htmlFor="image">
						<Label htmlFor="image">
							Image
						</Label>
						<div className="h-[calc(100%-24px)] w-full bg-slate-800 rounded-md flex flex-col items-center justify-center text-muted-foreground font-semibold text-lg cursor-pointer border-dashed border-4 border-slate-700">
							<p>
								Click to add image
							</p>
							<UploadCloud className="h-10 w-10" />
						</div>
						<Input
							id="image"
							name="image"
							type="file"
							className="hidden"
							onChange={(e) => {
								if (!e.target.files) return;
								setImageFile(e.target.files[0]);
								setPreviewImage(URL.createObjectURL(e.target.files[0]));
							}}
						/>
						{previewImage && (
							<Image
								src={previewImage}
								fill
								alt="preview image"
								className="object-cover rounded-md cursor-pointer"
							/>
						)}
					</label>
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