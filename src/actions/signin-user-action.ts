"use server";

import { signIn } from "@/auth";

type Res =
	| { success: true }
	| { success: false; error: string; statusCode: 500 };

export async function signInUserAction(values: {
	email: string;
	password: string;
}): Promise<Res> {
	// The auth logic will be done in our AuthJS configuration files
	try {
		if (
			typeof values !== "object" ||
			values === null ||
			Array.isArray(values)
		) {
			throw new Error("Invalid JSON Object");
		}
		await signIn("credentials", { ...values, redirect: false });
		return { success: true };
	} catch (error) {
		return {
			success: false,
			error: "Iternal Server Error",
			statusCode: 500,
		};
	}
}
