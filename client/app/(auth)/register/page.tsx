"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/lib/api";
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
		<main>
			<form onSubmit={(e) => onSubmit(e)}>
				<Input
					placeholder="username"
					onChange={(e) => setUsername(e.target.value)}
				/>
				<Input
					placeholder="password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button type="submit">
					Register
				</Button>
			</form>
		</main>
	);
};

export default Register;