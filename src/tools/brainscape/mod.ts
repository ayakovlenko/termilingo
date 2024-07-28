import { CardYaml } from "../../card.ts";
import { parseCsv } from "../../deps.ts";

export type BrainscapeCard = {
  Question: string;
  Answer: string;
};

export function parseBrainscapeCsv(csvContent: string): { cards: CardYaml[] } {
  const parsedCsv = parseCsv(
    csvContent,
    {
      header: true,
      skipFirstRow: true,
    },
  ) as BrainscapeCard[];

  const cards: CardYaml[] = parsedCsv.map((row) => ({
    f: row.Question,
    b: row.Answer,
  }));

  return { cards };
}
