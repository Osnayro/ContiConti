/**
 * Conti Conti - Motor de Efectos Visuales (VFX) y Sonido (SFX)
 * Versión 2.5 — Audio Sintetizado Avanzado (ADSR, Armónicos y Paneo Espacial)
 * Desarrollado para optimizar el Game Feel en Canvas 2D sin dependencias externas.
 */

class ContiEffectsManager {
    /**
     * @param {Object} options - Configuración opcional
     * @param {string} options.canvasId - ID del canvas (default: 'effects-canvas')
     * @param {string} options.scoreBadgeId - ID del badge de puntos (default: 'score-badge')
     * @param {number} options.maxParticles - Límite máximo de partículas (default: 150)
     * @param {number} options.masterVolume - Volumen maestro 0.0-1.0 (default: 0.8)
     */
    constructor(options = {}) {
        this.canvasId = options.canvasId || 'effects-canvas';
        this.scoreBadgeId = options.scoreBadgeId || 'score-badge';
        this.maxParticles = options.maxParticles || 150;
        this.masterVolume = options.masterVolume !== undefined ? options.masterVolume : 0.8;

        this.canvas = document.getElementById(this.canvasId);
        if (!this.canvas) {
            console.warn(`[ContiEffects] Canvas con id "${this.canvasId}" no encontrado.`);
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

        // ── MOTOR DE AUDIO AVANZADO (WEB AUDIO API) ──
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Nodo de ganancia maestra
        this.masterGain = this.audioContext.createGain();
        this.masterGain.gain.value = this.masterVolume;
        
        // Compresor dinámico para evitar que el audio sature al acumular sonidos
        this.compressor = this.audioContext.createDynamicsCompressor();
        this.compressor.threshold.value = -24;
        this.compressor.knee.value = 30;
        this.compressor.ratio.value = 12;
        this.compressor.attack.value = 0.003;
        this.compressor.release.value = 0.25;

        this.masterGain.connect(this.compressor);
        this.compressor.connect(this.audioContext.destination);

        this.activeAudioNodes = []; // Tracking de osciladores activos para limitar polifonía
        this.sfxPresets = this._buildPresets();

        // Desbloqueo de contexto para iOS / Safari
        this._boundUnlockAudio = this._unlockAudio.bind(this);
        this.setupIOSAudioUnlock();

        // Listeners de interfaz y resize
        this._boundResize = () => this.resizeCanvas();
        window.addEventListener('resize', this._boundResize);
        this.resizeCanvas();

        this._motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        this._boundMotionChange = (e) => { this.reducedMotion = e.matches; };
        if (this._motionMediaQuery.addEventListener) {
            this._motionMediaQuery.addEventListener('change', this._boundMotionChange);
        } else {
            this._motionMediaQuery.addListener(this._boundMotionChange);
        }
    }

    /**
     * Diccionario de presets avanzados con envolventes ADSR y armónicos (del archivo truncado)
     */
    _buildPresets() {
        return {
            'sfx-coin-drop': {
                type: 'sine',
                freqStart: 1200, freqEnd: 1800,
                attack: 0.005, decay: 0.08, sustain: 0.0, release: 0.05,
                volume: 0.6, vibrato: 8, vibratoDepth: 15,
                harmonics: [{ ratio: 2, gain: 0.3 }, { ratio: 3, gain: 0.15 }]
            },
            'sfx-coin-sparkle': {
                type: 'sine',
                freqStart: 2000, freqEnd: 2500,
                attack: 0.001, decay: 0.12, sustain: 0.0, release: 0.08,
                volume: 0.5, vibrato: 12, vibratoDepth: 20,
                harmonics: [{ ratio: 2.5, gain: 0.2 }]
            },
            'sfx-cash-register': {
                type: 'square',
                freqStart: 800, freqEnd: 600,
                attack: 0.01, decay: 0.3, sustain: 0.1, release: 0.2,
                volume: 0.5, noiseMix: 0.15, noiseFilter: 2000,
                harmonics: [{ ratio: 1.5, gain: 0.4 }, { ratio: 2.5, gain: 0.2 }]
            },
            'sfx-success-balance': {
                type: 'sine',
                freqStart: 523.25, freqEnd: 783.99,
                attack: 0.02, decay: 0.6, sustain: 0.3, release: 0.5,
                volume: 0.6, vibrato: 3, vibratoDepth: 10,
                harmonics: [{ ratio: 1.25, gain: 0.3 }, { ratio: 1.5, gain: 0.3 }, { ratio: 2, gain: 0.2 }]
            },
            'sfx-level-up': {
                type: 'sine',
                freqStart: 440, freqEnd: 880,
                attack: 0.03, decay: 0.8, sustain: 0.4, release: 0.6,
                volume: 0.55, vibrato: 4, vibratoDepth: 20,
                harmonics: [{ ratio: 2, gain: 0.3 }, { ratio: 3, gain: 0.2 }]
            },
            'sfx-woosh-loss': {
                type: 'sine',
                freqStart: 600, freqEnd: 100,
                attack: 0.001, decay: 0.5, sustain: 0.0, release: 0.3,
                volume: 0.5, noiseMix: 0.4, noiseFilter: 2000,
                harmonics: [{ ratio: 0.5, gain: 0.3 }]
            },
            'sfx-danger-heart': {
                type: 'sawtooth',
                freqStart: 150, freqEnd: 80,
                attack: 0.001, decay: 0.3, sustain: 0.1, release: 0.2,
                volume: 0.6, noiseMix: 0.2, noiseFilter: 800,
                harmonics: [{ ratio: 1.5, gain: 0.4 }]
            },
            'sfx-error-buzz': {
                type: 'square',
                freqStart: 200, freqEnd: 150,
                attack: 0.001, decay: 0.2, sustain: 0.0, release: 0.1,
                volume: 0.5, noiseMix: 0.1, noiseFilter: 1000,
                harmonics: [{ ratio: 1.3, gain: 0.3 }]
            },
            'sfx-notification': {
                type: 'sine',
                freqStart: 800, freqEnd: 1000,
                attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.15,
                volume: 0.45, vibrato: 6, vibratoDepth: 12,
                harmonics: [{ ratio: 2, gain: 0.2 }]
            },
            'sfx-achievement': {
                type: 'sine',
                freqStart: 523, freqEnd: 1046,
                attack: 0.02, decay: 1.0, sustain: 0.3, release: 0.8,
                volume: 0.5, vibrato: 2, vibratoDepth: 8,
                harmonics: [{ ratio: 2, gain: 0.3 }, { ratio: 3, gain: 0.15 }]
            }
        };
    }

    setupIOSAudioUnlock() {
        window.addEventListener('click', this._boundUnlockAudio);
        window.addEventListener('touchstart', this._boundUnlockAudio);
    }

    _unlockAudio() {
        window.removeEventListener('click', this._boundUnlockAudio);
        window.removeEventListener('touchstart', this._boundUnlockAudio);

        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume().then(() => {
                console.log("[ContiEffects] AudioContext nativo activado en iOS/Dispositivo.");
            });
        }
    }

