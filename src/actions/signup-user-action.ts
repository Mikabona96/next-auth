"use server";

import * as v from "valibot";
import argon2 from "argon2";
import { SignupSchema } from "@/validators/signup-validator";
import { prisma } from "../../db";

type Res =
	| { success: true }
	| { success: false; error: v.FlatErrors<undefined>; statusCode: 400 }
	| { success: false; error: string; statusCode: 409 | 500 };

export async function signupUserAction(values: unknown): Promise<Res> {
	const parsedValues = v.safeParse(SignupSchema, values);

	if (!parsedValues.success) {
		const flatErrors = v.flatten(parsedValues.issues);
		console.log(flatErrors);
		return { success: false, error: flatErrors, statusCode: 400 };
	}

	const { name, email, password } = parsedValues.output;

	try {
		const existingUser = await prisma.user.findUnique({
			where: {
				email: email.toLowerCase(),
			},
			select: {
				id: true,
			},
		});
		if (existingUser?.id) {
			return {
				success: false,
				error: "Email already exists",
				statusCode: 409,
			};
		}
	} catch (error) {
		return {
			success: false,
			error: "Iternal Server Error",
			statusCode: 500,
		};
	}

	try {
		const hashedPassword = await argon2.hash(password);
		const { id } = await prisma.user.create({
			data: {
				name,
				email: email.toLowerCase(),
				password: hashedPassword,
			},
			select: {
				id: true,
			},
		});

		return { success: true };
	} catch (error) {
		console.error(error);
		return {
			success: false,
			error: "Iternal Server Error",
			statusCode: 500,
		};
	}
}
