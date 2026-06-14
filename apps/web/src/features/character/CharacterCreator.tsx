import { motion } from 'framer-motion';
import {
	Glasses,
	PersonStanding,
	Scissors,
	Shirt,
	Smile,
	UserRound
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useState } from 'react';
import type { CSSProperties } from 'react';
import type { OpenPeepCustomization, OpenPeepCustomizationColors, OpenPeepPostureMode } from '@classyc/shared';
import {
	openPeepAtomAssets,
	resolveOpenPeepCustomization
} from '@/assets/open-peeps-atoms';
import type { OpenPeepAtomAsset, OpenPeepAtomCategory } from '@/assets/open-peeps-atoms';
import type { CharacterCreatorCopy } from '@/features/i18n/ui-copy';
import { OpenPeepAtomPreview, OpenPeepComposer } from '@/features/character/OpenPeepComposer';
import { createReadablePreviewColor } from '@/features/character/open-peep-colors';

type CharacterCreatorCategory =
	| 'body'
	| 'head'
	| 'face'
	| 'facialHair'
	| 'accessories'
	| 'posture';

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
	posture: PersonStanding
};

const creatorCategories: readonly CharacterCreatorCategory[] = [
	'head',
	'face',
	'facialHair',
	'accessories',
	'body',
	'posture'
] as const;

const assetCategoryByCreatorCategory: Partial<Record<CharacterCreatorCategory, OpenPeepAtomCategory>> = {
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
	accessory: ['#111827', '#2563EB', '#0EA5E9', '#F59E0B', '#EF4444', '#A855F7', '#64748B', '#F8FAFC']
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
		<section className="character-creator" aria-label={copy.categories.head}>
			<div className="character-preview-panel">
				<div className="character-preview-stage">
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
					{activeCategory === 'posture' ? (
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
	category: OpenPeepAtomCategory;
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
	const activeColorKeys = getActiveColorKeys(activeCategory);

	return (
		<div className="character-color-dock">
			{activeColorKeys.map((colorKey) => (
				<div className="character-color-group" key={colorKey}>
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

function getActiveColorKeys(activeCategory: CharacterCreatorCategory): readonly CharacterColorKey[] {
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
		case 'posture':
			return ['outfit'];
	}
}

function getOptionPreviewStyle(category: OpenPeepAtomCategory, customization: OpenPeepCustomization): CSSProperties {
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
