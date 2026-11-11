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
    description: "A first 3D game jam's project creating gameplay features and integrating custom asset.",
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
    date: "2023",
    categories: ["game-jam"],
    description: "A narrative game about managing a submarine and making the right choices.",
    tools: "Unity",
    image: "media/welcome-a-bored/main.png",
    details: [
      "For the GDD Bear Jam, we came up with the idea to create a narrative-driven game in which the player makes various choices that impact different metrics, such as their hunger or the condition of the ship they are in. To encourage risky decisions, a “fun” metric is also present. This meter constantly decreases and can only be replenished through bold choices.",
      { type: "image", src: "media/welcome-a-bored/1.png", caption: "Example of a panel displaying a choice to be made by the player" },
      "We developed a kind of mini card-based choice engine in Unity. Based on a very specific file structure, the game was able to display a panel with its text and background image, choice cards along with their icons, and then transition from the current panel to the next one.",
      { type: "image", src: "media/welcome-a-bored/2.jpg", caption: "@lgwadart - Example of different panels discoverable by the player" },
      "My contribution to this project involved text display and its visual effects, part of the panel engine, as well as other visuals such as card selection feedback."
    ],
    media: [],
    sample: true,
    link: "https://a3lfyr.itch.io/welcome-a-bored",
  },
  {
    title: "Marimba simulator",
    slug: "marima",
    date: "2021",
    categories: ["vr", "school"],
    description: "A virtual reality marimba serious game allowing the user to practice music inside the headset.",
    tools: "Unity · C#",
    image: "media/marimba-simulator/main.png",
    details: [
      "To use the VR headset controllers intuitively, our team of three students decided to create a Marimba simulator. The idea was therefore to move toward a serious game approach",
      "Two practice modes were included: a free mode, in which the user can do whatever they want, and a guided mode. The later consists of selecting a piece of music beforehand and striking the illuminated keys of the instrument in order to reproduce the piece.",
      { type: "video", src: "media/marimba-simulator/1.webm", caption: "Demo of the guided mode" },
      "I worked primarily on the guided practice mode. I created a custom file format (.axl) that contains the pitch of the note and its duration. The file is then parsed, and the music manager change the material of the key to be played next.",
      { type: "image", src: "media/marimba-simulator/2.png", caption: "An extract of the “Clair de la lune” AXL file" },
      "I also worked on the mallets, their collisions with the instrument, and their interactions with the user's virtual hands.",
      { type: "video", src: "media/marimba-simulator/3.webm", caption: "Video of the interaction between the user and the marimba" }
    ],
    media: [],
    sample: true,
    link: "",
  },
  {
    title: "Pilot",
    slug: "pilot",
    date: "2021",
    categories: ["game-jam"],
    description: "A 2021 Global Game's unfinished project, where a pilot explores a procedurally generated island to find their co-pilot before the clock runs out.",
    tools: "Lua · Love2D",
    image: "media/pilot/main.png",
    details: [
      "For the 2021 Global Game Jam, we played as a pilot who had barely survived a plane crash on an island. The objective was to find our co-pilot within a limited amount of time.",
      { type: "image", src: "media/pilot/1.jpg", caption: "@ashrell - Various assets created for the game" },
      "The island was procedurally generated, which was meant to hinder the player's progress. However, the player had access to items that appeared in logical locations despite the randomness introduced by each run. Coming across one of these items granted knowledge that helped bypass certain random elements, eventually allowing the player to reach the co-pilot before the time limit expired.",
      { type: "image", src: "media/pilot/2.png", caption: "Screenshot of the game pitch created during the first hours of the event" },
      "I worked on several tasks (not always successfully), such as the random generation of the map and the random placement of entities on it. I had to overcome performance issues, as loading a large number of entities greatly slowed down the gameplay experience.",
      { type: "image", src: "media/pilot/3.gif", caption: "Video from the game, showing some elements of the map and a truncated version of our character moving around" }
    ],
    media: [],
    sample: true,
    link: "https://github.com/PH0Q/GlobalGameJam-2021",
  },
  {
    title: "Tamagotchi AR",
    slug: "tamagotchi",
    date: "2021",
    categories: ["ar", "school"],
    description: "An augmented reality take on the Tamagotchi.",
    tools: "Unity · C# · Vuforia",
    image: "media/tamagotchi/main.jpg",
    details: [
      "We recreated a childhood game in augmented reality, in which our Blob (the equivalent of a Tamagotchi) evolves and confronts the player with its needs and emotions. In order to keep it alive, it must be fed but also entertained. Using a smartphone, we scan the flat surfaces around us, and the Blob is overlaid onto them and moves across them. Through an interface, we can directly give it food, but it is also possible to make food appear virtually using cards that exist in the real world.",
      { type: "image", src: "media/tamagotchi/1.jpg", caption: "Cards (or targets) in the real world and their counterparts in the virtual world" },
      "It is also possible to throw a virtual ball to the Blob, which it will retrieve by moving across the surface on which it is positioned in the real world. To convey the stress associated with the idea of losing a Tamagotchi, our Blob can die if it is poorly fed, and a grave will appear at its last location.",
      { type: "video", src: "media/tamagotchi/2.webm", caption: "Blob customization level" },
      "My role within the team was the creation of numerous systems: game saving, Blob positioning within its environment and adaptation to it, the customization screen, and the appearance of virtual objects following the detection of real-world images. The technical challenges were significant, as I had never worked with augmented reality before.",
      { type: "video", src: "media/tamagotchi/3.webm", caption: "Demonstration of a particle effect showing all of the Blob's love" },
      "We aimed to blend real and virtual elements as much as possible in order to offer an experience the user was not accustomed to. The Blob was able to move across most surfaces, real objects brought virtual objects to life, and virtual objects influencing the Blob's behavior while forcing it to act within real-world constraints.",
      { type: "image", src: "media/tamagotchi/4.png", caption: "Screenshot of the mobile game, with the Blob unfortunately absent" }
    ],
    media: [],
    sample: true,
    link: "",
  },
  {
    title: "WFA",
    slug: "wfa",
    date: "2020",
    categories: ["windows"],
    description: "A Windows tool that automatically rotates the wallpaper with artwork pulled from the ArtStation API.",
    tools: "C++ · Win32",
    image: "media/wfa/main.jpg",
    details: [
      "A personal project inspired by a web extension, Wallpapers From ArtStation is a tool initially coded in PowerShell and later in C++ that automatically changes the wallpaper on a Windows system. Based on an API provided by the website referenced in the project's name, the goal is to retrieve an image via this API, install it on the system, and replace the previously assigned wallpaper. The tool adapts to the user's number of monitors and to differences in resolution between the image and the screen. If the image has a different aspect ratio than the selected screen, it is enlarged to fully fit the screen, then blurred, and the original image is overlaid on top for aesthetic purposes.",
      { type: "image", src: "media/wfa/1.png", caption: "Example of a modified image, ready to be displayed" },
      "As the project is still under development, I plan to add several features in the future, such as a small application in the Windows system tray that displays the artist responsible for the artwork currently shown, as well as a button to instantly switch to the next image. Although simple, this project was the first real personal project I set up that has a concrete use in my daily life. I would also like to turn it into an experimentation ground for image processing, allowing me to create my own functions to modify the source wallpaper and thus no longer rely on third-party libraries."
    ],
    media: [],
    sample: true,
    link: "https://github.com/axlmk/WFA",
  },
  {
    title: "Le dernier connard",
    slug: "dernier-connard",
    date: "2018",
    categories: ["game-jam"],
    description: "A chaos-scoring game made from scratch in Python during my first game jam.",
    tools: "Python · PyGame",
    image: "media/le-dernier-connard/main.png",
    details: [
      "It was the first time I had tackled the “complete” creation of a game, as I had previously only made a few Minecraft mods by adapting tutorials found online. Everything was new: we found ourselves surrounded by strangers, working as a team outside the academic framework.",
      { type: "image", src: "media/le-dernier-connard/1.png", caption: "Photo of the three other team members a few minutes after the theme announcement. I am the photographer." },
      "The theme for this edition was: The Last. Immediately reminded of movies in which a hero tries to save the world from imminent destruction, we decided to take the opposite approach. Our idea was to create a game made up of several levels in which the goal is to survive as long as possible without being stopped by the police, while scoring as many points as possible. The way to score points was simple: cause as much chaos as possible. Knocking over trash cans, throwing toilet paper into trees, tripping grandmothers—any means were acceptable to become the game's eponymous character: The Last Asshole.",
      { type: "image", src: "media/le-dernier-connard/2.jpg", caption: "Assets in their intact and ruined versions." },
      "Having no knowledge of any game engine at the time, we made the most “rational” decision possible—starting from scratch. For that, we chose Python and its PyGame module to assist us with the visual side. Since collaboration was required, we also relied on Git, which we had only used once before, during a university course (needless to say, the commit messages were… questionable).",
      { type: "image", src: "media/le-dernier-connard/3.png", caption: "The Git graph toward the end of the project." },
      "I was responsible for several aspects, including displaying the menu, managing the character's movement, preventing them from entering buildings, and defining the paths the police would follow to catch us. Without realizing it, through these tasks I was tackling major areas of virtual world creation, such as graphical programming, collision management, and pathfinding for artificial entities. Without relying on any pre-existing work or resources, I imagined what a collision detection algorithm or a pathfinding algorithm might look like. To this algorithmic challenge were added technical constraints: I had to learn Python and PyGame, which implied reading documentation to understand which functions to use and what results they would produce. Add to that a lack of understanding of how Git merges work and an extremely reduced number of hours of sleep, and you get a highly challenging experience.",
      { type: "video", src: "media/le-dernier-connard/4.webm" }
    ],
    media: [],
    sample: true,
    link: "",
  }
];
