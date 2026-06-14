import type { CSSProperties } from 'react';
import type { OpenPeepCustomization } from '@classyc/shared';
import { fixedInkColor } from '@/features/character/open-peep-colors';

type CssPeepFraming = 'full' | 'head' | 'outfit';

interface CssPeepRenderData {
	tokens: string;
	style: CSSProperties;
}

const transparentPeepPart = 'url("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7")';

const bodyTokens: Record<string, string> = {
	'Blazer Black Tee': 'blazer',
	'Button Shirt 1': 'buttonup1',
	'Button Shirt 2': 'buttonup2',
	Coffee: 'coffee',
	Device: 'phone',
	Dress: 'dress',
	Explaining: 'explaining',
	'Fur Jacket': 'jacket',
	Gaming: 'gaming',
	'Gym Shirt': 'tank',
	Hoodie: 'hoodie',
	Killer: 'killer',
	Macbook: 'laptop',
	Paper: 'paper',
	'Pointing Up': 'pointing-up',
	'Polka Dot Jacket': 'polkadot-jacket',
	'Polo and Sweater': 'polo-sweater',
	'Shirt and Coat': 'shirt-coat',
	'Sporty Tee': 'sporty-tee',
	'Striped Pocket Tee': 'striped-pocket-tee',
	'Striped Tee': 'striped-tee',
	Sweater: 'sweater-crossed',
	'Sweater Dots': 'sweater-dots',
	'Tee 1': 'tee1',
	'Tee 2': 'tee2',
	'Tee Arms Crossed': 'tee-crossed',
	'Tee Selena': 'tee-selena',
	'Thunder T-Shirt': 'thunder-tee',
	Turtleneck: 'turtleneck',
	Whatever: 'shrug'
};

const headTokens: Record<string, string> = {
	Afro: 'afro',
	Bangs: 'bangs1',
	'Bangs 2': 'bangs2',
	'Bantu Knots': 'bantu-knots',
	Bear: 'teddy',
	Bun: 'bun1',
	'Bun 2': 'bun2',
	Buns: 'buns',
	Cornrows: 'cornrows1',
	'Cornrows 2': 'cornrows2',
	'Flat Top': 'flat-top1',
	'Flat Top Long': 'flat-top2',
	'Gray Bun': 'gray-bun',
	'Gray Medium': 'gray-medium',
	'Gray Short': 'gray-short',
	'hat-beanie': 'beanie',
	'hat-hip': 'sierra',
	Hijab: 'hijab',
	Long: 'long-straight',
	'Long Afro': 'long-afro',
	'Long Bangs': 'long-bangs',
	'Long Curly': 'long-curly',
	'Medium 1': 'medium1',
	'Medium 2': 'medium2',
	'Medium 3': 'medium3',
	'Medium Bangs': 'medium-bangs1',
	'Medium Bangs 2': 'medium-bangs2',
	'Medium Bangs 3': 'medium-bangs3',
	'Medium Straight': 'medium-straight',
	Mohawk: 'mohawk1',
	'Mohawk 2': 'mohawk2',
	'No Hair 1': 'bald1',
	'No Hair 2': 'bald2',
	'No Hair 3': 'bald3',
	Pomp: 'pomp',
	'Shaved 1': 'shaved1',
	'Shaved 2': 'shaved2',
	'Shaved 3': 'shaved3',
	'Short 1': 'short1',
	'Short 2': 'short2',
	'Short 3': 'short3',
	'Short 4': 'short4',
	'Short 5': 'short5',
	Turban: 'turban',
	Twists: 'twists1',
	'Twists 2': 'twists2'
};

