<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Logo from '../assets/rebel_city_logo.png';
	import '../base.css';
	let links = [
		{ text: 'Rules', url: '/rules' },
		{ text: 'Map', url: '/map' },
		// { text: 'NPCs', url: '/npcs' },
		{ text: 'Factions', url: '/factions' },
		{ text: 'Equipment', url: '/equipment' },
		{ text: 'Research', url: '/research' }
	];
	let isMobileMenuOpen = false;

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
		console.log('isMobileMenuOpen', isMobileMenuOpen);
	}

	onMount(() => {
		function closeMobileMenu() {
			isMobileMenuOpen = false;
		}

		window.addEventListener('resize', closeMobileMenu);
		return () => {
			window.removeEventListener('resize', closeMobileMenu);
		};
	});
</script>

<nav>
	<a href="/">
		<img src={Logo} alt="Logo" />
	</a>
	<button class="burger-menu" on:click={toggleMobileMenu}>
		<span class="burger-line"></span>
		<span class="burger-line"></span>
		<span class="burger-line"></span>
	</button>
	{#if isMobileMenuOpen}
		<div class="mobile-menu">
			{#each links as link}
				<a href={link.url} class:active={$page.url.pathname === link.url}>{link.text}</a>
			{/each}
		</div>
	{/if}
	<div class="desktop-menu">
		{#each links as link}
			<a href={link.url} class:active={$page.url.pathname === link.url}>{link.text}</a>
		{/each}
	</div>
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

	.burger-menu {
		display: none;
		background-color: transparent;
		border: none;
		cursor: pointer;
	}

	.burger-line {
		display: block;
		width: 25px;
		height: 3px;
		background-color: white;
		margin-bottom: 5px;
	}

	.mobile-menu {
		position: absolute;
		top: 50px;
		left: 0;

		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #333;
		padding: 10px;
	}

	main {
		margin-top: 1rem;
	}

	@media (max-width: 768px) {
		nav .desktop-menu {
			display: none;
		}

		.burger-menu {
			display: block;
		}
	}
</style>
