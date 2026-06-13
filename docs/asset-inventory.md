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
Flat Assets/Flat Assets/Separate Atoms/accessories/ : 9 fichiers utiles
Flat Assets/Flat Assets/Separate Atoms/body/ : 30 fichiers utiles
Flat Assets/Flat Assets/Separate Atoms/face/ : 30 fichiers utiles
Flat Assets/Flat Assets/Separate Atoms/facial-hair/ : 17 fichiers utiles
Flat Assets/Flat Assets/Separate Atoms/head/ : 46 fichiers utiles
Flat Assets/Flat Assets/Separate Atoms/pose/sitting/
Flat Assets/Flat Assets/Separate Atoms/pose/standing/
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
