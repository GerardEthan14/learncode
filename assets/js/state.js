/* =====================================================================
   CODEQUEST — État & progression du joueur (localStorage)
   Centralise XP, niveau, stats et déblocage des mondes.
   Exposé via window.GameState.
   ===================================================================== */
(function () {
  const KEY = 'cq_save_v1';

  // Courbe d'XP : XP nécessaire pour atteindre le niveau N.
  const XP_PER_LEVEL = 100;

  const DEFAULT = {
    xp: 0,
    answered: 0,      // nb total de réponses
    correct: 0,       // nb de bonnes réponses
    bestCombo: 0,
    playedSeconds: 0,
    worlds: {         // progression par monde (0 → 1)
      html: 0,
      css: 0,
      js: 0,
    },
    badges: [],       // ids des badges débloqués
  };

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return structuredClone(DEFAULT);
      return Object.assign(structuredClone(DEFAULT), JSON.parse(raw));
    } catch {
      return structuredClone(DEFAULT);
    }
  }

  let data = load();

  function save() { localStorage.setItem(KEY, JSON.stringify(data)); }

  const GameState = {
    get()      { return data; },
    get level()   { return Math.floor(data.xp / XP_PER_LEVEL) + 1; },
    get xpInLevel() { return data.xp % XP_PER_LEVEL; },
    get xpForLevel() { return XP_PER_LEVEL; },
    get accuracy() { return data.answered ? Math.round((data.correct / data.answered) * 100) : 0; },

    addXp(n) {
      const before = this.level;
      data.xp += n;
      save();
      return this.level > before; // true => level up
    },

    recordAnswer(ok) {
      data.answered++;
      if (ok) data.correct++;
      save();
    },

    setWorldProgress(id, ratio) {
      data.worlds[id] = Math.max(data.worlds[id] || 0, Math.min(1, ratio));
      save();
    },

    awardBadge(id) {
      if (!data.badges.includes(id)) { data.badges.push(id); save(); return true; }
      return false;
    },
    hasBadge(id) { return data.badges.includes(id); },

    reset() { data = structuredClone(DEFAULT); save(); },
  };

  window.GameState = GameState;
})();
