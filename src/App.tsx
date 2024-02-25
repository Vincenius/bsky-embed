import type { Component } from 'solid-js';
import BskyEmbed from './BskyEmbed';

// planned options - username, limit, theme, debug (show generic vs real error)
const App: Component = () => {
  const mode = 'dark'

  return (
    <main style={{ background: mode === 'dark' ? "#000" : '#fff' }}>
      <BskyEmbed username="danabra.mov" limit={10} mode={mode} />
    </main>
  );
};

export default App;
