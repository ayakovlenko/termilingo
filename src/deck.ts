import { parse as parseCsv } from "csv-parse/sync";
import { extname } from "node:path";
import { type Card } from "./card.ts";
import { readFile } from "node:fs/promises";

async function loadDeck(filename: string): Promise<Card[]> {
  const ext = extname(filename);

  switch (ext) {
    case ".csv":
      return await loadCsvDeck(filename);
    case ".yaml":
      throw `.yaml decks are no longer supported; run to migrate: deno task migrate ${filename}`;
    default:
      throw `unsupported extension: ${ext}`;
  }
}

type CsvCard = {
  Question: string;
  Answer: string;
};

async function loadCsvDeck(filename: string): Promise<Card[]> {
  const csvContent = await readFile(filename, "utf-8");

  const parsedCsv = parseCsv(
    csvContent,
    {
      columns: true,
      skip_empty_lines: true,
    },
  ) as CsvCard[];

  return parsedCsv.map((row) => ({
    front: row.Question,
    back: row.Answer,
  }));
}

export { loadDeck };
