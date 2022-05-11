const Add = (s) => {
  if (s === "") {
    return 0;
  }

  // check delimiter , first 3 chars, remove first 4 chars if found
  let delimiter = ",";
  if (/^\/\/.\n/.test(s)) {
    delimiter = s[2];
    s = s.substring(4, s.length);
  }

  // check invalid chars ie. chars that are not in \d - , delimiter
  // ([^\d-,\n\;]+)
  const inValidItems = [...s.matchAll("([^\\d-,\n" + delimiter + "]+)")]
    .map((i) => i[0])
    .filter((i) => i.length > 0);
  if (inValidItems.length > 0) {
    throw new Error(`Invalid numbers passed: ${inValidItems.join(",")}`);
  }

  // replace all to delimiter, other than \d - and delimiter
  // ([^\d-;]+) - also replace comma with delim
  const REGEX = new RegExp("[^\\d-" + delimiter + "]", "g");
  s = s.replace(REGEX, delimiter).split(delimiter).map(Number);

  // find negatives
  const negatives = s.filter((i) => i < 0);
  if (negatives.length % 2 === 1) {
    throw new Error(`negatives not allowed: ${negatives.join(",")}`);
  }

  // remove > 1000 and return sum;
  s = s.filter((i) => i <= 1000);
  return s.reduce((prev, curr) => prev + curr || 0, 0);
};

module.exports = Add;
