
/**
 * ============================================================
 * PAES Challenge Engine v4.0.0 — Producción
 * Lógica del juego + 4 Lotes + Sabiondo 🦉 + 4 Niveles
 * + Cronómetro de desempeño + Sonido next.mp3
 * + Agrupación de preguntas por lectura (Nivel 1)
 * + Nivel 4: Ciencias (Biología, Física, Química)
 * Para "PAES Challenge: Desafío de Admisión Universitaria"
 * ============================================================
 *
 * Niveles:
 *   1. Competencia Lectora (60s) — 25 preguntas
 *   2. Matemática 1 - M1 (45s) — 25 preguntas
 *   3. Matemática 2 - M2 (35s) — 25 preguntas
 *   4. Ciencias (40s) — 25 preguntas
 *
 * Lotes Nivel 1: 2 lecturas completas (10+10) + 1 parcial (5) = 25
 */

// ===== ESTADO GLOBAL =====
const state = {
    score: 0,
    levelScore: 0,
    streak: 0,
    maxStreak: 0,
    currentQuestion: 0,
    totalQuestions: 25,
    currentLevel: 1,
    mode: 'normal',
    timer: 60,
    timerInterval: null,
    _boredTimeout: null,
    _freezeTimeout: null,
    isFrozen: false,
    questions: [],
    correctInLevel: 0,
    powerups: {
        fifty: 3,
        time: 2,
        freeze: 1,
        hint: 2
    },
    powerupsUsedThisLevel: false,
    levelPerfect: true,
    questionStartTime: 0,
    bonusQuestionActive: false,
    levelStars: {},
    badges: {
        perfectScore: false,
        speedDemon: false,
        streaker: false,
        paesPro: false,
        noPowerups: false
    },
    topicScores: {},
    currentLote: null,
    loteData: null,
    lotesDisponibles: [],
    ultimoEstadoBocadillo: null,
    desafioStartTime: null,
    desafioEndTime: null,
    tiempoTotalDesafio: 0,
    totalPreguntasRespondidas: 0,
    lecturaActiva: null
};

// ===== MAPA DE NIVELES =====
const levelNames = {
    1: '📖 Competencia Lectora',
    2: '📐 Matemática 1 (M1)',
    3: '📊 Matemática 2 (M2)',
    4: '🔬 Ciencias'
};

const levelColors = {
    1: '#8B5CF6',
    2: '#3B82F6',
    3: '#10B981',
    4: '#EF4444'
};

const levelTimerDefaults = {
    1: 60,
    2: 45,
    3: 35,
    4: 40
};

const questionsPerLevel = {
    1: 25,
    2: 25,
    3: 25,
    4: 25
};

// ===== SISTEMA DE 4 LOTES =====
const LOTES_STORAGE_KEY = 'paes_lotes_v4';
const LOTES_VERSION = '4.0.0';

function generarLotes() {
    const todasLectora = [...(typeof paesLenguajeQuestions !== 'undefined' ? paesLenguajeQuestions : [])];
    const todasM1 = [...(typeof paesM1Questions !== 'undefined' ? paesM1Questions : [])];
    const todasM2 = [...(typeof paesM2Questions !== 'undefined' ? paesM2Questions : [])];
    const todasCiencias = [...(typeof paesCienciasQuestions !== 'undefined' ? paesCienciasQuestions : [])];

    const shuffleArr = (arr) => {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    };

    // Para Competencia Lectora: agrupar por lectura, luego dividir en 4 lotes
    const lectoraPorLectura = agruparPorLectura(todasLectora);
    const lecturasKeys = shuffleArr(Object.keys(lectoraPorLectura));
    
    const dividirLecturasEn4 = () => {
        const total = lecturasKeys.length; // 10 lecturas
        const porLote = Math.floor(total / 4); // 2 lecturas completas por lote
        const sobrantes = total % 4; // 2 lecturas para dividir
        
        const resultado = [];
        let idx = 0;
        
        for (let i = 0; i < 4; i++) {
            const lote = [];
            // Agregar 2 lecturas completas
            for (let j = 0; j < porLote; j++) {
                const key = lecturasKeys[idx];
                lote.push(...lectoraPorLectura[key]);
                idx++;
            }
            resultado.push(lote);
        }
        
        // Distribuir las 2 lecturas sobrantes como parciales (5 preguntas cada una)
        for (let i = 0; i < sobrantes; i++) {
            const key = lecturasKeys[idx];
            const preguntas = lectoraPorLectura[key];
            const mitad = Math.ceil(preguntas.length / 2);
            
            // Primer lote recibe la primera mitad, segundo lote la segunda mitad
            resultado[i].push(...preguntas.slice(0, mitad));
            resultado[i + 2].push(...preguntas.slice(mitad));
            idx++;
        }
        
        return resultado;
    };

    const lecParts = dividirLecturasEn4();
    
    // Para M1, M2 y Ciencias: shuffle simple y dividir en 4
    const m1Shuffle = shuffleArr(todasM1);
    const m2Shuffle = shuffleArr(todasM2);
    const cienciasShuffle = shuffleArr(todasCiencias);

    const dividirEn4 = (arr) => {
        const len = arr.length;
        const parteSize = Math.ceil(len / 4);
        return [
            arr.slice(0, parteSize),
            arr.slice(parteSize, parteSize * 2),
            arr.slice(parteSize * 2, parteSize * 3),
            arr.slice(parteSize * 3)
        ];
    };

    const m1Parts = dividirEn4(m1Shuffle);
    const m2Parts = dividirEn4(m2Shuffle);
    const cienciasParts = dividirEn4(cienciasShuffle);

    const lotes = [];
    for (let i = 0; i < 4; i++) {
        const m1Lote = m1Parts[i].slice(0, questionsPerLevel[2]);
        const m2Lote = m2Parts[i].slice(0, questionsPerLevel[3]);
        const cienciasLote = cienciasParts[i].slice(0, questionsPerLevel[4]);
        const lecLote = lecParts[i].slice(0, questionsPerLevel[1]);

        lotes.push({
            id: i + 1,
            generado: Date.now(),
            version: LOTES_VERSION,
            preguntas: {
                lectora: lecLote,
                matematica1: m1Lote,
                matematica2: m2Lote,
                ciencias: cienciasLote
            },
            totalPreguntas: lecLote.length + m1Lote.length + m2Lote.length + cienciasLote.length
        });
    }

    return lotes;
}

// ===== UTILIDADES =====
function agruparPorLectura(preguntas) {
    const grupos = {};
    preguntas.forEach(q => {
        if (q.textKey) {
            if (!grupos[q.textKey]) grupos[q.textKey] = [];
            grupos[q.textKey].push(q);
        }
    });
    // Ordenar preguntas dentro de cada grupo por ID
    Object.values(grupos).forEach(g => g.sort((a, b) => a.id - b.id));
    return grupos;
}

