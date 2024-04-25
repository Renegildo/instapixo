import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DeleteComment from "./delete-comment";

interface CommentCardProps {
	content: string;
	owner: User;
	commentId: string;
}

const CommentCard = ({
	content,
	owner,
	commentId
}: CommentCardProps) => {
	return (
		<div className="flex justify-between">
			<div className="flex gap-x-2">
				<div>
					<Avatar className="translate-y-1">
						<AvatarImage src={owner.imageUrl} />
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

			<DeleteComment commentId={commentId} ownerId={owner.id} />
		</div>
	);
};

export default CommentCard;