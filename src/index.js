import * as THREE from 'three';

import { Room } from './components/Room';

import './index.scss';

function setupRenderer() {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.physicallyCorrectLights = true;
  renderer.shadowMap.enabled = true;
  document.getElementById('scene-renderer').appendChild(renderer.domElement);

  const room = new Room(renderer);
  const scene = room.getScene();
  const camera = room.getCamera();

  const animate = function () {
    requestAnimationFrame(animate);

    room.animate();

    renderer.render(scene, camera);
  };

  animate();
}

window.addEventListener('load', setupRenderer);
