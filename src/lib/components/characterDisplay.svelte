<script lang="ts">
	import type { Character } from '#lib/character.svelte.ts';

	let { character = $bindable() }: { character: Character } = $props();
</script>

<img src={character.image} class="w-full pt-32" alt="A picture of {character.name}." />
<input type="text" inputmode="url" bind:value={character.image} />
