// Add, edit, or remove projects in this list. Keep category as graphics, unreal, or unity.
//
// Media fields (all optional):
//   image: screenshot shown directly on the project card, e.g. "media/my-project.jpg"
//          Use a 16:9 JPG around 1200 pixels wide, compressed (a few hundred KB max).
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
    title: "Realtime Rendering Sandbox",
    category: "graphics",
    categoryLabel: "Graphics",
    description: "A C++ and OpenGL playground for experimenting with lighting, materials, and real-time rendering.",
    tools: "C++ · OpenGL · GLSL",
    mark: "{ }",
    image: "",
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
    title: "Frank",
    category: "unreal",
    categoryLabel: "Unreal Engine",
    description: "A third-person environment prototype focused on atmosphere, responsive movement, and world-building.",
    tools: "Unreal Engine · C++",
    mark: "UE",
    image: "media/frank/main.png",
    details: [
      "New year, new game created in 48 hours—this time without tying ourselves to an existing game jam. On top of that, we wanted to aim higher by creating a fully 3D game using Unreal Engine. Since I was the only one with some basic 3D modeling skills (which clearly did not cover the project’s needs), we chose to rely on kitbashing to build the universe in which our robot Frank would evolve. Frank’s goal is to keep a crumbling spaceship operational. To do so, he must find all the parts of a level that are breaking down and repair them within a limited time.",
      { type: "video", src: "media/frank/1.webm", caption: "Sample clip - replace with a 10-30 second capture of the prototype." },
      { type: "image", src: "media/frank/3.png", caption: "Sample screenshot - replace with a capture of the environment." },
      "With this game project, I wanted to have a foot in both worlds—that is, to collaborate both as a developer and as an artist. Based on a 2D illustration provided by one of the team’s artists, I did my best to model Frank and create his textures. I also worked on integrating him into the game, handling his movement and his antenna. The antenna is special because, unlike the rest of his body, it is affected by the game engine’s physics. To achieve this, I had to create a collision box on Frank’s body, set up a rig and an attachment point on the antenna, and enable physics interactions on that rig.",
      "AI also created a reusable blueprint for breakable objects. By simply adding the original model and its destroyed version to the blueprint, the game system takes care of breaking it at a random moment, managing the player interaction required to fix it, and adding destruction effects. This proved very useful for quickly creating different types of broken objects.",
      "Finally, on a less technical note, I worked with others on the level design of the first playable level. This was great because it allowed us to think about how to create a fun and challenging experience, while also showcasing the elements I had created. For example, by adding a kitchen to the spaceship, I was able to reuse the breakable object blueprint mentioned earlier, test it with ventilation pipes instead of an electrical panel, and see it working live."
    ],
    media: [],
    sample: true,
    link: "github.com",
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
    details: [],
    media: [],
    sample: true,
    link: "",
    linkLabel: ""
  }
];
