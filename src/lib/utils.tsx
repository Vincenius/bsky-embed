export interface Text {
  val: string;
  setInnerHtml: boolean;
}

interface FacetFeature {
  $type: string;
  uri?: string;
  did?: string;
  tag?: string;
}

interface Facet {
  index: { byteStart: number; byteEnd: number };
  features: FacetFeature[];
}

interface Segment {
  text: string;
  feature?: FacetFeature;
}

const encoder = new TextEncoder();
const decoder = new TextDecoder();

// Post text is arbitrary user input and the faceted segments below are injected
// via innerHTML, so everything interpolated into that markup has to be escaped.
const escapeHtml = (value: string): string =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// Link facets carry a URI straight from the post record - only ever turn
// http(s) into an anchor, so a javascript:/data: URI cannot become a link. The
// original string is returned rather than URL's normalised form so the href
// stays exactly what the author posted; escapeHtml keeps it inside the
// attribute.
const safeHref = (uri: string | undefined): string | null => {
  try {
    const { protocol } = new URL(String(uri));
    return protocol === 'http:' || protocol === 'https:' ? String(uri) : null;
  } catch {
    return null;
  }
};

// Splits a post into plain and faceted segments, the way RichText.segments()
// from @atproto/api does. The server already sends the facets, so all that is
// left is slicing the text - facet indices are UTF-8 byte offsets, so the
// encoded form is what gets sliced.
const segmentText = (text: string, facets: Facet[]): Segment[] => {
  const bytes = encoder.encode(text);
  const sorted = facets
    .filter(f => f?.index && f.features?.length && f.index.byteStart < f.index.byteEnd)
    .sort((a, b) => a.index.byteStart - b.index.byteStart);

  const segments: Segment[] = [];
  let cursor = 0;

  for (const facet of sorted) {
    const { byteStart, byteEnd } = facet.index;
    if (byteStart < cursor) continue; // overlaps the previous facet - skip it

    if (byteStart > cursor) {
      segments.push({ text: decoder.decode(bytes.slice(cursor, byteStart)) });
    }
    segments.push({
      text: decoder.decode(bytes.slice(byteStart, byteEnd)),
      feature: facet.features[0],
    });
    cursor = byteEnd;
  }

  if (cursor < bytes.length) {
    segments.push({ text: decoder.decode(bytes.slice(cursor)) });
  }

  // RichText always yields at least one segment, even for empty text - keep
  // that so callers never have to special-case an empty post.
  if (!segments.length) {
    segments.push({ text });
  }

  return segments;
};

interface Reason {
  $type: string;
  by: {
    displayName: string;
  }
}