const faceTokens: Record<string, string> = {
	'Angry with Fang': 'fangry',
	Awe: 'awe',
	Blank: 'blank',
	Calm: 'calm',
	Cheeky: 'cheeky',
	Concerned: 'gasp',
	'Concerned Fear': 'concerned-fear',
	Contempt: 'peace',
	Cute: 'cute',
	Cyclops: 'cyclops',
	Driven: 'driven',
	'Eating Happy': 'eating-happy',
	Explaining: 'talking',
	'Eyes Closed': 'eyes-closed',
	Fear: 'fear',
	Hectic: 'hectic',
	'Loving Grin 1': 'loving-grin1',
	'Loving Grin 2': 'loving-grin2',
	Monster: 'monster',
	Old: 'old',
	Rage: 'rage',
	Serious: 'serious',
	Smile: 'smile',
	'Smile Big': 'smile-big',
	'Smile LOL': 'laughing',
	'Smile Teeth Gap': 'smile-gap',
	Solemn: 'sad',
	Suspicious: 'suspicious',
	Tired: 'tired',
	'Very Angry': 'angry'
};

const facialHairTokens: Record<string, string> = {
	Chin: 'chinhair',
	Full: 'beard1',
	'Full 2': 'beard2',
	'Full 3': 'beard3',
	'Full 4': 'beard4',
	'Goatee 1': 'goatee1',
	'Goatee 2': 'goatee2',
	'Moustache 1': 'mustache1',
	'Moustache 2': 'mustache2',
	'Moustache 3': 'mustache3',
	'Moustache 4': 'mustache4',
	'Moustache 5': 'mustache5',
	'Moustache 6': 'mustache6',
	'Moustache 7': 'mustache7',
	'Moustache 8': 'mustache8',
	'Moustache 9': 'mustache9'
};

const accessoryTokens: Record<string, string> = {
	Eyepatch: 'eyepatch',
	Glasses: 'glasses1',
	'Glasses 2': 'glasses2',
	'Glasses 3': 'glasses3',
	'Glasses 4': 'glasses4',
	'Glasses 5': 'glasses5',
	Sunglasses: 'sunglasses1',
	'Sunglasses 2': 'sunglasses2'
};

export function canRenderCssPeep(customization: OpenPeepCustomization) {
	return Boolean(bodyTokens[customization.bodyId]);
}

export function createCssPeepRenderData(customization: OpenPeepCustomization, framing: CssPeepFraming): CssPeepRenderData {
	const tokens = [
		bodyTokens[customization.bodyId],
		framing === 'outfit' ? undefined : headTokens[customization.headId],
		framing === 'outfit' ? undefined : faceTokens[customization.faceId],
		framing === 'outfit' || customization.facialHairId === '_ None' ? undefined : facialHairTokens[customization.facialHairId],
		framing === 'outfit' || customization.accessoryId === '_ None' ? undefined : accessoryTokens[customization.accessoryId]
	].filter((token): token is string => Boolean(token));

	return {
		tokens: tokens.join(' '),
		style: {
			'--peep-accessory-color': customization.colors.accessory,
			'--peep-clothes-color': customization.colors.outfit,
			'--peep-facial-hair-color': customization.colors.hair,
			'--peep-hair-color': customization.colors.hair,
			'--peep-hat-color': fixedInkColor,
			'--peep-object-color': '#F8FAFC',
			'--peep-skin-color': customization.colors.skin,
			...(framing === 'head' ? createHeadFramingStyle() : {}),
			...(framing === 'outfit' ? createOutfitFramingStyle() : {})
		} as CSSProperties
	};
}

function createHeadFramingStyle(): CSSProperties {
	return {
		'--peep-body': transparentPeepPart,
		'--peep-body-detail': transparentPeepPart,
		'--peep-body-mask': transparentPeepPart,
		'--peep-zoom': 1.75,
		'--peep-body-offset-y': '64px',
		'--peep-head-offset-y': '46px'
	} as CSSProperties;
}

function createOutfitFramingStyle(): CSSProperties {
	return {
		'--peep-zoom': 1.35,
		'--peep-body-offset-y': '-46px'
	} as CSSProperties;
}
