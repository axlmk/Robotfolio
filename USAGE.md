## Adding new project

Replace the sample entries in `projects.js` with the new project. Each entry accepts a title, a list of categories (one or more of `graphics`, `unreal`, `unity`), short description, tools, an optional project link, and a `date` shown in the card corner. A card shows a tag per category and appears under every filter it matches. A filter button can also group several tags (comma-separated), like `data-filter="vr,ar"` for an XR button. Entries can also show a screenshot — see "Show screenshots and videos" below. Set `sample` to `true` for example content; omit it or set it to `false` for real projects.

## Show screenshots and videos

Each project in `projects.js` accepts optional media fields:

- `image`: a screenshot shown directly on the project card. This is the
  recruiter-facing visual: it loads with the page and costs no extra clicks.
Put the files in `media/` and reference them like
`image: "media/my-project.jpg"`. Projects without media keep the generated
fallback cover. Guidelines for sizes and formats are in
[media/README.md](./media/README.md).

## Write a project deep dive

A project can also have a deep dive: extra text and as many pictures and
videos as you want. In `projects.js`, fill in the optional `details` list.
Each entry is either a string (shown as a paragraph) or a media object
(shown in place, so pictures and clips sit between the paragraphs):

```js
details: [
  "A paragraph about the project.",
  { type: "image", src: "media/extra-1.jpg", caption: "Text under the picture" },
  "A paragraph between the picture and the clip.",
  { type: "video", src: "media/clip-1.mp4", poster: "media/extra-1.jpg", caption: "Text under the clip" }
]
```

Leave `details` empty (`[]`) for a simple card with no deep-dive button.

The deep dive opens in a pop-over over the page when the reader clicks
"Read more" on the card. The main page stays untouched. Guidelines for media files are in
[media/README.md](./media/README.md).

## Give a project its own address

Give a project a `slug` and its deep dive becomes reachable through the
page address: `slug: "frank"` makes `your-site.github.io/#frank` open
the Frank deep dive on arrival. Clicking its Read more button moves
the browser to that address, and the back and
forward buttons open and close the deep dives. A slug only matters for
projects with a deep dive; use lowercase words joined by hyphens.