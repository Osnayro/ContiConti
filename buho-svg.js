

/**
 * ============================================================
 * PAES Challenge — Sabiondo el Búho SVG v1.1.0
 * Personaje animado con estados emocionales expandidos
 * Para "PAES Challenge: Desafío de Admisión Universitaria"
 * ============================================================
 */

function injectBuhoSVGs() {
    const containers = document.querySelectorAll('.rabbit-svg-container, .buho-svg-container');
    
    containers.forEach(container => {
        container.innerHTML = '';
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 200 230');
        svg.setAttribute('width', '140');
        svg.setAttribute('height', '160');
        svg.setAttribute('class', 'buho-svg');
        svg.style.overflow = 'visible';
        
        svg.innerHTML = `
            <!-- Fondo de resplandor (para estados especiales) -->
            <circle cx="100" cy="115" r="80" fill="none" class="resplandor" opacity="0"/>
            
            <!-- Birrete universitario -->
            <g class="birrete-group">
                <polygon points="55,50 145,50 155,60 45,60" fill="#2D3748" stroke="#1A202C" stroke-width="2"/>
                <line x1="55" y1="50" x2="145" y2="50" stroke="#FFD700" stroke-width="2.5"/>
                <!-- Borla -->
                <line x1="150" y1="60" x2="168" y2="82" stroke="#FFD700" stroke-width="3" stroke-linecap="round"/>
                <circle cx="168" cy="85" r="6" fill="#FFD700" class="borla"/>
            </g>
            
            <!-- Cabeza -->
            <ellipse cx="100" cy="108" rx="50" ry="44" fill="#1E3A63" stroke="#15294A" stroke-width="2"/>
            
            <!-- Plumas/Orejas -->
            <g class="pluma-left">
                <polygon points="58,72 35,38 73,64" fill="#1E3A63" stroke="#15294A" stroke-width="2"/>
                <polygon points="55,68 40,45 68,62" fill="#93C5FD" class="pluma-inner"/>
            </g>
            <g class="pluma-right">
                <polygon points="142,72 165,38 127,64" fill="#1E3A63" stroke="#15294A" stroke-width="2"/>
                <polygon points="145,68 160,45 132,62" fill="#93C5FD" class="pluma-inner"/>
            </g>
            
            <!-- Ojos -->
            <circle cx="80" cy="102" r="20" fill="white" stroke="#15294A" stroke-width="2"/>
            <circle cx="120" cy="102" r="20" fill="white" stroke="#15294A" stroke-width="2"/>
            
            <!-- Iris -->
            <circle cx="80" cy="102" r="13" fill="#F59E0B" class="iris"/>
            <circle cx="120" cy="102" r="13" fill="#F59E0B" class="iris"/>
            
            <!-- Pupilas -->
            <circle cx="80" cy="102" r="6" fill="#1A202C" class="pupil pupil-left"/>
            <circle cx="120" cy="102" r="6" fill="#1A202C" class="pupil pupil-right"/>
            
            <!-- Brillo -->
            <circle cx="76" cy="98" r="3" fill="white"/>
            <circle cx="116" cy="98" r="3" fill="white"/>
            
            <!-- Cejas -->
            <path d="M60,86 Q80,76 100,86" fill="none" stroke="#15294A" stroke-width="3.5" stroke-linecap="round" class="ceja-left"/>
            <path d="M100,86 Q120,76 140,86" fill="none" stroke="#15294A" stroke-width="3.5" stroke-linecap="round" class="ceja-right"/>
            
            <!-- Pico -->
            <polygon points="94,108 100,122 106,108" fill="#F59E0B" stroke="#D97706" stroke-width="1.5" class="pico"/>
            
            <!-- Sonrojo (mejillas) -->
            <circle cx="62" cy="115" r="7" fill="#FCA5A5" opacity="0" class="sonrojo sonrojo-left"/>
            <circle cx="138" cy="115" r="7" fill="#FCA5A5" opacity="0" class="sonrojo sonrojo-right"/>
            
            <!-- Gota de sudor (preocupación) -->
            <g class="sudor-group" opacity="0">
                <path d="M155,75 Q155,68 158,62 Q161,68 161,75 Q161,80 158,82 Q155,80 155,75Z" 
                      fill="#60A5FA" stroke="#3B82F6" stroke-width="1"/>
            </g>
            
            <!-- Líneas de alivio -->
            <g class="alivio-group" opacity="0">
                <line x1="160" y1="75" x2="170" y2="65" stroke="#10B981" stroke-width="2.5" stroke-linecap="round"/>
                <line x1="165" y1="78" x2="175" y2="72" stroke="#10B981" stroke-width="2" stroke-linecap="round"/>
            </g>
            
            <!-- Cuerpo -->
            <ellipse cx="100" cy="168" rx="60" ry="55" fill="#1E3A63" stroke="#15294A" stroke-width="2"/>
            
            <!-- Pecho -->
            <ellipse cx="100" cy="168" rx="35" ry="38" fill="#EFF6FF" stroke="#DBEAFE" stroke-width="2"/>
            
            <!-- Alas -->
            <g class="ala-left">
                <path d="M43,145 Q22,168 35,190 Q48,185 47,155" fill="#15294A" stroke="#0F1D3A" stroke-width="1.5"/>
            </g>
            <g class="ala-right">
                <path d="M157,145 Q178,168 165,190 Q152,185 153,155" fill="#15294A" stroke="#0F1D3A" stroke-width="1.5"/>
            </g>
            
            <!-- Libro -->
            <g class="libro-group">
                <rect x="76" y="175" width="48" height="32" rx="3" fill="#8B5CF6" stroke="#6D28D9" stroke-width="2"/>
                <line x1="100" y1="175" x2="100" y2="207" stroke="#6D28D9" stroke-width="2"/>
                <!-- Texto simulado -->
                <line x1="82" y1="184" x2="96" y2="184" stroke="white" stroke-width="1.5" opacity="0.6"/>
                <line x1="82" y1="189" x2="94" y2="189" stroke="white" stroke-width="1.5" opacity="0.6"/>
                <line x1="82" y1="194" x2="96" y2="194" stroke="white" stroke-width="1.5" opacity="0.6"/>
                <line x1="104" y1="184" x2="118" y2="184" stroke="white" stroke-width="1.5" opacity="0.6"/>
                <line x1="104" y1="189" x2="116" y2="189" stroke="white" stroke-width="1.5" opacity="0.6"/>
                <line x1="104" y1="194" x2="118" y2="194" stroke="white" stroke-width="1.5" opacity="0.6"/>
            </g>
            
            <!-- Patas -->
            <g class="patas-group">
                <ellipse cx="82" cy="222" rx="12" ry="6" fill="#F59E0B" stroke="#D97706" stroke-width="1.5"/>
                <ellipse cx="118" cy="222" rx="12" ry="6" fill="#F59E0B" stroke="#D97706" stroke-width="1.5"/>
            </g>
            
            <!-- Estrellas de conocimiento -->
            <g class="estrellas-group" opacity="0">
                <text x="20" y="40" font-size="20" class="estrella-1">✨</text>
                <text x="160" y="35" font-size="16" class="estrella-2">⭐</text>
                <text x="175" y="145" font-size="14" class="estrella-3">💫</text>
                <text x="15" y="140" font-size="12" class="estrella-4">🌟</text>
                <text x="25" y="195" font-size="10" class="estrella-5">📚</text>
                <text x="165" y="195" font-size="10" class="estrella-6">🎓</text>
            </g>
            
            <!-- Lupa -->
            <g class="lupa-group" opacity="0">
                <circle cx="170" cy="130" r="16" fill="rgba(255,255,255,0.2)" stroke="#FFD700" stroke-width="3"/>
                <line x1="158" y1="142" x2="146" y2="158" stroke="#FFD700" stroke-width="4.5" stroke-linecap="round"/>
            </g>
            
            <!-- Corazón (alivio) -->
            <g class="corazon-group" opacity="0">
                <path d="M165,55 Q165,45 172,45 Q179,45 179,55 Q179,65 172,72 Q165,65 165,55Z" 
                      fill="#EF4444" stroke="#DC2626" stroke-width="1"/>
            </g>
            
            <!-- Signo de exclamación (preocupación) -->
            <g class="exclamacion-group" opacity="0">
                <circle cx="145" cy="48" r="10" fill="#F59E0B" stroke="#D97706" stroke-width="1.5"/>
                <text x="145" y="53" text-anchor="middle" font-size="14" font-weight="bold" fill="white">!</text>
            </g>
        `;
        
        container.appendChild(svg);
    });
}

