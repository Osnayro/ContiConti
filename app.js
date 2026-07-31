
/**
 * ============================================================
 * PAES Challenge Engine v3.1.0 — Producción
 * Lógica del juego + 4 Lotes por nivel + Sabiondo 🦉
 * + Cronómetro de desempeño + Sonido next.mp3
 * + Agrupación de preguntas por lectura (Nivel 1)
 * Para "PAES Challenge: Desafío de Admisión Universitaria"
 * ============================================================
 *
 * Cambios v3.1.0:
 *   - Nivel 1: preguntas agrupadas por lectura (textKey)
 *   - Misma lectura = preguntas consecutivas
 *   - Orden de grupos aleatorio, preguntas internas por ID
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
    // Cronómetro de desempeño
    desafioStartTime: null,
    desafioEndTime: null,
    tiempoTotalDesafio: 0,
    totalPreguntasRespondidas: 0,
    // Lectura activa para Competencia Lectora
    lecturaActiva: null
};

// ===== MAPA DE NIVELES =====
const levelNames = {
    1: '📖 Competencia Lectora',
    2: '📐 Matemática 1 (M1)',
    3: '📊 Matemática 2 (M2)'
};

const levelColors = {
    1: '#8B5CF6',
    2: '#3B82F6',
    3: '#10B981'
};

const levelTimerDefaults = {
    1: 60,
    2: 45,
    3: 35
};

// Cantidad de preguntas por nivel
const questionsPerLevel = {
    1: 20,
    2: 25,
    3: 25
};

// ===== SISTEMA DE 4 LOTES POR NIVEL =====
const LOTES_STORAGE_KEY = 'paes_lotes_v3';
const LOTES_VERSION = '3.1.0';

function generarLotes() {
    const todasLectora = [...(typeof paesLenguajeQuestions !== 'undefined' ? paesLenguajeQuestions : [])];
    const todasM1 = [...(typeof paesM1Questions !== 'undefined' ? paesM1Questions : [])];
    const todasM2 = [...(typeof paesM2Questions !== 'undefined' ? paesM2Questions : [])];

    const shuffleArr = (arr) => {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    };

    const lectoraShuffle = shuffleArr(todasLectora);
    const m1Shuffle = shuffleArr(todasM1);
    const m2Shuffle = shuffleArr(todasM2);

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

    const lecParts = dividirEn4(lectoraShuffle);
    const m1Parts = dividirEn4(m1Shuffle);
    const m2Parts = dividirEn4(m2Shuffle);

    const lotes = [];
    for (let i = 0; i < 4; i++) {
        const m1Lote = m1Parts[i].slice(0, questionsPerLevel[2]);
        const m2Lote = m2Parts[i].slice(0, questionsPerLevel[3]);
        const lecLote = lecParts[i].slice(0, questionsPerLevel[1]);

        lotes.push({
            id: i + 1,
            generado: Date.now(),
            version: LOTES_VERSION,
            preguntas: {
                lectora: lecLote,
                matematica1: m1Lote,
                matematica2: m2Lote
            },
            totalPreguntas: lecLote.length + m1Lote.length + m2Lote.length
        });
    }

    return lotes;
}

function guardarLotes(lotes) {
    const data = {
        version: LOTES_VERSION,
        lotes: lotes,
        timestamp: Date.now()
    };
    safeLocalSet(LOTES_STORAGE_KEY, JSON.stringify(data));
}

function cargarLotes() {
    const saved = safeLocalGet(LOTES_STORAGE_KEY, null);
    
    if (saved) {
        try {
            const data = JSON.parse(saved);
            
            if (data.version === LOTES_VERSION && 
                data.lotes && 
                data.lotes.length === 4 &&
                data.lotes.every(l => l.preguntas && l.totalPreguntas > 0)) {
                
                const lotesConEstado = data.lotes.map(l => ({
                    ...l,
                    usado: safeLocalGet(`paes_lote_${l.id}_usado_v3`, 'false') === 'true'
                }));
                
                if (lotesConEstado.every(l => l.usado)) {
                    const nuevosLotes = generarLotes();
                    guardarLotes(nuevosLotes);
                    for (let i = 1; i <= 4; i++) {
                        safeLocalSet(`paes_lote_${i}_usado_v3`, 'false');
                    }
                    return nuevosLotes.map(l => ({ ...l, usado: false }));
                }
                
                return lotesConEstado;
            }
        } catch (e) {
            console.warn('Error al cargar lotes, regenerando:', e);
        }
    }
    
    const nuevosLotes = generarLotes();
    guardarLotes(nuevosLotes);
    for (let i = 1; i <= 4; i++) {
        safeLocalSet(`paes_lote_${i}_usado_v3`, 'false');
    }
    return nuevosLotes.map(l => ({ ...l, usado: false }));
}

function marcarLoteComoUsado(loteId) {
    safeLocalSet(`paes_lote_${loteId}_usado_v3`, 'true');
}

function getPreguntasNivel(nivel) {
    if (!state.loteData || !state.loteData.preguntas) {
        console.error('No hay lote cargado');
        return [];
    }

    const preguntas = state.loteData.preguntas;
    const cantidad = questionsPerLevel[nivel] || 25;

    switch (nivel) {
        case 1:
            return [...preguntas.lectora].slice(0, cantidad);
        case 2:
            return [...preguntas.matematica1].slice(0, cantidad);
        case 3:
            return [...preguntas.matematica2].slice(0, cantidad);
        default:
            return [...preguntas.lectora].slice(0, cantidad);
    }
}

// ===== UTILIDADES =====
function deepCloneQuestions(arr) {
    try {
        return JSON.parse(JSON.stringify(arr));
    } catch (e) {
        console.warn('Error al clonar preguntas, usando array original.');
        return arr;
    }
}

function safeLocalGet(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw !== null ? raw : fallback;
    } catch (e) {
        console.warn('localStorage no disponible para', key);
        return fallback;
    }
}

function safeLocalSet(key, value) {
    try {
        localStorage.setItem(key, value);
        return true;
    } catch (e) {
        console.warn('No se pudo guardar en localStorage:', key);
        return false;
    }
}

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * Agrupa las preguntas de Competencia Lectora por su lectura (textKey).
 * Las preguntas de una misma lectura aparecen juntas y ordenadas por ID.
 * El orden de los grupos es aleatorio.
 * Las preguntas sin textKey se colocan al final.
 */
function agruparPreguntasPorLectura(preguntas) {
    const grupos = {};
    const sinLectura = [];
    
    preguntas.forEach(q => {
        if (q.textKey) {
            if (!grupos[q.textKey]) {
                grupos[q.textKey] = [];
            }
            grupos[q.textKey].push(q);
        } else {
            sinLectura.push(q);
        }
    });
    
    // Ordenar preguntas dentro de cada grupo por ID
    Object.values(grupos).forEach(grupo => {
        grupo.sort((a, b) => a.id - b.id);
    });
    
    // Convertir grupos a array y mezclar el orden de los grupos
    const gruposArray = Object.values(grupos);
    const gruposMezclados = shuffleArray(gruposArray);
    
    // Aplanar: todas las preguntas de un mismo grupo van juntas
    const resultado = [];
    gruposMezclados.forEach(grupo => {
        grupo.forEach(q => resultado.push(q));
    });
    
    // Agregar preguntas sin lectura al final
    sinLectura.forEach(q => resultado.push(q));
    
    return resultado;
}

