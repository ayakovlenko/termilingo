import { Input } from "@cliffy/prompt";
import { cleanupReviews } from "./cleanup.ts";
import { parseAppArgs } from "./cmd/cli/args.ts";
import { shuffle } from "./collections.ts";
import { loadDeck } from "./deck.ts";
import { ratio } from "./levenshtein.ts";
import { deriveReviewfile } from "./pathutil.ts";
import {
  loadReviews,
  practice,
  ReviewItem,
  saveReviews,
  score2grade,
} from "./review.ts";

const {
  debug,
  deck: deckfile,
} = parseAppArgs(Deno.args);

const reviewfile = deriveReviewfile(deckfile);

if (debug) {
  console.log({ deckfile, reviewfile });
}

const deck = await loadDeck(deckfile);

let reviewMap: Map<string, ReviewItem>;
try {
  reviewMap = await loadReviews(reviewfile);
} catch (_) {
  reviewMap = new Map();
}

reviewMap = await cleanupReviews(reviewfile, deck, reviewMap);

// get items for review
const dueDateItems: ReviewItem[] = [];
for (const review of reviewMap.values()) {
  if (new Date(review.dueDate) <= new Date()) {
    dueDateItems.push(review);
  }
}

shuffle(dueDateItems);

console.log("To review:", dueDateItems.length);

for (const review of dueDateItems) {
  console.log(review.front);

  const answer = await Input.prompt("").then((s) => (
    // trim input and replace all multi-space characters with just one
    s.trim().replaceAll(" +", " ")
  ));

  console.clear();

  switch (answer) {
    case ":skip": {
      if (!review.skipped) {
        review.skipped = 0;
      }
      review.skipped += 1;

      reviewMap.set(review.front, review);
      await saveReviews(reviewfile, reviewMap);

      console.log("skipped");
      console.log("correct:", review.back);
      console.log();

      continue;
    }
    case "":
      continue;
  }

  const score = ratio(review.back, answer);

  if (score === 1) {
    console.log("✅ Correct!");
  } else {
    console.log("☑️ Wrong! Score:", formatPercentange(score));

    const want = review.back;

    console.log("---");
    console.log("want:", want);
    console.log("have:", answer);
    console.log("---");
  }

  reviewMap.set(review.front, practice(review, score2grade(score)));
  await saveReviews(reviewfile, reviewMap);
}

function formatPercentange(f: number): string {
  return `${Math.round(f * 100)}%`;
}
