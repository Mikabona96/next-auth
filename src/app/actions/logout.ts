"use server";
import { redirect } from "next/navigation";
import { logout as Logout } from "../lib/session";

export async function logout() {
	let redirectPath: string | null = null;
	try {
		Logout();
		redirectPath = "/login";
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		return { error: "something went wrong" };
	} finally {
		if (redirectPath) redirect(redirectPath);
	}
}
