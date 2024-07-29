import { type Card, createEmptyCard, type Grade, Rating } from "ts-fsrs";
import { TermilingoCard } from "./card.ts";
import { parseYaml, stringifyYaml } from "./deps.ts";

interface ReviewItem extends TermilingoCard, Card {
  skipped?: number;
}

async function loadReviews(
  filename: string,
): Promise<Map<string, ReviewItem>> {
  const s = await Deno.readTextFile(filename);

  const reviews = parseYaml(s) as ReviewItem[];

  const ret: Map<string, ReviewItem> = new Map();
  for (const review of reviews) {
    ret.set(review.front, review);
  }

  return ret;
}

async function saveReviews(
  filename: string,
  reviewMap: Map<string, ReviewItem>,
): Promise<void> {
  const reviews: ReviewItem[] = [];
  for (const review of reviewMap.values()) {
    reviews.push(review);
  }

  const sortedReviews = reviews.sort((a, b) => {
    if (a.front < b.front) return -1;
    if (a.front > b.front) return 1;
    return 0;
  });

  await Deno.writeTextFile(filename, stringifyYaml(sortedReviews));
}

function newReviewItem(flashcard: TermilingoCard): ReviewItem {
  return createEmptyCard(new Date(), (card) => {
    return { ...flashcard, ...card };
  });
}

function score2grade(score: number): Grade {
  if (score < 0.50) {
    return Rating.Again;
  }

  if (score < 0.8) {
    return Rating.Hard;
  }

  if (score < 1.00) {
    return Rating.Good;
  }

  return Rating.Easy;
}

function practice(reviewItem: ReviewItem, grade: Rating): ReviewItem {
  const { interval, repetition, efactor } = supermemo(reviewItem, grade);

  const dueDate = dayjs(Date.now()).add(interval, "day").toISOString();

  return { ...reviewItem, interval, repetition, efactor, dueDate };
}

export type { ReviewItem };

  export { loadReviews, newReviewItem, practice, saveReviews, score2grade };

