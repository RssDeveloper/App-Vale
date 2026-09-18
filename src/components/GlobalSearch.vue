<template>
  <div class="relative w-full select-none global-search-container" ref="searchContainerRef">
    <!-- BARRA DE BÚSQUEDA GLOBAL ESTILO NATIVO MOBILE-FIRST -->
    <div class="relative flex items-center">
      <!-- Icono de Búsqueda -->
      <div class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none flex items-center">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.3-4.3"/>
        </svg>
      </div>

      <!-- Input Principal Universal -->
      <input 
        ref="searchInputRef"
        v-model="searchQuery"
        @focus="onFocus"
        @input="onInput"
        @keydown.esc="closeSearch"
        type="text"
        placeholder="Buscar en toda la app: 1105, 2102, Clientes, ERI, IVA..."
        class="w-full pl-10 pr-20 sm:pr-24 py-2 sm:py-2.5 bg-slate-100/90 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-xl sm:rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/80 focus:border-rose-500 transition-all shadow-2xs"
      />

      <!-- Acciones a la Derecha del Input: Limpiar o Atajo -->
      <div class="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
        <button 
          v-if="searchQuery" 
          @click="clearSearch"
          title="Limpiar búsqueda"
          class="p-1 text-slate-400 hover:text-rose-500 rounded-lg transition"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <span 
          v-else 
          class="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-slate-700/70 text-[10px] font-mono text-slate-500 dark:text-slate-400 border border-slate-300/60 dark:border-slate-600"
        >
          ⌘K
        </span>
      </div>
    </div>

    <!-- BACKDROP OSCURO DE BÚSQUEDA GLOBAL -->
    <Teleport to="body">
      <div 
        v-if="showResultsDropdown" 
        @click="closeSearch"
        class="fixed inset-0 bg-slate-950/35 backdrop-blur-2xs z-35 transition-opacity pointer-events-auto"
      ></div>
    </Teleport>

    <!-- PANEL DESPLEGABLE FLOTANTE DE RESULTADOS GLOBALES -->
    <div 
      v-if="showResultsDropdown"
      class="absolute left-0 right-0 top-full mt-2 z-50 bg-white dark:bg-slate-900 border-2 border-rose-200/90 dark:border-slate-700 rounded-2xl sm:rounded-3xl shadow-2xl max-h-[72vh] sm:max-h-[580px] flex flex-col overflow-hidden animate-pop-in pointer-events-auto"
    >
      <!-- Barra de Filtros Rápidos por Categoría -->
      <div class="p-2.5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs font-bold shrink-0 bg-slate-50/70 dark:bg-slate-900/50">
        <button 
          v-for="filter in categoryFilters"
          :key="filter.id"
          @click="activeFilter = filter.id"
          :class="[
            'px-2.5 py-1 rounded-xl whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 text-[11px]',
            activeFilter === filter.id
              ? 'bg-rose-500 text-white shadow-xs font-bold'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/70 hover:border-rose-300'
          ]"
        >
          <span>{{ filter.label }}</span>
          <span 
            class="px-1.5 py-0.2 rounded-full text-[9px] font-mono"
            :class="activeFilter === filter.id ? 'bg-white/25 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'"
          >
            {{ filter.count }}
          </span>
        </button>
      </div>

      <!-- Resumen del Estado de Búsqueda -->
      <div class="px-4 py-2 text-[11px] text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between bg-white dark:bg-slate-900 shrink-0">
        <span>
          Encontrados <strong class="text-rose-500 font-mono">{{ totalResultsCount }}</strong> resultados para "<span class="font-semibold text-slate-800 dark:text-slate-200">{{ searchQuery }}</span>"
        </span>
        <button 
          @click="closeSearch"
          class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-[11px] font-medium"
        >
          Cerrar ✕
        </button>
      </div>

      <!-- Lista Scrollable de Resultados -->
      <div class="overflow-y-auto flex-1 p-2 sm:p-3 space-y-4 no-scrollbar">
        
        <!-- Estado Vacío (Sin coincidencias) -->
        <div v-if="totalResultsCount === 0" class="py-8 text-center space-y-2 px-4">
          <div class="w-10 h-10 mx-auto rounded-full bg-rose-50 dark:bg-slate-800 flex items-center justify-center text-rose-500">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <p class="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
            No encontramos coincidencias para "{{ searchQuery }}"
          </p>
          <p class="text-[11px] text-slate-400 max-w-xs mx-auto">
            Prueba buscando cuentas oficiales como <span class="text-rose-500 font-mono font-bold">1105</span>, <span class="text-rose-500 font-mono font-bold">2102</span>, <span class="text-slate-600 dark:text-slate-300 font-bold">Clientes</span>, <span class="text-slate-600 dark:text-slate-300 font-bold">ERI</span> o <span class="text-slate-600 dark:text-slate-300 font-bold">IVA</span>.
          </p>
        </div>

        <!-- GRUPO 1: REGLAS DEL IVA (1105, 1106, 2102, 2103 & CIERRE) -->
        <div v-if="filteredIvaResults.length > 0" class="space-y-2">
          <div class="flex items-center gap-1.5 px-2 text-[11px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-400">
            <span>⚡</span>
            <span>Regla del IVA (Corazón de la Práctica)</span>
            <span class="text-slate-400 font-normal">({{ filteredIvaResults.length }})</span>
          </div>

          <div class="space-y-1.5">
            <div 
              v-for="item in filteredIvaResults" 
              :key="item.id"
              @click="openDetailModal(item)"
              class="p-3 sm:p-3.5 rounded-2xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/50 hover:border-amber-400 active:scale-[0.99] transition cursor-pointer flex items-start justify-between gap-3 select-none"
            >
              <div class="space-y-1 min-w-0 flex-1">
                <div class="flex items-center gap-2 flex-wrap">
                  <span v-if="item.code" class="px-2 py-0.5 rounded-md bg-amber-500 text-white font-mono font-black text-[10px]">
                    {{ item.code }}
                  </span>
                  <span class="text-xs sm:text-sm font-black text-slate-900 dark:text-slate-100">
                    {{ item.name }}
                  </span>
                  <span 
                    class="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase"
                    :class="item.isDeudora ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'"
                  >
                    {{ item.natureShort }}
                  </span>
                </div>

                <p class="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed font-medium">
                  {{ item.description }}
                </p>

                <div class="flex items-center gap-2 pt-0.5 text-[10px] text-amber-700 dark:text-amber-300 font-bold">
                  <span>{{ item.ruleCycle }}</span>
                  <span>&bull;</span>
                  <span>{{ item.flowType }}</span>
                </div>
              </div>

              <span class="text-slate-300 dark:text-slate-600 text-base font-bold shrink-0 mt-1">&rsaquo;</span>
            </div>
          </div>
        </div>

        <!-- GRUPO 2: CUENTAS DEL DICCIONARIO -->
        <div v-if="filteredDiccionarioResults.length > 0" class="space-y-2">
          <div class="flex items-center gap-1.5 px-2 text-[11px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-400">
            <span>📖</span>
            <span>Cuentas del Diccionario Contable</span>
            <span class="text-slate-400 font-normal">({{ filteredDiccionarioResults.length }})</span>
          </div>

          <div class="divide-y divide-slate-100 dark:divide-slate-800/80 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-2xs">
            <div 
              v-for="item in filteredDiccionarioResults" 
              :key="item.name"
              @click="openDetailModal(item)"
              class="p-3 sm:p-3.5 flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 active:bg-rose-50/50 dark:active:bg-slate-800 cursor-pointer transition select-none"
            >
              <div class="min-w-0 space-y-0.5">
                <div class="flex items-center gap-2">
                  <span 
                    class="w-2 h-2 rounded-full shrink-0"
                    :class="{
                      'bg-blue-500': item.category === 'Activo' || item.category === 'Costos' || item.category === 'Gastos',
                      'bg-amber-500': item.category === 'Pasivo',
                      'bg-emerald-500': item.category === 'Capital' || item.category === 'Ventas / Ingresos'
                    }"
                  ></span>
                  <span class="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                    {{ item.name }}
                  </span>
                  <span 
                    class="text-[9px] font-bold px-1.5 py-0.5 rounded-md shrink-0 uppercase"
                    :class="item.isDeudora ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300' : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'"
                  >
                    {{ item.natureShort }}
                  </span>
                </div>

                <p class="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 pl-4">
                  {{ item.statement }} &bull; {{ item.category }} &bull; {{ item.definition }}
                </p>
              </div>

              <span class="text-slate-300 dark:text-slate-600 text-sm shrink-0">&rsaquo;</span>
            </div>
          </div>
        </div>

        <!-- GRUPO 3: ESTRUCTURA NIF (MACHOTE) -->
        <div v-if="filteredMachoteResults.length > 0" class="space-y-2">
          <div class="flex items-center gap-1.5 px-2 text-[11px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">
            <span>📑</span>
            <span>Estructura de Estados Financieros NIF (Machote)</span>
            <span class="text-slate-400 font-normal">({{ filteredMachoteResults.length }})</span>
          </div>

          <div class="space-y-1.5">
            <div 
              v-for="item in filteredMachoteResults" 
              :key="item.id"
              @click="openDetailModal(item)"
              class="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-rose-300 active:scale-[0.99] transition cursor-pointer flex items-start justify-between gap-3 shadow-2xs select-none"
            >
              <div class="space-y-1 min-w-0 flex-1">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="px-2 py-0.5 rounded-md bg-rose-50 dark:bg-slate-800 text-rose-700 dark:text-rose-300 font-mono font-bold text-[10px]">
                    {{ item.docShortCode }}
                  </span>
                  <span v-if="item.operation_sign" class="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded font-mono font-black text-[10px]">
                    {{ item.operation_sign }}
                  </span>
                  <span class="text-xs sm:text-sm font-black text-slate-900 dark:text-slate-100">
                    {{ item.name }}
                  </span>
                  <span 
                    class="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase"
                    :class="{
                      'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300': item.normal_balance === 'Deudora',
                      'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300': item.normal_balance === 'Acreedora',
                      'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300': item.normal_balance === 'Variable'
                    }"
                  >
                    {{ item.normal_balance }}
                  </span>
                </div>

                <p v-if="item.definition" class="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 leading-relaxed">
                  {{ item.definition }}
                </p>

                <p v-if="item.formula_expression" class="text-[10px] font-mono text-rose-500 dark:text-rose-400 font-semibold">
                  Fórmula: {{ item.formula_expression }}
                </p>
              </div>

              <span class="text-slate-300 dark:text-slate-600 text-sm shrink-0 mt-1">&rsaquo;</span>
            </div>
          </div>
        </div>

        <!-- GRUPO 4: CONCEPTOS TEÓRICOS -->
        <div v-if="filteredTeoriaResults.length > 0" class="space-y-2">
          <div class="flex items-center gap-1.5 px-2 text-[11px] font-black uppercase tracking-wider text-purple-600 dark:text-purple-400">
            <span>💡</span>
            <span>Conceptos Teóricos y Reglas</span>
            <span class="text-slate-400 font-normal">({{ filteredTeoriaResults.length }})</span>
          </div>

          <div class="space-y-1.5">
            <div 
              v-for="item in filteredTeoriaResults" 
              :key="item.id"
              @click="openDetailModal(item)"
              class="p-3 sm:p-3.5 rounded-2xl bg-purple-50/40 dark:bg-purple-950/20 border border-purple-200/70 dark:border-purple-900/50 hover:border-purple-400 active:scale-[0.99] transition cursor-pointer flex items-start justify-between gap-3 select-none"
            >
              <div class="space-y-1 min-w-0 flex-1">
                <span class="text-xs sm:text-sm font-black text-slate-900 dark:text-slate-100 block">
                  {{ item.title }}
                </span>
                <p class="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {{ item.description }}
                </p>
              </div>
              <span class="text-slate-300 dark:text-slate-600 text-sm shrink-0 mt-1">&rsaquo;</span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- MODAL DE DETALLE RÁPIDO UNIVERSAL (TELEPORTED TO BODY) -->
    <Teleport to="body">
      <div 
        v-if="selectedItemModal"
        class="fixed inset-0 z-50 bg-slate-950/65 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-pop-in select-none"
        @click.self="selectedItemModal = null"
      >
        <div class="bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 rounded-3xl max-w-md sm:max-w-lg w-full p-5 sm:p-6 space-y-4 shadow-2xl text-slate-800 dark:text-slate-100 max-h-[85vh] overflow-y-auto no-scrollbar my-auto">
          
          <!-- Cabecera del Modal -->
          <div class="flex items-start justify-between gap-3">
            <div class="space-y-1">
              <div class="flex items-center gap-1.5 flex-wrap">
                <span 
                  v-if="selectedItemModal.code" 
                  class="px-2 py-0.5 rounded-md bg-rose-500 text-white font-mono font-black text-[10px]"
                >
                  {{ selectedItemModal.code }}
                </span>
                <span 
                  class="text-[10px] font-bold px-2 py-0.5 rounded-md"
                  :class="selectedItemModal.isDeudora ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'"
                >
                  {{ selectedItemModal.statement || selectedItemModal.docTitle || 'Contabilidad' }}
                </span>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
                  {{ selectedItemModal.category || selectedItemModal.sectionName }}
                </span>
              </div>
              <h3 class="text-lg font-black text-slate-900 dark:text-white leading-tight">
                {{ selectedItemModal.name || selectedItemModal.title }}
              </h3>
            </div>

            <button 
              @click="selectedItemModal = null"
              class="p-1.5 text-slate-400 hover:text-rose-500 rounded-xl transition"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <!-- Definición / Explicación -->
          <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 space-y-1">
            <span class="text-[10px] font-black uppercase tracking-wider text-rose-500 block">
              {{ selectedItemModal.type === 'regla-iva' ? 'Regla Contable & Fiscal:' : 'Definición Oficial:' }}
            </span>
            <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {{ selectedItemModal.definition || selectedItemModal.description }}
            </p>
          </div>

          <!-- Regla Clave o Fórmula si existe -->
          <div v-if="selectedItemModal.keyRule || selectedItemModal.formula_expression" class="p-3 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-xs space-y-1">
            <span class="text-[10px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-300 block">
              {{ selectedItemModal.formula_expression ? 'Fórmula NIF:' : 'Regla de Oro:' }}
            </span>
            <p class="font-bold text-xs text-rose-900 dark:text-rose-200 font-mono">
              {{ selectedItemModal.formula_expression ? selectedItemModal.formula_expression : selectedItemModal.keyRule }}
            </p>
          </div>

          <!-- Mecánica Cargo / Abono para Cuentas -->
          <div v-if="selectedItemModal.natureShort || selectedItemModal.normal_balance" class="grid grid-cols-2 gap-2 text-xs">
            <div class="p-2.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40">
              <span class="text-[9px] font-bold text-blue-700 dark:text-blue-300 uppercase block">Cargo (DEBE)</span>
              <p class="font-black text-xs mt-0.5" :class="isAccountDeudora(selectedItemModal) ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'">
                {{ isAccountDeudora(selectedItemModal) ? '+ Aumenta' : '- Disminuye' }}
              </p>
            </div>

            <div class="p-2.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
              <span class="text-[9px] font-bold text-emerald-700 dark:text-emerald-300 uppercase block">Abono (HABER)</span>
              <p class="font-black text-xs mt-0.5" :class="!isAccountDeudora(selectedItemModal) ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'">
                {{ !isAccountDeudora(selectedItemModal) ? '+ Aumenta' : '- Disminuye' }}
              </p>
            </div>
          </div>

          <!-- Botones de Acción del Modal -->
          <div class="flex items-center justify-between pt-2 gap-2">
            <button 
              @click="copyAccountName(selectedItemModal.name || selectedItemModal.title)" 
              class="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition flex items-center gap-1.5"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
              <span>{{ copied ? '¡Copiado!' : 'Copiar' }}</span>
            </button>

            <button 
              @click="navigateFromModal(selectedItemModal)" 
              class="flex-1 px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold transition shadow-xs flex items-center justify-center gap-1.5"
            >
              <span>Ir a su sección completa</span>
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>

        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAccountingStore } from '../stores/useAccountingStore'
