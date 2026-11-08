// Bakes the finished site into dist/ for GitHub Pages.
//
// The published index.html comes out with the project cards and deep dives
// already written into it, so projects.js and templates.js are not shipped
// and no rendering runs in the visitor's browser. The source files stay
// exactly as they are for editing.
//
// The shipped text files are also minified: comments and indentation are
// for editing comfort, visitors get compact files instead. All three
// minifiers below scan the text character by character so string contents
// are never touched (naive approaches would truncate "https://..." inside a
// string, or fuse values like rgb(255 255 255)).
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

// ---------------------------------------------------------------------------
// Minifiers (zero dependencies)
// ---------------------------------------------------------------------------

// Copies a quoted string starting at i (opening quote included), handling
// backslash escapes, and returns the index just past the closing quote.
function readString(source, i, quote) {
  i += 1;
  while (i < source.length) {
    const c = source[i];
    if (c === "\\") {
      i += 2;
      continue;
    }
    if (c === quote) {
      return i + 1;
    }
    i += 1;
  }
  return source.length;
}

// True when a "/" at this point most likely opens a regex literal rather
// than a division. The shipped scripts contain no regexes; this keeps the
// minifier safe if some are ever added.
function looksLikeRegexStart(out) {
  let j = out.length - 1;
  while (j >= 0 && /\s/.test(out[j])) {
    j -= 1;
  }
  if (j < 0) {
    return true;
  }
  const prev = out[j];
  return !(prev === ")" || prev === "]" || /[\w$]/.test(prev));
}

// JavaScript: removes // and /* */ comments and indentation. Whitespace
// runs collapse to a single space (or a kept newline), so line structure
// survives and nothing is merged across lines.
function minifyJS(source) {
  source = source.replace(/\r\n?/g, "\n");
  let out = "";
  let i = 0;

  while (i < source.length) {
    const c = source[i];

    if (c === '"' || c === "'" || c === "`") {
      const end = readString(source, i, c);
      out += source.slice(i, end);
      i = end;
      continue;
    }

    if (c === "/" && source[i + 1] === "/") {
      while (i < source.length && source[i] !== "\n") {
        i += 1;
      }
      continue;
    }

    if (c === "/" && source[i + 1] === "*") {
      const end = source.indexOf("*/", i + 2);
      i = end === -1 ? source.length : end + 2;
      continue;
    }

    if (c === "/" && looksLikeRegexStart(out)) {
      const start = i;
      i += 1;
      let inClass = false;
      while (i < source.length) {
        const r = source[i];
        if (r === "\\") {
          i += 2;
          continue;
        }
        if (r === "[") {
          inClass = true;
        } else if (r === "]") {
          inClass = false;
        } else if (r === "/" && !inClass) {
          i += 1;
          break;
        }
        i += 1;
      }
      while (i < source.length && /[a-z]/i.test(source[i])) {
        i += 1;
      }
      out += source.slice(start, i);
      continue;
    }

    if (/\s/.test(c)) {
      const isBreak = source.slice(i).match(/^\s*\n/);
      out += isBreak ? "\n" : " ";
      i += isBreak ? isBreak[0].length : (source.slice(i).match(/^\s+/) || [" "])[0].length;
      continue;
    }

    out += c;
    i += 1;
  }

  return out
    .split("\n")
    .map(function (line) {
      return line.trim();
    })
    .filter(function (line) {
      return line.length > 0;
    })
    .join("\n");
}

// CSS: removes /* */ comments and indentation, and drops spaces next to
// {} ; , : where they are never needed. Spaces that matter (between
// selector tokens, around "and" in media queries, inside rgb(...) values)
// are preserved.
function minifyCSS(source) {
  source = source.replace(/\r\n?/g, "\n");
  const boundary = "{};,:";
  let out = "";
  let i = 0;

  while (i < source.length) {
    const c = source[i];

    if (c === '"' || c === "'") {
      const end = readString(source, i, c);
      out += source.slice(i, end);
      i = end;
      continue;
    }

    if (c === "/" && source[i + 1] === "*") {
      const end = source.indexOf("*/", i + 2);
      i = end === -1 ? source.length : end + 2;
      continue;
    }

    if (/\s/.test(c)) {
      const run = source.slice(i).match(/^\s+/)[0];
      const rest = source.slice(i + run.length);
      const nextChar = rest[0] || "";
      const prevChar = out[out.length - 1] || "";
      const touchesBoundary = boundary.indexOf(nextChar) !== -1 || boundary.indexOf(prevChar) !== -1;
      if (!touchesBoundary) {
        out += " ";
      }
      i += run.length;
      continue;
    }

    out += c;
    i += 1;
  }

  return out.trim();
}

// HTML segments: removes <!-- --> comments and collapses the indentation
// between tags. A single space is kept between ">" and "<" because some
// inline elements need it for correct rendering ("LinkedIn <span>...").
function minifyHTMLSegment(html) {
  return html
    .replace(/\r\n?/g, "\n")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/>\s+</g, "> <");
}

// HTML: collapses the markup and minifies <script> and <style> blocks with
// the JS and CSS minifiers.
function minifyHTML(source) {
  const blockPattern = /(<script[^>]*>)([\s\S]*?)(<\/script>)|(<style[^>]*>)([\s\S]*?)(<\/style>)/g;
  let out = "";
  let lastIndex = 0;
  let match;

  while ((match = blockPattern.exec(source)) !== null) {
    out += minifyHTMLSegment(source.slice(lastIndex, match.index));
    if (match[1] !== undefined) {
      out += match[1] + minifyJS(match[2]) + match[3];
    } else {
      out += match[4] + minifyCSS(match[5]) + match[6];
    }
    lastIndex = blockPattern.lastIndex;
  }
  out += minifyHTMLSegment(source.slice(lastIndex));
  return out.trim();
}

function writeShipped(name, source, minifier) {
  const minified = minifier(source);
  fs.writeFileSync("dist/" + name, minified);
  const saved = Math.round(100 - (minified.length / source.length) * 100);
  console.log(
    "  " + name + "  " + source.length + " -> " + minified.length + " bytes (-" + saved + "%)"
  );
}

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------

let page = fs.readFileSync("index.html", "utf8");

// 1. Bake the finished cards into the grid.
const cards = projects.map(function (project, index) {
  return templates.projectCard(project, index);
});
const dialogs = projects.map(function (project, index) {
  return templates.projectDialog(project, index);
});

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

// 4. Assemble the site next to the media it references, minified.
fs.rmSync("dist", { recursive: true, force: true });
fs.mkdirSync("dist");

console.log("Minified files:");
writeShipped("index.html", page, minifyHTML);
writeShipped("styles.css", fs.readFileSync("styles.css", "utf8"), minifyCSS);
writeShipped("app.js", fs.readFileSync("app.js", "utf8"), minifyJS);
writeShipped("avatar.js", fs.readFileSync("avatar.js", "utf8"), minifyJS);
// The resume is a standalone document meant to be opened and read as is:
// it ships uncompressed for readability.
fs.copyFileSync("resume.html", "dist/resume.html");
fs.cpSync("media", "dist/media", { recursive: true });

console.log("Built dist/ with " + projects.length + " projects baked in.");
