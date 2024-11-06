<script>
	import aftikImage from '$lib/assets/olivebutton.png';
</script>

<div class="*:p-3">
	<figure class="float-right sm:w-1/3">
		<img
			class="border-2 border-black"
			src={aftikImage}
			alt="Two overlapping doodles of an aftik, a green raptorial creature. In one shot, they stand neutral and look at the viewer, wearing a blue striped scarf. In the other, they are pushing a button with a frenzied expression on their face, as an airlock opens in the background behind them."
		/>
		<figcaption class="text-lg italic">
			Pictured: My aftik, Olive, proving their worth to the crew by spacing the entire cargo
			bay.
		</figcaption>
	</figure>

	<h1>Hello, and welcome to the new Tabletuna utilities site!</h1>

	<p>
		I felt like the <a href="https://old-fortuna.suckerberg.gay">old version</a> of this was awfully
		slow and outdated, and I wanted to practice a new web framework. There's still not a ton more
		to this site, though I'm hoping to add more eventually as it's much easier to do so.
	</p>

	<p>
		The <a href="character">Character creator</a> has been updated a lot, adding a trait
		selection inspired by <a href="https://pathbuilder2e.com/">Pathbuilder 2e's</a> interface.
		Also, the aftik generator actually allows you to generate a PNG from the site itself instead
		of having to convert it from a PNG. More species coming soon...? Not sure, since a lot of
		the other assets provided in the starter pack are that generic. Besides the literal
		<a href="https://cosmosdex.com/cosmosdex/species/generic">Generics</a>, but you probably
		knew that.
	</p>

	<p>
		Sadly the rules for the tabletop haven't really been touched much, they're the same as they
		were on the old site. Still just an embed of the online rulebook. The character creator
		dropped support for the PBTA moves and inventory, but I'm hoping to add something simple for
		a more abstract TTRPG that could be applied to different systems, or just for flavour.
	</p>

	<p>
		Also, for those more programmatically inclined, the API for getting traits from the
		Cosmosdex page is now public-facing and actually updates from the source page (with
		significant caching, of course). Feel free to use it as long as you respect the cache
		headers, I may work to add much more functionality such as filtering or even more data, like
		species, items, who knows. I want to cache even harder before then though so that the source
		site isn't bombarded with requests.
	</p>

	<p>
		Anyways, thank you for reading, I hope you get some enjoyment out of the few tools I have
		here!
	</p>
</div>
