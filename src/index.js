import * as THREE from 'three';

import { Room } from './components/Room';

import './index.scss';

function onWindowResize(renderer, camera) {
  camera.aspect = this.innerWidth / this.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(this.innerWidth, this.innerHeight);
}

function setupRenderer() {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.physicallyCorrectLights = true;
  renderer.shadowMap.enabled = true;
  const rendererContainer = document.getElementById('scene-renderer');
  rendererContainer.appendChild(renderer.domElement);

  const room = new Room(renderer);
  const scene = room.getScene();
  const camera = room.getCamera();
  window.addEventListener(
    'resize',
    onWindowResize.bind(window, renderer, camera),
    false
  );

  const animate = function () {
    requestAnimationFrame(animate);

    room.animate();

    renderer.render(scene, camera);
  };

  animate();
}

window.addEventListener('load', setupRenderer);