import { allDiccionarioAccounts, ivaRulesData, theoreticalConcepts } from '../data/accountingCatalog'

const emit = defineEmits(['navigate-to'])

const store = useAccountingStore()
const searchInputRef = ref(null)
const searchContainerRef = ref(null)
const searchQuery = ref('')
const isOpen = ref(false)
const activeFilter = ref('all')
const selectedItemModal = ref(null)
const copied = ref(false)

function onInput() {
  isOpen.value = searchQuery.value.trim().length > 0
}

function onFocus() {
  if (searchQuery.value.trim().length > 0) {
    isOpen.value = true
  }
}

// Cerrar dropdown al hacer click fuera
function handleClickOutside(event) {
  if (!event.target.closest('.global-search-container')) {
    isOpen.value = false
  }
}

// Atajo universal Ctrl+K / Cmd+K
function handleGlobalKeydown(e) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    searchInputRef.value?.focus()
    if (searchQuery.value.trim().length > 0) {
      isOpen.value = true
    }
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('keydown', handleGlobalKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('keydown', handleGlobalKeydown)
})

const showResultsDropdown = computed(() => {
  return searchQuery.value.trim().length > 0 && isOpen.value
})

function clearSearch() {
  searchQuery.value = ''
  isOpen.value = false
  searchInputRef.value?.focus()
}