function agruparPreguntasPorLectura(preguntas) {
    const grupos = agruparPorLectura(preguntas);
    const gruposArray = shuffleArray(Object.values(grupos));
    const resultado = [];
    gruposArray.forEach(grupo => grupo.forEach(q => resultado.push(q)));
    return resultado;
}

function deepCloneQuestions(arr) {
    try { return JSON.parse(JSON.stringify(arr)); }
    catch (e) { return arr; }
}

function safeLocalGet(key, fallback) {
    try { const raw = localStorage.getItem(key); return raw !== null ? raw : fallback; }
    catch (e) { return fallback; }
}

function safeLocalSet(key, value) {
    try { localStorage.setItem(key, value); return true; }
    catch (e) { return false; }
}

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function guardarLotes(lotes) {
    safeLocalSet(LOTES_STORAGE_KEY, JSON.stringify({ version: LOTES_VERSION, lotes, timestamp: Date.now() }));
}

function cargarLotes() {
    const saved = safeLocalGet(LOTES_STORAGE_KEY, null);
    if (saved) {
        try {
            const data = JSON.parse(saved);
            if (data.version === LOTES_VERSION && data.lotes && data.lotes.length === 4 &&
                data.lotes.every(l => l.preguntas && l.totalPreguntas > 0)) {
                const lotesConEstado = data.lotes.map(l => ({
                    ...l,
                    usado: safeLocalGet(`paes_lote_${l.id}_usado_v4`, 'false') === 'true'
                }));
                if (lotesConEstado.every(l => l.usado)) {
                    const nuevosLotes = generarLotes();
                    guardarLotes(nuevosLotes);
                    for (let i = 1; i <= 4; i++) safeLocalSet(`paes_lote_${i}_usado_v4`, 'false');
                    return nuevosLotes.map(l => ({ ...l, usado: false }));
                }
                return lotesConEstado;
            }
        } catch (e) {}
    }
    const nuevosLotes = generarLotes();
    guardarLotes(nuevosLotes);
    for (let i = 1; i <= 4; i++) safeLocalSet(`paes_lote_${i}_usado_v4`, 'false');
    return nuevosLotes.map(l => ({ ...l, usado: false }));
}

function marcarLoteComoUsado(loteId) { safeLocalSet(`paes_lote_${loteId}_usado_v4`, 'true'); }

function getPreguntasNivel(nivel) {
    if (!state.loteData || !state.loteData.preguntas) return [];
    const preguntas = state.loteData.preguntas;
    const cantidad = questionsPerLevel[nivel] || 25;
    switch (nivel) {
        case 1: return [...preguntas.lectora].slice(0, cantidad);
        case 2: return [...preguntas.matematica1].slice(0, cantidad);
        case 3: return [...preguntas.matematica2].slice(0, cantidad);
        case 4: return [...preguntas.ciencias].slice(0, cantidad);
        default: return [...preguntas.lectora].slice(0, cantidad);
    }
}

// ===== SONIDO =====
function playSound(type) {
    const alwaysPlay = ['correct', 'incorrect', 'levelup', 'levelstart', 'achievement', 'powerup', 'next'];
    if (!alwaysPlay.includes(type) && state.mode === 'normal') return;
    if (window.effectsManager) window.effectsManager.playSound(type);
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    cargarYMostrarLotes();
    loadBadges();
    loadLeaderboard();
    setupPowerups();
    createSpeedBonusToast();
    if (typeof injectBuhoSVGs === 'function') injectBuhoSVGs();
});

function cargarYMostrarLotes() {
    state.lotesDisponibles = cargarLotes();
    actualizarSelectorLotes(state.lotesDisponibles);
}

function actualizarSelectorLotes(lotes) {
    const container = document.getElementById('lote-selector');
    if (!container) return;
    const disponibles = lotes.filter(l => !l.usado);
    container.innerHTML = '';
    if (disponibles.length === 0) {
        container.innerHTML = `<div class="info-card" style="text-align:center;border-left-color:#F59E0B;"><b>¡Completaste las 4 partidas!</b><br><small>Reinicia para nuevas preguntas</small></div>
        <button class="main-btn pulse-ready" onclick="reiniciarLotes()">🔄 Generar Nuevas Partidas</button>`;
        return;
    }
    const info = document.createElement('div');
    info.className = 'info-card';
    info.style.borderLeftColor = '#8B5CF6';
    info.innerHTML = `<strong>🦉 Sabiondo dice:</strong> Elige una partida<br><small>${disponibles.length} partida(s) disponible(s)</small>`;
    container.appendChild(info);
    const grid = document.createElement('div');
    grid.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:8px;width:100%';
    const iconos = ['🎲','🎯','📚','🎓'];
    const colores = ['#8B5CF6','#3B82F6','#10B981','#EF4444'];
    lotes.forEach(lote => {
        const card = document.createElement('div');
        card.className = 'mode-card';
        card.style.cursor = lote.usado ? 'not-allowed' : 'pointer';
        card.style.opacity = lote.usado ? '0.5' : '1';
        if (!lote.usado) card.style.borderLeft = `4px solid ${colores[lote.id-1]}`;
        card.innerHTML = `<div class="mode-icon">${iconos[lote.id-1]}</div>
            <div class="mode-title">Partida ${lote.id}</div>
            <div class="mode-desc">${lote.totalPreguntas} preguntas</div>
            <div class="mode-desc" style="font-size:0.65rem;color:#64748B">📖${lote.preguntas.lectora.length} 📐${lote.preguntas.matematica1.length} 📊${lote.preguntas.matematica2.length} 🔬${lote.preguntas.ciencias.length}</div>
            ${lote.usado ? '<div style="font-size:0.7rem;color:#EF4444">✅ Completada</div>' : ''}`;
        if (!lote.usado) card.addEventListener('click', () => seleccionarLote(lote));
        grid.appendChild(card);
    });
    container.appendChild(grid);
}

function seleccionarLote(lote) {
    if (lote.usado) return;
    state.currentLote = lote.id;
    state.loteData = lote;
    document.getElementById('lote-selector').style.display = 'none';
    const btn = document.getElementById('btn-start');
    if (btn) { btn.style.display = 'block'; btn.textContent = `¡Comenzar Partida ${lote.id}! 🚀`; btn.classList.add('pulse-ready'); }
    const conf = document.getElementById('lote-confirmacion');
    if (conf) { conf.style.display = 'block'; conf.innerHTML = `✅ <b>Partida ${lote.id} seleccionada</b><br><small>📖${lote.preguntas.lectora.length} 📐${lote.preguntas.matematica1.length} 📊${lote.preguntas.matematica2.length} 🔬${lote.preguntas.ciencias.length}</small>`; }
}

