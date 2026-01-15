import { stringify as stringifyCsv } from "csv-stringify/sync";
import { extname } from "node:path";
import { parse as parseYaml } from "yaml";
import { type Card } from "../../card.ts";
import { readFile, writeFile } from "node:fs/promises";

interface CardYaml {
  f: string;
  b: string;
}

async function loadYamlDeck(filename: string): Promise<Card[]> {
  const s = await readFile(filename, "utf-8");

  const { cards } = parseYaml(s) as { cards: CardYaml[] };

  return cards.map(({ f, b }) => ({ front: f, back: b }));
}

function makeCsvDeck(cards: Card[]): string {
  const data = cards.map(({ front, back }) => ({
    Question: front,
    Answer: back,
  }));

  const columns = [
    "Question",
    "Answer",
  ];

  return stringifyCsv(data, { header: true, columns });
}

async function migrateDeck(filename: string): Promise<string | undefined> {
  const ext = extname(filename);
  if (ext != ".yaml") {
    return;
  }

  const deck = await loadYamlDeck(filename);

  const csvContent = makeCsvDeck(deck);

  const csvDeckFilename = filename.replace(".yaml", ".csv");

  await writeFile(
    csvDeckFilename,
    csvContent,
  );

  return csvDeckFilename;
}

export { migrateDeck };
