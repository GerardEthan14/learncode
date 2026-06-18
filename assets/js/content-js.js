/* =====================================================================
   CODEQUEST — Contenu COMPLET du Monde JS / LOGIQUE
   Parcours structuré en 7 chapitres.
   Types de stage :
     - 'chapter' : séparateur (titre + sous-titre), ne compte pas comme défi
     - 'qcm'     : on montre du code, tu prédis le résultat (choix multiple)
     - 'editor'  : tu écris une fonction, exécutée et testée dans un worker
   `review: true` => défi de répétition espacée (re-test d'anciens concepts).
   Enregistré dans window.CQContent.js
   ===================================================================== */
(function () {
  window.CQContent = window.CQContent || {};

  window.CQContent.js = {
    name: 'JS / LOGIQUE',
    icon: '🧠',
    stages: [

      /* ============ CHAPITRE 1 — LES BASES ============ */
      { type: 'chapter', title: 'CH.1 · LES BASES', subtitle: 'Variables, types et opérations : les briques de tout programme.' },

      {
        type: 'qcm',
        lesson: {
          title: 'Les variables',
          body: `Une <b>variable</b> est une boîte qui stocke une valeur. On la crée
                 avec <code>let</code>, et on peut la modifier ensuite.`,
          example: `let age = 20;\nage = age + 1; // age vaut 21`,
        },
        code: `let x = 5;\nx = x + 3;`,
        question: 'Que vaut x à la fin ?',
        options: ['5', '8', '"53"'],
        answer: 1,
        explain: 'x part de 5, puis on lui ajoute 3 : 5 + 3 = 8.',
      },

      {
        type: 'qcm',
        lesson: {
          title: 'let ou const ?',
          body: `<code>let</code> = valeur qui peut changer.<br>
                 <code>const</code> = valeur <b>fixe</b> : si tu essaies de la modifier, erreur !`,
          example: `const pi = 3.14;\n// pi = 4; // ❌ interdit`,
        },
        code: `const note = 12;\nnote = 15;`,
        question: 'Que se passe-t-il ?',
        options: ['note vaut 15', 'note vaut 12', 'Erreur'],
        answer: 2,
        explain: 'On ne peut pas réassigner une const → JavaScript renvoie une erreur.',
      },

      {
        type: 'qcm',
        lesson: {
          title: 'Les opérations',
          body: `<code>+ - * /</code> comme en maths. Attention : la <b>multiplication
                 passe avant l'addition</b> (priorité des opérations).`,
          example: `10 - 4   // 6\n2 + 3 * 4 // 14, pas 20 !`,
        },
        code: `2 + 3 * 4`,
        question: 'Que vaut cette expression ?',
        options: ['20', '14', '24'],
        answer: 1,
        explain: 'On fait 3 * 4 = 12 d\'abord, puis 2 + 12 = 14.',
      },

      {
        type: 'qcm',
        lesson: {
          title: 'Nombres et textes',
          body: `Le <code>+</code> additionne deux <b>nombres</b>, mais <b>colle</b> deux
                 textes (chaînes entre guillemets).`,
          example: `2 + 3     // 5\n"a" + "b" // "ab"`,
        },
        code: `"3" + 2`,
        question: 'Que renvoie ce code ?',
        options: ['5', '"32"', 'Erreur'],
        answer: 1,
        explain: '"3" est un texte : le 2 est collé derrière → "32".',
      },

      {
        type: 'editor',
        lesson: {
          title: 'Les fonctions',
          body: `Une <b>fonction</b> prend des entrées (les <i>paramètres</i>) et
                 <code>return</code> un résultat. C'est la base du backend.`,
          example: `function carre(n) {\n  return n * n;\n}\ncarre(4); // 16`,
        },
        prompt: 'Écris <code>additionne(a, b)</code> qui renvoie la somme de a et b.',
        fnName: 'additionne',
        starter: 'function additionne(a, b) {\n  \n}',
        cases: [ {args:[1,2],expected:3}, {args:[10,5],expected:15}, {args:[-3,3],expected:0}, {args:[0,0],expected:0} ],
        solution: 'function additionne(a, b) {\n  return a + b;\n}',
        explain: 'On renvoie a + b : `return a + b;`',
      },

      {
        type: 'qcm', review: true,
        code: `let a = "2";\nlet b = 3;\nlet c = a + b;`,
        question: 'Rappel (types) : que vaut c ?',
        options: ['5', '"23"', 'Erreur'],
        answer: 1,
        explain: 'a est un texte, donc a + b colle les deux → "23".',
      },

      /* ============ CHAPITRE 2 — LE TEXTE ============ */
      { type: 'chapter', title: 'CH.2 · LE TEXTE', subtitle: 'Manipuler les chaînes de caractères.' },

      {
        type: 'qcm',
        lesson: {
          title: 'La longueur d\'un texte',
          body: `<code>.length</code> donne le <b>nombre de caractères</b> d'une chaîne.`,
          example: `"chat".length // 4`,
        },
        code: `"salut".length`,
        question: 'Que vaut cette expression ?',
        options: ['5', '6', '"salut"'],
        answer: 0,
        explain: '"salut" contient 5 lettres → 5.',
      },

      {
        type: 'qcm',
        lesson: {
          title: 'Les gabarits (template)',
          body: `Avec les <b>accents graves</b> <code>\`...\`</code>, on insère une valeur
                 dans un texte grâce à <code>\${ }</code>.`,
          example: 'let n = 5;\n`J\'ai ${n} ans` // "J\'ai 5 ans"',
        },
        code: 'let n = 4;\n`${n * 2} ans`',
        question: 'Que renvoie ce code ?',
        options: ['"8 ans"', '"n*2 ans"', '8'],
        answer: 0,
        explain: '${n * 2} est calculé (4 * 2 = 8) puis inséré → "8 ans".',
      },

      {
        type: 'editor',
        lesson: {
          title: 'Construire du texte',
          body: `On peut assembler du texte avec <code>+</code> ou avec un gabarit.
                 N'oublie pas les espaces !`,
          example: 'function crier(mot) {\n  return mot + " !!!";\n}',
        },
        prompt: 'Écris <code>saluer(nom)</code> qui renvoie <code>"Bonjour " + nom + " !"</code>.',
        fnName: 'saluer',
        starter: 'function saluer(nom) {\n  \n}',
        cases: [ {args:['Léa'],expected:'Bonjour Léa !'}, {args:['Max'],expected:'Bonjour Max !'} ],
        solution: 'function saluer(nom) {\n  return "Bonjour " + nom + " !";\n}',
        explain: 'On colle les morceaux : `return "Bonjour " + nom + " !";`',
      },

      {
        type: 'qcm', review: true,
        code: '`Total : ${10 + 5}`',
        question: 'Rappel (gabarit) : que renvoie ce code ?',
        options: ['"Total : 15"', '"Total : 10+5"', '15'],
        answer: 0,
        explain: '${10 + 5} est calculé → 15, inséré dans le texte → "Total : 15".',
      },

      /* ============ CHAPITRE 3 — LES DÉCISIONS ============ */
      { type: 'chapter', title: 'CH.3 · LES DÉCISIONS', subtitle: 'Comparer, tester, choisir : faire réagir ton programme.' },

      {
        type: 'qcm',
        lesson: {
          title: 'L\'égalité stricte',
          body: `<code>===</code> teste si deux valeurs sont <b>égales en valeur ET en type</b>.
                 Le résultat est <code>true</code> ou <code>false</code>.`,
          example: `5 === 5     // true\n5 === "5"   // false (nombre vs texte)`,
        },
        code: `2 === "2"`,
        question: 'Que renvoie cette comparaison ?',
        options: ['true', 'false', 'Erreur'],
        answer: 1,
        explain: 'Un nombre (2) et un texte ("2") ne sont pas du même type → false.',
      },

      {
        type: 'qcm',
        lesson: {
          title: 'if / else',
          body: `<code>if</code> exécute du code si la condition est vraie, sinon
                 c'est le <code>else</code>.`,
          example: `if (note >= 10) {\n  msg = "réussi";\n} else {\n  msg = "raté";\n}`,
        },
        code: `let note = 8;\nlet msg;\nif (note >= 10) {\n  msg = "ok";\n} else {\n  msg = "raté";\n}`,
        question: 'Que contient msg ?',
        options: ['"ok"', '"raté"', 'rien'],
        answer: 1,
        explain: '8 n\'est pas ≥ 10 → on passe dans le else → "raté".',
      },

      {
        type: 'qcm',
        lesson: {
          title: 'else if',
          body: `Pour tester plusieurs cas à la suite, on enchaîne avec <code>else if</code>.
                 Le premier vrai gagne.`,
          example: `if (x > 10) ...\nelse if (x > 3) ...\nelse ...`,
        },
        code: `let n = 5;\nlet s;\nif (n > 10) { s = "A"; }\nelse if (n > 3) { s = "B"; }\nelse { s = "C"; }`,
        question: 'Que vaut s ?',
        options: ['"A"', '"B"', '"C"'],
        answer: 1,
        explain: '5 n\'est pas > 10, mais il est > 3 → on prend "B" (et on s\'arrête).',
      },

      {
        type: 'qcm',
        lesson: {
          title: 'ET / OU',
          body: `<code>&&</code> = "ET" : tout doit être vrai.<br>
                 <code>||</code> = "OU" : au moins un vrai suffit.`,
          example: `true && false // false\ntrue || false // true`,
        },
        code: `4 > 2 && 10 > 20`,
        question: 'Que renvoie cette expression ?',
        options: ['true', 'false', '14'],
        answer: 1,
        explain: '4 > 2 est vrai, mais 10 > 20 est faux. Avec &&, un seul faux → false.',
      },

      {
        type: 'editor',
        lesson: {
          title: 'Renvoyer un booléen',
          body: `Une condition <i>est déjà</i> un true/false : on peut la renvoyer
                 directement, sans if.`,
          example: `function estPositif(n) {\n  return n > 0;\n}`,
        },
        prompt: 'Écris <code>estMajeur(age)</code> qui renvoie <code>true</code> si age ≥ 18, sinon <code>false</code>.',
        fnName: 'estMajeur',
        starter: 'function estMajeur(age) {\n  \n}',
        cases: [ {args:[18],expected:true}, {args:[17],expected:false}, {args:[40],expected:true}, {args:[0],expected:false} ],
        solution: 'function estMajeur(age) {\n  return age >= 18;\n}',
        explain: 'On renvoie le test directement : `return age >= 18;`',
      },

      {
        type: 'editor',
        lesson: {
          title: 'Plusieurs cas',
          body: `Combine <code>if / else if / else</code> pour renvoyer une valeur
                 différente selon l'entrée.`,
          example: `if (x >= 16) return "...";\nelse if (x >= 10) return "...";\nelse return "...";`,
        },
        prompt: 'Écris <code>mention(note)</code> : "très bien" si note ≥ 16, "passable" si note ≥ 10, sinon "insuffisant".',
        fnName: 'mention',
        starter: 'function mention(note) {\n  \n}',
        cases: [ {args:[18],expected:'très bien'}, {args:[16],expected:'très bien'}, {args:[12],expected:'passable'}, {args:[10],expected:'passable'}, {args:[5],expected:'insuffisant'} ],
        solution: 'function mention(note) {\n  if (note >= 16) {\n    return "très bien";\n  } else if (note >= 10) {\n    return "passable";\n  } else {\n    return "insuffisant";\n  }\n}',
        explain: 'On teste du plus grand au plus petit avec if / else if / else.',
      },

      {
        type: 'qcm', review: true,
        code: `let n = 7;\nlet type;\nif (n % 2 === 0) { type = "pair"; }\nelse { type = "impair"; }`,
        question: 'Rappel (conditions) : que vaut type ?',
        options: ['"pair"', '"impair"', 'true'],
        answer: 1,
        explain: '7 % 2 vaut 1 (pas 0) → condition fausse → else → "impair".',
      },

      /* ============ CHAPITRE 4 — LES BOUCLES ============ */
      { type: 'chapter', title: 'CH.4 · LES BOUCLES', subtitle: 'Répéter des actions sans tout réécrire.' },

      {
        type: 'qcm',
        lesson: {
          title: 'La boucle for',
          body: `<code>for</code> répète un bloc un nombre connu de fois :
                 départ, condition d'arrêt, et pas (<code>i++</code>).`,
          example: `for (let i = 1; i <= 3; i++) {\n  // tourne pour i = 1, 2, 3\n}`,
        },
        code: `let total = 0;\nfor (let i = 1; i <= 3; i++) {\n  total = total + i;\n}`,
        question: 'Que vaut total ?',
        options: ['3', '6', '9'],
        answer: 1,
        explain: 'On ajoute 1, puis 2, puis 3 : 1 + 2 + 3 = 6.',
      },

      {
        type: 'qcm',
        lesson: {
          title: 'La boucle while',
          body: `<code>while</code> répète <b>tant que</b> la condition est vraie.
                 Attention à bien la faire devenir fausse, sinon… boucle infinie !`,
          example: `let i = 0;\nwhile (i < 3) {\n  i++;\n}`,
        },
        code: `let i = 0;\nlet s = 0;\nwhile (i < 4) {\n  s = s + i;\n  i++;\n}`,
        question: 'Que vaut s à la fin ?',
        options: ['6', '10', '4'],
        answer: 0,
        explain: 'i prend 0, 1, 2, 3 (puis 4 stoppe). On ajoute 0+1+2+3 = 6.',
      },

      {
        type: 'editor',
        lesson: {
          title: 'Accumuler dans une boucle',
          body: `Le motif classique : une variable qui démarre à 0, une boucle qui
                 lui ajoute quelque chose, puis on la renvoie.`,
          example: `let total = 0;\nfor (...) { total += ...; }\nreturn total;`,
        },
        prompt: 'Écris <code>sommeJusqua(n)</code> qui renvoie la somme des entiers de 1 à n.',
        fnName: 'sommeJusqua',
        starter: 'function sommeJusqua(n) {\n  let total = 0;\n  \n  return total;\n}',
        cases: [ {args:[3],expected:6}, {args:[5],expected:15}, {args:[1],expected:1}, {args:[10],expected:55} ],
        solution: 'function sommeJusqua(n) {\n  let total = 0;\n  for (let i = 1; i <= n; i++) {\n    total += i;\n  }\n  return total;\n}',
        explain: 'Boucle de 1 à n qui ajoute i à total.',
      },

      {
        type: 'editor',
        lesson: {
          title: 'Multiplier en boucle',
          body: `La <b>factorielle</b> de n = 1 × 2 × … × n. On part de 1 et on multiplie.
                 (Et factorielle de 0 vaut 1.)`,
          example: `// 4! = 1*2*3*4 = 24`,
        },
        prompt: 'Écris <code>factorielle(n)</code> : le produit de tous les entiers de 1 à n.',
        fnName: 'factorielle',
        starter: 'function factorielle(n) {\n  let resultat = 1;\n  \n  return resultat;\n}',
        cases: [ {args:[3],expected:6}, {args:[5],expected:120}, {args:[1],expected:1}, {args:[0],expected:1} ],
        solution: 'function factorielle(n) {\n  let resultat = 1;\n  for (let i = 1; i <= n; i++) {\n    resultat *= i;\n  }\n  return resultat;\n}',
        explain: 'On démarre à 1 et on multiplie par chaque i. Pour n = 0, la boucle ne tourne pas → 1.',
      },

      {
        type: 'qcm', review: true,
        code: `let compte = 0;\nfor (let i = 1; i <= 5; i++) {\n  if (i % 2 === 0) {\n    compte++;\n  }\n}`,
        question: 'Rappel (boucle + condition) : que vaut compte ?',
        options: ['1', '2', '5'],
        answer: 1,
        explain: 'Entre 1 et 5, les pairs sont 2 et 4 → compte = 2.',
      },

      /* ============ CHAPITRE 5 — LES LISTES (TABLEAUX) ============ */
      { type: 'chapter', title: 'CH.5 · LES TABLEAUX', subtitle: 'Stocker plusieurs valeurs dans une seule variable.' },

      {
        type: 'qcm',
        lesson: {
          title: 'Lire dans un tableau',
          body: `Un <b>tableau</b> <code>[ ]</code> contient une liste de valeurs. On accède
                 à chacune par son <b>indice</b>, qui <b>commence à 0</b>.`,
          example: `let t = [10, 20, 30];\nt[0] // 10\nt[2] // 30`,
        },
        code: `let t = [10, 20, 30];\nt[1]`,
        question: 'Que vaut t[1] ?',
        options: ['10', '20', '30'],
        answer: 1,
        explain: 'Les indices commencent à 0 : t[0]=10, t[1]=20.',
      },

      {
        type: 'qcm',
        lesson: {
          title: 'Taille et ajout',
          body: `<code>.length</code> = nombre d'éléments. <code>.push(x)</code> ajoute x
                 à la fin du tableau.`,
          example: `let t = [1, 2];\nt.push(3); // t vaut [1, 2, 3]\nt.length;  // 3`,
        },
        code: `let t = [1, 2];\nt.push(9);`,
        question: 'Que vaut t.length ensuite ?',
        options: ['2', '3', '9'],
        answer: 1,
        explain: 'push ajoute un élément → le tableau a maintenant 3 éléments.',
      },

      {
        type: 'qcm',
        lesson: {
          title: 'Parcourir un tableau',
          body: `On combine <code>for</code> et <code>.length</code> pour passer sur
                 chaque case : <code>t[i]</code>.`,
          example: `for (let i = 0; i < t.length; i++) {\n  // t[i] = chaque valeur\n}`,
        },
        code: `let t = [2, 4, 6];\nlet s = 0;\nfor (let i = 0; i < t.length; i++) {\n  s += t[i];\n}`,
        question: 'Que vaut s ?',
        options: ['6', '12', '3'],
        answer: 1,
        explain: 'On additionne 2 + 4 + 6 = 12.',
      },

      {
        type: 'editor',
        lesson: {
          title: 'Additionner un tableau',
          body: `Même motif que la somme : on accumule, mais cette fois on lit les
                 valeurs <b>dans le tableau</b>.`,
          example: `for (let i = 0; i < t.length; i++) {\n  total += t[i];\n}`,
        },
        prompt: 'Écris <code>sommeTableau(t)</code> qui renvoie la somme de tous les nombres du tableau t.',
        fnName: 'sommeTableau',
        starter: 'function sommeTableau(t) {\n  let total = 0;\n  \n  return total;\n}',
        cases: [ {args:[[1,2,3]],expected:6}, {args:[[10,20]],expected:30}, {args:[[]],expected:0}, {args:[[5]],expected:5} ],
        solution: 'function sommeTableau(t) {\n  let total = 0;\n  for (let i = 0; i < t.length; i++) {\n    total += t[i];\n  }\n  return total;\n}',
        explain: 'On parcourt t et on ajoute chaque t[i] à total.',
      },

      {
        type: 'editor',
        lesson: {
          title: 'Trouver le plus grand',
          body: `On garde une variable "champion" (le 1er élément), et on la remplace
                 dès qu'on trouve plus grand.`,
          example: `let max = t[0];\nif (t[i] > max) { max = t[i]; }`,
        },
        prompt: 'Écris <code>plusGrand(t)</code> qui renvoie le plus grand nombre du tableau t.',
        fnName: 'plusGrand',
        starter: 'function plusGrand(t) {\n  let max = t[0];\n  \n  return max;\n}',
        cases: [ {args:[[3,7,2]],expected:7}, {args:[[10]],expected:10}, {args:[[-5,-2,-9]],expected:-2}, {args:[[1,2,3,4]],expected:4} ],
        solution: 'function plusGrand(t) {\n  let max = t[0];\n  for (let i = 1; i < t.length; i++) {\n    if (t[i] > max) {\n      max = t[i];\n    }\n  }\n  return max;\n}',
        explain: 'On part du 1er élément et on garde le plus grand rencontré.',
      },

      {
        type: 'qcm', review: true,
        code: `let t = [5, 8, 2];\nlet n = 0;\nfor (let i = 0; i < t.length; i++) {\n  if (t[i] > 4) { n++; }\n}`,
        question: 'Rappel (tableau + condition) : que vaut n ?',
        options: ['1', '2', '3'],
        answer: 1,
        explain: 'On compte les valeurs > 4 : 5 et 8 → n = 2.',
      },

      /* ============ CHAPITRE 6 — LES OBJETS ============ */
      { type: 'chapter', title: 'CH.6 · LES OBJETS', subtitle: 'Regrouper des infos qui vont ensemble.' },

      {
        type: 'qcm',
        lesson: {
          title: 'Les objets',
          body: `Un <b>objet</b> <code>{ }</code> regroupe des données sous forme de
                 <i>propriété : valeur</i>. On y accède avec un point.`,
          example: `let p = { nom: "Zoe", age: 9 };\np.nom // "Zoe"\np.age // 9`,
        },
        code: `let p = { nom: "Zoe", age: 9 };\np.age`,
        question: 'Que vaut p.age ?',
        options: ['"Zoe"', '9', 'undefined'],
        answer: 1,
        explain: 'On lit la propriété age de l\'objet → 9.',
      },

      {
        type: 'editor',
        lesson: {
          title: 'Utiliser un objet',
          body: `On lit les propriétés d'un objet reçu en paramètre pour construire
                 un résultat.`,
          example: 'function bonjour(p) {\n  return "Salut " + p.nom;\n}',
        },
        prompt: 'Écris <code>decris(personne)</code> qui renvoie <code>"&lt;nom&gt; a &lt;age&gt; ans"</code> (ex : "Zoe a 9 ans").',
        fnName: 'decris',
        starter: 'function decris(personne) {\n  \n}',
        cases: [ {args:[{nom:'Zoe',age:9}],expected:'Zoe a 9 ans'}, {args:[{nom:'Tom',age:30}],expected:'Tom a 30 ans'} ],
        solution: 'function decris(personne) {\n  return personne.nom + " a " + personne.age + " ans";\n}',
        explain: 'On lit personne.nom et personne.age et on les colle dans le texte.',
      },

      {
        type: 'qcm', review: true,
        code: `let v = { x: 1, y: 2 };\nv.x + v.y`,
        question: 'Rappel (objets) : que vaut ce calcul ?',
        options: ['3', '"12"', 'undefined'],
        answer: 0,
        explain: 'v.x vaut 1 et v.y vaut 2 (des nombres) → 1 + 2 = 3.',
      },

      /* ============ CHAPITRE 7 — LE BOSS FINAL ============ */
      { type: 'chapter', title: 'CH.7 · BOSS FINAL', subtitle: 'Tu as tout vu. Combine maintenant tout pour résoudre de vrais petits problèmes.' },

      {
        type: 'editor',
        lesson: {
          title: 'Boss 1/3 — Compter',
          body: `Mélange tableau + boucle + condition + modulo. Tu sais déjà tout faire !`,
          example: `// n % 2 === 0  => pair`,
        },
        prompt: 'Écris <code>compterPairs(t)</code> qui renvoie combien de nombres du tableau t sont pairs.',
        fnName: 'compterPairs',
        starter: 'function compterPairs(t) {\n  let compte = 0;\n  \n  return compte;\n}',
        cases: [ {args:[[1,2,3,4]],expected:2}, {args:[[2,4,6]],expected:3}, {args:[[1,3,5]],expected:0}, {args:[[]],expected:0} ],
        solution: 'function compterPairs(t) {\n  let compte = 0;\n  for (let i = 0; i < t.length; i++) {\n    if (t[i] % 2 === 0) {\n      compte++;\n    }\n  }\n  return compte;\n}',
        explain: 'On parcourt t et on incrémente compte quand t[i] est pair.',
      },

      {
        type: 'editor',
        lesson: {
          title: 'Boss 2/3 — Inverser',
          body: `On peut parcourir une chaîne <b>à l'envers</b> (du dernier au premier
                 caractère) et reconstruire un nouveau texte.`,
          example: `mot[mot.length - 1] // dernier caractère`,
        },
        prompt: 'Écris <code>inverser(mot)</code> qui renvoie le mot à l\'envers (ex : "chat" → "tahc").',
        fnName: 'inverser',
        starter: 'function inverser(mot) {\n  let resultat = "";\n  \n  return resultat;\n}',
        cases: [ {args:['chat'],expected:'tahc'}, {args:['abc'],expected:'cba'}, {args:['a'],expected:'a'}, {args:[''],expected:''} ],
        solution: 'function inverser(mot) {\n  let resultat = "";\n  for (let i = mot.length - 1; i >= 0; i--) {\n    resultat += mot[i];\n  }\n  return resultat;\n}',
        explain: 'On part du dernier indice (length - 1) jusqu\'à 0 en ajoutant chaque caractère.',
      },

      {
        type: 'editor',
        lesson: {
          title: 'Boss 3/3 — Nombre premier',
          body: `Un nombre <b>premier</b> n'est divisible que par 1 et lui-même (et il est ≥ 2).
                 Astuce : teste s'il a un diviseur entre 2 et n-1. Si oui → pas premier.`,
          example: `// 7 est premier, 9 = 3×3 ne l'est pas`,
        },
        prompt: 'Écris <code>estPremier(n)</code> qui renvoie <code>true</code> si n est premier, sinon <code>false</code>.',
        fnName: 'estPremier',
        starter: 'function estPremier(n) {\n  if (n < 2) {\n    return false;\n  }\n  \n  return true;\n}',
        cases: [ {args:[7],expected:true}, {args:[2],expected:true}, {args:[4],expected:false}, {args:[1],expected:false}, {args:[9],expected:false}, {args:[11],expected:true} ],
        solution: 'function estPremier(n) {\n  if (n < 2) {\n    return false;\n  }\n  for (let i = 2; i < n; i++) {\n    if (n % i === 0) {\n      return false;\n    }\n  }\n  return true;\n}',
        explain: 'Si un diviseur entre 2 et n-1 divise n sans reste, ce n\'est pas premier. Sinon, ça l\'est.',
      },

      {
        type: 'qcm', review: true,
        lesson: {
          title: '🔁 Révision finale',
          body: `Dernier défi : un code qui mélange <b>tableau</b>, <b>boucle</b> et
                 <b>longueur de texte</b>. Lis-le tranquillement.`,
        },
        code: `let mots = ["a", "bb", "ccc"];\nlet total = 0;\nfor (let i = 0; i < mots.length; i++) {\n  total += mots[i].length;\n}`,
        question: 'Que vaut total ?',
        options: ['3', '6', '"abbccc"'],
        answer: 1,
        explain: 'On additionne les longueurs : 1 + 2 + 3 = 6.',
      },

    ],
  };
})();
