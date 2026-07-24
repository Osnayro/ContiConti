
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
    isFrozen: false,
    questions: [],
    answeredCorrectly: {},
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
        financierPro: false,
        noPowerups: false
    },
    topicScores: {}
};

// ===== BANCO DE PREGUNTAS =====
const generalQuestions = [
    {
        id: 1, topic: 'presupuesto', type: 'multiple',
        question: '¿Qué es un presupuesto?',
        options: ['Un plan de gastos e ingresos', 'Un tipo de impuesto', 'Una cuenta bancaria', 'Un préstamo'],
        correct: 0,
        explanation: 'Un presupuesto es un plan financiero que estima ingresos y gastos en un período determinado.',
        points: 100
    },
    {
        id: 2, topic: 'ahorro', type: 'multiple',
        question: '¿Cuál es la regla 50/30/20 para ahorrar?',
        options: ['50% necesidades, 30% deseos, 20% ahorro', '50% ahorro, 30% inversión, 20% gastos', '50% gastos, 30% ahorro, 20% inversión', '50% deseos, 30% necesidades, 20% deudas'],
        correct: 0,
        explanation: 'La regla 50/30/20 sugiere destinar 50% a necesidades básicas, 30% a gastos personales y 20% al ahorro.',
        points: 100
    },
    {
        id: 3, topic: 'inversion', type: 'multiple',
        question: '¿Qué significa "diversificar" en inversiones?',
        options: ['Invertir en diferentes activos para reducir riesgo', 'Poner todo el dinero en una sola acción', 'Retirar todo el dinero del banco', 'Solo invertir en bienes raíces'],
        correct: 0,
        explanation: 'Diversificar es distribuir las inversiones en distintos activos para minimizar el riesgo de pérdida.',
        points: 100
    },
    {
        id: 4, topic: 'credito', type: 'multiple',
        question: '¿Qué es el historial crediticio?',
        options: ['Un registro de cómo has manejado tus deudas', 'El saldo de tu cuenta bancaria', 'Una lista de tus inversiones', 'Tu declaración de impuestos'],
        correct: 0,
        explanation: 'El historial crediticio muestra tu comportamiento de pago de deudas y determina tu puntaje crediticio.',
        points: 100
    },
    {
        id: 5, topic: 'contabilidad', type: 'multiple',
        question: 'En contabilidad, ¿qué representa el "activo"?',
        options: ['Bienes y derechos de una empresa', 'Las deudas de la empresa', 'Las ganancias del año', 'Los gastos mensuales'],
        correct: 0,
        explanation: 'El activo son todos los bienes y derechos que posee una empresa o persona.',
        points: 100
    },
    {
        id: 6, topic: 'presupuesto', type: 'matching',
        question: 'Empareja los conceptos con sus definiciones:',
        pairs: [
            { left: 'Ingreso', right: 'Dinero recibido', id: 1 },
            { left: 'Gasto', right: 'Dinero desembolsado', id: 2 },
            { left: 'Ahorro', right: 'Dinero reservado', id: 3 },
            { left: 'Inversión', right: 'Dinero que genera más dinero', id: 4 }
        ],
        points: 200
    },
    {
        id: 7, topic: 'inversion', type: 'slider',
        question: '¿Qué porcentaje de tus ingresos recomiendan los expertos ahorrar mensualmente?',
        min: 0, max: 50, correctAnswer: 20, tolerance: 5,
        explanation: 'Los expertos recomiendan ahorrar al menos el 20% de los ingresos mensuales.',
        points: 150
    },
    {
        id: 8, topic: 'credito', type: 'multiple',
        question: '¿Qué es mejor para tu salud financiera?',
        options: ['Pagar el total de la tarjeta de crédito cada mes', 'Pagar solo el mínimo requerido', 'Tener muchas tarjetas de crédito', 'Usar el crédito para gastos diarios'],
        correct: 0,
        explanation: 'Pagar el total cada mes evita intereses y mantiene un buen historial crediticio.',
        points: 100
    },
    {
        id: 9, topic: 'contabilidad', type: 'multiple',
        question: 'La ecuación contable fundamental es:',
        options: ['Activo = Pasivo + Patrimonio', 'Activo = Ingresos - Gastos', 'Pasivo = Activo + Patrimonio', 'Patrimonio = Activo - Ingresos'],
        correct: 0,
        explanation: 'Activo = Pasivo + Patrimonio es la base de la contabilidad por partida doble.',
        points: 100
    },
    {
        id: 10, topic: 'finanzas', type: 'drag',
        question: 'Ordena los pasos para crear un plan financiero saludable:',
        items: ['Analizar ingresos y gastos', 'Establecer metas financieras', 'Crear un presupuesto', 'Ahorrar e invertir regularmente', 'Revisar y ajustar periódicamente'],
        points: 200
    },
    {
        id: 11, topic: 'presupuesto', type: 'multiple',
        question: '¿Qué es un gasto hormiga?',
        options: ['Pequeños gastos diarios que suman grandes cantidades', 'Gastos en insecticidas', 'Grandes compras planificadas', 'Inversiones pequeñas'],
        correct: 0,
        explanation: 'Los gastos hormiga son pequeñas compras frecuentes que parecen insignificantes pero suman mucho al mes.',
        points: 100
    },
    {
        id: 12, topic: 'inversion', type: 'multiple',
        question: '¿Qué es el interés compuesto?',
        options: ['Intereses que generan más intereses con el tiempo', 'Un tipo de impuesto financiero', 'El interés que cobra el banco', 'Una comisión por inversión'],
        correct: 0,
        explanation: 'El interés compuesto hace que tu dinero crezca exponencialmente al reinvertir las ganancias.',
        points: 100
    }
];

