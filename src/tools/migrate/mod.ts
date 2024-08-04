import { parse as parseYaml } from "@std/yaml";
import { stringify as stringifyCsv } from "@std/csv";
import { Card } from "../../card.ts";

interface CardYaml {
  f: string;
  b: string;
}

async function loadYamlDeck(filename: string): Promise<Card[]> {
  const s = await Deno.readTextFile(filename);

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

  return stringifyCsv(data, { columns });
}

async function migrate(filename: string): Promise<void> {
  const deck = await loadYamlDeck(filename);

  const csvContent = makeCsvDeck(deck);

  await Deno.writeTextFile(
    filename.replace(".yaml", ".csv"),
    csvContent,
  );

  return;
}

export { makeCsvDeck, migrate };
