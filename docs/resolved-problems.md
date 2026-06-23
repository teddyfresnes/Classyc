# Problemes resolus

## 2026-06-13 - Chemins d'assets differents de la description

Probleme : la demande mentionne `assets/Flat assets/` et `assets/openmoji/`, mais le workspace contient `Flat Assets/` et `Openmoji/` directement a la racine.

Resolution : documenter les chemins reels et prevoir une centralisation des chemins d'assets dans le code au lieu de disperser des chemins en dur.

## 2026-06-13 - Dossiers metadata macOS

Probleme : les assets Open Peeps contiennent des dossiers `__MACOSX` et fichiers metadata qui ne doivent pas etre utilises par l'application.

Resolution : ajouter une regle de projet pour les ignorer. Les futurs scripts d'indexation devront filtrer `__MACOSX` et les fichiers commencant par `._`.

## 2026-06-13 - Affichage console OpenMoji

Probleme : la lecture console de `Openmoji/openmoji.json` affiche certains emojis avec un rendu degrade, probablement lie a l'encodage de sortie du terminal.

Resolution : ne pas se baser sur l'affichage console des emojis. Utiliser les champs stables comme `hexcode`, `annotation`, `tags`, `group` et les fichiers PNG dans `Openmoji/icons/`.

## 2026-06-13 - `npm install` refuse `workspace:*`

Probleme : la premiere configuration utilisait `@classyc/shared` avec la version `workspace:*`, mais `npm install` a echoue avec `EUNSUPPORTEDPROTOCOL`.

Resolution : remplacer la dependance par `file:../../packages/shared` dans `apps/web/package.json`. L'installation passe et les scripts de workspace restent fonctionnels.

## 2026-06-13 - Audit npm sur Vite/esbuild

Probleme : apres l'installation initiale, `npm audit --omit=dev` signalait deux vulnerabilites hautes via Vite/esbuild et proposait Vite 8.

Resolution : mettre a jour Vite et `@vitejs/plugin-react` vers les versions actuelles. `npm install` indique ensuite `found 0 vulnerabilities`.

## 2026-06-13 - Navigateur integre indisponible

Probleme : le plugin Browser ne liste aucune cible disponible dans cette session, donc la verification visuelle via navigateur integre n'a pas pu etre faite.

Resolution : verifier le build, le typecheck, le lint, le serveur Vite, la reponse HTTP 200 et les logs d'erreur. Retenter le navigateur integre aux prochaines etapes.

Mise a jour : retente apres la correction UX du shell. `agent.browsers.list()` retourne encore `[]`. Les checks automatiques et HTTP restent la verification disponible.

## 2026-06-14 - Recolorisation Open Peeps trop globale

Probleme : certains atomes Open Peeps reutilisent les memes fills SVG pour des roles differents. Des cheveux comme `Short 4`, `No Hair 3`, `Mohawk`, `Mohawk 2` ou `Medium Bangs 2` perdaient leur couleur ou affichaient des points de detail trop proches de la peau. Des barbes comme `Full 4` et `Moustache 9` utilisaient aussi `#FFFFFF` comme masse principale. Les couvre-chefs pouvaient etre recolories comme des cheveux, et les visages/accessoires manquaient de contraste en theme sombre.

Resolution : centraliser des helpers de couleur dans `apps/web/src/features/character/open-peep-colors.ts` et appliquer une recolorisation semantique dans `OpenPeepComposer`. Les couvre-chefs restent gris/noir, les cheveux et barbes recoivent un accent de contraste, les visages utilisent une ombre derivee de la peau, les apercus visage/accessoires gardent un fond lisible, et le trait/contour reste noir fixe.

## 2026-06-14 - Tenues sans effet sur les poses debout/assises

Probleme : la categorie `Tenues` modifiait `bodyId`, mais `OpenPeepComposer` ignorait `bodyId` en mode debout ou assis et rendait directement `standingPoseId` ou `sittingPoseId`. Les SVG `pose/standing` et `pose/sitting` contiennent le corps et la tenue dans le meme asset, avec seulement des fills globaux `#FFFFFF` et `#000000`, donc il n'existe pas de couche vetement independante a recomposer proprement.

Resolution : retirer le mapping tenue -> pose, puis retirer aussi la tentative de couche de torse sur les poses car le rendu etait trop approximatif. `bodyId` reste la source de verite de la tenue uniquement pour le buste. Les previews `Tenues` passent par `OpenPeepComposer` en cadrage `outfit` et posture `bust`, tandis que les previews `Poses` reviennent aux assets de pose natifs.

