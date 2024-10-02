import Link from "next/link";
import React from "react";
import { LogoutButton } from "./elements/logout-btn";

interface IProps {
	user: {
		email: string | undefined;
		name: string | undefined;
		id: string | undefined;
	} | null;
}

export const Header = ({ user }: IProps) => {
	return (
		<header className='px-10 py-5'>
			<nav className='flex justify-between'>
				<ul className='flex gap-8'>
					<li>
						<Link href={"/"}>Home</Link>
					</li>
					{!user && (
						<li>
							<Link href={"login"}>Login</Link>
						</li>
					)}
					{!user && (
						<li>
							<Link href={"signup"}>SignUp</Link>
						</li>
					)}
					{user && (
						<li>
							<Link href={"dashboard"}>Dashboard</Link>
						</li>
					)}
				</ul>
				{user && (
					<div className='flex items-center gap-2'>
						<div>{user.name}</div>
						<LogoutButton />
					</div>
				)}
			</nav>
		</header>
	);
};
