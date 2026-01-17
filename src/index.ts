#!/usr/bin/env node
import { parseArgs } from "node:util";
import pc from "picocolors";
import { Input } from "./cmd/cli/input.ts";
import { shuffle } from "./collections.ts";
import { loadDeck } from "./deck.ts";
import { levenshteinRatio } from "./levenshtein-ratio.ts";
import { deriveReviewfile } from "./pathutil.ts";
import {
  loadReviews,
  newReviewItem,
  practice,
  type ReviewItem,
  saveReviews,
  score2grade,
} from "./review.ts";
import process from "node:process";

const { values: args } = parseArgs({
  args: process.argv.slice(2),
  options: {
    deck: {
      type: "string",
    },
  },
  strict: true,
});

const deckfile = args.deck;
if (!deckfile) {
  console.error("error: --deck is required");
  process.exit(1);
}

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
  console.log(pc.yellow("! " + front));
}

// add new items
for (const card of deck) {
  if (reviewMap.has(card.front)) {
    continue;
  }

  reviewMap.set(card.front, newReviewItem(card));

  console.log(pc.green("+ " + card.front));
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
    console.log("- " + pc.red(reviewItemKey));
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

  let answer: string = await Input.question("> ");

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

  const score = levenshteinRatio(review.back, answer);

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
