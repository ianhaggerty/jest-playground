it("should match a partial string", () => {
  let sentence = "The dog chased the cat.";
  let regex = /the/;
  expect(regex.test(sentence)).toBeTruthy();
});

it("should match a full string", () => {
  let waldoIsHiding = "Somewhere Waldo is hiding in this text.";
  let waldoRegex = /^Somewhere Waldo is hiding in this text.$/;
  let result = waldoRegex.test(waldoIsHiding);
  expect(result).toBe(true);
});

it("should match case insensitive", () => {
  let waldoIsHiding = "Somewhere Waldo is hiding in this text.";
  let waldoRegex = /waldo/i;
  let result = waldoRegex.test(waldoIsHiding);
  expect(result).toBe(true);
});

it("should match using the OR operator", () => {
  let petString = "James has a pet cat.";
  let petRegex = /dog|cat|bird/;
  let result = petRegex.test(petString);
  expect(result).toBe(true);
});

it("should find all matches using the OR operator", () => {
  let petString = "James has a pet cat, he also has a dog.";
  let petRegex = /dog|cat|bird/g;
  let result = petString.match(petRegex);
  expect(result).toEqual(["cat", "dog"]);
});

it("should match a wildcard character", () => {
  let exampleStr = "Let's have fun and run with regular expressions!";
  let unRegex = /.un/g;
  let result = exampleStr.match(unRegex);

  expect(result).toEqual(["fun", "run"]);
});

it("should match a character set", () => {
  let quoteSample = "Ian Haggerty";
  let vowelRegex = /[aeiou]/gi;
  let result = quoteSample.match(vowelRegex);

  expect(result.join("")).toEqual("Iaae");
});

it("should match a range of characters", () => {
  let quoteSample = "Ian Haggerty";

  // match all lower case characters
  let vowelRegex = /[a-z]/g;
  let result = quoteSample.match(vowelRegex);

  expect(result).toEqual(["a", "n", "a", "g", "g", "e", "r", "t", "y"]);
});

it("should aggressively match a range of characters", () => {
  let quoteSample = "Ian Haggerty";

  // match all lower case characters
  let vowelRegex = /[a-z]+/g;
  let result = quoteSample.match(vowelRegex);

  expect(result).toEqual(["an", "aggerty"]);
});

it("should match a range of numbers and characters", () => {
  let quoteSample = "Blueberry 3.141592653s are delicious.";
  let myRegex = /[2-6h-s]+/gi;
  let result = quoteSample.match(myRegex);

  expect(result).toEqual([
    "l",
    "rr",
    "3",
    "4",
    "5",
    "2653s",
    "r",
    "li",
    "io",
    "s",
  ]);
});

it("should match negated character sets", () => {
  let quoteSample = "3 blind mice";
  let myRegex = /[^0-9aeiou]/gi;
  let result = quoteSample.match(myRegex);
  expect(result).toEqual([" ", "b", "l", "n", "d", " ", "m", "c"]);
});

it("should match 1 or more times", () => {
  // * === 0 or more occurences
  let quote = "I waaaaant to ride";
  let regex = /wa*/;
  let result = quote.match(regex)[0];
  expect(result).toEqual("waaaaa");
});

it("should greedily and lazily match", () => {
  // * matches 1 or more of the previous character
  let string = "titanic";
  let greedyRegex = /t[a-z]*i/;

  let greedyResult = string.match(greedyRegex)[0]; //?
  expect(greedyResult).toEqual("titani");

  let greedyRegexGlobal = /t[a-z]*i/g;
  expect(string.match(greedyRegexGlobal)[0]).toEqual("titani");

  // ? makes this match lazy
  // since ? matches zero or one characters
  let lazyRegex = /t[a-z]*?i/;
  let lazyResult = string.match(lazyRegex)[0];
  expect(lazyResult).toEqual("ti");

  // * Greedy match
  let text = "<h1>Winter is coming</h1>";
  let myRegex = /<.*>/;
  let result = text.match(myRegex)[0];
  expect(result).toEqual("<h1>Winter is coming</h1>");

  // ? Lazy match
  text = "<h1>Winter is coming</h1>";
  myRegex = /<.*?>/;
  result = text.match(myRegex); //?
  expect(result[0]).toEqual("<h1>");
});

it("should match characters at the beginning of a string", () => {
  let rickyAndCal = "Cal and Ricky both like racing.";

  // ^ matches the beginning of a string
  let calRegex = /^Cal/;
  let result = rickyAndCal.match(calRegex);
  expect(result[0]).toEqual("Cal");
});

it("should match the end of a string", () => {
  let caboose = "The last car on a train is the caboose";
  let lastRegex = /caboose$/;
  let result = lastRegex.test(caboose);
  expect(result).toBe(true);
});

it("should match the \\w wildcard", () => {
  let quoteSample = "The five boxing wizards jump quickly.";

  // \w will match an alpha-numeric characters
  let alphabetRegexV2 = /\w/g; // Change this line
  let result = quoteSample.match(alphabetRegexV2);
  expect(result).toEqual(quoteSample.split("").filter((c) => /[a-z]/i.test(c)));
});

