import type { CSSProperties } from 'react';
import {
	defaultOpenPeepCustomization,
	openPeepBackgroundPatternIds
} from '@classyc/shared';
import type { OpenPeepBackgroundPatternId, OpenPeepCustomization } from '@classyc/shared';

export interface CharacterBackgroundPattern {
	color: string;
	id: OpenPeepBackgroundPatternId;
}

export const characterBackgroundPatterns: readonly CharacterBackgroundPattern[] = openPeepBackgroundPatternIds.map((id) => ({
	color: getDefaultBackgroundColor(id),
	id
}));

export const safeCharacterBackgroundColors: readonly string[] = [
	'#EAF1FF',
	'#FCE7F3',
	'#DCFCE7',
	'#FFF3D8',
	'#E0F2FE',
	'#EDE9FE',
	'#CCFBF1',
	'#FFE4E6',
	'#F8FAFC'
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

function getDefaultBackgroundColor(patternId: OpenPeepBackgroundPatternId) {
	switch (patternId) {
		case 'plain':
			return '#EAF1FF';
		case 'dots':
			return '#FCE7F3';
		case 'waves':
			return '#CCFBF1';
		case 'bubbles':
			return '#EDE9FE';
		case 'confetti':
			return '#FFF3D8';
		case 'diagonal':
			return '#DCFCE7';
	}
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
