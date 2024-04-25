"use client";

import { Input } from "@/components/ui/input";
import { UploadCloud } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface UploadImageProps {
	setImageFile: string;
}

const UploadImage = ({ setImageFile }: UploadImageProps) => {
const [previewImage, setPreviewImage] = useState<string>('');

	return (
		<label className="relative w-64 aspect-square justify-center mt-[24px]" htmlFor="image">
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
					alt="preview image"
					className="object-cover rounded-md cursor-pointer"
					fill
				/>
			)}
		</label>
	);
};

export default UploadImage;