// Inyectar en carga
document.addEventListener('DOMContentLoaded', () => {
    injectBuhoSVGs();
});

// Re-inyectar al cambiar pantalla
const originalShowScreen = window.showScreen;
if (originalShowScreen) {
    window.showScreen = function(screenId) {
        originalShowScreen(screenId);
        setTimeout(injectBuhoSVGs, 100);
    };
}
```

---

📄 Archivo 3 de 3: effects.js actualizado (efectos académicos)

```javascript
/**
 * ============================================================
 * PAES Challenge — Sabiondo Effects Manager v1.0.0
 * Efectos visuales académicos (Canvas 2D) + Sonidos
 * Para "PAES Challenge: Desafío de Admisión Universitaria"
 * ============================================================
 *
 * Cambios:
 *   - Monedas ($) → Estrellas de conocimiento (⭐)
 *   - Colores de confeti → Paleta académica
 *   - Toast → Diseño universitario
 */

class ContiEffectsManager {

    constructor(config = {}) {
        this.canvas = document.getElementById(config.canvasId || 'effects-canvas');
        this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
        if (this.canvas) {
            this.resizeCanvas();
            window.addEventListener('resize', () => this.resizeCanvas());
        }

        this.scoreBadge = config.scoreBadgeId
            ? document.getElementById(config.scoreBadgeId)
            : null;

        this.maxParticles = config.maxParticles || 300;
        this.masterVolume = Math.min(1, Math.max(0, config.masterVolume ?? 0.8));

        this.particles = [];
        this.floatingTexts = [];
        this.animationId = null;
        this.isRunning = false;

        this.soundFiles = {
            splash:      'sounds/splash.mp3',
            correct:     'sounds/correct.mp3',
            incorrect:   'sounds/incorrect.mp3',
            levelup:     'sounds/levelup.mp3',
            levelstart:  'sounds/levelstart.mp3',
            achievement: 'sounds/achievement.mp3',
            powerup:     'sounds/powerup.mp3',
            star:        'sounds/star.mp3',
            explosion:   'sounds/explosion.mp3',
            pluma:       'sounds/pluma.mp3',
        };

        this.audioPool = [];
        this.maxAudioPool = 8;
        this.audioPoolIndex = 0;
        this.audioBuffers = {};
        this.audioLoaded = false;
        this.audioLoadError = false;
        this.soundsLoadedCount = 0;
        this.soundsTotalCount = Object.keys(this.soundFiles).length;
        this.audioCtx = null;
        this.audioCtxReady = false;

        // Paleta académica (reemplaza colores de dinero)
        this.colors = {
            star:      ['#FFD700', '#FFC107', '#FFB300', '#FFA000', '#FFF8DC', '#FFE082'],
            estrellas: ['#FFD700', '#FFC107', '#FFB300', '#FFA000', '#FFF8DC', '#FFE082'],
            confetti:  ['#1E3A63', '#8B5CF6', '#FFD700', '#10B981', '#3B82F6', '#F59E0B', '#EC4899', '#6366F1', '#14B8A6', '#84CC16'],
            libro:     ['#8B5CF6', '#6366F1', '#A78BFA', '#C4B5FD', '#DDD6FE'],
            fuego:     ['#FF4500', '#FFD700', '#FF6347', '#FFA500', '#FFFFFF', '#FF1493', '#00FF88'],
            magic:     ['#A78BFA', '#818CF8', '#C4B5FD', '#6366F1', '#DDD6FE'],
        };

        window.effectsManager = this;

        this.startLoop();
        this._preloadSounds();

        console.log('🦉 Sabiondo Effects Manager v1.0.0 listo | Partículas:', this.maxParticles, '| Volumen:', this.masterVolume);
    }

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
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.vx *= p.friction;
            p.vy *= p.friction;
            p.rotation += p.rotationSpeed;
            p.life -= p.decay;

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