// ===== SISTEMA DE SONIDO =====
function playSound(type) {
    const alwaysPlay = ['correct', 'incorrect', 'levelup', 'levelstart', 'achievement', 'powerup', 'next'];
    if (!alwaysPlay.includes(type) && state.mode === 'normal') return;
    if (window.effectsManager) {
        window.effectsManager.playSound(type);
    }
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
    const lotes = cargarLotes();
    state.lotesDisponibles = lotes;
    actualizarSelectorLotes(lotes);
}

function actualizarSelectorLotes(lotes) {
    const container = document.getElementById('lote-selector');
    if (!container) return;

    const lotesDisponibles = lotes.filter(l => !l.usado);
    const todosUsados = lotesDisponibles.length === 0;

    container.innerHTML = '';

    if (todosUsados) {
        container.innerHTML = `
            <div class="info-card" style="text-align:center; border-left-color: #F59E0B;">
                🎯 <b>¡Completaste las 4 partidas!</b><br>
                <small>Reinicia para generar nuevas preguntas</small>
            </div>
            <button class="main-btn pulse-ready" onclick="reiniciarLotes()">
                🔄 Generar Nuevas Partidas
            </button>
        `;
        return;
    }

    const loteInfo = document.createElement('div');
    loteInfo.className = 'info-card';
    loteInfo.style.borderLeftColor = '#8B5CF6';
    loteInfo.innerHTML = `
        <strong>🦉 Sabiondo dice:</strong> Elige una partida para comenzar<br>
        <small>Cada partida tiene preguntas diferentes. Tienes ${lotesDisponibles.length} partida(s) disponible(s).</small>
    `;
    container.appendChild(loteInfo);

    const loteGrid = document.createElement('div');
    loteGrid.style.cssText = 'display:grid; grid-template-columns:1fr 1fr; gap:8px; width:100%;';

    const iconos = ['🎲', '🎯', '📚', '🎓'];
    const colores = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B'];
    
    lotes.forEach(lote => {
        const card = document.createElement('div');
        card.className = 'mode-card';
        card.style.cursor = lote.usado ? 'not-allowed' : 'pointer';
        card.style.opacity = lote.usado ? '0.5' : '1';
        if (!lote.usado) {
            card.style.borderLeft = `4px solid ${colores[lote.id - 1]}`;
        }
        
        card.innerHTML = `
            <div class="mode-icon">${iconos[lote.id - 1]}</div>
            <div class="mode-title">Partida ${lote.id}</div>
            <div class="mode-desc">${lote.totalPreguntas} preguntas</div>
            <div class="mode-desc" style="font-size:0.65rem;color:#64748B;">
                📖 ${lote.preguntas.lectora.length} | 📐 ${lote.preguntas.matematica1.length} | 📊 ${lote.preguntas.matematica2.length}
            </div>
            ${lote.usado ? '<div style="font-size:0.7rem;color:#EF4444;">✅ Completada</div>' : ''}
        `;

        if (!lote.usado) {
            card.addEventListener('click', () => seleccionarLote(lote));
        }

        loteGrid.appendChild(card);
    });

    container.appendChild(loteGrid);
}

function seleccionarLote(lote) {
    if (lote.usado) {
        console.warn('Este lote ya fue usado.');
        return;
    }

    state.currentLote = lote.id;
    state.loteData = lote;
    
    const selectorContainer = document.getElementById('lote-selector');
    if (selectorContainer) {
        selectorContainer.style.display = 'none';
    }
    
    const btnStart = document.getElementById('btn-start');
    if (btnStart) {
        btnStart.style.display = 'block';
        btnStart.textContent = `¡Comenzar Partida ${lote.id}! 🚀`;
        btnStart.classList.add('pulse-ready');
    }

    const confirmacion = document.getElementById('lote-confirmacion');
    if (confirmacion) {
        confirmacion.style.display = 'block';
        confirmacion.innerHTML = `
            ✅ <b>Partida ${lote.id} seleccionada</b><br>
            <small>📖 ${lote.preguntas.lectora.length} Lectura | 📐 ${lote.preguntas.matematica1.length} M1 | 📊 ${lote.preguntas.matematica2.length} M2</small>
        `;
    }
}

function reiniciarLotes() {
    for (let i = 1; i <= 4; i++) {
        safeLocalSet(`paes_lote_${i}_usado_v3`, 'false');
    }
    localStorage.removeItem(LOTES_STORAGE_KEY);
    
    const nuevosLotes = cargarLotes();
    state.lotesDisponibles = nuevosLotes;
    state.currentLote = null;
    state.loteData = null;
    
    actualizarSelectorLotes(nuevosLotes);
    
    const btnStart = document.getElementById('btn-start');
    if (btnStart) btnStart.style.display = 'none';
    const confirmacion = document.getElementById('lote-confirmacion');
    if (confirmacion) confirmacion.style.display = 'none';
    
    if (window.effectsManager) {
        window.effectsManager.triggerToastAcademico('¡4 nuevas partidas generadas! 🦉', {
            icon: '🔄',
            bg: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
            duration: 2500
        });
    }
}

function createSpeedBonusToast() {
    if (document.getElementById('speed-bonus-toast')) return;
    const toast = document.createElement('div');
    toast.className = 'speed-bonus-toast';
    toast.id = 'speed-bonus-toast';
    document.body.appendChild(toast);
}

function showSpeedBonus(points) {
    const toast = document.getElementById('speed-bonus-toast');
    if (!toast) return;
    toast.textContent = `⚡ ¡Velocidad bonus! +${points} pts`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.add('hide'), 1500);
    setTimeout(() => { toast.classList.remove('show', 'hide'); }, 2000);
}

function triggerVisualStarsFromElement(element, count = 15) {
    if (window.effectsManager) {
        window.effectsManager.triggerStarsFromElement(element, count);
    }
}

function setupSplashScreen() {
    const splashScreen = document.getElementById('splash-screen');
    setTimeout(() => {
        if (splashScreen && !splashScreen.classList.contains('hidden')) {
            splashScreen.classList.add('hidden');
        }
    }, 60000);
}

function setupPowerups() {
    document.getElementById('powerup-fifty')?.addEventListener('click', () => usePowerup('fifty'));
    document.getElementById('powerup-time')?.addEventListener('click', () => usePowerup('time'));
    document.getElementById('powerup-freeze')?.addEventListener('click', () => usePowerup('freeze'));
    document.getElementById('powerup-hint')?.addEventListener('click', () => usePowerup('hint'));
}

// ===== NAVEGACIÓN =====
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.add('active');
        screen.classList.add('screen-expand');
        setTimeout(() => screen.classList.remove('screen-expand'), 500);
    }
    if (screenId === 'screen-badges') loadBadges();
    if (screenId === 'screen-leaderboard') loadLeaderboard();
    if (screenId === 'screen-welcome') {
        cargarYMostrarLotes();
        const btnStart = document.getElementById('btn-start');
        if (btnStart) btnStart.style.display = 'none';
        const confirmacion = document.getElementById('lote-confirmacion');
        if (confirmacion) confirmacion.style.display = 'none';
        const loteSelector = document.getElementById('lote-selector');
        if (loteSelector) loteSelector.style.display = 'block';
    }
    if (typeof injectBuhoSVGs === 'function') setTimeout(injectBuhoSVGs, 100);
}

function selectMode(mode) {
    state.mode = mode;
    document.querySelectorAll('.mode-card').forEach(card => card.classList.remove('selected'));
    document.getElementById(`mode-${mode}`)?.classList.add('selected');
    const timerDisplay = document.getElementById('timer-display');
    if (timerDisplay) timerDisplay.style.display = mode === 'timed' ? 'flex' : 'none';
    updatePowerupButtons();
}

