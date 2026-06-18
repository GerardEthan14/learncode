/* =====================================================================
   CODEQUEST — Moteur de monde (générique)
   Déroule les "stages" d'un monde : chapitre / mini-leçon → défi →
   feedback → bilan. Gère score, combos, XP, montées de niveau, badges.
   Le code du mini-éditeur tourne dans un Worker isolé avec chrono de
   sécurité (anti boucle infinie).
   Types de stage : 'chapter' (séparateur), 'qcm', 'editor'.
   Exposé via window.CQEngine.start(worldId, areaEl, onComplete).
   ===================================================================== */
(function () {
  const S = window.GameState;

  const BASE_XP = 10;
  const COMBO_BONUS = 5;
  const RUN_TIMEOUT = 1500;

  let area, stages, idx, combo, gained, runCorrect, runBestCombo, worldId, onComplete;

  function start(wid, el, done) {
    worldId = wid;
    area = el;
    onComplete = done;
    const content = (window.CQContent || {})[wid];
    stages = content && content.stages ? content.stages : [];
    idx = 0; combo = 0; gained = 0; runCorrect = 0; runBestCombo = 0;
    if (!stages.length) { area.innerHTML = '<div class="coming-soon"><p class="big">🚧 BIENTÔT 🚧</p></div>'; return; }
    showStage();
  }

  // --------- comptage des défis (les chapitres ne comptent pas) ----------
  function challengeTotal() {
    let n = 0; for (const s of stages) if (s.type !== 'chapter') n++; return n;
  }
  function challengesDoneBefore(i) {
    let n = 0; for (let k = 0; k < i; k++) if (stages[k].type !== 'chapter') n++; return n;
  }

  // --------- barre de progression ----------
  function header() {
    const done = challengesDoneBefore(idx);
    const total = challengeTotal();
    const pct = Math.round((done / total) * 100);
    return `
      <div class="run-top">
        <div class="run-prog"><i style="width:${pct}%"></i></div>
        <div class="run-meta">
          <span>DÉFI ${done + 1}/${total}</span>
          <span class="combo ${combo >= 2 ? 'hot' : ''}">COMBO ×${combo}</span>
          <span>+${gained} XP</span>
        </div>
      </div>`;
  }

  // --------- helpers DOM ----------
  function el(tag, cls, txt) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt != null) e.textContent = txt;
    return e;
  }
  function codeBlock(src) {
    const pre = el('pre', 'code-block');
    pre.textContent = src;
    return pre;
  }

  // ---------------------------------------------------------------
  // Aiguillage d'un stage
  // ---------------------------------------------------------------
  function showStage() {
    if (idx >= stages.length) return finish();
    const st = stages[idx];
    if (st.type === 'chapter') return showChapter(st);
    showLesson(st);
  }

  function nextStage() {
    idx += 1;
    showStage();
  }

  // ---------------------------------------------------------------
  // Séparateur de chapitre
  // ---------------------------------------------------------------
  function showChapter(st) {
    area.innerHTML = '';
    const card = el('div', 'chapter-card');
    card.innerHTML = `
      <div class="chapter-kicker">NOUVEAU CHAPITRE</div>
      <h2 class="chapter-title">${st.title}</h2>
      ${st.subtitle ? `<p class="chapter-sub">${st.subtitle}</p>` : ''}
    `;
    const btn = el('button', 'btn btn--big', 'C\'EST PARTI ▶');
    btn.addEventListener('click', () => { window.SFX.select(); nextStage(); });
    card.appendChild(btn);
    area.appendChild(card);
  }

  // ---------------------------------------------------------------
  // Mini-leçon (optionnelle) puis défi
  // ---------------------------------------------------------------
  function showLesson(st) {
    if (!st.lesson) return showChallenge(st);
    const l = st.lesson;
    area.innerHTML = header();
    const card = el('div', 'lesson-card');
    card.innerHTML = `
      <div class="lesson-tag">📘 LEÇON</div>
      <h3 class="lesson-title">${l.title}</h3>
      <p class="lesson-body">${l.body}</p>
    `;
    if (l.example) card.appendChild(codeBlock(l.example));
    const btn = el('button', 'btn', 'J\'AI COMPRIS ▶');
    btn.addEventListener('click', () => { window.SFX.move(); showChallenge(st); });
    card.appendChild(btn);
    area.appendChild(card);
  }

  function showChallenge(st) {
    if (st.type === 'editor') showEditor(st);
    else showQcm(st);
  }

  // --------- QCM ----------
  function showQcm(st) {
    area.innerHTML = header();
    const card = el('div', 'challenge-card');
    card.innerHTML = `<div class="ch-tag">${st.review ? '🔁 RÉVISION' : '🎯 DÉFI'}</div>`;
    if (st.code) card.appendChild(codeBlock(st.code));
    card.appendChild(el('p', 'ch-question', st.question));

    const opts = el('div', 'options');
    let locked = false;
    st.options.forEach((label, i) => {
      const o = el('button', 'option');
      const span = el('span'); span.textContent = label; o.appendChild(span);
      o.addEventListener('click', () => {
        if (locked) return;
        if (i === st.answer) {
          o.classList.add('good');
          locked = true;
          win(st);
        } else {
          o.classList.add('bad');
          o.disabled = true;
          o.classList.add('shake');
          breakCombo();
          window.SFX.wrong();
          S.recordAnswer(false);
        }
      });
      opts.appendChild(o);
    });
    card.appendChild(opts);
    area.appendChild(card);
  }

  // --------- Mini-éditeur ----------
  function showEditor(st) {
    area.innerHTML = header();
    const card = el('div', 'challenge-card');
    card.innerHTML = `
      <div class="ch-tag">${st.review ? '🔁 RÉVISION' : '⌨️ ÉCRIS DU CODE'}</div>
      <p class="ch-question">${st.prompt}</p>
    `;

    const ta = el('textarea', 'editor');
    ta.value = st.starter || '';
    ta.spellcheck = false;
    ta.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const s = ta.selectionStart, en = ta.selectionEnd;
        ta.value = ta.value.slice(0, s) + '  ' + ta.value.slice(en);
        ta.selectionStart = ta.selectionEnd = s + 2;
      }
    });
    card.appendChild(ta);

    const out = el('div', 'editor-out');
    card.appendChild(out);

    const actions = el('div', 'editor-actions');
    const run = el('button', 'btn', '▶ VÉRIFIER');
    actions.appendChild(run);
    const solBtn = el('button', 'btn btn--ghost', '💡 VOIR LA SOLUTION');
    solBtn.style.display = 'none';
    actions.appendChild(solBtn);
    card.appendChild(actions);

    let solved = false, failed = false;

    solBtn.addEventListener('click', () => {
      window.SFX.move();
      if (st.solution) ta.value = st.solution;
      const sol = el('div', 'solution-box');
      sol.appendChild(el('div', 'sol-tag', '💡 SOLUTION'));
      sol.appendChild(codeBlock(st.solution || '(non disponible)'));
      sol.appendChild(el('p', 'sol-hint', 'La solution est recopiée dans l\'éditeur. Lis-la, puis clique sur VÉRIFIER.'));
      solBtn.replaceWith(sol);
    });

    run.addEventListener('click', () => {
      if (solved) return;
      run.disabled = true;
      out.className = 'editor-out';
      out.textContent = '⏳ exécution…';
      runEditorTests(ta.value, st.fnName, st.cases).then((res) => {
        run.disabled = false;
        if (res.ok) {
          solved = true;
          out.className = 'editor-out ok';
          out.textContent = `✅ ${res.passed}/${res.total} tests réussis !`;
          win(st);
        } else {
          out.className = 'editor-out ko';
          out.textContent = '❌ ' + res.message;
          ta.classList.add('shake');
          setTimeout(() => ta.classList.remove('shake'), 400);
          breakCombo();
          window.SFX.wrong();
          S.recordAnswer(false);
          if (!failed) { failed = true; if (st.solution) solBtn.style.display = ''; }
        }
      });
    });

    area.appendChild(card);
  }

  // ---------------------------------------------------------------
  // Exécution sécurisée du code (Worker + chrono anti boucle infinie)
  // ---------------------------------------------------------------
  const WORKER_SRC = `
    self.onmessage = function (e) {
      var d = e.data, userCode = d.userCode, fnName = d.fnName, cases = d.cases;
      function fmt(v){
        if (typeof v === 'string') return '"' + v + '"';
        if (v === undefined) return 'undefined';
        if (Array.isArray(v)) return '[' + v.map(fmt).join(', ') + ']';
        return String(v);
      }
      function args(a){ return a.map(fmt).join(', '); }
      var fn;
      try {
        fn = (new Function(userCode + '\\n; return typeof ' + fnName + " === 'function' ? " + fnName + ' : undefined;'))();
      } catch (err) { self.postMessage({ ok:false, message:'Erreur de syntaxe : ' + err.message }); return; }
      if (typeof fn !== 'function') { self.postMessage({ ok:false, message:'Je ne trouve pas la fonction ' + fnName + '(...). Vérifie son nom.' }); return; }
      var passed = 0;
      for (var i = 0; i < cases.length; i++) {
        var c = cases[i], got;
        try { got = fn.apply(null, c.args); }
        catch (err) { self.postMessage({ ok:false, message: fnName + '(' + args(c.args) + ') a planté : ' + err.message }); return; }
        var same = (got === c.expected) || (got !== got && c.expected !== c.expected);
        if (!same) { self.postMessage({ ok:false, message: fnName + '(' + args(c.args) + ') a renvoyé ' + fmt(got) + ' au lieu de ' + fmt(c.expected) }); return; }
        passed++;
      }
      self.postMessage({ ok:true, passed: passed, total: cases.length });
    };
  `;

  function runEditorTests(userCode, fnName, cases) {
    return new Promise((resolve) => {
      let worker, url;
      try {
        const blob = new Blob([WORKER_SRC], { type: 'application/javascript' });
        url = URL.createObjectURL(blob);
        worker = new Worker(url);
      } catch (e) {
        resolve(runTestsSync(userCode, fnName, cases));
        return;
      }
      const cleanup = () => { worker.terminate(); URL.revokeObjectURL(url); };
      const timer = setTimeout(() => {
        cleanup();
        resolve({ ok: false, message: "⏱️ Ton code met trop de temps (boucle infinie ?). Vérifie la condition d'arrêt de ta boucle." });
      }, RUN_TIMEOUT);
      worker.onmessage = (ev) => { clearTimeout(timer); cleanup(); resolve(ev.data); };
      worker.onerror = (ev) => { clearTimeout(timer); cleanup(); resolve({ ok: false, message: 'Erreur : ' + (ev.message || 'inconnue') }); };
      worker.postMessage({ userCode, fnName, cases });
    });
  }

  function runTestsSync(userCode, fnName, cases) {
    let fn;
    try {
      fn = (new Function(userCode + `\n; return typeof ${fnName} === "function" ? ${fnName} : undefined;`))();
    } catch (e) { return { ok: false, message: 'Erreur de syntaxe : ' + e.message }; }
    if (typeof fn !== 'function') return { ok: false, message: `Je ne trouve pas la fonction ${fnName}(...).` };
    let passed = 0;
    for (const c of cases) {
      let got;
      try { got = fn(...c.args); }
      catch (e) { return { ok: false, message: `${fnName}(${c.args.map(fmt).join(', ')}) a planté : ${e.message}` }; }
      if (!Object.is(got, c.expected)) {
        return { ok: false, message: `${fnName}(${c.args.map(fmt).join(', ')}) a renvoyé ${fmt(got)} au lieu de ${fmt(c.expected)}.` };
      }
      passed++;
    }
    return { ok: true, passed, total: cases.length };
  }

  function fmt(v) {
    if (typeof v === 'string') return `"${v}"`;
    if (v === undefined) return 'undefined';
    if (Array.isArray(v)) return '[' + v.map(fmt).join(', ') + ']';
    return String(v);
  }

  // ---------------------------------------------------------------
  // Réussite d'un défi
  // ---------------------------------------------------------------
  function breakCombo() { combo = 0; refreshHeader(); }

  function win(st) {
    combo += 1;
    runBestCombo = Math.max(runBestCombo, combo);
    runCorrect += 1;
    const xp = BASE_XP + (combo - 1) * COMBO_BONUS;
    gained += xp;

    S.recordAnswer(true);
    S.recordCombo(combo);
    const leveledUp = S.addXp(xp);
    S.setWorldProgress(worldId, (challengesDoneBefore(idx) + 1) / challengeTotal());

    window.SFX.correct();
    if (combo >= 2) window.SFX.combo(combo);

    if (runCorrect === 1) S.awardBadge('first_step');
    if (combo >= 5 && S.awardBadge('combo_5')) window.CQ.toast('🏅 BADGE : COMBO x5 !');
    if (leveledUp) { window.SFX.levelup(); window.CQ.toast(`⬆️ NIVEAU ${S.level} !`); }

    refreshHeader();
    showFeedback(st, xp);
  }

  function refreshHeader() {
    const top = area.querySelector('.run-top');
    if (!top) return;
    const tmp = el('div');
    tmp.innerHTML = header();
    top.replaceWith(tmp.firstElementChild);
  }

  function showFeedback(st, xp) {
    const last = idx + 1 >= stages.length;
    const fb = el('div', 'feedback');
    fb.innerHTML = `
      <div class="fb-head">✅ BRAVO ! <span class="fb-xp">+${xp} XP${combo >= 2 ? ` (combo ×${combo})` : ''}</span></div>
      ${st.explain ? `<p class="fb-explain">💡 ${st.explain}</p>` : ''}
    `;
    const next = el('button', 'btn btn--big', last ? 'VOIR LE BILAN 🏁' : 'CONTINUER ▶');
    next.addEventListener('click', () => { window.SFX.move(); nextStage(); });
    fb.appendChild(next);
    area.appendChild(fb);
    fb.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }

  // ---------------------------------------------------------------
  // Bilan de fin de monde
  // ---------------------------------------------------------------
  function finish() {
    S.setWorldProgress(worldId, 1);
    const content = (window.CQContent || {})[worldId];
    if (worldId === 'js' && S.awardBadge('js_done')) window.CQ.toast('🏅 BADGE : MAÎTRE JS !');
    window.SFX.levelup();

    const total = challengeTotal();
    area.innerHTML = `
      <div class="summary">
        <div class="summary-title">🏁 MONDE TERMINÉ</div>
        <div class="summary-icon">${content ? content.icon : '🎉'}</div>
        <div class="stat-grid">
          <div class="stat-box"><div class="num">+${gained}</div><div class="lbl">XP gagnée</div></div>
          <div class="stat-box"><div class="num">${runCorrect}/${total}</div><div class="lbl">Défis réussis</div></div>
          <div class="stat-box"><div class="num">×${runBestCombo}</div><div class="lbl">Meilleur combo</div></div>
        </div>
        <div class="summary-actions">
          <button class="btn btn--big" id="sum-replay">↻ REJOUER</button>
          <button class="btn" id="sum-back">‹ MONDES</button>
        </div>
      </div>`;
    area.querySelector('#sum-replay').addEventListener('click', () => { window.SFX.select(); start(worldId, area, onComplete); });
    area.querySelector('#sum-back').addEventListener('click', () => { window.SFX.back(); if (onComplete) onComplete(); });
  }

  window.CQEngine = { start };
})();
