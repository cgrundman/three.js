import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js"

import getStarfield from "./src/getStarfield.js";
import { getFresnelMat } from "./src/getFresnelMat.js";

// Create Window
window.THREE = THREE;
const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 3;
const renderer = new THREE.WebGLRenderer({ antialias: true});
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

// Create Earth
const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
const detail = 12;
scene.add(earthGroup)
new OrbitControls(camera, renderer.domElement);
const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, detail);
const material = new THREE.MeshPhongMaterial({
  map: loader.load("textures/earthmap1k.jpg")
});
const earthMesh = new THREE.Mesh(geometry, material);
earthGroup.add(earthMesh);

// Add Night Lighting
const lightsMat = new THREE.MeshBasicMaterial({
  map: loader.load("textures/earthlights1k.jpg"),
  blending: THREE.AdditiveBlending,
  transparent: true,
  opacity: 0.3,
})
const lightsMesh = new THREE.Mesh(geometry, lightsMat)
earthGroup.add(lightsMesh)

// Add Clouds Layer
const cloudsMat = new THREE.MeshStandardMaterial({
  map: loader.load("textures/earthcloudmap.jpg"),
  transparent: true,
  opacity: 0.4,
  blending: THREE.AdditiveBlending
})
const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
cloudsMesh.scale.setScalar(1.003)
earthGroup.add(cloudsMesh);

// Add Globe Glow
const fresnelMat = getFresnelMat();
const glowMesh = new THREE.Mesh(geometry, fresnelMat);
glowMesh.scale.setScalar(1.01)
earthGroup.add(glowMesh)

// Add Stars
const stars = getStarfield({ numStars: 2000 });
scene.add(stars)

// Add Sunlight
const sunLight = new THREE.DirectionalLight(0xffffff)
scene.add(sunLight)
sunLight.position.set(-2, 0.5, 1.5)

// Add Animation
function animate() {
  requestAnimationFrame(animate);

  earthMesh.rotation.y += 0.002;
  lightsMesh.rotation.y += 0.002;
  cloudsMesh.rotation.y += 0.0023;
  glowMesh.rotation.y += 0.002;
  renderer.render(scene, camera);
}

animate();

function handleWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);