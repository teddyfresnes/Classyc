# Decisions techniques

Ce fichier garde les decisions stables et les propositions retenues pour avancer. Une decision peut etre revisee si le feedback utilisateur ou une contrainte technique le justifie.

## D001 - Structure generale

Statut : retenue et implementee pour l'Etape 1.

Utiliser une structure de type workspace :

```text
apps/
	web/
	api/
packages/
	shared/
```

Raison : separer rapidement l'interface, le futur serveur et les types/modeles partages sans compliquer l'Etape 1.

## D002 - Frontend

Statut : retenue et implementee pour l'Etape 1.

Base recommandee :

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- lucide-react pour les icones d'interface
- Framer Motion pour les animations utiles

Raison : stack moderne, rapide a iterer, bien adaptee a une experience interactive et modulaire.

Versions installees au 2026-06-13 :

- React 19
- Vite 8
- Tailwind CSS 4
- React Router 7

## D003 - Style et theming

Statut : retenue et implementee en base pour l'Etape 1.

- Themes clair/sombre via variables CSS.
- Tokens de couleur, spacing, radius et shadow centralises.
- Interface dense mais respirante, sans surcharge visuelle.
- Eviter une palette dominee par une seule couleur.
- Les cartes doivent rester sobres, avec un radius maximum raisonnable.

Implementation actuelle :

- variables CSS dans `apps/web/src/styles/main.css`
- `ThemeProvider` dans `apps/web/src/app/theme-provider.tsx`
- bouton de bascule dans `apps/web/src/components/ui/theme-toggle.tsx`

## D004 - Etat local et invite

Statut : a implementer plus tard.

Le mode invite doit fonctionner sans compte. La progression invite sera sauvegardee localement, puis migrable vers compte connecte quand le serveur arrivera.

Approche prevue :

- modele de domaine partage dans `packages/shared`
- stockage local pour profil invite, langue, personnage, progression et XP
- migration serveur ajoutee a l'Etape 14

## D005 - Contenu pedagogique

Statut : a implementer plus tard.

Le contenu doit etre separe du rendu UI :

- definitions de niveaux
- definitions d'exercices
- moteur de correction
- rendu par type d'exercice

Raison : permettre francais, anglais et chinois sans dupliquer toute la logique.

## D006 - Chinois et pinyin

Statut : implementee en base a l'Etape 12.

Les caracteres chinois doivent pouvoir porter une prononciation et des metadata au niveau caractere ou segment.

Approche prevue :

- champ `pinyin`
- champ `meaning`
- support hover desktop
- support tap long mobile

Implementation initiale :

- `ExercisePronunciationHint` porte le pinyin et le sens optionnel dans le modele partage.
- Les exercices chinois utilisent ces hints au niveau exercice, question ou option.
- `ExercisePreview` affiche les hints et les expose aussi via le titre/label accessible des options.

## D007 - OpenMoji

Statut : implementee a l'Etape 6.

Module d'indexation centralise dans `apps/web/src/assets/openmoji.ts`. Il lit `Openmoji/openmoji.json` et expose une recherche simple par :

- `annotation`
- `tags`
- `openmoji_tags`
- `group`
- `subgroups`
- `hexcode`

La resolution d'image passe par `resolveOpenMojiIconSrc(hexcode)` et pointe vers `Openmoji/icons/{hexcode}.png`.

API exposee :

- `searchOpenMoji(query, { limit })`
- `getOpenMojiByHexcode(hexcode)`
- `resolveOpenMojiIconSrc(hexcode)`
- `openMojiUseCaseExamples` pour niveaux, exercices et UI
- type stable `OpenMojiSearchResult` : `hexcode`, `label`, `tags`, `src`

## D008 - Open Peeps

Statut : implementee en base pour l'Etape 4, a etendre a l'Etape 5.

Utiliser les templates Open Peeps existants pour une premiere selection de personnage. Les atomes de personnalisation doivent ensuite servir a construire un createur complet de personnage.

Ne pas importer les dossiers `__MACOSX`.

Implementation actuelle :

- identifiants de personnages dans `packages/shared/src/index.ts`
- galerie de base dans `apps/web/src/assets/open-peeps.ts`
- six templates `Bust` utilises depuis `Flat Assets/Flat Assets/Templates/Bust/`
- selection sauvegardee dans le profil invite via `characterId`
- rappel du personnage dans la zone profil de la sidebar desktop, cadre sur la tete en petit format

## D009 - Serveur

Statut : a implementer a l'Etape 14.

Prevoir un serveur separe dans `apps/api` ou equivalent, avec types partages. Le choix exact de framework serveur peut etre confirme au moment de l'Etape 14 selon l'etat du frontend.

## D010 - Messagerie et mini-jeux

