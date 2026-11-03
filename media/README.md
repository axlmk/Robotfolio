# Project media

Screenshots and clips used by the project cards and the "Read more" deep dives.

- Put files here, e.g. `media/opengl-sandbox.jpg` and `media/opengl-sandbox.mp4`.
- Card media: reference them from `projects.js` with the `image` and `video`
  fields of a project.
- Deep-dive media: add them to a project's `details` list to show them
  between the paragraphs, or to the `media` list for a gallery after the
  text, e.g. `{ type: "image", src: "media/opengl-sandbox-2.jpg", caption: "..." }`.
- Screenshots: 16:9, about 1200 pixels wide, compressed JPG (a few hundred KB
  max) so the page stays fast to load.
- Videos: 10-30 seconds, MP4 (H.264), a few MB max. The card player is muted;
  the deep-dive player has controls, so sound is fine there too. Both only
  download when a reader clicks play.
- Keep names lowercase with hyphens to avoid broken links on GitHub Pages.

