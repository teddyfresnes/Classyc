# Prochaines etapes

## Protocole

- Si l'utilisateur tape `nextstepproject`, executer uniquement la premiere etape marquee `prochaine`.
- Si l'utilisateur donne un feedback, corriger l'etape actuelle et ne pas avancer.
- Apres chaque etape, mettre a jour ce fichier et [current-state.md](current-state.md).

## Etape actuelle

Etape 1 - Setup technique et squelette projet.

Statut : terminee.

## Prochaine

### Etape 2 - UI shell moderne

Statut : prochaine.

Objectif : enrichir le shell avec une interface plus aboutie, responsive et preparee pour les futurs parcours sans encore implementer l'onboarding complet.

Taches prevues :

- Verifier l'etat du workspace.
- Lire les docs de reprise.
- Ameliorer le layout desktop/mobile du shell existant.
- Stabiliser les zones principales : navigation, contenu apprentissage, progression, acces profil/social.
- Renforcer les tokens visuels clair/sombre.
- Ajouter des micro-interactions sobres.
- Preparer les emplacements propres pour onboarding, niveaux, profil, amis et messages.
- Verifier que le texte ne deborde pas en desktop/mobile.
- Lancer lint/build.
- Mettre a jour les docs.

Critere d'acceptation :

- L'application demarre localement.
- Le build passe.
- Le shell est plus mature et coherent sur mobile/desktop.
- Le theme clair/sombre reste fonctionnel.
- La documentation indique clairement l'etape suivante.

Hors scope :

- Onboarding complet.
- Personnage Open Peeps.
- Index OpenMoji.
- Exercices.
- Serveur.
- XP, streak, social, messagerie et mini-jeux.

## Ensuite

### Etape 3 - Onboarding initial

Statut : en attente.

Objectif : commencer le parcours utilisateur : langue de l'utilisateur, compte existant, prenom, langue a apprendre.