Statut : architecture a preparer plus tard.

La messagerie doit etre pensee comme une feature sociale extensible. Les mini-jeux doivent passer par un registre de jeux pour pouvoir ajouter `Draw Battle` sans coupler le jeu a toute la messagerie.

## D011 - Lien local du package partage

Statut : retenue pour compatibilite locale.

Le package web depend de `@classyc/shared` via `file:../../packages/shared` au lieu de `workspace:*`.

Raison : `npm install` a refuse le protocole `workspace:*` dans cet environnement avec `EUNSUPPORTEDPROTOCOL`. Le lien `file:` conserve une dependance locale simple tout en laissant la workspace npm gerer les scripts.

## D012 - Shell UI par sections legeres

Statut : retenue et implementee pour l'Etape 2.

Le shell utilise React Router pour afficher des sections legeres :

- `/` : page `Apprendre`.
- `/stats` : statistiques, erreurs recentes et historique.
- `/friends` : espace amis.
- `/messages` : espace messagerie.
- `/settings` : paramètres et thème.
- `/profile` : espace profil.

Le contenu statique de preparation est centralise dans `apps/web/src/features/shell/shell-content.ts`.

Raison : donner une navigation coherente et tester la structure UX sans implementer les vraies fonctionnalites sociales, serveur ou pedagogiques trop tot.

## D013 - Palette UI de l'Etape 2

Statut : retenue et implementee.

La palette clair/sombre utilise des neutres, du vert, du bleu et de l'ambre pour eviter une interface dominee par une seule famille de couleur. Les surfaces restent sobres et les rayons sont limites a 8px.

## D014 - Profil invite local

Statut : retenue et implementee pour l'Etape 3.

Le profil invite est defini dans `packages/shared/src/index.ts` avec :

- prenom
- langue utilisateur
- langue a apprendre
- personnage Open Peeps choisi
- XP/niveau/serie initiaux
- dates de creation et de completion onboarding

La persistence est geree dans `apps/web/src/features/onboarding/guest-profile-storage.ts` via `localStorage` sous la cle `classyc-guest-profile`.

Raison : permettre un mode invite immediat, puis preparer la migration vers compte connecte lors de l'etape serveur.

## D015 - Onboarding avant shell

Statut : retenue et implementee pour l'Etape 3.

`App.tsx` charge le profil invite local. Si aucun profil valide n'existe, l'application affiche `OnboardingFlow`. Apres completion, le shell recoit le profil et affiche les informations de base.

Raison : garder l'arrivee utilisateur simple et eviter que le shell principal gere directement les etapes de saisie.

## D016 - Textes localisés et accents réels

Statut : retenue et implémentée après feedback utilisateur sur l'Étape 3.

Les textes UI sont centralisés dans `apps/web/src/features/i18n/ui-copy.ts` pour les interfaces française, anglaise et chinoise. Le choix `Je parle` dans l'onboarding modifie immédiatement la langue de l'interface.

Règles retenues :

- utiliser les vrais caractères français dans l'UI : `ç`, `é`, `à`, `è`, etc.
- éviter les descriptions décoratives ou pédagogiques inutiles dans le setup
- afficher les langues avec un drapeau
- désactiver la langue cible identique à la langue utilisateur

## D017 - Navigation Apprendre / Stats / Classement

Statut : retenue après feedback utilisateur sur l'Étape 3.

La navigation principale utilise désormais :

- `Apprendre` pour la page principale
- `Stats` pour l'ancien espace `Parcours`
- `Classement` pour le futur leaderboard/ligues avec icône trophée dédiée

La progression utile est déplacée dans la sidebar avec XP et série. La page `Apprendre` prépare une map de niveaux et un panneau de quêtes journalières.

`Stats` doit rester orienté erreurs, historique et analyse de progression ; son icône doit donc rester analytique plutôt que trophée.

## D018 - Setup en trois temps

Statut : retenue après feedback utilisateur sur l'Étape 3 et implementee a l'Etape 4.

Le setup doit rester très ergonomique :

- écran 1 : langue parlée puis langue à apprendre
- bouton `Continuer`
- écran 2 : prénom
- écran 3 : personnage Open Peeps
- retour arrière possible
- la personnalisation complete du personnage sera ajoutée ensuite avec une interface dediee

Raison : le prénom ne doit pas apparaître avant que l'utilisateur ait compris le choix principal de langue.

## D019 - Profil hors navigation

Statut : retenue après feedback utilisateur sur l'Étape 3.

`Profil` est retiré de la navigation principale. La route `/profile` reste disponible, mais l'accès se fait par clic sur le prénom en bas de sidebar. L'icône paramètres est également déplacée en bas de sidebar.

## D020 - Shell UX réduit après feedback

Statut : retenue après feedback utilisateur sur l'Étape 3.

