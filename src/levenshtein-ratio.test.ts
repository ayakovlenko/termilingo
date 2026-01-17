import { describe, expect, test } from "vitest";
import { levenshteinRatio } from "./levenshtein-ratio.ts";

describe("testLevenshteinRatio", () => {
  test("correct response", () => {
    const have = levenshteinRatio("fågeln", "fågeln");
    expect(have).toBe(1.00);
  });

  test("incorrect response 1", () => {
    const have = levenshteinRatio("fågeln", "en fågel");
    expect(have).toBeCloseTo(0.71, 2);
  });

  test("incorrect response 2", () => {
    const have = levenshteinRatio("fågeln", "fageln");
    expect(have).toBeCloseTo(0.92, 1);
  });
});
