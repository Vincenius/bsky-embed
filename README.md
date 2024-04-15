
# bsky-embed

A web-component to easily embed a bluesky feed.

See it in action on [CodePen](https://codepen.io/Vincenius/pen/RwdXgyw?editors=1000).

```html
  <script src="https://cdn.jsdelivr.net/npm/bsky-embed@0.1.2/dist/bsky-embed.es.js" async></script>
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
<script src="https://cdn.jsdelivr.net/npm/bsky-embed@0.1.2/dist/bsky-embed.es.js" async></script>
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
    feed="at://...(decide between username, feed, or search)"
    search="#BuildInPublic (decide between username, feed, and search)"
    mode="dark"
    limit="5"
    link-target="_blank"
    link-image="true"
    custom-styles=".border-slate-300 { border-color: red; }"
  >
  </bsky-embed>
```

### Options

#### Required (at least one of these options)
- `username`: the handle of the user whos feed you want to embed. It can be found at the and of the URL (https://bsky.app/profile/__your-handle__)
- `feed`: the id of your feed <details>
  <summary><i>How to find your feed id</i></summary>
  Open the URL of your feed. Open the Developer tools and go to the network tab. Find the call from bluesky to the `getFeedGenerator`. It should show the feed id.<br/><br/>
  <img src="https://github.com/Vincenius/bsky-embed/assets/43953403/604fc30c-4c19-4391-aca3-663505c09345" alt="screenshot of the developer tools">
</details>
- `search`: the search term you want to use for displaying the result feed. It works with hashtags.

### Optional
- `limit`: how many posts you want to load (default = 10)
- `mode`: "dark" | "". Use the dark mode if you want to render the embed in front of a dark background.
- `link-target`: "_self" | "_blank" | "_parent" | "_top". How the links to the post or Bluesky user should be opened (default = "_self")
- `link-image`: "true" | "false". If the image should go to the bluesky post instead of opening the lightbox. (default = "false")
- `custom-styles`: A string that will overwrite the default styles.

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

