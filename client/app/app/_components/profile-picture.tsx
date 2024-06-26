import Link from "next/link";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import LogoutButton from "./logout-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, User } from "lucide-react";


interface ProfilePictureProps {
	imageUrl: string;
	username: string;
}

const ProfilePicture = ({
	imageUrl,
	username,
}: ProfilePictureProps) => {
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Avatar>
						<AvatarImage src={imageUrl} />
						<AvatarFallback>
							{username[0].toUpperCase()}
							{username[1].toLowerCase()}
						</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>
						My profile
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem asChild className="cursor-pointer">
						<Link
							href={`/app/u/${username}`}
							className="flex gap-x-2"
						>
							<User />
							<span>Profile</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem asChild className="cursor-pointer">
						<Link
							href={`/app/newPost`}
							className="flex gap-x-2"
						>
							<Plus />
							<span>New Post</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem asChild className="cursor-pointer">
						<LogoutButton />
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>

	);
};

export default ProfilePicture;