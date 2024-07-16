import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js"

// Create Window
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.z = 2;
const scene = new THREE.Scene();

// Add Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.04;

// Make Icosahedron
const geo = new THREE.IcosahedronGeometry(0.9, 2);
const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

// Create Wiremesh or edges
const wireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
})
const wireMesh = new THREE.Mesh(geo, wireMat)
wireMesh.scale.setScalar(1.001);
mesh.add(wireMesh)

// Create Hemisphere Light
const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500)
scene.add(hemiLight)

// Animate Scene
function animate(t = 0) {
    requestAnimationFrame(animate);
    mesh.rotation.y = t * 0.0001;
    renderer.render(scene, camera);
    controls.update();
}
animate()