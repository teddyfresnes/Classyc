import type { OpenPeepCustomization, OpenPeepPostureMode } from '@classyc/shared';
import { getOpenPeepAtom, resolveOpenPeepCustomization } from '@/assets/open-peeps-atoms';
import type { OpenPeepAtomAsset, OpenPeepAtomCategory } from '@/assets/open-peeps-atoms';
import {
	createHairAccentColor,
	createSkinShadowColor,
	fixedInkColor,
	neutralHeadwearAccentColor,
	neutralHeadwearColor
} from '@/features/character/open-peep-colors';

type OpenPeepRenderCategory = OpenPeepAtomCategory | 'pose';
type OpenPeepFraming = 'full' | 'head';

interface SvgColorSemantics {
	accent: string;
	dark: string;
	light: string;
}

interface OpenPeepComposerProps {
	className?: string;
	customization?: OpenPeepCustomization;
	framing?: OpenPeepFraming;
	title?: string;
}

interface OpenPeepAtomPreviewProps {
	asset: OpenPeepAtomAsset;
	className?: string;
	customization: OpenPeepCustomization;
}

interface ComposerLayout {
	viewBox: string;
	headViewBox: string;
	body: {
		x: number;
		y: number;
	};
	head: {
		x: number;
		y: number;
	};
	face: {
		x: number;
		y: number;
	};
	facialHair: {
		x: number;
		y: number;
	};
	accessories: {
		x: number;
		y: number;
	};
}

const composerLayouts: Record<OpenPeepPostureMode, ComposerLayout> = {
	bust: {
		viewBox: '0 0 1136 1533',
		headViewBox: '320 95 620 705',
		body: {
			x: 147,
			y: 639
		},
		head: {
			x: 372,
			y: 180
		},
		face: {
			x: 159,
			y: 186
		},
		facialHair: {
			x: 123,
			y: 338
		},
		accessories: {
			x: 47,
			y: 241
		}
	},
	standing: {
		viewBox: '0 0 1179 3291',
		headViewBox: '350 95 620 705',
		body: {
			x: -121,
			y: 634
		},
		head: {
			x: 404,
			y: 180
		},
		face: {
			x: 159,
			y: 186
		},
		facialHair: {
			x: 123,
			y: 338
		},
		accessories: {
			x: 47,
			y: 241
		}
	},
	sitting: {
		viewBox: '0 0 1647 2500',
		headViewBox: '290 95 620 705',
		body: {
			x: -81,
			y: 637
		},
		head: {
			x: 345,
			y: 180
		},
		face: {
			x: 159,
			y: 186
		},
		facialHair: {
			x: 123,
			y: 338
		},
		accessories: {
			x: 47,
			y: 241
		}
	}
};

export function OpenPeepComposer({
	className,
	customization,
	framing = 'full',
	title
}: OpenPeepComposerProps) {
	const resolvedCustomization = resolveOpenPeepCustomization(customization);
	const layout = composerLayouts[resolvedCustomization.postureMode];
	const bodyAsset = getOpenPeepAtom('body', resolvedCustomization.bodyId);
	const headAsset = getOpenPeepAtom('head', resolvedCustomization.headId);
	const faceAsset = getOpenPeepAtom('face', resolvedCustomization.faceId);
	const facialHairAsset = getOpenPeepAtom('facialHair', resolvedCustomization.facialHairId);
	const accessoriesAsset = getOpenPeepAtom('accessories', resolvedCustomization.accessoryId);
	const poseAsset = resolvedCustomization.postureMode === 'standing'
		? getOpenPeepAtom('standingPose', resolvedCustomization.standingPoseId)
		: getOpenPeepAtom('sittingPose', resolvedCustomization.sittingPoseId);
	const viewBox = framing === 'head' ? layout.headViewBox : layout.viewBox;

	return (
		<svg
			aria-hidden={title ? undefined : true}
			aria-label={title}
			className={className}
			focusable="false"
			role={title ? 'img' : undefined}
			viewBox={viewBox}
			xmlns="http://www.w3.org/2000/svg"
		>
			<g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
				{resolvedCustomization.postureMode === 'bust' ? (
					<OpenPeepSvgGroup
						asset={bodyAsset}
						category="body"
						customization={resolvedCustomization}
						transform={`translate(${layout.body.x} ${layout.body.y})`}
					/>
				) : (
					<OpenPeepSvgGroup
						asset={poseAsset}
						category="pose"
						customization={resolvedCustomization}
						transform={`translate(${layout.body.x} ${layout.body.y})`}
					/>
				)}

				<g transform={`translate(${layout.head.x} ${layout.head.y})`}>
					<OpenPeepSvgGroup asset={headAsset} category="head" customization={resolvedCustomization} />
					<OpenPeepSvgGroup
						asset={faceAsset}
						category="face"
						customization={resolvedCustomization}
						transform={`translate(${layout.face.x} ${layout.face.y})`}
					/>
					<OpenPeepSvgGroup
						asset={facialHairAsset}
						category="facialHair"
						customization={resolvedCustomization}
						transform={`translate(${layout.facialHair.x} ${layout.facialHair.y})`}
					/>
					<OpenPeepSvgGroup
						asset={accessoriesAsset}
						category="accessories"
						customization={resolvedCustomization}
						transform={`translate(${layout.accessories.x} ${layout.accessories.y})`}
					/>
				</g>
			</g>
		</svg>
	);
}

