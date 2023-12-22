<script>
	import Phaser from 'phaser';
	import { onMount, onDestroy } from 'svelte';

	let phaserGame;
	let gameContainer;
	let selectedBuilding = null;

	const config = {
		type: Phaser.AUTO,
		parent: 'game-container',
		width: 800,
		height: 600,
		scene: {
			preload: preload,
			create: create
		}
		// Additional Phaser configuration here
	};

	function preload() {
		// Load tile images for different building types
		this.load.image('city-hall', 'tile.png');
		// Load other building images similarly
	}

	function create() {
		// Create the map with important and basic buildings
		const buildings = generateBuildings(); // You will define this function
		buildings.forEach((building) => {
			const sprite = this.add.sprite(building.x, building.y, building.type);
			sprite.setInteractive(); // Make the sprite interactive
			sprite.on('pointerdown', () => {
				selectedBuilding = building; // Set the selected building for the modal
			});
			// Position the sprite correctly for isometric view
			// Adjust the positioning logic as per isometric calculations
		});
	}

	onMount(() => {
		phaserGame = new Phaser.Game(config);
	});

	onDestroy(() => {
		if (phaserGame) {
			phaserGame.destroy(true);
		}
	});

	const importantBuildings = [
		{
			name: 'City Hall',
			size: 3,
			info: 'The seat of local government and a nexus of political activity. Infiltrating City Hall can provide access to sensitive documents and allow the planting of moles within the government structure. Players can leverage their influence here to sway city policies subtly in favor of the revolution. However, the risk of exposure is high due to tight security and surveillance.'
		},
		{
			name: 'University',
			size: 3,
			info: "A breeding ground for new ideas and passionate youth. The University offers a rich pool of potential recruits among both students and faculty. It's a place for spreading revolutionary ideas and organizing student-led protests. The challenge lies in the heavy presence of academic authority and the possibility of intellectual debates that could both bolster and undermine revolutionary ideals.'"
		},
		{
			name: 'Big Square',
			size: 3,
			info: 'The Big Square is the cultural and social heart of the city, ideal for mass demonstrations and public speeches to drum up support. Its symbolic value makes it a prime target for revolutionary activities but also a hotspot for law enforcement. Holding the square could lead to a significant morale boost, yet the danger of a crackdown is ever-present.'
		},
		{
			name: 'Factory',
			size: 4,
			info: "The Factory is not only an industrial hub but also a bedrock of the workforce. Coordinating with the workers' unions here could lead to organized strikes, disrupting the city's production and drawing attention to labor issues aligned with the revolution. It's an excellent venue for fostering solidarity and recruiting fervent supporters among the working class. Engaging with union leaders and rallying the workers can significantly bolster the movement's manpower and resources. However, such actions come with the risk of retaliation from corporate security forces and the potential for increased surveillance, so strategies must be crafted with care to avoid tipping the balance unfavorably."
		},
		{
			name: 'Mall',
			size: 2,
			info: 'The Mall, a temple of consumerism, can be a place to spread propaganda and recruit from the discontented retail workforce. It’s a symbol of capitalist excess where subtle revolutionary messages can be disseminated. Yet, the commercial nature of the Mall means that security is high, and any disturbance can quickly escalate into a public relations nightmare.'
		}
	];
	const otherBuildings = ['Apartment Building', 'Park', 'Parking Space', 'Office Building'];

	function shuffle(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	function generateTiles() {
		let availableSpaces = gridSize * gridSize;

		const importantTiles = importantBuildings.map((building) => {
			availableSpaces -= building.size * building.size;
			return {
				name: building.name,
				info: building.info,
				tileClass: `important-building ${building.name.toLowerCase().replace(/\s+/g, '-')}`,
				gridSpan: building.size,
				rowSpan: building.size
			};
		});

		if (availableSpaces < 0) {
			throw new Error('Important buildings do not fit within the grid size');
		}

		const otherTiles = [];
		for (let i = 0; i < availableSpaces; i += 4) {
			const randomIndex = Math.floor(Math.random() * otherBuildings.length);
			const building = otherBuildings[randomIndex];
			const kebabCaseName = building.toLowerCase().replace(/\s+/g, '-');
			otherTiles.push({
				name: building,
				tileClass: `other-building ${kebabCaseName}`,
				gridSpan: 2,
				rowSpan: 2
			});
		}

		return shuffle([...importantTiles, ...otherTiles]);
	}

	onMount(() => {
		tiles = generateTiles().map((tile, index) => {
			const col = index % gridSize;
			const row = Math.floor(index / gridSize);
			return {
				...tile,
				x: ((col - row) * tileWidth) / 2,
				y: ((col + row) * tileHeight) / 2
			};
		});
	});

	// Example tile dimensions, adjust as needed
	const tileWidth = 100;
	const tileHeight = 50;

	function selectBuilding(building) {
		console.log('building', building);
		selectedBuilding = building;
	}

	function closeModal() {
		selectedBuilding = null;
	}
</script>

<div id="game-container" bind:this={gameContainer}></div>
{#if selectedBuilding}
	<dialog open class="info-modal">
		<h2>{selectedBuilding.name}</h2>
		<p>{selectedBuilding.info}</p>
		<button on:click={closeModal}>Close</button>
	</dialog>
{/if}

<style>
	.map {
		display: grid;
		grid-template-columns: repeat(var(--side), 1fr);
		grid-template-rows: repeat(var(--side), 1fr);
		gap: 0.8rem;
		padding: 2rem;
		width: 60%;
		background-color: #222;
	}
	.isometric-map {
		position: relative;
	}

	.tile {
		position: absolute;
		width: var(--tileWidth);
		height: var(--tileHeight);
		/* Adjust transform to align the tiles in isometric view */
		transform: translate(-50%, -50%);
		/* Add additional styling for isometric tiles */
	}

	/* .tile {
		font-family: 'Arial';
		font-weight: 100;
		color: rgba(255, 255, 255, 0.6);
		box-sizing: border-box;
		padding: 0.5rem;
		display: flex;
		text-align: center;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		aspect-ratio: 1/1;
		cursor: pointer;
	} */

	.important-building {
		background-color: #333;
		border: 4px solid #555;
		font-weight: 900;
		color: #eee;
	}
	.important-building:hover {
		background-color: #555;
	}

	.apartment-building {
		background-color: #222244;
	}

	.park {
		background-color: #224422;
	}

	.parking-space {
		background-color: #222222;
	}

	.office-building {
		background-color: #442222;
	}

	.info-modal {
		padding: 1em 2rem;
		max-width: 18rem;
		background: #333;
		border: none;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
		z-index: 1000;
		color: #eee;
	}
</style>
