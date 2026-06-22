import openMojiMetadataJson from '../../../../Openmoji/openmoji.json';

interface OpenMojiMetadataRecord {
	hexcode: string;
	group?: string;
	subgroups?: string;
	annotation?: string;
	tags?: string;
	openmoji_tags?: string;
	order?: number;
}

export interface OpenMojiSearchResult {
	hexcode: string;
	label: string;
	tags: readonly string[];
	src: string;
}

export interface SearchOpenMojiOptions {
	limit?: number;
}

export type OpenMojiUseCaseExampleId = 'levels' | 'exercises' | 'ui';

export interface OpenMojiUseCaseExample {
	id: OpenMojiUseCaseExampleId;
	label: string;
	query: string;
	icons: readonly OpenMojiSearchResult[];
}

interface OpenMojiIndexEntry {
	order: number;
	result: OpenMojiSearchResult;
	normalizedLabel: string;
	normalizedTagText: string;
	normalizedTaxonomyText: string;
	searchableText: string;
	labelTokens: ReadonlySet<string>;
	tagTokens: ReadonlySet<string>;
	taxonomyTokens: ReadonlySet<string>;
}

const defaultSearchLimit = 12;

const openMojiIconModules = import.meta.glob<string>('../../../../Openmoji/icons/*.png', {
	eager: true,
	import: 'default',
	query: '?url'
});

const openMojiMetadata = openMojiMetadataJson as readonly OpenMojiMetadataRecord[];

const openMojiIconSourcesByHexcode: Readonly<Record<string, string>> = Object.fromEntries(
	Object.entries(openMojiIconModules)
		.map(([sourcePath, src]) => {
			const hexcode = getOpenMojiIconHexcode(sourcePath);

			return hexcode ? [hexcode, src] : null;
		})
		.filter((entry): entry is [string, string] => Boolean(entry))
);

const openMojiIndexEntries: readonly OpenMojiIndexEntry[] = openMojiMetadata
	.map(createOpenMojiIndexEntry)
	.filter((entry): entry is OpenMojiIndexEntry => Boolean(entry))
	.sort((first, second) => first.order - second.order);

const openMojiResultsByHexcode: Readonly<Record<string, OpenMojiSearchResult>> = Object.fromEntries(
	openMojiIndexEntries.map((entry) => [entry.result.hexcode, entry.result])
);

export const openMojiIcons: readonly OpenMojiSearchResult[] = openMojiIndexEntries.map((entry) => entry.result);

export const openMojiUseCaseExamples: readonly OpenMojiUseCaseExample[] = [
	{
		id: 'levels',
		label: 'Niveaux',
		query: 'target trophy star',
		icons: getOpenMojiExampleIcons(['1F3AF', '1F3C6', '2B50'])
	},
	{
		id: 'exercises',
		label: 'Exercices',
		query: 'writing microphone memo',
		icons: getOpenMojiExampleIcons(['270D', '1F399', '1F4DD'])
	},
	{
		id: 'ui',
		label: 'UI',
		query: 'bell gear light',
		icons: getOpenMojiExampleIcons(['1F514', '2699', '1F4A1'])
	}
];

export function searchOpenMoji(query: string, options: SearchOpenMojiOptions = {}): readonly OpenMojiSearchResult[] {
	const limit = normalizeLimit(options.limit);
	const normalizedQuery = normalizeOpenMojiSearchText(query);

	if (!normalizedQuery) {
		return openMojiIcons.slice(0, limit);
	}

	const normalizedHexcode = normalizeOpenMojiHexcode(query);
	const queryTokens = tokenizeSearchText(normalizedQuery);

	return openMojiIndexEntries
		.map((entry) => ({
			entry,
			score: scoreOpenMojiEntry(entry, normalizedQuery, normalizedHexcode, queryTokens)
		}))
		.filter((match) => match.score > 0)
		.sort((first, second) => second.score - first.score || first.entry.order - second.entry.order)
		.slice(0, limit)
		.map((match) => match.entry.result);
}

export function getOpenMojiByHexcode(hexcode: string): OpenMojiSearchResult | undefined {
	return openMojiResultsByHexcode[normalizeOpenMojiHexcode(hexcode)];
}

export function resolveOpenMojiIconSrc(hexcode: string): string {
	const normalizedHexcode = normalizeOpenMojiHexcode(hexcode);
	const src = openMojiIconSourcesByHexcode[normalizedHexcode];

	if (!src) {
		throw new Error(`Missing OpenMoji icon for ${normalizedHexcode}.`);
	}

	return src;
}

export function normalizeOpenMojiHexcode(hexcode: string): string {
	return hexcode
		.trim()
		.replace(/\.png$/i, '')
		.replace(/_/g, '-')
		.replace(/\s+/g, '-')
		.toUpperCase();
}

