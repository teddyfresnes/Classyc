import type { OpenPeepCustomization, OpenPeepPostureMode } from '@classyc/shared';
import { getOpenPeepAtom, resolveOpenPeepCustomization } from '@/assets/open-peeps-atoms';
import type { OpenPeepAtomAsset, OpenPeepAtomCategory } from '@/assets/open-peeps-atoms';

type OpenPeepRenderCategory = OpenPeepAtomCategory | 'pose';
type OpenPeepFraming = 'full' | 'head';

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
					__html: createOpenPeepSvgMarkup(asset.raw, getPreviewCategory(asset.category), customization)
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
				__html: createOpenPeepSvgMarkup(asset.raw, category, customization)
			}}
			transform={transform}
		/>
	);
}

function createOpenPeepSvgMarkup(rawSvg: string, category: OpenPeepRenderCategory, customization: OpenPeepCustomization) {
	const colors = customization.colors;
	const whiteFill = getWhiteFill(category, customization);
	const darkFill = getDarkFill(category, customization);

	return getSvgContent(rawSvg)
		.replace(/fill="#FFFFFF"/gi, `fill="${whiteFill}"`)
		.replace(/fill="white"/gi, `fill="${whiteFill}"`)
		.replace(/fill="#000000"/gi, `fill="${darkFill}"`)
		.replace(/fill="#231F20"/gi, `fill="${darkFill}"`)
		.replace(/fill="#221E1F"/gi, `fill="${darkFill}"`)
		.replace(/fill="#4F66AF"/gi, `fill="${colors.accessory}"`);
}

function getSvgContent(rawSvg: string) {
	const svgBody = rawSvg.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i)?.[1] ?? rawSvg;

	return svgBody
		.replace(/<!--[\s\S]*?-->/g, '')
		.replace(/<title>[\s\S]*?<\/title>/gi, '')
		.replace(/<desc>[\s\S]*?<\/desc>/gi, '')
		.trim();
}

function getWhiteFill(category: OpenPeepRenderCategory, customization: OpenPeepCustomization) {
	if (category === 'head' || category === 'facialHair') {
		return customization.colors.skin;
	}

	return customization.colors.outfit;
}

function getDarkFill(category: OpenPeepRenderCategory, customization: OpenPeepCustomization) {
	if (category === 'head' || category === 'facialHair') {
		return customization.colors.hair;
	}

	if (category === 'accessories') {
		return customization.colors.accessory;
	}

	return customization.colors.ink;
}

function getPreviewCategory(category: OpenPeepAtomCategory): OpenPeepRenderCategory {
	if (category === 'standingPose' || category === 'sittingPose') {
		return 'pose';
	}

	return category;
}
