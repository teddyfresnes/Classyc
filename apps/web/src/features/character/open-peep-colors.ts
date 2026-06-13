export const fixedInkColor = '#111827';
export const neutralHeadwearColor = '#30343B';
export const neutralHeadwearAccentColor = '#5B6472';

interface RgbColor {
	blue: number;
	green: number;
	red: number;
}

export function createSkinShadowColor(skinColor: string) {
	return getColorLuminance(skinColor) > 0.48
		? mixHexColors(skinColor, '#5B3425', 0.34)
		: mixHexColors(skinColor, '#F8FAFC', 0.38);
}

export function createHairAccentColor(hairColor: string) {
	return getColorLuminance(hairColor) > 0.5
		? mixHexColors(hairColor, '#111827', 0.3)
		: mixHexColors(hairColor, '#F8FAFC', 0.26);
}

export function createReadablePreviewColor(color: string) {
	return getColorLuminance(color) > 0.42
		? color
		: mixHexColors(color, '#F8FAFC', 0.72);
}

export function mixHexColors(firstColor: string, secondColor: string, amount: number) {
	const first = parseHexColor(firstColor);
	const second = parseHexColor(secondColor);
	const safeAmount = Math.min(Math.max(amount, 0), 1);

	return rgbToHex({
		red: Math.round(first.red + (second.red - first.red) * safeAmount),
		green: Math.round(first.green + (second.green - first.green) * safeAmount),
		blue: Math.round(first.blue + (second.blue - first.blue) * safeAmount)
	});
}

function getColorLuminance(color: string) {
	const { blue, green, red } = parseHexColor(color);
	const channels = [red, green, blue].map((channel) => {
		const normalized = channel / 255;

		return normalized <= 0.03928
			? normalized / 12.92
			: ((normalized + 0.055) / 1.055) ** 2.4;
	});

	return 0.2126 * channels[0]! + 0.7152 * channels[1]! + 0.0722 * channels[2]!;
}

function parseHexColor(color: string): RgbColor {
	const normalizedColor = /^#[0-9a-f]{6}$/i.test(color) ? color : '#111827';
	const value = normalizedColor.slice(1);

	return {
		red: Number.parseInt(value.slice(0, 2), 16),
		green: Number.parseInt(value.slice(2, 4), 16),
		blue: Number.parseInt(value.slice(4, 6), 16)
	};
}

function rgbToHex({ blue, green, red }: RgbColor) {
	return `#${toHexChannel(red)}${toHexChannel(green)}${toHexChannel(blue)}`;
}

function toHexChannel(channel: number) {
	return channel.toString(16).padStart(2, '0').toUpperCase();
}
