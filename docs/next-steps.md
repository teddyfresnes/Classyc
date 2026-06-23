# Prochaines etapes

## Protocole

- Si l'utilisateur tape `nextstepproject`, executer uniquement la premiere etape marquee `prochaine`.
- Si l'utilisateur donne un feedback, corriger l'etape actuelle et ne pas avancer.
- Apres chaque etape, mettre a jour ce fichier et [current-state.md](current-state.md).

## Etape actuelle

Etape 12 - Premiers exercices chinois et prononciation.

Statut : terminee.

Derniere etape appliquee :

- Correction feedback exercices approfondie appliquee le 2026-06-23 : le bouton `Recommencer`/`Rejouer` est retire, `Valider` devient `Continuer` ou `Terminer`, et le feedback est affiche pres du bouton.
- `ExerciseDeck` utilise maintenant une file de session : une reponse fausse ou partielle remet l'exercice en fin de lecon au lieu de bloquer ou de relancer toute la session.
- `ExercisePreview` expose des etats visuels forts : selection bleue, bonne reponse verte, erreur rouge, verrouillage apres validation.
- Le matching donne un feedback en temps reel par paire, annule la selection si l'utilisateur reclique sur l'element gauche actif, et conserve les associations visibles.
- La premiere lecon campagne est generee selon la langue apprise et la langue d'interface : consignes, boutons et feedback dans la langue utilisateur ; mots/phrases d'exercice dans la langue apprise.
- Les illustrations OpenMoji de la premiere lecon evitent l'icone de priere pour `merci` et privilegient les pictos directs (`salut`, `oui`, `non`, personnage, lecture).
- Le profil invite local ajoute `campaignLevels` et `completedLessons`; les anciens profils sont normalises au chargement.
- Chaque niveau campagne porte une base de 3 paliers. Finir la lecon du niveau 1 donne +10 XP et avance un palier jusqu'a 3/3 ; une quete journaliere donne +10 XP une seule fois par identifiant.
- La map affiche les paliers par trois pips sous les pastilles de niveau.
- Verification Edge headless ciblee : consigne francaise, absence de bouton restart, mauvaise reponse rouge + bonne reponse verte, bouton `Continuer`, matching annulable et rouge en cas d'erreur, compteur `1 a revoir`.
- Verification finale : `npm run typecheck`, `npm run lint`, `npm run build` et `git diff --check` OK. Build avec l'avertissement Vite connu sur le bundle volumineux.
- Limite de verification : le script CDP de parcours complet est devenu instable pendant la fin de lecon ; refaire une verification visuelle complete de l'ecran final avec Playwright dedie ou manuellement si possible.

- Correction feedback UX exercices appliquee : les routes `/exercises/*` et `/daily/*` utilisent un shell minimal sans sidebar, sans header lourd et sans navigation mobile.
- `packages/shared/src/index.ts` et `exercise-engine.ts` ajoutent les types jouables `matching`, `imageChoice` et `wordOrder`, en plus des types existants.
- `ExercisePreview` rend les illustrations OpenMoji, les associations, les choix image, l'ordre des mots et la lecture ; les labels techniques et XP potentielles ne sont plus visibles dans l'exercice.
- `ExerciseDeck` affiche une progression de lecon et un ecran de fin ; depuis le feedback du 2026-06-23, il modifie aussi XP locale et paliers campagne de facon controlee.
- La premiere lecon campagne francais/anglais/chinois part de zero : salutations, merci, au revoir, oui/non, presentation simple, repetition par plusieurs formes.
- Les contenus plus avances ou de revision (`et`/`est`/`es`, conjugaison, grammaire, pinyin/revision ciblee) sont deplaces dans de vrais decks journaliers via `daily-exercises.ts`.
- Les quetes journalieres sont cliquables, ouvrent `/daily/{dailyLevelId}` et affichent leur difficulte (`Facile`, `Moyen`, `Difficile`) en bas de carte.
- La campagne repart de zero visuellement : niveau 1 `available`, aucun niveau `completed`, niveaux 2 a 7 verrouilles.
- Verification Chrome headless desktop/mobile : clic niveau 1 vers `/exercises/en`, aucun shell lourd en exercice, `1/8`, aucun label type/XP, OpenMoji rendu, matching au second exercice, quete journaliere vers `/daily/daily-sounds-2026-06-22`, mobile 390x844 sans overflow horizontal.
- `npm run lint`, `npm run typecheck`, `npm run build` OK. Build avec l'avertissement Vite connu sur le bundle volumineux.

