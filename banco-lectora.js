
/**
 * ============================================================
 * PAES CHALLENGE — BANCO DE COMPETENCIA LECTORA
 * 12 Lecturas completas + 77 preguntas
 * Fuentes: DEMRE - PAES 2025-2026
 * ============================================================
 */

// ============================================================================
// I. DICCIONARIO DE LECTURAS COMPLETAS
// ============================================================================
const paesTexts = {
  wislawa_discurso: {
    title: "Discurso de Aceptación del Premio Nobel: El Poeta y el Mundo",
    author: "Wisława Szymborska",
    body: "Se dice que el primer párrafo de un discurso suele ser el más difícil. Ciertamente, toda imperfección resulta más fácil de aguantar si se sirve en pequeñas dosis. Por eso seré breve. Los poetas contemporáneos son seres escépticos y desconfiados, incluso de sí mismos. Con desgana confiesan que se dedican a la poesía, como si se tratara de una debilidad o un secreto vergonzoso. En esta época de transformaciones y pragmatismo, el quehacer poético parece carecer de la seriedad objetiva de otras disciplinas científicas o académicas...\n\nLa inspiración, cualquier cosa que sea, nace de un perpetuo \"no lo sé\". Es un cuestionamiento constante que nos aleja de las verdades absolutas y nos obliga a buscar nuevas formas de interpretar la realidad. Figuras como Isaac Newton o Marie Sklodowska-Curie compartían este espíritu inquieto: sabían que cada descubrimiento era solo la puerta hacia un nuevo misterio. El verdadero creador nunca se conforma con lo aprendido."
  },
  el_juego_existencial: {
    title: "El Juego como Actitud Existencial y la Fosilización de las Reglas",
    author: "Ensayística Contemporánea",
    body: "Imagine introducir a una rata en un laberinto complejo. Si el espécimen ha tenido la oportunidad previa de jugar y explorar dicho espacio sin presiones, resolverá el acertijo de comida con una velocidad sustancialmente mayor que aquella rata que jamás ha experimentado el entorno de forma libre. Este hecho biológico introduce con claridad las ventajas evolutivas del juego adaptativo. Las especies adultas realmente aptas para el juego son también las más cosmopolitas, aquellas capaces de adecuarse a climas y contingencias variadas, maximizando su supervivencia...\n\nEn nuestro idioma español, una deficiencia semántica severa aglutina dos dimensiones existenciales disímiles bajo el mismo vocablo: el 'juego'. El inglés diferencia con nitidez el 'game' (la institución social con reglas fijas y ríspidas) del 'play' (la actitud lúdica y existencial). Los juegos formalizados, como el ajedrez o el bridge, no garantizan de forma intrínseca la actitud lúdica. Son, en realidad, meros fósiles de un acto de libertad pura que puede extinguirse si el jugador se somete rígidamente al formalismo."
  },
  psicologia_subcampos: {
    title: "Introducción a la Psicología Contemporánea: Una Confederación Científica",
    author: "Asociación Americana de Psicología (APA)",
    body: "Existe un mito generalizado entre la población lego que reduce el campo de acción del psicólogo a la práctica psicoterapéutica en un diván. Definir la psicología contemporánea es un ejercicio de mayor complejidad: opera como un amplio paraguas institucional para una confederación de subdisciplinas científicas especializadas. La APA cuenta con más de 50 divisiones activas...\n\nLa Neurociencia y la Psicología Fisiológica investigan las bases biológicas fundamentales de la conducta, los pensamientos y las emociones humanas. Se concentran en el estudio del sistema nervioso central, el cerebro y el impacto de mensajeros químicos como las hormonas. Por su parte, la Psicología Experimental delimita su quehacer mediante la aplicación del método científico estricto a procesos cognitivos básicos. Finalmente, disciplinas como la Psicología del Consejo abordan los problemas normales de ajuste laboral, familiar o social que todo individuo experimenta en su ciclo vital."
  },
  artes_escenicas: {
    title: "Teoría del Arte y Delimitación del Espacio Escénico",
    author: "Charles Batteux / Historiografía Estética",
    body: "Fue Charles Batteux en 1746 quien introdujo formalmente el concepto de 'bellas artes' para separar aquellas disciplinas orientadas a la producción de belleza y deleite estético de las artes meramente utilitarias. A lo largo del siglo XX, esta taxonomía incorporó manifestaciones de masas como el cine, la fotografía y la historieta. Las artes escénicas tradicionales, si bien gozan de esta consideración de facto, plantean desafíos conceptuales particulares...\n\nLa música, por ejemplo, se diferencia de la representación teatral clásica debido a que su expresión formal no está supeditada de manera obligatoria a la escena física ni a soportes materiales rígidos para existir. En el teatro, el espectador abandona su rol pasivo: contesta activamente a través de sus gestos, respiración y complicidad. El edificio teatral encuentra su centro vital en el espacio de representación, la zona exacta donde confluyen intérpretes y público para transformar un escenario vacío en una experiencia colectiva única."
  },
  seguridad_social_cartilla: {
    title: "Cartilla Informativa del Trabajador: Derechos y Previsión Social",
    author: "Dirección del Trabajo / Instituto de Previsión Social",
    body: "La incorporación formal al mundo laboral requiere que todo ciudadano conozca a cabalidad los hitos cronológicos que rigen un contrato laboral. Las cotizaciones previsionales no constituyen un descuento arbitrario, sino un mecanismo obligatorio diseñado para financiar la seguridad social del trabajador en ámbitos de jubilación, salud, cesantía y accidentes...\n\nMientras que los fondos de salud y AFP son financiados de forma directa por el trabajador, el Seguro de Cesantía cuenta con un diseño mixto donde la mayor parte de la cotización es financiada por el empleador. Asimismo, herramientas estatales como el Subsidio al Empleo Joven apoyan simultáneamente al trabajador y a las empresas que fomentan la contratación de este segmento. Frente a contingencias extremas como despidos bajo la causal de 'necesidades de la empresa', la ley establece protecciones estrictas y excepciones irrenunciables, prohibiendo su aplicación en trabajadores que se encuentren con licencia médica vigente."
  },
  formacion_civica: {
    title: "Guía de Formación Cívica: La Persona y los Derechos Humanos",
    author: "DEMRE / Ministerio de Educación",
    body: "El ser humano es por naturaleza un ser social y político. La necesidad de convivir con otros no responde únicamente a un impulso biológico básico de supervivencia, sino a la búsqueda del desarrollo integral de sus facultades psíquicas y espirituales. En la rica tradición aristotélica, se plantea firmemente que el individuo solo es capaz de alcanzar la plenitud y la felicidad en relación con los demás, es decir, dentro del tejido de una comunidad organizada...\n\nA lo largo del siglo XX, la humanidad fue testigo de tragedias devastadoras que evidenciaron la peor cara de nuestro potencial destructivo. Estos hitos históricos actúan como una severa advertencia que nos obliga a actuar con estricta responsabilidad y conciencia ética respecto al uso de nuestra inteligencia colectiva. Desde una perspectiva secular, la dignidad humana se alude como la cualidad esencial en virtud de la cual se distingue lo humano de lo no humano, constituyendo la base y justificación moral de los Derechos Humanos, los cuales se presentan indisolublemente ligados a ella."
  },
  espanol_actual: {
    title: "Español Actual: Globalización e Interculturalidad",
    author: "Estudios Lingüísticos Contemporáneos",
    body: "La globalización contemporánea ejerce un impacto directo y asimétrico en la interacción de las comunidades lingüísticas del planeta. La tendencia hacia una homogeneización cultural acelerada conlleva el riesgo inminente de provocar la desaparición de lenguas minoritarias y culturas locales. Frente a esta presión, la interculturalidad surge como un concepto en construcción, algo por hacer que debe teorizarse a partir de las relaciones cotidianas y el respeto mutuo...\n\nEn el escenario internacional, el inglés se ha posicionado de forma hegemónica como la lengua global. Este dominio se sustenta en la imposición corporativa por parte de grandes multinacionales (como Coca-Cola, Microsoft o Apple) que obligan a proveedores y clientes a adoptar dicho idioma, reforzado por políticas lingüísticas estatales y una presencia masiva en redes de información. La sociolingüística, a través de modelos como la clasificación de Calvet, sitúa al inglés en la cúspide como lengua hipercentral, mientras que idiomas de gran alcance demográfico como el español, el chino o el hindi actúan como lenguas supercentrales que gravitan en su entorno. El bilingüismo vertical promueve la adquisición de lenguas de jerarquía superior, mientras que el bilingüismo horizontal busca un diálogo equitativo libre de dominación jerárquica."
  },
  kioscos_saludables: {
    title: "Guía de Kioscos Escolares y Colaciones Saludables",
    author: "Ministerio de Salud",
    body: "La prevalencia alarmante de sobrepeso y obesidad infantil en las comunidades educativas (que supera el 50% en los primeros niveles básicos) motivó el diseño de una estrategia estatal para intervenir los entornos alimentarios escolares. La Ley N° 20.606 establece un marco normativo para asegurar la disponibilidad de colaciones saludables y regular de forma estricta la comercialización de alimentos al interior de los colegios...\n\nPara que un kiosco escolar pueda operar de forma legítima, es requisito obligatorio contar con la correspondiente autorización sanitaria de funcionamiento. El Reglamento Sanitario de los Alimentos (RSA) clasifica estos recintos en tres categorías (A, B y C) a través de su Tabla 1, la cual permite diferenciar con nitidez los requerimientos técnicos y de infraestructura requeridos para el almacenamiento y expendio de preparaciones sencillas o alimentos envasados. Queda estrictamente prohibido publicitar, promocionar o regalar productos que exhiban sellos de advertencia 'Alto en' o que excedan los límites permitidos de nutrientes críticos y calorías."
  },
  quimica_vitalismo: {
    title: "Química Orgánica: La Crisis del Vitalismo",
    author: "Historiografía de la Ciencia",
    body: "Durante las primeras décadas del siglo XIX, la comunidad científica respaldaba de forma unánime el dogma del vitalismo. Esta corriente filosófica y química sostenía que las sustancias orgánicas poseían una 'fuerza vital' exclusiva de los organismos vivos, lo que imposibilitaba su síntesis artificial en un laboratorio a partir de materia inerte. Esta frontera conceptual dividía rígidamente el mundo orgánico del inorgánico...\n\nLa crisis y posterior colapso de esta teoría comenzó en 1828 con el trabajo fortuito de Friedrich Wöhler, quien logró obtener cristales de urea (un compuesto orgánico idéntico al presente en la orina animal) calentando cianato amónico, una sustancia puramente inorgánica. Años más tarde, investigadores como Hermann Kolbe consolidaron esta ruptura al sintetizar ácido acético directamente a partir de sus elementos constituyentes elementales, demostrando de forma empírica que los compuestos orgánicos están supeditados a las mismas leyes físico-químicas que gobiernan el mundo mineral."
  },
  conservacion_insectos: {
    title: "Conservación de Insectos en Chile",
    author: "Estudios de Biodiversidad y Entomología",
    body: "Los insectos constituyen el grupo de organismos con mayor éxito evolutivo en la Tierra, representando más de la mitad de todas las especies conocidas y descritas por la ciencia, lo que evidencia una abrumadora superioridad numérica frente a otros taxones como los cordados, que apenas alcanzan un modesto porcentaje. A pesar de su relevancia, las dinámicas de sus poblaciones muestran marcadas oscilaciones estacionales que dificultan la obtención de conclusiones fiables sin muestreos sistemáticos de largo aliento...\n\nEn la actualidad, las presiones de carácter antrópico (acciones humanas como el uso intensivo de plaguicidas y la dispersión de antibióticos de uso humano o veterinario) amenazan severamente su supervivencia, llegando a provocar alteraciones críticas en su microbiota interna y elevando su vulnerabilidad ante patógenos. En el contexto nacional, la gran mayoría de las especies de insectos nativos no cuenta con una clasificación oficial en los registros de conservación. Es urgente revertir este vacío institucional y proteger este porcentaje no categorizado, dado que estos organismos ejecutan procesos ecológicos basales que garantizan la estabilidad de la biósfera y de la propia vida humana."
  },
  medicina_renacimiento: {
    title: "Medicina y Arte en el Renacimiento",
    author: "Estudios Humanistas",
    body: "El Renacimiento propició una convergencia inédita entre las disciplinas artísticas y la investigación médica. Los grandes maestros del período compartían un interés ferviente por lograr la representación geométrica y anatómica exacta de las formas humanas en sus lienzos y esculturas. Para cumplir con esta ambición estética de perfección física, los artistas recurrieron de forma sistemática a las leyes de la anatomía descriptiva y participaron de forma directa en sesiones de disección de cadáveres, aportando una visión geométrica y objetiva al estudio empírico de las estructuras corporales...\n\nEste movimiento de renovación científica se cimentó sobre la tradición de figuras medievales tardías como Mondino de Luzzi, pionero en reintroducir la disección pública en los currículos universitarios. Bajo esta influencia directa, los humanistas médicos del Renacimiento procedieron a realizar una revisión crítica y filológica minuciosa de los textos clásicos de la antigüedad, depurando las traducciones erróneas acumuladas durante siglos y sentando las bases del método anatómico moderno basado en la observación ocular directa sobre la autoridad de los dogmas antiguos."
  },
  calor_agosto: {
    title: "El Calor de Agosto",
    author: "Relato Literario",
    body: "El día se presentaba opresivo, con una temperatura sofocante que parecía derretir el asfalto de las calles. Me encontraba en mi estudio cuando finalicé un dibujo nacido enteramente de mi imaginación: el retrato detallado de un hombre con aspecto de criminal que comparecía ante un tribunal. Impulsado por la necesidad de aire, abandoné mi hogar y caminé sin rumbo fijo hasta terminar en el taller de Charles Atkinson, un artesano que se dedicaba con esmero a tallar losas y lápidas de mármol con el auxilio de un martillo y un cincel...\n\nAl ingresar al recinto, una oleada de incomodidad profunda me recorrió el cuerpo; una sensación marcadamente antinatural y siniestra me paralizó al observar el rostro del escultor. Era exactamente el mismo individuo que yo había plasmado en mi bloc de notas horas atrás. La atmósfera se tornó aún más tensa cuando Atkinson me enseñó la losa en la que trabajaba: una lápida terminada que portaba grabados con total precisión mi nombre completo, mis datos exactos de nacimiento y la fecha del día corriente como el momento de mi fallecimiento."
  }
};