Le shell ne doit plus afficher de breadcrumb, titre de page ou description générique dans le header. Le header sert uniquement aux informations persistantes utiles :

- drapeau de la langue apprise + XP
- flamme de série
- logo seulement en mobile, car la sidebar desktop porte déjà la marque

La page `Apprendre` doit rester centrée sur le chemin de niveaux et les quêtes journalières. Les textes d'explication visibles doivent être évités tant que le contenu réel n'existe pas.

## D021 - Paramètres et notifications

Statut : retenue après feedback utilisateur sur l'Étape 3.

`Paramètres` devient une destination de navigation placée sous `Messages`. Le mode clair/sombre vit dans cette page, pas dans le header ni dans l'onboarding.

La cloche de notifications est intégrée dans la zone profil en bas de sidebar pour éviter un header trop chargé.

## D022 - Identité visuelle Classyc

Statut : retenue après feedback utilisateur sur l'Étape 3.

Le logo utilise un composant partagé `BrandLogo` et une police locale Fredoka téléchargée depuis Google Fonts. La police est stockée dans `apps/web/src/assets/fonts/` avec sa licence OFL.

Raison : donner une identité plus ludique et plus nette à Classyc sans dépendre d'un import externe au runtime.

## D023 - Palette bleue sobre et cohérence des pages

Statut : retenue après feedback utilisateur sur l'Étape 3.

La direction visuelle doit éviter les effets fluo, les dégradés décoratifs et les pages qui semblent conçues séparément. La palette principale est désormais bleue avec des surfaces neutres.

Règles retenues :

- `--accent` est bleu.
- pas de dégradés décoratifs pour les fonds, le logo ou la map.
- les pages secondaires réutilisent les mêmes panneaux, bordures, rayons et ombres.
- les textes de progression ne doivent pas être jaunes/orange ; la couleur vient des icônes si nécessaire.
- éviter les traits/bordures visibles dans le header et les badges de progression ; préférer des surfaces avec ombre douce.
- la navigation principale doit avoir un état actif clair sur `--accent`, sans glow/box-shadow décoratif.
- le profil en bas de sidebar ne doit pas reprendre l'état actif des liens de navigation.
- le chrome d'interface non éditable comme logo, stats et boutons doit éviter la sélection de texte accidentelle.

## D024 - Série avec pictogramme custom

Statut : retenue après feedback utilisateur sur l'Étape 3.

L'icône de série du header n'utilise pas OpenMoji. Elle est rendue par un petit pictogramme SVG custom dans `AppShell.tsx`, avec un style centralisé dans `main.css`.

La série est l'exception chromatique du header : la flamme custom est orange à deux tons via les tokens `--streak`, `--streak-deep`, `--streak-hot` et `--streak-soft`, tandis que le texte reste neutre.

Raison : les essais avec l'icône lucide, les assets OpenMoji puis une flamme monochrome ne rendaient pas assez proprement dans le header compact. Une flamme custom à deux tons garde le style cohérent avec la palette bleue tout en donnant assez de présence au streak.

## D025 - Overflow shell

Statut : retenue après feedback utilisateur sur l'Étape 3.

Le shell desktop occupe `100vh`. La sidebar desktop ne scrolle pas et le contenu central utilise `overflow-y: auto`.

Raison : garder une navigation stable comme une app et éviter que la sidebar dépasse de l'écran.

## D026 - Learn path premium sobre

Statut : retenue après feedback utilisateur sur l'Étape 3.

Le learn path de `Apprendre` doit rester propre tant que le vrai système de niveaux n'existe pas : route courbe, pastilles rondes numérotées, états visuels clairs et palette bleue cohérente.

Règles :

- ne pas copier Duolingo directement.
- éviter les effets fluo, les grands dégradés et les décorations trop IA.
- ne pas afficher de libellés de type `Leçon`, `Mini-jeu`, `Révision` tant que le système de niveaux n'est pas implémenté.
- ne pas utiliser d'icônes de niveaux provisoires ; les pastilles affichent seulement le numéro dans la preview actuelle.
- ne pas afficher le bonus `1.5x` dans la preview tant que le vrai système de niveaux n'est pas implémenté.
- utiliser les mêmes tokens de surface, ombre et accent que le shell.
- dessiner la route et les pastilles dans un SVG unique pour éviter les décalages entre road et niveaux.
- ne pas utiliser de box-shadow bleu en dessous des pastilles : ce faux relief a été explicitement rejeté.
- ne pas ajouter de formes décoratives provisoires autour de la map.
- ne pas afficher de bouton `Suivant` dans le ruban tant qu'il n'a pas de vraie action.
- le vrai contenu pédagogique et la logique de progression restent pour les étapes suivantes.

