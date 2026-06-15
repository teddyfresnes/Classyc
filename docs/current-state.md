# Etat actuel

Date : 2026-06-15

## Statut court

Etape courante : Etape 5 - Createur complet de personnage.

Etat : terminee.

Le projet contient une workspace npm avec une application web React/Vite dans `apps/web`, un package partagé dans `packages/shared`, un emplacement réservé pour le futur serveur dans `apps/api`, un shell UI moderne, un onboarding initial avec profil invité local et un créateur complet de personnage Open Peeps.

## Structure observee

```text
.
├── Flat Assets/
│   ├── Flat Assets/
│   │   ├── Flat Assets/
│   │   ├── Separate Atoms/
│   │   └── Templates/
│   └── __MACOSX/
├── Openmoji/
│   ├── icons/
│   └── openmoji.json
├── apps/
│   ├── api/
│   └── web/
├── packages/
│   └── shared/
├── AGENTS.md
├── docs/
├── package.json
└── tsconfig.base.json
```

## Assets confirmes

- Open Peeps : `Flat Assets/Flat Assets/`
- Templates de personnages : `Flat Assets/Flat Assets/Templates/`
- Atomes de personnalisation : `Flat Assets/Flat Assets/Separate Atoms/`
- OpenMoji JSON : `Openmoji/openmoji.json`
- OpenMoji PNG : `Openmoji/icons/`

Note : l'utilisateur avait mentionne `assets/Flat assets/` et `assets/openmoji/`, mais les dossiers presents sont directement a la racine et nommes `Flat Assets/` et `Openmoji/`.

## Ce qui existe

