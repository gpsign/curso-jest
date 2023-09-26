import calculator from "calculator";

describe("Testing calculator", () => {
	it("testing 5 + 5", () => {
		const result = calculator.sum(5, 5);
		expect(result).toBe(10);
	});

	it("testing 5 * 5", () => {
		const result = calculator.mul(5, 5);
		expect(result).toBe(25);
	});

	it("testing 25 / 5", () => {
		const result = calculator.div(25, 5);
		expect(result).toBe(5);
	});

	it("testing 5 - 5", () => {
		const result = calculator.sub(5, 5);
		expect(result).toBe(0);
	});
});
