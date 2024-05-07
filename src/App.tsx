import type { Component } from 'solid-js';
import BskyEmbed from './BskyEmbed';
import './globals.css'

const App: Component = () => {
  const options: {
    username: string,
    feed: string,
    search: string,
    mode: 'dark' | '',
    limit: number,
    linkTarget: '_self' | '_blank' | '_parent' | '_top',
    loadMore: boolean,
  } = {
    username: "vincentwill.com",
    feed: "at://did:plc:jcoy7v3a2t4rcfdh6i4kza25/app.bsky.feed.generator/astro",
    search: "#buildinpublic",
    mode: "",
    limit: 2,
    linkTarget: "_self",
    loadMore: true,
  }

  return (
    <main class={options.mode === 'dark' ? 'bg-slate-900' : 'bg-slate-100'}>
      <div class="">
        <BskyEmbed
          // username={options.username}
          // feed={options.feed}
          search={options.search}
          limit={options.limit}
          mode={options.mode}
          linkImage={true}
          linkTarget={options.linkTarget}
          loadMore={options.loadMore}
          // customStyles=".border-slate-300 { color: green; }"
        />
      </div>
    </main>
  );
};

export default App;
