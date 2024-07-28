import { stringifyYaml } from "../../deps.ts";
import { parseBrainscapeCsv } from "./mod.ts";

async function main(args: string[]): Promise<void> {
  const csvContent = await Deno.readTextFile(args[0]);

  const deck = parseBrainscapeCsv(csvContent);

  console.log(stringifyYaml(deck));
}

await main(Deno.args);
