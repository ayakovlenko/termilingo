import { assert, assertEquals, assertFalse } from "@std/assert";
import { parseAppArgs } from "./args.ts";

Deno.test(async function test_parseAppArgs(t) {
  await t.step("parse --deck", () => {
    const { deck } = parseAppArgs(["--deck", "../decks/svenska.csv"]);

    assertEquals(deck, "../decks/svenska.csv");
  });

  await t.step("parse --debug", async (t) => {
    await t.step("debug: true", () => {
      const { debug } = parseAppArgs(["--debug", "1"]);

      assert(debug);
    });

    await t.step("debug: false", () => {
      const { debug } = parseAppArgs([]);

      assertFalse(debug);
    });
  });
});
