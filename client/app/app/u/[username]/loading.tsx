import { Skeleton } from "@/components/ui/skeleton";
import { PostCardSkeleton } from "../../_components/post-card";

const LoadingUserDeatils = () => {
	return (
		<div className="flex flex-col items-center w-full mt-10 gap-y-3">
			<Skeleton className="w-20 h-20 rounded-full" />
			<Skeleton className="h-8 w-36" />

			<div className="flex gap-x-10 my-5">
				{[...Array(3)].map((_, i) => (
					<Skeleton className="w-28 h-20 rounded-md" key={i} />
				))}
			</div>

			<Skeleton className="h-10 w-36" />

			<ul className="flex flex-col gap-y-10 mt-5 mb-10">
				<PostCardSkeleton />
				<PostCardSkeleton />
				<PostCardSkeleton />
			</ul>
		</div>
	);
};

export default LoadingUserDeatils;