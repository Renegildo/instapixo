"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getToken } from "@/lib/api";
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
		<div>
			<form onSubmit={(e) => onSubmit(e)}>
				<Input placeholder="username" onChange={(e) => setUsername(e.target.value)} />
				<Input placeholder="password" onChange={(e) => setPassword(e.target.value)} />
				<Button type="submit">
					Login
				</Button>
			</form>
		</div>
	);
};

export default Login;