// ===== INICIO DEL JUEGO =====
function startGame() {
    if (!state.currentLote || !state.loteData) {
        if (window.effectsManager) {
            window.effectsManager.triggerToastAcademico('¡Selecciona una partida primero! 🦉', {
                icon: '⚠️',
                bg: 'linear-gradient(135deg, #F59E0B, #D97706)',
                duration: 2500
            });
        }
        return;
    }

    if (window.effectsManager) window.effectsManager.ensureAudio();
    
    // Iniciar cronómetro de desempeño
    state.desafioStartTime = Date.now();
    state.desafioEndTime = null;
    state.tiempoTotalDesafio = 0;
    state.totalPreguntasRespondidas = 0;
    
    state.score = 0; 
    state.levelScore = 0; 
    state.streak = 0; 
    state.maxStreak = 0;
    state.currentQuestion = 0; 
    state.currentLevel = 1; 
    state.topicScores = {};
    state.isFrozen = false; 
    state.powerupsUsedThisLevel = false; 
    state.levelPerfect = true;
    state.levelStars = {};
    state.ultimoEstadoBocadillo = null;
    state.lecturaActiva = null;
    
    if (state._freezeTimeout) clearTimeout(state._freezeTimeout);
    state._freezeTimeout = null;
    
    document.body.className = 'level-1';
    startLevel(1);
}

function startLevel(levelNum) {
    if (!state.loteData || !state.loteData.preguntas) {
        console.error('No hay datos de lote cargados.');
        return;
    }

    state.currentLevel = levelNum;
    state.currentQuestion = 0;
    state.streak = 0;
    state.levelScore = 0;
    state.isFrozen = false;
    state.powerupsUsedThisLevel = false;
    state.levelPerfect = true;
    state.bonusQuestionActive = false;
    state.correctInLevel = 0;
    
    if (state._freezeTimeout) clearTimeout(state._freezeTimeout);
    state._freezeTimeout = null;

    document.body.className = `level-${levelNum}`;

    const rawQuestions = getPreguntasNivel(levelNum);
    const cloned = deepCloneQuestions(rawQuestions);

    // Nivel 1: agrupar preguntas por lectura (textKey)
    // Niveles 2 y 3: mezclar aleatoriamente
    if (levelNum === 1) {
        state.questions = agruparPreguntasPorLectura(cloned);
    } else {
        state.questions = shuffleArray(cloned);
    }

    state.totalQuestions = state.questions.length;
    state.timer = levelTimerDefaults[levelNum] || 60;

    updatePowerupButtons();
    updateLevelDisplay();
    updateScore();
    updateStreak();
    updateProgress();
    showScreen('screen-question');
    updateBuhoReaction('thinking');
    playSound('levelstart');
    loadQuestion();
}

function goToNextLevel() {
    const nextLevel = state.currentLevel + 1;
    if (nextLevel <= 3) {
        startLevel(nextLevel);
    } else {
        showFinalResults();
    }
}

function updateLevelDisplay() {
    const ld = document.getElementById('level-display');
    if (!ld) return;
    ld.textContent = levelNames[state.currentLevel] || `Nivel ${state.currentLevel}`;
    ld.style.background = levelColors[state.currentLevel] || '#8B5CF6';
}

// ===== REACCIONES DE SABIONDO EL BÚHO 🦉 =====
function updateBuhoReaction(reaction) {
    state.ultimoEstadoBocadillo = reaction;
    
    document.querySelectorAll('.buho-svg').forEach(buho => {
        buho.className = 'buho-svg';
        void buho.offsetWidth;
        buho.className = 'buho-svg ' + reaction;
    });
    
    const speech = document.getElementById('question-speech');
    const messages = {
        'thinking': [
            '¡Analiza con sabiduría! 🦉', 'Tú puedes lograrlo 💪', 'Lee con atención 📖',
            'Confío en tu razonamiento 🧠', 'Cada opción es una pista 👀',
            '¿Cuál será la correcta? 🤓', 'Sin prisa, pero sin pausa ⏳', 'El conocimiento está en ti 📚'
        ],
        'nervous': [
            '¡El tiempo vuela! ⏰', '¡Confía en tu instinto! 😰', '¡No te paralices! ❄️',
            '¡Elige con convicción! ⚡', '¡Últimos segundos! 🚨', '¡Tú sabes la respuesta! 🏃'
        ],
        'bored': [
            '¡Despierta esa mente! ☕', '¡Vamos, futuro universitario! 🎓', '¡No te duermas en clases! 💤',
            '¡Activa tus neuronas! 🧃', '¿Necesitas un café? ☕✨'
        ],
        'preocupacion': [
            '¡Uy, cuidado! Revisa bien 🤔', '¡No te precipites! 🦉',
            '¡Analiza antes de responder! 📖', '¿Estás seguro de esa respuesta? 💭',
            '¡Tómate un momento para pensar! ⏳', '¡La paciencia es sabiduría! 🧠'
        ],
        'alivio': [
            '¡Uf, menos mal! 😮‍💨', '¡Qué alivio! Respira hondo 🌿',
            '¡Buen trabajo recuperándote! 💚', '¡Así se superan los obstáculos! 🦉',
            '¡La calma trae claridad! ✨', '¡Sigue con confianza! 🌟'
        ],
        'impressed': [
            '¡Impresionante! 🤩', '¡Eres un genio! 🌟', '¡Qué mente brillante! 🧠',
            '¡Nadie te detiene! 🔥', '¡Vas directo a la universidad! 🎓✨',
            '¡La PAES tiembla contigo! ⚡'
        ],
        'celebrating': [
            '¡Nivel superado con honores! 🥳', '¡Sabiondo está orgulloso! 🦉🎉',
            '¡Cada vez más cerca! 🏆', '¡Así se hace! 🌟',
            '¡La práctica hace al maestro! 🎓✨'
        ],
        'deep-think': [
            '¡Activa tu modo genio! 🔬', '¡Piensa profundamente! 🧐',
            '¡Confía en tus cálculos! 📐', 'Esto es para mentes brillantes 💡',
            '¡Activa tu súper cerebro! 🧮', 'Los números no mienten 🔢'
        ],
        'confident': [
            '¡Eliminamos dos, ahora es fácil! 😎', '¡El 50/50 te respalda! ✨',
            '¡Tú tienes el control! 🕶️', '¡Camino despejado! 🛤️'
        ],
        'frozen': [
            '¡Tiempo congelado! 🥶', '¡Respira y piensa! ❄️',
            '¡Sin prisa, analiza bien! ⛄', '¡Aprovecha estos segundos! ⏸️'
        ],
        'determined': [
            '¡Ahora sí, con todo! 😤', '¡Esta no la fallo! 💪🔥',
            'Cada error es una lección 📚', '¡Los genios también se equivocan! 🧠💡'
        ],
        'graduate': [
            '¡Lo lograste! 🎓', '¡La universidad te espera! 🦉✨',
            '¡De estudiante a PROFESIONAL! 🧠👑', '¡Hoy celebras tu conocimiento! 🎉📚'
        ],
        'correct': [
            '¡Respuesta correcta! ✨', '¡Bien hecho! 🌟', '¡Así se hace! 💪',
            '¡Esa es la actitud! 🎯', '¡Vas por buen camino! 🛤️'
        ],
        'incorrect': [
            '¡No era esa, pero aprendemos! 💪', '¡Cada error nos hace más fuertes! 📚',
            '¡Revisa la explicación! 👀', '¡La próxima la tienes! 🎯',
            '¡Error detectado, conocimiento ganado! 🧠'
        ]
    };
    
    const list = messages[reaction] || messages['thinking'];
    if (speech) {
        speech.textContent = list[Math.floor(Math.random() * list.length)];
        speech.className = 'character-speech state-' + reaction;
        speech.style.animation = 'none';
        speech.offsetHeight;
        speech.style.animation = 'speechBubbleIn 0.4s ease-out';
    }
}

