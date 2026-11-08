# Game Developer Portfolio

A small, static portfolio made with plain HTML, CSS, and JavaScript: no
framework and no packages to install. A zero-dependency Node script (run
automatically by GitHub Actions) bakes the project data into the HTML when
publishing, so visitors get a finished page.

## Personalize the portfolio

1. Update the name, introduction, email address, LinkedIn URL, and GitHub URL in
   `index.html`.
2. Replace the sample entries in `projects.js` with your own work. Each entry
   accepts a title, category (`graphics`, `unreal`, or `unity`), category label,
   short description, tools, a small cover mark, and an optional project link.
   Entries can also show a screenshot —
   see "Show screenshots and videos" below. Set `sample` to `true` for example
   content; omit it or set it to `false` for real projects. Copy an entry to
   add a project or delete one to remove it.
3. Replace the sample experience and contact details in `resume.html`. The
   portfolio includes a resume preview and a download link to this file.
4. Update the sample resume preview in `index.html` to match `resume.html`.
5. Replace the portfolio title and description in the `<head>` of `index.html`.

The project cards intentionally identify themselves as samples until the example
entries are replaced. No project artwork or personal details are fabricated.

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
],
media: []
```

An optional `media` list adds a gallery of further screenshots and clips
after the text, same object shape as above. Leave `details` and `media` empty
(`[]`) for a simple card with no deep-dive button.

The deep dive opens in a pop-over over the page when the reader clicks
"Read more" on the card. The main page stays untouched, and the deep-dive
media only loads when someone opens it. Guidelines for media files are in
[media/README.md](./media/README.md).

## Preview locally

Open `index.html` in a browser. The site uses relative asset paths and does not
need a server, package installation, or compilation. While editing, the project
cards are generated in the browser from `projects.js`; the published site gets
the same HTML baked in (see below). The 3D wordmark in the
header is the one exception: browsers block its ES module and `media/boo.glb`
fetch over `file://`, so over a plain file open it falls back to the plain
"DEV." text. To see the rotating model locally, serve the folder once, for
example `python -m http.server` and open `http://localhost:8000`.

## How publishing builds the page

Editing stays data-driven (`projects.js`), but visitors get a page that is
already assembled:

- `templates.js` holds the HTML for one project card and one deep dive. It is
  the single source of truth for that markup.
- While editing locally, `app.js` calls these templates to fill the page in
  the browser, so you always see exactly the page that will be published.
- On every push to `main`, the GitHub Actions workflow (`.github/workflows/
  deploy.yml`) runs `node build.js`, which bakes the finished cards and deep
  dives into `dist/index.html` and removes `projects.js` and `templates.js`
  from it. Only `app.js` is left, and just to wire the interactions (filters,
  video buttons, deep dives). GitHub Pages then serves `dist/`.
- The shipped text files (`index.html`, `styles.css`, `app.js`, `avatar.js`)
  are also minified: comments, indentation, and needless spaces are removed,
  with string contents left untouched so nothing breaks. The sources in the
  repository keep all comments and formatting for comfortable editing; only
  what visitors download is compact. `resume.html` ships as is, since it is
  a standalone document meant to be read directly.

The generated `dist/` folder is never committed; the source files stay exactly
as you edit them. To check the published page locally, run `node build.js` and
open `dist/index.html`.

## Publish with GitHub Pages

The workflow deploys automatically on every push to `main`. Set it up once:
in the repository on GitHub, open **Settings → Pages**, and under **Build and
deployment** choose **GitHub Actions** as the source. Afterwards, every push to
`main` rebuilds and republishes the site on its own.

## License

The website source code is available under the MIT License. Project work,
portfolio content, screenshots, artwork, and third-party materials are excluded
unless their respective files say otherwise. See [LICENSE](./LICENSE).
