
/**
 * ============================================================
 * PAES Challenge — Banco de Preguntas v1.2.0
 * 107 preguntas alineadas a temarios DEMRE 2025-2026
 * Áreas: Competencia Lectora, Matemática 1 (M1), Matemática 2 (M2)
 * Incluye preguntas de Cultura General Científica (Nivel 4 Mixto)
 * ============================================================
 *
 * Estructura de una pregunta:
 * {
 *   id: number,         // Identificador único
 *   topic: string,      // Tema/eje
 *   type: string,       // Tipo: 'multiple', 'matching', 'slider', 'drag'
 *   question: string,   // Enunciado
 *   options: string[],  // Opciones (type: 'multiple')
 *   correct: number,    // Índice de la respuesta correcta
 *   explanation: string,// Explicación detallada
 *   hint: string,       // Pista sin revelar la respuesta
 *   points: number      // Puntaje base
 * }
 */

// ============================================================
// PAES COMPETENCIA LECTORA (35 preguntas)
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
        hint: 'Presta atención a los conectores contrastivos y a las emociones asociadas a cada grupo.',
        points: 100
    },
    {
        id: 3004, topic: 'interpretar', type: 'multiple',
        question: 'Texto:\n\n"María no dijo una palabra durante toda la reunión. Sus manos, apretadas con fuerza sobre la carpeta, y su mirada fija en el piso, hablaban por ella."\n\n¿Qué se puede inferir sobre el estado emocional de María?',
        options: ['Está aburrida', 'Está nerviosa o incómoda', 'Está emocionada de felicidad', 'Está profundamente dormida'],
        correct: 1,
        explanation: 'Las descripciones de sus manos "apretadas con fuerza" y su "mirada fija en el piso" son indicios no verbales que sugieren nerviosismo o incomodidad.',
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
        explanation: 'El autor señala que hay correlación (coincidencia) pero advierte que "no implica necesariamente causalidad".',
        hint: 'Presta atención a la distinción entre correlación (coincidencia) y causalidad (causa-efecto).',
        points: 100
    },
    {
        id: 3007, topic: 'evaluar', type: 'multiple',
        question: 'Texto:\n\n"¿Acaso no es evidente que cualquier persona que se oponga a esta reforma está simplemente defendiendo sus privilegios?"\n\n¿Qué falacia argumentativa presenta este enunciado?',
        options: ['Falacia de autoridad', 'Falacia ad hominem (ataque a la persona)', 'Falacia de falsa causa', 'Falacia de apelación a la autoridad'],
        correct: 1,
        explanation: 'El enunciado ataca a quienes se oponen a la reforma cuestionando sus motivos personales en lugar de refutar sus argumentos.',
        hint: 'Identifica si el argumento ataca a la persona o sus motivos en lugar de sus razones.',
        points: 150
    },
    {
        id: 3008, topic: 'evaluar', type: 'multiple',
        question: 'Texto:\n\n"El científico, con su bata blanca impecable y sus años de investigación en prestigiosas universidades, afirmó que el nuevo medicamento era completamente seguro."\n\n¿Qué recurso argumentativo utiliza el autor para dar peso a la afirmación?',
        options: ['Presentación de datos estadísticos', 'Apelación a la autoridad y credibilidad del emisor', 'Uso de analogías comparativas', 'Demostración matemática formal'],
        correct: 1,
        explanation: 'El autor destaca la apariencia profesional y la trayectoria académica para reforzar la credibilidad del científico.',
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
        explanation: 'El argumento generaliza desde una encuesta hacia una conclusión absoluta, lo que constituye una generalización indebida.',
        hint: 'Evalúa si la evidencia presentada justifica la conclusión general que se extrae de ella.',
        points: 150
    },
    {
        id: 3011, topic: 'evaluar', type: 'multiple',
        question: 'Texto:\n\n"La noticia fue presentada con letras mayúsculas y rojas en el titular, acompañada de una imagen en blanco y negro que mostraba una escena de caos."\n\n¿Qué función cumplen los recursos no lingüísticos en este texto?',
        options: ['Solo decorar la página', 'Potenciar el impacto emocional y la urgencia del mensaje', 'Reducir la credibilidad de la información', 'Indicar que la noticia es antigua'],
        correct: 1,
        explanation: 'El uso de mayúsculas, color rojo e imagen de caos son recursos visuales que intensifican la carga emocional y la percepción de urgencia.',
        hint: 'Analiza cómo los elementos visuales interactúan con el significado del texto.',
        points: 150
    },
    {
        id: 3012, topic: 'interpretar', type: 'multiple',
        question: 'Texto:\n\n"El río seguía su curso indiferente, ajeno a las discusiones de los humanos que habitaban sus orillas. Llevaba siglos haciéndolo, y seguiría otros siglos más después de que todos ellos se hubieran ido."\n\n¿Qué contraste establece el texto entre el río y los humanos?',
        options: ['Que el río es más inteligente que los humanos', 'Que el río representa la permanencia frente a la temporalidad humana', 'Que los humanos dependen completamente del río para vivir', 'Que el río y los humanos tienen la misma duración en el tiempo'],
        correct: 1,
        explanation: 'El texto contrapone la continuidad eterna del río con la existencia finita de los humanos.',
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
        explanation: 'Las expresiones extremas construyen un tono alarmista y catastrofista.',
        hint: 'Analiza el tipo de vocabulario y las expresiones extremas utilizadas por el emisor.',
        points: 150
    },
    {
        id: 3015, topic: 'interpretar', type: 'multiple',
        question: 'Texto:\n\n"Pedro llegó tarde a la entrevista. Su corbata estaba torcida, tenía una mancha de café en la camisa y olvidó el portafolio en el taxi. A pesar de todo, cuando le preguntaron por sus fortalezas, respondió con una seguridad que nadie esperaba."\n\n¿Qué contraste presenta el texto?',
        options: ['Entre la preparación deficiente y la confianza mostrada', 'Entre la puntualidad y la impuntualidad', 'Entre el café y la camisa', 'Entre el taxi y la entrevista'],
        correct: 0,
        explanation: 'El texto describe desprolijidades que contrastan con la "seguridad" inesperada que Pedro demuestra.',
        hint: 'Identifica los elementos negativos previos y el elemento positivo sorpresivo que los contradice.',
        points: 100
    },
    {
        id: 3016, topic: 'interpretar', type: 'multiple',
        question: '"Es tan corto el amor, y es tan largo el olvido."\n— Pablo Neruda\n\n¿Qué recurso literario se utiliza en este verso?',
        options: ['Metáfora', 'Antítesis (contraste)', 'Hipérbaton', 'Anáfora'],
        correct: 1,
        explanation: 'La antítesis contrapone dos ideas opuestas: la brevedad del amor frente a la prolongación del olvido.',
        hint: 'Identifica la oposición de ideas como recurso central del verso.',
        points: 100
    },
    {
        id: 3017, topic: 'interpretar', type: 'multiple',
        question: '"Tu risa me hace libre, me pone alas. Soledades me quita, cárcel me arranca."\n— Miguel Hernández\n\n¿Qué sentimiento expresa el hablante lírico?',
        options: ['Indiferencia', 'Liberación y transformación positiva', 'Tristeza y melancolía', 'Confusión y duda'],
        correct: 1,
        explanation: 'Las metáforas asocian la risa con la liberación de ataduras emocionales.',
        hint: 'Analiza las connotaciones positivas de las metáforas relacionadas con libertad y vuelo.',
        points: 100
    },
    {
        id: 3018, topic: 'evaluar', type: 'multiple',
        question: '"Llegó el vecino puntual: solo tres horas tarde."\n\n¿Qué recurso retórico se emplea?',
        options: ['Hipérbole', 'Ironía', 'Metáfora', 'Personificación'],
        correct: 1,
        explanation: 'La ironía consiste en afirmar lo contrario de lo que realmente se quiere decir.',
        hint: 'Identifica si lo que se dice literalmente contradice la situación real descrita.',
        points: 100
    },
    {
        id: 3019, topic: 'evaluar', type: 'multiple',
        question: '"Te he llamado un millón de veces y nunca respondes."\n\n¿Qué figura literaria está presente?',
        options: ['Metáfora', 'Hipérbole', 'Comparación', 'Personificación'],
        correct: 1,
        explanation: 'La hipérbole es una exageración retórica. "Un millón de veces" no debe interpretarse literalmente.',
        hint: 'Reconoce la exageración evidente como recurso expresivo.',
        points: 100
    },
    {
        id: 3020, topic: 'evaluar', type: 'multiple',
        question: '"Las redes sociales han transformado profundamente las relaciones interpersonales. Por un lado, permiten conectar a personas separadas por miles de kilómetros. Sin embargo, estudios evidencian que el uso excesivo se correlaciona con mayores índices de ansiedad y depresión entre los jóvenes."\n\n¿Cuál es el propósito comunicativo principal?',
        options: ['Convencer al lector de eliminar sus redes sociales', 'Presentar una visión matizada con beneficios y riesgos', 'Demostrar que las redes sociales son perjudiciales para todos', 'Narrar una experiencia personal con las redes sociales'],
        correct: 1,
        explanation: 'El texto presenta argumentos a favor y en contra, ofreciendo una perspectiva equilibrada.',
        hint: 'Identifica si el texto presenta solo un lado del tema o aborda múltiples perspectivas.',
        points: 150
    },
    {
        id: 3021, topic: 'evaluar', type: 'multiple',
        question: '"¡Inscríbete hoy mismo! Plazas limitadas. No dejes pasar esta oportunidad única."\n\n¿Cuál es el propósito comunicativo predominante?',
        options: ['Informar', 'Persuadir o convencer', 'Entretener', 'Describir'],
        correct: 1,
        explanation: 'El uso de imperativos, signos de exclamación y frases de urgencia indican una intención persuasiva.',
        hint: 'Analiza el modo verbal (imperativo) y el tipo de léxico empleado.',
        points: 100
    },
    {
        id: 3022, topic: 'localizar', type: 'multiple',
        question: '"El efecto invernadero es un fenómeno natural que permite la vida en la Tierra. Sin embargo, la actividad humana ha intensificado este efecto mediante la emisión de gases como el CO₂ y el metano, provocando un calentamiento global acelerado."\n\nSegún el texto, ¿qué ha intensificado el ser humano?',
        options: ['La Revolución Industrial', 'La vida en la Tierra', 'El efecto invernadero', 'La emisión de oxígeno'],
        correct: 2,
        explanation: 'El texto afirma explícitamente que "la actividad humana ha intensificado este efecto".',
        hint: 'Busca en el texto qué fenómeno se menciona como intensificado.',
        points: 100
    },
    {
        id: 3023, topic: 'interpretar', type: 'multiple',
        question: '"El viejo reloj de la estación marcaba las once de la noche cuando el último tren partió. En el andén vacío, una mujer permanecía sentada, con un abrigo raído y una maleta cerrada a sus pies. Miraba fijamente el túnel oscuro como si aún esperara verlo regresar."\n\n¿Qué sentimiento transmite la mujer?',
        options: ['Alegría', 'Espera o abandono', 'Entusiasmo', 'Indiferencia'],
        correct: 1,
        explanation: 'Los elementos contextuales construyen una atmósfera de soledad, abandono y espera inútil.',
        hint: 'Analiza las connotaciones de las palabras que describen el entorno.',
        points: 100
    },
    {
        id: 3024, topic: 'evaluar', type: 'multiple',
        question: '"Todos mis amigos tienen este celular, por lo tanto debe ser el mejor del mercado."\n\n¿Qué falacia lógica presenta este razonamiento?',
        options: ['Falacia ad hominem', 'Falacia ad populum (apelación a la mayoría)', 'Falacia de falsa autoridad', 'Falacia de causa falsa'],
        correct: 1,
        explanation: 'La falacia ad populum consiste en argumentar que algo es bueno simplemente porque mucha gente lo hace.',
        hint: 'Identifica si el argumento apela a la popularidad en lugar de a razones objetivas.',
        points: 150
    },
    {
        id: 3025, topic: 'interpretar', type: 'multiple',
        question: '"Al abrir la puerta de su casa, notó que el florero del recibidor estaba en el suelo, hecho añicos, y el cajón de la cómoda abierto de par en par."\n\n¿Qué se puede inferir?',
        options: ['Que hubo una celebración', 'Que probablemente ocurrió un robo', 'Que la persona olvidó hacer el aseo', 'Que entró un animal doméstico jugando'],
        correct: 1,
        explanation: 'Los indicios descritos (objeto roto, cajón abierto) son típicos de una escena de robo.',
        hint: 'Analiza los indicios como pistas que apuntan a una situación probable.',
        points: 100
    },
    {
        id: 3026, topic: 'evaluar', type: 'multiple',
        question: 'Un afiche publicitario muestra una playa paradisíaca con el texto "Escápate del estrés". La imagen ocupa el 90% del afiche.\n\n¿Qué función cumple la imagen?',
        options: ['Solo decorar', 'Reforzar visualmente la promesa emocional del mensaje', 'Informar sobre precios', 'Contradecir el mensaje escrito'],
        correct: 1,
        explanation: 'La imagen complementa y refuerza el mensaje apelando a las emociones del receptor.',
        hint: 'Analiza la relación entre la imagen y el texto.',
        points: 100
    },
    {
        id: 3027, topic: 'evaluar', type: 'multiple',
        question: '"La película dura 142 minutos" y "La película es aburrida".\n\n¿Qué diferencia existe entre ambos enunciados?',
        options: ['Ambos son hechos objetivos', 'El primero es un hecho verificable y el segundo es una opinión subjetiva', 'El primero es una opinión y el segundo es un hecho', 'Ambos son opiniones subjetivas'],
        correct: 1,
        explanation: 'La duración es verificable; "aburrida" es un juicio de valor personal.',
        hint: 'Distingue entre información comprobable y juicios de gusto personal.',
        points: 100
    },
    {
        id: 3028, topic: 'interpretar', type: 'multiple',
        question: '"El profesor explicó la materia de forma LÚCIDA."\n\n¿Qué significa "lúcida" en este contexto?',
        options: ['Confusa', 'Clara y comprensible', 'Rápida', 'Aburrida'],
        correct: 1,
        explanation: '"Lúcido" significa claro en el razonamiento o en la expresión.',
        hint: 'Infiere el significado a partir del contexto positivo de la oración.',
        points: 100
    },
    {
        id: 3029, topic: 'evaluar', type: 'multiple',
        question: '"Excelente servicio. Hace tres días que espero una respuesta a mi reclamo. Felicitaciones por la eficiencia."\n\n¿Qué tono utiliza realmente el emisor?',
        options: ['Alegre y satisfecho', 'Sarcástico', 'Neutral e informativo', 'Triste'],
        correct: 1,
        explanation: 'El contraste entre palabras positivas y la situación descrita revela un tono sarcástico.',
        hint: 'Compara lo que se dice literalmente con la situación real.',
        points: 150
    },
    {
        id: 3030, topic: 'interpretar', type: 'multiple',
        question: '"La inteligencia artificial está revolucionando diversos campos. En medicina, permite diagnósticos más rápidos. En educación, personaliza el aprendizaje. Sin embargo, expertos advierten sobre los riesgos éticos de delegar decisiones críticas en algoritmos."\n\n¿Cuál es la idea principal?',
        options: ['La IA solo tiene aplicaciones en medicina', 'La IA ofrece beneficios pero también plantea desafíos éticos', 'Los vehículos autónomos son el mayor logro', 'La IA debe ser prohibida'],
        correct: 1,
        explanation: 'El texto presenta aplicaciones positivas y luego introduce una advertencia sobre riesgos éticos.',
        hint: 'Identifica la estructura: beneficios + objeción.',
        points: 150
    },
    {
        id: 3031, topic: 'interpretar', type: 'multiple',
        question: '"La inteligencia artificial generativa no crea contenido a partir de la nada; reorganiza y sintetiza patrones estadísticos extraídos de millones de obras humanas previas. Por ello, la noción de \"originalidad\" debe ser reformulada en la era digital."\n\n¿Cuál es la idea principal del fragmento?',
        options: [
            'La IA reemplazará completamente la creatividad humana.',
            'La originalidad debe redefinirse porque la IA crea basándose en patrones preexistentes.',
            'Los derechos de autor han dejado de tener validez frente a la IA.',
            'La IA es incapaz de generar contenido útil.'
        ],
        correct: 1,
        explanation: 'El texto señala que la IA reorganiza patrones de obras previas y que, por ello, el concepto de originalidad debe reformularse.',
        hint: 'Identifica la conclusión que el autor deriva del funcionamiento descrito de la IA.',
        points: 150
    },
    {
        id: 3032, topic: 'evaluar', type: 'multiple',
        question: '"El uso indiscriminado de plásticos de un solo uso ha alcanzado niveles críticos. Si no tomamos medidas drásticas hoy, para el año 2050 habrá más plástico que peces en el océano. ¿Seguiremos siendo testigos pasivos de la destrucción de nuestro propio hogar?"\n\n¿Qué recurso argumentativo predomina?',
        options: [
            'Apelación a autoridades científicas.',
            'Presentación objetiva de datos estadísticos neutros.',
            'Proyección alarmista junto con una pregunta retórica apelativa.',
            'Descripción detallada del proceso químico del plástico.'
        ],
        correct: 2,
        explanation: 'El autor combina un escenario futuro de alto impacto con una pregunta retórica directa al lector para movilizarlo a la acción.',
        hint: 'Identifica los recursos emocionales que buscan generar una reacción en quien lee.',
        points: 150
    }
];