// ===== VISUALIZACIÓN DE LECTURA =====
function mostrarLectura(question) {
    const lecturaContainer = document.getElementById('lectura-container');
    if (!lecturaContainer) return;
    
    if (question.textKey && typeof paesTexts !== 'undefined' && paesTexts[question.textKey]) {
        const texto = paesTexts[question.textKey];
        state.lecturaActiva = question.textKey;
        
        lecturaContainer.style.display = 'block';
        lecturaContainer.innerHTML = `
            <div class="lectura-panel">
                <div class="lectura-header">
                    <strong>📖 ${texto.title}</strong>
                    <span class="lectura-author">— ${texto.author}</span>
                </div>
                <div class="lectura-body">${texto.body.replace(/\n/g, '<br>')}</div>
            </div>
        `;
    } else {
        lecturaContainer.style.display = 'none';
        state.lecturaActiva = null;
    }
}

// ===== CARGA DE PREGUNTAS =====
function loadQuestion() {
    if (state.currentQuestion >= state.totalQuestions) { endLevel(); return; }

    clearInterval(state.timerInterval);
    state.timerInterval = null;
    if (state._boredTimeout) clearTimeout(state._boredTimeout);
    if (state._freezeTimeout) clearTimeout(state._freezeTimeout);
    state._freezeTimeout = null;
    state.isFrozen = false;

    state.questionStartTime = Date.now();

    const question = state.questions[state.currentQuestion];
    const optionsGrid = document.getElementById('options-grid');
    const matchingContainer = document.getElementById('matching-container');
    const dragContainer = document.getElementById('drag-container');
    const sliderContainer = document.getElementById('slider-container');
    const feedbackBox = document.getElementById('feedback-box');
    const btnNext = document.getElementById('btn-next');

    if (optionsGrid) { optionsGrid.innerHTML = ''; optionsGrid.style.display = 'none'; }
    if (matchingContainer) { matchingContainer.innerHTML = ''; matchingContainer.style.display = 'none'; }
    if (dragContainer) { dragContainer.innerHTML = ''; dragContainer.style.display = 'none'; }
    if (sliderContainer) { sliderContainer.innerHTML = ''; sliderContainer.style.display = 'none'; }
    if (feedbackBox) { feedbackBox.className = 'feedback-box'; feedbackBox.innerHTML = ''; }
    if (btnNext) btnNext.style.display = 'none';

    const qImg = document.getElementById('question-image');
    if (qImg) qImg.style.display = 'none';

    // Mostrar lectura si la pregunta tiene textKey (Nivel 1)
    if (state.currentLevel === 1) {
        mostrarLectura(question);
    } else {
        const lecturaContainer = document.getElementById('lectura-container');
        if (lecturaContainer) lecturaContainer.style.display = 'none';
    }

    const qText = document.getElementById('question-text');
    if (qText) qText.textContent = question.question;

    if (state.currentLevel >= 2) updateBuhoReaction('deep-think');
    else updateBuhoReaction('thinking');

    switch (question.type) {
        case 'multiple': loadMultipleChoice(question); break;
        case 'matching': loadMatching(question); break;
        case 'slider': loadSlider(question); break;
        case 'drag': loadDrag(question); break;
    }

    if (state.mode === 'timed') startTimer();
    updateProgress();

    if (question.isBonus && optionsGrid && optionsGrid.style.display === 'flex') {
        document.querySelectorAll('.option-btn').forEach(btn => btn.classList.add('bonus-question'));
    }
}

// ===== TIPOS DE PREGUNTAS =====
function loadMultipleChoice(question) {
    const optionsGrid = document.getElementById('options-grid');
    if (!optionsGrid) return;
    optionsGrid.style.display = 'flex';
    const indices = question.options.map((_, i) => i);
    const shuffledIndices = shuffleArray(indices);
    question._shuffledIndices = shuffledIndices;

    const optionLetters = ['A', 'B', 'C', 'D', 'E'];

    shuffledIndices.forEach((originalIndex, displayIndex) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        if (question.isBonus) btn.classList.add('bonus-question');
        btn.textContent = question.options[originalIndex];
        btn.dataset.originalIndex = originalIndex;
        btn.setAttribute('aria-label', `Opción ${optionLetters[displayIndex]}: ${question.options[originalIndex]}`);
        btn.setAttribute('role', 'radio');
        btn.addEventListener('click', () => checkMultipleAnswer(originalIndex, question));
        optionsGrid.appendChild(btn);
    });
}

function loadMatching(question) {
    const matchingContainer = document.getElementById('matching-container');
    if (!matchingContainer) return;
    matchingContainer.style.display = 'grid';
    let selectedLeft = null;
    const matches = {};
    const leftItems = shuffleArray(question.pairs.map(p => ({ id: p.id, text: p.left })));
    const rightItems = shuffleArray(question.pairs.map(p => ({ id: p.id, text: p.right })));

    leftItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'matching-item';
        div.textContent = item.text;
        div.dataset.pairId = item.id;
        div.dataset.side = 'left';
        div.addEventListener('click', function() {
            if (this.classList.contains('matched')) return;
            if (window.effectsManager) window.effectsManager.ensureAudio();
            document.querySelectorAll('.matching-item[data-side="left"]').forEach(el => {
                if (!el.classList.contains('matched')) el.classList.remove('selected');
            });
            this.classList.add('selected');
            selectedLeft = this;
        });
        matchingContainer.appendChild(div);
    });

    rightItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'matching-item';
        div.textContent = item.text;
        div.dataset.pairId = item.id;
        div.dataset.side = 'right';
        div.addEventListener('click', function() {
            if (this.classList.contains('matched')) return;
            if (window.effectsManager) window.effectsManager.ensureAudio();
            if (selectedLeft && !this.classList.contains('matched')) {
                if (selectedLeft.dataset.pairId === this.dataset.pairId) {
                    selectedLeft.classList.add('matched');
                    this.classList.add('matched');
                    matches[this.dataset.pairId] = true;
                    selectedLeft = null;
                    if (Object.keys(matches).length === question.pairs.length) {
                        clearInterval(state.timerInterval);
                        state.timerInterval = null;
                        showFeedback(`¡Perfecto! ${question.explanation || ''}`, 'correct');
                        triggerVisualStarsFromElement(matchingContainer, 16);
                        handleCorrectAnswer(question.points);
                    }
                } else {
                    const leftEl = selectedLeft;
                    leftEl.style.borderColor = 'var(--rojo-alerta)';
                    this.style.borderColor = 'var(--rojo-alerta)';
                    setTimeout(() => {
                        leftEl.style.borderColor = '#CBD5E1';
                        this.style.borderColor = '#CBD5E1';
                        leftEl.classList.remove('selected');
                    }, 500);
                    selectedLeft = null;
                }
            }
        });
        matchingContainer.appendChild(div);
    });
}

