import type { Trait } from '#lib/trait.ts';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	return {
		traits: (await (await fetch('api/traits')).json()) as Trait[]
	};
};
