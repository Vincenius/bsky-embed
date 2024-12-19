
# bsky-embed

A web-component to easily embed a bluesky feed.

See it in action on [CodePen](https://codepen.io/Vincenius/pen/RwdXgyw?editors=1000).

```html
  <script type="module" src="https://cdn.jsdelivr.net/npm/bsky-embed/dist/bsky-embed.es.js" async></script>
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
<script type="module" src="https://cdn.jsdelivr.net/npm/bsky-embed/dist/bsky-embed.es.js" async></script>
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
    load-more="true"
    disable-styles="false"
    custom-styles=".border-slate-300 { border-color: red; }"
    date-format='{"type":"absolute","locale":"de-DE","options":{"weekday":"long","year":"numeric","month":"long","day":"numeric"}}'
  >
  </bsky-embed>
```

### Options

#### Required (at least one of these options)

| Option    | Value                       | Default Value |
|-----------|-----------------------------|---------------|
| `username`| User handle                 | -             |
| `feed`    | Feed ID *                   | -             |
| `search`  | Search term (eg. hashtags)  | -             |

<details>
  <summary><i>* How to find your feed id</i></summary>
  Open the URL of your feed. Open the Developer tools and go to the network tab. Find the call from bluesky to the `getFeedGenerator`. It should show the feed id.<br/><br/>
  <img src="https://github.com/Vincenius/bsky-embed/assets/43953403/604fc30c-4c19-4391-aca3-663505c09345" alt="screenshot of the developer tools">
</details>

#### Optional

| Option           | Value                                               | Default Value |
|------------------|-----------------------------------------------------|---------------|
| `limit`          | Positive integer                                    | `10`          |
| `mode`           | `"dark"` or `""`                                    | -             |
| `link-target`    | `"_self"`, `"_blank"`, `"_parent"`, `"_top"`        | `"_self"`     |
| `link-image`     | `"true"` or `"false"`                               | `"false"`     |
| `load-more`      | `"true"` or `"false"`                               | `"false"`     |
| `disable-styles` | `"true"` or `"false"`                               | `"false"`     |
| `custom-styles  `| String representing custom CSS styles               | -             |
| `date-format`    | JSON String with type, locale & options (see [Issue#35](https://github.com/Vincenius/bsky-embed/issues/35))  | `'{"type":"relative"}'` |

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

## Contributors

[![](https://github.com/vincenius.png?size=50)](https://github.com/Vincenius)
[![](https://github.com/NicoNotAvailable.png?size=50)](https://github.com/NicoNotAvailable)
[![](https://github.com/sirteddi.png?size=50)](https://github.com/sirteddi)
[![](https://github.com/antont.png?size=50)](https://github.com/antont)
<a href="https://github.com/RetroGameDeveloper">
  <img src="https://github.com/RetroGameDeveloper.png" width="50" height="50" />
</a>

## License

[MIT](https://choosealicense.com/licenses/mit/)

