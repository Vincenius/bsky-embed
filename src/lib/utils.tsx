export const substringByBytes = (str: string, startByte: number, endByte: number): string => {
    let byteLength = 0;
    let startPos = 0;
    let endPos = str.length;

    for (let i = 0; i < str.length; i++) {
        let charCode = str.charCodeAt(i);
        // Assuming UTF-16 encoding where characters greater than 255 take 2 bytes
        byteLength += charCode > 255 ? 2 : 1;
        if (byteLength > startByte) {
            startPos = i;
            break;
        }
    }

    byteLength = 0;
    for (let i = startPos; i < str.length; i++) {
        let charCode = str.charCodeAt(i);
        byteLength += charCode > 255 ? 2 : 1;
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
      // Find the index of the current word in the string
      let index = str.indexOf(word);

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
            // "app.bsky.richtext.facet#tag": `not existing yet`,
          }
          const link = typeMap[type]

          return {
            from: linkText,
            to: link
              ? `<a href="${link}" target="_blank" rel="noopener" class="text-blue-500 underline">${linkText}</a>`
              : linkText,
          }
        })

        const text = split(rawText, replaces.map((r: any) => r.from))
          .map(t => {
            const replaceWith = replaces.find((r: any) => r.from === t);
            return {
              val: replaceWith?.to || t,
              setInnerHtml: !!replaceWith,
            }
          })
          console.log(rawText, text)

        return {
          username: post.author.displayName,
          handle: post.author.handle,
          avatar: post.author.avatar, // todo fallback
          text,
          createdAt: post.record.createdAt,
          uri: post.uri,
          images: post.embed?.images || [],
          isRepost: reason?.$type === 'app.bsky.feed.defs#reasonRepost',
          repostBy: reason?.by?.displayName,
        }
      });