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
