import { extname } from "@std/path";
import { Card } from "./card.ts";
import { parse as parseCsv } from "@std/csv";

async function loadDeck(filename: string): Promise<Card[]> {
  const ext = extname(filename);

  switch (ext) {
    case ".csv":
      return await loadCsvDeck(filename);
    default:
      throw `unsupported extension: ${ext}`;
  }
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
