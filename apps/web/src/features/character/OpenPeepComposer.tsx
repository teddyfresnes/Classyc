import type { OpenPeepCustomization, OpenPeepPostureMode } from '@classyc/shared';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { getOpenPeepAtom, resolveOpenPeepCustomization } from '@/assets/open-peeps-atoms';
import type { OpenPeepAtomAsset, OpenPeepAtomCategory } from '@/assets/open-peeps-atoms';
import { canRenderCssPeep, createCssPeepRenderData } from '@/features/character/open-peep-css-peeps';
import type { CssPeepDetailRecolor } from '@/features/character/open-peep-css-peeps';
import {
	createHairAccentColor,
	createSkinShadowColor,
	fixedInkColor,
	neutralHeadwearAccentColor,
	neutralHeadwearColor
} from '@/features/character/open-peep-colors';

type OpenPeepRenderCategory = OpenPeepAtomCategory | 'pose';
type OpenPeepFraming = 'full' | 'head' | 'outfit';

interface SvgColorSemantics {
	accent: string;
	dark: string;
	light: string;
}

interface CssPeepElementProps {
	className?: string;
	detailRecolors: CssPeepDetailRecolor[];
	style: CSSProperties;
	title?: string;
	tokens: string;
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
	outfitViewBox: string;
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
		outfitViewBox: '100 590 930 850',
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
		outfitViewBox: '0 620 1179 2520',
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
		outfitViewBox: '0 610 1500 1880',
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

// The hybrid bust pairs a CSS-Peeps body with the original SVG head atoms.
// CSS-Peeps places the body slightly lower than the local Open Peeps bust template.
const hybridBustHeadOffsetY = 96;

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
	const viewBox = getComposerViewBox(layout, framing);

	if (resolvedCustomization.postureMode === 'bust' && canRenderCssPeep(resolvedCustomization)) {
		if (framing === 'outfit') {
			const cssPeep = createCssPeepRenderData(resolvedCustomization, 'outfit');

			return (
				<CssPeepElement
					className={className}
					detailRecolors={cssPeep.detailRecolors}
					style={cssPeep.style}
					title={title}
					tokens={cssPeep.tokens}
				/>
			);
		}

		if (framing === 'full') {
			const cssPeep = createCssPeepRenderData(resolvedCustomization, 'body');

			return (
				<OpenPeepHybridBust
					accessoriesAsset={accessoriesAsset}
					className={className}
					cssPeep={cssPeep}
					customization={resolvedCustomization}
					faceAsset={faceAsset}
					facialHairAsset={facialHairAsset}
					headAsset={headAsset}
					layout={layout}
					title={title}
				/>
			);
		}
	}

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

				{framing === 'outfit' ? null : (
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
				)}
			</g>
		</svg>
	);
}

function OpenPeepHybridBust({
	accessoriesAsset,
	className,
	cssPeep,
	customization,
	faceAsset,
	facialHairAsset,
	headAsset,
	layout,
	title
}: {
	accessoriesAsset: OpenPeepAtomAsset;
	className?: string;
	cssPeep: ReturnType<typeof createCssPeepRenderData>;
	customization: OpenPeepCustomization;
	faceAsset: OpenPeepAtomAsset;
	facialHairAsset: OpenPeepAtomAsset;
	headAsset: OpenPeepAtomAsset;
	layout: ComposerLayout;
	title?: string;
}) {
	return (
		<div
			aria-hidden={title ? undefined : true}
			aria-label={title}
			className={['open-peep-hybrid-bust', className].filter(Boolean).join(' ')}
			role={title ? 'img' : undefined}
		>
			<CssPeepElement
				className="open-peep-hybrid-bust__body"
				detailRecolors={cssPeep.detailRecolors}
				style={cssPeep.style}
				tokens={cssPeep.tokens}
			/>
			<svg
				aria-hidden="true"
				className="open-peep-hybrid-bust__head"
				focusable="false"
				viewBox={layout.viewBox}
				xmlns="http://www.w3.org/2000/svg"
			>
				<g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1" transform={`translate(${layout.head.x} ${layout.head.y + hybridBustHeadOffsetY})`}>
					<OpenPeepSvgGroup asset={headAsset} category="head" customization={customization} />
					<OpenPeepSvgGroup
						asset={faceAsset}
						category="face"
						customization={customization}
						transform={`translate(${layout.face.x} ${layout.face.y})`}
					/>
					<OpenPeepSvgGroup
						asset={facialHairAsset}
						category="facialHair"
						customization={customization}
						transform={`translate(${layout.facialHair.x} ${layout.facialHair.y})`}
					/>
					<OpenPeepSvgGroup
						asset={accessoriesAsset}
						category="accessories"
						customization={customization}
						transform={`translate(${layout.accessories.x} ${layout.accessories.y})`}
					/>
				</g>
			</svg>
		</div>
	);
}

