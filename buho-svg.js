
/**
 * ============================================================
 * PAES Challenge — Sabiondo el Búho SVG v1.2.0
 * Personaje animado con estados emocionales completos
 * Para "PAES Challenge: Desafío de Admisión Universitaria"
 * ============================================================
 *
 * Estados soportados:
 *   thinking, correct, incorrect, nervous, bored,
 *   preocupacion, alivio, impressed, celebrating,
 *   deep-think, confident, frozen, determined, graduate
 */

function injectBuhoSVGs() {
    const containers = document.querySelectorAll('.buho-svg-container');
    
    containers.forEach(container => {
        // Limpiar contenedor para evitar duplicados
        container.innerHTML = '';
        
        // Crear elemento SVG principal
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 200 240');
        svg.setAttribute('width', '140');
        svg.setAttribute('height', '165');
        svg.setAttribute('class', 'buho-svg');
        svg.setAttribute('aria-label', 'Sabiondo el Búho');
        svg.setAttribute('role', 'img');
        svg.style.overflow = 'visible';
        
        svg.innerHTML = `
            <!-- ============================================================ -->
            <!-- BIRRETE UNIVERSITARIO -->
            <!-- ============================================================ -->
            <g class="birrete-group">
                <!-- Base del birrete -->
                <polygon points="55,50 145,50 155,60 45,60" fill="#2D3748" stroke="#1A202C" stroke-width="2"/>
                <!-- Borde dorado -->
                <line x1="55" y1="50" x2="145" y2="50" stroke="#FFD700" stroke-width="2.5"/>
                <!-- Borla colgante -->
                <line x1="150" y1="60" x2="168" y2="82" stroke="#FFD700" stroke-width="3" stroke-linecap="round"/>
                <circle cx="168" cy="85" r="6" fill="#FFD700" class="borla"/>
            </g>
            
            <!-- ============================================================ -->
            <!-- CABEZA -->
            <!-- ============================================================ -->
            <ellipse cx="100" cy="108" rx="50" ry="44" fill="#1E3A63" stroke="#15294A" stroke-width="2"/>
            
            <!-- Plumas / Orejas izquierda -->
            <g class="ear-base ear-base-left">
                <polygon points="58,72 35,38 73,64" fill="#1E3A63" stroke="#15294A" stroke-width="2"/>
                <polygon points="55,68 40,45 68,62" fill="#93C5FD" class="pluma-inner"/>
            </g>
            
            <!-- Plumas / Orejas derecha -->
            <g class="ear-base ear-base-right">
                <polygon points="142,72 165,38 127,64" fill="#1E3A63" stroke="#15294A" stroke-width="2"/>
                <polygon points="145,68 160,45 132,62" fill="#93C5FD" class="pluma-inner"/>
            </g>
            
            <!-- Ojos (círculos blancos) -->
            <circle cx="80" cy="102" r="20" fill="white" stroke="#15294A" stroke-width="2"/>
            <circle cx="120" cy="102" r="20" fill="white" stroke="#15294A" stroke-width="2"/>
            
            <!-- Iris (amarillos) -->
            <circle cx="80" cy="102" r="13" fill="#F59E0B" class="iris"/>
            <circle cx="120" cy="102" r="13" fill="#F59E0B" class="iris"/>
            
            <!-- Pupilas -->
            <circle cx="80" cy="102" r="6" fill="#1A202C" class="pupil pupil-left"/>
            <circle cx="120" cy="102" r="6" fill="#1A202C" class="pupil pupil-right"/>
            
            <!-- Brillo ocular -->
            <circle cx="76" cy="98" r="3" fill="white"/>
            <circle cx="116" cy="98" r="3" fill="white"/>
            
            <!-- Cejas / Plumas de expresión -->
            <path d="M60,86 Q80,76 100,86" fill="none" stroke="#15294A" stroke-width="3.5" stroke-linecap="round" class="ceja-left"/>
            <path d="M100,86 Q120,76 140,86" fill="none" stroke="#15294A" stroke-width="3.5" stroke-linecap="round" class="ceja-right"/>
            
            <!-- Sonrojo (mejillas) - Visible en estado alivio -->
            <circle cx="62" cy="115" r="7" fill="#FCA5A5" opacity="0" class="sonrojo sonrojo-left"/>
            <circle cx="138" cy="115" r="7" fill="#FCA5A5" opacity="0" class="sonrojo sonrojo-right"/>
            
            <!-- Pico -->
            <polygon points="94,108 100,122 106,108" fill="#F59E0B" stroke="#D97706" stroke-width="1.5" class="pico"/>
            
            <!-- ============================================================ -->
            <!-- ELEMENTOS DE PREOCUPACIÓN -->
            <!-- ============================================================ -->
            
            <!-- Gota de sudor -->
            <g class="sudor-group" opacity="0">
                <path d="M155,75 Q155,68 158,62 Q161,68 161,75 Q161,80 158,82 Q155,80 155,75Z" 
                      fill="#60A5FA" stroke="#3B82F6" stroke-width="1"/>
            </g>
            
            <!-- Signo de exclamación -->
            <g class="exclamacion-group" opacity="0">
                <circle cx="145" cy="48" r="10" fill="#F59E0B" stroke="#D97706" stroke-width="1.5"/>
                <text x="145" y="53" text-anchor="middle" font-size="14" font-weight="bold" fill="white">!</text>
            </g>
            
            <!-- ============================================================ -->
            <!-- ELEMENTOS DE ALIVIO -->
            <!-- ============================================================ -->
            
            <!-- Líneas de alivio -->
            <g class="alivio-group" opacity="0">
                <line x1="160" y1="75" x2="170" y2="65" stroke="#10B981" stroke-width="2.5" stroke-linecap="round"/>
                <line x1="165" y1="78" x2="175" y2="72" stroke="#10B981" stroke-width="2" stroke-linecap="round"/>
            </g>
            
            <!-- Corazón latiente -->
            <g class="corazon-group" opacity="0" style="transform-origin: 172px 60px;">
                <path d="M165,55 Q165,45 172,45 Q179,45 179,55 Q179,65 172,72 Q165,65 165,55Z" 
                      fill="#EF4444" stroke="#DC2626" stroke-width="1"/>
            </g>
            
            <!-- ============================================================ -->
            <!-- CUERPO -->
            <!-- ============================================================ -->
            <ellipse cx="100" cy="168" rx="60" ry="55" fill="#1E3A63" stroke="#15294A" stroke-width="2"/>
            
            <!-- Pecho (más claro) -->
            <ellipse cx="100" cy="168" rx="35" ry="38" fill="#EFF6FF" stroke="#DBEAFE" stroke-width="2"/>
            
            <!-- Alas con pivotes de transformación -->
            <g class="ala-left" style="transform-origin: 47px 155px;">
                <path d="M43,145 Q22,168 35,190 Q48,185 47,155" fill="#15294A" stroke="#0F1D3A" stroke-width="1.5"/>
            </g>
            <g class="ala-right" style="transform-origin: 153px 155px;">
                <path d="M157,145 Q178,168 165,190 Q152,185 153,155" fill="#15294A" stroke="#0F1D3A" stroke-width="1.5"/>
            </g>
            
            <!-- Libro entre las alas -->
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
            
            <!-- ============================================================ -->
            <!-- ELEMENTOS DECORATIVOS -->
            <!-- ============================================================ -->
            
            <!-- Estrellas de conocimiento (visibles en estados positivos) -->
            <g class="estrellas-group" opacity="0">
                <text x="20" y="40" font-size="20" class="estrella-1">✨</text>
                <text x="160" y="35" font-size="16" class="estrella-2">⭐</text>
                <text x="175" y="145" font-size="14" class="estrella-3">💫</text>
                <text x="15" y="140" font-size="12" class="estrella-4">🌟</text>
                <text x="25" y="200" font-size="10" class="estrella-5">📚</text>
                <text x="165" y="200" font-size="10" class="estrella-6">🎓</text>
            </g>
            
            <!-- Lupa (visible en estado thinking y deep-think) -->
            <g class="lupa-group" opacity="0" style="transform-origin: 170px 130px;">
                <circle cx="170" cy="130" r="16" fill="rgba(255,255,255,0.15)" stroke="#FFD700" stroke-width="3"/>
                <line x1="158" y1="142" x2="146" y2="158" stroke="#FFD700" stroke-width="4.5" stroke-linecap="round"/>
            </g>
        `;
        
        container.appendChild(svg);
    });
}

// ================================================================
// INICIALIZACIÓN
// ================================================================

// Inyectar en carga inicial del DOM
document.addEventListener('DOMContentLoaded', () => {
    injectBuhoSVGs();
});

// Re-inyectar al cambiar de pantalla (interceptor no invasivo)
const originalShowScreen = window.showScreen;
if (originalShowScreen) {
    window.showScreen = function(screenId) {
        originalShowScreen(screenId);
        // Delay adaptativo para garantizar que el DOM se haya renderizado
        setTimeout(injectBuhoSVGs, 100);
    };
}

console.log('🦉 Sabiondo SVG v1.2.0 cargado — 14 estados emocionales listos');