function loadSlider(question) {
    const sliderContainer = document.getElementById('slider-container');
    if (!sliderContainer) return;
    sliderContainer.style.display = 'block';
    const valueDisplay = document.createElement('div');
    valueDisplay.className = 'slider-value';
    valueDisplay.textContent = question.min;
    valueDisplay.id = 'slider-value-display';
    const track = document.createElement('div');
    track.className = 'slider-track';
    const fill = document.createElement('div');
    fill.className = 'slider-fill';
    fill.style.width = '0%';
    const input = document.createElement('input');
    input.type = 'range';
    input.className = 'slider-input';
    input.min = question.min;
    input.max = question.max;
    input.step = '0.1';
    input.value = question.min;
    input.addEventListener('input', () => {
        fill.style.width = `${((input.value - question.min) / (question.max - question.min)) * 100}%`;
        valueDisplay.textContent = input.value;
    });
    track.appendChild(fill);
    track.appendChild(input);
    const submitBtn = document.createElement('button');
    submitBtn.className = 'main-btn';
    submitBtn.textContent = 'Confirmar Respuesta ✅';
    submitBtn.addEventListener('click', () => {
        if (window.effectsManager) window.effectsManager.ensureAudio();
        clearInterval(state.timerInterval);
        state.timerInterval = null;
        const userAnswer = parseFloat(input.value);
        if (Math.abs(userAnswer - question.correctAnswer) <= question.tolerance) {
            showFeedback(`¡Correcto! ${question.explanation}`, 'correct');
            triggerVisualStarsFromElement(submitBtn, 14);
            handleCorrectAnswer(question.points);
        } else {
            showFeedback(`Incorrecto. ${question.explanation}`, 'incorrect');
            handleIncorrectAnswer(question);
        }
    });
    sliderContainer.appendChild(valueDisplay);
    sliderContainer.appendChild(track);
    sliderContainer.appendChild(submitBtn);
}

function loadDrag(question) {
    const dragContainer = document.getElementById('drag-container');
    if (!dragContainer) return;
    dragContainer.style.display = 'flex';
    question.items.forEach((item, index) => {
        const dropZone = document.createElement('div');
        dropZone.className = 'drop-zone';
        dropZone.textContent = `${index + 1}. Soltar aquí`;
        dropZone.dataset.index = index;
        dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('drag-over'); });
        dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
        dropZone.addEventListener('drop', (e) => {
            if (window.effectsManager) window.effectsManager.ensureAudio();
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            const draggedIndex = e.dataTransfer.getData('text/plain');
            dropZone.textContent = `${index + 1}. ${question.items[draggedIndex]}`;
            dropZone.dataset.filled = draggedIndex;
            checkDragComplete(question);
        });
        dragContainer.appendChild(dropZone);
    });
    const itemsContainer = document.createElement('div');
    itemsContainer.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;';
    shuffleArray(question.items).forEach((item) => {
        const draggable = document.createElement('div');
        draggable.className = 'draggable-item';
        draggable.textContent = item;
        draggable.draggable = true;
        draggable.dataset.originalIndex = question.items.indexOf(item);
        draggable.addEventListener('dragstart', (e) => { e.dataTransfer.setData('text/plain', draggable.dataset.originalIndex); draggable.style.opacity = '0.5'; });
        draggable.addEventListener('dragend', () => { draggable.style.opacity = '1'; });
        itemsContainer.appendChild(draggable);
    });
    dragContainer.appendChild(itemsContainer);
}

function checkDragComplete(question) {
    const dragContainer = document.getElementById('drag-container');
    const dropZones = document.querySelectorAll('.drop-zone');
    let allFilled = true, allCorrect = true;
    dropZones.forEach((zone, index) => {
        if (!zone.dataset.filled) allFilled = false;
        else if (parseInt(zone.dataset.filled, 10) !== index) allCorrect = false;
    });
    if (allFilled) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
        if (allCorrect) {
            showFeedback(`¡Excelente orden! ${question.explanation || ''}`, 'correct');
            triggerVisualStarsFromElement(dragContainer, 16);
            handleCorrectAnswer(question.points);
        } else {
            showFeedback(`El orden no es correcto. ${question.explanation || 'Revisa la secuencia lógica.'}`, 'incorrect');
            handleIncorrectAnswer(question);
        }
    }
}

// ===== MANEJO DE RESPUESTAS =====
function checkMultipleAnswer(originalIndex, question) {
    if (window.effectsManager) window.effectsManager.ensureAudio();
    const options = document.querySelectorAll('.option-btn');
    options.forEach(btn => btn.disabled = true);

    const shuffledIndices = question._shuffledIndices;
    const correctDisplayIndex = shuffledIndices.indexOf(question.correct);
    let clickedDisplayIndex = -1;
    options.forEach((btn, i) => {
        if (parseInt(btn.dataset.originalIndex) === originalIndex) clickedDisplayIndex = i;
    });

    const responseTime = (Date.now() - state.questionStartTime) / 1000;
    clearInterval(state.timerInterval);
    state.timerInterval = null;

    state.totalPreguntasRespondidas++;

    if (originalIndex === question.correct) {
        if (options[clickedDisplayIndex]) options[clickedDisplayIndex].classList.add('correct');
        let totalPoints = question.points;
        let starCount = 15;
        if (responseTime < 3) {
            const speedBonus = Math.round(question.points * 0.5);
            totalPoints += speedBonus;
            starCount += 10;
            showSpeedBonus(speedBonus);
        }
        if (options[clickedDisplayIndex]) {
            triggerVisualStarsFromElement(options[clickedDisplayIndex], starCount);
        }
        const bonusMsg = question.isBonus ? ' 🎁 ¡PREGUNTA BONUS! Puntuación DOBLE.' : '';
        showFeedback(`¡Correcto! ${question.explanation}${bonusMsg}`, question.isBonus ? 'bonus' : 'correct');
        handleCorrectAnswer(totalPoints);
    } else {
        if (options[clickedDisplayIndex]) options[clickedDisplayIndex].classList.add('incorrect');
        if (options[correctDisplayIndex]) options[correctDisplayIndex].classList.add('correct');
        showFeedback(`Incorrecto. ${question.explanation}`, 'incorrect');
        handleIncorrectAnswer(question);
    }
}

function handleCorrectAnswer(points) {
    if (state._boredTimeout) clearTimeout(state._boredTimeout);
    state.score += points;
    state.levelScore += points;
    state.streak++;
    state.correctInLevel++;
    if (state.streak > state.maxStreak) state.maxStreak = state.streak;

    const question = state.questions[state.currentQuestion];
    if (question && question.topic) {
        if (!state.topicScores[question.topic]) state.topicScores[question.topic] = { correct: 0, total: 0 };
        state.topicScores[question.topic].correct++;
        state.topicScores[question.topic].total++;
    }

    updateScore();
    updateStreak();
    playSound('correct');
    if (window.effectsManager) window.effectsManager.triggerConfettiAcademico();

    const responseTime = (Date.now() - state.questionStartTime) / 1000;
    if (responseTime < 3 && window.effectsManager) {
        window.effectsManager.triggerScreenFlash(180);
    }

    updateBuhoReaction('correct');
    if (state.streak === 1) {
        setTimeout(() => updateBuhoReaction('alivio'), 400);
    }
    if (state.streak >= 5) {
        document.getElementById('streak-display')?.classList.add('on-fire');
        if (window.effectsManager) window.effectsManager.triggerStarRain();
        setTimeout(() => updateBuhoReaction('impressed'), 400);
    } else if (state.streak >= 3) {
        if (window.effectsManager) window.effectsManager.triggerStarRain();
        setTimeout(() => updateBuhoReaction('impressed'), 400);
    }

    const btnNext = document.getElementById('btn-next');
    if (btnNext) btnNext.style.display = 'block';
    checkBadges();
}

function handleIncorrectAnswer(question) {
    if (state._boredTimeout) clearTimeout(state._boredTimeout);
    state.totalPreguntasRespondidas++;
    state.streak = 0;
    state.levelPerfect = false;
    document.getElementById('streak-display')?.classList.remove('on-fire');

    if (question && question.topic) {
        if (!state.topicScores[question.topic]) state.topicScores[question.topic] = { correct: 0, total: 0 };
        state.topicScores[question.topic].total++;
    }

    updateStreak();
    playSound('incorrect');
    updateBuhoReaction('incorrect');
    setTimeout(() => updateBuhoReaction('determined'), 400);

    const btnNext = document.getElementById('btn-next');
    if (btnNext) btnNext.style.display = 'block';
}

