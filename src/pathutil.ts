import { basename, dirname, extname, join } from "node:path";

function deriveReviewfile(deckfile: string): string {
  const ext = extname(deckfile);

  return join(
    dirname(deckfile),
    basename(deckfile).replaceAll(ext, "") + ".review.yaml",
  );
}

export { deriveReviewfile };
