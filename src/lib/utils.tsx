export const substringByBytes = (str: string, startByte: number, endByte: number): string => {
  let byteLength = 0;
  let startPos = 0;
  let endPos = str.length;

  for (let i = 0; i < str.length; i++) {
      let charCode = str.charCodeAt(i);
      let charByteLength = (charCode & 0xff80) === 0 ? 1 : 2; // Check if the character is within ASCII range
      byteLength += charByteLength;
      if (byteLength > startByte) {
          startPos = i;
          break;
      }
  }

  byteLength = 0;
  for (let i = startPos; i < str.length; i++) {
      let charCode = str.charCodeAt(i);
      let charByteLength = (charCode & 0xff80) === 0 ? 1 : 2; // Check if the character is within ASCII range
      byteLength += charByteLength;
      if (byteLength > endByte) {
          endPos = i;
          break;
      }
  }

  return str.substring(startPos, endPos);
}

export const split = (str: string, words: string[]) => {
  let result = [];
  let lastIndex = 0;

  // Iterate through the words array
  for (let word of words) {
      // Find the index of the current word in the string starting from the last found index
      let index = str.indexOf(word, lastIndex);

      // If the word is found
      if (index !== -1) {
          // Push the part of the string from the last index to the current word's index
          result.push(str.substring(lastIndex, index));
          // Push the current word
          result.push(word);
          // Update the last index to the end of the current word
          lastIndex = index + word.length;
      }
  }

  // Push the remaining part of the string
  if (lastIndex < str.length) {
      result.push(str.substring(lastIndex));
  }

  return result;
}

export const formatData = (data: any) => 
    (data.feed || []).map(({ post, reason }) => {
        const facets = post.record.facets || [];
        const rawText = post.record.text;
        const replaces = facets.map((f: any) => {
          const linkText = substringByBytes(rawText, f.index.byteStart, f.index.byteEnd - f.index.byteStart)
          const type = f.features[0].$type
          const typeMap = {
            "app.bsky.richtext.facet#link": f.features[0].uri,
            "app.bsky.richtext.facet#mention": `https://bsky.app/profile/${f.features[0].did}`,
            "app.bsky.richtext.facet#tag": `https://bsky.app/hashtag/${f.features[0].tag}`,
          }
          const link = typeMap[type]

          return {
            from: linkText,
            to: link
              ? `<a href="${link}" target="_blank" rel="noopener" class="text-blue-500 underline">${linkText}</a>`
              : linkText,
          }
        })

        let lastMatch = 0
        const text = split(rawText, replaces.map((r: any) => r.from))
          .map(t => {
            const replaceWith = replaces.find((r: any) => r.from === t);
            return {
              val: replaceWith?.to || t,
              setInnerHtml: !!replaceWith,
            }
          })

        return {
          username: post.author.displayName,
          handle: post.author.handle,
          avatar: post.author.avatar, // todo fallback
          text,
          createdAt: post.record.createdAt,
          uri: post.uri,
          images: [
            ...post.embed?.images || [],
            ...post.embed?.media?.images || []
          ],
          isRepost: reason?.$type === 'app.bsky.feed.defs#reasonRepost',
          repostBy: reason?.by?.displayName,
        }
      });

export const getContentAfterLastSlash = (str: string) => {
    const lastIndex = str.lastIndexOf("/");

    if (lastIndex !== -1) {
        return str.substring(lastIndex + 1);
    } else {
        return str;
    }
}