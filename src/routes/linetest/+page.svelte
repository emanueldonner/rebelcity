<script>
	import { onMount } from 'svelte';
	let LeaderLine;
	let startElement;
	let endElement;

	onMount(async () => {
		const leaderLineModule = await import('leader-line');
		LeaderLine = leaderLineModule.default || leaderLineModule;
		// Check if elements are defined
		if (startElement && endElement) {
			new LeaderLine(startElement, endElement);
		}
	});
</script>

<div style="position: relative;">
	<div
		bind:this={startElement}
		style="position: absolute; top: 20px; left: 20px; width: 50px; height: 50px; background-color: blue;"
	></div>
	<div
		bind:this={endElement}
		style="position: absolute; top: 120px; left: 120px; width: 50px; height: 50px; background-color: red;"
	></div>
</div>