// Nivel 1: Fondo de Emergencia
const fondoEmergenciaQuestions = [
    { id: 101, topic: 'fondo-emergencia', type: 'multiple', question: '¿Qué es un fondo de emergencia?', options: ['Dinero para comprar regalos', 'Un ahorro destinado a cubrir gastos inesperados', 'Un préstamo bancario', 'Dinero para vacaciones'], correct: 1, explanation: '¡Exacto! Es un ahorro para imprevistos como urgencias médicas o reparaciones.', points: 100 },
    { id: 102, topic: 'fondo-emergencia', type: 'multiple', question: '¿Cuál de estas situaciones corresponde a una emergencia?', options: ['Hospitalización inesperada', 'Comprar ropa', 'Ir al cine', 'Comprar un celular nuevo'], correct: 0, explanation: '¡Muy bien! Una emergencia de salud no se planifica y requiere fondos inmediatos.', points: 100 },
    { id: 103, topic: 'fondo-emergencia', type: 'multiple', question: '¿Para qué sirve un fondo de emergencia?', options: ['Comprar cosas por impulso', 'Ahorrar para vacaciones', 'Cubrir gastos inesperados sin endeudarse', 'Comprar tecnología'], correct: 2, explanation: '¡Excelente! Te protege de pedir préstamos con intereses altos.', points: 100 },
    { id: 104, topic: 'fondo-emergencia', type: 'multiple', question: '¿Cuándo es recomendable ahorrar?', options: ['Solo cuando sobra dinero', 'Todos los meses', 'Una vez al año', 'Nunca'], correct: 1, explanation: '¡Así se hace! El ahorro es un hábito constante que se planifica cada mes.', points: 100 },
    { id: 105, topic: 'fondo-emergencia', type: 'multiple', question: 'Si se rompe el refrigerador de tu casa, ¿qué sería lo más recomendable?', options: ['Pedir un préstamo', 'Esperar varios meses', 'Utilizar el fondo de emergencia', 'No hacer nada'], correct: 2, explanation: '¡Correcto! Es una urgencia doméstica para la cual está diseñado este fondo.', points: 100 },
    { id: 106, topic: 'fondo-emergencia', type: 'multiple', question: '¿Cuál de estas opciones NO corresponde a una emergencia?', options: ['Una operación médica', 'Una reparación urgente', 'Comprar el último modelo de celular', 'Reparar una fuga de agua'], correct: 2, explanation: '¡Exacto! Cambiar de teléfono por gusto es un deseo, no una emergencia.', points: 100 },
    { id: 107, topic: 'fondo-emergencia', type: 'multiple', question: '¿Qué documento permite conocer cómo se distribuye el sueldo de un trabajador?', options: ['Factura', 'Boleta', 'Planilla de remuneraciones', 'Balance general'], correct: 2, explanation: '¡Muy bien! Ahí se detallan los haberes, descuentos y líquido a pagar.', points: 100 },
    { id: 108, topic: 'fondo-emergencia', type: 'multiple', question: '¿Qué representa el sueldo líquido?', options: ['El sueldo antes de descuentos', 'El dinero destinado a la AFP', 'El dinero que finalmente recibe el trabajador', 'Los impuestos'], correct: 2, explanation: '¡Excelente! Es el monto real entregado al trabajador después de los descuentos.', points: 100 },
    { id: 109, topic: 'fondo-emergencia', type: 'multiple', question: '¿Por qué la planilla de remuneraciones puede ayudar a crear un fondo de emergencia?', options: ['Porque aumenta el sueldo', 'Porque elimina gastos', 'Porque permite saber cuánto dinero recibe una persona y cuánto puede ahorrar', 'Porque evita pagar impuestos'], correct: 2, explanation: '¡Bien pensado! Saber tus ingresos exactos permite calcular tu capacidad de ahorro.', points: 100 },
    { id: 110, topic: 'fondo-emergencia', type: 'multiple', question: '¿Cuál de las siguientes especialidades enseña sobre remuneraciones, educación financiera, administración y contabilidad?', options: ['🍳 Gastronomía', '👶 Atención de Párvulos', '📊 Contabilidad', '🥫 Elaboración Industrial de Alimentos', '⚡ Electrónica'], correct: 2, explanation: '¡Correcto! Contabilidad entrega las herramientas para administrar el dinero y las organizaciones.', points: 100 },
    { id: 111, topic: 'fondo-emergencia', type: 'multiple', question: '¿Cuántos meses de gastos debe cubrir idealmente un fondo de emergencia?', options: ['1 mes', '2 meses', 'De 3 a 6 meses', '12 meses o más'], correct: 2, explanation: 'Los expertos recomiendan cubrir entre 3 y 6 meses de gastos básicos.', points: 100 },
    { id: 112, topic: 'fondo-emergencia', type: 'multiple', question: '¿Dónde es mejor guardar el dinero del fondo de emergencia?', options: ['En una alcancía en casa', 'Invertido en acciones', 'En una cuenta de ahorro de fácil acceso', 'Prestado a un familiar'], correct: 2, explanation: 'Debe estar disponible rápidamente y sin riesgo de pérdida.', points: 100 },
    { id: 113, topic: 'fondo-emergencia', type: 'multiple', question: '¿Qué característica debe tener un fondo de emergencia?', options: ['Alta rentabilidad', 'Liquidez inmediata', 'Plazo fijo a 5 años', 'Inversión en criptomonedas'], correct: 1, explanation: 'La liquidez permite disponer del dinero en el momento exacto de la emergencia.', points: 100 },
    { id: 114, topic: 'fondo-emergencia', type: 'multiple', question: 'Si ganas $500.000 mensuales, ¿cuánto deberías tener idealmente en tu fondo de emergencia?', options: ['$100.000', '$500.000', 'Entre $1.500.000 y $3.000.000', '$10.000.000'], correct: 2, explanation: 'Equivale a 3-6 meses de gastos. Si tus gastos son $500.000, necesitas entre $1.5 y $3 millones.', points: 100 },
    { id: 115, topic: 'fondo-emergencia', type: 'multiple', question: '¿Cuál es el primer paso para crear un fondo de emergencia?', options: ['Calcular los gastos mensuales básicos', 'Pedir un préstamo', 'Invertir en la bolsa', 'Gastar menos en entretención'], correct: 0, explanation: 'Primero debes saber cuánto necesitas para cubrir tus gastos esenciales.', points: 100 }
];

