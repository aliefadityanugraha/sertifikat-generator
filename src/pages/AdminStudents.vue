<template>
  <AdminLayout>
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 class="text-2xl font-bold text-gray-900">Data Peserta</h1>
        <button @click="openModal('create')" class="inline-flex items-center px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-xl shadow-md transition-colors whitespace-nowrap">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Tambah Peserta
        </button>
      </div>

      <!-- Table Section -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left">
            <thead class="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
              <tr>
                <th scope="col" class="px-6 py-4 font-semibold">Nama Peserta</th>
                <th scope="col" class="px-6 py-4 font-semibold">Kelas</th>
                <th scope="col" class="px-6 py-4 font-semibold">No. Sertifikat</th>
                <th scope="col" class="px-6 py-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading" class="bg-white border-b border-gray-100">
                <td colspan="4" class="px-6 py-8 text-center text-gray-500">
                  <div class="inline-flex items-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Memuat data...
                  </div>
                </td>
              </tr>
              <tr v-else-if="students.length === 0" class="bg-white border-b border-gray-100">
                <td colspan="4" class="px-6 py-8 text-center text-gray-500">Belum ada data peserta.</td>
              </tr>
              <tr v-for="student in students" :key="student.id || student.nomor_sertifikat" class="bg-white border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td class="px-6 py-4 font-medium text-gray-900">{{ student.nama }}</td>
                <td class="px-6 py-4 text-gray-600">{{ student.kelas }}</td>
                <td class="px-6 py-4 text-gray-600 font-mono text-xs">{{ student.nomor_sertifikat }}</td>
                <td class="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                  <button @click="openModal('edit', student)" class="text-blue-600 hover:text-blue-800 px-2 py-1 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors inline-flex items-center">
                    Edit
                  </button>
                  <button @click="handleDelete(student)" class="text-red-600 hover:text-red-800 px-2 py-1 bg-red-50 hover:bg-red-100 rounded-lg transition-colors inline-flex items-center">
                    Hapus
                  </button>
                  <button @click="handleGenerate(student)" class="text-indigo-600 hover:text-indigo-800 px-2 py-1 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors inline-flex items-center">
                    Sertifikat
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
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
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden" @click.stop>
        <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 class="text-lg font-bold text-gray-900">{{ modalMode === 'create' ? 'Tambah Peserta' : 'Edit Peserta' }}</h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Nama Lengkap</label>
            <input v-model="form.nama" type="text" class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-1 focus:ring-gray-900 outline-none" required />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Kelas</label>
            <input v-model="form.kelas" type="text" class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-1 focus:ring-gray-900 outline-none" required />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">No. Sertifikat</label>
            <input v-model="form.nomor_sertifikat" type="text" class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-1 focus:ring-gray-900 outline-none" required />
          </div>
          
          <div class="pt-4 flex justify-end space-x-3">
            <button type="button" @click="closeModal" class="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 font-medium rounded-xl transition-colors">Batal</button>
            <button type="submit" :disabled="submitting" class="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-xl shadow-md transition-colors disabled:opacity-50 inline-flex items-center">
              <svg v-if="submitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Simpan
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

const students = ref([]);
const loading = ref(true);
const submitting = ref(false);

const isModalOpen = ref(false);
const modalMode = ref('create'); // 'create' or 'edit'
const form = reactive({ id: null, nama: '', kelas: '', nomor_sertifikat: '' });

const selectedStudentForCert = ref(null);
const certPreviewRef = ref(null);

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

const closeModal = () => {
  isModalOpen.value = false;
};

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
