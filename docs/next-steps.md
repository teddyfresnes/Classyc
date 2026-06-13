# Prochaines etapes

## Protocole

- Si l'utilisateur tape `nextstepproject`, executer uniquement la premiere etape marquee `prochaine`.
- Si l'utilisateur donne un feedback, corriger l'etape actuelle et ne pas avancer.
- Apres chaque etape, mettre a jour ce fichier et [current-state.md](current-state.md).

## Etape actuelle

Etape 3 - Onboarding initial.

Statut : terminee.

Dernier feedback applique :

- Interface principale moins chargée : suppression du titre/description de page dans le header.
- `Paramètres` est une entrée de navigation sous `Messages`.
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

## Prochaine

### Etape 4 - Integration Open Peeps

Statut : prochaine.

Objectif : afficher des personnages Open Peeps dans l'onboarding sans encore faire de personnalisation avancee.

Taches prevues :

- Verifier l'etat du workspace.
- Lire les docs de reprise.
- Inspecter les assets Open Peeps utiles dans `Flat Assets/Flat Assets/Templates/`.
- Ignorer `__MACOSX` et les fichiers `._*`.
- Creer un petit index statique ou helper d'assets pour une premiere galerie.
- Ajouter une etape personnage dans l'onboarding existant.
- Sauvegarder le choix de personnage dans le profil invite.
- Afficher un rappel du personnage choisi dans le shell si pertinent.
- Garder la galerie simple, responsive et sans personnalisation avancee.
- Conserver la langue d'interface choisie dans le setup.
- Garder les textes courts et utiles.
- Ajouter le personnage après l'écran prénom, pas avant les langues.
- Ne pas réintroduire de header avec titre/description de page.
- Garder `Paramètres`, notifications et thème aux emplacements actuels.
- Conserver le style actuel du shell : header sans trait inférieur, badges de progression sans contour dur, sidebar expressive avec selected blanc, learn path sobre sans détails pédagogiques prématurés ni bouton décoratif.
- Lancer lint, typecheck et build.
- Mettre a jour les docs.

Critere d'acceptation :

- L'application demarre localement.
- Le build passe.
- L'onboarding propose quelques personnages Open Peeps.
- Le choix du personnage est sauvegarde localement.
- Les chemins d'assets sont centralises.
- La documentation indique clairement l'etape suivante.

Hors scope :

- Personnalisation avancee du personnage.
- Index OpenMoji.
- Exercices.
- Diagnostic complet.
- Serveur.
- XP, streak, social, messagerie et mini-jeux.

## Ensuite

### Etape 5 - Personnalisation simple du personnage

Statut : en attente.

Objectif : ajouter quelques options simples autour du personnage choisi.
