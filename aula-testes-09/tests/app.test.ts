import supertest from "supertest";

import app from "../src/app";
import prisma from "../src/database";

const api = supertest(app);

beforeEach(async () => {
	await prisma.user.deleteMany();
});

describe("POST /users tests", () => {
	it("should create a user", async () => {
		const result = await api.post("/users").send({
			email: "jabu@ticaba.com",
			password: "flamengo",
		});
		const { statusCode } = result;
		expect(statusCode).toBe(201);
	});

	it("should receive 409 when trying to create two users with same e-mail", async () => {
		const user = {
			email: "jabu@ticaba.com",
			password: "flamengo",
		};

		await api.post("/users").send(user);

		const { statusCode } = await api.post("/users").send(user);

		expect(statusCode).toBe(409);
	});
});

describe("GET /users tests", () => {
	it("should return a single user", async () => {
		const user = {
			email: "jabu@ticaba.com",
			password: "flamengo",
		};

		const create = await api.post("/users").send(user);

		const { id } = create.body;

		const { body, statusCode } = await api.get(`/users/${id}`);

		expect(body).toEqual({
			id: expect.any(Number),
			email: "jabu@ticaba.com",
			password: expect.any(String),
		});
		expect(statusCode).toBe(200);
	});

	it("should return 404 when can't find a user by id", async () => {
		const result = await api.get(`/users/1`);
		expect(result.statusCode).toBe(404);
	});

	it("should return all users", async () => {
		const users = [
			{
				email: "aba@caxi.com",
				password: "flamengo",
			},
			{
				email: "jabu@ticaba.com",
				password: "flamengo",
			},
			{
				email: "mel@ancia.com",
				password: "flamengo",
			},
		];

		await api.post("/users").send(users[0]);

		await api.post("/users").send(users[1]);

		await api.post("/users").send(users[2]);

		const { body, statusCode } = await api.get("/users");

		expect(body).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					email: "aba@caxi.com",
				}),
				expect.objectContaining({
					email: "jabu@ticaba.com",
				}),
				expect.objectContaining({
					email: "mel@ancia.com",
				}),
			])
		);
		expect(body).toHaveLength(3);
		expect(statusCode).toBe(200);
	});
});
