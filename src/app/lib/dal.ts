import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/session";
import { cache } from "react";
import { prisma } from "../../../db";

export const verifySession = cache(async () => {
	const cookie = cookies().get("session")?.value;
	const session = await decrypt(cookie);

	if (!session?.userId) {
		return null;
	}

	return { isAuth: true, userId: session.userId };
});

export const getUser = cache(async () => {
	const session = await verifySession();
	if (!session) return null;

	try {
		const user = await prisma.user.findUnique({
			where: {
				id: `${session.userId}`,
			},
		});

		return { email: user?.email, name: user?.name, id: user?.id };
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		console.log("Failed to fetch user");
		return null;
	}
});
