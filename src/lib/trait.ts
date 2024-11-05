export enum TraitValue {
	Neutral,
	Positive,
	Negative,
	Mystery,
	Ability
}

export interface Trait {
	value: TraitValue;
	name: string;
	effects: string;
	effectsHTML: string;
	link: string;
	otherVersions: string[];
	target?: string;
}

export function traitDictionary(traits: Trait[]): Record<string, Trait[]> {
	const dict: Record<string, Trait[]> = {};
	for (const trait of traits) {
		if (!dict[TraitValue[trait.value]]) {
			dict[TraitValue[trait.value]] = [];
		}

		dict[TraitValue[trait.value]].push(trait);
	}
	return dict;
}
