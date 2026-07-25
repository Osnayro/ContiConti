
/**
 * ============================================================
 * ContiEffectsManager v3.0 — Producción
 * Efectos visuales (Canvas 2D) + Sonidos (Web Audio API) + Toasts
 * Para "Conti Conti - Desafío Financiero"
 * ============================================================
 * 
 * Uso:
 *   const fx = new ContiEffectsManager({
 *       canvasId: 'effects-canvas',
 *       scoreBadgeId: 'score-badge',
 *       maxParticles: 300,
 *       masterVolume: 0.8
 *   });
 *   fx.triggerCoinExplosion(400, 300, 15);
 *   fx.triggerToast('¡Nueva insignia!', { icon: '🏆' });
 */

class ContiEffectsManager {
    
    constructor(config = {}) {
        // Canvas
        this.canvas = document.getElementById(config.canvasId || 'effects-canvas');
        this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
        if (this.canvas) {
            this.resizeCanvas();
            window.addEventListener('resize', () => this.resizeCanvas());
        }

        // Score badge (las monedas vuelan hacia él)
        this.scoreBadge = config.scoreBadgeId 
            ? document.getElementById(config.scoreBadgeId) 
            : null;

        // Configuración
        this.maxParticles = config.maxParticles || 300;
        this.masterVolume = Math.min(1, Math.max(0, config.masterVolume ?? 0.8));

        // Estado interno
        this.particles = [];
        this.floatingTexts = [];
        this.animationId = null;
        this.isRunning = false;
        this.audioCtx = null;

        // Paletas de colores
        this.colors = {
            coin:     ['#FFD700', '#FFA500', '#FFC107', '#FFB300', '#F59E0B', '#FFF8DC'],
            confetti: ['#FF6B6B', '#4ECDC4', '#FFD93D', '#6C5CE7', '#A8E6CF', '#FF8A5C', '#3B82F6', '#F472B6', '#84CC16', '#F97316'],
            firework: ['#FF4500', '#FFD700', '#FF6347', '#FFA500', '#FFFFFF', '#FF1493', '#00FF88'],
            magic:    ['#A78BFA', '#818CF8', '#C4B5FD', '#6366F1', '#DDD6FE'],
        };

        // Exponer al scope global
        window.effectsManager = this;

        // Arrancar loop de animación
        this.startLoop();

        console.log('🎨 ContiEffectsManager v3.0 listo | Partículas máx:', this.maxParticles, '| Volumen:', this.masterVolume);
    }

    // ================================================================
    //  CANVAS — Gestión del lienzo
    // ================================================================

    resizeCanvas() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    startLoop() {
        if (this.isRunning || !this.canvas) return;
        this.isRunning = true;
        const loop = () => {
            if (!this.isRunning) return;
            this._update();
            this._draw();
            this.animationId = requestAnimationFrame(loop);
        };
        this.animationId = requestAnimationFrame(loop);
    }

    stopLoop() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    _update() {
        // Partículas
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.vx *= p.friction;
            p.vy *= p.friction;
            p.rotation += p.rotationSpeed;
            p.life -= p.decay;

            // Atracción al score badge (solo monedas en fase final)
            if (p.attractTo && this.scoreBadge && p.life < p.maxLife * 0.6) {
                const r = this.scoreBadge.getBoundingClientRect();
                const tx = r.left + r.width / 2;
                const ty = r.top + r.height / 2;
                const dx = tx - p.x;
                const dy = ty - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                p.vx += (dx / dist) * 0.1;
                p.vy += (dy / dist) * 0.1;
            }

            if (p.life <= 0 || p.y > this.canvas.height + 120 || p.x < -120 || p.x > this.canvas.width + 120) {
                this.particles.splice(i, 1);
            }
        }

        // Limitar a máximo
        while (this.particles.length > this.maxParticles) {
            this.particles.shift();
        }

