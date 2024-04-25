"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const Register = () => {
	const [password, setPassword] = useState<string>('')
	const [username, setUsername] = useState<string>('')

	const router = useRouter();

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const response = await registerUser(username, password);
		document.cookie = `token=${response.token}; path=/;`;
		router.push("/app");
	};

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
						required
						minLength={3}
						maxLength={50}
					/>
				</div>

				<div>
					<Label htmlFor="password">Password</Label>
					<Input
						id="password"
						placeholder="password"
						type="password"
						onChange={(e) => setPassword(e.target.value)}
						required
						maxLength={128}
						minLength={3}
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