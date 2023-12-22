<script>
	import '../base.css';
	import { page } from '$app/stores';

	let links = [
		{ text: 'Home', url: '/' },
		{ text: 'Map', url: '/map' },
		{ text: 'NPCs', url: '/npcs' }
	];
</script>

<nav>
	{#each links as link}
		<a href={link.url} class:active={$page.url.pathname === link.url}>{link.text}</a>
	{/each}
</nav>
<main>
	<slot />
</main>

<style>
	nav {
		background-color: #333;
		color: white;
		padding: 10px;
	}

	nav a {
		color: white;
		margin-right: 10px;
		text-decoration: none;
	}

	nav a.active {
		color: rosybrown;
	}
	main {
		width: 100%;
		margin: 0;
		padding: 0;
	}
</style>