Historique utile conserve de l'Etape 10 :

- `apps/web/src/features/exercises/french-exercises.ts` ajoute un premier lot de 5 exercices francais.
- Les contenus couvrent `et` / `est`, `savoir` / `connaitre`, conjugaison simple de `etre`, et lecture courte avec questions oui/non.
- `apps/web/src/features/exercises/FrenchExerciseDeck.tsx` rendait ces exercices jouables avec score et XP potentielle, sans toucher aux XP reels, au streak ou a la progression persistante.
- A l'Etape 10, la route directe `/exercises/fr` servait seulement a verifier le deck ; depuis le feedback de l'Etape 12, le niveau 1 lance le deck de la langue apprise.
- Les niveaux campagne 2+ et les quetes journalieres restent non cliquables.
- Verification Chrome headless desktop/mobile : route `/exercises/fr` OK, deck `1/5`, premier exercice jouable, validation correcte, aucun overflow horizontal.
- Verification runtime ciblee du contenu francais : les reponses attendues corrigent les 5 exercices, dont lecture `2/2`.
- `npm run lint`, `npm run typecheck`, `npm run build` et `git diff --check` OK. Build avec l'avertissement Vite connu sur le bundle volumineux.

Historique utile conserve de l'Etape 9 :

- `packages/shared/src/index.ts` expose `LearningExercise`, `ExerciseAnswer`, `ExerciseEvaluation` et les types `multipleChoice`, `fillBlank`, `trueFalse`, `readingComprehension`.
- `apps/web/src/features/exercises/exercise-engine.ts` centralise la correction mockee, le score, le feedback et les XP potentielles, sans modifier la progression reelle.
- `apps/web/src/features/exercises/mock-exercises.ts` fournit une source mockee couvrant les quatre types d'exercices, sans contenu pedagogique final.
- `apps/web/src/features/exercises/ExercisePreview.tsx` fournit une base UI responsive exportee par `apps/web/src/features/exercises/index.ts`.
- L'UI d'exercice reste accessible depuis le code mais n'est pas branchee a la map, aux quetes journalieres, aux XP reels, au streak ou a la persistence.
- Verification runtime ciblee du moteur : les reponses mockees correctes donnent les scores attendus, dont lecture `2/2`.
- `npm run lint`, `npm run typecheck`, `npm run build` et `git diff --check` OK. Build avec l'avertissement Vite connu sur le bundle volumineux.

Historique utile conserve de l'Etape 8 :

- `packages/shared/src/index.ts` expose `DailyLevel`, `DailyLevelDifficultyTier` et `DailyLevelReward`.
- `apps/web/src/features/learning/daily-levels.ts` centralise les templates journaliers, la rotation locale par date, les helpers de reward et les previews de quetes.
- Les quetes journalieres de `Apprendre` sont derivees de `createDailyQuests`, plus de placeholders libres dans `shell-content.ts`.
- Les difficulty tiers disponibles sont `warmup`, `standard`, `challenge`.
- Le premier niveau journalier du jour porte un reward `xpMultiplier` `1.5` et affiche le badge `1.5x`.
- Les cartes de quetes restent informatives : pas de clic, pas de hover jouable, pas d'exercice lance.
- Verification Chrome headless desktop/mobile : deux quetes journalieres, un seul badge `1.5x`, curseur neutre, aucun niveau campagne `available`.
- `npm run lint`, `npm run typecheck`, `npm run build` et `git diff --check` OK. Build avec l'avertissement Vite connu sur le bundle volumineux.

Historique utile conserve de l'Etape 7 :

- `packages/shared/src/index.ts` expose `CampaignLevel`, `CampaignLevelState`, `CampaignLevelReward` avec etats `locked`, `available`, `completed`.
- `apps/web/src/features/learning/campaign-levels.ts` centralise la source de 7 niveaux campagne, leurs coordonnees SVG, le chemin de route et les helpers de libelle/progression.
- La map `Apprendre` utilise les niveaux campagne au lieu des anciennes donnees preview de `shell-content.ts`.
- Le bonus `1.5x` est porte par le reward `xpMultiplier` du niveau 1 et expose le libelle/tooltip `1.5x d'XP gagne en plus`.
- Les etats visibles sont : niveau 1 `completed`, niveaux 2 a 7 `locked`; le niveau suivant n'est pas mis en avant tant qu'il n'est pas réellement accessible.
- Les niveaux preparent des `openMojiHexcode` optionnels sans afficher d'icones sur la map.
- Le SVG unique route + pastilles est conserve ; la route de progression ne met pas en avant le niveau 2 tant qu'aucune action reelle n'existe.
- Correction feedback Etape 7 : les pastilles n'utilisent plus de curseur cliquable par defaut ; seul un futur etat vraiment accessible pourra le remettre.
- Verification Chrome headless desktop/mobile : 7 noeuds, etats attendus, badge `1.5x`, captures visuelles OK.
- `npm run lint`, `npm run typecheck`, `npm run build` et `git diff --check` OK. Build avec l'avertissement Vite connu sur le bundle volumineux.

