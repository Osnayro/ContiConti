/**
 * ============================================================
 * PAES CHALLENGE — BANCO DE COMPETENCIA MATEMÁTICA 1 (M1)
 * 100 preguntas alineadas al temario DEMRE
 * Ejes: Números, Álgebra y Funciones, Geometría, Probabilidad y Estadística
 * ============================================================
 */

const paesM1Questions = [
  // ================================================================
  // EJE: NÚMEROS (30 PREGUNTAS)
  // ================================================================
  {
    id: 2001, topic: 'numeros', type: 'multiple',
    question: 'En un juego hay dos tipos de cartas: unas con estrella y otras con corazón, todas con un número. El puntaje se calcula partiendo con una carta inicial. Luego, si la carta tiene estrella se resta su valor, y si tiene corazón se suma. Un jugador extrae las siguientes cartas en orden:\n\nCarta inicial: 10 (estrella)\nCarta 2: 6 (corazón)\nCarta 3: 3 (estrella)\nCarta 4: 9 (corazón)\nCarta 5: 10 (estrella)\nCarta 6: 5 (corazón)\nCarta 7: 8 (estrella)\nCarta 8: 2 (corazón)\nCarta 9: 10 (estrella)\nCarta 10: 7 (corazón)\n\n¿Cuál es el puntaje final del jugador?',
    options: ['-14', '-4', '3', '11'],
    correct: 1,
    explanation: 'Puntaje inicial: 10. Luego: +6 -3 +9 -10 +5 -8 +2 -10 +7 = -4.',
    hint: 'Ve sumando y restando según el símbolo de cada carta en el orden dado.',
    points: 100
  },
  {
    id: 2002, topic: 'numeros', type: 'multiple',
    question: 'Para preparar una receta se necesitan 700 g de carne picada, 1 kg de champiñones y 2 cebollas. Los precios son: 100 g de carne = $900, 0,5 kg de champiñones = $3500, 1 cebolla = $200. ¿Cuánto dinero se necesita para comprar los ingredientes?',
    options: ['$4.600', '$8.100', '$10.000', '$13.700'],
    correct: 3,
    explanation: 'Carne: 7 × $900 = $6.300. Champiñones: 2 × $3.500 = $7.000. Cebollas: 2 × $200 = $400. Total = $13.700.',
    hint: 'Calcula por separado el costo de cada ingrediente según la cantidad necesaria.',
    points: 100
  },
  {
    id: 2003, topic: 'numeros', type: 'multiple',
    question: 'Un auto recorre 5 km de A a B y 25 km de B a C. Rinde 10 km por litro. ¿Cuántos litros necesita para ir de A a C, ida y vuelta, pasando por B?',
    options: ['2', '3', '4', '6'],
    correct: 3,
    explanation: 'Distancia ida A→C = 30 km. Ida y vuelta = 60 km. Consumo = 60 / 10 = 6 litros.',
    hint: 'Calcula la distancia total y divídela por el rendimiento.',
    points: 100
  },
  {
    id: 2004, topic: 'numeros', type: 'multiple',
    question: '¿Cuál es el número cuya tercera parte es 0,09?',
    options: ['2,7', '0,3', '0,27', '0,03'],
    correct: 2,
    explanation: 'x/3 = 0,09 → x = 0,09 × 3 = 0,27.',
    hint: 'Multiplica 0,09 por 3 para encontrar el número original.',
    points: 100
  },
  {
    id: 2005, topic: 'numeros', type: 'multiple',
    question: 'Para resolver - (4/6 × -8/12) + (2/30 + 2/60 - 4/10), una persona realiza un procedimiento en 4 pasos. Paso 2: desarrolla el primer paréntesis obteniendo 1. ¿En cuál paso cometió el error?',
    options: ['Paso 1', 'Paso 2', 'Paso 3', 'Paso 4'],
    correct: 1,
    explanation: '-(4/6 × -8/12) = -(-32/72) = 32/72 = 4/9, no 1. El error está en el Paso 2.',
    hint: 'Calcula correctamente el producto dentro del primer paréntesis.',
    points: 150
  },
  {
    id: 2006, topic: 'numeros', type: 'multiple',
    question: 'Una escalera tiene 20 peldaños entre piso y piso, cada uno de 15 cm de altura. Si n es la cantidad de peldaños subidos, ¿qué condición garantiza que la persona llegó a un nuevo piso?',
    options: ['15n es divisible por 20', '15+n es divisible por 20', '15·n es divisible por 300', '15+n es divisible por 300'],
    correct: 2,
    explanation: 'Altura por peldaño = 15 cm. Un piso = 20 × 15 = 300 cm. Para completar pisos enteros, 15n debe ser múltiplo de 300.',
    hint: 'Calcula la altura total de un piso y relaciónala con la altura acumulada.',
    points: 150
  },
  {
    id: 2007, topic: 'numeros', type: 'multiple',
    question: 'Una calculadora tiene botones para marcar dos ceros (00) o tres ceros (000). ¿Cuál acción permite marcar el número 10¹⁰?',
    options: ['1 y siete veces 000', '1 y ocho veces 00', '1, dos veces 000 y dos veces 00', '1, tres veces 000 y una vez 00'],
    correct: 2,
    explanation: '10¹⁰ = 1 seguido de 10 ceros. Dos veces 000 = 6 ceros, dos veces 00 = 4 ceros. Total = 10 ceros.',
    hint: 'Cuenta cuántos ceros agrega cada combinación de botones.',
    points: 100
  },
  {
    id: 2008, topic: 'numeros', type: 'multiple',
    question: 'Una persona factoriza 12+20. Paso 4: factoriza obteniendo 2⁴(3+5). ¿En cuál paso cometió el error?',
    options: ['Paso 1', 'Paso 2', 'Paso 3', 'Paso 4'],
    correct: 3,
    explanation: '2²·3 + 2²·5 = 2²(3+5), no 2⁴(3+5). El error está en el Paso 4.',
    hint: 'El factor común es 2², no 2⁴.',
    points: 150
  },
  {
    id: 2009, topic: 'numeros', type: 'multiple',
    question: 'Leonardo elige el número 2. Saca una tarjeta blanca: "Disminuye el número en cinco unidades" y una gris: "Multiplica el número tres veces por sí mismo". ¿Qué expresión aplica correctamente las instrucciones?',
    options: ['(2-5)³', '3·(2-5)', '3·(5-2)', '(5-2)³'],
    correct: 0,
    explanation: 'Primero: 2 - 5. Luego: elevar al cubo → (2-5)³.',
    hint: 'Aplica las operaciones en el orden en que se sacaron las tarjetas.',
    points: 100
  },
  {
    id: 2010, topic: 'numeros', type: 'multiple',
    question: 'Si p es el 25% de k, ¿qué expresión representa el valor de k?',
    options: ['p/25', 'p/75', '(100·p)/75', '(100·p)/25'],
    correct: 3,
    explanation: 'p = (25/100)·k → k = (100·p)/25.',
    hint: 'Despeja k de la ecuación de porcentaje.',
    points: 100
  },
  {
    id: 2011, topic: 'numeros', type: 'multiple',
    question: '¿Cuánto es el 75% del 75% de 100?',
    options: ['5625', '150', '56,25', '1,5'],
    correct: 2,
    explanation: '0,75 × 0,75 × 100 = 0,5625 × 100 = 56,25.',
    hint: 'Convierte los porcentajes a decimales y multiplica.',
    points: 100
  },
  {
    id: 2012, topic: 'numeros', type: 'multiple',
    question: 'En 2022, 3000 millones de personas jugaban videojuegos. En 2023 aumentó en 120 millones. ¿Cuál es el porcentaje de aumento?',
    options: ['2,5%', '4%', '25%', '40%'],
    correct: 1,
    explanation: '(120/3000) × 100 = 4%.',
    hint: 'Divide el aumento entre la cantidad base y multiplica por 100.',
    points: 100
  },
  {
    id: 2013, topic: 'numeros', type: 'multiple',
    question: 'En 2021 se generaron 80.155 GWh de electricidad, un 4,5% más que en 2020. ¿Qué expresión representa la electricidad generada en 2020?',
    options: ['80.155/104,5', '(80.155·100)/104,5', '(80.155·104,5)/100', '80.155/(104,5·100)'],
    correct: 1,
    explanation: '80.155 = E × 1,045 → E = (80.155 × 100) / 104,5.',
    hint: 'El valor de 2021 es el 104,5% del valor de 2020.',
    points: 150
  },
  {
    id: 2014, topic: 'numeros', type: 'multiple',
    question: 'Un producto costaba $25.000. Se rebaja un 20% y luego un 25% sobre el precio ya rebajado. ¿Qué expresión representa el precio final?',
    options: ['0,2 × 0,25 × 25.000', '(0,2+0,25) × 25.000', '0,8 × 0,75 × 25.000', '(0,8+0,75) × 25.000'],
    correct: 2,
    explanation: 'Primer descuento: se paga 80% (0,8). Segundo descuento: se paga 75% (0,75). Precio final = 0,8 × 0,75 × 25.000.',
    hint: 'Los descuentos sucesivos se multiplican, no se suman.',
    points: 100
  },
  {
    id: 2015, topic: 'numeros', type: 'multiple',
    question: 'El sueldo líquido mensual es $M. Gasta 3/5 y ahorra el resto. ¿Cuál es el ahorro en 12 meses?',
    options: ['(2/5)M', '(24/5)M', '(36/5)M', '(57/5)M'],
    correct: 1,
    explanation: 'Ahorro mensual = M - (3/5)M = (2/5)M. En 12 meses = 12 × (2/5)M = (24/5)M.',
    hint: 'Calcula primero el ahorro mensual y luego multiplícalo por 12.',
    points: 100
  },
  {
    id: 2016, topic: 'numeros', type: 'multiple',
    question: 'José tiene 90 dulces y se queda con 18. Reparte el resto en partes iguales entre 8 amigos. ¿Cuántos dulces recibe cada amigo?',
    options: ['8', '9', '10', '11'],
    correct: 1,
    explanation: 'Dulces a repartir = 90 - 18 = 72. Cada amigo recibe 72 ÷ 8 = 9 dulces.',
    hint: 'Resta primero los dulces que José conserva y luego divide.',
    points: 100
  },
  {
    id: 2017, topic: 'numeros', type: 'multiple',
    question: 'Si 30 corresponde al 20% de una cantidad, ¿cuál es dicha cantidad?',
    options: ['6', '50', '150', '600'],
    correct: 2,
    explanation: '0,20 · x = 30 → x = 30 / 0,20 = 150.',
    hint: 'Divide 30 entre 0,20 (o multiplica por 5).',
    points: 100
  },
  {
    id: 2018, topic: 'numeros', type: 'multiple',
    question: '¿Cuál es el resultado de reducir la expresión (2² · 2³)² / 2⁴?',
    options: ['2⁴', '2⁶', '2⁸', '2¹⁰'],
    correct: 1,
    explanation: '(2² · 2³)² / 2⁴ = (2⁵)² / 2⁴ = 2¹⁰ / 2⁴ = 2⁶.',
    hint: 'Aplica las propiedades de potencias de igual base.',
    points: 100
  },
  {
    id: 2019, topic: 'numeros', type: 'multiple',
    question: 'Una persona recorre 2/5 de un camino el primer día y 1/3 del resto el segundo día. ¿Qué fracción del camino total le falta por recorrer?',
    options: ['2/5', '1/5', '4/15', '2/15'],
    correct: 0,
    explanation: 'Resta 1° día: 3/5. Día 2: (1/3)×(3/5) = 1/5. Total recorrido: 2/5 + 1/5 = 3/5. Falta: 1 - 3/5 = 2/5.',
    hint: 'Calcula el remanente después del primer día antes de aplicar la segunda fracción.',
    points: 150
  },
  {
    id: 2020, topic: 'numeros', type: 'multiple',
    question: 'Si la raíz cuadrada de x es igual a 8, ¿cuál es el valor de x + 5?',
    options: ['13', '69', '64', '37'],
    correct: 1,
    explanation: '√x = 8 → x = 64. Por lo tanto, x + 5 = 64 + 5 = 69.',
    hint: 'Eleva 8 al cuadrado para hallar x y luego suma 5.',
    points: 100
  },
  {
    id: 2021, topic: 'numeros', type: 'multiple',
    question: '¿Cuál es el valor numérico de (-3)³ + (-2)² - (-1)⁵?',
    options: ['-22', '-24', '-30', '-28'],
    correct: 0,
    explanation: '(-3)³ = -27, (-2)² = 4, (-1)⁵ = -1. Entonces: -27 + 4 - (-1) = -27 + 4 + 1 = -22.',
    hint: 'Recuerda que bases negativas con exponente impar dan resultado negativo.',
    points: 100
  },
  {
    id: 2022, topic: 'numeros', type: 'multiple',
    question: 'Tres barras de hierro miden 12 m, 18 m y 24 m. Se quieren cortar en trozos de igual longitud, la mayor posible y sin que sobre material. ¿Cuánto medirá cada trozo?',
    options: ['3 m', '6 m', '12 m', '4 m'],
    correct: 1,
    explanation: 'Se debe calcular el Máximo Común Divisor (MCD) entre 12, 18 y 24. MCD(12, 18, 24) = 6 m.',
    hint: 'Busca el divisor común mayor entre las tres medidas.',
    points: 100
  },
  {
    id: 2023, topic: 'numeros', type: 'multiple',
    question: 'Si el precio de una polera se aumenta en un 10% y luego se le aplica un descuento del 10%, ¿qué ocurre con el precio final respecto al inicial?',
    options: ['Aumenta un 1%', 'Disminuye un 1%', 'Se mantiene igual', 'Disminuye un 2%'],
    correct: 1,
    explanation: 'Precio inicial P. Con aumento: 1,10 P. Con descuento: 1,10 P × 0,90 = 0,99 P. Disminuye un 1%.',
    hint: 'Multiplica los factores de variación 1,10 y 0,90.',
    points: 150
  },
  {
    id: 2024, topic: 'numeros', type: 'multiple',
    question: '¿A cuál de los siguientes números decimales equivale la fracción 7/8?',
    options: ['0,875', '0,78', '0,825', '0,85'],
    correct: 0,
    explanation: '7 ÷ 8 = 0,875.',
    hint: 'Realiza la división directa del numerador entre el denominador.',
    points: 100
  },
  {
    id: 2025, topic: 'numeros', type: 'multiple',
    question: 'Un recipiente lleno de agua pesa 12 kg. Cuando contiene la mitad de su capacidad pesa 7 kg. ¿Cuánto pesa el recipiente vacío?',
    options: ['1 kg', '2 kg', '3 kg', '5 kg'],
    correct: 1,
    explanation: 'Agua total = A, Recipiente = R. R + A = 12, R + A/2 = 7. Restando: A/2 = 5 → A = 10 kg. R = 12 - 10 = 2 kg.',
    hint: 'La diferencia entre los dos pesos corresponde a la mitad del contenido de agua.',
    points: 150
  },
  {
    id: 2026, topic: 'numeros', type: 'multiple',
    question: '¿Cuál es el valor de la expresión √(18) + √(50) - √(8)?',
    options: ['6√2', '8√2', '4√2', '5√2'],
    correct: 0,
    explanation: '√(18) = 3√2, √(50) = 5√2, √(8) = 2√2. Luego: 3√2 + 5√2 - 2√2 = 6√2.',
    hint: 'Descompón cada radical en productos con cuadrados perfectos.',
    points: 150
  },
  {
    id: 2027, topic: 'numeros', type: 'multiple',
    question: 'Si a = 2,4 × 10⁵ y b = 8 × 10³, ¿cuál es el valor de a / b?',
    options: ['3 × 10²', '3 × 10¹', '0,3 × 10²', '3 × 10³'],
    correct: 1,
    explanation: '(2,4 / 8) × (10⁵ / 10³) = 0,3 × 10² = 30 = 3 × 10¹.',
    hint: 'Divide los números por un lado y aplica resta de exponentes para las potencias de 10.',
    points: 100
  },
  {
    id: 2028, topic: 'numeros', type: 'multiple',
    question: 'En un estanque hay 120 litros. Se retiran 3/8 del total y luego 1/5 del resto. ¿Cuántos litros quedan en el estanque?',
    options: ['60 litros', '45 litros', '55 litros', '75 litros'],
    correct: 0,
    explanation: 'Primera extracción: 120 × (3/8) = 45 L. Restan: 75 L. Segunda extracción: 75 × (1/5) = 15 L. Quedan: 75 - 15 = 60 L.',
    hint: 'Calcula el residuo después de la primera extracción antes de aplicar la segunda.',
    points: 100
  },
  {
    id: 2029, topic: 'numeros', type: 'multiple',
    question: 'Si m y n son dos enteros pares consecutivos tales que m < n, ¿cuál de las siguientes expresiones representa siempre un número entero par?',
    options: ['m + n', '(m + n) / 2', 'm · n', 'n - m'],
    correct: 2,
    explanation: 'El producto de dos enteros pares siempre es un número par (ej. 2 × 4 = 8). Además, n - m es siempre 2.',
    hint: 'Evalúa la multiplicación de dos pares consecutivos.',
    points: 100
  },
  {
    id: 2030, topic: 'numeros', type: 'multiple',
    question: 'Un automóvil recorre 180 km en 2 horas y 15 minutos. ¿Cuál fue su velocidad promedio en km/h?',
    options: ['75 km/h', '80 km/h', '85 km/h', '90 km/h'],
    correct: 1,
    explanation: '2 h 15 min = 2,25 horas. Velocidad = 180 / 2,25 = 80 km/h.',
    hint: 'Convierte los 15 minutos a fracción de hora (0,25 h) antes de dividir.',
    points: 100
  },

  // ================================================================
  // EJE: ÁLGEBRA Y FUNCIONES (30 PREGUNTAS)
  // ================================================================
  {
    id: 2101, topic: 'algebra', type: 'multiple',
    question: 'El ingreso y la ganancia de una empresa se modelan como: I(x)=1000x+600.000, G(x)=750x+450.000, donde x son artículos producidos. Si G(x)=I(x)-C(x), ¿cuál es la función de costo C(x)?',
    options: ['C(x)=250x+150.000', 'C(x)=250x-150.000', 'C(x)=1750x-1.050.000', 'C(x)=1750x+1.050.000'],
    correct: 0,
    explanation: 'C(x) = I(x) - G(x) = (1000x+600.000) - (750x+450.000) = 250x + 150.000.',
    hint: 'Resta la función ganancia de la función ingreso.',
    points: 100
  },
  {
    id: 2102, topic: 'algebra', type: 'multiple',
    question: 'Una pista de baile rectangular mide (3x+4) m de largo y (2x-9) m de ancho. Se tienen (20x+20) m de cinta para demarcar el borde. ¿Cuántos metros de cinta sobran?',
    options: ['(10x+30) m', '(10x+10) m', '(15x+15) m', '(15x+25) m'],
    correct: 0,
    explanation: 'Perímetro = 2(3x+4) + 2(2x-9) = 10x-10. Sobrante = (20x+20) - (10x-10) = 10x+30.',
    hint: 'Calcula el perímetro y réstalo de la cinta disponible.',
    points: 150
  },
  {
    id: 2103, topic: 'algebra', type: 'multiple',
    question: 'Para un glaseado se mezclan gotas rojas y amarillas en razón 3:5. Si se usan 30 gotas amarillas, ¿cuántas rojas se necesitan?',
    options: ['18', '28', '30', '32'],
    correct: 0,
    explanation: 'Rojo/Amarillo = 3/5. Con 30 amarillas: Rojo = (3×30)/5 = 18.',
    hint: 'Plantea una proporción con la razón dada.',
    points: 100
  },
  {
    id: 2104, topic: 'algebra', type: 'multiple',
    question: 'La cantidad p (kg) de comida para un perro se modela como p = m·0,025, donde m es la masa del perro en kg. ¿Cómo se interpreta 0,025?',
    options: [
      '25 gramos de alimento por cada kg de masa',
      '250 gramos de alimento por cada kg de masa',
      'La masa es 25 veces la cantidad de alimento',
      'La masa es 250 veces la cantidad de alimento'
    ],
    correct: 0,
    explanation: '0,025 kg = 25 gramos. Por cada kg de masa, el perro consume 25 g de alimento.',
    hint: 'Convierte 0,025 kg a gramos multiplicando por 1000.',
    points: 100
  },
  {
    id: 2105, topic: 'algebra', type: 'multiple',
    question: 'Cada 4 galletas aportan 180 kcal. La fórmula es K = 180x/4. Una persona consumió galletas y un jugo de 90 kcal, ingiriendo 405 kcal totales. ¿Cuántas galletas consumió?',
    options: ['2', '7', '9', '11'],
    correct: 1,
    explanation: 'K galletas = 405 - 90 = 315. 315 = 180x/4 = 45x → x = 7.',
    hint: 'Resta las calorías del jugo y despeja x de la fórmula.',
    points: 100
  },
  {
    id: 2106, topic: 'algebra', type: 'multiple',
    question: 'Daniela compra 7 lápices y le sobran $900. Marcos compra 6 lápices del mismo tipo y le sobran $2.330. Si ambos tienen igual cantidad de dinero, ¿cuál es el precio de cada lápiz?',
    options: ['$110', '$248', '$1.430', '$3.230'],
    correct: 2,
    explanation: '7P + 900 = 6P + 2330 → P = 1430.',
    hint: 'Iguala las expresiones del dinero de ambos.',
    points: 100
  },
  {
    id: 2107, topic: 'algebra', type: 'multiple',
    question: 'Nacimientos: 2019 = 5x+4, 2020 = 3x+5, 2021 = x+2 (en miles, respecto a 2018). Si 2019 fue menor que la suma de 2020 y 2021, ¿qué relación lo representa?',
    options: ['5x+4 < 4x+7', '5x+4 < 2x+7', '5x+4 > 2x+7', '5x+4 > 4x+7'],
    correct: 0,
    explanation: 'Suma 2020+2021 = 4x+7. Condición: 5x+4 < 4x+7.',
    hint: 'Suma las expresiones de 2020 y 2021 y compara con 2019.',
    points: 100
  },
  {
    id: 2108, topic: 'algebra', type: 'multiple',
    question: 'Dos rectas de gastos e ingresos acumulados se intersecan en el mes 6. ¿Qué representa ese punto?',
    options: [
      'El mes de mayor ingreso acumulado',
      'El mes donde los ingresos igualan a los gastos acumulados',
      'El mes desde donde no hay más gastos',
      'El mes donde los ingresos igualan a los gastos iniciales'
    ],
    correct: 1,
    explanation: 'La intersección de curvas acumuladas representa el punto de equilibrio donde ambas variables son iguales.',
    hint: 'Piensa en el significado del punto de intersección de dos gráficas.',
    points: 100
  },
  {
    id: 2109, topic: 'algebra', type: 'multiple',
    question: 'Sistema: 1500x + 1800y = 13500, x + y = 8. ¿Qué representa la variable x?',
    options: [
      'Cantidad de peras compradas',
      'Cantidad de manzanas compradas',
      'Kilogramos de peras compradas',
      'Kilogramos de manzanas compradas'
    ],
    correct: 3,
    explanation: 'El coeficiente 1500 corresponde al precio por kg de manzanas. Por tanto, x representa los kg de manzanas.',
    hint: 'Identifica qué precio está asociado a cada variable.',
    points: 100
  },
  {
    id: 2110, topic: 'algebra', type: 'multiple',
    question: 'Un estanque tiene 720 litros y se vacía a razón de 3 litros por minuto. ¿Qué función modela la cantidad de agua que queda, con x = minutos transcurridos?',
    options: ['f(x) = -3x + 720', 'g(x) = 3x - 720', 'p(x) = (x-720)/3', 'h(x) = (-x+720)/3'],
    correct: 0,
    explanation: 'Cantidad inicial = 720. Disminuye 3 L por minuto. Modelo: f(x) = 720 - 3x = -3x + 720.',
    hint: 'Identifica el valor inicial y la tasa de cambio por minuto.',
    points: 100
  },
  {
    id: 2111, topic: 'algebra', type: 'multiple',
    question: 'Un terreno rectangular tiene área de 192 m² y su ancho mide 4 m menos que su largo. ¿Cuánto mide el largo?',
    options: ['12 m', '16 m', '20 m', '24 m'],
    correct: 1,
    explanation: 'L(L-4) = 192 → L² - 4L - 192 = 0 → (L-16)(L+12) = 0 → L = 16.',
    hint: 'Plantea una ecuación cuadrática y factorízala.',
    points: 150
  },
  {
    id: 2112, topic: 'algebra', type: 'multiple',
    question: 'Una función cuadrática f tiene eje de simetría x = 1 y pasa por (5, 7). ¿Para cuál otro valor de x se tiene f(x) = 7?',
    options: ['4', '-3', '-4', '-5'],
    correct: 1,
    explanation: 'Por simetría: (5 + x₂)/2 = 1 → x₂ = -3.',
    hint: 'Usa la propiedad de simetría de la parábola respecto al eje.',
    points: 150
  },
  {
    id: 2113, topic: 'algebra', type: 'multiple',
    question: 'La distancia recorrida es d(t) = a·t²/2, con a = aceleración. Si a = 10 m/s², ¿cuánto tarda en recorrer 45 metros?',
    options: ['3 s', '4,5 s', '√45 s', '9 s'],
    correct: 0,
    explanation: '45 = 10·t²/2 = 5t² → t² = 9 → t = 3.',
    hint: 'Sustituye los valores y despeja t.',
    points: 100
  },
  {
    id: 2114, topic: 'algebra', type: 'multiple',
    question: 'Si (p-3)² - 36 = 0, ¿cuál puede ser un valor de p?',
    options: ['-15', '-9', '9', '15'],
    correct: 2,
    explanation: '(p-3)² = 36 → p-3 = ±6 → p = 9 o p = -3. La opción es 9.',
    hint: 'Despeja el cuadrado y aplica raíz cuadrada.',
    points: 100
  },
  {
    id: 2115, topic: 'algebra', type: 'multiple',
    question: 'Si (x+5)·P = x² - x - 30, con x ≠ -5, ¿a qué es igual P?',
    options: ['x - 35', 'x² - 6', 'x + 6', 'x - 6'],
    correct: 3,
    explanation: 'x² - x - 30 = (x+5)(x-6). Simplificando (x+5): P = x - 6.',
    hint: 'Factoriza la expresión cuadrática.',
    points: 100
  },
  {
    id: 2116, topic: 'algebra', type: 'multiple',
    question: '¿Cuál es la solución del sistema de ecuaciones 2x + y = 10 y x - y = 2?',
    options: ['x = 4, y = 2', 'x = 3, y = 4', 'x = 2, y = 6', 'x = 5, y = 0'],
    correct: 0,
    explanation: 'Sumando ambas ecuaciones: 3x = 12 → x = 4. Reemplazando x=4 en la segunda: 4 - y = 2 → y = 2.',
    hint: 'Suma ambas ecuaciones para eliminar la variable y.',
    points: 100
  },
  {
    id: 2117, topic: 'algebra', type: 'multiple',
    question: '¿Cuál de los siguientes puntos pertenece a la gráfica de la función f(x) = 2x² - 3x + 1?',
    options: ['(0, 0)', '(1, 0)', '(2, 5)', '(-1, 4)'],
    correct: 1,
    explanation: 'Evaluando f(1) = 2(1)² - 3(1) + 1 = 2 - 3 + 1 = 0. El punto (1,0) pertenece a la función.',
    hint: 'Sustituye la coordenada x en la función y verifica si coincide con y.',
    points: 100
  },
  {
    id: 2118, topic: 'algebra', type: 'multiple',
    question: '¿Para qué valor de k el sistema de ecuaciones x + ky = 4 y 2x + 4y = 8 tiene infinitas soluciones?',
    options: ['1', '2', '4', '8'],
    correct: 1,
    explanation: 'Para infinitas soluciones las ecuaciones deben ser proporcionales: 2(x + ky = 4) → 2x + 2ky = 8. Comparando: 2k = 4 → k = 2.',
    hint: 'Compara los coeficientes para que ambas ecuaciones sean equivalentes.',
    points: 150
  },
  {
    id: 2119, topic: 'algebra', type: 'multiple',
    question: 'Si f(x) = 3x - 5, ¿cuál es el valor de f(-2)?',
    options: ['-11', '-1', '1', '11'],
    correct: 0,
    explanation: 'f(-2) = 3(-2) - 5 = -6 - 5 = -11.',
    hint: 'Reemplaza x por -2 en la expresión.',
    points: 100
  },
  {
    id: 2120, topic: 'algebra', type: 'multiple',
    question: '¿Cuál es el dominio de la función f(x) = 5 / (x - 4)?',
    options: ['Todos los reales excepto x = 0', 'Todos los reales excepto x = 4', 'Todos los reales mayores a 4', 'Todos los reales positivos'],
    correct: 1,
    explanation: 'El denominador no puede ser cero, por ende x - 4 ≠ 0 → x ≠ 4.',
    hint: 'Encuentra el valor que hace cero el denominador.',
    points: 100
  },
  {
    id: 2121, topic: 'algebra', type: 'multiple',
    question: 'Si 3x - 7 = 2(x + 4), ¿cuál es el valor de x?',
    options: ['12', '15', '11', '13'],
    correct: 1,
    explanation: '3x - 7 = 2x + 8 → 3x - 2x = 8 + 7 → x = 15.',
    hint: 'Aplica propiedad distributiva en el miembro derecho y agrupa las x.',
    points: 100
  },
  {
    id: 2122, topic: 'algebra', type: 'multiple',
    question: '¿Cuál es el desarrollo del producto notable (2x - 3)¹?',
    options: ['2x - 3', '4x² - 9', '4x² - 12x + 9', '2x + 3'],
    correct: 0,
    explanation: 'Cualquier expresión elevada a 1 es la misma expresión: 2x - 3.',
    hint: 'Todo exponente igual a 1 deja la expresión inalterada.',
    points: 100
  },
  {
    id: 2123, topic: 'algebra', type: 'multiple',
    question: 'Un plan telefónico cobra $5.000 fijos al mes más $50 por minuto consumido. ¿Qué función f(x) representa el cobro mensual en función de x minutos?',
    options: ['f(x) = 50x + 5000', 'f(x) = 5000x + 50', 'f(x) = 5050x', 'f(x) = (x/50) + 5000'],
    correct: 0,
    explanation: 'Costo fijo = 5000, costo variable = 50x. f(x) = 50x + 5000.',
    hint: 'El costo fijo no se multiplica por la variable minutos.',
    points: 100
  },
  {
    id: 2124, topic: 'algebra', type: 'multiple',
    question: '¿Cuáles son las soluciones de la ecuación cuadrática x² - 7x + 10 = 0?',
    options: ['x = -2, x = -5', 'x = 2, x = 5', 'x = 1, x = 10', 'x = -1, x = -10'],
    correct: 1,
    explanation: '(x - 2)(x - 5) = 0 → x₁ = 2, x₂ = 5.',
    hint: 'Busca dos números que multiplicados den 10 y sumados den -7.',
    points: 100
  },
  {
    id: 2125, topic: 'algebra', type: 'multiple',
    question: 'Si el triple de un número aumentado en 8 no supera a 29, ¿cuál es el mayor número entero que cumple esta condición?',
    options: ['6', '7', '8', '9'],
    correct: 1,
    explanation: '3x + 8 ≤ 29 → 3x ≤ 21 → x ≤ 7. El mayor entero es 7.',
    hint: 'Plantea una inecuación y despeja x.',
    points: 100
  },
  {
    id: 2126, topic: 'algebra', type: 'multiple',
    question: '¿Cuál es la pendiente de la recta que pasa por los puntos A(2, 3) y B(6, 11)?',
    options: ['2', '3', '4', '1/2'],
    correct: 0,
    explanation: 'm = (y₂ - y₁) / (x₂ - x₁) = (11 - 3) / (6 - 2) = 8 / 4 = 2.',
    hint: 'Aplica la fórmula m = (y₂ - y₁) / (x₂ - x₁).',
    points: 100
  },
  {
    id: 2127, topic: 'algebra', type: 'multiple',
    question: 'Al simplificar la expresión (a² - b²) / (a + b), con a + b ≠ 0, se obtiene:',
    options: ['a + b', 'a - b', 'a² + b²', '1'],
    correct: 1,
    explanation: 'a² - b² = (a + b)(a - b). Dividido por (a + b) resulta a - b.',
    hint: 'Factoriza el numerador como una diferencia de cuadrados.',
    points: 100
  },
  {
    id: 2128, topic: 'algebra', type: 'multiple',
    question: 'Dada la función cuadrática f(x) = -x² + 4x + 5, ¿cuál es la coordenada del vértice de su parábola?',
    options: ['(2, 9)', '(-2, 9)', '(2, 5)', '(4, 5)'],
    correct: 0,
    explanation: 'Xv = -b / (2a) = -4 / (2 · -1) = 2. Yv = f(2) = -(2)² + 4(2) + 5 = -4 + 8 + 5 = 9.',
    hint: 'Encuentra primero Xv usando -b/(2a) y reemplázalo en f(x).',
    points: 150
  },
  {
    id: 2129, topic: 'algebra', type: 'multiple',
    question: 'Si f(x) = x² - 3 y g(x) = 2x + 1, ¿cuál es el valor de f(g(2))?',
    options: ['22', '25', '1', '10'],
    correct: 0,
    explanation: 'g(2) = 2(2) + 1 = 5. f(g(2)) = f(5) = 5² - 3 = 25 - 3 = 22.',
    hint: 'Evalúa primero g(2) y el resultado ingresalo en la función f.',
    points: 150
  },
  {
    id: 2130, topic: 'algebra', type: 'multiple',
    question: 'Si a + b = 10 y a · b = 21, ¿cuál es el valor de a² + b²?',
    options: ['58', '100', '42', '79'],
    correct: 0,
    explanation: '(a + b)² = a² + 2ab + b² → 10² = a² + 2(21) + b² → 100 = a² + b² + 42 → a² + b² = 58.',
    hint: 'Eleva al cuadrado la expresión (a + b) y sustituye los valores conocidos.',
    points: 150
  },

  // ================================================================
  // EJE: GEOMETRÍA (20 PREGUNTAS)
  // ================================================================
  {
    id: 2201, topic: 'geometria', type: 'multiple',
    question: 'Un trapecio rectángulo tiene área 0,76 m², con bases paralelas de 0,6 m y 1,3 m. ¿Cuál es su altura?',
    options: ['1,444 m', '0,80 m', '0,722 m', '0,40 m'],
    correct: 1,
    explanation: 'A = (b₁+b₂)·h/2 → 0,76 = (1,9)·h/2 → h = 0,80 m.',
    hint: 'Usa la fórmula del área del trapecio y despeja la altura.',
    points: 100
  },
  {
    id: 2202, topic: 'geometria', type: 'multiple',
    question: 'Un cubo tiene aristas de 2 cm. Se construye una figura en L de 8×6×4×2 cm usando estos cubos. ¿Cuántos cubos se utilizaron?',
    options: ['6', '7', '8', '9'],
    correct: 1,
    explanation: 'Bloque izquierdo: 3 cubos. Bloque central: 2 cubos. Bloque derecho: 2 cubos. Total: 7 cubos.',
    hint: 'Divide la figura en bloques rectangulares y cuenta los cubos en cada uno.',
    points: 150
  },
  {
    id: 2203, topic: 'geometria', type: 'multiple',
    question: 'Una caja cúbica tiene caras exteriores de 25 cm² cada una. El precio es $800 por cm² de área exterior. ¿Qué expresión representa k (cm² totales)?',
    options: ['6·5²', '6·5⁴', '6·5⁶', '6·5¹²'],
    correct: 0,
    explanation: 'Un cubo tiene 6 caras. Cada cara = 25 cm² = 5². Área total = 6·5².',
    hint: 'Multiplica el número de caras por el área de una cara.',
    points: 100
  },
  {
    id: 2204, topic: 'geometria', type: 'multiple',
    question: 'Se dobla una hoja por la mitad y se recorta una figura pegada al borde del doblez. Al desdoblarla, ¿qué tipo de figura se obtiene?',
    options: ['Una figura asimétrica', 'Una figura con simetría axial', 'Una figura con simetría central', 'Una figura sin simetría'],
    correct: 1,
    explanation: 'Al desdoblar, la figura presenta simetría axial reflexiva respecto a la línea de doblez.',
    hint: 'Piensa en el efecto de desdoblar un papel recortado.',
    points: 100
  },
  {
    id: 2205, topic: 'geometria', type: 'multiple',
    question: 'Una flecha va del origen (0,0) al punto (3,3) en dirección Noreste. ¿Qué transformaciones la hacen apuntar al Oeste?',
    options: [
      'Reflexión respecto al eje X y luego respecto a y=x',
      'Reflexión respecto al origen y luego rotación 45° horario',
      'Reflexión respecto al eje Y',
      'Traslación según vector (-3,-3)'
    ],
    correct: 1,
    explanation: 'Reflexión respecto al origen: la flecha apunta al SO. Rotación 45° horario: apunta al Oeste.',
    hint: 'Analiza cómo cambia la dirección con cada transformación.',
    points: 150
  },
  {
    id: 2206, topic: 'geometria', type: 'multiple',
    question: 'Vector u de (-2,3) a (-5,1) y vector v de (2,3) a (5,5). ¿Qué afirmación es verdadera?',
    options: [
      'Tienen distinta dirección',
      'Tienen distinto sentido',
      'Tienen distinta magnitud',
      'Están en el semieje positivo del eje X'
    ],
    correct: 1,
    explanation: 'u = (-3,-2), v = (3,2). u = -v: misma dirección y magnitud, sentidos opuestos.',
    hint: 'Calcula las componentes de cada vector.',
    points: 100
  },
  {
    id: 2207, topic: 'geometria', type: 'multiple',
    question: 'En un videojuego, desde los pies del personaje hasta el tesoro hay 4 casillas a la derecha y 2 hacia abajo. Cada casilla mide 2 unidades. ¿Qué vector lleva al personaje al tesoro?',
    options: ['(8, -4)', '(-4, 2)', '(10, -6)', '(2, -2)'],
    correct: 0,
    explanation: 'Horizontal: 4 × 2 = 8. Vertical: 2 × (-2) = -4. Vector: (8, -4).',
    hint: 'Multiplica las casillas por el tamaño de cada lado de cuadrícula.',
    points: 100
  },
  {
    id: 2208, topic: 'geometria', type: 'multiple',
    question: 'Cuatro círculos tienen perímetros 12 π  m, 10 π  m, 8 π  m y 4 π  m. ¿Cuál es el área total de los cuatro círculos?',
    options: ['(17)² π  m²', '81 π  m²', '34 π  m²', '17 π  m²'],
    correct: 1,
    explanation: 'Radios: 6, 5, 4, 2. Áreas: 36 π +25 π +16 π +4 π  = 81 π  m².',
    hint: 'Calcula el radio de cada círculo a partir del perímetro y luego el área.',
    points: 150
  },
  {
    id: 2209, topic: 'geometria', type: 'multiple',
    question: 'Un triángulo rectángulo tiene catetos de 6 cm y 8 cm. ¿Cuál es la longitud de su hipotenusa?',
    options: ['10 cm', '12 cm', '14 cm', '100 cm'],
    correct: 0,
    explanation: 'h² = 6² + 8² = 36 + 64 = 100 → h = 10 cm.',
    hint: 'Aplica el teorema de Pitágoras.',
    points: 100
  },
  {
    id: 2210, topic: 'geometria', type: 'multiple',
    question: '¿Cuál es el perímetro de un rectángulo cuya área es 48 cm² y su ancho mide 6 cm?',
    options: ['14 cm', '28 cm', '16 cm', '32 cm'],
    correct: 1,
    explanation: 'Largo = 48 / 6 = 8 cm. Perímetro = 2(8 + 6) = 28 cm.',
    hint: 'Encuentra primero la medida del largo dividiendo el área entre el ancho.',
    points: 100
  },
  {
    id: 2211, topic: 'geometria', type: 'multiple',
    question: 'Al trasladar el punto P(-3, 4) según el vector v = (5, -2), ¿cuáles son las coordenadas del nuevo punto?',
    options: ['(-8, 6)', '(2, 2)', '(-2, -2)', '(8, -6)'],
    correct: 1,
    explanation: 'P\' = (-3 + 5, 4 + (-2)) = (2, 2).',
    hint: 'Suma las coordenadas correspondientes del punto y del vector.',
    points: 100
  },
  {
    id: 2212, topic: 'geometria', type: 'multiple',
    question: '¿Cuál es el volumen de un cilindro recto de radio 3 cm y altura 10 cm?',
    options: ['30 π cm³', '60 π cm³', '90 π cm³', '180 π cm³'],
    correct: 2,
    explanation: 'V = π · r² · h = π · 3² · 10 = 90 π cm³.',
    hint: 'Usa la fórmula del volumen del cilindro: V = π · r² · h.',
    points: 100
  },
  {
    id: 2213, topic: 'geometria', type: 'multiple',
    question: 'Si un punto A(2, -5) se refleja respecto al eje X, ¿cuáles son las nuevas coordenadas?',
    options: ['(-2, -5)', '(2, 5)', '(-2, 5)', '(5, -2)'],
    correct: 1,
    explanation: 'Al reflejar respecto al eje X, la coordenada x se mantiene y la y cambia de signo: (2, 5).',
    hint: 'La reflexión respecto al eje X invierte únicamente el signo de y.',
    points: 100
  },
  {
    id: 2214, topic: 'geometria', type: 'multiple',
    question: '¿Cuál es el área total de un cubo de arista 4 cm?',
    options: ['16 cm²', '64 cm²', '96 cm²', '128 cm²'],
    correct: 2,
    explanation: 'Área total = 6 × (arista)² = 6 × (4)² = 6 × 16 = 96 cm².',
    hint: 'Multiplica el área de una cara (4²) por las 6 caras del cubo.',
    points: 100
  },
  {
    id: 2215, topic: 'geometria', type: 'multiple',
    question: 'Un triángulo equilátero tiene un perímetro de 18 cm. ¿Cuál es la medida de cada uno de sus lados?',
    options: ['3 cm', '6 cm', '9 cm', '12 cm'],
    correct: 1,
    explanation: 'Un triángulo equilátero tiene 3 lados iguales: 18 / 3 = 6 cm.',
    hint: 'Divide el perímetro entre el número de lados iguales.',
    points: 100
  },
  {
    id: 2216, topic: 'geometria', type: 'multiple',
    question: 'Al rotar el punto P(4, 2) respecto al origen en 90° en sentido antihorario, ¿cuáles son sus nuevas coordenadas?',
    options: ['(-2, 4)', '(2, -4)', '(-4, -2)', '(-2, -4)'],
    correct: 0,
    explanation: 'La rotación de (x, y) en 90° antihorario transforma el punto en (-y, x). Por lo tanto: (4, 2) → (-2, 4).',
    hint: 'Aplica la regla de rotación de 90° antihorario: (x, y) → (-y, x).',
    points: 150
  },
  {
    id: 2217, topic: 'geometria', type: 'multiple',
    question: '¿Cuál es el área de un círculo cuya circunferencia mide 10 π  cm?',
    options: ['10 π cm²', '25 π cm²', '50 π cm²', '100 π cm²'],
    correct: 1,
    explanation: 'C = 2 π r = 10 π → r = 5 cm. Área = π r² = π (5)² = 25 π cm².',
    hint: 'Obtén primero el radio dividiendo la circunferencia entre 2 π.',
    points: 100
  },
  {
    id: 2218, topic: 'geometria', type: 'multiple',
    question: 'Si la hipotenusa de un triángulo rectángulo isósceles mide 10 cm, ¿cuánto mide cada cateto?',
    options: ['5 cm', '5√2 cm', '10√2 cm', '2,5 cm'],
    correct: 1,
    explanation: 'c² + c² = 10² → 2c² = 100 → c² = 50 → c = √50 = 5√2 cm.',
    hint: 'Plantea Pitágoras con catetos iguales: 2c² = h².',
    points: 150
  },
  {
    id: 2219, topic: 'geometria', type: 'multiple',
    question: '¿Cuál es el volumen de un paralelepípedo recto de largo 5 cm, ancho 4 cm y alto 3 cm?',
    options: ['12 cm³', '20 cm³', '60 cm³', '94 cm³'],
    correct: 2,
    explanation: 'Volumen = largo × ancho × alto = 5 × 4 × 3 = 60 cm³.',
    hint: 'Multiplica las tres dimensiones entre sí.',
    points: 100
  },
  {
    id: 2220, topic: 'geometria', type: 'multiple',
    question: 'Dos triángulos son semejantes en razón 1 : 3. Si el área del triángulo menor es 12 cm², ¿cuál es el área del triángulo mayor?',
    options: ['36 cm²', '72 cm²', '108 cm²', '144 cm²'],
    correct: 2,
    explanation: 'La razón de áreas entre figuras semejantes es el cuadrado de la razón de semejanza: 1² : 3² = 1 : 9. Área mayor = 12 × 9 = 108 cm².',
    hint: 'Eleva al cuadrado la razón de semejanza para hallar la relación de áreas.',
    points: 150
  },

  // ================================================================
  // EJE: PROBABILIDAD Y ESTADÍSTICA (20 PREGUNTAS)
  // ================================================================
  {
    id: 2301, topic: 'estadistica', type: 'multiple',
    question: 'Gráfico de migraciones en España (2011-2021). ¿En qué año hubo mayor cantidad de migrantes exteriores?',
    options: ['2013', '2015', '2018', '2019'],
    correct: 3,
    explanation: 'En 2019, la curva de inmigrantes alcanza su punto máximo del gráfico.',
    hint: 'Observa el valor más alto en la curva de inmigrantes.',
    points: 100
  },
  {
    id: 2302, topic: 'estadistica', type: 'multiple',
    question: 'Edades de trabajadores: 18-24: 5, 25-34: 7, 35-44: 14, 45-54: 11, 55+: 13. Un beneficio aplica a quienes no superen los 34 años. ¿Cuántos pueden acceder?',
    options: ['6', '7', '9', '12'],
    correct: 3,
    explanation: 'No superan 34 años: 18-24 (5) + 25-34 (7) = 12 trabajadores.',
    hint: 'Suma las frecuencias de los intervalos que cumplen la condición.',
    points: 100
  },
  {
    id: 2303, topic: 'estadistica', type: 'multiple',
    question: 'Un diagrama radial muestra habilidades de un personaje (0 a 100). El vértice más cercano al centro es "Defensa mágica" (~30 puntos). ¿Cuál es la habilidad más débil?',
    options: ['Fuerza mágica', 'Defensa mágica', 'Defensa física', 'Fuerza física'],
    correct: 1,
    explanation: 'El punto con menor radio/valor en el gráfico radial corresponde a Defensa mágica.',
    hint: 'Busca el vértice más cercano al centro del diagrama.',
    points: 100
  },
  {
    id: 2304, topic: 'estadistica', type: 'multiple',
    question: 'Años en el colegio: 1 año: 24, 2: 15, 3: 12, 4: 8, 5: 12, 6: 29, 7: 14, 8: 9, 9+: 16. ¿Cuántos llevan 5 años o más?',
    options: ['12', '35', '68', '80'],
    correct: 3,
    explanation: '5+ años = 12+29+14+9+16 = 80 estudiantes.',
    hint: 'Suma las frecuencias desde 5 años en adelante.',
    points: 100
  },
  {
    id: 2305, topic: 'estadistica', type: 'multiple',
    question: '5 de cada 10 personas ocupadas son mujeres. ¿Qué representación gráfica corresponde?',
    options: [
      '5 íconos de mujeres',
      '5 mujeres y 10 hombres',
      '10 mujeres y 5 hombres',
      '5 mujeres y 5 hombres'
    ],
    correct: 3,
    explanation: '5 de 10 = 50% mujeres y 50% hombres. La opción con 5 íconos de cada uno es correcta.',
    hint: 'La proporción 5:10 equivale a mitad y mitad.',
    points: 100
  },
  {
    id: 2306, topic: 'estadistica', type: 'multiple',
    question: 'Tabla: valor 0 (frec. P), valor 1 (frec. Q), valor 2 (frec. R). ¿Qué expresión da el promedio?',
    options: [
      '(P+Q+2R)/(P+Q+R)',
      'R/(P+Q+R)',
      '(0·P+1·Q+2·R)/(P+Q+R)',
      '(2·R)/(P+Q+R)'
    ],
    correct: 2,
    explanation: 'El promedio ponderado es la suma de cada valor por su frecuencia, dividida por el total de frecuencias.',
    hint: 'Aplica la fórmula del promedio ponderado.',
    points: 100
  },
  {
    id: 2307, topic: 'estadistica', type: 'multiple',
    question: 'Un brote medía 2 cm. En 5 semanas creció a 14 cm. ¿Cuál fue el crecimiento promedio semanal?',
    options: ['2 cm', '2,4 cm', '3 cm', '7,5 cm'],
    correct: 1,
    explanation: 'Crecimiento total = 14 - 2 = 12 cm. Promedio = 12/5 = 2,4 cm/semana.',
    hint: 'Resta la altura inicial de la final y divide por el número de semanas.',
    points: 100
  },
  {
    id: 2308, topic: 'estadistica', type: 'multiple',
    question: 'Horas extras de 140 trabajadores: 1h: 10, 2h: 20, 3h: 40, 4h: 30, 5h: 40. Cada hora extra se paga $15.000. ¿Cuál fue el pago más frecuente (moda)?',
    options: ['$15.000', '$30.000', '$45.000', '$60.000'],
    correct: 2,
    explanation: 'Las frecuencias más altas son 3h y 5h (40 trabajadores cada una). El pago por 3h = $45.000. La clave oficial es $45.000.',
    hint: 'Identifica las frecuencias más altas y calcula el pago correspondiente.',
    points: 150
  },
  {
    id: 2309, topic: 'estadistica', type: 'multiple',
    question: 'Mediciones de distancia de caída: 10, 9, 15, 8, 18 cm. El promedio es 12 cm. Según la tabla, 12 cm equivale a 0,16 s. ¿Cuál es el tiempo de reacción?',
    options: ['0,10 s', '0,14 s', '0,16 s', '0,17 s'],
    correct: 2,
    explanation: 'Promedio = 60/5 = 12 cm. Según la tabla, 12 cm → 0,16 s.',
    hint: 'Calcula el promedio de las mediciones y busca el valor en la tabla.',
    points: 100
  },
  {
    id: 2310, topic: 'probabilidad', type: 'multiple',
    question: 'Un memorice tiene 20 tarjetas (10 parejas). Se voltea una y aparece un rayo. ¿Cuál es la probabilidad de encontrar el segundo rayo al voltear otra tarjeta al azar?',
    options: ['1/20', '1/19', '2/20', '2/19'],
    correct: 1,
    explanation: 'Quedan 19 tarjetas tapadas (casos posibles) y solo 1 rayo (caso favorable). P = 1/19.',
    hint: 'Después de voltear la primera, quedan 19 tarjetas y solo una es el par.',
    points: 100
  },
  {
    id: 2311, topic: 'estadistica', type: 'multiple',
    question: 'Tiempo de trabajo: 1 año: 2 pers., 2: 4, 3: 5, 4: 4, 5: 2, 6: 6, 7: 2, 8: 5, 9: 3, 10: 2. ¿Cuántos reciben bonificación si se requiere mínimo 6 años?',
    options: ['12', '17', '18', '23'],
    correct: 2,
    explanation: '6+7+8+9+10 años = 6+2+5+3+2 = 18 personas.',
    hint: 'Suma las frecuencias de 6 años en adelante.',
    points: 100
  },
  {
    id: 2312, topic: 'probabilidad', type: 'multiple',
    question: 'Encuesta de estilos musicales: Rock: 7, Pop: 4, Rap: 3, Reguetón: 6. ¿Cuál es la probabilidad de que una persona elegida al azar prefiera rock?',
    options: ['1/7', '7/13', '13/20', '7/20'],
    correct: 3,
    explanation: 'Total = 20. Rock = 7. P(Rock) = 7/20.',
    hint: 'Divide los casos favorables entre el total de encuestados.',
    points: 100
  },
  {
    id: 2313, topic: 'probabilidad', type: 'multiple',
    question: 'Al lanzar dos dados comunes de 6 caras, ¿cuál es la probabilidad de que la suma de sus puntos sea igual a 7?',
    options: ['1/6', '1/12', '5/36', '7/36'],
    correct: 0,
    explanation: 'Casos favorables: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 casos. Total de casos = 36. P = 6/36 = 1/6.',
    hint: 'Encuentra cuántas parejas suman 7 sobre un total de 36 posibilidades.',
    points: 100
  },
  {
    id: 2314, topic: 'estadistica', type: 'multiple',
    question: 'Dada la serie de datos: 4, 8, 6, 10, 12, 8, 14. ¿Cuál es la mediana?',
    options: ['6', '8', '9', '10'],
    correct: 1,
    explanation: 'Ordenando los datos de menor a mayor: 4, 6, 8, 8, 10, 12, 14. El valor central (4° dato) es 8.',
    hint: 'Ordena los números de menor a mayor y selecciona el dato del medio.',
    points: 100
  },
  {
    id: 2315, topic: 'probabilidad', type: 'multiple',
    question: 'En una bolsa hay 4 bolitas rojas, 5 azules y 3 verdes. Se saca una bolita al azar. ¿Cuál es la probabilidad de que NO sea azul?',
    options: ['5/12', '7/12', '3/12', '4/12'],
    correct: 1,
    explanation: 'Total de bolitas = 12. No azules = 4 rojas + 3 verdes = 7. P(no azul) = 7/12.',
    hint: 'Suma las bolitas rojas y verdes y divídelas entre el total.',
    points: 100
  },
  {
    id: 2316, topic: 'estadistica', type: 'multiple',
    question: 'El promedio de 4 números es 15. Si se elimina el número 9, ¿cuál es el nuevo promedio de los 3 números restantes?',
    options: ['15', '16', '17', '18'],
    correct: 2,
    explanation: 'Suma total inicial = 4 × 15 = 60. Nueva suma = 60 - 9 = 51. Nuevo promedio = 51 / 3 = 17.',
    hint: 'Halla la suma total original multiplicando la cantidad de datos por su promedio.',
    points: 150
  },
  {
    id: 2317, topic: 'probabilidad', type: 'multiple',
    question: 'Si se lanza una moneda justa 3 veces seguidas, ¿cuál es la probabilidad de obtener exactamente dos caras y una cruz?',
    options: ['1/8', '3/8', '1/2', '5/8'],
    correct: 1,
    explanation: 'Espacio muestral = 2³ = 8. Casos favorables: (C,C,X), (C,X,C), (X,C,C) = 3. P = 3/8.',
    hint: 'Lista todas las posibles permutaciones de 3 lanzamientos.',
    points: 100
  },
  {
    id: 2318, topic: 'estadistica', type: 'multiple',
    question: 'En un curso de 30 alumnos, el promedio de notas de los 20 hombres es 5,0 y el de las 10 mujeres es 6,0. ¿Cuál es el promedio ponderado del curso?',
    options: ['5,33', '5,50', '5,67', '5,80'],
    correct: 0,
    explanation: 'Promedio = [(20 × 5,0) + (10 × 6,0)] / 30 = (100 + 60) / 30 = 160 / 30 = 5,33.',
    hint: 'Calcula la suma total de las notas de hombres y mujeres combinados y divide por 30.',
    points: 150
  },
  {
    id: 2319, topic: 'probabilidad', type: 'multiple',
    question: 'Una caja contiene 3 fichas blancas y 2 negras. Se extrae una ficha sin reposición y luego otra. ¿Cuál es la probabilidad de que ambas sean blancas?',
    options: ['9/25', '3/10', '6/20', '2/5'],
    correct: 1,
    explanation: 'P(1° blanca) = 3/5. P(2° blanca | 1° blanca) = 2/4. P(ambas) = (3/5) × (2/4) = 6/20 = 3/10.',
    hint: 'Recuerda restar una ficha del total y del color blanco para la segunda extracción.',
    points: 150
  },
  {
    id: 2320, topic: 'estadistica', type: 'multiple',
    question: '¿Cuál es el rango del conjunto de datos: 12, 5, 22, 17, 30, 9, 14?',
    options: ['18', '22', '25', '30'],
    correct: 2,
    explanation: 'Rango = Dato Máximo - Dato Mínimo = 30 - 5 = 25.',
    hint: 'Resta el valor mínimo del valor máximo.',
    points: 100
  }
];

// ============================================================================
// EXPORTACIÓN
// ============================================================================
const paesBancoM1 = {
  version: "1.2.0",
  totalQuestions: paesM1Questions.length,
  questions: paesM1Questions
};

console.log('📐 Banco de Matemática 1 (M1) cargado: ' + paesM1Questions.length + ' preguntas');