Note : les versions avec libellés/doodles visibles, icônes de niveaux provisoires, route/layout séparés ou faux socle bleu ont été rejetées. Garder cette zone calme jusqu'à la vraie étape niveaux.

## D027 - Navigation active sur la couleur accent

Statut : retenue après feedback utilisateur sur l'Étape 3, actualisée le 2026-06-23.

Les items actifs de la sidebar et de la navigation mobile utilisent `--nav-active` et `--nav-active-contrast`. Le fond actif suit la couleur accent/logo, y compris en thème sombre, et le texte actif reste blanc en thème sombre pour éviter un contraste noir sur fond bleu.

Raison : l'état actif doit être immédiatement reconnaissable comme l'accent de marque sans devenir illisible sur thème sombre. Le contraste du texte reste géré par variable selon le thème.

## D028 - Scroll indépendant sur Apprendre

Statut : retenue après feedback utilisateur sur l'Étape 3.

Sur desktop, `Apprendre` utilise `app-main:has(.learn-grid)` pour empêcher le scroll global de la page, puis donne un `overflow-y: auto` indépendant à `.learn-path` et `.learn-side`.

Raison : scroller la map ne doit pas faire défiler les quêtes à droite, et inversement.

## D029 - Animations sobres avec Framer Motion

Statut : retenue après feedback utilisateur sur l'Étape 3.

Framer Motion est utilisé pour les animations utiles de l'interface :

- transition douce entre les routes du shell via `AnimatePresence`.
- apparition progressive des cartes, quêtes et pastilles de la map.
- micro-interactions `whileTap` sur les actions principales.
- transition animée entre les étapes de setup.
- `MotionConfig reducedMotion="user"` au niveau app pour respecter les préférences système.

Règles :

- rester sobre, sans effet fluo, sans grande animation décorative et sans surcharge visuelle.
- ne pas casser le scroll séparé de `Apprendre`.
- garder la carte de setup stable entre les étapes pour éviter un effet de popup qui change brutalement de taille.
- ne pas ajouter une nouvelle bibliothèque d'animation tant que Framer Motion couvre le besoin.

## D030 - Setup minimal et lisible

Statut : retenue après feedback utilisateur sur l'Étape 3.

Le setup est la porte d'entrée principale, donc il doit être plus éditorial et moins formulaire administratif.

Règles :

- ne pas répéter deux fois le même nom de langue dans une carte (`Français / Français` est à éviter).
- ne pas afficher de seconde ligne sous les langues dans le setup : le drapeau, le label et l'état visuel suffisent.
- rendre la langue cible déjà choisie visuellement disabled avec un état clair, pas seulement une faible opacité.
- éviter les badges d'étape isolés si toutes les étapes ne sont pas numérotées de façon cohérente.
- garder les textes courts et les graisses typographiques plus modérées que le reste du shell.
- le bouton compte doit rester une action secondaire discrète, pas un bouton bordé dominant.
- placer les actions de chaque étape en bas de la carte avec le même couple bouton secondaire / bouton primaire.
- pour les prochaines implémentations, supprimer toute micro-copie qui ne change pas la décision utilisateur ; préférer un état visuel clair à une phrase explicative.

## D031 - Createur complet Open Peeps

Statut : retenue et implementee pour l'Etape 5 apres feedback utilisateur.

L'Etape 5 doit viser un vrai createur de personnage, inspire des principes d'edition de type Mii/Bitmoji sans copier leur interface.

Regles retenues :

- proposer des categories de personnalisation claires dans l'ordre cheveux, visage, barbe, accessoires, tenues, poses.
- permettre les couleurs principales quand les SVG le permettent : peau, cheveux, vetements, accents/accessoires.
- placer les pastilles rondes de couleur sous l'apercu du personnage et les rendre contextuelles a la categorie active.
- garder le trait/contour noir fixe ; il ne doit plus etre expose comme couleur configurable.
- les tenues sont gerees proprement en mode buste ; les assets debout/assis ne sont pas forces a reprendre une tenue `body` quand le pack ne fournit pas de calque vetement compatible.
- garder une interface responsive avec apercu, onglets ou segments, swatches de couleur et grilles d'options.
- centraliser l'index des atomes Open Peeps et la composition du personnage dans des modules dedies.
- sauvegarder tous les choix utiles dans le profil invite.
- cadrer l'avatar de profil sur la tete, car le corps entier devient illisible en petit format.
- ne pas disperser les chemins d'assets dans les composants.

Preparation technique du 2026-06-13 :

