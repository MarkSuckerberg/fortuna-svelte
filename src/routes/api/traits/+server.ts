import { getTraits } from '$lib/server/getTraits';
import { json } from '@sveltejs/kit';

export async function GET({ fetch, setHeaders }) {
	setHeaders({ 'Cache-Control': 'max-age=604800, stale-while-revalidate=86400' });

	const traits = await getTraits(fetch);

	return json(traits);
}
