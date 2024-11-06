<script lang="ts">
	import { TraitValue, type Trait } from '$lib/trait';
	import TraitSearch from './traitSearch.svelte';

	let {
		traits = $bindable(),
		callback = () => {},
		open = $bindable(),
		traitDict = $bindable()
	}: {
		traits: Trait[];
		callback: (trait: Trait) => void;
		open: boolean;
		traitDict?: Record<string, Trait[]>;
	} = $props();

	let dialog = $state<HTMLDialogElement>();
	let selected = $state<Trait>(traits[0]);
	let currentTab = $state((traitDict && Object.keys(traitDict)[0]) || 'All');

	$effect(() => {
		if (open) dialog?.showModal();
	});

	let currentTraits = $derived(currentTab != 'All' && traitDict ? traitDict[currentTab] : traits);
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<dialog
	bind:this={dialog}
	onclose={() => (open = false)}
	onclick={(e) => {
		if (e.target === dialog) dialog.close();
	}}
>
	<div class="flex h-full flex-col overflow-hidden">
		{#if traitDict}
			<nav class="flex flex-row bg-slate-500 *:p-3">
				{#each Object.keys(traitDict) as tab (tab)}
					<button
						class={tab === currentTab ? 'bg-cyan-400' : ''}
						onclick={() => (currentTab = tab)}
					>
						{tab}
					</button>
				{/each}
				<button
					class={currentTab === 'All' ? 'bg-cyan-400' : ''}
					onclick={() => (currentTab = 'All')}
					>All
				</button>
			</nav>
		{/if}
		<div class="grid h-full grid-cols-3 gap-3 overflow-hidden">
			<TraitSearch traits={currentTraits} bind:selected />

			<div class="col-span-2 flex flex-col overflow-hidden">
				<div class="overflow-scroll">
					<h2>{selected.name}</h2>
					<hr />
					<p>
						{@html selected.effectsHTML}
					</p>
					<p>
						<b>Type:</b>
						{TraitValue[selected.value]}
						{#if selected.otherVersions.length > 0}
							<br />
							<b>Other versions:</b>
							{selected.otherVersions.join(', ')}
						{/if}
						<br />
						<b><a href={selected.link}>Link</a></b>
					</p>
					{#if selected.name.includes('X')}
						<hr />
						<p>
							<b class="text-red-800">Trait Target:</b>
							<input
								class="text-left"
								type="text"
								bind:value={selected.target}
								placeholder="X"
							/>
						</p>
					{/if}
				</div>

				<div class="mt-auto bg-slate-500 *:p-3">
					<button
						onclick={() => {
							callback(selected);
							dialog?.close();
						}}
					>
						[ Accept ]
					</button>
					<button onclick={() => dialog?.close()}> [ Cancel ] </button>
				</div>
			</div>
		</div>
	</div>
</dialog>

<style>
	dialog {
		width: max(66vw, min(1000px, 100vw));
		height: max(66svh, 250px);
	}

	dialog::backdrop {
		background-color: rgba(0, 0, 0, 0.5);
	}

	input {
		border: 1px solid black;
	}
</style>
