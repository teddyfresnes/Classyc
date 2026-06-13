# Prochaines etapes

## Protocole

- Si l'utilisateur tape `nextstepproject`, executer uniquement la premiere etape marquee `prochaine`.
- Si l'utilisateur donne un feedback, corriger l'etape actuelle et ne pas avancer.
- Apres chaque etape, mettre a jour ce fichier et [current-state.md](current-state.md).

## Etape actuelle

Etape 0 - Fondations de pilotage.

Statut : terminee.

## Prochaine

### Etape 1 - Setup technique et squelette projet

Statut : prochaine.

Objectif : creer la base technique de l'application sans lancer les grosses fonctionnalites.

Taches prevues :

- Verifier l'etat du workspace.
- Creer la structure applicative initiale.
- Mettre en place React + TypeScript + Vite pour `apps/web`.
- Preparer une structure modulaire : `app`, `components`, `features`, `domain`, `assets`, `styles`.
- Installer ou configurer les dependances UI essentielles.
- Ajouter un shell minimal responsive avec theme clair/sombre prepare.
- Ajouter les scripts de dev/build/lint.
- Ne pas implementer encore l'onboarding complet.
- Mettre a jour les docs.

Critere d'acceptation :

- L'application demarre localement.
- Le build passe.
- Le shell affiche une base propre et sobre.
- La documentation indique clairement l'etape suivante.

Hors scope :

- Choix complet de langue.
- Personnage Open Peeps.
- Index OpenMoji.
- Exercices.
- Serveur.
- XP, streak, social, messagerie et mini-jeux.

## Ensuite

### Etape 2 - UI shell moderne

Statut : en attente.

Objectif : enrichir le shell avec navigation, responsive reel, themes finalises et micro-interactions de base.

### Etape 3 - Onboarding initial

Statut : en attente.

Objectif : commencer le parcours utilisateur : langue de l'utilisateur, compte existant, prenom, langue a apprendre.