function showFeedback(message, type) {
    const fb = document.getElementById('feedback-box');
    if (!fb) return;
    fb.textContent = message;
    fb.className = `feedback-box ${type}`;
}

function nextQuestion() {
    if (window.effectsManager) {
        window.effectsManager.playSound('next');
    }
    clearInterval(state.timerInterval);
    state.timerInterval = null;
    state.isFrozen = false;
    if (state._freezeTimeout) clearTimeout(state._freezeTimeout);
    state._freezeTimeout = null;
    state.currentQuestion++;
    document.getElementById('streak-display')?.classList.remove('on-fire');
    loadQuestion();
}

// ===== FIN DE NIVEL =====
function endLevel() {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
    if (state._boredTimeout) clearTimeout(state._boredTimeout);
    if (state._freezeTimeout) clearTimeout(state._freezeTimeout);
    state._freezeTimeout = null;
    state.isFrozen = false;

    const totalQ = state.totalQuestions || 10;
    const starCount = state.levelPerfect ? 3 : (state.correctInLevel >= totalQ * 0.7 ? 2 : 1);
    state.levelStars[state.currentLevel] = starCount;

    if (state.levelPerfect && !state.badges.perfectScore) {
        state.badges.perfectScore = true;
        playSound('achievement');
        if (window.effectsManager) window.effectsManager.triggerFuegosAcademicos();
        setTimeout(() => {
            if (window.effectsManager) window.effectsManager.triggerToastAcademico('¡Nueva insignia: Puntaje Perfecto!', {
                icon: '💯', bg: 'linear-gradient(135deg, #FFD700, #FFA500)', duration: 3500
            });
        }, 300);
        saveBadges();
    }
    if (!state.powerupsUsedThisLevel && !state.badges.noPowerups) {
        state.badges.noPowerups = true;
        playSound('achievement');
        if (window.effectsManager) window.effectsManager.triggerFuegosAcademicos();
        setTimeout(() => {
            if (window.effectsManager) window.effectsManager.triggerToastAcademico('¡Nueva insignia: Poder Natural!', {
                icon: '💪', bg: 'linear-gradient(135deg, #8B5CF6, #6D28D9)', duration: 3500
            });
        }, 300);
        saveBadges();
    }

    if (state.currentLevel < 3) {
        const transTitle = document.getElementById('transition-title');
        const transSpeech = document.getElementById('transition-speech');
        const lvlScoreDisp = document.getElementById('level-score-display');
        if (transTitle) transTitle.textContent = `${levelNames[state.currentLevel]} Completado`;
        if (transSpeech) transSpeech.textContent = `¡Sabiondo está orgulloso! 🦉 ${levelNames[state.currentLevel]} superado 🎉`;
        if (lvlScoreDisp) lvlScoreDisp.textContent = state.levelScore;

        let starsHTML = '<div class="star-rating">';
        for (let i = 1; i <= 3; i++) {
            starsHTML += `<span class="star ${i <= starCount ? 'earned' : ''}">⭐</span>`;
        }
        starsHTML += '</div>';
        const scoreCard = document.querySelector('#screen-level-transition .share-card');
        if (scoreCard && !document.getElementById('level-stars')) {
            const starsDiv = document.createElement('div');
            starsDiv.id = 'level-stars';
            starsDiv.innerHTML = starsHTML;
            scoreCard.appendChild(starsDiv);
        } else if (document.getElementById('level-stars')) {
            document.getElementById('level-stars').innerHTML = starsHTML;
        }

        const btnNextLevel = document.getElementById('btn-next-level');
        if (btnNextLevel) btnNextLevel.textContent = `Siguiente: ${levelNames[state.currentLevel + 1]} ➡️`;

        updateBuhoReaction(state.levelPerfect ? 'celebrating' : 'thinking');
        showScreen('screen-level-transition');
        playSound('levelup');
        if (window.effectsManager) {
            window.effectsManager.triggerFuegosAcademicos();
            window.effectsManager.triggerConfettiAcademico(2000, 2);
            setTimeout(() => window.effectsManager.triggerConfettiAcademico(1500, 1.5), 800);
        }
    } else {
        updateBuhoReaction('graduate');
        showFinalResults();
        playSound('levelup');
        if (window.effectsManager) window.effectsManager.triggerFuegosAcademicos();
    }
}

function showFinalResults() {
    state.desafioEndTime = Date.now();
    state.tiempoTotalDesafio = (state.desafioEndTime - state.desafioStartTime) / 1000;
    
    const finalScore = document.getElementById('final-score');
    if (finalScore) finalScore.textContent = state.score;
    
    const tiempoDesempeno = document.getElementById('tiempo-desempeno');
    if (tiempoDesempeno && state.totalPreguntasRespondidas > 0) {
        const promedio = state.tiempoTotalDesafio / state.totalPreguntasRespondidas;
        const minutos = Math.floor(state.tiempoTotalDesafio / 60);
        const segundos = Math.floor(state.tiempoTotalDesafio % 60);
        let emojiVelocidad = '🐢 Sin prisa, lo importante es aprender';
        if (promedio < 15) emojiVelocidad = '🏆 ¡Excelente velocidad!';
        else if (promedio < 30) emojiVelocidad = '👍 Buen ritmo';
        else if (promedio < 60) emojiVelocidad = '📚 Tómate tu tiempo para leer';
        
        tiempoDesempeno.innerHTML = `
            <div style="margin-top:12px; padding:14px; background:#F5F3FF; border-radius:12px; border-left:4px solid #8B5CF6; text-align:left;">
                <strong>⏱️ Desempeño de tiempo:</strong><br>
                <span style="font-size:0.9rem;">
                • Tiempo total: <b>${minutos}m ${segundos}s</b><br>
                • Preguntas respondidas: <b>${state.totalPreguntasRespondidas}</b><br>
                • Promedio por pregunta: <b>${promedio.toFixed(1)} segundos</b><br>
                • ${emojiVelocidad}
                </span>
            </div>
        `;
    }

    const topicAnalysis = document.getElementById('topic-analysis');
    if (topicAnalysis) {
        topicAnalysis.innerHTML = '';
        const topicNames = {
            'numeros': 'Números', 'algebra': 'Álgebra', 'geometria': 'Geometría',
            'probabilidad': 'Probabilidad', 'estadistica': 'Estadística',
            'localizar': 'Lectura: Localizar', 'interpretar': 'Lectura: Interpretar',
            'evaluar': 'Lectura: Evaluar'
        };
        const topicColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#6366F1', '#14B8A6', '#F97316'];
        let colorIndex = 0;
        for (const [topic, scores] of Object.entries(state.topicScores)) {
            const percentage = scores.total > 0 ? Math.round((scores.correct / scores.total) * 100) : 0;
            const bar = document.createElement('div');
            bar.className = 'topic-bar';
            bar.innerHTML = `<span class="topic-label">${topicNames[topic] || topic}</span>
                <div class="topic-progress"><div class="topic-fill" style="width:${percentage}%;background:${topicColors[colorIndex]}"></div></div>
                <span class="topic-score">${percentage}%</span>`;
            topicAnalysis.appendChild(bar);
            colorIndex = (colorIndex + 1) % topicColors.length;
        }
    }

    const shareBadges = document.getElementById('share-badges');
    if (shareBadges) {
        shareBadges.innerHTML = '';
        for (const [badge, unlocked] of Object.entries(state.badges)) {
            if (unlocked) {
                const badgeEl = document.createElement('span');
                badgeEl.className = 'share-badge';
                badgeEl.textContent = getBadgeIcon(badge);
                shareBadges.appendChild(badgeEl);
            }
        }
    }

    const speech = document.getElementById('result-character-speech');
    if (speech) {
        if (state.score >= 5000) speech.textContent = '¡Rendimiento excepcional! ¡La universidad te espera! 🎓✨';
        else if (state.score >= 3500) speech.textContent = '¡Excelente resultado! Vas por muy buen camino. 👏🎓';
        else if (state.score >= 2000) speech.textContent = '¡Buen esfuerzo! Sigue practicando. 📚💪';
        else speech.textContent = '¡El aprendizaje es un camino diario! 💡📖';
    }

    if (state.currentLote) {
        marcarLoteComoUsado(state.currentLote);
    }

    showScreen('screen-results');
    if (window.effectsManager) window.effectsManager.triggerFuegosAcademicos();
    saveToLeaderboard();
}

