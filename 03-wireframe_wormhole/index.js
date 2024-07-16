import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import spline from "./spline.js";

// Setup Scene
const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x550000, 0.3)
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

// Create Spline
const points = spline.getPoints(100);
const geometry = new THREE.BufferGeometry().setFromPoints(points);
const material = new THREE.LineBasicMaterial({ color: 0xffffff });
const line = new THREE.Line(geometry, material);

// Create Tube
const tubeGeo = new THREE.TubeGeometry(spline, 222, 0.65, 16, true);
const tubeMat = new THREE.MeshStandardMaterial({ 
    color: 0x880011,
    side: THREE.DoubleSide, 
});
const tube = new THREE.Mesh(tubeGeo, tubeMat)
scene.add(tube);

// Create Tube Lines
const edges = new THREE.EdgesGeometry(tubeGeo, 0.2);
const lineMat = new THREE.LineBasicMaterial({ color: 0x000000 })
const tubeLines = new THREE.LineSegments(edges, lineMat);
scene.add(tubeLines);

// Create Blood Cells
const numCells = 1000;
const size = 0.075;
const outerGeo = new THREE.TorusGeometry(size, 0.03, 10, 15);
const innerGeo = new THREE.CylinderGeometry(size*2/3, size*2/3, .02, 15, 1);
const bloodCellMat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
// Create all Cells
for (let i = 0; i < numCells; i+= 1) {
    const outerCell = new THREE.Mesh(outerGeo, bloodCellMat);
    const innerCell = new THREE.Mesh(innerGeo, bloodCellMat);
    // innerCell.rotation.set((Math.PI / 2), 0, 0);
    const p = (i / numCells + Math.random() * 0.1) % 1;
    const pos = tubeGeo.parameters.path.getPointAt(p);
    // Create Random Position
    pos.x += Math.random() - 0.35;
    pos.y += Math.random() - 0.35;
    pos.z += Math.random() - 0.35;
    outerCell.position.copy(pos);
    innerCell.position.copy(pos);
    // Create Random Rotation
    const rote = new THREE.Vector3(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
    );
    outerCell.rotation.set(rote.x, rote.y, rote.z);
    // Add all to scene
    scene.add(outerCell);
    // scene.add(innerCell);
}

// Set Light
const hemiLight = new THREE.DirectionalLight(0xffffff)
scene.add(hemiLight)
hemiLight.position.set(-2, 0.5, 1.5)

const ambiLight = new THREE.AmbientLight(0x555555)
scene.add(ambiLight)
ambiLight.position.set(2, -0.5, -1.5)

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