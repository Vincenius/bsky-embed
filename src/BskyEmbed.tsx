import { Component } from 'solid-js';
import { createSignal, createEffect } from "solid-js";
import styles from './globals.css?inline'
import { agent } from "./lib/api";
import { formatData } from './lib/utils'
import { DateFormat } from './lib/types'
import BskyPost from './components/BskyPost';

interface Props {
  username?: string;
  feed?: string;
  search?: string;
  limit?: number;
  mode?: 'dark' | '';
  linkTarget?: '_self' | '_blank' | '_parent' | '_top';
  linkImage?: boolean;
  disableStyles?: boolean;
  customStyles?: string;
  loadMore?: boolean;
  dateFormat?: DateFormat;
}

const BskyEmbed: Component<Props> = ({
  username,
  feed,
  limit = 10,
  mode = '',
  linkTarget = '_self',
  linkImage = false,
  customStyles = '',
  disableStyles = false,
  search,
  loadMore = false,
  dateFormat,
}: Props) => {
  let modalRef: HTMLDialogElement | null = null;
  let modalImageRef: HTMLImageElement | null = null;
  const [isLoading, setIsLoading] = createSignal(false);
  const [feedData, setFeedData] = createSignal<any[]>([]);
  const [displayLimit] = createSignal(limit);
  const [cursor, setCursor] = createSignal<string | undefined>(undefined);

  createEffect((): void => {
    setIsLoading(true);

    // https://docs.bsky.app/docs/api/app-bsky-feed-get-author-feed
    fetchData();
  }, [username, feed, search, displayLimit]);

  const fetchData = async (cursor?: string) => {
    if (username) {
      agent.app.bsky.feed.getAuthorFeed({
        limit: displayLimit(),
        actor: username,
        filter: "posts_no_replies",
        cursor
      }).then(({success, data}): void => {
        if (success) {
          const feed = formatData(data)
          loadFeed(feed)
          setIsLoading(false)
          setCursor(data.cursor)
        } else {
          // todo error handling
        }
      });
    } else if (feed) {
      agent.app.bsky.feed.getFeed({
        limit: displayLimit(),
        feed,
        cursor
      }).then(({success, data}): void => {
        if (success) {
          const feed = formatData(data)
          loadFeed(feed)
          setIsLoading(false)
          setCursor(data.cursor)
        } else {
          // todo error handling
        }
      });
    } else if (search) {
      agent.app.bsky.feed.searchPosts({
        limit: displayLimit(),
        q: search,
        cursor
      }).then(({success, data}): void => {
        if (success) {
          const mappedData = {...data, feed: data.posts.map(p => ({post: p}))}
          const feed = formatData(mappedData)
          loadFeed(feed)
          setIsLoading(false)
          setCursor(data.cursor)
        } else {
          // todo error handling
        }
      });
    }
  };

  const handleModalContent = (e: Event, image: { fullsize: string; alt: string; }): void => {
    if (!linkImage && modalRef && modalImageRef) {
      e.preventDefault();
      modalImageRef.src = image.fullsize;
      modalImageRef.alt = image.alt;
      modalRef.showModal();
    }
  }

  const loadMorePosts = () => {
    setIsLoading(true);
    fetchData(cursor());
  };

  const loadFeed = (newData: any[]) => {
    const updatedFeed = [...feedData(), ...newData];
    setFeedData(updatedFeed);
  };

  return (
      <>
        {!disableStyles && <style>
          {styles}
        </style>}
        {customStyles && <style>
          {customStyles}
        </style>}
        <section class={`${mode} max-w-screen-sm mx-auto flex flex-col items-center`}>
          {(feedData().length > 0) && feedData().map((post, lastIndex) =>
              <div id={`post-${lastIndex}`} class="w-full">
                <BskyPost
                  post={post}
                  handleModalContent={handleModalContent}
                  linkTarget={linkTarget}
                  dateFormat={dateFormat}
                />
              </div>
          )}

          {isLoading() && Array.from(Array(limit)).map(() =>
            <article class="w-full flex gap-2 p-4 border-b border-slate-300 dark:border-slate-800 animate-pulse">
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

          <dialog ref={(el: HTMLDialogElement) => modalRef = el} class="backdrop:bg-gray-800 backdrop:opacity-90">
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
            <img ref={(el: HTMLImageElement) => modalImageRef = el} src="" alt="" class="max-h-[90vh]"/>
          </dialog>

          { loadMore && cursor() && <div class="mt-8 mb-16">
            <button id="bsky-load-more" onClick={loadMorePosts} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Load More Posts
            </button>
          </div> }
        </section>
      </>

  );
};

export default BskyEmbed;
