# 🕹️ CODEQUEST

Apprends les bases du **développement web** (HTML / CSS / JS) sous forme de **jeu rétro arcade**.

Projet perso pour tester l'envie de faire du code avant des cours du soir — orienté un peu **backend** (logique JS).

## ▶️ Lancer le jeu

Aucune installation. Ouvre simplement **`index.html`** dans ton navigateur.

## 🎮 Ce qui est dispo (livrable 1 — le socle)

- **Profils** : au lancement, tu entres ton nom (ou tu choisis un profil existant). Chaque profil a ses propres stats.
- Écran d'accueil **rétro** : logo glitch, effet CRT (scanlines), grille néon, étoiles.
- Menu : **Jouer**, **Mes stats**, **C'est quoi ?**, **Changer de profil**.
- Sélection des **3 mondes** (HTML / CSS / JS) avec déblocage progressif.
- **Stats sauvegardées par profil** dans le navigateur : XP, niveau, précision, combo, badges.
- **Sons 8-bit** générés à la volée (Web Audio), bouton pour couper le son.

## ✅ Monde JS / LOGIQUE — complet

Parcours en **7 chapitres** (≈ 27 défis) : leçon → défi → feedback → bilan.
1. **Les bases** — variables, let/const, opérations, types, fonctions
2. **Le texte** — `.length`, gabarits `${}`, construire des chaînes
3. **Les décisions** — `===`, if/else, else if, `&&` / `||`
4. **Les boucles** — for, while, accumulation, factorielle
5. **Les tableaux** — indices, length/push, parcours, somme, max
6. **Les objets** — propriétés, lecture, description
7. **Boss final** — compter, inverser une chaîne, nombre premier

Mécaniques : **QCM** "que renvoie ce code ?", **mini-éditeur** (code exécuté
dans un worker isolé avec chrono anti boucle infinie), bouton **voir la
solution**, niveaux de **révision**, combos, XP, montées de niveau, badges.

## 🛠️ À venir

- **Monde HTML** — construire des pages, balise par balise.
- **Monde CSS** — style & couleurs.

## 📁 Structure

```
index.html
assets/
  css/style.css      → thème rétro + effet CRT
  js/audio.js        → moteur de son 8-bit (Web Audio)
  js/state.js        → progression du joueur (localStorage)
  js/game.js         → navigation, mondes, HUD, stats
```
