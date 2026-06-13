# Etat actuel

Date : 2026-06-13

## Statut court

Etape courante : Etape 3 - Onboarding initial.

Etat : terminee.

Le projet contient une workspace npm avec une application web React/Vite dans `apps/web`, un package partagé dans `packages/shared`, un emplacement réservé pour le futur serveur dans `apps/api`, un shell UI moderne et un onboarding initial avec profil invité local.

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
- Header principal réduit : plus de titre/breadcrumb de page ni description décorative.
- En haut à droite : drapeau de la langue apprise + XP, puis flamme custom orange à deux tons pour la série.
- Sidebar desktop : logo Classyc, navigation principale, entrée `Paramètres` sous `Messages`, profil en bas.
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
- L'étape prénom contient une zone haute dédiée `Dites-nous en plus sur vous` pour éviter une popup vide ou déséquilibrée.
- Profil invité local sauvegardé dans `localStorage` avec XP et série initiaux.
- Shell branché sur le profil invité après completion de l'onboarding.
- Dossier `apps/api` réservé sans implémentation serveur.

## Ce qui n'existe pas encore

- Serveur/API.
- Systeme de niveaux.
- Exercices.
- XP, streak, amis, messagerie ou mini-jeux.
- Personnage Open Peeps dans l'onboarding.
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

## Reprise

Si l'utilisateur tape `nextstepproject`, realiser uniquement l'Etape 4 de [docs/next-steps.md](next-steps.md) : integration Open Peeps.
