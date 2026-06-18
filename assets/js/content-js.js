/* =====================================================================
   CODEQUEST — Contenu du Monde JS / LOGIQUE
   Chaque "stage" = une mini-leçon (optionnelle) + un défi.
   Types de défi :
     - 'qcm'    : on montre du code, tu prédis le résultat (choix multiple)
     - 'editor' : tu écris une fonction, on l'exécute et on la teste
   Les stages marqués `review: true` re-testent d'anciens concepts
   (répétition espacée, pour ne pas oublier).
   Enregistré dans window.CQContent.js
   ===================================================================== */
(function () {
  window.CQContent = window.CQContent || {};

  window.CQContent.js = {
    name: 'JS / LOGIQUE',
    icon: '🧠',
    stages: [

      // 1 — Variables
      {
        type: 'qcm',
        lesson: {
          title: 'Les variables',
          body: `Une <b>variable</b> est une boîte qui stocke une valeur.<br>
                 On la crée avec <code>let</code>, et on peut la modifier ensuite.`,
          example: `let age = 20;\nage = age + 1; // age vaut maintenant 21`,
        },
        code: `let x = 5;\nx = x + 3;`,
        question: 'Que vaut x à la fin ?',
        options: ['5', '8', '"53"'],
        answer: 1,
        explain: 'x part de 5, puis on lui ajoute 3 : 5 + 3 = 8.',
      },

      // 2 — Types (number vs string)
      {
        type: 'qcm',
        lesson: {
          title: 'Nombres et textes',
          body: `Le <code>+</code> additionne deux <b>nombres</b>… mais <b>colle</b> deux textes
                 (les <i>chaînes de caractères</i>, entre guillemets).`,
          example: `2 + 3      // 5  (nombres)\n"a" + "b"  // "ab" (textes collés)`,
        },
        code: `"3" + 2`,
        question: 'Que renvoie ce code ?',
        options: ['5', '"32"', 'Erreur'],
        answer: 1,
        explain: '"3" est un texte. Le 2 est collé derrière → le texte "32".',
      },

      // 3 — Conditions if / else
      {
        type: 'qcm',
        lesson: {
          title: 'Les conditions',
          body: `<code>if</code> exécute du code <b>seulement si</b> une condition est vraie,
                 sinon c'est le <code>else</code>.`,
          example: `if (note >= 10) {\n  resultat = "réussi";\n} else {\n  resultat = "raté";\n}`,
        },
        code: `let note = 8;\nlet msg;\nif (note >= 10) {\n  msg = "ok";\n} else {\n  msg = "raté";\n}`,
        question: 'Que contient msg ?',
        options: ['"ok"', '"raté"', 'rien'],
        answer: 1,
        explain: '8 n\'est pas ≥ 10, donc on passe dans le else → "raté".',
      },

      // 4 — Editor : double
      {
        type: 'editor',
        lesson: {
          title: 'Les fonctions',
          body: `Une <b>fonction</b> est une machine : on lui donne une entrée, elle
                 <code>return</code> (renvoie) un résultat. C'est la base du backend.`,
          example: `function carre(n) {\n  return n * n;\n}\ncarre(4); // 16`,
        },
        prompt: 'Écris une fonction <code>double(n)</code> qui renvoie le <b>double</b> de n.',
        fnName: 'double',
        starter: 'function double(n) {\n  // ton code ici\n  \n}',
        cases: [
          { args: [3], expected: 6 },
          { args: [10], expected: 20 },
          { args: [0], expected: 0 },
          { args: [-4], expected: -8 },
        ],
        solution: 'function double(n) {\n  return n * 2;\n}',
        explain: 'Il fallait renvoyer n * 2 : `return n * 2;`',
      },

      // 5 — RÉVISION : variables + types
      {
        type: 'qcm',
        review: true,
        code: `let a = "2";\nlet b = 3;\nlet c = a + b;`,
        question: 'Petit rappel : que vaut c ?',
        options: ['5', '"23"', 'Erreur'],
        answer: 1,
        explain: 'a est un texte ("2"), donc a + b colle les deux → "23". (Souviens-toi du défi 2 !)',
      },

      // 6 — Booléens / comparaisons
      {
        type: 'qcm',
        lesson: {
          title: 'Vrai ou faux',
          body: `Les comparaisons renvoient <code>true</code> ou <code>false</code>.<br>
                 <code>&&</code> = "ET" (tout doit être vrai). <code>||</code> = "OU" (au moins un vrai).`,
          example: `5 > 3        // true\n5 > 3 && 1 > 2 // false (le 2e est faux)`,
        },
        code: `4 > 2 && 10 > 20`,
        question: 'Que renvoie cette expression ?',
        options: ['true', 'false', '14'],
        answer: 1,
        explain: '4 > 2 est vrai, mais 10 > 20 est faux. Avec &&, il suffit d\'un faux → false.',
      },

      // 7 — Editor : estPair
      {
        type: 'editor',
        lesson: {
          title: 'Le modulo %',
          body: `<code>%</code> donne le <b>reste</b> d'une division.
                 Un nombre est pair si son reste par 2 vaut 0.`,
          example: `10 % 2 // 0  (pair)\n7 % 2  // 1  (impair)`,
        },
        prompt: 'Écris <code>estPair(n)</code> qui renvoie <code>true</code> si n est pair, sinon <code>false</code>.',
        fnName: 'estPair',
        starter: 'function estPair(n) {\n  \n}',
        cases: [
          { args: [4], expected: true },
          { args: [7], expected: false },
          { args: [0], expected: true },
          { args: [99], expected: false },
        ],
        solution: 'function estPair(n) {\n  return n % 2 === 0;\n}',
        explain: 'Il fallait renvoyer le test directement : `return n % 2 === 0;`',
      },

      // 8 — Boucles for
      {
        type: 'qcm',
        lesson: {
          title: 'Les boucles',
          body: `Une boucle <code>for</code> répète du code plusieurs fois.<br>
                 Ici on additionne i à chaque tour.`,
          example: `let total = 0;\nfor (let i = 1; i <= 3; i++) {\n  total = total + i; // 1 puis 2 puis 3\n}`,
        },
        code: `let total = 0;\nfor (let i = 1; i <= 3; i++) {\n  total = total + i;\n}`,
        question: 'Que vaut total ?',
        options: ['3', '6', '9'],
        answer: 1,
        explain: 'On ajoute 1, puis 2, puis 3 : 1 + 2 + 3 = 6.',
      },

      // 9 — RÉVISION : conditions + comparaisons
      {
        type: 'qcm',
        review: true,
        code: `let n = 7;\nlet type;\nif (n % 2 === 0) {\n  type = "pair";\n} else {\n  type = "impair";\n}`,
        question: 'Rappel (conditions + modulo) : que vaut type ?',
        options: ['"pair"', '"impair"', 'true'],
        answer: 1,
        explain: '7 % 2 vaut 1 (pas 0), donc la condition est fausse → on va dans le else → "impair".',
      },

      // 10 — Editor : sommeJusqua
      {
        type: 'editor',
        lesson: {
          title: 'Tout assembler',
          body: `Dernier vrai défi : combine une <b>boucle</b>, une <b>variable</b> et un <b>return</b>.
                 C'est exactement le genre de logique qu'on écrit côté serveur.`,
          example: `// addition de tous les nombres de 1 à n`,
        },
        prompt: 'Écris <code>sommeJusqua(n)</code> qui renvoie la somme de tous les entiers de 1 à n.',
        fnName: 'sommeJusqua',
        starter: 'function sommeJusqua(n) {\n  let total = 0;\n  // boucle ici\n  \n  return total;\n}',
        cases: [
          { args: [3], expected: 6 },
          { args: [5], expected: 15 },
          { args: [1], expected: 1 },
          { args: [10], expected: 55 },
        ],
        solution: 'function sommeJusqua(n) {\n  let total = 0;\n  for (let i = 1; i <= n; i++) {\n    total += i;\n  }\n  return total;\n}',
        explain: 'Une boucle de 1 à n qui ajoute i à total : `for (let i = 1; i <= n; i++) total += i;`',
      },

      // 11 — RÉVISION FINALE : variables + boucle + condition
      {
        type: 'qcm',
        review: true,
        lesson: {
          title: '🔁 Révision finale',
          body: `Pour finir, un code qui mélange <b>tout</b> ce que tu as vu :
                 variable, boucle et condition. Lis-le tranquillement.`,
        },
        code: `let compte = 0;\nfor (let i = 1; i <= 5; i++) {\n  if (i % 2 === 0) {\n    compte = compte + 1;\n  }\n}`,
        question: 'Combien vaut compte ? (indice : on compte les nombres pairs de 1 à 5)',
        options: ['1', '2', '5'],
        answer: 1,
        explain: 'Entre 1 et 5, les pairs sont 2 et 4 → la condition est vraie 2 fois → compte = 2.',
      },

    ],
  };
})();
