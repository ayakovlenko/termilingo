import { expect, test } from "vitest";
import { addDays } from "./dateutil.ts";

test("adding zero days", () => {
  const date = new Date("2024-08-12");
  const result = addDays(date, 0);
  const expected = new Date("2024-08-12");
  expect(result).toEqual(expected);
});

test("adding positive number of days", () => {
  const date = new Date("2024-08-12");
  const result = addDays(date, 5);
  const expected = new Date("2024-08-17");
  expect(result).toEqual(expected);
});

test("adding negative number of days", () => {
  const date = new Date("2024-08-12");
  const result = addDays(date, -3);
  const expected = new Date("2024-08-09");
  expect(result).toEqual(expected);
});

test("handling leap year (1)", () => {
  const date = new Date("2024-02-28");
  const result = addDays(date, 1);
  const expected = new Date("2024-02-29");
  expect(result).toEqual(expected);
});

test("handling leap year (2)", () => {
  const date = new Date("2024-02-29");
  const result = addDays(date, 1);
  const expected = new Date("2024-03-01");
  expect(result).toEqual(expected);
});

test("crossing month boundaries", () => {
  const date = new Date("2024-01-31");
  const result = addDays(date, 1);
  const expected = new Date("2024-02-01");
  expect(result).toEqual(expected);
});

test("crossing year boundary", () => {
  const date = new Date("2023-12-31");
  const result = addDays(date, 1);
  const expected = new Date("2024-01-01");
  expect(result).toEqual(expected);
});