// ============================================================================
// II. BANCO DE PREGUNTAS (77 REACTIVOS)
// ============================================================================
const paesLenguajeQuestions = [
  // --- TEXTO 1: WISŁAWA SZYMBORSKA (8 preguntas) ---
  {
    id: 1001, textKey: 'wislawa_discurso', topic: 'interpretar', type: 'multiple',
    question: 'En el primer párrafo, ¿con qué propósito la emisora utiliza la expresión "Toda imperfección resulta más fácil de aguantar si se sirve en pequeñas dosis"?',
    options: [
      'Para admitir que es indigna del premio otorgado.',
      'Para justificar la extensión de su propio discurso.',
      'Para reconocer la inexperiencia que la inseguriza.',
      'Para transmitir que conoce los intereses de la audiencia.'
    ],
    correct: 1,
    explanation: 'La autora justifica de forma humorística y humilde por qué su discurso será breve, mencionando justo antes que casi nunca se ha expresado sobre la poesía.',
    hint: 'Observa la relación directa entre la frase y la declaración de brevedad que realiza la autora inmediatamente después.',
    points: 100
  },
  {
    id: 1002, textKey: 'wislawa_discurso', topic: 'interpretar', type: 'multiple',
    question: '¿Cuál es la idea central que se desarrolla en el segundo párrafo?',
    options: [
      'Los poetas reconocen con dificultad las virtudes de su quehacer.',
      'Los poetas prefieren ser reconocidos públicamente como escritores.',
      'Los poetas parecen ser menos serios que los profesores de Filosofía.',
      'Los poetas provocan inquietud al revelar su profesión a otras personas.'
    ],
    correct: 0,
    explanation: 'El párrafo explica que el poeta contemporáneo es escéptico y desconfía de sí mismo, y que reconocer las virtudes de su oficio es mucho más difícil.',
    hint: 'Busca la afirmación que sintetice la actitud autocrítica y desconfiada del poeta contemporáneo hacia su propio oficio.',
    points: 100
  },
  {
    id: 1003, textKey: 'wislawa_discurso', topic: 'interpretar', type: 'multiple',
    question: '¿Con qué propósito la emisora relata la anécdota sobre Brodsky?',
    options: [
      'Para revelar la crítica al estilo de vida que tienen los poetas.',
      'Para destacar la figura de los poetas como seres irreverentes.',
      'Para ilustrar la idea de que los poetas se avergüenzan de su oficio.',
      'Para validar la idea de que se puede ser poeta sin una certificación.'
    ],
    correct: 3,
    explanation: 'La anécdota demuestra de manera irónica la absurdidad de requerir diplomas oficiales para validar la poesía.',
    hint: 'Analiza la ironía tras el juicio legal a Brodsky por no poseer un documento que acreditara su condición de artista.',
    points: 100
  },
  {
    id: 1004, textKey: 'wislawa_discurso', topic: 'evaluar', type: 'multiple',
    question: '¿Cuál es la crítica de la emisora a las películas biográficas sobre artistas y científicos?',
    options: [
      'Que excluyen los momentos clave de sus trayectorias vitales.',
      'Que omiten el origen de sus procesos creativos e intelectuales.',
      'Que desestiman sus méritos en la búsqueda del reconocimiento.',
      'Que banalizan sus experiencias mediante la música y el dramatismo.'
    ],
    correct: 1,
    explanation: 'La autora señala que estas películas omiten el extraño estado de ánimo conocido como inspiración, dejando fuera el verdadero origen del proceso creativo.',
    hint: 'Fíjate en lo que la emisora argumenta sobre la incapacidad de las películas para retratar fielmente la inspiración.',
    points: 150
  },
  {
    id: 1005, textKey: 'wislawa_discurso', topic: 'localizar', type: 'multiple',
    question: 'Según el quinto párrafo, ¿cuál es la ambición de quienes dirigen películas sobre grandes científicos y artistas?',
    options: [
      'Recrear los procesos creativos de científicos y artistas.',
      'Retratar la biografía de científicos y artistas con exactitud.',
      'Transmitir la satisfacción de científicos y artistas por sus obras.',
      'Destacar las repercusiones de la labor de científicos y artistas.'
    ],
    correct: 0,
    explanation: 'El texto explicita que la tarea de los directores más ambiciosos es mostrar en forma verosímil el proceso creativo que condujo a importantes descubrimientos.',
    hint: 'Busca en el texto la mención explícita sobre la meta de los directores de cine más ambiciosos.',
    points: 100
  },
  {
    id: 1006, textKey: 'wislawa_discurso', topic: 'localizar', type: 'multiple',
    question: 'Según la emisora, ¿de dónde proviene la inspiración?',
    options: [
      'Del interés en la aventura.',
      'Del conocimiento del oficio.',
      'Del compromiso con el trabajo.',
      'Del cuestionamiento constante.'
    ],
    correct: 3,
    explanation: 'La emisora concluye explícitamente: "La inspiración, cualquier cosa que sea, nace de un perpetuo \'no lo sé\'".',
    hint: 'Identifica el concepto abstracto que la autora vincula con la expresión constante de no poseer certezas absolutas.',
    points: 100
  },
  {
    id: 1007, textKey: 'wislawa_discurso', topic: 'interpretar', type: 'multiple',
    question: '¿Con qué propósito la emisora menciona a Isaac Newton y a Marie Sklodowska-Curie?',
    options: [
      'Para comparar los procesos creativos de los científicos con los de los artistas.',
      'Para destacar las consecuencias de la observación de la naturaleza para los creadores.',
      'Para mostrar los resultados obtenidos por personalidades con espíritu inquieto.',
      'Para describir las anécdotas que inspiraron a personas en búsqueda constante.'
    ],
    correct: 2,
    explanation: 'Ambos personajes ejemplifican cómo el espíritu inquieto y de búsqueda constante los llevó a realizar descubrimientos trascendentales.',
    hint: 'Vincula los nombres de estos científicos célebres con la idea del perpetuo cuestionamiento expresada líneas atrás.',
    points: 100
  },
  {
    id: 1008, textKey: 'wislawa_discurso', topic: 'interpretar', type: 'multiple',
    question: '¿Qué estado anímico de la emisora se interpreta al inicio del discurso?',
    options: [
      'Nerviosismo, porque ignora el tema que va a desarrollar en su discurso.',
      'Agobio, porque reconoce que la elaboración de su discurso fue desprolija.',
      'Pesimismo, porque cree que su exposición es insuficiente para un discurso.',
      'Incomodidad, porque plantea su falta de práctica frente al tema del discurso.'
    ],
    correct: 3,
    explanation: 'La emisora confiesa que las frases le resultan difíciles ya que debe hablar sobre poesía, tema sobre el cual muy raras veces se ha expresado en público.',
    hint: 'Evalúa la razón por la cual la emisora declara que le cuesta estructurar sus primeras palabras frente al público.',
    points: 100
  },

  // --- TEXTO 2: EL JUEGO (8 preguntas) ---
  {
    id: 1009, textKey: 'el_juego_existencial', topic: 'interpretar', type: 'multiple',
    question: 'En el primer párrafo, ¿qué estrategia utiliza la emisora para introducir el tema del juego?',
    options: [
      'Una narración que contiene un mensaje acerca del juego.',
      'Una metáfora que profundiza sobre el sentido del juego.',
      'Una anécdota que indaga las características del juego.',
      'Una comparación que explica las ventajas del juego.'
    ],
    correct: 3,
    explanation: 'La autora compara el desempeño en un laberinto de una rata que ha jugado previamente frente a otra sin esa experiencia.',
    hint: 'Determina qué tipo de recurso discursivo utiliza el contraste conductual entre ambos especímenes en el experimento.',
    points: 100
  },
  {
    id: 1010, textKey: 'el_juego_existencial', topic: 'interpretar', type: 'multiple',
    question: '¿Cuál es la idea principal del tercer párrafo?',
    options: [
      'El juego motiva la exploración en los animales.',
      'El juego es exclusivo de las especies juveniles.',
      'El juego favorece la adaptación de las especies.',
      'El juego es una actividad transversal a los animales.'
    ],
    correct: 2,
    explanation: 'El párrafo concluye que las especies aptas para el juego en la edad adulta son las más cosmopolitas y con mayor capacidad de supervivencia.',
    hint: 'Presta atención al cierre del párrafo, donde se vincula la lúdica con la supervivencia y adaptabilidad.',
    points: 100
  },
  {
    id: 1011, textKey: 'el_juego_existencial', topic: 'interpretar', type: 'multiple',
    question: '¿Con qué finalidad se explican los vocablos "game" y "play" en la lectura?',
    options: [
      'Para describir el origen de la palabra "juego" en el idioma inglés.',
      'Para evidenciar la existencia de distintos significados de la palabra "juego".',
      'Para mostrar la forma en que el lenguaje determina el juego en una cultura.',
      'Para respaldar la influencia del inglés en la creación de distintos tipos de juegos.'
    ],
    correct: 1,
    explanation: 'Se recurre a estos términos para demostrar una deficiencia semántica en español, donde una sola palabra engloba dos realidades distintas.',
    hint: 'Compara las dos definiciones en inglés provistas para notar la dualidad que el castellano unifica bajo un solo término.',
    points: 100
  },
  {
    id: 1012, textKey: 'el_juego_existencial', topic: 'interpretar', type: 'multiple',
    question: '¿Cuál es la idea principal de la sección "Los juegos no son sino los fósiles del juego"?',
    options: [
      'La autenticidad del juego tiene su origen en la infancia.',
      'El juego depende de la forma de experimentar los hechos.',
      'La distinción en torno al juego es propia de ciertos idiomas.',
      'El juego es una problemática de interés para los intelectuales.'
    ],
    correct: 1,
    explanation: 'Se argumenta que participar en un juego formalizado no garantiza la actitud lúdica; esta depende de la actitud existencial con que se experimente.',
    hint: 'Piensa en el rol del estado interno y la disposición del sujeto frente a las actividades frente a los reglamentos rígidos.',
    points: 100
  },
  {
    id: 1013, textKey: 'el_juego_existencial', topic: 'localizar', type: 'multiple',
    question: '¿Qué afirma la emisora sobre el bridge?',
    options: [
      'Que es un juego peculiar.',
      'Que es un juego aburrido.',
      'Que es un juego instituido.',
      'Que es un juego auténtico.'
    ],
    correct: 2,
    explanation: 'La autora menciona explícitamente al bridge junto con el ajedrez como ejemplos de "juegos instituidos" o "instituciones sociales".',
    hint: 'Identifica la categoría exacta en la cual el fragmento agrupa al bridge y al ajedrez.',
    points: 100
  },
  {
    id: 1014, textKey: 'el_juego_existencial', topic: 'interpretar', type: 'multiple',
    question: 'En el segmento "Algunos de los sabios más eminentes, entre los que cabe citar al azar a Kepler, Ampère, Darwin...", ¿qué se infiere sobre la emisora a partir de la expresión subrayada?',
    options: [
      'Considera que un criterio para nombrar sabios es la calidad de sus opiniones.',
      'Piensa que muchos otros sabios destacados se han referido al valor del juego.',
      'Estudia la influencia de la casualidad en el trabajo de los sabios sobre el juego.',
      'Comparte la perspectiva teórica sobre el juego de los sabios que menciona después.'
    ],
    correct: 1,
    explanation: 'Al decir "citar al azar", implica que la lista de grandes científicos que han validado la importancia del juego es sumamente amplia.',
    hint: 'Determina qué connota el hecho de que una lista de nombres sea elegida de forma aleatoria de un universo de posibilidades.',
    points: 100
  },
  {
    id: 1015, textKey: 'el_juego_existencial', topic: 'interpretar', type: 'multiple',
    question: 'En relación con el turista, ¿qué representa la referencia a las mariposas clavadas con alfileres en una caja?',
    options: [
      'La búsqueda de renovación vital a través de un viaje.',
      'La intención de cumplir el deseo de realizar un viaje.',
      'El daño a la naturaleza al guardar recuerdos de viaje.',
      'El anhelo de conservación de una experiencia de viaje.'
    ],
    correct: 3,
    explanation: 'La metáfora alude a la obsesión del turista convencional por "coleccionar recuerdos" estáticos y planificados.',
    hint: 'Analiza el efecto estático de inmovilizar un elemento vivo y cómo se condice con la rigidez de atesorar recuerdos.',
    points: 100
  },
  {
    id: 1016, textKey: 'el_juego_existencial', topic: 'interpretar', type: 'multiple',
    question: 'A partir de la lectura, ¿qué condición es necesaria para que cualquier vivencia pueda transformarse en un "oasis de dicha"?',
    options: [
      'La autenticidad de la experiencia.',
      'La experimentación del placer.',
      'La apreciación de la belleza.',
      'La activación del recuerdo.'
    ],
    correct: 0,
    explanation: 'El texto vincula el "oasis de dicha" con la pureza del juego: cuanto más auténtico es el juego, más liberado se siente el jugador.',
    hint: 'Busca la propiedad de la acción lúdica que condiciona el sentimiento de liberación y pureza del jugador.',
    points: 100
  },

  // --- TEXTO 3: PSICOLOGÍA (7 preguntas) ---
  {
    id: 1017, textKey: 'psicologia_subcampos', topic: 'interpretar', type: 'multiple',
    question: 'En la lectura, ¿qué función cumple la afirmación que da inicio al primer párrafo?',
    options: [
      'Criticar el rol limitado de la psicoterapia para el tratamiento de afecciones mentales.',
      'Problematizar la idea generalizada sobre el campo de acción de la psicología.',
      'Relativizar el real aporte de los psicoterapeutas al desarrollo de la disciplina.',
      'Cuestionar la existencia de múltiples ámbitos de estudio en la psicología.'
    ],
    correct: 1,
    explanation: 'La pregunta inicial plantea un mito popular y seguidamente aclara que definir la psicología va mucho más allá de la terapia personal.',
    hint: 'Analiza cómo los autores contrastan la percepción popular con la realidad multifacética de la carrera.',
    points: 100
  },
  {
    id: 1018, textKey: 'psicologia_subcampos', topic: 'interpretar', type: 'multiple',
    question: '¿Qué función cumple la mención sobre la Asociación Americana de Psicología (APA) en la sección "Los campos de la psicología"?',
    options: [
      'Ejemplificar una división de la psicología.',
      'Citar información científica especializada.',
      'Sustentar la existencia de las subdisciplinas.',
      'Destacar la profesionalización de la psicología.'
    ],
    correct: 2,
    explanation: 'Se introduce la APA y sus divisiones para respaldar con datos institucionales la afirmación de que la psicología es una confederación de subdisciplinas.',
    hint: 'Pregúntate qué efecto probatorio tiene incorporar una cifra oficial de especialidades validadas por una entidad internacional.',
    points: 100
  },
  {
    id: 1019, textKey: 'psicologia_subcampos', topic: 'interpretar', type: 'multiple',
    question: '¿Cuál de las siguientes opciones corresponde a la idea principal de la sección "Neurociencia y psicología fisiológica"?',
    options: [
      'La neurociencia y la psicología fisiológica investigan las bases biológicas de la conducta, los pensamientos y las emociones humanas.',
      'La neurociencia y la psicología fisiológica investigan el impacto de la herencia en los rasgos y conductas normales y anormales.',
      'La neurociencia y la psicología fisiológica estudian cómo se desarrollan, funcionan y, en ocasiones, fallan el cerebro y el sistema nervioso.',
      'La neurociencia y la psicología fisiológica estudian los efectos de sustancias naturales que actúan como mensajeros químicos, principalmente hormonas.'
    ],
    correct: 0,
    explanation: 'La primera oración de ese apartado resume de manera exhaustiva el núcleo temático del subcampo.',
    hint: 'Busca el postulado más amplio y abarcador que logre contener a los elementos particulares como hormonas o tejido nervioso.',
    points: 100
  },
  {
    id: 1020, textKey: 'psicologia_subcampos', topic: 'evaluar', type: 'multiple',
    question: '¿Qué estrategia utilizan los emisores para organizar la información sobre los subcampos?',
    options: [
      'Definición de los conceptos clave del subcampo y discusión a través de interrogantes.',
      'Delimitación del quehacer de la especialidad y profundización a través de preguntas.',
      'Explicación de la evolución de la subdisciplina y proyección a través de preguntas.',
      'Descripción de estudios complementarios del área y reflexión a través de interrogantes.'
    ],
    correct: 1,
    explanation: 'En cada apartado, los autores delimitan el quehacer de la especialidad y luego insertan preguntas de investigación para ilustrar los temas.',
    hint: 'Observa la estructura formal y repetitiva de cada subsección: una definición base seguida de enunciados interrogativos.',
    points: 150
  },
  {
    id: 1021, textKey: 'psicologia_subcampos', topic: 'interpretar', type: 'multiple',
    question: '¿Qué campo de estudio tienen en común la psicología de la personalidad y la experimental?',
    options: [
      'Las formas de desarrollo del aprendizaje humano.',
      'Las causas de la sociabilidad en distintos individuos.',
      'La manera en que los individuos utilizan la memoria.',
      'La influencia de lo cultural en la conducta humana.'
    ],
    correct: 3,
    explanation: 'Ambos campos formulan interrogantes vinculadas a la cultura: emociones en distintas culturas y diferencias entre grupos culturales.',
    hint: 'Rastrea en las preguntas de muestra de ambas especialidades qué factor contextual o social externo se repite como variable.',
    points: 100
  },
  {
    id: 1022, textKey: 'psicologia_subcampos', topic: 'interpretar', type: 'multiple',
    question: 'Una persona está experimentando dificultades para adaptarse a su nuevo trabajo. ¿A qué especialista podría acudir en primera instancia?',
    options: [
      'A un psicólogo de la personalidad.',
      'A un psicólogo experimental.',
      'A un psicólogo consejero.',
      'A un psicólogo clínico.'
    ],
    correct: 2,
    explanation: 'Los psicólogos consejeros se interesan principalmente en los problemas "normales" de ajuste que la mayoría enfrenta en algún momento.',
    hint: 'Distingue entre el tratamiento de psicopatologías severas y la asesoría ante desajustes cotidianos del ciclo vital.',
    points: 100
  },
  {
    id: 1023, textKey: 'psicologia_subcampos', topic: 'evaluar', type: 'multiple',
    question: '¿Cuál es la postura de los emisores frente a la psicología?',
    options: [
      'Integradora, porque unifican las distintas áreas de la psicología.',
      'Reivindicativa, porque amplían la visión simplificada de la psicología.',
      'Analítica, porque relacionan los subcampos a la psicología en general.',
      'Crítica, porque cuestionan el aporte de la psicología a la investigación.'
    ],
    correct: 1,
    explanation: 'Los autores buscan expandir el entendimiento colectivo de la disciplina, demostrando su enorme diversidad científica.',
    hint: 'Identifica el propósito valorativo subyacente de desmitificar la reducción de una ciencia a una sola de sus facetas.',
    points: 150
  },

  // --- TEXTO 4: ARTES ESCÉNICAS (9 preguntas) ---
  {
    id: 1024, textKey: 'artes_escenicas', topic: 'localizar', type: 'multiple',
    question: '¿Cuál es el aporte teórico de Charles Batteux a la concepción de arte?',
    options: [
      'Entregó una definición de las artes escénicas como "bellas artes".',
      'Promovió la valoración de las bellas artes entre los espectadores.',
      'Incorporó la clasificación de "bellas artes" dentro de las manifestaciones artísticas.',
      'Generó las distintas clasificaciones para manifestaciones artísticas consideradas bellas.'
    ],
    correct: 2,
    explanation: 'El texto señala que el concepto de "bellas artes" fue propuesto originalmente por Charles Batteux en 1746 para agrupar ciertas disciplinas.',
    hint: 'Busca el dato concreto asociado al año 1746 y la denominación específica que acuñó este pensador.',
    points: 100
  },
  {
    id: 1025, textKey: 'artes_escenicas', topic: 'localizar', type: 'multiple',
    question: '¿Cuál de las siguientes expresiones es categorizada oficialmente como "bellas artes"?',
    options: [
      'El cabaret.',
      'El teatro.',
      'El cine.',
      'El circo.'
    ],
    correct: 2,
    explanation: 'El texto indica que el concepto original de bellas artes se amplió, integrando formalmente al cine a partir del siglo XX.',
    hint: 'Rastrea en el segundo párrafo cuál es la manifestación tecnológica del siglo XX que obtuvo la inclusión oficial.',
    points: 100
  },
  {
    id: 1026, textKey: 'artes_escenicas', topic: 'interpretar', type: 'multiple',
    question: 'En el tercer párrafo, ¿cuál de las siguientes opciones representa la idea central respecto del arte?',
    options: [
      'Es una creación humana que utiliza un lenguaje expresivo.',
      'Es una manifestación del dominio de una técnica determinada.',
      'Es una forma de expresión usada en distintos ámbitos sociales.',
      'Es una conceptualización que tuvo su origen en la Grecia Clásica.'
    ],
    correct: 0,
    explanation: 'El párrafo concluye que el arte es el resultado de una acción creativa a partir de un lenguaje o técnica expresiva determinada.',
    hint: 'Identifica la definición genérica e integradora con la que cierra la argumentación del tercer segmento.',
    points: 100
  },
  {
    id: 1027, textKey: 'artes_escenicas', topic: 'interpretar', type: 'multiple',
    question: '¿Por qué el emisor excluye la música de las artes escénicas?',
    options: [
      'Porque es cuestionada desde la perspectiva de su valor.',
      'Porque puede expresarse sin necesidad de soporte material.',
      'Porque tiene un lenguaje distinto del que se utiliza en el espectáculo.',
      'Porque es complementaria a la puesta en escena de una representación.'
    ],
    correct: 1,
    explanation: 'El texto explicita que la música no forma parte de las artes escénicas porque su expresión no está supeditada a la escena ni a ninguna materialidad rígida.',
    hint: 'Analiza la razón de autonomía espacial e incorporeidad material que diferencia el fenómeno musical de la actuación.',
    points: 100
  },
  {
    id: 1028, textKey: 'artes_escenicas', topic: 'interpretar', type: 'multiple',
    question: '¿Por qué razón el emisor afirma que el espectador tiene un rol activo en el teatro?',
    options: [
      'Porque perfecciona sus conocimientos para apreciar el hecho escénico.',
      'Porque interactúa con los actores para dar vida a la representación.',
      'Porque participa de los eventos sociales que rodean a una obra.',
      'Porque accede a un plano distinto al de la realidad cotidiana.'
    ],
    correct: 1,
    explanation: 'Se destaca que el espectador contesta con su mirada, respiración y gestos, haciendo que cada representación sea única.',
    hint: 'Busca el impacto inmediato de la presencia del público sobre la ejecución en vivo de los intérpretes.',
    points: 100
  },
  {
    id: 1029, textKey: 'artes_escenicas', topic: 'localizar', type: 'multiple',
    question: 'Según la lectura, ¿cuál es el centro vital del espacio escénico?',
    options: [
      'El espacio mental.',
      'El espacio del público.',
      'El espacio de los actores.',
      'El espacio de representación.'
    ],
    correct: 3,
    explanation: 'El texto señala textualmente: "El centro vital del edificio es donde se encuentran ambos espacios y conforma el espacio de representación".',
    hint: 'Localiza el término exacto utilizado para denominar la zona de acoplamiento físico entre la sala y el escenario.',
    points: 100
  },
  {
    id: 1030, textKey: 'artes_escenicas', topic: 'interpretar', type: 'multiple',
    question: '¿Con qué propósito se hace referencia al "theatron"?',
    options: [
      'Para introducir la descripción del espacio del teatro.',
      'Para caracterizar la construcción mental del espacio escénico.',
      'Para demostrar que el concepto de espacio escénico es antiguo.',
      'Para comprobar que los griegos inventaron el espacio del teatro.'
    ],
    correct: 0,
    explanation: 'La mención de la raíz etimológica griega "theatron" (lugar para contemplar) se utiliza para dar inicio a la explicación del espacio.',
    hint: 'Identifica la función de la raíz lingüística clásica como introducción al análisis estructural del edificio teatral.',
    points: 100
  },
  {
    id: 1031, textKey: 'artes_escenicas', topic: 'interpretar', type: 'multiple',
    question: '¿Qué se puede inferir del rol del espectador en el teatro?',
    options: [
      'Que necesita estar preparado para dialogar con los actores.',
      'Que requiere estar familiarizado con los objetos del escenario.',
      'Que completa activamente el espacio escénico con su imaginario.',
      'Que percibe el hecho escénico como una experiencia de tipo sagrado.'
    ],
    correct: 2,
    explanation: 'El texto indica que el espacio vacío se va llenando con elementos y construcciones mentales que surgen de la interacción con el público.',
    hint: 'Deduce qué ocurre en la mente del asistente cuando procesa la ficción a partir de un escenario inicialmente desprovisto de objetos.',
    points: 100
  },
  {
    id: 1032, textKey: 'artes_escenicas', topic: 'evaluar', type: 'multiple',
    question: 'Considerando el tratamiento del tema, ¿qué tono adopta el emisor?',
    options: [
      'Reflexivo, porque analiza los componentes de las artes escénicas.',
      'Comprometido, porque promueve la revalorización de las artes escénicas.',
      'Crítico, porque cuestiona la exclusión de algunas manifestaciones artísticas.',
      'Escéptico, porque desconfía de la categorización de las manifestaciones artísticas.'
    ],
    correct: 0,
    explanation: 'El autor expone de manera académica y analítica las delimitaciones teóricas y categorías sin imponer juicios de valor sesgados.',
    hint: 'Evalúa el grado de objetividad, orden conceptual y distancia académica que mantiene la voz del texto.',
    points: 150
  },

  // --- TEXTO 5: SEGURIDAD SOCIAL (8 preguntas) ---
  {
    id: 1033, textKey: 'seguridad_social_cartilla', topic: 'localizar', type: 'multiple',
    question: 'De acuerdo con el apartado "Estación 2", ¿qué es una cotización?',
    options: [
      'Es la comisión que cobra la AFP por administrar una parte del sueldo del trabajador.',
      'Es un monto de dinero que se descuenta del sueldo del trabajador para cubrir su seguridad social.',
      'Es el costo de la cobertura que ofrecen las Isapres para asegurar la atención médica de los afiliados.',
      'Es un porcentaje de sueldo que voluntariamente entregan los trabajadores para resguardar su estabilidad.'
    ],
    correct: 1,
    explanation: 'Las cotizaciones previsionales son porcentajes calculados sobre la remuneración imponible destinados a financiar la seguridad social.',
    hint: 'Busca la definición textual que vincula la retención salarial con la cobertura integral de contingencias.',
    points: 100
  },
  {
    id: 1034, textKey: 'seguridad_social_cartilla', topic: 'localizar', type: 'multiple',
    question: '¿Cuál de las siguientes cotizaciones es financiada tanto por el empleador como por el trabajador?',
    options: [
      'Cotización para Salud.',
      'Cotización para la AFP.',
      'Cotización para pensión por vejez.',
      'Cotización para el Seguro de Cesantía.'
    ],
    correct: 3,
    explanation: 'En el Seguro de Cesantía la mayor parte de esta cotización la financia el empleador, implicando un diseño mixto.',
    hint: 'Rastrea cuál de las asignaciones de fondos previsionales cuenta con una redacción que explicita un aporte compartido.',
    points: 100
  },
  {
    id: 1035, textKey: 'seguridad_social_cartilla', topic: 'localizar', type: 'multiple',
    question: 'Según la lectura, ¿cuál de los siguientes beneficios favorece tanto al trabajador como al empleador?',
    options: [
      'Subsidio al Empleo Joven.',
      'Bono al Trabajo de la Mujer.',
      'Seguro de Invalidez y Sobrevivencia.',
      'Subsidio Previsional a trabajadores jóvenes.'
    ],
    correct: 0,
    explanation: 'El texto indica que el Subsidio al Empleo Joven apoya además a quienes los contratan (los empleadores).',
    hint: 'Identifica el incentivo económico estatal que detalla un beneficio explícito para la parte contratante.',
    points: 100
  },
  {
    id: 1036, textKey: 'seguridad_social_cartilla', topic: 'interpretar', type: 'multiple',
    question: '¿Qué pregunta sintetiza el contenido del último cuadro de la lectura?',
    options: [
      '¿Qué excepciones existen para invocar la causal "necesidades de la empresa"?',
      '¿Qué requisitos debe cumplir el empleador para aplicar la causal "necesidades de la empresa"?',
      '¿Cuáles son los argumentos del empleador para despedir por la causal "necesidades de la empresa"?',
      '¿Cómo se hace efectiva la desvinculación de un trabajador despedido por "necesidades de la empresa"?'
    ],
    correct: 0,
    explanation: 'El último bloque se enfoca en las protecciones y casos especiales donde la causal está limitada o prohibida.',
    hint: 'Determina el núcleo común de las situaciones descritas al cierre: escenarios donde el empleador está impedido de desvincular.',
    points: 100
  },
  {
    id: 1037, textKey: 'seguridad_social_cartilla', topic: 'interpretar', type: 'multiple',
    question: 'En relación con el último cuadro, ¿qué se infiere sobre los trabajadores con respecto a la causal "necesidades de la empresa"?',
    options: [
      'Que existen obligaciones legales que los trabajadores deben cumplir después de dar por terminado un contrato.',
      'Que los trabajadores deben tener sus cotizaciones pagadas al día en caso de aplicar esta causal de despido.',
      'Que existen normas que protegen a los trabajadores ante la aplicación de esta causal de despido.',
      'Que los trabajadores tienen derecho a una indemnización independientemente del motivo de su despido.'
    ],
    correct: 2,
    explanation: 'Al prohibir el despido por esta causal en contextos vulnerables, el marco regulatorio erige barreras de protección legal.',
    hint: 'Deduce cuál es el espíritu de la ley al invalidar un despido empresarial cuando el trabajador se encuentra enfermo.',
    points: 100
  },
  {
    id: 1038, textKey: 'seguridad_social_cartilla', topic: 'interpretar', type: 'multiple',
    question: '¿Qué aporta la información destacada al final de cada estación?',
    options: [
      'Ofrece una orientación para ampliar el contenido de cada estación.',
      'Ofrece una evidencia de las situaciones planteadas en cada estación.',
      'Ofrece una síntesis del contenido desarrollado en cada estación.',
      'Ofrece una explicación para aclarar la información de cada estación.'
    ],
    correct: 0,
    explanation: 'Al final de cada sección se incluyen canales institucionales para que el lector profundice o amplíe los conocimientos expuestos.',
    hint: 'Analiza la función utilitaria de colocar direcciones web institucionales al pie de un texto informativo.',
    points: 100
  },
  {
    id: 1039, textKey: 'seguridad_social_cartilla', topic: 'evaluar', type: 'multiple',
    question: 'Con respecto a la Seguridad Social, ¿cuál es el propósito de la cartilla informativa?',
    options: [
      'Detallar las responsabilidades contractuales que debe asumir un empleador.',
      'Describir los beneficios previsionales que deben otorgarse a los trabajadores.',
      'Explicar los derechos que posee una persona que firma un contrato laboral.',
      'Presentar las leyes que protegen a las personas que ingresan al mundo laboral.'
    ],
    correct: 2,
    explanation: 'La guía está estructurada como una ruta cronológica dirigida al ciudadano para explicar sus derechos previsionales y contractuales.',
    hint: 'Identifica cuál es el objetivo central de comunicación de un folleto que educa al trabajador desde su contratación hasta su despido.',
    points: 150
  },
  {
    id: 1040, textKey: 'seguridad_social_cartilla', topic: 'interpretar', type: 'multiple',
    question: 'La cartilla pretende ser un aporte. Para cumplir este propósito, ¿qué responsabilidad deben asumir los trabajadores?',
    options: [
      'Orientar al empleador en la elección de las instituciones aseguradoras según sus beneficios.',
      'Informar a las instituciones estatales sobre el monto a pagar por parte del empleador.',
      'Supervisar el correcto pago de las cotizaciones previsionales por parte del empleador.',
      'Elegir las instituciones previsionales según la conveniencia del porcentaje de cotización.'
    ],
    correct: 2,
    explanation: 'Se insta al trabajador a auditar que el empleador cumpla con registrar sus cotizaciones previsionales pagadas al día.',
    hint: 'Determina qué acción proactiva debe ejecutar el empleado para evitar perder sus coberturas de salud o seguro de desempleo.',
    points: 100
  },

  // --- TEXTO 6: FORMACIÓN CÍVICA (10 preguntas) ---
  {
    id: 1041, textKey: 'formacion_civica', topic: 'interpretar', type: 'multiple',
    question: 'En el tercer párrafo, ¿con qué propósito se menciona la tradición aristotélica?',
    options: [
      'Para destacar la dimensión política que tiene el ser humano.',
      'Para apoyar la concepción del ser humano como ser comunitario.',
      'Para ejemplificar la idea de felicidad como objetivo del ser humano.',
      'Para justificar la noción de fragilidad que caracteriza al ser humano.'
    ],
    correct: 1,
    explanation: 'Se usa para fundamentar que el individuo solo alcanza la felicidad en relación con los demás, dentro de una comunidad organizada.',
    hint: 'Analiza por qué el emisor recurre a Aristóteles para fundamentar la naturaleza comunitaria del individuo.',
    points: 100
  },
  {
    id: 1042, textKey: 'formacion_civica', topic: 'interpretar', type: 'multiple',
    question: '¿Con qué propósito se nombran en la lectura las tragedias del siglo XX?',
    options: [
      'Para ilustrar la capacidad transformadora que tiene la inteligencia humana.',
      'Para ejemplificar los hitos históricos en que ha sido protagonista el ser humano.',
      'Para advertir sobre la importancia de utilizar responsablemente el potencial humano.',
      'Para destacar el rol de la herencia cultural en la toma de decisiones del ser humano.'
    ],
    correct: 2,
    explanation: 'El texto afirma que el potencial humano mostró su peor cara en estas tragedias, lo cual nos obliga a ser responsables.',
    hint: 'Fíjate en la moraleja ética que el emisor extrae a partir del recuento de los desastres del siglo pasado.',
    points: 100
  },
  {
    id: 1043, textKey: 'formacion_civica', topic: 'localizar', type: 'multiple',
    question: 'Según la lectura, ¿qué confirmaría que el ser humano ha superado el estado de determinación total del instinto?',
    options: [
      'La conciencia de su historia que le permite ser responsable.',
      'La creación de instituciones que organizan su convivencia.',
      'El cambio del entorno natural que le ayuda a adaptarse.',
      'El desarrollo de la ciencia que posibilita su progreso.'
    ],
    correct: 1,
    explanation: 'El texto señala que la humanidad ha generado instituciones para poder ordenar la vida, superando así las respuestas instintivas.',
    hint: 'Busca el conector textual que asocia la superación de las respuestas instintivas con la edificación de estructuras sociales.',
    points: 100
  },
  {
    id: 1044, textKey: 'formacion_civica', topic: 'localizar', type: 'multiple',
    question: 'Según Tomás de Aquino, ¿con qué se relaciona la esfera físico-biológica del ser humano?',
    options: [
      'Con su carácter racional.',
      'Con su esencia invariable.',
      'Con su capacidad de aprender.',
      'Con su necesidad de supervivencia.'
    ],
    correct: 3,
    explanation: 'El ámbito físico-biológico guarda relación con las necesidades básicas de sobrevivencia de todos los seres vivos.',
    hint: 'Ubica la mención al pensamiento tomista y asócialo con las funciones orgánicas elementales compartidas con el reino animal.',
    points: 100
  },
  {
    id: 1045, textKey: 'formacion_civica', topic: 'interpretar', type: 'multiple',
    question: 'Una persona plantea que en la lectura se requiere agregar un subtítulo a la primera sección. ¿Cuál sería pertinente?',
    options: [
      '"La herencia natural y cultural del ser humano"',
      '"La persona humana y las demás especies"',
      '"Las bases de la dignidad humana"',
      '"La naturaleza del ser humano"'
    ],
    correct: 3,
    explanation: 'La primera sección introduce qué define a un individuo humano, examinando el concepto de "naturaleza humana" en sus dimensiones biológicas y espirituales.',
    hint: 'Evalúa cuál de los enunciados tiene el carácter más amplio para sintetizar los componentes anatómicos y metafísicos tratados.',
    points: 100
  },
  {
    id: 1046, textKey: 'formacion_civica', topic: 'interpretar', type: 'multiple',
    question: '¿Cómo es la relación entre la doctrina judeocristiana y la perspectiva secular acerca de la "dignidad humana"?',
    options: [
      'Complementaria, pues ambas aportan rasgos sobre la naturaleza consciente del ser humano.',
      'Equivalente, pues ambas consideran al ser humano como un ser de naturaleza social.',
      'Causal, pues la semejanza del ser humano con Dios es una causa de su carácter moral.',
      'Independiente, pues la visión religiosa del ser humano es distinta a su moralidad social.'
    ],
    correct: 0,
    explanation: 'Ambas perspectivas se complementan: la religiosa destaca la semejanza divina y la secular refuerza la inteligencia, libertad y moral.',
    hint: 'Identifica si ambas visiones se contradicen o confluyen de forma coordinada para robustecer el valor intrínseco de la persona.',
    points: 100
  },
  {
    id: 1047, textKey: 'formacion_civica', topic: 'localizar', type: 'multiple',
    question: 'Según la lectura, ¿qué visión considera la "dignidad humana" como rasgo diferenciador entre humanos y no humanos?',
    options: [
      'La visión jurídica.',
      'La visión secular.',
      'La visión biológica.',
      'La visión aristotélica.'
    ],
    correct: 1,
    explanation: 'El texto afirma: "Desde una perspectiva secular, alude a la cualidad esencial en virtud de la cual se distingue lo humano de lo no humano".',
    hint: 'Rastrea el fragmento exacto que utiliza los vocablos opuestos "humano" y "no humano".',
    points: 100
  },
  {
    id: 1048, textKey: 'formacion_civica', topic: 'interpretar', type: 'multiple',
    question: '¿Cuál de las siguientes preguntas se responde de forma insuficiente en la lectura?',
    options: [
      '¿Qué son los Derechos Humanos?',
      '¿En qué se basa el concepto de "persona"?',
      '¿Cuál es la esencia de la naturaleza humana?',
      '¿Cuáles son las particularidades del ser humano?'
    ],
    correct: 0,
    explanation: 'El texto vincula la dignidad humana con los Derechos Humanos pero no define concretamente qué son o en qué consisten dichos derechos.',
    hint: 'Detecta qué concepto capital se enuncia de forma repetida pero carece de un desglose analítico o definición explícita.',
    points: 100
  },
  {
    id: 1049, textKey: 'formacion_civica', topic: 'interpretar', type: 'multiple',
    question: '¿Cuál de las siguientes afirmaciones corresponde a la idea principal del último párrafo?',
    options: [
      'La dignidad humana es un concepto que aparece en el ámbito legal durante el siglo XX.',
      'La dignidad humana es un aspecto que contiene a otros como edad, sexo, etnia y género.',
      'La dignidad humana es inseparable de los Derechos Humanos.',
      'La dignidad humana es reconocida por el poder político.'
    ],
    correct: 2,
    explanation: 'El último párrafo se centra en demostrar que la dignidad aparece "indisolublemente ligada al concepto de Derechos Humanos".',
    hint: 'Sintetiza el remate del escrito, prestando atención al adverbio "indisolublemente" que sella el nexo entre ambos pilares.',
    points: 100
  },
  {
    id: 1050, textKey: 'formacion_civica', topic: 'interpretar', type: 'multiple',
    question: '¿Qué pregunta se responde con el contenido global de la lectura?',
    options: [
      '¿Qué atributos le permiten al ser humano tener derechos?',
      '¿Cuáles derechos le corresponden al ser humano por naturaleza?',
      '¿Cuáles son las principales teorías que explican los Derechos Humanos?',
      '¿Qué hitos de su desarrollo les permitieron a los humanos tener derechos?'
    ],
    correct: 0,
    explanation: 'El texto transita desde la definición del ser humano hasta establecer que su racionalidad, moralidad y dignidad justifican sus derechos.',
    hint: 'Evalúa el hilo conductor total: inicia desglosando la anatomía del individuo y concluye legitimando su resguardo legal.',
    points: 100
  },

  // --- TEXTO 7: ESPAÑOL ACTUAL (10 preguntas) ---
  {
    id: 1051, textKey: 'espanol_actual', topic: 'localizar', type: 'multiple',
    question: 'En la lectura, ¿qué explica la desaparición de ciertas lenguas?',
    options: [
      'El bilingüismo.',
      'La globalización.',
      'El etnocentrismo.',
      'La interculturalidad.'
    ],
    correct: 1,
    explanation: 'El segundo párrafo indica que la globalización conlleva la posibilidad de una homogenización cultural que provoca la desaparición de lenguas minoritarias.',
    hint: 'Localiza la fuerza socioeconómica global a la cual el emisor imputa el efecto directo de licuar las diferencias dialectales.',
    points: 100
  },
  {
    id: 1052, textKey: 'espanol_actual', topic: 'interpretar', type: 'multiple',
    question: '¿Qué aspecto de la globalización busca destacar la emisora en los dos primeros párrafos?',
    options: [
      'La influencia de la globalización en el mercado de la información.',
      'La repercusión de la globalización en la idea de progreso de Occidente.',
      'El impacto de la globalización en la interacción de las comunidades lingüísticas.',
      'El papel de la globalización en la desaparición de lenguas americanas minoritarias.'
    ],
    correct: 2,
    explanation: 'Los párrafos iniciales plantean cómo la globalización afecta los ámbitos de relación y las formas de interacción que garantizan la cohesión de cada comunidad lingüística.',
    hint: 'Observa la escala macro del análisis inicial: se concentra en el choque e interacción sistémica entre redes de hablantes.',
    points: 100
  },
  {
    id: 1053, textKey: 'espanol_actual', topic: 'interpretar', type: 'multiple',
    question: 'A partir del tercer y cuarto párrafo, ¿por qué se afirma que la interculturalidad "es algo por hacer"?',
    options: [
      'Porque está en desarrollo a partir de la relación entre las culturas.',
      'Porque está en proceso de evaluación por parte de las comunidades.',
      'Porque está en una etapa de formulación de críticas al etnocentrismo.',
      'Porque está en la fase de incluir argumentos para fomentar la tolerancia.'
    ],
    correct: 0,
    explanation: 'Se afirma que está por teorizar y hacer, construyéndose todos los días a partir de las relaciones reales entre culturas.',
    hint: 'Asocia la expresión temporal con un proceso activo, dinámico e inacabado que requiere la práctica diaria interpersonal.',
    points: 100
  },
  {
    id: 1054, textKey: 'espanol_actual', topic: 'interpretar', type: 'multiple',
    question: '¿Cuál de las siguientes preguntas se responde a partir de la información de la sección "El inglés, lengua global"?',
    options: [
      '¿Por qué el inglés se ha posicionado como el idioma de la globalización?',
      '¿Qué motivaciones tienen las multinacionales para imponer el uso del inglés?',
      '¿Qué beneficios tiene el predominio del inglés para los países angloparlantes?',
      '¿Por qué las autoridades defienden el inglés como expresión de la globalización?'
    ],
    correct: 0,
    explanation: 'La sección detalla las causas tangibles de su dominio: presencia masiva en internet, imposición corporativa y políticas lingüísticas estatales.',
    hint: 'Determina si el bloque informativo se aboca a justificar beneficios éticos o a enumerar las razones materiales de su expansión.',
    points: 100
  },
  {
    id: 1055, textKey: 'espanol_actual', topic: 'localizar', type: 'multiple',
    question: 'En la lectura, ¿qué se ejemplifica a través de la mención de Coca-Cola, Microsoft y Apple?',
    options: [
      'La imposición del uso de un idioma.',
      'La necesidad de una educación bilingüe.',
      'La ampliación de relaciones comerciales.',
      'La construcción de un modelo económico.'
    ],
    correct: 0,
    explanation: 'El texto indica que estas multinacionales imponen el uso del inglés al comprador, al proveedor y al cliente.',
    hint: 'Rastrea el verbo de acción imperativa que vincula a estas gigantes tecnológicas con la conducta idiomática forzada.',
    points: 100
  },
  {
    id: 1056, textKey: 'espanol_actual', topic: 'interpretar', type: 'multiple',
    question: '¿Qué busca ejemplificar la emisora al mencionar a los dirigentes españoles en la lectura?',
    options: [
      'La inclusión del inglés en los programas de estudio españoles.',
      'La crítica a la falta de difusión de las lenguas oficiales españolas.',
      'La valoración del inglés por sobre las lenguas oficiales españolas.',
      'La justificación de la enseñanza del inglés en las escuelas españolas.'
    ],
    correct: 2,
    explanation: 'Se señala críticamente que los dirigentes aspiran a que los niños hablen inglés en vez de las otras lenguas oficiales reconocidas.',
    hint: 'Detecta el tono crítico tras la denuncia de preferir una lengua extranjera global por sobre el patrimonio multilingüe local.',
    points: 100
  },
  {
    id: 1057, textKey: 'espanol_actual', topic: 'interpretar', type: 'multiple',
    question: 'De acuerdo con la tendencia del bilingüismo vertical, ¿qué lengua podría adquirir un hablante cuya lengua materna es el hindi?',
    options: [
      'Una lengua central.',
      'Una lengua periférica.',
      'Una lengua hipercentral.',
      'Una lengua supercentral.'
    ],
    correct: 2,
    explanation: 'El hindi es una lengua supercentral. El bilingüismo vertical implica adquirir una lengua de nivel superior: la lengua hipercentral (inglés).',
    hint: 'Aplica la regla de escalamiento jerárquico del modelo de Calvet partiendo desde el peldaño "supercentral" hacia el ápice.',
    points: 100
  },
  {
    id: 1058, textKey: 'espanol_actual', topic: 'localizar', type: 'multiple',
    question: 'Según la clasificación lingüística de Calvet, ¿qué tipo de lengua es el español?',
    options: [
      'Una lengua central.',
      'Una lengua periférica.',
      'Una lengua hipercentral.',
      'Una lengua supercentral.'
    ],
    correct: 3,
    explanation: 'El texto lo explicita: "en torno a una lengua hipercentral gravitan una decena de lenguas supercentrales (el chino, el español, el hindi, el árabe)".',
    hint: 'Encuentra el pasaje exacto que agrupa al español junto al mandarín y al árabe en la misma categoría.',
    points: 100
  },
  {
    id: 1059, textKey: 'espanol_actual', topic: 'evaluar', type: 'multiple',
    question: '¿Qué busca provocar la emisora en el lector?',
    options: [
      'Que valide el estudio de las relaciones que se establecen entre las distintas lenguas.',
      'Que tome conciencia sobre los factores que atentan contra la preservación de las lenguas.',
      'Que reflexione sobre las consecuencias de la globalización en los vínculos comerciales.',
      'Que adopte una postura intercultural frente a los desafíos de la economía globalizada.'
    ],
    correct: 1,
    explanation: 'A través de datos y teorías como la ecolingüística, busca alertar sobre la asimetría de fuerzas y la pérdida de diversidad cultural.',
    hint: 'Determina el efecto de concientización y alarma cultural que persigue el texto al exponer los riesgos de extinción idiomática.',
    points: 150
  },
  {
    id: 1060, textKey: 'espanol_actual', topic: 'interpretar', type: 'multiple',
    question: '¿Qué representa para la emisora la enseñanza del bilingüismo horizontal?',
    options: [
      'La superación del colonialismo.',
      'La amenaza producto de la globalización.',
      'La disputa entre lenguas de distintos niveles.',
      'La imposición de un modelo de desarraigo cultural.'
    ],
    correct: 0,
    explanation: 'El bilingüismo horizontal se da entre lenguas del mismo nivel, representando un diálogo más equitativo y libre de dominación jerárquica.',
    hint: 'Contrapón la noción de horizontalidad a la subordinación imperialista del bilingüismo vertical descrito en las líneas precedentes.',
    points: 100
  },

  // --- TEXTO 8: KIOSCOS SALUDABLES (6 preguntas) ---
  {
    id: 1061, textKey: 'kioscos_saludables', topic: 'interpretar', type: 'multiple',
    question: '¿De qué manera la Ley sobre Publicidad de los Alimentos apoya la Ley N° 20.606?',
    options: [
      'Especificando las características de los alimentos ofrecidos en los kioscos escolares.',
      'Distinguiendo las variedades de alimentos disponibles en los kioscos escolares.',
      'Desincentivando el consumo de alimentos altos en nutrientes críticos.',
      'Restringiendo la distribución de alimentos a menores de 14 años.'
    ],
    correct: 2,
    explanation: 'La ley prohíbe la publicidad en medios y horarios específicos para proteger a los menores, reforzando la desincentivación de alimentos perjudiciales.',
    hint: 'Conecta las restricciones de marketing con la meta de frenar la ingesta de productos nocivos.',
    points: 100
  },
  {
    id: 1062, textKey: 'kioscos_saludables', topic: 'localizar', type: 'multiple',
    question: '¿A quién está dirigida la Guía de kioscos escolares y colaciones saludables?',
    options: [
      'A los integrantes de la comunidad escolar.',
      'A las empresas de publicidad del país.',
      'A los funcionarios del Ministerio de Salud.',
      'A los proveedores de alimentos para escuelas.'
    ],
    correct: 0,
    explanation: 'El texto indica explícitamente: "Este documento es un material de apoyo para las comunidades educativas".',
    hint: 'Busca en las líneas iniciales del texto el público objetivo directo definido para la aplicación de este manual.',
    points: 100
  },
  {
    id: 1063, textKey: 'kioscos_saludables', topic: 'localizar', type: 'multiple',
    question: 'Según la lectura, ¿cuál es una de las condiciones para el funcionamiento de un kiosco escolar?',
    options: [
      'La conexión a una red de agua potable.',
      'La obtención de una autorización sanitaria.',
      'El uso de una guía de alimentación saludable.',
      'El establecimiento de una caseta en un lugar fijo.'
    ],
    correct: 1,
    explanation: 'El texto indica que deben "contar con la autorización sanitaria para su funcionamiento".',
    hint: 'Rastrea el requisito legal sine qua non que emite la autoridad de salud para toda instalación comercial de este tipo.',
    points: 100
  },
  {
    id: 1064, textKey: 'kioscos_saludables', topic: 'interpretar', type: 'multiple',
    question: '¿Cuál es el aporte de la Tabla 1 al resto de la lectura?',
    options: [
      'Establece las obligaciones de cada tipo de kiosco escolar.',
      'Describe la existencia de tres tipos de kioscos escolares.',
      'Ejemplifica los tipos de kioscos escolares del RSA.',
      'Aclara la diferencia entre los tipos de kioscos escolares.'
    ],
    correct: 3,
    explanation: 'La Tabla 1 sintetiza visualmente los requerimientos técnicos y de infraestructura específicos de los tipos A, B y C, permitiendo diferenciarlos.',
    hint: 'Analiza la función que cumple ordenar en celdas y columnas las distintas exigencias técnicas de los locales comerciales.',
    points: 100
  },
  {
    id: 1065, textKey: 'kioscos_saludables', topic: 'localizar', type: 'multiple',
    question: 'Según la lectura, ¿cuál de las siguientes opciones es una restricción para la publicidad de alimentos en los kioscos escolares?',
    options: [
      'Pintar el interior o el exterior de los kioscos con publicidad.',
      'Levantar infraestructura y usar afiches para publicitar alimentos.',
      'Promocionar alimentos que excedan límites de nutrientes y energía.',
      'Regalar alimentos a los escolares para publicitar e incitar su consumo.'
    ],
    correct: 2,
    explanation: 'Se prohíbe tajantemente publicitar, regalar o promocionar productos que superen los límites establecidos de nutrientes críticos y calorías.',
    hint: 'Identifica la prohibición estricta que recae sobre aquellos alimentos rotulados con sellos de advertencia negra.',
    points: 100
  },
  {
    id: 1066, textKey: 'kioscos_saludables', topic: 'interpretar', type: 'multiple',
    question: '¿Qué problemática motiva la elaboración de la Guía de kioscos escolares y colaciones saludables?',
    options: [
      'La limitada información sobre comida sana en las escuelas.',
      'El escaso control de la publicidad sobre alimentos en las escuelas.',
      'Los deficientes hábitos alimenticios de la población en edad escolar.',
      'Las inexistentes acciones para fiscalizar la venta de alimentos a escolares.'
    ],
    correct: 2,
    explanation: 'La introducción plantea alarmantes cifras de sobrepeso infantil (50,3% en primero básico), lo que gatilla la necesidad de intervenir.',
    hint: 'Examina el diagnóstico de salud inicial: las altas tasas de malnutrición por exceso en los estudiantes chilenos.',
    points: 100
  },

  // --- TEXTO 9: QUÍMICA - VITALISMO (2 preguntas) ---
  {
    id: 1067, textKey: 'quimica_vitalismo', topic: 'localizar', type: 'multiple',
    question: 'Según la lectura, ¿en qué consistió el descubrimiento de Friedrich Wöhler?',
    options: [
      'En la fórmula para sintetizar ácido acético.',
      'En la subdivisión entre lo orgánico e inorgánico.',
      'En la producción de urea a partir de cianato amónico.',
      'En la identificación de sustancias como el etanol y el metano.'
    ],
    correct: 2,
    explanation: 'Wöhler descubrió que al calentar cianato amónico (inorgánico) se formaban cristales de urea (compuesto orgánico).',
    hint: 'Busca los dos compuestos químicos exactos involucrados en el experimento fortuito de laboratorio realizado en 1828.',
    points: 100
  },
  {
    id: 1068, textKey: 'quimica_vitalismo', topic: 'interpretar', type: 'multiple',
    question: 'Según la lectura, ¿cuál fue la causa de la crisis del vitalismo?',
    options: [
      'La conversión de sustancias inorgánicas en orgánicas.',
      'La clasificación de las sustancias según su combustibilidad.',
      'La incapacidad de los químicos para sintetizar las sustancias.',
      'La desaparición de las diferencias entre lo orgánico y lo inorgánico.'
    ],
    correct: 0,
    explanation: 'El vitalismo colapsó al lograr convertir sustancias inorgánicas en orgánicas en el laboratorio, invalidando la necesidad de una "fuerza vital".',
    hint: 'Determina cuál fue el hecho empírico demoledor que invalidó la supuesta necesidad de un soplo espiritual para crear materia orgánica.',
    points: 100
  },

  // --- TEXTO 10: CONSERVACIÓN DE INSECTOS (5 preguntas) ---
  {
    id: 1069, textKey: 'conservacion_insectos', topic: 'interpretar', type: 'multiple',
    question: '¿De qué manera el primer párrafo destaca la importancia de los insectos?',
    options: [
      'Detallando sus características más relevantes.',
      'Describiendo la antigüedad de sus orígenes.',
      'Evidenciando su superioridad numérica.',
      'Analizando su relación con otras especies.'
    ],
    correct: 2,
    explanation: 'El primer párrafo utiliza datos estadísticos para demostrar que más de la mitad de las especies conocidas en la Tierra son insectos.',
    hint: 'Observa el contraste de porcentajes (como el 3% asignado a los cordados) para notar el énfasis en el volumen poblacional.',
    points: 100
  },
  {
    id: 1070, textKey: 'conservacion_insectos', topic: 'interpretar', type: 'multiple',
    question: 'Respecto de las oscilaciones en la población de insectos, ¿por qué es complejo establecer conclusiones?',
    options: [
      'Porque los insectos necesitan ser estudiados por mucho tiempo.',
      'Porque la biomasa de insectos entrega información limitada.',
      'Porque la biomasa de insectos ha disminuido drásticamente.',
      'Porque los insectos requieren de un área protegida para su estudio.'
    ],
    correct: 0,
    explanation: 'El texto indica que debido a las grandes oscilaciones de una temporada a otra, se requieren estudios a largo plazo y muestreos sistemáticos de varios años.',
    hint: 'Evalúa la escala temporal requerida para no confundir un cambio estacional normal con una crisis de extinción.',
    points: 100
  },
  {
    id: 1071, textKey: 'conservacion_insectos', topic: 'interpretar', type: 'multiple',
    question: 'En el cuarto párrafo, ¿qué ejemplifica la emisora a través de la investigación sobre el daño cognitivo de las abejas?',
    options: [
      'El estudio sobre tamaños de poblaciones.',
      'La evaluación de las presiones antrópicas.',
      'El análisis sobre las causas de muerte de insectos.',
      'La manera de distribuir recursos de las instituciones.'
    ],
    correct: 1,
    explanation: 'El daño cognitivo por dosis subletales de plaguicidas se introduce como ejemplo directo del impacto de las presiones antrópicas (acciones humanas).',
    hint: 'Define el adjetivo "antrópico" y conéctalo con el uso agrícola de plaguicidas químicos artificiales.',
    points: 100
  },
  {
    id: 1072, textKey: 'conservacion_insectos', topic: 'localizar', type: 'multiple',
    question: 'Según la lectura, ¿qué efecto tienen los antibióticos de uso veterinario y humano en los insectos?',
    options: [
      'Provocan su muerte.',
      'Alteran su microbiota.',
      'Causan daño a su hábitat.',
      'Generan su desorientación.'
    ],
    correct: 1,
    explanation: 'El texto afirma que los antibióticos "impactan negativamente la microbiota de los insectos", elevando su susceptibilidad a enfermedades.',
    hint: 'Rastrea en el cuarto párrafo el término médico exacto utilizado para designar la comunidad de microorganismos internos del insecto.',
    points: 100
  },
  {
    id: 1073, textKey: 'conservacion_insectos', topic: 'interpretar', type: 'multiple',
    question: 'Según la sección "Conservación de insectos en Chile", ¿por qué se deben tomar acciones para la conservación de insectos no clasificados?',
    options: [
      'Porque se requiere una actualización de su variedad.',
      'Porque se encuentran en una categoría de amenaza.',
      'Porque su diversidad es mayor a la de los mamíferos.',
      'Porque su existencia es importante para los humanos.'
    ],
    correct: 3,
    explanation: 'Es imperativo proteger ese 99,24% no categorizado porque realizan procesos ecológicos esenciales que posibilitan la supervivencia humana.',
    hint: 'Conecta la salvaguarda de estos bichos anónimos con la continuidad operativa de los ecosistemas globales que nos sostienen.',
    points: 100
  },

  // --- TEXTO 11: MEDICINA Y ARTE (2 preguntas) ---
  {
    id: 1074, textKey: 'medicina_renacimiento', topic: 'interpretar', type: 'multiple',
    question: '¿De qué manera se relacionan la anatomía y el arte en el Renacimiento?',
    options: [
      'La anatomía recurre a la representación artística para registrar los hallazgos sobre las funciones del cuerpo humano.',
      'El arte logra que la anatomía integre una dimensión divina al estudio del cuerpo humano.',
      'El arte impulsa a los médicos a probar nuevos métodos de observación de la anatomía humana.',
      'La anatomía aporta una visión objetiva del cuerpo humano para su representación artística.'
    ],
    correct: 3,
    explanation: 'Los artistas recurrieron a las leyes de la anatomía y a la disección para representar la figura humana de manera objetiva y exacta.',
    hint: 'Determina si la ciencia anatómica operaba como un fin de registro gráfico o como una herramienta al servicio del realismo pictórico.',
    points: 100
  },
  {
    id: 1075, textKey: 'medicina_renacimiento', topic: 'localizar', type: 'multiple',
    question: '¿Cuál de los siguientes anatomistas es un antecesor de los "humanistas médicos"?',
    options: [
      'Alberto Durero.',
      'Mondino de Luzzi.',
      'Niccolò Leoniceno.',
      'Andrea del Verrocchio.'
    ],
    correct: 1,
    explanation: 'El texto menciona que los humanistas médicos actuaron "bajo la estela de anatomistas anteriores, como Mondino de Luzzi (1270-1326)".',
    hint: 'Busca el nombre propio asociado explícitamente a las fechas medievales tardías indicadas como cimiento del movimiento.',
    points: 100
  },

  // --- TEXTO 12: EL CALOR DE AGOSTO (2 preguntas) ---
  {
    id: 1076, textKey: 'calor_agosto', topic: 'localizar', type: 'multiple',
    question: '¿A qué se dedicaba Charles Atkinson?',
    options: [
      'A tallar losas de mármol.',
      'A exhibir restos de mármol.',
      'A restaurar piezas de mármol.',
      'A reparar monumentos de mármol.'
    ],
    correct: 0,
    explanation: 'Atkinson es un escultor que se encontraba trabajando físicamente sobre una losa de mármol con martillo y cincel.',
    hint: 'Identifica la acción física concreta y artesanal que realizaba el artesano en el preciso instante de la llegada del narrador.',
    points: 100
  },
  {
    id: 1077, textKey: 'calor_agosto', topic: 'interpretar', type: 'multiple',
    question: '¿En qué situación el protagonista siente por primera vez que sucede algo sobrenatural?',
    options: [
      'Cuando despierta de su ensoñación tras hablar con un niño.',
      'Cuando descubre una lápida con sus datos de nacimiento.',
      'Cuando se siente afectado por las temperaturas extremas.',
      'Cuando se encuentra con el mismo hombre de su dibujo.'
    ],
    correct: 3,
    explanation: 'El primer choque ocurre al percatarse de que el hombre real frente a él es exactamente idéntico al criminal que había dibujado de su imaginación esa mañana.',
    hint: 'Distingue entre la primera señal inquietante de coincidencia física y el posterior descubrimiento de los textos fatídicos en la piedra.',
    points: 100
  }
];

// ============================================================================
// III. EXPORTACIÓN
// ============================================================================
const paesBancoLectora = {
  version: "1.0.0",
  totalQuestions: paesLenguajeQuestions.length,
  texts: paesTexts,
  questions: paesLenguajeQuestions
};

console.log('📖 Banco de Competencia Lectora cargado: ' + paesLenguajeQuestions.length + ' preguntas en 12 lecturas');
