<template>
  <AdminLayout>
    <div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 tracking-wide font-serif">Riwayat Unduhan</h1>
          <p class="text-slate-400 text-sm mt-1">Daftar riwayat peserta yang telah mencetak sertifikat.</p>
        </div>
        <button @click="loadData" class="inline-flex items-center px-4 py-2 border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium rounded-xl transition-colors shadow-sm whitespace-nowrap">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" :class="{'animate-spin text-amber-500': loading}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Segarkan Data
        </button>
      </div>

      <!-- Search & Table Section -->
      <div class="bg-slate-900/60 backdrop-blur-xl shadow-xl border border-white/10 p-6 rounded-3xl relative overflow-hidden">
        <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>
        <div class="flex flex-col sm:flex-row mb-6 justify-between items-center gap-4 relative z-10">
           <div class="w-full sm:w-1/3 relative group">
             <input type="text" v-model="searchValue" placeholder="Cari log nama atau nomor..." class="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-700/50 bg-slate-800/50 text-white placeholder-slate-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none text-sm shadow-inner transition-all backdrop-blur-sm" />
             <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-amber-400 transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
             </div>
           </div>
        </div>
        
        <div class="overflow-x-auto relative z-10">
          <Vue3EasyDataTable
            class="vue3-easy-data-table-dark"
            :headers="headers"
            :items="logs"
            :loading="loading"
            :search-field="searchField"
            :search-value="searchValue"
            hide-footer-if-empty
            :rows-per-page="10"
          >
            <!-- Formatter for date -->
            <template #item-waktu="log">
               <span class="text-xs font-mono text-slate-400">{{ formatDate(log.WAKTU || log.TIMESTAMP) }}</span>
            </template>
            <!-- Empty state -->
            <template #empty-message>
              <div class="py-12 text-center text-slate-500 flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 mb-3 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Belum ada riwayat unduhan.
              </div>
            </template>
          </Vue3EasyDataTable>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AdminLayout from '../components/AdminLayout.vue';
import { api } from '../services/api';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

const logs = ref([]);
const loading = ref(true);

/**
 * Array of fields inside the log object to apply the search filter on.
 * @type {import('vue').Ref<string[]>}
 */
const searchField = ref(["NAMA", "NOMOR", "KELAS", "STUDENT_ID"]);
const searchValue = ref("");

const headers = [
  { text: "NAMA PESERTA", value: "NAMA", sortable: true },
  { text: "KELAS", value: "KELAS", sortable: true },
  { text: "NO. SERTIFIKAT", value: "NOMOR" },
  { text: "WAKTU UNDUH", value: "waktu", sortable: true },
];

/**
 * Fetches the entire certificate generation log history from the API 
 * and binds it to the local reactive reference.
 * @async
 * @returns {Promise<void>}
 */
const loadData = async () => {
  loading.value = true;
  try {
    const data = await api.getLogs();
    logs.value = data || [];
  } catch (error) {
    console.error('Failed to load logs', error);
  } finally {
    loading.value = false;
  }
};

onMounted(loadData);

/**
 * Formats an ISO datetime string into a human-readable localized string.
 * @param {string} isoString - The string to format.
 * @returns {string} The styled date/time string, or a fallback if invalid.
 */
const formatDate = (isoString) => {
  if (!isoString) return '-';
  const d = new Date(isoString);
  if (isNaN(d)) return isoString;
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(d);
};
</script>
