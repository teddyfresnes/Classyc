import type { CSSProperties } from 'react';
import {
	defaultOpenPeepCustomization,
	openPeepBackgroundPatternIds
} from '@classyc/shared';
import type { OpenPeepBackgroundPatternId, OpenPeepCustomization } from '@classyc/shared';

export interface CharacterBackgroundPattern {
	id: OpenPeepBackgroundPatternId;
}

export const characterBackgroundPatterns: readonly CharacterBackgroundPattern[] = openPeepBackgroundPatternIds.map((id) => ({
	id
}));

export const safeCharacterBackgroundColors: readonly string[] = [
	'#EAF1FF',
	'#F8FAFC',
	'#EAF7F1',
	'#FFF3D8',
	'#FCE7F3',
	'#EEF2FF',
	'#E0F2FE',
	'#F1F5F9'
] as const;

export function createCharacterBackgroundStyle(
	customization: OpenPeepCustomization,
	options: { preferDefaultSurface?: boolean } = {}
): CSSProperties {
	const backgroundColor = customization.colors.background;
	const isDefaultPlainBackground = (
		options.preferDefaultSurface !== false
		&& customization.background.patternId === 'plain'
		&& normalizeHexColor(backgroundColor) === normalizeHexColor(defaultOpenPeepCustomization.colors.background)
	);

	return {
		...(isDefaultPlainBackground ? {} : { '--character-background-base': backgroundColor }),
		'--character-background-accent': createPatternAccentColor(backgroundColor)
	} as CSSProperties;
}

function createPatternAccentColor(color: string) {
	const luminance = getRelativeLuminance(color);
	const accentTarget = luminance > 0.82 ? '#2563EB' : '#FFFFFF';

	return mixHexColors(color, accentTarget, luminance > 0.82 ? 0.24 : 0.34);
}

function getRelativeLuminance(color: string) {
	const [red, green, blue] = parseHexColor(color).map((channel) => {
		const value = channel / 255;

		return value <= 0.03928
			? value / 12.92
			: ((value + 0.055) / 1.055) ** 2.4;
	});

	return (0.2126 * red) + (0.7152 * green) + (0.0722 * blue);
}

function mixHexColors(baseColor: string, overlayColor: string, overlayAmount: number) {
	const base = parseHexColor(baseColor);
	const overlay = parseHexColor(overlayColor);
	const mixed = base.map((channel, index) => Math.round(
		(channel * (1 - overlayAmount)) + (overlay[index] * overlayAmount)
	));

	return `#${mixed.map((channel) => channel.toString(16).padStart(2, '0')).join('').toUpperCase()}`;
}

function parseHexColor(color: string) {
	const normalizedColor = normalizeHexColor(color);

	return [
		Number.parseInt(normalizedColor.slice(1, 3), 16),
		Number.parseInt(normalizedColor.slice(3, 5), 16),
		Number.parseInt(normalizedColor.slice(5, 7), 16)
	] as const;
}

function normalizeHexColor(color: string) {
	return color.toUpperCase();
}