Historique utile conserve de l'Etape 6 :

- `apps/web/src/assets/openmoji.ts` centralise l'index OpenMoji depuis `Openmoji/openmoji.json`.
- Les chemins PNG sont resolus via `resolveOpenMojiIconSrc(hexcode)` vers `Openmoji/icons/{hexcode}.png`.
- `searchOpenMoji(query, { limit })` cherche dans `annotation`, `tags`, `openmoji_tags`, `group`, `subgroups` et `hexcode`, avec normalisation casse/accents/separateurs.
- Le resultat public reste stable : `hexcode`, `label`, `tags`, `src`.
- `openMojiUseCaseExamples` donne des exemples pour niveaux, exercices et UI, sans brancher de vraies fonctionnalites.
- Verification ciblee via Vite SSR : 4495 entrees indexees, recherches `fire`, `target`, `bell` et `1f600` OK.
- `npm run lint`, `npm run typecheck`, `npm run build` et `git diff --check` OK. Build avec l'avertissement Vite connu sur le bundle volumineux.

Historique utile conserve de l'Etape 5 :

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
- Le bonus `1.5x` peut apparaitre uniquement comme propriete `reward` d'un vrai niveau campagne ou journalier ; ne pas l'ajouter comme decoration libre.
- Les items selected de sidebar gardent le texte blanc.
- Ne pas remettre le bouton `Suivant` dans le ruban tant qu'il n'a pas de vraie action.
- Sur desktop, garder le scroll de la colonne map separe du scroll des quetes.
- Animations sobres via Framer Motion et `MotionConfig reducedMotion="user"`.
- Le setup conserve des actions uniformes entre les etapes : boutons en bas, meme style primaire/secondaire.
- Priorite forte aux futures implementations : retirer les textes secondaires non necessaires et laisser les icones/etats visuels porter l'information quand ils suffisent.

## Prochaine

### Etape 13 - Streak, niveau utilisateur et progression avancee

Statut : prochaine.

Objectif : completer la motivation locale sans serveur, en s'appuyant sur les +10 XP et les paliers de niveau deja ajoutes au feedback exercices.

Taches prevues :

- Verifier l'etat du workspace.
- Lire les docs de reprise.
- Relire les decisions sur le profil invite, les niveaux, les exercices et les garde-fous UX.
- Relire la base ajoutee le 2026-06-23 : `campaignLevels`, `completedLessons`, +10 XP et paliers 3/3.
- Ajouter un modele local pour niveau utilisateur, seuils d'XP, streak et dernier jour actif.
- Brancher la fin de lecon sur une mise a jour streak controlee, sans double-compter une meme journee.
- Mettre a jour le header XP/streak et les previews de stats apres fin de lecon.
- Verifier que les paliers niveau campagne ne double-comptent pas au-dela de 3/3.
- Refaire une verification visuelle complete de l'ecran final de lecon, idealement avec Playwright ou un script CDP plus stable.
- Eviter toute synchronisation serveur ou compte.
- Garder les niveaux 2+ non interactifs tant qu'aucun contenu pedagogique dedie n'existe.
- Lancer lint, typecheck et build.
- Mettre a jour les docs.

Critere d'acceptation :

- Finir une lecon met a jour XP, niveau utilisateur et streak local de facon coherente.
- Le systeme ne double-compte pas une meme lecon/journee sans controle explicite.
- Le header et les surfaces de stats refletent la progression locale.
- La fin de lecon est verifiee visuellement.
- Les donnees restent locales et migrables plus tard.
- L'application build toujours.
- La documentation indique clairement l'etape suivante.

Hors scope :

- Serveur et comptes.
- Leaderboard, amis, messages.
- Progression pedagogique complete de tous les niveaux.
- Diagnostic complet.
- Mini-jeux.
