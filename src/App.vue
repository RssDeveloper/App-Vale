<template>
  <div class="min-h-screen flex flex-col bg-slate-50/70 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-200 selection:bg-rose-100">
    <!-- Pantalla Inicial de Carga (Splash Screen) -->
    <SplashScreen :trigger-key="splashKey" />

    <!-- Header Superior Minimalista y Limpio (52px) -->
    <header class="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-rose-100/70 dark:border-slate-800 px-4 sm:px-6 py-2.5 shadow-2xs">
      <div class="max-w-5xl mx-auto flex items-center justify-between gap-3">
        <!-- Marca y Logo Kawaii -->
        <div @click="goToHome" class="flex items-center gap-2.5 cursor-pointer select-none active:opacity-80 transition shrink-0">
          <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-400 flex items-center justify-center text-white shadow-xs shrink-0 overflow-hidden p-0.5">
            <img src="/favicon.svg" alt="Conta App" class="w-full h-full object-contain" />
          </div>
          <div class="flex items-center gap-1.5">
            <span class="text-sm sm:text-base font-black tracking-tight text-slate-900 dark:text-slate-100">Conta App</span>
            <span class="text-[9px] px-1.5 py-0.5 bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 font-extrabold rounded-md uppercase">Valeria</span>
          </div>
        </div>

        <!-- Buscador Global en Desktop / Tablet (Centro del Header) -->
        <div class="hidden sm:block flex-1 max-w-md mx-2">
          <GlobalSearch @navigate-to="handleGlobalNavigation" />
        </div>

        <!-- Acciones Rápidas del Header -->
        <div class="flex items-center gap-1.5 shrink-0">
          <!-- Indicador sutil de red (solo un punto limpio) -->
          <div 
            :title="store.isOnline ? 'En línea' : 'Modo Offline'" 
            class="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold"
            :class="store.isOnline ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40' : 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40'"
          >
            <span class="w-1.5 h-1.5 rounded-full" :class="store.isOnline ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'"></span>
            <span class="hidden sm:inline">{{ store.isOnline ? 'En línea' : 'Offline' }}</span>
          </div>

          <!-- Botón de Edición NIF (acceso libre sin login) -->
          <button 
            @click="switchTab('admin')"
            title="Panel de Edición NIF"
            :class="currentTab === 'admin' ? 'bg-rose-500 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-slate-800'"
            class="p-2 rounded-xl transition active:scale-95 text-xs font-bold flex items-center gap-1.5"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            <span class="hidden sm:inline text-xs">Editar</span>
          </button>

          <!-- Toggle Tema Claro / Oscuro -->
          <button 
            @click="toggleTheme" 
            title="Cambiar Tema"
            class="p-2 text-slate-600 dark:text-amber-400 hover:bg-rose-50 dark:hover:bg-slate-800 rounded-xl transition active:scale-95 shrink-0"
          >
            <svg v-if="isDark" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
            <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Buscador Global Móvil (Fijo y Siempre Accesible para Teléfonos) -->
    <div class="sm:hidden px-3.5 py-2 bg-white/98 dark:bg-slate-900/98 border-b border-rose-100/80 dark:border-slate-800 sticky top-[52px] z-40 shadow-xs">
      <GlobalSearch @navigate-to="handleGlobalNavigation" />
    </div>

    <!-- Navegación Superior para Pantallas Grandes (Escritorio / Tablet) -->
    <nav class="hidden sm:block bg-white dark:bg-slate-900 border-b border-rose-100/70 dark:border-slate-800 sticky top-[53px] z-30 shadow-2xs">
      <div class="max-w-5xl mx-auto flex gap-1 p-2 text-xs font-bold">
        <button 
          v-for="tab in mainTabs" 
          :key="tab.id"
          @click="switchTab(tab.id)"
          :class="[
            'px-4 py-2 rounded-xl transition-all duration-150 flex items-center gap-2 touch-manipulation active:scale-95',
            currentTab === tab.id 
              ? 'bg-rose-500 text-white shadow-xs font-bold' 
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-rose-50/60 dark:hover:bg-slate-800'
          ]"
        >
          <component :is="tab.icon" class="w-4 h-4 shrink-0" />
          <span>{{ tab.name }}</span>
        </button>
      </div>
    </nav>

    <!-- Vista Principal Limpia (con padding inferior suficiente para la barra móvil) -->
    <main class="flex-1 p-3.5 sm:p-6 md:p-8 max-w-5xl mx-auto w-full pb-36 sm:pb-16 animate-slide-up">
      <HomeDashboard 
        v-if="currentTab === 'inicio'" 
        @select-tab="switchTab" 
      />
      <DiccionarioViewer 
        v-else-if="currentTab === 'diccionario'" 
      />
      <MachoteViewer 
        v-else-if="currentTab === 'machote'" 
        :initial-doc-code="selectedMachoteDoc"
        @open-admin="switchTab('admin')"
      />
      <ConceptosViewer 
        v-else-if="currentTab === 'teoria'" 
      />
      <BalanceSimulator 
        v-else-if="currentTab === 'simulador'" 
      />
      <AdminPanel 
        v-else-if="currentTab === 'admin'" 
      />

      <!-- Espaciador de seguridad para que la barra inferior fija nunca corte contenido en celulares -->
      <div class="h-20 sm:hidden w-full pointer-events-none" aria-hidden="true"></div>
    </main>

    <!-- BARRA DE NAVEGACIÓN INFERIOR NATIVA PARA CELULAR (BOTTOM TAB BAR) -->
    <nav class="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-rose-100 dark:border-slate-800 pb-safe shadow-lg">
      <div class="grid grid-cols-5 h-14 items-center">
        <button 
          v-for="tab in mainTabs" 
          :key="tab.id"
          @click="switchTab(tab.id)"
          :class="[
            'flex flex-col items-center justify-center h-full gap-0.5 select-none touch-manipulation active:scale-95 transition-colors',
            currentTab === tab.id 
              ? 'text-rose-500 dark:text-rose-400 font-extrabold' 
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 font-medium'
          ]"
        >
          <div class="relative">
            <component :is="tab.icon" class="w-5 h-5 transition-transform" :class="currentTab === tab.id ? 'scale-110' : ''" />
            <span v-if="currentTab === tab.id" class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-rose-500 rounded-full"></span>
          </div>
          <span class="text-[10px] tracking-tight leading-none">{{ tab.shortName }}</span>
        </button>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, h, onMounted } from 'vue'
