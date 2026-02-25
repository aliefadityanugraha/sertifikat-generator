<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-[#091122] p-4 relative overflow-hidden font-sans">
    <!-- Background Accents -->
    <div class="absolute inset-0 z-0 bg-gradient-to-b from-[#02050f] via-[#091122] to-[#122240]"></div>
    <div class="absolute -top-32 -left-32 w-96 h-96 bg-indigo-900 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-pulse-slow"></div>
    <div class="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-900 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse-slow animation-delay-2000"></div>

    <div class="z-20 w-full max-w-md bg-slate-900/60 backdrop-blur-xl rounded-[2rem] shadow-2xl overflow-hidden border border-white/10 relative p-8 text-center">
      
      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-10">
        <svg class="animate-spin h-12 w-12 text-amber-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
        <h2 class="text-xl font-bold text-slate-200">Memverifikasi...</h2>
        <p class="text-slate-400 text-sm mt-2">Mengecek keaslian data pada server</p>
      </div>

      <!-- Valid Result -->
      <div v-else-if="isValid && student" class="py-6 animate-in zoom-in duration-500">
        <div class="w-24 h-24 mx-auto bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)] mb-6 border-4 border-emerald-900">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-emerald-400 mb-2">Sertifikat Valid!</h2>
        <p class="text-emerald-300 font-semibold tracking-widest text-xs uppercase mb-6">Telah Terdaftar Resmi</p>
        
        <div class="bg-slate-800/80 rounded-xl p-5 border border-slate-700/50 text-left space-y-3 shadow-inner">
          <div>
            <p class="text-slate-500 text-xs font-semibold uppercase">Nama Peserta</p>
            <p class="text-white font-bold text-lg">{{ student.nama }}</p>
          </div>
          <div>
            <p class="text-slate-500 text-xs font-semibold uppercase">Kelas</p>
            <p class="text-white font-medium">{{ student.kelas }}</p>
          </div>
          <div>
            <p class="text-slate-500 text-xs font-semibold uppercase">Nomor Sertifikat</p>
            <p class="text-amber-400 font-mono text-sm tracking-widest">{{ student.nomor_sertifikat }}</p>
          </div>
        </div>

        <button @click="$router.push('/')" class="mt-8 w-full py-3.5 px-4 bg-transparent hover:bg-emerald-900/30 text-emerald-400 text-sm font-bold border border-emerald-500/50 rounded-xl transition-all flex items-center justify-center tracking-wide">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          Kembali ke Beranda
        </button>
      </div>

      <!-- Invalid Result -->
      <div v-else class="py-6 animate-in zoom-in duration-500">
        <div class="w-24 h-24 mx-auto bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.4)] mb-6 border-4 border-red-900">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 class="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-200 to-red-400 mb-2">Sertifikat Tidak Valid</h2>
        <p class="text-slate-400 text-sm mb-6 leading-relaxed">
          Maaf, sistem kami tidak dapat menemukan data sertifikat ini. Ada kemungkinan dipalsukan atau data tersebut telah dihapus.
        </p>

        <button @click="$router.push('/')" class="mt-4 w-full py-3.5 px-4 bg-transparent hover:bg-slate-800 text-slate-300 text-sm font-bold border border-slate-700 rounded-xl transition-all">
          Kembali ke Beranda
        </button>
      </div>

    </div>

    <!-- Footer Section -->
    <div class="w-full mt-10 z-20 flex flex-col items-center justify-center text-center">
      <div class="px-8 py-4 bg-slate-900/30 backdrop-blur-md rounded-full border border-white/5">
        <p class="text-slate-400/80 text-xs uppercase tracking-[0.1em] font-medium leading-relaxed">
          &copy; 2026 Hak Cipta Dilindungi <span class="hidden sm:inline">|</span><br class="sm:hidden" /> Aplikasi Sertifikat Pondok Ramadhan
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { api } from '../services/api';

const route = useRoute();
const loading = ref(true);
const isValid = ref(false);
const student = ref(null);

onMounted(async () => {
  loading.value = true;
  const rawId = route.params.id;
  
  try {
    const allStudents = await api.getStudents();
    const found = allStudents.find(s => {
      const safeNumber = (s.nomor_sertifikat || '').replace(/\//g, '-');
      return safeNumber === rawId || s.nomor_sertifikat === rawId;
    });

    if (found) {
      isValid.value = true;
      student.value = found;
    } else {
      isValid.value = false;
    }
  } catch (error) {
    console.error('Verification Error:', error);
    isValid.value = false;
  } finally {
    loading.value = false;
  }
});
</script>