// Nivel 2: Contabilidad y Nómina
const nivel2Questions = [
    { id: 201, topic: 'contabilidad', type: 'multiple', question: 'Si una empresa cobra $500 en efectivo por un servicio realizado, ¿cuál es el registro contable correcto?', options: ['Cargar (Débito) a Caja y Abonar (Crédito) a Ingresos por Servicios', 'Cargar a Ingresos por Servicios y Abonar a Caja', 'Cargar a Banco y Abonar a Cuentas por Cobrar', 'Cargar a Gastos Generales y Abonar a Caja'], correct: 0, explanation: 'El dinero entra a la empresa (Activo aumenta por el Debe en Caja) y se reconoce la venta (Ingreso aumenta por el Haber).', points: 150 },
    { id: 202, topic: 'contabilidad', type: 'multiple', question: '¿Qué ocurre en la ecuación contable cuando una empresa compra mercancía al contado?', options: ['Aumenta un Activo (Inventario) y disminuye otro Activo (Caja)', 'Aumenta un Activo y aumenta un Pasivo', 'Disminuye el Patrimonio y aumenta el Pasivo', 'Aumenta el Pasivo y disminuye el Activo'], correct: 0, explanation: 'Es un intercambio de activos: ingresa Inventario y sale Efectivo/Caja por el mismo valor.', points: 150 },
    { id: 203, topic: 'tributacion', type: 'multiple', question: 'En el cálculo del IVA, ¿qué representa el Débito Fiscal?', options: ['El IVA cobrado a los clientes en las ventas de la empresa', 'El IVA pagado a los proveedores al comprar insumos', 'El impuesto sobre la renta que se paga a fin de año', 'Un dinero que la administración tributaria le debe a la empresa'], correct: 0, explanation: 'El Débito Fiscal es el IVA recaudado de las ventas. Representa un pasivo con el fisco.', points: 150 },
    { id: 204, topic: 'tributacion', type: 'multiple', question: 'Si en un mes generas $200 de Débito Fiscal y pagaste $120 de Crédito Fiscal, ¿cuánto debes pagar al fisco?', options: ['$80', '$320', '$120', '$0 (Queda saldo a favor)'], correct: 0, explanation: 'Impuesto a pagar = Débito Fiscal ($200) menos Crédito Fiscal ($120) = $80.', points: 150 },
    { id: 205, topic: 'nomina', type: 'multiple', question: '¿Cuál es la diferencia entre el Sueldo Bruto y el Sueldo Líquido?', options: ['El Sueldo Bruto es el total pactado; el Líquido es lo que recibe el trabajador tras descuentos de ley', 'El Sueldo Líquido es antes de impuestos y el Bruto es después', 'El Sueldo Bruto se paga en efectivo y el Líquido mediante cheque', 'Son exactamente el mismo monto'], correct: 0, explanation: 'El Sueldo Bruto incluye todos los haberes. Al restarle las retenciones legales se obtiene el Sueldo Líquido.', points: 150 },
    { id: 206, topic: 'contabilidad', type: 'multiple', question: '¿Cuál de las siguientes cuentas es de naturaleza ACREEDORA (aumenta por el Haber)?', options: ['Cuentas por Pagar (Pasivo)', 'Caja Chica (Activo)', 'Gastos de Arriendo (Gasto)', 'Banco (Activo)'], correct: 0, explanation: 'Las cuentas de Pasivo, Patrimonio e Ingresos nacen y aumentan por el Haber.', points: 150 },
    { id: 207, topic: 'contabilidad', type: 'multiple', question: '¿Para qué sirve el Libro Mayor en la contabilidad diaria?', options: ['Para agrupar los saldos individuales y movimientos de cada cuenta contable', 'Para anotar las facturas del día en orden cronológico', 'Para calcular el sueldo de los trabajadores', 'Para pagar los impuestos directamente'], correct: 0, explanation: 'El Libro Mayor clasifica las operaciones por cada cuenta específica para conocer su saldo.', points: 150 },
    { id: 208, topic: 'contabilidad', type: 'multiple', question: 'Se compra un equipo de oficina por $1.000 a crédito firmando una letra. ¿Qué cuenta de pasivo aumenta?', options: ['Documentos por Pagar', 'Cuentas por Cobrar', 'Capital Social', 'Gastos Operativos'], correct: 0, explanation: 'Al existir un compromiso formal respaldado por un documento, la deuda se registra en Documentos por Pagar.', points: 150 },
    { id: 209, topic: 'nomina', type: 'multiple', question: '¿Qué representan los "Haberes No Imponibles" en una planilla de remuneraciones?', options: ['Asignaciones que no sufren descuentos legales, como la movilización o colación', 'El sueldo base antes de calcular las horas extras', 'Los préstamos que la empresa le otorga al trabajador', 'Los impuestos cobrados directamente por el gobierno'], correct: 0, explanation: 'Son compensaciones por gastos de trabajo sobre los cuales no se aplican retenciones.', points: 150 },
    { id: 210, topic: 'contabilidad', type: 'multiple', question: '¿Cuál es el principio contable de la "Partida Doble"?', options: ['No hay deudor sin acreedor: la suma del Debe debe ser igual a la suma del Haber', 'Todas las compras se deben hacer por duplicado', 'Los impuestos se pagan dos veces al año', 'Las ganancias siempre deben duplicar a las pérdidas'], correct: 0, explanation: 'La partida doble garantiza el equilibrio patrimonial en todo asiento contable.', points: 150 }
];

// Nivel 3: Estados Financieros
const nivel3Questions = [
    { id: 301, topic: 'estados-financieros', type: 'multiple', question: '¿Qué fórmula se utiliza para determinar la Utilidad Bruta en el Estado de Resultados?', options: ['Ventas Netas - Costo de Ventas', 'Ingresos Totales - Gastos Administrativos', 'Activo Total - Pasivo Total', 'Utilidad Neta + Impuestos'], correct: 0, explanation: 'La Utilidad Bruta mide la ganancia directa generada por la venta de productos antes de restar los gastos operativos.', points: 200 },
    { id: 302, topic: 'analisis-financiero', type: 'slider', question: 'Si una empresa tiene $15.000 de Activo Corriente y $5.000 de Pasivo Corriente, ¿cuál es su Razón de Liquidez Corriente?', min: 0, max: 5, correctAnswer: 3, tolerance: 0, explanation: 'Razón Corriente = $15.000 / $5.000 = 3. La empresa posee $3 en activos líquidos por cada $1 de deuda.', points: 200 },
    { id: 303, topic: 'inventario', type: 'multiple', question: 'En un período con precios al alza, ¿qué ocurre al aplicar el método PEPS (FIFO)?', options: ['El Costo de Ventas es menor y la Utilidad Bruta se presenta más alta', 'El Costo de Ventas es mayor y la Utilidad Bruta disminuye', 'No hay ningún impacto en los estados financieros', 'El valor del inventario final resulta infravalorado'], correct: 0, explanation: 'Al vender primero los artículos antiguos (más baratos), el Costo de Ventas baja y la Utilidad sube.', points: 200 },
    { id: 304, topic: 'estados-financieros', type: 'multiple', question: '¿Cómo se clasifican las deudas que la empresa debe pagar en un plazo menor a 12 meses?', options: ['Pasivo Corriente (o a Corto Plazo)', 'Pasivo No Corriente (o a Largo Plazo)', 'Patrimonio Neto', 'Activo Intangible'], correct: 0, explanation: 'Todas las obligaciones exigibles en un plazo máximo de un año forman parte del Pasivo Corriente.', points: 200 },
    { id: 305, topic: 'analisis-financiero', type: 'multiple', question: '¿Qué representa el Capital de Trabajo de una organización?', options: ['Los recursos disponibles para operar (Activo Corriente - Pasivo Corriente)', 'El total de las aportaciones de los socios', 'El valor de los edificios y maquinaria', 'El total de créditos solicitados a los bancos'], correct: 0, explanation: 'El Capital de Trabajo Neto indica la liquidez excedente para continuar operando.', points: 200 },
    { id: 306, topic: 'estados-financieros', type: 'multiple', question: '¿Qué es la Depreciación Acumulada dentro del Balance General?', options: ['Una cuenta reguladora del activo que refleja la pérdida de valor de los bienes de uso', 'Un gasto que requiere salida directa de dinero', 'Una deuda a largo plazo con proveedores', 'Una reserva de dinero en efectivo'], correct: 0, explanation: 'Reduce el valor en libros de los activos fijos debido al desgaste, uso o tiempo.', points: 200 },
    { id: 307, topic: 'inventario', type: 'multiple', question: '¿En qué consiste el método del Promedio Ponderado para el control de inventarios?', options: ['Calcula un costo unitario medio dividiendo el costo total entre las unidades en existencia', 'Asigna el costo de las últimas unidades compradas a las primeras salidas', 'Aplica un valor estimado al azar', 'Utiliza únicamente el precio de venta al público'], correct: 0, explanation: 'El promedio ponderado suaviza las variaciones de precios recalculando el costo medio tras cada compra.', points: 200 },
    { id: 308, topic: 'estados-financieros', type: 'multiple', question: 'Si una empresa reporta Ventas de $50.000 y Utilidad Neta de $10.000, ¿cuál es su Margen Neto?', options: ['20%', '50%', '5%', '10%'], correct: 0, explanation: 'Margen Neto = ($10.000 / $50.000) × 100 = 20%.', points: 200 },
    { id: 309, topic: 'analisis-financiero', type: 'multiple', question: '¿Cuál es la diferencia entre el Estado de Resultados y el Balance General?', options: ['El Estado de Resultados mide el desempeño durante un período; el Balance muestra la situación a una fecha', 'El Balance mide el rendimiento anual y el Estado de Resultados solo la liquidez', 'Ambos reportes muestran exactamente la misma información', 'El Estado de Resultados es interno y el Balance solo para entidades tributarias'], correct: 0, explanation: 'El Estado de Resultados es dinámico (flujos) y el Balance General es estático (foto a una fecha).', points: 200 },
    { id: 310, topic: 'estados-financieros', type: 'multiple', question: '¿A qué grupo pertenecen el arriendo del local y los sueldos administrativos en el Estado de Resultados?', options: ['Gastos Operativos (Administración y Ventas)', 'Costo Directo de Ventas', 'Ingresos Extraordinarios', 'Pasivos a Largo Plazo'], correct: 0, explanation: 'Son desembolsos necesarios para la gestión operativa, clasificados como Gastos Operativos.', points: 200 }
];