    /**
     * Generador procedural en tiempo real utilizando nodos nativos del AudioContext
     * Soporta paneo horizontal automático basado en la posición X de la pantalla.
     */
    playSFX(id, opts = {}) {
        if (!this._initialized) return;
        if (this.audioContext.state === 'suspended') this.audioContext.resume();

        const preset = this.sfxPresets[id];
        if (!preset) {
            console.warn(`[ContiEffects] Preset no encontrado: ${id}`);
            return;
        }

        // Limitar voces concurrentes máximas (Polifonía controlada)
        if (this.activeAudioNodes.length >= 24) {
            const old = this.activeAudioNodes.shift();
            if (old) { try { old.stop(); old.disconnect(); } catch(e){} }
        }

        const now = this.audioContext.currentTime;
        const duration = preset.attack + preset.decay + preset.sustain + preset.release;

        // 1. Nodo de volumen local (Envolvente ADSR)
        const gainNode = this.audioContext.createGain();
        const baseVol = opts.volume !== undefined ? opts.volume : 1.0;
        const targetVol = baseVol * preset.volume;

        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(targetVol, now + preset.attack);
        gainNode.gain.exponentialRampToValueAtTime(targetVol * preset.sustain + 0.001, now + preset.attack + preset.decay);
        gainNode.gain.setValueAtTime(targetVol * preset.sustain, now + preset.attack + preset.decay + preset.sustain);
        gainNode.gain.linearRampToValueAtTime(0, now + duration);

        // 2. Nodo de Paneo Estéreo Estructural (Spatial Audio 2D)
        const panNode = this.audioContext.createStereoPanner();
        if (opts.x !== undefined) {
            // Convierte coordenadas de pantalla a rango -1.0 (Izquierda) a 1.0 (Derecha)
            const screenRatio = (opts.x / window.innerWidth) * 2 - 1;
            panNode.pan.value = Math.max(-1, Math.min(1, screenRatio));
        } else {
            panNode.pan.value = 0;
        }

        // 3. Oscilador Principal
        const osc = this.audioContext.createOscillator();
        osc.type = preset.type;

        // Modulación de Pitch por variación aleatoria
        const pitchMin = opts.pitchMin !== undefined ? opts.pitchMin : 0.95;
        const pitchMax = opts.pitchMax !== undefined ? opts.pitchMax : 1.05;
        const randomPitch = pitchMin + Math.random() * (pitchMax - pitchMin);

        osc.frequency.setValueAtTime(preset.freqStart * randomPitch, now);
        osc.frequency.exponentialRampToValueAtTime(preset.freqEnd * randomPitch, now + duration);

        // Conexiones de nodos
        osc.connect(gainNode);
        gainNode.connect(panNode);
        panNode.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + duration + 0.1);
        this.activeAudioNodes.push(osc);

