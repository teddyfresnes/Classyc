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

## D017 - Navigation Apprendre / Stats

Statut : retenue après feedback utilisateur sur l'Étape 3.

La navigation principale utilise désormais :

- `Apprendre` pour la page principale
- `Stats` pour l'ancien espace `Parcours`

La progression utile est déplacée dans la sidebar avec XP et série. La page `Apprendre` prépare une map de niveaux et un panneau de quêtes journalières.

## D018 - Setup en deux temps

Statut : retenue après feedback utilisateur sur l'Étape 3.

Le setup doit rester très ergonomique :

- écran 1 : langue parlée puis langue à apprendre
- bouton `Continuer`
- écran 2 : prénom
- retour arrière possible
- la personnalisation du personnage sera ajoutée ensuite comme troisième temps

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

## D024 - Série avec pictogramme custom

Statut : retenue après feedback utilisateur sur l'Étape 3.

L'icône de série du header n'utilise pas OpenMoji. Elle est rendue par un petit pictogramme SVG custom dans `AppShell.tsx`, avec un style centralisé dans `main.css`.

La série est l'exception chromatique du header : la flamme custom est orange à deux tons via les tokens `--streak`, `--streak-deep`, `--streak-hot` et `--streak-soft`, tandis que le texte reste neutre.

Raison : les essais avec l'icône lucide, les assets OpenMoji puis une flamme monochrome ne rendaient pas assez proprement dans le header compact. Une flamme custom à deux tons garde le style cohérent avec la palette bleue tout en donnant assez de présence au streak.

## D025 - Overflow shell

Statut : retenue après feedback utilisateur sur l'Étape 3.

Le shell desktop occupe `100vh`. La sidebar desktop ne scrolle pas et le contenu central utilise `overflow-y: auto`.

Raison : garder une navigation stable comme une app et éviter que la sidebar dépasse de l'écran.
