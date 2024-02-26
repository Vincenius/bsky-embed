
# bsky-embed

A web-component to easily embed a bluesky feed.

See it in action on [CodePen](https://codepen.io/Vincenius/pen/RwdXgyw?editors=1000).

```html
  <script src="https://cdn.jsdelivr.net/npm/bsky-embed@0.0.5/dist/bsky-embed.es.js" async></script>
  <bsky-embed
    username="vincentwill.com"
    mode="dark"
    limit="5"
  >
  </bsky-embed>
```

![screenshot-rocks](https://github.com/Vincenius/bsky-embed/assets/43953403/91661dd7-2a2d-47fe-b87e-c4fb6d9207b0)

## Installation

### Option 1. via CDN

```html
<script src="https://cdn.jsdelivr.net/npm/bsky-embed@0.0.5/dist/bsky-embed.es.js" async></script>
```

### Option 2. via npm / yarn etc.
Install via CLI
```bash
  npm i bsky-embed --save
```

Import in any framework using:
```javascript
  import "bsky-embed/dist/bsky-embed.es.js"
```

## Usage

```html
  <bsky-embed
    username="vincentwill.com"
    mode="dark"
    limit="5"
  >
  </bsky-embed>
```

### Options

#### Required
- `username` : the handle of the user whos feed you want to embed. It can be found at the and of the URL (https://bsky.app/profile/__your-handle__)

### Optional
- `limit`: how many posts you want to load (default = 10)
- `mode`: "dark" | "". Use the dark mode if you want to render the embed in front of a dark background.


## Run Locally

The project is written in [Solid.js](https://www.solidjs.com/).

Clone the repository and Run

```bash
  npm i
```

To start the dev server use:

```bash
  npm run dev
```

To build the web component use

```bash
  npm run build
```

The JavaScript file for the web component will be rendered into `./dist/`. You can test the web component with the `test.html` file.


## License

[MIT](https://choosealicense.com/licenses/mit/)

