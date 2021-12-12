import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class Room {
  loaderHandlers = [
    (gltf) => {
      this.scene.add(gltf.scene);
    },
    (e) => {
      console.log(e);
    },
    (error) => {
      console.error(error);
    },
  ];

  constructor(renderer) {
    this.renderer = renderer;
    this.setupCamera();
    this.setupScene();
  }

  getScene() {
    return this.scene;
  }

  getCamera() {
    return this.camera;
  }

  setupScene() {
    const scene = (this.scene = new THREE.Scene());

    const loader = new GLTFLoader();

    loader.load('./models/room/walls.gltf', ...this.loaderHandlers);

    const ambient = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(ambient);

    const pointLight = new THREE.PointLight(0xffffff, 23, 100, 2);
    pointLight.position.set(2.5, 2.5, 2.5);
    pointLight.castShadow = true;
    scene.add(pointLight);
  }

  setupCamera() {
    const camera = (this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    ));
    camera.position.z = 2.5;
    camera.position.y = 2.5;

    const controls = (this.controls = new OrbitControls(
      camera,
      this.renderer.domElement
    ));
    controls.maxPolarAngle = Math.PI / 2;
    controls.maxDistance = 15;
    controls.minDistance = 2;
    controls.minAzimuthAngle = -Math.PI / 4;
    controls.maxAzimuthAngle = Math.PI / 4;
    controls.target = new THREE.Vector3(0, 0.75, 0)
  }

  animate() {
    // this.cube.rotation.x += 0.01;
    // this.cube.rotation.y += 0.01;
    this.controls.update();
  }
}
