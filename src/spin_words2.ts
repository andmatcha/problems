const spinWords2=(sentence: string)=>console.log(sentence.split(" ").map(word=>word.length<6?word:word.split("").reverse().join("")).join(" "));

spinWords2("Hey fellow warriors");
spinWords2("This is a test");
spinWords2("This is another test");
