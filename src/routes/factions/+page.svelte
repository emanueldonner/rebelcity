<script>
	import { npcs } from '../npc_data.js';
	import NPCSheet from './[faction_id]/+page.svelte';
	import { pushState, preloadData } from '$app/navigation';
	import { page } from '$app/stores';

	let currentIndex = 0;
	let isBackDisabled = true;
	let isForwardDisabled = false;

	const onLinkClick = async (id) => {
		const link = `/npcs/${id}`;
		console.log(link);
		const result = await preloadData(link);
		if (result.type === 'loaded' && result.status === 200) {
			pushState(link, { selected: id });
		} else {
			// something bad happened! try navigating
			goto(link);
		}
	};

	const goBack = () => {
		currentIndex--;
		isForwardDisabled = false;
		if (currentIndex === 0) {
			isBackDisabled = true;
		}
		onLinkClick(npcs[currentIndex].id);
	};

	const goForward = () => {
		currentIndex++;
		isBackDisabled = false;
		if (currentIndex === npcs.length - 1) {
			isForwardDisabled = true;
		}
		onLinkClick(npcs[currentIndex].id);
	};
</script>

<div class="main-container">
	<div class="button-container">
		<button class="button back-button" on:click={goBack} disabled={isBackDisabled}></button>
		<button class="button forward-button" on:click={goForward} disabled={isForwardDisabled}
		></button>
	</div>
	<NPCSheet data={$page.state.selected} />
</div>

<style>
	.main-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.button-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 150px;
		margin-top: 1rem;
	}
	.button {
		background-color: transparent;

		color: white;
		padding: 0;
		height: 50px;
		width: 50px;
		border: none;
		border-radius: 5px;
		margin: 0px;
		cursor: pointer;
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
	}
	.button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	.back-button {
		background-image: url(../assets/avatars/arrow_left.png);
	}
	.forward-button {
		background-image: url(../assets/avatars/arrow_left.png);
		transform: rotate(180deg);
	}
</style>
