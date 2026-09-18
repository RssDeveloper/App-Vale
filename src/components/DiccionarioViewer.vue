<template>
  <div class="contabilidad-container space-y-4 sm:space-y-6 max-w-4xl mx-auto font-sans animate-slide-up">
    
    <!-- Header Limpio y Buscador Compacto -->
    <div class="bg-white dark:bg-slate-900 border border-rose-100/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xs space-y-3.5">
      <div class="flex items-center justify-between gap-3">
        <div>
          <h1 class="text-lg sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Diccionario Contable
          </h1>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Cuentas, naturalezas y reglas de aumento (+) y disminución (-).
          </p>
        </div>
        <span class="px-2.5 py-1 bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 text-[11px] font-mono font-bold rounded-xl border border-rose-100 dark:border-rose-900/40 shrink-0">
          54 cuentas
        </span>
      </div>
    </div>

    <!-- PESTAÑAS SEGMENTADAS SUPERIORES (BALANCE / RESULTADOS / REGLAS) -->
    <div class="space-y-4">
      
      <!-- Segmented Control Principal -->
      <div class="grid grid-cols-3 gap-1 bg-slate-200/70 dark:bg-slate-800/80 p-1 rounded-2xl text-xs font-bold select-none">
        <button 
          @click="mainSection = 'balance'"
          :class="mainSection === 'balance' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'"
          class="py-2 rounded-xl transition text-center truncate px-1 active:scale-95"
        >
          Balance (42)
        </button>
        <button 
          @click="mainSection = 'resultados'"
          :class="mainSection === 'resultados' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'"
          class="py-2 rounded-xl transition text-center truncate px-1 active:scale-95"
        >
          Resultados (12)
        </button>
        <button 
          @click="mainSection = 'reglas'"
          :class="mainSection === 'reglas' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'"
          class="py-2 rounded-xl transition text-center truncate px-1 active:scale-95"
        >
          Reglas +/-
        </button>
      </div>

      <!-- SECCIÓN A: BALANCE GENERAL -->
      <section v-if="mainSection === 'balance'" class="seccion-contable space-y-3.5">
        
        <!-- Píldoras de Categoría (Activo / Pasivo / Capital / Todo) -->
        <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs font-bold select-none">
          <button 
            @click="balanceTab = 'activo'"
            :class="balanceTab === 'activo' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800'"
            class="px-3.5 py-1.5 rounded-xl whitespace-nowrap transition active:scale-95 flex items-center gap-1.5"
          >
            <span class="w-1.5 h-1.5 rounded-full" :class="balanceTab === 'activo' ? 'bg-white' : 'bg-blue-500'"></span>
            <span>Activo ({{ balanceGeneral.activo.length }})</span>
          </button>

          <button 
            @click="balanceTab = 'pasivo'"
            :class="balanceTab === 'pasivo' ? 'bg-amber-600 text-white shadow-xs' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800'"
            class="px-3.5 py-1.5 rounded-xl whitespace-nowrap transition active:scale-95 flex items-center gap-1.5"
          >
            <span class="w-1.5 h-1.5 rounded-full" :class="balanceTab === 'pasivo' ? 'bg-white' : 'bg-amber-500'"></span>
            <span>Pasivo ({{ balanceGeneral.pasivo.length }})</span>
          </button>

          <button 
            @click="balanceTab = 'capital'"
            :class="balanceTab === 'capital' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800'"
            class="px-3.5 py-1.5 rounded-xl whitespace-nowrap transition active:scale-95 flex items-center gap-1.5"
          >
            <span class="w-1.5 h-1.5 rounded-full" :class="balanceTab === 'capital' ? 'bg-white' : 'bg-emerald-500'"></span>
            <span>Capital ({{ balanceGeneral.capital.length }})</span>
          </button>

          <button 
            @click="balanceTab = 'todos'"
            :class="balanceTab === 'todos' ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900 shadow-xs' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800'"
            class="px-3 py-1.5 rounded-xl whitespace-nowrap transition active:scale-95"
          >
            Ver Todo (42)
          </button>
        </div>

        <!-- Banner de Naturaleza Dinámico -->
        <div 
          v-if="balanceTab !== 'todos'" 
          class="p-3 rounded-2xl text-xs font-bold flex items-center justify-between border select-none"
          :class="{
            'bg-blue-50/70 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border-blue-200/80 dark:border-blue-900/60': balanceTab === 'activo',
            'bg-amber-50/70 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200/80 dark:border-amber-900/60': balanceTab === 'pasivo',
            'bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-900/60': balanceTab === 'capital'
          }"
        >
          <div class="flex items-center gap-1.5">
            <span class="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-white/80 dark:bg-slate-900/80 uppercase">
              {{ balanceTab === 'activo' ? 'Deudor' : 'Acreedor' }}
            </span>
            <span>{{ balanceTab === 'activo' ? 'Cargo (+) Aumenta' : 'Cargo (-) Disminuye' }}</span>
          </div>
          <span>{{ balanceTab === 'activo' ? 'Abono (-) Disminuye' : 'Abono (+) Aumenta' }}</span>
        </div>

        <!-- Lista Limpia de Cuentas (Modo Pestaña o Todo) -->
        <div class="bg-white dark:bg-slate-900 border border-rose-100/80 dark:border-slate-800 rounded-2xl divide-y divide-slate-100 dark:divide-slate-800/80 shadow-2xs overflow-hidden">
          <div 
            v-for="item in currentBalanceList" 
            :key="item.name"
            @click="selectAccount(item)"
            class="px-4 py-3 sm:py-3.5 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 active:bg-rose-50/60 dark:active:bg-slate-800 transition select-none"
          >
            <div class="flex items-center gap-2.5 min-w-0">
              <span 
                class="w-2 h-2 rounded-full shrink-0"
                :class="{
                  'bg-blue-500': item.category === 'Activo',
                  'bg-amber-500': item.category === 'Pasivo',
                  'bg-emerald-500': item.category === 'Capital'
                }"
              ></span>
              <div class="min-w-0">
                <span class="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 truncate block">{{ item.name }}</span>
                <span v-if="balanceTab === 'todos'" class="text-[10px] text-slate-400">{{ item.category }}</span>
              </div>
            </div>

            <div class="flex items-center gap-2 shrink-0">
              <span 
                class="text-[9px] font-bold px-2 py-0.5 rounded-md uppercase"
                :class="item.isDeudora ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300' : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'"
              >
                {{ item.isDeudora ? 'Deudor' : 'Acreedor' }}
              </span>
              <span class="text-slate-300 dark:text-slate-600 text-sm">&rsaquo;</span>
            </div>
          </div>
        </div>

      </section>

      <!-- SECCIÓN B: ESTADO DE RESULTADOS -->
      <section v-if="mainSection === 'resultados'" class="seccion-contable space-y-3.5">
        
        <!-- Píldoras de Categoría (Ingresos / Costos / Gastos / Todo) -->
        <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs font-bold select-none">
          <button 
            @click="resultadosTab = 'ingresos'"
            :class="resultadosTab === 'ingresos' ? 'bg-teal-600 text-white shadow-xs' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800'"
            class="px-3.5 py-1.5 rounded-xl whitespace-nowrap transition active:scale-95 flex items-center gap-1.5"
          >
            <span class="w-1.5 h-1.5 rounded-full" :class="resultadosTab === 'ingresos' ? 'bg-white' : 'bg-teal-500'"></span>
            <span>Ventas / Ingresos ({{ estadoResultados.ingresos.length }})</span>
          </button>

          <button 
            @click="resultadosTab = 'costos'"
            :class="resultadosTab === 'costos' ? 'bg-rose-500 text-white shadow-xs' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800'"
            class="px-3.5 py-1.5 rounded-xl whitespace-nowrap transition active:scale-95 flex items-center gap-1.5"
          >
            <span class="w-1.5 h-1.5 rounded-full" :class="resultadosTab === 'costos' ? 'bg-white' : 'bg-rose-500'"></span>
            <span>Costos ({{ estadoResultados.costos.length }})</span>
          </button>

          <button 
            @click="resultadosTab = 'gastos'"
            :class="resultadosTab === 'gastos' ? 'bg-purple-600 text-white shadow-xs' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800'"
            class="px-3.5 py-1.5 rounded-xl whitespace-nowrap transition active:scale-95 flex items-center gap-1.5"
          >
            <span class="w-1.5 h-1.5 rounded-full" :class="resultadosTab === 'gastos' ? 'bg-white' : 'bg-purple-500'"></span>
            <span>Gastos ({{ estadoResultados.gastos.length }})</span>
          </button>

          <button 
            @click="resultadosTab = 'todos'"
            :class="resultadosTab === 'todos' ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900 shadow-xs' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800'"
            class="px-3 py-1.5 rounded-xl whitespace-nowrap transition active:scale-95"
          >
            Ver Todo (12)
          </button>
        </div>

        <!-- Banner de Naturaleza Dinámico -->
        <div 
          v-if="resultadosTab !== 'todos'" 
          class="p-3 rounded-2xl text-xs font-bold flex items-center justify-between border select-none"
          :class="{
            'bg-teal-50/70 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 border-teal-200/80 dark:border-teal-900/60': resultadosTab === 'ingresos',
            'bg-rose-50/70 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-200/80 dark:border-rose-900/60': resultadosTab === 'costos',
            'bg-purple-50/70 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 border-purple-200/80 dark:border-purple-900/60': resultadosTab === 'gastos'
          }"
        >
          <div class="flex items-center gap-1.5">
            <span class="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-white/80 dark:bg-slate-900/80 uppercase">
              {{ resultadosTab === 'ingresos' ? 'Acreedor' : 'Deudor' }}
            </span>
            <span>{{ resultadosTab === 'ingresos' ? 'Cargo (-) Disminuye' : 'Cargo (+) Aumenta' }}</span>
          </div>
          <span>{{ resultadosTab === 'ingresos' ? 'Abono (+) Aumenta' : 'Abono (-) Disminuye' }}</span>
        </div>

        <!-- Lista Limpia de Cuentas (Modo Pestaña o Todo) -->
        <div class="bg-white dark:bg-slate-900 border border-rose-100/80 dark:border-slate-800 rounded-2xl divide-y divide-slate-100 dark:divide-slate-800/80 shadow-2xs overflow-hidden">
          <div 
            v-for="item in currentResultadosList" 
            :key="item.name"
            @click="selectAccount(item)"
            class="px-4 py-3 sm:py-3.5 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 active:bg-rose-50/60 dark:active:bg-slate-800 transition select-none"
          >
            <div class="flex items-center gap-2.5 min-w-0">
              <span 
                class="w-2 h-2 rounded-full shrink-0"
                :class="{
                  'bg-teal-500': item.category === 'Ventas / Ingresos',
                  'bg-rose-500': item.category === 'Costos',
                  'bg-purple-500': item.category === 'Gastos'
                }"
              ></span>
              <div class="min-w-0">
                <span class="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 truncate block">{{ item.name }}</span>
                <span v-if="resultadosTab === 'todos'" class="text-[10px] text-slate-400">{{ item.category }}</span>
              </div>
            </div>

            <div class="flex items-center gap-2 shrink-0">
              <span 
                class="text-[9px] font-bold px-2 py-0.5 rounded-md uppercase"
                :class="item.isDeudora ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300' : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'"
              >
                {{ item.isDeudora ? 'Deudor' : 'Acreedor' }}
              </span>
              <span class="text-slate-300 dark:text-slate-600 text-sm">&rsaquo;</span>
            </div>
          </div>
        </div>

      </section>

      <!-- SECCIÓN C: TABLA REGLAS CARGO Y ABONO -->
      <section v-if="mainSection === 'reglas'" class="seccion-contable space-y-3.5">
        <div class="bg-white dark:bg-slate-900 border border-rose-100/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-4">
          <div>
            <h2 class="text-base font-black text-slate-900 dark:text-white">Reglas del Cargo y el Abono</h2>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Comportamiento universal de aumento y disminución de saldos.
            </p>
          </div>

          <!-- Matriz Limpia de Reglas en Tarjetas (Mobile-First) -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <!-- Activo -->
            <div class="p-3.5 bg-blue-50/50 dark:bg-slate-950/60 border border-blue-200/80 dark:border-blue-900/60 rounded-xl space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-black text-blue-900 dark:text-blue-300">Activo</span>
                <span class="text-[10px] px-2 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold rounded-md">Saldo Deudor</span>
              </div>
              <div class="grid grid-cols-2 gap-2 text-xs font-mono">
                <div class="p-2 bg-white dark:bg-slate-900 rounded-lg text-center">
                  <span class="text-[10px] text-slate-400 block font-sans">CARGO (Debe)</span>
                  <span class="text-blue-600 dark:text-blue-400 font-bold">+ Aumenta</span>
                </div>
                <div class="p-2 bg-white dark:bg-slate-900 rounded-lg text-center">
                  <span class="text-[10px] text-slate-400 block font-sans">ABONO (Haber)</span>
                  <span class="text-slate-500 font-bold">- Disminuye</span>
                </div>
              </div>
            </div>

            <!-- Pasivo y Capital -->
            <div class="p-3.5 bg-amber-50/40 dark:bg-slate-950/60 border border-amber-200/80 dark:border-amber-900/60 rounded-xl space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-black text-amber-900 dark:text-amber-300">Pasivo y Capital</span>
                <span class="text-[10px] px-2 py-0.5 bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold rounded-md">Saldo Acreedor</span>
              </div>
              <div class="grid grid-cols-2 gap-2 text-xs font-mono">
                <div class="p-2 bg-white dark:bg-slate-900 rounded-lg text-center">
                  <span class="text-[10px] text-slate-400 block font-sans">CARGO (Debe)</span>
                  <span class="text-slate-500 font-bold">- Disminuye</span>
                </div>
                <div class="p-2 bg-white dark:bg-slate-900 rounded-lg text-center">
                  <span class="text-[10px] text-slate-400 block font-sans">ABONO (Haber)</span>
                  <span class="text-emerald-600 dark:text-emerald-400 font-bold">+ Aumenta</span>
                </div>
              </div>
            </div>

            <!-- Costos y Gastos -->
            <div class="p-3.5 bg-purple-50/40 dark:bg-slate-950/60 border border-purple-200/80 dark:border-purple-900/60 rounded-xl space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-black text-purple-900 dark:text-purple-300">Costos y Gastos</span>
                <span class="text-[10px] px-2 py-0.5 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold rounded-md">Saldo Deudor</span>
              </div>
              <div class="grid grid-cols-2 gap-2 text-xs font-mono">
                <div class="p-2 bg-white dark:bg-slate-900 rounded-lg text-center">
                  <span class="text-[10px] text-slate-400 block font-sans">CARGO (Debe)</span>
                  <span class="text-blue-600 dark:text-blue-400 font-bold">+ Aumenta</span>
                </div>
                <div class="p-2 bg-white dark:bg-slate-900 rounded-lg text-center">
                  <span class="text-[10px] text-slate-400 block font-sans">ABONO (Haber)</span>
                  <span class="text-slate-500 font-bold">- Disminuye</span>
                </div>
              </div>
            </div>

            <!-- Ingresos / Ventas -->
            <div class="p-3.5 bg-teal-50/40 dark:bg-slate-950/60 border border-teal-200/80 dark:border-teal-900/60 rounded-xl space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-black text-teal-900 dark:text-teal-300">Ingresos / Ventas</span>
                <span class="text-[10px] px-2 py-0.5 bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold rounded-md">Saldo Acreedor</span>
              </div>
              <div class="grid grid-cols-2 gap-2 text-xs font-mono">
                <div class="p-2 bg-white dark:bg-slate-900 rounded-lg text-center">
                  <span class="text-[10px] text-slate-400 block font-sans">CARGO (Debe)</span>
                  <span class="text-slate-500 font-bold">- Disminuye</span>
                </div>
                <div class="p-2 bg-white dark:bg-slate-900 rounded-lg text-center">
                  <span class="text-[10px] text-slate-400 block font-sans">ABONO (Haber)</span>
                  <span class="text-emerald-600 dark:text-emerald-400 font-bold">+ Aumenta</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>

    <!-- MODAL DE DETALLE DE CUENTA CENTRADO Y RESPONSIVO -->
    <Teleport to="body">
      <div 
        v-if="selectedAccountModal" 
        class="fixed inset-0 z-50 bg-slate-950/65 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-pop-in select-none"
        @click.self="selectedAccountModal = null"
      >
        <div class="bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 rounded-3xl max-w-md w-full p-5 sm:p-6 space-y-4 shadow-2xl text-slate-800 dark:text-slate-100 max-h-[85vh] overflow-y-auto no-scrollbar my-auto">
          
          <div class="flex items-start justify-between gap-3">
            <div class="space-y-1">
              <div class="flex items-center gap-1.5 flex-wrap">
                <span 
                  v-if="selectedAccountModal.code" 
                  class="px-2 py-0.5 rounded-md bg-rose-500 text-white font-mono font-black text-[10px]"
                >
                  {{ selectedAccountModal.code }}
                </span>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-md" :class="selectedAccountModal.isDeudora ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'">
                  {{ selectedAccountModal.statement }}
                </span>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
                  {{ selectedAccountModal.category }}
                </span>
              </div>
              <h3 class="text-lg font-black text-slate-900 dark:text-white leading-snug">
                {{ selectedAccountModal.name }}
              </h3>
            </div>

            <button 
              @click="selectedAccountModal = null"
              class="p-1.5 text-slate-400 hover:text-rose-500 rounded-xl transition shrink-0"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 space-y-1">
            <span class="text-[10px] font-black uppercase tracking-wider text-rose-500 block">Definición:</span>
            <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {{ selectedAccountModal.definition }}
            </p>
          </div>

          <div class="grid grid-cols-2 gap-2 text-xs">
            <div class="p-2.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40">
              <span class="text-[9px] font-bold text-blue-700 dark:text-blue-300 uppercase block">Cargo (DEBE)</span>
              <p class="font-black text-xs mt-0.5" :class="selectedAccountModal.isDeudora ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'">
                {{ selectedAccountModal.isDeudora ? '+ Aumenta' : '- Disminuye' }}
              </p>
            </div>

            <div class="p-2.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
              <span class="text-[9px] font-bold text-emerald-700 dark:text-emerald-300 uppercase block">Abono (HABER)</span>
              <p class="font-black text-xs mt-0.5" :class="!selectedAccountModal.isDeudora ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'">
                {{ !selectedAccountModal.isDeudora ? '+ Aumenta' : '- Disminuye' }}
              </p>
            </div>
          </div>

          <div class="flex items-center justify-between pt-1 gap-2">
            <button 
              @click="copyAccountName(selectedAccountModal.name)" 
              class="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition flex items-center gap-1.5"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
              <span>{{ copied ? '¡Copiado!' : 'Copiar' }}</span>
            </button>

            <button 
              @click="selectedAccountModal = null" 
              class="px-6 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold transition shadow-xs"
            >
              Listo
            </button>
          </div>

        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { allDiccionarioAccounts } from '../data/accountingCatalog'

