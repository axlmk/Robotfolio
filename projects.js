// Add, edit, or remove projects in this list.
//
//   categories: one or more categories for the project, e.g.
//          categories: ["graphics", "unreal"]. The card shows a tag for each
//          and appears under every matching filter button (index.html).
//
// Media fields (all optional):
//   image: screenshot shown directly on the project card, e.g. "media/my-project.jpg"
//          Use a 16:9 JPG around 1200 pixels wide, compressed (a few hundred KB max).
//   date: free text shown in the corner of the card cover, e.g. date: "2021".
//          Pick any format you like; it is displayed as is, and the corner
//          stays empty while it is unset.
//   slug: the project's name in the page address, e.g. slug: "frank" makes
//          the deep dive open at example.com/#frank. Clicking its Read more
//          button moves the address there too.
//
// Optional deep dive (extra text + more pictures and videos), shown in a pop-over
// when the reader clicks "Read more" on the card:
//   details: the content of the deep dive, in order. Each entry is either:
//     - a string, shown as a paragraph, or
//     - a media object, shown in place so pictures and clips sit between
//       the paragraphs:
//       { type: "image", src: "media/extra-1.jpg", caption: "Text under the picture" }
//       { type: "video", src: "media/clip-1.mp4", poster: "media/extra-1.jpg", caption: "Text under the clip" }
//   media: more screenshots and clips shown as a gallery after the text,
//     same objects as above, one per item.
//   Leave details and media as empty lists ([]) for a simple card with no "Read more".
window.portfolioProjects = [
  {
    title: "Visualizer",
    slug: "visualizer",
    date: "2025",
    categories: ["graphics"],
    description: "A C++/Qt and OpenGL playground for experimenting with real-time rendering and interfaces.",
    tools: "C++ · Qt · OpenGL · GLSL",
    image: "media/visualizer/main.jpg",
    details: [
      "Having been interested in graphics programming for a long time, I eventually came across the learnopengl website, which motivated me to make my own renderer. That's how I came to create a 3D viewer that would work in a similar way to Maya software.",
      "The code I developed to display 3D objects on screen follows standard practices that are coming directly from the learnopengl tutorial. That being said, I want to focus on a few things I implemented.",
      { type: "video", src: "media/visualizer/1.webm", caption: "A global overview of the current state of the project" },
      "The first one is the camera. It orbits around a target object with specific rules: no rotation along the axis connecting it to the target, restricted rotation along the X-axis and unlimited rotation along the Y-axis . It can also move laterally and zoom in and out.",
      { type: "video", src: "media/visualizer/2.webm", caption: "Translation of an object. We can notice that the blue axis disappears depending on the camera's position" },
      "Translating the objects directly within the virtual environment was made in four steps.",
      "1. Object selection: using color picking, the scene renders but a special frame where all selectable objects have a uniform color shader depending on an ID is pre-rendered. Getting the color under the mouse when a click is made tells you which object is selected",
      "2. Outline creation: to highlight the selected object, the OpenGL's stencil buffer is used as a mask. The selected object is displayed twice: initially in its original form and then with a red shader and scaled up",
      "3. Gizmo positionning: a gizmo is centered at the selected object, which consists of three colored arrows representing the three axes in the scene.",
      "4. Gizmo selection: select an axis and compute the required movement based on mouse displacement between frames.",
      { type: "image", src: "media/visualizer/3.png", caption: "Display of a color picking ready frame where three objects have a unique and uniform color" },
      "A detail panel allows the user to modify the properties of the selected object.",
      { type: "image", src: "media/visualizer/4.png", caption: "The details panel for a spot light" },
      "I wanted the project to be buildable simply and on multiple platforms, that’s why, in the middle of the development I switched from using a .vcxproj file to having a full CMakefile, handling dependencies and build stages. A Github Actions CI is in charge to build the application on every merge request across multiple configurations."
    ],
    media: [],
    sample: true,
    link: "https://github.com/axlmk/ogl-qt",
  },
  {
    title: "Frank",
    slug: "frank",
    date: "2024",
    categories: ["game-jam"],
    description: "A third-person environment prototype focused on atmosphere, responsive movement, and world-building.",
    tools: "Unreal Engine · Blueprints",
    image: "media/frank/main.jpg",
    details: [
      "Frank is a 48h game jam project done by a team of 4 including myself. It takes place in a 3D world in which you are a robot in charge of repairing a crumbling spaceship. Made using Unreal Engine, we relied on kitbashing for the enrvironnement and on a custom asset I created for Frank",
      { type: "video", src: "media/frank/1.webm", caption: "Beginning of level 1" },
      "When I integrated Frank into the engine, to make it feel more real, I added physics on its antenna. To do so, I created a collision box on Frank’s body, set up a rig and an attachment point on the antenna, and enable physics interactions on the rig.",
      { type: "video", src: "media/frank/2.webm", caption: "Frank and its moving antenna" },
      "On this project, I was also in charge of making generic breakable objects. By simply adding a base model and a destroyed version to a blueprint, the game system would take care of breaking it at a random moment, managing the player interaction required to fix it, and adding destruction effects. This proved very useful for quickly creating different types of broken objects.",
      { type: "image", src: "media/frank/3.png", caption: "Actual blueprint of a breakable object" },
      "On a less technical note, I worked with the other team membvers on the level design of the first playable level."
    ],
    media: [],
    sample: true,
    link: "",
  },
  {
    title: "Welcome A bored",
    slug: "welcome-a-bored",
    date: "",
    categories: ["game-jam"],
    description: "A small gameplay prototype exploring player controls, interaction, and a clear feedback loop.",
    tools: "Unity",
    image: "media/welcome-a-bored/main.png",
    details: [],
    media: [],
    sample: true,
    link: "",
  },
  {
    title: "Marimba simulator",
    slug: "marima",
    date: "",
    categories: ["vr", "school"],
    description: "A compact rendering experiment exploring procedural geometry and visual effects in a real-time scene.",
    tools: "Unity · C#",
    image: "media/marimba-simulator/main.png",
    details: [],
    media: [],
    sample: true,
    link: "",
  },
  {
    title: "Pilot",
    slug: "pilot",
    date: "2021",
    categories: ["game-jam"],
    description: "A compact rendering experiment exploring procedural geometry and visual effects in a real-time scene.",
    tools: "Lua · Love2D",
    image: "media/pilot/main.png",
    details: [],
    media: [],
    sample: true,
    link: "https://github.com/PH0Q/GlobalGameJam-2021",
  },
  {
    title: "Tamagotchi AR",
    slug: "tamagotchi",
    date: "",
    categories: ["ar", "school"],
    description: "A compact rendering experiment exploring procedural geometry and visual effects in a real-time scene.",
    tools: "Unity · C# · Vuforia",
    image: "media/tamagotchi/main.jpg",
    details: [],
    media: [],
    sample: true,
    link: "",
  },
  {
    title: "WFA",
    slug: "wfa",
    date: "",
    categories: ["windows"],
    description: "A compact rendering experiment exploring procedural geometry and visual effects in a real-time scene.",
    tools: "C++ · Win32",
    image: "media/wfa/main.jpg",
    details: [],
    media: [],
    sample: true,
    link: "https://github.com/axlmk/WFA",
  },
  {
    title: "Le dernier connard",
    slug: "dernier-connard",
    date: "",
    categories: ["game-jam"],
    description: "A compact rendering experiment exploring procedural geometry and visual effects in a real-time scene.",
    tools: "Python · PyGame",
    image: "media/le-dernier-connard/main.png",
    details: [],
    media: [],
    sample: true,
    link: "",
  }
];
