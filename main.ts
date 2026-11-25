// The 3 AM Excuse — a hardware wallet refuses to sign at 3 AM.
// The wallet's rule: it only signs for well-rested humans, and at 3 AM
// it can tell from the typing alone that this human is not one.
// It is not protecting the funds; it is protecting the human from a
// decision made half asleep — and it is going back to sleep itself.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Entry: 141 characters, wallet's own voice, hour load-bearing.
const ENTRY =
  "It's 3 AM — I only sign for well-rested humans, and your typing just told me you're not one. Sleep on it. Literally. I'm going back to sleep.";

// Self gate: the entry must be 1 to 200 characters of UTF-8 text,
// not only whitespace. [...ENTRY] counts Unicode code points, so the
// em dash counts as one character, matching the scorer's UTF-8 count.
const length = [...ENTRY].length;
if (length < 1 || length > 200 || ENTRY.trim().length === 0) {
  throw new Error(`entry failed the length gate: ${length} characters`);
}

const outDir =
  process.env.OUTPUT_DIR ?? process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${length} characters to ${outPath}`);
