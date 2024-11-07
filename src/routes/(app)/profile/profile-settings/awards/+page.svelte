<script lang="ts">
    import { onMount } from 'svelte';
    import * as THREE from 'three';
    import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';
    import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
    import BackHeader from "$lib/components/BackHeader.svelte";
    import LineSeparator from "$lib/components/LineSeparator.svelte";

    let container: HTMLDivElement;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let model: THREE.Object3D;
    let rotationX = 0;
    let rotationY = 0;
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;

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

        const ambientLight = new THREE.AmbientLight(0xffffff, 10);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 11);
        directionalLight.position.set(5, 10, 7);
        scene.add(directionalLight);

        const pointLight = new THREE.PointLight(0xffffff, 11, 1000);
        pointLight.position.set(0, 3, 5);
        scene.add(pointLight);

        camera.position.z = 5;

        const loader = new ColladaLoader();
        loader.load(
            'https://mysuperdupercoolbucket123.s3.eu-north-1.amazonaws.com/cube1.dae',
            (collada) => {
                model = collada.scene;
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

        container.addEventListener('mousedown', onMouseDown, false);
        container.addEventListener('mouseup', onMouseUp, false);
        container.addEventListener('mousemove', onMouseMove, false);
        container.addEventListener('touchstart', onTouchStart, false);
        container.addEventListener('touchmove', onTouchMove, false);

        window.addEventListener('resize', onWindowResize, false);
    }

    function onWindowResize() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }

    function onMouseDown(event: MouseEvent) {
        isDragging = true;
        previousMouseX = event.clientX;
        previousMouseY = event.clientY;
    }

    function onMouseUp() {
        isDragging = false;
    }

    function onMouseMove(event: MouseEvent) {
        if (isDragging && model) {
            const deltaX = event.clientX - previousMouseX;
            const deltaY = event.clientY - previousMouseY;
            rotationY += deltaX * 0.01;
            rotationX += deltaY * 0.01;
            previousMouseX = event.clientX;
            previousMouseY = event.clientY;
        }
    }

    function onTouchStart(event: TouchEvent) {
        if (event.touches.length === 1) {
            isDragging = true;
            previousMouseX = event.touches[0].clientX;
            previousMouseY = event.touches[0].clientY;
        }
    }

    function onTouchMove(event: TouchEvent) {
        if (isDragging && event.touches.length === 1 && model) {
            const deltaX = event.touches[0].clientX - previousMouseX;
            const deltaY = event.touches[0].clientY - previousMouseY;
            rotationY += deltaX * 0.01;
            rotationX += deltaY * 0.01;
            previousMouseX = event.touches[0].clientX;
            previousMouseY = event.touches[0].clientY;
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        if (model) {
            model.rotation.y = rotationY;
            model.rotation.x = rotationX;
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
