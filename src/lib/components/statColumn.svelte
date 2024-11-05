<script lang="ts">
	import type { Character } from '$lib/character.svelte';

	let { character = $bindable() }: { character: Character } = $props();
</script>

<ul>
	{#each Object.keys(character.stats) as name (name)}
		<li>
			<label>
				{name} -
				<input
					type="number"
					min="0"
					max="10"
					step="0"
					maxlength="2"
					inputmode="numeric"
					bind:value={character.stats[name]}
				/>
			</label>
		</li>
	{/each}
	<li>
		{Object.values(character.stats).reduce((acc, val) => acc + val, 0)} / 26
	</li>
</ul>
<button onclick={() => character.randomizeStats()}>Randomize</button>

<style>
	input {
		background: none;
		border: 1px solid transparent;
		cursor: text;
		text-align: center;
		width: 2rem;
	}

	input:hover {
		border: 1px solid grey;
	}

	input[type='number'] {
		appearance: textfield;
		-moz-appearance: textfield;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}
</style>
