
/**
 * ============================================================
 * PAES Challenge Engine v1.0.0 — Producción
 * Lógica del juego, control de estado y flujos de preguntas
 * Para "PAES Challenge: Desafío de Admisión Universitaria"
 * Basado en ContiGame Engine v3.5.0
 * ============================================================
 *
 * Cambios v1.0.0 sobre ContiGame v3.5.0:
 *   - NUEVO: Banco de preguntas PAES (M1, M2, Competencia Lectora)
 *   - NUEVO: 97 preguntas alineadas a temarios DEMRE 2025-2026
 *   - CAMBIO: Niveles renombrados a áreas PAES
 *   - CAMBIO: Textos del personaje adaptados a contexto universitario
 *   - CAMBIO: Pantalla final reenfocada a admisión universitaria
 */

// ===== ESTADO GLOBAL =====
const state = {
    score: 0,
    levelScore: 0,
    lives: 3,
    streak: 0,
    maxStreak: 0,
    currentQuestion: 0,
    totalQuestions: 10,
    currentLevel: 1,
    mode: 'normal',
    timer: 30,
    timerInterval: null,
    _boredTimeout: null,
    _freezeTimeout: null,
    isFrozen: false,
    questions: [],
    answeredCorrectly: {},
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
        survivor: false,
        streaker: false,
        paesPro: false,
        noPowerups: false
    },
    topicScores: {},
    unlockedLevels: {
        1: true,
        2: false,
        3: false,
        4: false
    }
};

// ===== BANCO DE PREGUNTAS PAES =====

// ============================================================
// PAES COMPETENCIA MATEMÁTICA 1 (M1)
// Ejes: Números / Álgebra y Funciones / Geometría / Probabilidad y Estadística
// ============================================================

const paesM1Questions = [
    {
        id: 1001, topic: 'numeros', type: 'multiple',
        question: 'Si el 40% de un número es igual a 120, ¿cuál es el 75% de ese mismo número?',
        options: ['180', '200', '225', '250'],
        correct: 2,
        explanation: 'Si 40% = 120, entonces el número total es 120 / 0,40 = 300. El 75% de 300 es 300 × 0,75 = 225.',
        hint: 'Primero encuentra el valor total a partir del porcentaje parcial dado.',
        points: 100
    },
    {
        id: 1002, topic: 'numeros', type: 'multiple',
        question: 'Un comerciante aumenta el precio de un producto en un 25% y luego, durante una liquidación, aplica un descuento del 20% sobre el precio aumentado. ¿Qué ocurre con el precio final respecto al original?',
        options: ['Aumenta un 5%', 'Disminuye un 5%', 'Permanece igual', 'Disminuye un 2,5%'],
        correct: 2,
        explanation: 'Si el precio original es P, después del aumento: 1,25P. Con el 20% de descuento: 1,25P × 0,80 = P. El precio vuelve al valor original.',
        hint: 'Usa una variable para el precio original y aplica los porcentajes sucesivamente.',
        points: 100
    },
    {
        id: 1003, topic: 'numeros', type: 'multiple',
        question: '¿Cuál es el resultado de (√27 × √3) / √81?',
        options: ['1', '√3', '3', '9'],
        correct: 0,
        explanation: '√27 × √3 = √81 = 9. Luego 9 / √81 = 9 / 9 = 1.',
        hint: 'Recuerda que √a × √b = √(a×b) y simplifica paso a paso.',
        points: 100
    },
    {
        id: 1004, topic: 'numeros', type: 'multiple',
        question: 'En una encuesta, 3/8 de los estudiantes prefiere matemáticas, 1/4 prefiere lenguaje y el resto prefiere ciencias. Si hay 240 estudiantes encuestados, ¿cuántos prefieren ciencias?',
        options: ['60', '75', '90', '105'],
        correct: 2,
        explanation: '3/8 + 1/4 = 3/8 + 2/8 = 5/8 prefieren matemáticas o lenguaje. El resto es 3/8. 3/8 de 240 = (240 ÷ 8) × 3 = 90.',
        hint: 'Suma las fracciones conocidas y resta del total para encontrar la fracción restante.',
        points: 100
    },
    {
        id: 1005, topic: 'algebra', type: 'multiple',
        question: 'Si f(x) = 2x + 3 y g(x) = x² - 1, ¿cuál es el valor de f(g(2))?',
        options: ['7', '9', '11', '13'],
        correct: 1,
        explanation: 'Primero g(2) = 2² - 1 = 3. Luego f(3) = 2(3) + 3 = 9.',
        hint: 'Evalúa primero la función interna y usa ese resultado en la función externa.',
        points: 100
    },
    {
        id: 1006, topic: 'algebra', type: 'multiple',
        question: 'Un rectángulo tiene un perímetro de 36 cm. Si el largo es el doble del ancho, ¿cuál es el valor del ancho?',
        options: ['6 cm', '9 cm', '12 cm', '18 cm'],
        correct: 0,
        explanation: 'Sea a el ancho. El largo es 2a. Perímetro = 2(a + 2a) = 6a = 36. Por tanto, a = 6 cm.',
        hint: 'Plantea una ecuación usando la fórmula del perímetro del rectángulo.',
        points: 100
    },
    {
        id: 1007, topic: 'algebra', type: 'multiple',
        question: 'La suma de dos números es 45 y su diferencia es 15. ¿Cuál es el producto de ambos números?',
        options: ['400', '450', '500', '550'],
        correct: 1,
        explanation: 'Sistema: x + y = 45; x - y = 15. Sumando: 2x = 60 → x = 30. Reemplazando: y = 15. Producto: 30 × 15 = 450.',
        hint: 'Plantea un sistema de ecuaciones 2×2 y resuélvelo por reducción o sustitución.',
        points: 100
    },
    {
        id: 1008, topic: 'algebra', type: 'multiple',
        question: '¿Cuál de las siguientes funciones representa una proporcionalidad inversa?',
        options: ['f(x) = 3x', 'f(x) = 3/x', 'f(x) = x + 3', 'f(x) = x²/3'],
        correct: 1,
        explanation: 'La proporcionalidad inversa tiene la forma f(x) = k/x, donde k es constante.',
        hint: 'Recuerda que en proporcionalidad inversa, al aumentar una variable la otra disminuye de forma proporcional.',
        points: 100
    },
    {
        id: 1009, topic: 'algebra', type: 'multiple',
        question: 'Una empresa de taxis cobra una tarifa fija de $500 más $200 por cada kilómetro recorrido. ¿Qué función representa el costo total C en función de los kilómetros x?',
        options: ['C(x) = 200x', 'C(x) = 500x + 200', 'C(x) = 200x + 500', 'C(x) = 700x'],
        correct: 2,
        explanation: 'La función afín tiene forma C(x) = mx + b, donde m = 200 (variable) y b = 500 (fijo).',
        hint: 'Identifica la parte fija (ordenada al origen) y la parte variable (pendiente).',
        points: 100
    },
    {
        id: 1010, topic: 'algebra', type: 'multiple',
        question: 'La función cuadrática f(x) = x² - 6x + 8 tiene ceros en x = 2 y x = 4. ¿Cuál es la coordenada x del vértice de su parábola?',
        options: ['1', '2', '3', '6'],
        correct: 2,
        explanation: 'En una parábola, el vértice está en el punto medio de los ceros: (2 + 4) / 2 = 3. También x_v = -b/(2a) = 6/2 = 3.',
        hint: 'El vértice de una parábola se encuentra en el eje de simetría, que es el promedio de las raíces.',
        points: 100
    },
    {
        id: 1011, topic: 'geometria', type: 'multiple',
        question: 'Un triángulo rectángulo tiene catetos de 6 cm y 8 cm. ¿Cuál es la longitud de su hipotenusa?',
        options: ['10 cm', '12 cm', '14 cm', '100 cm'],
        correct: 0,
        explanation: 'Por Teorema de Pitágoras: h² = 6² + 8² = 36 + 64 = 100. h = √100 = 10 cm.',
        hint: 'Aplica el Teorema de Pitágoras: hipotenusa² = cateto₁² + cateto₂².',
        points: 100
    },
    {
        id: 1012, topic: 'geometria', type: 'multiple',
        question: 'Un cilindro tiene radio de la base 3 cm y altura 10 cm. ¿Cuál es su volumen? (Usa π = 3)',
        options: ['90 cm³', '180 cm³', '270 cm³', '300 cm³'],
        correct: 2,
        explanation: 'Volumen cilindro = π × r² × h = 3 × 9 × 10 = 270 cm³.',
        hint: 'Recuerda la fórmula del volumen de un cilindro: área de la base × altura.',
        points: 100
    },
    {
        id: 1013, topic: 'geometria', type: 'multiple',
        question: 'Un trapecio tiene bases de 8 cm y 14 cm, y una altura de 5 cm. ¿Cuál es su área?',
        options: ['55 cm²', '110 cm²', '22 cm²', '44 cm²'],
        correct: 0,
        explanation: 'Área trapecio = (base mayor + base menor) × altura / 2 = (14 + 8) × 5 / 2 = 22 × 5 / 2 = 55 cm².',
        hint: 'Usa la fórmula del área del trapecio: promedio de las bases multiplicado por la altura.',
        points: 100
    },
    {
        id: 1014, topic: 'geometria', type: 'multiple',
        question: 'Al aplicar una traslación de vector (3, -2) al punto A(1, 4), ¿cuáles son las coordenadas del punto imagen A\'?',
        options: ['(4, 2)', '(4, 6)', '(-2, 6)', '(2, 4)'],
        correct: 0,
        explanation: 'Traslación: (x, y) → (x+3, y-2). A\' = (1+3, 4-2) = (4, 2).',
        hint: 'Suma las componentes del vector a las coordenadas originales del punto.',
        points: 100
    },
    {
        id: 1015, topic: 'probabilidad', type: 'multiple',
        question: 'En una clase de 30 estudiantes, 18 son mujeres. Si se elige un estudiante al azar, ¿cuál es la probabilidad de que sea hombre?',
        options: ['0,3', '0,4', '0,5', '0,6'],
        correct: 1,
        explanation: 'Hombres = 30 - 18 = 12. Probabilidad = 12/30 = 0,4.',
        hint: 'Calcula la cantidad de hombres y divídela por el total de estudiantes.',
        points: 100
    },
    {
        id: 1016, topic: 'estadistica', type: 'multiple',
        question: 'Los siguientes datos representan edades: 18, 20, 22, 24, 26. ¿Cuál es el promedio?',
        options: ['20', '21', '22', '23'],
        correct: 2,
        explanation: 'Promedio = (18 + 20 + 22 + 24 + 26) ÷ 5 = 110 ÷ 5 = 22.',
        hint: 'Suma todos los valores y divide por la cantidad de datos.',
        points: 100
    },
    {
        id: 1017, topic: 'estadistica', type: 'multiple',
        question: 'En un diagrama de cajón, Q1 = 12, Q2 = 18 y Q3 = 28. ¿Cuál es el rango intercuartílico (RIC)?',
        options: ['6', '10', '16', '46'],
        correct: 2,
        explanation: 'RIC = Q3 - Q1 = 28 - 12 = 16.',
        hint: 'Resta el primer cuartil del tercer cuartil.',
        points: 100
    },
    {
        id: 1018, topic: 'probabilidad', type: 'multiple',
        question: 'Se lanza un dado justo de seis caras. ¿Cuál es la probabilidad de obtener un número mayor que 4?',
        options: ['1/6', '1/3', '1/2', '2/3'],
        correct: 1,
        explanation: 'Números mayores que 4: 5 y 6. Probabilidad = 2/6 = 1/3.',
        hint: 'Identifica los casos favorables y divídelos por el total de casos posibles.',
        points: 100
    },
    {
        id: 1019, topic: 'probabilidad', type: 'multiple',
        question: 'En una urna hay 5 bolas rojas y 3 bolas azules. Si se extraen dos bolas consecutivamente sin reemplazo, ¿cuál es la probabilidad de que ambas sean rojas?',
        options: ['5/14', '25/64', '5/8', '2/5'],
        correct: 0,
        explanation: 'Primera roja: 5/8. Segunda roja (sin reemplazo): 4/7. Probabilidad conjunta = (5/8) × (4/7) = 20/56 = 5/14.',
        hint: 'Aplica la regla multiplicativa de probabilidades, considerando que la segunda extracción es sin reemplazo.',
        points: 150
    },
    {
        id: 1020, topic: 'estadistica', type: 'multiple',
        question: 'La siguiente tabla muestra la frecuencia de notas obtenidas por 40 estudiantes:\nNota | 3 | 4 | 5 | 6 | 7\nFrecuencia | 6 | 14 | 10 | 8 | 2\n\n¿Qué porcentaje obtuvo nota 5 o 6?',
        options: ['20%', '30%', '45%', '50%'],
        correct: 2,
        explanation: 'Estudiantes con nota 5 o 6: 10 + 8 = 18. Porcentaje = (18/40) × 100 = 45%.',
        hint: 'Suma las frecuencias de las notas 5 y 6, divide por el total y multiplica por 100.',
        points: 100
    },
    {
        id: 1021, topic: 'numeros', type: 'multiple',
        question: 'En una receta de cocina, la razón entre tazas de harina y tazas de azúcar es 3:2. Si se usan 9 tazas de harina, ¿cuántas tazas de azúcar se necesitan?',
        options: ['4', '5', '6', '7'],
        correct: 2,
        explanation: 'Razón harina:azúcar = 3:2. Si harina = 9 (3×3), entonces azúcar = 2×3 = 6 tazas.',
        hint: 'Plantea una proporción: 3/2 = 9/x.',
        points: 100
    },
    {
        id: 1022, topic: 'numeros', type: 'multiple',
        question: 'Un mapa tiene una escala de 1:50.000. Si la distancia entre dos ciudades en el mapa es de 8 cm, ¿cuál es la distancia real en kilómetros?',
        options: ['2 km', '3 km', '4 km', '5 km'],
        correct: 2,
        explanation: 'Distancia real = 8 cm × 50.000 = 400.000 cm = 4.000 m = 4 km.',
        hint: 'Convierte de centímetros a kilómetros: divide por 100.000.',
        points: 100
    },
    {
        id: 1023, topic: 'numeros', type: 'multiple',
        question: 'Tres números son directamente proporcionales a 2, 3 y 5. Si el menor de ellos es 14, ¿cuál es el mayor?',
        options: ['21', '28', '35', '42'],
        correct: 2,
        explanation: 'Si k es la constante: 2k = 14 → k = 7. El mayor es 5k = 35.',
        hint: 'Encuentra la constante de proporcionalidad usando el valor del número menor.',
        points: 150
    },
    {
        id: 1024, topic: 'algebra', type: 'multiple',
        question: 'La trayectoria de un proyectil está modelada por f(x) = -x² + 6x + 16, donde x es el tiempo en segundos. ¿Cuál es la altura máxima alcanzada?',
        options: ['20', '25', '28', '30'],
        correct: 1,
        explanation: 'Vértice en x = -b/(2a) = -6/(2×(-1)) = 3. Altura máxima: f(3) = -(3)² + 6(3) + 16 = -9 + 18 + 16 = 25.',
        hint: 'Encuentra la coordenada x del vértice y evalúa la función en ese punto.',
        points: 150
    },
    {
        id: 1025, topic: 'algebra', type: 'multiple',
        question: 'Si 3(x - 2) + 5 = 2(x + 1) - 4, ¿cuál es el valor de x?',
        options: ['-3', '-1', '1', '3'],
        correct: 1,
        explanation: '3x - 6 + 5 = 2x + 2 - 4 → 3x - 1 = 2x - 2 → x = -1.',
        hint: 'Desarrolla los paréntesis, agrupa términos semejantes y despeja la incógnita.',
        points: 100
    },
    {
        id: 1026, topic: 'geometria', type: 'multiple',
        question: 'El punto P(3, -2) se refleja respecto al eje Y. ¿Cuáles son las coordenadas del punto imagen?',
        options: ['(-3, -2)', '(3, 2)', '(-3, 2)', '(-2, 3)'],
        correct: 0,
        explanation: 'Al reflejar respecto al eje Y, la coordenada x cambia de signo: (x, y) → (-x, y). P\' = (-3, -2).',
        hint: 'Una reflexión respecto al eje Y invierte el signo de la coordenada x.',
        points: 100
    },
    {
        id: 1027, topic: 'geometria', type: 'multiple',
        question: 'Un triángulo ABC tiene vértices A(1, 2), B(3, 2) y C(2, 5). Si se le aplica una rotación de 90° antihorario respecto al origen, ¿cuál es la nueva coordenada del vértice A?',
        options: ['(2, -1)', '(-2, 1)', '(2, 1)', '(-1, 2)'],
        correct: 1,
        explanation: 'Rotación de 90° antihorario: (x, y) → (-y, x). A\' = (-2, 1).',
        hint: 'Aplica la regla de rotación: intercambia coordenadas y cambia el signo de la primera.',
        points: 150
    },
    {
        id: 1028, topic: 'geometria', type: 'multiple',
        question: 'Una figura se amplía mediante una homotecia de centro en el origen y razón k = 3. Si un punto original P(2, -1) pertenece a la figura, ¿cuáles son sus coordenadas en la figura ampliada?',
        options: ['(6, -3)', '(3, -1)', '(5, -2)', '(6, -1)'],
        correct: 0,
        explanation: 'Homotecia con centro (0,0) y razón k: (x, y) → (kx, ky). P\' = (3×2, 3×(-1)) = (6, -3).',
        hint: 'Multiplica ambas coordenadas por la razón de homotecia.',
        points: 100
    },
    {
        id: 1029, topic: 'estadistica', type: 'multiple',
        question: 'Las notas de un estudiante son: 4,5 - 5,0 - 5,5 - 6,0 - 6,5 - 7,0. ¿Cuál es la mediana?',
        options: ['5,25', '5,5', '5,75', '6,0'],
        correct: 2,
        explanation: 'Con 6 datos (par), la mediana es el promedio de los valores centrales: (5,5 + 6,0) / 2 = 5,75.',
        hint: 'Con cantidad par de datos, la mediana es el promedio de los dos valores centrales.',
        points: 100
    },
    {
        id: 1030, topic: 'estadistica', type: 'multiple',
        question: 'En una encuesta sobre edades se obtuvo: 14, 15, 14, 15, 16, 14, 16, 17, 15. ¿Cuál es la moda?',
        options: ['14', '15', '16', 'No hay moda'],
        correct: 0,
        explanation: 'El valor 14 aparece 3 veces, más que cualquier otro. Por tanto, la moda es 14.',
        hint: 'La moda es el valor que aparece con mayor frecuencia en el conjunto de datos.',
        points: 100
    },
    {
        id: 1031, topic: 'estadistica', type: 'multiple',
        question: 'La tabla muestra las edades de un grupo:\nEdad | 15 | 16 | 17 | 18\nFrec. | 4 | 8 | 5 | 3\n\n¿Cuál es el promedio ponderado de las edades?',
        options: ['16,15', '16,35', '16,55', '16,75'],
        correct: 1,
        explanation: 'Suma: 15×4 + 16×8 + 17×5 + 18×3 = 60+128+85+54 = 327. Total personas = 20. Promedio = 327/20 = 16,35.',
        hint: 'Multiplica cada valor por su frecuencia, suma y divide por el total de datos.',
        points: 100
    },
    {
        id: 1032, topic: 'estadistica', type: 'multiple',
        question: 'En un diagrama de cajón, ¿qué representa la línea central dentro de la caja?',
        options: ['El promedio', 'La moda', 'La mediana', 'El rango'],
        correct: 2,
        explanation: 'En un diagrama de cajón (boxplot), la línea central de la caja representa la mediana (Q2).',
        hint: 'Recuerda la estructura del diagrama de cajón: bigotes, caja (Q1-Q3) y línea central.',
        points: 100
    },
    {
        id: 1033, topic: 'probabilidad', type: 'multiple',
        question: 'Se lanzan dos dados justos de 6 caras. ¿Cuál es la probabilidad de que la suma de ambos sea 7?',
        options: ['1/6', '5/36', '7/36', '1/2'],
        correct: 0,
        explanation: 'Casos favorables (suman 7): (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 casos. Total casos: 36. Probabilidad = 6/36 = 1/6.',
        hint: 'Enumera sistemáticamente todos los pares de dados que suman 7.',
        points: 100
    },
    {
        id: 1034, topic: 'probabilidad', type: 'multiple',
        question: 'En una bolsa hay 4 fichas rojas, 3 azules y 2 verdes. Se extrae una ficha al azar. ¿Cuál es la probabilidad de que NO sea azul?',
        options: ['1/3', '2/3', '4/9', '5/9'],
        correct: 1,
        explanation: 'Total fichas: 9. Fichas no azules: 4+2 = 6. Probabilidad = 6/9 = 2/3.',
        hint: 'Calcula el complemento: 1 - P(azul) o directamente los casos favorables.',
        points: 100
    },
    {
        id: 1035, topic: 'probabilidad', type: 'multiple',
        question: 'En un grupo de 50 personas, 30 practican fútbol, 20 practican básquetbol y 10 practican ambos. ¿Cuál es la probabilidad de que una persona elegida al azar practique solo fútbol?',
        options: ['0,4', '0,5', '0,6', '0,8'],
        correct: 0,
        explanation: 'Solo fútbol = 30 - 10 = 20. Probabilidad = 20/50 = 0,4.',
        hint: 'Usa el diagrama de Venn: resta la intersección al total de cada deporte.',
        points: 150
    }
];

