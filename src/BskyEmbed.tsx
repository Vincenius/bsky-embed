import type { Component } from 'solid-js';
import { createSignal, createEffect } from "solid-js";
import "@github/relative-time-element"

import styles from './globals.css?inline'
import { agent } from "./lib/api";

interface Props {
  username: string;
  limit?: number;
  mode?: 'dark' | '';
}

const BskyEmbed: Component<Props> = ({
  username,
  limit = 10,
  mode = '',
}: Props) => {
  let modalRef;
  const [isLoading, setIsLoading] = createSignal(false);
  const [feedData, setFeedData] = createSignal([]);

  createEffect(() => {
      // https://docs.bsky.app/docs/api/app-bsky-feed-get-author-feed
      agent.app.bsky.feed.getAuthorFeed({
        limit,
        actor: username,
        filter: "posts_no_replies",
      }).then(({ success, data }) => {
        if (success) {
          const feed = (data.feed || []).map(({ post }) => ({
            username: post.author.displayName,
            handle: post.author.handle,
            avatar: post.author.avatar, // todo fallback
            text: post.record.text,
            createdAt: post.record.createdAt,
            uri: post.uri,
            images: post?.embed?.images || [],
            // todo images
          }));
          setFeedData(feed)
          setIsLoading(false)
        } else {
          // todo error handling
        }
      });
  })

  const handleModalContent = (e, image) => {
    e.preventDefault();
    modalRef.querySelector('img').src = image.fullsize;
    modalRef.querySelector('img').alt = image.alt;
    modalRef.showModal();
  }

  return (
    <>
      <style>
        {styles}
      </style>
      <section class={`${mode} max-w-screen-sm mx-auto`}>
        {feedData().map(post => <article class="flex gap-2 p-4 border-b border-slate-300 dark:border-slate-800">
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

            <p class="whitespace-pre-wrap dark:text-white">{post.text}</p>

            { post.images.length > 0 && <div class="mt-4">
              { post.images.map(image =>
                <a href="#open-modal" onClick={e => handleModalContent(e, image)}>
                  <img src={image.thumb} alt={image.alt} class="rounded-md"  />
                </a>
              )}
            </div> }
            {/* todo map links */}
            {/* todo image & link to post */}
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
          <img src="" alt="" class="max-h-[90vh]"/>
        </dialog>
      </section>
    </>

  );
};

export default BskyEmbed;
