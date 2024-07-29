import { parseYaml } from "./deps.ts";

interface CardYaml {
  f: string;
  b: string;
}

interface TermilingoCard {
  front: string;
  back: string;
}

async function loadDeck(filename: string): Promise<TermilingoCard[]> {
  const s = await Deno.readTextFile(filename);

  const { cards } = parseYaml(s) as { cards: CardYaml[] };

  return cards.map(({ f, b }) => ({ front: f, back: b }));
}

export type { TermilingoCard, CardYaml };

export { loadDeck };
