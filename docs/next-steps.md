# Prochaines etapes

## Protocole

- Si l'utilisateur tape `nextstepproject`, executer uniquement la premiere etape marquee `prochaine`.
- Si l'utilisateur donne un feedback, corriger l'etape actuelle et ne pas avancer.
- Apres chaque etape, mettre a jour ce fichier et [current-state.md](current-state.md).

## Etape actuelle

Etape 4 - Integration Open Peeps.

Statut : terminee.

Derniere etape appliquee :

- Galerie Open Peeps ajoutée après l'écran prénom, sans personnalisation avancée.
- Six templates `Bust` sont référencés depuis `apps/web/src/assets/open-peeps.ts`.
- Le profil invité sauvegarde maintenant `characterId`.
- Le personnage choisi est affiché discrètement dans la zone profil de la sidebar desktop.
- Les imports d'assets restent centralisés et ignorent `__MACOSX`, `._*` et le dossier `covid-19`.
- `npm run lint`, `npm run typecheck` et `npm run build` passent.
- Serveur local vérifié sur `http://127.0.0.1:5173/`, status HTTP 200.
- Navigateur intégré indisponible dans cette session (`agent.browsers.list()` retourne `[]`).

Garde-fous UX conserves :

- Interface principale moins chargée : suppression du titre/description de page dans le header.
- `Paramètres` est une entrée de navigation sous `Messages`.
- `Classement` est une entrée de navigation séparée avec icône trophée ; `Stats` utilise une icône analytique.
- Le thème clair/sombre est uniquement dans `Paramètres`.
- La cloche est dans la zone profil en bas de sidebar.
- Le header affiche seulement la progression compacte : drapeau de langue apprise + XP, puis série avec flamme custom orange à deux tons.
- Logo Classyc amélioré avec police locale Fredoka.
- Page `Apprendre` plus proche d'un chemin de progression clair, avec moins de texte.
- Palette passée sur un bleu sobre, sans effets fluo ni dégradés décoratifs.
- Sidebar desktop fixée à la hauteur écran ; overflow réservé au contenu central.
- Polish UI : limiter les bordures dures, préférer surfaces + ombres douces, garder les chips de progression propres et la navigation active sur le bleu accent sans glow.
- Profil bas de sidebar neutre sur `/profile` : pas d'état selected intérieur.
- Learn path repris après feedback : route courbe et pastilles dans un SVG unique, sans icônes de niveaux ni faux socle bleu.
- Ne pas remettre les anciennes versions avec route/layout séparés, icônes provisoires ou box-shadow bleu sous les pastilles.
- Le bonus `1.5x` ne doit pas apparaître dans la preview actuelle ; le réintroduire seulement avec le vrai système de niveaux.
- Les items selected de sidebar gardent le texte blanc.
- Ne pas remettre le bouton `Suivant` dans le ruban tant qu'il n'a pas de vraie action.
- Sur desktop, garder le scroll de la colonne map séparé du scroll des quêtes.
- Garder l'espace ajouté entre la scrollbar de `Apprendre` et le contenu de la map.
- Animations ajoutées avec Framer Motion : transitions de pages, setup animé, apparition progressive des éléments, micro-interactions sobres.
- Le setup conserve une taille de popup stable entre langues et prénom ; ne pas revenir à une carte qui rétrécit fortement sur l'étape prénom.
- Setup repoli : éviter les répétitions de langue, garder une typo moins lourde, disabled state explicite, bouton compte discret, pas de badge d'étape isolé.
- Les actions du setup doivent rester uniformes entre les étapes : boutons en bas, même style primaire/secondaire.
- Priorité forte aux futures implémentations : simplifier l'ergonomie, retirer les textes secondaires non nécessaires et laisser les icônes/états visuels porter l'information quand ils suffisent.

## Prochaine

### Etape 5 - Createur complet de personnage

Statut : prochaine.

Objectif : remplacer la galerie simple par un createur de personnage complet inspire des logiques Mii/Bitmoji, sans copier leur interface, avec categories, options visuelles et couleurs.

Taches prevues :

- Verifier l'etat du workspace.
- Lire les docs de reprise.
- Inspecter les assets Open Peeps utiles dans `Flat Assets/Flat Assets/Separate Atoms/` et les templates deja indexes.
- Ignorer `__MACOSX` et les fichiers `._*`.
- S'appuyer sur les resultats de preparation du 2026-06-13 dans [asset-inventory.md](asset-inventory.md) avant de coder.
- Creer un vrai modele de personnalisation : base, tete/cheveux, visage/expression, pilosite, accessoires, corps/tenue et posture.
- Permettre le choix des couleurs utiles : peau, cheveux, haut/vetement, accent/accessoire, et autres zones seulement si elles sont realistes avec les SVG disponibles.
- Reutiliser `apps/web/src/assets/open-peeps.ts` ou l'etendre sans disperser les chemins d'assets.
- Ajouter un index dedie des atomes Open Peeps, par exemple `apps/web/src/assets/open-peeps-atoms.ts`.
- Ajouter un modele de personnalisation dedie, par exemple `OpenPeepCustomization`, en gardant `characterId` compatible avec les profils existants.
- Ajouter un compositeur SVG dedie, par exemple `OpenPeepComposer`, base sur le template `a person/bust.svg`.
- Composer au minimum le buste avec les offsets verifies : body `(147, 639)`, head `(372, 180)`, face `(531, 366)`, facial-hair `(495, 518)`, accessories `(419, 421)`.
- Ajouter ensuite les poses sitting/standing si le compositeur buste est stable et si l'ergonomie reste simple.
- Centraliser l'index des atomes Open Peeps et la composition du personnage dans des modules dedies, pas dans un gros composant.
- Ajouter les champs necessaires au profil invite pour sauvegarder tous les choix de personnalisation.
- Ajouter une interface de creation claire : apercu du personnage, categories sous forme d'onglets/segments avec icones, grille d'options, swatches de couleur.
- Garder une ergonomie mobile propre : apercu visible, options scrollables, boutons en bas, aucune superposition.
- Garder une ergonomie desktop proche d'un editeur : apercu a gauche ou au centre, options a droite ou en bas selon la place.
- Ne pas utiliser de longs textes explicatifs dans l'UI ; les icones, libelles courts et etats selected doivent porter l'information.
- Conserver la langue d'interface choisie dans le setup.
- Garder les textes courts et utiles.
- Ne pas réintroduire de header avec titre/description de page.
- Garder `Paramètres`, notifications et thème aux emplacements actuels.
- Conserver les animations actuelles sobres via Framer Motion et respecter `MotionConfig reducedMotion="user"`.
- Lancer lint, typecheck et build.
- Mettre a jour les docs.

Critere d'acceptation :

- L'application demarre localement.
- Le build passe.
- L'utilisateur peut personnaliser un personnage de facon complete avec les categories disponibles : corps/tenue, tete/cheveux, visage, pilosite, accessoires, couleurs et posture si activee.
- Les couleurs principales du personnage sont configurables.
- Le choix complet est sauvegarde localement dans le profil invite.
- L'avatar de profil dans la sidebar cadre la tete, pas le corps entier.
- Les chemins d'assets restent centralises.
- La documentation indique clairement l'etape suivante.

Hors scope :

- Index OpenMoji.
- Exercices.
- Diagnostic complet.
- Serveur.
- XP, streak, social, messagerie et mini-jeux.

## Ensuite

### Etape 6 - Integration OpenMoji et recherche d'icones

Statut : en attente.

Objectif : rendre les icones OpenMoji facilement retrouvables par le code et l'IA.
