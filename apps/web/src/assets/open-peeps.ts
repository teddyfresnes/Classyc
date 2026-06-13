import { defaultOpenPeepCharacterId } from '@classyc/shared';
import type { OpenPeepCharacterId } from '@classyc/shared';

export interface OpenPeepCharacterAsset {
	id: OpenPeepCharacterId;
	label: string;
	src: string;
	templatePath: string;
}

export const openPeepCharacters = [
	{
		id: 'open-peep-bust-1',
		label: 'Open Peep 1',
		src: new URL('../../../../Flat Assets/Flat Assets/Templates/Bust/peep-1.png', import.meta.url).href,
		templatePath: 'Flat Assets/Flat Assets/Templates/Bust/peep-1.png'
	},
	{
		id: 'open-peep-bust-8',
		label: 'Open Peep 8',
		src: new URL('../../../../Flat Assets/Flat Assets/Templates/Bust/peep-8.png', import.meta.url).href,
		templatePath: 'Flat Assets/Flat Assets/Templates/Bust/peep-8.png'
	},
	{
		id: 'open-peep-bust-29',
		label: 'Open Peep 29',
		src: new URL('../../../../Flat Assets/Flat Assets/Templates/Bust/peep-29.png', import.meta.url).href,
		templatePath: 'Flat Assets/Flat Assets/Templates/Bust/peep-29.png'
	},
	{
		id: 'open-peep-bust-45',
		label: 'Open Peep 45',
		src: new URL('../../../../Flat Assets/Flat Assets/Templates/Bust/peep-45.png', import.meta.url).href,
		templatePath: 'Flat Assets/Flat Assets/Templates/Bust/peep-45.png'
	},
	{
		id: 'open-peep-bust-76',
		label: 'Open Peep 76',
		src: new URL('../../../../Flat Assets/Flat Assets/Templates/Bust/peep-76.png', import.meta.url).href,
		templatePath: 'Flat Assets/Flat Assets/Templates/Bust/peep-76.png'
	},
	{
		id: 'open-peep-bust-103',
		label: 'Open Peep 103',
		src: new URL('../../../../Flat Assets/Flat Assets/Templates/Bust/peep-103.png', import.meta.url).href,
		templatePath: 'Flat Assets/Flat Assets/Templates/Bust/peep-103.png'
	}
] as const satisfies readonly OpenPeepCharacterAsset[];

export function getOpenPeepCharacter(characterId: OpenPeepCharacterId) {
	return openPeepCharacters.find((character) => character.id === characterId) ?? openPeepCharacters.find((character) => character.id === defaultOpenPeepCharacterId)!;
}
