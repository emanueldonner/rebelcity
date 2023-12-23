<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { attributes, factions } from '../../npc_data.js';

	export let data;

	$: {
		console.log('data', data);
		npcId = parseInt(data);
		npcObject = npcs.find((npc) => npc.id === npcId);
	}

	let npcId;
	let npcObject;

	onMount(async () => {
		console.log('data', data);
		npcId = parseInt($page.params.npc_id);
		npcObject = npcs.find((npc) => npc.id === npcId);
	});

	function makeUppercase(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	function getAttributeSquares(score, aColor) {
		console.log(score, aColor);
		const squares = [];
		for (let i = 0; i < 10; i++) {
			const attr_color = i < score ? aColor : 'lightgrey';
			console.log(attr_color);
			squares.push({ attr_color });
		}
		return squares;
	}
</script>

<div class="npc-sheet-container">
	{#if npcObject === undefined}
		<h2>NPC not found</h2>
	{:else}
		<div
			class="npc-sheet npc-sheet-left"
			style="background-color: {factions[npcObject.faction].prim_color}"
		>
			<div class="avatar" style="background-color: {npcObject.tag_color}">
				<img src={`../assets/avatars/${npcObject.avatar}`} alt="Avatar" />
			</div>
			<div
				class="name-and-faction"
				style="background-color: {factions[npcObject.faction].sec_color}"
			>
				<div class="npc-name">
					<h2>{npcObject.name}</h2>
				</div>
				<div class="npc-faction">
					<img
						src="../assets/factions/{factions[npcObject.faction].icon}"
						alt={factions[npcObject.faction].name}
					/>
				</div>
			</div>
			<div class="info-container" style="background-color: {factions[npcObject.faction].sec_color}">
				<div class="npc-job">
					<p>{npcObject.job}</p>
				</div>
				<div class="short-info">
					<p>{npcObject.short_info}</p>
				</div>

				<table class="attribute-table">
					<tbody>
						{#each Object.entries(npcObject.attributes) as [attribute, score]}
							<tr>
								<td>{attributes[attribute].title}:</td>
								<td class="score-data">
									{#each getAttributeSquares(score, attributes[attribute].color) as square}
										<span class="attribute-square" style="background-color: {square.attr_color};"
										></span>
									{/each}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
		<div
			class="npc-sheet npc-sheet-right"
			style="background-color: {factions[npcObject.faction].prim_color}"
		>
			<div class="info-container right-info-container">
				{#each Object.entries(npcObject.info) as [key, value]}
					<div
						class="npc-info-box"
						style="background-color: {factions[npcObject.faction].sec_color}"
					>
						<div class="npc-info">
							<h3>{makeUppercase(key)}</h3>
							<p>{value}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Young+Serif&display=swap');

	:root {
		--border-size: 0.5rem;
		--border-radius: 0.6rem;
		--border-inner-radius: 0.4rem;
	}

	.npc-sheet-container {
		display: flex;
		font-family: 'Young Serif', serif;
		/* max-width: 90vw; */
		margin: 2rem auto;
	}
	@media (max-width: 920px) {
		.npc-sheet-container {
			flex-direction: column;
			margin-bottom: 2rem;
		}
		.npc-sheet-left {
			margin-right: 0 !important;
			margin-bottom: 1rem;
		}
	}

	.npc-sheet {
		border-radius: var(--border-radius);
		background-image: url('../assets/avatars/dirt.png');
		background-size: cover;

		padding: var(--border-size);
		max-width: 360px;
		flex: 1;
		position: relative;
	}

	.attribute-square {
		display: inline-block;
		width: 12px;
		height: 12px;
		margin: 0 2px;
	}
	.npc-sheet-left {
		margin-right: 20px;
	}
	.npc-sheet .avatar {
		display: flex;
		align-items: center;
		justify-content: center;
		border-top-right-radius: var(--border-inner-radius);
		border-top-left-radius: var(--border-inner-radius);
	}
	.npc-sheet .avatar img {
		width: 200px;
		height: 200px;
		margin-top: 2rem;
		object-fit: cover;
	}

	.npc-sheet .name-and-faction {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 1rem;
		margin: var(--border-size) 0;
	}

	.npc-sheet .name-and-faction .npc-name h2 {
		font-size: 1.2rem;
		margin: 0;
	}
	.npc-faction {
		display: flex;
	}
	.npc-faction img {
		width: 20px;
		height: 20px;
	}
	.info-container {
		padding: 1rem;
		border-bottom-left-radius: var(--border-inner-radius);
		border-bottom-right-radius: var(--border-inner-radius);
	}
	.info-container p {
		margin: 0.6rem 0;
		line-height: 1.1;
	}
	.npc-job {
		color: #555;
	}
	.attribute-table {
		font-size: 0.8rem;
		padding: 0;
		width: 100%;
	}
	.attribute-table .score-data {
		text-align: right;
	}

	.npc-sheet-right {
		display: flex;
	}
	.right-info-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		border-radius: 0.6rem;
		padding: 0;
	}

	.npc-info-box {
		/* border-bottom: var(--border-size) solid; */
		margin-bottom: var(--border-size);
		padding: 0.3rem 1rem;

		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.npc-info-box:first-child {
		border-top-left-radius: var(--border-inner-radius);
		border-top-right-radius: var(--border-inner-radius);
	}
	.npc-info-box:last-child {
		margin-bottom: 0;
		border-bottom-left-radius: var(--border-inner-radius);
		border-bottom-right-radius: var(--border-inner-radius);
	}
	.npc-info-box .npc-info {
		flex: 1;
	}
	.npc-info-box h3 {
		font-size: 18px;
		margin: 0 0 0.1rem 0;
		color: rgba(0, 0, 0, 0.5);
	}

	.npc-sheet-right p {
		margin: 0.2rem 0;
	}
</style>