import { useAccountingStore } from './stores/useAccountingStore'
import SplashScreen from './components/SplashScreen.vue'
import GlobalSearch from './components/GlobalSearch.vue'
import HomeDashboard from './components/HomeDashboard.vue'
import DiccionarioViewer from './components/DiccionarioViewer.vue'
import MachoteViewer from './components/MachoteViewer.vue'
import ConceptosViewer from './components/ConceptosViewer.vue'
import BalanceSimulator from './components/BalanceSimulator.vue'
import AdminPanel from './components/AdminPanel.vue'

const store = useAccountingStore()

const currentTab = ref('inicio')
const selectedMachoteDoc = ref('')
const splashKey = ref(1)
const isDark = ref(localStorage.getItem('conta_theme') === 'dark')

// Iconos funcionales SVG limpios
const HomeIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
  h('path', { d: 'm3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' }),
  h('polyline', { points: '9 22 9 12 15 12 15 22' })
])

const BookIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
  h('path', { d: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z' }),
  h('path', { d: 'M6 6h10M6 10h10' })
])

const FileIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
  h('path', { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }),
  h('path', { d: 'M14 2v6h6' }),
  h('path', { d: 'M16 13H8M16 17H8M10 9H8' })
])

const ChartIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
  h('path', { d: 'M3 3v18h18' }),
  h('path', { d: 'm19 9-5 5-4-4-3 3' })
])

const CalcIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
  h('rect', { width: '16', height: '20', x: '4', y: '2', rx: '2' }),
  h('line', { x1: '8', y1: '6', x2: '16', y2: '6' }),
  h('line', { x1: '16', y1: '14', x2: '16', y2: '18' }),
  h('path', { d: 'M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 18h.01M12 18h.01M8 18h.01' })
])

const mainTabs = [
  { id: 'inicio', name: 'Inicio', shortName: 'Inicio', icon: HomeIcon },
  { id: 'diccionario', name: 'Diccionario', shortName: 'Glosario', icon: BookIcon },
  { id: 'machote', name: 'Machote NIF', shortName: 'Catálogo', icon: FileIcon },
  { id: 'teoria', name: 'Reglas & T', shortName: 'Reglas', icon: ChartIcon },
  { id: 'simulador', name: 'Simulador', shortName: 'Simulador', icon: CalcIcon }
]

function goToHome() {
  currentTab.value = 'inicio'
  splashKey.value++
}

function switchTab(tabId) {
  currentTab.value = tabId
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleGlobalNavigation(target) {
  if (target.docCode) {
    selectedMachoteDoc.value = target.docCode
  }
  if (target.tab) {
    currentTab.value = target.tab
  }
  if (target.anchor) {
    setTimeout(() => {
      const el = document.getElementById(target.anchor)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 200)
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function toggleTheme() {
  isDark.value = !isDark.value
  localStorage.setItem('conta_theme', isDark.value ? 'dark' : 'light')
  applyTheme()
}

function applyTheme() {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    document.body.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
    document.body.classList.remove('dark')
  }
}

onMounted(() => {
  applyTheme()
  store.fetchAll()
})
</script>