function reiniciarLotes() {
    for (let i = 1; i <= 4; i++) safeLocalSet(`paes_lote_${i}_usado_v4`, 'false');
    localStorage.removeItem(LOTES_STORAGE_KEY);
    state.lotesDisponibles = cargarLotes();
    state.currentLote = null;
    state.loteData = null;
    actualizarSelectorLotes(state.lotesDisponibles);
    const btn = document.getElementById('btn-start'); if (btn) btn.style.display = 'none';
    const conf = document.getElementById('lote-confirmacion'); if (conf) conf.style.display = 'none';
    if (window.effectsManager) window.effectsManager.triggerToastAcademico('¡4 nuevas partidas! 🦉', { icon:'🔄', bg:'linear-gradient(135deg,#8B5CF6,#6D28D9)', duration:2500 });
}

function createSpeedBonusToast() {
    if (document.getElementById('speed-bonus-toast')) return;
    const t = document.createElement('div'); t.className = 'speed-bonus-toast'; t.id = 'speed-bonus-toast';
    document.body.appendChild(t);
}

function showSpeedBonus(p) {
    const t = document.getElementById('speed-bonus-toast'); if (!t) return;
    t.textContent = `⚡ +${p} pts`; t.classList.add('show');
    setTimeout(() => t.classList.add('hide'), 1500);
    setTimeout(() => t.classList.remove('show','hide'), 2000);
}

function triggerVisualStarsFromElement(el, c) { if (window.effectsManager) window.effectsManager.triggerStarsFromElement(el, c); }

function setupPowerups() {
    ['fifty','time','freeze','hint'].forEach(t => {
        document.getElementById(`powerup-${t}`)?.addEventListener('click', () => usePowerup(t));
    });
}

// ===== NAVEGACIÓN =====
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById(id);
    if (screen) { screen.classList.add('active'); screen.classList.add('screen-expand'); setTimeout(() => screen.classList.remove('screen-expand'), 500); }
    if (id === 'screen-badges') loadBadges();
    if (id === 'screen-leaderboard') loadLeaderboard();
    if (id === 'screen-welcome') {
        cargarYMostrarLotes();
        const btn = document.getElementById('btn-start'); if (btn) btn.style.display = 'none';
        const conf = document.getElementById('lote-confirmacion'); if (conf) conf.style.display = 'none';
        const sel = document.getElementById('lote-selector'); if (sel) sel.style.display = 'block';
    }
    if (typeof injectBuhoSVGs === 'function') setTimeout(injectBuhoSVGs, 100);
}

function selectMode(m) {
    state.mode = m;
    document.querySelectorAll('.mode-card').forEach(c => c.classList.remove('selected'));
    document.getElementById(`mode-${m}`)?.classList.add('selected');
    const td = document.getElementById('timer-display'); if (td) td.style.display = m === 'timed' ? 'flex' : 'none';
    updatePowerupButtons();
}

// ===== INICIO =====
function startGame() {
    if (!state.currentLote || !state.loteData) {
        if (window.effectsManager) window.effectsManager.triggerToastAcademico('¡Elige una partida! 🦉', { icon:'⚠️', bg:'linear-gradient(135deg,#F59E0B,#D97706)', duration:2500 });
        return;
    }
    if (window.effectsManager) window.effectsManager.ensureAudio();
    state.desafioStartTime = Date.now();
    state.desafioEndTime = null;
    state.tiempoTotalDesafio = 0;
    state.totalPreguntasRespondidas = 0;
    state.score = 0; state.levelScore = 0; state.streak = 0; state.maxStreak = 0;
    state.currentQuestion = 0; state.currentLevel = 1; state.topicScores = {};
    state.isFrozen = false; state.powerupsUsedThisLevel = false; state.levelPerfect = true;
    state.levelStars = {}; state.ultimoEstadoBocadillo = null; state.lecturaActiva = null;
    if (state._freezeTimeout) clearTimeout(state._freezeTimeout);
    state._freezeTimeout = null;
    document.body.className = 'level-1';
    startLevel(1);
}

function startLevel(lv) {
    if (!state.loteData?.preguntas) return;
    state.currentLevel = lv; state.currentQuestion = 0; state.streak = 0;
    state.levelScore = 0; state.isFrozen = false; state.powerupsUsedThisLevel = false;
    state.levelPerfect = true; state.bonusQuestionActive = false; state.correctInLevel = 0;
    if (state._freezeTimeout) clearTimeout(state._freezeTimeout);
    state._freezeTimeout = null;
    document.body.className = `level-${lv}`;
    const raw = getPreguntasNivel(lv);
    const cloned = deepCloneQuestions(raw);
    state.questions = lv === 1 ? cloned : shuffleArray(cloned);
    state.totalQuestions = state.questions.length;
    state.timer = levelTimerDefaults[lv] || 60;
    updatePowerupButtons(); updateLevelDisplay(); updateScore(); updateStreak(); updateProgress();
    showScreen('screen-question'); updateBuhoReaction('thinking'); playSound('levelstart');
    loadQuestion();
}

function goToNextLevel() {
    const next = state.currentLevel + 1;
    if (next <= 4) startLevel(next);
    else showFinalResults();
}

function updateLevelDisplay() {
    const ld = document.getElementById('level-display');
    if (!ld) return;
    ld.textContent = levelNames[state.currentLevel] || `Nivel ${state.currentLevel}`;
    ld.style.background = levelColors[state.currentLevel] || '#8B5CF6';
}

// ===== SABIONDO =====
function updateBuhoReaction(r) {
    state.ultimoEstadoBocadillo = r;
    document.querySelectorAll('.buho-svg').forEach(b => { b.className = 'buho-svg'; void b.offsetWidth; b.className = 'buho-svg ' + r; });
    const sp = document.getElementById('question-speech');
    const msgs = {
        'thinking':['¡Analiza con sabiduría! 🦉','Tú puedes lograrlo 💪','Lee con atención 📖','Confío en tu razonamiento 🧠','¿Cuál será la correcta? 🤓','Sin prisa, pero sin pausa ⏳'],
        'nervous':['¡El tiempo vuela! ⏰','¡Confía en tu instinto! 😰','¡Elige con convicción! ⚡','¡Últimos segundos! 🚨'],
        'bored':['¡Despierta esa mente! ☕','¡Vamos, futuro universitario! 🎓','¡Activa tus neuronas! 🧃'],
        'preocupacion':['¡Uy, cuidado! 🤔','¡Analiza antes de responder! 📖','¡Tómate un momento! ⏳'],
        'alivio':['¡Uf, menos mal! 😮‍💨','¡Qué alivio! 🌿','¡Buen trabajo! 💚'],
        'impressed':['¡Impresionante! 🤩','¡Eres un genio! 🌟','¡Vas directo a la universidad! 🎓✨'],
        'celebrating':['¡Nivel superado! 🥳','¡Sabiondo está orgulloso! 🦉🎉','¡Así se hace! 🌟'],
        'deep-think':['¡Activa tu modo genio! 🔬','¡Piensa profundamente! 🧐','¡Confía en tus cálculos! 📐'],
        'confident':['¡Eliminamos dos! 😎','¡El 50/50 te respalda! ✨','¡Tú tienes el control! 🕶️'],
        'frozen':['¡Tiempo congelado! 🥶','¡Respira y piensa! ❄️','¡Aprovecha estos segundos! ⏸️'],
        'determined':['¡Ahora sí, con todo! 😤','Cada error es una lección 📚','¡Los geniales también se equivocan! 🧠'],
        'graduate':['¡Lo lograste! 🎓','¡La universidad te espera! 🦉✨','¡De estudiante a PROFESIONAL! 🧠👑'],
        'correct':['¡Correcto! ✨','¡Bien hecho! 🌟','¡Así se hace! 💪'],
        'incorrect':['¡No era esa! 💪','¡Cada error nos hace más fuertes! 📚','¡Revisa la explicación! 👀']
    };
    const list = msgs[r] || msgs['thinking'];
    if (sp) { sp.textContent = list[Math.floor(Math.random()*list.length)]; sp.className = 'character-speech state-'+r; sp.style.animation='none'; void sp.offsetHeight; sp.style.animation='speechBubbleIn 0.4s ease-out'; }
}

