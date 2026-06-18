/* =====================================================================
   CODEQUEST — État & progression du joueur (localStorage)
   Multi-profils : chaque profil a sa propre sauvegarde.
   - cq_profiles : liste des noms de profils
   - cq_active   : profil actuellement connecté
   - cq_save_v1::<profil> : données d'un profil
   Exposé via window.GameState.
   ===================================================================== */
(function () {
  const SAVE_PREFIX = 'cq_save_v1::';
  const PROFILES_KEY = 'cq_profiles';
  const ACTIVE_KEY = 'cq_active';

  const XP_PER_LEVEL = 100;

  const DEFAULT = {
    xp: 0,
    answered: 0,
    correct: 0,
    bestCombo: 0,
    playedSeconds: 0,
    worlds: { html: 0, css: 0, js: 0 },
    badges: [],
    createdAt: null,
  };

  let profile = null;          // nom du profil connecté
  let data = structuredClone(DEFAULT);

  // ---------- Helpers profils ----------
  function listProfiles() {
    try { return JSON.parse(localStorage.getItem(PROFILES_KEY)) || []; }
    catch { return []; }
  }
  function saveProfilesList(arr) {
    localStorage.setItem(PROFILES_KEY, JSON.stringify(arr));
  }
  function saveKey(name) { return SAVE_PREFIX + name.toLowerCase(); }

  function loadProfileData(name) {
    try {
      const raw = localStorage.getItem(saveKey(name));
      if (!raw) return structuredClone(DEFAULT);
      return Object.assign(structuredClone(DEFAULT), JSON.parse(raw));
    } catch { return structuredClone(DEFAULT); }
  }

  function save() {
    if (!profile) return;
    localStorage.setItem(saveKey(profile), JSON.stringify(data));
  }

  // ---------- API ----------
  const GameState = {
    // --- gestion des profils ---
    listProfiles,
    current() { return profile; },

    login(name) {
      name = (name || '').trim();
      if (!name) return false;
      const profiles = listProfiles();
      const existing = profiles.find(p => p.toLowerCase() === name.toLowerCase());
      if (!existing) { profiles.push(name); saveProfilesList(profiles); }
      profile = existing || name;
      data = loadProfileData(profile);
      if (!data.createdAt) { data.createdAt = Date.now(); }
      localStorage.setItem(ACTIVE_KEY, profile);
      save();
      return true;
    },

    logout() {
      save();
      profile = null;
      data = structuredClone(DEFAULT);
      localStorage.removeItem(ACTIVE_KEY);
    },

    // Tente de reconnecter le dernier profil actif. Retourne true si OK.
    resume() {
      const active = localStorage.getItem(ACTIVE_KEY);
      if (active) { return this.login(active); }
      return false;
    },

    deleteProfile(name) {
      localStorage.removeItem(saveKey(name));
      saveProfilesList(listProfiles().filter(p => p.toLowerCase() !== name.toLowerCase()));
      if (profile && profile.toLowerCase() === name.toLowerCase()) this.logout();
    },

    // --- données du profil connecté ---
    get()      { return data; },
    get level()      { return Math.floor(data.xp / XP_PER_LEVEL) + 1; },
    get xpInLevel()  { return data.xp % XP_PER_LEVEL; },
    get xpForLevel() { return XP_PER_LEVEL; },
    get accuracy()   { return data.answered ? Math.round((data.correct / data.answered) * 100) : 0; },

    addXp(n) {
      const before = this.level;
      data.xp += n; save();
      return this.level > before;
    },
    recordAnswer(ok) {
      data.answered++; if (ok) data.correct++; save();
    },
    recordCombo(n) {
      if (n > data.bestCombo) { data.bestCombo = n; save(); }
    },
    setWorldProgress(id, ratio) {
      data.worlds[id] = Math.max(data.worlds[id] || 0, Math.min(1, ratio)); save();
    },
    awardBadge(id) {
      if (!data.badges.includes(id)) { data.badges.push(id); save(); return true; }
      return false;
    },
    hasBadge(id) { return data.badges.includes(id); },

    tickTime() { data.playedSeconds++; /* sauvé périodiquement, pas à chaque sec */ },
    flush() { save(); },

    reset() {
      const created = data.createdAt;
      data = structuredClone(DEFAULT);
      data.createdAt = created;
      save();
    },
  };

  window.GameState = GameState;
})();
