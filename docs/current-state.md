# Etat actuel

Date : 2026-06-22

## Statut court

Etape courante : Etape 10 - Premiers exercices francais.

Etat : terminee.

Depuis l'Etape 10, le projet contient un premier lot d'exercices francais jouables via une route directe, sans branchement a la map, aux quetes, aux XP reels ou au streak.

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
- Le créateur affiche un aperçu personnage, des onglets avec icônes, des grilles d'options et des pastilles contextuelles.
- Couleurs configurables : peau, cheveux, tenue et accessoire. Le trait/contour reste noir.
- `OpenPeepComposer` compose les SVG pour les postures debout/assis et le cadrage tete fallback ; les bustes colorisables passent par CSS-Peeps.
- `OpenPeepComposer` supporte aussi un cadrage `outfit` pour previsualiser les tenues de buste sans la tete dans les grilles.
- Les tenues restent limitees au mode buste : choisir une tenue met a jour `bodyId`, sans forcer ni recomposer les poses debout/assises.
- La colorisation des tenues de buste passe par CSS-Peeps, car les SVG `body` locaux sont trop aplatis pour separer proprement peau, vetement, objet et details noirs chemin par chemin.
- La recolorisation Open Peeps est contextuelle : chapeaux/foulards en neutres sombres, cheveux/barbe avec accent de contraste, visage avec ombre de peau, trait noir fixe.
- Le createur est organise dans l'ordre : cheveux, visage, barbe, accessoires, tenues, fond.
- Correction feedback setup personnage : la popup garde la taille des etapes langues/prenom sur desktop, avec le buste a gauche et le panneau de categories/options a droite en scroll interne.
- Les poses sont retirees de l'interface du createur pendant le setup ; la personnalisation reste forcee en mode `bust` pour garder les tenues coherentes avec le buste.
- Les pastilles de couleur rondes sont placees sous le personnage, changent selon la categorie active, n'affichent plus de labels visibles ni d'input couleur custom, et restent en ligne horizontale scrollable.
- Correction feedback cheveux 2026-06-20 : le rendu CSS-Peeps du personnage recolorise aussi le calque `--peep-head-detail` pour les coiffures normales, afin que la couleur cheveux appliquee dans les previews soit identique sur le personnage selectionne.
- Les pastilles de couleur utilisent maintenant un rail horizontal sans scrollbar native, pilote par deux boutons fleches gauche/droite.
- L'apercu personnage est agrandi dans sa zone desktop/mobile.
- Le createur s'ouvre par defaut sur la categorie `Cheveux`.
- La categorie `Fond` est ajoutee apres `Tenues`, avec motifs simples (`Simple`, `Pois`, `Vagues`, `Bulles`, `Confetti`, `Diagonal`) et palette de couleurs plus distincte pour limiter les mauvais contrastes avec le personnage.
- Le fond choisi est sauvegarde dans `OpenPeepCustomization`, reste retrocompatible avec les anciens profils et est reutilise sur le petit avatar de sidebar.
- L'etape personnage de l'onboarding s'agrandit lateralement rapidement avant d'afficher le contenu ; au clic sur `Commencer`, la carte revient a la taille standard, affiche une animation de validation, puis ouvre le shell.
- Correction feedback cheveux applique 2026-06-20 : l'apercu principal du buste utilise un rendu hybride, avec le corps/tenue en CSS-Peeps et la tete en SVG Open Peeps original, afin que la coupe appliquee corresponde aux previews sans formes noires parasites autour du crane.
- Le calque `--peep-head-detail` CSS-Peeps est neutralise sur le rendu principal ; CSS-Peeps reste utilise pour les tenues colorisables et les previews de tenues.
- La zone personnage a ete encore agrandie en desktop/mobile.
- Le personnage personnalisé est sauvegardé dans le profil invité via `characterCustomization`.
- Les anciens profils sans personnalisation complète gardent le fallback PNG `characterId`.
- Le personnage choisi est rappelé dans la zone profil de la sidebar desktop.
- L'avatar de profil de la sidebar est cadré sur la tête pour rester lisible en petit format.
- Index OpenMoji centralise dans `apps/web/src/assets/openmoji.ts`.
- Recherche OpenMoji via `searchOpenMoji(query, { limit })`, normalisee sur `annotation`, `tags`, `openmoji_tags`, `group`, `subgroups` et `hexcode`.
- Helper `resolveOpenMojiIconSrc(hexcode)` pour resoudre les PNG `Openmoji/icons/{hexcode}.png`.
- Resultat OpenMoji stable expose : `hexcode`, `label`, `tags`, `src`.
- Exemples OpenMoji exportes pour niveaux, exercices et UI via `openMojiUseCaseExamples`, sans implementation des niveaux.
- Modele partage `CampaignLevel` avec etats `locked`, `available`, `completed`, reward `xpMultiplier` et champ optionnel `openMojiHexcode`.
- Source campagne dediee dans `apps/web/src/features/learning/campaign-levels.ts`.
- La map `Apprendre` utilise les niveaux campagne typees, garde le SVG unique route + pastilles et affiche un bonus `1.5x` uniquement depuis la propriete `reward` du niveau 1.
- Les etats visibles actuels de la campagne sont : niveau 1 `completed`, niveaux 2 a 7 `locked`. Le niveau suivant ne reçoit pas de style distinct tant qu'il n'est pas réellement accessible.
- Modele partage `DailyLevel` avec difficulty tiers `warmup`, `standard`, `challenge`, progression mockee et reward optionnel.
- Source journaliere dediee dans `apps/web/src/features/learning/daily-levels.ts`.
- Les quetes journalieres de `Apprendre` sont derivees de niveaux journaliers typees, avec rotation locale par date et premier niveau du jour en bonus `1.5x`.
- Les cartes de quetes restent informatives : pas de clic, pas de hover interactif, et le bonus visible vient uniquement de la propriete `reward`.
- Modele partage d'exercice : `LearningExercise`, `ExerciseAnswer`, `ExerciseEvaluation`, types `multipleChoice`, `fillBlank`, `trueFalse`, `readingComprehension`.
- Moteur de correction mocke dans `apps/web/src/features/exercises/exercise-engine.ts`, avec score, feedback et XP potentielle calculee sans modifier la progression reelle.
- Source mockee `apps/web/src/features/exercises/mock-exercises.ts` couvrant les quatre types d'exercice, sans contenu pedagogique final.
- Composant UI responsive `ExercisePreview` dans `apps/web/src/features/exercises/ExercisePreview.tsx`, exporte mais non branche au parcours principal.
- Premier contenu francais dans `apps/web/src/features/exercises/french-exercises.ts` : `et` / `est`, `savoir` / `connaitre`, conjugaison simple de `etre`, lecture courte + oui/non.
- Deck jouable `FrenchExerciseDeck` avec score et XP potentielle, sans modifier la progression reelle.
- Route directe `/exercises/fr` pour verifier les exercices francais ; elle n'est pas ajoutee a la navigation principale, ni branchee a la map ou aux quetes.
- Dossier `apps/api` réservé sans implémentation serveur.

