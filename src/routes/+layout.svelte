<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';
	import { navigating } from '$app/stores';
	import aftik from '$lib/assets/aftik.png';
	let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	<title>Tabletuna Tools</title>
	<meta name="description" content="Aftik and Character Creator for the Cosmosdex" />
	<meta name="author" content="Mark Suckerberg" />
	<meta name="keywords" content="Fortuna, Cosmosdex, Aftik, TTRPG" />
	<meta name="referrer" content="strict-origin-when-cross-origin" />
	<link rel="canonical" href="https://fortuna.stellers.gay" />

	<!-- Embed Tags -->
	<meta property="og:url" content="https://fortuna.stellers.gay" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Tabletuna Tools" />
	<meta property="og:description" content="Aftik and Character Creator for the Cosmosdex" />
	<meta property="og:image" content={aftik} />
	<meta property="og:image:width" content="509" />
	<meta property="og:image:height" content="450" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="fortuna.stellers.gay" />
	<meta property="twitter:url" content="https://fortuna.stellers.gay" />
	<meta name="twitter:title" content="Tabletuna Tools" />
	<meta name="twitter:description" content="Aftik and Character Creator for the Cosmosdex" />
	<meta name="twitter:image" content={aftik} />
</svelte:head>

<div class="main-box">
	<nav class="mb-2 flex w-full flex-row bg-slate-500 text-black *:p-2 *:no-underline">
		<a href="/">Home</a>
		<a href="/character">Character Creator</a>
		<a href="/aftik">Aftik Creator</a>
		<a href="/rules">Tabletuna Rules</a>
		<a class="ml-auto" href="https://cosmosdex.com/">Learn about the Cosmosdex here!</a>
	</nav>

	{#if $navigating}
		<div class="text-center">Loading {$navigating.to?.route.id}...</div>
	{/if}

	<main class="min-h-[66vh]">
		{@render children()}
	</main>

	<footer class="grid grid-cols-3 bg-slate-500 *:p-2">
		<a class="text-left" href="/fortuna-resource-and-starter-pack-conditions.txt"
			>Traits and SVG assets by Gimeurcookie!</a
		>
		<a class="text-center" href="https://stellers.gay">Built with love by Mark Suckerberg</a>
		<a class="text-right" href="https://github.com/MarkSuckerberg/fortuna-svelte"
			>Site Source Code</a
		>
	</footer>
</div>

<style>
	.main-box {
		width: max(75vw, min(1000px, 100%));
		margin: 1em auto;
		background-color: white;
		border: 1px solid black;
	}

	a:hover {
		background-color: #e6e6e6;
	}
</style>