// ===== LECTURA =====
function mostrarLectura(q) {
    const lc = document.getElementById('lectura-container');
    if (!lc) return;
    if (q.textKey && typeof paesTexts !== 'undefined' && paesTexts[q.textKey]) {
        const t = paesTexts[q.textKey];
        state.lecturaActiva = q.textKey;
        lc.style.display = 'block';
        lc.innerHTML = `<div class="lectura-panel"><div class="lectura-header"><strong>📖 ${t.title}</strong><span class="lectura-author">— ${t.author}</span></div><div class="lectura-body">${t.body.replace(/\n/g,'<br>')}</div></div>`;
    } else { lc.style.display = 'none'; state.lecturaActiva = null; }
}

// ===== CARGA DE PREGUNTAS =====
function loadQuestion() {
    if (state.currentQuestion >= state.totalQuestions) { endLevel(); return; }
    clearInterval(state.timerInterval); state.timerInterval = null;
    if (state._boredTimeout) clearTimeout(state._boredTimeout);
    if (state._freezeTimeout) clearTimeout(state._freezeTimeout);
    state._freezeTimeout = null; state.isFrozen = false;
    state.questionStartTime = Date.now();
    const q = state.questions[state.currentQuestion];
    ['options-grid','matching-container','drag-container','slider-container'].forEach(id => {
        const el = document.getElementById(id); if (el) { el.innerHTML = ''; el.style.display = 'none'; }
    });
    const fb = document.getElementById('feedback-box'); if (fb) { fb.className = 'feedback-box'; fb.innerHTML = ''; }
    const bn = document.getElementById('btn-next'); if (bn) bn.style.display = 'none';
    const qi = document.getElementById('question-image'); if (qi) qi.style.display = 'none';
    if (state.currentLevel === 1) mostrarLectura(q);
    else { const lc = document.getElementById('lectura-container'); if (lc) lc.style.display = 'none'; }
    const qt = document.getElementById('question-text'); if (qt) qt.textContent = q.question;
    if (state.currentLevel >= 2) updateBuhoReaction('deep-think'); else updateBuhoReaction('thinking');
    switch (q.type) {
        case 'multiple': loadMultipleChoice(q); break;
        case 'matching': loadMatching(q); break;
        case 'slider': loadSlider(q); break;
        case 'drag': loadDrag(q); break;
    }
    if (state.mode === 'timed') startTimer();
    updateProgress();
}

function loadMultipleChoice(q) {
    const grid = document.getElementById('options-grid'); if (!grid) return;
    grid.style.display = 'flex';
    const indices = q.options.map((_,i) => i);
    const shuffled = shuffleArray(indices);
    q._shuffledIndices = shuffled;
    const letters = ['A','B','C','D','E'];
    shuffled.forEach((orig, disp) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn'; if (q.isBonus) btn.classList.add('bonus-question');
        btn.textContent = q.options[orig]; btn.dataset.originalIndex = orig;
        btn.setAttribute('aria-label', `Opción ${letters[disp]}: ${q.options[orig]}`);
        btn.setAttribute('role','radio');
        btn.addEventListener('click', () => checkMultipleAnswer(orig, q));
        grid.appendChild(btn);
    });
}

function loadMatching(q) {
    const mc = document.getElementById('matching-container'); if (!mc) return;
    mc.style.display = 'grid'; let sel = null; const matches = {};
    const left = shuffleArray(q.pairs.map(p => ({id:p.id, text:p.left})));
    const right = shuffleArray(q.pairs.map(p => ({id:p.id, text:p.right})));
    left.forEach(item => {
        const d = document.createElement('div'); d.className = 'matching-item'; d.textContent = item.text;
        d.dataset.pairId = item.id; d.dataset.side = 'left';
        d.addEventListener('click', function(){
            if (this.classList.contains('matched')) return;
            if (window.effectsManager) window.effectsManager.ensureAudio();
            mc.querySelectorAll('.matching-item[data-side="left"]').forEach(el => { if (!el.classList.contains('matched')) el.classList.remove('selected'); });
            this.classList.add('selected'); sel = this;
        });
        mc.appendChild(d);
    });
    right.forEach(item => {
        const d = document.createElement('div'); d.className = 'matching-item'; d.textContent = item.text;
        d.dataset.pairId = item.id; d.dataset.side = 'right';
        d.addEventListener('click', function(){
            if (this.classList.contains('matched')) return;
            if (window.effectsManager) window.effectsManager.ensureAudio();
            if (sel && !this.classList.contains('matched')) {
                if (sel.dataset.pairId === this.dataset.pairId) {
                    sel.classList.add('matched'); this.classList.add('matched');
                    matches[this.dataset.pairId] = true; sel = null;
                    if (Object.keys(matches).length === q.pairs.length) {
                        clearInterval(state.timerInterval); state.timerInterval = null;
                        showFeedback(`¡Perfecto! ${q.explanation||''}`, 'correct');
                        triggerVisualStarsFromElement(mc, 16);
                        handleCorrectAnswer(q.points);
                    }
                } else {
                    const le = sel;
                    le.style.borderColor = 'var(--rojo-alerta)'; this.style.borderColor = 'var(--rojo-alerta)';
                    setTimeout(() => { le.style.borderColor = '#CBD5E1'; this.style.borderColor = '#CBD5E1'; le.classList.remove('selected'); }, 500);
                    sel = null;
                }
            }
        });
        mc.appendChild(d);
    });
}

