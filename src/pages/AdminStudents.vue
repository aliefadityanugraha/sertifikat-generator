<template>
  <AdminLayout>
    <div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 tracking-wide font-serif">Data Peserta</h1>
          <p class="text-slate-400 text-sm mt-1">Daftar siswa yang berhak mencetak sertifikat.</p>
        </div>
        <button @click="openModal('create')" class="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-900 font-bold rounded-xl shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_20px_rgba(251,191,36,0.5)] transform hover:-translate-y-0.5 transition-all whitespace-nowrap">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Tambah Peserta
        </button>
      </div>

      <!-- Search & Table Section -->
      <div class="bg-slate-900/60 backdrop-blur-xl shadow-xl border border-white/10 p-6 rounded-3xl relative overflow-hidden">
        <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>
        <div class="flex flex-col sm:flex-row mb-6 justify-between items-center gap-4 relative z-10">
           <div class="w-full sm:w-1/3 relative group">
             <input type="text" v-model="searchValue" placeholder="Cari nama peserta..." class="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-700/50 bg-slate-800/50 text-white placeholder-slate-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none text-sm shadow-inner transition-all backdrop-blur-sm" />
             <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-amber-400 transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
             </div>
           </div>
        </div>
        
        <div class="overflow-x-auto relative z-10">
          <Vue3EasyDataTable
            class="vue3-easy-data-table-dark"
            :headers="headers"
            :items="students"
            :loading="loading"
            :search-field="searchField"
            :search-value="searchValue"
            hide-footer-if-empty
            :rows-per-page="10"
          >
            <!-- Custom Slot for actions -->
            <template #item-aksi="student">
               <div class="flex justify-end space-x-2 whitespace-nowrap">
                  <button @click="openModal('edit', student)" class="text-blue-400 hover:text-white px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/30 border border-transparent hover:border-blue-500/40 rounded-lg transition-all inline-flex items-center text-xs font-semibold">
                    Edit
                  </button>
                  <button @click="handleDelete(student)" class="text-red-400 hover:text-white px-3 py-1.5 bg-red-500/10 hover:bg-red-500/30 border border-transparent hover:border-red-500/40 rounded-lg transition-all inline-flex items-center text-xs font-semibold">
                    Hapus
                  </button>
                  <button @click="handleGenerate(student)" class="text-amber-400 hover:text-slate-900 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-400 border border-amber-500/30 rounded-lg transition-all inline-flex items-center text-xs font-semibold shadow-[0_0_10px_rgba(251,191,36,0.1)] hover:shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                    Sertifikat
                  </button>
               </div>
            </template>
            <!-- Empty state -->
            <template #empty-message>
              <div class="py-12 text-center text-slate-500 flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 mb-3 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                Belum ada data peserta.
              </div>
            </template>
          </Vue3EasyDataTable>
        </div>
      </div>
      
      <!-- Hidden div for certificate rendering on admin side -->
      <div class="fixed top-[-9999px] left-[-9999px] opacity-0 pointer-events-none">
         <div v-if="selectedStudentForCert" class="w-[800px]">
            <CertificatePreview :student="selectedStudentForCert" ref="certPreviewRef" />
         </div>
      </div>
    </div>

    <!-- Modal Form -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
      <div class="bg-slate-900 rounded-3xl shadow-2xl border border-slate-700 w-full max-w-md overflow-hidden relative" @click.stop>
        <div class="absolute inset-[1px] bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none rounded-3xl"></div>
        <div class="px-6 py-5 border-b border-slate-800 flex items-center justify-between relative z-10">
          <h3 class="text-lg font-bold text-amber-400">{{ modalMode === 'create' ? 'Tambah Peserta Baru' : 'Perbarui Data Peserta' }}</h3>
          <button @click="closeModal" class="text-slate-400 hover:text-white transition-colors bg-slate-800 hover:bg-slate-700 p-1.5 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <form @submit.prevent="handleSubmit" class="p-6 space-y-5 relative z-10">
          <div class="space-y-1.5">
            <label class="block text-sm font-semibold text-slate-300">Nama Lengkap</label>
            <input v-model="form.nama" type="text" class="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-800 shrink-0 text-white placeholder-slate-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none transition-all shadow-inner" placeholder="Contoh: Budi Santoso" required />
          </div>
          <div class="space-y-1.5">
            <label class="block text-sm font-semibold text-slate-300">Kelas</label>
            <input v-model="form.kelas" type="text" class="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-800 shrink-0 text-white placeholder-slate-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none transition-all shadow-inner" placeholder="Contoh: X RPL 1" required />
          </div>
          <div class="space-y-1.5">
            <label class="block text-sm font-semibold text-slate-300">No. Sertifikat</label>
             <input v-model="form.nomor_sertifikat" type="text" class="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-800 shrink-0 text-white placeholder-slate-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none transition-all shadow-inner font-mono text-sm" placeholder="Otomatis atau Manual" required />
          </div>
          
          <div class="pt-4 flex justify-end space-x-3">
            <button type="button" @click="closeModal" class="px-5 py-2.5 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 font-semibold rounded-xl transition-all shadow-sm">Batal</button>
            <button type="submit" :disabled="submitting" class="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-900 font-bold rounded-xl shadow-[0_0_15px_rgba(251,191,36,0.2)] hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all disabled:opacity-50 inline-flex items-center whitespace-nowrap">
              <svg v-if="submitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-slate-900" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Simpan Data
            </button>
          </div>
        </form>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue';
