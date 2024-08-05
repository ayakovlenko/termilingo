import { supermemo, SuperMemoItem } from "./supermemo.ts";
import { assertEquals } from "@std/assert";

Deno.test("supermemo", async (t) => {
  let item: SuperMemoItem = {
    interval: 0,
    repetition: 0,
    efactor: 2.5,
  };

  await t.step("Grade: 5", () => {
    item = supermemo(item, 5);

    assertEquals(item, { interval: 1, repetition: 1, efactor: 2.6 });
  });

  await t.step("Grade: 4", () => {
    item = supermemo(item, 4);

    assertEquals(item, { interval: 6, repetition: 2, efactor: 2.6 });
  });

  await t.step("Grade: 3", () => {
    item = supermemo(item, 3);

    assertEquals(item, { interval: 16, repetition: 3, efactor: 2.46 });
  });

  await t.step("Grade: 2", () => {
    item = supermemo(item, 2);

    assertEquals(item, {
      interval: 1,
      repetition: 0,
      efactor: 2.1399999999999997,
    });
  });

  await t.step("Grade: 1", () => {
    item = supermemo(item, 1);

    assertEquals(item, {
      interval: 1,
      repetition: 0,
      efactor: 1.5999999999999996,
    });
  });

  await t.step("Grade: 0", () => {
    item = supermemo(item, 0);

    assertEquals(item, { interval: 1, repetition: 0, efactor: 1.3 });
  });
});
