import { TraitValue, type Trait } from '../trait';
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';

export async function getTraits(customFetch: typeof fetch = fetch): Promise<Trait[]> {
	const response = await customFetch('https://cosmosdex.com/cosmosdex/traits/');
	const data = await response.text();

	const doc = new JSDOM(data, {
		url: 'https://cosmosdex.com/cosmosdex/traits/'
	}).window.document;

	const listElements = doc.querySelectorAll('.dexsectiontextmiddle');

	const traits: Trait[] = [];

	for (const element of listElements) {
		const traitClass = element.querySelector('div')?.className;

		let value: TraitValue;
		switch (traitClass) {
			case 'bluetrait':
				value = TraitValue.Neutral;
				break;
			case 'greentrait':
				value = TraitValue.Positive;
				break;
			case 'redtrait':
				value = TraitValue.Negative;
				break;
			case 'purpletrait':
				value = TraitValue.Mystery;
				break;
			case 'yellowtrait':
				value = TraitValue.Ability;
				break;
			default:
				continue;
		}

		const linkElement = element.querySelector('a');

		if (!linkElement?.textContent) {
			continue;
		}

		const name = linkElement.textContent.slice(1, -1);
		const link = linkElement.href;

		const effectsElement = element.querySelector('p');
		const effectsText = effectsElement?.textContent || '';
		const effectsHTML = DOMPurify.sanitize(effectsElement?.innerHTML || effectsText);

		if (!effectsElement) {
			continue;
		}

		const otherVersions =
			element
				.querySelector('div .traitotherver')
				?.textContent?.split('] [')
				.map((otherver) => otherver.replace('[', '').replace(']', '')) || [];

		const trait: Trait = {
			value,
			name,
			effects: effectsText,
			effectsHTML: effectsHTML,
			otherVersions,
			link
		};

		traits.push(trait);
	}

	traits.sort(
		(a, b) =>
			a.value - b.value ||
			a.name.localeCompare(b.name) ||
			console.error('Duplicate trait found:', a, b) ||
			0
	);

	return traits;
}
