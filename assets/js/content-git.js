/* =====================================================================
   CODEQUEST — Monde GIT / GITHUB
   Versionner et partager son code. 100% QCM (concepts + commandes).
   Enregistré dans window.CQContent.git
   ===================================================================== */
(function () {
  window.CQContent = window.CQContent || {};

  window.CQContent.git = {
    name: 'GIT / GITHUB',
    icon: '🔀',
    stages: [

      { type: 'chapter', title: 'CH.1 · POURQUOI GIT', subtitle: 'Garder l\'historique de ton code et ne jamais rien perdre.' },

      {
        type: 'qcm',
        lesson: {
          title: 'C\'est quoi Git ?',
          body: `<b>Git</b> est un outil qui enregistre l'<b>historique</b> de ton code :
                 chaque version est sauvegardée, tu peux revenir en arrière à tout moment.`,
          example: `// "j'ai cassé un truc !" → Git permet de revenir\n// à la dernière version qui marchait.`,
        },
        question: 'À quoi sert Git, principalement ?',
        options: ['Gérer les versions de ton code', 'Écrire du HTML', 'Envoyer des e-mails'],
        answer: 0,
        explain: 'Git est un gestionnaire de versions : il garde l\'historique de chaque modification.',
      },

      {
        type: 'qcm',
        lesson: {
          title: 'Le commit',
          body: `Un <b>commit</b> = une <b>photo</b> de ton code à un instant T, avec un
                 petit message qui décrit ce que tu as changé.`,
          example: `git commit -m "Ajout du bouton de connexion"`,
        },
        code: `git commit -m "Corrige le bug d'affichage"`,
        question: 'Que fait cette commande ?',
        options: ['Enregistre une version avec un message', 'Supprime le fichier', 'Lance le site'],
        answer: 0,
        explain: 'commit enregistre une nouvelle version ; -m donne le message qui la décrit.',
      },

      {
        type: 'qcm',
        lesson: {
          title: 'add avant commit',
          body: `Avant de "commiter", tu choisis les fichiers à inclure avec
                 <code>git add</code>. C'est comme préparer un colis avant de l'expédier.`,
          example: `git add index.html   // prépare ce fichier\ngit add .            // prépare tout`,
        },
        code: `git add .`,
        question: 'Que prépare cette commande ?',
        options: ['Tous les fichiers modifiés', 'Seulement index.html', 'Rien du tout'],
        answer: 0,
        explain: 'Le point "." signifie "tout le dossier" : tous les changements sont préparés pour le commit.',
      },

      {
        type: 'qcm',
        lesson: {
          title: 'Voir où on en est',
          body: `<code>git status</code> affiche l'état actuel : quels fichiers ont changé,
                 lesquels sont prêts à être commités.`,
          example: `git status`,
        },
        code: `git status`,
        question: 'Que montre git status ?',
        options: ['L\'état des fichiers (modifiés, prêts…)', 'Le mot de passe GitHub', 'La météo du serveur'],
        answer: 0,
        explain: 'status fait un état des lieux de ton dépôt : très utile avant de commiter.',
      },

      { type: 'chapter', title: 'CH.2 · TRAVAILLER AVEC GITHUB', subtitle: 'Mettre ton code en ligne et collaborer.' },

      {
        type: 'qcm',
        lesson: {
          title: 'GitHub',
          body: `<b>GitHub</b> est un site qui <b>héberge</b> tes dépôts Git en ligne :
                 sauvegarde, partage, et travail à plusieurs.`,
          example: `// Git = l'outil sur ta machine\n// GitHub = l'hébergeur en ligne`,
        },
        question: 'Quelle est la différence Git / GitHub ?',
        options: ['Git = outil local, GitHub = hébergement en ligne', 'C\'est exactement pareil', 'GitHub est un langage'],
        answer: 0,
        explain: 'Git tourne sur ton ordi ; GitHub est le service en ligne qui stocke et partage tes dépôts.',
      },

      {
        type: 'qcm',
        lesson: {
          title: 'push',
          body: `<code>git push</code> <b>envoie</b> tes commits locaux vers GitHub
                 (le serveur distant). C'est ce que je fais après chaque modif de ton jeu !`,
          example: `git push origin main`,
        },
        code: `git push`,
        question: 'Que fait git push ?',
        options: ['Envoie tes commits vers le serveur (GitHub)', 'Télécharge le code des autres', 'Efface l\'historique'],
        answer: 0,
        explain: 'push "pousse" tes commits locaux vers le dépôt distant. C\'est la sauvegarde en ligne.',
      },

      {
        type: 'qcm',
        lesson: {
          title: 'pull',
          body: `<code>git pull</code> fait l'inverse : il <b>récupère</b> les dernières
                 modifications depuis GitHub vers ta machine.`,
          example: `git pull origin main`,
        },
        code: `git pull`,
        question: 'Quand utilises-tu git pull ?',
        options: ['Pour récupérer les changements des autres', 'Pour supprimer ton dépôt', 'Pour créer un fichier'],
        answer: 0,
        explain: 'pull "tire" vers toi les commits récents du serveur : utile quand on travaille à plusieurs.',
      },

      {
        type: 'qcm',
        lesson: {
          title: 'Les branches',
          body: `Une <b>branche</b> est une ligne de travail <b>parallèle</b> : tu développes
                 une nouveauté sans casser la version principale (<code>main</code>).`,
          example: `git branch nouvelle-fonction\ngit checkout nouvelle-fonction`,
        },
        question: 'À quoi sert une branche ?',
        options: ['Travailler à part sans casser la version principale', 'Supprimer GitHub', 'Accélérer l\'ordinateur'],
        answer: 0,
        explain: 'Les branches isolent ton travail. Quand c\'est prêt, on les fusionne (merge) dans main.',
      },

      {
        type: 'qcm', review: true,
        question: 'Rappel : dans quel ordre enregistre-t-on et envoie-t-on du code ?',
        options: ['add → commit → push', 'push → commit → add', 'commit → pull → add'],
        answer: 0,
        explain: 'On prépare (add), on enregistre une version (commit), puis on l\'envoie en ligne (push).',
      },

      {
        type: 'qcm', review: true,
        question: 'Rappel : quelle commande RÉCUPÈRE les modifications depuis GitHub ?',
        options: ['git pull', 'git push', 'git add'],
        answer: 0,
        explain: 'pull récupère (tire) ; push envoie (pousse). Ne les confonds pas !',
      },

    ],
  };
})();
