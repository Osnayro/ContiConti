/**
 * Conti Conti - Motor de Efectos Visuales (VFX) y Sonido (SFX)
 * Desarrollado para optimizar el Game Feel en Canvas 2D
 */

class ContiEffectsManager {
    constructor() {
        this.canvas = document.getElementById('effects-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.animationFrameId = null;

        // Banco de sonidos predefinidos con enlaces estables externos (Mixkit)
        this.sfxUrls = {
            'sfx-coin-drop': 'https://assets.mixkit.co/active_storage/sfx/2019/2019-84.wav',
            'sfx-woosh-loss': 'https://assets.mixkit.co/active_storage/sfx/2568/2568-84.wav',
            'sfx-success-balance': 'https://assets.mixkit.co/active_storage/sfx/1435/1435-84.wav',
            'sfx-danger-heart': 'https://assets.mixkit.co/active_storage/sfx/957/957-84.wav',
            'sfx-cash-register': 'https://assets.mixkit.co/active_storage/sfx/2019/2019-84.wav' // Sonido alternativo estable
        };

        // Cache de instancias de Audio
        this.audioCache = {};
        this.initAudioCache();
        
        // Habilitar el desbloqueo automático para iPhone/iOS
        this.setupIOSAudioUnlock();
        
        // Inicializar dimensiones y listeners
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Iniciar el bucle de renderizado
        this.loop();
    }

    /**
     * Precarga las instancias de audio con las nuevas URLs estables
     */
    initAudioCache() {
        Object.keys(this.sfxUrls).forEach(id => {
            this.audioCache[id] = new Audio(this.sfxUrls[id]);
            this.audioCache[id].preload = 'auto';
        });
    }

    /**
     * Escucha las interacciones iniciales del usuario para despertar el motor de audio en iOS/iPhone
     */
    setupIOSAudioUnlock() {
        const unlock = () => {
            // Reproducir un micro-silencio nativo para validar los permisos del navegador
            const silentSound = new Audio();
            silentSound.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==';
            silentSound.play().then(() => {
                console.log("Audio desbloqueado con éxito para iPhone/iOS.");
                
                // Forzar precarga inicial en caliente de los efectos reales
                Object.values(this.audioCache).forEach(audio => {
                    audio.load();
                });

                // Remover los listeners inmediatamente
                window.removeEventListener('click', unlock);
                window.removeEventListener('touchstart', unlock);
            }).catch(err => {
                console.warn("Esperando interacción interactiva explícita para el audio.", err);
            });
        };

        window.addEventListener('click', unlock);
        window.addEventListener('touchstart', unlock);
    }

    /**
     * Ajusta el tamaño del canvas al de la ventana del dispositivo
     */
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    /**
     * Reproduce un sonido desde la caché en la nube con variación aleatoria de tono (Pitch)
     * @param {string} id - ID del audio asignado en la caché
     */
    playSFX(id) {
        const baseAudio = this.audioCache[id];
        if (!baseAudio) return;

        // Clonar el nodo dinámicamente para soportar polifonía (superposición de sonidos)
        const soundClone = baseAudio.cloneNode();
        
        // Pitch Randomization: Variación sutil entre 0.9 y 1.15 para mayor dinamismo
        const randomPitch = 0.9 + Math.random() * 0.25;
        soundClone.playbackRate = randomPitch;
        
        soundClone.play().catch(err => {
            console.log("Audio bloqueado temporalmente por políticas del navegador:", err.message);
        });
    }

    /**
     * Dispara una ráfaga de monedas desde una posición hacia el marcador de puntos
     * @param {number} startX - Coordenada X de origen
     * @param {number} startY - Coordenada Y de origen
     * @param {number} count - Cantidad de monedas a generar
     */
    triggerCoinExplosion(startX, startY, count = 12) {
        const scoreBadge = document.getElementById('score-badge');
        if (!scoreBadge) return;

        const rect = scoreBadge.getBoundingClientRect();
        const targetX = rect.left + rect.width / 2;
        const targetY = rect.top + rect.height / 2;

        for (let i = 0; i < count; i++) {
            setTimeout(() => {
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
            }, i * 60);
        }
        
        setTimeout(() => this.playSFX('sfx-cash-register'), count * 45);
    }

    /**
     * Bucle principal de física y dibujo (60 FPS)
     */
    loop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = this.particles.length - 1; i >= 0; i--) {
            let p = this.particles[i];
            p.life++;

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

            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rotation);
            
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

            this.ctx.restore();

            const dist = Math.hypot(p.targetX - p.x, p.targetY - p.y);
            if (dist < 15) {
                this.particles.splice(i, 1);
                
                const scoreBadge = document.getElementById('score-badge');
                if (scoreBadge) {
                    scoreBadge.classList.remove('pop-anim');
                    void scoreBadge.offsetWidth; 
                    scoreBadge.classList.add('pop-anim');
                }
            }
        }

        this.animationFrameId = requestAnimationFrame(() => this.loop());
    }
}

// Inicializar globalmente para que app.js pueda invocarlo
window.effectsManager = new ContiEffectsManager();