function closeSearch() {
  isOpen.value = false
  searchQuery.value = ''
}

// Búsqueda en Reglas del IVA
const filteredIvaResults = computed(() => {
  if (activeFilter.value !== 'all' && activeFilter.value !== 'iva') return []
  const q = searchQuery.value.toLowerCase().trim()
  if (!q) return []

  return ivaRulesData.filter(item => 
    item.name.toLowerCase().includes(q) ||
    item.code?.toLowerCase().includes(q) ||
    item.description.toLowerCase().includes(q) ||
    item.ruleCycle.toLowerCase().includes(q) ||
    item.category.toLowerCase().includes(q)
  )
})

// Búsqueda en Cuentas del Diccionario
const filteredDiccionarioResults = computed(() => {
  if (activeFilter.value !== 'all' && activeFilter.value !== 'cuentas') return []
  const q = searchQuery.value.toLowerCase().trim()
  if (!q) return []

  return allDiccionarioAccounts.filter(acc => 
    acc.name.toLowerCase().includes(q) ||
    acc.code?.toLowerCase().includes(q) ||
    acc.category.toLowerCase().includes(q) ||
    acc.statement.toLowerCase().includes(q) ||
    acc.definition.toLowerCase().includes(q) ||
    acc.aliases?.some(alias => alias.includes(q))
  )
})

