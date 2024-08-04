import { assertEquals } from "@std/assert";
import { Card } from "../../card.ts";
import { makeCsvDeck } from "./mod.ts";

Deno.test("test makeCsvDeck", async (t) => {
  await t.step("simple", () => {
    // given
    const cards: Card[] = [
      {
        front: "f",
        back: "b",
      },
    ];

    // when
    const have = makeCsvDeck(cards);

    // then
    const want = `Question,Answer\r
f,b\r
`;

    assertEquals(have, want);
  });

  await t.step("commas", () => {
    // given
    const cards: Card[] = [
      {
        front: "a, b",
        back: "c",
      },
    ];

    // when
    const have = makeCsvDeck(cards);

    // then
    const want = `Question,Answer\r
"a, b",c\r
`;

    assertEquals(have, want);
  });
});
