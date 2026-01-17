import { describe, expect, test } from "vitest";
import { join } from "node:path";
import { migrateDeck } from "./mod.ts";
import { readFile, writeFile } from "node:fs/promises";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";

describe("test makeCsvDeck", () => {
  test("no migration needed", async () => {
    const have = await migrateDeck("filename.csv");
    const want = undefined;

    expect(have).toEqual(want);
  });

  test("migrate yaml to csv", async () => {
    const dir = await mkdtemp(join(tmpdir(), "termilingo_"));

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

    expect(csvDeckFilenameHave).toEqual(csvDeckFilenameWant);

    const have = await readFile(join(dir, "deck.csv"), "utf-8");

    const want = `Question,Answer
f,b
"a, b",c
`;

    expect(have).toEqual(want);
  });
});
