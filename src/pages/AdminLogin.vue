<template>
  <div class="min-h-screen flex items-center justify-center bg-[#091122] p-4 relative overflow-hidden font-sans">
    <!-- Starry Night Background Accent -->
    <div class="absolute inset-0 z-0 bg-gradient-to-b from-[#02050f] via-[#091122] to-[#122240]"></div>
    
    <!-- Glowing Background blobs for ambiance -->
    <div class="absolute -top-32 -left-32 w-96 h-96 bg-indigo-900 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-pulse-slow"></div>
    <div class="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-900 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse-slow"></div>

    <div class="w-full max-w-md bg-slate-900/60 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/10 relative z-20">
      <div class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
      <div class="p-8 sm:p-10">
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-300 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(251,191,36,0.2)] border border-amber-400 overflow-hidden">
             <img src="/logo-smkn2-pgri.png" alt="logo" class="object-cover w-12 h-12" />
          </div>
          <h2 class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-wide uppercase">Admin Login</h2>
          <p class="text-amber-500/80 mt-2 text-xs font-semibold tracking-widest uppercase">Portal Sertifikat Pondok Ramadhan</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div class="space-y-2 relative">
            <label class="block text-sm font-semibold text-slate-300">Username</label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-amber-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
              <input 
                v-model="username"
                type="text" 
                class="w-full pl-12 pr-5 py-3.5 rounded-xl border border-slate-700/50 bg-slate-800/50 text-white placeholder-slate-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all backdrop-blur-sm shadow-inner outline-none"
                placeholder="Masukkan username"
                required
              />
            </div>
          </div>
          
          <div class="space-y-2 relative">
            <label class="block text-sm font-semibold text-slate-300">Password</label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-amber-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </div>
              <input 
                v-model="password"
                type="password" 
                class="w-full pl-12 pr-5 py-3.5 rounded-xl border border-slate-700/50 bg-slate-800/50 text-white placeholder-slate-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all backdrop-blur-sm shadow-inner outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div v-if="error" class="p-4 rounded-xl bg-red-900/30 text-red-200 border border-red-500/30 text-sm font-medium flex items-center shadow-inner">
             <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-3 flex-shrink-0 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
             {{ error }}
          </div>

          <button 
            type="submit"
            class="relative w-full py-4 px-4 mt-8 overflow-hidden bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:via-yellow-300 hover:to-amber-400 bg-[length:200%_auto] hover:bg-[position:right_center] text-slate-900 font-extrabold text-lg rounded-xl shadow-[0_0_20px_rgba(251,191,36,0.3)] transform hover:-translate-y-0.5 transition-all duration-500 group"
          >
            <div class="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
            <div class="relative flex justify-center items-center">
              <span class="tracking-wider">LOGIN SECURE</span>
            </div>
          </button>
        </form>
      </div>
      <div class="bg-slate-900/80 px-8 py-4 border-t border-slate-800 text-center backdrop-blur-md">
        <router-link to="/" class="text-sm font-semibold text-slate-400 hover:text-amber-400 transition-colors flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Kembali ke Publik Layanan
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

/**
 * Reactive state holding the inputted username.
 * @type {import('vue').Ref<string>}
 */
const username = ref('');

/**
 * Reactive state holding the inputted password.
 * @type {import('vue').Ref<string>}
 */
const password = ref('');

/**
 * Reactive state holding the error message to display if login fails.
 * @type {import('vue').Ref<string>}
 */
const error = ref('');

/**
 * Handles the form submission to authenticate the user and redirect upon success.
 */
const handleLogin = () => {
  if (login(username.value, password.value)) {
    router.push('/admin/dashboard');
  } else {
    error.value = 'Username atau password salah';
  }
};
</script>