it("should match the \\W wildcard", () => {
  let quoteSample = "The five boxing wizards jump quickly.";

  // \W will match any character which is not letter, number or _
  let nonAlphabetRegex = /\W/g;
  let result = quoteSample.match(nonAlphabetRegex);
  expect(result.length).toEqual(6);
});

it("should match the \\d and the \\D wildcard", () => {
  // \d matches numeric characters
  // \D matches non-numeric characters
  let numString = "Your sandwich will be $5.00";
  let numRegex = /\d/g; // Change this line
  let result = numString.match(numRegex);
  expect(result).toEqual(["5", "0", "0"]);

  let notNumRegex = /\D/;
  result = numString.match(notNumRegex);
  expect(result[0]).toEqual("Y");
});

it("should be able to parse a username", () => {
  /*
    1) If there are numbers, they must be at the end.
    2) Letters can be lowercase and uppercase.
    3) At least two characters long. Two-letter names can't have numbers.
    */

  let username = "JackOfAllTrades";
  let userCheck = /^[A-Za-z]{2,}\d*$/;
  let result = userCheck.test(username);
  expect(result).toBe(true);
});

it("should match whitespace wildcard \\s", () => {
  let sample = "Whitespace is important in separating words";
  let countWhiteSpace = /\s/g; // Change this line
  let result = sample.match(countWhiteSpace);
  expect(result.length).toEqual(5);

  result = sample.split(/\s\w/);
  expect(result[2]).toEqual("mportant");
});

it("should specify the lower and upper number of matches", () => {
  let ohStr = "Ohhh no";
  let ohRegex = /Oh{3,6} no/;
  let result = ohStr.match(ohRegex);
  expect(result.length).toEqual(1);

  ohStr = "Ohhhhhhh no";
  ohRegex = /Oh{3,6} no/;
  result = ohStr.match(ohRegex);
  expect(result).toBeNull();
});

it("should specify only the lower number of matches", () => {
  let haStr = "Hazzzzah";
  let haRegex = /z{4,}/;
  let result = haStr.match(haRegex);
  expect(result[0]).toBe("zzzz");

  haStr = "Hazzzah";
  haRegex = /z{4,}/;
  result = haStr.match(haRegex);
  expect(result).toBeFalsy();
});

it("should specify the exact number of characters", () => {
  let timStr = "Timmmmber";
  let timRegex = /Tim{4}ber/;
  let result = timRegex.test(timStr);
  expect(result).toBe(true);
});

it("should match the ? wildcard character", () => {
  // ? matches zero or one of previous character
  let favRegex = /favou?rite/;
  let result1 = favRegex.test("favorite");
  let result2 = favRegex.test("favourite");
  expect(result1).toBe(true);
  expect(result2).toBe(true);
});

it("should match positive and negative lookaheads", () => {
  let string = "i want to quit quokka quite soon, qq?";

  // ?= is a positive lookahead
  // this regex will match 'q' provided a trailing u exists
  let quRegex = /q(?=u)/g;
  let qRegex = /q(?!u)/g;

  let uMatch = string.match(quRegex);
  let noUMatch = string.match(qRegex);

  expect(uMatch.length).toBe(3);
  expect(noUMatch.length).toBe(2);

  expect(uMatch[0]).toBe("q");
  expect(noUMatch[0]).toBe("q");

  // this regex will look ahead for exactly 5 letters
  // followed by 1 or more non-numeric characters
  // followed by 2 digits
  let pwRegex = /(?=\w{5})(?=\D*\d{2})/;
  expect(pwRegex.test("My name is Ian 124")).toBe(false);
  expect(pwRegex.test("My name is Ian Haggerty 124")).toBe(true);
  expect("My name is Ian Haggerty 124".match(pwRegex)[0]).toBe("");
});

it("should match capture groups", () => {
  let string = "regex regex";

  // parenthesis () forms a capture group
  // here, \1 references the first capture group
  // \1 is equivalent to \w+
  let repeatRegex = /(\w+)\s\1/;

  expect(string.match(repeatRegex)[0]).toBe("regex regex");

  let repeatNum = "42 42 42 42";
  let reRegex = /(\d{2})\s\1\s\1/;
  expect(reRegex.test(repeatNum)).toBe(true);
  expect(repeatNum.match(reRegex).length).toBe(2);
});

it("should search and replace text in a string", () => {
  let text = "The sky is silver";
  let silverRegex = /silver/;
  expect(text.replace(silverRegex, "blue")).toEqual("The sky is blue");

  let title = "Code Camp";
  let newTitle = title.replace(/(\w+)\s(\w+)/, "$2 $1");
  expect(newTitle).toBe("Camp Code");
});

it("should remove trailing whitespace", () => {
  let hello = "     Hello, World    ";

  // (1 or more spaces at beginning) or (1 or more spaces at end)
  // g indicator flag is necessary to replace *all* matches
  let wsRegex = /^\s+|\s+$/g;
  expect(hello.match(wsRegex).length).toBe(2);
  console.log(hello.replace(wsRegex, "_"));
});