const formatPost: ({ post, reason, isRoot }: { post: any; reason: Reason; isRoot: boolean }) => {
  createdAt: string;
  images: any[];
  isRepost: boolean;
  repostBy: string | null | undefined;
  handle: string;
  avatar: string;
  text: Text[];
  uri: string;
  card: any;
  replyPost: any;
  username: string;
} | null = ({ post, reason, isRoot }) => {
  if (post.$type === "app.bsky.embed.record#viewNotFound" || post.$type === 'app.bsky.embed.record#viewBlocked') {
    return null
  }
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
    };
  }
  if (post.$type === "app.bsky.feed.defs#generatorView") {
    // Handle a quoted feed generator. Unlike a quoted post it carries no
    // `record`, so it has to be mapped here or the post below would throw.
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
    };
  }
  // Any other embedded record without a `record` (labelers, detached quotes,
  // future types) is not renderable as a post - skip it instead of throwing.
  if (!post.record) {
    return null
  }

  // Existing post handling code
  const facets = post.record.facets || [];
  const rawText = post.record.text;

  const text: Text[] = [];

  for (const segment of segmentText(rawText, facets)) {
    const feature = segment.feature;

    const href = feature?.$type === 'app.bsky.richtext.facet#link'
      ? safeHref(feature.uri)
      : null;

    if (href) {
      text.push({
        val: `<a href="${escapeHtml(href)}" target="_blank" rel="noopener" class="text-blue-500 underline">${escapeHtml(segment.text)}</a>`,
        setInnerHtml: true,
      })
    } else if (feature?.$type === 'app.bsky.richtext.facet#mention') {
      text.push({
        val: `<a href="https://bsky.app/profile/${escapeHtml(feature.did ?? '')}" target="_blank" rel="noopener" class="text-blue-500 underline">${escapeHtml(segment.text)}</a>`,
        setInnerHtml: true,
      })
    } else if (feature?.$type === 'app.bsky.richtext.facet#tag') {
      text.push({
        val: `<a href="https://bsky.app/hashtag/${escapeHtml(feature.tag ?? '')}" target="_blank" rel="noopener" class="text-blue-500 underline">${escapeHtml(segment.text)}</a>`,
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
  const formattedReply = replyPost && {
    ...replyPost,
    record: replyPost.value || replyPost.record,
    embed: (replyPost?.embeds || [])[0]
  }
  const author = post.author || post.creator

  return {
    username: author.displayName,
    handle: author.handle,
    avatar: author.avatar, // todo fallback
    text,
    createdAt: post.record.createdAt,
    uri: post.uri,
    images: [
      ...post.embed?.images || [],
      ...post.embed?.media?.images || [],
      ...[(post.embed?.media?.external)].filter(Boolean).map((image: any) => ({ ...image, alt: image.title, thumb: image.uri }))
    ],
    video: post.embed?.$type === 'app.bsky.embed.video#view' && post.embed,
    card: post.embed?.$type === 'app.bsky.embed.external#view' && post.embed?.external,
    replyPost: isRoot && formattedReply && formatPost({ post: formattedReply, reason: { $type: '', by: { displayName: '' } }, isRoot: false }),
    isRepost: reason?.$type === 'app.bsky.feed.defs#reasonRepost',
    repostBy: reason?.by?.displayName
  }
};

export const formatData = (data: any) =>
  (data.feed || []).map((post: { post: any; reason: any; isRoot: any; }) => formatPost({ ...post, isRoot: true }))


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
    return Math.floor(elapsed / 1000) + 's';
  }

  else if (elapsed < msPerHour) {
    return Math.floor(elapsed / msPerMinute) + 'm';
  }

  else if (elapsed < msPerDay) {
    return Math.floor(elapsed / msPerHour) + 'h';
  }

  else if (elapsed < msPerMonth) {
    return Math.floor(elapsed / msPerDay) + 'd';
  }

  else if (elapsed < msPerYear) {
    return Math.floor(elapsed / msPerMonth) + ' mo';
  }

  else {
    return Math.floor(elapsed / msPerYear) + ' yr';
  }
}

export const fetchVideo = async (video: any, videoRef: any, disableAutoplay: boolean = false) => {
  if (!('IntersectionObserver' in window)) {
    console.error('IntersectionObserver not supported');
    return;
  }

  if (!videoRef) {
    console.error('Video element not found');
    return;
  }

  const observerOptions = {
    root: null, // Viewport is the root by default
    threshold: 0.5 // 50% of the video must be visible to trigger playback
  };

  const onIntersect = async (entries, observer) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;

      // Optionally, unobserve once video starts playing if you don't need to watch for it going out of view
      observer.unobserve(videoRef);

      // Video is in view - load and play. hls.js is only pulled in at this
      // point, so feeds without videos never pay for it.
      const { default: Hls } = await import('hls.js/light');

      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(video.playlist); // Load the HLS manifest
        hls.attachMedia(videoRef); // Attach to video element
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (!disableAutoplay) {
            videoRef.play();
          }
        });
      } else if (videoRef.canPlayType('application/vnd.apple.mpegurl')) {
        // Fallback for native HLS support in Safari
        videoRef.src = video.playlist;
        videoRef.addEventListener('loadedmetadata', () => {
          if (!disableAutoplay) {
            videoRef.play();
          }
        });
      }
    }
  };

  // Create the observer
  const observer = new IntersectionObserver(onIntersect, observerOptions);
  observer.observe(videoRef); // Observe the video element
};