function loadSlider(q) {
    const sc = document.getElementById('slider-container'); if (!sc) return;
    sc.style.display = 'block';
    const vd = document.createElement('div'); vd.className = 'slider-value'; vd.textContent = q.min; vd.id = 'slider-value-display';
    const tr = document.createElement('div'); tr.className = 'slider-track';
    const fl = document.createElement('div'); fl.className = 'slider-fill'; fl.style.width = '0%';
    const inp = document.createElement('input'); inp.type = 'range'; inp.className = 'slider-input';
    inp.min = q.min; inp.max = q.max; inp.step = '0.1'; inp.value = q.min;
    inp.addEventListener('input', () => { fl.style.width = `${((inp.value-q.min)/(q.max-q.min))*100}%`; vd.textContent = inp.value; });
    tr.appendChild(fl); tr.appendChild(inp);
    const sb = document.createElement('button'); sb.className = 'main-btn'; sb.textContent = 'Confirmar ✅';
    sb.addEventListener('click', () => {
        if (window.effectsManager) window.effectsManager.ensureAudio();
        clearInterval(state.timerInterval); state.timerInterval = null;
        const ua = parseFloat(inp.value);
        if (Math.abs(ua - q.correctAnswer) <= q.tolerance) { showFeedback(`¡Correcto! ${q.explanation}`, 'correct'); triggerVisualStarsFromElement(sb,14); handleCorrectAnswer(q.points); }
        else { showFeedback(`Incorrecto. ${q.explanation}`, 'incorrect'); handleIncorrectAnswer(q); }
    });
    sc.appendChild(vd); sc.appendChild(tr); sc.appendChild(sb);
}

function loadDrag(q) {
    const dc = document.getElementById('drag-container'); if (!dc) return;
    dc.style.display = 'flex';
    q.items.forEach((item, idx) => {
        const dz = document.createElement('div'); dz.className = 'drop-zone';
        dz.textContent = `${idx+1}. Soltar aquí`; dz.dataset.index = idx;
        dz.addEventListener('dragover', e => { e.preventDefault(); dz.classList.add('drag-over'); });
        dz.addEventListener('dragleave', () => dz.classList.remove('drag-over'));
        dz.addEventListener('drop', e => {
            if (window.effectsManager) window.effectsManager.ensureAudio();
            e.preventDefault(); dz.classList.remove('drag-over');
            dz.textContent = `${idx+1}. ${q.items[e.dataTransfer.getData('text/plain')]}`;
            dz.dataset.filled = e.dataTransfer.getData('text/plain');
            checkDragComplete(q);
        });
        dc.appendChild(dz);
    });
    const ic = document.createElement('div'); ic.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;margin-top:10px';
    shuffleArray(q.items).forEach(item => {
        const dg = document.createElement('div'); dg.className = 'draggable-item'; dg.textContent = item;
        dg.draggable = true; dg.dataset.originalIndex = q.items.indexOf(item);
        dg.addEventListener('dragstart', e => { e.dataTransfer.setData('text/plain', dg.dataset.originalIndex); dg.style.opacity = '0.5'; });
        dg.addEventListener('dragend', () => { dg.style.opacity = '1'; });
        ic.appendChild(dg);
    });
    dc.appendChild(ic);
}

function checkDragComplete(q) {
    const dzs = document.querySelectorAll('.drop-zone');
    let af = true, ac = true;
    dzs.forEach((z,i) => { if (!z.dataset.filled) af = false; else if (parseInt(z.dataset.filled,10) !== i) ac = false; });
    if (af) {
        clearInterval(state.timerInterval); state.timerInterval = null;
        if (ac) { showFeedback(`¡Excelente! ${q.explanation||''}`, 'correct'); triggerVisualStarsFromElement(document.getElementById('drag-container'),16); handleCorrectAnswer(q.points); }
        else { showFeedback(`Orden incorrecto. ${q.explanation||'Revisa la secuencia.'}`, 'incorrect'); handleIncorrectAnswer(q); }
    }
}

// ===== RESPUESTAS =====
function checkMultipleAnswer(oi, q) {
    if (window.effectsManager) window.effectsManager.ensureAudio();
    const opts = document.querySelectorAll('.option-btn');
    opts.forEach(b => b.disabled = true);
    const si = q._shuffledIndices;
    const cdi = si.indexOf(q.correct);
    let cdi2 = -1;
    opts.forEach((b,i) => { if (parseInt(b.dataset.originalIndex) === oi) cdi2 = i; });
    const rt = (Date.now() - state.questionStartTime) / 1000;
    clearInterval(state.timerInterval); state.timerInterval = null;
    state.totalPreguntasRespondidas++;
    if (oi === q.correct) {
        if (opts[cdi2]) opts[cdi2].classList.add('correct');
        let tp = q.points; let sc = 15;
        if (rt < 3) { const sb = Math.round(q.points * 0.5); tp += sb; sc += 10; showSpeedBonus(sb); }
        if (opts[cdi2]) triggerVisualStarsFromElement(opts[cdi2], sc);
        showFeedback(`¡Correcto! ${q.explanation}${q.isBonus?' 🎁 BONUS!':''}`, q.isBonus?'bonus':'correct');
        handleCorrectAnswer(tp);
    } else {
        if (opts[cdi2]) opts[cdi2].classList.add('incorrect');
        if (opts[cdi]) opts[cdi].classList.add('correct');
        showFeedback(`Incorrecto. ${q.explanation}`, 'incorrect');
        handleIncorrectAnswer(q);
    }
}

function handleCorrectAnswer(pts) {
    if (state._boredTimeout) clearTimeout(state._boredTimeout);
    state.score += pts; state.levelScore += pts; state.streak++; state.correctInLevel++;
    if (state.streak > state.maxStreak) state.maxStreak = state.streak;
    const q = state.questions[state.currentQuestion];
    if (q?.topic) {
        if (!state.topicScores[q.topic]) state.topicScores[q.topic] = {correct:0, total:0};
        state.topicScores[q.topic].correct++; state.topicScores[q.topic].total++;
    }
    updateScore(); updateStreak(); playSound('correct');
    if (window.effectsManager) window.effectsManager.triggerConfettiAcademico();
    if ((Date.now()-state.questionStartTime)/1000 < 3 && window.effectsManager) window.effectsManager.triggerScreenFlash(180);
    updateBuhoReaction('correct');
    if (state.streak >= 5) { document.getElementById('streak-display')?.classList.add('on-fire'); if (window.effectsManager) window.effectsManager.triggerStarRain(); setTimeout(() => updateBuhoReaction('impressed'),400); }
    else if (state.streak >= 3) { if (window.effectsManager) window.effectsManager.triggerStarRain(); setTimeout(() => updateBuhoReaction('impressed'),400); }
    const bn = document.getElementById('btn-next'); if (bn) bn.style.display = 'block';
    checkBadges();
}

function handleIncorrectAnswer(q) {
    if (state._boredTimeout) clearTimeout(state._boredTimeout);
    state.totalPreguntasRespondidas++; state.streak = 0; state.levelPerfect = false;
    document.getElementById('streak-display')?.classList.remove('on-fire');
    if (q?.topic) {
        if (!state.topicScores[q.topic]) state.topicScores[q.topic] = {correct:0, total:0};
        state.topicScores[q.topic].total++;
    }
    updateStreak(); playSound('incorrect'); updateBuhoReaction('incorrect');
    setTimeout(() => updateBuhoReaction('determined'), 400);
    const bn = document.getElementById('btn-next'); if (bn) bn.style.display = 'block';
}

