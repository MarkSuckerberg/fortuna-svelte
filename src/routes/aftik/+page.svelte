<script lang="ts">
	import Aftik from '$lib/components/aftik.svelte';

	let colorProps = {
		mainColor: '#999999',
		accentColor: '#008000',
		shirtColor: '#0000aa',
		scarfMain: '#5555ff',
		scarf2: '#767676'
	};

	function download(url: string, filename: string) {
		const a = document.createElement('a');
		a.href = url;
		a.download = filename;
		a.click();
		a.remove();
	}

	let svgUrl = '';

	function generateSvg() {
		if (svgUrl) {
			return svgUrl;
		}

		const svg = document.getElementById('download')!;
		const blob = new Blob([svg.innerHTML], { type: 'image/svg+xml' });
		svgUrl = URL.createObjectURL(blob);
		return svgUrl;
	}

	function downloadSvg() {
		const url = generateSvg();
		download(url, 'aftik.svg');
	}

	let pngUrl = '';

	function downloadPng() {
		if (pngUrl) {
			download(pngUrl, 'aftik.png');
			return;
		}

		const url = generateSvg();
		const img = new Image();
		img.src = url;
		img.onload = () => {
			const canvas = document.createElement('canvas');
			canvas.width = img.width;
			canvas.height = img.height;
			const ctx = canvas.getContext('2d')!;
			ctx.drawImage(img, 0, 0);
			canvas.toBlob((blob) => {
				if (!blob) {
					return;
				}
				const url = URL.createObjectURL(blob);
				download(url, 'aftik.png');
				pngUrl = url;
			});
			canvas.remove();
		};
	}
</script>

<div class="character-display flex w-full flex-col p-3 *:flex-grow sm:flex-row">
	<div class="flex flex-col text-center sm:text-left">
		<label>
			Main Color:
			<input type="color" bind:value={colorProps.mainColor} />
		</label>
		<label>
			Accent Color:
			<input type="color" bind:value={colorProps.accentColor} />
		</label>
		<label>
			Shirt Color:
			<input type="color" bind:value={colorProps.shirtColor} />
		</label>
		<label>
			Scarf Main Color:
			<input type="color" bind:value={colorProps.scarfMain} />
		</label>
		<label>
			Scarf Accent Color:
			<input type="color" bind:value={colorProps.scarf2} />
		</label>
		<button class="sm:text-left" on:click={downloadSvg}>Download SVG</button>
		<button class="sm:text-left" on:click={downloadPng}>Download PNG</button>
	</div>

	<div id="download">
		<Aftik {...colorProps} />
	</div>
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
