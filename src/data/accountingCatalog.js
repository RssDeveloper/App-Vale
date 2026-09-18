// src/data/accountingCatalog.js
// Catálogo unificado oficial de cuentas contables, reglas de IVA y conceptos para búsqueda universal

export const ivaRulesData = [
  {
    id: 'iva-2103',
    code: '2103',
    name: '2103 IVA por Trasladar',
    title: '2103 IVA por Trasladar (Ventas a Crédito)',
    type: 'regla-iva',
    category: 'Regla del IVA • Pasivo',
    nature: 'Acreedora',
    natureShort: 'Acreedora',
    isDeudora: false,
    statement: 'Balance General',
    ruleCycle: 'Ciclo de Ventas (Clientes)',
    flowType: 'Devengado / A Crédito',
    badge: 'Pasivo • Crédito',
    description: 'Cuando VENDES a crédito: El ingreso ya se ganó contablemente, pero el IVA aún no se causa ante el SAT. Se guarda en 2103 como pasivo devengado pendiente de cobro.',
    keyRule: 'Al cobrar al cliente, se traspasa de 2103 (Cargo para cancelar) a 2102 (Abono para reflejar el flujo cobrado).'
  },
  {
    id: 'iva-2102',
    code: '2102',
    name: '2102 IVA Trasladado Cobrado',
    title: '2102 IVA Trasladado Cobrado (Flujo Real)',
    type: 'regla-iva',
    category: 'Regla del IVA • Pasivo',
    nature: 'Acreedora',
    natureShort: 'Acreedora',
    isDeudora: false,
    statement: 'Balance General',
    ruleCycle: 'Ciclo de Ventas (Clientes)',
    flowType: 'Flujo de Efectivo Real',
    badge: 'Pasivo • Cobrado',
    description: 'Cuando el cliente PAGA: El IVA se traspasa a esta cuenta. ¡Aquí ya cuenta legalmente para la determinación y declaración mensual ante el SAT!',
    keyRule: 'Esta cuenta entra al enfrentamiento de cierre mensual contra la 1105 para determinar si se paga o queda saldo a favor.'
  },
  {
    id: 'iva-1106',
    code: '1106',
    name: '1106 IVA por Acreditar',
    title: '1106 IVA por Acreditar (Compras a Crédito)',
    type: 'regla-iva',
    category: 'Regla del IVA • Activo',
    nature: 'Deudora',
    natureShort: 'Deudora',
    isDeudora: true,
    statement: 'Balance General',
    ruleCycle: 'Ciclo de Compras (Proveedores)',
    flowType: 'Devengado / A Crédito',
    badge: 'Activo • Crédito',
    description: 'Cuando COMPRAS a crédito: El gasto o activo ya existe en libros, pero el IVA no se puede acreditar ante el SAT porque no ha salido el dinero. Se guarda en 1106.',
    keyRule: 'Al pagar al proveedor, se traspasa de 1106 (Abono para cancelar) a 1105 (Cargo para reflejar el IVA efectivamente pagado).'
  },
  {
    id: 'iva-1105',
    code: '1105',
    name: '1105 IVA Acreditable Pagado',
    title: '1105 IVA Acreditable Pagado (Flujo Real)',
    type: 'regla-iva',
    category: 'Regla del IVA • Activo',
    nature: 'Deudora',
    natureShort: 'Deudora',
    isDeudora: true,
    statement: 'Balance General',
    ruleCycle: 'Ciclo de Compras (Proveedores)',
    flowType: 'Flujo de Efectivo Real',
    badge: 'Activo • Pagado',
    description: 'Cuando le PAGAS al proveedor: El IVA se traspasa a esta cuenta. A partir de este momento es efectivamente deducible y acreditable ante el fisco.',
    keyRule: 'Esta cuenta entra al enfrentamiento de cierre mensual contra la 2102. Si supera a la 2102, genera Saldo a Favor.'
  },
  {
    id: 'iva-cierre',
    code: 'CIERRE-IVA',
    name: 'Mecánica de Cierre de Mes del IVA (2102 vs 1105)',
    title: 'Cierre de Mes: 2102 Cobrado menos 1105 Pagado',
    type: 'regla-iva',
    category: 'Regla del IVA • Cierre Mensual',
    nature: 'Determinación',
    natureShort: 'Liquidación',
    isDeudora: false,
    statement: 'Balance General / Declaración',
    ruleCycle: 'Determinación Mensual SAT',
    flowType: 'Liquidación de Cuentas de Flujo',
    badge: 'Cierre SAT',
    description: 'Al fin de mes solo se enfrentan las cuentas de flujo real: 2102 (Cobrado) menos 1105 (Pagado). Si 2102 > 1105 resulta IVA POR PAGAR. Si 1105 > 2102 resulta SALDO A FAVOR (IVA a favor).',
    keyRule: '¡Regla de Oro! Las cuentas 2103 y 1106 se quedan vivas en el balance general esperando su cobro o pago posterior.'
  }
]

