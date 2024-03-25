import type { Component } from 'solid-js';
import BskyEmbed from './BskyEmbed';
import './globals.css'

const App: Component = () => {
  const options = {
    username: "vincentwill.com",
    feed: "at://did:plc:jcoy7v3a2t4rcfdh6i4kza25/app.bsky.feed.generator/astro",
    mode: "",
    limit: 10,
    linkTarget: "_blank"
  }

  return (
    <main class={options.mode === 'dark' ? 'bg-slate-900' : 'bg-slate-100'}>
      <div class="">
        <BskyEmbed
          username={options.username}
          // feed={options.feed}
          limit={options.limit}
          mode={options.mode}
          // openPostOnImageClick={true}
          linkTarget={options.linkTarget}
        />
      </div>
    </main>
  );
};

export default App;