// ============================================================
// PAES COMPETENCIA MATEMÁTICA 1 (M1) — 38 preguntas
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
        question: 'Un comerciante aumenta el precio de un producto en un 25% y luego aplica un descuento del 20% sobre el precio aumentado. ¿Qué ocurre con el precio final respecto al original?',
        options: ['Aumenta un 5%', 'Disminuye un 5%', 'Permanece igual', 'Disminuye un 2,5%'],
        correct: 2,
        explanation: 'Precio original P. Aumento: 1,25P. Descuento: 1,25P × 0,80 = P. El precio vuelve al valor original.',
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
        question: 'En una encuesta, 3/8 de los estudiantes prefiere matemáticas, 1/4 prefiere lenguaje y el resto prefiere ciencias. Si hay 240 estudiantes, ¿cuántos prefieren ciencias?',
        options: ['60', '75', '90', '105'],
        correct: 2,
        explanation: '3/8 + 1/4 = 5/8. El resto es 3/8. 3/8 de 240 = 90.',
        hint: 'Suma las fracciones conocidas y resta del total.',
        points: 100
    },
    {
        id: 1005, topic: 'algebra', type: 'multiple',
        question: 'Si f(x) = 2x + 3 y g(x) = x² - 1, ¿cuál es el valor de f(g(2))?',
        options: ['7', '9', '11', '13'],
        correct: 1,
        explanation: 'g(2) = 3. f(3) = 2(3) + 3 = 9.',
        hint: 'Evalúa primero la función interna.',
        points: 100
    },
    {
        id: 1006, topic: 'algebra', type: 'multiple',
        question: 'Un rectángulo tiene perímetro de 36 cm. Si el largo es el doble del ancho, ¿cuál es el ancho?',
        options: ['6 cm', '9 cm', '12 cm', '18 cm'],
        correct: 0,
        explanation: 'Sea a el ancho, largo = 2a. 2(a + 2a) = 6a = 36 → a = 6.',
        hint: 'Plantea una ecuación usando la fórmula del perímetro.',
        points: 100
    },
    {
        id: 1007, topic: 'algebra', type: 'multiple',
        question: 'La suma de dos números es 45 y su diferencia es 15. ¿Cuál es el producto?',
        options: ['400', '450', '500', '550'],
        correct: 1,
        explanation: 'x + y = 45; x - y = 15. Sumando: 2x = 60 → x = 30, y = 15. Producto = 450.',
        hint: 'Plantea un sistema 2×2 y resuélvelo.',
        points: 100
    },
    {
        id: 1008, topic: 'algebra', type: 'multiple',
        question: '¿Cuál de las siguientes funciones representa una proporcionalidad inversa?',
        options: ['f(x) = 3x', 'f(x) = 3/x', 'f(x) = x + 3', 'f(x) = x²/3'],
        correct: 1,
        explanation: 'La proporcionalidad inversa tiene la forma f(x) = k/x.',
        hint: 'En proporcionalidad inversa, al aumentar x, f(x) disminuye proporcionalmente.',
        points: 100
    },
    {
        id: 1009, topic: 'algebra', type: 'multiple',
        question: 'Una empresa de taxis cobra $500 fijos más $200 por km. ¿Qué función representa el costo C en función de los km x?',
        options: ['C(x) = 200x', 'C(x) = 500x + 200', 'C(x) = 200x + 500', 'C(x) = 700x'],
        correct: 2,
        explanation: 'Función afín: C(x) = mx + b, con m = 200 (variable) y b = 500 (fijo).',
        hint: 'Identifica la parte fija (ordenada) y la variable (pendiente).',
        points: 100
    },
    {
        id: 1010, topic: 'algebra', type: 'multiple',
        question: 'La función f(x) = x² - 6x + 8 tiene ceros en x = 2 y x = 4. ¿Cuál es la coordenada x del vértice?',
        options: ['1', '2', '3', '6'],
        correct: 2,
        explanation: 'El vértice está en el punto medio de los ceros: (2+4)/2 = 3.',
        hint: 'El vértice está en el eje de simetría, promedio de las raíces.',
        points: 100
    },
    {
        id: 1011, topic: 'geometria', type: 'multiple',
        question: 'Un triángulo rectángulo tiene catetos de 6 cm y 8 cm. ¿Cuál es la hipotenusa?',
        options: ['10 cm', '12 cm', '14 cm', '100 cm'],
        correct: 0,
        explanation: 'Por Pitágoras: h² = 6² + 8² = 100 → h = 10 cm.',
        hint: 'Aplica el Teorema de Pitágoras.',
        points: 100
    },
    {
        id: 1012, topic: 'geometria', type: 'multiple',
        question: 'Un cilindro tiene radio 3 cm y altura 10 cm. ¿Cuál es su volumen? (Usa π = 3)',
        options: ['90 cm³', '180 cm³', '270 cm³', '300 cm³'],
        correct: 2,
        explanation: 'V = π × r² × h = 3 × 9 × 10 = 270 cm³.',
        hint: 'Aplica la fórmula: área de la base × altura.',
        points: 100
    },
    {
        id: 1013, topic: 'geometria', type: 'multiple',
        question: 'Un trapecio tiene bases de 8 cm y 14 cm, altura 5 cm. ¿Cuál es su área?',
        options: ['55 cm²', '110 cm²', '22 cm²', '44 cm²'],
        correct: 0,
        explanation: 'Área = (B + b) × h / 2 = (14+8) × 5 / 2 = 55 cm².',
        hint: 'Promedio de las bases por la altura.',
        points: 100
    },
    {
        id: 1014, topic: 'geometria', type: 'multiple',
        question: 'Al aplicar traslación (3, -2) al punto A(1, 4), ¿cuáles son las nuevas coordenadas?',
        options: ['(4, 2)', '(4, 6)', '(-2, 6)', '(2, 4)'],
        correct: 0,
        explanation: '(1+3, 4-2) = (4, 2).',
        hint: 'Suma las componentes del vector a las coordenadas.',
        points: 100
    },
    {
        id: 1015, topic: 'probabilidad', type: 'multiple',
        question: 'En una clase de 30 estudiantes, 18 son mujeres. Probabilidad de elegir un hombre al azar:',
        options: ['0,3', '0,4', '0,5', '0,6'],
        correct: 1,
        explanation: 'Hombres = 12. Probabilidad = 12/30 = 0,4.',
        hint: 'Calcula hombres y divide por el total.',
        points: 100
    },
    {
        id: 1016, topic: 'estadistica', type: 'multiple',
        question: 'Edades: 18, 20, 22, 24, 26. ¿Cuál es el promedio?',
        options: ['20', '21', '22', '23'],
        correct: 2,
        explanation: '(18+20+22+24+26) ÷ 5 = 110 ÷ 5 = 22.',
        hint: 'Suma todos los valores y divide por la cantidad.',
        points: 100
    },
    {
        id: 1017, topic: 'estadistica', type: 'multiple',
        question: 'En un diagrama de cajón, Q1 = 12, Q2 = 18 y Q3 = 28. ¿Cuál es el RIC?',
        options: ['6', '10', '16', '46'],
        correct: 2,
        explanation: 'RIC = Q3 - Q1 = 28 - 12 = 16.',
        hint: 'Resta el primer cuartil del tercer cuartil.',
        points: 100
    },
    {
        id: 1018, topic: 'probabilidad', type: 'multiple',
        question: 'Se lanza un dado de 6 caras. ¿Probabilidad de obtener un número mayor que 4?',
        options: ['1/6', '1/3', '1/2', '2/3'],
        correct: 1,
        explanation: 'Números > 4: 5 y 6. 2/6 = 1/3.',
        hint: 'Casos favorables sobre casos totales.',
        points: 100
    },
    {
        id: 1019, topic: 'probabilidad', type: 'multiple',
        question: 'Urna: 5 bolas rojas y 3 azules. Se extraen dos sin reemplazo. ¿Probabilidad de que ambas sean rojas?',
        options: ['5/14', '25/64', '5/8', '2/5'],
        correct: 0,
        explanation: '(5/8) × (4/7) = 20/56 = 5/14.',
        hint: 'Multiplica probabilidades considerando el cambio en el total.',
        points: 150
    },
    {
        id: 1020, topic: 'estadistica', type: 'multiple',
        question: 'Notas: 3(6), 4(14), 5(10), 6(8), 7(2) en 40 estudiantes. ¿% con nota 5 o 6?',
        options: ['20%', '30%', '45%', '50%'],
        correct: 2,
        explanation: '10 + 8 = 18. (18/40)×100 = 45%.',
        hint: 'Suma frecuencias de 5 y 6, divide por 40 y multiplica por 100.',
        points: 100
    },
    {
        id: 1021, topic: 'numeros', type: 'multiple',
        question: 'Razón harina:azúcar = 3:2. Si se usan 9 tazas de harina, ¿cuántas de azúcar?',
        options: ['4', '5', '6', '7'],
        correct: 2,
        explanation: '3/2 = 9/x → x = 6.',
        hint: 'Plantea una proporción.',
        points: 100
    },
    {
        id: 1022, topic: 'numeros', type: 'multiple',
        question: 'Mapa escala 1:50.000. Distancia en mapa: 8 cm. ¿Distancia real en km?',
        options: ['2 km', '3 km', '4 km', '5 km'],
        correct: 2,
        explanation: '8 × 50.000 = 400.000 cm = 4 km.',
        hint: 'Convierte cm a km dividiendo por 100.000.',
        points: 100
    },
    {
        id: 1023, topic: 'numeros', type: 'multiple',
        question: 'Tres números proporcionales a 2, 3, 5. El menor es 14. ¿Cuál es el mayor?',
        options: ['21', '28', '35', '42'],
        correct: 2,
        explanation: '2k = 14 → k = 7. Mayor = 5k = 35.',
        hint: 'Encuentra la constante de proporcionalidad.',
        points: 150
    },
    {
        id: 1024, topic: 'algebra', type: 'multiple',
        question: 'Trayectoria: f(x) = -x² + 6x + 16. ¿Altura máxima?',
        options: ['20', '25', '28', '30'],
        correct: 1,
        explanation: 'Vértice en x = 3. f(3) = -9 + 18 + 16 = 25.',
        hint: 'Encuentra el vértice de la parábola.',
        points: 150
    },
    {
        id: 1025, topic: 'algebra', type: 'multiple',
        question: '3(x - 2) + 5 = 2(x + 1) - 4. ¿Valor de x?',
        options: ['-3', '-1', '1', '3'],
        correct: 1,
        explanation: '3x - 1 = 2x - 2 → x = -1.',
        hint: 'Desarrolla paréntesis y despeja.',
        points: 100
    },
    {
        id: 1026, topic: 'geometria', type: 'multiple',
        question: 'P(3, -2) se refleja respecto al eje Y. ¿Nuevas coordenadas?',
        options: ['(-3, -2)', '(3, 2)', '(-3, 2)', '(-2, 3)'],
        correct: 0,
        explanation: 'Reflexión eje Y: (x, y) → (-x, y).',
        hint: 'Solo cambia el signo de x.',
        points: 100
    },
    {
        id: 1027, topic: 'geometria', type: 'multiple',
        question: 'Rotación 90° antihorario de A(1, 2) respecto al origen:',
        options: ['(2, -1)', '(-2, 1)', '(2, 1)', '(-1, 2)'],
        correct: 1,
        explanation: '(x, y) → (-y, x). A\' = (-2, 1).',
        hint: 'Intercambia coordenadas y cambia signo de la primera.',
        points: 150
    },
    {
        id: 1028, topic: 'geometria', type: 'multiple',
        question: 'Homotecia k = 3, centro origen. P(2, -1) → P\'?',
        options: ['(6, -3)', '(3, -1)', '(5, -2)', '(6, -1)'],
        correct: 0,
        explanation: 'Multiplica ambas coordenadas por k: (6, -3).',
        hint: 'Multiplica cada coordenada por la razón de homotecia.',
        points: 100
    },
    {
        id: 1029, topic: 'estadistica', type: 'multiple',
        question: 'Notas: 4,5 - 5,0 - 5,5 - 6,0 - 6,5 - 7,0. ¿Mediana?',
        options: ['5,25', '5,5', '5,75', '6,0'],
        correct: 2,
        explanation: '6 datos → promedio de centrales: (5,5 + 6,0)/2 = 5,75.',
        hint: 'Con cantidad par, promedia los dos valores centrales.',
        points: 100
    },
    {
        id: 1030, topic: 'estadistica', type: 'multiple',
        question: 'Edades: 14, 15, 14, 15, 16, 14, 16, 17, 15. ¿Moda?',
        options: ['14', '15', '16', 'No hay moda'],
        correct: 0,
        explanation: '14 aparece 3 veces, más que cualquier otro.',
        hint: 'La moda es el valor más frecuente.',
        points: 100
    },
    {
        id: 1031, topic: 'estadistica', type: 'multiple',
        question: 'Edades: 15(4), 16(8), 17(5), 18(3). ¿Promedio ponderado?',
        options: ['16,15', '16,35', '16,55', '16,75'],
        correct: 1,
        explanation: '(60+128+85+54)/20 = 327/20 = 16,35.',
        hint: 'Multiplica cada valor por su frecuencia, suma y divide por n.',
        points: 100
    },
    {
        id: 1032, topic: 'estadistica', type: 'multiple',
        question: 'En un diagrama de cajón, ¿qué es la línea central de la caja?',
        options: ['El promedio', 'La moda', 'La mediana', 'El rango'],
        correct: 2,
        explanation: 'La línea central representa la mediana (Q2).',
        hint: 'Recuerda la estructura del boxplot.',
        points: 100
    },
    {
        id: 1033, topic: 'probabilidad', type: 'multiple',
        question: 'Dos dados. ¿Probabilidad de suma 7?',
        options: ['1/6', '5/36', '7/36', '1/2'],
        correct: 0,
        explanation: '6 casos favorables de 36: 6/36 = 1/6.',
        hint: 'Enumera los pares que suman 7.',
        points: 100
    },
    {
        id: 1034, topic: 'probabilidad', type: 'multiple',
        question: '4 rojas, 3 azules, 2 verdes. ¿Probabilidad de NO azul?',
        options: ['1/3', '2/3', '4/9', '5/9'],
        correct: 1,
        explanation: 'No azules: 6/9 = 2/3.',
        hint: 'Casos favorables (rojas+verdes) sobre total.',
        points: 100
    },
    {
        id: 1035, topic: 'probabilidad', type: 'multiple',
        question: '50 personas: 30 fútbol, 20 básquetbol, 10 ambos. ¿Probabilidad solo fútbol?',
        options: ['0,4', '0,5', '0,6', '0,8'],
        correct: 0,
        explanation: 'Solo fútbol = 30-10 = 20. 20/50 = 0,4.',
        hint: 'Resta la intersección.',
        points: 150
    },
    {
        id: 1036, topic: 'numeros', type: 'multiple',
        question: 'Un comerciante compra a $20.000. Desea fijar un precio de lista tal que, con un 20% de descuento, gane el 10% sobre el costo. ¿Precio de lista?',
        options: ['$22.000', '$26.400', '$27.500', '$28.000'],
        correct: 2,
        explanation: 'Ganancia: $2.000. Precio final: $22.000. 0,8P = 22.000 → P = 27.500.',
        hint: 'El precio con descuento debe ser $22.000. Divide por 0,8.',
        points: 150
    },
    {
        id: 1037, topic: 'algebra', type: 'multiple',
        question: 'Furgón: $1.500 fijos + $800 por km. ¿Función de costo C(x)?',
        options: ['C(x) = 1.500x + 800', 'C(x) = 800x + 1.500', 'C(x) = 2.300x', 'C(x) = 800(x + 1.500)'],
        correct: 1,
        explanation: 'Fijo = ordenada (1.500), variable = pendiente (800).',
        hint: 'Identifica la parte fija y la variable en la función afín.',
        points: 100
    },
    {
        id: 1038, topic: 'probabilidad', type: 'multiple',
        question: 'Caja: 4 rojas, 5 azules, 3 verdes. ¿Probabilidad de NO azul?',
        options: ['5/12', '7/12', '4/12', '8/12'],
        correct: 1,
        explanation: 'Total: 12. No azules: 7. P = 7/12.',
        hint: 'Suma rojas y verdes, divide por el total.',
        points: 100
    }
];

