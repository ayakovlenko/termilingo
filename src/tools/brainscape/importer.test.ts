import { assertEquals } from "@std/assert";
import { parseBrainscapeCsv } from "./mod.ts";

Deno.test(async function testParseBrainscapeCsv(t) {
  await t.step("parse CSV", () => {
    const csvContent = `Question,Answer
front,back`;

    const have = parseBrainscapeCsv(csvContent);
    const want = {
      cards: [
        {
          f: "front",
          b: "back",
        },
      ],
    };

    assertEquals(have, want);
  });
});
