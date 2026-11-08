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
      let visibleCount = 0;

      filterButtons.forEach(function (filterButton) {
        const isSelected = filterButton === button;
        filterButton.classList.toggle("is-active", isSelected);
        filterButton.setAttribute("aria-pressed", String(isSelected));
      });

      projectGrid.querySelectorAll(".project-card").forEach(function (card) {
        const showsCard = selectedFilter === "all" || card.dataset.category === selectedFilter;
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
  // --- Deep dives: the pop-over opened by "Read more" on a card ---
  document.querySelectorAll("[data-dialog-id]").forEach(function (button) {
    button.addEventListener("click", function () {
      const dialog = document.getElementById(button.dataset.dialogId);
      if (dialog) {
        dialog.showModal();
      }
    });
  });

  document.querySelectorAll(".project-dialog").forEach(function (dialog) {
    dialog.querySelector(".dialog-close").addEventListener("click", function () {
      dialog.close();
    });

    // Clicking the dark area around the deep dive closes it.
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) {
        dialog.close();
      }
    });

    // No clip keeps playing after the deep dive closes.
    dialog.addEventListener("close", function () {
      dialog.querySelectorAll("video").forEach(function (video) {
        video.pause();
      });
    });
  });
})();
