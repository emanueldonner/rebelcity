<script>
	import '../base.css';
	import { page } from '$app/stores';
	import Logo from '../assets/rebel_city_logo.png';
	let links = [
		{ text: 'Map', url: '/map' },
		{ text: 'NPCs', url: '/npcs' },
		// { text: 'Factions', url: '/factions' },
		{ text: 'Research', url: '/research' }
	];
</script>

<nav>
	<a href="/">
		<img src={Logo} alt="Logo" />
	</a>
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
		display: flex;
		align-items: center;
	}

	nav img {
		height: 30px;
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