// Nivel 4: Cálculos Avanzados
const nivelAvanzadoQuestions = [
    { id: 401, topic: 'contabilidad', type: 'multiple', question: 'Activo Total = $45.000, Pasivo Total = $18.000. Si los socios aportan $5.000 más, ¿nuevo Patrimonio?', options: ['$32.000', '$27.000', '$22.000', '$50.000'], correct: 0, explanation: 'Patrimonio Inicial = $45.000 - $18.000 = $27.000. Con aporte: $27.000 + $5.000 = $32.000.', points: 250 },
    { id: 402, topic: 'tributacion', type: 'multiple', question: 'Ventas por $1.000 neto (más 16% IVA) y compras por $600 neto (más 16% IVA). ¿IVA a pagar?', options: ['$64', '$160', '$96', '$256'], correct: 0, explanation: 'Débito Fiscal = $1.000 × 0,16 = $160. Crédito Fiscal = $600 × 0,16 = $96. IVA = $160 - $96 = $64.', points: 250 },
    { id: 403, topic: 'estados-financieros', type: 'multiple', question: 'Maquinaria de $12.000, vida útil 5 años, valor residual $2.000. ¿Valor en libros al año 2?', options: ['$8.000', '$10.000', '$4.000', '$6.000'], correct: 0, explanation: 'Depreciación anual = ($12.000 - $2.000) / 5 = $2.000. Año 2: $12.000 - $4.000 = $8.000.', points: 250 },
    { id: 404, topic: 'analisis-financiero', type: 'slider', question: 'Activo Corriente = $18.000, Inventario = $6.000, Pasivo Corriente = $8.000. ¿Prueba Ácida?', min: 0, max: 5, correctAnswer: 1.5, tolerance: 0.1, explanation: 'Prueba Ácida = ($18.000 - $6.000) / $8.000 = $12.000 / $8.000 = 1,5.', points: 250 },
    { id: 405, topic: 'estados-financieros', type: 'multiple', question: 'Ventas $80.000, Costo $50.000, Gastos Operativos $18.000. ¿Margen Operativo?', options: ['15%', '37,5%', '22,5%', '62,5%'], correct: 0, explanation: 'Utilidad Operativa = $80.000 - $50.000 - $18.000 = $12.000. Margen = ($12.000 / $80.000) × 100 = 15%.', points: 250 },
    { id: 406, topic: 'nomina', type: 'multiple', question: 'Sueldo Base $800, horas extras $150, retenciones 10% del total imponible. ¿Sueldo Líquido?', options: ['$855', '$720', '$800', '$950'], correct: 0, explanation: 'Total Imponible = $800 + $150 = $950. Retenciones = $95. Líquido = $950 - $95 = $855.', points: 250 },
    { id: 407, topic: 'inventarios', type: 'multiple', question: 'Inventario inicial: 10u a $10. Compra: 20u a $13. Venta: 15u. ¿Costo PEPS?', options: ['$165', '$195', '$150', '$180'], correct: 0, explanation: 'PEPS: 10u × $10 = $100 + 5u × $13 = $65. Total = $165.', points: 250 },
    { id: 408, topic: 'inventarios', type: 'multiple', question: 'Mismos datos (10u a $10, 20u a $13). ¿Costo Promedio Ponderado unitario?', options: ['$12,00', '$11,50', '$13,00', '$10,00'], correct: 0, explanation: 'Costo Total = $360. Unidades = 30. Promedio = $360 / 30 = $12,00.', points: 250 },
    { id: 409, topic: 'matematica-financiera', type: 'multiple', question: 'Préstamo de $5.000 al 12% anual simple, a 6 meses. ¿Total a pagar?', options: ['$5.300', '$5.600', '$5.120', '$6.000'], correct: 0, explanation: 'Interés = $5.000 × 0,12 × (6/12) = $300. Total = $5.300.', points: 250 },
    { id: 410, topic: 'analisis-financiero', type: 'multiple', question: 'Activos Corrientes $25.000, Pasivos Corrientes $15.000. ¿Capital de Trabajo Neto?', options: ['$10.000', '$40.000', '1,66', '$15.000'], correct: 0, explanation: 'Capital de Trabajo = $25.000 - $15.000 = $10.000.', points: 250 }
];

// Mapa de niveles
const levelQuestionsMap = {
    1: fondoEmergenciaQuestions,
    2: nivel2Questions,
    3: nivel3Questions,
    4: nivelAvanzadoQuestions
};

const levelNames = {
    1: '🟢 Fondo de Emergencia',
    2: '🔵 Contabilidad y Nómina',
    3: '🟣 Estados Financieros',
    4: '🔴 Cálculos Avanzados'
};

const levelColors = {
    1: '#10B981',
    2: '#3B82F6',
    3: '#8B5CF6',
    4: '#EF4444'
};

// ===== SISTEMA DE SONIDO (Web Audio API) =====
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    if (state.mode === 'normal' && type !== 'levelup' && type !== 'achievement') return;
    
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    switch(type) {
        case 'correct':
            osc.type = 'sine';
            osc.frequency.setValueAtTime(523, now);
            osc.frequency.setValueAtTime(659, now + 0.1);
            osc.frequency.setValueAtTime(784, now + 0.2);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            osc.start(now); osc.stop(now + 0.3);
            break;
        case 'incorrect':
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(200, now);
            osc.frequency.setValueAtTime(150, now + 0.2);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
            osc.start(now); osc.stop(now + 0.4);
            break;
        case 'levelup':
            osc.type = 'sine';
            osc.frequency.setValueAtTime(523, now);
            osc.frequency.setValueAtTime(659, now + 0.15);
            osc.frequency.setValueAtTime(784, now + 0.3);
            osc.frequency.setValueAtTime(1047, now + 0.45);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
            osc.start(now); osc.stop(now + 0.6);
            break;
        case 'achievement':
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(660, now);
            osc.frequency.setValueAtTime(880, now + 0.1);
            osc.frequency.setValueAtTime(1100, now + 0.2);
            osc.frequency.setValueAtTime(1320, now + 0.3);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
            osc.start(now); osc.stop(now + 0.5);
            break;
        case 'powerup':
            osc.type = 'sine';
            osc.frequency.setValueAtTime(440, now);
            osc.frequency.setValueAtTime(880, now + 0.15);
            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            osc.start(now); osc.stop(now + 0.3);
            break;
        case 'tick':
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1000, now);
            gain.gain.setValueAtTime(0.05, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
            osc.start(now); osc.stop(now + 0.05);
            break;
    }
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    setupSplashScreen();
    loadBadges();
    loadLeaderboard();
    setupPowerups();
    createSpeedBonusToast();
});

