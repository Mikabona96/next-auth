"use server";
import bcrypt from "bcrypt";
import { SigninFormSchema, SigninFormState } from "@/app/lib/definitions";
import { prisma } from "../../../db";
import { createSession, findSession, updateSession } from "../lib/session";
import { redirect } from "next/navigation";

export async function signin(state: SigninFormState, formData: FormData) {
	// Validate form fields
	const validatedFields = SigninFormSchema.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
	});

	// If any form fields are invalid, return early
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	// 2. Prepare data for extraction from database
	const { email, password } = validatedFields.data;
	const user = await prisma.user.findFirst({
		where: {
			email,
		},
	});

	if (!user) {
		return {
			message: "An error occurred while signing in your account.",
		};
	}
	// 3. Compare the user's password to hashed password in db
	const hashedPassword = await bcrypt.compare(password, user?.password);

	if (!hashedPassword) {
		return {
			message: "wrong password!",
		};
	}

	// 4. Find user session
	const session = await findSession();
	if (!session) await createSession(user.id);
	await updateSession();
	// 5. Redirect user
	redirect("/dashboard");
}