## Ce qui n'existe pas encore

- Serveur/API.
- Exercices branches aux niveaux.
- Contenu pedagogique complet anglais/chinois.
- Parcours complet de lancement des exercices.
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

## Verification du 2026-06-20

- Correction feedback popup setup personnage : carte desktop ramenee a la taille standard du setup, buste compact a gauche, onglets categories fixes en haut du panneau de droite, options en scroll interne.
- Retrait de l'onglet `Poses` dans `CharacterCreator` et sauvegarde forcee en `postureMode: 'bust'` pendant le setup.
- Retrait des labels visibles de couleur et de l'input couleur custom ; les pastilles sont en overflow horizontal.
- Verification headless Chrome sur le vrai parcours onboarding/createur : desktop et mobile atteints, 5 categories (`Cheveux`, `Visage`, `Barbe`, `Accessoires`, `Tenues`), aucune categorie `Poses`, aucun input couleur custom, aucun label couleur visible, scroll vertical des options OK.
- Navigateur integre Browser retente : indisponible dans cette session (`Browser is not available: iab`) ; verification visuelle faite via Chrome headless local.
- `npm run lint` : OK.
- `npm run typecheck` : OK.
- `npm run build` : OK avec l'avertissement Vite connu sur le bundle volumineux.
- `git diff --check` : OK avec avertissements CRLF connus sur les fichiers modifies.
- Correction feedback cheveux/fleches/taille personnage : `npm run lint`, `npm run typecheck`, `npm run build` et `git diff --check` OK.
- Verification Chrome headless sur le vrai parcours onboarding/createur : coiffure `Long` + cheveux `#7C3AED` appliquee au rendu principal via `--peep-head-detail`, rail couleurs en une ligne avec fleches, preview agrandie desktop/mobile.
- Test rapide des coiffures normales : la couleur cheveux s'applique au rendu principal ; les entrees chapeau restent volontairement exclues de cette recolorisation.
- Correction feedback rendu cheveux applique : `npm run lint`, `npm run typecheck`, `npm run build` et `git diff --check` OK.
- Verification Chrome headless desktop/mobile : rendu hybride actif, corps CSS-Peeps + tete SVG Open Peeps, coiffure `Long` violette identique a la preview, aucun fill noir restant dans les cheveux appliques, preview plus grande et contenue dans sa zone.
- Test rapide de 41 coiffures normales : aucune ne laisse de remplissage noir parasite dans la tete SVG appliquee.

