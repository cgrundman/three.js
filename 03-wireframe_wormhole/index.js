import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import spline from "./spline.js";
import { EffectComposer } from "jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "jsm/postprocessing/UnrealBloomPass.js"

// Setup Scene
const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.3)
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

// Create Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

// // Post-Processing
// const renderScene = new RenderPass(scene, camera);
// const bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), 1.5, 0.4, 100);
// bloomPass.threshold = 0.002;
// bloomPass.strength = 3.5;
// bloomPass.radius = 0;
// const composer = new EffectComposer(renderer);
// composer.addPass(renderScene);
// composer.addPass(bloomPass);

// Create Spline
const points = spline.getPoints(100);
const geometry = new THREE.BufferGeometry().setFromPoints(points);
const material = new THREE.LineBasicMaterial({ color: 0xffffff });
const line = new THREE.Line(geometry, material);

// Create Tube
const tubeGeo = new THREE.TubeGeometry(spline, 222, 0.65, 16, true);
const tubeMat = new THREE.MeshStandardMaterial({ 
    color: 0xff0000,
    side: THREE.DoubleSide, 
});
const tube = new THREE.Mesh(tubeGeo, tubeMat)
scene.add(tube);

// Create Tube Lines
const edges = new THREE.EdgesGeometry(tubeGeo, 0.2);
const lineMat = new THREE.LineBasicMaterial({ color: 0x000000 })
const tubeLines = new THREE.LineSegments(edges, lineMat);
tubeLines.linewidth = 5; // default is 1
// tubeLines.scale.setScalar(1.01)
scene.add(tubeLines);

// Create Boxes
const numBoxes = 500;
const size = 0.075;
const boxGeo = new THREE.BoxGeometry(size, size, size);
for (let i = 0; i < numBoxes; i+= 1) {
    const boxMat = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        // wireframe: true,
    });
    const box = new THREE.Mesh(boxGeo, boxMat);
    const p = (i / numBoxes + Math.random() * 0.1) % 1;
    const pos = tubeGeo.parameters.path.getPointAt(p);
    pos.x += Math.random() - 0.35;
    pos.y += Math.random() - 0.35;
    pos.z += Math.random() - 0.35;
    box.position.copy(pos);
    const rote = new THREE.Vector3(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
    );
    box.rotation.set(rote.x, rote.y, rote.z);
    const edges = new THREE.EdgesGeometry(boxGeo, 0.2);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x000000 });
    const boxLines = new THREE.LineSegments(edges, lineMat)
    boxLines.position.copy(pos);
    boxLines.rotation.set(rote.x, rote.y, rote.z);
    scene.add(box);
    scene.add(boxLines)
}

// Set Light
const hemiLight = new THREE.DirectionalLight(0xffffff)
scene.add(hemiLight)
hemiLight.position.set(-2, 0.5, 1.5)

const hemiLight2 = new THREE.DirectionalLight(0x555555)
scene.add(hemiLight2)
hemiLight2.position.set(2, -0.5, -1.5)

// Set Camera movement dynamics
function updateCamera(t) {
    const time = t * 0.2;
    const looptime = 20 * 1000;
    const p = (time % looptime) / looptime;
    const pos = tubeGeo.parameters.path.getPointAt(p);
    const lookAt = tubeGeo.parameters.path.getPointAt((p + 0.01) % 1);
    camera.position.copy(pos);
    camera.lookAt(lookAt);
}

// Animation Loop
function animate(t = 0) {
  requestAnimationFrame(animate);
  updateCamera(t);
  renderer.render(scene, camera);
  controls.update();
}

animate();

// Set window size
function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);