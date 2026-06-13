import {
	defaultOpenPeepCustomization,
	openPeepPostureModes
} from '@classyc/shared';
import type { OpenPeepCustomization, OpenPeepPostureMode } from '@classyc/shared';

export type OpenPeepAtomCategory =
	| 'body'
	| 'head'
	| 'face'
	| 'facialHair'
	| 'accessories'
	| 'standingPose'
	| 'sittingPose';

export interface OpenPeepAtomAsset {
	id: string;
	label: string;
	category: OpenPeepAtomCategory;
	raw: string;
	viewBox: string;
	sourcePath: string;
}

const bodyModules = import.meta.glob<string>('../../../../Flat Assets/Flat Assets/Separate Atoms/body/*.svg', {
	eager: true,
	import: 'default',
	query: '?raw'
});

const headModules = import.meta.glob<string>('../../../../Flat Assets/Flat Assets/Separate Atoms/head/*.svg', {
	eager: true,
	import: 'default',
	query: '?raw'
});

const faceModules = import.meta.glob<string>('../../../../Flat Assets/Flat Assets/Separate Atoms/face/*.svg', {
	eager: true,
	import: 'default',
	query: '?raw'
});

const facialHairModules = import.meta.glob<string>('../../../../Flat Assets/Flat Assets/Separate Atoms/facial-hair/*.svg', {
	eager: true,
	import: 'default',
	query: '?raw'
});

const accessoriesModules = import.meta.glob<string>('../../../../Flat Assets/Flat Assets/Separate Atoms/accessories/*.svg', {
	eager: true,
	import: 'default',
	query: '?raw'
});

const standingPoseModules = import.meta.glob<string>('../../../../Flat Assets/Flat Assets/Separate Atoms/pose/standing/*.svg', {
	eager: true,
	import: 'default',
	query: '?raw'
});

const sittingPoseModules = import.meta.glob<string>('../../../../Flat Assets/Flat Assets/Separate Atoms/pose/sitting/*.svg', {
	eager: true,
	import: 'default',
	query: '?raw'
});

export const openPeepAtomCategories: readonly OpenPeepAtomCategory[] = [
	'body',
	'head',
	'face',
	'facialHair',
	'accessories',
	'standingPose',
	'sittingPose'
] as const;

export const openPeepAtomAssets: Record<OpenPeepAtomCategory, readonly OpenPeepAtomAsset[]> = {
	body: createAtomAssets('body', bodyModules),
	head: createAtomAssets('head', headModules),
	face: createAtomAssets('face', faceModules),
	facialHair: createAtomAssets('facialHair', facialHairModules),
	accessories: createAtomAssets('accessories', accessoriesModules),
	standingPose: createAtomAssets('standingPose', standingPoseModules),
	sittingPose: createAtomAssets('sittingPose', sittingPoseModules)
};

const defaultAtomIds: Record<OpenPeepAtomCategory, string> = {
	body: defaultOpenPeepCustomization.bodyId,
	head: defaultOpenPeepCustomization.headId,
	face: defaultOpenPeepCustomization.faceId,
	facialHair: defaultOpenPeepCustomization.facialHairId,
	accessories: defaultOpenPeepCustomization.accessoryId,
	standingPose: defaultOpenPeepCustomization.standingPoseId,
	sittingPose: defaultOpenPeepCustomization.sittingPoseId
};

export function getOpenPeepAtom(category: OpenPeepAtomCategory, id: string): OpenPeepAtomAsset {
	const assets = openPeepAtomAssets[category];

	const asset = (
		assets.find((asset) => asset.id === id)
		?? assets.find((asset) => asset.id === defaultAtomIds[category])
		?? assets[0]
	);

	if (!asset) {
		throw new Error(`Missing Open Peeps assets for category ${category}.`);
	}

	return asset;
}

export function resolveOpenPeepCustomization(customization: OpenPeepCustomization | undefined): OpenPeepCustomization {
	const base = customization ?? defaultOpenPeepCustomization;
	const postureMode = isKnownPostureMode(base.postureMode) ? base.postureMode : defaultOpenPeepCustomization.postureMode;

	return {
		...defaultOpenPeepCustomization,
		...base,
		bodyId: getOpenPeepAtom('body', base.bodyId).id,
		headId: getOpenPeepAtom('head', base.headId).id,
		faceId: getOpenPeepAtom('face', base.faceId).id,
		facialHairId: getOpenPeepAtom('facialHair', base.facialHairId).id,
		accessoryId: getOpenPeepAtom('accessories', base.accessoryId).id,
		standingPoseId: getOpenPeepAtom('standingPose', base.standingPoseId).id,
		sittingPoseId: getOpenPeepAtom('sittingPose', base.sittingPoseId).id,
		postureMode,
		colors: {
			...defaultOpenPeepCustomization.colors,
			...base.colors
		}
	};
}

function createAtomAssets(category: OpenPeepAtomCategory, modules: Record<string, string>) {
	return Object.entries(modules)
		.map(([sourcePath, raw]) => createAtomAsset(category, sourcePath, raw))
		.filter((asset): asset is OpenPeepAtomAsset => Boolean(asset))
		.sort(compareAtomAssets);
}

function createAtomAsset(category: OpenPeepAtomCategory, sourcePath: string, raw: string): OpenPeepAtomAsset | null {
	const id = getFileStem(sourcePath);

	if (!id || id.startsWith('._') || sourcePath.includes('__MACOSX')) {
		return null;
	}

	return {
		id,
		label: formatAtomLabel(id),
		category,
		raw,
		viewBox: getSvgViewBox(raw),
		sourcePath
	};
}

function compareAtomAssets(first: OpenPeepAtomAsset, second: OpenPeepAtomAsset) {
	if (first.id === '_ None') {
		return -1;
	}

	if (second.id === '_ None') {
		return 1;
	}

	return first.label.localeCompare(second.label, 'en');
}

function formatAtomLabel(id: string) {
	if (id === '_ None') {
		return 'None';
	}

	return id
		.replace(/[_-]+/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
		.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getFileStem(path: string) {
	const fileName = path.split('/').at(-1) ?? '';

	return fileName.replace(/\.svg$/i, '');
}

function getSvgViewBox(raw: string) {
	return raw.match(/viewBox="([^"]+)"/i)?.[1] ?? '0 0 100 100';
}

function isKnownPostureMode(value: OpenPeepPostureMode) {
	return openPeepPostureModes.includes(value);
}
