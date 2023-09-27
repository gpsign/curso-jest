import supertest from "supertest";

import app from "../src/app";

const api = supertest(app);

describe("API test", () => {
	// TODO
	it("Should return object when ask /event", async () => {
		const result = await api.get("/event");
		expect(result.body).toMatchObject({
			title: expect.any(String),
			image: expect.any(String),
			date: expect.any(String),
		});
	});

	it("Should return correct values when ask /event", async () => {
		const result = await api.get("/event");
		expect(result.body).toEqual({
			id: expect.any(Number),
			title: "Super Event!",
			image:
				"https://img.freepik.com/fotos-gratis/publico-animado-assistindo-fogos-de-artificio-de-confete-e-se-divertindo-no-festival-de-musica-a-noite-copiar-espaco_637285-559.jpg",
			date: "2023-07-21T00:00:00.000Z",
		});
	});
});
