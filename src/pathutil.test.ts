import { describe, expect, test } from "vitest";
import { deriveReviewfile } from "./pathutil.ts";

describe("test deriveReviewfile", () => {
  test(".csv", () => {
    const have = deriveReviewfile("../decks/spanish.csv");
    const want = "../decks/spanish.review.yaml";

    expect(have).toEqual(want);
  });

  test(".yaml", () => {
    const have = deriveReviewfile("../decks/spanish.yaml");
    const want = "../decks/spanish.review.yaml";

    expect(have).toEqual(want);
  });
});
