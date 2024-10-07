<script lang="ts">
import { onMount } from 'svelte';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import BackHeader from "$lib/components/BackHeader.svelte";
import LineSeparator from "$lib/components/LineSeparator.svelte";

let container: HTMLDivElement;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let model: THREE.Object3D;
let rotationAngle = 0;

onMount(() => {
  initScene();
  animate();

  return () => {
    renderer.dispose();
    scene.clear();
  };
});

function initScene() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 10;
  renderer.outputEncoding = THREE.sRGBEncoding;


  renderer.setClearColor(0x1C1C1E);
  container.appendChild(renderer.domElement);


  /*
  new RGBELoader()
    .setPath('/src/lib/assets/hdris/')
    .load('studio_small_03_4k.exr', function(texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
    });

   */

  const ambientLight = new THREE.AmbientLight(0xffffff, 10);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 11);
  directionalLight.position.set(5, 10, 7);
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xffffff, 11, 1000);
  pointLight.position.set(0, 3, 5);
  scene.add(pointLight);

  camera.position.z = 5;

  const loader = new FBXLoader();
  loader.load(
    '/src/lib/assets/models/awards/gold-award-3.fbx',
    (object) => {
      model = object;
      scene.add(model);
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);

      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const material = new THREE.MeshStandardMaterial({
            color: 0xffd700,
            metalness: 1,
            roughness: 0.1,
            envMapIntensity: 2
          });
          child.material = material;
        }
      });
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    (error) => {
      console.error('An error happened', error);
    }
  );

  let touchStartX: number;
  container.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, false);

  container.addEventListener('touchmove', (e) => {
    if (touchStartX !== undefined && model) {
      const touchEndX = e.touches[0].clientX;
      const deltaX = touchEndX - touchStartX;
      rotationAngle += deltaX * 0.01;
      touchStartX = touchEndX;
    }
  }, false);

  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

function animate() {
  requestAnimationFrame(animate);
  if (model) {
    model.rotation.y = rotationAngle;
  }
  renderer.render(scene, camera);
}
</script>

<div class="flex flex-col p-4 text-gray-300">
  <BackHeader class="my-4" href="/profile/profile-settings">Award Viewer Demo</BackHeader>
  <LineSeparator/>
  <div bind:this={container} class="w-full h-[400px]"></div>

  <div class="mt-4 mb-8 p-2 bg-gray-700 rounded-md text-white text-lg text-center">
    <p>Ovu nagradu ste zardaili (datum), nakon što ste (...). </p>
    <p>Čestitamo!</p>
  </div>
</div>
