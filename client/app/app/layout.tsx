"use client";

import { Button } from "@/components/ui/button";
import { getSelf } from "@/lib/api";
import { getCookie } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import ProfilePicture from "./_components/profile-picture";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
	const [self, setSelf] = useState<User | null>(null);
	const [isPending, setIsPending] = useState<boolean>(false);

	useEffect(() => {
		const initSelf = async () => {
			setIsPending(true);

			const token = getCookie("token");
			const newSelf = await getSelf(token);
			setSelf(newSelf);

			setIsPending(false);
		};

		initSelf();
	}, []);

	return (
		<main>
			<header className="flex justify-between items-center p-3">
				<Button className="text-xl font-bold" asChild variant="ghost">
					<Link href={"/app"}>
						Instapixo
					</Link>
				</Button>
				<div>
					{self && self.username ? (
						<ProfilePicture username={self.username} imageUrl={self.imageUrl} />
					) : (
						<Button asChild>
							<Link href="/login">
								Login
							</Link>
						</Button>
					)}
				</div>
			</header>
			{children}
		</main>
	);
};

export default AppLayout;