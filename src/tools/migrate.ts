/**
 * A tool to convert a deck from the old YAML format to the new CSV format.
 */

import { migrateDeck } from "./migrate/mod.ts";

if (Deno.args.length != 1) {
  console.error("usage: deno task migrate [yaml-deck]");
  Deno.exit(1);
}

const csvDeckFilename = await migrateDeck(Deno.args[0]);

if (csvDeckFilename) {
  console.log(csvDeckFilename);
}