export const rawDiccionarioAccounts = [
  // ACTIVO (Balance General)
  {
    name: 'Caja',
    statement: 'Balance General',
    category: 'Activo',
    isDeudora: true,
    definition: 'Dinero en efectivo y monedas de inmediata disponibilidad bajo custodia directa de la empresa.',
    aliases: ['efectivo', 'monedas', 'fondo fijo', 'caja chica']
  },
  {
    name: 'Bancos',
    statement: 'Balance General',
    category: 'Activo',
    isDeudora: true,
    definition: 'Efectivo depositado en instituciones bancarias en cuentas de cheques e instrumentos a la vista.',
    aliases: ['cuentas bancarias', 'transferencias', 'cheques', 'inversiones a la vista']
  },
  {
    name: 'Clientes',
    statement: 'Balance General',
    category: 'Activo',
    isDeudora: true,
    definition: 'Derechos de cobro exigibles a favor de la empresa por la venta de mercancías o servicios a crédito.',
    aliases: ['cuentas por cobrar clientes', 'facturas por cobrar']
  },
  {
    name: 'Almacén (inventarios o mercancías)',
    statement: 'Balance General',
    category: 'Activo',
    isDeudora: true,
    definition: 'Bienes adquiridos o producidos destinados para su venta en el curso ordinario del negocio o materias primas.',
    aliases: ['inventario', 'mercancias', 'almacen', 'stock']
  },
  {
    name: 'Deudores (empleados, accionistas)',
    statement: 'Balance General',
    category: 'Activo',
    isDeudora: true,
    definition: 'Derechos de cobro a personas distintas a clientes (préstamos a empleados, anticipos a socios o accionistas).',
    aliases: ['deudores diversos', 'prestamos empleados', 'deudores']
  },
  {
    name: 'Impuestos a favor',
    statement: 'Balance General',
    category: 'Activo',
    isDeudora: true,
    definition: 'Saldos tributarios a favor de la empresa sujetos a compensación contra otros impuestos o devolución por parte del SAT.',
    aliases: ['saldos a favor', 'isr a favor']
  },
  {
    name: 'IVA a favor',
    statement: 'Balance General',
    category: 'Activo',
    isDeudora: true,
    definition: 'Excedente resultante en el cierre mensual cuando el IVA acreditable (1105) pagado supera al IVA trasladado (2102) cobrado.',
    aliases: ['saldo a favor iva', 'remanente iva acreditable']
  },
  {
    name: '1105 IVA Acreditable Pagado',
    code: '1105',
    statement: 'Balance General',
    category: 'Activo',
    isDeudora: true,
    definition: 'IVA efectivamente pagado en adquisiciones de mercancías, activos y gastos deducibles. Se cancela al cierre contra 2102.',
    aliases: ['iva acreditable', 'iva efectivamente pagado', 'iva compras contado', '1105']
  },
  {
    name: '1106 IVA por Acreditar',
    code: '1106',
    statement: 'Balance General',
    category: 'Activo',
    isDeudora: true,
    definition: 'IVA devengado en compras y gastos a crédito. Pendiente de pago. Al liquidar al proveedor se traspasa a la 1105.',
    aliases: ['iva pendiente de acreditar', 'iva compras credito', '1106', 'iva por pagar proveedor']
  },
  {
    name: 'Pagos anticipados',
    statement: 'Balance General',
    category: 'Activo',
    isDeudora: true,
    definition: 'Servicios contratados pendientes de devengar (pólizas de seguros adelantadas, rentas pagadas por anticipado).',
    aliases: ['seguros pagados por anticipado', 'rentas pagadas por anticipado', 'anticipos']
  },
  {
    name: 'Depósitos en garantía',
    statement: 'Balance General',
    category: 'Activo',
    isDeudora: true,
    definition: 'Fondos monetarios entregados a terceros en caución para garantizar el cumplimiento de contratos (arrendamiento, servicios).',
    aliases: ['garantias', 'fianzas en deposito']
  },
  {
    name: 'Maquinaria',
    statement: 'Balance General',
    category: 'Activo',
    isDeudora: true,
    definition: 'Conjunto de equipos técnicos, motores e instalaciones industriales empleadas directamente en procesos de transformación.',
    aliases: ['maquinaria y equipo', 'equipo de fabrica']
  },
  {
    name: 'Mobiliario',
    statement: 'Balance General',
    category: 'Activo',
    isDeudora: true,
    definition: 'Muebles, escritorios, sillas, estantes y enseres corporativos destinados al uso administrativo y comercial.',
    aliases: ['mobiliario y equipo de oficina', 'muebles']
  },
  {
    name: 'Terrenos',
    statement: 'Balance General',
    category: 'Activo',
    isDeudora: true,
    definition: 'Predios y terrenos propiedad de la entidad. Característica contable: no están sujetos a depreciación ordinaria.',
    aliases: ['predios', 'lotes', 'propiedades']
  },
  {
    name: 'Activos por arrendamiento',
    statement: 'Balance General',
    category: 'Activo',
    isDeudora: true,
    definition: 'Derecho de uso de un activo subyacente durante el plazo convenido conforme a la NIF D-5 Arrendamientos.',
    aliases: ['derecho de uso', 'arrendamiento financiero']
  },
  {
    name: 'Inversiones permanentes',
    statement: 'Balance General',
    category: 'Activo',
    isDeudora: true,
    definition: 'Participaciones en el capital de otras empresas con la intención de mantener la titularidad a largo plazo o ejercer influencia.',
    aliases: ['acciones en asociadas', 'inversiones a largo plazo']
  },

  // PASIVO (Balance General)
  {
    name: 'Préstamos bancarios',
    statement: 'Balance General',
    category: 'Pasivo',
    isDeudora: false,
    definition: 'Créditos y financiamientos contraídos con instituciones bancarias exigibles a corto o largo plazo.',
    aliases: ['creditos bancarios', 'pagares bancarios']
  },
  {
    name: 'Proveedores',
    statement: 'Balance General',
    category: 'Pasivo',
    isDeudora: false,
    definition: 'Obligaciones comerciales contraídas por la compra de materias primas o mercancías a crédito destinadas al giro comercial.',
    aliases: ['cuentas por pagar proveedores', 'facturas por pagar']
  },
  {
    name: 'Acreedores',
    statement: 'Balance General',
    category: 'Pasivo',
    isDeudora: false,
    definition: 'Obligaciones de pago presentes a favor de personas físicas o morales por conceptos diferentes a la compra de mercancías.',
    aliases: ['acreedores diversos', 'cuentas por pagar varias']
  },
  {
    name: '2102 IVA Trasladado Cobrado',
    code: '2102',
    statement: 'Balance General',
    category: 'Pasivo',
    isDeudora: false,
    definition: 'IVA efectivamente cobrado a clientes en ventas de contado o cobro de facturas a crédito. Es la base legal del cobro mensual SAT.',
    aliases: ['iva trasladado', 'iva cobrado', 'iva ventas contado', '2102']
  },
  {
    name: '2103 IVA por Trasladar',
    code: '2103',
    statement: 'Balance General',
    category: 'Pasivo',
    isDeudora: false,
    definition: 'IVA devengado en ventas a crédito aún no cobradas al cliente. Al momento del cobro se cancela traspasándose a 2102.',
    aliases: ['iva pendiente de trasladar', 'iva ventas credito', '2103']
  },
  {
    name: 'IVA por pagar',
    statement: 'Balance General',
    category: 'Pasivo',
    isDeudora: false,
    definition: 'Adeudo neto resultante al cierre de mes cuando el IVA cobrado (2102) supera al IVA acreditable pagado (1105). Debe enterarse al SAT.',
    aliases: ['adeudo iva', 'iva a cargo', 'impuesto por pagar']
  },
  {
    name: 'Impuestos sobre nómina',
    statement: 'Balance General',
    category: 'Pasivo',
    isDeudora: false,
    definition: 'Gravamen estatal causado sobre los salarios pagados al personal laboral de la empresa pendiente de liquidar.',
    aliases: ['isn', 'impuesto 3 sobre nomina']
  },
  {
    name: 'IMSS por pagar',
    statement: 'Balance General',
    category: 'Pasivo',
    isDeudora: false,
    definition: 'Cuotas de seguridad social obrero-patronales retenidas y causadas pendientes de liquidar ante el instituto.',
    aliases: ['seguro social', 'cuotas imss', 'imss']
  },
  {
    name: 'INFONAVIT por pagar',
    statement: 'Balance General',
    category: 'Pasivo',
    isDeudora: false,
    definition: 'Aportaciones patronales del 5% y amortizaciones de créditos de vivienda retenidas al personal pendientes de pago bimestral.',
    aliases: ['infonavit', 'vivienda trabajadores']
  },
  {
    name: 'Retenciones de ISR',
    statement: 'Balance General',
    category: 'Pasivo',
    isDeudora: false,
    definition: 'Impuesto Sobre la Renta retenido a trabajadores por sueldos o a profesionales/arrendadores pendiente de transferir al SAT.',
    aliases: ['isr retenido', 'retenciones sueldos', 'retenciones honorarios']
  },
  {
    name: 'PTU por pagar',
    statement: 'Balance General',
    category: 'Pasivo',
    isDeudora: false,
    definition: 'Participación de los Trabajadores en las Utilidades decretada conforme a ley pendiente de dispersión.',
    aliases: ['reparto de utilidades', 'ptu']
  },
  {
    name: 'Sueldos por pagar',
    statement: 'Balance General',
    category: 'Pasivo',
    isDeudora: false,
    definition: 'Remuneraciones y salarios devengados correspondientes a periodos laborados aún no dispersados a los empleados.',
    aliases: ['nomina por pagar', 'salarios pendientes']
  },
  {
    name: 'Hipotecas por pagar',
    statement: 'Balance General',
    category: 'Pasivo',
    isDeudora: false,
    definition: 'Deudas y contratos crediticios a largo plazo garantizados con hipoteca sobre bienes inmuebles de la empresa.',
    aliases: ['credito hipotecario', 'prestamos hipotecarios']
  },
  {
    name: 'Pasivos por arrendamiento',
    statement: 'Balance General',
    category: 'Pasivo',
    isDeudora: false,
    definition: 'Valor presente de los pagos futuros comprometidos conforme al contrato de arrendamiento (NIF D-5).',
    aliases: ['arrendamiento por pagar', 'obligacion por arrendamiento']
  },
  {
    name: 'Dividendos por pagar',
    statement: 'Balance General',
    category: 'Pasivo',
    isDeudora: false,
    definition: 'Utilidades netas decretadas en asamblea ordinaria de accionistas pendientes de liquidar a los socios.',
    aliases: ['dividendos decretados', 'utilidades a socios']
  },

  // CAPITAL CONTABLE (Balance General)
  {
    name: 'Capital social',
    statement: 'Balance General',
    category: 'Capital',
    isDeudora: false,
    definition: 'Aportaciones formalmente protocolizadas efectuadas por los socios o accionistas de la empresa.',
    aliases: ['capital aportado', 'patrimonio social']
  },
  {
    name: 'Capital suscrito',
    statement: 'Balance General',
    category: 'Capital',
    isDeudora: false,
    definition: 'Importe de las acciones representativas del capital que los socios se han comprometido formalmente a aportar.',
    aliases: ['capital comprometido']
  },
  {
    name: 'Capital no exhibido',
    statement: 'Balance General',
    category: 'Capital',
    isDeudora: false,
    definition: 'Porción del capital social formalmente suscrito por los socios que aún está pendiente de pago o exhibición monetaria.',
    aliases: ['capital pendiente de pago', 'acciones no exhibidas']
  },
  {
    name: 'Prima en acciones',
    statement: 'Balance General',
    category: 'Capital',
    isDeudora: false,
    definition: 'Sobreprecio pagado por los accionistas por encima del valor nominal de las acciones emitidas.',
    aliases: ['prima en emision de acciones']
  },
  {
    name: 'Aportaciones para futuros aumentos',
    statement: 'Balance General',
    category: 'Capital',
    isDeudora: false,
    definition: 'Fondos monetarios entregados por los socios para ser formalizados posteriormente en asamblea como aumento de capital.',
    aliases: ['afac', 'futuros aumentos de capital']
  },
  {
    name: 'Resultados de ejercicios anteriores',
    statement: 'Balance General',
    category: 'Capital',
    isDeudora: false,
    definition: 'Suma histórica de utilidades retenidas o pérdidas acumuladas generadas por la entidad en ejercicios pasados.',
    aliases: ['utilidades acumuladas', 'perdidas acumuladas', 'ejercicios anteriores']
  },
  {
    name: 'Resultado del ejercicio',
    statement: 'Balance General',
    category: 'Capital',
    isDeudora: false,
    definition: 'Utilidad o pérdida neta resultante de las operaciones y actividades de la empresa durante el periodo anual corriente.',
    aliases: ['utilidad del ejercicio', 'perdida del ejercicio', 'resultado neto']
  },
  {
    name: 'Reserva legal',
    statement: 'Balance General',
    category: 'Capital',
    isDeudora: false,
    definition: 'Fondo patrimonial obligatorio por la LGSM (mínimo 5% de las utilidades anuales hasta el 20% del capital social).',
    aliases: ['reserva de ley', 'fondo de reserva']
  },
  {
    name: 'Reservas de reinversión',
    statement: 'Balance General',
    category: 'Capital',
    isDeudora: false,
    definition: 'Fondos especiales retenidos de las utilidades para financiar proyectos de expansión, infraestructura o contingencias.',
    aliases: ['reserva voluntaria', 'reserva estatutaria']
  },
  {
    name: 'Utilidades',
    statement: 'Balance General',
    category: 'Capital',
    isDeudora: false,
    definition: 'Ganancias e incrementos patrimoniales generados al superar los ingresos a los costos y gastos totales.',
    aliases: ['ganancias', 'beneficios']
  },
  {
    name: 'Pérdidas',
    statement: 'Balance General',
    category: 'Capital',
    isDeudora: false,
    definition: 'Disminución neta en el patrimonio ocurrida cuando los costos y gastos del periodo son superiores a los ingresos logrados.',
    aliases: ['deficit', 'quebranto']
  },

  // ESTADO DE RESULTADOS (Ingresos / Costos / Gastos)
  {
    name: 'Ingresos por servicios',
    statement: 'Estado de Resultados',
    category: 'Ventas / Ingresos',
    isDeudora: false,
    definition: 'Recursos monetarios devengados por la prestación ordinaria de servicios profesionales o comerciales a clientes.',
    aliases: ['ventas servicios', 'honorarios cobrados']
  },
  {
    name: 'Ingresos por rentas',
    statement: 'Estado de Resultados',
    category: 'Ventas / Ingresos',
    isDeudora: false,
    definition: 'Rendimientos económicos derivados de dar en arrendamiento bienes muebles o inmuebles propiedad de la entidad.',
    aliases: ['rentas cobradas', 'arrendamientos cobrados']
  },
  {
    name: 'Otros ingresos',
    statement: 'Estado de Resultados',
    category: 'Ventas / Ingresos',
    isDeudora: false,
    definition: 'Beneficios y ganancias monetarias extraordinarias generadas por actividades secundarias ajenas al giro principal.',
    aliases: ['otros productos', 'ingresos no operativos']
  },
  {
    name: 'Venta de mobiliario y equipo',
    statement: 'Estado de Resultados',
    category: 'Ventas / Ingresos',
    isDeudora: false,
    definition: 'Ingresos generados por la venta o enajenación ocasional de activos fijos en desuso.',
    aliases: ['venta activo fijo', 'ganancia en venta de activo']
  },
  {
    name: 'Devoluciones sobre venta',
    statement: 'Estado de Resultados',
    category: 'Ventas / Ingresos',
    isDeudora: true,
    definition: 'Reingreso de mercancías vendidas devueltas físicamente por clientes por defectos, errores o convenios.',
    aliases: ['devoluciones clientes', 'mercancia devuelta']
  },
  {
    name: 'Bonificaciones sobre venta',
    statement: 'Estado de Resultados',
    category: 'Ventas / Ingresos',
    isDeudora: true,
    definition: 'Rebajas, descuentos o bonificaciones monetarias concedidas a clientes sobre precios de venta acordados.',
    aliases: ['descuentos sobre venta', 'rebajas sobre venta']
  },
  {
    name: 'Costo de ventas',
    statement: 'Estado de Resultados',
    category: 'Costos',
    isDeudora: true,
    definition: 'Costo histórico de adquisición o fabricación de las mercancías o servicios efectivamente vendidos en el ejercicio.',
    aliases: ['costo de lo vendido', 'costo mercancias']
  },
  {
    name: 'Mano de obra directa',
    statement: 'Estado de Resultados',
    category: 'Costos',
    isDeudora: true,
    definition: 'Salarios, prestaciones y cargas sociales del personal involucrado directamente en la manufactura o transformación del producto.',
    aliases: ['salarios produccion', 'mano de obra fabril']
  },
  {
    name: 'Costos directos',
    statement: 'Estado de Resultados',
    category: 'Costos',
    isDeudora: true,
    definition: 'Insumos, materiales y recursos directamente asignables e identificables con cada unidad de producto fabricada.',
    aliases: ['materia prima directa', 'costos de transformacion']
  },
  {
    name: 'Gastos de administración',
    statement: 'Estado de Resultados',
    category: 'Gastos',
    isDeudora: true,
    definition: 'Erogaciones destinadas al funcionamiento del área directiva, ejecutiva, contable, legal y de recursos humanos.',
    aliases: ['gastos administrativos', 'sueldos administracion', 'oficinas generales']
  },
  {
    name: 'Gastos de ventas',
    statement: 'Estado de Resultados',
    category: 'Gastos',
    isDeudora: true,
    definition: 'Desembolsos incurridos para promover, distribuir, publicitar y concretar la comercialización de bienes y servicios.',
    aliases: ['publicidad', 'comisiones sobre ventas', 'fletes de entrega']
  },
  {
    name: 'Gastos generales',
    statement: 'Estado de Resultados',
    category: 'Gastos',
    isDeudora: true,
    definition: 'Gastos recurrentes indispensables para la operación común como servicios públicos (luz, agua, internet, telefonía) y papelería.',
    aliases: ['servicios', 'luz', 'agua', 'internet', 'papeleria']
  }
]

