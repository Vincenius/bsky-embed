import type { Component } from 'solid-js';
import { createSignal, createEffect } from "solid-js";

import styles from './globals.css?inline'
import { agent } from "./lib/api";
import { formatData, getContentAfterLastSlash } from './lib/utils'
import BskyPost from './components/BskyPost';

interface Props {
  username?: string;
  feed?: string;
  limit?: number;
  mode?: 'dark' | '';
  linkTarget?: '_self' | '_blank' | '_parent' | '_top';
  linkImage?: boolean;
  customStyles?: string;
}

const BskyEmbed: Component<Props> = ({
  username,
  feed,
  limit = 10,
  mode = '',
  linkTarget = '_self',
  linkImage = false,
  customStyles = '',
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
    if (!linkImage) {
      e.preventDefault();
      modalImageRef.src = image.fullsize;
      modalImageRef.alt = image.alt;
      modalRef.showModal();
    }
  }

  return (
    <>
      <style>
        {styles}
        {customStyles}
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
        {!isLoading() && feedData().map(post => <BskyPost
            post={post}
            handleModalContent={handleModalContent}
            linkTarget={linkTarget}
          />
        )}

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
