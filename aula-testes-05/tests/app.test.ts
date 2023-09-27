import supertest from "supertest";

import app from "./../src/app";

const api = supertest(app);

describe("API test", () => {
	it("should return 200 when ask /health", async () => {
		const { status, text } = await api.get("/health");
		expect(status).toBe(200);
		expect(text).toBe("OK!");
	});

	it("should return array of 10 when ask /fibonacci?elements=10", async () => {
		const result = await api.get("/fibonacci?elements=10");
		expect(JSON.parse(result.text)).toHaveLength(10);
	});

	it("should return the correct fibonacci sequence of 5 when ask /fibonacci?elements=5", async () => {
		const result = await api.get("/fibonacci?elements=5");
		expect(JSON.parse(result.text)).toStrictEqual([0, 1, 1, 2, 3]);
	});

	it("should return status 400 when elements is not valid", async () => {
		const result = await api.get("/fibonacci?elements=abc");
		expect(result.status).toBe(400);
	});
});
