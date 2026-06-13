import { motion } from 'framer-motion';
import {
	Glasses,
	Palette,
	PersonStanding,
	Scissors,
	Shirt,
	Smile,
	UserRound
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useState } from 'react';
import type { OpenPeepCustomization, OpenPeepCustomizationColors, OpenPeepPostureMode } from '@classyc/shared';
import {
	openPeepAtomAssets,
	resolveOpenPeepCustomization
} from '@/assets/open-peeps-atoms';
import type { OpenPeepAtomAsset, OpenPeepAtomCategory } from '@/assets/open-peeps-atoms';
import type { CharacterCreatorCopy } from '@/features/i18n/ui-copy';
import { OpenPeepAtomPreview, OpenPeepComposer } from '@/features/character/OpenPeepComposer';

type CharacterCreatorCategory =
	| 'body'
	| 'head'
	| 'face'
	| 'facialHair'
	| 'accessories'
	| 'colors'
	| 'posture';

type CharacterColorKey = keyof OpenPeepCustomizationColors;

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
	colors: Palette,
	posture: PersonStanding
};

const creatorCategories: readonly CharacterCreatorCategory[] = [
	'body',
	'head',
	'face',
	'facialHair',
	'accessories',
	'colors',
	'posture'
] as const;

const assetCategoryByCreatorCategory: Partial<Record<CharacterCreatorCategory, OpenPeepAtomCategory>> = {
	body: 'body',
	head: 'head',
	face: 'face',
	facialHair: 'facialHair',
	accessories: 'accessories'
};

const colorKeys: readonly CharacterColorKey[] = ['skin', 'hair', 'outfit', 'accessory', 'ink'] as const;

const colorPalettes: Record<CharacterColorKey, readonly string[]> = {
	skin: ['#F8D4B8', '#F2C7A5', '#DFA07B', '#B87355', '#8E563E', '#6B3F2E', '#F4D8C8', '#C68662'],
	hair: ['#111827', '#3B2418', '#6B3F2E', '#8B5E34', '#B77B45', '#D6D3D1', '#6B7280', '#7C3AED'],
	outfit: ['#2563EB', '#14B8A6', '#22C55E', '#F97316', '#EF4444', '#A855F7', '#0F172A', '#F8FAFC'],
	accessory: ['#111827', '#2563EB', '#0EA5E9', '#F59E0B', '#EF4444', '#A855F7', '#64748B', '#F8FAFC'],
	ink: ['#111827', '#1F2937', '#334155', '#0F172A', '#3B2418', '#475569']
};

const postureModes: readonly OpenPeepPostureMode[] = ['bust', 'standing', 'sitting'] as const;

export function CharacterCreator({ copy, onChange, value }: CharacterCreatorProps) {
	const customization = resolveOpenPeepCustomization(value);
	const [activeCategory, setActiveCategory] = useState<CharacterCreatorCategory>('body');

	function patchCustomization(patch: Partial<OpenPeepCustomization>) {
		onChange(resolveOpenPeepCustomization({
			...customization,
			...patch
		}));
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
		<section className="character-creator" aria-label={copy.categories.colors}>
			<div className="character-preview-panel">
				<div className="character-preview-stage">
					<OpenPeepComposer className="character-preview-svg" customization={customization} title="Open Peeps" />
				</div>
			</div>

			<div className="character-editor-panel">
				<div className="character-category-tabs" role="tablist" aria-label={copy.categories.colors}>
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
					{activeCategory === 'colors' ? (
						<ColorPanel copy={copy} customization={customization} onChange={patchColors} />
					) : activeCategory === 'posture' ? (
						<PosturePanel copy={copy} customization={customization} onChange={patchCustomization} />
					) : (
						<AssetPanel
							category={assetCategoryByCreatorCategory[activeCategory]!}
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

function AssetPanel({
	category,
	copy,
	customization,
	onChange
}: {
	category: OpenPeepAtomCategory;
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
						<span className="character-option-preview">
							<OpenPeepAtomPreview asset={asset} className="character-option-svg" customization={customization} />
						</span>
						<span className="character-option-label">{getAssetLabel(asset, copy)}</span>
					</motion.button>
				);
			})}
		</div>
	);
}

function ColorPanel({
	copy,
	customization,
	onChange
}: {
	copy: CharacterCreatorCopy;
	customization: OpenPeepCustomization;
	onChange: (patch: Partial<OpenPeepCustomizationColors>) => void;
}) {
	return (
		<div className="character-color-panel">
			{colorKeys.map((colorKey) => (
				<div className="character-color-row" key={colorKey}>
					<label className="character-color-label" htmlFor={`character-color-${colorKey}`}>
						{copy.colors[colorKey]}
					</label>
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
									type="button"
								/>
							);
						})}
					</div>
					<input
						aria-label={copy.colors[colorKey]}
						className="character-color-input"
						id={`character-color-${colorKey}`}
						onChange={(event) => onChange({ [colorKey]: event.target.value })}
						type="color"
						value={customization.colors[colorKey]}
					/>
				</div>
			))}
		</div>
	);
}

function PosturePanel({
	copy,
	customization,
	onChange
}: {
	copy: CharacterCreatorCopy;
	customization: OpenPeepCustomization;
	onChange: (patch: Partial<OpenPeepCustomization>) => void;
}) {
	const postureAssetCategory = customization.postureMode === 'sitting' ? 'sittingPose' : 'standingPose';
	const showPoseGrid = customization.postureMode !== 'bust';

	return (
		<div className="character-posture-panel">
			<div className="character-posture-modes" role="group" aria-label={copy.categories.posture}>
				{postureModes.map((mode) => {
					const isSelected = customization.postureMode === mode;

					return (
						<button
							aria-pressed={isSelected}
							className="character-posture-button"
							data-selected={isSelected}
							key={mode}
							onClick={() => onChange({ postureMode: mode })}
							type="button"
						>
							{copy.posture[mode]}
						</button>
					);
				})}
			</div>

			{showPoseGrid ? (
				<AssetPanel
					category={postureAssetCategory}
					copy={copy}
					customization={customization}
					onChange={onChange}
				/>
			) : null}
		</div>
	);
}

function getSelectedAssetId(category: OpenPeepAtomCategory, customization: OpenPeepCustomization) {
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
		case 'standingPose':
			return customization.standingPoseId;
		case 'sittingPose':
			return customization.sittingPoseId;
	}
}

function getAssetPatch(category: OpenPeepAtomCategory, assetId: string): Partial<OpenPeepCustomization> {
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
		case 'standingPose':
			return { standingPoseId: assetId };
		case 'sittingPose':
			return { sittingPoseId: assetId };
	}
}

function getAssetLabel(asset: OpenPeepAtomAsset, copy: CharacterCreatorCopy) {
	return asset.id === '_ None' ? copy.none : asset.label;
}

function normalizeColor(color: string) {
	return color.toUpperCase();
}