- les atomes Open Peeps sont des SVG locaux stables, avec des dimensions constantes par categorie.
- le createur doit utiliser un compositeur SVG centralise plutot qu'une collection d'images PNG.
- le buste est la premiere cible de composition, car il correspond au besoin d'onboarding et de photo de profil.
- les offsets de `Flat Assets/Flat Assets/Separate Atoms/a person/bust.svg` servent de reference : body `(147, 639)`, head `(372, 180)`, face `(531, 366)`, facial-hair `(495, 518)`, accessories `(419, 421)`.
- pour sitting/standing, les offsets de tete internes restent equivalents : face `(159, 186)`, facial-hair `(123, 338)`, accessories `(47, 241)`.
- les couleurs peuvent etre exposees par remplacement controle des fills SVG : `#FFFFFF`/`white` pour les zones pleines, `#000000`/`#231F20`/`#221E1F` pour les traits ou masses selon la categorie, et `#4F66AF` pour les accents historiques de certains cheveux.
- les chapeaux, foulards et couvre-chefs restent dans des neutres sombres/gris, meme quand la couleur de cheveux change.
- les cheveux et barbes utilisent une couleur principale plus un accent de contraste pour eviter les points de detail ton sur peau.
- les visages utilisent une ombre derivee de la peau quand un fill d'accent est present.
- les apercus visage/accessoires doivent garder un fond lisible en theme sombre.
- le modele doit rester extensible : garder le `characterId` historique pour compatibilite, puis ajouter une personnalisation complete sauvegardee dans le profil invite.

Implementation Etape 5 :

- `OpenPeepCustomization` est ajoute au package partage et sauvegarde le corps, les cheveux, le visage, la pilosite, les accessoires, la posture et les couleurs principales.
- Correction feedback fond du 2026-06-22 : `OpenPeepCustomization` sauvegarde aussi un fond d'avatar (`patternId` + couleur `background`). Le fond est rendu par les panneaux UI via `character-backgrounds.ts`, pas injecte dans les SVG Open Peeps, afin de garder la composition du personnage et le decor separes.
- `apps/web/src/assets/open-peeps-atoms.ts` centralise l'index SVG via `import.meta.glob` et filtre les fichiers metadata.
- `OpenPeepComposer` compose les atomes en SVG pour le buste, les postures debout/assis et le cadrage tete de l'avatar.
- `CharacterCreator` remplace la galerie PNG dans l'onboarding avec onglets, grilles d'options, pastilles contextuelles sous le personnage et inputs couleur.
- Correction feedback du 2026-06-14 : suppression de la section `Couleurs`, categorie `Tête` renommee `Cheveux`, ordre des categories ajuste, trait noir fixe, recolorisation corrigee pour les couvre-chefs, cheveux, barbes, visages et accessoires.
- Correction feedback tenues/poses du 2026-06-14 : abandon du rendu force de tenue sur les poses debout/assises. Les poses restent des assets complets, et `bodyId` ne pilote que le buste et les previews `Tenues`.
- Correction feedback tenues du 2026-06-14 : les SVG `body` locaux Open Peeps sont trop aplatis pour une recolorisation fiable chemin par chemin. La tentative `open-peep-body-recolor.ts` est supprimee. Les bustes et previews `Tenues` passent par `css-peeps/css-peeps.compat.css`, pilote par `apps/web/src/features/character/open-peep-css-peeps.ts`, qui mappe explicitement les 30 bodies vers des tokens Open Peeps colorisables et expose les variables `skin`, `clothes`, `object`, `hair`, `accessory`.
- Correction feedback tenues secondaires du 2026-06-14 : `OpenPeepCustomizationColors` ajoute `outfitSecondary` avec fallback retrocompatible. `open-peep-css-peeps.ts` declare par body si la couche noire CSS-Peeps doit etre recoloree en couleur principale ou secondaire. `OpenPeepComposer` recolore le SVG de detail CSS-Peeps existant a l'execution et ajoute un stroke noir sur le meme path ; aucune forme SVG supplementaire n'est ajoutee. Les pastilles secondaires ne s'affichent que pour les bodies qui ont deux zones personnalisables.
- Correction feedback contours du 2026-06-14 : le stroke noir ajoute aux details CSS-Peeps recolores est renforce et arrondi pour rester visible sur les contours des bodies. `Sweater` est mappe avec `outfit` comme masse principale et `outfitSecondary` pour les taches.
- Le build Vite signale un bundle volumineux car les SVG bruts et CSS-Peeps sont embarques pour rendre le createur complet disponible immediatement. A optimiser plus tard si le poids devient prioritaire.

## D032 - Niveaux campagne

Statut : retenue et implementee pour l'Etape 7.

Le modele de base des niveaux campagne vit dans `packages/shared/src/index.ts` :

- `CampaignLevelState` : `locked`, `available`, `completed`.
- `CampaignLevelReward` : reward `xpMultiplier` pour porter un bonus comme `1.5x`.
- `CampaignLevel` : identifiant, ordre, titre, etat, reward optionnel et `openMojiHexcode` optionnel.

