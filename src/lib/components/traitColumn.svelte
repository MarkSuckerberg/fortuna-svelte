<script lang="ts">
	import { traitDictionary, TraitValue, type Trait } from '$lib/trait';
	import TraitDialog from './traitDialog.svelte';
	import type { Character } from '$lib/character.svelte';
	import Tooltip from './tooltip.svelte';

	function valueToClass(value: TraitValue) {
		switch (value) {
			case TraitValue.Neutral:
				return 'neutral';
			case TraitValue.Positive:
				return 'good';
			case TraitValue.Negative:
				return 'bad';
			case TraitValue.Mystery:
				return 'special';
			case TraitValue.Ability:
				return 'ability';
			default:
				return '';
		}
	}

	let openDialog = $state(false);

	let { character = $bindable(), traits }: { character: Character; traits: Trait[] } = $props();
</script>

<div class="flex flex-col">
	{#each character.traits as trait, index (trait.name + trait.target)}
		<Tooltip>
			{#snippet tooltip()}
				<h2>{trait.name}</h2>
				<hr />
				<p>{@html trait.effects}</p>
			{/snippet}
			<button
				class="trait {valueToClass(trait.value)} text-left"
				onclick={() =>
					(character.traits = [
						...character.traits.slice(0, index),
						...character.traits.slice(index + 1)
					])}
			>
				[{trait.name}{trait.target ? ` (${trait.target})` : ''}]
			</button>
		</Tooltip>
	{/each}
</div>

<button onclick={() => (openDialog = true)}>> Add Trait</button>
<br />
<button onclick={() => character.randomizeTraits(traits)}>> Randomize Traits</button>

<TraitDialog
	{traits}
	callback={(trait) => character.addTrait(trait)}
	bind:open={openDialog}
	traitDict={traitDictionary(traits)}
/>

<style>
	.trait {
		cursor: pointer;
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
	}

	.trait:hover {
		color: white;
		text-shadow: 0 0 6px;
	}

	.trait.bad {
		color: #ff0000;
	}

	.trait.good {
		color: #00c000;
	}

	.trait.neutral {
		color: #00b6b6;
	}

	.trait.special {
		color: #c27ba0;
	}

	.trait.ability {
		color: #ff00ff;
	}
</style>
