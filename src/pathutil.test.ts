import { assertEquals } from "@std/assert";
import { deriveReviewfile } from "./pathutil.ts";

Deno.test("test deriveReviewfile", async (t) => {
  await t.step(".csv", () => {
    const have = deriveReviewfile("../decks/spanish.csv");
    const want = "../decks/spanish.review.yaml";

    assertEquals(have, want);
  });

  await t.step(".yaml", () => {
    const have = deriveReviewfile("../decks/spanish.yaml");
    const want = "../decks/spanish.review.yaml";

    assertEquals(have, want);
  });
});
