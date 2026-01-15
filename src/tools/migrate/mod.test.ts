import { assertEquals } from "@std/assert";
import { join } from "node:path";
import { migrateDeck } from "./mod.ts";
import { readFile, writeFile } from "node:fs/promises";

Deno.test("test makeCsvDeck", async (t) => {
  const dir = await Deno.makeTempDir({
    prefix: "termilingo_",
  });

  await t.step("no migration needed", async () => {
    const have = await migrateDeck("filename.csv");
    const want = undefined;

    assertEquals(have, want);
  });

  await t.step("migrate yaml to csv", async () => {
    // given
    const yamlContent = `---
cards:
  - f: f
    b: b
  - f: a, b
    b: c
`;

    const filename = join(dir, "deck.yaml");

    // when
    await writeFile(filename, yamlContent);

    const csvDeckFilenameHave = await migrateDeck(filename);

    // then
    const csvDeckFilenameWant = join(dir, "deck.csv");

    assertEquals(csvDeckFilenameHave, csvDeckFilenameWant);

    const have = await readFile(join(dir, "deck.csv"), "utf-8");

    const want = `Question,Answer
f,b
"a, b",c
`;

    assertEquals(have, want);
  });
});
