import { parseYaml } from "./deps.ts";

interface CardYaml {
  f: string;
  b: string;
}

interface Card {
  front: string;
  back: string;
}

async function loadDeck(filename: string): Promise<Card[]> {
  const s = await Deno.readTextFile(filename);

  const { cards } = parseYaml(s) as { cards: CardYaml[] };

  return cards.map(({ f, b }) => ({ front: f, back: b }));
}

export type { Card };

export { loadDeck };