function createSpeedBonusToast() {
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
    setTimeout(() => {
        toast.classList.remove('show', 'hide');
    }, 2000);
}

function setupSplashScreen() {
    const skipBtn = document.getElementById('skip-splash-btn');
    const splashScreen = document.getElementById('splash-screen');
    setTimeout(() => { if (splashScreen && !splashScreen.classList.contains('hidden')) splashScreen.classList.add('hidden'); }, 6000);
    if (skipBtn) skipBtn.addEventListener('click', () => splashScreen.classList.add('hidden'));
}

function setupPowerups() {
    document.getElementById('powerup-fifty').addEventListener('click', () => usePowerup('fifty'));
    document.getElementById('powerup-time').addEventListener('click', () => usePowerup('time'));
    document.getElementById('powerup-freeze').addEventListener('click', () => usePowerup('freeze'));
    document.getElementById('powerup-hint').addEventListener('click', () => usePowerup('hint'));
}

// ===== NAVEGACIÓN =====
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById(screenId);
    if (screen) { screen.classList.add('active'); screen.classList.add('screen-expand'); setTimeout(() => screen.classList.remove('screen-expand'), 500); }
    if (screenId === 'screen-badges') loadBadges();
    if (screenId === 'screen-leaderboard') loadLeaderboard();
}

function selectMode(mode) {
    state.mode = mode;
    document.querySelectorAll('.mode-card').forEach(card => card.classList.remove('selected'));
    document.getElementById(`mode-${mode}`).classList.add('selected');
    document.getElementById('timer-display').style.display = mode === 'timed' ? 'flex' : 'none';
}

// ===== INICIO DEL JUEGO =====
function startGame() {
    state.score = 0; state.levelScore = 0; state.lives = 3; state.streak = 0; state.maxStreak = 0;
    state.currentQuestion = 0; state.currentLevel = 1; state.answeredCorrectly = {}; state.topicScores = {};
    state.isFrozen = false; state.powerupsUsedThisLevel = false; state.levelPerfect = true;
    state.levelStars = {};
    document.body.className = 'level-1';
    startLevel(1);
}

function startLevel(levelNum) {
    state.currentLevel = levelNum; state.currentQuestion = 0; state.lives = 3; state.streak = 0;
    state.levelScore = 0; state.isFrozen = false; state.powerupsUsedThisLevel = false; state.levelPerfect = true;
    state.bonusQuestionActive = false;
    
    document.body.className = `level-${levelNum}`;
    
    if (state.mode === 'timed') {
        if (levelNum === 1) state.timer = 30;
        else if (levelNum === 2) state.timer = 25;
        else state.timer = 20;
    }
    
    const rawQuestions = levelQuestionsMap[levelNum] || fondoEmergenciaQuestions;
    state.questions = shuffleArray([...rawQuestions]).slice(0, 10);
    
    // Activar pregunta bonus aleatoria (1 de cada 3 partidas)
    if (Math.random() < 0.33 && levelNum >= 2) {
        const bonusIndex = Math.floor(Math.random() * state.questions.length);
        state.questions[bonusIndex].isBonus = true;
        state.questions[bonusIndex].originalPoints = state.questions[bonusIndex].points;
        state.questions[bonusIndex].points = state.questions[bonusIndex].points * 2;
        state.bonusQuestionActive = true;
    }
    
    state.totalQuestions = state.questions.length;
    updateLevelDisplay(); updateScore(); updateLives(); updateStreak(); updateProgress();
    showScreen('screen-question');
    updateRabbitReaction('thinking');
    loadQuestion();
}

function goToNextLevel() {
    const nextLevel = state.currentLevel + 1;
    if (nextLevel <= 4) { startLevel(nextLevel); }
    else { showFinalResults(); }
}

function updateLevelDisplay() {
    const ld = document.getElementById('level-display');
    ld.textContent = `Nivel ${state.currentLevel}`;
    ld.style.background = levelColors[state.currentLevel] || '#10B981';
}

function shuffleArray(array) { const arr = [...array]; for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; } return arr; }

// ===== REACCIONES DEL CONEJO =====
function updateRabbitReaction(reaction) {
    const rabbit = document.getElementById('rabbit-svg');
    if (!rabbit) return;
    rabbit.className = 'rabbit-svg ' + reaction;
    
    const speech = document.getElementById('question-speech');
    const messages = {
        'thinking': ['¡Piensa bien tu respuesta! 🤔', 'Tú puedes hacerlo 💪', 'Analiza con cuidado 📊'],
        'nervous': ['¡El tiempo se acaba! ⏰', '¡Rápido! 😰', '¡No te congeles! ❄️'],
        'bored': ['¡Despierta! ☕', '¡Vamos, tú puedes! 😴', '¡No te duermas! 💤'],
        'impressed': ['¡Impresionante racha! 🤩', '¡Eres increíble! 🌟', '¡Qué genio! 🧠'],
        'sad': ['¡No te rindas! 💪', '¡Aprende del error! 📚', '¡La próxima será! 🎯'],
        'celebrating': ['¡Perfecto! 🥳', '¡Nivel impecable! 🎉', '¡Eres el mejor! 🏆'],
        'deep-think': ['¡Nivel experto! 🔬', '¡Piensa profundamente! 🧐', '¡Confía en tus cálculos! 📐'],
        'confident': ['¡Eliminamos dos! 😎', '¡Ahora es más fácil! ✨', '¡Tú tienes el control! 🕶️'],
        'frozen': ['¡Tiempo congelado! 🥶', '¡Relájate y piensa! ❄️', '¡Sin prisa! ⛄'],
        'determined': ['¡Ahora sí! 😤', '¡Con más ganas! 💪', '¡Esta no falla! 🔥'],
        'graduate': ['¡Lo lograste! 🎓', '¡Graduado financiero! 🏅', '¡Eres un maestro! 👨‍🎓']
    };
    
    const list = messages[reaction] || messages['thinking'];
    if (speech) speech.textContent = list[Math.floor(Math.random() * list.length)];
}

