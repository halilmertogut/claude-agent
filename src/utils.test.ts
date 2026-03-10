import { add, subtract, multiply, divide } from "./utils";

describe("add", () => {
  it("returns the sum of two numbers", () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
    expect(add(0, 0)).toBe(0);
  });
});

describe("subtract", () => {
  it("returns the difference of two numbers", () => {
    expect(subtract(5, 3)).toBe(2);
    expect(subtract(0, 5)).toBe(-5);
    expect(subtract(0, 0)).toBe(0);
  });
});

describe("multiply", () => {
  it("returns the product of two numbers", () => {
    expect(multiply(2, 3)).toBe(6);
    expect(multiply(-2, 3)).toBe(-6);
    expect(multiply(0, 5)).toBe(0);
  });
});

describe("divide", () => {
  it("returns the quotient of two numbers", () => {
    expect(divide(6, 3)).toBe(2);
    expect(divide(5, 2)).toBe(2.5);
    expect(divide(-6, 3)).toBe(-2);
  });

  it("throws on division by zero", () => {
    expect(() => divide(1, 0)).toThrow("Division by zero");
    expect(() => divide(0, 0)).toThrow("Division by zero");
  });
});
