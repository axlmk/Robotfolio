// HTML templates for project cards and deep dives.
//
// These pure functions turn one project entry from projects.js into an HTML
// string. They are the single source of truth for the card and deep-dive
// markup, used in two places:
//
//   - while editing, app.js calls them to fill the page in the browser, so
//     opening index.html locally shows exactly what will be published;
//   - when publishing, build.js calls the same functions to bake the finished
//     HTML into dist/index.html, so visitors never run any rendering code.
(function (global) {
  // Keeps project text safe if it contains characters like <, >, &, or quotes.
  function escapeHTML(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function externalAttributes(url) {
    return /^https?:\/\//i.test(url) ? ' target="_blank" rel="noopener noreferrer"' : "";
  }

  // The short card shown in the project grid.
  function projectCard(project, index) {
    const hasDeepDive =
      (project.details && project.details.length > 0) ||
      (project.media && project.media.length > 0);

    const coverMedia = project.image
      ? '<img class="cover-image" src="' + escapeHTML(project.image) + '" alt="Screenshot: ' + escapeHTML(project.title) + '" loading="lazy">'
      : '<span class="cover-mark" aria-hidden="true">' + escapeHTML(project.mark || "✳") + "</span>";

    const coverVideo = project.video
      ? '<video class="cover-video" src="' + escapeHTML(project.video) + '" muted loop playsinline preload="none"></video>' +
        '<button class="cover-play" type="button" aria-pressed="false" aria-label="Play video preview of ' + escapeHTML(project.title) + '">Play video</button>'
      : "";

    const readMoreButton = hasDeepDive
      ? '<button class="button button-secondary button-compact" type="button" data-dialog-id="project-dialog-' + index + '">Read more</button>'
      : "";

    return (
      '<article class="project-card" data-category="' + escapeHTML(project.category) + '">' +
        '<div class="project-cover' + (project.image ? " has-image" : "") + '">' +
          coverMedia +
          coverVideo +
          '<span class="cover-number" aria-hidden="true">' + String(index + 1).padStart(2, "0") + "</span>" +
        "</div>" +
        '<div class="project-info">' +
          '<div class="project-meta"><span class="project-tag">' + escapeHTML(project.categoryLabel) + "</span></div>" +
          "<h3>" + escapeHTML(project.title) + "</h3>" +
          "<p>" + escapeHTML(project.description) + "</p>" +
          '<div class="project-bottom">' +
            '<span class="project-tools">' + escapeHTML(project.tools) + "</span>" +
            readMoreButton +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  // The deep-dive pop-over for one project.
  function projectDialog(project, index) {
    const id = "project-dialog-" + index;
    const titleId = "project-dialog-title-" + index;

    const link = project.link
      ? '<span class="heading-line"></span>' +
        '<a class="project-link" href="' + escapeHTML(project.link) + '"' + externalAttributes(project.link) + ">" +
        escapeHTML(project.linkLabel || "View project") + " ↗</a>"
      : "";

    const gallery =
      project.media && project.media.length > 0
        ? '<div class="media-gallery">' +
          project.media.map(function (item) {
            return mediaFigure(item, "");
          }).join("") +
          "</div>"
        : "";

    return (
      '<dialog class="project-dialog" id="' + id + '" aria-labelledby="' + titleId + '">' +
        '<div class="dialog-inner">' +
          '<button class="dialog-close" type="button">Close</button>' +
          '<div class="dialog-header">' +
            '<h3 id="' + titleId + '">' + escapeHTML(project.title) + "</h3>" +
            link +
          "</div>" +
          '<p class="dialog-tools">' + escapeHTML(project.tools) + "</p>" +
          detailsHTML(project.details) +
          gallery +
        "</div>" +
      "</dialog>"
    );
  }

  // Deep-dive content in order: strings become paragraphs, media objects
  // become figures, so text, screenshots, and clips can be interleaved freely.
  function detailsHTML(details) {
    return (details || []).map(function (entry) {
      if (entry && typeof entry === "object") {
        return mediaFigure(entry, "media-item-between");
      }
      return '<p class="dialog-text">' + escapeHTML(entry) + "</p>";
    }).join("");
  }

  // One screenshot or clip, with its caption. extraClass lets the same figure
  // sit between paragraphs (media-item-between) or in the gallery grid.
  function mediaFigure(item, extraClass) {
    const classes =
      "media-item" +
      (item.type === "video" ? " media-item-video" : "") +
      (extraClass ? " " + extraClass : "");

    const media = item.type === "video"
      ? '<video class="media-video" src="' + escapeHTML(item.src) + '" controls playsinline preload="none"' +
        (item.poster ? ' poster="' + escapeHTML(item.poster) + '"' : "") + "></video>"
      : '<img class="media-image" src="' + escapeHTML(item.src) + '" alt="' + escapeHTML(item.caption || "Project screenshot") + '" loading="lazy">';

    const caption = item.caption
      ? "<figcaption>" + escapeHTML(item.caption) + "</figcaption>"
      : "";

    return '<figure class="' + classes + '">' + media + caption + "</figure>";
  }

  global.portfolioTemplates = { projectCard: projectCard, projectDialog: projectDialog };
})(typeof window !== "undefined" ? window : globalThis);
