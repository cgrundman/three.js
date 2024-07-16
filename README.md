# three.js
Various projects in three.js from freeCodeCamp.org
    
## Run Locally

Clone the project

```bash
  git clone https://github.com/cgrundman/three.js
```

Go to the project directory

```bash
  cd ./three.js
```

## Installation

If using VS Code, it is recommended to install the <img src="https://github.com/cgrundman/three.js/blob/main/images/live_server_extension_logo.Default" alt="Live Server" width="25"/> Live Server Plugin. This creates server environment to quickly render the the page as you make updates.

## 01 - Getting Started

The first project is an instroduction to the key components of Three.js. The main 4 necessary components are: a renderer, a camera, an object, and a light source. This project creates a simple mesh object and also showcases controls and animation. 

<img src="https://github.com/cgrundman/three.js/blob/main/images/getting_started.gif" alt="Getting Started Project" width="300"/>

## 02 - Earth

The second project builds upon the first to render an Earth. The project uses mesh layering, as well as importing custom functions for the starfield and the glow around the planet. Special thanks to [Pixel Planet Imporium](https://planetpixelemporium.com/) for the base images used for the meshes. 

<img src="https://github.com/cgrundman/three.js/blob/main/images/earth.gif" alt="Earth Project" width="300"/>

## 03 - Wireframe Wormhole

The third project is the most ambitious yet. This project animates camera mothion along a path through a tube to apear to look like a wormhole. The path is imported and is what the camera travel path, viewing angle, and the tube. The blood cells are also positioned randomly along the path. The shape is a torus, a better geometry to be used later.

<img src="https://github.com/cgrundman/three.js/blob/main/images/wireframe_wormhole.gif" alt="Wireframe Wormhole" width="300"/>

## 04 - Transitions

The fourth project showcases how to transition between scenes smoothly in three.js. The scenes are filled with Icosahedrons and transition between wireframe and mesh bodys using three different transitions from 3 different images.

<img src="https://github.com/cgrundman/three.js/blob/main/images/transitions.gif" alt="transitions" width="300"/>

## 05 - Rapier

The fifth project showcases an implementation of Rapier into a three.js project. This is a package to incorporate a physics ingine into three.js apps.

<img src="https://github.com/cgrundman/three.js/blob/main/images/rapier.gif" alt="rapier" width="300"/>
