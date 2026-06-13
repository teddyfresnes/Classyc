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

### Etape 5 - Personnalisation simple du personnage

Statut : prochaine.

Objectif : ajouter quelques options simples autour du personnage choisi sans creer un systeme de personnalisation lourd.

Taches prevues :

- Verifier l'etat du workspace.
- Lire les docs de reprise.
- Inspecter les assets Open Peeps utiles dans `Flat Assets/Flat Assets/Separate Atoms/` et les templates deja indexes.
- Ignorer `__MACOSX` et les fichiers `._*`.
- Choisir une personnalisation minimale et stable selon les assets vraiment disponibles.
- Reutiliser `apps/web/src/assets/open-peeps.ts` ou l'etendre sans disperser les chemins d'assets.
- Ajouter les champs necessaires au profil invite seulement si l'option est reellement sauvegardee.
- Garder l'etape personnage simple, responsive et coherente avec le setup actuel.
- Ne pas transformer l'etape en editeur avance.
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
- L'utilisateur peut choisir au moins une option simple de personnage.
- Le choix reste sauvegarde localement si l'option modifie le profil.
- Les chemins d'assets restent centralises.
- La documentation indique clairement l'etape suivante.

Hors scope :

- Editeur avance du personnage.
- Index OpenMoji.
- Exercices.
- Diagnostic complet.
- Serveur.
- XP, streak, social, messagerie et mini-jeux.

## Ensuite

### Etape 6 - Integration OpenMoji et recherche d'icones

Statut : en attente.

Objectif : rendre les icones OpenMoji facilement retrouvables par le code et l'IA.
