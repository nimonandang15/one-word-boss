import * as fs from "node:fs";

// One word for the boss: "Bobblehead".
// The joke is the boss as a dashboard doll: a wobbling head on a suit
// that nods at everything the boss's boss says, then passes it down
// as your urgent priority. Agrees with whoever spoke last, in every
// room, every time — the nodding is the whole job description.
const word = "Bobblehead";

// Gate: exactly one word, 1-30 characters, UTF-8, not only whitespace.
// The word is 10 characters, all ASCII, so it is 10 bytes with no
// trailing newline. ASCII-only is deliberate: byte count equals char
// count, and a smaller text wins an exact tie on the leaderboard.
if (word.length !== 10) {
  throw new Error(`Expected the 10-character word, got ${word.length}`);
}
if (word.length < 1 || word.length > 30) {
  throw new Error(`Expected 1-30 characters, got ${word.length}`);
}
if (word.trim().length === 0) {
  throw new Error("Entry must not be only whitespace");
}
if (/\s/.test(word)) {
  throw new Error("Entry must be exactly one word with no spaces");
}
if (!/^[\x00-\x7F]*$/.test(word)) {
  throw new Error("Entry must be ASCII only");
}
if (!/^[A-Za-z]+$/.test(word)) {
  throw new Error("Entry must be a single alphabetic word");
}

fs.mkdirSync("/output", { recursive: true });
fs.writeFileSync("/output/entry.txt", word, "utf8");