function showFeedback(msg, type) {
    const fb = document.getElementById('feedback-box'); if (!fb) return;
    fb.textContent = msg; fb.className = `feedback-box ${type}`;
}

function nextQuestion() {
    if (window.effectsManager) window.effectsManager.playSound('next');
    clearInterval(state.timerInterval); state.timerInterval = null; state.isFrozen = false;
    if (state._freezeTimeout) clearTimeout(state._freezeTimeout);
    state._freezeTimeout = null; state.currentQuestion++;
    document.getElementById('streak-display')?.classList.remove('on-fire');
    loadQuestion();
}

// ===== FIN DE NIVEL =====
function endLevel() {
    clearInterval(state.timerInterval); state.timerInterval = null;
    if (state._boredTimeout) clearTimeout(state._boredTimeout);
    if (state._freezeTimeout) clearTimeout(state._freezeTimeout);
    state._freezeTimeout = null; state.isFrozen = false;
    const tq = state.totalQuestions || 25;
    const sc = state.levelPerfect ? 3 : (state.correctInLevel >= tq*0.7 ? 2 : 1);
    state.levelStars[state.currentLevel] = sc;
    if (state.levelPerfect && !state.badges.perfectScore) {
        state.badges.perfectScore = true; playSound('achievement');
        if (window.effectsManager) window.effectsManager.triggerFuegosAcademicos();
        setTimeout(() => { if (window.effectsManager) window.effectsManager.triggerToastAcademico('¡Insignia: Puntaje Perfecto!', {icon:'💯',bg:'linear-gradient(135deg,#FFD700,#FFA500)',duration:3500}); }, 300);
        saveBadges();
    }
    if (!state.powerupsUsedThisLevel && !state.badges.noPowerups) {
        state.badges.noPowerups = true; playSound('achievement');
        if (window.effectsManager) window.effectsManager.triggerFuegosAcademicos();
        setTimeout(() => { if (window.effectsManager) window.effectsManager.triggerToastAcademico('¡Insignia: Poder Natural!', {icon:'💪',bg:'linear-gradient(135deg,#8B5CF6,#6D28D9)',duration:3500}); }, 300);
        saveBadges();
    }
    if (state.currentLevel < 4) {
        document.getElementById('transition-title').textContent = `${levelNames[state.currentLevel]} Completado`;
        document.getElementById('transition-speech').textContent = `¡Sabiondo está orgulloso! 🦉`;
        document.getElementById('level-score-display').textContent = state.levelScore;
        let sh = '<div class="star-rating">';
        for (let i=1;i<=3;i++) sh += `<span class="star ${i<=sc?'earned':''}">⭐</span>`;
        sh += '</div>';
        const sCard = document.querySelector('#screen-level-transition .share-card');
        const ls = document.getElementById('level-stars');
        if (ls) ls.innerHTML = sh;
        else if (sCard) { const d = document.createElement('div'); d.id = 'level-stars'; d.innerHTML = sh; sCard.appendChild(d); }
        document.getElementById('btn-next-level').textContent = `Siguiente: ${levelNames[state.currentLevel+1]} ➡️`;
        updateBuhoReaction(state.levelPerfect?'celebrating':'thinking');
        showScreen('screen-level-transition'); playSound('levelup');
        if (window.effectsManager) { window.effectsManager.triggerFuegosAcademicos(); window.effectsManager.triggerConfettiAcademico(2000,2); setTimeout(() => window.effectsManager.triggerConfettiAcademico(1500,1.5),800); }
    } else {
        updateBuhoReaction('graduate'); showFinalResults(); playSound('levelup');
        if (window.effectsManager) window.effectsManager.triggerFuegosAcademicos();
    }
}

function showFinalResults() {
    state.desafioEndTime = Date.now();
    state.tiempoTotalDesafio = (state.desafioEndTime - state.desafioStartTime) / 1000;
    document.getElementById('final-score').textContent = state.score;
    const td = document.getElementById('tiempo-desempeno');
    if (td && state.totalPreguntasRespondidas > 0) {
        const prom = state.tiempoTotalDesafio / state.totalPreguntasRespondidas;
        const min = Math.floor(state.tiempoTotalDesafio / 60);
        const seg = Math.floor(state.tiempoTotalDesafio % 60);
        let ev = '🐢 Sin prisa, lo importante es aprender';
        if (prom < 15) ev = '🏆 ¡Excelente velocidad!';
        else if (prom < 30) ev = '👍 Buen ritmo';
        else if (prom < 60) ev = '📚 Tómate tu tiempo';
        td.innerHTML = `<div style="margin-top:12px;padding:14px;background:#F5F3FF;border-radius:12px;border-left:4px solid #8B5CF6;text-align:left"><strong>⏱️ Desempeño:</strong><br><span style="font-size:0.9rem">• Tiempo total: <b>${min}m ${seg}s</b><br>• Preguntas: <b>${state.totalPreguntasRespondidas}</b><br>• Promedio: <b>${prom.toFixed(1)}s</b><br>• ${ev}</span></div>`;
    }
    const ta = document.getElementById('topic-analysis');
    if (ta) {
        ta.innerHTML = '';
        const tn = { numeros:'Números', algebra:'Álgebra', geometria:'Geometría', probabilidad:'Probabilidad', estadistica:'Estadística', localizar:'Lectura: Localizar', interpretar:'Lectura: Interpretar', evaluar:'Lectura: Evaluar', biologia:'Biología', fisica:'Física', quimica:'Química' };
        const tc = ['#3B82F6','#10B981','#F59E0B','#EF4444','#8B5CF6','#EC4899','#6366F1','#14B8A6','#F97316','#84CC16','#06B6D4'];
        let ci = 0;
        for (const [topic, scores] of Object.entries(state.topicScores)) {
            const pct = scores.total > 0 ? Math.round((scores.correct/scores.total)*100) : 0;
            const bar = document.createElement('div'); bar.className = 'topic-bar';
            bar.innerHTML = `<span class="topic-label">${tn[topic]||topic}</span><div class="topic-progress"><div class="topic-fill" style="width:${pct}%;background:${tc[ci]}"></div></div><span class="topic-score">${pct}%</span>`;
            ta.appendChild(bar); ci = (ci+1) % tc.length;
        }
    }
    const sb = document.getElementById('share-badges');
    if (sb) { sb.innerHTML = ''; for (const [b,u] of Object.entries(state.badges)) { if (u) { const be = document.createElement('span'); be.className = 'share-badge'; be.textContent = getBadgeIcon(b); sb.appendChild(be); } } }
    const sp = document.getElementById('result-character-speech');
    if (sp) {
        if (state.score >= 7000) sp.textContent = '¡Rendimiento excepcional! ¡La universidad te espera! 🎓✨';
        else if (state.score >= 5000) sp.textContent = '¡Excelente! Vas por muy buen camino. 👏🎓';
        else if (state.score >= 3000) sp.textContent = '¡Buen esfuerzo! Sigue practicando. 📚💪';
        else sp.textContent = '¡El aprendizaje es un camino diario! 💡📖';
    }
    if (state.currentLote) marcarLoteComoUsado(state.currentLote);
    showScreen('screen-results');
    if (window.effectsManager) window.effectsManager.triggerFuegosAcademicos();
    saveToLeaderboard();
}

