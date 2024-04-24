import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
	return (
		<div>
			You favorite social media
			<Button asChild>
				<Link href="/app">
					Get started
				</Link>
			</Button>
		</div>
	);
};

export default Home;