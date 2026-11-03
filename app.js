(function () {
  const projectGrid = document.querySelector("#project-grid");
  const filterButtons = document.querySelectorAll("[data-filter]");
  const projectDialog = document.querySelector("#project-dialog");
  const projects = window.portfolioProjects;

  if (!projectGrid || !Array.isArray(projects)) {
    throw new Error("Project list could not be loaded. Check projects.js.");
  }

  // Builds the opt-in video player for a card cover: a small button that
  // swaps the screenshot for a muted, looping clip, and swaps it back.
  // The video file only downloads when the reader clicks play.
  function createCoverVideo(project, cover) {
    const video = document.createElement("video");
    video.className = "cover-video";
    video.src = project.video;
    video.muted = true;
    video.loop = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("preload", "none");
    if (project.image) {
      video.setAttribute("poster", project.image);
    }

    const playButton = document.createElement("button");
    playButton.type = "button";
    playButton.className = "cover-play";
    playButton.textContent = "Play video";
    playButton.setAttribute("aria-pressed", "false");
    playButton.setAttribute("aria-label", "Play video preview of " + project.title);

    function setPlaying(playing) {
      cover.classList.toggle("is-playing", playing);
      playButton.textContent = playing ? "Stop video" : "Play video";
      playButton.setAttribute("aria-pressed", String(playing));
      playButton.setAttribute(
        "aria-label",
        (playing ? "Stop video preview of " : "Play video preview of ") + project.title
      );

      if (playing) {
        // Browsers can refuse playback; a failed play leaves the screenshot visible.
        video.play().catch(function () {});
      } else {
        video.pause();
      }
    }

    playButton.addEventListener("click", function () {
      setPlaying(!cover.classList.contains("is-playing"));
    });

    cover.append(video, playButton);
  }

  // Fills the shared <dialog> with the deep dive for one project and opens it.
  // A project has a deep dive when it has details paragraphs or gallery media.
  function openProjectDialog(project) {
    const content = document.querySelector("#project-dialog-content");
    content.replaceChildren();

    const eyebrow = document.createElement("p");
    eyebrow.className = "eyebrow";
    eyebrow.textContent = "PROJECT DEEP DIVE";
    content.append(eyebrow);

    const title = document.createElement("h3");
    title.id = "project-dialog-title";
    title.textContent = project.title;
    content.append(title);

    const tools = document.createElement("p");
    tools.className = "dialog-tools";
    tools.textContent = project.tools;
    content.append(tools);

    if (project.image) {
      const hero = document.createElement("img");
      hero.className = "dialog-hero";
      hero.src = project.image;
      hero.alt = "Main screenshot: " + project.title;
      content.append(hero);
    }

    appendDetailEntries(content, project.details, "dialog-text");

    if (project.media && project.media.length > 0) {
      const gallery = document.createElement("div");
      gallery.className = "media-gallery";
      project.media.forEach(function (item) {
        gallery.append(createGalleryItem(item));
      });
      content.append(gallery);
    }

    const footer = document.createElement("div");
    footer.className = "dialog-footer";

    if (project.link) {
      const link = document.createElement("a");
      link.className = "project-link";
      link.href = project.link;
      link.textContent = (project.linkLabel || "View project") + " ↗";
      if (/^https?:\/\//i.test(project.link)) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
      footer.append(link);
    }

    const hint = document.createElement("p");
    hint.className = "dialog-hint";
    hint.textContent = "Press Escape or click outside to close.";
    footer.append(hint);

    content.append(footer);
    projectDialog.showModal();
  }

  // Renders a deep-dive "details" list in order: plain strings become
  // paragraphs, media objects ({ type: "image" | "video", src, ... }) become
  // figures, so text, screenshots, and clips can be interleaved freely.
  function appendDetailEntries(container, entries, textClass, autoplayLoop) {
    (entries || []).forEach(function (entry) {
      if (entry && typeof entry === "object") {
        const figure = createGalleryItem(entry, autoplayLoop);
        figure.classList.add("media-item-between");
        container.append(figure);
      } else {
        const paragraph = document.createElement("p");
        paragraph.className = textClass;
        paragraph.textContent = entry;
        container.append(paragraph);
      }
    });
  }

  // One screenshot or clip in a deep-dive view, with its caption. Shared by
  // the pop-over deep dive and the inline card details. With autoplayLoop,
  // the clip plays muted and looping without controls (the inline style);
  // otherwise it gets standard controls (the pop-over).
  function createGalleryItem(item, autoplayLoop) {
    const figure = document.createElement("figure");
    figure.className = item.type === "video" ? "media-item media-item-video" : "media-item";

    if (item.type === "video") {
      const video = document.createElement("video");
      video.className = "media-video";
      video.src = item.src;
      video.controls = !autoplayLoop;
      video.loop = Boolean(autoplayLoop);
      video.muted = Boolean(autoplayLoop);
      video.setAttribute("playsinline", "");
      // The clip only downloads when it is played (on open for the inline
      // style, on play for the pop-over).
      video.setAttribute("preload", "none");
      if (item.poster) {
        video.setAttribute("poster", item.poster);
      }
      figure.append(video);
    } else {
      const image = document.createElement("img");
      image.className = "media-image";
      image.src = item.src;
      image.alt = item.caption || "Project screenshot";
      image.loading = "lazy";
      figure.append(image);
    }

    if (item.caption) {
      const caption = document.createElement("figcaption");
      caption.textContent = item.caption;
      figure.append(caption);
    }

    return figure;
  }

  // Second presentation style: the whole card is the toggle. An invisible
  // real button is stretched over each of the two views (see .card-hit-area
  // in styles.css), so clicking anywhere on the card swaps between the base
  // view and the details view - a real button keeps native keyboard and
  // screen-reader support. The views live in one grid whose rows cross-morph
  // in CSS; the details row sits on top, so they expand from the card's top
  // edge. Clips in the details download and play (muted, looping) only when
  // the card expands, and stop when it folds back.
  function createInlineDetails(project, index) {
    const toggleId = "project-details-toggle-" + index;
    const drawerId = "project-drawer-" + index;
    const titleId = "project-drawer-title-" + index;

    function createHitArea(label) {
      const hitArea = document.createElement("button");
      hitArea.type = "button";
      hitArea.className = "card-hit-area";
      hitArea.setAttribute("aria-expanded", "false");
      hitArea.setAttribute("aria-controls", drawerId);
      hitArea.setAttribute("aria-label", label + ": " + project.title);
      return hitArea;
    }

    const expandButton = createHitArea("Project details");
    expandButton.id = toggleId;

    const collapseButton = createHitArea("Hide details");

    const drawer = document.createElement("div");
    drawer.className = "card-drawer";
    drawer.id = drawerId;
    drawer.setAttribute("role", "region");
    drawer.setAttribute("aria-labelledby", titleId);
    drawer.tabIndex = -1; // Receives focus when the details open.

    const inner = document.createElement("div");
    inner.className = "card-drawer-inner";
    drawer.append(collapseButton, inner);

    const heading = document.createElement("p");
    heading.className = "card-drawer-heading";
    heading.textContent = "MORE ABOUT THIS PROJECT";
    inner.append(heading);

    const title = document.createElement("h3");
    title.className = "card-drawer-title";
    title.id = titleId;
    title.textContent = project.title;
    inner.append(title);

    const tools = document.createElement("p");
    tools.className = "card-drawer-tools";
    tools.textContent = project.tools;
    inner.append(tools);

    // Clips play muted and looping, without controls, in the details view.
    appendDetailEntries(inner, project.details, "card-drawer-text", true);

    if (project.link) {
      const footer = document.createElement("div");
      footer.className = "card-drawer-footer";

      const link = document.createElement("a");
      link.className = "project-link";
      link.href = project.link;
      link.textContent = (project.linkLabel || "View project") + " ↗";
      if (/^https?:\/\//i.test(project.link)) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
      footer.append(link);
      inner.append(footer);
    }

    function setExpanded(opening) {
      const views = drawer.closest(".card-views");
      drawer.classList.toggle("is-open", opening);
      if (views) {
        views.classList.toggle("is-open", opening);
      }
      expandButton.setAttribute("aria-expanded", String(opening));
      collapseButton.setAttribute("aria-expanded", String(opening));

      if (opening) {
        // A cover clip stops when the base card folds away.
        const base = drawer.nextElementSibling;
        if (base) {
          base.querySelectorAll("video").forEach(function (video) {
            video.pause();
          });
        }
        // Clips in the details download now and play muted and looping.
        drawer.querySelectorAll("video").forEach(function (video) {
          video.play().catch(function () {});
        });
        // Focus without scrolling: the details start right where the reader
        // clicked, so a focus-induced scroll would only jolt the page.
        drawer.focus({ preventScroll: true });
      } else {
        // No clip keeps playing after the details are folded back.
        drawer.querySelectorAll("video").forEach(function (video) {
          video.pause();
        });
        // At this instant the base view still sits far below the details
        // that are folding away, so a plain focus() would scroll the page
        // down to that transient position - the reader would end up far
        // below the card. Focus without scrolling, then bring the card back
        // into view only if the reader had scrolled deep into the details.
        expandButton.focus({ preventScroll: true });
        const card = drawer.closest(".project-card");
        if (card) {
          card.scrollIntoView({ block: "nearest" });
        }
      }
    }

    expandButton.addEventListener("click", function () {
      setExpanded(true);
    });

    collapseButton.addEventListener("click", function () {
      setExpanded(false);
    });

    drawer.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && drawer.classList.contains("is-open")) {
        setExpanded(false);
      }
    });

    return { drawer: drawer, expandButton: expandButton };
  }

  function createProjectCard(project, index) {
    const article = document.createElement("article");
    article.className = "project-card";

    const cover = document.createElement("div");
    cover.className = "project-cover";

    if (project.image) {
      // A real screenshot replaces the decorative fallback cover.
      cover.classList.add("has-image");

      const image = document.createElement("img");
      image.className = "cover-image";
      image.src = project.image;
      image.alt = "Screenshot: " + project.title;
      image.loading = "lazy";
      cover.append(image);
    } else {
      const mark = document.createElement("span");
      mark.className = "cover-mark";
      mark.setAttribute("aria-hidden", "true");
      mark.textContent = project.mark || "✳";
      cover.append(mark);
    }

    const type = document.createElement("span");
    type.className = "cover-type";
    type.setAttribute("aria-hidden", "true");
    type.textContent = project.categoryLabel;
    cover.append(type);

    const number = document.createElement("span");
    number.className = "cover-number";
    number.setAttribute("aria-hidden", "true");
    number.textContent = String(index + 1).padStart(2, "0");
    cover.append(number);

    if (project.video) {
      createCoverVideo(project, cover);
    }

    const info = document.createElement("div");
    info.className = "project-info";

    const meta = document.createElement("div");
    meta.className = "project-meta";

    const category = document.createElement("span");
    category.className = "project-tag";
    category.textContent = project.categoryLabel;
    meta.append(category);

    if (project.sample) {
      const sample = document.createElement("span");
      sample.className = "project-tag sample-tag";
      sample.textContent = "Sample — replace me";
      meta.append(sample);
    }

    const title = document.createElement("h3");
    title.textContent = project.title;

    const description = document.createElement("p");
    description.textContent = project.description;

    const bottom = document.createElement("div");
    bottom.className = "project-bottom";

    const tools = document.createElement("span");
    tools.className = "project-tools";
    tools.textContent = project.tools;
    bottom.append(tools);

    const hasDeepDive =
      (project.details && project.details.length > 0) ||
      (project.media && project.media.length > 0);

    if (hasDeepDive && project.deepDiveStyle !== "inline" && projectDialog) {
      const readMore = document.createElement("button");
      readMore.type = "button";
      readMore.className = "read-more-button";
      readMore.textContent = "Read more";
      readMore.addEventListener("click", function () {
        openProjectDialog(project);
      });
      bottom.append(readMore);
    }

    if (project.link) {
      const link = document.createElement("a");
      link.className = "project-link";
      link.href = project.link;
      link.textContent = (project.linkLabel || "View project") + " ↗";
      if (/^https?:\/\//i.test(project.link)) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
      bottom.append(link);
    }

    info.append(meta, title, description, bottom);

    if (hasDeepDive && project.deepDiveStyle === "inline") {
      // The card swaps between two views: the details view and, below it,
      // the base card (cover + info), cross-morphed by the .card-views grid
      // in CSS. The details view is the top row, so it expands from the
      // card's top edge. Both views are covered by an invisible toggle
      // button, making the whole card clickable.
      const inlineDetails = createInlineDetails(project, index);

      const base = document.createElement("div");
      base.className = "card-view-base";
      base.append(inlineDetails.expandButton, cover, info);

      const views = document.createElement("div");
      views.className = "card-views";
      views.append(inlineDetails.drawer, base);
      article.append(views);
    } else {
      article.append(cover, info);
    }

    return article;
  }

  function renderProjects(filter) {
    const visibleProjects = projects.filter(function (project) {
      return filter === "all" || project.category === filter;
    });

    projectGrid.replaceChildren();

    if (visibleProjects.length === 0) {
      const message = document.createElement("p");
      message.className = "empty-message";
      message.textContent = "No projects in this category yet.";
      projectGrid.append(message);
      return;
    }

    visibleProjects.forEach(function (project, index) {
      projectGrid.append(createProjectCard(project, index));
    });
  }

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const selectedFilter = button.dataset.filter;

      filterButtons.forEach(function (filterButton) {
        const isSelected = filterButton === button;
        filterButton.classList.toggle("is-active", isSelected);
        filterButton.setAttribute("aria-pressed", String(isSelected));
      });

      renderProjects(selectedFilter);
    });
  });

  if (projectDialog) {
    document.querySelector("#dialog-close").addEventListener("click", function () {
      projectDialog.close();
    });

    // Clicking the dark area around the deep dive closes it.
    projectDialog.addEventListener("click", function (event) {
      if (event.target === projectDialog) {
        projectDialog.close();
      }
    });

    // No clip keeps playing (or sounding) after the deep dive closes.
    projectDialog.addEventListener("close", function () {
      projectDialog.querySelectorAll("video").forEach(function (video) {
        video.pause();
      });
    });
  }

  renderProjects("all");
})();
