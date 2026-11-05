import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// Navbar 3D wordmark: a small, rotatable boo.glb in the header link.
// Loaded lazily by index.html after the "load" event.

const container = document.querySelector(".model_3d");

if (!container) {
  throw new Error("No .model_3d container found.");
}

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

const controls = new OrbitControls(camera, renderer.domElement);
controls.rotateSpeed = 1;
controls.enableDamping = true;
controls.minPolarAngle = Math.PI / 2 - 0.5;
controls.maxPolarAngle = Math.PI / 2 + 0.5;
controls.enablePan = false;
controls.enableZoom = false;

// Tint color comes from CSS at startup, not per frame: the original code
// re-read the computed style and walked every mesh on every rendered frame.
const cssTint = getComputedStyle(document.documentElement)
  .getPropertyValue("--active-color")
  .trim();
const tintColor = cssTint || "#645fd1";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
  controls.update();
  renderer.render(scene, camera);
}
animate();