export function normalizeOpenMojiSearchText(value: string): string {
	return value
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[_-]+/g, ' ')
		.replace(/[^\p{L}\p{N}\s]+/gu, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

function createOpenMojiIndexEntry(record: OpenMojiMetadataRecord): OpenMojiIndexEntry | null {
	const hexcode = normalizeOpenMojiHexcode(record.hexcode);

	if (!hexcode || !openMojiIconSourcesByHexcode[hexcode]) {
		return null;
	}

	const label = record.annotation?.trim() || hexcode;
	const tags = uniqueList([
		...splitOpenMojiTags(record.tags),
		...splitOpenMojiTags(record.openmoji_tags),
		formatTaxonomyTag(record.group),
		formatTaxonomyTag(record.subgroups)
	]);
	const taxonomyTags = uniqueList([
		formatTaxonomyTag(record.group),
		formatTaxonomyTag(record.subgroups)
	]);
	const normalizedLabel = normalizeOpenMojiSearchText(label);
	const normalizedTagText = normalizeOpenMojiSearchText(tags.join(' '));
	const normalizedTaxonomyText = normalizeOpenMojiSearchText(taxonomyTags.join(' '));
	const searchableText = normalizeOpenMojiSearchText([
		hexcode,
		label,
		record.tags,
		record.openmoji_tags,
		record.group,
		record.subgroups
	].filter(Boolean).join(' '));

	return {
		order: typeof record.order === 'number' ? record.order : Number.MAX_SAFE_INTEGER,
		result: {
			hexcode,
			label,
			tags,
			src: resolveOpenMojiIconSrc(hexcode)
		},
		normalizedLabel,
		normalizedTagText,
		normalizedTaxonomyText,
		searchableText,
		labelTokens: new Set(tokenizeSearchText(normalizedLabel)),
		tagTokens: new Set(tokenizeSearchText(normalizedTagText)),
		taxonomyTokens: new Set(tokenizeSearchText(normalizedTaxonomyText))
	};
}

function scoreOpenMojiEntry(
	entry: OpenMojiIndexEntry,
	normalizedQuery: string,
	normalizedHexcode: string,
	queryTokens: readonly string[]
) {
	let score = 0;

	if (entry.result.hexcode === normalizedHexcode) {
		score += 1000;
	}

	if (entry.normalizedLabel === normalizedQuery) {
		score += 220;
	} else if (entry.normalizedLabel.includes(normalizedQuery)) {
		score += 110;
	}

	if (entry.normalizedTagText.includes(normalizedQuery)) {
		score += 65;
	}

	if (entry.normalizedTaxonomyText.includes(normalizedQuery)) {
		score += 45;
	}

	for (const token of queryTokens) {
		if (entry.labelTokens.has(token)) {
			score += 34;
		} else if (entry.normalizedLabel.includes(token)) {
			score += 20;
		}

		if (entry.tagTokens.has(token)) {
			score += 20;
		} else if (entry.normalizedTagText.includes(token)) {
			score += 12;
		}

		if (entry.taxonomyTokens.has(token)) {
			score += 10;
		} else if (entry.normalizedTaxonomyText.includes(token)) {
			score += 6;
		}

		if (entry.result.hexcode.toLowerCase().includes(token)) {
			score += 80;
		}
	}

	if (queryTokens.length > 1 && queryTokens.every((token) => entry.searchableText.includes(token))) {
		score += 40;
	}

	return score;
}

function getOpenMojiExampleIcons(hexcodes: readonly string[]) {
	return hexcodes.map((hexcode) => {
		const icon = getOpenMojiByHexcode(hexcode);

		if (!icon) {
			throw new Error(`Missing OpenMoji example icon for ${hexcode}.`);
		}

		return icon;
	});
}

function getOpenMojiIconHexcode(sourcePath: string) {
	const fileName = sourcePath.split(/[\\/]/).at(-1) ?? '';
	const hexcode = normalizeOpenMojiHexcode(fileName);

	if (!hexcode || hexcode.startsWith('._') || sourcePath.includes('__MACOSX')) {
		return null;
	}

	return hexcode;
}

function splitOpenMojiTags(value: string | undefined) {
	return (value ?? '')
		.split(',')
		.map((tag) => tag.trim())
		.filter(Boolean);
}

function formatTaxonomyTag(value: string | undefined) {
	return (value ?? '')
		.replace(/[-_]+/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

function tokenizeSearchText(value: string) {
	return normalizeOpenMojiSearchText(value)
		.split(' ')
		.filter(Boolean);
}

function uniqueList(values: readonly string[]) {
	const seen = new Set<string>();

	return values.filter((value) => {
		const normalizedValue = normalizeOpenMojiSearchText(value);

		if (!normalizedValue || seen.has(normalizedValue)) {
			return false;
		}

		seen.add(normalizedValue);

		return true;
	});
}

function normalizeLimit(limit: number | undefined) {
	if (!limit || !Number.isFinite(limit)) {
		return defaultSearchLimit;
	}

	return Math.max(1, Math.min(Math.floor(limit), 50));
}
