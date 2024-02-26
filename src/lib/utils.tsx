export const split = (str: string, words: string[]) => {
  let result = [];
  let lastIndex = 0;

  // Iterate through the words array
  for (let word of words) {
      // Find the index of the current word in the string
      let index = str.indexOf(word);

      // If the word is found
      if (index !== -1) {
          // Push the part of the string from the last index to the current word's index
          result.push(str.substring(lastIndex, index).trim());
          // Push the current word
          result.push(word);
          // Update the last index to the end of the current word
          lastIndex = index + word.length;
      }
  }

  // Push the remaining part of the string
  if (lastIndex < str.length) {
      result.push(str.substring(lastIndex).trim());
  }

  return result;
}