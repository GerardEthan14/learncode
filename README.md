# 🕹️ CODEQUEST

Apprends les bases du **développement web** (HTML / CSS / JS) sous forme de **jeu rétro arcade**.

Projet perso pour tester l'envie de faire du code avant des cours du soir — orienté un peu **backend** (logique JS).

## ▶️ Lancer le jeu

Aucune installation. Ouvre simplement **`index.html`** dans ton navigateur.

## 🎮 Ce qui est dispo (livrable 1 — le socle)

- Écran d'accueil **rétro** : logo glitch, effet CRT (scanlines), grille néon, étoiles.
- Menu : **Jouer**, **Mes stats**, **C'est quoi ?**
- Sélection des **3 mondes** (HTML / CSS / JS) avec déblocage progressif.
- **Stats sauvegardées** dans le navigateur : XP, niveau, précision, combo, badges.
- **Sons 8-bit** générés à la volée (Web Audio), bouton pour couper le son.

## 🛠️ À venir

- **Monde HTML** — construire des pages, balise par balise.
- **Monde CSS** — style & couleurs.
- **Monde JS / Logique** — QCM + **mini-éditeur** qui exécute ton code.
- Combos, montées de niveau, déblocage de badges.

## 📁 Structure

```
index.html
assets/
  css/style.css      → thème rétro + effet CRT
  js/audio.js        → moteur de son 8-bit (Web Audio)
  js/state.js        → progression du joueur (localStorage)
  js/game.js         → navigation, mondes, HUD, stats
```
