import { parseArgs } from "@std/cli/parse-args";

type AppArgs = {
  deck: string;
  debug: boolean;
};

function parseAppArgs(cliArgs: string[]): AppArgs {
  const appArgs = parseArgs(cliArgs) as AppArgs;

  return appArgs;
}

export type { AppArgs };

export { parseAppArgs };