        while (this.particles.length > this.maxParticles) {
            this.particles.shift();
        }

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

        for (const p of this.particles) {
            ctx.save();
            ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            ctx.scale(p.scale, p.scale);

            switch (p.type) {
                case 'star': this._drawStar(ctx, p); break;
                case 'estrella': this._drawEstrella(ctx, p); break;
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
                case 'libro': this._drawLibro(ctx, p); break;
                case 'pluma': this._drawPluma(ctx, p); break;
                default:
                    ctx.fillStyle = p.color;
                    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            }
            ctx.restore();
        }

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

    // Dibuja una estrella de 5 puntas ⭐
    _drawStar(ctx, p) {
        const spikes = 5;
        const outerR = p.size;
        const innerR = p.size * 0.4;
        
        const grad = ctx.createRadialGradient(0, 0, innerR * 0.3, 0, 0, outerR);
        grad.addColorStop(0, '#FFFDE7');
        grad.addColorStop(0.5, '#FFD700');
        grad.addColorStop(1, '#B8860B');
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        for (let i = 0; i < spikes * 2; i++) {
            const radius = i % 2 === 0 ? outerR : innerR;
            const angle = (i * Math.PI) / spikes - Math.PI / 2;
            const sx = Math.cos(angle) * radius;
            const sy = Math.sin(angle) * radius;
            if (i === 0) ctx.moveTo(sx, sy);
            else ctx.lineTo(sx, sy);
        }
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#8B6914';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    // Dibuja una estrella con texto ⭐
    _drawEstrella(ctx, p) {
        this._drawStar(ctx, p);
        ctx.fillStyle = '#8B6914';
        ctx.font = `bold ${p.size * 0.8}px 'Poppins', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('⭐', 0, 0);
    }

    // Dibuja un mini libro 📖
    _drawLibro(ctx, p) {
        ctx.fillStyle = '#8B5CF6';
        ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.7);
        ctx.fillStyle = '#6D28D9';
        ctx.fillRect(0, -p.size / 3, 1.5, p.size * 0.7);
        ctx.strokeStyle = '#4C1D95';
        ctx.lineWidth = 1;
        ctx.strokeRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.7);
    }

    // Dibuja una pluma 🪶
    _drawPluma(ctx, p) {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.3, p.size, -0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 0.8;
        ctx.stroke();
    }

    // ===== MÉTODOS DE EFECTOS ACADÉMICOS =====

    // Explosión de estrellas de conocimiento ⭐
    triggerStarExplosion(x, y, count = 15) {
        if (!this.canvas) return;
        count = Math.min(count, 50);
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 3 + Math.random() * 9;
            this.particles.push({
                type: 'star',
                x: x + (Math.random() - 0.5) * 20,
                y: y + (Math.random() - 0.5) * 20,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 5,
                gravity: 0.18,
                friction: 0.985,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.35,
                scale: 0.55 + Math.random() * 0.9,
                size: 10 + Math.random() * 10,
                life: 1,
                maxLife: 1,
                decay: 0.005 + Math.random() * 0.01,
                color: this.colors.star[Math.floor(Math.random() * this.colors.star.length)],
                attractTo: true,
            });
        }
    }

    // Explosión de libros 📚
    triggerBookExplosion(x, y, count = 10) {
        if (!this.canvas) return;
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 6;
            this.particles.push({
                type: 'libro',
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 4,
                gravity: 0.15,
                friction: 0.97,
                rotation: Math.random() * Math.PI,
                rotationSpeed: (Math.random() - 0.5) * 0.2,
                scale: 0.5 + Math.random() * 0.8,
                size: 8 + Math.random() * 10,
                life: 1,
                maxLife: 1,
                decay: 0.008 + Math.random() * 0.012,
                color: this.colors.libro[Math.floor(Math.random() * this.colors.libro.length)],
                attractTo: false,
            });
        }
    }

    // Lluvia de estrellas ⭐
    triggerStarRain(count = 30) {
        if (!this.canvas) return;
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                this.particles.push({
                    type: 'star',
                    x: Math.random() * this.canvas.width,
                    y: -40,
                    vx: (Math.random() - 0.5) * 3.5,
                    vy: 3 + Math.random() * 6,
                    gravity: 0.14,
                    friction: 0.994,
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.25,
                    scale: 0.45 + Math.random() * 0.55,
                    size: 7 + Math.random() * 8,
                    life: 1,
                    maxLife: 1,
                    decay: 0.004 + Math.random() * 0.007,
                    color: this.colors.star[Math.floor(Math.random() * this.colors.star.length)],
                    attractTo: false,
                });
            }, i * 45);
        }
    }

    // Confeti académico (colores universitarios)
    triggerConfettiAcademico(duration = 2500, density = 3) {
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

    // Fuegos artificiales académicos
    triggerFuegosAcademicos(count = 3) {
        if (!this.canvas) return;
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const x = this.canvas.width * (0.2 + Math.random() * 0.6);
                const y = this.canvas.height * (0.12 + Math.random() * 0.28);
                this._burstAcademicFirework(x, y);
            }, i * 400 + Math.random() * 300);
        }
    }

    _burstAcademicFirework(x, y) {
        const colors = this.colors.fuego;
        const count = 50 + Math.floor(Math.random() * 40);
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 3 + Math.random() * 9;
            this.particles.push({
                type: 'star',
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                gravity: 0.09,
                friction: 0.965,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.12,
                scale: 0.3 + Math.random() * 0.6,
                size: 4 + Math.random() * 8,
                life: 1,
                maxLife: 1,
                decay: 0.009 + Math.random() * 0.016,
                color: colors[Math.floor(Math.random() * colors.length)],
                attractTo: false,
            });
        }
    }

    // Plumas voladoras 🪶
    triggerPlumasVoladoras(count = 12) {
        if (!this.canvas) return;
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                this.particles.push({
                    type: 'pluma',
                    x: Math.random() * this.canvas.width,
                    y: -20,
                    vx: (Math.random() - 0.5) * 2,
                    vy: 1 + Math.random() * 3,
                    gravity: 0.02,
                    friction: 0.996,
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.15,
                    scale: 0.6 + Math.random() * 0.8,
                    size: 6 + Math.random() * 8,
                    life: 1,
                    maxLife: 1,
                    decay: 0.002 + Math.random() * 0.005,
                    color: ['#EFF6FF', '#DBEAFE', '#BFDBFE', '#93C5FD'][Math.floor(Math.random() * 4)],
                    attractTo: false,
                });
            }, i * 60);
        }
    }

    // Destello en pantalla
    triggerScreenFlash(duration = 200) {
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: radial-gradient(circle, rgba(139, 92, 246, 0.4), rgba(30, 58, 99, 0.2));
            z-index: 998; pointer-events: none;
            opacity: 0.6; transition: opacity ${duration}ms ease-out;
        `;
        document.body.appendChild(flash);
        requestAnimationFrame(() => { flash.style.opacity = '0'; });
        setTimeout(() => flash.remove(), duration + 60);
    }

    // Destello del score
    triggerScoreBadgeFlash() {
        if (!this.scoreBadge) return;
        this.scoreBadge.classList.add('ultra-pop');
        setTimeout(() => this.scoreBadge.classList.remove('ultra-pop'), 600);
        const rect = this.scoreBadge.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        for (let i = 0; i < 10; i++) {
            const angle = (i / 10) * Math.PI * 2;
            this.particles.push({
                type: 'star',
                x: cx, y: cy,
                vx: Math.cos(angle) * 2.5,
                vy: Math.sin(angle) * 2.5,
                gravity: 0,
                friction: 0.9,
                rotation: 0,
                rotationSpeed: 0,
                scale: 0.5,
                size: 3 + Math.random() * 3,
                life: 1,
                maxLife: 1,
                decay: 0.035,
                color: '#FFD700',
                attractTo: false,
            });
        }
    }

    // ===== MÉTODOS DE CONVENIENCIA =====

    // Explosión de estrellas desde elemento
    triggerStarsFromElement(element, count = 15) {
        if (!element || !this.canvas) return;
        const rect = element.getBoundingClientRect();
        this.triggerStarExplosion(rect.left + rect.width / 2, rect.top + rect.height / 2, count);
        this.playSound('star');
    }

    // Explosión de libros desde elemento
    triggerBooksFromElement(element, count = 10) {
        if (!element || !this.canvas) return;
        const rect = element.getBoundingClientRect();
        this.triggerBookExplosion(rect.left + rect.width / 2, rect.top + rect.height / 2, count);
    }

    // Toast académico
    triggerToastAcademico(message, options = {}) {
        const { 
            icon = '🦉', 
            bg = 'linear-gradient(135deg, #1E3A63, #3B82F6)', 
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
        toast.innerHTML = '<span style="font-size:1.6rem; line-height:1">' + icon + '</span> ' + message;
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'toastSlideOut 0.4s ease-in forwards';
            setTimeout(() => toast.remove(), 400);
        }, duration);
    }

