import { assertEquals } from "./deps.test.ts";
import { score2grade } from "./review.ts";

Deno.test(async function test_score2grade(t) {
  await t.step("0", () => {
    assertEquals(score2grade(0.19), 0);
  });

  await t.step("score 1", () => {
    assertEquals(score2grade(0.39), 1);
  });

  await t.step("score 2", () => {
    assertEquals(score2grade(0.59), 2);
  });

  await t.step("score 3", () => {
    assertEquals(score2grade(0.79), 3);
  });

  await t.step("score 4", () => {
    assertEquals(score2grade(0.99), 4);
  });

  await t.step("score 1", () => {
    assertEquals(score2grade(1), 5);
  });
});
