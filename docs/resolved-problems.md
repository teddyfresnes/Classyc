# Problemes resolus

## 2026-06-13 - Chemins d'assets differents de la description

Probleme : la demande mentionne `assets/Flat assets/` et `assets/openmoji/`, mais le workspace contient `Flat Assets/` et `Openmoji/` directement a la racine.

Resolution : documenter les chemins reels et prevoir une centralisation des chemins d'assets dans le code au lieu de disperser des chemins en dur.

## 2026-06-13 - Dossiers metadata macOS

Probleme : les assets Open Peeps contiennent des dossiers `__MACOSX` et fichiers metadata qui ne doivent pas etre utilises par l'application.

Resolution : ajouter une regle de projet pour les ignorer. Les futurs scripts d'indexation devront filtrer `__MACOSX` et les fichiers commencant par `._`.

## 2026-06-13 - Affichage console OpenMoji

Probleme : la lecture console de `Openmoji/openmoji.json` affiche certains emojis avec un rendu degrade, probablement lie a l'encodage de sortie du terminal.

Resolution : ne pas se baser sur l'affichage console des emojis. Utiliser les champs stables comme `hexcode`, `annotation`, `tags`, `group` et les fichiers PNG dans `Openmoji/icons/`.

## 2026-06-13 - `npm install` refuse `workspace:*`

Probleme : la premiere configuration utilisait `@classyc/shared` avec la version `workspace:*`, mais `npm install` a echoue avec `EUNSUPPORTEDPROTOCOL`.

Resolution : remplacer la dependance par `file:../../packages/shared` dans `apps/web/package.json`. L'installation passe et les scripts de workspace restent fonctionnels.

## 2026-06-13 - Audit npm sur Vite/esbuild

Probleme : apres l'installation initiale, `npm audit --omit=dev` signalait deux vulnerabilites hautes via Vite/esbuild et proposait Vite 8.

Resolution : mettre a jour Vite et `@vitejs/plugin-react` vers les versions actuelles. `npm install` indique ensuite `found 0 vulnerabilities`.

## 2026-06-13 - Navigateur integre indisponible

Probleme : le plugin Browser ne liste aucune cible disponible dans cette session, donc la verification visuelle via navigateur integre n'a pas pu etre faite.

Resolution : verifier le build, le typecheck, le lint, le serveur Vite, la reponse HTTP 200 et les logs d'erreur. Retenter le navigateur integre aux prochaines etapes.

Mise a jour : retente apres la correction UX du shell. `agent.browsers.list()` retourne encore `[]`. Les checks automatiques et HTTP restent la verification disponible.

## 2026-06-13 - Libelle chinois degrade dans TypeScript

Probleme : le libelle natif chinois etait degrade dans la sortie terminal et dans le fichier partage.

Resolution : utiliser des escapes Unicode (`\u4e2d\u6587`) dans `packages/shared/src/index.ts` pour conserver un affichage navigateur correct sans dependre de l'encodage du terminal.

## 2026-06-13 - Textes français sans accents

Problème : plusieurs textes UI avaient été écrits en ASCII (`Francais`, `deja`, `Prenom`, etc.), ce qui donnait une interface française peu professionnelle.

Résolution : centraliser les textes UI dans `apps/web/src/features/i18n/ui-copy.ts` et utiliser les vrais caractères français. Les labels partagés des langues utilisent aussi `Français`.

## 2026-06-13 - Anciennes erreurs HMR Vite dans le log

Problème : `.vite-dev.err.log` contenait d'anciennes erreurs HMR apparues pendant le refactor du shell, alors que `lint`, `typecheck` et `build` passaient.

Résolution : redémarrer proprement le serveur Vite. Les nouveaux logs sont propres et le serveur répond sur `http://127.0.0.1:5173/`.

## 2026-06-13 - Setup trop chargé

Problème : le champ prénom apparaissait sur le même écran que les langues, ce qui chargeait trop le premier setup.

Résolution : séparer le setup en deux temps avec animation courte : langues d'abord, prénom ensuite, retour arrière possible. Le futur choix du personnage deviendra le troisième temps.

## 2026-06-13 - Logs HMR après refactor design

Problème : pendant la correction de palette et de navigation, Vite a gardé des erreurs HMR intermédiaires dans `.vite-dev.err.log`, alors que `lint`, `typecheck` et `build` passaient.

Résolution : arrêter explicitement les processus `npm run dev`/`vite` du projet, supprimer les logs générés, puis relancer Vite. Le serveur répond en HTTP 200 et le log d'erreur frais est vide.