    // ===== MÉTODOS ORIGINALES (compatibilidad) =====
    
    triggerCoinExplosion(x, y, count) {
        this.triggerStarExplosion(x, y, count);
    }
    
    triggerCoinExplosionFromElement(element, count) {
        this.triggerStarsFromElement(element, count);
    }
    
    triggerConfetti(duration, density) {
        this.triggerConfettiAcademico(duration, density);
    }
    
    triggerFireworks(count) {
        this.triggerFuegosAcademicos(count);
    }
    
    triggerCoinRain() {
        this.triggerStarRain();
    }
    
    triggerToast(message, options) {
        this.triggerToastAcademico(message, options);
    }
    
    triggerExplosion(x, y, scale, color) {
        if (!this.canvas) return;
        const count = Math.floor(22 * (scale || 1));
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = (2 + Math.random() * 7) * (scale || 1);
            this.particles.push({
                type: 'star',
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                gravity: 0.12,
                friction: 0.955,
                rotation: 0,
                rotationSpeed: 0,
                scale: 0.45 + Math.random() * 0.85,
                size: 3 + Math.random() * 9 * (scale || 1),
                life: 1,
                maxLife: 1,
                decay: 0.014 + Math.random() * 0.022,
                color: color || '#FFD700',
                attractTo: false,
            });
        }
    }

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

    // ===== AUDIO =====
    _preloadSounds(onProgress) {
        const loaderFill = document.getElementById('loader-fill');
        if (loaderFill) {
            loaderFill.style.width = '0%';
            loaderFill.style.animation = 'none';
        }
        
        for (let i = 0; i < this.maxAudioPool; i++) {
            const audio = new Audio();
            audio.preload = 'auto';
            audio.volume = this.masterVolume;
            this.audioPool.push(audio);
        }

        for (const [key, path] of Object.entries(this.soundFiles)) {
            const audio = new Audio();
            audio.preload = 'auto';
            audio.src = path;
            audio.volume = this.masterVolume;

            audio.addEventListener('canplaythrough', () => {
                this.soundsLoadedCount++;
                this.audioBuffers[key] = audio;
                if (loaderFill) {
                    loaderFill.style.width = (this.soundsLoadedCount / this.soundsTotalCount) * 100 + '%';
                }
                if (onProgress) onProgress(this.soundsLoadedCount, this.soundsTotalCount);
                if (this.soundsLoadedCount === this.soundsTotalCount) {
                    this.audioLoaded = true;
                    this._showSplashButton();
                }
            }, { once: true });

            audio.addEventListener('error', () => {
                this.soundsLoadedCount++;
                if (loaderFill) {
                    loaderFill.style.width = (this.soundsLoadedCount / this.soundsTotalCount) * 100 + '%';
                }
                if (this.soundsLoadedCount === this.soundsTotalCount && !this.audioLoaded) {
                    this.audioLoadError = true;
                    this._showSplashButton();
                }
            });

            audio.load();
        }
    }

    _showSplashButton() {
        const loaderFill = document.getElementById('loader-fill');
        const loaderLabel = document.getElementById('loader-label');
        const skipBtn = document.getElementById('skip-splash-btn');
        const splashScreen = document.getElementById('splash-screen');
        
        if (loaderFill) loaderFill.style.width = '100%';
        if (loaderLabel) {
            loaderLabel.textContent = '¡Listo! Sabiondo te espera.';
            loaderLabel.style.color = '#10B981';
        }
        if (skipBtn) {
            skipBtn.style.display = 'flex';
            skipBtn.classList.add('ready');
            skipBtn.disabled = false;
            skipBtn.addEventListener('click', () => {
                this.initGlobalAudio();
                this.playSound('splash');
                if (splashScreen) splashScreen.classList.add('hidden');
            }, { once: true });
        }
    }

    initGlobalAudio() {
        if (this.audioCtxReady) return;
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        try {
            this.audioCtx = new AudioCtx();
            if (this.audioCtx.state === 'suspended') {
                this.audioCtx.resume().then(() => {
                    this.audioCtxReady = true;
                }).catch(err => console.warn('AudioContext error:', err));
            } else {
                this.audioCtxReady = true;
            }
        } catch (e) {
            console.warn('Error AudioContext:', e);
        }
    }

    playSound(type) {
        if (!this.audioLoaded && !this.audioLoadError) return;
        if (!this.soundFiles[type]) return;
        const sourceAudio = this.audioBuffers[type];
        if (!sourceAudio) return;
        const poolAudio = this.audioPool[this.audioPoolIndex];
        this.audioPoolIndex = (this.audioPoolIndex + 1) % this.maxAudioPool;
        poolAudio.src = this.soundFiles[type];
        poolAudio.volume = this.masterVolume;
        const playPromise = poolAudio.play();
        if (playPromise !== undefined) {
            playPromise.catch(err => console.debug('Audio bloqueado:', type, '-', err.message));
        }
    }

    playIncorrectFallback() {
        if (!this.audioLoaded && !this.audioLoadError) return;
        const audio = new Audio('sounds/incorrect.mp3');
        audio.volume = this.masterVolume;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => this._playIncorrectWithAudioContext());
        }
        audio.addEventListener('ended', () => audio.remove());
    }

    _playIncorrectWithAudioContext() {
        if (!this.audioCtxReady || !this.audioCtx) return;
        if (this.audioCtx.state === 'suspended') { this.audioCtx.resume(); return; }
        const ctx = this.audioCtx;
        const now = ctx.currentTime;
        const vol = this.masterVolume;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(95, now + 0.38);
        gain.gain.setValueAtTime(0.00001, now);
        gain.gain.exponentialRampToValueAtTime(0.16 * vol, now + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.00001, now + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.5);
    }

    playTick() {
        if (!this.audioCtxReady || !this.audioCtx) return;
        if (this.audioCtx.state === 'suspended') { this.audioCtx.resume(); return; }
        const ctx = this.audioCtx;
        const now = ctx.currentTime;
        const vol = this.masterVolume;
        
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        gain.gain.setValueAtTime(0.00001, now);
        gain.gain.exponentialRampToValueAtTime(0.3 * vol, now + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.00001, now + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
    }

    ensureAudio() { return; }
    isSoundLoaded(type) { return !!this.audioBuffers[type]; }
    getSoundLoadProgress() {
        if (this.soundsTotalCount === 0) return 1;
        return this.soundsLoadedCount / this.soundsTotalCount;
    }
}

