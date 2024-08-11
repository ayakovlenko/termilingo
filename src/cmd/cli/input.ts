import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

export const Input = readline.createInterface({ input, output });