## Verification du 2026-06-21

- Correction feedback alignement buste : la tete SVG du rendu hybride est descendue sur le corps CSS-Peeps pour retrouver un raccord tete/cou/buste naturel.
- Correction feedback placement apercu : le personnage principal est legerement remonte dans la zone preview afin que les pastilles de couleur ne chevauchent plus le bas du buste.
- Aucun asset source Open Peeps n'a ete modifie ; le correctif ajuste seulement l'offset de composition dans `OpenPeepComposer`.
- Verification Edge headless : comparaison ciblee entre rendu hybride et rendu CSS-Peeps complet sur `Tee 1` + `Short 1`, puis sur `Whatever` + `Long` ; verification layout mobile du createur avec rail de couleurs sous le buste.
- `npm run lint` : OK.
- `npm run typecheck` : OK.
- `npm run build` : OK avec l'avertissement Vite connu sur le bundle volumineux.
- `git diff --check` : OK, avec avertissements CRLF/LF attendus sur les fichiers modifies.
- Retouche feedback 2026-06-22 : personnage descendu legerement, animation d'ouverture personnage acceleree, anciens fonds `Grille`/`Rayons`/`Carreaux` remplaces, couleurs de fonds plus distinctes, retour vers le prenom stabilise sans pic de hauteur.

## Verification du 2026-06-22