function CssPeepElement({
	className,
	detailRecolors,
	style,
	title,
	tokens
}: CssPeepElementProps) {
	const elementRef = useRef<HTMLDivElement>(null);
	const [detailOverrides, setDetailOverrides] = useState<Record<string, string> | null>(null);
	const detailRecolorKey = detailRecolors
		.map((detailRecolor) => [
			detailRecolor.outputVariable,
			detailRecolor.sourceVariable,
			detailRecolor.fillColor,
			detailRecolor.strokeColor ?? '',
			detailRecolor.strokeWidth ?? ''
		].join(':'))
		.join('|');
	const stableDetailRecolors = useMemo(() => detailRecolors, [detailRecolorKey]);

	useLayoutEffect(() => {
		if (stableDetailRecolors.length === 0 || !elementRef.current) {
			setDetailOverrides(null);
			return;
		}

		const computedStyle = getComputedStyle(elementRef.current);
		const nextOverrides = Object.fromEntries(stableDetailRecolors.flatMap((detailRecolor) => {
			const sourceDetail = computedStyle
				.getPropertyValue(detailRecolor.sourceVariable)
				.trim();
			const recoloredDetail = createRecoloredCssPeepDetail(sourceDetail, detailRecolor);

			return recoloredDetail ? [[detailRecolor.outputVariable, recoloredDetail]] : [];
		}));

		setDetailOverrides(Object.keys(nextOverrides).length > 0 ? nextOverrides : null);
	}, [detailRecolorKey, stableDetailRecolors]);

	const mergedStyle = useMemo(() => {
		if (!detailOverrides) {
			return style;
		}

		return {
			...style,
			...detailOverrides
		} as CSSProperties;
	}, [detailOverrides, style]);

	return (
		<div
			aria-hidden={title ? undefined : true}
			aria-label={title}
			className={['open-peep-css-peep', className].filter(Boolean).join(' ')}
			data-css-peeps={tokens}
			data-recolored-detail={detailRecolors.length > 0 ? true : undefined}
			ref={elementRef}
			role={title ? 'img' : undefined}
			style={mergedStyle}
		/>
	);
}

function createRecoloredCssPeepDetail(sourceDetail: string, detailRecolor: CssPeepDetailRecolor) {
	const svg = decodeCssPeepSvgUrl(sourceDetail);

	if (!svg) {
		return null;
	}

	const strokeAttributes = detailRecolor.strokeColor && detailRecolor.strokeWidth
		? ` stroke="${detailRecolor.strokeColor}" stroke-width="${detailRecolor.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"`
		: '';
	const recoloredSvg = svg.replace(/<path fill="#000"/g, `<path fill="${detailRecolor.fillColor}"${strokeAttributes}`);

	return `url("data:image/svg+xml,${encodeURIComponent(recoloredSvg)}")`;
}

function decodeCssPeepSvgUrl(sourceDetail: string) {
	const match = sourceDetail.match(/^url\((["']?)(data:image\/svg\+xml,.*)\1\)$/);

	if (!match) {
		return null;
	}

	try {
		return decodeURIComponent(match[2].slice('data:image/svg+xml,'.length));
	} catch {
		return null;
	}
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
	const svgContent = getSvgContent(asset.raw);

	return svgContent
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

function getComposerViewBox(layout: ComposerLayout, framing: OpenPeepFraming) {
	if (framing === 'head') {
		return layout.headViewBox;
	}

	if (framing === 'outfit') {
		return layout.outfitViewBox;
	}

	return layout.viewBox;
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
		light: category === 'body' ? colors.skin : colors.outfit
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
