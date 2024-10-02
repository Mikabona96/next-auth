"use server";
import bcrypt from "bcrypt";
import { SignupFormSchema, SignupFormState } from "@/app/lib/definitions";
import { prisma } from "../../../db";
import { createSession } from "../lib/session";
import { redirect } from "next/navigation";

export async function signup(state: SignupFormState, formData: FormData) {
	// Validate form fields
	const validatedFields = SignupFormSchema.safeParse({
		name: formData.get("name"),
		email: formData.get("email"),
		password: formData.get("password"),
	});

	// If any form fields are invalid, return early
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	// 2. Prepare data for insertion into database
	const { name, email, password } = validatedFields.data;
	// e.g. Hash the user's password before storing it
	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await prisma.user.create({
		data: {
			email,
			name,
			password: hashedPassword,
		},
	});

	if (!user) {
		return {
			message: "An error occurred while creating your account.",
		};
	}

	// TODO:
	// 4. Create user session
	await createSession(user.id);
	// 5. Redirect user
	redirect("/dashboard");
}