// ============================================================
// PAES COMPETENCIA MATEMÁTICA 2 (M2)
// Ejes: Números / Álgebra y Funciones / Geometría / Probabilidad y Estadística
// Incluye contenidos avanzados de 3° y 4° medio
// ============================================================

const paesM2Questions = [
    {
        id: 2001, topic: 'numeros', type: 'multiple',
        question: 'Si log₂(x) = 5, ¿cuál es el valor de x?',
        options: ['10', '16', '25', '32'],
        correct: 3,
        explanation: 'Por definición de logaritmo: x = 2⁵ = 32.',
        hint: 'Recuerda que log_b(a) = c equivale a b^c = a.',
        points: 150
    },
    {
        id: 2002, topic: 'numeros', type: 'multiple',
        question: '¿Cuál es el valor de log₅(125) + log₅(1/25)?',
        options: ['-1', '0', '1', '3'],
        correct: 2,
        explanation: 'log₅(125) = 3 (pues 5³ = 125). log₅(1/25) = -2 (pues 5⁻² = 1/25). Suma: 3 + (-2) = 1.',
        hint: 'Aplica las propiedades de los logaritmos y evalúa cada término por separado.',
        points: 150
    },
    {
        id: 2003, topic: 'matematica-financiera', type: 'multiple',
        question: 'Se depositan $500.000 en una cuenta que paga un interés simple anual del 8%. ¿Cuál será el monto total después de 3 años?',
        options: ['$620.000', '$630.000', '$640.000', '$650.000'],
        correct: 0,
        explanation: 'Interés simple = Capital × tasa × tiempo = $500.000 × 0,08 × 3 = $120.000. Monto total = $500.000 + $120.000 = $620.000.',
        hint: 'En interés simple, el capital permanece constante y los intereses se calculan siempre sobre el monto original.',
        points: 150
    },
    {
        id: 2004, topic: 'numeros', type: 'multiple',
        question: 'Si 2^(x+1) = 16, ¿cuál es el valor de 3^x?',
        options: ['9', '27', '81', '243'],
        correct: 1,
        explanation: '2^(x+1) = 16 = 2⁴. Entonces x + 1 = 4, por lo que x = 3. Luego 3^x = 3³ = 27.',
        hint: 'Iguala las bases para resolver el exponente y luego evalúa la expresión pedida.',
        points: 150
    },
    {
        id: 2005, topic: 'algebra', type: 'multiple',
        question: 'La función f(x) = 3 · 2^x modela el crecimiento de una colonia de bacterias, donde x es el tiempo en horas. ¿Cuántas bacterias habrá después de 4 horas?',
        options: ['24', '32', '48', '96'],
        correct: 2,
        explanation: 'f(4) = 3 · 2⁴ = 3 × 16 = 48.',
        hint: 'Evalúa la función exponencial sustituyendo x = 4.',
        points: 150
    },
    {
        id: 2006, topic: 'algebra', type: 'multiple',
        question: 'Si sen(θ) = 3/5 y θ es un ángulo agudo, ¿cuál es el valor de cos(θ)?',
        options: ['2/5', '3/4', '4/5', '5/4'],
        correct: 2,
        explanation: 'Por identidad pitagórica: sen²(θ) + cos²(θ) = 1. cos²(θ) = 1 - (3/5)² = 1 - 9/25 = 16/25. cos(θ) = 4/5 (positivo al ser agudo).',
        hint: 'Usa la identidad fundamental sen²(θ) + cos²(θ) = 1.',
        points: 150
    },
    {
        id: 2007, topic: 'algebra', type: 'multiple',
        question: '¿Cuál es el período de la función f(x) = cos(2x)?',
        options: ['π', '2π', 'π/2', '4π'],
        correct: 0,
        explanation: 'El período de cos(kx) es 2π/k. Aquí k = 2, por tanto período = 2π/2 = π.',
        hint: 'El período de la función coseno se comprime cuando el coeficiente de x aumenta.',
        points: 150
    },
    {
        id: 2008, topic: 'algebra', type: 'multiple',
        question: 'Resuelve el sistema de ecuaciones: 2x + y = 7 ; x - y = -1. ¿Cuál es el valor de x + y?',
        options: ['3', '4', '5', '6'],
        correct: 2,
        explanation: 'Sumando ambas ecuaciones: 3x = 6 → x = 2. Reemplazando en la segunda: 2 - y = -1 → y = 3. Entonces x + y = 5.',
        hint: 'Usa el método de reducción sumando ambas ecuaciones para eliminar y.',
        points: 150
    },
    {
        id: 2009, topic: 'geometria', type: 'multiple',
        question: 'En un triángulo rectángulo, un ángulo agudo mide 30° y el cateto opuesto a este ángulo mide 5 cm. ¿Cuál es la longitud de la hipotenusa?',
        options: ['5 cm', '10 cm', '5√3 cm', '10√3 cm'],
        correct: 1,
        explanation: 'sen(30°) = cateto opuesto / hipotenusa = 1/2. Entonces 5 / h = 1/2 → h = 10 cm.',
        hint: 'Usa la razón trigonométrica seno para relacionar el ángulo, el cateto opuesto y la hipotenusa.',
        points: 150
    },
    {
        id: 2010, topic: 'geometria', type: 'multiple',
        question: 'La ecuación de una circunferencia con centro en (2, -3) y radio 4 es:',
        options: ['(x-2)² + (y+3)² = 4', '(x+2)² + (y-3)² = 16', '(x-2)² + (y+3)² = 16', '(x-2)² - (y+3)² = 16'],
        correct: 2,
        explanation: 'Ecuación circunferencia: (x-h)² + (y-k)² = r². Sustituyendo: (x-2)² + (y-(-3))² = 4² → (x-2)² + (y+3)² = 16.',
        hint: 'Recuerda la forma canónica de la circunferencia y verifica el signo de las coordenadas del centro.',
        points: 150    },
    {
        id: 2011, topic: 'geometria', type: 'multiple',
        question: 'Una esfera tiene radio 3 cm. ¿Cuál es su volumen? (Usa V = (4/3)πr³ y π = 3)',
        options: ['36 cm³', '72 cm³', '108 cm³', '144 cm³'],
        correct: 2,
        explanation: 'V = (4/3) × 3 × 3³ = (4/3) × 3 × 27 = 4 × 27 = 108 cm³.',
        hint: 'Sustituye directamente en la fórmula del volumen de la esfera.',
        points: 150
    },
    {
        id: 2012, topic: 'geometria', type: 'multiple',
        question: 'Dos rectas en el plano tienen pendientes m₁ = 2 y m₂ = -1/2. ¿Qué relación existe entre ellas?',
        options: ['Son paralelas', 'Son perpendiculares', 'Son coincidentes', 'Se intersectan formando 30°'],
        correct: 1,
        explanation: 'Dos rectas son perpendiculares si el producto de sus pendientes es -1. Aquí 2 × (-1/2) = -1.',
        hint: 'Recuerda la condición de perpendicularidad: m₁ × m₂ = -1.',
        points: 150
    },
    {
        id: 2013, topic: 'probabilidad', type: 'multiple',
        question: '¿De cuántas formas distintas se pueden ordenar 4 libros en un estante?',
        options: ['16', '24', '64', '120'],
        correct: 1,
        explanation: 'Se trata de 4! = 4 × 3 × 2 × 1 = 24 permutaciones.',
        hint: 'Usa el concepto de permutación de n elementos distintos.',
        points: 150
    },
    {
        id: 2014, topic: 'probabilidad', type: 'multiple',
        question: 'En una clase, el 60% de los estudiantes practica deporte y el 40% practica música. El 25% practica ambas actividades. Si se elige un estudiante al azar que practica deporte, ¿cuál es la probabilidad de que también practique música?',
        options: ['0,15', '0,25', '0,40', '0,42'],
        correct: 3,
        explanation: 'Probabilidad condicional: P(Música|Deporte) = P(Ambas) / P(Deporte) = 0,25 / 0,60 ≈ 0,4167 ≈ 0,42.',
        hint: 'Aplica la fórmula de probabilidad condicional: P(A|B) = P(A∩B) / P(B).',
        points: 200
    },
    {
        id: 2015, topic: 'estadistica', type: 'multiple',
        question: 'Los datos 10, 12, 14, 16, 18 tienen una desviación estándar aproximada de 2,83. Si a cada dato se le suma 5, ¿qué ocurre con la desviación estándar?',
        options: ['Aumenta en 5', 'Disminuye en 5', 'Permanece igual', 'Se duplica'],
        correct: 2,
        explanation: 'La desviación estándar es una medida de dispersión que no se ve afectada por traslaciones (sumar o restar una constante a todos los datos).',
        hint: 'Recuerda que al sumar una constante a todos los datos, la media se traslada pero la dispersión relativa no cambia.',
        points: 150
    },
    {
        id: 2016, topic: 'probabilidad', type: 'multiple',
        question: 'Se lanza una moneda justa 4 veces. ¿Cuál es la probabilidad de obtener exactamente 2 caras?',
        options: ['1/16', '3/8', '1/2', '5/8'],
        correct: 1,
        explanation: 'Usando distribución binomial: C(4,2) × (1/2)² × (1/2)² = 6 × 1/16 = 6/16 = 3/8.',
        hint: 'Usa la fórmula binomial o enumera los casos favorables sobre el total de combinaciones.',
        points: 200
    },
    {
        id: 2017, topic: 'estadistica', type: 'multiple',
        question: 'En una distribución normal, aproximadamente el 95% de los datos se encuentran dentro de:',
        options: ['Una desviación estándar de la media', 'Dos desviaciones estándar de la media', 'Tres desviaciones estándar de la media', 'Cuatro desviaciones estándar de la media'],
        correct: 1,
        explanation: 'Según la regla empírica (o de la campana de Gauss), aproximadamente el 95% de los datos están a ±2 desviaciones estándar de la media.',
        hint: 'Recuerda la regla 68-95-99,7 de la distribución normal.',
        points: 150
    },
    {
        id: 2018, topic: 'probabilidad', type: 'multiple',
        question: '¿Cuántos subconjuntos de 3 elementos se pueden formar a partir de un conjunto de 6 elementos?',
        options: ['18', '20', '120', '216'],
        correct: 1,
        explanation: 'Combinaciones de 6 en 3: C(6,3) = 6! / (3! × 3!) = (6×5×4) / (3×2×1) = 20.',
        hint: 'Usa combinaciones porque el orden de los elementos no importa.',
        points: 150
    },
    {
        id: 2019, topic: 'matematica-financiera', type: 'multiple',
        question: 'Se depositan $1.000.000 al 10% anual de interés compuesto, capitalizable anualmente. ¿Cuál será el monto después de 2 años?',
        options: ['$1.200.000', '$1.210.000', '$1.220.000', '$1.240.000'],
        correct: 1,
        explanation: 'Interés compuesto: M = C(1 + i)^n = 1.000.000 × (1,10)² = 1.000.000 × 1,21 = $1.210.000.',
        hint: 'En interés compuesto, los intereses ganados se suman al capital y generan nuevos intereses.',
        points: 150
    },
    {
        id: 2020, topic: 'matematica-financiera', type: 'multiple',
        question: '¿Cuál es la diferencia entre interés simple e interés compuesto a largo plazo, con la misma tasa y capital inicial?',
        options: ['El interés simple siempre es mayor', 'El interés compuesto genera un crecimiento exponencial', 'Ambos generan exactamente el mismo monto', 'El interés compuesto solo se aplica en inversiones'],
        correct: 1,
        explanation: 'El interés compuesto reinvierte los intereses generando un efecto "bola de nieve" o crecimiento exponencial, mientras que el simple es lineal.',
        hint: 'Piensa en qué sucede con los intereses ganados en cada período según cada tipo de interés.',
        points: 100
    },
    {
        id: 2021, topic: 'numeros', type: 'multiple',
        question: 'Si z₁ = 3 + 2i y z₂ = 1 - 4i, ¿cuál es el valor de z₁ + z₂?',
        options: ['4 - 2i', '4 + 6i', '2 - 2i', '4 + 2i'],
        correct: 0,
        explanation: 'Suma de complejos: (3+2i) + (1-4i) = (3+1) + (2-4)i = 4 - 2i.',
        hint: 'Suma por separado las partes reales y las partes imaginarias.',
        points: 150
    },
    {
        id: 2022, topic: 'numeros', type: 'multiple',
        question: '¿Cuál es el producto de (2 + i) y (2 - i)?',
        options: ['3', '4', '5', '6'],
        correct: 2,
        explanation: '(2+i)(2-i) = 4 - i² = 4 - (-1) = 5. Es el producto de un complejo por su conjugado.',
        hint: 'Recuerda que i² = -1 y aplica el producto notable suma por diferencia.',
        points: 150
    },
    {
        id: 2023, topic: 'algebra', type: 'multiple',
        question: '¿Cuál es el dominio de la función f(x) = √(x - 4)?',
        options: ['Todos los números reales', 'x ≥ 0', 'x ≥ 4', 'x > 4'],
        correct: 2,
        explanation: 'Para que la raíz cuadrada esté definida en ℝ, el radicando debe ser ≥ 0: x - 4 ≥ 0 → x ≥ 4.',
        hint: 'El radicando (lo que está dentro de la raíz) debe ser mayor o igual a cero.',
        points: 150
    },
    {
        id: 2024, topic: 'algebra', type: 'multiple',
        question: 'Resuelve la inecuación: 3x - 7 > 2x + 5',
        options: ['x > 12', 'x > 2', 'x < 12', 'x > -12'],
        correct: 0,
        explanation: '3x - 7 > 2x + 5 → x - 7 > 5 → x > 12.',
        hint: 'Agrupa los términos con x en un lado y los números en el otro, manteniendo la desigualdad.',
        points: 150
    },
    {
        id: 2025, topic: 'algebra', type: 'multiple',
        question: '¿Cuál es la solución de la inecuación x² - 4x - 5 ≤ 0?',
        options: ['x ≤ -1 o x ≥ 5', '-1 ≤ x ≤ 5', 'x ≤ -5 o x ≥ 1', 'Todo número real'],
        correct: 1,
        explanation: 'Factorizando: (x-5)(x+1) ≤ 0. La parábola abre hacia arriba. Solución: -1 ≤ x ≤ 5.',
        hint: 'Factoriza el trinomio, encuentra las raíces y analiza el signo de la parábola.',
        points: 150
    },
    {
        id: 2026, topic: 'algebra', type: 'multiple',
        question: 'Si cos(θ) = 5/13 y θ es un ángulo agudo, ¿cuál es el valor de tan(θ)?',
        options: ['5/12', '12/5', '12/13', '5/13'],
        correct: 1,
        explanation: 'Por Pitágoras: sen²(θ) = 1 - (5/13)² = 1 - 25/169 = 144/169 → sen(θ) = 12/13. tan(θ) = sen/cos = (12/13)/(5/13) = 12/5.',
        hint: 'Encuentra primero sen(θ) usando la identidad pitagórica y luego calcula la tangente.',
        points: 150
    },
    {
        id: 2027, topic: 'algebra', type: 'multiple',
        question: 'Resuelve para x en [0, 2π): 2sen(x) - 1 = 0',
        options: ['{π/6}', '{π/6, 5π/6}', '{π/3, 2π/3}', '{π/6, 11π/6}'],
        correct: 1,
        explanation: 'sen(x) = 1/2. En [0, 2π): x = π/6 y x = 5π/6.',
        hint: 'Despeja sen(x) y recuerda que el seno es positivo en el primer y segundo cuadrante.',
        points: 200
    },
    {
        id: 2028, topic: 'geometria', type: 'multiple',
        question: '¿Cuál es la distancia entre los puntos A(1, 3) y B(5, 6)?',
        options: ['3', '4', '5', '6'],
        correct: 2,
        explanation: 'd = √[(5-1)² + (6-3)²] = √[16 + 9] = √25 = 5.',
        hint: 'Aplica la fórmula de distancia entre dos puntos: √[(x₂-x₁)² + (y₂-y₁)²].',
        points: 150
    },
    {
        id: 2029, topic: 'geometria', type: 'multiple',
        question: 'La recta que pasa por los puntos (0, 4) y (2, 0) tiene por ecuación:',
        options: ['y = -2x + 4', 'y = 2x + 4', 'y = -x + 2', 'y = x + 4'],
        correct: 0,
        explanation: 'Pendiente m = (0-4)/(2-0) = -4/2 = -2. Con punto (0,4): y = -2x + 4.',
        hint: 'Calcula la pendiente y usa el intercepto con el eje Y (punto donde x=0).',
        points: 150
    },
    {
        id: 2030, topic: 'estadistica', type: 'multiple',
        question: 'Los datos {2, 4, 6, 8} tienen media 5. ¿Cuál es la varianza poblacional?',
        options: ['3', '4', '5', '6'],
        correct: 2,
        explanation: 'Varianza = [(2-5)²+(4-5)²+(6-5)²+(8-5)²] / 4 = (9+1+1+9)/4 = 20/4 = 5.',
        hint: 'Calcula las diferencias al cuadrado respecto a la media, súmalas y divide por n.',
        points: 200
    },
    {
        id: 2031, topic: 'estadistica', type: 'multiple',
        question: 'Si la varianza de un conjunto de datos es 16, ¿cuál es la desviación estándar?',
        options: ['2', '4', '8', '16'],
        correct: 1,
        explanation: 'La desviación estándar es la raíz cuadrada de la varianza: √16 = 4.',
        hint: 'La desviación estándar es la raíz cuadrada de la varianza.',
        points: 100
    },
    {
        id: 2032, topic: 'estadistica', type: 'multiple',
        question: 'En una distribución normal con media 100 y desviación estándar 15, ¿qué porcentaje aproximado de datos se encuentra entre 70 y 130?',
        options: ['68%', '95%', '99,7%', '50%'],
        correct: 1,
        explanation: '70 = 100 - 2(15) y 130 = 100 + 2(15). Según la regla 68-95-99,7, el 95% está a ±2 desviaciones.',
        hint: 'Calcula cuántas desviaciones estándar hay entre los valores dados y la media.',
        points: 150
    }
];

