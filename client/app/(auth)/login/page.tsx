"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getToken } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const Login = () => {
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const router = useRouter();

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const token = await getToken(username, password);
		document.cookie = `token=${token}; path=/;`;
		router.push("/app");
	};

	return (
		<main className="h-[100vh] w-full flex items-center justify-center">
			<form className="bg-slate-900 p-10 flex flex-col gap-y-4 rounded-lg" onSubmit={(e) => onSubmit(e)}>
				<h1 className="text-2xl font-bold">Welcome back!</h1>
				<div>
					<Label htmlFor="username">Username</Label>
					<Input required id="username" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
				</div>

				<div>
					<Label htmlFor="password">Password</Label>
					<Input required id="password" type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
				</div>

				<Button className="w-full" type="submit">
					Login
				</Button>
				<Button variant="ghost">
					<Link href="/register">
						Dont have a account?
					</Link>
				</Button>
			</form>
		</main>
	);
};

export default Login;