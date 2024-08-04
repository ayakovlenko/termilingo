import { basename, dirname, extname, join } from "@std/path";

function deriveReviewfile(deckfile: string): string {
  const ext = extname(deckfile);

  return join(
    dirname(deckfile),
    basename(deckfile).replaceAll(ext, "") + ".review.yaml",
  );
}

export { deriveReviewfile };