const mainSection = ref('balance')
const balanceTab = ref('activo')
const resultadosTab = ref('ingresos')
const selectedAccountModal = ref(null)
const copied = ref(false)

const balanceGeneral = {
  activo: allDiccionarioAccounts.filter(a => a.statement === 'Balance General' && a.category === 'Activo'),
  pasivo: allDiccionarioAccounts.filter(a => a.statement === 'Balance General' && a.category === 'Pasivo'),
  capital: allDiccionarioAccounts.filter(a => a.statement === 'Balance General' && a.category === 'Capital')
}

const estadoResultados = {
  ingresos: allDiccionarioAccounts.filter(a => a.statement === 'Estado de Resultados' && a.category === 'Ventas / Ingresos'),
  costos: allDiccionarioAccounts.filter(a => a.statement === 'Estado de Resultados' && a.category === 'Costos'),
  gastos: allDiccionarioAccounts.filter(a => a.statement === 'Estado de Resultados' && a.category === 'Gastos')
}

const currentBalanceList = computed(() => {
  if (balanceTab.value === 'activo') return balanceGeneral.activo
  if (balanceTab.value === 'pasivo') return balanceGeneral.pasivo
  if (balanceTab.value === 'capital') return balanceGeneral.capital
  return [...balanceGeneral.activo, ...balanceGeneral.pasivo, ...balanceGeneral.capital]
})

const currentResultadosList = computed(() => {
  if (resultadosTab.value === 'ingresos') return estadoResultados.ingresos
  if (resultadosTab.value === 'costos') return estadoResultados.costos
  if (resultadosTab.value === 'gastos') return estadoResultados.gastos
  return [...estadoResultados.ingresos, ...estadoResultados.costos, ...estadoResultados.gastos]
})

function selectAccount(account) {
  selectedAccountModal.value = account
}

function copyAccountName(name) {
  navigator.clipboard.writeText(name)
  copied.value = true
  setTimeout(() => { copied.value = false }, 1800)
}

defineExpose({
  selectAccount,
  mainSection,
  balanceTab,
  resultadosTab
})
</script>
