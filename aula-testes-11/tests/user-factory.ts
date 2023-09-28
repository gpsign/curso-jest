import prisma from "database";

export async function createUser(email: string, password: string) {
	const result = await prisma.user.create({ data: { email, password } });
	return result;
}