        // Textos flotantes
        for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
            const ft = this.floatingTexts[i];
            ft.y += ft.vy;
            ft.life -= ft.decay;
            ft.alpha = Math.max(0, ft.life / ft.maxLife);
            if (ft.life <= 0) {
                this.floatingTexts.splice(i, 1);
            }
        }
    }

    _draw() {
        if (!this.ctx) return;
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Partículas
        for (const p of this.particles) {
            ctx.save();
            ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            ctx.scale(p.scale, p.scale);

            switch (p.type) {
                case 'coin':
                    this._drawCoin(ctx, p);
                    break;
                case 'confetti':
                    ctx.fillStyle = p.color;
                    ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
                    break;
                case 'circle':
                    ctx.fillStyle = p.color;
                    ctx.beginPath();
                    ctx.arc(0, 0, p.size, 0, Math.PI * 2);
                    ctx.fill();
                    break;
                case 'star':
                    this._drawStar(ctx, p);
                    break;
                default:
                    ctx.fillStyle = p.color;
                    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            }
            ctx.restore();
        }

        // Textos flotantes
        for (const ft of this.floatingTexts) {
            ctx.save();
            ctx.globalAlpha = ft.alpha;
            ctx.font = `${ft.fontWeight} ${ft.fontSize}px 'Poppins', sans-serif`;
            ctx.fillStyle = ft.color;
            ctx.textAlign = 'center';
            ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
            ctx.shadowBlur = 6;
            ctx.fillText(ft.text, ft.x, ft.y);
            ctx.restore();
        }
    }

    _drawCoin(ctx, p) {
        const grad = ctx.createRadialGradient(0, 0, p.size * 0.15, 0, 0, p.size);
        grad.addColorStop(0, '#FFFDE7');
        grad.addColorStop(0.45, '#FFD700');
        grad.addColorStop(1, '#B8860B');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#8B6914';
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.fillStyle = '#8B6914';
        ctx.font = `bold ${p.size * 1.3}px 'Poppins', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('$', 0, 0);
    }

    _drawStar(ctx, p) {
        const spikes = 5;
        const outerR = p.size;
        const innerR = p.size * 0.4;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        for (let i = 0; i < spikes * 2; i++) {
            const radius = i % 2 === 0 ? outerR : innerR;
            const angle = (i * Math.PI) / spikes - Math.PI / 2;
            const sx = Math.cos(angle) * radius;
            const sy = Math.sin(angle) * radius;
            i === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
        }
        ctx.closePath();
        ctx.fill();
    }

    // ================================================================
    //  API PÚBLICA — EFECTOS VISUALES
    // ================================================================

    /**
     * 💰 Explosión de monedas que vuelan hacia el score
     * @param {number} x     - Posición X
     * @param {number} y     - Posición Y
     * @param {number} count - Cantidad (default: 12, máx: 40)
     */
    triggerCoinExplosion(x, y, count = 12) {
        if (!this.canvas) return;
        count = Math.min(count, 40);
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 3 + Math.random() * 9;
            this.particles.push({
                type: 'coin',
                x: x + (Math.random() - 0.5) * 20,
                y: y + (Math.random() - 0.5) * 20,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 5,
                gravity: 0.18,
                friction: 0.985,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.35,
                scale: 0.55 + Math.random() * 0.9,
                size: 10 + Math.random() * 9,
                life: 1,
                maxLife: 1,
                decay: 0.005 + Math.random() * 0.01,
                color: this.colors.coin[Math.floor(Math.random() * this.colors.coin.length)],
                attractTo: true,
            });
        }
    }

    /**
     * 💥 Explosión circular genérica
     * @param {number} x      - Posición X
     * @param {number} y      - Posición Y
     * @param {number} scale  - Escala (default: 1.0)
     * @param {string} color  - Color base (default: '#FFD700')
     */
    triggerExplosion(x, y, scale = 1.0, color = '#FFD700') {
        if (!this.canvas) return;
        const count = Math.floor(22 * scale);
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = (2 + Math.random() * 7) * scale;
            this.particles.push({
                type: 'circle',
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                gravity: 0.12,
                friction: 0.955,
                rotation: 0,
                rotationSpeed: 0,
                scale: 0.45 + Math.random() * 0.85,
                size: 3 + Math.random() * 9 * scale,
                life: 1,
                maxLife: 1,
                decay: 0.014 + Math.random() * 0.022,
                color: color,
                attractTo: false,
            });
        }
    }

    /**
     * 🎊 Lluvia de confeti desde arriba
     * @param {number} duration - Duración en ms (default: 2500)
     * @param {number} density  - Partículas por frame (default: 3)
     */
    triggerConfetti(duration = 2500, density = 3) {
        if (!this.canvas) return;
        const startTime = performance.now();
        const colors = this.colors.confetti;

        const spawn = (now) => {
            if (now - startTime > duration) return;
            for (let i = 0; i < density; i++) {
                this.particles.push({
                    type: 'confetti',
                    x: Math.random() * this.canvas.width,
                    y: -25,
                    vx: (Math.random() - 0.5) * 5,
                    vy: 2 + Math.random() * 5,
                    gravity: 0.06,
                    friction: 0.994,
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.25,
                    scale: 0.7 + Math.random() * 1.3,
                    size: 8 + Math.random() * 14,
                    life: 1,
                    maxLife: 1,
                    decay: 0.003 + Math.random() * 0.006,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    attractTo: false,
                });
            }
            requestAnimationFrame(spawn);
        };
        requestAnimationFrame(spawn);
    }

    /**
     * 🎆 Fuegos artificiales
     * @param {number} count - Número de explosiones (default: 3)
     */
    triggerFireworks(count = 3) {
        if (!this.canvas) return;
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const x = this.canvas.width * (0.2 + Math.random() * 0.6);
                const y = this.canvas.height * (0.12 + Math.random() * 0.28);
                this._burstFirework(x, y);
            }, i * 350 + Math.random() * 250);
        }
    }

    _burstFirework(x, y) {
        const colors = this.colors.firework;
        const count = 45 + Math.floor(Math.random() * 35);
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 3 + Math.random() * 8;
            this.particles.push({
                type: 'star',
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                gravity: 0.09,
                friction: 0.965,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.12,
                scale: 0.35 + Math.random() * 0.7,
                size: 4 + Math.random() * 7,
                life: 1,
                maxLife: 1,
                decay: 0.009 + Math.random() * 0.016,
                color: colors[Math.floor(Math.random() * colors.length)],
                attractTo: false,
            });
        }
    }

    /**
     * 📝 Texto flotante que sube y se desvanece
     * @param {number} x       - Posición X
     * @param {number} y       - Posición Y
     * @param {string} text    - Texto
     * @param {Object} options - { color, fontSize, fontWeight }
     */
    triggerFloatingText(x, y, text, options = {}) {
        if (!this.canvas) return;
        this.floatingTexts.push({
            x, y, text,
            vy: -1.6,
            life: 1,
            maxLife: 1,
            decay: 0.011,
            alpha: 1,
            color: options.color || '#FFD700',
            fontSize: options.fontSize || 28,
            fontWeight: options.fontWeight || '800',
        });
    }

    /**
     * 🪙 Lluvia de monedas desde arriba (rachas)
     */
    triggerCoinRain() {
        if (!this.canvas) return;
        const count = 30;
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                this.particles.push({
                    type: 'coin',
                    x: Math.random() * this.canvas.width,
                    y: -35,
                    vx: (Math.random() - 0.5) * 3.5,
                    vy: 3 + Math.random() * 6,
                    gravity: 0.14,
                    friction: 0.994,
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.25,
                    scale: 0.45 + Math.random() * 0.55,
                    size: 7 + Math.random() * 7,
                    life: 1,
                    maxLife: 1,
                    decay: 0.004 + Math.random() * 0.007,
                    color: this.colors.coin[Math.floor(Math.random() * this.colors.coin.length)],
                    attractTo: false,
                });
            }, i * 45);
        }
    }

    /**
     * ⚡ Destello de pantalla
     * @param {number} duration - ms (default: 200)
     */
    triggerScreenFlash(duration = 200) {
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: white; z-index: 998; pointer-events: none;
            opacity: 0.55; transition: opacity ${duration}ms ease-out;
        `;
        document.body.appendChild(flash);
        requestAnimationFrame(() => { flash.style.opacity = '0'; });
        setTimeout(() => flash.remove(), duration + 60);
    }

    // ================================================================
    //  API PÚBLICA — SISTEMA DE TOASTS
    // ================================================================

    /**
     * 🔔 Toast animado (reemplaza alert)
     * @param {string} message        - Texto
     * @param {Object} options        - { icon, bg, duration, position }
     */
    triggerToast(message, options = {}) {
        const {
            icon = '🎉',
            bg = 'linear-gradient(135deg, #1E3A63, #2563EB)',
            duration = 3000,
            position = 'top'
        } = options;

        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.style.cssText = `
                position: fixed; left: 50%; transform: translateX(-50%);
                z-index: 2000; display: flex; flex-direction: column;
                gap: 12px; pointer-events: none;
            `;
            document.body.appendChild(container);
        }
        container.style.top = position === 'center' ? '40%' : '8%';

        const toast = document.createElement('div');
        toast.style.cssText = `
            background: ${bg}; color: white; padding: 15px 26px;
            border-radius: 18px; font-weight: 700; font-size: 0.95rem;
            font-family: 'Poppins', sans-serif; text-align: center;
            box-shadow: 0 14px 35px rgba(0,0,0,0.28);
            pointer-events: auto;
            animation: toastSlideIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
            display: flex; align-items: center; gap: 12px;
            white-space: nowrap; letter-spacing: 0.3px;
        `;
        toast.innerHTML = `<span style="font-size:1.6rem; line-height:1">${icon}</span> ${message}`;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'toastSlideOut 0.4s ease-in forwards';
            setTimeout(() => toast.remove(), 400);
        }, duration);
    }

    // ================================================================
    //  API PÚBLICA — SONIDOS
    // ================================================================

    ensureAudio() {
        if (!this.audioCtx) {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }
    }

    /**
     * 🔊 Reproduce sonido sintetizado
     * @param {string} type - 'correct'|'incorrect'|'levelup'|'achievement'|'powerup'|'tick'|'coin'|'explosion'
     */
    playSound(type) {
        this.ensureAudio();
        if (!this.audioCtx) return;

        const now = this.audioCtx.currentTime;
        const vol = this.masterVolume;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        switch (type) {
            case 'correct':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(523, now);
                osc.frequency.setValueAtTime(659, now + 0.08);
                osc.frequency.setValueAtTime(784, now + 0.16);
                gain.gain.setValueAtTime(0.18 * vol, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
                osc.start(now); osc.stop(now + 0.3);
                break;

            case 'incorrect':
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(200, now);
                osc.frequency.exponentialRampToValueAtTime(110, now + 0.38);
                gain.gain.setValueAtTime(0.12 * vol, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
                osc.start(now); osc.stop(now + 0.42);
                break;

            case 'levelup':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(523, now);
                osc.frequency.setValueAtTime(659, now + 0.12);
                osc.frequency.setValueAtTime(784, now + 0.24);
                osc.frequency.setValueAtTime(1047, now + 0.36);
                gain.gain.setValueAtTime(0.22 * vol, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
                osc.start(now); osc.stop(now + 0.6);
                break;

            case 'achievement':
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(660, now);
                osc.frequency.setValueAtTime(880, now + 0.1);
                osc.frequency.setValueAtTime(1100, now + 0.2);
                osc.frequency.setValueAtTime(1320, now + 0.3);
                gain.gain.setValueAtTime(0.17 * vol, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
                osc.start(now); osc.stop(now + 0.5);
                break;

            case 'powerup':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(440, now);
                osc.frequency.setValueAtTime(880, now + 0.12);
                gain.gain.setValueAtTime(0.15 * vol, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
                osc.start(now); osc.stop(now + 0.3);
                break;

            case 'tick':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(1000, now);
                gain.gain.setValueAtTime(0.06 * vol, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
                osc.start(now); osc.stop(now + 0.06);
                break;

            case 'coin':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(1400, now);
                osc.frequency.setValueAtTime(1800, now + 0.04);
                gain.gain.setValueAtTime(0.1 * vol, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
                osc.start(now); osc.stop(now + 0.12);
                break;

            case 'explosion':
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(160, now);
                osc.frequency.exponentialRampToValueAtTime(28, now + 0.5);
                gain.gain.setValueAtTime(0.25 * vol, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
                osc.start(now); osc.stop(now + 0.55);
                break;

            default:
                osc.start(now); osc.stop(now);
        }
    }

    // ================================================================
    //  CONVENIENCIA — Integración con app.js
    // ================================================================

    triggerCoinExplosionFromElement(element, count = 12) {
        if (!element || !this.canvas) return;
        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        this.triggerCoinExplosion(x, y, count);
        this.playSound('coin');
    }

    setScoreBadge(elementOrId) {
        if (typeof elementOrId === 'string') {
            this.scoreBadge = document.getElementById(elementOrId);
        } else {
            this.scoreBadge = elementOrId;
        }
    }
}

// ================================================================
//  INICIALIZACIÓN AUTOMÁTICA
// ================================================================
document.addEventListener('DOMContentLoaded', () => {
    if (!window.effectsManager) {
        window.effectsManager = new ContiEffectsManager({
            canvasId: 'effects-canvas',
            scoreBadgeId: 'score-badge',
            maxParticles: 300,
            masterVolume: 0.8,
        });
    }
});
