# Roadmap

## Vision

Classyc est une application web moderne pour apprendre le francais, l'anglais ou le chinois avec un onboarding simple, une progression motivante, des exercices courts, des personnages, une dimension sociale et des mini-jeux. L'experience doit rester legere au premier contact, puis s'enrichir progressivement.

## Principes de progression

- Une etape = un objectif clair, livrable et verifiable.
- `nextstepproject` lance uniquement la prochaine etape.
- Le feedback utilisateur corrige l'etape en cours avant tout avancement.
- Les decisions et problemes importants sont documentes au fil de l'eau.
- Les fonctionnalites sociales, serveur et mini-jeux sont preparees par l'architecture avant d'etre terminees.

## Etapes

### Etape 0 - Fondations de pilotage

Statut : terminee.

Livrables :

- `AGENTS.md`
- dossier `docs/`
- roadmap, etat courant, decisions techniques, problemes resolus, prochaines etapes
- inventaire initial des assets

### Etape 1 - Setup technique et squelette projet

Statut : terminee.

Objectif : creer une base applicative propre sans implementer tout le produit.

Livrables prevus :

- workspace web moderne
- TypeScript strict
- structure modulaire
- theme clair/sombre prepare
- shell minimal de l'application
- scripts de dev/build/lint
- docs mises a jour

Hors scope :

- onboarding complet
- exercices reels
- serveur complet
- messagerie

### Etape 2 - UI shell moderne

Statut : terminee.

Objectif : poser l'interface principale responsive avec navigation minimale.

Livrables prevus :

- layout mobile/desktop
- theme clair/sombre fonctionnel
- systeme de tokens visuels
- navigation principale prevue pour apprentissage, profil, amis et messages
- animations de base sobres

### Etape 3 - Onboarding initial

Statut : prochaine.

Objectif : construire le premier parcours utilisateur sans complexite inutile.

Livrables prevus :

- choix de la langue de l'utilisateur : francais, anglais, chinois
- bouton `J'ai deja un compte`
- saisie du prenom
- choix de la langue a apprendre
- etat invite sauvegarde localement

### Etape 4 - Integration Open Peeps

Objectif : afficher des personnages Open Peeps dans l'onboarding.

Livrables prevus :

- galerie de personnages
- selection persistante
- chemins d'assets centralises
- fallback si un asset manque

### Etape 5 - Personnalisation simple du personnage

Objectif : ajouter quelques options de personnalisation sans systeme trop lourd.

Livrables prevus :

- variantes simples : posture, couleur/accent, style choisi selon assets disponibles
- apercu fluide
- sauvegarde dans le profil invite

### Etape 6 - Integration OpenMoji et recherche d'icones

Objectif : rendre les icones OpenMoji facilement retrouvables par le code et l'IA.

Livrables prevus :

- index local base sur `Openmoji/openmoji.json`
- recherche par tags, annotation, groupe et hexcode
- helper de resolution vers `Openmoji/icons/{hexcode}.png`
- exemples pour niveaux, exercices et UI

### Etape 7 - Systeme de niveaux campagne

Objectif : creer une carte de progression campagne extensible.

Livrables prevus :

- modele de niveau campagne
- etats verrouille, disponible, termine
- premier niveau campagne avec bonus `1.5x`
- tooltip/tap : `1.5x d'XP gagne en plus`
- preparation du streak/flamme

### Etape 8 - Systeme de niveaux journaliers

Objectif : ajouter des niveaux quotidiens variables.

Livrables prevus :

- modele de niveau journalier
- difficulty tiers
- premier niveau journalier avec bonus `1.5x`
- rotation locale de contenu mockee

### Etape 9 - Moteur d'exercices

Objectif : creer une base commune pour plusieurs types d'exercices.

Livrables prevus :

- types d'exercice : choix multiple, completer, vrai/faux, lecture + questions
- correction, feedback, score et XP potentielle
- UI d'exercice responsive

### Etape 10 - Premiers exercices francais

Objectif : livrer un premier contenu jouable en francais.

Contenus initiaux :

- `et` / `est`
- `savoir` / `connaitre`
- conjugaison simple
- lecture courte + oui/non

### Etape 11 - Premiers exercices anglais

Objectif : livrer un premier contenu jouable en anglais.

Contenus initiaux :

- vocabulaire courant
- grammaire simple
- comprehension de phrase
- phrases a completer

### Etape 12 - Premiers exercices chinois et prononciation

Objectif : poser les bases chinois avec support pinyin.

Livrables prevus :

- caracteres simples
- pinyin dans le modele de donnees
- reconnaissance caractere/sens
- pronunciation hint au hover et tap long

### Etape 13 - XP, progression et streak

Objectif : rendre la progression motivante et coherente.

Livrables prevus :

- XP local
- niveaux utilisateur
- streak/flamme sur niveaux campagne
- resume de progression
- persistence invite

### Etape 14 - Mode serveur et comptes

Objectif : preparer la synchronisation reelle.

Livrables prevus :

- API serveur
- comptes
- connexion/creation
- migration invite vers compte
- separation claire client/serveur

### Etape 15 - Profil et leaderboard

Objectif : creer la couche sociale passive.

Livrables prevus :

- profil utilisateur
- statistiques
- leaderboard
- reglages de confidentialite de base

### Etape 16 - Amis

Objectif : permettre les relations sociales.

Livrables prevus :

- recherche/ajout d'amis
- demandes entrantes/sortantes
- liste d'amis
- statuts simples

### Etape 17 - Messagerie moderne

Objectif : construire une messagerie fluide entre amis.

Livrables prevus :

- conversations
- messages envoyes/recus
- indicateurs `vu a l'instant`, `vu il y a ...`
- indicateur `est en train d'ecrire`
- emojis
- UX mobile type application moderne

### Etape 18 - Architecture mini-jeux

Objectif : preparer des jeux extensibles dans la messagerie.

Livrables prevus :

- registre de mini-jeux
- modele de session de jeu entre amis
- hooks UI dans la messagerie
- premier squelette `Draw Battle`

### Etape 19 - Draw Battle jouable

Objectif : rendre le premier mini-jeu utilisable.

Livrables prevus :

- canvas de dessin
- mot a faire deviner selon la langue apprise
- tour de jeu
- saisie de reponse
- score simple

### Etape 20 - Polish UX/UI, animations et optimisation

Objectif : renforcer la qualite percue.

Livrables prevus :

- audit responsive
- animations micro-interactions
- performance assets
- accessibilite
- nettoyage technique

## Recherche internet et IA

Les niveaux qui demandent des exercices realistes issus de recherches internet seront traites plus tard comme un systeme encadre :

- sources documentees quand une recherche est faite
- contenu pedagogique valide avant affichage
- separation entre generation IA, moderation et rendu utilisateur
- fallback local si la recherche n'est pas disponible
