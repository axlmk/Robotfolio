import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// 3D boo.glb instances, rendered with three.js. Loaded lazily by index.html
// after the "load" event, so none of this affects first paint.
//
// Two instances exist:
//   - the header wordmark, which the reader can drag to rotate;
//   - a cameo that peeks over the hovered project card: the wordmark sinks
//     out through the bottom of its slot, and the boo rises over the card's
//     top edge until only its upper half is visible. Moving to another card
//     makes it sink behind the first one, then rise over the new one. When
//     the pointer leaves the project grid, the boo slides back into the
//     header.
//
// The rising and sinking are CSS transforms on the canvases (styles.css);
// this file only positions the cameo and toggles classes.

const cssTint = getComputedStyle(document.documentElement)
  .getPropertyValue("--active-color")
  .trim();
const tintColor = cssTint || "#645fd1";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Builds one boo.glb instance inside the given container.
// options.interactive enables drag-to-rotate (header wordmark only).
function createBoo(container, options) {
  const scene = new THREE.Scene();

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);

  const camera = new THREE.PerspectiveCamera(
    50,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0.5, 2.6);

  // Lights travel with the camera so the model stays lit from the front.
  const light = new THREE.PointLight("#ffffff", 50, 0);
  light.position.set(0, 3, 0);
  camera.add(light);

  const spot = new THREE.SpotLight("#ffffff", 3.2, 0, 1.2, 1, 3);
  spot.position.set(-1, 0.2, -2);
  camera.add(spot);

  const spot2 = new THREE.SpotLight("#ffffff", 2.6, 2, 1.5, 1, 3);
  spot2.position.set(1, 0.5, -2);
  camera.add(spot2);

  const ambient = new THREE.AmbientLight(0xffffff, 1);
  camera.add(ambient);
  scene.add(camera);

  let controls = null;
  if (options.interactive) {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.rotateSpeed = 1;
    controls.enableDamping = true;
    controls.minPolarAngle = Math.PI / 2 - 0.5;
    controls.maxPolarAngle = Math.PI / 2 + 0.5;
    controls.enablePan = false;
    controls.enableZoom = false;
  }

  const clock = new THREE.Clock();
  let mixer = null;

  new GLTFLoader().load(
    "media/boo.glb",
    (gltf) => {
      const boo = gltf.scene;
      scene.add(boo);

      // Auto-center and normalize model size
      const box = new THREE.Box3().setFromObject(boo);
      const center = box.getCenter(new THREE.Vector3());
      center.y += 0.2;
      const size = box.getSize(new THREE.Vector3());
      boo.position.sub(center);
      boo.scale.setScalar(2 / Math.max(size.x, size.y, size.z));

      // Tint once at load instead of per frame
      boo.traverse((child) => {
        if (child.isMesh && child.material && child.material.color) {
          const currentColor = child.material.color;
          if (
            currentColor.r >= 0.1 ||
            currentColor.g >= 0.1 ||
            currentColor.b >= 0.1
          ) {
            child.material.color.set(tintColor);
          }
        }
      });

      if (!reducedMotion && gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(boo);
        mixer.clipAction(gltf.animations[0]).play();
      }
    },
    undefined,
    (error) => {
      console.error("Error loading GLTF:", error);
    }
  );

  // Handle resizing (only when the size actually changed)
  window.addEventListener("resize", () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (width === 0 || height === 0) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });

  // Animation loop: rAF already pauses while the tab is hidden.
  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    if (mixer) {
      mixer.update(delta);
    }
    if (controls) {
      controls.update();
    }
    renderer.render(scene, camera);
  }
  animate();
}

// --- Header wordmark ---
const wordmarkContainer = document.querySelector(".model_3d");

if (!wordmarkContainer) {
  throw new Error("No .model_3d container found.");
}

createBoo(wordmarkContainer, { interactive: true });

// --- Boo peeking over the hovered project card ---
// Skipped entirely when the reader prefers reduced motion: the wordmark then
// simply stays in the header.
if (!reducedMotion) {
  const projectGrid = document.querySelector("#project-grid");
  const header = document.querySelector(".wordmark-model");

  if (projectGrid && header) {
    // The cameo: a slot inside the project grid, placed above the hovered
    // card. Because it is positioned relative to the grid (not the screen),
    // it follows the card through scrolling. Its canvas slides between
    // fully hidden and half risen (see styles.css).
    const cameo = document.createElement("div");
    cameo.className = "boo-peek";
    cameo.setAttribute("aria-hidden", "true");
    projectGrid.appendChild(cameo);
    createBoo(cameo, { interactive: false });

    let hoveredCard = null;
    let switchTimer = null;

    function sinkHeader(sunk) {
      header.classList.toggle("is-sunk", sunk);
    }

    // Places the cameo over a card, relative to the grid. Coordinates are
    // computed from live positions, and the slot stays glued to the card
    // afterwards: scrolling moves both together.
    function positionOver(card) {
      const gridRect = projectGrid.getBoundingClientRect();
      const rect = card.getBoundingClientRect();
      cameo.style.left = rect.left - gridRect.left + rect.width / 2 - cameo.offsetWidth / 2 + "px";
      cameo.style.top = rect.top - gridRect.top - cameo.offsetHeight + "px";
    }

    function peekAt(card) {
      if (switchTimer) {
        clearTimeout(switchTimer);
        switchTimer = null;
      }

      if (cameo.classList.contains("is-up")) {
        // Card-to-card: let the boo sink behind the current card, then jump
        // (hidden) to the new card and rise there. The delay is shorter than
        // the full sink so browsing stays snappy: by the time the boo pops
        // back up, the model is visually gone from the first card.
        cameo.classList.remove("is-up");
        hoveredCard = card;
        switchTimer = setTimeout(function () {
          switchTimer = null;
          positionOver(card);
          cameo.classList.add("is-up");
        }, 180);
      } else {
        // The boo is already down (first hover, or very quick browsing):
        // rise straight over this card.
        positionOver(card);
        cameo.classList.add("is-up");
        hoveredCard = card;
      }
    }

    function release() {
      if (switchTimer) {
        clearTimeout(switchTimer);
        switchTimer = null;
      }
      cameo.classList.remove("is-up");
      hoveredCard = null;
    }

    projectGrid.addEventListener("mouseover", function (event) {
      const card = event.target.closest(".project-card");
      if (!card || card === hoveredCard) return;
      sinkHeader(true);
      peekAt(card);
    });

    projectGrid.addEventListener("mouseleave", function () {
      // Back to the header: the cameo sinks behind the card while the
      // wordmark rises back into its slot.
      release();
      sinkHeader(false);
    });
  }
}
