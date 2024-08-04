import { Input } from "@cliffy/prompt";
import { parseArgs } from "@std/cli/parse-args";
import { green, red, yellow } from "@std/fmt/colors";
import { loadDeck } from "./deck.ts";
import { shuffle } from "./collections.ts";
import { ratio } from "./levenshtein.ts";
import {
  loadReviews,
  newReviewItem,
  practice,
  ReviewItem,
  saveReviews,
  score2grade,
} from "./review.ts";
import { deriveReviewfile } from "./pathutil.ts";

const args = parseArgs(Deno.args) as {
  deck: string;
};

const deckfile = args.deck;
const reviewfile = deriveReviewfile(deckfile);

console.log({ deckfile, reviewfile });

const deck = await loadDeck(deckfile);

let reviewMap: Map<string, ReviewItem>;
try {
  reviewMap = await loadReviews(reviewfile);
} catch (_) {
  reviewMap = new Map();
}

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

// get items for review
const dueDateItems: ReviewItem[] = [];
for (const review of reviewMap.values()) {
  if (new Date(review.dueDate) < new Date()) {
    dueDateItems.push(review);
  }
}

shuffle(dueDateItems);

console.log("To review:", dueDateItems.length);

for (const review of dueDateItems) {
  console.log(review.front);

  let answer: string = await Input.prompt("");

  // trip and replace all multi-space characters with just one
  answer = answer.replaceAll(" +", " ").trim();

  if (answer === ":skip") {
    if (!review.skipped) {
      review.skipped = 0;
    }
    review.skipped += 1;

    reviewMap.set(review.front, review);
    await saveReviews(reviewfile, reviewMap);

    continue;
  }

  const score = ratio(review.back, answer);

  if (score === 1) {
    console.log("✅ Correct!");
  } else {
    console.log("☑️ Wrong! Score:", score);

    const want = review.back;

    console.log("---");
    console.log("want:", want);
    console.log("have:", answer);
    console.log("---");
  }

  reviewMap.set(review.front, practice(review, score2grade(score)));
  await saveReviews(reviewfile, reviewMap);
}
