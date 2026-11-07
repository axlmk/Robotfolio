// Bakes the finished site into dist/ for GitHub Pages.
//
// The published index.html comes out with the project cards and deep dives
// already written into it, so projects.js and templates.js are not shipped
// and no rendering runs in the visitor's browser. The source files stay
// exactly as they are for editing.
//
// Run locally with: node build.js

const fs = require("fs");

// The templates and the project data both attach to "window"; in Node we
// simply provide that object before loading them.
global.window = global;
require("./templates.js");
require("./projects.js");

const templates = window.portfolioTemplates;
const projects = window.portfolioProjects;

if (!templates || !Array.isArray(projects)) {
  throw new Error("Could not load projects.js or templates.js.");
}

const cards = projects.map(function (project, index) {
  return templates.projectCard(project, index);
});

const dialogs = projects.map(function (project, index) {
  return templates.projectDialog(project, index);
});

let page = fs.readFileSync("index.html", "utf8");

// 1. Bake the finished cards into the grid.
page = page.replace(
  /(<div[^>]*id="project-grid"[^>]*>)[\s\S]*?(<\/div>)/,
  function (match, openingTag, closingTag) {
    return openingTag + "\n          " + cards.join("\n          ") + "\n        " + closingTag;
  }
);

// 2. Bake the deep-dive pop-overs into their container.
page = page.replace(
  /(<div[^>]*id="project-dialogs"[^>]*>)[\s\S]*?(<\/div>)/,
  function (match, openingTag, closingTag) {
    return openingTag + "\n    " + dialogs.join("\n    ") + "\n  " + closingTag;
  }
);

// 3. The data files are baked in now: do not ship them.
page = page.replace(/\s*<script src="templates\.js" defer><\/script>/, "");
page = page.replace(/\s*<script src="projects\.js" defer><\/script>/, "");

// Sanity checks: fail loudly instead of publishing a broken page.
if (page.includes('src="projects.js"') || page.includes('src="templates.js"')) {
  throw new Error("The data scripts are still referenced in the built page.");
}
if (!page.includes('id="project-dialog-0"') || !page.includes("project-card")) {
  throw new Error("The cards or deep dives were not baked into the built page.");
}

// 4. Assemble the site next to the media it references.
fs.rmSync("dist", { recursive: true, force: true });
fs.mkdirSync("dist");
fs.writeFileSync("dist/index.html", page);
fs.copyFileSync("styles.css", "dist/styles.css");
fs.copyFileSync("app.js", "dist/app.js");
fs.copyFileSync("avatar.js", "dist/avatar.js");
fs.copyFileSync("resume.html", "dist/resume.html");
fs.cpSync("media", "dist/media", { recursive: true });

console.log("Built dist/index.html with " + projects.length + " projects baked in.");