// ============================================================
// PAES COMPETENCIA MATEMÁTICA 2 (M2) — 35 preguntas
// ============================================================

const paesM2Questions = [
    {
        id: 2001, topic: 'numeros', type: 'multiple',
        question: 'Si log₂(x) = 5, ¿cuál es el valor de x?',
        options: ['10', '16', '25', '32'],
        correct: 3,
        explanation: 'x = 2⁵ = 32.',
        hint: 'log_b(a) = c ⇔ b^c = a.',
        points: 150
    },
    {
        id: 2002, topic: 'numeros', type: 'multiple',
        question: 'log₅(125) + log₅(1/25) = ?',
        options: ['-1', '0', '1', '3'],
        correct: 2,
        explanation: '3 + (-2) = 1.',
        hint: 'Evalúa cada logaritmo por separado.',
        points: 150
    },
    {
        id: 2003, topic: 'matematica-financiera', type: 'multiple',
        question: '$500.000 al 8% anual simple por 3 años. ¿Monto total?',
        options: ['$620.000', '$630.000', '$640.000', '$650.000'],
        correct: 0,
        explanation: 'Interés = 500.000 × 0,08 × 3 = 120.000. Total = 620.000.',
        hint: 'Interés simple: Capital × tasa × tiempo.',
        points: 150
    },
    {
        id: 2004, topic: 'numeros', type: 'multiple',
        question: 'Si 2^(x+1) = 16, ¿cuánto vale 3^x?',
        options: ['9', '27', '81', '243'],
        correct: 1,
        explanation: 'x+1 = 4 → x = 3. 3³ = 27.',
        hint: 'Iguala exponentes y evalúa.',
        points: 150
    },
    {
        id: 2005, topic: 'algebra', type: 'multiple',
        question: 'f(x) = 3·2^x modela bacterias. ¿Cuántas a las 4 horas?',
        options: ['24', '32', '48', '96'],
        correct: 2,
        explanation: 'f(4) = 3·16 = 48.',
        hint: 'Evalúa la función en x = 4.',
        points: 150
    },
    {
        id: 2006, topic: 'algebra', type: 'multiple',
        question: 'sen(θ) = 3/5, θ agudo. ¿cos(θ)?',
        options: ['2/5', '3/4', '4/5', '5/4'],
        correct: 2,
        explanation: 'cos² = 1 - 9/25 = 16/25. cos = 4/5.',
        hint: 'Usa sen² + cos² = 1.',
        points: 150
    },
    {
        id: 2007, topic: 'algebra', type: 'multiple',
        question: 'Período de f(x) = cos(2x):',
        options: ['π', '2π', 'π/2', '4π'],
        correct: 0,
        explanation: 'Período = 2π/k = 2π/2 = π.',
        hint: 'El coeficiente de x comprime el período.',
        points: 150
    },
    {
        id: 2008, topic: 'algebra', type: 'multiple',
        question: '2x + y = 7 ; x - y = -1. ¿x + y?',
        options: ['3', '4', '5', '6'],
        correct: 2,
        explanation: 'x = 2, y = 3. Suma = 5.',
        hint: 'Suma ambas ecuaciones.',
        points: 150
    },
    {
        id: 2009, topic: 'geometria', type: 'multiple',
        question: 'Triángulo rectángulo, ángulo 30°, cateto opuesto 5 cm. ¿Hipotenusa?',
        options: ['5 cm', '10 cm', '5√3 cm', '10√3 cm'],
        correct: 1,
        explanation: 'sen(30°) = 5/h = 1/2 → h = 10.',
        hint: 'Usa sen(30°) = 1/2.',
        points: 150
    },
    {
        id: 2010, topic: 'geometria', type: 'multiple',
        question: 'Circunferencia centro (2, -3), radio 4:',
        options: ['(x-2)²+(y+3)²=4', '(x+2)²+(y-3)²=16', '(x-2)²+(y+3)²=16', '(x-2)²-(y+3)²=16'],
        correct: 2,
        explanation: '(x-h)²+(y-k)² = r² → (x-2)²+(y+3)² = 16.',
        hint: 'Sustituye en la forma canónica.',
        points: 150
    },
    {
        id: 2011, topic: 'geometria', type: 'multiple',
        question: 'Esfera radio 3 cm. ¿Volumen? (π = 3)',
        options: ['36 cm³', '72 cm³', '108 cm³', '144 cm³'],
        correct: 2,
        explanation: 'V = (4/3)×3×27 = 108.',
        hint: 'Aplica V = (4/3)πr³.',
        points: 150
    },
    {
        id: 2012, topic: 'geometria', type: 'multiple',
        question: 'Rectas con pendientes m₁ = 2, m₂ = -1/2:',
        options: ['Paralelas', 'Perpendiculares', 'Coincidentes', 'Ángulo 30°'],
        correct: 1,
        explanation: '2 × (-1/2) = -1 → perpendiculares.',
        hint: 'Producto de pendientes = -1.',
        points: 150
    },
    {
        id: 2013, topic: 'probabilidad', type: 'multiple',
        question: '¿De cuántas formas ordenar 4 libros?',
        options: ['16', '24', '64', '120'],
        correct: 1,
        explanation: '4! = 24.',
        hint: 'Permutación de 4 elementos.',
        points: 150
    },
    {
        id: 2014, topic: 'probabilidad', type: 'multiple',
        question: '60% deporte, 40% música, 25% ambos. P(Música | Deporte):',
        options: ['0,15', '0,25', '0,40', '5/12'],
        correct: 3,
        explanation: '0,25/0,60 = 5/12.',
        hint: 'P(A|B) = P(A∩B)/P(B).',
        points: 200
    },
    {
        id: 2015, topic: 'estadistica', type: 'multiple',
        question: 'Datos: 10,12,14,16,18. Desviación ≈ 2,83. Si se suma 5 a cada dato, ¿la desviación?',
        options: ['Aumenta en 5', 'Disminuye en 5', 'Permanece igual', 'Se duplica'],
        correct: 2,
        explanation: 'La desviación no cambia con traslaciones.',
        hint: 'Sumar constante no altera la dispersión.',
        points: 150
    },
    {
        id: 2016, topic: 'probabilidad', type: 'multiple',
        question: '4 lanzamientos de moneda. ¿Probabilidad de exactamente 2 caras?',
        options: ['1/16', '3/8', '1/2', '5/8'],
        correct: 1,
        explanation: 'C(4,2)/16 = 6/16 = 3/8.',
        hint: 'Usa distribución binomial.',
        points: 200
    },
    {
        id: 2017, topic: 'estadistica', type: 'multiple',
        question: 'En distribución normal, ¿dónde está ~95% de los datos?',
        options: ['±1σ', '±2σ', '±3σ', '±4σ'],
        correct: 1,
        explanation: 'Regla 68-95-99,7: 95% a ±2σ.',
        hint: 'Recuerda la regla empírica.',
        points: 150
    },
    {
        id: 2018, topic: 'probabilidad', type: 'multiple',
        question: 'Subconjuntos de 3 elementos desde 6:',
        options: ['18', '20', '120', '216'],
        correct: 1,
        explanation: 'C(6,3) = 20.',
        hint: 'Combinaciones, no importa el orden.',
        points: 150
    },
    {
        id: 2019, topic: 'matematica-financiera', type: 'multiple',
        question: '$1.000.000 al 10% anual compuesto, 2 años. ¿Monto?',
        options: ['$1.200.000', '$1.210.000', '$1.220.000', '$1.240.000'],
        correct: 1,
        explanation: '1.000.000 × (1,10)² = 1.210.000.',
        hint: 'Interés compuesto: M = C(1+i)^n.',
        points: 150
    },
    {
        id: 2020, topic: 'matematica-financiera', type: 'multiple',
        question: 'Diferencia entre interés simple y compuesto a largo plazo:',
        options: ['Simple siempre mayor', 'Compuesto genera crecimiento exponencial', 'Son iguales', 'Compuesto solo en inversiones'],
        correct: 1,
        explanation: 'El interés compuesto reinvierte ganancias generando crecimiento exponencial.',
        hint: 'Piensa en el efecto "bola de nieve".',
        points: 100
    },
    {
        id: 2021, topic: 'numeros', type: 'multiple',
        question: '(3+2i) + (1-4i) = ?',
        options: ['4-2i', '4+6i', '2-2i', '4+2i'],
        correct: 0,
        explanation: 'Suma partes reales e imaginarias por separado.',
        hint: 'Suma por separado reales e imaginarios.',
        points: 150
    },
    {
        id: 2022, topic: 'numeros', type: 'multiple',
        question: '(2+i)(2-i) = ?',
        options: ['3', '4', '5', '6'],
        correct: 2,
        explanation: '4 - i² = 4+1 = 5.',
        hint: 'i² = -1, aplica suma por diferencia.',
        points: 150
    },
    {
        id: 2023, topic: 'algebra', type: 'multiple',
        question: 'Dominio de f(x) = √(x-4):',
        options: ['Todos ℝ', 'x ≥ 0', 'x ≥ 4', 'x > 4'],
        correct: 2,
        explanation: 'Radicando ≥ 0 → x ≥ 4.',
        hint: 'Lo de dentro de la raíz debe ser ≥ 0.',
        points: 150
    },
    {
        id: 2024, topic: 'algebra', type: 'multiple',
        question: '3x - 7 > 2x + 5. Solución:',
        options: ['x > 12', 'x > 2', 'x < 12', 'x > -12'],
        correct: 0,
        explanation: 'x > 12.',
        hint: 'Agrupa términos semejantes.',
        points: 150
    },
    {
        id: 2025, topic: 'algebra', type: 'multiple',
        question: 'x² - 4x - 5 ≤ 0. Solución:',
        options: ['x ≤ -1 o x ≥ 5', '-1 ≤ x ≤ 5', 'x ≤ -5 o x ≥ 1', 'Todo ℝ'],
        correct: 1,
        explanation: '(x-5)(x+1) ≤ 0 → x ∈ [-1, 5].',
        hint: 'Factoriza y analiza signos.',
        points: 150
    },
    {
        id: 2026, topic: 'algebra', type: 'multiple',
        question: 'cos(θ) = 5/13, θ agudo. ¿tan(θ)?',
        options: ['5/12', '12/5', '12/13', '5/13'],
        correct: 1,
        explanation: 'sen = 12/13. tan = 12/5.',
        hint: 'Encuentra sen con la identidad pitagórica.',
        points: 150
    },
    {
        id: 2027, topic: 'algebra', type: 'multiple',
        question: '2sen(x) - 1 = 0 en [0, 2π):',
        options: ['{π/6}', '{π/6, 5π/6}', '{π/3, 2π/3}', '{π/6, 11π/6}'],
        correct: 1,
        explanation: 'sen(x) = 1/2 → x = π/6, 5π/6.',
        hint: 'Seno positivo en 1er y 2do cuadrante.',
        points: 200
    },
    {
        id: 2028, topic: 'geometria', type: 'multiple',
        question: 'Distancia entre A(1,3) y B(5,6):',
        options: ['3', '4', '5', '6'],
        correct: 2,
        explanation: '√(16+9) = 5.',
        hint: 'Aplica fórmula de distancia.',
        points: 150
    },
    {
        id: 2029, topic: 'geometria', type: 'multiple',
        question: 'Recta por (0,4) y (2,0):',
        options: ['y = -2x+4', 'y = 2x+4', 'y = -x+2', 'y = x+4'],
        correct: 0,
        explanation: 'm = -2, intercepto = 4.',
        hint: 'Calcula pendiente y usa el punto (0,4).',
        points: 150
    },
    {
        id: 2030, topic: 'estadistica', type: 'multiple',
        question: 'Datos {2,4,6,8}, media 5. ¿Varianza poblacional?',
        options: ['3', '4', '5', '6'],
        correct: 2,
        explanation: '(9+1+1+9)/4 = 5.',
        hint: 'Promedio de diferencias al cuadrado.',
        points: 200
    },
    {
        id: 2031, topic: 'estadistica', type: 'multiple',
        question: 'Varianza = 16. ¿Desviación estándar?',
        options: ['2', '4', '8', '16'],
        correct: 1,
        explanation: '√16 = 4.',
        hint: 'La desviación es la raíz de la varianza.',
        points: 100
    },
    {
        id: 2032, topic: 'estadistica', type: 'multiple',
        question: 'Normal: media 100, σ = 15. ¿% entre 70 y 130?',
        options: ['68%', '95%', '99,7%', '50%'],
        correct: 1,
        explanation: '70 = 100-2σ, 130 = 100+2σ → 95%.',
        hint: 'Calcula cuántas σ hay de diferencia.',
        points: 150
    },
    {
        id: 2033, topic: 'algebra', type: 'multiple',
        question: 'log₂(x-3) + log₂(x+1) = 5. ¿Valor de x?',
        options: ['x = 7', 'x = 7 y x = -5', 'x = 5', 'x = 33/2'],
        correct: 0,
        explanation: '(x-3)(x+1)=32 → x²-2x-35=0 → x=7 o x=-5. Dominio: x>3 → x=7.',
        hint: 'Aplica propiedad de logaritmos y verifica el dominio.',
        points: 200
    },
    {
        id: 2034, topic: 'geometria', type: 'multiple',
        question: 'Faro 40 m, ángulo de depresión 30°. ¿Distancia horizontal al barco?',
        options: ['40 m', '40√3 m', '(40√3)/3 m', '80 m'],
        correct: 1,
        explanation: 'tan(30°) = 40/d → d = 40√3.',
        hint: 'Usa tangente del ángulo de elevación.',
        points: 200
    },
    {
        id: 2035, topic: 'probabilidad', type: 'multiple',
        question: '7 profesionales para 3 cargos distintos. ¿Cuántas formas?',
        options: ['35', '210', '504', '840'],
        correct: 1,
        explanation: 'V(7,3) = 7×6×5 = 210.',
        hint: 'Como los cargos son distintos, importa el orden.',
        points: 150
    }
];

