import { green, red, yellow } from "@std/fmt/colors";
import { Card } from "./card.ts";
import { newReviewItem, ReviewItem, saveReviews } from "./review.ts";

// My apologies to the poor reader of this piece of shit of a code.
async function cleanupReviews(
  reviewfile: string,
  deck: Card[],
  reviewMap: Map<string, ReviewItem>,
): Promise<Map<string, ReviewItem>> {
  // update old items
  const backCardSet = new Set<string>();
  for (const card of deck) {
    backCardSet.add(card.back);
  }
  // remove those review items from reviewMap that are not in backCardSet
  for (const { front, back } of reviewMap.values()) {
    if (backCardSet.has(back)) {
      continue;
    }

    reviewMap.delete(front);
    console.log(yellow("! " + front));
  }

  // add new items
  for (const card of deck) {
    if (reviewMap.has(card.front)) {
      continue;
    }

    reviewMap.set(card.front, newReviewItem(card));

    console.log(green("+ " + card.front));
  }

  // delete old items
  //
  // build a set of current cards
  const frontCardSet = new Set<string>();
  for (const card of deck) {
    frontCardSet.add(card.front);
  }
  // remove those review items from reviewMap that are not in frontCardSet
  for (const reviewItemKey of reviewMap.keys()) {
    if (!frontCardSet.has(reviewItemKey)) {
      reviewMap.delete(reviewItemKey);
      console.log("- " + red(reviewItemKey));
    }
  }

  // save cleanups
  await saveReviews(reviewfile, reviewMap);

  return reviewMap;
}

export { cleanupReviews };
