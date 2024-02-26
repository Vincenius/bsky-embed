import type { Component } from 'solid-js';
import BskyEmbed from './BskyEmbed';
import './globals.css'

// planned options - username, limit, theme, debug (show generic vs real error)
const App: Component = () => {
  const options = {
    username: "vincentwill.com",
    mode: ""
  }

  return (
    <main class={options.mode === 'dark' ? 'bg-slate-900' : 'bg-slate-100'}>
      <div class="">
        <BskyEmbed username={options.username} limit={10} mode={options.mode} />
      </div>
    </main>
  );
};

export default App;
