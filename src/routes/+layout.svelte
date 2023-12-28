<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Logo from '../assets/rebel_city_logo.png';
	import '../base.css';

	let links = [
		{ text: 'Rules', url: '/rules' },
		{ text: 'Map', url: '/map' },
		{ text: 'Factions', url: '/factions' },
		{ text: 'Equipment', url: '/equipment' },
		{ text: 'Research', url: '/research' }
	];
	let isMobileMenuOpen = false;

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}

	function handleLinkClick() {
		isMobileMenuOpen = false;
	}

	onMount(() => {
		function handleResize() {
			if (window.innerWidth > 768) {
				isMobileMenuOpen = false;
			}
		}

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<nav>
	<a href="/">
		<img src={Logo} alt="Logo" />
	</a>
	<button class="burger-menu" on:click={toggleMobileMenu}>
		<div class="burger-icon" class:open={isMobileMenuOpen}>
			<span></span><span></span>
		</div>
	</button>
	{#if isMobileMenuOpen}
		<div class="mobile-menu-overlay">
			<div class="mobile-menu">
				{#each links as link}
					<a
						class="menu-item"
						href={link.url}
						class:active={$page.url.pathname === link.url}
						on:click={handleLinkClick}>{link.text}</a
					>
				{/each}
			</div>
		</div>
	{/if}
	<div class="desktop-menu">
		{#each links as link}
			<a href={link.url} class:active={$page.url.pathname === link.url}>
				{link.text}
			</a>
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
		justify-content: space-between;
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

	.burger-icon {
		display: grid;
		gap: 8px;
		transform: rotate(0deg);
		transition: transform 0.3s ease;
	}

	.burger-icon span {
		display: block;
		width: 25px;
		height: 2px;
		background-color: white;
		transition: all 0.3s ease;
	}

	.burger-icon.open {
		/* transform: rotate(45deg); */
	}

	.burger-icon.open span:nth-child(1) {
		transform: translateY(5px) rotate(-45deg);
	}

	.burger-icon.open span:nth-child(2) {
		transform: translateY(-5px) rotate(45deg);
	}

	.mobile-menu-overlay {
		position: absolute;
		z-index: 10;
		top: 50px;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
		display: flex;
		justify-content: center;
		/* align-items: center; */
	}

	.mobile-menu {
		background-color: #333;
		padding: 20px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
		justify-content: center;
	}

	.menu-item {
		display: block;
		font-size: 2.5rem;
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
