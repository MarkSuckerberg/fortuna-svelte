<script lang="ts">
	import type { Character } from '$lib/character.svelte';

	let { character = $bindable() }: { character: Character } = $props();
</script>

<ul>
	<li>
		<label>
			<input type="text" bind:value={character.name} placeholder="Name" />
		</label>
	</li>
	<li>
		<label>
			<input type="text" bind:value={character.pronouns} placeholder="Pronouns" />
		</label>
	</li>
	<li>
		<label>
			<input type="text" bind:value={character.species} placeholder="Species" />
		</label>
	</li>
	<li>
		<label>
			<input type="text" bind:value={character.role} placeholder="Role" />
		</label>
	</li>
</ul>

<style>
	input {
		color: #e6e6e6;
		background: none;
		border: 1px solid transparent;
		cursor: text;
		text-align: center;
	}

	input:hover {
		border: 1px solid grey;
	}
</style>
