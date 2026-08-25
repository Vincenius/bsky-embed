import { defineConfig, type Plugin } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { transform } from 'esbuild';
// import devtools from 'solid-devtools/vite';

/**
 * Vite deliberately skips minification for ES library builds - both its esbuild
 * and its terser path bail out on `build.lib` + `format: 'es'` - so that
 * /*#__PURE__*\/ annotations survive for downstream bundlers.
 *
 * This component is loaded straight from a CDN via <script type="module">, so
 * nothing ever re-bundles it and those annotations buy us nothing. Minify the
 * emitted chunks ourselves instead.
 */
const minifyEsmLib = (): Plugin => ({
  name: 'minify-esm-lib',
  enforce: 'post',
  async generateBundle(_options, bundle) {
    for (const chunk of Object.values(bundle)) {
      if (chunk.type !== 'chunk') continue;
      chunk.code = (await transform(chunk.code, {
        minify: true,
        target: 'esnext',
      })).code;
    }
  },
});

export default defineConfig({
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
    minifyEsmLib(),
  ],
  server: {
    port: 3000,
  },
  build: {
    lib: {
      entry: './src/WebComponent.tsx',
      name: 'bsky-embed',
      // ES only: the UMD format cannot code-split, which would force hls.js
      // back into the main bundle.
      formats: ['es'],
      fileName: (format) => `bsky-embed.${format}.js`
    },
    target: 'esnext',
    // Handled by minifyEsmLib() above.
    minify: false,
    rollupOptions: {
      output: {
        // Keep the lazily loaded hls.js chunk at a stable filename so it can be
        // served from a CDN alongside the entry.
        chunkFileNames: (chunk) => `bsky-embed-${chunk.name.replace(/\.light$/, '')}.js`,
      },
    },
  },
});
