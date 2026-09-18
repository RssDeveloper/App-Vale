import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

// Respaldo de datos base extraído de los 5 archivos Excel
const DEFAULT_SEED_DATA = [
  {
    id: 'doc-eri',
    title: 'Estado de Resultado Integral',
    short_code: 'ERI',
    nif_reference: 'NIF B-3',
    description: 'Muestra los ingresos, costos, gastos y el resultado integral del periodo.',
    sections: [
      {
        id: 'sec-eri-1',
        name: 'Ingresos y Costo de Ventas',
        nature: 'ingreso',
        order_index: 1,
        financial_items: [
          { id: 'item-eri-1', name: 'Ventas / Ingresos netos', operation_sign: '+', normal_balance: 'Acreedora', is_group_total: false, definition: 'Ingresos devengados por venta de bienes o prestación de servicios principales.' },
          { id: 'item-eri-2', name: 'Costo de ventas', operation_sign: '-', normal_balance: 'Deudora', is_group_total: false, definition: 'Costo directo atribuible a la producción o adquisición de mercancías vendidas.' },
          { id: 'item-eri-3', name: 'Utilidad bruta', operation_sign: '(=)', normal_balance: 'Acreedora', is_group_total: true, formula_expression: 'Ventas - Costo de ventas', definition: 'Margen de ganancia directo antes de gastos operativos.' }
        ]
      },
      {
        id: 'sec-eri-2',
        name: 'Gastos Generales y de Operación',
        nature: 'egreso',
        order_index: 2,
        financial_items: [
          { id: 'item-eri-4', name: 'Gastos de administración', operation_sign: '-', normal_balance: 'Deudora', is_group_total: false, definition: 'Sueldos administrativos, rentas de oficinas corporativas y suministros de gestión.' },
          { id: 'item-eri-5', name: 'Gastos de ventas', operation_sign: '-', normal_balance: 'Deudora', is_group_total: false, definition: 'Comisiones de ventas, publicidad, marketing y logística de entrega.' },
          { id: 'item-eri-6', name: 'Utilidad de operación', operation_sign: '(=)', normal_balance: 'Acreedora', is_group_total: true, formula_expression: 'Utilidad bruta - Gastos operativos', definition: 'Rendimiento derivado estrictamente de las actividades de explotación.' }
        ]
      },
      {
        id: 'sec-eri-3',
        name: 'Financiamiento, Impuestos y ORI',
        nature: 'resultado',
        order_index: 3,
        financial_items: [
          { id: 'item-eri-7', code: '90.1', abbreviation: 'RIF', name: 'Resultado Integral de Financiamiento', operation_sign: '(+/-)', normal_balance: 'Variable', is_group_total: false, definition: 'Intereses devengados a favor o a cargo, fluctuaciones cambiarias y valor razonable.' },
          { id: 'item-eri-8', name: 'Participación en los resultados de otras entidades', operation_sign: '(+/-)', normal_balance: 'Variable', is_group_total: false, definition: 'Participación en empresas asociadas y subsidiarias.' },
          { id: 'item-eri-9', name: 'Utilidad antes de impuestos a la utilidad', operation_sign: '(=)', normal_balance: 'Acreedora', is_group_total: true, formula_expression: 'Utilidad operación +/- RIF +/- Participación', definition: 'Base sobre la que se cuantifica el impuesto corporativo.' },
          { id: 'item-eri-10', name: 'Impuesto a la utilidad (ISR 30%)', operation_sign: '-', normal_balance: 'Deudora', is_group_total: false, formula_expression: 'Base gravable * 0.30', definition: 'Provisión del impuesto correspondiente al periodo fiscal.' },
          { id: 'item-eri-11', name: 'Utilidad de operaciones continuas', operation_sign: '(=)', normal_balance: 'Acreedora', is_group_total: true, formula_expression: 'Utilidad antes ISR - ISR 30%', definition: 'Rendimiento de los segmentos que continúan en operación.' },
          { id: 'item-eri-12', name: 'Operaciones discontinuadas (neto)', operation_sign: '(+/-)', normal_balance: 'Variable', is_group_total: false, definition: 'Resultados derivados de líneas de negocio interrumpidas o desincorporadas.' },
          { id: 'item-eri-13', name: 'Utilidad o pérdida neta', operation_sign: '(=)', normal_balance: 'Variable', is_group_total: true, formula_expression: 'Utilidad continuas +/- Operaciones discontinuadas', definition: 'Resultado neto atribuible a la entidad según NIF B-3.' },
          { id: 'item-eri-14', name: 'Otros Resultados Integrales (ORI)', operation_sign: '(+/-)', normal_balance: 'Variable', is_group_total: false, definition: 'Ganancias o pérdidas no realizadas: fluctuaciones cambiarias por conversión y coberturas.' },
          { id: 'item-eri-15', name: 'Resultado Integral', operation_sign: '(=)', normal_balance: 'Variable', is_group_total: true, formula_expression: 'Utilidad neta +/- ORI', definition: 'Incremento o decremento total en el patrimonio del periodo.' }
        ]
      }
    ]
  },
  {
    id: 'doc-esf',
    title: 'Estado de Situación Financiera',
    short_code: 'ESF',
    nif_reference: 'NIF B-6',
    description: 'Estructura patrimonial en formato de cuenta: Activo = Pasivo + Capital Contable.',
    sections: [
      {
        id: 'sec-esf-1',
        name: 'Activo Circulante (Corto Plazo)',
        nature: 'activo',
        order_index: 1,
        financial_items: [
          { id: 'item-esf-1', code: 'A.2', abbreviation: 'CB', name: 'Efectivo y equivalentes de efectivo', normal_balance: 'Deudora', definition: 'Recursos disponibles en caja, bancos e inversiones a la vista de alta liquidez.' },
          { id: 'item-esf-2', code: 'B.1', abbreviation: 'CLI', name: 'Clientes', normal_balance: 'Deudora', definition: 'Derechos de cobro exigibles originados por ventas de mercancías a crédito.' },
          { id: 'item-esf-3', code: 'B.2', abbreviation: 'DB', name: 'Deudores diversos', normal_balance: 'Deudora', definition: 'Cuentas por cobrar a terceros o empleados por conceptos distintos a la venta del giro.' },
          { id: 'item-esf-4', name: 'Documentos por cobrar', normal_balance: 'Deudora', definition: 'Títulos de crédito (pagarés o letras de cambio) a favor de la empresa a corto plazo.' },
          { id: 'item-esf-5', code: 'D.1', abbreviation: 'ISRF', name: 'Impuestos por recuperar (IVA / ISR a favor)', normal_balance: 'Deudora', definition: 'Saldos tributarios a favor sujetos a compensación o devolución.' },
          { id: 'item-esf-6', code: 'C', abbreviation: 'INV', name: 'Inventarios / Almacén', normal_balance: 'Deudora', definition: 'Mercancías destinadas a la venta o materias primas para producción.' },
          { id: 'item-esf-7', code: 'E', abbreviation: 'PA', name: 'Pagos anticipados', normal_balance: 'Deudora', definition: 'Servicios pagados por anticipado cuyos beneficios se devengarán a corto plazo.' }
        ]
      },
      {
        id: 'sec-esf-2',
        name: 'Activo No Circulante (Largo Plazo)',
        nature: 'activo',
        order_index: 2,
        financial_items: [
          { id: 'item-esf-8', name: 'Terrenos', normal_balance: 'Deudora', definition: 'Predios y terrenos propiedad de la entidad (no sujetos a depreciación).' },
          { id: 'item-esf-9', name: 'Edificios y construcciones', normal_balance: 'Deudora', definition: 'Inmuebles utilizados para las operaciones productivas o administrativas.' },
          { id: 'item-esf-10', name: 'Equipo de reparto y transporte', normal_balance: 'Deudora', definition: 'Vehículos destinados a la distribución y logística del negocio.' },
          { id: 'item-esf-11', name: 'Mobiliario y equipo de oficina', normal_balance: 'Deudora', definition: 'Muebles, equipo de cómputo y estaciones de trabajo de la entidad.' },
          { id: 'item-esf-12', code: 'V', abbreviation: 'PPED', name: 'Depreciación acumulada (Cuenta complementaria)', normal_balance: 'Acreedora', definition: 'Cuenta que reduce el valor contable en libros de los activos fijos tangibles.' },
          { id: 'item-esf-13', code: 'W.1', abbreviation: 'OAD', name: 'Activos intangibles (Software, Marcas, Organización)', normal_balance: 'Deudora', definition: 'Bienes incorpóreos controlados por la entidad que generan beneficios futuros.' },
          { id: 'item-esf-14', name: 'Inversiones permanentes en asociadas/subsidiarias', normal_balance: 'Deudora', definition: 'Participaciones en otras sociedades con intención de tenencia duradera.' }
        ]
      },
      {
        id: 'sec-esf-3',
        name: 'Pasivo Corto Plazo',
        nature: 'pasivo',
        order_index: 3,
        financial_items: [
          { id: 'item-esf-15', code: 'BB.1', abbreviation: 'PROV', name: 'Proveedores', normal_balance: 'Acreedora', definition: 'Obligaciones por adquisición de mercancías o materias primas a crédito.' },
          { id: 'item-esf-16', code: 'BB.2', abbreviation: 'OCxP', name: 'Acreedores diversos', normal_balance: 'Acreedora', definition: 'Deudas por compra de bienes o servicios distintos a los inventarios.' },
          { id: 'item-esf-17', code: 'BB.3', abbreviation: 'BAP', name: 'Sueldos y beneficios por pagar', normal_balance: 'Acreedora', definition: 'Remuneraciones devengadas pendientes de liquidar a los colaboradores.' },
          { id: 'item-esf-18', code: 'DD', abbreviation: 'ICAxP', name: 'Impuestos y cuotas por pagar (ISR, IVA, IMSS)', normal_balance: 'Acreedora', definition: 'Contribuciones fiscales y de seguridad social retenidas o causadas por enterar.' },
          { id: 'item-esf-19', code: 'EE', abbreviation: 'IxD', name: 'Cobros anticipados / Ingresos por devengar', normal_balance: 'Acreedora', definition: 'Cobros recibidos de clientes por servicios o bienes pendientes de entregar.' }
        ]
      },
      {
        id: 'sec-esf-4',
        name: 'Pasivo Largo Plazo',
        nature: 'pasivo',
        order_index: 4,
        financial_items: [
          { id: 'item-esf-20', code: 'HH', abbreviation: 'PBLP', name: 'Préstamos bancarios a largo plazo', normal_balance: 'Acreedora', definition: 'Obligaciones financieras con vencimiento mayor a 12 meses.' },
          { id: 'item-esf-21', code: 'LL', abbreviation: 'PLLP', name: 'Pasivo laboral y contingencias a largo plazo', normal_balance: 'Acreedora', definition: 'Provisiones actuariales por primas de antigüedad, pensiones o litigios.' }
        ]
      },
      {
        id: 'sec-esf-5',
        name: 'Capital Contable',
        nature: 'capital',
        order_index: 5,
        financial_items: [
          { id: 'item-esf-22', code: 'SS.1', abbreviation: 'CS', name: 'Capital social', normal_balance: 'Acreedora', definition: 'Aportaciones de socios formalizadas en escritura pública o estatutos.' },
          { id: 'item-esf-23', name: 'Aportaciones para futuros aumentos de capital', normal_balance: 'Acreedora', definition: 'Entregas dinerarias pendientes de protocolizar como aumento accionario.' },
          { id: 'item-esf-24', name: 'Prima en emisión de acciones', normal_balance: 'Acreedora', definition: 'Sobreprecio pagado por los accionistas sobre el valor nominal de las acciones.' },
          { id: 'item-esf-25', name: 'Capital suscrito no exhibido (Cuenta complementaria)', normal_balance: 'Deudora', definition: 'Compromiso de capital firmado por los socios pero aún pendiente de pago.' },
          { id: 'item-esf-26', code: 'SS.3', abbreviation: 'RA', name: 'Resultados acumulados de ejercicios anteriores', normal_balance: 'Acreedora', definition: 'Utilidades retenidas de ejercicios contables previos.' },
          { id: 'item-esf-27', code: 'SS.2', abbreviation: 'RES', name: 'Reserva legal y estatutaria', normal_balance: 'Acreedora', definition: 'Porcentaje de utilidades apartado obligatoriamente por ley para respaldo.' },
          { id: 'item-esf-28', name: 'Resultado del ejercicio presente', normal_balance: 'Variable', definition: 'Utilidad o pérdida neta generada en el ejercicio en curso.' }
        ]
      }
    ]
  },
  {
    id: 'doc-efe',
    title: 'Estado de Flujos de Efectivo',
    short_code: 'EFE',
    nif_reference: 'NIF B-2',
    description: 'Entradas y salidas de efectivo clasificadas en actividades de Operación, Inversión y Financiamiento.',
    sections: [
      {
        id: 'sec-efe-1',
        name: 'Actividades de Operación',
        nature: 'flujo',
        order_index: 1,
        financial_items: [
          { id: 'item-efe-1', name: 'Cobro a clientes por venta de bienes o servicios', operation_sign: '+', normal_balance: 'Deudora', definition: 'Principal fuente de ingresos operativos monetarios.' },
          { id: 'item-efe-2', name: 'Pago a proveedores de mercancías e insumos', operation_sign: '-', normal_balance: 'Acreedora', definition: 'Egresos destinados a la adquisición de existencias comerciales.' },
          { id: 'item-efe-3', name: 'Pago a empleados y gastos de operación', operation_sign: '-', normal_balance: 'Acreedora', definition: 'Liquidación de sueldos, rentas y servicios generales operativos.' },
          { id: 'item-efe-4', name: 'Pago de impuestos a la utilidad', operation_sign: '-', normal_balance: 'Acreedora', definition: 'Flujo canalizado al cumplimiento de obligaciones fiscales.' }
        ]
      },
      {
        id: 'sec-efe-2',
        name: 'Actividades de Inversión',
        nature: 'flujo',
        order_index: 2,
        financial_items: [
          { id: 'item-efe-5', name: 'Adquisición de propiedades, planta y equipo', operation_sign: '-', normal_balance: 'Acreedora', definition: 'Desembolsos canalizados a la compra de activos fijos productivos.' },
          { id: 'item-efe-6', name: 'Cobros por venta de propiedades, planta y equipo', operation_sign: '+', normal_balance: 'Deudora', definition: 'Recursos obtenidos por la desincorporación de activos tangibles.' },
          { id: 'item-efe-7', name: 'Intereses y dividendos cobrados por inversiones', operation_sign: '+', normal_balance: 'Deudora', definition: 'Rendimientos percibidos por instrumentos financieros o asociadas.' }
        ]
      },
      {
        id: 'sec-efe-3',
        name: 'Actividades de Financiamiento',
        nature: 'flujo',
        order_index: 3,
        financial_items: [
          { id: 'item-efe-8', name: 'Entrada por emisión o aportación de capital', operation_sign: '+', normal_balance: 'Deudora', definition: 'Recursos aportados en efectivo por los accionistas.' },
          { id: 'item-efe-9', name: 'Obtención de préstamos bancarios a largo plazo', operation_sign: '+', normal_balance: 'Deudora', definition: 'Créditos contratados con entidades financieras.' },
          { id: 'item-efe-10', name: 'Pagos de pasivos y amortización de créditos', operation_sign: '-', normal_balance: 'Acreedora', definition: 'Reembolso del capital principal adeudado a acreedores financieros.' },
          { id: 'item-efe-11', name: 'Pago de dividendos a los accionistas', operation_sign: '-', normal_balance: 'Acreedora', definition: 'Distribución de ganancias monetarias decretadas en asamblea.' }
        ]
      }
    ]
  },
  {
    id: 'doc-eccc',
    title: 'Estado de Cambios en el Capital Contable',
    short_code: 'ECCC',
    nif_reference: 'NIF B-4',
    description: 'Movimientos de propietarios, reservas y resultado integral que modifican el patrimonio.',
    sections: [
      {
        id: 'sec-eccc-1',
        name: 'Movimientos de Propietarios',
        nature: 'movimiento',
        order_index: 1,
        financial_items: [
          { id: 'item-eccc-1', name: 'Capital emitido / Aportaciones de socios', operation_sign: '+', normal_balance: 'Acreedora', definition: 'Incremento del capital contribuido derivado de aportaciones acordadas.' },
          { id: 'item-eccc-2', name: 'Reembolso o reducción de capital', operation_sign: '-', normal_balance: 'Deudora', definition: 'Devolución de recursos a los accionistas por retiro o amortización.' },
          { id: 'item-eccc-3', name: 'Dividendos decretados', operation_sign: '-', normal_balance: 'Deudora', definition: 'Utilidades asignadas para pago a propietarios que reducen utilidades acumuladas.' }
        ]
      },
      {
        id: 'sec-eccc-2',
        name: 'Movimientos de Reservas y Resultado Integral',
        nature: 'movimiento',
        order_index: 2,
        financial_items: [
          { id: 'item-eccc-4', name: 'Creación de reserva legal o de reinversión', operation_sign: '+', normal_balance: 'Acreedora', definition: 'Traspaso de utilidades acumuladas hacia rubros de reserva protegida.' },
          { id: 'item-eccc-5', name: 'Resultado integral del ejercicio', operation_sign: '(+/-)', normal_balance: 'Variable', definition: 'Incremento o decremento generado por las operaciones y ORI del periodo.' }
        ]
      }
    ]
  }
]

