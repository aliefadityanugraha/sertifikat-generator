<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-[#091122] p-4 pb-24 relative overflow-hidden font-sans">
    <!-- Starry Night Background Accent -->
    <div class="absolute inset-0 z-0 bg-gradient-to-b from-[#02050f] via-[#091122] to-[#122240]"></div>
    
    <!-- Moon SVG Ornament -->
    <div data-aos="fade-down" data-aos-duration="1500" class="absolute top-12 right-[-20px] md:right-24 z-0 opacity-70 animate-pulse-slow pointer-events-none">
      <svg width="150" height="150" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="#FDE68A" fill-opacity="0.9" />
      </svg>
    </div>

    <!-- Stars Overlay SVG Ornaments -->
    <div data-aos="zoom-in" data-aos-delay="300" class="absolute top-32 left-8 md:left-32 z-0 opacity-60 animate-bounce-slow pointer-events-none">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="#FCD34D" xmlns="http://www.w3.org/2000/svg" filter="drop-shadow(0 0 10px rgba(252, 211, 77, 0.6))">
         <polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" />
      </svg>
    </div>
    <div data-aos="zoom-in" data-aos-delay="500" class="absolute bottom-40 right-16 md:right-48 z-0 opacity-40 animate-bounce-slower pointer-events-none">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#FCD34D" xmlns="http://www.w3.org/2000/svg">
         <polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" />
      </svg>
    </div>
    <div data-aos="zoom-in" data-aos-delay="700" class="absolute top-1/4 left-1/4 z-0 opacity-30 animate-pulse pointer-events-none">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#FCD34D" xmlns="http://www.w3.org/2000/svg">
         <circle cx="12" cy="12" r="6" />
      </svg>
    </div>

    <!-- Lantern Left -->
    <div data-aos="fade-down" data-aos-duration="1500" data-aos-delay="200" class="absolute -top-4 left-6 md:left-32 z-10 opacity-90 animate-swing origin-top pointer-events-none drop-shadow-[0_10px_15px_rgba(252,211,77,0.2)]">
      <svg width="80" height="180" viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg">
        <line x1="50" y1="0" x2="50" y2="40" stroke="#FDE68A" stroke-width="2"/>
        <path d="M35 40 h30 l15 25 v50 l-15 25 h-30 l-15 -25 v-50 z" fill="#0F172A" stroke="#FDE68A" stroke-width="3"/>
        <path d="M20 65 h60 M20 115 h60" stroke="#FDE68A" stroke-width="2"/>
        <path d="M50 75 q15 20 0 40 q-15 -20 0 -40" fill="#FDE68A" opacity="0.8"/>
        <circle cx="50" cy="150" r="5" fill="#FDE68A"/>
        <path d="M45 155 l5 20 l5 -20" fill="#FDE68A"/>
      </svg>
    </div>
    
    <!-- Lantern Right -->
    <div data-aos="fade-down" data-aos-duration="1500" data-aos-delay="400" class="absolute -top-10 right-12 md:right-40 z-10 opacity-70 animate-swing-delay origin-top pointer-events-none drop-shadow-[0_10px_15px_rgba(252,211,77,0.2)]">
      <svg width="60" height="150" viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg">
        <line x1="50" y1="0" x2="50" y2="40" stroke="#FDE68A" stroke-width="2"/>
        <path d="M35 40 h30 l15 25 v50 l-15 25 h-30 l-15 -25 v-50 z" fill="#1E293B" stroke="#FDE68A" stroke-width="3"/>
        <path d="M20 65 h60 M20 115 h60" stroke="#FDE68A" stroke-width="2"/>
        <circle cx="50" cy="90" r="10" fill="#FDE68A" opacity="0.8"/>
        <circle cx="50" cy="150" r="4" fill="#FDE68A"/>
        <path d="M46 154 l4 15 l4 -15" fill="#FDE68A"/>
      </svg>
    </div>

    <!-- Glowing Background blobs for ambiance -->
    <div class="absolute -top-32 -left-32 w-96 h-96 bg-indigo-900 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-pulse-slow"></div>
    <div class="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-900 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse-slow animation-delay-2000"></div>

    <div class="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-900 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse-slow animation-delay-2000"></div>

    <!-- Hidden Admin Access Link -->
    <RouterLink to="/admin" class="absolute top-4 right-4 z-50 p-2 text-white/20 hover:text-amber-400/80 transition-colors opacity-50 hover:opacity-100" title="Admin Login">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    </RouterLink>

    <!-- Header / Brand Identity Top -->
    <div data-aos="zoom-out-down" data-aos-duration="1000" class="z-20 w-full mb-8 mt-12 md:mt-0 flex items-center justify-center pointer-events-none">
      <div class="flex items-center space-x-4 bg-slate-900/30 backdrop-blur-md px-6 py-3 rounded-full border border-white/5 shadow-[0_5px_15px_rgba(0,0,0,0.3)]">
        <!-- Logo SMK PGRI SVG Placeholder & Accent -->
        <div class="relative w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-300 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.3)] border border-amber-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-indigo-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
            <path d="M12 7l1.5 3h3.5l-2.5 2.5 1 3.5-3-1.5-3 1.5 1-3.5L8 10h3.5z" fill="#0F172A" stroke="none"></path>
          </svg>
        </div>
        <div class="flex flex-col text-left">
          <span class="text-white font-extrabold text-lg tracking-wide uppercase drop-shadow-md leading-tight">SMK PGRI 2 Kediri</span>
          <div class="flex items-center space-x-2">
            <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span class="text-amber-300 text-xs font-semibold uppercase tracking-widest">Pendidikan Agama Islam</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Card Content -->
    <div data-aos="zoom-in-up" data-aos-duration="1200" class="z-20 w-full max-w-lg bg-slate-900/60 backdrop-blur-xl rounded-[2rem] shadow-2xl overflow-hidden border border-white/10 relative">
      <div class="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
      
      <!-- Islamic Pattern Overlay for the card background -->
      <div class="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#FDE68A_1px,transparent_1px)] [background-size:20px_20px]"></div>

      <div class="p-8 sm:p-10 relative">
        <div class="text-center mb-10 relative">
          <!-- Mosque Silhouette subtle -->
          <div class="absolute -top-6 inset-x-0 flex justify-center opacity-10 pointer-events-none">
            <svg width="240" height="80" viewBox="0 0 240 80" xmlns="http://www.w3.org/2000/svg">
              <path d="M120 0 L135 25 H165 L175 45 V80 H65 V45 L75 25 H105 Z M35 45 C35 25 55 25 55 45 V80 H35 Z M185 45 C185 25 205 25 205 45 V80 H185 Z" fill="#FDE68A"/>
            </svg>
          </div>
          
          <h1 class="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 mb-3 drop-shadow-sm leading-tight font-serif tracking-wide">
            Sertifikat <br/> Pondok Ramadhan
          </h1>
          <p class="text-amber-200/70 font-semibold tracking-[0.2em] text-sm uppercase">1447 H / 2026 M</p>
        </div>

        <div v-if="!matchingStudents || matchingStudents.length === 0">
          <form @submit.prevent="checkCertificate" class="space-y-6">
            <div class="space-y-2 relative">
              <label class="block text-sm font-semibold text-slate-300">Nama Lengkap</label>
              <input 
                v-model="form.nama"
                type="text" 
                class="w-full px-5 py-3.5 rounded-xl border border-slate-700/50 bg-slate-800/50 text-white placeholder-slate-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all backdrop-blur-sm shadow-inner outline-none"
                placeholder="Masukkan nama lengkap"
                required
              />
            </div>
            
            <div class="space-y-2 relative">
              <label class="block text-sm font-semibold text-slate-300">Kelas</label>
              <div class="relative">
                <select 
                  v-model="form.kelas"
                  class="w-full px-5 py-3.5 rounded-xl border border-slate-700/50 bg-slate-800/50 text-white placeholder-slate-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all backdrop-blur-sm shadow-inner outline-none appearance-none cursor-pointer"
                  required
                >
                  <option value="" disabled selected>Pilih Kelas Anda</option>
                  <option v-for="k in kelasList" :key="k" :value="k" class="bg-slate-800 text-white">{{ k }}</option>
                </select>
                <!-- Custom Dropdown Icon -->
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-amber-400">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              :disabled="loading"
              class="w-full py-4 px-4 mt-6 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-900 font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.5)] transform hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:filter-none disabled:cursor-not-allowed flex justify-center items-center"
            >
              <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              {{ loading ? 'Mencari...' : 'Cari Sertifikat' }}
            </button>
          </form>

          <div v-if="error" class="mt-8 p-4 rounded-xl bg-red-900/30 text-red-200 border border-red-500/30 text-sm font-medium flex items-center shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-3 flex-shrink-0 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            {{ error }}
          </div>
        </div>

        <!-- Student Selection List -->
        <div v-else-if="!studentData" class="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div class="text-center mb-6">
            <h3 class="text-xl font-bold text-amber-300">Pilih Data Anda</h3>
            <p class="text-sm text-slate-400 mt-2">Ditemukan data yang sesuai. Silakan klik salah satu data Anda untuk konfirmasi sertifikat.</p>
          </div>
          
          <div class="grid grid-cols-1 gap-3 max-h-[300px] overflow-y-auto pr-2">
            <button 
              v-for="student in matchingStudents" :key="student.id || student.nomor_sertifikat"
              @click="selectStudent(student)"
              class="flex flex-col text-left p-4 rounded-xl border border-slate-700/70 bg-slate-800/80 hover:bg-slate-750 hover:border-amber-500/50 hover:shadow-[0_0_15px_rgba(251,191,36,0.15)] transition-all group"
            >
              <span class="font-bold text-white group-hover:text-amber-300 transition-colors text-lg">{{ student.nama }}</span>
              <span class="text-sm text-slate-400 mt-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
                {{ student.kelas }}
              </span>
            </button>
          </div>
          
          <button @click="resetSearch" class="w-full py-3.5 mt-4 bg-transparent hover:bg-slate-800/80 text-slate-300 text-sm font-semibold rounded-xl transition-all border border-slate-700 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Kembali
          </button>
        </div>
      </div>

      <div v-if="studentData" class="border-t border-slate-700/50 bg-slate-800/80 p-8 sm:p-10 relative">
        <div class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
        <div class="bg-white rounded-2xl p-6 shadow-2xl">
          <CertificatePreview :student="studentData" />
        </div>
      </div>
    </div>

    <!-- Footer Section -->
    <div data-aos="fade-up" data-aos-delay="800" data-aos-offset="-50" class="w-full mt-10 z-20 flex flex-col items-center justify-center text-center">
      <div class="px-8 py-4 bg-slate-900/30 backdrop-blur-md rounded-full border border-white/5">
        <p class="text-slate-400/80 text-xs uppercase tracking-[0.1em] font-medium leading-relaxed">
          &copy; 2026 Hak Cipta Dilindungi <span class="hidden sm:inline">|</span><br class="sm:hidden" /> Aplikasi Sertifikat Pondok Ramadhan
          <br />
          <span class="mt-2 inline-block pt-1 border-t border-slate-700/50">
            Dibuat dengan <span class="text-red-500 animate-pulse">❤️</span> oleh 
            <a href="https://github.com/aliefadityanugraha" target="_blank" rel="noopener noreferrer" class="text-amber-400 hover:text-amber-300 transition-colors font-bold underline decoration-amber-500/30 underline-offset-2">
              aliefadityanugraha
            </a>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { api } from '../services/api';
import CertificatePreview from '../components/CertificatePreview.vue';
import kelasData from '../data/kelas.json';

const form = reactive({ nama: '', kelas: '' });
const loading = ref(false);
const error = ref('');
const matchingStudents = ref(null);
const studentData = ref(null);
const kelasList = ref(kelasData);

const checkCertificate = async () => {
  loading.value = true;
  error.value = '';
  matchingStudents.value = null;
  studentData.value = null;
  
  try {
    const res = await api.findStudent(form.nama, form.kelas);
    if (res && res.length > 0) {
      matchingStudents.value = res;
    } else {
      error.value = 'Data tidak ditemukan. Pastikan nama dan kelas sesuai dengan yang didaftarkan.';
    }
  } catch (err) {
    error.value = 'Terjadi kesalahan saat mencari data.';
  } finally {
    loading.value = false;
  }
};

const selectStudent = (student) => {
  studentData.value = student;
};

const resetSearch = () => {
  matchingStudents.value = null;
  studentData.value = null;
};
</script>

<style>
@keyframes pulse-slow {
  0%, 100% { opacity: 0.7; transform: scale(1); }
  50% { opacity: 0.9; transform: scale(1.05); }
}
@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}
@keyframes bounce-slower {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
@keyframes swing {
  0%, 100% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
}
@keyframes swing-delay {
  0%, 100% { transform: rotate(5deg); }
  50% { transform: rotate(-5deg); }
}

.animate-pulse-slow {
  animation: pulse-slow 6s ease-in-out infinite;
}
.animate-bounce-slow {
  animation: bounce-slow 4s ease-in-out infinite;
}
.animate-bounce-slower {
  animation: bounce-slower 5s ease-in-out infinite;
}
.animate-swing {
  animation: swing 6s ease-in-out infinite;
}
.animate-swing-delay {
  animation: swing-delay 7s ease-in-out infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}

/* Custom Scrollbar for dark theme context generally */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #091122;
}
::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #475569;
}
</style>
