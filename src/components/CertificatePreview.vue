<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h3 class="text-xl font-bold text-gray-800">Sertifikat Anda</h3>
      <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        Valid
      </span>
    </div>

    <!-- Certificate Render Area -->
    <div class="relative overflow-hidden rounded-xl border border-gray-200 shadow-inner bg-gray-100 aspect-[1.414/1] w-full flex items-center justify-center">
      <div 
        id="certificate-content" 
        class="relative bg-white w-[800px] h-[565px] origin-top-left flex-shrink-0"
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
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { generateCertificate } from '../utils/certificateGenerator';

const props = defineProps({
  student: {
    type: Object,
    required: true
  }
});

const scale = ref(1);
const downloading = ref(false);

const updateScale = () => {
  // Assuming the container is full width of its parent wrapper
  const wrapperWidth = Math.min(window.innerWidth - 64, 448); // 448 = max-w-lg (512) - p-8 * 2 (64)
  scale.value = wrapperWidth / 800;
};

onMounted(() => {
  updateScale();
  window.addEventListener('resize', updateScale);
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
