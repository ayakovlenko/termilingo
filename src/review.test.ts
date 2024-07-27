import { assertEquals } from "./deps.test.ts";
import { score2grade } from "./review.ts";

Deno.test(async function test_score2grade(t) {
  await t.step("grade 0", () => {
    assertEquals(score2grade(0.49), 0);
  });

  await t.step("grade 1", () => {
    assertEquals(score2grade(0.69), 1);
  });

  await t.step("grade 2", () => {
    assertEquals(score2grade(0.79), 2);
  });

  await t.step("grade 3", () => {
    assertEquals(score2grade(0.89), 3);
  });

  await t.step("grade 4", () => {
    assertEquals(score2grade(0.99), 4);
  });

  await t.step("grade 5", () => {
    assertEquals(score2grade(1), 5);
  });
});
