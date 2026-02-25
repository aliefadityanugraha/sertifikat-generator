<template>
  <AdminLayout>
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div class="flex items-center justify-between">
            <h3 class="text-gray-500 font-medium">Total Peserta</h3>
            <div class="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <p class="text-3xl font-bold text-gray-900 mt-4">{{ loading ? '...' : students.length }}</p>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div class="flex items-center justify-between">
            <h3 class="text-gray-500 font-medium">Sertifikat Otomatis</h3>
            <div class="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p class="text-xl font-bold text-green-600 mt-4">Aktif</p>
        </div>
      </div>
      
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center mt-6">
        <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h2 class="text-xl font-bold text-gray-900 mb-2">Selamat Datang di Admin Panel</h2>
        <p class="text-gray-500 max-w-lg mx-auto mb-8 leading-relaxed">Kelola data peserta Pondok Ramadhan dan generate sertifikat dengan mudah melalui sistem ini. Seluruh data terintegrasi dengan Google Spreadsheet.</p>
        <router-link to="/admin/students" class="inline-flex items-center px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
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

const students = ref([]);
const loading = ref(true);

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
