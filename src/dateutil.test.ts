import { assertEquals } from "@std/assert";
import { addDays } from "./dateutil.ts";

Deno.test("adding zero days", () => {
  const date = new Date("2024-08-12");
  const result = addDays(date, 0);
  const expected = new Date("2024-08-12");
  assertEquals(result, expected);
});

Deno.test("adding positive number of days", () => {
  const date = new Date("2024-08-12");
  const result = addDays(date, 5);
  const expected = new Date("2024-08-17");
  assertEquals(result, expected);
});

Deno.test("adding negative number of days", () => {
  const date = new Date("2024-08-12");
  const result = addDays(date, -3);
  const expected = new Date("2024-08-09");
  assertEquals(result, expected);
});

Deno.test("handling leap year (1)", () => {
  const date = new Date("2024-02-28");
  const result = addDays(date, 1);
  const expected = new Date("2024-02-29");
  assertEquals(result, expected);
});

Deno.test("handling leap year (2)", () => {
  const date = new Date("2024-02-29");
  const result = addDays(date, 1);
  const expected = new Date("2024-03-01");
  assertEquals(result, expected);
});

Deno.test("crossing month boundaries", () => {
  const date = new Date("2024-01-31");
  const result = addDays(date, 1);
  const expected = new Date("2024-02-01");
  assertEquals(result, expected);
});

Deno.test("crossing year boundary", () => {
  const date = new Date("2023-12-31");
  const result = addDays(date, 1);
  const expected = new Date("2024-01-01");
  assertEquals(result, expected);
});
