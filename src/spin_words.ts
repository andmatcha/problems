const spinWords = (sentence: string) => {
  const words = sentence.split(" ");
  const processedWords: string[] = [];
  for (let word of words) {
    if (word.length < 6) {
      processedWords.push(word);
      continue;
    }
    const reversedArray = word.split("").reverse();
    processedWords.push(reversedArray.join(""));
  }
  console.log(processedWords.join(" "));
};

spinWords("Hey fellow warriors");
spinWords("This is a test");
spinWords("This is another test");
