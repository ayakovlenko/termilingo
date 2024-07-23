import dayjs from "dayjs";
import { supermemo, SuperMemoGrade, SuperMemoItem } from "supermemo";
import { Card } from "./card.ts";
import { parseYaml, stringifyYaml } from "./deps.ts";

interface ReviewItem extends Card, SuperMemoItem {
  dueDate: string;
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

function newReviewItem(flashcard: Card): ReviewItem {
  return {
    ...flashcard,
    interval: 0,
    repetition: 0,
    efactor: 2.5,
    dueDate: dayjs(Date.now()).toISOString(),
  };
}

function score2grade(score: number): SuperMemoGrade {
  let grade: SuperMemoGrade;
  switch (score) {
    case 1:
      grade = 5;
      break;
    default:
      if (score < 0.20) {
        grade = 0;
      } else if (score < 0.40) {
        grade = 1;
      } else if (score < 0.60) {
        grade = 2;
      } else if (score < 0.80) {
        grade = 3;
      } else {
        grade = 4;
      }
  }

  return grade;
}

function practice(reviewItem: ReviewItem, grade: SuperMemoGrade): ReviewItem {
  const { interval, repetition, efactor } = supermemo(reviewItem, grade);

  const dueDate = dayjs(Date.now()).add(interval, "day").toISOString();

  return { ...reviewItem, interval, repetition, efactor, dueDate };
}

export type { ReviewItem };

export { loadReviews, newReviewItem, practice, saveReviews, score2grade };
