import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../db";
import * as v from "valibot";
import argon2 from "argon2";
import { SigninSchema } from "@/validators/signin-validator";
import { findUserByEmail } from "./resource/user-queries";

export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: PrismaAdapter(prisma),
	session: { strategy: "jwt" },
	secret: process.env.AUTH_SECRET,
	pages: { signIn: "/auth/signin" },
	providers: [
		Credentials({
			async authorize(credentials) {
				const parsedCredentials = v.safeParse(
					SigninSchema,
					credentials,
				);

				if (parsedCredentials.success) {
					const { email, password } = parsedCredentials.output;
					// Look for user in db
					const user = await findUserByEmail(email);
					if (!user) return null;
					if (!user.password) return null;

					const passwordsMatch = await argon2.verify(
						user.password,
						password,
					);

					if (passwordsMatch) {
						const { password, ...userWithoutPassword } = user;
						return userWithoutPassword;
					}
				}

				return null;
			},
		}),
	],
});
