/* =====================================================================
   CODEQUEST — Monde LINUX / TERMINAL (Ubuntu)
   Piloter un serveur en ligne de commande. 100% QCM.
   Enregistré dans window.CQContent.linux
   ===================================================================== */
(function () {
  window.CQContent = window.CQContent || {};

  window.CQContent.linux = {
    name: 'LINUX / TERMINAL',
    icon: '🐧',
    stages: [

      { type: 'chapter', title: 'CH.1 · SE DÉPLACER', subtitle: 'Le terminal : on tape des commandes au lieu de cliquer.' },

      {
        type: 'qcm',
        lesson: {
          title: 'Où suis-je ?',
          body: `Dans un terminal, <code>pwd</code> (<i>print working directory</i>) affiche
                 le <b>dossier où tu te trouves</b>.`,
          example: `$ pwd\n/home/gerard/projets`,
        },
        code: `pwd`,
        question: 'Que fait pwd ?',
        options: ['Affiche le dossier courant', 'Supprime un fichier', 'Éteint le serveur'],
        answer: 0,
        explain: 'pwd te dit exactement où tu es dans l\'arborescence des dossiers.',
      },

      {
        type: 'qcm',
        lesson: {
          title: 'Lister',
          body: `<code>ls</code> affiche la <b>liste</b> des fichiers et dossiers présents
                 à l'endroit où tu es.`,
          example: `$ ls\nindex.html  assets  README.md`,
        },
        code: `ls`,
        question: 'Que montre la commande ls ?',
        options: ['Les fichiers et dossiers du dossier courant', 'Le contenu d\'un fichier', 'Ton mot de passe'],
        answer: 0,
        explain: 'ls liste ce que contient le dossier courant.',
      },

      {
        type: 'qcm',
        lesson: {
          title: 'Changer de dossier',
          body: `<code>cd</code> (<i>change directory</i>) te déplace dans un dossier.
                 <code>cd ..</code> remonte d'un cran.`,
          example: `cd assets    // entre dans "assets"\ncd ..        // remonte au dossier parent`,
        },
        code: `cd assets`,
        question: 'Que fait cette commande ?',
        options: ['Entre dans le dossier "assets"', 'Supprime "assets"', 'Crée un fichier'],
        answer: 0,
        explain: 'cd te déplace dans le dossier indiqué. cd .. fait l\'inverse (remonte).',
      },

      { type: 'chapter', title: 'CH.2 · LES FICHIERS', subtitle: 'Créer, lire, copier, supprimer.' },

      {
        type: 'qcm',
        lesson: {
          title: 'Créer un dossier',
          body: `<code>mkdir</code> (<i>make directory</i>) crée un nouveau dossier.`,
          example: `mkdir projet-iot`,
        },
        code: `mkdir capteurs`,
        question: 'Que fait mkdir capteurs ?',
        options: ['Crée un dossier nommé "capteurs"', 'Ouvre un fichier', 'Liste les dossiers'],
        answer: 0,
        explain: 'mkdir crée un dossier. Ici, un dossier "capteurs".',
      },

      {
        type: 'qcm',
        lesson: {
          title: 'Lire un fichier',
          body: `<code>cat</code> affiche le <b>contenu</b> d'un fichier directement dans
                 le terminal.`,
          example: `cat config.txt`,
        },
        code: `cat README.md`,
        question: 'Que fait cat README.md ?',
        options: ['Affiche le contenu du fichier', 'Supprime le fichier', 'Renomme le fichier'],
        answer: 0,
        explain: 'cat "lit" et affiche le contenu d\'un fichier texte.',
      },

      {
        type: 'qcm',
        lesson: {
          title: 'Supprimer',
          body: `<code>rm</code> (<i>remove</i>) supprime un fichier.
                 ⚠️ Sur Linux, pas de corbeille : c'est définitif !`,
          example: `rm vieux-fichier.txt`,
        },
        code: `rm test.log`,
        question: 'Que fait rm test.log ?',
        options: ['Supprime définitivement test.log', 'Met test.log à la corbeille', 'Crée test.log'],
        answer: 0,
        explain: 'rm supprime sans corbeille : à manier avec prudence sur un serveur !',
      },

      { type: 'chapter', title: 'CH.3 · ADMINISTRER', subtitle: 'Installer des logiciels et obtenir les droits.' },

      {
        type: 'qcm',
        lesson: {
          title: 'Les super-pouvoirs : sudo',
          body: `<code>sudo</code> exécute une commande avec les <b>droits administrateur</b>.
                 Indispensable pour installer des logiciels ou toucher au système.`,
          example: `sudo apt update`,
        },
        code: `sudo apt update`,
        question: 'À quoi sert sudo ?',
        options: ['Exécuter en tant qu\'administrateur', 'Supprimer Linux', 'Afficher l\'heure'],
        answer: 0,
        explain: 'sudo = "fais-le en admin". Beaucoup d\'actions système l\'exigent.',
      },

      {
        type: 'qcm',
        lesson: {
          title: 'Installer un logiciel',
          body: `Sur Ubuntu, on installe des programmes avec <code>apt</code>, le
                 gestionnaire de paquets.`,
          example: `sudo apt install python3`,
        },
        code: `sudo apt install mosquitto`,
        question: 'Que fait cette commande ?',
        options: ['Installe le logiciel "mosquitto"', 'Désinstalle Ubuntu', 'Affiche un fichier'],
        answer: 0,
        explain: 'apt install ajoute un logiciel. (mosquitto est justement un serveur MQTT pour l\'IoT !)',
      },

      {
        type: 'qcm', review: true,
        question: 'Rappel : quelle commande affiche la LISTE des fichiers du dossier courant ?',
        options: ['ls', 'cd', 'rm'],
        answer: 0,
        explain: 'ls liste, cd déplace, rm supprime.',
      },

      {
        type: 'qcm', review: true,
        question: 'Rappel : tu veux installer un logiciel sur Ubuntu. Quelle commande ?',
        options: ['sudo apt install ...', 'cat ...', 'mkdir ...'],
        answer: 0,
        explain: 'On installe avec apt, et il faut les droits admin → sudo apt install.',
      },

    ],
  };
})();
