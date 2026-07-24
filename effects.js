/**
 * Motor de Efectos Canvas para Juegos y Trivias
 * Maneja confeti, fuegos artificiales y lluvia de monedas usando requestAnimationFrame.
 */

class EffectsManager {
    constructor(canvasId = 'effects-canvas') {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error(`Canvas con id "${canvasId}" no encontrado.`);
            return;
        }
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.animating = false;

        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    startAnimation() {
        if (!this.animating) {
            this.animating = true;
            this.loop();
        }
    }

    loop() {
        if (!this.animating) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.update();
            p.draw(this.ctx);

            if (p.isDead()) {
                this.particles.splice(i, 1);
            }
        }

        if (this.particles.length > 0) {
            requestAnimationFrame(() => this.loop());
        } else {
            this.animating = false;
        }
    }

    /**
     * EFECTO 1: Confeti al acertar una respuesta
     * @param {number} x - Posición X de origen (opcional, por defecto centro)
     * @param {number} y - Posición Y de origen (opcional, por defecto centro)
     */
    triggerConfetti(x = this.canvas.width / 2, y = this.canvas.height / 3) {
        const colors = ['#A2D2FF', '#B8E9C0', '#FEF9D7', '#E63946', '#8B5CF6', '#EC4899'];
        const particleCount = 80;

        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 8 + 4;
            this.particles.push(new ConfettiParticle(
                x, y,
                Math.cos(angle) * speed,
                Math.sin(angle) * speed - 2,
                colors[Math.floor(Math.random() * colors.length)]
            ));
        }
        this.startAnimation();
    }

    /**
     * EFECTO 2: Fuegos artificiales al subir de nivel o ganar
     */
    triggerFireworks() {
        const bursts = 5;
        for (let b = 0; b < bursts; b++) {
            setTimeout(() => {
                const x = Math.random() * (this.canvas.width * 0.8) + this.canvas.width * 0.1;
                const y = Math.random() * (this.canvas.height * 0.4) + this.canvas.height * 0.1;
                const colors = ['#FFD700', '#FF4500', '#00E5FF', '#76FF03', '#E040FB'];
                const color = colors[Math.floor(Math.random() * colors.length)];

                for (let i = 0; i < 60; i++) {
                    const angle = (Math.PI * 2 / 60) * i;
                    const speed = Math.random() * 6 + 2;
                    this.particles.push(new FireworkParticle(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed, color));
                }
                this.startAnimation();
            }, b * 300);
        }
    }

    /**
     * EFECTO 3: Lluvia de monedas para rachas o bonificaciones
     */
    triggerCoinRain() {
        const coinCount = 35;
        for (let i = 0; i < coinCount; i++) {
            const x = Math.random() * this.canvas.width;
            const y = -20 - (Math.random() * 200);
            const speedY = Math.random() * 5 + 4;
            this.particles.push(new CoinParticle(x, y, speedY));
        }
        this.startAnimation();
    }
}

/* ==========================================
   CLASES INDIVIDUALES DE PARTÍCULAS
   ========================================== */

// Partícula de Confeti
class ConfettiParticle {
    constructor(x, y, vx, vy, color) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.size = Math.random() * 8 + 6;
        this.color = color;
        this.gravity = 0.25;
        this.drag = 0.98;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 10;
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.008;
    }

    update() {
        this.vx *= this.drag;
        this.vy *= this.drag;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;
        this.alpha -= this.decay;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size / 2);
        ctx.restore();
    }

    isDead() {
        return this.alpha <= 0 || this.y > window.innerHeight;
    }
}

// Partícula de Fuego Artificial
class FireworkParticle {
    constructor(x, y, vx, vy, color) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.gravity = 0.1;
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.015;
    }

    update() {
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
    }

    isDead() {
        return this.alpha <= 0;
    }
}

// Partícula de Moneda
class CoinParticle {
    constructor(x, y, vy) {
        this.x = x;
        this.y = y;
        this.vy = vy;
        this.radius = 9;
        this.scaleX = 1;
        this.flipSpeed = Math.random() * 0.15 + 0.08;
        this.alpha = 1;
    }

    update() {
        this.y += this.vy;
        this.scaleX = Math.cos(this.y * this.flipSpeed);
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.scaleX, 1);

        // Borde exterior
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#F59E0B';
        ctx.fill();

        // Centro brillante
        ctx.beginPath();
        ctx.arc(0, 0, this.radius * 0.65, 0, Math.PI * 2);
        ctx.fillStyle = '#FEF08A';
        ctx.fill();

        ctx.restore();
    }

    isDead() {
        return this.y > window.innerHeight + 30;
    }
}

// Inicialización global opcional
const effects = new EffectsManager('effects-canvas');
