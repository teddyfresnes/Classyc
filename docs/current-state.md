# Etat actuel

Date : 2026-06-13

## Statut court

Etape courante : Etape 1 - Setup technique et squelette projet.

Etat : terminee.

Le projet contient maintenant une workspace npm avec une application web React/Vite dans `apps/web`, un package partage dans `packages/shared`, un emplacement reserve pour le futur serveur dans `apps/api` et la documentation de pilotage.

## Structure observee

```text
.
├── Flat Assets/
│   ├── Flat Assets/
│   │   ├── Flat Assets/
│   │   ├── Separate Atoms/
│   │   └── Templates/
│   └── __MACOSX/
├── Openmoji/
│   ├── icons/
│   └── openmoji.json
├── apps/
│   ├── api/
│   └── web/
├── packages/
│   └── shared/
├── AGENTS.md
├── docs/
├── package.json
└── tsconfig.base.json
```

## Assets confirmes

- Open Peeps : `Flat Assets/Flat Assets/`
- Templates de personnages : `Flat Assets/Flat Assets/Templates/`
- Atomes de personnalisation : `Flat Assets/Flat Assets/Separate Atoms/`
- OpenMoji JSON : `Openmoji/openmoji.json`
- OpenMoji PNG : `Openmoji/icons/`

Note : l'utilisateur avait mentionne `assets/Flat assets/` et `assets/openmoji/`, mais les dossiers presents sont directement a la racine et nommes `Flat Assets/` et `Openmoji/`.

## Ce qui existe

- Documentation de travail initiale.
- Roadmap progressive.
- Decisions techniques proposees pour la prochaine etape.
- Inventaire initial des assets.
- Workspace npm.
- Application web React + TypeScript + Vite.
- Tailwind CSS via plugin Vite.
- Theme clair/sombre via variables CSS.
- Navigation shell responsive desktop/mobile.
- Package partage `@classyc/shared` avec premiers types de domaine.
- Dossier `apps/api` reserve sans implementation serveur.

## Ce qui n'existe pas encore

- Serveur/API.
- Mode invite.
- Onboarding.
- Systeme de niveaux.
- Exercices.
- XP, streak, amis, messagerie ou mini-jeux.

## Verification du 2026-06-13

- `npm install` : OK apres remplacement de `workspace:*` par `file:../../packages/shared`.
- `npm run lint` : OK.
- `npm run typecheck` : OK.
- `npm run build` : OK.
- Serveur local : OK sur `http://127.0.0.1:5173/`.
- Verification HTTP : OK, status 200.
- Verification navigateur integre : non disponible dans cette session, aucun navigateur `iab` liste par le plugin Browser.

## Reprise

Si l'utilisateur tape `nextstepproject`, realiser uniquement l'Etape 2 de [docs/next-steps.md](next-steps.md) : UI shell moderne.
