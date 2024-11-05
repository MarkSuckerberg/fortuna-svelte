<script lang="ts">
	import { browser } from '$app/environment';
	import { Character } from '$lib/character.svelte';
	import CharacterDisplay from '$lib/components/characterDisplay.svelte';
	import InfoColumn from '$lib/components/infoColumn.svelte';
	import StatColumn from '$lib/components/statColumn.svelte';
	import TraitColumn from '$lib/components/traitColumn.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let character = $state(new Character());

	if (browser) {
		const storedCharacter = localStorage.getItem('character');
		if (storedCharacter) {
			try {
				character = new Character(JSON.parse(storedCharacter));
			} catch (e) {
				console.error(e, storedCharacter);
			}
		}

		$effect(() => {
			localStorage.setItem('character', JSON.stringify(character));
		});
	}

	function downloadCharacter() {
		const blob = new Blob([JSON.stringify(character, null, 4)], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'character.json';
		a.click();
		URL.revokeObjectURL(url);
		a.remove();
	}

	function copyMarkdown() {
		const copyMarkdown = `
# ${character.name}

**Species**: ${character.species}
**Pronouns**: ${character.pronouns}
**Role**: ${character.role}

## Traits

${character.traits.map((trait) => `- [${trait.name}]`).join('\n')}

## Stats

${Object.entries(character.stats)
	.map(([stat, value]) => `- ${stat}: ${value}`)
	.join('\n')}

## Bio

${character.bio}

## Image

![${character.name}](${character.image})
`;

		navigator.clipboard.writeText(copyMarkdown);
	}
</script>

<div class="hidden grid-cols-3 px-3 sm:grid">
	<div class="text-left">
		<h2>Traits</h2>
	</div>
	<div class="text-center">
		<h2>Info</h2>
	</div>
	<div class="text-right">
		<h2>Stats</h2>
	</div>
</div>

<div class="character-display flex w-full flex-col gap-3 px-3 *:flex-1 *:text-center sm:flex-row">
	<div class="sm:text-left">
		<TraitColumn bind:character traits={data.traits} />
	</div>
	<div class="sm:text-center">
		<InfoColumn bind:character />
		<CharacterDisplay bind:character />
	</div>
	<div class="sm:text-right">
		<StatColumn bind:character />
	</div>
</div>

<textarea class="w-full" placeholder="Biographical information here!" bind:value={character.bio}
></textarea>

<div class="text-center *:pb-3 *:pl-3">
	<button onclick={copyMarkdown}>[ Copy Character Sheet ]</button>

	<br />

	<button onclick={downloadCharacter}>[ Download Data ]</button>
	<button onclick={() => navigator.clipboard.writeText(JSON.stringify(character, null, 4))}
		>[ Copy Data ]</button
	>

	<br />

	<button
		onclick={() => {
			if (confirm('Are you sure you want to reset your character?')) {
				character = new Character();
			}
		}}>[ Reset Character ]</button
	>
	<button
		onclick={() =>
			browser &&
			confirm('Are you sure you want to clear your browser autosave?') &&
			localStorage.removeItem('character')}>[ Clear Browser Save ]</button
	>
</div>

<style>
	.character-display {
		background-color: #171717;
		color: #e6e6e6;
		border-top: 8px double #e6e6e6;
		border-bottom: 8px double #e6e6e6;
		min-height: 400px;
		font-size: 22px;
	}
</style>
