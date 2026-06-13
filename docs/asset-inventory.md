# Inventaire assets

## Open Peeps

Chemin racine observe :

```text
Flat Assets/Flat Assets/
```

Dossiers utiles :

```text
Flat Assets/Flat Assets/Templates/
Flat Assets/Flat Assets/Separate Atoms/
Flat Assets/Flat Assets/Separate Atoms/accessories/
Flat Assets/Flat Assets/Separate Atoms/body/
Flat Assets/Flat Assets/Separate Atoms/face/
Flat Assets/Flat Assets/Separate Atoms/facial-hair/
Flat Assets/Flat Assets/Separate Atoms/head/
Flat Assets/Flat Assets/Separate Atoms/pose/
```

Exemples observes :

```text
Flat Assets/Flat Assets/Templates/Bust/peep-1.svg
Flat Assets/Flat Assets/Templates/Bust/peep-1.png
Flat Assets/Flat Assets/Templates/Standing/peep-standing-1.svg
Flat Assets/Flat Assets/Templates/Sitting/peep-sitting-1.svg
Flat Assets/Flat Assets/Separate Atoms/pose/standing/
```

Regles :

- Utiliser les templates pour la premiere selection de personnage.
- Ajouter les atomes de personnalisation seulement apres une galerie stable.
- Ignorer `__MACOSX`.
- Ignorer les fichiers commencant par `._`.

Galerie actuelle Etape 4 :

```text
apps/web/src/assets/open-peeps.ts
Flat Assets/Flat Assets/Templates/Bust/peep-1.png
Flat Assets/Flat Assets/Templates/Bust/peep-8.png
Flat Assets/Flat Assets/Templates/Bust/peep-29.png
Flat Assets/Flat Assets/Templates/Bust/peep-45.png
Flat Assets/Flat Assets/Templates/Bust/peep-76.png
Flat Assets/Flat Assets/Templates/Bust/peep-103.png
```

Notes :

- Les identifiants sauvegardes dans le profil sont definis dans `packages/shared/src/index.ts`.
- Les chemins d'images restent centralises dans `apps/web/src/assets/open-peeps.ts`.
- Le dossier `covid-19` n'est pas utilise pour la galerie de base.

Atomes reperes pour l'Etape 5 :

```text
Flat Assets/Flat Assets/Separate Atoms/a person/ : 3 fichiers utiles
Flat Assets/Flat Assets/Separate Atoms/accessories/ : 9 fichiers utiles
Flat Assets/Flat Assets/Separate Atoms/body/ : 30 fichiers utiles
Flat Assets/Flat Assets/Separate Atoms/face/ : 30 fichiers utiles
Flat Assets/Flat Assets/Separate Atoms/facial-hair/ : 17 fichiers utiles
Flat Assets/Flat Assets/Separate Atoms/head/ : 46 fichiers utiles
Flat Assets/Flat Assets/Separate Atoms/pose/sitting/ : 11 fichiers utiles
Flat Assets/Flat Assets/Separate Atoms/pose/standing/ : 23 fichiers utiles
```

Exemples d'atomes :

```text
Flat Assets/Flat Assets/Separate Atoms/head/Afro.svg
Flat Assets/Flat Assets/Separate Atoms/head/Bangs.svg
Flat Assets/Flat Assets/Separate Atoms/head/Hijab.svg
Flat Assets/Flat Assets/Separate Atoms/accessories/Glasses.svg
Flat Assets/Flat Assets/Separate Atoms/accessories/Sunglasses.svg
```

Regles Etape 5 :

- creer un index d'atomes dedie avant de composer le personnage.
- verifier quels SVG acceptent une recolorisation propre avant d'exposer une couleur dans l'UI.
- viser un createur complet par categories, pas seulement une variante de couleur.

Preparation Etape 5 du 2026-06-13 :

- Total inspecte dans `Separate Atoms/` : 169 SVG utiles, hors `__MACOSX` et fichiers metadata.
- Categories principales : `body`, `head`, `face`, `facial-hair`, `accessories`, `pose/sitting`, `pose/standing`.
- Fichiers de reference dans `a person/` : `bust.svg`, `sitting.svg`, `standing.svg`.
- Dimensions observees :

```text
body : 818 x 733, viewBox 0 0 818 733
head : 473 x 567, viewBox 0 0 473 567
face : 289 x 293, viewBox 0 0 289 293
facial-hair : 280 x 230, viewBox 0 0 280 230
accessories : 392 x 138, viewBox 0 0 392 138
pose/sitting : 1534 x 1856, viewBox 0 0 1534 1856
pose/standing : 1645 x 2500, viewBox 0 0 1645 2500
```

- Fills observes : surtout `#FFFFFF`, `#000000`, `none`, avec quelques variantes `white`, `#231F20`, `#221E1F` et `#4F66AF`.
- Recolorisation recommandee : charger les SVG comme texte local, extraire le contenu utile, puis remplacer les fills connus par categorie avant composition.
- Offsets de composition buste observes dans `a person/bust.svg` :

```text
body : translate(147, 639)
head : translate(372, 180)
face : translate(531, 366)
facial-hair : translate(495, 518)
accessories : translate(419, 421)
```

- Offsets internes utiles pour sitting/standing :

```text
face : translate(159, 186)
facial-hair : translate(123, 338)
accessories : translate(47, 241)
```

- Options representatives a exposer d'abord :

```text
head : Afro, Bangs, Bantu Knots, Bun, Cornrows, Flat Top, Hijab, Long, Medium, Mohawk, No Hair, Short, Turban, Twists
face : Calm, Cute, Smile, Smile Big, Serious, Suspicious, Tired
facial-hair : _ None, Chin, Full, Goatee 1, Goatee 2, Moustache 1...
accessories : _ None, Glasses, Glasses 2-5, Sunglasses, Sunglasses 2, Eyepatch
body : Tee, Button Shirt, Hoodie, Dress, Blazer, Gaming, Coffee, Device...
```

- Pour l'implementation, preferer un index explicite et typable plutot qu'une recherche runtime dans les dossiers.
- L'UI peut etre complete sans afficher les 169 options a la fois : chaque categorie doit offrir plusieurs choix, un etat `aucun` quand disponible et des swatches de couleurs.

## OpenMoji

Chemins observes :

```text
Openmoji/openmoji.json
Openmoji/icons/
```

Structure utile du JSON :

```text
emoji
hexcode
group
subgroups
annotation
tags
openmoji_tags
order
```

Resolution d'image prevue :

```text
Openmoji/icons/{hexcode}.png
```

Usage prevu :

- niveaux
- exercices
- feedback de correction
- bonus XP
- navigation sociale
- emojis de messagerie

Index a creer plus tard :

- normaliser les recherches en minuscules
- chercher dans `annotation`, `tags`, `openmoji_tags`, `group`, `subgroups`, `hexcode`
- retourner un objet stable : `hexcode`, `label`, `tags`, `src`

## Fonts

Police locale ajoutée pour l'identité Classyc :

```text
apps/web/src/assets/fonts/Fredoka-VariableFont.ttf
apps/web/src/assets/fonts/Fredoka-OFL.txt
```

Usage actuel :

- logo `Classyc`
- marque visuelle dans l'onboarding et la sidebar

Source :

- Google Fonts / Fredoka, licence OFL
