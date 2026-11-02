(function () {
  const projectGrid = document.querySelector("#project-grid");
  const filterButtons = document.querySelectorAll("[data-filter]");
  const projects = window.portfolioProjects;

  if (!projectGrid || !Array.isArray(projects)) {
    throw new Error("Project list could not be loaded. Check projects.js.");
  }

  function createProjectCard(project, index) {
    const article = document.createElement("article");
    article.className = "project-card";

    const cover = document.createElement("div");
    cover.className = "project-cover";
    cover.setAttribute("aria-hidden", "true");

    const mark = document.createElement("span");
    mark.className = "cover-mark";
    mark.textContent = project.mark || "✳";
    cover.append(mark);

    const type = document.createElement("span");
    type.className = "cover-type";
    type.textContent = project.categoryLabel;
    cover.append(type);

    const number = document.createElement("span");
    number.className = "cover-number";
    number.textContent = String(index + 1).padStart(2, "0");
    cover.append(number);

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

  renderProjects("all");
})();
