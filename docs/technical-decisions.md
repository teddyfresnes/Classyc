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

Statut : a implementer aux Etapes 4 et 5.

Utiliser les templates Open Peeps existants pour une premiere selection de personnage. Les atomes de personnalisation peuvent etre ajoutes apres la galerie de base.

Ne pas importer les dossiers `__MACOSX`.

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
