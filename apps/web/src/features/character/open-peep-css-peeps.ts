import type { CSSProperties } from 'react';
import type { OpenPeepCustomization } from '@classyc/shared';
import { fixedInkColor } from '@/features/character/open-peep-colors';

type CssPeepFraming = 'full' | 'head' | 'outfit' | 'body';

interface CssPeepRenderData {
	detailRecolors: CssPeepDetailRecolor[];
	tokens: string;
	style: CSSProperties;
}

export interface CssPeepDetailRecolor {
	fillColor: string;
	outputVariable: string;
	sourceVariable: string;
	strokeColor?: string;
	strokeWidth?: number;
}

type OutfitColorSlot = 'outfit' | 'outfitSecondary';

interface BodyColorRule {
	bodyPaint?: string;
	clothesColor: OutfitColorSlot;
	detailFill?: OutfitColorSlot;
	secondary: boolean;
	strokeWidth?: number;
	token: string;
}

const transparentPeepPart = 'url("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7")';

const bodyRules: Record<string, BodyColorRule> = {
	'Blazer Black Tee': createBodyRule('blazer', {
		detailFill: 'outfitSecondary',
		secondary: true,
		strokeWidth: 14
	}),
	'Button Shirt 1': createBodyRule('buttonup1'),
	'Button Shirt 2': createBodyRule('buttonup2'),
	Coffee: createBodyRule('coffee'),
	Device: createBodyRule('phone'),
	Dress: createBodyRule('dress', {
		detailFill: 'outfit',
		strokeWidth: 12
	}),
	Explaining: createBodyRule('explaining'),
	'Fur Jacket': createBodyRule('jacket', {
		clothesColor: 'outfitSecondary',
		detailFill: 'outfit',
		secondary: true,
		strokeWidth: 12
	}),
	Gaming: createBodyRule('gaming'),
	'Gym Shirt': createBodyRule('tank', {
		detailFill: 'outfit',
		strokeWidth: 12
	}),
	Hoodie: createBodyRule('hoodie'),
	Killer: createBodyRule('killer', {
		detailFill: 'outfit',
		strokeWidth: 12
	}),
	Macbook: createBodyRule('laptop', {
		bodyPaint: 'var(--peep_laptop_paint) linear-gradient(var(--peep-skin-color) 0 100%) calc(72% + var(--peep_b_o_x)) calc(96% + var(--peep_b_o_y)) / 7% 17% no-repeat,'
	}),
	Paper: createBodyRule('paper', {
		clothesColor: 'outfitSecondary',
		detailFill: 'outfit',
		secondary: true,
		strokeWidth: 12
	}),
	'Pointing Up': createBodyRule('pointing-up', {
		clothesColor: 'outfitSecondary',
		detailFill: 'outfit',
		secondary: true
	}),
	'Polka Dot Jacket': createBodyRule('polkadot-jacket', {
		detailFill: 'outfitSecondary',
		secondary: true,
		strokeWidth: 14
	}),
	'Polo and Sweater': createBodyRule('polo-sweater', {
		clothesColor: 'outfitSecondary',
		detailFill: 'outfit',
		secondary: true,
		strokeWidth: 12
	}),
	'Shirt and Coat': createBodyRule('shirt-coat', {
		detailFill: 'outfitSecondary',
		secondary: true,
		strokeWidth: 12
	}),
	'Sporty Tee': createBodyRule('sporty-tee', {
		clothesColor: 'outfitSecondary',
		detailFill: 'outfit',
		secondary: true,
		strokeWidth: 12
	}),
	'Striped Pocket Tee': createBodyRule('striped-pocket-tee', {
		clothesColor: 'outfitSecondary',
		detailFill: 'outfit',
		secondary: true,
		strokeWidth: 12
	}),
	'Striped Tee': createBodyRule('striped-tee', {
		secondary: true
	}),
	Sweater: createBodyRule('sweater-crossed', {
		detailFill: 'outfitSecondary',
		secondary: true,
		strokeWidth: 10
	}),
	'Sweater Dots': createBodyRule('sweater-dots', {
		clothesColor: 'outfitSecondary',
		detailFill: 'outfit',
		secondary: true
	}),
	'Tee 1': createBodyRule('tee1'),
	'Tee 2': createBodyRule('tee2', {
		detailFill: 'outfit',
		strokeWidth: 12
	}),
	'Tee Arms Crossed': createBodyRule('tee-crossed', {
		detailFill: 'outfit',
		strokeWidth: 12
	}),
	'Tee Selena': createBodyRule('tee-selena', {
		clothesColor: 'outfitSecondary',
		detailFill: 'outfit',
		secondary: true,
		strokeWidth: 12
	}),
	'Thunder T-Shirt': createBodyRule('thunder-tee', {
		clothesColor: 'outfitSecondary',
		detailFill: 'outfit',
		secondary: true,
		strokeWidth: 12
	}),
	Turtleneck: createBodyRule('turtleneck', {
		detailFill: 'outfit',
		strokeWidth: 12
	}),
	Whatever: createBodyRule('shrug', {
		detailFill: 'outfit',
		strokeWidth: 12
	})
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
	return Boolean(bodyRules[customization.bodyId]);
}

