/* =====================================================================
   CODEQUEST — Monde PYTHON
   Lire et comprendre du Python (QCM "que renvoie ce code ?").
   Pas d'éditeur : Python ne s'exécute pas dans le navigateur. On
   s'appuie sur ce que tu connais déjà en JS pour comparer.
   Enregistré dans window.CQContent.python
   ===================================================================== */
(function () {
  window.CQContent = window.CQContent || {};

  window.CQContent.python = {
    name: 'PYTHON',
    icon: '🐍',
    stages: [

      { type: 'chapter', title: 'CH.1 · LES BASES', subtitle: 'Même logique qu\'en JS, écriture un peu différente.' },

      {
        type: 'qcm',
        lesson: {
          title: 'Afficher : print',
          body: `En Python, on affiche avec <code>print(...)</code>.
                 Pas de point-virgule en fin de ligne, et pas de <code>let</code> pour les variables.`,
          example: `x = 5\nprint(x)   # affiche 5`,
        },
        code: `x = 3\nx = x + 4\nprint(x)`,
        question: 'Qu\'affiche ce code ?',
        options: ['7', '34', 'x'],
        answer: 0,
        explain: '3 + 4 = 7. La logique est la même qu\'en JS, juste sans let ni ;',
      },

      {
        type: 'qcm',
        lesson: {
          title: 'Textes et f-strings',
          body: `Comme les gabarits JS, Python a les <b>f-strings</b> : un <code>f</code> devant
                 le texte, et des <code>{ }</code> pour insérer une valeur.`,
          example: `nom = "Léa"\nprint(f"Bonjour {nom}")  # Bonjour Léa`,
        },
        code: `n = 4\nprint(f"{n * 2} ans")`,
        question: 'Qu\'affiche ce code ?',
        options: ['8 ans', 'n*2 ans', '{n*2} ans'],
        answer: 0,
        explain: '{n * 2} est calculé (8) puis inséré → "8 ans". Comme `${}` en JS !',
      },

      {
        type: 'qcm',
        lesson: {
          title: 'Les conditions (indentation !)',
          body: `Python n'utilise <b>pas d'accolades</b> : les blocs sont délimités par
                 l'<b>indentation</b> (les espaces). On met <code>:</code> après la condition.`,
          example: `if note >= 10:\n    print("réussi")\nelse:\n    print("raté")`,
        },
        code: `note = 8\nif note >= 10:\n    print("ok")\nelse:\n    print("raté")`,
        question: 'Qu\'affiche ce code ?',
        options: ['raté', 'ok', 'rien'],
        answer: 0,
        explain: '8 n\'est pas ≥ 10 → on va dans le else → "raté". Note l\'indentation à la place des { }.',
      },

      { type: 'chapter', title: 'CH.2 · BOUCLES ET FONCTIONS', subtitle: 'Répéter et fabriquer des outils réutilisables.' },

      {
        type: 'qcm',
        lesson: {
          title: 'La boucle for',
          body: `<code>range(1, 4)</code> produit les nombres 1, 2, 3 (le dernier est exclu).
                 On boucle dessus avec <code>for</code>.`,
          example: `for i in range(1, 4):\n    print(i)   # 1 puis 2 puis 3`,
        },
        code: `total = 0\nfor i in range(1, 4):\n    total = total + i\nprint(total)`,
        question: 'Qu\'affiche ce code ?',
        options: ['6', '3', '4'],
        answer: 0,
        explain: 'range(1, 4) donne 1, 2, 3 → 1 + 2 + 3 = 6 (le 4 est exclu).',
      },

      {
        type: 'qcm',
        lesson: {
          title: 'Les fonctions : def',
          body: `On définit une fonction avec <code>def</code>, et on renvoie avec
                 <code>return</code> (comme en JS).`,
          example: `def double(n):\n    return n * 2\n\nprint(double(5))  # 10`,
        },
        code: `def carre(n):\n    return n * n\n\nprint(carre(4))`,
        question: 'Qu\'affiche ce code ?',
        options: ['16', '8', '4'],
        answer: 0,
        explain: 'carre(4) renvoie 4 * 4 = 16. Le mot-clé est "def" au lieu de "function".',
      },

      {
        type: 'qcm',
        lesson: {
          title: 'Les listes',
          body: `Les <b>listes</b> Python sont comme les tableaux JS : <code>[ ]</code>,
                 indices à partir de 0, et <code>len(...)</code> donne la taille.`,
          example: `t = [10, 20, 30]\nprint(t[1])     # 20\nprint(len(t))   # 3`,
        },
        code: `t = [5, 8, 2]\nprint(t[0] + t[2])`,
        question: 'Qu\'affiche ce code ?',
        options: ['7', '13', '10'],
        answer: 0,
        explain: 't[0] = 5 et t[2] = 2 → 5 + 2 = 7. Les indices commencent à 0.',
      },

      {
        type: 'qcm', review: true,
        question: 'Rappel : comment Python délimite-t-il les blocs de code ?',
        options: ['Par l\'indentation (les espaces)', 'Par des accolades { }', 'Par des point-virgules'],
        answer: 0,
        explain: 'Pas d\'accolades en Python : c\'est l\'indentation qui structure le code.',
      },

      {
        type: 'qcm', review: true,
        code: `def somme(a, b):\n    return a + b\n\nprint(somme(10, 5))`,
        question: 'Rappel : qu\'affiche ce code ?',
        options: ['15', '105', 'a + b'],
        answer: 0,
        explain: 'somme(10, 5) renvoie 10 + 5 = 15. "def" définit la fonction, "return" renvoie le résultat.',
      },

    ],
  };
})();