- Documentation de travail initiale.
- Roadmap progressive.
- Decisions techniques proposees pour la prochaine etape.
- Inventaire initial des assets.
- Workspace npm.
- Application web React + TypeScript + Vite.
- Tailwind CSS via plugin Vite.
- Thème clair/sombre via variables CSS.
- Navigation shell responsive desktop/mobile.
- Page principale `Apprendre` avec map de progression et quêtes journalières.
- Page `Stats` prévue pour erreurs récentes, historique et progression.
- Page `Classement` ajoutée comme placeholder de future leaderboard/ligues.
- Header principal réduit : plus de titre/breadcrumb de page ni description décorative.
- En haut à droite : drapeau de la langue apprise + XP, puis flamme custom orange à deux tons pour la série.
- Sidebar desktop : logo Classyc, navigation principale (`Apprendre`, `Stats`, `Classement`, `Amis`, `Messages`, `Paramètres`), profil en bas.
- Cloche de notifications intégrée dans la zone profil en bas de sidebar.
- Le mode clair/sombre est déplacé dans la page `Paramètres`.
- Page `Apprendre` allégée avec ruban de section, learn path sobre et quêtes journalières à droite.
- Learn path repris après feedback : SVG unique avec route courbe et pastilles dessinées dans le même repère, sans icônes de niveaux, sans faux socle bleu et sans bonus `1.5x` affiché tant que le système de niveaux n'existe pas.
- Le ruban de `Apprendre` n'affiche plus de bouton `Suivant` tant qu'il n'y a pas de vraie action de niveau.
- La map ne contient pas de formes décoratives provisoires.
- Alignement learn path : la route et les pastilles sont dans le même SVG ; ne pas séparer la road et les niveaux en layouts indépendants.
- Sur desktop, la colonne `Apprendre` et les quêtes journalières scrollent indépendamment.
- Palette clair/sombre réorientée vers un bleu sobre, sans effets fluo ni dégradés décoratifs.
- Shell desktop en hauteur écran fixe : la sidebar ne scrolle pas, le contenu central utilise `overflow-y: auto`.
- Polish UI shell : header sans trait inférieur dur, chips de progression sans bordures visibles, navigation sidebar sur la couleur accent sans glow, et quêtes journalières en colonne légère.
- Le bloc profil en bas de sidebar n'affiche pas d'état `active` partiel ; il reste neutre même sur `/profile`.
- Le logo, la progression du header et les actions principales ne sélectionnent pas de texte au glisser.
- Logo Classyc partagé entre onboarding et shell avec police locale Fredoka.
- Package partagé `@classyc/shared` avec premiers types de domaine.
- Onboarding initial : langue utilisateur, entrée `J'ai déjà un compte`, prénom, langue à apprendre.
- La langue utilisateur change immédiatement la langue de l'interface.
- La langue à apprendre identique à la langue utilisateur est désactivée.
- Le setup est en deux temps : choix des langues puis prénom, avec retour arrière.
- Le profil n'est plus dans la navigation principale ; il est accessible via le prénom en bas de sidebar.
- L'icône paramètres n'est plus un bouton isolé : `Paramètres` est une destination de navigation.
- Le bouton thème n'apparaît plus dans le header ni dans l'onboarding.
- Animations sobres via Framer Motion : transition de page, apparition progressive des cartes/niveaux/quêtes, micro-interactions sur les actions.
- Le setup garde une carte de taille stable entre le choix des langues et le prénom.
- L'étape prénom contient une zone haute dédiée `Comment tu t'appelles ?` avec un rappel minimal des langues par drapeaux.
- Polish setup après feedback : moins de texte répété sur les cartes de langue, typographie moins lourde, état disabled plus visible pour la langue déjà choisie, bouton compte transformé en action discrète, badge d'étape retiré de l'écran prénom.
- Les actions du setup restent uniformes entre les étapes : boutons en bas de carte, même style primaire/secondaire.
- Les cartes de langue du setup affichent uniquement le drapeau, le nom et l'état visuel ; pas de seconde ligne explicative.
- Profil invité local sauvegardé dans `localStorage` avec XP et série initiaux.
- Profil invité enrichi avec `characterId` pour mémoriser le personnage Open Peeps choisi.
- Shell branché sur le profil invité après completion de l'onboarding.
- Index statique Open Peeps centralisé dans `apps/web/src/assets/open-peeps.ts`.
- Index SVG Open Peeps centralisé dans `apps/web/src/assets/open-peeps-atoms.ts`.
- Modèle partagé `OpenPeepCustomization` pour sauvegarder corps/tenue, tête/cheveux, visage, pilosité, accessoires, posture et couleurs.
- L'onboarding contient une étape personnage après le prénom, avec un créateur complet plutôt qu'une simple galerie.
- Le créateur affiche un aperçu personnage, des onglets avec icônes, des grilles d'options, des pastilles contextuelles et des inputs couleur.
- Couleurs configurables : peau, cheveux, tenue et accessoire. Le trait/contour reste noir.
- `OpenPeepComposer` compose les SVG pour les postures debout/assis et le cadrage tete fallback ; les bustes colorisables passent par CSS-Peeps.
- `OpenPeepComposer` supporte aussi un cadrage `outfit` pour previsualiser les tenues de buste sans la tete dans les grilles.
- Les tenues restent limitees au mode buste : choisir une tenue met a jour `bodyId`, sans forcer ni recomposer les poses debout/assises.
- La colorisation des tenues de buste passe par CSS-Peeps, car les SVG `body` locaux sont trop aplatis pour separer proprement peau, vetement, objet et details noirs chemin par chemin.
- La recolorisation Open Peeps est contextuelle : chapeaux/foulards en neutres sombres, cheveux/barbe avec accent de contraste, visage avec ombre de peau, trait noir fixe.
- Le créateur est organisé dans l'ordre : cheveux, visage, barbe, accessoires, tenues, poses.
- Les pastilles de couleur rondes sont placées sous le personnage et changent selon la catégorie active.
- Le personnage personnalisé est sauvegardé dans le profil invité via `characterCustomization`.
- Les anciens profils sans personnalisation complète gardent le fallback PNG `characterId`.
- Le personnage choisi est rappelé dans la zone profil de la sidebar desktop.
- L'avatar de profil de la sidebar est cadré sur la tête pour rester lisible en petit format.
- Dossier `apps/api` réservé sans implémentation serveur.

## Ce qui n'existe pas encore

- Serveur/API.
- Systeme de niveaux.
- Exercices.
- XP, streak, amis, messagerie ou mini-jeux.
- Diagnostic complet.

## Verification du 2026-06-13

- `npm install` : OK apres remplacement de `workspace:*` par `file:../../packages/shared`.
- `npm run lint` : OK.
- `npm run typecheck` : OK.
- `npm run build` : OK.
- Serveur local : OK sur `http://127.0.0.1:5173/`.
- Verification HTTP : OK, status 200.
- Logs Vite frais après redémarrage serveur : OK, pas d'erreur.
- Lecture UTF-8 via Node : OK pour les accents français.
- Scan couleurs CSS : OK, palette claire/sombre centrée sur neutres et bleu.
- Verification navigateur integre : non disponible dans cette session, aucun navigateur liste par le plugin Browser.
- Correction UX shell/onboarding : `npm run lint`, `npm run typecheck`, `npm run build` OK.
- Serveur Vite après correction UX : status HTTP 200, `.vite-dev.err.log` vide.
- Police Fredoka locale intégrée au build Vite.
- Navigateur intégré retenté après correction UX : toujours indisponible (`agent.browsers.list()` retourne `[]`).
- Correction palette/overflow : `npm run lint`, `npm run typecheck`, `npm run build` OK.
- La série du header utilise un pictogramme SVG custom, pas un asset OpenMoji.
- Serveur Vite redémarré après correction palette : status HTTP 200, `.vite-dev.err.log` vide.
- Polish UI header/sidebar/quêtes : `npm run lint`, `npm run typecheck`, `npm run build` OK ; serveur local HTTP 200 ; navigateur intégré toujours indisponible (`[]`).
- Correction état profil/sidebar et bouton `Suivant` : `npm run lint`, `npm run typecheck`, `npm run build` OK ; serveur local HTTP 200 ; `.vite-dev.err.log` vide.
- Refonte learn path : `npm run lint`, `npm run typecheck`, `npm run build` OK ; serveur local HTTP 200 ; `.vite-dev.err.log` vide ; navigateur intégré indisponible (`agent.browsers.list()` retourne `[]`).
- Simplification learn path après rejet de la version trop chargée : `npm run lint`, `npm run typecheck`, `npm run build` OK ; serveur Vite redémarré proprement sur `http://127.0.0.1:5173/`, logs frais vides.
- Correction alignement learn path : retrait du placement par grille et de l'animation `y` Framer Motion qui pouvait casser le centrage des pastilles.
- Correction road/nodes par coordonnées partagées : `npm run lint`, `npm run typecheck`, `npm run build` OK ; serveur local HTTP 200 ; `.vite-dev.err.log` vide ; navigateur intégré toujours indisponible (`[]`).
- Reprise complète learn path sans SVG ni icônes de niveaux : `npm run lint`, `npm run typecheck`, `npm run build` OK.
- Reprise learn path en SVG unique sans icônes ni faux socle bleu : `npm run lint`, `npm run typecheck`, `npm run build` OK ; serveur local HTTP 200 ; `.vite-dev.err.log` vide.
- Correction preview learn path : niveau 2 non sélectionné, bonus `1.5x` retiré de la preview, sidebar active avec texte blanc.
- Nettoyage map/ruban/scroll : formes décoratives retirées, bouton `Suivant` retiré, scroll desktop séparé entre map et quêtes.
- Animations shell/setup : `npm run lint`, `npm run typecheck`, `npm run build` OK ; serveur local HTTP 200 ; `.vite-dev.err.log` vide ; navigateur intégré indisponible (`agent.browsers.list()` retourne `[]`) ; Playwright non installé localement.
- Polish setup langue/prénom : correction des répétitions de libellés, boutons et disabled state revus ; vérification à relancer après toute retouche visuelle.
- Uniformisation setup : les boutons de la première étape sont alignés et stylés comme ceux de l'étape prénom.
- Simplification setup : retrait des textes secondaires sous les langues ; le drapeau et le cadenas suffisent.
- Ajustement shell : scrollbar de `Apprendre` éloignée du contenu, icône `Stats` remplacée par une icône analytique, entrée `Classement` ajoutée avec trophée.
- Integration Open Peeps : `npm run lint`, `npm run typecheck`, `npm run build` OK.
- Build Vite : OK, les six PNG Open Peeps sont inclus dans `dist/assets`.
- Serveur local existant : OK sur `http://127.0.0.1:5173/`, status HTTP 200.
- Verification HTTP du module `apps/web/src/assets/open-peeps.ts` : OK, status HTTP 200.
- Verification HTTP d'un asset Open Peeps via Vite dev : OK, `peep-8.png` servi en `image/png`.
- Navigateur intégré : indisponible dans cette session, `agent.browsers.list()` retourne `[]`.
- Feedback préparation Etape 5 : la prochaine étape doit viser un créateur complet de personnage avec couleurs et catégories, pas une simple personnalisation minimale.
- Correction avatar profil : cadrage zoomé sur la tête dans la sidebar.
- Préparation créateur complet + correction avatar : `npm run lint`, `npm run typecheck`, `npm run build` OK.
- Serveur local après correction avatar : OK sur `http://127.0.0.1:5173/`, status HTTP 200.
- Navigateur intégré retenté après correction avatar : indisponible (`agent.browsers.list()` retourne `[]`).
- `nextstepprep` Etape 5 : inspection des SVG Open Peeps terminee et plan d'implementation documente.
- Preparation Etape 5 : 169 SVG utiles reperes dans `Separate Atoms/`, dimensions par categorie confirmees, offsets de composition du buste notes dans `asset-inventory.md`.
- Verification `nextstepprep` : `git diff --check` OK ; pas de lint/typecheck/build relances car aucun code applicatif n'a ete modifie.
- Etape 5 créateur complet : `npm run lint`, `npm run typecheck`, `npm run build` OK.
- Serveur local après Etape 5 : OK sur `http://127.0.0.1:5173/`, status HTTP 200.
- Build Vite Etape 5 : OK avec avertissement de bundle JS volumineux, attendu car les SVG bruts Open Peeps sont embarqués pour le créateur complet.
- Navigateur intégré retenté après Etape 5 : indisponible (`agent.browsers.list()` retourne `[]`).

