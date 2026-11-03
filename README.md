# Game Developer Portfolio

A small, static portfolio made with plain HTML, CSS, and JavaScript. It has no
build step or runtime dependencies and can be hosted directly with GitHub Pages.

## Personalize the portfolio

1. Update the name, introduction, email address, LinkedIn URL, and GitHub URL in
   `index.html`.
2. Replace the sample entries in `projects.js` with your own work. Each entry
   accepts a title, category (`graphics`, `unreal`, or `unity`), category label,
   short description, tools, a small cover mark, and an optional project link.
   Entries can also show a screenshot and an optional playable video clip —
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

Each project in `projects.js` accepts two optional media fields:

- `image`: a screenshot shown directly on the project card. This is the
  recruiter-facing visual: it loads with the page and costs no extra clicks.
- `video`: a short clip the reader can play with a small button on the card.
  It plays muted and looped inside the card, and only downloads when someone
  clicks play, so it never slows the page down.

Put the files in `media/` and reference them like
`image: "media/my-project.jpg"`. Projects without media keep the generated
fallback cover. Guidelines for sizes and formats are in
[media/README.md](./media/README.md).

## Preview locally

Open `index.html` in a browser. The site uses relative asset paths and does not
need a server, package installation, or compilation.

## Publish with GitHub Pages

In the repository on GitHub, open **Settings → Pages**, choose **Deploy from a
branch**, select `main` and the `/ (root)` folder, then save. GitHub Pages will
publish the static files from the repository root.

## License

The website source code is available under the MIT License. Project work,
portfolio content, screenshots, artwork, and third-party materials are excluded
unless their respective files say otherwise. See [LICENSE](./LICENSE).
