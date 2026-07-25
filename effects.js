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
        
        // Inicializar dimensiones y listeners
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Iniciar el bucle de renderizado
        this.loop();
    }

    /**
     * Ajusta el tamaño del canvas al de la ventana del dispositivo
     */
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    /**
     * Reproduce un sonido del banco con variación aleatoria de tono (Pitch)
     * @param {string} id - ID del elemento HTMLAudio
     */
    playSFX(id) {
        const audio = document.getElementById(id);
        if (!audio) return;

        // Clonar el nodo permite superponer el mismo sonido sin cortar el anterior
        const soundClone = audio.cloneNode();
        
        // Pitch Randomization: Variación sutil entre 0.9 y 1.15
        const randomPitch = 0.9 + Math.random() * 0.25;
        soundClone.playbackRate = randomPitch;
        
        soundClone.play().catch(err => {
            // Manejar bloqueo de autoplay del navegador si el usuario no ha interactuado
            console.log("Audio esperando interacción del usuario.");
        });
    }

    /**
     * Dispara una ráfaga de monedas desde una posición hacia el marcador de puntos
     * @param {number} startX - Coordenada X de origen (ej. el botón presionado)
     * @param {number} startY - Coordenada Y de origen
     * @param {number} count - Cantidad de monedas a generar
     */
    triggerCoinExplosion(startX, startY, count = 12) {
        const scoreBadge = document.getElementById('score-badge');
        if (!scoreBadge) return;

        // Obtener la posición exacta en pantalla del marcador de puntos (destino)
        const rect = scoreBadge.getBoundingClientRect();
        const targetX = rect.left + rect.width / 2;
        const targetY = rect.top + rect.height / 2;

        for (let i = 0; i < count; i++) {
            // Retraso escalonado para que las monedas no salgan todas al mismo milisegundo
            setTimeout(() => {
                this.particles.push({
                    x: startX,
                    y: startY,
                    vx: (Math.random() - 0.5) * 8,       // Velocidad horizontal inicial
                    vy: -Math.random() * 10 - 5,        // Impulso vertical inicial (hacia arriba)
                    radius: Math.random() * 3 + 7,       // Tamaño de la moneda
                    gravity: 0.4,
                    targetX: targetX,
                    targetY: targetY,
                    speed: 0.08,                        // Factor de atracción magnética
                    isAttracted: false,                 // Cambia a true tras perder el impulso inicial
                    life: 0,
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.3
                });

                // Reproducir el sonido metálico de la moneda individual
                this.playSFX('sfx-coin-drop');
            }, i * 60); // 60ms entre cada moneda
        }
        
        // Hacia el final de la ráfaga, suena la caja registradora
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
                // Fase 1: Movimiento parabólico natural (Física de gravedad)
                p.x += p.vx;
                p.y += p.vy;
                p.vy += p.gravity;
                p.rotation += p.rotationSpeed;

                // Cuando empieza a caer, se activa el magnetismo hacia el marcador
                if (p.vy > 1 || p.life > 40) {
                    p.isAttracted = true;
                }
            } else {
                // Fase 2: Magnetismo. Interpolación lineal hacia el objetivo del marcador
                p.x += (p.targetX - p.x) * p.speed;
                p.y += (p.targetY - p.y) * p.speed;
                p.rotation += 0.2; // Gira más rápido al ser atraída
                
                // Hacerse ligeramente más pequeña al acercarse al marcador
                if (p.radius > 3) p.radius -= 0.1;
            }

            // Dibujar la moneda estilo Cartoon/Didáctico
            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rotation);
            
            // Cuerpo de la moneda (Círculo Dorado)
            this.ctx.beginPath();
            this.ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = '#FFD700'; // Oro brillante
            this.ctx.shadowBlur = 8;
            this.ctx.shadowColor = '#FFA500';
            this.ctx.fill();
            
            // Borde interno para relieve visual
            this.ctx.beginPath();
            this.ctx.arc(0, 0, p.radius * 0.7, 0, Math.PI * 2);
            this.ctx.strokeStyle = '#B8860B';
            this.ctx.lineWidth = 1.5;
            this.ctx.stroke();

            // Símbolo de moneda simplificado ($ o barra interior)
            this.ctx.fillStyle = '#B8860B';
            this.ctx.font = `bold ${p.radius * 1.1}px Arial`;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText('$', 0, 0);

            this.ctx.restore();

            // Condición de destrucción: llegó al objetivo
            const dist = Math.hypot(p.targetX - p.x, p.targetY - p.y);
            if (dist < 15) {
                this.particles.splice(i, 1);
                
                // Hacer un sutil efecto de pulsación visual en el marcador HTML real
                const scoreBadge = document.getElementById('score-badge');
                if (scoreBadge) {
                    scoreBadge.classList.remove('pop-anim');
                    void scoreBadge.offsetWidth; // Truco CSS para reiniciar animación
                    scoreBadge.classList.add('pop-anim');
                }
            }
        }

        this.animationFrameId = requestAnimationFrame(() => this.loop());
    }
}

// Inicializar globalmente para que app.js pueda invocarlo
window.effectsManager = new ContiEffectsManager();