import AdminLayout from '../components/AdminLayout.vue';
import CertificatePreview from '../components/CertificatePreview.vue';
import { api } from '../services/api';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

const students = ref([]);
const loading = ref(true);
const submitting = ref(false);

/**
 * Defines which field in the datatable should be used for searching.
 * @type {import('vue').Ref<string>}
 */
const searchField = ref("nama");

/**
 * Contains the active search string query.
 * @type {import('vue').Ref<string>}
 */
const searchValue = ref("");

/**
 * Headers configuration for Vue3EasyDataTable.
 * @type {Array<Object>}
 */
const headers = [
  { text: "NAMA PESERTA", value: "nama", sortable: true },
  { text: "KELAS", value: "kelas", sortable: true },
  { text: "NO. SERTIFIKAT", value: "nomor_sertifikat" },
  { text: "AKSI", value: "aksi" },
];

const isModalOpen = ref(false);

/**
 * The mode of the modal, 'create' or 'edit'.
 * @type {import('vue').Ref<string>}
 */
const modalMode = ref('create');

/**
 * The reactive form model holding the current student data.
 * @type {import('vue').UnwrapNestedRefs<{id: string|number|null, nama: string, kelas: string, nomor_sertifikat: string}>}
 */
const form = reactive({ id: null, nama: '', kelas: '', nomor_sertifikat: '' });

/**
 * Holds reference to the student currently selected to generate a certificate.
 * Used to render the hidden CertificatePreview.
 * @type {import('vue').Ref<Object|null>}
 */
const selectedStudentForCert = ref(null);
const certPreviewRef = ref(null);

/**
 * Retrieves the students from API and sets the datatable state.
 * @async
 * @returns {Promise<void>}
 */
const loadData = async () => {
  loading.value = true;
  try {
    const data = await api.getStudents();
    students.value = data.length ? data : [
      { id: 1, nama: 'Dummy Admin View', kelas: 'XII', nomor_sertifikat: '001/PR/XV/2026' }
    ]; // Inject a dummy if API is not working for visual representation
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

onMounted(loadData);

/**
 * Opens the create/edit modal.
 * @param {string} mode - "create" or "edit".
 * @param {Object|null} [student=null] - The student payload if in edit mode.
 */
const openModal = (mode, student = null) => {
  modalMode.value = mode;
  if (mode === 'edit' && student) {
    form.id = student.id || student.nomor_sertifikat;
    form.nama = student.nama;
    form.kelas = student.kelas;
    form.nomor_sertifikat = student.nomor_sertifikat;
  } else {
    form.id = null;
    form.nama = '';
    form.kelas = '';
    form.nomor_sertifikat = '';
  }
  isModalOpen.value = true;
};

/**
 * Closes the active modal form.
 */
const closeModal = () => {
  isModalOpen.value = false;
};

/**
 * Process form submitting to either create or update a student.
 * Uses the API and updates local datatable reactively.
 * @async
 * @returns {Promise<void>}
 */
const handleSubmit = async () => {
  submitting.value = true;
  try {
    if (modalMode.value === 'create') {
      await api.createStudent({ nama: form.nama, kelas: form.kelas, nomor_sertifikat: form.nomor_sertifikat });
      // update local
      students.value.push({ id: Date.now(), ...form });
    } else {
      await api.updateStudent({ id: form.id, nama: form.nama, kelas: form.kelas, nomor_sertifikat: form.nomor_sertifikat });
      // update local
      const idx = students.value.findIndex(s => s.id === form.id || s.nomor_sertifikat === form.id);
      if (idx !== -1) students.value[idx] = { ...form };
    }
    closeModal();
  } catch (err) {
    console.error('Save failed', err);
    alert('Gagal menyimpan data');
  } finally {
    submitting.value = false;
  }
};

/**
 * Process deletion of a specified student using prompt confirmation.
 * @async
 * @param {Object} student - The student object to delete.
 * @returns {Promise<void>}
 */
const handleDelete = async (student) => {
  if (confirm(`Yakin ingin menghapus ${student.nama}?`)) {
    try {
      await api.deleteStudent(student.id || student.nomor_sertifikat);
      students.value = students.value.filter(s => s !== student);
    } catch (err) {
      console.error('Delete failed', err);
      alert('Gagal menghapus data');
    }
  }
};

/**
 * Evaluates DOM update ticks and triggers the certificate rendering + PDF JS logic
 * bound to the hidden child component.
 * @async
 * @param {Object} student - The student to generate a certificate for.
 * @returns {Promise<void>}
 */
const handleGenerate = async (student) => {
  selectedStudentForCert.value = student;
  // wait for DOM to render the preview hidden component
  await nextTick();
  // We call the child component's download method
  if (certPreviewRef.value && certPreviewRef.value.download) {
    await certPreviewRef.value.download();
  } else {
    alert('Generator belum siap. Pastikan script html2canvas sudah terpanggil.');
  }
  setTimeout(() => {
    selectedStudentForCert.value = null;
  }, 1000);
};
</script>
