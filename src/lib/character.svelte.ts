import { TraitValue, type Trait } from './trait';
import aftik from '$lib/assets/aftik.svg';

export enum Stats {
	Strength,
	Intelligence,
	Charisma,
	Endurance,
	Agility,
	Luck
}

const StatsList = Object.values(Stats)
	.filter((stat) => typeof stat !== 'number')
	.map((stat) => ({ [stat]: 4 }))
	.reduce((a, b) => ({ ...a, ...b }));

export interface StatsContainer {
	[stat: string]: number;
}

type ClassProperties<C> = {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
	[Key in keyof C as C[Key] extends Function ? never : Key]: C[Key];
};

export type CharacterData = Omit<ClassProperties<Character>, 'totalStats'>;

export class Character {
	name: string = $state('Adventurer');
	pronouns: string = $state('They/Them');
	species: string = $state('Aftik');
	role: string = $state('Captain');
	image: string = $state(aftik);
	bio: string = $state('');

	stats: StatsContainer = $state(StatsList);

	constructor(data?: CharacterData) {
		if (!data) {
			return;
		}

		Object.assign(this, data);
	}

	//TODO: Find out why stats are being saved as strings
	public totalStats = $derived.by(() =>
		Object.values(this.stats).reduce((a, b) => Number(a) + Number(b))
	);

	traits: Trait[] = $state([]);

	public addTrait(this: Character, trait: Trait) {
		this.traits.push(trait);
		this.traits.sort((a, b) => a.value - b.value || a.name.localeCompare(b.name));
	}

	public removeTrait(this: Character, trait: Trait) {
		this.traits = this.traits.filter((t) => t !== trait);
	}

	public adjustStat(this: Character, stat: Stats, value: number) {
		this.stats[Stats[stat]] += Math.min(26, value + this.totalStats - 26);
	}

	public setStat(this: Character, stat: Stats, value: number) {
		this.stats[Stats[stat]] = Math.max(0, value);
	}

	public randomizeStats(this: Character) {
		const values = [];
		let total = 0;
		for (let i = 0; i < 6; i++) {
			const value = Math.random();
			values.push(value);
			total += value;
		}

		for (let i = 0; i < 6; i++) {
			const result = Math.floor((values[i] / total) * 26);
			this.setStat(i as Stats, result);
		}

		for (let i = this.totalStats; i < 26; i++) {
			const stat = Math.floor(Math.random() * 6);
			this.stats[Stats[stat]]++;
		}
	}

	public randomizeTraits(this: Character, traits: Trait[]) {
		this.traits = [];
		const randomTraits = [...traits];

		const expectedValues = {
			[TraitValue.Negative]: Math.floor(2 + Math.random() * 2),
			[TraitValue.Neutral]: Math.floor(2 + Math.random() * 2),
			[TraitValue.Positive]: Math.floor(2 + Math.random() * 2),
			[TraitValue.Ability]: Math.random() < 0.1 ? 1 : 0,
			[TraitValue.Mystery]: Math.random() < 0.1 ? 1 : 0
		};

		for (let i = 0; i < randomTraits.length; i++) {
			const index = Math.floor(Math.random() * randomTraits.length);
			const temp = randomTraits[index];

			if (expectedValues[temp.value] <= 0) {
				continue;
			}

			if (expectedValues[temp.value] >= 1) {
				expectedValues[temp.value]--;
				this.addTrait(temp);
			}
		}
	}

	public toJSON(this: Character): CharacterData {
		const data: CharacterData = {
			name: this.name,
			pronouns: this.pronouns,
			species: this.species,
			role: this.role,
			image: this.image,
			bio: this.bio,
			stats: this.stats,
			traits: this.traits
		};

		return data;
	}
}
