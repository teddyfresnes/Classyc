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
- `CharacterCreator` fournit l'interface de creation : apercu, onglets dans l'ordre cheveux/visage/barbe/accessoires/tenues/fond, grilles d'options et pastilles rondes contextuelles sous le personnage.
- Les tenues restent limitees au buste : selectionner une tenue met a jour `bodyId`, sans recomposer les assets debout/assis.
- La colorisation des 30 bodies en mode buste est corrigee via `css-peeps` et `open-peep-css-peeps.ts`, avec un mapping explicite de chaque tenue locale vers un token Open Peeps colorisable.
- Les tenues dont la masse principale etait dans la couche noire CSS-Peeps recolorent ce detail existant avec la couleur principale, tout en gardant un stroke noir sur le meme path.
- Les tenues avec deux zones personnalisables utilisent `outfitSecondary`; les pastilles secondaires s'affichent seulement pour ces bodies.
- Les contours des details CSS-Peeps recolores ont ete renforces en noir et arrondis apres feedback, pour eviter que les contours de bodies comme `Blazer Black Tee`, `Dress` ou `Sweater` prennent la couleur principale ou secondaire.
- Ajustement feedback 2026-06-15 au cas par cas : `Blazer Black Tee` et `Polka Dot Jacket` ont un stroke noir specifique pour les lignes autour de la couleur secondaire ; la plupart des bodies signales ont un stroke noir intermediaire ; ces strokes ont ensuite ete reduits car ils etaient trop epais.
- `Macbook` ajoute une couche de peau ciblee dans `--peep-body-paint` pour le bras visible sous l'objet, et `Paper` utilise un stroke ajuste pour mieux connecter poignets, manches et mains.
- `Sweater` utilise maintenant la couleur principale pour la masse du vetement et `outfitSecondary` pour les taches.
- Les SVG `body` locaux restent documentes comme trop aplatis pour une recolorisation fiable chemin par chemin ; les poses debout/assises ne recoivent pas les tenues `body`.
- Les couleurs configurables sont : peau, cheveux, tenue, tenue secondaire quand disponible, et accessoire. La section `Couleurs`, les labels visibles de couleur et l'input couleur custom ont ete retires ; le trait/contour reste noir.
- Feedback popup/fond 2026-06-22 : le createur s'ouvre par defaut sur `Cheveux`, ajoute `Fond` apres `Tenues`, propose 6 motifs de fond sans `Grille`/`Rayons`/`Carreaux`, avec une palette plus distincte. Le fond est sauvegarde dans `OpenPeepCustomization` avec fallback retrocompatible et reutilise sur l'avatar de sidebar.
- Feedback setup personnage 2026-06-20 : la popup personnage garde la taille des etapes langues/prenom sur desktop, affiche le buste compact a gauche et garde les onglets de categories fixes en haut du panneau droit pendant le scroll des options.
- Les poses sont retirees du createur pendant le setup ; la personnalisation reste forcee en mode `bust` pour garder les tenues coherentes.
- Correction feedback cheveux 2026-06-20 : le rendu CSS-Peeps du personnage recolorise aussi le calque `--peep-head-detail` pour les coiffures normales, afin que la couleur cheveux appliquee dans les previews soit identique sur le personnage selectionne.
- Les pastilles de couleur utilisent un rail horizontal sans scrollbar native, pilote par deux boutons fleches gauche/droite.
- L'apercu personnage est agrandi dans sa zone desktop/mobile.
- Correction feedback cheveux applique 2026-06-20 : l'apercu principal du buste utilise maintenant un rendu hybride, avec corps/tenue CSS-Peeps et tete SVG Open Peeps original, pour que la coupe appliquee corresponde aux previews sans formes noires parasites autour du crane.
- Le calque `--peep-head-detail` CSS-Peeps est neutralise sur le rendu principal ; CSS-Peeps reste utilise pour les tenues colorisables et les previews de tenues.
- Correction feedback alignement buste 2026-06-21 : la tete SVG du rendu hybride est descendue sur le corps CSS-Peeps pour eviter qu'elle flotte trop haut au-dessus du buste.
- Correction feedback placement apercu 2026-06-21 : le personnage principal est legerement remonte pour que le rail de pastilles couleur ne passe plus devant le bas du buste.
- Correction feedback animation popup 2026-06-22 : l'etape personnage agrandit la carte lateralement rapidement avant d'afficher le contenu ; au clic sur `Commencer`, la carte revient a la taille standard, affiche un check anime puis ouvre le shell. Le retour vers le prenom garde la carte a hauteur stable.
- La zone personnage a ete encore agrandie en desktop/mobile.
- Le profil invite sauvegarde la personnalisation complete dans `localStorage`.
- La sidebar affiche le personnage personnalise via un SVG cadre sur la tete.
- Les anciens profils sans `characterCustomization` gardent le fallback PNG existant.
- `npm run lint`, `npm run typecheck` et `npm run build` passent apres les corrections feedback du 2026-06-20, du 2026-06-21 et du 2026-06-22, y compris la popup personnage contrainte, le retrait des poses dans le setup, le rail de pastilles avec fleches, la preview agrandie, le rendu hybride corps CSS-Peeps + tete SVG, la couleur cheveux appliquee au rendu principal, l'alignement de la tete sur le buste, le fond personnalisable, l'animation d'expansion et l'animation de validation.
- `git diff --check` passe ; verification visuelle Chrome/Edge headless faite sur le vrai parcours onboarding/createur en desktop et mobile, test rapide de 41 coiffures normales sans remplissage noir parasite, comparaison ciblee de l'alignement du buste hybride, verification layout mobile du rail de couleurs sous le buste, puis verification Chrome headless du fond `Pois` + `#FFF3D8`, de la sauvegarde locale et du check avant entree dans le shell.
- Serveur local verifie sur `http://127.0.0.1:5173/`, status HTTP 200.
- Navigateur integre indisponible dans cette session (`Browser is not available: iab`).
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
