// Add, edit, or remove projects in this list. Keep category as graphics, unreal, or unity.
//
// Media fields (all optional):
//   image: screenshot shown directly on the project card, e.g. "media/my-project.jpg"
//          Use a 16:9 JPG around 1200 pixels wide, compressed (a few hundred KB max).
//   video: short clip the reader can play with a button on the card, e.g. "media/my-project.mp4"
//          Muted and looped automatically; only downloads when someone clicks play.
//          Use a 10-30 second MP4, a few MB max.
//
// Optional deep dive (extra text + more pictures and videos), shown when the
// reader clicks "Read more" or "Project details" on the card:
//   details: extra paragraphs about the project, one string per paragraph.
//   media: more screenshots and clips for the deep dive, one object per item:
//     { type: "image", src: "media/extra-1.jpg", caption: "Text under the picture" }
//     { type: "video", src: "media/clip-1.mp4", poster: "media/extra-1.jpg", caption: "Text under the clip" }
//   deepDiveStyle: how the extra content is presented, one of:
//     "dialog" (default) - opens a pop-over over the page.
//     "inline" - expands inside the card itself, so the reader never leaves
//               the project list. Good for quick skimming.
//   Leave details and media as empty lists ([]) for a simple card with no
//   "Read more" button.
window.portfolioProjects = [
  {
    title: "Realtime Rendering Sandbox",
    category: "graphics",
    categoryLabel: "Graphics",
    description: "A C++ and OpenGL playground for experimenting with lighting, materials, and real-time rendering.",
    tools: "C++ · OpenGL · GLSL",
    mark: "{ }",
    image: "",
    video: "",
    details: [
      "Sample deep dive - replace these paragraphs with the story of the project: the problem you set out to solve, the parts you are proud of, and what you learned building it.",
      "Keep each paragraph short (2 to 4 sentences). Recruiters skim: lead with the most impressive fact, then the interesting technical detail."
    ],
    media: [],
    sample: true,
    link: "",
    linkLabel: ""
  },
  {
    title: "Exploration Prototype",
    category: "unreal",
    categoryLabel: "Unreal Engine",
    description: "A third-person environment prototype focused on atmosphere, responsive movement, and world-building.",
    tools: "Unreal Engine · C++",
    mark: "UE",
    image: "media/frank.png",
    video: "",
    details: [
      "Sample inline details - replace these paragraphs with the story of the project: what the player does, the mood you were aiming for, and the part you are most proud of.",
      "This deep dive expands inside the card instead of opening a pop-over, so readers can compare projects without losing their place in the list."
    ],
    media: [
      { type: "image", src: "media/frank.png", caption: "Sample screenshot - replace with a capture of the environment." },
      { type: "video", src: "media/presentation.webm", poster: "media/frank.png", caption: "Sample clip - replace with a 10-30 second capture of the prototype." }
    ],
    deepDiveStyle: "inline",
    sample: true,
    link: "",
    linkLabel: ""
  },
  {
    title: "Gameplay Systems Study",
    category: "unity",
    categoryLabel: "Unity",
    description: "A small gameplay prototype exploring player controls, interaction, and a clear feedback loop.",
    tools: "Unity · C#",
    mark: "01",
    image: "",
    video: "",
    details: [],
    media: [],
    sample: true,
    link: "",
    linkLabel: ""
  },
  {
    title: "Procedural Scene Experiment",
    category: "graphics",
    categoryLabel: "Graphics",
    description: "A compact rendering experiment exploring procedural geometry and visual effects in a real-time scene.",
    tools: "C++ · OpenGL · GLSL",
    mark: "∿",
    image: "",
    video: "",
    details: [],
    media: [],
    sample: true,
    link: "",
    linkLabel: ""
  }
];
