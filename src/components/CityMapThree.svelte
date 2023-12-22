<script>
	import { onMount, onDestroy } from 'svelte';
	import * as THREE from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
	import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
	import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
	import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
	import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
	import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
	import { buildings } from '../lib/utils.js';
	import StreetgridTexture from '../assets/streetgrid.jpg';

	let container;
	let scene, camera, renderer;
	const gridSize = 5;
	const centerIndex = Math.floor((gridSize * gridSize) / 2);
	const tileHeightScale = 0.1; // Scale for the building height
	let tiles = [];
	let tileMeshes = [];
	let controls;
	let composer, renderPass, bloomPass;

	let raycaster = new THREE.Raycaster();
	let mouse = new THREE.Vector2();
	let INTERSECTED; // Will keep track of the currently intersected object

	let textureLoader;
	let streetgridTexture;

	onMount(() => {
		if (typeof window !== 'undefined') {
			textureLoader = new THREE.TextureLoader(); // Create a texture loader
			streetgridTexture = textureLoader.load(StreetgridTexture); // Load streetgrid texture

			init();
			// loadBuildingModel();
			generateMap();
			createMap(streetgridTexture);
			animate();

			window.addEventListener('mousemove', onMouseMove);
			window.addEventListener('resize', onWindowResize);
		}
	});

	function loadBuildingModel() {
		MTLLoaderInstance.load(OfficeMtl, (materials) => {
			materials.preload();
			OBJLoaderInstance.setMaterials(materials);
			OBJLoaderInstance.load(OfficeObj, (object) => {
				object.scale.set(0.1, 0.1, 0.1);
				object.position.set(0, 0, 0);
				object.rotation.set(0, 0, 0);
				scene.add(object);
			});
		});
	}

	function onMouseMove(event) {
		event.preventDefault();
		if (!container) return;
		const rect = container.getBoundingClientRect();
		mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
		mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
	}

	function shuffle(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	function init() {
		// Scene
		scene = new THREE.Scene();

		// Camera
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
		camera.position.set(gridSize / 1.5, gridSize / 1, gridSize / 1.5);
		camera.lookAt(scene.position);

		// Renderer
		renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.shadowMap.enabled = true; // Enable shadow maps
		container.appendChild(renderer.domElement);

		// Set up EffectComposer
		composer = new EffectComposer(renderer);
		renderPass = new RenderPass(scene, camera);
		composer.addPass(renderPass);

		// Unreal Bloom Pass
		bloomPass = new UnrealBloomPass(
			new THREE.Vector2(window.innerWidth, window.innerHeight),
			1.5,
			0.4,
			0.85
		);
		bloomPass.threshold = 0.21;
		bloomPass.strength = 0.8;
		bloomPass.radius = 0.85;
		composer.addPass(bloomPass);

		// Lighting (optional)
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
		scene.add(ambientLight);
		const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
		directionalLight.position.set(-100, 50, -45);
		directionalLight.castShadow = true; // Enable shadow casting
		scene.add(directionalLight);

		// Create OrbitControls
		controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true; // Optional, for smooth animation
		controls.dampingFactor = 0.1;
		controls.enableZoom = true;
		// Set vertical orbit limits
		controls.minPolarAngle = 0; // 0 radians (0 degrees), directly overhead
		controls.maxPolarAngle = Math.PI / 3; // Math.PI / 2 radians (90 degrees), horizontal
		// Set zoom (distance) limits
		controls.minDistance = 5; // Minimum zoom level
		controls.maxDistance = 20; // Maximum zoom level
	}

	const eitherTypeBuildings = buildings.filter((b) => b.type === 'either');
	function generateInnerRingBuildings() {
		const innerRing = [];
		const innerRingBuildings = buildings.filter((b) => b.type === 'inner-ring');

		innerRing.push(...innerRingBuildings);

		// Add 2 alleyways
		for (let i = 0; i < 2; i++) {
			innerRing.push({ ...buildings.find((b) => b.type === 'alleyway'), number: i + 1 });
		}

		// Fill up with either type buildings
		while (innerRing.length < 8) {
			innerRing.push({
				...eitherTypeBuildings[Math.floor(Math.random() * eitherTypeBuildings.length)]
			});
		}

		return shuffle(innerRing);
	}

	function generateOuterRingBuildings() {
		const outerRing = [];
		const outerRingBuildings = buildings.filter((b) => b.type === 'outer-ring');

		outerRing.push(...outerRingBuildings);

		// Add 4 alleyways
		for (let i = 0; i < 4; i++) {
			outerRing.push({ ...buildings.find((b) => b.type === 'alleyway'), number: i + 3 });
		}

		while (outerRing.length < 16) {
			outerRing.push({
				...eitherTypeBuildings[Math.floor(Math.random() * eitherTypeBuildings.length)]
			});
		}

		return shuffle(outerRing);
	}

	function generateMap() {
		const innerRingBuildings = generateInnerRingBuildings();
		const outerRingBuildings = generateOuterRingBuildings();
		const centerBuilding = buildings.find((b) => b.type === 'center');

		// Populate the tiles array
		for (let i = 0; i < gridSize * gridSize; i++) {
			const x = i % gridSize;
			const y = Math.floor(i / gridSize);

			let building;

			if (i === centerIndex) {
				// Center tile
				building = centerBuilding;
			} else if (x >= 1 && y >= 1 && x <= 3 && y <= 3) {
				// Inner ring tiles
				building = innerRingBuildings.pop();
			} else {
				// Outer ring tiles
				building = outerRingBuildings.pop();
			}

			tiles.push({ id: i, ...building });
		}
	}

	function createMap(streetgridTexture) {
		// Assuming each tile is 1 unit in size, adjust these values for larger tiles
		const tileWidth = 1;
		const tileDepth = 1;
		const gapSize = 0.2; // Size of the gap between tiles

		tiles.forEach((tile) => {
			if (tile.model) {
				// Load the model

				const OBJLoaderInstance = new OBJLoader();
				const path = `../assets/3dmodels/${tile.model}/${tile.model}.obj`;
				OBJLoaderInstance.load(path, (object) => {
					object.traverse((child) => {
						if (child instanceof THREE.Mesh) {
							child.material = new THREE.MeshLambertMaterial({
								color: new THREE.Color(tile.color),
								emissive: new THREE.Color(tile.color).multiplyScalar(0.0)
							}); // Example: grey color
						}
					});
					object.originalEmissive = new THREE.Color(tile.color).multiplyScalar(0.0);
					object.castShadow = true; // Enable shadow casting
					object.receiveShadow = true; // Enable shadow receiving
					object.scale.set(0.05, 0.05, 0.05);
					const x =
						(tile.id % gridSize) * (tileWidth + gapSize) - (gridSize / 2) * (tileWidth + gapSize);
					const y = (tile.height * tileHeightScale) / 2;
					const z =
						Math.floor(tile.id / gridSize) * (tileDepth + gapSize) -
						(gridSize / 2) * (tileDepth + gapSize);
					object.position.set(x, y, z);
					object.rotation.set(0, 0, 0);
					scene.add(object);
					tileMeshes.push(object);
				});
			} else {
				const geometry = new THREE.BoxGeometry(tileWidth, tile.height * tileHeightScale, tileDepth);
				const material = new THREE.MeshLambertMaterial({
					color: new THREE.Color(tile.color),
					emissive: new THREE.Color(tile.color).multiplyScalar(0.01) // Adjust scalar for glow intensity
				});
				const cube = new THREE.Mesh(geometry, material);
				cube.originalEmissive = new THREE.Color(tile.color).multiplyScalar(0.01);
				cube.castShadow = true; // Enable shadow casting
				cube.receiveShadow = true; // Enable shadow receiving
				// Calculate position with gaps
				const x =
					(tile.id % gridSize) * (tileWidth + gapSize) - (gridSize / 2) * (tileWidth + gapSize);
				const y = (tile.height * tileHeightScale) / 2;
				const z =
					Math.floor(tile.id / gridSize) * (tileDepth + gapSize) -
					(gridSize / 2) * (tileDepth + gapSize);
				cube.position.set(x, y, z);
				scene.add(cube);
				tileMeshes.push(cube);
			}
		});

		// Create ground plane
		const groundSize = gridSize + gapSize * 5; // Adjust size as needed
		const groundGeometry = new THREE.PlaneGeometry(groundSize, groundSize);
		const groundMaterial = new THREE.MeshLambertMaterial({ map: streetgridTexture }); // Ground texture
		const ground = new THREE.Mesh(groundGeometry, groundMaterial);
		ground.receiveShadow = true; // Enable shadow receiving
		ground.rotation.x = -Math.PI / 2; // Rotate the plane to be horizontal
		ground.position.x = -0.6;
		ground.position.z = -0.6;
		ground.position.y = -0.0; // Adjust position to sit below the lowest tile
		scene.add(ground);
	}

	function animate() {
		requestAnimationFrame(animate);

		raycaster.setFromCamera(mouse, camera);
		const intersects = raycaster.intersectObjects(tileMeshes);

		if (intersects.length > 0) {
			if (INTERSECTED != intersects[0].object) {
				if (INTERSECTED) resetEmissiveIntensity(INTERSECTED);
				INTERSECTED = intersects[0].object;
				setEmissiveIntensity(INTERSECTED, 10.5); // Increase intensity for glow effect
			}
		} else {
			if (INTERSECTED) resetEmissiveIntensity(INTERSECTED);
			INTERSECTED = null;
		}

		controls.update();
		composer.render();
	}

	function setEmissiveIntensity(mesh, intensity) {
		mesh.material.emissive && mesh.material.emissive.multiplyScalar(intensity);
	}

	function resetEmissiveIntensity(mesh) {
		mesh.material.emissive && mesh.material.emissive.set(mesh.originalEmissive);
	}

	// Resize handling (optional)
	function onWindowResize() {
		camera.aspect = container.clientWidth / container.clientHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(container.clientWidth, container.clientHeight);
		composer.setSize(container.clientWidth, container.clientHeight);
	}

	// Clean up on component destruction
	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', onWindowResize);
		}
	});
</script>

<div bind:this={container}></div>
