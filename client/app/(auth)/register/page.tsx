"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/lib/api";
import Link from "next/link";
import { FormEvent, useState } from "react";

const Register = () => {
	const [password, setPassword] = useState<string>('')
	const [username, setUsername] = useState<string>('')

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const user = await registerUser(username, password);
		console.log(user);
	}

	return (
		<main className="h-[100vh] w-full flex items-center justify-center">
			<form className="bg-slate-900 p-10 flex flex-col gap-y-4 rounded-lg" onSubmit={(e) => onSubmit(e)}>
				<h1 className="text-2xl font-bold">Create your account</h1>
				<div>
					<Label htmlFor="username">Username</Label>
					<Input
						id="username"
						placeholder="username"
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>

				<div>
					<Label htmlFor="password">Password</Label>
					<Input
						id="password"
						placeholder="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<Button type="submit">
					Register
				</Button>
				<Button variant="ghost" asChild>
					<Link href="/login">
						Already has an account?
					</Link>
				</Button>
			</form>
		</main>
	);
};

export default Register;