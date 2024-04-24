import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CommentCardProps {
	content: string;
	owner: User;
}

const CommentCard = ({
	content,
	owner
}: CommentCardProps) => {
	console.log("Comment owner: ");
	console.log(owner);

	if (!owner) return <p>loading...</p>

	return (
		<div className="flex gap-x-2">
			<div>
				<Avatar className="translate-y-1">
					<AvatarImage src="" />
					<AvatarFallback>
						{owner.username[0].toUpperCase()}
						{owner.username[1].toLowerCase()}
					</AvatarFallback>
				</Avatar>
			</div>
			<div className="flex flex-col">
				<p className="font-bold">
					{owner.username}
				</p>
				<p>
					{content}
				</p>
			</div>
		</div>
	);
};

export default CommentCard;