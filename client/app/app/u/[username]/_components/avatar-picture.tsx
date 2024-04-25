"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogTrigger,
	DialogTitle,
	DialogFooter
} from "@/components/ui/dialog";
import UploadImage from "./upload-image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { updateUser, uploadImage } from "@/lib/api";
import { v4 } from "uuid";
import { getCookie } from "@/lib/utils";

interface AvatarPictureProps {
	username: string;
	imageUrl: string;
}

const AvatarPicture = ({
	imageUrl,
	username,
}: AvatarPictureProps) => {
	const [imageFile, setImageFile] = useState<File | null>(null);

	const handleSaveChanges = async () => {
		if (imageFile) {
			const token = getCookie("token");

			const uploadResponse = await uploadImage(imageFile, v4());
			const response = await updateUser(token, {
				imageUrl: "http://localhost:3333/uploads/" + uploadResponse.imageId + uploadResponse.extName,
			});
			console.log(response);
		}
	};

	return (
		<Dialog>
			<DialogTrigger>
				<Avatar className="w-20 h-20">
					<AvatarFallback>
						{username[0].toUpperCase()}
						{username[1].toLowerCase()}
					</AvatarFallback>
					<AvatarImage src={imageUrl} />
				</Avatar>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>
					Change avatar picture
				</DialogTitle>
				<div className="flex items-center justify-center">
					<UploadImage setImageFile={setImageFile} />
				</div>
				<DialogFooter className="flex flex-row items-end justify-end gap-x-3">
					<DialogClose asChild>
						<Button variant="ghost">Cancel</Button>
					</DialogClose>
					<Button
						onClick={handleSaveChanges}
					>
						Save Changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default AvatarPicture;