// ============================================================
// CULTURA GENERAL CIENTÍFICA (2 preguntas - Nivel 4 Mixto)
// ============================================================

const culturaGeneralQuestions = [
    {
        id: 4001, topic: 'biologia', type: 'multiple',
        question: 'Un inhibidor enzimático hace caer la síntesis de ATP mitocondrial, pero la glucólisis citoplasmática continúa normal. ¿Qué complejo está siendo afectado?',
        options: [
            'La ATP sintasa en la membrana interna mitocondrial.',
            'Las enzimas del ciclo de Krebs en el citosol.',
            'Los transportadores de glucosa en la membrana plasmática.',
            'Los ribosomas libres del citoplasma.'
        ],
        correct: 0,
        explanation: 'La ATP sintasa está en las crestas mitocondriales. La glucólisis ocurre en el citosol y no depende directamente de este complejo.',
        hint: 'Identifica dónde ocurre la síntesis de ATP acoplada a la cadena transportadora.',
        points: 150
    },
    {
        id: 4002, topic: 'fisica', type: 'multiple',
        question: 'Luz pasa de aire (n≈1,0) a vidrio (n≈1,5). ¿Qué sucede con velocidad y frecuencia?',
        options: [
            'La velocidad disminuye y la frecuencia permanece constante.',
            'La velocidad aumenta y la frecuencia disminuye.',
            'Tanto velocidad como frecuencia disminuyen.',
            'La velocidad permanece constante y la frecuencia aumenta.'
        ],
        correct: 0,
        explanation: 'En un medio más denso (mayor n), v = c/n disminuye. La frecuencia es propiedad de la fuente y no cambia.',
        hint: 'La frecuencia depende de la fuente, no del medio.',
        points: 150
    }
];

// ============================================================
// EXPORTACIÓN CONSOLIDADA
// ============================================================

const paesBancoCompleto = {
    lenguaje: paesLenguajeQuestions,
    matematica1: paesM1Questions,
    matematica2: paesM2Questions,
    culturaGeneral: culturaGeneralQuestions
};

// Compatible con Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = paesBancoCompleto;
}
