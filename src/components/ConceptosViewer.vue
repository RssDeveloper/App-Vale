<template>
  <div class="space-y-6 sm:space-y-8 max-w-5xl mx-auto pb-12">
    <!-- Header Teórico NIF A-1 Adaptable -->
    <div class="bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-slate-800 dark:text-slate-100 shadow-xs space-y-4">
      <div class="flex items-center gap-2">
        <span class="px-2.5 py-1 bg-rose-100 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/60 rounded-full text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-rose-600 dark:text-rose-300 uppercase">
          NIF A-1 • Marco Teórico Conceptual
        </span>
      </div>
      <div>
        <h1 class="text-lg sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Conceptos y Reglas Contables Clave
        </h1>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Reglas del IVA, Esquemas de Mayor (Cuentas "T") y Cuentas Complementarias.
        </p>
      </div>
    </div>

    <!-- SECCIÓN CLAVE: LA REGLA DEL IVA (EL CORAZÓN DE ESTA PRÁCTICA) -->
    <div id="regla-iva" class="bg-white dark:bg-slate-900 border-2 border-rose-300 dark:border-rose-900/60 rounded-2xl sm:rounded-3xl p-5 sm:p-7 text-slate-800 dark:text-slate-100 shadow-sm space-y-5">
      <div class="space-y-1.5 border-b border-rose-100 dark:border-slate-800 pb-3.5">
        <div class="inline-flex items-center gap-2 px-2.5 py-1 bg-rose-100 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-800 rounded-full text-[10px] font-mono font-black uppercase text-rose-600 dark:text-rose-300">
          <span class="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
          <span>El Corazón de esta Práctica</span>
        </div>
        <h2 class="text-base sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
          La Regla del IVA que Hay que Entender
        </h2>
        <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
          Contabilidad e IVA corren en <strong>tiempos distintos</strong> (Devengación vs Flujo de Efectivo), y por eso se usan <strong>CUATRO cuentas de IVA</strong> en lugar de dos:
        </p>
      </div>

      <!-- Grid de las 4 Cuentas de IVA (Ventas vs Compras) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        
        <!-- Rama 1: Ventas (IVA Trasladado) -->
        <div class="p-4 bg-amber-50/40 dark:bg-slate-950/70 border border-amber-200/80 dark:border-amber-900/60 rounded-2xl space-y-3">
          <div class="flex items-center justify-between">
            <span class="font-black text-amber-800 dark:text-amber-300 text-xs sm:text-sm uppercase flex items-center gap-1.5">
              <span>🛒</span>
              <span>Ciclo de Ventas (Clientes)</span>
            </span>
            <span class="text-[10px] font-mono px-2 py-0.5 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold rounded-md">
              Pasivo • Acreedor
            </span>
          </div>

          <!-- Paso 1: Venta a Crédito -->
          <div class="p-3 bg-white dark:bg-slate-900 border border-amber-100 dark:border-amber-900/50 rounded-xl space-y-1">
            <div class="flex items-center justify-between">
              <span class="font-mono font-black text-amber-600 dark:text-amber-400">2103 IVA por Trasladar</span>
              <span class="text-[10px] bg-amber-50 dark:bg-slate-800 px-1.5 py-0.5 rounded font-bold text-amber-700">A Crédito</span>
            </div>
            <p class="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Cuando VENDES a crédito:</strong> El ingreso ya se ganó en contabilidad, pero el IVA aún no se causa ante el fisco. Se guarda en esta cuenta pendiente de cobro.
            </p>
          </div>

          <!-- Paso 2: Cobro Efectivo -->
          <div class="p-3 bg-white dark:bg-slate-900 border border-amber-100 dark:border-amber-900/50 rounded-xl space-y-1">
            <div class="flex items-center justify-between">
              <span class="font-mono font-black text-emerald-600 dark:text-emerald-400">2102 IVA Trasladado Cobrado</span>
              <span class="text-[10px] bg-emerald-50 dark:bg-slate-800 px-1.5 py-0.5 rounded font-bold text-emerald-700">Flujo Real</span>
            </div>
            <p class="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Cuando el cliente PAGA:</strong> Ese IVA se traspasa de la 2103 a la 2102. ¡Ahí ya cuenta legalmente para la declaración mensual ante el SAT!
            </p>
          </div>
        </div>

        <!-- Rama 2: Compras y Gastos (IVA Acreditable) -->
        <div class="p-4 bg-blue-50/40 dark:bg-slate-950/70 border border-blue-200/80 dark:border-blue-900/60 rounded-2xl space-y-3">
          <div class="flex items-center justify-between">
            <span class="font-black text-blue-800 dark:text-blue-300 text-xs sm:text-sm uppercase flex items-center gap-1.5">
              <span>📦</span>
              <span>Ciclo de Compras (Proveedores)</span>
            </span>
            <span class="text-[10px] font-mono px-2 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-bold rounded-md">
              Activo • Deudor
            </span>
          </div>

          <!-- Paso 1: Compra a Crédito -->
          <div class="p-3 bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900/50 rounded-xl space-y-1">
            <div class="flex items-center justify-between">
              <span class="font-mono font-black text-blue-600 dark:text-blue-400">1106 IVA por Acreditar</span>
              <span class="text-[10px] bg-blue-50 dark:bg-slate-800 px-1.5 py-0.5 rounded font-bold text-blue-700">A Crédito</span>
            </div>
            <p class="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Cuando COMPRAS a crédito:</strong> El gasto o activo ya existe en libros, pero el IVA no se puede acreditar aún porque no ha salido el dinero. Se guarda en 1106.
            </p>
          </div>

          <!-- Paso 2: Pago a Proveedor -->
          <div class="p-3 bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900/50 rounded-xl space-y-1">
            <div class="flex items-center justify-between">
              <span class="font-mono font-black text-indigo-600 dark:text-indigo-400">1105 IVA Acreditable Pagado</span>
              <span class="text-[10px] bg-indigo-50 dark:bg-slate-800 px-1.5 py-0.5 rounded font-bold text-indigo-700">Flujo Real</span>
            </div>
            <p class="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Cuando le PAGAS al proveedor:</strong> Ese IVA se traspasa de la 1106 a la 1105. ¡A partir de este momento ya se puede restar y acreditar formalmente!
            </p>
          </div>
        </div>

      </div>

      <!-- El Cierre de Mes (Mecánica de Liquidación) -->
      <div class="p-4 sm:p-5 bg-rose-50/50 dark:bg-slate-950 border border-rose-200 dark:border-slate-800 rounded-2xl space-y-3">
        <div class="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs sm:text-sm">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>Mecánica al Cierre del Mes: Enfrentamiento de Cuentas de Flujo</span>
        </div>

        <p class="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          Al cierre de cada mes se enfrentan <strong class="text-rose-600 dark:text-rose-400">solo las dos cuentas de flujo real</strong>: 
          <span class="font-mono font-bold bg-white dark:bg-slate-900 px-2 py-0.5 rounded border">2102 (Cobrado)</span> 
          menos 
          <span class="font-mono font-bold bg-white dark:bg-slate-900 px-2 py-0.5 rounded border">1105 (Pagado)</span>:
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <!-- IVA por pagar -->
          <div class="p-3 bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/60 rounded-xl space-y-1">
            <span class="font-black text-rose-600 dark:text-rose-400 block">Si 2102 > 1105 (Sobra IVA Cobrado):</span>
            <p class="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              Resulta <strong>IVA POR PAGAR</strong>. La empresa tiene la obligación de liquidar esa diferencia a favor del SAT en su declaración mensual.
            </p>
          </div>

          <!-- Saldo a favor -->
          <div class="p-3 bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/60 rounded-xl space-y-1">
            <span class="font-black text-emerald-600 dark:text-emerald-400 block">Si 1105 > 2102 (Sobra IVA Acreditable):</span>
            <p class="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              Resulta <strong>SALDO A FAVOR (IVA a Favor)</strong>. La empresa tiene derecho a compensarlo en meses futuros o solicitar su devolución.
            </p>
          </div>
        </div>

        <!-- Regla de oro de las cuentas pendientes -->
        <div class="p-2.5 bg-white/80 dark:bg-slate-900/80 rounded-xl border border-dashed border-rose-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-300 font-medium flex items-center gap-2">
          <span class="text-sm">📌</span>
          <span><strong>Regla Vital:</strong> Las cuentas <strong class="font-mono">2103</strong> y <strong class="font-mono">1106</strong> se quedan vivas en el Balance General, esperando que se efectúe su cobro o su pago correspondiente.</span>
        </div>
      </div>
    </div>

    <!-- Esquema de Mayor Interactivo (Cuenta "T") Adaptable -->
    <div class="bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 space-y-5 sm:space-y-6 shadow-xs">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-rose-100 dark:border-slate-800 pb-3 sm:pb-4">
        <div>
          <h3 class="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <svg class="w-5 h-5 text-rose-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
            <span>Esquema de Mayor (Cuenta "T")</span>
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Dinámica estructural de cargos, abonos y saldos.</p>
        </div>
      </div>

      <!-- Diagrama de la Cuenta T Responsivo sin difuminado -->
      <div class="w-full max-w-xl mx-auto border-2 border-rose-200 dark:border-slate-700 rounded-2xl overflow-hidden bg-rose-50/30 dark:bg-slate-950 shadow-sm">
        <div class="bg-rose-500 text-white text-center py-2 sm:py-2.5 font-mono font-bold text-xs uppercase tracking-wider">
          Nombre de la Cuenta
        </div>

        <div class="grid grid-cols-2 text-center text-[10px] sm:text-[11px] font-bold border-b border-rose-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-1.5 font-mono">
          <div class="text-blue-600 dark:text-blue-400 px-1">DEBE (Izquierda)</div>
          <div class="text-emerald-600 dark:text-emerald-400 px-1">HABER (Derecha)</div>
        </div>

        <div class="grid grid-cols-2 divide-x-2 divide-rose-200 dark:divide-slate-700 p-2.5 sm:p-4 min-h-[120px] text-xs bg-white dark:bg-slate-950">
          <!-- Lado Izquierdo (Debe) -->
          <div class="space-y-2 pr-1.5 sm:pr-3">
            <span class="inline-flex items-center gap-1 px-1.5 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-bold rounded-md text-[9px] sm:text-[10px]">
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
              CARGO
            </span>
            <p class="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 leading-tight">Cualquier anotación en la columna del DEBE.</p>
            <div class="pt-2 text-[9px] sm:text-[10px] font-mono font-semibold text-blue-600 dark:text-blue-400">
              Suma = Movimiento Deudor
            </div>
          </div>

          <!-- Lado Derecho (Haber) -->
          <div class="space-y-2 pl-1.5 sm:pl-3">
            <span class="inline-flex items-center gap-1 px-1.5 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold rounded-md text-[9px] sm:text-[10px]">
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              ABONO
            </span>
            <p class="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 leading-tight">Cualquier anotación en la columna del HABER.</p>
            <div class="pt-2 text-[9px] sm:text-[10px] font-mono font-semibold text-emerald-600 dark:text-emerald-400">
              Suma = Movimiento Acreedor
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 text-center text-[9px] sm:text-[10px] font-bold border-t-2 border-rose-200 dark:border-slate-700 bg-rose-50 dark:bg-slate-900 py-2 sm:py-2.5">
          <div class="text-blue-700 dark:text-blue-300 px-1 font-mono">SALDO DEUDOR (Mov. Deudor > Mov. Acreedor)</div>
          <div class="text-emerald-700 dark:text-emerald-300 px-1 font-mono">SALDO ACREEDOR (Mov. Acreedor > Mov. Deudor)</div>
        </div>
      </div>
    </div>

    <!-- Reglas de Aumento y Disminución Adaptables -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="p-4 sm:p-5 bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 rounded-2xl sm:rounded-3xl space-y-3">
        <h4 class="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider flex items-center gap-2">
          <svg class="w-4 h-4 text-blue-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          <span>¿Cuándo se Realiza un Cargo? (DEBE)</span>
        </h4>
        <div class="space-y-2 text-xs">
          <div class="p-3 bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900/50 rounded-xl text-slate-700 dark:text-slate-200 flex items-start gap-2">
            <span class="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">+</span>
            <span><strong>Aumento</strong> de cuentas de <strong>Activo, Costo o Gasto</strong> (Naturaleza Deudora).</span>
          </div>
          <div class="p-3 bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900/50 rounded-xl text-slate-700 dark:text-slate-200 flex items-start gap-2">
            <span class="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">-</span>
            <span><strong>Disminución</strong> de cuentas de <strong>Pasivo, Capital o Ingreso</strong> (Naturaleza Acreedora).</span>
          </div>
        </div>
      </div>

      <div class="p-4 sm:p-5 bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 rounded-2xl sm:rounded-3xl space-y-3">
        <h4 class="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-2">
          <svg class="w-4 h-4 text-emerald-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          <span>¿Cuándo se Realiza un Abono? (HABER)</span>
        </h4>
        <div class="space-y-2 text-xs">
          <div class="p-3 bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-900/50 rounded-xl text-slate-700 dark:text-slate-200 flex items-start gap-2">
            <span class="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">+</span>
            <span><strong>Aumento</strong> de cuentas de <strong>Pasivo, Capital o Ingreso</strong> (Naturaleza Acreedora).</span>
          </div>
          <div class="p-3 bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-900/50 rounded-xl text-slate-700 dark:text-slate-200 flex items-start gap-2">
            <span class="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">-</span>
            <span><strong>Disminución</strong> de cuentas de <strong>Activo, Costo o Gasto</strong> (Naturaleza Deudora).</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Cuentas Complementarias Adaptables -->
    <div class="p-4 sm:p-6 bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 rounded-2xl sm:rounded-3xl space-y-4 shadow-xs">
      <div class="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs sm:text-sm">
        <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        <span>Cuentas Complementarias o de Naturaleza Contraria</span>
      </div>
      <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        Son cuentas que tienen una naturaleza contraria a la del elemento al que pertenecen para regularizar o restar su valor contable:
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div class="p-3.5 sm:p-4 bg-rose-50/30 dark:bg-slate-950 border border-rose-100 dark:border-slate-800 rounded-2xl space-y-2">
          <span class="font-bold text-amber-700 dark:text-amber-300 block">En el ACTIVO (Naturaleza ACREEDORA):</span>
          <ul class="text-slate-600 dark:text-slate-400 space-y-1.5 text-[11px]">
            <li>• <strong>Depreciación acumulada</strong> (resta propiedades, planta y equipo).</li>
            <li>• <strong>Amortización acumulada</strong> (resta activos intangibles).</li>
            <li>• <strong>Estimación para cuentas incobrables</strong> (resta clientes).</li>
            <li>• <strong>Estimación de inventarios obsoletos</strong> (resta almacén).</li>
          </ul>
        </div>

        <div class="p-3.5 sm:p-4 bg-rose-50/30 dark:bg-slate-950 border border-rose-100 dark:border-slate-800 rounded-2xl space-y-2">
          <span class="font-bold text-amber-700 dark:text-amber-300 block">En el CAPITAL (Naturaleza DEUDORA):</span>
          <ul class="text-slate-600 dark:text-slate-400 space-y-1.5 text-[11px]">
            <li>• <strong>Capital suscrito no exhibido / Accionistas</strong> (resta capital social).</li>
            <li>• <strong>Pérdidas acumuladas o del ejercicio</strong> (disminuyen el capital ganado).</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
