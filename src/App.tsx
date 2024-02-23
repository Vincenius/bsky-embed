import type { Component } from 'solid-js';
import { createSignal, createEffect } from "solid-js";

import logo from './logo.svg';
import styles from './App.module.css?inline';
import classes from './App.module.css';
import { agent } from "./lib/api";

// planned options - username, limit, theme, debug (show generic vs real error)
const App: Component = () => {
  const [isLoading, setIsLoading] = createSignal(false);
  const [feedData, setFeedData] = createSignal([]);

  createEffect(() => {
      agent.app.bsky.feed.getAuthorFeed({
        limit: 10,
        actor: "vincentwill.com",
      }).then(({ success, data }) => {
        if (success) {
          const feed = (data.feed || []).map(({ post }) => ({
            username: post.author.displayName,
            profilePicture: post.author.avatar, // todo fallback
            text: post.record.text,
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
      <div class={classes.container}>
        {feedData().map(post => post.text)}
      </div>
    </>

  );
};

export default App;