// ============================================================
// PAES COMPETENCIA LECTORA
// Ejes: Localizar / Interpretar / Evaluar
// ============================================================

const paesLenguajeQuestions = [
    {
        id: 3001, topic: 'localizar', type: 'multiple',
        question: 'Lea el siguiente fragmento:\n\n"La migración de las aves monarca es uno de los fenómenos más asombrosos de la naturaleza. Cada año, millones de ejemplares recorren más de cuatro mil kilómetros desde Canadá hasta los bosques de México."\n\n¿Desde dónde parten las aves monarca en su migración?',
        options: ['Desde México hacia Canadá', 'Desde Canadá hacia México', 'Desde Estados Unidos hacia Chile', 'Desde Brasil hacia Argentina'],
        correct: 1,
        explanation: 'El texto indica explícitamente que recorren "más de cuatro mil kilómetros desde Canadá hasta los bosques de México".',
        hint: 'Busca en el texto la información literal sobre el punto de partida de la migración.',
        points: 100
    },
    {
        id: 3002, topic: 'localizar', type: 'multiple',
        question: 'Texto:\n\n"El Programa de Alimentación Escolar fue creado en 1968 con el objetivo de garantizar una alimentación balanceada a estudiantes de escasos recursos. En la actualidad, beneficia a más de 1,5 millones de niños y niñas a lo largo del país."\n\n¿En qué año se creó el Programa de Alimentación Escolar?',
        options: ['1958', '1968', '1978', '1988'],
        correct: 1,
        explanation: 'El texto señala explícitamente que el programa "fue creado en 1968".',
        hint: 'Localiza la fecha exacta mencionada en el enunciado del texto.',
        points: 100
    },
    {
        id: 3003, topic: 'interpretar', type: 'multiple',
        question: 'Texto:\n\n"Aunque muchos celebraron la inauguración del nuevo centro comercial como un signo de progreso, otros residentes del barrio miraron con preocupación cómo las antiguas casas de adobe cedían su lugar a estructuras de vidrio y acero."\n\n¿Qué actitud predomina entre "otros residentes" frente al nuevo centro comercial?',
        options: ['Entusiasmo y celebración', 'Indiferencia total', 'Preocupación por la pérdida patrimonial', 'Alegría por el progreso económico'],
        correct: 2,
        explanation: 'El texto indica que "otros residentes del barrio miraron con preocupación" al ver desaparecer las "antiguas casas de adobe", lo que evidencia una actitud de preocupación por la pérdida del patrimonio arquitectónico tradicional.',
        hint: 'Presta atención a los conectores contrastivos ("aunque... otros") y a las emociones asociadas a cada grupo.',
        points: 100
    },
    {
        id: 3004, topic: 'interpretar', type: 'multiple',
        question: 'Texto:\n\n"María no dijo una palabra durante toda la reunión. Sus manos, apretadas con fuerza sobre la carpeta, y su mirada fija en el piso, hablaban por ella."\n\n¿Qué se puede inferir sobre el estado emocional de María?',
        options: ['Está aburrida', 'Está nerviosa o incómoda', 'Está emocionada de felicidad', 'Está profundamente dormida'],
        correct: 1,
        explanation: 'Las descripciones de sus manos "apretadas con fuerza" y su "mirada fija en el piso" son indicios no verbales que sugieren nerviosismo o incomodidad en el contexto social.',
        hint: 'Analiza los detalles no verbales descritos como indicios del estado interno del personaje.',
        points: 100
    },
    {
        id: 3005, topic: 'interpretar', type: 'multiple',
        question: 'Texto:\n\n"La literatura no es solo un espejo que refleja la realidad, sino un martillo con el que forjarla."\n\n¿Cuál es la idea principal que el autor quiere transmitir con esta metáfora?',
        options: ['Que la literatura refleja fielmente la realidad social', 'Que la literatura tiene el poder de transformar la realidad', 'Que los escritores deben usar herramientas de construcción', 'Que la literatura es frágil como el vidrio'],
        correct: 1,
        explanation: 'La metáfora del "martillo" sugiere que la literatura no solo refleja (espejo), sino que también actúa y transforma (martillo) la realidad social.',
        hint: 'Analiza el contraste entre "espejo" (reflejo pasivo) y "martillo" (acción/transformación).',
        points: 100
    },
    {
        id: 3006, topic: 'interpretar', type: 'multiple',
        question: 'Texto:\n\n"El aumento del uso de redes sociales ha coincidido con una disminución en las interacciones cara a cara entre jóvenes. Sin embargo, estudios recientes sugieren que esta correlación no implica necesariamente causalidad."\n\n¿Qué relación establece el autor entre redes sociales e interacciones presenciales?',
        options: ['Que las redes sociales causan directamente el aislamiento social', 'Que existe una coincidencia temporal pero no una relación de causa-efecto demostrada', 'Que las interacciones presenciales han aumentado gracias a las redes sociales', 'Que no existe ninguna relación entre ambos fenómenos'],
        correct: 1,
        explanation: 'El autor señala que hay correlación (coincidencia) pero advierte que "no implica necesariamente causalidad", es decir, no se ha demostrado una relación directa de causa-efecto.',
        hint: 'Presta atención a la distinción entre correlación (coincidencia) y causalidad (causa-efecto).',
        points: 100
    },
    {
        id: 3007, topic: 'evaluar', type: 'multiple',
        question: 'Texto:\n\n"¿Acaso no es evidente que cualquier persona que se oponga a esta reforma está simplemente defendiendo sus privilegios?"\n\n¿Qué falacia argumentativa presenta este enunciado?',
        options: ['Falacia de autoridad', 'Falacia ad hominem (ataque a la persona)', 'Falacia de falsa causa', 'Falacia de apelación a la autoridad'],
        correct: 1,
        explanation: 'El enunciado ataca a quienes se oponen a la reforma cuestionando sus motivos personales ("defendiendo sus privilegios") en lugar de refutar sus argumentos.',
        hint: 'Identifica si el argumento ataca a la persona o sus motivos en lugar de sus razones.',
        points: 150
    },
    {
        id: 3008, topic: 'evaluar', type: 'multiple',
        question: 'Texto:\n\n"El científico, con su bata blanca impecable y sus años de investigación en prestigiosas universidades, afirmó que el nuevo medicamento era completamente seguro."\n\n¿Qué recurso argumentativo utiliza el autor para dar peso a la afirmación?',
        options: ['Presentación de datos estadísticos', 'Apelación a la autoridad y credibilidad del emisor', 'Uso de analogías comparativas', 'Demostración matemática formal'],
        correct: 1,
        explanation: 'El autor destaca la apariencia profesional ("bata blanca impecable") y la trayectoria académica para reforzar la credibilidad del científico.',
        hint: 'Identifica si el argumento se basa en la credibilidad del que habla más que en evidencia directa.',
        points: 150
    },
    {
        id: 3009, topic: 'evaluar', type: 'multiple',
        question: 'Texto:\n\n"La ciudad dormía bajo un manto de silencio. Solo el viento, como un ladrón invisible, se colaba por las rendijas de las ventanas cerradas."\n\n¿Qué recurso literario predomina en este fragmento?',
        options: ['Hipérbaton', 'Metáfora y personificación', 'Anáfora', 'Paradoja'],
        correct: 1,
        explanation: '"Manto de silencio" es una metáfora, y describir al viento "como un ladrón invisible" que "se colaba" le atribuye características humanas (personificación).',
        hint: 'Analiza las comparaciones implícitas y las atribuciones de cualidades humanas a elementos no humanos.',
        points: 150
    },
    {
        id: 3010, topic: 'evaluar', type: 'multiple',
        question: 'Texto:\n\n"Según un estudio reciente, el 85% de los encuestados prefiere el producto A sobre el producto B. Por lo tanto, el producto A es objetivamente superior."\n\n¿Cuál es el principal problema de este argumento?',
        options: ['La muestra encuestada no es necesariamente representativa de toda la población', 'Los porcentajes no pueden usarse en argumentos comerciales', 'El producto B no fue descrito adecuadamente', 'La encuesta es anónima'],
        correct: 0,
        explanation: 'El argumento generaliza desde una encuesta (cuya muestra puede estar sesgada o no ser representativa) hacia una conclusión absoluta ("objetivamente superior").',
        hint: 'Evalúa si la evidencia presentada justifica la conclusión general que se extrae de ella.',
        points: 150
    },
    {
        id: 3011, topic: 'evaluar', type: 'multiple',
        question: 'Texto:\n\n"La noticia fue presentada con letras mayúsculas y rojas en el titular, acompañada de una imagen en blanco y negro que mostraba una escena de caos."\n\n¿Qué función cumplen los recursos no lingüísticos en este texto?',
        options: ['Solo decorar la página', 'Potenciar el impacto emocional y la urgencia del mensaje', 'Reducir la credibilidad de la información', 'Indicar que la noticia es antigua'],
        correct: 1,
        explanation: 'El uso de mayúsculas, color rojo (asociado a alerta) e imagen de caos son recursos visuales que intensifican la carga emocional y la percepción de urgencia del contenido.',
        hint: 'Analiza cómo los elementos visuales (tipografía, color, imagen) interactúan con el significado del texto.',
        points: 150
    },
    {
        id: 3012, topic: 'interpretar', type: 'multiple',
        question: 'Texto:\n\n"El río seguía su curso indiferente, ajeno a las discusiones de los humanos que habitaban sus orillas. Llevaba siglos haciéndolo, y seguiría otros siglos más después de que todos ellos se hubieran ido."\n\n¿Qué contraste establece el texto entre el río y los humanos?',
        options: ['Que el río es más inteligente que los humanos', 'Que el río representa la permanencia frente a la temporalidad humana', 'Que los humanos dependen completamente del río para vivir', 'Que el río y los humanos tienen la misma duración en el tiempo'],
        correct: 1,
        explanation: 'El texto contrapone la continuidad eterna del río ("siglos haciéndolo", "seguiría otros siglos más") con la existencia finita de los humanos ("después de que todos ellos se hubieran ido").',
        hint: 'Compara las referencias temporales asociadas al río y a los humanos.',
        points: 100
    },
    {
        id: 3013, topic: 'localizar', type: 'multiple',
        question: 'Texto:\n\n"La fotosíntesis es un proceso bioquímico mediante el cual las plantas, algas y algunas bacterias convierten la energía lumínica en energía química. Este proceso ocurre principalmente en los cloroplastos, orgánulos presentes en las células vegetales."\n\n¿Dónde ocurre principalmente la fotosíntesis?',
        options: ['En las mitocondrias', 'En los cloroplastos', 'En el núcleo celular', 'En la membrana celular'],
        correct: 1,
        explanation: 'El texto indica explícitamente que el proceso "ocurre principalmente en los cloroplastos".',
        hint: 'Localiza en el texto el orgánulo específico donde se realiza la fotosíntesis.',
        points: 100
    },
    {
        id: 3014, topic: 'evaluar', type: 'multiple',
        question: 'Texto:\n\n"Nunca en la historia de nuestra nación se había visto una crisis tan devastadora. Todos los indicadores económicos se desploman y nadie puede negar que estamos ante el peor momento de nuestra historia."\n\n¿Qué tono predomina en este fragmento?',
        options: ['Objetivo y neutral', 'Alarmista y catastrofista', 'Optimista y esperanzador', 'Irónico y burlón'],
        correct: 1,
        explanation: 'Las expresiones "nunca... tan devastadora", "todos los indicadores se desploman" y "peor momento de nuestra historia" construyen un tono alarmista y catastrofista.',
        hint: 'Analiza el tipo de vocabulario y las expresiones extremas utilizadas por el emisor.',
        points: 150
    },
    {
        id: 3015, topic: 'interpretar', type: 'multiple',
        question: 'Texto:\n\n"Pedro llegó tarde a la entrevista. Su corbata estaba torcida, tenía una mancha de café en la camisa y olvidó el portafolio en el taxi. A pesar de todo, cuando le preguntaron por sus fortalezas, respondió con una seguridad que nadie esperaba."\n\n¿Qué contraste presenta el texto?',
        options: ['Entre la preparación deficiente y la confianza mostrada', 'Entre la puntualidad y la impuntualidad', 'Entre el café y la camisa', 'Entre el taxi y la entrevista'],
        correct: 0,
        explanation: 'El texto describe una serie de errores y desprolijidades que contrastan con la "seguridad" inesperada que Pedro demuestra al responder.',
        hint: 'Identifica los elementos negativos previos y el elemento positivo sorpresivo que los contradice.',
        points: 100
    },
    {
        id: 3016, topic: 'interpretar', type: 'multiple',
        question: '"Es tan corto el amor, y es tan largo el olvido."\n— Pablo Neruda, "Veinte poemas de amor..."\n\n¿Qué recurso literario se utiliza en este verso?',
        options: ['Metáfora', 'Antítesis (contraste)', 'Hipérbaton', 'Anáfora'],
        correct: 1,
        explanation: 'La antítesis contrapone dos ideas opuestas: la brevedad del amor ("tan corto") frente a la prolongación del olvido ("tan largo").',
        hint: 'Identifica la oposición de ideas como recurso central del verso.',
        points: 100
    },
    {
        id: 3017, topic: 'interpretar', type: 'multiple',
        question: '"Tu risa me hace libre, me pone alas. Soledades me quita, cárcel me arranca."\n— Miguel Hernández\n\n¿Qué sentimiento expresa el hablante lírico respecto a la risa de la persona amada?',
        options: ['Indiferencia', 'Liberación y transformación positiva', 'Tristeza y melancolía', 'Confusión y duda'],
        correct: 1,
        explanation: 'Las metáforas "me hace libre", "me pone alas", "quita soledades" y "arranca cárcel" asocian la risa con la liberación de ataduras emocionales.',
        hint: 'Analiza las connotaciones positivas de las metáforas relacionadas con libertad y vuelo.',
        points: 100
    },
    {
        id: 3018, topic: 'evaluar', type: 'multiple',
        question: '"Llegó el vecino puntual: solo tres horas tarde."\n\n¿Qué recurso retórico se emplea en esta expresión?',
        options: ['Hipérbole', 'Ironía', 'Metáfora', 'Personificación'],
        correct: 1,
        explanation: 'La ironía consiste en afirmar lo contrario de lo que realmente se quiere decir. Al calificar de "puntual" a alguien que llega "tres horas tarde", se está utilizando este recurso con intención humorística o crítica.',
        hint: 'Identifica si lo que se dice literalmente contradice la situación real descrita.',
        points: 100
    },
    {
        id: 3019, topic: 'evaluar', type: 'multiple',
        question: '"Te he llamado un millón de veces y nunca respondes."\n\n¿Qué figura literaria está presente en esta oración?',
        options: ['Metáfora', 'Hipérbole', 'Comparación', 'Personificación'],
        correct: 1,
        explanation: 'La hipérbole es una exageración retórica. "Un millón de veces" no debe interpretarse literalmente, sino como una forma enfática de expresar muchas llamadas.',
        hint: 'Reconoce la exageración evidente como recurso expresivo.',
        points: 100
    },
    {
        id: 3020, topic: 'evaluar', type: 'multiple',
        question: '"Las redes sociales han transformado profundamente las relaciones interpersonales en el siglo XXI. Por un lado, permiten conectar instantáneamente a personas separadas por miles de kilómetros, facilitando la comunicación familiar y las relaciones de larga distancia. Sin embargo, diversos estudios psicológicos han evidenciado que el uso excesivo de estas plataformas se correlaciona con mayores índices de ansiedad, depresión y sentimientos de soledad entre los jóvenes, particularmente aquellos que pasan más de tres horas diarias frente a las pantallas."\n\n¿Cuál es el propósito comunicativo principal del texto?',
        options: ['Convencer al lector de eliminar sus redes sociales', 'Presentar una visión matizada con beneficios y riesgos del uso de redes sociales', 'Demostrar que las redes sociales son perjudiciales para todos', 'Narrar una experiencia personal con las redes sociales'],
        correct: 1,
        explanation: 'El texto presenta argumentos a favor y en contra, ofreciendo una perspectiva equilibrada sin tomar una postura radical.',
        hint: 'Identifica si el texto presenta solo un lado del tema o aborda múltiples perspectivas.',
        points: 150
    },
    {
        id: 3021, topic: 'evaluar', type: 'multiple',
        question: '"¡Inscríbete hoy mismo! Plazas limitadas. No dejes pasar esta oportunidad única."\n\n¿Cuál es el propósito comunicativo predominante en este enunciado?',
        options: ['Informar', 'Persuadir o convencer', 'Entretener', 'Describir'],
        correct: 1,
        explanation: 'El uso de imperativos ("inscríbete"), signos de exclamación y frases como "oportunidad única" indican una intención persuasiva, típica de la publicidad.',
        hint: 'Analiza el modo verbal (imperativo) y el tipo de léxico empleado (urgencia, exclusividad).',
        points: 100
    },
    {
        id: 3022, topic: 'localizar', type: 'multiple',
        question: '"El efecto invernadero es un fenómeno natural que permite la vida en la Tierra. Sin embargo, la actividad humana ha intensificado este efecto mediante la emisión de gases como el dióxido de carbono (CO₂) y el metano (CH₄), provocando un calentamiento global acelerado desde la Revolución Industrial."\n\nSegún el texto, ¿qué ha intensificado el ser humano?',
        options: ['La Revolución Industrial', 'La vida en la Tierra', 'El efecto invernadero', 'La emisión de oxígeno'],
        correct: 2,
        explanation: 'El texto afirma explícitamente que "la actividad humana ha intensificado este efecto" (refiriéndose al efecto invernadero mencionado antes).',
        hint: 'Busca en el texto qué fenómeno se menciona como intensificado por la actividad humana.',
        points: 100
    },
    {
        id: 3023, topic: 'interpretar', type: 'multiple',
        question: '"El viejo reloj de la estación marcaba las once de la noche cuando el último tren partió. En el andén vacío, una mujer permanecía sentada, con un abrigo raído y una maleta cerrada a sus pies. Miraba fijamente el túnel oscuro por donde había desaparecido el tren, como si aún esperara verlo regresar."\n\n¿Qué sentimiento transmite la mujer en el andén?',
        options: ['Alegría', 'Espera o abandono', 'Entusiasmo', 'Indiferencia'],
        correct: 1,
        explanation: 'Los elementos contextuales ("último tren", "andén vacío", "abrigo raído", "como si aún esperara") construyen una atmósfera de soledad, abandono y espera inútil.',
        hint: 'Analiza las connotaciones de las palabras que describen el entorno y la actitud del personaje.',
        points: 100
    },
    {
        id: 3024, topic: 'evaluar', type: 'multiple',
        question: '"Todos mis amigos tienen este celular, por lo tanto debe ser el mejor del mercado."\n\n¿Qué falacia lógica presenta este razonamiento?',
        options: ['Falacia ad hominem', 'Falacia ad populum (apelación a la mayoría)', 'Falacia de falsa autoridad', 'Falacia de causa falsa'],
        correct: 1,
        explanation: 'La falacia ad populum consiste en argumentar que algo es verdadero o bueno simplemente porque mucha gente lo cree o lo hace, sin aportar evidencia objetiva.',
        hint: 'Identifica si el argumento apela a la popularidad en lugar de a razones objetivas.',
        points: 150
    },
    {
        id: 3025, topic: 'interpretar', type: 'multiple',
        question: '"Al abrir la puerta de su casa, notó que el florero del recibidor estaba en el suelo, hecho añicos, y el cajón de la cómoda abierto de par en par."\n\n¿Qué se puede inferir de esta situación?',
        options: ['Que hubo una celebración en la casa', 'Que probablemente ocurrió un robo', 'Que la persona olvidó hacer el aseo', 'Que entró un animal doméstico jugando'],
        correct: 1,
        explanation: 'Los indicios descritos (objeto roto, cajón abierto) son típicos de una escena de robo, lo que constituye una inferencia razonable basada en el contexto.',
        hint: 'Analiza los indicios como pistas que apuntan a una situación probable.',
        points: 100
    },
    {
        id: 3026, topic: 'evaluar', type: 'multiple',
        question: 'Un afiche publicitario muestra una playa paradisíaca con el texto "Escápate del estrés" en letras blancas sobre el mar. La imagen ocupa el 90% del afiche y el texto es mínimo.\n\n¿Qué función cumple la imagen en esta publicidad?',
        options: ['Solo decorar el fondo', 'Reforzar visualmente la promesa emocional del mensaje', 'Informar sobre precios y fechas', 'Contradecir el mensaje escrito'],
        correct: 1,
        explanation: 'La imagen de la playa paradisíaca complementa y refuerza el mensaje "Escápate del estrés", apelando a las emociones del receptor mediante el deseo de tranquilidad.',
        hint: 'Analiza la relación entre la imagen y el texto: ¿se complementan, se contradicen o uno domina?',
        points: 100
    },
    {
        id: 3027, topic: 'evaluar', type: 'multiple',
        question: '"La película dura 142 minutos" y "La película es aburrida".\n\n¿Qué diferencia existe entre ambos enunciados?',
        options: ['Ambos son hechos objetivos', 'El primero es un hecho verificable y el segundo es una opinión subjetiva', 'El primero es una opinión y el segundo es un hecho', 'Ambos son opiniones subjetivas'],
        correct: 1,
        explanation: 'La duración es un dato objetivo y verificable, mientras que "aburrida" es un juicio de valor personal, no comprobable universalmente.',
        hint: 'Distingue entre información que se puede comprobar y juicios que dependen del gusto personal.',
        points: 100
    },
    {
        id: 3028, topic: 'interpretar', type: 'multiple',
        question: '"El profesor explicó la materia de forma LÚCIDA."\n\nEn el contexto, ¿qué significa "lúcida"?',
        options: ['Confusa', 'Clara y comprensible', 'Rápida', 'Aburrida'],
        correct: 1,
        explanation: '"Lúcido" significa claro en el razonamiento o en la expresión. En este contexto, implica que la explicación fue fácil de comprender.',
        hint: 'Infiere el significado a partir del contexto positivo de la oración.',
        points: 100
    },
    {
        id: 3029, topic: 'evaluar', type: 'multiple',
        question: '"Excelente servicio. Hace tres días que espero una respuesta a mi reclamo. Felicitaciones por la eficiencia."\n\n¿Qué tono utiliza realmente el emisor?',
        options: ['Alegre y satisfecho', 'Sarcástico', 'Neutral e informativo', 'Triste'],
        correct: 1,
        explanation: 'El contraste entre las palabras positivas ("excelente", "felicitaciones") y la situación descrita (tres días de espera) revela un tono sarcástico.',
        hint: 'Compara lo que se dice literalmente con la situación real para identificar un posible sarcasmo.',
        points: 150
    },
    {
        id: 3030, topic: 'interpretar', type: 'multiple',
        question: '"La inteligencia artificial (IA) está revolucionando diversos campos. En medicina, permite diagnósticos más rápidos y precisos. En educación, facilita la personalización del aprendizaje. En transporte, impulsa el desarrollo de vehículos autónomos. Sin embargo, expertos advierten sobre los riesgos éticos de delegar decisiones críticas en algoritmos."\n\n¿Cuál es la idea principal del texto?',
        options: ['La IA solo tiene aplicaciones en medicina', 'La IA ofrece beneficios en múltiples áreas pero también plantea desafíos éticos', 'Los vehículos autónomos son el mayor logro de la IA', 'La IA debe ser prohibida por sus riesgos'],
        correct: 1,
        explanation: 'El texto presenta aplicaciones positivas de la IA en diversas áreas para luego, mediante el conector "sin embargo", introducir una advertencia sobre sus riesgos éticos.',
        hint: 'Identifica la estructura del texto: presenta beneficios y luego introduce una objeción o limitación.',
        points: 150
    }
];

