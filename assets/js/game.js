/* =====================================================================
   CODEQUEST — Logique principale : profils, navigation, HUD, stats.
   Le contenu des mondes (QCM + mini-éditeur) sera branché au prochain
   livrable via la fonction startWorld().
   ===================================================================== */
(function () {
  const S = window.GameState;

  // --- Définition des mondes ---
  // `requires` = monde prérequis. Le verrou ne s'applique QUE si ce prérequis
  // a déjà du contenu jouable (sinon on ne pourrait jamais le débloquer).
  const WORLDS = [
    { id: 'html', icon: '🧱', name: 'HTML', accent: '#ff7a45',
      desc: 'Construis la structure des pages, balise par balise.', requires: null },
    { id: 'css',  icon: '🎨', name: 'CSS',  accent: '#45a6ff',
      desc: 'Donne style et couleurs. Le monde du peintre rétro.', requires: 'html' },
    { id: 'js',   icon: '🧠', name: 'JS / LOGIQUE', accent: '#ffe600',
      desc: 'Le cerveau du code. QCM + mini-éditeur. Proche du backend.', requires: 'css' },
  ];

  function hasContent(id) {
    return !!(window.CQContent && window.CQContent[id] &&
              window.CQContent[id].stages && window.CQContent[id].stages.length);
  }
  function isUnlocked(w) {
    return true; // TEMPORAIRE : tous les mondes déverrouillés (aucune condition)
  }

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
    // Tous les écrans sauf "profile" exigent un profil connecté.
    if (name !== 'profile' && !S.current()) name = 'profile';
    document.querySelectorAll('.screen').forEach(s => {
      s.classList.toggle('screen--active', s.dataset.screen === name);
    });
    if (name === 'profile') renderProfiles();
    if (name === 'home')   renderHome();
    if (name === 'worlds') renderWorlds();
    if (name === 'stats')  renderStats();
    window.scrollTo(0, 0);
  }

  // ---------------------------------------------------------------
  // Écran : profil / connexion
  // ---------------------------------------------------------------
  function renderProfiles() {
    const box = document.getElementById('profile-list');
    const profiles = S.listProfiles();
    box.innerHTML = '';
    profiles.forEach(name => {
      // Lit le niveau du profil sans s'y connecter (lecture brute du save).
      const chip = document.createElement('div');
      chip.className = 'profile-chip';
      chip.innerHTML = `<span class="pick">👤 ${escapeHtml(name)}</span>
                        <span class="del" title="Supprimer ce profil">✕</span>`;
      chip.querySelector('.pick').addEventListener('click', () => {
        window.SFX.start();
        S.login(name);
        show('home');
      });
      chip.querySelector('.del').addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm(`Supprimer le profil "${name}" et toutes ses stats ?`)) {
          window.SFX.back();
          S.deleteProfile(name);
          renderProfiles();
        }
      });
      box.appendChild(chip);
    });
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
  }

  // ---------------------------------------------------------------
  // Écran : accueil
  // ---------------------------------------------------------------
  function renderHome() {
    const el = document.getElementById('home-profile');
    if (el) el.textContent = S.current() || 'joueur';
  }

  // ---------------------------------------------------------------
  // Écran : mondes
  // ---------------------------------------------------------------
  function renderWorlds() {
    const list = document.getElementById('worlds-list');
    list.innerHTML = '';
    WORLDS.forEach(w => {
      const unlocked = isUnlocked(w);
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

    document.getElementById('hud-mini').innerHTML =
      `👤 <b>${escapeHtml(S.current() || '')}</b> · NIV <b>${S.level}</b> · XP <b>${S.xpInLevel}/${S.xpForLevel}</b>`;
  }

  function startWorld(w) {
    document.getElementById('play-title').textContent = `${w.icon} ${w.name}`;
    document.getElementById('play-hud').innerHTML = `NIV <b>${S.level}</b>`;
    document.querySelector('#screen-play').style.setProperty('--accent', w.accent);
    show('play');

    const area = document.getElementById('play-area');
    const hasContent = window.CQContent && window.CQContent[w.id] && window.CQContent[w.id].stages.length;
    if (hasContent) {
      // Quand le monde est terminé/quitté, on revient à la sélection des mondes.
      window.CQEngine.start(w.id, area, () => show('worlds'));
    } else {
      area.innerHTML = `
        <div class="coming-soon">
          <p class="big">🚧 BIENTÔT 🚧</p>
          <p>Le contenu de ce monde arrive au prochain livrable.</p>
        </div>`;
    }
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
        <div class="xp-head"><span>👤 ${escapeHtml(S.current() || '')} · NIVEAU ${S.level}</span><span>${S.xpInLevel} / ${S.xpForLevel} XP</span></div>
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
      <button class="reset-btn" id="reset-btn">⟲ REMETTRE CE PROFIL À ZÉRO</button>
    `;

    document.getElementById('reset-btn').addEventListener('click', () => {
      if (confirm('Effacer la progression de ce profil ?')) {
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
  window.CQ = { toast, show };

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

  // Formulaire de connexion profil
  document.getElementById('profile-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('profile-input');
    if (S.login(input.value)) {
      window.SFX.start();
      input.value = '';
      show('home');
    } else {
      window.SFX.wrong();
      input.focus();
    }
  });

  // Changer de profil
  document.getElementById('switch-profile').addEventListener('click', () => {
    window.SFX.back();
    S.logout();
    show('profile');
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

  // Compte le temps de jeu (sauvé toutes les 15 s pour limiter les écritures)
  let tick = 0;
  setInterval(() => {
    if (!S.current()) return;
    S.tickTime();
    if (++tick % 15 === 0) S.flush();
  }, 1000);
  window.addEventListener('beforeunload', () => S.flush());

  // ---------------------------------------------------------------
  // Démarrage : reprend le dernier profil, sinon écran de connexion
  // ---------------------------------------------------------------
  if (S.resume()) {
    show('home');
  } else {
    show('profile');
  }
})();
