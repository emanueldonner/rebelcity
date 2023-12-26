<script>
	import { factions } from '$lib/factions.js';
	import 'iconify-icon';

	function onFactionClick(faction) {
		console.log('Faction clicked:', faction.title);
	}
</script>

<h1 class="title">Factions</h1>
<div class="factions-container">
	{#each factions as faction}
		<!-- svelte-ignore a11y-interactive-supports-focus -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="faction" on:click={() => onFactionClick(faction)} role="button">
			<iconify-icon class="icon" icon={faction.icon} alt={faction.title} />
			<h2 class="faction-title" style="color: {faction.primaryColor};">{faction.title}</h2>
			<p class="description">{faction.description}</p>
			<p class="benefits"><strong>Benefits:</strong> {faction.benefits}</p>
			<ul class="sub-factions">
				{#each faction.subFactions as subFaction}
					<li>{subFaction.title}</li>
				{/each}
			</ul>
		</div>
	{/each}
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

	.title {
		text-align: center;
		font-family: 'Roboto', sans-serif;
		font-weight: 500;
		margin: 1rem 0;
		font-size: 2rem;
	}

	.factions-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1.5rem;
		padding: 1rem;
	}

	.faction {
		border: 1px solid #ccc;
		border-radius: 8px;
		padding: 1.5rem;
		transition: box-shadow 0.3s ease-in-out;
		text-align: center;
		width: 360px;
	}

	.faction:hover {
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	.icon {
		font-size: 3rem;
		color: inherit; /* Inherits color from parent */
	}

	.faction-title {
		margin: 0.5rem 0;
		font-weight: 500;
	}

	.description,
	.benefits {
		margin: 0.5rem 0;
		font-size: 0.9rem;
	}

	.sub-factions {
		list-style: none;
		padding: 0;
		margin: 1rem 0;
	}

	.sub-factions li {
		margin: 0.3rem 0;
		font-size: 0.8rem;
	}
</style>