export const useAccountingStore = defineStore('accounting', () => {
  const cached = localStorage.getItem('cached_conta_data')
  const documents = ref(cached ? JSON.parse(cached) : DEFAULT_SEED_DATA)
  const loading = ref(false)
  const isOnline = ref(navigator.onLine)

  window.addEventListener('online', () => { isOnline.value = true })
  window.addEventListener('offline', () => { isOnline.value = false })

  async function fetchAll() {
    if (!isSupabaseConfigured || !supabase || !navigator.onLine) {
      if (!documents.value || documents.value.length === 0) {
        documents.value = DEFAULT_SEED_DATA
      }
      return
    }

    loading.value = true
    try {
      const { data, error } = await supabase
        .from('documents')
        .select(`
          id, title, short_code, nif_reference, description, icon, order_index,
          sections (
            id, name, nature, order_index,
            financial_items (
              id, code, abbreviation, name, operation_sign, normal_balance,
              is_group_total, formula_expression, definition, examples, order_index
            )
          )
        `)
        .order('order_index')

      if (!error && data && data.length > 0) {
        data.forEach(doc => {
          if (doc.sections) {
            doc.sections.sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
            doc.sections.forEach(sec => {
              if (sec.financial_items) {
                sec.financial_items.sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
              }
            })
          }
        })
        documents.value = data
        localStorage.setItem('cached_conta_data', JSON.stringify(data))
      } else if (!documents.value || documents.value.length === 0) {
        documents.value = DEFAULT_SEED_DATA
      }
    } catch (err) {
      console.warn('Conexión fallida con Supabase, usando catálogo local offline:', err)
      if (!documents.value || documents.value.length === 0) {
        documents.value = DEFAULT_SEED_DATA
      }
    } finally {
      loading.value = false
    }
  }

  async function upsertItem(itemData) {
    // Guardado offline local persistente
    const targetDoc = documents.value.find(d => d.sections?.some(s => s.id === itemData.section_id))
    if (targetDoc) {
      const sec = targetDoc.sections.find(s => s.id === itemData.section_id)
      if (sec) {
        if (itemData.id) {
          const idx = sec.financial_items.findIndex(i => i.id === itemData.id)
          if (idx !== -1) sec.financial_items[idx] = { ...itemData }
        } else {
          sec.financial_items.push({ ...itemData, id: 'local-' + Date.now() })
        }
        localStorage.setItem('cached_conta_data', JSON.stringify(documents.value))
      }
    }

    if (!isSupabaseConfigured || !supabase || !navigator.onLine) return

    try {
      if (itemData.id && !itemData.id.startsWith('local-') && !itemData.id.startsWith('item-')) {
        const { id, ...rest } = itemData
        await supabase.from('financial_items').update(rest).eq('id', id)
      } else {
        const { id, ...rest } = itemData
        await supabase.from('financial_items').insert(rest)
      }
      await fetchAll()
    } catch (e) {
      console.warn('Error al guardar en Supabase, aplicando localmente:', e)
    }
  }

  async function deleteItem(id) {
    // Borrado reactivo en estado local
    documents.value.forEach(doc => {
      doc.sections?.forEach(sec => {
        if (sec.financial_items) {
          sec.financial_items = sec.financial_items.filter(i => i.id !== id)
        }
      })
    })
    localStorage.setItem('cached_conta_data', JSON.stringify(documents.value))

    if (!isSupabaseConfigured || !supabase || !navigator.onLine) return

    if (!id.startsWith('local-') && !id.startsWith('item-')) {
      try {
        await supabase.from('financial_items').delete().eq('id', id)
      } catch (e) {
        console.warn('Error eliminando en Supabase:', e)
      }
    }
  }

  return {
    documents,
    loading,
    isOnline,
    fetchAll,
    upsertItem,
    deleteItem
  }
})
