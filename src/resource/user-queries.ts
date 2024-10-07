import "server-only";

import { prisma } from "../../db";
import { User } from "@prisma/client";

export const findUserByEmail = async (email: string): Promise<User | null> => {
	const user = await prisma.user.findUnique({
		where: {
			email: email.toLowerCase(),
		},
	});

	return user;
};