Limite : les SVG `pose/standing` et `pose/sitting` Open Peeps embarquent posture, corps et tenue dans un meme asset avec seulement des fills globaux. Il n'y a donc pas de calque vetement natif parfaitement recomposable pour chaque pose sans dessiner ou modifier de nouveaux assets.

Suite : ne pas tenter de recomposer les tenues `body` sur ces poses sans source separee par calques. Les poses restent rendues comme assets complets.

## 2026-06-14 - Bodies Open Peeps aplatis et recolorisation directe trop fragile

Probleme : les 30 assets `body` Open Peeps locaux ne sont pas structures par couches propres. Plusieurs assets ont un chemin clair unique qui contient a la fois bras, mains, cou et vetement. D'autres ont des chemins composes noirs avec `fill-rule="evenodd"` ou des objets tenus qui partagent le meme sous-chemin que la main. La tentative `open-peep-body-recolor.ts` produisait donc des tenues a moitie colorees, des contours noirs perdus, des zones peau/vetement melangees et des details manquants.

Recherche : la page officielle Open Peeps confirme que le noir/blanc est une base de personnalisation. DiceBear et CSS-Peeps exposent des roles separes (`skin`, `clothes`, `object`) issus d'Open Peeps, ce qui correspond au rendu attendu.

Resolution : supprimer `apps/web/src/features/character/open-peep-body-recolor.ts`, installer `css-peeps`, importer `css-peeps/css-peeps.compat.css`, puis ajouter `apps/web/src/features/character/open-peep-css-peeps.ts` avec un mapping explicite des 30 bodies locaux vers les tokens CSS-Peeps. Les bustes et previews `Tenues` utilisent maintenant `--peep-skin-color`, `--peep-clothes-color` et `--peep-object-color`, tandis que les contours et details noirs viennent des masques de detail CSS-Peeps.

Suite feedback : plusieurs bodies CSS-Peeps gardaient encore leur masse de vetement dans une couche de detail noire (`Turtleneck`, `Sweater Dots`, `Gym Shirt`, `Dress`, etc.). Resolution : declarer par body si ce detail noir represente la couleur principale ou secondaire, recolorer le SVG de detail CSS-Peeps existant a l'execution, puis ajouter un stroke noir sur le meme path pour conserver les contours. Les bodies a deux zones exposent `outfitSecondary` uniquement dans l'UI quand ils en ont besoin.

Mise a jour contours : le stroke noir initial etait trop fin pour plusieurs bodies, donc les contours semblaient prendre la couleur principale ou secondaire. Resolution : renforcer le stroke noir des details recolores, arrondir ses extremites et corriger `Sweater` pour que le vetement principal utilise `outfit` tandis que les taches utilisent `outfitSecondary`.

Mise a jour feedback cas par cas : un stroke global plus fort corrigeait les lignes colorees mais abimait certains details. Resolution : regler les largeurs par body dans `open-peep-css-peeps.ts` : specifique pour `Blazer Black Tee` et `Polka Dot Jacket`, intermediaire pour les bodies signales, plus leger pour `Sweater` afin de garder ses taches. Apres feedback, ces strokes ont ete reduits pour eviter des lignes noires trop epaisses. `Macbook` ajoute aussi une petite couche de peau dans `--peep-body-paint` sous l'objet pour corriger le bras visible, et `Paper` garde la meme structure avec un trait ajuste pour les poignets/manches.

Mise a jour alignement buste hybride 2026-06-21 : le rendu principal combine un corps CSS-Peeps et une tete SVG Open Peeps originale. Les deux sources n'ont pas exactement la meme origine verticale, donc la tete SVG semblait flotter trop haut. Resolution : garder les assets originaux, mais ajouter un offset vertical unique dans `OpenPeepComposer` pour poser la tete sur le buste CSS-Peeps.

Limites : les assets locaux restent trop aplatis pour etre recolorises proprement chemin par chemin. Les poses debout/assises ne sont pas recolorisees par tenue. La correction ne cree pas de nouvelle forme ; elle ne peut donc pas separer des sous-zones qui ne sont pas deja representees par le detail CSS-Peeps.

## 2026-06-13 - Libelle chinois degrade dans TypeScript

Probleme : le libelle natif chinois etait degrade dans la sortie terminal et dans le fichier partage.

Resolution : utiliser des escapes Unicode (`\u4e2d\u6587`) dans `packages/shared/src/index.ts` pour conserver un affichage navigateur correct sans dependre de l'encodage du terminal.

## 2026-06-13 - Textes français sans accents

Problème : plusieurs textes UI avaient été écrits en ASCII (`Francais`, `deja`, `Prenom`, etc.), ce qui donnait une interface française peu professionnelle.

Résolution : centraliser les textes UI dans `apps/web/src/features/i18n/ui-copy.ts` et utiliser les vrais caractères français. Les labels partagés des langues utilisent aussi `Français`.

