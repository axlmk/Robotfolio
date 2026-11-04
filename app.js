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
        video.play().catch(function () { });
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

    const header = document.createElement("div");
    header.className = "dialog-header";

    const title = document.createElement("h3");
    title.id = "project-dialog-title";
    title.textContent = project.title;
    header.append(title);

    if (project.link) {
      const line = document.createElement("span");
      line.className = "heading-line";
      header.append(line);

      const link = document.createElement("a");
      link.className = "project-link";
      link.href = project.link;
      link.textContent = (project.linkLabel || "View project") + " ↗";
      if (/^https?:\/\//i.test(project.link)) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
      header.append(link);
    }

    content.append(header);

    const tools = document.createElement("p");
    tools.className = "dialog-tools";
    tools.textContent = project.tools;
    content.append(tools);

    appendDetailEntries(content, project.details, "dialog-text");

    if (project.media && project.media.length > 0) {
      const gallery = document.createElement("div");
      gallery.className = "media-gallery";
      project.media.forEach(function (item) {
        gallery.append(createGalleryItem(item));
      });
      content.append(gallery);
    }

    projectDialog.showModal();
  }

  // Renders a deep-dive "details" list in order: plain strings become
  // paragraphs, media objects ({ type: "image" | "video", src, ... }) become
  // figures, so text, screenshots, and clips can be interleaved freely.
  function appendDetailEntries(container, entries, textClass) {
    (entries || []).forEach(function (entry) {
      if (entry && typeof entry === "object") {
        const figure = createGalleryItem(entry);
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

  // One screenshot or clip in the deep-dive gallery, with its caption.
  function createGalleryItem(item) {
    const figure = document.createElement("figure");
    figure.className = item.type === "video" ? "media-item media-item-video" : "media-item";

    if (item.type === "video") {
      const video = document.createElement("video");
      video.className = "media-video";
      video.src = item.src;
      video.controls = true;
      video.setAttribute("playsinline", "");
      // The clip only downloads when the reader presses its play button.
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

    if (hasDeepDive && projectDialog) {
      const readMore = document.createElement("button");
      readMore.type = "button";
      readMore.className = "button button-secondary button-compact";
      readMore.textContent = "Read more";
      readMore.addEventListener("click", function () {
        openProjectDialog(project);
      });
      bottom.append(readMore);
    }

    info.append(meta, title, description, bottom);
    article.append(cover, info);
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