// Mapa de niveles PAES
const levelQuestionsMap = {
    1: paesLenguajeQuestions,
    2: paesM1Questions,
    3: paesM2Questions,
    4: [...paesM1Questions, ...paesM2Questions, ...paesLenguajeQuestions] // Nivel mixto
};

const levelNames = {
    1: '📖 Competencia Lectora',
    2: '📐 Matemática 1 (M1)',
    3: '📊 Matemática 2 (M2)',
    4: '🏆 Desafío Final Mixto'
};

const levelColors = {
    1: '#8B5CF6',
    2: '#3B82F6',
    3: '#10B981',
    4: '#EF4444'
};

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
        console.warn('localStorage no disponible, usando valor por defecto para', key);
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

// ===== SISTEMA DE SONIDO =====
function playSound(type) {
    const alwaysPlay = ['correct', 'incorrect', 'levelup', 'levelstart', 'achievement', 'powerup'];
    if (!alwaysPlay.includes(type) && state.mode === 'normal') return;
    if (window.effectsManager) {
        window.effectsManager.playSound(type);
    }
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    loadUnlockedLevels();
    setupSplashScreen();
    loadBadges();
    loadLeaderboard();
    setupPowerups();
    createSpeedBonusToast();
    updateLevelStatusDisplay();
    if (typeof injectRabbitSVGs === 'function') injectRabbitSVGs();
});