La source de demo campagne vit cote web dans `apps/web/src/features/learning/campaign-levels.ts`, car elle contient aussi les coordonnees de rendu SVG de la map actuelle.

Regles retenues :

- garder le SVG unique route + pastilles pour eviter les decalages de map ;
- afficher le bonus `1.5x` uniquement si un niveau expose une propriete `reward` ;
- preparer les hexcodes OpenMoji dans le modele sans afficher d'icones sur la map tant que cela surchargerait l'interface ;
- ne pas donner un style distinct ou un curseur cliquable a un niveau tant qu'il ne lance pas une vraie action ;
- depuis le feedback apres l'Etape 10, le niveau 1 peut lancer les exercices de la langue cible, car une vraie action existe ;
- depuis la correction feedback de l'Etape 12, la campagne part de zero visuellement : niveau 1 `available`, aucun niveau `completed` tant qu'il n'y a pas de vraie progression ;
- ne pas brancher d'exercices, XP reel ou progression persistante avant les etapes dediees.

## D033 - Niveaux journaliers

Statut : retenue et implementee pour l'Etape 8.

Le modele de base des niveaux journaliers vit dans `packages/shared/src/index.ts` :

- `DailyLevelDifficultyTier` : `warmup`, `standard`, `challenge`.
- `DailyLevelReward` : reward `xpMultiplier` reutilisant le type de reward generique.
- `DailyLevel` : identifiant, ordre, titre, difficulty tier, progression mockee, cle de rotation, reward optionnel et `openMojiHexcode` optionnel.

La source mockee vit dans `apps/web/src/features/learning/daily-levels.ts`.

Regles retenues :

- la rotation journaliere est locale et deterministe par date, sans serveur ;
- les quetes journalieres affichent deux niveaux mockes par jour avec difficulte visible ;
- le bonus `1.5x` apparait uniquement si le niveau journalier expose une propriete `reward` ;
- depuis la correction feedback de l'Etape 12, les cartes de quetes journalieres ouvrent de vrais mini-decks via `/daily/{dailyLevelId}` ;
- les contenus journaliers peuvent porter les revisions et points plus avances qui ne doivent pas apparaitre dans la premiere lecon campagne.

## D034 - Moteur d'exercices

Statut : retenue et implementee pour l'Etape 9.

Le modele d'exercice vit dans `packages/shared/src/index.ts` pour pouvoir etre reutilise plus tard par le web, le serveur et les contenus pedagogiques :

- `ExerciseType` couvre `multipleChoice`, `fillBlank`, `trueFalse`, `readingComprehension`, `matching`, `imageChoice` et `wordOrder`.
- `LearningExercise` est une union typee des variantes d'exercices.
- `ExerciseAnswer` represente les reponses utilisateur par type d'exercice.
- `ExerciseEvaluation` porte le score, le feedback, les XP potentielles et les XP potentielles gagnees.

La logique de correction mockee vit dans `apps/web/src/features/exercises/exercise-engine.ts`. Elle reste volontairement locale et pure : evaluer une reponse ne modifie ni XP reel, ni streak, ni progression persistante.

La source `apps/web/src/features/exercises/mock-exercises.ts` couvre les quatre types avec du contenu non final, uniquement pour valider le modele et le moteur.

Le composant `ExercisePreview` fournit une UI responsive et reutilisable pour les decks campagne et journaliers.

Regles retenues :

- garder une seule logique de correction partagee par les futurs contenus ;
- ne pas creer de seconde structure pour les exercices francais, anglais ou chinois ;
- ne pas declencher de progression reelle tant que l'Etape XP/streak n'est pas traitee ;
- garder les niveaux campagne 2+ non cliquables tant qu'un lancement d'exercice explicite n'est pas implemente ; le niveau 1 et les quetes journalieres ont maintenant une vraie action.

## D035 - Premiers exercices francais

Statut : retenue et implementee pour l'Etape 10.

Le premier contenu francais vit dans `apps/web/src/features/exercises/french-exercises.ts`. Il reutilise directement `LearningExercise` et `ExerciseAnswer` au lieu de creer une structure parallele.

Contenus actuels apres correction feedback de l'Etape 12 :

- salutations et mots sociaux : `Bonjour`, `Salut`, `Merci`, `Au revoir` ;
- oui/non et reponse simple a `Ca va ?` ;
- presentation simple avec `Je m'appelle` ;
- repetition par choix image, associations mot/traduction, associations mot/image, ordre des mots et mini phrase.

Le deck francais reutilise `ExerciseDeck`, `ExercisePreview` et le moteur de correction de l'Etape 9, sans afficher d'XP potentielle dans l'experience.

