import { distance } from "fastest-levenshtein";

// The function returns the Levenshtein ratio for the given strings. The
// ratio is computed as follows and takes the value between 0 and 1 including:
//
// (sourceLength + targetLength - distance) / (sourceLength + targetLength)
//
// 1.0 means a perfect score; 0.0 means completely off target
function ratio(src: string, dst: string): number {
  const d = distance(src, dst);

  return (src.length + dst.length - d) / (src.length + dst.length);
}

export { ratio };
