/* =====================================================================
   CODEQUEST — Moteur de son 8-bit (Web Audio API)
   Génère des bips d'arcade à la volée : aucun fichier audio à charger.
   Tout passe par window.SFX.
   ===================================================================== */
(function () {
  let ctx = null;
  let enabled = (localStorage.getItem('cq_sound') ?? 'on') === 'on';

  function ac() {
    // Le contexte audio ne peut démarrer qu'après une interaction utilisateur.
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  // Joue une note simple (forme d'onde carrée = son rétro).
  function tone(freq, dur, type = 'square', vol = 0.15, when = 0) {
    if (!enabled) return;
    const a = ac();
    const t0 = a.currentTime + when;
    const osc = a.createOscillator();
    const gain = a.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    gain.gain.setValueAtTime(vol, t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain).connect(a.destination);
    osc.start(t0);
    osc.stop(t0 + dur);
  }

  // Petite mélodie (suite de [freq, durée]).
  function seq(notes, type = 'square', vol = 0.15) {
    if (!enabled) return;
    let when = 0;
    notes.forEach(([f, d]) => { if (f) tone(f, d, type, vol, when); when += d; });
  }

  const SFX = {
    setEnabled(v) {
      enabled = v;
      localStorage.setItem('cq_sound', v ? 'on' : 'off');
    },
    isEnabled() { return enabled; },

    // --- Sons de l'interface ---
    move()    { tone(440, 0.05, 'square', 0.08); },
    select()  { seq([[523, 0.06], [784, 0.08]]); },
    back()    { seq([[392, 0.06], [262, 0.08]]); },

    // --- Sons de jeu (utilisés plus tard) ---
    correct() { seq([[660, 0.07], [880, 0.07], [1320, 0.12]], 'square', 0.14); },
    wrong()   { seq([[200, 0.12], [150, 0.18]], 'sawtooth', 0.14); },
    combo(n)  { tone(660 + n * 80, 0.08, 'square', 0.13); },
    levelup() { seq([[523,0.1],[659,0.1],[784,0.1],[1047,0.22]], 'square', 0.16); },
    start()   { seq([[392,0.08],[523,0.08],[659,0.08],[784,0.16]]); },
  };

  window.SFX = SFX;
})();