// Búsqueda en Machote NIF (Items de Estados Financieros)
const machoteItems = computed(() => {
  const items = []
  store.documents.forEach(doc => {
    doc.sections?.forEach(sec => {
      sec.financial_items?.forEach(fi => {
        items.push({
          id: fi.id,
          name: fi.name,
          code: fi.code,
          abbreviation: fi.abbreviation,
          operation_sign: fi.operation_sign,
          normal_balance: fi.normal_balance,
          definition: fi.definition,
          formula_expression: fi.formula_expression,
          docId: doc.id,
          docTitle: doc.title,
          docShortCode: doc.short_code,
          sectionName: sec.name,
          type: 'machote-item'
        })
      })
    })
  })
  return items
})

const filteredMachoteResults = computed(() => {
  if (activeFilter.value !== 'all' && activeFilter.value !== 'machote') return []
  const q = searchQuery.value.toLowerCase().trim()
  if (!q) return []

  return machoteItems.value.filter(item => 
    item.name?.toLowerCase().includes(q) ||
    item.code?.toLowerCase().includes(q) ||
    item.abbreviation?.toLowerCase().includes(q) ||
    item.definition?.toLowerCase().includes(q) ||
    item.docShortCode?.toLowerCase().includes(q) ||
    item.docTitle?.toLowerCase().includes(q) ||
    item.formula_expression?.toLowerCase().includes(q)
  )
})

