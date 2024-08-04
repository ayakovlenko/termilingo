/**
 * A tool to convert a deck from the old YAML format to the new CSV format.
 */
import { parse as parseYaml } from "@std/yaml";
import { Card } from "../card.ts";

interface CardYaml {
  f: string;
  b: string;
}

async function loadYamlDeck(filename: string): Promise<Card[]> {
  const s = await Deno.readTextFile(filename);

  const { cards } = parseYaml(s) as { cards: CardYaml[] };

  return cards.map(({ f, b }) => ({ front: f, back: b }));
}
