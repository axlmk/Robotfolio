(function () {
  // On the published site, build.js has already written the finished cards
  // and deep dives into index.html, and neither projects.js nor templates.js
  // is downloaded. This file then only wires up the interactions below.
  //
  // While editing locally, projects.js and templates.js load: the same
  // templates build the same HTML here in the browser, so the local preview
  // matches the published page exactly.
  const projectGrid = document.querySelector("#project-grid");
  const dialogsHost = document.querySelector("#project-dialogs");
  const filterButtons = document.querySelectorAll("[data-filter]");
  const emptyMessage = document.querySelector("#empty-category-message");

  if (
    projectGrid &&
    dialogsHost &&
    projectGrid.children.length === 0 &&
    Array.isArray(window.portfolioProjects) &&
    window.portfolioTemplates
  ) {
    projectGrid.innerHTML = window.portfolioProjects
      .map(function (project, index) {
        return window.portfolioTemplates.projectCard(project, index);
      })
      .join("\n");

    dialogsHost.innerHTML = window.portfolioProjects
      .map(function (project, index) {
        return window.portfolioTemplates.projectDialog(project, index);
      })
      .join("\n");
  }

  // --- Filters: show and hide the cards already on the page ---
  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const selectedFilter = button.dataset.filter;
      // A button can group several tags, comma-separated, to show projects
      // matching any of them: data-filter="vr,ar" groups VR and AR under XR.
      const wantedTags = selectedFilter.split(",");
      let visibleCount = 0;

      filterButtons.forEach(function (filterButton) {
        const isSelected = filterButton === button;
        filterButton.classList.toggle("is-active", isSelected);
        filterButton.setAttribute("aria-pressed", String(isSelected));
      });

      projectGrid.querySelectorAll(".project-card").forEach(function (card) {
        const showsCard =
          selectedFilter === "all" ||
          card.dataset.categories.split(" ").some(function (category) {
            return wantedTags.indexOf(category) !== -1;
          });
        card.hidden = !showsCard;
        if (showsCard) {
          visibleCount += 1;
        }
      });

      if (emptyMessage) {
        emptyMessage.hidden = visibleCount > 0;
      }
    });
  });
  // --- Deep dives, addressed through the page address ---
  // Every project with a slug (see projects.js) gets an address like
  // #frank. Clicking its Read more button opens its deep dive
  // and moves the browser address; closing the deep dive cleans it up.
  // Typing or sharing the address, reloading, or using the browser back
  // and forward buttons opens and closes the matching deep dive.
  const dialogs = document.querySelectorAll(".project-dialog");
  const dialogBySlug = {};

  dialogs.forEach(function (dialog) {
    if (dialog.dataset.slug) {
      dialogBySlug[dialog.dataset.slug] = dialog;
    }
  });

  function openDialog(dialog) {
    dialog.showModal();
    if (dialog.dataset.slug && window.location.hash !== "#" + dialog.dataset.slug) {
      window.location.hash = dialog.dataset.slug;
    }
  }

  // Makes the page match the address, whatever changed it.
  function syncWithAddress() {
    const target = dialogBySlug[window.location.hash.replace(/^#/, "")];

    dialogs.forEach(function (dialog) {
      if (dialog.open && dialog !== target) {
        dialog.close();
      }
    });

    if (target && !target.open) {
      target.showModal();
    }
  }
  // The "Read more" button opens its project's deep dive.
  document.querySelectorAll("button[data-dialog-id]").forEach(function (button) {
    button.addEventListener("click", function () {
      openDialog(document.getElementById(button.dataset.dialogId));
    });
  });

  dialogs.forEach(function (dialog) {
    dialog.querySelector(".dialog-close").addEventListener("click", function () {
      dialog.close();
    });

    // Clicking the dark area around the deep dive closes it.
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) {
        dialog.close();
      }
    });

    dialog.addEventListener("close", function () {
      // No clip keeps playing after the deep dive closes.
      dialog.querySelectorAll("video").forEach(function (video) {
        video.pause();
      });

      // Clean the address, without adding a history entry.
      if (dialog.dataset.slug && window.location.hash === "#" + dialog.dataset.slug) {
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    });
  });

  window.addEventListener("hashchange", syncWithAddress);

  // A deep link typed, shared, or reloaded opens the project on arrival.
  syncWithAddress();
})();