La route `/exercises/fr` existe pour verifier le rendu et l'interaction. Depuis le feedback utilisateur suivant l'Etape 10, le niveau 1 et le bouton `Jouer` du ruban lancent le deck de la langue apprise via `/exercises/{langue cible}`. Cela ne modifie pas le profil invite, les XP reels, le streak ou la progression persistante.

Les anciens points `et` / `est`, `savoir` / `connaitre` et conjugaison simple sont desormais deplaces vers les quetes journalieres/revisions.

Regles retenues :

- les prochains lots de contenu doivent reutiliser le meme modele et le meme moteur ;
- garder les contenus courts et facilement revisables tant qu'il n'y a pas de validation pedagogique plus complete ;
- ne pas confondre XP potentielle affichee dans un exercice avec XP reel utilisateur.

## D036 - Contenus anglais, chinois et deck par langue

Statut : retenue et implementee pour les Etapes 11 et 12.

Les premiers contenus anglais et chinois reutilisent le modele `LearningExercise`, le moteur de correction existant et le deck generique :

- `apps/web/src/features/exercises/english-exercises.ts` : premiere lecon depuis zero avec `Hello`, `Hi`, `Thank you`, `Goodbye`, `Yes/No`, `My name is`.
- `apps/web/src/features/exercises/chinese-exercises.ts` : premiere lecon depuis zero avec `你好`, `谢谢`, `再见`, `是` / `不是`, `我叫`, avec pinyin.
- `apps/web/src/features/exercises/ExerciseDeck.tsx` : deck jouable generique pour tous les contenus.
- `apps/web/src/features/exercises/exercise-content.ts` : registre `fr` / `en` / `zh`.
- `apps/web/src/features/exercises/daily-exercises.ts` : mini-decks journaliers pour revisions et points plus avances.

La route `/exercises/:languageCode` choisit le contenu par langue. Sur la map, le niveau 1 ouvre `/exercises/{profile.targetLanguage}`.

Regles retenues :

- un seul noeud campagne est interactif pour le moment : le niveau 1 ;
- les niveaux verrouilles restent visuellement grises et non cliquables ;
- les quetes journalieres ouvrent des mini-decks de revision avec difficulte visible ;
- aucune validation d'exercice ne donne encore d'XP reel, de streak reel ou de progression persistante.

## D037 - Experience d'exercice minimale

Statut : retenue apres correction feedback de l'Etape 12.

Les routes d'exercice doivent sortir du shell complet :

- `/exercises/:languageCode` et `/daily/:dailyLevelId` affichent un shell minimal dedie.
- Le shell minimal garde seulement le logo Classyc, une action de retour discrete, la progression du deck, l'exercice et les actions.
- Pas de sidebar desktop, pas de header de progression XP/streak, pas de navigation mobile dans une lecon.
- Ne pas afficher de labels techniques visibles comme le type d'exercice ou des XP potentielles dans l'experience.
- Le feedback de correction apparait uniquement apres validation, pas au moment de selectionner une reponse.
- La premiere lecon campagne doit commencer par des bases simples et repetitives, pas par grammaire/conjugaison.
- Les quetes journalieres peuvent porter des revisions, pieges ou points plus avances, avec difficulte visible.
- Aucune progression reelle, XP reel ou streak reel ne doit etre ajoute tant que l'UX d'exercice n'est pas propre.

## D038 - Boucle de lecon jouable et paliers locaux

Statut : retenue apres feedback utilisateur du 2026-06-23.

Le mode exercice doit fonctionner comme une lecon courte a terminer, pas comme une fiche que l'on recommence.

Regles retenues :

- retirer les actions `Recommencer`/`Rejouer` de la lecon ;
- valider une reponse affiche un feedback localise pres du bouton d'action ;
- apres validation, le bouton principal devient `Continuer` ou `Terminer` ;
- une reponse fausse ou partielle ne bloque pas : l'exercice est ajoute en fin de file et devra etre reussi plus tard dans la meme lecon ;
- les options selectionnees restent bleues avant validation, les bonnes reponses deviennent vertes et les erreurs rouges ;
- le matching evalue les paires en temps reel, garde les associations visibles et annule la selection si l'utilisateur reclique l'element gauche actif ;
- les consignes, boutons et messages utilisent la langue de l'utilisateur, tandis que les mots/phrases de l'exercice restent dans la langue apprise ;
- la premiere lecon est generee depuis un registre target/native pour eviter de coder des traductions francaises dans une interface anglaise ou chinoise ;
- eviter les OpenMoji ambigus pour les mots abstraits, notamment ne pas utiliser l'icone de priere pour `merci`.

Progression locale retenue :