// Búsqueda en Teoría
const filteredTeoriaResults = computed(() => {
  if (activeFilter.value !== 'all' && activeFilter.value !== 'teoria') return []
  const q = searchQuery.value.toLowerCase().trim()
  if (!q) return []

  return theoreticalConcepts.filter(c => 
    c.name.toLowerCase().includes(q) ||
    c.title.toLowerCase().includes(q) ||
    c.description.toLowerCase().includes(q) ||
    c.keyRule.toLowerCase().includes(q)
  )
})

const totalResultsCount = computed(() => {
  return (
    filteredIvaResults.value.length +
    filteredDiccionarioResults.value.length +
    filteredMachoteResults.value.length +
    filteredTeoriaResults.value.length
  )
})

const categoryFilters = computed(() => {
  return [
    { id: 'all', label: 'Todo', count: totalResultsCount.value },
    { id: 'iva', label: 'Reglas IVA', count: filteredIvaResults.value.length },
    { id: 'cuentas', label: 'Cuentas (54)', count: filteredDiccionarioResults.value.length },
    { id: 'machote', label: 'Machote NIF', count: filteredMachoteResults.value.length },
    { id: 'teoria', label: 'Teoría', count: filteredTeoriaResults.value.length }
  ]
})

function isAccountDeudora(item) {
  if (item.isDeudora !== undefined) return item.isDeudora
  if (item.normal_balance === 'Deudora') return true
  return false
}

function openDetailModal(item) {
  isOpen.value = false
  selectedItemModal.value = item
}

function copyAccountName(name) {
  navigator.clipboard.writeText(name)
  copied.value = true
  setTimeout(() => { copied.value = false }, 1800)
}

function navigateFromModal(item) {
  selectedItemModal.value = null
  isOpen.value = false
  searchQuery.value = ''

  if (item.type === 'regla-iva') {
    emit('navigate-to', { tab: 'teoria', anchor: 'regla-iva' })
  } else if (item.type === 'cuenta-diccionario') {
    emit('navigate-to', { tab: 'diccionario', accountName: item.name })
  } else if (item.type === 'machote-item') {
    emit('navigate-to', { tab: 'machote', docCode: item.docShortCode })
  } else if (item.type === 'concepto-teoria') {
    emit('navigate-to', { tab: 'teoria', anchor: 'regla-iva' })
  }
}
</script>
