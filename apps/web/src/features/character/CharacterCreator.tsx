import { motion } from 'framer-motion';
import {
	ChevronLeft,
	ChevronRight,
	Glasses,
	Image as ImageIcon,
	Scissors,
	Shirt,
	Smile,
	UserRound
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { OpenPeepCustomization, OpenPeepCustomizationColors } from '@classyc/shared';
import {
	openPeepAtomAssets,
	resolveOpenPeepCustomization
} from '@/assets/open-peeps-atoms';
import type { OpenPeepAtomAsset, OpenPeepAtomCategory } from '@/assets/open-peeps-atoms';
import type { CharacterCreatorCopy } from '@/features/i18n/ui-copy';
import { OpenPeepAtomPreview, OpenPeepComposer } from '@/features/character/OpenPeepComposer';
import {
	characterBackgroundPatterns,
	createCharacterBackgroundStyle,
	safeCharacterBackgroundColors
} from '@/features/character/character-backgrounds';
import { hasSecondaryOutfitColor } from '@/features/character/open-peep-css-peeps';
import { createReadablePreviewColor } from '@/features/character/open-peep-colors';

type CharacterCreatorCategory =
	| 'body'
	| 'head'
	| 'face'
	| 'facialHair'
	| 'accessories'
	| 'background';

type AssetCharacterCreatorCategory = Exclude<CharacterCreatorCategory, 'background'>;

type EditableOpenPeepAtomCategory = Exclude<OpenPeepAtomCategory, 'standingPose' | 'sittingPose'>;

type CharacterColorKey = Exclude<keyof OpenPeepCustomizationColors, 'ink'>;

interface CharacterCreatorProps {
	copy: CharacterCreatorCopy;
	onChange: (customization: OpenPeepCustomization) => void;
	value: OpenPeepCustomization;
}

const categoryIcons: Record<CharacterCreatorCategory, LucideIcon> = {
	body: Shirt,
	head: UserRound,
	face: Smile,
	facialHair: Scissors,
	accessories: Glasses,
	background: ImageIcon
};

const creatorCategories: readonly CharacterCreatorCategory[] = [
	'head',
	'face',
	'facialHair',
	'accessories',
	'body',
	'background'
] as const;

const assetCategoryByCreatorCategory: Record<AssetCharacterCreatorCategory, EditableOpenPeepAtomCategory> = {
	body: 'body',
	head: 'head',
	face: 'face',
	facialHair: 'facialHair',
	accessories: 'accessories'
};

const colorPalettes: Record<CharacterColorKey, readonly string[]> = {
	skin: ['#F8D4B8', '#F2C7A5', '#DFA07B', '#B87355', '#8E563E', '#6B3F2E', '#F4D8C8', '#C68662'],
	hair: ['#111827', '#3B2418', '#6B3F2E', '#8B5E34', '#B77B45', '#D6D3D1', '#6B7280', '#7C3AED'],
	outfit: ['#2563EB', '#14B8A6', '#22C55E', '#F97316', '#EF4444', '#A855F7', '#0F172A', '#F8FAFC'],
	outfitSecondary: ['#F8FAFC', '#0F172A', '#94A3B8', '#FDE68A', '#FCA5A5', '#A7F3D0', '#BFDBFE', '#DDD6FE'],
	accessory: ['#111827', '#2563EB', '#0EA5E9', '#F59E0B', '#EF4444', '#A855F7', '#64748B', '#F8FAFC'],
	background: safeCharacterBackgroundColors
};

export function CharacterCreator({ copy, onChange, value }: CharacterCreatorProps) {
	const customization = {
		...resolveOpenPeepCustomization(value),
		postureMode: 'bust' as const
	};
	const customizationRef = useRef<OpenPeepCustomization>(customization);
	const [activeCategory, setActiveCategory] = useState<CharacterCreatorCategory>('head');
	customizationRef.current = customization;

	function patchCustomization(patch: Partial<OpenPeepCustomization>) {
		const baseCustomization = customizationRef.current;
		const nextCustomization = resolveOpenPeepCustomization({
			...baseCustomization,
			...patch,
			background: {
				...baseCustomization.background,
				...(patch.background ?? {})
			},
			colors: {
				...baseCustomization.colors,
				...(patch.colors ?? {})
			},
			postureMode: 'bust'
		});

		customizationRef.current = nextCustomization;
		onChange(nextCustomization);
	}

	function patchColors(patch: Partial<OpenPeepCustomizationColors>) {
		patchCustomization({
			colors: {
				...customization.colors,
				...patch
			}
		});
	}

	return (
		<section className="character-creator" aria-label={copy.categories.head}>
			<div className="character-preview-panel">
				<div
					className="character-preview-stage"
					data-background-pattern={customization.background.patternId}
					style={createCharacterBackgroundStyle(customization)}
				>
					<OpenPeepComposer className="character-preview-svg" customization={customization} title="Open Peeps" />
				</div>
				<InlineColorControls
					activeCategory={activeCategory}
					copy={copy}
					customization={customization}
					onChange={patchColors}
				/>
			</div>

			<div className="character-editor-panel">
				<div className="character-category-tabs" role="tablist" aria-label={copy.categories.head}>
					{creatorCategories.map((category) => {
						const Icon = categoryIcons[category];
						const isSelected = activeCategory === category;

						return (
							<motion.button
								aria-label={copy.categories[category]}
								aria-selected={isSelected}
								className="character-category-tab"
								data-selected={isSelected}
								key={category}
								onClick={() => setActiveCategory(category)}
								role="tab"
								title={copy.categories[category]}
								type="button"
								whileTap={{ scale: 0.96 }}
							>
								<Icon aria-hidden="true" size={19} strokeWidth={2.35} />
								<span>{copy.categories[category]}</span>
							</motion.button>
						);
					})}
				</div>

				<div className="character-editor-body" role="tabpanel">
					{activeCategory === 'background' ? (
						<BackgroundPanel
							copy={copy}
							customization={customization}
							onChange={patchCustomization}
						/>
					) : (
						<AssetPanel
							category={assetCategoryByCreatorCategory[activeCategory]}
							copy={copy}
							customization={customization}
							onChange={patchCustomization}
						/>
					)}
				</div>
			</div>
		</section>
	);
}

function BackgroundPanel({
	copy,
	customization,
	onChange
}: {
	copy: CharacterCreatorCopy;
	customization: OpenPeepCustomization;
	onChange: (patch: Partial<OpenPeepCustomization>) => void;
}) {
	return (
		<div className="character-option-grid">
			{characterBackgroundPatterns.map((pattern, index) => {
				const isSelected = customization.background.patternId === pattern.id;
				const previewCustomization = {
					...customization,
					background: {
						patternId: pattern.id
					}
				};

				return (
					<motion.button
						animate={{ opacity: 1, y: 0 }}
						aria-label={copy.backgroundPatterns[pattern.id]}
						aria-pressed={isSelected}
						className="character-option-card"
						data-category="background"
						data-selected={isSelected}
						initial={{ opacity: 0, y: 6 }}
						key={pattern.id}
						onClick={() => onChange({
							background: {
								...customization.background,
								patternId: pattern.id
							}
						})}
						title={copy.backgroundPatterns[pattern.id]}
						transition={{ delay: index * 0.02, duration: 0.16, ease: 'easeOut' }}
						type="button"
						whileHover={{ y: -2 }}
						whileTap={{ scale: 0.98 }}
					>
						<span
							className="character-background-preview"
							data-background-pattern={pattern.id}
							style={createCharacterBackgroundStyle(previewCustomization, { preferDefaultSurface: false })}
						/>
						<span className="character-option-label">{copy.backgroundPatterns[pattern.id]}</span>
					</motion.button>
				);
			})}
		</div>
	);
}

function AssetPanel({
	category,
	copy,
	customization,
	onChange
}: {
	category: EditableOpenPeepAtomCategory;
	copy: CharacterCreatorCopy;
	customization: OpenPeepCustomization;
	onChange: (patch: Partial<OpenPeepCustomization>) => void;
}) {
	const assets = openPeepAtomAssets[category];
	const selectedId = getSelectedAssetId(category, customization);

	function selectAsset(asset: OpenPeepAtomAsset) {
		onChange(getAssetPatch(category, asset.id));
	}

	return (
		<div className="character-option-grid">
			{assets.map((asset, index) => {
				const isSelected = asset.id === selectedId;

				return (
					<motion.button
						animate={{ opacity: 1, y: 0 }}
						aria-label={getAssetLabel(asset, copy)}
						aria-pressed={isSelected}
						className="character-option-card"
						data-category={category}
						data-selected={isSelected}
						initial={{ opacity: 0, y: 6 }}
						key={asset.sourcePath}
						onClick={() => selectAsset(asset)}
						title={getAssetLabel(asset, copy)}
						transition={{ delay: index * 0.01, duration: 0.16, ease: 'easeOut' }}
						type="button"
						whileHover={{ y: -2 }}
						whileTap={{ scale: 0.98 }}
					>
						<span className="character-option-preview" style={getOptionPreviewStyle(category, customization)}>
							<AssetPreview asset={asset} category={category} customization={customization} />
						</span>
						<span className="character-option-label">{getAssetLabel(asset, copy)}</span>
					</motion.button>
				);
			})}
		</div>
	);
}

function AssetPreview({
	asset,
	category,
	customization
}: {
	asset: OpenPeepAtomAsset;
	category: EditableOpenPeepAtomCategory;
	customization: OpenPeepCustomization;
}) {
	if (category === 'body') {
		return (
			<OpenPeepComposer
				className="character-option-svg"
				customization={{
					...customization,
					bodyId: asset.id,
					postureMode: 'bust'
				}}
				framing="outfit"
			/>
		);
	}

	return <OpenPeepAtomPreview asset={asset} className="character-option-svg" customization={customization} />;
}

function InlineColorControls({
	activeCategory,
	copy,
	customization,
	onChange
}: {
	activeCategory: CharacterCreatorCategory;
	copy: CharacterCreatorCopy;
	customization: OpenPeepCustomization;
	onChange: (patch: Partial<OpenPeepCustomizationColors>) => void;
}) {
	const activeColorKeys = getActiveColorKeys(activeCategory, customization);
	const colorDockKey = activeColorKeys.join('|');
	const scrollRef = useRef<HTMLDivElement>(null);
	const [scrollState, setScrollState] = useState({
		canScrollLeft: false,
		canScrollRight: false
	});
	const updateScrollState = useCallback(() => {
		const scrollElement = scrollRef.current;

		if (!scrollElement) {
			setScrollState({
				canScrollLeft: false,
				canScrollRight: false
			});
			return;
		}

		const maxScrollLeft = scrollElement.scrollWidth - scrollElement.clientWidth;

		setScrollState({
			canScrollLeft: scrollElement.scrollLeft > 1,
			canScrollRight: scrollElement.scrollLeft < maxScrollLeft - 1
		});
	}, []);

	useEffect(() => {
		updateScrollState();

		const scrollElement = scrollRef.current;

		if (!scrollElement) {
			return;
		}

		const resizeObserver = new ResizeObserver(updateScrollState);
		resizeObserver.observe(scrollElement);
		window.addEventListener('resize', updateScrollState);

		return () => {
			resizeObserver.disconnect();
			window.removeEventListener('resize', updateScrollState);
		};
	}, [colorDockKey, updateScrollState]);

	function scrollColors(direction: -1 | 1) {
		const scrollElement = scrollRef.current;

		if (!scrollElement) {
			return;
		}

		scrollElement.scrollBy({
			behavior: 'smooth',
			left: direction * Math.max(112, scrollElement.clientWidth * 0.7)
		});
	}

	return (
		<div className="character-color-dock">
			<button
				aria-label="Couleurs precedentes"
				className="character-color-arrow"
				disabled={!scrollState.canScrollLeft}
				onClick={() => scrollColors(-1)}
				type="button"
			>
				<ChevronLeft aria-hidden="true" size={17} strokeWidth={2.5} />
			</button>
			<div className="character-color-scroll" onScroll={updateScrollState} ref={scrollRef}>
				{activeColorKeys.map((colorKey) => (
					<div aria-label={copy.colors[colorKey]} className="character-color-group" key={colorKey} role="group">
						<div className="character-swatches">
							{colorPalettes[colorKey].map((color) => {
								const isSelected = normalizeColor(customization.colors[colorKey]) === normalizeColor(color);

								return (
									<button
										aria-label={`${copy.colors[colorKey]} ${color}`}
										className="character-swatch"
										data-selected={isSelected}
										key={color}
										onClick={() => onChange({ [colorKey]: color })}
										style={{ backgroundColor: color }}
										title={copy.colors[colorKey]}
										type="button"
									/>
								);
							})}
						</div>
					</div>
				))}
			</div>
			<button
				aria-label="Couleurs suivantes"
				className="character-color-arrow"
				disabled={!scrollState.canScrollRight}
				onClick={() => scrollColors(1)}
				type="button"
			>
				<ChevronRight aria-hidden="true" size={17} strokeWidth={2.5} />
			</button>
		</div>
	);
}

function getSelectedAssetId(category: EditableOpenPeepAtomCategory, customization: OpenPeepCustomization) {
	switch (category) {
		case 'body':
			return customization.bodyId;
		case 'head':
			return customization.headId;
		case 'face':
			return customization.faceId;
		case 'facialHair':
			return customization.facialHairId;
		case 'accessories':
			return customization.accessoryId;
	}
}

function getAssetPatch(category: EditableOpenPeepAtomCategory, assetId: string): Partial<OpenPeepCustomization> {
	switch (category) {
		case 'body':
			return { bodyId: assetId };
		case 'head':
			return { headId: assetId };
		case 'face':
			return { faceId: assetId };
		case 'facialHair':
			return { facialHairId: assetId };
		case 'accessories':
			return { accessoryId: assetId };
	}
}

function getAssetLabel(asset: OpenPeepAtomAsset, copy: CharacterCreatorCopy) {
	return asset.id === '_ None' ? copy.none : asset.label;
}

function getActiveColorKeys(activeCategory: CharacterCreatorCategory, customization: OpenPeepCustomization): readonly CharacterColorKey[] {
	switch (activeCategory) {
		case 'head':
			return ['hair', 'skin'];
		case 'face':
			return ['skin'];
		case 'facialHair':
			return ['hair'];
		case 'accessories':
			return ['accessory'];
		case 'body':
			return hasSecondaryOutfitColor(customization.bodyId) ? ['outfit', 'outfitSecondary'] : ['outfit'];
		case 'background':
			return ['background'];
	}
}

function getOptionPreviewStyle(category: EditableOpenPeepAtomCategory, customization: OpenPeepCustomization): CSSProperties {
	if (category === 'face') {
		return {
			'--character-option-preview-bg': createReadablePreviewColor(customization.colors.skin)
		} as CSSProperties;
	}

	if (category === 'accessories') {
		return {
			'--character-option-preview-bg': '#F8FAFC'
		} as CSSProperties;
	}

	return {};
}

function normalizeColor(color: string) {
	return color.toUpperCase();
}
