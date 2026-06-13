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

Statut : a implementer a l'Etape 12.

Les caracteres chinois doivent pouvoir porter une prononciation et des metadata au niveau caractere ou segment.

Approche prevue :

- champ `pinyin`
- champ `meaning`
- support hover desktop
- support tap long mobile

## D007 - OpenMoji

Statut : a implementer a l'Etape 6.

Creer un module d'indexation qui lit `Openmoji/openmoji.json` et expose une recherche simple par :

- `annotation`
- `tags`
- `openmoji_tags`
- `group`
- `subgroups`
- `hexcode`

La resolution d'image doit pointer vers `Openmoji/icons/{hexcode}.png`.

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

## D027 - Texte blanc sur navigation active

Statut : retenue après feedback utilisateur sur l'Étape 3.

Les items actifs de la sidebar et de la navigation mobile utilisent `--nav-active` et `--nav-active-contrast`, avec un texte blanc même en thème sombre.

Raison : le texte noir sur bleu actif a été jugé visuellement incohérent.

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

- proposer des categories de personnalisation claires : base/personnage, tete/cheveux, visage, pilosite, accessoires, corps/tenue, posture selon assets disponibles.
- permettre les couleurs principales quand les SVG le permettent : peau, cheveux, vetements, accents/accessoires.
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
- les couleurs peuvent etre exposees par remplacement controle des fills SVG : `#FFFFFF`/`white` pour les zones pleines et `#000000`/`#231F20`/`#221E1F` pour les traits, cheveux ou accessoires selon la categorie.
- le modele doit rester extensible : garder le `characterId` historique pour compatibilite, puis ajouter une personnalisation complete sauvegardee dans le profil invite.

Implementation Etape 5 :

- `OpenPeepCustomization` est ajoute au package partage et sauvegarde le corps, la tete, le visage, la pilosite, les accessoires, la posture et les couleurs.
- `apps/web/src/assets/open-peeps-atoms.ts` centralise l'index SVG via `import.meta.glob` et filtre les fichiers metadata.
- `OpenPeepComposer` compose les atomes en SVG pour le buste, les postures debout/assis et le cadrage tete de l'avatar.
- `CharacterCreator` remplace la galerie PNG dans l'onboarding avec onglets, grilles d'options, swatches et inputs couleur.
- Le build Vite signale un bundle JS volumineux car les SVG bruts sont embarques pour rendre le createur complet disponible immediatement. A optimiser plus tard si le poids devient prioritaire.
