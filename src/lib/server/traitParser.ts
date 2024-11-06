import { TraitValue, type Trait } from '../trait';
import { WritableStream } from 'htmlparser2/lib/WritableStream';

export default async function getTraits(customFetch: typeof fetch = fetch): Promise<Trait[]> {
	const response = await customFetch('https://cosmosdex.com/cosmosdex/traits/');

	const foundTraits: Trait[] = [];
	let currentTrait: { trait: Partial<Trait>; hasOtherVer?: boolean; readingEffects?: boolean } = {
		trait: {}
	};

	const stream = new WritableStream({
		onattribute(name, value) {
			if (name !== 'class') {
				return;
			}
			switch (value) {
				case 'dexsectiontextmiddle':
					if (currentTrait.trait.name) {
						foundTraits.push(currentTrait.trait as Trait);
					}
					currentTrait = { trait: {} };
					break;
				case 'bluetrait':
					currentTrait.trait.value = TraitValue.Neutral;
					break;
				case 'greentrait':
					currentTrait.trait.value = TraitValue.Positive;
					break;
				case 'redtrait':
					currentTrait.trait.value = TraitValue.Negative;
					break;
				case 'purpletrait':
					currentTrait.trait.value = TraitValue.Mystery;
					break;
				case 'yellowtrait':
					currentTrait.trait.value = TraitValue.Ability;
					break;
			}

			if (value.startsWith('traitotherver')) {
				currentTrait.hasOtherVer = true;
			}
		},
		onopentag(name, attributes) {
			if (currentTrait.readingEffects) {
				currentTrait.trait.effectsHTML += `<${name}>`;
			}
			if (currentTrait.trait.value && name === 'a') {
				currentTrait.trait.link = `https://cosmosdex.com/cosmosdex/traits/${attributes.href}`;
			}
			if (name === 'p') {
				currentTrait.readingEffects = true;
				currentTrait.trait.effectsHTML = '';
				currentTrait.trait.effects = '';
			}
		},
		onclosetag(name) {
			if (name === 'p' && currentTrait.readingEffects && currentTrait.trait.effectsHTML) {
				currentTrait.readingEffects = false;
				return;
			}
			if (currentTrait.readingEffects) {
				if (name === 'br') {
					return;
				}
				currentTrait.trait.effectsHTML += `</${name}>`;
			}
		},
		ontext(text) {
			if (currentTrait.readingEffects) {
				currentTrait.trait.effectsHTML += text;
				currentTrait.trait.effects += text;
			}

			if (currentTrait.hasOtherVer && !currentTrait.trait.otherVersions) {
				currentTrait.trait.otherVersions = text
					.split('] [')
					.map((version) => version.replace('[', '').replace(']', ''));
				return;
			}
			if (currentTrait.trait.link && !currentTrait.trait.name) {
				currentTrait.trait.name = text.slice(1, -1);
				return;
			}
		}
	});

	if (!response.body) {
		throw new Error('Response body is empty');
	}

	const reader = response.body.getReader();

	while (true) {
		const { done, value } = await reader.read();
		if (done) {
			break;
		}
		stream.write(value);
	}

	stream.end();

	await new Promise((resolve, reject) => {
		stream.on('finish', () => {
			resolve(foundTraits);
		});
		stream.on('error', reject);
	});

	foundTraits.sort(
		(a, b) =>
			a.value - b.value ||
			a.name.localeCompare(b.name) ||
			console.error('Duplicate trait found:', a, b) ||
			0
	);

	return foundTraits;
}
