/**
 * Conti Conti - Motor de Efectos Visuales (VFX) y Sonido (SFX)
 * Versión Refactorizada con Audio Sintetizado Nativo (Cero dependencias externas)
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

        // Inicializar el contexto de audio nativo del navegador
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.audioCache = {};
        this.activeAudioNodes = []; 
        
        // Generar y almacenar los efectos en memoria
        this.initAudioCache();

        // Vinculación explícita del contexto (this) para iOS
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
            this._motionMediaQuery.addListener(this._boundMotionChange); 
        }
    }

    initAudioCache() {
        // Fórmulas matemáticas puras para sintetizar los SFX en tiempo real
        const sfxDefinitions = {
            'sfx-coin-drop': (ctx) => {
                const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.2, ctx.sampleRate);
                const data = buffer.getChannelData(0);
                for (let i = 0; i < buffer.length; i++) {
                    let t = i / ctx.sampleRate;
                    data[i] = Math.sin(2 * Math.PI * 3200 * t) * Math.exp(-30 * t);
                }
                return buffer;
            },
            'sfx-cash-register': (ctx) => {
                const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate);
                const data = buffer.getChannelData(0);
                for (let i = 0; i < buffer.length; i++) {
                    let t = i / ctx.sampleRate;
                    data[i] = (Math.sin(2 * Math.PI * 1500 * t) + Math.sin(2 * Math.PI * 2200 * t)) * Math.exp(-12 * t);
                }
                return buffer;
            },
            'sfx-woosh-loss': (ctx) => {
                const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.4, ctx.sampleRate);
                const data = buffer.getChannelData(0);
                for (let i = 0; i < buffer.length; i++) {
                    let t = i / ctx.sampleRate;
                    let f_sweep = 800 * Math.exp(-6 * t);
                    data[i] = Math.sin(2 * Math.PI * f_sweep * t) * Math.exp(-4 * t);
                }
                return buffer;
            },
            'sfx-success-balance': (ctx) => {
                const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.6, ctx.sampleRate);
                const data = buffer.getChannelData(0);
                for (let i = 0; i < buffer.length; i++) {
                    let t = i / ctx.sampleRate;
                    data[i] = (Math.sin(2 * Math.PI * 523.25 * t) + Math.sin(2 * Math.PI * 659.25 * t) + Math.sin(2 * Math.PI * 783.99 * t)) * Math.exp(-5 * t);
                }
                return buffer;
            }
        };

        // Mapeo y conversión a objetos de Audio (Blobs binarios temporales)
        Object.keys(sfxDefinitions).forEach(id => {
            try {
                const buffer = sfxDefinitions[id](this.audioContext);
                const wavBytes = this._bufferToWav(buffer);
                const blob = new Blob([wavBytes], { type: 'audio/wav' });
                const url = URL.createObjectURL(blob);
                
                const audio = new Audio(url);
                audio.preload = 'auto';
                this.audioCache[id] = audio;
            } catch (e) {
                console.warn(`[ContiEffects] Error sintetizando el audio nativo: ${id}`, e);
            }
        });

        // Asignamos alias para mantener la compatibilidad con los IDs que no se generan de forma única
        this.audioCache['sfx-coin-sparkle'] = this.audioCache['sfx-coin-drop'];
        this.audioCache['sfx-danger-heart'] = this.audioCache['sfx-woosh-loss'];
        this.audioCache['sfx-level-up'] = this.audioCache['sfx-success-balance'];
        this.audioCache['sfx-error-buzz'] = this.audioCache['sfx-woosh-loss'];
        this.audioCache['sfx-notification'] = this.audioCache['sfx-coin-drop'];
        this.audioCache['sfx-achievement'] = this.audioCache['sfx-cash-register'];
    }

    // Compilador interno para estructurar los datos binarios en un contenedor ejecutable (.wav)
    _bufferToWav(buffer) {
        let numOfChan = buffer.numberOfChannels,
            length = buffer.length * numOfChan * 2 + 44,
            bufferArr = new ArrayBuffer(length),
            view = new DataView(bufferArr),
            channels = [], i, sample,
            offset = 0,
            pos = 0;

        function setUint16(data) { view.setUint16(pos, data, true); pos += 2; }
        function setUint32(data) { view.setUint32(pos, data, true); pos += 4; }

        setUint32(0x46464952); // "RIFF"
        setUint32(length - 8); // Longitud del archivo
        setUint32(0x45564157); // "WAVE"
        setUint32(0x20746d66); // "fmt " chunk
        setUint32(16);         
        setUint16(1);          // Formato PCM sin compresión
        setUint16(numOfChan);
        setUint32(buffer.sampleRate);
        setUint32(buffer.sampleRate * 2 * numOfChan); 
        setUint16(numOfChan * 2);                     
        setUint16(16);                                // 16 bits
        setUint32(0x61746164);                        // "data" chunk
        setUint32(length - pos - 4);                  

        for (i = 0; i < buffer.numberOfChannels; i++) channels.push(buffer.getChannelData(i));

        while (pos < length) {
            for (i = 0; i < numOfChan; i++) {
                sample = Math.max(-1, Math.min(1, channels[i][offset]));
                sample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
                view.setInt16(pos, sample, true);
                pos += 2;
            }
            offset++;
        }
        return bufferArr;
    }

    setupIOSAudioUnlock() {
        window.addEventListener('click', this._boundUnlockAudio);
        window.addEventListener('touchstart', this._boundUnlockAudio);
    }

    _unlockAudio() {
        window.removeEventListener('click', this._boundUnlockAudio);
        window.removeEventListener('touchstart', this._boundUnlockAudio);

        // Desbloqueo del AudioContext de la Web Audio API
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }

        const silentSound = new Audio();
        silentSound.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==';
        silentSound.play().then(() => {
            console.log("[ContiEffects] Audio desbloqueado con éxito para iPhone/iOS.");
            Object.values(this.audioCache).forEach(audio => {
                if(audio) audio.load();
            });
        }).catch(err => {
            console.warn("[ContiEffects] Falló el desbloqueo. Reincorporando listeners de seguridad.", err);
            this.setupIOSAudioUnlock();
        });
    }

    resizeCanvas() {
        if (!this._initialized) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    playSFX(id, opts = {}) {
        if (!this._initialized) return;

        const baseAudio = this.audioCache[id];
        if (!baseAudio) {
            console.warn(`[ContiEffects] Sonido no encontrado en el sintetizador: ${id}`);
            return;
        }

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
            console.log("[ContiEffects] Reproducción pospuesta hasta interacción del usuario:", err.message);
            const idx = this.activeAudioNodes.indexOf(soundClone);
            if (idx > -1) this.activeAudioNodes.splice(idx, 1);
        });
    }

    triggerCoinExplosion(startX, startY, count = 12) {
        if (!this._initialized) return;

        const scoreBadge = document.getElementById(this.scoreBadgeId);
        if (!scoreBadge) {
            console.warn(`[ContiEffects] Score badge con id "${this.scoreBadgeId}" no encontrado.`);
            return;
        }

        if (this.reducedMotion) {
            this.playSFX('sfx-coin-drop');
            setTimeout(() => this.playSFX('sfx-cash-register'), count * 45);
            return;
        }

        const rect = scoreBadge.getBoundingClientRect();
        const targetX = rect.left + rect.width / 2;
        const targetY = rect.top + rect.height / 2;

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

    triggerLossEffect(x, y) {
        if (!this._initialized) return;
        this.playSFX('sfx-woosh-loss', { pitchMin: 0.7, pitchMax: 1.0 });
        if (this.reducedMotion) return;

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

    startLoop() {
        if (!this._initialized || this.isLooping) return;
        this.isLooping = true;
        this.loop();
    }

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

    _animateScoreBadge() {
        const scoreBadge = document.getElementById(this.scoreBadgeId);
        if (scoreBadge) {
            scoreBadge.classList.remove('pop-anim');
            void scoreBadge.offsetWidth;
            scoreBadge.classList.add('pop-anim');
        }
    }

    setVolume(vol) {
        this.masterVolume = Math.max(0, Math.min(1, vol));
    }

    setMaxParticles(limit) {
        this.maxParticles = Math.max(10, limit);
    }

    clearParticles() {
        this.particles = [];
    }

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
            if(audio) {
                audio.pause();
                audio.src = '';
            }
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

window.effectsManager = new ContiEffectsManager();
