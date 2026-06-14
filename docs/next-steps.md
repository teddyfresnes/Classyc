# Prochaines etapes

## Protocole

- Si l'utilisateur tape `nextstepproject`, executer uniquement la premiere etape marquee `prochaine`.
- Si l'utilisateur donne un feedback, corriger l'etape actuelle et ne pas avancer.
- Apres chaque etape, mettre a jour ce fichier et [current-state.md](current-state.md).

## Etape actuelle

Etape 5 - Createur complet de personnage.

Statut : terminee.

Derniere etape appliquee :

- La galerie simple Open Peeps de l'onboarding est remplacee par un createur complet.
- Le modele partage ajoute `OpenPeepCustomization` avec corps/tenue, cheveux, visage, pilosite, accessoires, posture et couleurs principales.
- `characterId` reste conserve pour compatibilite avec les profils existants.
- `apps/web/src/assets/open-peeps-atoms.ts` centralise l'index SVG Open Peeps via `import.meta.glob`.
- Les fichiers `__MACOSX` et metadata restent ignores.
- `OpenPeepComposer` compose les SVG Open Peeps pour debout, assis et cadrage tete fallback ; les bustes colorisables passent par CSS-Peeps.
- `OpenPeepComposer` ajoute un cadrage `outfit` pour previsualiser les tenues de buste sans la tete dans les grilles.
- La recolorisation est contextuelle : chapeaux/foulards en neutres sombres, cheveux et barbe avec accent de contraste, visage avec ombre de peau, trait noir fixe.
- `CharacterCreator` fournit l'interface de creation : apercu, onglets dans l'ordre cheveux/visage/barbe/accessoires/tenues/poses, grilles d'options, pastilles rondes contextuelles sous le personnage et inputs couleur.
- Les tenues restent limitees au buste : selectionner une tenue met a jour `bodyId`, sans recomposer les assets debout/assis.
- La colorisation des 30 bodies en mode buste est corrigee via `css-peeps` et `open-peep-css-peeps.ts`, avec un mapping explicite de chaque tenue locale vers un token Open Peeps colorisable.
- Les tenues dont la masse principale etait dans la couche noire CSS-Peeps recolorent ce detail existant avec la couleur principale, tout en gardant un stroke noir sur le meme path.
- Les tenues avec deux zones personnalisables utilisent `outfitSecondary`; les pastilles secondaires s'affichent seulement pour ces bodies.
- Les SVG `body` locaux restent documentes comme trop aplatis pour une recolorisation fiable chemin par chemin ; les poses debout/assises ne recoivent pas les tenues `body`.
- Les couleurs configurables sont : peau, cheveux, tenue, tenue secondaire quand disponible, et accessoire. La section `Couleurs` a ete retiree et le trait/contour reste noir.
- Le profil invite sauvegarde la personnalisation complete dans `localStorage`.
- La sidebar affiche le personnage personnalise via un SVG cadre sur la tete.
- Les anciens profils sans `characterCustomization` gardent le fallback PNG existant.
- `npm run lint`, `npm run typecheck` et `npm run build` passent apres les corrections feedback du 2026-06-14, y compris le retrait du rendu force sur poses et la correction CSS-Peeps des tenues de buste.
- Serveur local verifie sur `http://127.0.0.1:5173/`, status HTTP 200.
- Navigateur integre indisponible dans cette session (`agent.browsers.list()` retourne `[]`).
- Note build : Vite signale un bundle volumineux car les SVG bruts et CSS-Peeps sont inclus pour le createur complet.

Garde-fous UX conserves :

- Interface principale moins chargee : suppression du titre/description de page dans le header.
- `Parametres` est une entree de navigation sous `Messages`.
- `Classement` est une entree de navigation separee avec icone trophee ; `Stats` utilise une icone analytique.
- Le theme clair/sombre est uniquement dans `Parametres`.
- La cloche est dans la zone profil en bas de sidebar.
- Le header affiche seulement la progression compacte : drapeau de langue apprise + XP, puis serie avec flamme custom orange a deux tons.
- Logo Classyc ameliore avec police locale Fredoka.
- Page `Apprendre` plus proche d'un chemin de progression clair, avec moins de texte.
- Palette passee sur un bleu sobre, sans effets fluo ni decorations provisoires.
- Sidebar desktop fixee a la hauteur ecran ; overflow reserve au contenu central.
- Profil bas de sidebar neutre sur `/profile` : pas d'etat selected interieur.
- Learn path : route courbe et pastilles dans un SVG unique, sans icones de niveaux ni faux socle bleu.
- Le bonus `1.5x` ne doit pas apparaitre dans la preview actuelle ; le reintroduire seulement avec le vrai systeme de niveaux.
- Les items selected de sidebar gardent le texte blanc.
- Ne pas remettre le bouton `Suivant` dans le ruban tant qu'il n'a pas de vraie action.
- Sur desktop, garder le scroll de la colonne map separe du scroll des quetes.
- Animations sobres via Framer Motion et `MotionConfig reducedMotion="user"`.
- Le setup conserve des actions uniformes entre les etapes : boutons en bas, meme style primaire/secondaire.
- Priorite forte aux futures implementations : retirer les textes secondaires non necessaires et laisser les icones/etats visuels porter l'information quand ils suffisent.

## Prochaine

### Etape 6 - Integration OpenMoji et recherche d'icones

Statut : prochaine.

Objectif : rendre les icones OpenMoji facilement retrouvables par le code et l'IA.

Taches prevues :

- Verifier l'etat du workspace.
- Lire les docs de reprise.
- Inspecter `Openmoji/openmoji.json` et `Openmoji/icons/`.
- Ignorer les fichiers metadata inutiles.
- Creer un module d'index OpenMoji centralise, sans disperser les chemins d'assets.
- Normaliser la recherche sur `annotation`, `tags`, `openmoji_tags`, `group`, `subgroups` et `hexcode`.
- Ajouter un helper de resolution vers `Openmoji/icons/{hexcode}.png`.
- Exposer un type stable pour les resultats : `hexcode`, `label`, `tags`, `src`.
- Ajouter quelques exemples d'utilisation pour niveaux, exercices ou UI, sans implementer les niveaux eux-memes.
- Lancer lint, typecheck et build.
- Mettre a jour les docs.

Critere d'acceptation :

- L'index OpenMoji est centralise dans un module dedie.
- Une recherche simple retourne des icones pertinentes depuis le JSON local.
- Les chemins PNG sont resolus proprement.
- L'application build toujours.
- La documentation indique clairement l'etape suivante.

Hors scope :

- Exercices.
- Diagnostic complet.
- Serveur.
- XP, streak, social, messagerie et mini-jeux.
