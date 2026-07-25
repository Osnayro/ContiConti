/**
 * Conti Conti - Motor de Efectos Visuales (VFX) y Sonido (SFX)
 * Versión Refactorizada - Corrección de Defectos y Mejoras
 * Desarrollado para optimizar el Game Feel en Canvas 2D
 */

class ContiEffectsManager {
    /**
     * @param {Object} options - Configuración opcional
     * @param {string} options.canvasId - ID del canvas (default: 'effects-canvas')
     * @param {string} options.scoreBadgeId - ID del badge de puntos (default: 'score-badge')
     * @param {number} options.maxParticles - Límite máximo de partículas (default: 150)
     * @param {number} options.masterVolume - Volumen maestro 0.0-1.0 (default: 1.0)
     */
    constructor(options = {}) {
        this.canvasId = options.canvasId || 'effects-canvas';
        this.scoreBadgeId = options.scoreBadgeId || 'score-badge';
        this.maxParticles = options.maxParticles || 150;
        this.masterVolume = options.masterVolume !== undefined ? options.masterVolume : 1.0;

        this.canvas = document.getElementById(this.canvasId);
        if (!this.canvas) {
            console.warn(`[ContiEffects] Canvas con id "${this.canvasId}" no encontrado. El motor no se inicializará.`);
            this._initialized = false;
            return;
        }
        this._initialized = true;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.animationFrameId = null;
        this.isLooping = false;
        this.timeouts = [];
        this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Banco de sonidos predefinidos con enlaces estables (Mixkit)
        // Cada sonido tiene una URL única para evitar duplicados
        this.sfxUrls = {
            'sfx-coin-drop':      'https://assets.mixkit.co/active_storage/sfx/2019/2019-84.wav',
            'sfx-coin-sparkle':   'https://assets.mixkit.co/active_storage/sfx/2000/2000-84.wav',
            'sfx-cash-register':  'https://assets.mixkit.co/active_storage/sfx/2015/2015-84.wav', // URL corregida (Efecto campana de tienda)
            'sfx-woosh-loss':     'https://assets.mixkit.co/active_storage/sfx/2568/2568-84.wav',
            'sfx-success-balance':'https://assets.mixkit.co/active_storage/sfx/1435/1435-84.wav',
            'sfx-danger-heart':   'https://assets.mixkit.co/active_storage/sfx/957/957-84.wav',
            'sfx-level-up':       'https://assets.mixkit.co/active_storage/sfx/1435/1435-84.wav',
            'sfx-error-buzz':     'https://assets.mixkit.co/active_storage/sfx/2009/2009-84.wav',
            'sfx-notification':   'https://assets.mixkit.co/active_storage/sfx/2011/2011-84.wav',
            'sfx-achievement':    'https://assets.mixkit.co/active_storage/sfx/2015/2015-84.wav'
        };

        // Cache de instancias de Audio
        this.audioCache = {};
        this.activeAudioNodes = []; // Para tracking de clones activos
        this.initAudioCache();

        // Vinculación correcta del contexto (this) para evitar fallos en iOS
        this._boundUnlockAudio = this._unlockAudio.bind(this);
        this.setupIOSAudioUnlock();

        // Inicializar dimensiones y listeners
        this._boundResize = () => this.resizeCanvas();
        window.addEventListener('resize', this._boundResize);
        this.resizeCanvas();

        // Escuchar cambios en prefers-reduced-motion
        this._motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        this._boundMotionChange = (e) => { this.reducedMotion = e.matches; };
        if (this._motionMediaQuery.addEventListener) {
            this._motionMediaQuery.addEventListener('change', this._boundMotionChange);
        } else {
            this._motionMediaQuery.addListener(this._boundMotionChange); // Safari legacy
        }
    }

    /**
     * Precarga las instancias de audio con manejo de errores
     */
    initAudioCache() {
        Object.keys(this.sfxUrls).forEach(id => {
            const audio = new Audio(this.sfxUrls[id]);
            audio.preload = 'auto';
            audio.onerror = () => {
                console.warn(`[ContiEffects] No se pudo cargar el audio: ${id} (${this.sfxUrls[id]})`);
            };
            this.audioCache[id] = audio;
        });
    }