function restartGame() {
    clearInterval(state.timerInterval); state.timerInterval = null;
    if (state._freezeTimeout) clearTimeout(state._freezeTimeout);
    state._freezeTimeout = null; state.isFrozen = false;
    state.currentQuestion = 0; state.score = 0; state.levelScore = 0; state.streak = 0;
    state.currentLevel = 1; state.powerupsUsedThisLevel = false; state.levelPerfect = true;
    state.levelStars = {}; state.bonusQuestionActive = false; state.correctInLevel = 0;
    state.currentLote = null; state.loteData = null; state.ultimoEstadoBocadillo = null;
    state.desafioStartTime = null; state.desafioEndTime = null; state.tiempoTotalDesafio = 0;
    state.totalPreguntasRespondidas = 0; state.lecturaActiva = null;
    document.body.className = 'level-1';
    document.getElementById('streak-display')?.classList.remove('on-fire');
    updateScore(); updateStreak(); updateProgress(); updateLevelDisplay();
    cargarYMostrarLotes();
    const btn = document.getElementById('btn-start'); if (btn) btn.style.display = 'none';
    const conf = document.getElementById('lote-confirmacion'); if (conf) conf.style.display = 'none';
    const sel = document.getElementById('lote-selector'); if (sel) sel.style.display = 'block';
    showScreen('screen-welcome');
}

function goToFinalScreen() { updateBuhoReaction('graduate'); showScreen('screen-final'); if (window.effectsManager) window.effectsManager.triggerFuegosAcademicos(); }

// ===== POWER-UPS =====
function usePowerup(type) {
    if (state.powerups[type] <= 0 || state.currentQuestion >= state.totalQuestions) return;
    if ((type === 'time' || type === 'freeze') && state.mode !== 'timed') return;
    state.powerups[type]--; state.powerupsUsedThisLevel = true;
    updatePowerupButtons(); playSound('powerup');
    const btn = document.getElementById(`powerup-${type}`); if (btn) { btn.classList.add('flash'); setTimeout(() => btn.classList.remove('flash'), 300); }
    switch (type) {
        case 'fifty': applyFiftyFifty(); updateBuhoReaction('confident'); break;
        case 'time': if (state.mode === 'timed') { state.timer += 15; updateTimerDisplay(); } break;
        case 'freeze':
            if (state._freezeTimeout) clearTimeout(state._freezeTimeout);
            state.isFrozen = true; updateBuhoReaction('frozen');
            const td = document.getElementById('timer-display'); if (td) td.style.backgroundColor = '#10B981';
            state._freezeTimeout = setTimeout(() => { state.isFrozen = false; state._freezeTimeout = null; updateBuhoReaction('thinking'); if (td) td.style.backgroundColor = 'var(--azul-oscuro)'; }, 10000);
            break;
        case 'hint': applyHint(); break;
    }
}

function applyFiftyFifty() {
    const q = state.questions[state.currentQuestion]; if (!q || q.type !== 'multiple') return;
    const opts = document.querySelectorAll('.option-btn');
    const si = q._shuffledIndices; const cdi = si.indexOf(q.correct);
    const ii = []; opts.forEach((b,i) => { if (i !== cdi) ii.push(i); });
    shuffleArray(ii).slice(0,2).forEach(i => { if (opts[i]) { opts[i].style.opacity = '0.3'; opts[i].style.pointerEvents = 'none'; } });
}

function applyHint() {
    const q = state.questions[state.currentQuestion]; if (!q) return;
    const fb = document.getElementById('feedback-box'); if (!fb) return;
    fb.textContent = `💡 Pista: ${q.hint || (q.explanation?.split('.')[0]+'.') || 'Analiza con calma.'}`;
    fb.className = 'feedback-box correct';
}

// ===== TEMPORIZADOR =====
function startTimer() {
    clearInterval(state.timerInterval); state.timerInterval = null;
    state.timer = levelTimerDefaults[state.currentLevel] || 60;
    updateTimerDisplay();
    const td = document.getElementById('timer-display'); if (td) td.classList.remove('warning');
    state.timerInterval = setInterval(() => {
        if (state.isFrozen) return;
        state.timer--; updateTimerDisplay();
        if (state.timer <= 10 && state.timer > 0) { if (td) td.classList.add('warning'); updateBuhoReaction('nervous'); if (window.effectsManager) window.effectsManager.playTick(); }
        if (state.timer <= 0) { clearInterval(state.timerInterval); state.timerInterval = null; if (td) td.classList.remove('warning'); if (window.effectsManager) window.effectsManager.playIncorrectFallback(); showFeedback(`¡Tiempo agotado! ${state.questions[state.currentQuestion].explanation}`, 'incorrect'); handleIncorrectAnswer(state.questions[state.currentQuestion]); }
    }, 1000);
    state._boredTimeout = setTimeout(() => { const bn = document.getElementById('btn-next'); if (state.currentQuestion < state.totalQuestions && (!bn || bn.style.display === 'none')) updateBuhoReaction('bored'); }, 20000);
}

function updateTimerDisplay() { const td = document.getElementById('timer-display'); if (td) td.textContent = `⏱️ ${state.timer}s`; }

// ===== UI =====
function updateScore() { const b = document.getElementById('score-badge'); if (!b) return; b.textContent = `⭐ ${state.score} pts`; b.classList.add('pop'); setTimeout(() => b.classList.remove('pop'), 300); if (window.effectsManager?.triggerScoreBadgeFlash) window.effectsManager.triggerScoreBadgeFlash(); }
function updateStreak() { const s = document.getElementById('streak-display'); if (s) s.textContent = `🔥 ${state.streak}`; }
function updateProgress() { const p = document.getElementById('progress-fill'); if (p) p.style.width = `${(state.currentQuestion/state.totalQuestions)*100}%`; }
function updatePowerupButtons() {
    ['fifty','time','freeze','hint'].forEach(t => {
        const b = document.getElementById(`powerup-${t}`); if (!b) return;
        const s = b.querySelector('small'); if (s) s.textContent = `(${state.powerups[t]})`;
        b.disabled = state.powerups[t] <= 0 || ((t === 'time' || t === 'freeze') && state.mode !== 'timed');
    });
}