- `PreviewProgress` contient `campaignLevels` et `completedLessons` ;
- chaque niveau campagne prepare `requiredSteps: 3` ;
- finir la lecon campagne du niveau 1 ajoute +10 XP et avance un palier jusqu'a 3/3 ;
- finir une quete journaliere ajoute +10 XP une seule fois par identifiant de quete ;
- les anciens profils invites sont normalises au chargement pour rester compatibles ;
- le streak, les niveaux utilisateur et la progression pedagogique des niveaux 2+ restent pour l'etape suivante.

## D039 - Differenciation visuelle des exercices

Statut : retenue apres feedback utilisateur du 2026-06-23.

Les exercices doivent rester identifiables rapidement quand l'utilisateur enchaine plusieurs cartes.

Regles retenues :

- `ExerciseBase.presentation` permet de marquer une presentation UX sans creer un nouveau type de correction ;
- la presentation `conversation` sert aux questions-reponses courtes comme `How are you?` / `Ca va ?` et rend une bulle de dialogue dediee ;
- les OpenMoji ne sont plus affiches dans le header de consigne, pour eviter un pictogramme decoratif redondant ;
- les OpenMoji restent utilises pour les exercices ou options qui demandent de deviner un mot depuis une image ;
- les exercices `presentation: 'translation'` de choix simple affichent la consigne en texte discret, le mot cible juste sous la consigne en blanc/texte primaire sans gros encadre, et peuvent afficher une illustration Open Peep monochrome ancrée à droite du même bloc, sans fond, générée depuis les assets indexés et sans modification des sources ;
- les associations de traduction peuvent aussi porter `presentation: 'translation'`, mais restent sans Open Peep et texte contre texte ;
- dans les associations de traduction, la colonne gauche sert de reponses en langue utilisateur/native, et la colonne droite garde la langue apprise ;
- les associations d'image affichent uniquement l'illustration du cote image ; le libelle texte reste reserve a l'accessibilite et les cartes image utilisent la meme structure alignee que les cartes texte ;
- les `imageChoice` illustrables font l'inverse d'une carte image classique : le stimulus visible est le mot en langue apprise, et les options sont des illustrations OpenMoji accessibles par libelle ;
- depuis la reprise feedback, ce stimulus `imageChoice` doit etre integre au titre sous la forme `Choisis la bonne reponse pour <mot>` avec le mot accentue, sans grande carte/panneau contenant seulement le mot ;
- les choix de traduction simple peuvent alterner le sens : soit mot en langue apprise avec options natives, soit mot natif/utilisateur avec options en langue apprise ;
- les conversations `How are you?` / `Ca va ?` doivent eviter les distracteurs semantiquement acceptables comme `oui` ou `non`, afin qu'une seule reponse soit clairement correcte ;
- le rendu conversation garde une bulle question venant de gauche et une bulle reponses venant de droite, sans panneau de thread supplementaire autour de la question ; les deux bulles doivent partager le meme style de surface et de radius ;
- les exercices `conversation`, `wordOrder` et `reading` restent sans Open Peeps pour eviter la surcharge visuelle ;
- les exercices `wordOrder` peuvent contenir 2-3 mots pieges non presents dans `correctTokenIds`; la validation devient disponible quand le nombre de mots choisis atteint la longueur de la phrase attendue, pas quand toute la banque de mots est videe ;
- les questions de lecture qui suivent le modele `Which word means <mot>` / `Quel mot veut dire <mot>` / `...表示<mot>` peuvent accentuer uniquement le mot cible en texte primaire, sans encadre ni fond ;
- les feedbacks correct/incorrect sont des textes colores sans fond ;
- les associations correctes en matching sont verrouillees une fois vertes, au clic comme au clavier ;
- `Entree` est prioritaire pour valider une reponse complete ou continuer apres feedback, meme si le focus reste sur une option.

## D040 - Bonus quotidien et progression de map

Statut : retenue apres feedback utilisateur du 2026-06-23.

Le bonus `1.5x` de campagne est un boost quotidien global, pas un bonus par niveau. Il s'affiche sur la lecon courante quand il n'a pas encore ete consomme pour la date locale, puis disparait apres une lecon terminee et revient le lendemain.

La map n'utilise plus trois petits points pour representer les paliers d'un niveau. Le niveau courant affiche un indicateur compact `x/3`, et un niveau termine passe en vert avec un check pour rendre l'etat immediatement lisible.

Depuis le feedback suivant, la progression bleue de la route ne doit pas compter les portions cachees sous les pastilles de niveau. Le calcul utilise donc la longueur du chemin SVG, un rayon masque correspondant aux pastilles et une compensation du bout rond du trait, afin qu'un palier `1/3` ou `2/3` represente visuellement le bon tiers de la route visible entre deux niveaux. Un niveau a `0/3` ne doit pas faire avancer le segment bleu vers le centre ou la sortie de sa pastille.