## Verification du 2026-06-14

- Correction feedback couleurs Open Peeps : chapeaux/foulards neutralisés en gris/noir, cheveux et pilosité mieux recolorisés, accent de contraste ajouté, ombre de peau utilisée sur le visage.
- Correction interface createur : categorie `Tête` renommee `Cheveux`, ordre `Cheveux`, `Visage`, `Barbe`, `Accessoires`, `Tenues`, `Poses`.
- Section `Couleurs` retiree : les pastilles rondes sont maintenant sous le personnage et changent selon la categorie active.
- Le trait/contour n'est plus configurable et reste noir.
- Aperçu visage/accessoires : fonds de preview adaptes pour garder du contraste en theme sombre.
- `npm run lint` : OK.
- `npm run typecheck` : OK.
- `npm run build` : OK avec l'avertissement Vite connu sur le bundle JS volumineux.
- `git diff --check` : OK.
- Serveur local : OK sur `http://127.0.0.1:5173/`, status HTTP 200.
- Navigateur integre retente : indisponible (`agent.browsers.list()` retourne `[]`).
- Correction feedback tenues/poses : retrait du rendu de tenue force sur les poses debout/assises, juge trop moche.
- Decision appliquee : les assets `pose/standing` et `pose/sitting` restent rendus comme des poses completes ; les tenues `body` ne sont gerees proprement que sur le buste et les previews `Tenues`.
- Recherche web feedback tenues : Open Peeps documente les assets noir/blanc comme base personnalisable, et les implementations DiceBear/CSS-Peeps montrent une separation couleur `skin` / `clothes` / `object`.
- Limite constatee : les SVG `body` locaux sont aplatis avec des chemins noir/blanc qui melangent parfois peau, vetement et objets. La tentative `open-peep-body-recolor.ts` cassait trop facilement les contours, bras, mains et details.
- Correction appliquee : suppression de `open-peep-body-recolor.ts` et ajout de `css-peeps`, avec `apps/web/src/features/character/open-peep-css-peeps.ts` comme mapping explicite des 30 bodies vers les tokens Open Peeps colorisables.
- Les bustes et previews `Tenues` utilisent maintenant les variables CSS-Peeps `--peep-skin-color`, `--peep-clothes-color` et `--peep-object-color`; les details/contours restent noirs via les masques de detail d'origine.
- Les poses debout/assises ne recoivent toujours pas les tenues `body`, car leurs assets complets ne fournissent pas de calque vetement separable.
- Verification visuelle via planche Edge headless avec trois variantes : peau claire + tenue bleue, peau foncee + tenue rouge, peau moyenne + tenue verte.
- Verification layout via Edge headless : ecran personnage desktop et mobile atteints dans le vrai onboarding, 31 rendus CSS-Peeps detectes (personnage principal + 30 options de tenue).
- Correction feedback tenues secondaires : les bodies dont la masse de vetement etait portee par la couche noire CSS-Peeps recolorent maintenant cette couche existante avec la couleur principale, en conservant un trait noir par stroke sur le meme path.
- Les tenues a deux zones personnalisables exposent une couleur `outfitSecondary` uniquement quand le body selectionne le permet, par exemple `Blazer Black Tee` avec blazer principal et tee secondaire.
- L'override CSS-Peeps retire les masques blancs de la pile `::after` seulement quand un detail de body est recolore, afin que les couleurs secondaires claires restent visibles sans ajouter de formes.
- Verification feedback tenues secondaires : `npm run lint`, `npm run typecheck`, `npm run build` et `git diff --check` OK. Edge headless desktop/mobile confirme `Blazer Black Tee` avec deux controles `Tenue`/`Secondaire` et `Turtleneck` avec un seul controle `Tenue`.
- Verification finale correction tenues CSS-Peeps : `git diff --check`, `npm run lint`, `npm run typecheck`, `npm run build` OK. Build avec avertissement Vite connu sur le bundle volumineux, accentue par les SVG bruts et le CSS-Peeps.
- Serveur local apres correction tenues CSS-Peeps : OK sur `http://127.0.0.1:5173/`, status HTTP 200.
- Navigateur integre retente apres correction tenues CSS-Peeps : indisponible (`agent.browsers.list()` retourne `[]`).
- Correction feedback contours bodies Open Peeps : les details CSS-Peeps recolores gardent un stroke noir plus lisible et arrondi, afin que les contours de bodies comme `Blazer Black Tee`, `Dress`, `Sweater`, etc. ne prennent plus la couleur principale ou secondaire.
- Correction `Sweater` : la masse principale utilise `outfit` et les taches utilisent `outfitSecondary`.
- Recherche web feedback contours : la page officielle Open Peeps confirme que les couleurs noir/blanc sont personnalisables ; CSS-Peeps reste utilise pour les roles de couleur, avec conservation explicite du trait noir.
- Verification correction contours : `npm run lint`, `npm run typecheck`, `npm run build` et `git diff --check` OK. Planche Edge headless locale verifiee avec tenue bleue + secondaire rose.
- Serveur local apres correction contours : deja actif et OK sur `http://127.0.0.1:5173/`, status HTTP 200.
- Navigateur integre retente apres correction contours : indisponible car le plugin Browser ne fournit pas `scripts/browser-client.mjs` dans cette session ; verification visuelle faite via Edge headless.

