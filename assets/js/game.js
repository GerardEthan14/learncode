/* =====================================================================
   CODEQUEST — Logique principale : navigation entre écrans + rendu HUD.
   Le contenu des mondes (QCM + mini-éditeur) sera branché au prochain
   livrable via la fonction startWorld().
   ===================================================================== */
(function () {
  const S = window.GameState;

  // --- Définition des mondes ---
  const WORLDS = [
    { id: 'html', icon: '🧱', name: 'HTML', accent: '#ff7a45',
      desc: 'Construis la structure des pages, balise par balise.', unlock: () => true },
    { id: 'css',  icon: '🎨', name: 'CSS',  accent: '#45a6ff',
      desc: 'Donne style et couleurs. Le monde du peintre rétro.', unlock: () => S.get().worlds.html >= 0.5 },
    { id: 'js',   icon: '🧠', name: 'JS / LOGIQUE', accent: '#ffe600',
      desc: 'Le cerveau du code. QCM + mini-éditeur. Proche du backend.', unlock: () => S.get().worlds.css >= 0.5 },
  ];

  const BADGES = [
    { id: 'first_step', icon: '👣', label: 'Premier pas' },
    { id: 'combo_5',    icon: '🔥', label: 'Combo x5' },
    { id: 'html_done',  icon: '🧱', label: 'Maître HTML' },
    { id: 'css_done',   icon: '🎨', label: 'Maître CSS' },
    { id: 'js_done',    icon: '🧠', label: 'Maître JS' },
  ];

  // ---------------------------------------------------------------
  // Navigation entre écrans
  // ---------------------------------------------------------------
  function show(name) {
    document.querySelectorAll('.screen').forEach(s => {
      s.classList.toggle('screen--active', s.dataset.screen === name);
    });
    if (name === 'worlds') renderWorlds();
    if (name === 'stats')  renderStats();
    window.scrollTo(0, 0);
  }

  // ---------------------------------------------------------------
  // Écran : mondes
  // ---------------------------------------------------------------
  function renderWorlds() {
    const list = document.getElementById('worlds-list');
    list.innerHTML = '';
    WORLDS.forEach(w => {
      const unlocked = w.unlock();
      const prog = Math.round((S.get().worlds[w.id] || 0) * 100);
      const card = document.createElement('div');
      card.className = 'world-card' + (unlocked ? '' : ' locked');
      card.style.setProperty('--accent', w.accent);
      card.innerHTML = `
        ${unlocked ? '' : '<span class="wc-lock">🔒</span>'}
        <div class="wc-icon">${w.icon}</div>
        <div class="wc-name">${w.name}</div>
        <div class="wc-desc">${w.desc}</div>
        <div class="wc-bar"><i style="width:${prog}%"></i></div>
        <div class="wc-foot"><span>progression</span><span>${prog}%</span></div>
      `;
      if (unlocked) {
        card.addEventListener('click', () => { window.SFX.select(); startWorld(w); });
      } else {
        card.addEventListener('click', () => window.SFX.wrong());
      }
      list.appendChild(card);
    });

    // HUD mini
    document.getElementById('hud-mini').innerHTML =
      `NIV <b>${S.level}</b> · XP <b>${S.xpInLevel}/${S.xpForLevel}</b>`;
  }

  // Lance un monde (placeholder pour l'instant).
  function startWorld(w) {
    document.getElementById('play-title').textContent = `${w.icon} ${w.name}`;
    document.getElementById('play-hud').innerHTML = `NIV <b>${S.level}</b>`;
    document.querySelector('#screen-play').style.setProperty('--accent', w.accent);
    show('play');
  }

  // ---------------------------------------------------------------
  // Écran : stats
  // ---------------------------------------------------------------
  function renderStats() {
    const d = S.get();
    const panel = document.getElementById('stats-panel');
    const mins = Math.floor(d.playedSeconds / 60);

    const badgeHtml = BADGES.map(b => {
      const earned = S.hasBadge(b.id);
      return `<div class="badge ${earned ? 'earned' : ''}">${b.icon} ${earned ? b.label : '???'}</div>`;
    }).join('');

    panel.innerHTML = `
      <div class="xp-wrap">
        <div class="xp-head"><span>NIVEAU ${S.level}</span><span>${S.xpInLevel} / ${S.xpForLevel} XP</span></div>
        <div class="xp-bar"><i style="width:${(S.xpInLevel / S.xpForLevel) * 100}%"></i></div>
      </div>
      <div class="stat-grid">
        <div class="stat-box"><div class="num">${d.xp}</div><div class="lbl">XP totale</div></div>
        <div class="stat-box"><div class="num">${S.accuracy}%</div><div class="lbl">Précision</div></div>
        <div class="stat-box"><div class="num">${d.correct}/${d.answered}</div><div class="lbl">Réponses</div></div>
        <div class="stat-box"><div class="num">${d.bestCombo}</div><div class="lbl">Meilleur combo</div></div>
        <div class="stat-box"><div class="num">${mins} min</div><div class="lbl">Temps de jeu</div></div>
      </div>
      <h3 class="screen-title" style="font-size:14px;margin-top:8px;">BADGES</h3>
      <div class="badges">${badgeHtml}</div>
      <button class="reset-btn" id="reset-btn">⟲ REMETTRE À ZÉRO</button>
    `;

    document.getElementById('reset-btn').addEventListener('click', () => {
      if (confirm('Effacer toute ta progression ?')) {
        window.SFX.back();
        S.reset();
        renderStats();
      }
    });
  }

  // ---------------------------------------------------------------
  // Toast (notif XP / level up) — prêt pour la suite
  // ---------------------------------------------------------------
  function toast(msg) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 1800);
  }
  window.CQ = { toast, show }; // utile pour les futurs modules

  // ---------------------------------------------------------------
  // Câblage des événements
  // ---------------------------------------------------------------
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action="goto"]');
    if (!btn) return;
    const target = btn.dataset.target;
    window.SFX[target === 'home' ? 'back' : 'move']();
    show(target);
  });

  // Bouton son
  const soundBtn = document.getElementById('sound-toggle');
  function refreshSoundBtn() {
    const on = window.SFX.isEnabled();
    soundBtn.textContent = on ? '🔊' : '🔇';
    soundBtn.classList.toggle('muted', !on);
  }
  soundBtn.addEventListener('click', () => {
    window.SFX.setEnabled(!window.SFX.isEnabled());
    refreshSoundBtn();
    window.SFX.select();
  });
  refreshSoundBtn();

  // Champ d'étoiles décoratif
  (function stars() {
    const box = document.getElementById('stars');
    for (let i = 0; i < 60; i++) {
      const s = document.createElement('i');
      s.style.left = Math.random() * 100 + '%';
      s.style.top = Math.random() * 100 + '%';
      s.style.animationDelay = (Math.random() * 3) + 's';
      box.appendChild(s);
    }
  })();

  // Compte le temps de jeu
  setInterval(() => { S.get().playedSeconds++; }, 1000);

  show('home');
})();
