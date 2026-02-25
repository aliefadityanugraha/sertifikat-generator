<template>
  <AdminLayout>
    <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div class="flex items-center justify-between">
        <div>
           <h1 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 tracking-wide font-serif">Dashboard</h1>
           <p class="text-slate-400 text-sm mt-1">Ringkasan Sistem Sertifikat Pondok Ramadhan</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-slate-900/60 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/10 relative overflow-hidden group">
          <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div class="flex items-center justify-between relative z-10">
            <h3 class="text-slate-400 font-semibold tracking-wide uppercase text-xs">Total Peserta</h3>
            <div class="w-12 h-12 bg-slate-800 text-indigo-400 rounded-xl flex items-center justify-center shadow-inner border border-slate-700/50">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <p class="text-4xl font-extrabold text-white mt-4 relative z-10">{{ loading ? '...' : students.length }}</p>
        </div>

        <div class="bg-slate-900/60 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/10 relative overflow-hidden group">
          <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div class="flex items-center justify-between relative z-10">
            <h3 class="text-slate-400 font-semibold tracking-wide uppercase text-xs">Sertifikat Otomatis</h3>
            <div class="w-12 h-12 bg-slate-800 text-emerald-400 rounded-xl flex items-center justify-center shadow-inner border border-slate-700/50">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p class="text-2xl font-bold text-emerald-400 mt-6 relative z-10 flex items-center">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse mr-2"></span>
            Aktif
          </p>
        </div>
      </div>
      
      <div class="bg-slate-900/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-8 sm:p-12 text-center mt-6 relative overflow-hidden">
        <div class="absolute inset-0 bg-[radial-gradient(#FDE68A_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.03] pointer-events-none"></div>
        <div class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>

        <div class="w-24 h-24 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(251,191,36,0.15)] border border-amber-500/30">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-white mb-3">Selamat Datang di Portal Admin</h2>
        <p class="text-slate-400 max-w-lg mx-auto mb-8 leading-relaxed">Kelola data peserta kegiatan Pondok Ramadhan dan tangani pencetakan sertifikat dengan mudah melalui sistem manajemen terpusat ini.</p>
        <router-link to="/admin/students" class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-900 font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.5)] transform hover:-translate-y-0.5">
          Kelola Data Peserta
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </router-link>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AdminLayout from '../components/AdminLayout.vue';
import { api } from '../services/api';

/**
 * Array of students populated from the API to generate analytics.
 * @type {import('vue').Ref<Array<Object>>}
 */
const students = ref([]);

/**
 * Indicates if the dashboard is actively fetching student data.
 * @type {import('vue').Ref<boolean>}
 */
const loading = ref(true);

/**
 * Lifecycle hook executing once the component mounts.
 * Fetches data from the API to show summary analytics.
 */
onMounted(async () => {
  try {
    students.value = await api.getStudents();
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
});
</script>
