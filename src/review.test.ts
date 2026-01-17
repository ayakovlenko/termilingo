import { describe, expect, test } from "vitest";
import { score2grade } from "./review.ts";

describe("test_score2grade", () => {
  test("grade 0", () => {
    expect(score2grade(0.49)).toBe(0);
  });

  test("grade 1", () => {
    expect(score2grade(0.69)).toBe(1);
  });

  test("grade 2", () => {
    expect(score2grade(0.79)).toBe(2);
  });

  test("grade 3", () => {
    expect(score2grade(0.89)).toBe(3);
  });

  test("grade 4", () => {
    expect(score2grade(0.99)).toBe(4);
  });

  test("grade 5", () => {
    expect(score2grade(1)).toBe(5);
  });
});