// ===== SISTEMA DE NIVELES BLOQUEADOS =====

function loadUnlockedLevels() {
    const saved = safeLocalGet('paes_unlocked_levels', null);
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            state.unlockedLevels = { ...state.unlockedLevels, ...parsed };
        } catch (e) {
            console.warn('No se pudo leer niveles desbloqueados, usando valores por defecto.');
        }
    }
}

function saveUnlockedLevels() {
    safeLocalSet('paes_unlocked_levels', JSON.stringify(state.unlockedLevels));
}

function unlockNextLevel(currentLevel) {
    const nextLevel = currentLevel + 1;
    if (nextLevel <= 4 && !state.unlockedLevels[nextLevel]) {
        state.unlockedLevels[nextLevel] = true;
        saveUnlockedLevels();
        updateLevelStatusDisplay();
        console.log('🔓 Nivel ' + nextLevel + ' desbloqueado.');
    }
}

function updateLevelStatusDisplay() {
    for (let i = 2; i <= 4; i++) {
        const statusEl = document.getElementById('status-level-' + i);
        if (statusEl) {
            if (state.unlockedLevels[i]) {
                statusEl.textContent = '✅ Disponible';
                statusEl.style.color = '#10B981';
            } else {
                statusEl.textContent = '🔒 Bloqueado';
                statusEl.style.color = '#94A3B8';
            }
        }
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

function triggerVisualCoinsFromElement(element, count = 12) {
    if (window.effectsManager) {
        window.effectsManager.triggerCoinExplosionFromElement(element, count);
    }
}

function setupSplashScreen() {
    const splashScreen = document.getElementById('splash-screen');
    setTimeout(() => {
        if (splashScreen && !splashScreen.classList.contains('hidden')) {
            console.warn('⏰ Fallback: Splash screen ocultado por timeout de seguridad (60s).');
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
    if (screenId === 'screen-welcome') updateLevelStatusDisplay();
    if (typeof injectRabbitSVGs === 'function') setTimeout(injectRabbitSVGs, 50);
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
    if (window.effectsManager) window.effectsManager.ensureAudio();
    state.score = 0; state.levelScore = 0; state.lives = 3; state.streak = 0; state.maxStreak = 0;
    state.currentQuestion = 0; state.currentLevel = 1; state.answeredCorrectly = {}; state.topicScores = {};
    state.isFrozen = false; state.powerupsUsedThisLevel = false; state.levelPerfect = true;
    state.levelStars = {};
    if (state._freezeTimeout) clearTimeout(state._freezeTimeout);
    state._freezeTimeout = null;
    document.body.className = 'level-1';
    startLevel(1);
}

function startLevel(levelNum) {
    if (!state.unlockedLevels[levelNum]) {
        console.warn('Nivel ' + levelNum + ' bloqueado. No se puede iniciar.');
        return;
    }
    
    state.currentLevel = levelNum; state.currentQuestion = 0; state.lives = 3; state.streak = 0;
    state.levelScore = 0; state.isFrozen = false; state.powerupsUsedThisLevel = false; state.levelPerfect = true;
    state.bonusQuestionActive = false; state.correctInLevel = 0;
    if (state._freezeTimeout) clearTimeout(state._freezeTimeout);
    state._freezeTimeout = null;
    
    document.body.className = `level-${levelNum}`;
    
    const rawQuestions = levelQuestionsMap[levelNum] || paesLenguajeQuestions;
    state.questions = shuffleArray(deepCloneQuestions(rawQuestions)).slice(0, 10);
    
    if (Math.random() < 0.33 && levelNum >= 2) {
        const bonusIndex = Math.floor(Math.random() * state.questions.length);
        state.questions[bonusIndex].isBonus = true;
        state.questions[bonusIndex].originalPoints = state.questions[bonusIndex].points;
        state.questions[bonusIndex].points = state.questions[bonusIndex].points * 2;
        state.bonusQuestionActive = true;
    }
    
    state.totalQuestions = state.questions.length;
    updatePowerupButtons();
    updateLevelDisplay(); updateScore(); updateLives(); updateStreak(); updateProgress();
    showScreen('screen-question');
    updateRabbitReaction('thinking');
    playSound('levelstart');
    loadQuestion();
}

function goToNextLevel() {
    const nextLevel = state.currentLevel + 1;
    if (nextLevel <= 4 && state.unlockedLevels[nextLevel]) {
        startLevel(nextLevel);
    } else if (nextLevel > 4) {
        showFinalResults();
    } else {
        console.warn('Nivel ' + nextLevel + ' bloqueado.');
        showScreen('screen-welcome');
    }
}

function updateLevelDisplay() {
    const ld = document.getElementById('level-display');
    if (!ld) return;
    ld.textContent = `Nivel ${state.currentLevel}`;
    ld.style.background = levelColors[state.currentLevel] || '#8B5CF6';
}

function shuffleArray(array) { const arr = [...array]; for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; } return arr; }

// ===== REACCIONES DEL CONEJO (Textos adaptados para PAES Challenge) =====
function updateRabbitReaction(reaction) {
    document.querySelectorAll('.rabbit-svg').forEach(rabbit => {
        rabbit.className = 'rabbit-svg';
        void rabbit.offsetWidth;
        rabbit.className = 'rabbit-svg ' + reaction;
    });
    
    const speech = document.getElementById('question-speech');
    const messages = {
        'thinking': [
            '¡Piensa bien tu respuesta! 🤔', 'Tú puedes lograrlo 💪', 'Analiza con cuidado 📖',
            'Confío en tu razonamiento 🧠', 'Lee cada opción con atención 👀',
            '¿Cuál será la correcta? 🤓', 'Tómate tu tiempo ⏳', 'Confía en lo que sabes 📚'
        ],
        'nervous': [
            '¡El tiempo se acaba! ⏰', '¡Rápido, confía en ti! 😰', '¡No te congeles! ❄️',
            '¡Elige ya, tú sabes! ⚡', '¡Últimos segundos! 🚨', '¡Vamos, no te detengas! 🏃'
        ],
        'bored': [
            '¡Despierta, futuro universitario! ☕', '¡Vamos, tú puedes! 😴', '¡No te duermas! 💤',
            '¡Espabila esa mente! 🧃', '¡Que no decaiga el ánimo! 🎈', '¿Necesitas un café virtual? ☕✨'
        ],
        'impressed': [
            '¡Impresionante racha! 🤩', '¡Eres increíble! 🌟', '¡Qué genio! 🧠',
            '¡Nadie te para hoy! 🔥', '¡Estás arrasando! 💥', '¡Eres una máquina! ⚙️💨',
            '¡Vas directo a la universidad! 🎓✨'
        ],
        'celebrating': [
            '¡Perfecto, nivel impecable! 🥳', '¡Orgullo PAES! 🎉',
            '¡Nivel superado con honores! 🏆', '¡Así se hace, crack! 🌟',
            '¡Cada vez más cerca de la cima! ⛰️', '¡Qué satisfacción da aprender! 🎓✨'
        ],
        'deep-think': [
            '¡Nivel experto activado! 🔬', '¡Piensa profundamente! 🧐', '¡Confía en tus cálculos! 📐',
            'Esto es para mentes brillantes 💡', '¡Activa tu modo calculadora! 🧮', 'Los números no mienten 🔢'
        ],
        'confident': [
            '¡Eliminamos dos, ahora es fácil! 😎', '¡El 50/50 te respalda! ✨',
            '¡Tú tienes el control! 🕶️', '¡Camino despejado hacia el éxito! 🛤️',
            '¡Ahora solo quedan las buenas! ✅', '¡Con esta ayuda es pan comido! 🍞'
        ],
        'frozen': [
            '¡Tiempo congelado! 🥶', '¡Relájate y piensa tranquilo! ❄️', '¡Sin prisa, el reloj se detuvo! ⛄',
            '¡Respira hondo, tienes tiempo! 🌬️', '¡Aprovecha estos segundos extra! ⏸️', '¡El frío te da claridad mental! 🧊'
        ],
        'determined': [
            '¡Ahora sí, con todo! 😤', '¡Esta no la fallo! 💪🔥', '¡Con más ganas que nunca! 🦾',
            '¡A corregir el rumbo! 🧭', '¡El error me hizo más fuerte! ⚡', '¡Voy con todo en esta! 🎯',
            'Cada error es una lección aprendida 📚', '¡Los genios también se equivocan y aprenden! 🧠💡'
        ],
        'graduate': [
            '¡Lo lograste, futuro universitario! 🎓', '¡Graduado con honores PAES! 🏅',
            '¡Tu futuro es brillante! 👨‍🎓✨', '¡La universidad te espera! 🎓🌟',
            '¡De estudiante a UNIVERSITARIO! 🧠👑', '¡Hoy celebras tu conocimiento! 🎉📚'
        ],
        'correct': [
            '¡Respuesta correcta! ✨', '¡Bien hecho! 🌟', '¡Así se hace! 💪',
            '¡Esa es la actitud! 🎯', '¡Vas por buen camino! 🛤️'
        ],
        'incorrect': [
            '¡No era esa, pero no pasa nada! 💪', '¡Aprender es equivocarse! 📚',
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
    
    const qText = document.getElementById('question-text');
    if (qText) qText.textContent = question.question;
    
    if (state.currentLevel === 3 || state.currentLevel === 4) updateRabbitReaction('deep-think');
    else updateRabbitReaction('thinking');
    
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
    
    shuffledIndices.forEach((originalIndex) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        if (question.isBonus) btn.classList.add('bonus-question');
        btn.textContent = question.options[originalIndex];
        btn.dataset.originalIndex = originalIndex;
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
        const div = document.createElement('div'); div.className = 'matching-item'; div.textContent = item.text;
        div.dataset.pairId = item.id; div.dataset.side = 'left';
        div.addEventListener('click', function() {
            if (this.classList.contains('matched')) return;
            if (window.effectsManager) window.effectsManager.ensureAudio();
            document.querySelectorAll('.matching-item[data-side="left"]').forEach(el => { if (!el.classList.contains('matched')) el.classList.remove('selected'); });
            this.classList.add('selected'); selectedLeft = this;
        });
        matchingContainer.appendChild(div);
    });
    
    rightItems.forEach(item => {
        const div = document.createElement('div'); div.className = 'matching-item'; div.textContent = item.text;
        div.dataset.pairId = item.id; div.dataset.side = 'right';
        div.addEventListener('click', function() {
            if (this.classList.contains('matched')) return;
            if (window.effectsManager) window.effectsManager.ensureAudio();
            if (selectedLeft && !this.classList.contains('matched')) {
                if (selectedLeft.dataset.pairId === this.dataset.pairId) {
                    selectedLeft.classList.add('matched'); this.classList.add('matched');
                    matches[this.dataset.pairId] = true; selectedLeft = null;
                    if (Object.keys(matches).length === question.pairs.length) {
                        clearInterval(state.timerInterval);
                        state.timerInterval = null;
                        showFeedback(`¡Perfecto! ${question.explanation || 'Emparejaste todos los conceptos correctamente.'}`, 'correct');
                        triggerVisualCoinsFromElement(matchingContainer, 16);
                        handleCorrectAnswer(question.points);
                    }
                } else {
                    const leftEl = selectedLeft;
                    leftEl.style.borderColor = 'var(--rojo-alerta)'; this.style.borderColor = 'var(--rojo-alerta)';
                    setTimeout(() => { leftEl.style.borderColor = '#CBD5E1'; this.style.borderColor = '#CBD5E1'; leftEl.classList.remove('selected'); }, 500);
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
    
    const valueDisplay = document.createElement('div'); valueDisplay.className = 'slider-value';
    valueDisplay.textContent = question.min; valueDisplay.id = 'slider-value-display';
    
    const track = document.createElement('div'); track.className = 'slider-track';
    const fill = document.createElement('div'); fill.className = 'slider-fill'; fill.style.width = '0%';
    
    const input = document.createElement('input'); input.type = 'range'; input.className = 'slider-input';
    input.min = question.min; input.max = question.max; input.step = '0.1'; input.value = question.min;
    
    input.addEventListener('input', () => {
        fill.style.width = `${((input.value - question.min) / (question.max - question.min)) * 100}%`;
        valueDisplay.textContent = input.value;
    });
    
    track.appendChild(fill); track.appendChild(input);
    
    const submitBtn = document.createElement('button'); submitBtn.className = 'main-btn';
    submitBtn.textContent = 'Confirmar Respuesta ✅';
    submitBtn.addEventListener('click', () => {
        if (window.effectsManager) window.effectsManager.ensureAudio();
        clearInterval(state.timerInterval);
        state.timerInterval = null;
        const userAnswer = parseFloat(input.value);
        if (Math.abs(userAnswer - question.correctAnswer) <= question.tolerance) {
            showFeedback(`¡Correcto! ${question.explanation}`, 'correct');
            triggerVisualCoinsFromElement(submitBtn, 14);
            handleCorrectAnswer(question.points);
        } else {
            showFeedback(`Incorrecto. ${question.explanation}`, 'incorrect');
            handleIncorrectAnswer(question);
        }
    });
    
    sliderContainer.appendChild(valueDisplay); sliderContainer.appendChild(track); sliderContainer.appendChild(submitBtn);
}

function loadDrag(question) {
    const dragContainer = document.getElementById('drag-container');
    if (!dragContainer) return;
    dragContainer.style.display = 'flex';
    
    question.items.forEach((item, index) => {
        const dropZone = document.createElement('div'); dropZone.className = 'drop-zone';
        dropZone.textContent = `${index + 1}. Soltar aquí`; dropZone.dataset.index = index;
        dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('drag-over'); });
        dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
        dropZone.addEventListener('drop', (e) => {
            if (window.effectsManager) window.effectsManager.ensureAudio();
            e.preventDefault(); dropZone.classList.remove('drag-over');
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
        const draggable = document.createElement('div'); draggable.className = 'draggable-item';
        draggable.textContent = item; draggable.draggable = true;
        draggable.dataset.originalIndex = question.items.indexOf(item);
        draggable.addEventListener('dragstart', (e) => { e.dataTransfer.setData('text/plain', draggable.dataset.originalIndex); draggable.style.opacity = '0.5'; });
        draggable.addEventListener('dragend', () => { draggable.style.opacity = '1'; });
        enableTouchDragForItem(draggable, question);
        itemsContainer.appendChild(draggable);
    });
    
    dragContainer.appendChild(itemsContainer);
}

function enableTouchDragForItem(draggable, question) {
    draggable.addEventListener('touchstart', () => {
        if (window.effectsManager) window.effectsManager.ensureAudio();
    }, { passive: true });

    draggable.addEventListener('touchmove', (e) => {
        if (draggable.style.pointerEvents === 'none') return;
        e.preventDefault();
        const touch = e.touches[0];
        document.querySelectorAll('.drop-zone').forEach(z => z.classList.remove('drag-over'));
        const el = document.elementFromPoint(touch.clientX, touch.clientY);
        const zone = el && el.closest ? el.closest('.drop-zone') : null;
        if (zone && !zone.dataset.filled) zone.classList.add('drag-over');
    }, { passive: false });

    draggable.addEventListener('touchend', (e) => {
        if (draggable.style.pointerEvents === 'none') return;
        const touch = e.changedTouches[0];
        const el = document.elementFromPoint(touch.clientX, touch.clientY);
        const zone = el && el.closest ? el.closest('.drop-zone') : null;
        document.querySelectorAll('.drop-zone').forEach(z => z.classList.remove('drag-over'));
        
        if (window.effectsManager) {
            window.effectsManager.playSound('coin');
        }
        
        if (zone && !zone.dataset.filled) {
            const index = parseInt(zone.dataset.index, 10);
            zone.textContent = `${index + 1}. ${question.items[draggable.dataset.originalIndex]}`;
            zone.dataset.filled = draggable.dataset.originalIndex;
            draggable.style.opacity = '0.3';
            draggable.style.pointerEvents = 'none';
            
            if (window.effectsManager) {
                const rect = zone.getBoundingClientRect();
                window.effectsManager.triggerExplosion(
                    rect.left + rect.width / 2,
                    rect.top + rect.height / 2,
                    0.5, '#93C5FD'
                );
            }
            
            checkDragComplete(question);
        }
    });
}

function checkDragComplete(question) {
    const dragContainer = document.getElementById('drag-container');
    const dropZones = document.querySelectorAll('.drop-zone');
    let allFilled = true, allCorrect = true;
    dropZones.forEach((zone, index) => {
        if (!zone.dataset.filled) allFilled = false;
        else if (parseInt(zone.dataset.filled) !== index) allCorrect = false;
    });
    if (allFilled) { 
        clearInterval(state.timerInterval);
        state.timerInterval = null;
        if (allCorrect) {
            showFeedback(`¡Excelente orden! ${question.explanation || ''}`, 'correct');
            triggerVisualCoinsFromElement(dragContainer, 16);
            handleCorrectAnswer(question.points); 
        } else {
            showFeedback(`Orden incorrecto. Revisa el flujo lógico.`, 'incorrect');
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
    options.forEach((btn, i) => { if (parseInt(btn.dataset.originalIndex) === originalIndex) clickedDisplayIndex = i; });
    
    const responseTime = (Date.now() - state.questionStartTime) / 1000;
    clearInterval(state.timerInterval);
    state.timerInterval = null;
    
    if (originalIndex === question.correct) {
        if (options[clickedDisplayIndex]) options[clickedDisplayIndex].classList.add('correct');
        let totalPoints = question.points;
        let coinCount = 12;
        
        if (responseTime < 3) {
            const speedBonus = Math.round(question.points * 0.5);
            totalPoints += speedBonus;
            coinCount += 8;
            showSpeedBonus(speedBonus);
        }
        
        if (options[clickedDisplayIndex]) {
            triggerVisualCoinsFromElement(options[clickedDisplayIndex], coinCount);
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
    
    updateScore(); updateStreak();
    
    playSound('correct');
    if (window.effectsManager) window.effectsManager.triggerConfetti();
    
    const responseTime = (Date.now() - state.questionStartTime) / 1000;
    if (responseTime < 3 && window.effectsManager) {
        window.effectsManager.triggerScreenFlash(180);
    }
    
    updateRabbitReaction('correct');
    if (state.streak >= 5) {
        document.getElementById('streak-display')?.classList.add('on-fire');
        if (window.effectsManager) window.effectsManager.triggerCoinRain();
        setTimeout(() => updateRabbitReaction('impressed'), 350);
    } else if (state.streak >= 3) {
        if (window.effectsManager) window.effectsManager.triggerCoinRain();
        setTimeout(() => updateRabbitReaction('impressed'), 350);
    }
    
    const btnNext = document.getElementById('btn-next');
    if (btnNext) btnNext.style.display = 'block';
    checkBadges();
}

function handleIncorrectAnswer(question) {
    if (state._boredTimeout) clearTimeout(state._boredTimeout);
    
    state.lives--; state.streak = 0; state.levelPerfect = false;
    document.getElementById('streak-display')?.classList.remove('on-fire');
    
    if (question && question.topic) {
        if (!state.topicScores[question.topic]) state.topicScores[question.topic] = { correct: 0, total: 0 };
        state.topicScores[question.topic].total++;
    }
    
    updateLives(); updateStreak();
    
    playSound('incorrect');
    
    updateRabbitReaction('incorrect');
    if (state.lives <= 0) {
        setTimeout(() => updateRabbitReaction('determined'), 350);
        setTimeout(() => endLevel(), 1500);
    } else {
        setTimeout(() => updateRabbitReaction('determined'), 350);
    }
    
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
    
    unlockNextLevel(state.currentLevel);
    
    if (state.levelPerfect && state.lives === 3 && !state.badges.perfectScore) {
        state.badges.perfectScore = true;
        playSound('achievement');
        if (window.effectsManager) window.effectsManager.triggerFireworks();
        setTimeout(() => {
            if (window.effectsManager) window.effectsManager.triggerToast('¡Nueva insignia: Puntaje Perfecto!', { icon: '💯', bg: 'linear-gradient(135deg, #FFD700, #FFA500)', duration: 3500 });
        }, 300);
        saveBadges();
    }
    if (state.lives === 3 && !state.badges.survivor) {
        state.badges.survivor = true;
        playSound('achievement');
        if (window.effectsManager) window.effectsManager.triggerFireworks();
        setTimeout(() => {
            if (window.effectsManager) window.effectsManager.triggerToast('¡Nueva insignia: Sobreviviente!', { icon: '🛡️', bg: 'linear-gradient(135deg, #10B981, #059669)', duration: 3500 });
        }, 300);
        saveBadges();
    }
    if (!state.powerupsUsedThisLevel && !state.badges.noPowerups) {
        state.badges.noPowerups = true;
        playSound('achievement');
        if (window.effectsManager) window.effectsManager.triggerFireworks();
        setTimeout(() => {
            if (window.effectsManager) window.effectsManager.triggerToast('¡Nueva insignia: Poder Natural!', { icon: '💪', bg: 'linear-gradient(135deg, #8B5CF6, #6D28D9)', duration: 3500 });
        }, 300);
        saveBadges();
    }
    
    if (state.currentLevel < 4) {
        const transTitle = document.getElementById('transition-title');
        const transSpeech = document.getElementById('transition-speech');
        const lvlScoreDisp = document.getElementById('level-score-display');
        
        if (transTitle) transTitle.textContent = `${levelNames[state.currentLevel]} Completado`;
        if (transSpeech) transSpeech.textContent = `¡Excelente! ${levelNames[state.currentLevel]} superado 🎉`;
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
        
        updateRabbitReaction(state.levelPerfect ? 'celebrating' : 'thinking');
        showScreen('screen-level-transition');
        playSound('levelup');
        if (window.effectsManager) window.effectsManager.triggerFireworks();
        
        if (window.effectsManager) {
            window.effectsManager.triggerConfetti(2000, 2);
            setTimeout(() => {
                if (window.effectsManager) window.effectsManager.triggerConfetti(1500, 1.5);
            }, 800);
        }
    } else {
        updateRabbitReaction('graduate');
        showFinalResults();
        playSound('levelup');
        if (window.effectsManager) window.effectsManager.triggerFireworks();
    }
}

function showFinalResults() {
    const finalScore = document.getElementById('final-score');
    if (finalScore) finalScore.textContent = state.score;
    
    const topicAnalysis = document.getElementById('topic-analysis');
    if (topicAnalysis) {
        topicAnalysis.innerHTML = '';
        
        const topicNames = {
            'numeros': 'Números y Operaciones',
            'algebra': 'Álgebra y Funciones',
            'geometria': 'Geometría',
            'probabilidad': 'Probabilidad',
            'estadistica': 'Estadística',
            'matematica-financiera': 'Matemática Financiera',
            'localizar': 'Competencia Lectora: Localizar',
            'interpretar': 'Competencia Lectora: Interpretar',
            'evaluar': 'Competencia Lectora: Evaluar'
        };
        
        const topicColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#6366F1', '#14B8A6', '#F97316'];
        let colorIndex = 0;
        
        for (const [topic, scores] of Object.entries(state.topicScores)) {
            const percentage = scores.total > 0 ? Math.round((scores.correct / scores.total) * 100) : 0;
            const bar = document.createElement('div'); bar.className = 'topic-bar';
            bar.innerHTML = `<span class="topic-label">${topicNames[topic] || topic}</span><div class="topic-progress"><div class="topic-fill" style="width:${percentage}%;background:${topicColors[colorIndex]}"></div></div><span class="topic-score">${percentage}%</span>`;
            topicAnalysis.appendChild(bar);
            colorIndex = (colorIndex + 1) % topicColors.length;
        }
    }
    
    const shareBadges = document.getElementById('share-badges');
    if (shareBadges) {
        shareBadges.innerHTML = '';
        for (const [badge, unlocked] of Object.entries(state.badges)) {
            if (unlocked) {
                const badgeEl = document.createElement('span'); badgeEl.className = 'share-badge';
                badgeEl.textContent = getBadgeIcon(badge);
                shareBadges.appendChild(badgeEl);
            }
        }
    }
    
    const speech = document.getElementById('result-character-speech');
    if (speech) {
        if (state.score >= 7000) speech.textContent = '¡Rendimiento excepcional! ¡La universidad te espera! 🎓✨';
        else if (state.score >= 5000) speech.textContent = '¡Excelente resultado! Vas por muy buen camino. 👏🎓';
        else if (state.score >= 3000) speech.textContent = '¡Buen esfuerzo! Sigue practicando. 📚💪';
        else speech.textContent = '¡El aprendizaje es un camino diario! 💡📖';
    }
    
    showScreen('screen-results');
    if (window.effectsManager) window.effectsManager.triggerFireworks();
    saveToLeaderboard();
}

function restartGame() {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
    if (state._freezeTimeout) clearTimeout(state._freezeTimeout);
    state._freezeTimeout = null;
    state.isFrozen = false;
    state.currentQuestion = 0; state.score = 0; state.levelScore = 0; state.lives = 3;
    state.streak = 0; state.currentLevel = 1; state.powerupsUsedThisLevel = false; state.levelPerfect = true;
    state.levelStars = {}; state.bonusQuestionActive = false; state.correctInLevel = 0;
    document.body.className = 'level-1';
    document.getElementById('streak-display')?.classList.remove('on-fire');
    updateScore(); updateLives(); updateStreak(); updateProgress(); updateLevelDisplay();
    startGame();
}

function goToFinalScreen() {
    updateRabbitReaction('graduate');
    showScreen('screen-final');
    if (window.effectsManager) window.effectsManager.triggerFireworks();
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
        case 'fifty': applyFiftyFifty(); updateRabbitReaction('confident'); break;
        case 'time': if (state.mode === 'timed') { state.timer += 15; updateTimerDisplay(); } break;
        case 'freeze': 
            if (state._freezeTimeout) clearTimeout(state._freezeTimeout);
            state.isFrozen = true; 
            updateRabbitReaction('frozen');
            const td = document.getElementById('timer-display');
            if (td) td.style.backgroundColor = '#10B981';
            state._freezeTimeout = setTimeout(() => { 
                state.isFrozen = false; 
                state._freezeTimeout = null;
                updateRabbitReaction('thinking'); 
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
    
    const hintText = question.hint
        ? question.hint
        : (question.explanation
            ? question.explanation.split('.')[0] + '.'
            : 'Analiza cada opción con calma, ¡tú puedes lograrlo!');
    
    fb.textContent = `💡 Pista: ${hintText}`;
    fb.className = 'feedback-box correct';
}

// ===== TEMPORIZADOR =====
function startTimer() {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
    
    if (state.currentLevel === 1) state.timer = 60; // Lenguaje: más tiempo por textos largos
    else if (state.currentLevel === 2) state.timer = 45; // M1
    else if (state.currentLevel === 3) state.timer = 35; // M2
    else state.timer = 40; // Mixto
    
    updateTimerDisplay();
    const timerDisplay = document.getElementById('timer-display');
    if (timerDisplay) timerDisplay.classList.remove('warning');
    
    state.timerInterval = setInterval(() => {
        if (state.isFrozen) return;
        state.timer--;
        updateTimerDisplay();
        
        if (state.timer <= 10 && state.timer > 0) {
            if (timerDisplay) timerDisplay.classList.add('warning');
            updateRabbitReaction('nervous');
            if (window.effectsManager) {
                window.effectsManager.playTick();
            }
        }
        if (state.timer <= 0) {
            clearInterval(state.timerInterval);
            state.timerInterval = null;
            if (timerDisplay) timerDisplay.classList.remove('warning');
            
            if (window.effectsManager) {
                window.effectsManager.playIncorrectFallback();
            }
            
            showFeedback(`¡Tiempo agotado! ${state.questions[state.currentQuestion].explanation}`, 'incorrect');
            handleIncorrectAnswer(state.questions[state.currentQuestion]);
        }
    }, 1000);
    
    state._boredTimeout = setTimeout(() => {
        const nextBtn = document.getElementById('btn-next');
        if (state.currentQuestion < state.totalQuestions && (!nextBtn || nextBtn.style.display === 'none')) {
            updateRabbitReaction('bored');
        }
    }, 20000); // Más tolerancia para textos largos
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
    
    if (window.effectsManager && typeof window.effectsManager.triggerScoreBadgeFlash === 'function') {
        window.effectsManager.triggerScoreBadgeFlash();
    }
}

function updateLives() {
    const display = document.getElementById('lives-display');
    if (!display) return;
    let hearts = '';
    for (let i = 0; i < 3; i++) hearts += i < state.lives ? '❤️' : '🖤';
    display.textContent = hearts;
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
        if (window.effectsManager) window.effectsManager.triggerFireworks();
        setTimeout(() => {
            if (window.effectsManager) window.effectsManager.triggerToast('¡Nueva insignia: PAES Pro!', { icon: '🏆', bg: 'linear-gradient(135deg, #F59E0B, #D97706)', duration: 3500 });
        }, 300);
        saveBadges();
    }
    if (state.streak >= 5 && !state.badges.streaker) {
        state.badges.streaker = true;
        playSound('achievement');
        if (window.effectsManager) window.effectsManager.triggerFireworks();
        setTimeout(() => {
            if (window.effectsManager) window.effectsManager.triggerToast('¡Nueva insignia: Rachador!', { icon: '🔥', bg: 'linear-gradient(135deg, #EF4444, #DC2626)', duration: 3500 });
        }, 300);
        saveBadges();
    }
    if (state.mode === 'timed' && (Date.now() - state.questionStartTime) < 3000 && !state.badges.speedDemon) {
        state.badges.speedDemon = true;
        playSound('achievement');
        if (window.effectsManager) window.effectsManager.triggerFireworks();
        setTimeout(() => {
            if (window.effectsManager) window.effectsManager.triggerToast('¡Nueva insignia: Velocista!', { icon: '⚡', bg: 'linear-gradient(135deg, #3B82F6, #1D4ED8)', duration: 3500 });
        }, 300);
        saveBadges();
    }
}

function getBadgeIcon(badge) {
    const icons = { perfectScore: '💯', speedDemon: '⚡', survivor: '🛡️', streaker: '🔥', paesPro: '🏆', noPowerups: '💪' };
    return icons[badge] || '🏅';
}

function getBadgeName(badge) {
    const names = { perfectScore: 'Puntaje Perfecto', speedDemon: 'Velocista', survivor: 'Sobreviviente', streaker: 'Rachador', paesPro: 'PAES Pro', noPowerups: 'Poder Natural' };
    return names[badge] || badge;
}

function loadBadges() {
    const saved = safeLocalGet('paes_badges', null);
    if (saved) {
        try {
            state.badges = { ...state.badges, ...JSON.parse(saved) };
        } catch (e) {
            console.warn('No se pudo leer paes_badges guardado, se ignora.');
        }
    }
    const grid = document.getElementById('badges-grid');
    if (!grid) return;
    grid.innerHTML = '';
    for (const [badge, unlocked] of Object.entries(state.badges)) {
        const el = document.createElement('div'); el.className = `badge-item ${unlocked ? 'unlocked' : ''}`;
        el.innerHTML = `<div class="badge-icon">${getBadgeIcon(badge)}</div><div class="badge-name">${getBadgeName(badge)}</div>`;
        grid.appendChild(el);
    }
}

function saveBadges() {
    safeLocalSet('paes_badges', JSON.stringify(state.badges));
}

// ===== LEADERBOARD =====

function showNamePromptModal(onSubmit) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed; inset: 0; background: rgba(15, 23, 42, 0.55);
        z-index: 3000; display: flex; align-items: center; justify-content: center;
        font-family: 'Poppins', sans-serif; padding: 20px; box-sizing: border-box;
    `;

    const box = document.createElement('div');
    box.style.cssText = `
        background: white; padding: 26px 24px; border-radius: 18px;
        max-width: 340px; width: 100%; text-align: center;
        box-shadow: 0 20px 50px rgba(0,0,0,0.32);
    `;
    box.innerHTML = `
        <div style="font-weight:800;font-size:1.15rem;margin-bottom:8px;color:#1E293B;">¡Buen trabajo! 🎉</div>
        <div style="margin-bottom:16px;color:#64748B;font-size:0.9rem;">Ingresa tu nombre para el ranking</div>
        <input id="paes-name-input" type="text" maxlength="20" placeholder="Jugador"
            style="width:100%;padding:11px 14px;border-radius:10px;border:1.5px solid #CBD5E1;
                   margin-bottom:16px;font-family:inherit;font-size:1rem;box-sizing:border-box;outline:none;">
        <div style="display:flex;gap:10px;justify-content:center;">
            <button id="paes-name-skip" style="flex:1;padding:11px 0;border-radius:10px;border:none;
                background:#E2E8F0;color:#334155;font-weight:700;cursor:pointer;font-family:inherit;">Omitir</button>
            <button id="paes-name-ok" style="flex:1;padding:11px 0;border-radius:10px;border:none;
                background:linear-gradient(135deg, #2563EB, #1D4ED8);color:white;font-weight:700;
                cursor:pointer;font-family:inherit;">Guardar</button>
        </div>
    `;
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    const input = box.querySelector('#paes-name-input');
    input.focus();

    const close = (value) => {
        overlay.remove();
        onSubmit(value);
    };

    box.querySelector('#paes-name-ok').addEventListener('click', () => close(input.value.trim() || 'Jugador'));
    box.querySelector('#paes-name-skip').addEventListener('click', () => close(null));
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') close(input.value.trim() || 'Jugador');
    });
    
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            close(null);
            document.removeEventListener('keydown', escapeHandler);
        }
    });
}

function saveToLeaderboard() {
    showNamePromptModal((playerName) => {
        if (!playerName) return;
        const leaderboard = JSON.parse(safeLocalGet('paes_leaderboard', '[]'));
        leaderboard.push({ name: playerName, score: state.score, badges: Object.values(state.badges).filter(Boolean).length, date: new Date().toLocaleDateString() });
        leaderboard.sort((a, b) => b.score - a.score);
        safeLocalSet('paes_leaderboard', JSON.stringify(leaderboard.slice(0, 20)));
        loadLeaderboard();
    });
}

function loadLeaderboard() {
    let leaderboard = [];
    try {
        leaderboard = JSON.parse(safeLocalGet('paes_leaderboard', '[]'));
    } catch (e) {
        console.warn('No se pudo leer paes_leaderboard guardado, se ignora.');
    }
    const tbody = document.getElementById('leaderboard-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    leaderboard.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td class="${index < 3 ? `rank-${index+1}` : ''}">${index+1}</td><td>${entry.name}</td><td>${entry.score} pts</td><td>${'🏅'.repeat(entry.badges)}</td>`;
        tbody.appendChild(row);
    });
}

// ===== COMPARTIR =====
function shareResults() {
    const text = `🎓 ¡Acabo de conseguir ${state.score} puntos en PAES Challenge! ¿Puedes superarme? 🏆`;
    if (navigator.share) {
        navigator.share({ title: 'PAES Challenge', text, url: window.location.href }).catch(() => {});
    } else {
        navigator.clipboard.writeText(text).then(() => {
            if (window.effectsManager) {
                window.effectsManager.triggerToast('¡Copiado! Compártelo donde quieras.', { icon: '📋', duration: 2500 });
            }
        }).catch(() => {
            if (window.effectsManager) {
                window.effectsManager.triggerToast('No se pudo copiar automáticamente.', { icon: '⚠️', duration: 2500 });
            }
        });
    }
}

// ContiGame Engine adaptado a PAES Challenge v1.0.0
