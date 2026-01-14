import { assertAlmostEquals, assertEquals } from "@std/assert";
import { levenshteinRatio } from "./levenshtein-ratio.ts";

Deno.test(async function testLevenshteinRatio(t) {
  await t.step("correct response", () => {
    const have = levenshteinRatio("fågeln", "fågeln");
    assertEquals(have, 1.00);
  });

  await t.step("incorrect response 1", () => {
    const have = levenshteinRatio("fågeln", "en fågel");
    assertAlmostEquals(have, 0.71, 0.01);
  });

  await t.step("incorrect response 2", () => {
    const have = levenshteinRatio("fågeln", "fageln");
    assertAlmostEquals(have, 0.91, 0.01);
  });
});
