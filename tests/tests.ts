// import { describe, expect, test } from "@jest/globals";
// https://blog.logrocket.com/testing-typescript-apps-using-jest/
export const sum = (a, b) => {
  return a + b;
};

describe("sum module", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });
});
test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
