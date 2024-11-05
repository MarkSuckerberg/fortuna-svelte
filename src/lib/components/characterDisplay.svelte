<script lang="ts">
	import type { Character } from '$lib/character.svelte';

	let { character = $bindable() }: { character: Character } = $props();
</script>

<img src={character.image} class="w-full pt-[128px]" alt="A picture of {character.name}." />
<input type="text" inputmode="url" bind:value={character.image} />
