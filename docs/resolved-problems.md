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