// ===== CARGA DE PREGUNTAS =====
function loadQuestion() {
    if (state.currentQuestion >= state.totalQuestions) { endLevel(); return; }
    
    clearInterval(state.timerInterval);
    state.questionStartTime = Date.now();
    
    const question = state.questions[state.currentQuestion];
    const optionsGrid = document.getElementById('options-grid');
    const matchingContainer = document.getElementById('matching-container');
    const dragContainer = document.getElementById('drag-container');
    const sliderContainer = document.getElementById('slider-container');
    const feedbackBox = document.getElementById('feedback-box');
    const btnNext = document.getElementById('btn-next');
    
    optionsGrid.innerHTML = ''; optionsGrid.style.display = 'none';
    matchingContainer.innerHTML = ''; matchingContainer.style.display = 'none';
    dragContainer.innerHTML = ''; dragContainer.style.display = 'none';
    sliderContainer.innerHTML = ''; sliderContainer.style.display = 'none';
    feedbackBox.className = 'feedback-box'; feedbackBox.innerHTML = '';
    btnNext.style.display = 'none';
    document.getElementById('question-image').style.display = 'none';
    
    document.getElementById('question-text').textContent = question.question;
    
    // Reacción según nivel
    if (state.currentLevel === 4) updateRabbitReaction('deep-think');
    else updateRabbitReaction('thinking');
    
    switch (question.type) {
        case 'multiple': loadMultipleChoice(question); break;
        case 'matching': loadMatching(question); break;
        case 'slider': loadSlider(question); break;
        case 'drag': loadDrag(question); break;
    }
    
    if (state.mode === 'timed') startTimer();
    updateProgress();
    
    // Marcar pregunta bonus
    if (question.isBonus && optionsGrid.style.display === 'flex') {
        document.querySelectorAll('.option-btn').forEach(btn => btn.classList.add('bonus-question'));
    }
}

// ===== TIPOS DE PREGUNTAS =====
function loadMultipleChoice(question) {
    const optionsGrid = document.getElementById('options-grid');
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
            if (selectedLeft && !this.classList.contains('matched')) {
                if (selectedLeft.dataset.pairId === this.dataset.pairId) {
                    selectedLeft.classList.add('matched'); this.classList.add('matched');
                    matches[this.dataset.pairId] = true; selectedLeft = null;
                    if (Object.keys(matches).length === question.pairs.length) handleCorrectAnswer(question.points);
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
        const userAnswer = parseFloat(input.value);
        if (Math.abs(userAnswer - question.correctAnswer) <= question.tolerance) handleCorrectAnswer(question.points);
        else handleIncorrectAnswer(question);
    });
    
    sliderContainer.appendChild(valueDisplay); sliderContainer.appendChild(track); sliderContainer.appendChild(submitBtn);
}

function loadDrag(question) {
    const dragContainer = document.getElementById('drag-container');
    dragContainer.style.display = 'flex';
    
    question.items.forEach((item, index) => {
        const dropZone = document.createElement('div'); dropZone.className = 'drop-zone';
        dropZone.textContent = `${index + 1}. Soltar aquí`; dropZone.dataset.index = index;
        dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('drag-over'); });
        dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
        dropZone.addEventListener('drop', (e) => {
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
        itemsContainer.appendChild(draggable);
    });
    
    dragContainer.appendChild(itemsContainer);
}

function checkDragComplete(question) {
    const dropZones = document.querySelectorAll('.drop-zone');
    let allFilled = true, allCorrect = true;
    dropZones.forEach((zone, index) => {
        if (!zone.dataset.filled) allFilled = false;
        else if (parseInt(zone.dataset.filled) !== index) allCorrect = false;
    });
    if (allFilled) { if (allCorrect) handleCorrectAnswer(question.points); else handleIncorrectAnswer(question); }
}

// ===== MANEJO DE RESPUESTAS =====
function checkMultipleAnswer(originalIndex, question) {
    const options = document.querySelectorAll('.option-btn');
    options.forEach(btn => btn.disabled = true);
    
    const shuffledIndices = question._shuffledIndices;
    const correctDisplayIndex = shuffledIndices.indexOf(question.correct);
    let clickedDisplayIndex = -1;
    options.forEach((btn, i) => { if (parseInt(btn.dataset.originalIndex) === originalIndex) clickedDisplayIndex = i; });
    
    const responseTime = (Date.now() - state.questionStartTime) / 1000;
    
    if (originalIndex === question.correct) {
        options[clickedDisplayIndex].classList.add('correct');
        let totalPoints = question.points;
        
        // Bonus por velocidad
        if (responseTime < 3) {
            const speedBonus = Math.round(question.points * 0.5);
            totalPoints += speedBonus;
            showSpeedBonus(speedBonus);
        }
        
        // Bonus por pregunta bonus
        if (question.isBonus) {
            showFeedback(question.explanation + ' 🎁 ¡PREGUNTA BONUS! Puntuación DOBLE.', 'bonus');
        }
        
        handleCorrectAnswer(totalPoints);
        playSound('correct');
    } else {
        options[clickedDisplayIndex].classList.add('incorrect');
        options[correctDisplayIndex].classList.add('correct');
        handleIncorrectAnswer(question);
        playSound('incorrect');
        updateRabbitReaction('determined');
    }
    
    clearInterval(state.timerInterval);
}

function handleCorrectAnswer(points) {
    state.score += points;
    state.levelScore += points;
    state.streak++;
    if (state.streak > state.maxStreak) state.maxStreak = state.streak;
    
    const question = state.questions[state.currentQuestion];
    if (!state.topicScores[question.topic]) state.topicScores[question.topic] = { correct: 0, total: 0 };
    state.topicScores[question.topic].correct++;
    state.topicScores[question.topic].total++;
    
    updateScore(); updateStreak();
    
    // Reacciones según racha
    if (state.streak >= 5) {
        updateRabbitReaction('impressed');
        document.getElementById('streak-display').classList.add('on-fire');
    } else if (state.streak >= 3) {
        updateRabbitReaction('impressed');
    } else {
        updateRabbitReaction('correct');
    }
    
    document.getElementById('btn-next').style.display = 'block';
    checkBadges();
    triggerCoinRain();
}

function handleIncorrectAnswer(question) {
    state.lives--; state.streak = 0; state.levelPerfect = false;
    document.getElementById('streak-display').classList.remove('on-fire');
    
    if (!state.topicScores[question.topic]) state.topicScores[question.topic] = { correct: 0, total: 0 };
    state.topicScores[question.topic].total++;
    
    updateLives(); updateStreak();
    
    if (state.lives <= 0) {
        updateRabbitReaction('sad');
        setTimeout(() => endLevel(), 1500);
    } else {
        updateRabbitReaction('incorrect');
    }
    
    document.getElementById('btn-next').style.display = 'block';
}

function showFeedback(message, type) {
    const fb = document.getElementById('feedback-box');
    fb.textContent = message;
    fb.className = `feedback-box ${type}`;
}

function nextQuestion() {
    state.currentQuestion++;
    document.getElementById('streak-display').classList.remove('on-fire');
    loadQuestion();
}

