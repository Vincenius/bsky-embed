import type { Component } from 'solid-js';
import { createSignal, createEffect } from "solid-js";
import "@github/relative-time-element"

import logo from './logo.svg';
import styles from './App.module.css?inline';
import classes from './App.module.css';
import { agent } from "./lib/api";

// planned options - username, limit, theme, debug (show generic vs real error)
const App: Component = () => {
  const [isLoading, setIsLoading] = createSignal(false);
  const [feedData, setFeedData] = createSignal([]);

  createEffect(() => {
      // https://docs.bsky.app/docs/api/app-bsky-feed-get-author-feed
      agent.app.bsky.feed.getAuthorFeed({
        limit: 10,
        actor: "vincentwill.com",
        filter: "posts_no_replies",
      }).then(({ success, data }) => {
        if (success) {
          const feed = (data.feed || []).map(({ post }) => ({
            username: post.author.displayName,
            handle: post.author.handle,
            picture: post.author.avatar, // todo fallback
            text: post.record.text,
            createdAt: post.record.createdAt,
            uri: post.uri,
            // todo images
          }));
          setFeedData(feed)
          setIsLoading(false)
        } else {
          // todo error handling
        }
      });
  })

  return (
    <>
      <style>
        {styles}
      </style>
      <section>
        {feedData().map(post => <figure class={classes.post}>
            <img src={post.picture} alt="profile picture" class={classes.picture} />
            <blockquote>
              <span>
                <a href="#" class={classes.profileLink}>
                  <span class={classes.username}>{post.username}</span>
                  <span class={classes.handle}>@{post.handle}</span>
                </a>
                ·
                <span class={classes.createdAt}>
                  <relative-time datetime={post.createdAt} format="micro" threshold="P30D"></relative-time>
                </span>
              </span>
              <p class={classes.text}>{post.text}</p>
              {/* todo map linebreaks & links */}
              {/* todo image & link to post */}
            </blockquote>
        </figure>
        )}
      </section>
    </>

  );
};

export default App;