function restartGame() {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
    if (state._freezeTimeout) clearTimeout(state._freezeTimeout);
    state._freezeTimeout = null;
    state.isFrozen = false;
    state.currentQuestion = 0;
    state.score = 0;
    state.levelScore = 0;
    state.streak = 0;
    state.currentLevel = 1;
    state.powerupsUsedThisLevel = false;
    state.levelPerfect = true;
    state.levelStars = {};
    state.bonusQuestionActive = false;
    state.correctInLevel = 0;
    state.currentLote = null;
    state.loteData = null;
    state.ultimoEstadoBocadillo = null;
    state.desafioStartTime = null;
    state.desafioEndTime = null;
    state.tiempoTotalDesafio = 0;
    state.totalPreguntasRespondidas = 0;
    state.lecturaActiva = null;
    
    document.body.className = 'level-1';
    document.getElementById('streak-display')?.classList.remove('on-fire');
    updateScore();
    updateStreak();
    updateProgress();
    updateLevelDisplay();
    
    cargarYMostrarLotes();
    const btnStart = document.getElementById('btn-start');
    if (btnStart) btnStart.style.display = 'none';
    const confirmacion = document.getElementById('lote-confirmacion');
    if (confirmacion) confirmacion.style.display = 'none';
    const loteSelector = document.getElementById('lote-selector');
    if (loteSelector) loteSelector.style.display = 'block';
    
    showScreen('screen-welcome');
}

function goToFinalScreen() {
    updateBuhoReaction('graduate');
    showScreen('screen-final');
    if (window.effectsManager) window.effectsManager.triggerFuegosAcademicos();
}

// ===== POWER-UPS =====
function usePowerup(type) {
    if (state.powerups[type] <= 0) return;
    if (state.currentQuestion >= state.totalQuestions) return;
    if ((type === 'time' || type === 'freeze') && state.mode !== 'timed') return;

    state.powerups[type]--;
    state.powerupsUsedThisLevel = true;
    updatePowerupButtons();
    playSound('powerup');

    const btn = document.getElementById(`powerup-${type}`);
    if (btn) { btn.classList.add('flash'); setTimeout(() => btn.classList.remove('flash'), 300); }

    switch (type) {
        case 'fifty': applyFiftyFifty(); updateBuhoReaction('confident'); break;
        case 'time':
            if (state.mode === 'timed') { state.timer += 15; updateTimerDisplay(); }
            break;
        case 'freeze':
            if (state._freezeTimeout) clearTimeout(state._freezeTimeout);
            state.isFrozen = true;
            updateBuhoReaction('frozen');
            const td = document.getElementById('timer-display');
            if (td) td.style.backgroundColor = '#10B981';
            state._freezeTimeout = setTimeout(() => {
                state.isFrozen = false;
                state._freezeTimeout = null;
                updateBuhoReaction('thinking');
                if (td) td.style.backgroundColor = 'var(--azul-oscuro)';
            }, 10000);
            break;
        case 'hint': applyHint(); break;
    }
}

function applyFiftyFifty() {
    const question = state.questions[state.currentQuestion];
    if (!question || question.type !== 'multiple') return;
    const options = document.querySelectorAll('.option-btn');
    const shuffledIndices = question._shuffledIndices;
    const correctDisplayIndex = shuffledIndices.indexOf(question.correct);
    const incorrectIndexes = [];
    options.forEach((btn, i) => { if (i !== correctDisplayIndex) incorrectIndexes.push(i); });
    shuffleArray(incorrectIndexes).slice(0, 2).forEach(index => {
        if (options[index]) {
            options[index].style.opacity = '0.3';
            options[index].style.pointerEvents = 'none';
        }
    });
}

function applyHint() {
    const question = state.questions[state.currentQuestion];
    if (!question) return;
    const fb = document.getElementById('feedback-box');
    if (!fb) return;
    const hintText = question.hint || (question.explanation ? question.explanation.split('.')[0] + '.' : 'Analiza cada opción con calma.');
    fb.textContent = `💡 Pista: ${hintText}`;
    fb.className = 'feedback-box correct';
}

// ===== TEMPORIZADOR =====
function startTimer() {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
    state.timer = levelTimerDefaults[state.currentLevel] || 60;
    updateTimerDisplay();
    const timerDisplay = document.getElementById('timer-display');
    if (timerDisplay) timerDisplay.classList.remove('warning');

    state.timerInterval = setInterval(() => {
        if (state.isFrozen) return;
        state.timer--;
        updateTimerDisplay();
        if (state.timer <= 10 && state.timer > 0) {
            if (timerDisplay) timerDisplay.classList.add('warning');
            updateBuhoReaction('nervous');
            if (window.effectsManager) window.effectsManager.playTick();
        }
        if (state.timer <= 0) {
            clearInterval(state.timerInterval);
            state.timerInterval = null;
            if (timerDisplay) timerDisplay.classList.remove('warning');
            if (window.effectsManager) window.effectsManager.playIncorrectFallback();
            showFeedback(`¡Tiempo agotado! ${state.questions[state.currentQuestion].explanation}`, 'incorrect');
            handleIncorrectAnswer(state.questions[state.currentQuestion]);
        }
    }, 1000);

    state._boredTimeout = setTimeout(() => {
        const nextBtn = document.getElementById('btn-next');
        if (state.currentQuestion < state.totalQuestions && (!nextBtn || nextBtn.style.display === 'none')) {
            updateBuhoReaction('bored');
        }
    }, 20000);
}

function updateTimerDisplay() {
    const td = document.getElementById('timer-display');
    if (td) td.textContent = `⏱️ ${state.timer}s`;
}

// ===== UI UPDATES =====
function updateScore() {
    const badge = document.getElementById('score-badge');
    if (!badge) return;
    badge.textContent = `⭐ ${state.score} pts`;
    badge.classList.add('pop');
    setTimeout(() => badge.classList.remove('pop'), 300);
    if (window.effectsManager?.triggerScoreBadgeFlash) {
        window.effectsManager.triggerScoreBadgeFlash();
    }
}

function updateStreak() {
    const sd = document.getElementById('streak-display');
    if (sd) sd.textContent = `🔥 ${state.streak}`;
}

function updateProgress() {
    const pf = document.getElementById('progress-fill');
    if (pf) pf.style.width = `${(state.currentQuestion / state.totalQuestions) * 100}%`;
}

function updatePowerupButtons() {
    ['fifty', 'time', 'freeze', 'hint'].forEach(type => {
        const btn = document.getElementById(`powerup-${type}`);
        if (!btn) return;
        const small = btn.querySelector('small');
        if (small) small.textContent = `(${state.powerups[type]})`;
        const isTimePowerupInNormalMode = (type === 'time' || type === 'freeze') && state.mode !== 'timed';
        btn.disabled = state.powerups[type] <= 0 || isTimePowerupInNormalMode;
    });
}

