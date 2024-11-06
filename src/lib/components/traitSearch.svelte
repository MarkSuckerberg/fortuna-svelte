<script lang="ts">
	import { type Trait } from '$lib/trait';

	let {
		traits = $bindable([]),
		selected = $bindable(traits[0])
	}: {
		traits: Trait[];
		selected: Trait;
	} = $props();

	let query = $state('');
</script>

<div class="flex h-full flex-col overflow-hidden">
	<input
		type="text"
		class="border-l-0 border-t-0 border-slate-500 hover:border-l-0 hover:border-t-0"
		placeholder="Search"
		bind:value={query}
	/>
	<ul class="h-full overflow-scroll">
		{#each traits as trait (trait.name)}
			{#if query === '' || trait.name
					.toLowerCase()
					.includes(query.toLowerCase()) || trait.otherVersions.some((version) => version
						.toLowerCase()
						.includes(query.toLowerCase()))}
				<li class={selected.name === trait.name ? 'bg-cyan-400 px-3' : 'px-3'}>
					<button
						onclick={() => {
							selected = trait;
						}}
						class="w-full text-left hover:text-cyan-200"
					>
						{trait.name}
					</button>
				</li>
			{/if}
		{/each}
	</ul>
</div>
