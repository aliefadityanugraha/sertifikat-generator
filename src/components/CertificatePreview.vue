<template>
  <div class="space-y-3">
    <div class="flex items-center justify-between">
      <h3 class="text-xl font-bold text-white">Sertifikat Anda</h3>
      <span class="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-bold flex items-center shadow-[0_0_10px_rgba(16,185,129,0.2)]">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        Valid
      </span>
    </div>

    <!-- Certificate Render Area -->
    <div ref="containerRef" class="relative overflow-hidden rounded-xl border border-gray-200 shadow-inner bg-gray-100 aspect-[1.414/1] w-full">
      <div 
        id="certificate-content" 
        class="absolute top-0 left-0 bg-white w-[800px] h-[565px] origin-top-left"
        :style="{ transform: `scale(${scale})` }"
      >
        <img src="../assets/template.png" class="absolute inset-0 w-full h-full object-cover z-0" @error="handleImageError" />
        
        <!-- Text Overlay -->
        <div class="absolute inset-0 z-10 flex flex-col items-center justify-center">
          <div class="mt-20 text-center w-full px-12">
            <p class="text-[40px] font-bold text-gray-800 font-serif leading-tight tracking-[0.05em]">{{ student.nama || 'Nama Peserta' }}</p>
            <p class="text-[22px] font-medium text-gray-600 mt-4 tracking-widest font-sans">{{ student.kelas || 'X MIPA 1' }}</p>
          </div>
          <div class="absolute bottom-16 w-full text-center">
            <p class="text-[14px] text-gray-500 font-medium">No: {{ student.nomor_sertifikat || '001/PR/XV/2026' }}</p>
          </div>

          <!-- QR Code Verification -->
          <!-- <div class="absolute bottom-8 right-12 z-20 flex flex-col items-center">
            <img v-if="qrCodeDataUrl" :src="qrCodeDataUrl" class="w-16 h-16 sm:w-20 sm:h-20 p-1 bg-white border border-gray-200 rounded shadow-sm" alt="QR Verifikasi" />
            <p v-if="qrCodeDataUrl" class="text-[7px] sm:text-[8px] tracking-[0.15em] font-bold text-gray-500 mt-1 uppercase">VERIFIED</p>
          </div> -->
        </div>
      </div>
    </div>

    <button 
      @click="download" 
      :disabled="downloading"
      class="w-full py-3 px-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl shadow-lg flex items-center justify-center transition-all disabled:opacity-50"
    >
      <svg v-if="!downloading" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
      <svg v-else class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
      {{ downloading ? 'Memproses...' : 'Download PDF' }}
    </button>

    <!-- Back Button -->
    <button @click="$emit('back')" class="w-full py-3.5 bg-transparent hover:bg-slate-700/50 text-slate-300 text-sm font-semibold rounded-xl transition-all border border-slate-600 flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
      Kembali ke Beranda
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { generateCertificate } from '../utils/certificateGenerator';
import { api } from '../services/api';
import QRCode from 'qrcode';

const props = defineProps({
  student: {
    type: Object,
    required: true
  }
});

defineEmits(['back']);

const scale = ref(1);
const downloading = ref(false);
const qrCodeDataUrl = ref(null);
const containerRef = ref(null);

const updateScale = () => {
  if (containerRef.value) {
    // Dynamically calculate based on exact container width
    scale.value = containerRef.value.offsetWidth / 800;
  } else {
    // Fallback if not evaluated yet
    const wrapperWidth = Math.min(window.innerWidth - 64, 448);
    scale.value = wrapperWidth / 800;
  }
};

onMounted(async () => {
  updateScale();
  window.addEventListener('resize', updateScale);
  
  // Record log directly upon certificate being rendered / generated on screen
  api.recordGenerate(props.student).catch(e => console.warn('Record log error:', e));
  
  try {
    const safeNumber = (props.student.nomor_sertifikat || '001/PR/XV/2026').replace(/\//g, '-');
    const verifyUrl = `https://sertifikat-ramadhan-smkpgri2kdr.example.com/verify/${safeNumber}`;
    qrCodeDataUrl.value = await QRCode.toDataURL(verifyUrl, {
      margin: 1,
      color: { dark: '#1E293B', light: '#FFFFFF' }
    });
  } catch (err) {
    console.error('QR Generate Error', err);
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', updateScale);
});

const handleImageError = (e) => {
  e.target.style.display = 'none';
  e.target.parentElement.classList.add('bg-indigo-50');
};

const download = async () => {
  downloading.value = true;
  try {
    // Reset scale to 1 temporarily to ensure high-quality render
    const origScale = scale.value;
    scale.value = 1;
    
    // allow Vue to update DOM
    await new Promise(r => setTimeout(r, 100)); 

    await generateCertificate('certificate-content', props.student, true);
    
    scale.value = origScale;
  } catch (err) {
    console.error('Download fail:', err);
    alert('Gagal mendownload sertifikat.');
  } finally {
    downloading.value = false;
  }
};
defineExpose({
  download
});
</script>
