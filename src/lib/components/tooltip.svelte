<script lang="ts">
	import type { Snippet } from 'svelte';

	let { tooltip, children }: { tooltip: Snippet; children: Snippet } = $props();
</script>

<div>
	<div class="content">{@render children()}</div>
	<span>{@render tooltip()}</span>
</div>

<style>
	span {
		visibility: hidden;
		position: absolute;
		top: 100%;
		left: 0%;
		width: 100%;
		margin-left: -200px;
		margin-bottom: 10px;
		background-color: #212121;
		color: #fff;
		border: 3px solid #606060;
		text-align: center;
		padding: 5px 0;
		z-index: 1;
	}

	div {
		position: relative;
	}

	.content:hover + span {
		visibility: visible;
	}
</style>