## 2026-06-13 - Anciennes erreurs HMR Vite dans le log

Problème : `.vite-dev.err.log` contenait d'anciennes erreurs HMR apparues pendant le refactor du shell, alors que `lint`, `typecheck` et `build` passaient.

Résolution : redémarrer proprement le serveur Vite. Les nouveaux logs sont propres et le serveur répond sur `http://127.0.0.1:5173/`.

## 2026-06-13 - Setup trop chargé

Problème : le champ prénom apparaissait sur le même écran que les langues, ce qui chargeait trop le premier setup.

Résolution : séparer le setup en deux temps avec animation courte : langues d'abord, prénom ensuite, retour arrière possible. Le futur choix du personnage deviendra le troisième temps.

## 2026-06-13 - Logs HMR après refactor design

Problème : pendant la correction de palette et de navigation, Vite a gardé des erreurs HMR intermédiaires dans `.vite-dev.err.log`, alors que `lint`, `typecheck` et `build` passaient.

Résolution : arrêter explicitement les processus `npm run dev`/`vite` du projet, supprimer les logs générés, puis relancer Vite. Le serveur répond en HTTP 200 et le log d'erreur frais est vide.

## 2026-06-13 - Learn path trop chargé puis désaligné

Problème : les essais de learn path avec layouts séparés, icônes et libellés provisoires donnaient un rendu brouillon. Les pastilles semblaient ne pas être traversées proprement par la route, les icônes de niveaux étaient jugées trop moches et le faux socle bleu sous les pastilles a été rejeté.

Résolution : abandonner les icônes de niveaux provisoires et le faux relief bleu. Utiliser un SVG unique où la route et les pastilles partagent le même repère, avec des pastilles numérotées simples. Ne réintroduire des chemins plus expressifs qu'à l'étape réelle du système de niveaux.

Mise à jour : le niveau 2 ne doit pas être sélectionné dans la preview et le bonus `1.5x` ne doit pas apparaître avant l'implémentation du vrai système de niveaux. Le texte actif de la sidebar reste blanc.

Mise à jour 2 : les formes décoratives provisoires et le bouton `Suivant` du ruban ont aussi été retirés. Le scroll desktop de la map et des quêtes est séparé.

## 2026-06-22 - Clics rapides motif/couleur de fond

Probleme : dans le createur de personnage, choisir un motif de fond puis une couleur de fond tres rapidement pouvait perdre le motif. Les deux handlers React utilisaient la meme personnalisation du rendu courant ; le second patch de couleur pouvait donc repartir de l'ancien fond avant le rerender.

Resolution : `CharacterCreator` garde une ref `customizationRef` du dernier etat resolu et la met a jour immediatement dans `patchCustomization`. Les patchs imbriques `background` et `colors` sont fusionnes avec cette ref avant d'appeler `onChange`, ce qui preserve les choix rapides faits dans le meme tick.

Verification : Chrome headless via DevTools Protocol confirme que le motif `Pois` et la couleur `#FFF3D8` restent tous les deux appliques et sauvegardes dans `localStorage`.

## 2026-06-22 - Exercices accessibles seulement par route cachee

Probleme : apres l'ajout des premiers exercices francais, le deck etait accessible via `/exercises/fr`, mais la map restait purement informative. Cliquer sur le niveau 1 ne faisait rien, ce qui rendait la fonctionnalite invisible dans l'experience normale.

Resolution : brancher le niveau 1 et le bouton `Jouer` du ruban vers `/exercises/{langue cible}`. Les niveaux 2+ restent verrouilles et non interactifs. Le deck est factorise par langue pour reutiliser le meme lancement avec les contenus francais, anglais et chinois.

Verification : Chrome headless confirme un seul noeud interactif, six niveaux verrouilles, un clic niveau 1 vers `/exercises/en` pour un profil apprenant l'anglais, et aucun overflow horizontal desktop/mobile.

## 2026-06-23 - Verification CDP longue instable sur la fin de lecon

Probleme : pendant la correction profonde de l'UX exercices, les verifications ciblees Edge headless via DevTools Protocol ont bien valide les etats importants du deck, mais les scripts longs de parcours complet sont devenus instables avant l'ecran final. Les sessions CDP ne repondaient plus de facon fiable apres plusieurs interactions rapides.

Resolution : conserver les verifications ciblees reussies pour le flux critique visible (`Valider` -> feedback rouge/vert -> `Continuer`, matching annulable, compteur `1 a revoir`) et documenter la limite. La prochaine passe doit refaire la verification complete de l'ecran final avec un runner plus stable, idealement Playwright installe dans le projet ou un script CDP decoupe en etapes plus courtes.
