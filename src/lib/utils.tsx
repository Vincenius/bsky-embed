import { RichText } from '@atproto/api'

export const formatData = (data: any) =>
    (data.feed || []).map(({ post, reason }) => {
        const facets = post.record.facets || [];
        const rawText = post.record.text;

        const rt = new RichText({ text: rawText, facets })
        const text = []

        for (const segment of rt.segments()) {
          if (segment.isLink()) {
            text.push({
              val: `<a href="${segment.link?.uri}" target="_blank" rel="noopener" class="text-blue-500 underline">${segment.text}</a>`,
              setInnerHtml: true,
            })
          } else if (segment.isMention()) {
            text.push({
              val: `<a href="https://bsky.app/profile/${segment.mention?.did}" target="_blank" rel="noopener" class="text-blue-500 underline">${segment.text}</a>`,
              setInnerHtml: true,
            })
          } else if (segment.isTag()) {
            text.push({
              val: `<a href="https://bsky.app/hashtag/${segment.tag?.tag}" target="_blank" rel="noopener" class="text-blue-500 underline">${segment.text}</a>`,
              setInnerHtml: true,
            })
          } else {
            text.push({
              val: segment.text,
              setInnerHtml: false,
            })
          }
        }

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