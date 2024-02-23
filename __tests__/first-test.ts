// import { describe, expect, test } from "@jest/globals";
import { sumtest } from "../__tests__/tests";

export const sum = (a: number, b: number) => {
  return a + b;
};

describe("sum module", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(sumtest(1, 2)).toBe(3);
  });
});
test("adds 2 + 3 to equal 5", () => {
  expect(sumtest(1, 2)).toBe(3);
});