export const theoreticalConcepts = [
  {
    id: 't-account',
    name: 'Esquema de Mayor (Cuenta "T")',
    title: 'Esquema de Mayor (Cuenta "T")',
    type: 'concepto-teoria',
    category: 'Teoría Contable',
    nature: 'Mecánica de Registro',
    statement: 'Registro en Libros',
    description: 'Representación gráfica en forma de T con dos columnas: DEBE (lado izquierdo, cargos) y HABER (lado derecho, abonos). La suma del Debe es el Movimiento Deudor y la del Haber es el Movimiento Acreedor.',
    keyRule: 'Cuentas de Activo y Gastos aumentan cargando (Debe). Cuentas de Pasivo, Capital e Ingresos aumentan abonando (Haber).'
  },
  {
    id: 'partida-doble',
    name: 'Principio de la Partida Doble',
    title: 'Partida Doble: A todo cargo corresponde un abono',
    type: 'concepto-teoria',
    category: 'Teoría Contable',
    nature: 'Postulado Básico',
    statement: 'Ecuación Contable',
    description: 'Fundamento de la contabilidad moderna: Toda transacción económica tiene un efecto dual. La suma de los cargos debe ser exactamente igual a la suma de los abonos (Activo = Pasivo + Capital).',
    keyRule: 'A todo cargo corresponde uno o más abonos de igual cuantía.'
  },
  {
    id: 'devengacion',
    name: 'Postulado de Devengación Contable',
    title: 'Devengación Contable vs Flujo de Efectivo',
    type: 'concepto-teoria',
    category: 'Teoría Contable',
    nature: 'NIF A-2',
    statement: 'Postulados Básicos NIF',
    description: 'Los efectos derivados de las transacciones que lleva a cabo una entidad deben reconocerse contablemente en su totalidad en el momento en el que ocurren, independientemente de la fecha en que se cobren o paguen.',
    keyRule: 'Es la razón por la que existen cuentas devengadas (1106, 2103) y cuentas de flujo pagado/cobrado (1105, 2102).'
  }
]

// Lista procesada de todas las cuentas con todas sus propiedades formateadas
export const allDiccionarioAccounts = rawDiccionarioAccounts.map((acc, index) => ({
  id: `acc-${index + 1}`,
  ...acc,
  natureShort: acc.isDeudora ? 'Deudora' : 'Acreedora',
  type: 'cuenta-diccionario'
}))
