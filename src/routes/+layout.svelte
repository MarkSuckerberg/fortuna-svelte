<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';
	import { navigating } from '$app/stores';
	let { children }: { children: Snippet } = $props();
</script>

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

	<footer class="flex w-full flex-row bg-slate-500 *:p-2">
		<a href="/fortuna-resource-and-starter-pack-conditions.txt"
			>Traits and SVG assets by Gimeurcookie!</a
		>
		<a class="ml-auto" href="https://github.com/MarkSuckerberg/fortuna-svelte"
			>Site Source Code</a
		>
	</footer>
</div>

<style>
	.main-box {
		width: max(75vw, min(1000px, 100%));
		margin: 1em auto;
		background-color: white;
	}

	a:hover {
		background-color: #e6e6e6;
	}
</style>
