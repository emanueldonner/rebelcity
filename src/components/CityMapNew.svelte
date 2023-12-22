<script>
	import { onMount } from 'svelte';
	import { pushState } from '$app/navigation';
	import { page } from '$app/stores';
	import * as d3 from 'd3';
	import { buildings } from '../lib/utils.js';

	let mapContainer;
	const gridSize = 5;
	const tiles = [];
	const centerIndex = Math.floor((gridSize * gridSize) / 2);
	let selectedBuilding = null;
	let highlightedBuilding = null;
	let undergroundEntranceLocation;

	$: {
		console.log('selectedBuilding', selectedBuilding);
	}

	onMount(() => {
		generateMap();
		determineUndergroundEntrance();
		drawMap();
	});

	function shuffle(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	function generateMap() {
		// Define tile types with ring specification
		const centerBuilding = buildings.find((b) => b.type === 'center');
		const innerRingBuildings = buildings.filter((b) => b.type === 'inner-ring');
		const outerRingBuildings = buildings.filter((b) => b.type === 'outer-ring');
		const eitherTypeBuildings = buildings.filter((b) => b.type === 'either');
		const alleywayBuilding = buildings.filter((b) => b.type === 'alleyway');

		// Initialize an alleyway counter
		let alleywayCounter = 1;

		// Add alleyways to inner and outer rings
		for (let i = 0; i < 2; i++) {
			// 2 alleyways for inner ring
			innerRingBuildings.push({ ...alleywayBuilding[0], number: alleywayCounter++ }); // Spread operator to clone the object
		}
		for (let i = 0; i < 4; i++) {
			// 4 alleyways for outer ring
			outerRingBuildings.push({ ...alleywayBuilding[0], number: alleywayCounter++ }); // Spread operator to clone the object
		}

		// Fill up the remaining slots with 'either' type buildings
		while (innerRingBuildings.length < 8) {
			innerRingBuildings.push({ ...shuffle(eitherTypeBuildings)[0] });
		}
		while (outerRingBuildings.length < 16) {
			outerRingBuildings.push({ ...shuffle(eitherTypeBuildings)[0] });
		}

		// Shuffle Inner and Outer Ring buildings
		shuffle(innerRingBuildings);
		shuffle(outerRingBuildings);
		// Populate tiles array with correct building types
		for (let i = 0; i < gridSize * gridSize; i++) {
			const x = i % gridSize;
			const y = Math.floor(i / gridSize);
			let building;

			if (i === centerIndex) {
				building = centerBuilding;
			} else if (x >= 1 && y >= 1 && x <= 3 && y <= 3) {
				building = innerRingBuildings.pop() || buildings.find((b) => b.type === 'either');
			} else {
				building = outerRingBuildings.pop() || buildings.find((b) => b.type === 'either');
			}

			tiles.push({ id: i, ...building });
		}
	}

	function handleTileClick(event) {
		const tile = tiles.find((t) => t.id === event.target.__data__.id);
		selectedBuilding = tile;
	}

	function closeModal() {
		selectedBuilding = null;
	}

	function determineUndergroundEntrance() {
		// Randomly select a number between 1 and 6
		const entranceNumber = Math.floor(Math.random() * 6) + 1;

		// Find the alleyway tile with the corresponding number
		undergroundEntranceLocation = tiles.find((tile) => tile.number === entranceNumber);

		// You can also perform additional actions here, like updating the UI
		console.log('Underground entrance is at:', undergroundEntranceLocation);
	}

	function drawMap() {
		const svg = d3
			.select(mapContainer)
			.append('svg')
			.attr('width', gridSize * 100)
			.attr('height', gridSize * 100);

		const tile = svg
			.selectAll('g')
			.data(tiles)
			.enter()
			.append('g')
			.attr('transform', (d, i) => {
				const x = (i % gridSize) * 100;
				const y = Math.floor(i / gridSize) * 100;
				return `translate(${x}, ${y})`;
			})
			.attr('cursor', 'pointer')
			.on('mouseover', function () {
				d3.select(this).select('rect').attr('stroke', '#333');
				highlightedBuilding = d3.select(this).datum().name;
			})
			.on('mouseout', function () {
				d3.select(this).select('rect').attr('stroke', 'none');
			})
			.on('click', handleTileClick);

		// Draw 3D-like Tiles

		tile
			.append('rect')
			.attr('x', 0)
			.attr('y', (d) => -d.height) // Adjust y based on the height
			.attr('width', 90)
			.attr('height', (d) => d.height)
			.attr('fill', (d) => d.color)
			.attr('transform', 'skewY(-45)'); // Skew for 3D effect

		// Check for underground entrance and draw a circle
		// if (undergroundEntranceLocation) {
		svg
			.append('circle')
			.attr('cx', (undergroundEntranceLocation.id % gridSize) * 100 + 45)
			.attr('cy', Math.floor(undergroundEntranceLocation.id / gridSize) * 100 + 45)
			.attr('r', 15) // Radius of the circle
			.attr('fill', 'red'); // Color of the circle
		// }
	}
</script>

<p>{highlightedBuilding}</p>
<div class="map-container" bind:this={mapContainer}></div>

{#if selectedBuilding}
	<dialog open class="info-modal">
		<h2>{selectedBuilding.name}</h2>
		<p>{selectedBuilding.description}</p>
		<button on:click={closeModal}>Close</button>
	</dialog>
{/if}
