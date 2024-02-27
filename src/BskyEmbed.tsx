import type { Component } from 'solid-js';
import { createSignal, createEffect } from "solid-js";
import "@github/relative-time-element"

import styles from './globals.css?inline'
import { agent } from "./lib/api";
import { formatData } from './lib/utils'

interface Props {
  username?: string;
  feed?: string;
  limit?: number;
  mode?: 'dark' | '';
}

const BskyEmbed: Component<Props> = ({
  username,
  feed,
  limit = 10,
  mode = '',
}: Props) => {
  let modalRef: HTMLDialogElement;
  let modalImageRef: HTMLImageElement;
  const [isLoading, setIsLoading] = createSignal(false);
  const [feedData, setFeedData] = createSignal([]);

  createEffect(() => {
    setIsLoading(true);
    // https://docs.bsky.app/docs/api/app-bsky-feed-get-author-feed
    if (username) {
      agent.app.bsky.feed.getAuthorFeed({
        limit,
        actor: username,
        filter: "posts_no_replies",
      }).then(({ success, data }) => {
        if (success) {
          const feed = formatData(data)
          setFeedData(feed)
          setIsLoading(false)
        } else {
          // todo error handling
        }
      });
    } else if (feed) {
      agent.app.bsky.feed.getFeed({
        limit,
        feed,
      }).then(({ success, data }) => {
        if (success) {
          const feed = formatData(data)
          setFeedData(feed)
          setIsLoading(false)
        } else {
          // todo error handling
        }
      });
    }
    
  })

  const handleModalContent = (e, image) => {
    e.preventDefault();
    modalImageRef.src = image.fullsize;
    modalImageRef.alt = image.alt;
    modalRef.showModal();
  }

  return (
    <>
      <style>
        {styles}
      </style>
      <section class={`${mode} max-w-screen-sm mx-auto`}>
        {isLoading() && Array.from(Array(limit)).map(() =>
          <article class="flex gap-2 p-4 border-b border-slate-300 dark:border-slate-800 animate-pulse">
            <div class="bg-slate-200 w-14 h-14 rounded-full dark:bg-slate-800"></div>
            <div class="flex-1 space-y-2 py-1">
              <div class="grid grid-cols-4 gap-4">
                <div class="h-2 bg-slate-200 rounded col-span-2 dark:bg-slate-800"></div>
              </div>
              <div class="h-2 bg-slate-200 rounded dark:bg-slate-800"></div>
              <div class="h-2 bg-slate-200 rounded dark:bg-slate-800"></div>
              <div class="h-2 bg-slate-200 rounded dark:bg-slate-800"></div>
            </div>
          </article>
        )}
        {!isLoading() && feedData().map(post => <article class="p-4 border-b border-slate-300 dark:border-slate-800">
          { post.isRepost && <p class="flex gap-1 items-center ml-10 text-slate-600 dark:text-slate-400">
            <svg viewBox="0 0 576 512" height="16" width="16" tabindex="-1" class="mr-1"><path fill="currentColor" d="M272 416c17.7 0 32-14.3 32-32s-14.3-32-32-32H160c-17.7 0-32-14.3-32-32V192h32c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-64-64c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l32 0 0 128c0 53 43 96 96 96H272zM304 96c-17.7 0-32 14.3-32 32s14.3 32 32 32l112 0c17.7 0 32 14.3 32 32l0 128H416c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8l-32 0V192c0-53-43-96-96-96L304 96z"></path></svg>
            <span class="text-sm text-slate-500 font-semibold">Reposted by {post.repostBy}</span>
          </p> }
          <div class="flex gap-2">
            <img src={post.avatar} alt="profile picture" class="w-14 h-14 rounded-full" />
            <div>
              <div class="flex max-w-[calc(100vw-96px)] items-center">
                <a href={`https://bsky.app/profile/${post.handle}`} class="text-ellipsis overflow-hidden whitespace-nowrap hover:underline dark:text-white">
                  <span class="font-bold mr-2 dark:text-white">{post.username}</span>
                  <span class="text-slate-500 dark:text-slate-400 text-sm">@{post.handle}</span>
                </a>
                <span class="text-slate-500 dark:text-slate-400 text-sm">
                  <span class="mx-1">·</span>
                  <relative-time datetime={post.createdAt} format="micro" threshold="P30D"></relative-time>
                </span>
              </div>

              <p class="whitespace-pre-wrap dark:text-white">
                {post.text.map(t => t.setInnerHtml
                  ? <span innerHTML={t.val}></span>
                  : <span>{t.val} </span>)}
              </p>

              { post.images.length > 0 && <div class={post.images.length > 1 ? "mt-4 grid grid-cols-2 gap-2" : "mt-4"}>
                { post.images.map(image =>
                  <a href="#open-modal" onClick={e => handleModalContent(e, image)}>
                    <img src={image.thumb} alt={image.alt} class="rounded-md"  />
                  </a>
                )}
              </div> }
            </div>
          </div>
        </article>)}

        <dialog ref={modalRef} class="backdrop:bg-gray-800 backdrop:opacity-90">
          <form class="fixed top-5 right-5">
            <button
              type="submit"
              aria-label="close"
              formmethod="dialog"
              formnovalidate
              class="bg-gray-900 rounded-full w-10 h-10 text-white flex items-center justify-center"
            >
                X
            </button>
          </form>
          <img ref={modalImageRef} src="" alt="" class="max-h-[90vh]"/>
        </dialog>
      </section>
    </>

  );
};

export default BskyEmbed;
