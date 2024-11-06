import parser from '$lib/server/traitParser.js';
import { json } from '@sveltejs/kit';

export async function GET({ fetch, setHeaders }) {
	setHeaders({ 'Cache-Control': 'max-age=604800, stale-while-revalidate=86400' });

	const traits = await parser(fetch);

	return json(traits);
}
