// Add, edit, or remove projects in this list.
//
//   categories: one or more categories for the project, e.g.
//          categories: ["graphics", "unreal"]. The card shows a tag for each
//          and appears under every matching filter button (index.html).
//
// Media fields (all optional):
//   image: screenshot shown directly on the project card, e.g. "media/my-project.jpg"
//          Use a 16:9 JPG around 1200 pixels wide, compressed (a few hundred KB max).
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
    categories: ["graphics"],
    description: "A C++/Qt and OpenGL playground for experimenting with real-time rendering and interfaces.",
    tools: "C++ · Qt · OpenGL · GLSL",
    image: "media/visualizer/main.jpg",
    details: [
      "Having been interested in graphics programming for a long time, I eventually came across the learnopengl website, which motivated me to turn it into a project. The knowledge it gave me enabled me to display my first rectangles and cubes, and even write my first shaders. After making significant progress in the course, I decided it was time to deviate from the step-by-step guidance and create something more personal.",
      { type: "video", src: "media/visualizer/1.webm", caption: "A global overview of the current state of the project" },
      "That's how I came to create a 3D viewer that would work in a similar way to Maya. Having experimented with this tool in the past, I knew exactly the feeling I wanted to recreate: a simplified version of the viewport, allowing me to instantiate objects, move them around, add light sources and move freely in the scene.",
      "",
    ],
    media: ["heing?", "commentje?", "sasdf"],
    sample: true,
    link: "https://github.com/axlmk/ogl-qt",
  },
  {
    title: "Frank",
    slug: "frank",
    categories: ["game-jam"],
    description: "A third-person environment prototype focused on atmosphere, responsive movement, and world-building.",
    tools: "Unreal Engine · C++",
    image: "media/frank/main.jpg",
    details: [
      "New year, new game created in 48 hours—this time without tying ourselves to an existing game jam. On top of that, we wanted to aim higher by creating a fully 3D game using Unreal Engine. Since I was the only one with some basic 3D modeling skills (which clearly did not cover the project’s needs), we chose to rely on kitbashing to build the universe in which our robot Frank would evolve. Frank’s goal is to keep a crumbling spaceship operational. To do so, he must find all the parts of a level that are breaking down and repair them within a limited time.",
      { type: "video", src: "media/frank/1.webm", caption: "Beginning of level 1" },
      "With this game project, I wanted to have a foot in both worlds—that is, to collaborate both as a developer and as an artist. Based on a 2D illustration provided by one of the team’s artists, I did my best to model Frank and create his textures. I also worked on integrating him into the game, handling his movement and his antenna. The antenna is special because, unlike the rest of his body, it is affected by the game engine’s physics. To achieve this, I had to create a collision box on Frank’s body, set up a rig and an attachment point on the antenna, and enable physics interactions on that rig.",
      { type: "video", src: "media/frank/2.webm", caption: "Frank and its moving antenna" },
      "AI also created a reusable blueprint for breakable objects. By simply adding the original model and its destroyed version to the blueprint, the game system takes care of breaking it at a random moment, managing the player interaction required to fix it, and adding destruction effects. This proved very useful for quickly creating different types of broken objects.",
      { type: "image", src: "media/frank/3.png", caption: "Actual blueprint of a breakable object" },
      "Finally, on a less technical note, I worked with others on the level design of the first playable level. This was great because it allowed us to think about how to create a fun and challenging experience, while also showcasing the elements I had created. For example, by adding a kitchen to the spaceship, I was able to reuse the breakable object blueprint mentioned earlier, test it with ventilation pipes instead of an electrical panel, and see it working live."
    ],
    media: [],
    sample: true,
    link: "",
  },
  {
    title: "Welcome A bored",
    slug: "welcome-a-bored",
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
