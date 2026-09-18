<template>
  <div class="space-y-4 sm:space-y-6 max-w-4xl mx-auto font-sans pb-16">
    
    <!-- Barra Superior: Selector de Documentos y Botón de Edición -->
    <div class="flex items-center justify-between gap-2.5">
      <!-- Selector Horizontal de Documentos (ERI, ESF, EFE, ECCC) -->
      <div class="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5 w-full select-none text-xs font-bold">
        <button 
          v-for="doc in store.documents"
          :key="doc.id"
          @click="selectedDoc = doc"
          :class="[
            'px-3.5 py-2 rounded-xl transition-all duration-150 border whitespace-nowrap shrink-0 touch-manipulation active:scale-95 flex items-center gap-1.5',
            selectedDoc?.id === doc.id 
              ? 'bg-rose-500 border-rose-500 text-white shadow-xs font-bold' 
              : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-rose-300'
          ]"
        >
          <span class="font-mono">{{ doc.short_code }}</span>
          <span class="opacity-40">&bull;</span>
          <span>{{ doc.title }}</span>
        </button>
      </div>

      <!-- Botón Compacto de Edición NIF -->
      <button 
        @click="$emit('open-admin')"
        title="Abrir Panel de Edición"
        class="p-2 sm:px-3.5 sm:py-2 bg-rose-50 hover:bg-rose-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-rose-600 dark:text-rose-300 border border-rose-200/70 dark:border-slate-700 rounded-xl text-xs font-bold transition active:scale-95 flex items-center gap-1.5 shrink-0 select-none"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
        <span class="hidden sm:inline">Editar NIF</span>
      </button>
    </div>



    <!-- Encabezado del Documento Activo (Tarjeta Ligera) -->
    <div v-if="selectedDoc" class="bg-white dark:bg-slate-900 border border-rose-100/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row justify-between sm:items-center gap-2 select-none">
      <div>
        <span class="text-[10px] font-mono uppercase tracking-widest text-rose-500 font-bold">
          {{ selectedDoc.nif_reference }}
        </span>
        <h2 class="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100">
          {{ selectedDoc.title }}
        </h2>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
          {{ selectedDoc.description }}
        </p>
      </div>
    </div>

    <!-- Lista de Secciones y Cuentas (Diseño Mobile-First Desahogado) -->
    <div v-if="selectedDoc" class="space-y-5">
      <div v-for="section in filteredSections" :key="section.id" class="space-y-2.5">
        
        <!-- Título de Sección Limpio con Badge de Naturaleza -->
        <div class="flex items-center gap-2 pt-1 px-1">
          <span class="w-2 h-2 rounded-full shrink-0" :class="getNatureBadge(section.nature)"></span>
          <h3 class="text-xs font-black tracking-wider uppercase text-slate-600 dark:text-slate-300">
            {{ section.name }}
          </h3>
        </div>

        <!-- Tarjetas de Cuenta Individuales (Sin cajón exterior que las comprima) -->
        <div class="space-y-2.5">
          <div 
            v-for="item in section.financial_items" 
            :key="item.id"
            class="p-3.5 sm:p-4 rounded-2xl border transition-all duration-150 space-y-2 shadow-2xs"
            :class="item.is_group_total 
              ? 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/60 font-bold' 
              : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-rose-300 dark:hover:border-slate-700'"
          >
            <!-- Fila Superior: Códigos + Nombre + Naturaleza -->
            <div class="flex items-start justify-between gap-2.5">
              <div class="flex items-start gap-2 flex-1 min-w-0">
                <!-- Badges de Clave / Código / Signo -->
                <div class="flex items-center gap-1.5 shrink-0 mt-0.5">
                  <span v-if="item.operation_sign" class="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md text-[10px] font-mono font-black">
                    {{ item.operation_sign }}
                  </span>
                  <span v-if="item.code" class="px-1.5 py-0.5 bg-rose-50 dark:bg-slate-800 text-rose-800 dark:text-slate-200 rounded-md text-[10px] font-mono font-bold">
                    {{ item.code }}
                  </span>
                  <span v-if="item.abbreviation" class="px-1.5 py-0.5 bg-pink-50 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 border border-pink-100 dark:border-pink-900/50 rounded-md text-[10px] font-mono font-bold">
                    {{ item.abbreviation }}
                  </span>
                </div>

                <!-- Nombre de la Cuenta -->
                <span class="text-xs sm:text-sm font-black text-slate-900 dark:text-slate-100 leading-snug">
                  {{ item.name }}
                </span>
              </div>

              <!-- Badge de Naturaleza de Saldo -->
              <span 
                class="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase shrink-0"
                :class="{
                  'bg-blue-50 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-200/80 dark:border-blue-900/60': item.normal_balance === 'Deudora',
                  'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-900/60': item.normal_balance === 'Acreedora',
                  'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700': item.normal_balance === 'Variable'
                }"
              >
                {{ item.normal_balance }}
              </span>
            </div>

            <!-- Definición -->
            <p v-if="item.definition" class="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed pl-0.5">
              {{ item.definition }}
            </p>

            <!-- Fórmula Matemática NIF (si aplica) -->
            <div v-if="item.formula_expression" class="pt-1 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 text-[11px] font-mono font-semibold text-rose-500 dark:text-rose-400">
              <svg class="w-3 h-3 text-rose-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7h10M7 12h10M7 17h10"/></svg>
              <span>Fórmula: {{ item.formula_expression }}</span>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useAccountingStore } from '../stores/useAccountingStore'

defineEmits(['open-admin'])

const props = defineProps({
  initialDocCode: {
    type: String,
    default: ''
  }
})

const store = useAccountingStore()
const selectedDoc = ref(null)
const search = ref('')

watch(() => store.documents, (newDocs) => {
  if (newDocs.length) {
    if (props.initialDocCode) {
      const match = newDocs.find(d => d.short_code === props.initialDocCode)
      if (match) selectedDoc.value = match
    } else if (!selectedDoc.value) {
      selectedDoc.value = newDocs.find(d => d.short_code === 'ERI') || newDocs[0]
    }
  }
}, { immediate: true })

watch(() => props.initialDocCode, (code) => {
  if (code && store.documents.length) {
    const match = store.documents.find(d => d.short_code === code)
    if (match) selectedDoc.value = match
  }
})

const getNatureBadge = (nature) => {
  const colors = {
    activo: 'bg-blue-500',
    pasivo: 'bg-amber-500',
    capital: 'bg-emerald-500',
    ingreso: 'bg-teal-500',
    egreso: 'bg-rose-500',
    resultado: 'bg-purple-500',
    teoria: 'bg-indigo-500'
  }
  return colors[nature] || 'bg-slate-400'
}

const filteredSections = computed(() => {
  if (!selectedDoc.value?.sections) return []
  if (!search.value.trim()) return selectedDoc.value.sections

  const query = search.value.toLowerCase()
  return selectedDoc.value.sections.map(section => ({
    ...section,
    financial_items: section.financial_items.filter(item => 
      item.name?.toLowerCase().includes(query) ||
      item.code?.toLowerCase().includes(query) ||
      item.abbreviation?.toLowerCase().includes(query) ||
      item.definition?.toLowerCase().includes(query)
    )
  })).filter(section => section.financial_items.length > 0)
})
</script>
