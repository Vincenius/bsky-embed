import { RichText } from '@atproto/api'

const formatPost = ({ post, reason, isRoot }) => {
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

  const replyPost = post.embed?.$type === 'app.bsky.embed.record#view'
    ? post.embed.record
    : post.embed?.record?.record?.$type === 'app.bsky.embed.record#viewRecord' && post.embed.record.record
  const formattedReply = replyPost && { ...replyPost, record: replyPost.value, embed: (replyPost?.embeds || [])[0] }

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
    card: post.embed?.$type === 'app.bsky.embed.external#view' && post.embed?.external,
    replyPost: isRoot && formattedReply && formatPost({ post: formattedReply, isRoot: false }),
    isRepost: reason?.$type === 'app.bsky.feed.defs#reasonRepost',
    repostBy: reason?.by?.displayName,
  }
};

export const formatData = (data: any) =>
    (data.feed || []).map((post) => formatPost({ ...post, isRoot: true }))

export const getContentAfterLastSlash = (str: string) => {
    const lastIndex = str.lastIndexOf("/");

    if (lastIndex !== -1) {
        return str.substring(lastIndex + 1);
    } else {
        return str;
    }
}

export const timeDifference = (previous: Date) => {
  const current = new Date()

  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < msPerMinute) {
       return Math.floor(elapsed/1000) + 's';   
  }

  else if (elapsed < msPerHour) {
       return Math.floor(elapsed/msPerMinute) + 'm';   
  }

  else if (elapsed < msPerDay ) {
       return Math.floor(elapsed/msPerHour ) + 'h';   
  }

  else if (elapsed < msPerMonth) {
      return Math.floor(elapsed/msPerDay) + 'd';   
  }

  else if (elapsed < msPerYear) {
      return Math.floor(elapsed/msPerMonth) + ' mo';   
  }

  else {
      return Math.floor(elapsed/msPerYear ) + ' yr';   
  }
}