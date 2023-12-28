<script>
	import { equipment, categories } from '$lib/equipment.js'; // Adjust the path as needed
	import 'iconify-icon';

	let selectedCategories = categories.map((cat) => cat.id); // Select all categories by default
	let filteredEquipment = filterEquipment();
	function onEquipmentClick(item) {
		console.log('Equipment clicked:', item.name);
	}

	function filterEquipment() {
		// Filter equipment based on selected categories
		const fEquipment = equipment.filter((item) => {
			// Return true if any of the item's categories are in selectedCategories
			return item.categories.some((cat) => selectedCategories.includes(cat));
		});

		console.log('fEquipment', fEquipment);
		return fEquipment;
	}

	function onCategorySelect(categoryId) {
		if (selectedCategories.includes(categoryId)) {
			selectedCategories = selectedCategories.filter((cat) => cat !== categoryId);
		} else {
			selectedCategories = [...selectedCategories, categoryId];
		}
		filteredEquipment = filterEquipment();
	}
	// Reactive statement to filter equipment based on selected categories
</script>

<h1 class="title">Equipment</h1>

<div class="filter-container">
	{#each categories as category}
		<button
			class="filter-button {selectedCategories.includes(category.id) && 'selected'}"
			on:click={() => onCategorySelect(category.id)}
		>
			<iconify-icon icon={category.icon} />
			{category.name}
		</button>
	{/each}
</div>

<div class="equipment-container">
	{#each filteredEquipment as item}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="equipment-item" on:click={() => onEquipmentClick(item)}>
			<h2>{item.name}</h2>
			<p>{item.description}</p>
			<div class="category-icons">
				{#each item.categories as catId, index}
					<iconify-icon icon={categories.find((cat) => cat.id === catId).icon} />
				{/each}
			</div>
		</div>
	{/each}
</div>

<!-- Existing styles can remain as is -->

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

	:root {
		--background-color: #121212;
		--title-color: #93ffed;
		--text-color: #bbb;
		--item-background-color: #1e1e1e;
		--hover-color: #76b8ad23;
		--selected-color: #76b8ad;
		--border-color: #444;
	}

	.title {
		text-align: center;
		font-family: 'Roboto', sans-serif;
		font-weight: 500;
		margin: 1rem 0;
		color: var(--text-color);
	}

	.equipment-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
		padding: 1rem 2rem;
		background-color: var(--background-color);
	}

	.filter-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1;
		margin-bottom: 1rem;
	}

	.filter-button {
		display: flex;
		align-items: center;
		gap: 0.3rem;
		background-color: var(--item-background-color);
		border: none;
		border-radius: 8px;
		padding: 0.5rem 1rem;
		margin: 0.5rem;
		cursor: pointer;
		color: var(--text-color);
		transition:
			background-color 0.15s ease-in-out,
			box-shadow 0.15s ease-in-out;
	}

	.filter-button:hover {
		background-color: var(--hover-color);
		box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.4);
	}

	.filter-button.selected {
		background-color: var(--selected-color);
		color: var(--background-color);
		box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.4);
	}

	.equipment-item {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background-color: var(--item-background-color);
		border-radius: 8px;
		padding: 1rem 2rem;
		cursor: pointer;
		color: var(--text-color);
	}

	.equipment-item:hover {
		background-color: var(--hover-color);
		box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.4);
	}

	.category-icons {
		display: flex;
		gap: 0.5rem;
		justify-content: flex-end;
	}

	h2 {
		margin: 0.5rem 0;
		font-size: 1.8rem;
		font-weight: 500;
		color: var(--title-color);
	}

	p {
		margin: 0.5rem 0;
		font-size: 1rem;
		color: var(--text-color);
	}
</style>