// Inicialización
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
```

---

📋 CSS para estados nuevos de Sabiondo (Agregar a styles.css)

```css
/* Preocupación */
.buho-svg.preocupacion .ceja-left {
    transform: rotate(15deg) translateY(-5px);
}
.buho-svg.preocupacion .ceja-right {
    transform: rotate(-15deg) translateY(-5px);
}
.buho-svg.preocupacion .sudor-group {
    opacity: 1;
    animation: sudorCaer 1.5s infinite ease-in-out;
}
.buho-svg.preocupacion .pupil {
    r: 8;
    animation: pupilTemblor 0.3s infinite ease-in-out;
}
.buho-svg.preocupacion .exclamacion-group {
    opacity: 1;
    animation: exclamacionPulse 0.8s infinite ease-in-out;
}

/* Alivio */
.buho-svg.alivio .alivio-group {
    opacity: 1;
}
.buho-svg.alivio .corazon-group {
    opacity: 1;
    animation: corazonLatido 0.6s infinite ease-in-out;
}
.buho-svg.alivio .sonrojo {
    opacity: 0.6;
}
.buho-svg.alivio .pupil {
    r: 5;
}
.buho-svg.alivio {
    animation: buhoRespiro 2s infinite ease-in-out;
}

@keyframes sudorCaer {
    0% { transform: translateY(0); opacity: 1; }
    80% { transform: translateY(8px); opacity: 0.8; }
    100% { transform: translateY(12px); opacity: 0; }
}

@keyframes pupilTemblor {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-2px); }
    75% { transform: translateX(2px); }
}

@keyframes exclamacionPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
}

@keyframes corazonLatido {
    0%, 100% { transform: scale(1); }
    30% { transform: scale(1.3); }
    60% { transform: scale(0.9); }
}

@keyframes buhoRespiro {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
}
