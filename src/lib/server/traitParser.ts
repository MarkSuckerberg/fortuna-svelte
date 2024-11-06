import { TraitValue, type Trait } from '../trait';
import { HTMLRewriter } from 'htmlrewriter';

export default async function getTraits(customFetch: typeof fetch = fetch): Promise<Trait[]> {
	const response = await customFetch('https://cosmosdex.com/cosmosdex/traits/');

	let currentFramework: {
		startName: boolean;
		currentName: string;
		startEffects: boolean;
		currentEffects: string;
		startOtherVersions: boolean;
		currentOtherVersion: string;
		trait: Partial<Trait>;
	} = {
		startName: false,
		currentName: '',
		startEffects: false,
		currentEffects: '',
		startOtherVersions: false,
		currentOtherVersion: '',
		trait: { otherVersions: [] }
	};

	const foundTraits: Trait[] = [];
	const rewriter = new HTMLRewriter().on('div[class=dexsectiontextmiddle] *', {
		element(element) {
			if (element.tagName === 'h3') {
				if (currentFramework.trait.name) {
					foundTraits.push(currentFramework.trait as Trait);
				}
				currentFramework = {
					startName: false,
					currentName: '',
					startEffects: false,
					currentEffects: '',
					startOtherVersions: false,
					currentOtherVersion: '',
					trait: { otherVersions: [] }
				};
				return;
			}

			if (element.tagName === 'a' && !currentFramework.trait.link) {
				currentFramework.trait.link = `https://cosmosdex.com/cosmosdex/traits/${element.getAttribute('href')}`;
				currentFramework.startName = true;
				return;
			}

			if (currentFramework.startEffects || element.tagName === 'p') {
				if (!currentFramework.trait.effectsHTML) {
					currentFramework.trait.effects = '';
					currentFramework.trait.effectsHTML = '';
				}

				currentFramework.trait.effectsHTML += `<${element.tagName}>`;
				currentFramework.trait.effects += '';

				if (!currentFramework.startEffects) {
					element.onEndTag((endtag) => {
						currentFramework.startEffects = false;
						currentFramework.trait.effectsHTML += `</${endtag.name}>`;
					});
					currentFramework.startEffects = true;
				} else if (element.tagName !== 'br') {
					element.onEndTag((endtag) => {
						currentFramework.trait.effectsHTML += `</${endtag.name}>`;
					});
				}

				return;
			}

			const classAttr = element.getAttribute('class');

			if (!classAttr) {
				return;
			}

			if (classAttr.startsWith('traitotherver')) {
				currentFramework.startOtherVersions = true;
				return;
			}

			switch (classAttr) {
				case 'bluetrait':
					currentFramework.trait.value = TraitValue.Neutral;
					break;
				case 'greentrait':
					currentFramework.trait.value = TraitValue.Positive;
					break;
				case 'redtrait':
					currentFramework.trait.value = TraitValue.Negative;
					break;
				case 'purpletrait':
					currentFramework.trait.value = TraitValue.Mystery;
					break;
				case 'yellowtrait':
					currentFramework.trait.value = TraitValue.Ability;
					break;
			}
		},

		text(text) {
			if (currentFramework.startName) {
				currentFramework.currentName += text.text;

				if (text.lastInTextNode) {
					currentFramework.trait.name = currentFramework.currentName.slice(1, -1);
					currentFramework.startName = false;
				}
			}

			if (currentFramework.startEffects) {
				currentFramework.trait.effectsHTML += text.text;
				currentFramework.trait.effects += text.text;
				return;
			}

			if (currentFramework.startOtherVersions) {
				currentFramework.currentOtherVersion += text.text;

				if (text.lastInTextNode) {
					currentFramework.trait.otherVersions = currentFramework.currentOtherVersion
						.split('] [')
						.map((version) => version.replace('[', '').replace(']', ''));
					currentFramework.startOtherVersions = false;
				}
				return;
			}
		}
	});

	await rewriter.transform(response).arrayBuffer();

	foundTraits.sort(
		(a, b) =>
			a.value - b.value ||
			a.name.localeCompare(b.name) ||
			console.error('Duplicate trait found:', a, b) ||
			0
	);

	return foundTraits;
}
