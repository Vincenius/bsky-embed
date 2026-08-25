// `hls.js/light` is declared in the package's `exports` map, which TypeScript
// only follows under moduleResolution "bundler"/"node16" - this project is on
// "node". Vite resolves it correctly at build time, so point the types at the
// full build: the light bundle has the same API, minus alt-audio, subtitle and
// EME support, none of which Bluesky video uses.
declare module 'hls.js/light' {
  export * from 'hls.js';
  export { default } from 'hls.js';
}