// ===== FIN DE NIVEL =====
function endLevel() {
    clearInterval(state.timerInterval);
    
    // Calcular estrellas
    const totalQ = state.totalQuestions;
    const correctAnswers = state.levelScore / (state.questions[0]?.points || 100);
    const starCount = state.levelPerfect ? 3 : (correctAnswers >= totalQ * 0.7 ? 2 : 1);
    state.levelStars[state.currentLevel] = starCount;
    
    // Verificar insignias
    if (state.levelPerfect && state.lives === 3 && !state.badges.perfectScore) {
        state.badges.perfectScore = true;
        playSound('achievement');
        setTimeout(() => alert('💯 ¡Nueva insignia: Puntaje Perfecto!'), 300);
        saveBadges();
    }
    if (state.lives === 3 && !state.badges.survivor) {
        state.badges.survivor = true;
        playSound('achievement');
        setTimeout(() => alert('🛡️ ¡Nueva insignia: Sobreviviente!'), 300);
        saveBadges();
    }
    if (!state.powerupsUsedThisLevel && !state.badges.noPowerups) {
        state.badges.noPowerups = true;
        playSound('achievement');
        setTimeout(() => alert('💪 ¡Nueva insignia: Poder Natural!'), 300);
        saveBadges();
    }
    
    if (state.currentLevel < 4) {
        document.getElementById('transition-title').textContent = `${levelNames[state.currentLevel]} Completado`;
        document.getElementById('transition-speech').textContent = `¡Excelente! Nivel ${state.currentLevel} superado 🎉`;
        document.getElementById('level-score-display').textContent = state.levelScore;
        
        // Mostrar estrellas
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
        
        document.getElementById('btn-next-level').textContent = `Siguiente: ${levelNames[state.currentLevel + 1]} ➡️`;
        
        updateRabbitReaction(state.levelPerfect ? 'celebrating' : 'correct');
        showScreen('screen-level-transition');
        playSound('levelup');
        launchConfetti();
    } else {
        updateRabbitReaction('graduate');
        showFinalResults();
        playSound('levelup');
    }
}

function showFinalResults() {
    document.getElementById('final-score').textContent = state.score;
    
    const topicAnalysis = document.getElementById('topic-analysis');
    topicAnalysis.innerHTML = '';
    
    const topicNames = {
        'presupuesto': 'Presupuesto', 'ahorro': 'Ahorro', 'inversion': 'Inversión', 'credito': 'Crédito',
        'contabilidad': 'Contabilidad', 'finanzas': 'Finanzas', 'fondo-emergencia': 'Fondo de Emergencia',
        'tributacion': 'Tributación', 'nomina': 'Nómina', 'estados-financieros': 'Estados Financieros',
        'analisis-financiero': 'Análisis Financiero', 'inventario': 'Inventarios', 'inventarios': 'Inventarios',
        'matematica-financiera': 'Matemática Financiera'
    };
    
    const topicColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#E63946', '#6366F1', '#14B8A6', '#F97316', '#84CC16'];
    let colorIndex = 0;
    
    for (const [topic, scores] of Object.entries(state.topicScores)) {
        const percentage = Math.round((scores.correct / scores.total) * 100);
        const bar = document.createElement('div'); bar.className = 'topic-bar';
        bar.innerHTML = `<span class="topic-label">${topicNames[topic] || topic}</span><div class="topic-progress"><div class="topic-fill" style="width:${percentage}%;background:${topicColors[colorIndex]}"></div></div><span class="topic-score">${percentage}%</span>`;
        topicAnalysis.appendChild(bar);
        colorIndex = (colorIndex + 1) % topicColors.length;
    }
    
    const shareBadges = document.getElementById('share-badges');
    shareBadges.innerHTML = '';
    for (const [badge, unlocked] of Object.entries(state.badges)) {
        if (unlocked) {
            const badgeEl = document.createElement('span'); badgeEl.className = 'share-badge';
            badgeEl.textContent = getBadgeIcon(badge);
            shareBadges.appendChild(badgeEl);
        }
    }
    
    const speech = document.getElementById('result-character-speech');
    const maxScore = 7000;
    if (state.score >= maxScore * 0.9) speech.textContent = '¡Rendimiento excepcional! Conti Conti te admira. 🏆🐰';
    else if (state.score >= maxScore * 0.7) speech.textContent = '¡Excelente resultado! Bases muy sólidas. 👏🐰';
    else if (state.score >= maxScore * 0.4) speech.textContent = '¡Buen esfuerzo! Sigue practicando. 📚🐰';
    else speech.textContent = '¡El aprendizaje es un camino diario! 💡🐰';
    
    showScreen('screen-results');
    launchConfetti();
    saveToLeaderboard();
}

function restartGame() {
    state.currentQuestion = 0; state.score = 0; state.levelScore = 0; state.lives = 3;
    state.streak = 0; state.currentLevel = 1; state.powerupsUsedThisLevel = false; state.levelPerfect = true;
    state.levelStars = {}; state.bonusQuestionActive = false;
    document.body.className = 'level-1';
    document.getElementById('streak-display').classList.remove('on-fire');
    updateScore(); updateLives(); updateStreak(); updateProgress(); updateLevelDisplay();
    startGame();
}

function goToFinalScreen() {
    updateRabbitReaction('graduate');
    showScreen('screen-final');
    launchConfetti();
}

// ===== POWER-UPS =====
function usePowerup(type) {
    if (state.powerups[type] <= 0) return;
    if (state.currentQuestion >= state.totalQuestions) return;
    
    state.powerups[type]--;
    state.powerupsUsedThisLevel = true;
    updatePowerupButtons();
    playSound('powerup');
    
    // Flash animation
    const btn = document.getElementById(`powerup-${type}`);
    if (btn) { btn.classList.add('flash'); setTimeout(() => btn.classList.remove('flash'), 300); }
    
    switch (type) {
        case 'fifty': applyFiftyFifty(); updateRabbitReaction('confident'); break;
        case 'time': if (state.mode === 'timed') { state.timer += 15; updateTimerDisplay(); } break;
        case 'freeze': state.isFrozen = true; updateRabbitReaction('frozen');
            document.getElementById('timer-display').style.backgroundColor = '#10B981';
            setTimeout(() => { state.isFrozen = false; updateRabbitReaction('thinking'); document.getElementById('timer-display').style.backgroundColor = 'var(--azul-oscuro)'; }, 10000);
            break;
        case 'hint': applyHint(); break;
    }
}

function applyFiftyFifty() {
    const question = state.questions[state.currentQuestion];
    if (question.type !== 'multiple') return;
    const options = document.querySelectorAll('.option-btn');
    const shuffledIndices = question._shuffledIndices;
    const correctDisplayIndex = shuffledIndices.indexOf(question.correct);
    const incorrectIndexes = [];
    options.forEach((btn, i) => { if (i !== correctDisplayIndex) incorrectIndexes.push(i); });
    shuffleArray(incorrectIndexes).slice(0, 2).forEach(index => { options[index].style.opacity = '0.3'; options[index].style.pointerEvents = 'none'; });
}

function applyHint() {
    const question = state.questions[state.currentQuestion];
    const fb = document.getElementById('feedback-box');
    fb.textContent = `💡 Pista: ${question.explanation.split('.')[0]}.`;
    fb.className = 'feedback-box correct';
}

function updatePowerupButtons() {
    ['fifty', 'time', 'freeze', 'hint'].forEach(type => {
        const btn = document.getElementById(`powerup-${type}`);
        if (!btn) return;
        const small = btn.querySelector('small');
        if (small) small.textContent = `(${state.powerups[type]})`;
        if (state.powerups[type] <= 0) btn.disabled = true;
    });
}

