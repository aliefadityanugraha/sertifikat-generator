<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900 p-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
      <div class="p-8">
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-900">Admin Login</h2>
          <p class="text-gray-500 mt-2 text-sm">Sistem Generate Sertifikat</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700">Username</label>
            <input 
              v-model="username"
              type="text" 
              class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all outline-none"
              placeholder="admin"
              required
            />
          </div>
          
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700">Password</label>
            <input 
              v-model="password"
              type="password" 
              class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <div v-if="error" class="text-red-500 text-sm font-medium text-center">
            {{ error }}
          </div>

          <button 
            type="submit"
            class="w-full py-3 px-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl shadow-lg transition-all"
          >
            Login to Dashboard
          </button>
        </form>
      </div>
      <div class="bg-gray-50 px-8 py-4 border-t border-gray-100 text-center">
        <router-link to="/" class="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">
          &larr; Kembali ke Halaman Publik
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../services/auth';

const router = useRouter();
const username = ref('');
const password = ref('');
const error = ref('');

const handleLogin = () => {
  if (login(username.value, password.value)) {
    router.push('/admin/dashboard');
  } else {
    error.value = 'Username atau password salah';
  }
};
</script>
