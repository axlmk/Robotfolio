// Add, edit, or remove projects in this list. Keep category as graphics, unreal, or unity.
//
// Media fields (both optional):
//   image: screenshot shown directly on the project card, e.g. "media/my-project.jpg"
//          Use a 16:9 JPG around 1200 pixels wide, compressed (a few hundred KB max).
//   video: short clip the reader can play with a button on the card, e.g. "media/my-project.mp4"
//          Muted and looped automatically; only downloads when someone clicks play.
//          Use a 10-30 second MP4, a few MB max.
//   Leave both empty ("") to show the generated fallback cover instead.
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
    image: "",
    video: "",
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
    sample: true,
    link: "",
    linkLabel: ""
  }
];