export function hasSecondaryOutfitColor(bodyId: string) {
	return Boolean(bodyRules[bodyId]?.secondary);
}

export function createCssPeepRenderData(customization: OpenPeepCustomization, framing: CssPeepFraming): CssPeepRenderData {
	const bodyRule = bodyRules[customization.bodyId];
	const headToken = headTokens[customization.headId];
	const shouldRenderHead = framing !== 'outfit' && framing !== 'body';
	const bodyDetailRecolor: CssPeepDetailRecolor | undefined = bodyRule?.detailFill ? {
		fillColor: customization.colors[bodyRule.detailFill],
		outputVariable: '--peep-body-detail',
		sourceVariable: `--peep_${bodyRule.token.replace(/-/g, '_')}_detail`,
		strokeColor: fixedInkColor,
		strokeWidth: bodyRule.strokeWidth ?? 10
	} : undefined;
	const tokens = [
		bodyRule?.token,
		shouldRenderHead ? headToken : undefined,
		shouldRenderHead ? faceTokens[customization.faceId] : undefined,
		shouldRenderHead && customization.facialHairId !== '_ None' ? facialHairTokens[customization.facialHairId] : undefined,
		shouldRenderHead && customization.accessoryId !== '_ None' ? accessoryTokens[customization.accessoryId] : undefined
	].filter((token): token is string => Boolean(token));

	return {
		detailRecolors: [bodyDetailRecolor].filter((recolor): recolor is CssPeepDetailRecolor => Boolean(recolor)),
		tokens: tokens.join(' '),
		style: {
			'--peep-accessory-color': customization.colors.accessory,
			'--peep-clothes-color': bodyRule ? customization.colors[bodyRule.clothesColor] : customization.colors.outfit,
			'--peep-facial-hair-color': customization.colors.hair,
			'--peep-hair-color': customization.colors.hair,
			'--peep-hat-color': fixedInkColor,
			...(framing !== 'outfit' ? createCleanHeadStyle() : {}),
			...(framing === 'body' ? createBodyOnlyStyle() : {}),
			'--peep-object-color': '#F8FAFC',
			...(bodyRule?.bodyPaint ? { '--peep-body-paint': bodyRule.bodyPaint } : {}),
			'--peep-skin-color': customization.colors.skin,
			...(framing === 'head' ? createHeadFramingStyle() : {}),
			...(framing === 'outfit' ? createOutfitFramingStyle() : {})
		} as CSSProperties
	};
}

function createCleanHeadStyle(): CSSProperties {
	return {
		'--peep-head-detail': transparentPeepPart
	} as CSSProperties;
}

function createBodyOnlyStyle(): CSSProperties {
	return {
		'--peep-accessory-detail': transparentPeepPart,
		'--peep-accessory-mask': transparentPeepPart,
		'--peep-face-detail': transparentPeepPart,
		'--peep-face-mask': transparentPeepPart,
		'--peep-facial-hair-detail': transparentPeepPart,
		'--peep-facial-hair-mask': transparentPeepPart,
		'--peep-head-detail': transparentPeepPart,
		'--peep-head-mask': transparentPeepPart
	} as CSSProperties;
}

function createBodyRule(token: string, rule: Partial<Omit<BodyColorRule, 'token'>> = {}): BodyColorRule {
	return {
		clothesColor: rule.clothesColor ?? 'outfit',
		detailFill: rule.detailFill,
		secondary: rule.secondary ?? false,
		strokeWidth: rule.strokeWidth,
		token
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