export function OpenPeepAtomPreview({ asset, className, customization }: OpenPeepAtomPreviewProps) {
	return (
		<svg
			aria-hidden="true"
			className={className}
			focusable="false"
			viewBox={asset.viewBox}
			xmlns="http://www.w3.org/2000/svg"
		>
			<g
				dangerouslySetInnerHTML={{
					__html: createOpenPeepSvgMarkup(asset, getPreviewCategory(asset.category), customization)
				}}
			/>
		</svg>
	);
}

function OpenPeepSvgGroup({
	asset,
	category,
	customization,
	transform
}: {
	asset: OpenPeepAtomAsset;
	category: OpenPeepRenderCategory;
	customization: OpenPeepCustomization;
	transform?: string;
}) {
	return (
		<g
			dangerouslySetInnerHTML={{
				__html: createOpenPeepSvgMarkup(asset, category, customization)
			}}
			transform={transform}
		/>
	);
}

function createOpenPeepSvgMarkup(asset: OpenPeepAtomAsset, category: OpenPeepRenderCategory, customization: OpenPeepCustomization) {
	const colors = getSvgColorSemantics(asset, category, customization);

	return getSvgContent(asset.raw)
		.replace(/fill="#FFFFFF"/gi, `fill="${colors.light}"`)
		.replace(/fill="white"/gi, `fill="${colors.light}"`)
		.replace(/fill="#000000"/gi, `fill="${colors.dark}"`)
		.replace(/fill="#231F20"/gi, `fill="${colors.dark}"`)
		.replace(/fill="#221E1F"/gi, `fill="${colors.dark}"`)
		.replace(/fill="#4F66AF"/gi, `fill="${colors.accent}"`);
}

function getSvgContent(rawSvg: string) {
	const svgBody = rawSvg.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i)?.[1] ?? rawSvg;

	return svgBody
		.replace(/<!--[\s\S]*?-->/g, '')
		.replace(/<title>[\s\S]*?<\/title>/gi, '')
		.replace(/<desc>[\s\S]*?<\/desc>/gi, '')
		.trim();
}

function getSvgColorSemantics(asset: OpenPeepAtomAsset, category: OpenPeepRenderCategory, customization: OpenPeepCustomization): SvgColorSemantics {
	const colors = customization.colors;
	const skinShadow = createSkinShadowColor(colors.skin);
	const hairAccent = createHairAccentColor(colors.hair);

	if (category === 'head') {
		if (isHeadwearAsset(asset.id)) {
			return {
				accent: neutralHeadwearAccentColor,
				dark: neutralHeadwearColor,
				light: colors.skin
			};
		}

		if (isNoHairAsset(asset.id)) {
			return {
				accent: skinShadow,
				dark: skinShadow,
				light: colors.skin
			};
		}

		return {
			accent: skinShadow,
			dark: colors.hair,
			light: colors.skin
		};
	}

	if (category === 'facialHair') {
		return {
			accent: hairAccent,
			dark: hairAccent,
			light: colors.hair
		};
	}

	if (category === 'accessories') {
		return {
			accent: colors.accessory,
			dark: colors.accessory,
			light: '#F8FAFC'
		};
	}

	if (category === 'face') {
		return {
			accent: skinShadow,
			dark: fixedInkColor,
			light: colors.skin
		};
	}

	return {
		accent: fixedInkColor,
		dark: fixedInkColor,
		light: colors.outfit
	};
}

function getPreviewCategory(category: OpenPeepAtomCategory): OpenPeepRenderCategory {
	if (category === 'standingPose' || category === 'sittingPose') {
		return 'pose';
	}

	return category;
}

function isHeadwearAsset(assetId: string) {
	return ['Bear', 'Hijab', 'Turban', 'hat-beanie', 'hat-hip'].includes(assetId);
}

function isNoHairAsset(assetId: string) {
	return assetId.startsWith('No Hair');
}