// ===== INSIGNIAS =====
function checkBadges() {
    if (state.score >= 2000 && !state.badges.paesPro) {
        state.badges.paesPro = true;
        playSound('achievement');
        if (window.effectsManager) window.effectsManager.triggerFuegosAcademicos();
        setTimeout(() => {
            if (window.effectsManager) window.effectsManager.triggerToastAcademico('¡Nueva insignia: PAES Pro!', {
                icon: '🏆', bg: 'linear-gradient(135deg, #F59E0B, #D97706)', duration: 3500
            });
        }, 300);
        saveBadges();
    }
    if (state.streak >= 5 && !state.badges.streaker) {
        state.badges.streaker = true;
        playSound('achievement');
        if (window.effectsManager) window.effectsManager.triggerFuegosAcademicos();
        setTimeout(() => {
            if (window.effectsManager) window.effectsManager.triggerToastAcademico('¡Nueva insignia: Rachador!', {
                icon: '🔥', bg: 'linear-gradient(135deg, #EF4444, #DC2626)', duration: 3500
            });
        }, 300);
        saveBadges();
    }
    if (state.mode === 'timed' && (Date.now() - state.questionStartTime) < 3000 && !state.badges.speedDemon) {
        state.badges.speedDemon = true;
        playSound('achievement');
        if (window.effectsManager) window.effectsManager.triggerFuegosAcademicos();
        setTimeout(() => {
            if (window.effectsManager) window.effectsManager.triggerToastAcademico('¡Nueva insignia: Velocista!', {
                icon: '⚡', bg: 'linear-gradient(135deg, #3B82F6, #1D4ED8)', duration: 3500
            });
        }, 300);
        saveBadges();
    }
}

function getBadgeIcon(badge) {
    const icons = { perfectScore: '💯', speedDemon: '⚡', streaker: '🔥', paesPro: '🏆', noPowerups: '💪' };
    return icons[badge] || '🏅';
}

function getBadgeName(badge) {
    const names = { perfectScore: 'Puntaje Perfecto', speedDemon: 'Velocista', streaker: 'Rachador', paesPro: 'PAES Pro', noPowerups: 'Poder Natural' };
    return names[badge] || badge;
}

function loadBadges() {
    const saved = safeLocalGet('paes_badges_v3', null);
    if (saved) {
        try { state.badges = { ...state.badges, ...JSON.parse(saved) }; } catch (e) {}
    }
    const grid = document.getElementById('badges-grid');
    if (!grid) return;
    grid.innerHTML = '';
    for (const [badge, unlocked] of Object.entries(state.badges)) {
        const el = document.createElement('div');
        el.className = `badge-item ${unlocked ? 'unlocked' : ''}`;
        el.innerHTML = `<div class="badge-icon">${getBadgeIcon(badge)}</div><div class="badge-name">${getBadgeName(badge)}</div>`;
        grid.appendChild(el);
    }
}

function saveBadges() {
    safeLocalSet('paes_badges_v3', JSON.stringify(state.badges));
}

// ===== LEADERBOARD =====
function showNamePromptModal(onSubmit) {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,0.55);z-index:3000;display:flex;align-items:center;justify-content:center;font-family:Poppins,sans-serif;padding:20px;';
    const box = document.createElement('div');
    box.style.cssText = 'background:white;padding:26px 24px;border-radius:18px;max-width:340px;width:100%;text-align:center;box-shadow:0 20px 50px rgba(0,0,0,0.32);';
    box.innerHTML = `
        <div style="font-weight:800;font-size:1.15rem;margin-bottom:8px;color:#1E293B;">¡Buen trabajo! 🦉</div>
        <div style="margin-bottom:16px;color:#64748B;font-size:0.9rem;">Ingresa tu nombre para el ranking</div>
        <input id="paes-name-input" type="text" maxlength="20" placeholder="Jugador" style="width:100%;padding:11px 14px;border-radius:10px;border:1.5px solid #CBD5E1;margin-bottom:16px;font-family:inherit;font-size:1rem;">
        <div style="display:flex;gap:10px;justify-content:center;">
            <button id="paes-name-skip" style="flex:1;padding:11px 0;border-radius:10px;border:none;background:#E2E8F0;color:#334155;font-weight:700;cursor:pointer;">Omitir</button>
            <button id="paes-name-ok" style="flex:1;padding:11px 0;border-radius:10px;border:none;background:linear-gradient(135deg,#2563EB,#1D4ED8);color:white;font-weight:700;cursor:pointer;">Guardar</button>
        </div>`;
    overlay.appendChild(box);
    document.body.appendChild(overlay);
    const input = box.querySelector('#paes-name-input');
    input.focus();
    const close = (value) => { overlay.remove(); onSubmit(value); };
    box.querySelector('#paes-name-ok').addEventListener('click', () => close(input.value.trim() || 'Jugador'));
    box.querySelector('#paes-name-skip').addEventListener('click', () => close(null));
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') close(input.value.trim() || 'Jugador'); });
    document.addEventListener('keydown', function escH(e) { if (e.key === 'Escape') { close(null); document.removeEventListener('keydown', escH); } });
}

function saveToLeaderboard() {
    showNamePromptModal((playerName) => {
        if (!playerName) return;
        const leaderboard = JSON.parse(safeLocalGet('paes_leaderboard_v3', '[]'));
        leaderboard.push({
            name: playerName,
            score: state.score,
            badges: Object.values(state.badges).filter(Boolean).length,
            tiempo: state.tiempoTotalDesafio,
            promedio: state.totalPreguntasRespondidas > 0 ? (state.tiempoTotalDesafio / state.totalPreguntasRespondidas).toFixed(1) : 0,
            date: new Date().toLocaleDateString()
        });
        leaderboard.sort((a, b) => b.score - a.score);
        safeLocalSet('paes_leaderboard_v3', JSON.stringify(leaderboard.slice(0, 20)));
        loadLeaderboard();
    });
}

function loadLeaderboard() {
    let leaderboard = [];
    try { leaderboard = JSON.parse(safeLocalGet('paes_leaderboard_v3', '[]')); } catch (e) {}
    const tbody = document.getElementById('leaderboard-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    leaderboard.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td class="${index < 3 ? 'rank-'+(index+1) : ''}">${index+1}</td><td>${entry.name}</td><td>${entry.score} pts</td><td>${'🏅'.repeat(entry.badges)}</td>`;
        tbody.appendChild(row);
    });
}

// ===== COMPARTIR =====
function shareResults() {
    const promedio = state.totalPreguntasRespondidas > 0 ? (state.tiempoTotalDesafio / state.totalPreguntasRespondidas).toFixed(1) : '---';
    const text = `🎓 ¡Acabo de conseguir ${state.score} puntos en PAES Challenge! ⏱️ Promedio: ${promedio}s por pregunta. ¿Puedes superarme? 🦉`;
    if (navigator.share) {
        navigator.share({ title: 'PAES Challenge', text, url: window.location.href }).catch(() => {});
    } else {
        navigator.clipboard.writeText(text).then(() => {
            if (window.effectsManager) window.effectsManager.triggerToastAcademico('¡Copiado! Compártelo donde quieras.', { icon: '📋', duration: 2500 });
        }).catch(() => {
            if (window.effectsManager) window.effectsManager.triggerToastAcademico('No se pudo copiar automáticamente.', { icon: '⚠️', duration: 2500 });
        });
    }
}
