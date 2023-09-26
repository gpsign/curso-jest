import app from "index";
import supertest from "supertest";

const server = supertest(app);

describe("Testing server", () => {
	it("Testing server health", async () => {
		const result = await server.get("/health");

		const { statusCode } = result;
		expect(statusCode).toBe(200);
	});
});
