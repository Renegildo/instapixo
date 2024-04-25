import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getFollowers, getFollowings, getUserByUsername } from "@/lib/api";
import PostsList from "./_components/posts-list";
import Actions from "./_components/actions";
import AvatarPicture from "./_components/avatar-picture";

interface UserDetailsProps {
	params: {
		username: string;
	}
}

const UserDetails = async ({ params }: UserDetailsProps) => {
	const { username } = params;
	const user: User & {
		_count: {
			posts: number,
			likes: number,
			comments: number,
		}
	} = await getUserByUsername(username);


	const followers = await getFollowers(user.id);
	const followings = await getFollowings(user.id);

	return (
		<main>
			<div className="flex flex-col items-center w-full mt-10">
				<AvatarPicture username={username} imageUrl={user.imageUrl} />
				<h1 className="font-bold text-2xl text-center">
					{user.username}
				</h1>

				<div className="flex gap-x-10 my-5">
					<div className="flex flex-col items-center bg-slate-800 rounded-md p-3 w-28">
						<h2 className="text-xl font-semibold">
							Posts
						</h2>
						<h1 className="text-2xl font-bold">
							{user._count.posts}
						</h1>
					</div>
					<div className="flex flex-col items-center bg-slate-800 rounded-md p-3 w-28">
						<h2 className="text-xl font-semibold">
							Followers
						</h2>
						<h1 className="text-2xl font-bold">
							{followers.length}
						</h1>
					</div>
					<div className="flex flex-col items-center bg-slate-800 rounded-md p-3 w-28">
						<h2 className="text-xl font-semibold">
							Following
						</h2>
						<h1 className="text-2xl font-bold">
							{followings.length}
						</h1>
					</div>
				</div>
				<Actions userId={user.id} />

				<PostsList posts={user.posts} />
			</div>
		</main>
	);
};

export default UserDetails;