- Correction feedback popup personnage : la categorie selectionnee par defaut est maintenant `Cheveux`, plus `Tenues`.
- Ajout de la categorie `Fond` apres `Tenues`, avec motifs, palette de couleurs douce, sauvegarde dans `OpenPeepCustomization` et fallback retrocompatible pour les anciens profils.
- Le fond du personnage reste porte par les panneaux d'apercu, pas par les SVG Open Peeps ; aucun asset source n'a ete modifie.
- Ajout d'une animation d'entree de l'etape personnage : carte de setup elargie sur desktop, contenu affiche apres expansion, colonne apercu gardee a largeur stable et colonne editor agrandie.
- Ajout de l'animation de validation au clic sur `Commencer` : retour a la largeur standard, check anime, puis ouverture du shell apres environ 2 s.
- Correction d'un bug de clics rapides : choisir un motif puis une couleur de fond dans le meme tick ne perd plus le motif selectionne.
- Verification Chrome headless via DevTools Protocol sur le vrai onboarding : desktop ouvert sur `Cheveux`, 6 categories dans l'ordre attendu, `Fond` avec 6 options, motif `Pois` + couleur `#FFF3D8` sauvegardes, check visible pendant la phase `confirming`, puis shell affiche avec profil local.
- Verification mobile Chrome headless : createur atteint, categorie par defaut `Cheveux`, 6 categories visibles, layout en une colonne sans chevauchement detecte.
- Navigateur integre Browser retente avant fallback : indisponible dans cette session a cause d'une erreur de runtime du plugin ; verification visuelle faite via Chrome headless local.
- `npm run lint` : OK.
- `npm run typecheck` : OK.
- `npm run build` : OK avec l'avertissement Vite connu sur le bundle volumineux.
- `git diff --check` : OK, avec avertissements CRLF/LF attendus sur les fichiers modifies.
- Etape 6 OpenMoji : inspection de `Openmoji/openmoji.json` et `Openmoji/icons/` terminee, 4495 entrees JSON et 4495 PNG confirmes.
- Ajout de `apps/web/src/assets/openmoji.ts` avec index centralise, recherche normalisee, resolution PNG par hexcode et exemples d'utilisation pour niveaux/exercices/UI.
- Verification ciblee via serveur Vite SSR : `openMojiIcons.length === 4495`, recherches `fire`, `target`, `bell` et `1f600` OK, sources PNG resolues.
- Verification Etape 6 : `npm run lint`, `npm run typecheck`, `npm run build` et `git diff --check` OK. Build avec l'avertissement Vite connu sur le bundle volumineux.
- Etape 7 niveaux campagne : ajout de `CampaignLevel` dans `packages/shared/src/index.ts`, source dediee `apps/web/src/features/learning/campaign-levels.ts`, remplacement des donnees preview de map par 7 niveaux typees.
- Le niveau 1 porte le reward `xpMultiplier` `1.5`, affiche le badge `1.5x` et expose le libelle accessible `1.5x d'XP gagne en plus`.
- La map conserve un SVG unique pour route + pastilles ; niveau 1 `completed`, niveaux 2 a 7 `locked`, sans mise en avant du prochain niveau tant qu'aucune action réelle n'existe.
- Preparation OpenMoji : les niveaux portent des `openMojiHexcode` optionnels, sans afficher d'icones sur la map pour eviter la surcharge.
- Verification Etape 7 : `npm run lint`, `npm run typecheck`, `npm run build` et `git diff --check` OK. Build avec l'avertissement Vite connu sur le bundle volumineux.
- Verification Chrome headless via DevTools Protocol : desktop 1365x900 et mobile 390x844 OK, 7 noeuds detectes, badge `1.5x`, niveau 1 `completed`, niveaux 2 a 7 `locked`, captures visuelles sans chevauchement.
- Correction feedback Etape 7 : le niveau 2 est grise comme les niveaux verrouilles et les pastilles n'utilisent plus de curseur cliquable par defaut. Le type `available` reste disponible dans le modele pour une future action reelle.
- Navigateur integre Browser retente : indisponible dans cette session a cause d'une erreur de runtime du plugin ; verification visuelle faite via Chrome headless local.
- Etape 8 niveaux journaliers : ajout de `DailyLevel`, `DailyLevelDifficultyTier` et `DailyLevelReward` dans `packages/shared/src/index.ts`.
- Ajout de `apps/web/src/features/learning/daily-levels.ts` avec templates journaliers, rotation locale par date, deux cartes par jour et premier niveau avec reward `xpMultiplier` `1.5`.
- Les quetes journalieres ne viennent plus de placeholders libres dans `shell-content.ts`; elles sont derivees de `createDailyQuests`.
- Correction UX appliquee aux quetes : les cartes n'ont pas de hover jouable, le badge `1.5x` vient du reward et aucun exercice n'est lance.
- Verification Etape 8 : `npm run lint`, `npm run typecheck`, `npm run build` et `git diff --check` OK. Build avec l'avertissement Vite connu sur le bundle volumineux.
- Verification Chrome headless via DevTools Protocol : desktop 1365x900 et mobile 390x844 OK, deux quetes journalieres detectees, un seul badge `1.5x`, curseur neutre, aucun niveau campagne `available`.
- Etape 9 moteur d'exercices : ajout des types partages `LearningExercise`, `ExerciseAnswer` et `ExerciseEvaluation`, avec les variantes `multipleChoice`, `fillBlank`, `trueFalse` et `readingComprehension`.
- Ajout de `apps/web/src/features/exercises/exercise-engine.ts` pour la correction mockee, le score, le feedback et les XP potentielles, sans effet sur la progression reelle.
- Ajout de `apps/web/src/features/exercises/mock-exercises.ts` avec une source mockee couvrant les quatre types d'exercices, sans contenu pedagogique final.
- Ajout de `ExercisePreview`, composant UI responsive exporte depuis `apps/web/src/features/exercises/index.ts`, mais non branche a la map, aux quetes ou au shell.
- Verification runtime ciblee du moteur : les reponses mockees correctes donnent les scores attendus, dont lecture `2/2`.
- Verification Etape 9 : `npm run lint`, `npm run typecheck`, `npm run build` et `git diff --check` OK. Build avec l'avertissement Vite connu sur le bundle volumineux.
- Etape 10 premiers exercices francais : ajout de `french-exercises.ts` avec 5 exercices couvrant `et` / `est`, `savoir` / `connaitre`, conjugaison simple de `etre`, lecture courte + oui/non.
- Ajout de `FrenchExerciseDeck` avec validation locale, score et XP potentielle, sans ecriture dans le profil invite ni progression reelle.
- Route directe `/exercises/fr` ajoutee pour verifier les exercices, sans entree de navigation principale et sans branchement aux niveaux campagne/journaliers.
- Verification runtime ciblee du contenu francais : les reponses attendues corrigent les 5 exercices, dont lecture `2/2`.
- Verification Chrome headless via DevTools Protocol : desktop 1365x900 et mobile 390x844 OK, route `/exercises/fr`, deck `1/5`, validation du premier exercice correcte, aucun overflow horizontal.
- Verification Etape 10 : `npm run lint`, `npm run typecheck`, `npm run build` et `git diff --check` OK. Build avec l'avertissement Vite connu sur le bundle volumineux.

## Reprise

Si l'utilisateur tape `nextstepproject`, realiser uniquement l'Etape 11 de [docs/next-steps.md](next-steps.md) : premiers exercices anglais.
