# AGENTS.md

## Role du projet

Codex agit comme developpeur principal du projet Classyc. Le projet doit avancer par petites etapes controlees, avec une documentation tenue a jour pour permettre une reprise fiable a chaque session.

## Protocole `nextstepproject`

- Le mot-cle `nextstepproject` signifie : lire l'etat du projet, relire les docs utiles, puis realiser uniquement la prochaine etape prevue dans [docs/next-steps.md](docs/next-steps.md).
- Si l'utilisateur donne un feedback au lieu de `nextstepproject`, corriger ou ameliorer l'etape actuelle avant de passer a la suite.
- Ne pas implementer plusieurs grosses fonctionnalites dans un meme tour, meme si elles sont deja prevues dans la roadmap.
- A la fin d'une etape importante, mettre a jour les docs concernees.

## Checklist avant de coder

Avant chaque etape de developpement :

1. Lire ce fichier.
2. Lire [docs/current-state.md](docs/current-state.md).
3. Lire [docs/next-steps.md](docs/next-steps.md).
4. Lire [docs/roadmap.md](docs/roadmap.md) si la limite de l'etape est floue.
5. Verifier l'etat du workspace et les fichiers deja presents.
6. Inspecter les assets ou modules concernes avant de les utiliser.

## Regles techniques

- Architecture modulaire, lisible et maintenable.
- Pas de code spaghetti, pas de gros fichier fourre-tout.
- Respecter les conventions existantes des que le projet en a.
- Utiliser des types et modeles de domaine clairs pour les langues, profils, progression, exercices, XP, streak, amis et messages.
- Preferer des composants UI petits, composables et testables.
- Limiter les commentaires dans le code aux passages qui ont vraiment besoin d'explication.
- Utiliser des tabs pour l'indentation quand le formatteur et le langage le permettent.
- Ne pas modifier les assets source sans raison explicite.
- Ignorer les dossiers `__MACOSX` et fichiers metadata generes par macOS.

## Regles UX/UI

- L'application doit ouvrir sur une experience utile, pas une landing page marketing.
- Priorite aux interfaces claires, calmes, peu chargees, avec des icones quand elles rendent l'action evidente.
- Chaque ecran doit etre responsive desktop et mobile.
- Le theme clair/sombre doit etre pense comme une fondation, pas ajoute tardivement.
- Les animations doivent guider l'utilisateur, pas distraire.
- Les composants ne doivent pas se chevaucher et le texte doit tenir dans ses conteneurs.
- Les parcours onboarding, progression et exercices doivent rester simples au premier contact.

## Assets

- Open Peeps : utiliser les assets dans `Flat Assets/Flat Assets/` pour le choix et la personnalisation du personnage.
- OpenMoji : utiliser `Openmoji/openmoji.json` et `Openmoji/icons/` pour creer un systeme de recherche d'icones.
- Ne pas coder des chemins magiques partout : centraliser les chemins et l'indexation des assets dans un module dedie quand l'application sera scaffoldée.

## Documentation obligatoire

- [docs/roadmap.md](docs/roadmap.md) : plan global par etapes.
- [docs/current-state.md](docs/current-state.md) : etat court et factuel du projet.
- [docs/technical-decisions.md](docs/technical-decisions.md) : decisions d'architecture.
- [docs/resolved-problems.md](docs/resolved-problems.md) : problemes rencontres et solutions.
- [docs/next-steps.md](docs/next-steps.md) : prochaine etape executable.
- [docs/asset-inventory.md](docs/asset-inventory.md) : reperes sur les assets disponibles.

Si une resolution prend longtemps ou demande un contournement non evident, documenter le probleme dans [docs/resolved-problems.md](docs/resolved-problems.md).

## Verification

- Quand une application existe, lancer au minimum le lint/build ou les tests pertinents apres une etape de code.
- Pour les changements frontend significatifs, ouvrir l'application dans le navigateur disponible et verifier desktop/mobile quand c'est possible.
- Si une verification n'a pas pu etre faite, l'indiquer clairement dans le compte rendu final.