        // 4. Generación de Armónicos Concurrentes
        if (preset.harmonics && preset.harmonics.length > 0) {
            preset.harmonics.forEach(h => {
                const hOsc = this.audioContext.createOscillator();
                const hGain = this.audioContext.createGain();
                
                hOsc.type = preset.type;
                hOsc.frequency.setValueAtTime(preset.freqStart * h.ratio * randomPitch, now);
                hOsc.frequency.exponentialRampToValueAtTime(preset.freqEnd * h.ratio * randomPitch, now + duration);

                hGain.gain.setValueAtTime(0, now);
                hGain.gain.linearRampToValueAtTime(targetVol * h.gain, now + preset.attack);
                hGain.gain.linearRampToValueAtTime(0, now + duration);

                hOsc.connect(hGain);
                hGain.connect(panNode);
                
                hOsc.start(now);
                hOsc.stop(now + duration + 0.1);
            });
        }

        // 5. Inyección de Ruido (Simulación de fricción/explosiones del archivo truncado)
        if (preset.noiseMix > 0) {
            const bufferSize = this.audioContext.sampleRate * duration;
            const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
            const output = noiseBuffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                output[i] = Math.random() * 2 - 1;
            }

            const noiseNode = this.audioContext.createBufferSource();
            noiseNode.buffer = noiseBuffer;

            const noiseGain = this.audioContext.createGain();
            noiseGain.gain.setValueAtTime(targetVol * preset.noiseMix, now);
            noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

            noiseNode.connect(noiseGain);
            noiseGain.connect(panNode);
            noiseNode.start(now);
            noiseNode.stop(now + duration);
        }

        // Limpieza de tracking al finalizar
        setTimeout(() => {
            const idx = this.activeAudioNodes.indexOf(osc);
            if (idx > -1) this.activeAudioNodes.splice(idx, 1);
            osc.disconnect();
            gainNode.disconnect();
            panNode.disconnect();
        }, (duration + 0.2) * 1000);
    }

    triggerCoinExplosion(startX, startY, count = 12) {
        if (!this._initialized) return;

        const scoreBadge = document.getElementById(this.scoreBadgeId);
        if (!scoreBadge) {
            console.warn(`[ContiEffects] Score badge con id "${this.scoreBadgeId}" no encontrado.`);
            return;
        }

        if (this.reducedMotion) {
            this.playSFX('sfx-coin-drop', { x: startX });
            setTimeout(() => this.playSFX('sfx-cash-register', { x: window.innerWidth / 2 }), count * 45);
            return;
        }

        const rect = scoreBadge.getBoundingClientRect();
        const targetX = rect.left + rect.width / 2;
        const targetY = rect.top + rect.height / 2;

        if (this.particles.length + count > this.maxParticles) {
            this.particles.splice(0, (this.particles.length + count) - this.maxParticles);
        }

        for (let i = 0; i < count; i++) {
            const t = setTimeout(() => {
                const currentX = startX + (Math.random() - 0.5) * 20;
                this.particles.push({
                    x: currentX,
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
                // Inyecta la posición X de la moneda para el paneo estéreo
                this.playSFX('sfx-coin-drop', { x: currentX });
                if (!this.isLooping) this.startLoop();
            }, i * 60);
            this.timeouts.push(t);
        }

        const finalT = setTimeout(() => this.playSFX('sfx-cash-register', { x: targetX }), count * 45);
        this.timeouts.push(finalT);
    }

    triggerLossEffect(x, y) {
        if (!this._initialized) return;
        this.playSFX('sfx-woosh-loss', { pitchMin: 0.7, pitchMax: 1.0, x: x });
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
        this.playSFX('sfx-success-balance', { pitchMin: 1.0, pitchMax: 1.1, x: x });
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

    resizeCanvas() {
        if (!this._initialized) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
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

                    if (p.vy > 1 || p.life > 40) p.isAttracted = true;
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
        if (this.masterGain) this.masterGain.gain.value = this.masterVolume;
    }

    destroy() {
        if (!this._initialized) return;

        if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
        this.isLooping = false;

        this.timeouts.forEach(id => clearTimeout(id));
        this.timeouts = [];

        this.activeAudioNodes.forEach(node => {
            try { node.stop(); node.disconnect(); } catch (e) {}
        });
        this.activeAudioNodes = [];

        window.removeEventListener('resize', this._boundResize);
        window.removeEventListener('click', this._boundUnlockAudio);
        window.removeEventListener('touchstart', this._boundUnlockAudio);

        if (this.ctx) this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles = [];
        this._initialized = false;
        console.log("[ContiEffects] Motor destruido correctamente.");
    }
}

window.effectsManager = new ContiEffectsManager();
