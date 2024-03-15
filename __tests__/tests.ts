// import { describe, expect, test } from "@jest/globals";
// https://blog.logrocket.com/testing-typescript-apps-using-jest/
import { sum } from "../__tests__/first-test";
export const sumtest = (a: number, b: number) => {
  return a + b;
};

describe("sum module", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(4);
  });
});
test("adds 2 + 3 to equal 5", () => {
  expect(sum(2, 3)).toBe(5);
});