    /**
     * Escucha las interacciones iniciales del usuario para despertar el motor de audio en iOS/iPhone
     */
    setupIOSAudioUnlock() {
        window.addEventListener('click', this._boundUnlockAudio);
        window.addEventListener('touchstart', this._boundUnlockAudio);
    }

    _unlockAudio() {
        const silentSound = new Audio();
        silentSound.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==';
        silentSound.play().then(() => {
            console.log("[ContiEffects] Audio desbloqueado con éxito para iPhone/iOS.");
            Object.values(this.audioCache).forEach(audio => audio.load());
            
            // Remover usando la referencia vinculada correcta
            window.removeEventListener('click', this._boundUnlockAudio);
            window.removeEventListener('touchstart', this._boundUnlockAudio);
        }).catch(err => {
            console.warn("[ContiEffects] Esperando interacción explícita para el audio.", err);
        });
    }

    /**
     * Ajusta el tamaño del canvas al de la ventana del dispositivo
     */
    resizeCanvas() {
        if (!this._initialized) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    /**
     * Reproduce un sonido desde la caché con variación aleatoria de tono (Pitch)
     * @param {string} id - ID del audio asignado en la caché
     * @param {Object} opts - Opciones adicionales
     * @param {number} opts.pitchMin - Pitch mínimo (default: 0.9)
     * @param {number} opts.pitchMax - Pitch máximo (default: 1.15)
     * @param {number} opts.volume - Volumen individual 0.0-1.0 (default: masterVolume)
     */
    playSFX(id, opts = {}) {
        if (!this._initialized) return;

        const baseAudio = this.audioCache[id];
        if (!baseAudio) {
            console.warn(`[ContiEffects] Sonido no encontrado: ${id}`);
            return;
        }

        // Limitar clones activos para evitar saturación de audio
        if (this.activeAudioNodes.length > 16) {
            const old = this.activeAudioNodes.shift();
            if (old && !old.paused) {
                old.pause();
                old.src = '';
            }
        }

        const soundClone = baseAudio.cloneNode();
        const pitchMin = opts.pitchMin !== undefined ? opts.pitchMin : 0.9;
        const pitchMax = opts.pitchMax !== undefined ? opts.pitchMax : 1.15;
        const randomPitch = pitchMin + Math.random() * (pitchMax - pitchMin);
        soundClone.playbackRate = randomPitch;
        soundClone.volume = (opts.volume !== undefined ? opts.volume : 1.0) * this.masterVolume;

        this.activeAudioNodes.push(soundClone);

        soundClone.play().then(() => {
            soundClone.onended = () => {
                const idx = this.activeAudioNodes.indexOf(soundClone);
                if (idx > -1) this.activeAudioNodes.splice(idx, 1);
            };
        }).catch(err => {
            console.log("[ContiEffects] Audio bloqueado temporalmente por políticas del navegador:", err.message);
            const idx = this.activeAudioNodes.indexOf(soundClone);
            if (idx > -1) this.activeAudioNodes.splice(idx, 1);
        });
    }

    /**
     * Dispara una ráfaga de monedas desde una posición hacia el marcador de puntos
     * @param {number} startX - Coordenada X de origen
     * @param {number} startY - Coordenada Y de origen
     * @param {number} count - Cantidad de monedas a generar
     */
    triggerCoinExplosion(startX, startY, count = 12) {
        if (!this._initialized) return;

        const scoreBadge = document.getElementById(this.scoreBadgeId);
        if (!scoreBadge) {
            console.warn(`[ContiEffects] Score badge con id "${this.scoreBadgeId}" no encontrado.`);
            return;
        }

        // Si el usuario prefiere reducir movimiento, solo reproduce sonidos
        if (this.reducedMotion) {
            this.playSFX('sfx-coin-drop');
            setTimeout(() => this.playSFX('sfx-cash-register'), count * 45);
            return;
        }

        const rect = scoreBadge.getBoundingClientRect();
        const targetX = rect.left + rect.width / 2;
        const targetY = rect.top + rect.height / 2;

        // Limitar partículas totales para evitar lag
        if (this.particles.length + count > this.maxParticles) {
            const excess = (this.particles.length + count) - this.maxParticles;
            this.particles.splice(0, excess);
        }

        for (let i = 0; i < count; i++) {
            const t = setTimeout(() => {
                this.particles.push({
                    x: startX,
                    y: startY,
                    vx: (Math.random() - 0.5) * 8,
                    vy: -Math.random() * 10 - 5,
                    radius: Math.random() * 3 + 7,
                    gravity: 0.4,
                    targetX: targetX,
                    targetY: targetY,
                    speed: 0.08,
                    isAttracted: false,
                    life: 0,
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.3
                });
                this.playSFX('sfx-coin-drop');
                if (!this.isLooping) this.startLoop();
            }, i * 60);
            this.timeouts.push(t);
        }

        const finalT = setTimeout(() => this.playSFX('sfx-cash-register'), count * 45);
        this.timeouts.push(finalT);
    }

    /**
     * Efecto de pérdida / woosh
     * @param {number} x - Coordenada X
     * @param {number} y - Coordenada Y
     */
    triggerLossEffect(x, y) {
        if (!this._initialized) return;
        this.playSFX('sfx-woosh-loss', { pitchMin: 0.7, pitchMax: 1.0 });
        if (this.reducedMotion) return;

        // Partículas de "X" rojas que caen
        for (let i = 0; i < 8; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 6,
                vy: -Math.random() * 6 - 2,
                radius: Math.random() * 2 + 4,
                gravity: 0.3,
                targetX: null,
                targetY: null,
                speed: 0,
                isAttracted: false,
                life: 0,
                maxLife: 60,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.2,
                type: 'loss'
            });
        }
        if (!this.isLooping) this.startLoop();
    }

    /**
     * Efecto de éxito / logro
     * @param {number} x - Coordenada X
     * @param {number} y - Coordenada Y
     */
    triggerSuccessEffect(x, y) {
        if (!this._initialized) return;
        this.playSFX('sfx-success-balance', { pitchMin: 1.0, pitchMax: 1.2 });
        if (this.reducedMotion) return;

        for (let i = 0; i < 10; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 10,
                vy: -Math.random() * 8 - 3,
                radius: Math.random() * 2 + 3,
                gravity: 0.2,
                targetX: null,
                targetY: null,
                speed: 0,
                isAttracted: false,
                life: 0,
                maxLife: 50,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.3,
                type: 'success'
            });
        }
        if (!this.isLooping) this.startLoop();
    }

    /**
     * Inicia el bucle de animación solo si no está corriendo
     */
    startLoop() {
        if (!this._initialized || this.isLooping) return;
        this.isLooping = true;
        this.loop();
    }

    /**
     * Bucle principal de física y dibujo (60 FPS) - Se pausa automáticamente sin partículas
     */
    loop() {
        if (!this._initialized) {
            this.isLooping = false;
            return;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        let hasParticles = false;

        for (let i = this.particles.length - 1; i >= 0; i--) {
            let p = this.particles[i];
            p.life++;
            hasParticles = true;

            if (p.type === 'loss' || p.type === 'success') {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += p.gravity;
                p.rotation += p.rotationSpeed;
                p.radius *= 0.97;

                if (p.life > p.maxLife || p.radius < 0.5) {
                    this.particles.splice(i, 1);
                    continue;
                }
            } else {
                if (!p.isAttracted) {
                    p.x += p.vx;
                    p.y += p.vy;
                    p.vy += p.gravity;
                    p.rotation += p.rotationSpeed;

                    if (p.vy > 1 || p.life > 40) {
                        p.isAttracted = true;
                    }
                } else {
                    p.x += (p.targetX - p.x) * p.speed;
                    p.y += (p.targetY - p.y) * p.speed;
                    p.rotation += 0.2;
                    if (p.radius > 3) p.radius -= 0.1;
                }

                const dist = Math.hypot(p.targetX - p.x, p.targetY - p.y);
                if (dist < 15) {
                    this.particles.splice(i, 1);
                    this._animateScoreBadge();
                    continue;
                }
            }

            this._drawParticle(p);
        }

        if (hasParticles) {
            this.animationFrameId = requestAnimationFrame(() => this.loop());
        } else {
            this.isLooping = false;
            this.animationFrameId = null;
        }
    }

    /**
     * Dibuja una partícula individual según su tipo
     */
    _drawParticle(p) {
        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.rotation);

        if (p.type === 'loss') {
            this.ctx.strokeStyle = '#FF4444';
            this.ctx.lineWidth = 2;
            this.ctx.shadowBlur = 6;
            this.ctx.shadowColor = '#FF0000';
            const r = p.radius;
            this.ctx.beginPath();
            this.ctx.moveTo(-r, -r); this.ctx.lineTo(r, r);
            this.ctx.moveTo(r, -r); this.ctx.lineTo(-r, r);
            this.ctx.stroke();
        } else if (p.type === 'success') {
            this.ctx.fillStyle = '#FFD700';
            this.ctx.shadowBlur = 8;
            this.ctx.shadowColor = '#FFA500';
            this.ctx.beginPath();
            const spikes = 5;
            const outerRadius = p.radius;
            const innerRadius = p.radius * 0.5;
            for (let s = 0; s < spikes * 2; s++) {
                const angle = (Math.PI / spikes) * s - Math.PI / 2;
                const radius = s % 2 === 0 ? outerRadius : innerRadius;
                this.ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
            }
            this.ctx.closePath();
            this.ctx.fill();
        } else {
            this.ctx.beginPath();
            this.ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = '#FFD700';
            this.ctx.shadowBlur = 8;
            this.ctx.shadowColor = '#FFA500';
            this.ctx.fill();

            this.ctx.beginPath();
            this.ctx.arc(0, 0, p.radius * 0.7, 0, Math.PI * 2);
            this.ctx.strokeStyle = '#B8860B';
            this.ctx.lineWidth = 1.5;
            this.ctx.stroke();

            this.ctx.fillStyle = '#B8860B';
            this.ctx.font = `bold ${p.radius * 1.1}px Arial`;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText('$', 0, 0);
        }

        this.ctx.restore();
    }

    /**
     * Anima el badge de puntos cuando una moneda llega al destino
     */
    _animateScoreBadge() {
        const scoreBadge = document.getElementById(this.scoreBadgeId);
        if (scoreBadge) {
            scoreBadge.classList.remove('pop-anim');
            void scoreBadge.offsetWidth;
            scoreBadge.classList.add('pop-anim');
        }
    }

    /**
     * Cambia el volumen maestro de todos los efectos
     * @param {number} vol - Volumen entre 0.0 y 1.0
     */
    setVolume(vol) {
        this.masterVolume = Math.max(0, Math.min(1, vol));
    }

    /**
     * Cambia el límite máximo de partículas
     * @param {number} limit - Nuevo límite
     */
    setMaxParticles(limit) {
        this.maxParticles = Math.max(10, limit);
    }

    /**
     * Limpia todas las partículas activas inmediatamente
     */
    clearParticles() {
        this.particles = [];
    }

    /**
     * Destruye completamente el motor, limpiando todos los recursos
     */
    destroy() {
        if (!this._initialized) return;

        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        this.isLooping = false;

        this.timeouts.forEach(id => clearTimeout(id));
        this.timeouts = [];

        this.activeAudioNodes.forEach(audio => {
            audio.pause();
            audio.src = '';
        });
        this.activeAudioNodes = [];

        window.removeEventListener('resize', this._boundResize);
        window.removeEventListener('click', this._boundUnlockAudio);
        window.removeEventListener('touchstart', this._boundUnlockAudio);

        if (this._motionMediaQuery) {
            if (this._motionMediaQuery.removeEventListener) {
                this._motionMediaQuery.removeEventListener('change', this._boundMotionChange);
            } else {
                this._motionMediaQuery.removeListener(this._boundMotionChange);
            }
        }

        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        this.particles = [];
        this._initialized = false;

        console.log("[ContiEffects] Motor destruido correctamente.");
    }
}

// Inicializar globalmente para que app.js pueda invocarlo
window.effectsManager = new ContiEffectsManager();