// ===== TEMPORIZADOR =====
function startTimer() {
    updateTimerDisplay();
    const timerDisplay = document.getElementById('timer-display');
    timerDisplay.classList.remove('warning');
    
    state.timerInterval = setInterval(() => {
        if (state.isFrozen) return;
        state.timer--;
        updateTimerDisplay();
        
        if (state.timer <= 5) {
            timerDisplay.classList.add('warning');
            updateRabbitReaction('nervous');
            playSound('tick');
        }
        if (state.timer <= 0) {
            clearInterval(state.timerInterval);
            handleIncorrectAnswer(state.questions[state.currentQuestion]);
        }
    }, 1000);
    
    // Verificar si el usuario tarda mucho
    state._boredTimeout = setTimeout(() => {
        if (state.currentQuestion < state.totalQuestions && !document.getElementById('btn-next').style.display || document.getElementById('btn-next').style.display === 'none') {
            updateRabbitReaction('bored');
        }
    }, 15000);
}

function updateTimerDisplay() {
    document.getElementById('timer-display').textContent = `⏱️ ${state.timer}s`;
}

// ===== UI UPDATES =====
function updateScore() {
    const badge = document.getElementById('score-badge');
    badge.textContent = `⭐ ${state.score} pts`;
    badge.classList.add('pop');
    setTimeout(() => badge.classList.remove('pop'), 300);
}

function updateLives() {
    const display = document.getElementById('lives-display');
    let hearts = '';
    for (let i = 0; i < 3; i++) hearts += i < state.lives ? '❤️' : '🖤';
    display.textContent = hearts;
}

function updateStreak() {
    document.getElementById('streak-display').textContent = `🔥 ${state.streak}`;
}

function updateProgress() {
    document.getElementById('progress-fill').style.width = `${(state.currentQuestion / state.totalQuestions) * 100}%`;
}

// ===== INSIGNIAS =====
function checkBadges() {
    if (state.score >= 2000 && !state.badges.financierPro) {
        state.badges.financierPro = true;
        playSound('achievement');
        setTimeout(() => alert('🏆 ¡Nueva insignia: Financiero Pro!'), 300);
        saveBadges();
    }
    if (state.streak >= 5 && !state.badges.streaker) {
        state.badges.streaker = true;
        playSound('achievement');
        setTimeout(() => alert('🔥 ¡Nueva insignia: Rachador!'), 300);
        saveBadges();
    }
    if (state.mode === 'timed' && (Date.now() - state.questionStartTime) < 3000 && !state.badges.speedDemon) {
        state.badges.speedDemon = true;
        playSound('achievement');
        setTimeout(() => alert('⚡ ¡Nueva insignia: Velocista!'), 300);
        saveBadges();
    }
}

function getBadgeIcon(badge) {
    const icons = { perfectScore: '💯', speedDemon: '⚡', survivor: '🛡️', streaker: '🔥', financierPro: '🏆', noPowerups: '💪' };
    return icons[badge] || '🏅';
}

function getBadgeName(badge) {
    const names = { perfectScore: 'Puntaje Perfecto', speedDemon: 'Velocista', survivor: 'Sobreviviente', streaker: 'Rachador', financierPro: 'Financiero Pro', noPowerups: 'Poder Natural' };
    return names[badge] || badge;
}

function loadBadges() {
    const saved = localStorage.getItem('conti_badges');
    if (saved) state.badges = { ...state.badges, ...JSON.parse(saved) };
    const grid = document.getElementById('badges-grid');
    if (!grid) return;
    grid.innerHTML = '';
    for (const [badge, unlocked] of Object.entries(state.badges)) {
        const el = document.createElement('div'); el.className = `badge-item ${unlocked ? 'unlocked' : ''}`;
        el.innerHTML = `<div class="badge-icon">${getBadgeIcon(badge)}</div><div class="badge-name">${getBadgeName(badge)}</div>`;
        grid.appendChild(el);
    }
}

function saveBadges() { localStorage.setItem('conti_badges', JSON.stringify(state.badges)); }

// ===== LEADERBOARD =====
function saveToLeaderboard() {
    const playerName = prompt('¡Buen trabajo! Ingresa tu nombre:', 'Jugador');
    if (!playerName) return;
    const leaderboard = JSON.parse(localStorage.getItem('conti_leaderboard') || '[]');
    leaderboard.push({ name: playerName, score: state.score, badges: Object.values(state.badges).filter(Boolean).length, date: new Date().toLocaleDateString() });
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem('conti_leaderboard', JSON.stringify(leaderboard.slice(0, 20)));
    loadLeaderboard();
}

function loadLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('conti_leaderboard') || '[]');
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
    const text = `🎉 ¡Acabo de conseguir ${state.score} puntos en Conti Conti Desafío Financiero! ¿Puedes superarme? 🏆`;
    if (navigator.share) navigator.share({ title: 'Conti Conti', text, url: window.location.href }).catch(() => {});
    else { navigator.clipboard.writeText(text).then(() => alert('📋 ¡Copiado! Compártelo.')); }
}

// ===== EFECTOS VISUALES =====
function launchConfetti() {
    if (typeof confetti !== 'function') return;
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#A2D2FF', '#B8E9C0', '#FEF9D7', '#EC4899', '#8B5CF6'] });
    setTimeout(() => confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0, y: 0.7 } }), 200);
    setTimeout(() => confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1, y: 0.7 } }), 400);
}

function triggerCoinRain() {
    const canvas = document.getElementById('effects-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    
    const badgeRect = document.getElementById('score-badge').getBoundingClientRect();
    const originX = badgeRect.left + badgeRect.width / 2;
    const originY = badgeRect.top;
    
    let particles = [];
    for (let i = 0; i < 20; i++) {
        particles.push({
            x: originX + (Math.random() - 0.5) * 80, y: originY,
            vx: (Math.random() - 0.5) * 6, vy: Math.random() * 4 + 2,
            size: Math.random() * 8 + 6, alpha: 1, gravity: 0.3,
            rotation: Math.random() * Math.PI * 2, rotSpeed: (Math.random() - 0.5) * 0.2
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let active = false;
        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy; p.vy += p.gravity; p.rotation += p.rotSpeed;
            if (p.y > canvas.height + 50) p.alpha -= 0.03;
            if (p.alpha > 0) {
                active = true;
                ctx.save(); ctx.globalAlpha = Math.max(0, p.alpha); ctx.translate(p.x, p.y); ctx.rotate(p.rotation);
                ctx.fillStyle = '#FFD700'; ctx.beginPath(); ctx.arc(0, 0, p.size, 0, Math.PI * 2); ctx.fill();
                ctx.strokeStyle = '#B8860B'; ctx.lineWidth = 2; ctx.stroke();
                ctx.fillStyle = '#B8860B'; ctx.font = `bold ${p.size * 0.8}px sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                ctx.fillText('$', 0, 1);
                ctx.restore();
            }
        });
        if (active) requestAnimationFrame(animate);
    }
    animate();
}

// ===== CANVAS =====
(function() {
    const canvas = document.getElementById('effects-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
})();
