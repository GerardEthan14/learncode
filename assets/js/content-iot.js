/* =====================================================================
   CODEQUEST — Monde IoT & MQTT
   Objets connectés, protocole MQTT, flux Node-RED / n8n. 100% QCM.
   Enregistré dans window.CQContent.iot
   ===================================================================== */
(function () {
  window.CQContent = window.CQContent || {};

  window.CQContent.iot = {
    name: 'IoT & MQTT',
    icon: '📡',
    stages: [

      { type: 'chapter', title: 'CH.1 · L\'INTERNET DES OBJETS', subtitle: 'Des objets physiques qui captent, communiquent et agissent.' },

      {
        type: 'qcm',
        lesson: {
          title: 'C\'est quoi l\'IoT ?',
          body: `<b>IoT</b> = <i>Internet of Things</i> (Internet des Objets) : des objets
                 physiques (capteurs, machines, ampoules…) connectés au réseau qui
                 <b>échangent des données</b>.`,
          example: `// thermostat, montre connectée, capteur d'humidité,\n// porte de garage pilotée à distance…`,
        },
        question: 'Que désigne l\'IoT ?',
        options: ['Des objets physiques connectés qui échangent des données', 'Un langage de programmation', 'Un réseau social'],
        answer: 0,
        explain: 'L\'IoT, ce sont les objets connectés qui captent et transmettent de l\'information.',
      },

      {
        type: 'qcm',
        lesson: {
          title: 'Capteur ou actionneur ?',
          body: `Un <b>capteur</b> <i>mesure</i> (température, mouvement…).<br>
                 Un <b>actionneur</b> <i>agit</i> sur le monde (allumer une lampe, ouvrir une vanne).`,
          example: `// Capteur : thermomètre\n// Actionneur : moteur, relais, lampe`,
        },
        code: `// Un thermomètre connecté`,
        question: 'Un thermomètre connecté, c\'est…',
        options: ['Un capteur (il mesure)', 'Un actionneur (il agit)', 'Un serveur'],
        answer: 0,
        explain: 'Il mesure une grandeur (la température) → c\'est un capteur.',
      },

      {
        type: 'qcm',
        lesson: {
          title: 'Pourquoi un protocole spécial ?',
          body: `Les objets IoT sont souvent <b>petits et peu puissants</b>. Il leur faut un
                 moyen de communiquer <b>léger</b> et économe : c'est le rôle de <b>MQTT</b>.`,
          example: `// MQTT = messagerie ultra-légère pour objets connectés`,
        },
        question: 'Pourquoi l\'IoT utilise un protocole léger comme MQTT ?',
        options: ['Les objets ont peu de puissance et de réseau', 'Pour faire joli', 'Pour consommer plus de batterie'],
        answer: 0,
        explain: 'MQTT est conçu pour être léger : parfait pour des objets contraints en énergie et en réseau.',
      },

      { type: 'chapter', title: 'CH.2 · LE PROTOCOLE MQTT', subtitle: 'Publier, s\'abonner : comment les objets se parlent.' },

      {
        type: 'qcm',
        lesson: {
          title: 'Publish / Subscribe',
          body: `MQTT fonctionne en <b>publication / abonnement</b> : un objet <b>publie</b> un
                 message, et tous ceux <b>abonnés</b> au même sujet le reçoivent.`,
          example: `// Le capteur PUBLIE la température\n// Le tableau de bord est ABONNÉ → il la reçoit`,
        },
        question: 'Comment fonctionne MQTT ?',
        options: ['Publication / abonnement (publish / subscribe)', 'Par e-mail', 'En imprimant du papier'],
        answer: 0,
        explain: 'Un émetteur publie, les abonnés reçoivent. C\'est le modèle publish/subscribe.',
      },

      {
        type: 'qcm',
        lesson: {
          title: 'Le broker',
          body: `Le <b>broker</b> est le <b>facteur central</b> : il reçoit les messages publiés
                 et les distribue aux abonnés. (Ex. de broker : <i>Mosquitto</i>.)`,
          example: `Capteur → [ BROKER ] → Abonnés`,
        },
        question: 'Quel est le rôle du broker MQTT ?',
        options: ['Distribuer les messages entre objets', 'Fabriquer les capteurs', 'Coder le site web'],
        answer: 0,
        explain: 'Le broker est l\'intermédiaire qui reçoit et redistribue tous les messages.',
      },

      {
        type: 'qcm',
        lesson: {
          title: 'Les topics',
          body: `Un message MQTT est publié sur un <b>topic</b> (un "canal"), organisé comme
                 un chemin avec des <code>/</code>.`,
          example: `maison/salon/temperature\nmaison/garage/porte`,
        },
        code: `maison/cuisine/humidite`,
        question: 'Que représente "maison/cuisine/humidite" ?',
        options: ['Un topic (canal) MQTT', 'Un mot de passe', 'Une adresse e-mail'],
        answer: 0,
        explain: 'C\'est un topic : le "canal" sur lequel on publie/s\'abonne. La hiérarchie se note avec des /.',
      },

      {
        type: 'qcm',
        lesson: {
          title: 'Observer le trafic',
          body: `<b>MQTT Explorer</b> est un outil pour <b>voir en direct</b> les messages qui
                 circulent : super pratique pour déboguer un système IoT.`,
          example: `// MQTT Explorer = "fenêtre" sur tous les topics`,
        },
        question: 'À quoi sert MQTT Explorer ?',
        options: ['Visualiser/déboguer les messages MQTT', 'Souder des composants', 'Écrire du Python'],
        answer: 0,
        explain: 'Il affiche les topics et messages en temps réel : l\'outil de diagnostic du métier.',
      },

      { type: 'chapter', title: 'CH.3 · AUTOMATISER (NODE-RED / n8n)', subtitle: 'Relier les briques sans tout coder à la main.' },

      {
        type: 'qcm',
        lesson: {
          title: 'Node-RED',
          body: `<b>Node-RED</b> est un outil <b>visuel</b> : on relie des "nœuds" pour créer un
                 <b>flux</b> (reçois un message → traite-le → déclenche une action). On peut y
                 écrire du <b>JavaScript</b> dans les nœuds "function".`,
          example: `[MQTT in] → [function (JS)] → [allumer lampe]`,
        },
        question: 'Qu\'est-ce que Node-RED ?',
        options: ['Un outil visuel pour créer des flux (avec du JS)', 'Un capteur de température', 'Un système d\'exploitation'],
        answer: 0,
        explain: 'Node-RED relie des nœuds en flux. Tes connaissances en JS servent dans les nœuds "function".',
      },

      {
        type: 'qcm',
        lesson: {
          title: 'n8n',
          body: `<b>n8n</b> ressemble à Node-RED mais pour <b>automatiser des applis et services</b>
                 ("quand X arrive, fais Y"). Là aussi, on peut glisser du <b>JavaScript</b>.`,
          example: `// "Nouvelle alerte capteur" → envoie un message + enregistre en base`,
        },
        question: 'À quoi sert n8n ?',
        options: ['Automatiser des tâches entre applis/services', 'Remplacer Linux', 'Dessiner des logos'],
        answer: 0,
        explain: 'n8n est un outil d\'automatisation de workflows ; il accepte aussi du code JS.',
      },

      {
        type: 'qcm', review: true,
        lesson: {
          title: '🔁 Le tableau complet',
          body: `Relie les briques : un <b>capteur</b> publie sur un <b>topic</b>, le <b>broker</b>
                 distribue, <b>Node-RED</b> traite et déclenche une action.`,
        },
        code: `Capteur → publie sur "maison/salon/temp"\nBroker → distribue\nNode-RED → si temp > 25 : allume le ventilateur`,
        question: 'Dans cette chaîne, quel élément DISTRIBUE les messages ?',
        options: ['Le broker', 'Le capteur', 'Le ventilateur'],
        answer: 0,
        explain: 'Le capteur publie, le broker distribue, Node-RED décide et agit.',
      },

      {
        type: 'qcm', review: true,
        question: 'Rappel : comment s\'appelle le modèle de communication de MQTT ?',
        options: ['Publication / abonnement', 'Copier / coller', 'Marche / arrêt'],
        answer: 0,
        explain: 'Publish/Subscribe : on publie sur un topic, les abonnés reçoivent.',
      },

    ],
  };
})();