// ===== INSIGNIAS =====
function checkBadges() {
    if (state.score >= 3000 && !state.badges.paesPro) { state.badges.paesPro = true; playSound('achievement'); if (window.effectsManager) window.effectsManager.triggerFuegosAcademicos(); setTimeout(() => { if (window.effectsManager) window.effectsManager.triggerToastAcademico('¡PAES Pro!', {icon:'🏆',bg:'linear-gradient(135deg,#F59E0B,#D97706)',duration:3500}); },300); saveBadges(); }
    if (state.streak >= 5 && !state.badges.streaker) { state.badges.streaker = true; playSound('achievement'); if (window.effectsManager) window.effectsManager.triggerFuegosAcademicos(); setTimeout(() => { if (window.effectsManager) window.effectsManager.triggerToastAcademico('¡Rachador!', {icon:'🔥',bg:'linear-gradient(135deg,#EF4444,#DC2626)',duration:3500}); },300); saveBadges(); }
    if (state.mode === 'timed' && (Date.now()-state.questionStartTime) < 3000 && !state.badges.speedDemon) { state.badges.speedDemon = true; playSound('achievement'); if (window.effectsManager) window.effectsManager.triggerFuegosAcademicos(); setTimeout(() => { if (window.effectsManager) window.effectsManager.triggerToastAcademico('¡Velocista!', {icon:'⚡',bg:'linear-gradient(135deg,#3B82F6,#1D4ED8)',duration:3500}); },300); saveBadges(); }
}
function getBadgeIcon(b) { const i = { perfectScore:'💯', speedDemon:'⚡', streaker:'🔥', paesPro:'🏆', noPowerups:'💪' }; return i[b]||'🏅'; }
function getBadgeName(b) { const n = { perfectScore:'Puntaje Perfecto', speedDemon:'Velocista', streaker:'Rachador', paesPro:'PAES Pro', noPowerups:'Poder Natural' }; return n[b]||b; }
function loadBadges() {
    const saved = safeLocalGet('paes_badges_v4', null);
    if (saved) { try { state.badges = { ...state.badges, ...JSON.parse(saved) }; } catch(e) {} }
    const g = document.getElementById('badges-grid'); if (!g) return;
    g.innerHTML = '';
    for (const [b,u] of Object.entries(state.badges)) {
        const e = document.createElement('div'); e.className = `badge-item ${u?'unlocked':''}`;
        e.innerHTML = `<div class="badge-icon">${getBadgeIcon(b)}</div><div class="badge-name">${getBadgeName(b)}</div>`;
        g.appendChild(e);
    }
}
function saveBadges() { safeLocalSet('paes_badges_v4', JSON.stringify(state.badges)); }

// ===== LEADERBOARD =====
function showNamePromptModal(cb) {
    const ov = document.createElement('div');
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,0.55);z-index:3000;display:flex;align-items:center;justify-content:center;font-family:Poppins,sans-serif;padding:20px';
    const bx = document.createElement('div');
    bx.style.cssText = 'background:white;padding:26px 24px;border-radius:18px;max-width:340px;width:100%;text-align:center;box-shadow:0 20px 50px rgba(0,0,0,0.32)';
    bx.innerHTML = `<div style="font-weight:800;font-size:1.15rem;margin-bottom:8px;color:#1E293B">¡Buen trabajo! 🦉</div><div style="margin-bottom:16px;color:#64748B;font-size:0.9rem">Ingresa tu nombre</div><input id="paes-name-input" type="text" maxlength="20" placeholder="Jugador" style="width:100%;padding:11px 14px;border-radius:10px;border:1.5px solid #CBD5E1;margin-bottom:16px;font-family:inherit;font-size:1rem"><div style="display:flex;gap:10px;justify-content:center"><button id="paes-name-skip" style="flex:1;padding:11px 0;border-radius:10px;border:none;background:#E2E8F0;color:#334155;font-weight:700;cursor:pointer">Omitir</button><button id="paes-name-ok" style="flex:1;padding:11px 0;border-radius:10px;border:none;background:linear-gradient(135deg,#2563EB,#1D4ED8);color:white;font-weight:700;cursor:pointer">Guardar</button></div>`;
    ov.appendChild(bx); document.body.appendChild(ov);
    const inp = bx.querySelector('#paes-name-input'); inp.focus();
    const close = (v) => { ov.remove(); cb(v); };
    bx.querySelector('#paes-name-ok').addEventListener('click', () => close(inp.value.trim()||'Jugador'));
    bx.querySelector('#paes-name-skip').addEventListener('click', () => close(null));
    inp.addEventListener('keydown', (e) => { if (e.key==='Enter') close(inp.value.trim()||'Jugador'); });
    document.addEventListener('keydown', function esc(e) { if (e.key==='Escape') { close(null); document.removeEventListener('keydown',esc); } });
}

function saveToLeaderboard() {
    showNamePromptModal((name) => {
        if (!name) return;
        const lb = JSON.parse(safeLocalGet('paes_leaderboard_v4','[]'));
        lb.push({ name, score:state.score, badges:Object.values(state.badges).filter(Boolean).length, tiempo:state.tiempoTotalDesafio, promedio:state.totalPreguntasRespondidas>0?(state.tiempoTotalDesafio/state.totalPreguntasRespondidas).toFixed(1):0, date:new Date().toLocaleDateString() });
        lb.sort((a,b) => b.score - a.score);
        safeLocalSet('paes_leaderboard_v4', JSON.stringify(lb.slice(0,20)));
        loadLeaderboard();
    });
}

function loadLeaderboard() {
    let lb = [];
    try { lb = JSON.parse(safeLocalGet('paes_leaderboard_v4','[]')); } catch(e) {}
    const tbody = document.getElementById('leaderboard-body'); if (!tbody) return;
    tbody.innerHTML = '';
    lb.forEach((e,i) => {
        const r = document.createElement('tr');
        r.innerHTML = `<td class="${i<3?'rank-'+(i+1):''}">${i+1}</td><td>${e.name}</td><td>${e.score} pts</td><td>${'🏅'.repeat(e.badges)}</td>`;
        tbody.appendChild(r);
    });
}

function shareResults() {
    const prom = state.totalPreguntasRespondidas>0?(state.tiempoTotalDesafio/state.totalPreguntasRespondidas).toFixed(1):'---';
    const text = `🎓 ¡${state.score} puntos en PAES Challenge! ⏱️ ${prom}s/pregunta. ¿Puedes superarme? 🦉`;
    if (navigator.share) navigator.share({title:'PAES Challenge',text,url:window.location.href}).catch(()=>{});
    else navigator.clipboard.writeText(text).then(()=>{ if(window.effectsManager) window.effectsManager.triggerToastAcademico('¡Copiado!',{icon:'📋',duration:2500}); }).catch(()=>{ if(window.effectsManager) window.effectsManager.triggerToastAcademico('No se pudo copiar',{icon:'⚠️',duration:2500}); });
}
