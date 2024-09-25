import { RichText } from '@atproto/api';

export interface Text{
  val: string;
  setInnerHtml: boolean;
}

interface Reason{
  $type: string;
  by: {
    displayName: string;
  }
}

const formatPost: ({post, reason, isRoot}: { post: any; reason: Reason; isRoot: boolean }) => {
  createdAt: string;
  images: any[];
  isRepost: boolean;
  repostBy: string | undefined;
  handle: string;
  avatar: string;
  text: Text[];
  uri: string;
  card: any;
  replyPost: any;
  username: string;
  isList?: boolean;
  listName?: string;
  listPurpose?: string;
  listItemCount?: number;
} = ({ post, reason, isRoot }) => {
  if (post.$type === "app.bsky.graph.defs#listView") {
    // Handle list view
    return {
      username: post.creator.displayName,
      handle: post.creator.handle,
      avatar: post.creator.avatar,
      text: [{ val: post.description, setInnerHtml: false }],
      createdAt: post.indexedAt,
      uri: post.uri,
      images: [],
      card: null,
      replyPost: null,
      isRepost: false,
      repostBy: null,
      isList: true,
      listName: post.name,
      listPurpose: post.purpose,
      listItemCount: post.listItemCount
    };
  }

  // Existing post handling code
  const facets = post.record.facets || [];
  const rawText = post.record.text;

  const rt: RichText = new RichText({ text: rawText, facets });
  const text: Text[] = [];

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
    replyPost: isRoot && formattedReply && formatPost({ post: formattedReply, reason: {$type: '', by: {displayName: ''}}, isRoot: false }),
    isRepost: reason?.$type === 'app.bsky.feed.defs#reasonRepost',
    repostBy: reason?.by?.displayName
  }
};

export const formatData = (data: any) =>
  (data.feed || []).map((item: any) => formatPost({ post: item.post || item, reason: item.reason, isRoot: true }))

export const getContentAfterLastSlash = (str: string): string => {
    const lastIndex: number = str.lastIndexOf("/");

    if (lastIndex !== -1) {
        return str.substring(lastIndex + 1);
    } else {
        return str;
    }
}

export const timeDifference = (previous: Date): string => {
  const current: Date = new Date();

  const msPerMinute: number = 60 * 1000;
  const msPerHour: number = msPerMinute * 60;
  const msPerDay: number = msPerHour * 24;
  const msPerMonth: number = msPerDay * 30;
  const msPerYear: number = msPerDay * 365;

  const elapsed: number = current.getTime() - previous.getTime();

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