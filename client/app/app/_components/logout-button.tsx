"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
	const router = useRouter();

	const handleLogout = () => {
		document.cookie = "token= ; path=/;";
		router.push("/login");
	};

	return (
		<Button
			className="w-full my-1"
			size='sm'
			variant="destructive"
			onClick={handleLogout}
		>
			Logout
		</Button>
	);
};

export default LogoutButton;