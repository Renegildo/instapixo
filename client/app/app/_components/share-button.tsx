import { Button } from "@/components/ui/button";
import { Copy, Share2 } from "lucide-react";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import CopyButton from "./copy-button";

interface ShareButtonProps {
	postId: string;
};

const ShareButton = ({ postId }: ShareButtonProps) => {
	const shareLink = `http://localhost:3000/app/post/${postId}`

	return (
		<div className="float-right">
			<Dialog>
				<DialogTrigger className="hover:bg-white/10 transition-colors p-2 rounded-md">
					<Share2 />
				</DialogTrigger>
				<DialogContent className="bg-slate-900">
					<DialogHeader>
						<DialogTitle className="text-start">Share this post:</DialogTitle>
					</DialogHeader>
					<div>
						<p>Copy this link and send to your friends!</p>
						<div className="flex items-center gap-x-4">
							<Input disabled placeholder="Share link" value={shareLink} />
							<CopyButton value={shareLink} />
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default ShareButton;