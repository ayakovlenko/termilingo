import { extname } from "@std/path";
import { parse as parseYaml } from "@std/yaml";
import { Card, CardYaml } from "./card.ts";
import { parse as parseCsv } from "@std/csv";

async function loadDeck(filename: string): Promise<Card[]> {
  const ext = extname(filename);

  switch (ext) {
    case ".yaml":
      return await loadYamlDeck(filename);
    case ".csv":
      return await loadCsvDeck(filename);
    default:
      throw `unsupported extension: ${ext}`;
  }
}

async function loadYamlDeck(filename: string): Promise<Card[]> {
  const s = await Deno.readTextFile(filename);

  const { cards } = parseYaml(s) as { cards: CardYaml[] };

  return cards.map(({ f, b }) => ({ front: f, back: b }));
}

type CsvCard = {
  Question: string;
  Answer: string;
};

async function loadCsvDeck(filename: string): Promise<Card[]> {
  const csvContent = await Deno.readTextFile(filename);

  const parsedCsv = parseCsv(
    csvContent,
    {
      header: true,
      skipFirstRow: true,
    },
  ) as CsvCard[];

  return parsedCsv.map((row) => ({
    front: row.Question,
    back: row.Answer,
  }));
}

export { loadDeck };
