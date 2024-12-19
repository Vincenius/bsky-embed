import type { Component } from 'solid-js'
import { onMount } from 'solid-js'
import { getContentAfterLastSlash, Text, timeDifference, fetchVideo } from '../lib/utils'
import { DateFormat } from '../lib/types'

interface Props {
  post: any;
  linkTarget: '_self' | '_blank' | '_parent' | '_top';
  handleModalContent: any;
  isCard?: boolean;
  dateFormat?: DateFormat
}

const BskyPost: Component<Props> = ({
  linkTarget = '_self',
  post,
  handleModalContent,
  isCard = false,
  dateFormat,
}: Props) => {
  let videoRef: HTMLVideoElement | undefined;

  onMount(() => {
    if (post.video && post.video.cid) {
      fetchVideo(post.video, videoRef); // Now it should have the element
    }
  });
  return <article class="p-4 border-b border-slate-300 dark:border-slate-800">
    { post.isRepost && <p class="flex gap-1 items-center ml-10 text-slate-600 dark:text-slate-400">
      <svg viewBox="0 0 576 512" height="16" width="16" tabindex="-1" class="mr-1"><path fill="currentColor" d="M272 416c17.7 0 32-14.3 32-32s-14.3-32-32-32H160c-17.7 0-32-14.3-32-32V192h32c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-64-64c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l32 0 0 128c0 53 43 96 96 96H272zM304 96c-17.7 0-32 14.3-32 32s14.3 32 32 32l112 0c17.7 0 32 14.3 32 32l0 128H416c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8l-32 0V192c0-53-43-96-96-96L304 96z"></path></svg>
      <span class="text-sm text-slate-500 font-semibold">Reposted by {post.repostBy}</span>
    </p> }
    <div class="flex gap-2">
      { !isCard && <img src={post.avatar} alt="profile picture" class="w-14 h-14 rounded-full" /> }
      <div class="w-full">
        <div class="flex max-w-[calc(100vw-96px)] items-center">
          { isCard && <img src={post.avatar} alt="profile picture" class="w-4 h-4 mr-1 rounded-full" /> }
          <a href={`https://bsky.app/profile/${post.handle}`} class="text-ellipsis overflow-hidden whitespace-nowrap hover:underline dark:text-white" target={linkTarget} rel={linkTarget === '_blank' ? 'noopeener' : ''}>
            <span class="font-bold dark:text-white">{post.username}</span>
            <span> </span>
            <span class="text-slate-500 dark:text-slate-400 text-sm">@{post.handle}</span>
          </a>
          <span class="text-slate-500 dark:text-slate-400 text-sm">
            <span class="mx-1">·</span>
            <a href={`https://bsky.app/profile/${post.handle}/post/${getContentAfterLastSlash(post.uri)}`} class="hover:underline" target={linkTarget} rel={linkTarget === '_blank' ? 'noopeener' : ''}>
              { dateFormat && dateFormat.type === 'absolute'
                ? new Date(post.createdAt).toLocaleDateString(dateFormat.locale, dateFormat.options)
                : timeDifference(new Date(post.createdAt)) }
            </a>
          </span>
        </div>

        <p class="whitespace-pre-wrap dark:text-white">
          {post.text.map((t: Text) => t.setInnerHtml
            ? <span innerHTML={t.val}></span>
            : <span>{t.val}</span>)}
        </p>

        { post.images.length > 0 && <div class={post.images.length > 1 ? "mt-4 grid grid-cols-2 gap-2" : "mt-4"}>
          { post.images.map((image: { thumb: string | undefined; alt: string | undefined; }) =>
            <a
              href={`https://bsky.app/profile/${post.handle}/post/${getContentAfterLastSlash(post.uri)}`}
              onClick={e => handleModalContent(e, image)}
              target={linkTarget}
              rel={linkTarget === '_blank' ? 'noopeener' : ''}
            >
              <img src={image.thumb} alt={image.alt} class="rounded-md"  />
            </a>
          )}
        </div> }

        { post.video && <div class="mt-4 w-full">
          <video
            width="100%"
            ref={videoRef}
            poster={post.video.thumbnail}
            class="rounded-md w-full h-full object-cover"
            preload="none"
            autoplay={false}
            controls={true}
            muted={true}
          ></video>
        </div>}

        { post.card && <a
          href={post.card.uri}
          target="_blank"
          rel="noopener"
          class="mt-4 rounded-md border border-slate-300 block"
        >
          { post.card.thumb && <img src={post.card.thumb} class="rounded-t-md" alt="Post Thumbnail"/> }
          <div class="p-3">
            <p class="text-slate-500 dark:text-slate-400 text-sm">{new URL(post.card.uri).hostname}</p>
            <p class="font-bold dark:text-white mb-1">{post.card.title}</p>
            <p class="whitespace-pre-wrap dark:text-white">{post.card.description}</p>
          </div>
        </a> }

        { post.replyPost && <a
          href={post.card.uri}
          target="_blank"
          rel="noopener"
          class="mt-4 rounded-md border border-slate-300 block"
        >
          <BskyPost {...{ linkTarget, handleModalContent}} post={post.replyPost} isCard={true} />
        </a> }
      </div>
    </div>
  </article>
}

export default BskyPost;