<template>
  <div class="space-y-4 sm:space-y-6 max-w-4xl mx-auto animate-slide-up font-sans">
    
    <!-- Hero Compacto y Cálido -->
    <div class="bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xs">
      <div class="flex items-center justify-between gap-4">
        <div class="space-y-1 sm:space-y-2">
          <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-rose-50 dark:bg-rose-950/60 border border-rose-100 dark:border-rose-900/60 rounded-full text-[11px] font-bold text-rose-600 dark:text-rose-300">
            <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
            <span>¡Hola, Valeria!</span>
          </div>
          <h1 class="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            ¿Qué deseas revisar hoy?
          </h1>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            Plataforma rápida de consulta de cuentas contables, reglas y estados financieros NIF.
          </p>
        </div>

        <!-- Mascota Kawaii Compacta -->
        <div class="w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-gradient-to-tr from-rose-500 to-pink-400 p-2 rounded-2xl shadow-md shadow-rose-500/20 flex items-center justify-center select-none">
          <img src="/favicon.svg" alt="Calculadora Kawaii" class="w-full h-full object-contain" />
        </div>
      </div>
    </div>

    <!-- TARJETA DESTACADA: DICCIONARIO CONTABLE (ACCIÓN RÁPIDA) -->
    <div 
      @click="$emit('select-tab', 'diccionario')"
      class="bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-md shadow-rose-500/20 cursor-pointer active:scale-[0.98] transition-transform flex flex-col justify-between gap-4 select-none"
    >
      <div class="flex items-start justify-between gap-3">
        <div class="space-y-1">
          <span class="text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 bg-white/20 rounded-md">
            Glosario Oficial
          </span>
          <h2 class="text-lg sm:text-xl font-black tracking-tight">Diccionario Contable</h2>
          <p class="text-xs text-rose-100 leading-relaxed font-medium">
            54 cuentas con naturaleza deudora o acreedora y reglas de cargo (+) y abono (-).
          </p>
        </div>
        <div class="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
          <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
            <path d="M6 6h10M6 10h10"/>
          </svg>
        </div>
      </div>

      <div class="flex items-center justify-between pt-2 border-t border-white/20 text-xs font-bold">
        <span>Abrir Diccionario en vivo</span>
        <span class="flex items-center gap-1">
          Consultar
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </span>
      </div>
    </div>

    <!-- Título de Sección -->
    <div class="pt-1">
      <h3 class="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
        Herramientas de Estudio
      </h3>
    </div>

    <!-- GRID DE ACCESOS RÁPIDOS 2x2 LIMPIO -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
      
      <!-- Machote & Cuentas NIF -->
      <div 
        @click="$emit('select-tab', 'machote')"
        class="bg-white dark:bg-slate-900 border border-rose-100/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3 cursor-pointer hover:border-rose-300 dark:hover:border-slate-700 transition active:scale-[0.98] shadow-2xs select-none"
      >
        <div class="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8M16 17H8M10 9H8"/></svg>
        </div>
        <div>
          <h4 class="text-sm font-black text-slate-900 dark:text-white">Machote NIF</h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
            Estructuras de ERI, ESF, EFE y ECCC.
          </p>
        </div>
      </div>

      <!-- Reglas & Esquemas de Mayor -->
      <div 
        @click="$emit('select-tab', 'teoria')"
        class="bg-white dark:bg-slate-900 border border-rose-100/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3 cursor-pointer hover:border-rose-300 dark:hover:border-slate-700 transition active:scale-[0.98] shadow-2xs select-none"
      >
        <div class="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
        </div>
        <div>
          <h4 class="text-sm font-black text-slate-900 dark:text-white">Reglas & Cuenta "T"</h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
            DEBE, HABER y cuentas complementarias.
          </p>
        </div>
      </div>

      <!-- Simulador de Balance -->
      <div 
        @click="$emit('select-tab', 'simulador')"
        class="bg-white dark:bg-slate-900 border border-rose-100/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3 cursor-pointer hover:border-rose-300 dark:hover:border-slate-700 transition active:scale-[0.98] shadow-2xs select-none"
      >
        <div class="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/><path d="M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 18h.01M12 18h.01M8 18h.01"/></svg>
        </div>
        <div>
          <h4 class="text-sm font-black text-slate-900 dark:text-white">Simulador Balance</h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
            Comprobación de Activo = Pasivo + Capital.
          </p>
        </div>
      </div>

    </div>

    <!-- Regla de Oro Contable (Tarjeta limpia tipo consejo) -->
    <div class="p-4 sm:p-5 bg-rose-50/50 dark:bg-slate-900/60 border border-rose-100 dark:border-slate-800 rounded-2xl flex items-center gap-3 text-xs">
      <div class="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 font-black text-xs">
        💡
      </div>
      <div class="space-y-0.5">
        <span class="font-bold text-slate-900 dark:text-slate-100 block">Principio de Partida Doble:</span>
        <p class="text-slate-500 dark:text-slate-400 leading-relaxed text-[11px] sm:text-xs">
          A todo cargo corresponde un abono por el mismo importe. Los aumentos de Activo se cargan y los de Pasivo y Capital se abonan.
        </p>
      </div>
    </div>

  </div>
</template>

<script setup>
defineEmits(['select-tab'])
</script>
