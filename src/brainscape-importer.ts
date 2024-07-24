import { CardYaml } from "./card.ts";
import { parseCsv, stringifyYaml } from "./deps.ts";

const csvContent = await Deno.readTextFile(Deno.args[0]);

type BrainscapeCard = {
  Question: string;
  Answer: string;
};

const parsedCsv: BrainscapeCard[] = parseCsv(
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

console.log(stringifyYaml({ cards }));
