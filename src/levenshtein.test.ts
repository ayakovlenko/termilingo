import { assertAlmostEquals, assertEquals } from "@std/assert";
import { ratio } from "./levenshtein.ts";

Deno.test(async function testLevenshteinRation(t) {
  await t.step("correct response", () => {
    const have = ratio("fågeln", "fågeln");
    assertEquals(have, 1.00);
  });

  await t.step("incorrect response 1", () => {
    const have = ratio("fågeln", "en fågel");
    assertAlmostEquals(have, 0.71, 0.01);
  });

  await t.step("incorrect response 2", () => {
    const have = ratio("fågeln", "fageln");
    assertAlmostEquals(have, 0.91, 0.01);
  });
});
