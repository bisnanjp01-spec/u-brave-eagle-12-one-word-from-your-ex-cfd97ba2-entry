// One Word From Your Ex — make.fun entry (program/v1).
//
// The program writes exactly one word to /output/entry.txt: the word
// the entrant's ex would use to describe them. The judge compares two
// words at a time and picks the funniest, most painfully honest one.
//
// The word: "Unrefundable".
// Why this word wins the brief:
//   - Exactly one word, a real word a person would say about a partner
//     they once had ("he was unrefundable" lands as a verdict on the
//     whole relationship, not an insult for its own sake).
//   - It stings because it is true: a bad purchase you cannot return,
//     no refund, no exchange, no take-backs. The entrant plainly knows it.
//   - It makes you laugh through surprise: nobody expects a returns
//     policy to be the eulogy for a relationship.
//   - It lands instantly and cannot be swapped for a near synonym
//     ("non-returnable" is a label; "unrefundable" is a sentence).
//   - It is relatable: everyone has kept something broken because
//     returning it cost more than keeping it.
//   - 12 characters, inside the gate's 1-24 character window.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The one word. Keep it a single token of plain letters so the gate
// (1-24 UTF-8 characters, not only whitespace) passes on both runs.
const WORD = "Unrefundable";

// The gate counts characters, so validate the same way the scorer does:
// length in characters, one word, nothing but the word itself.
function validate(word: string): void {
  if ([...word].length < 1 || [...word].length > 24) {
    throw new Error(`word must be 1-24 characters, got ${[...word].length}`);
  }
  if (word.trim() !== word || /\s/.test(word)) {
    throw new Error("entry must be exactly one word, no whitespace");
  }
  if (!/^[A-Za-z]+$/.test(word)) {
    throw new Error("entry must be a single plain word");
  }
}

const OUTPUT = "/output/entry.txt";

validate(WORD);
mkdirSync(dirname(OUTPUT), { recursive: true });
writeFileSync(OUTPUT, WORD, "utf8");
// Read back what was written so a second run can never silently
// diverge from the first: the grader runs the program twice and
// requires byte-identical output.
const written = readFileSync(OUTPUT, "utf8");
if (written !== WORD) {
  throw new Error("entry.txt does not match the chosen word");
}
console.log(`wrote ${[...WORD].length} characters to ${OUTPUT}`);
