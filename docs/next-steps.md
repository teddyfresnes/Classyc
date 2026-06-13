# Prochaines etapes

## Protocole

- Si l'utilisateur tape `nextstepproject`, executer uniquement la premiere etape marquee `prochaine`.
- Si l'utilisateur donne un feedback, corriger l'etape actuelle et ne pas avancer.
- Apres chaque etape, mettre a jour ce fichier et [current-state.md](current-state.md).

## Etape actuelle

Etape 2 - UI shell moderne.

Statut : terminee.

## Prochaine

### Etape 3 - Onboarding initial

Statut : prochaine.

Objectif : commencer le parcours utilisateur sans encore integrer Open Peeps ni les exercices.

Taches prevues :

- Verifier l'etat du workspace.
- Lire les docs de reprise.
- Creer une feature `onboarding` separee du shell.
- Ajouter un etat local minimal pour le profil invite.
- Premier ecran : choisir la langue de l'utilisateur entre francais, anglais et chinois.
- Ajouter l'action `J'ai deja un compte` comme entree preparee, sans authentification serveur.
- Ajouter une etape prenom.
- Ajouter une etape langue a apprendre : francais, anglais ou chinois.
- Enregistrer les choix localement.
- Brancher le shell pour afficher l'etat invite si l'onboarding est termine.
- Garder l'UI simple, mobile-first et theme clair/sombre.
- Lancer lint, typecheck et build.
- Mettre a jour les docs.

Critere d'acceptation :

- L'application demarre localement.
- Le build passe.
- Un nouvel utilisateur voit un onboarding simple.
- Les choix de base sont sauvegardes localement.
- Le shell reste accessible apres completion de l'onboarding.
- La documentation indique clairement l'etape suivante.

Hors scope :

- Personnage Open Peeps.
- Index OpenMoji.
- Exercices.
- Diagnostic complet.
- Serveur.
- XP, streak, social, messagerie et mini-jeux.

## Ensuite

### Etape 4 - Integration Open Peeps

Statut : en attente.

Objectif : afficher des personnages Open Peeps dans l'onboarding.
