"use client";

import { Button } from "@/components/ui/button";
import { Copy, CopyCheck } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
	value: string;
}

const CopyButton = ({ value }: CopyButtonProps) => {
	const [copied, setCopied] = useState<boolean>(false);

	const onClick = () => {
		navigator.clipboard.writeText(value);
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 3000);
	};

	return (
		<div className="flex items-center">
			<Button
				size="icon"
				variant="ghost"
				className="p-2.5"
				onClick={onClick}
			>
				{copied ? (
					<CopyCheck />
				) : (
					<Copy />
				)}
			</Button>
		</div>
	);
};

export default CopyButton;