## Verification du 2026-06-15

- Correction feedback contours tenues au cas par cas : `Blazer Black Tee` et `Polka Dot Jacket` gardent un stroke noir specifique pour conserver les lignes autour des zones secondaires, puis ce stroke a ete reduit apres feedback car il etait trop epais.
- Les bodies signales avec contours partiellement recolores (`Dress`, `Gym Shirt`, `Killer`, `Polo and Sweater`, `Tee 2`, `Tee Arms Crossed`, `Turtleneck`, `Whatever`, `Fur Jacket`, `Shirt and Coat`, `Sporty Tee`, `Striped Pocket Tee`, `Tee Selena`, `Thunder T-Shirt`) ont des largeurs de stroke ajustees individuellement puis affinies.
- `Sweater` garde le stroke le plus leger pour conserver les taches secondaires lisibles.
- `Macbook` ajoute une petite couche de peau dans `--peep-body-paint` sous l'objet, afin que le bras visible ne prenne plus la couleur de tenue.
- `Paper` garde le mapping existant mais utilise un stroke ajuste pour mieux connecter poignets, manches et mains sans lignes trop epaisses.
- Aucun asset source Open Peeps n'a ete modifie.
- `npm run lint` : OK.
- `npm run typecheck` : OK.
- `npm run build` : OK avec l'avertissement Vite connu sur le bundle volumineux.
- `git diff --check` : OK.
- Serveur local : OK sur `http://127.0.0.1:5173/`, status HTTP 200.
- Verification visuelle via Playwright Chromium temporaire sur le vrai parcours onboarding/createur, avec tenue primaire bleue et secondaire rose.

## Reprise

Si l'utilisateur tape `nextstepproject`, realiser uniquement l'Etape 6 de [docs/next-steps.md](next-steps.md) : integration OpenMoji et recherche d'icones.
