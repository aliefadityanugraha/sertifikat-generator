<template>
  <div class="min-h-screen flex bg-[#091122] font-sans">
    <!-- Sidebar -->
    <aside class="w-64 bg-slate-900/80 backdrop-blur-xl text-white flex flex-col hidden md:flex border-r border-slate-800 relative z-20">
      <div class="h-16 flex items-center px-6 font-bold text-lg border-b border-slate-800/80">
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500 uppercase tracking-widest text-sm">Admin Panel</span>
      </div>
      <nav class="flex-1 px-4 py-6 space-y-2">
        <router-link to="/admin/dashboard" class="flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all" :class="[ $route.path === '/admin/dashboard' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_15px_rgba(251,191,36,0.1)]' : 'text-slate-400 hover:bg-slate-800 hover:text-white' ]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Dashboard
        </router-link>
        <router-link to="/admin/students" class="flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all" :class="[ $route.path === '/admin/students' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_15px_rgba(251,191,36,0.1)]' : 'text-slate-400 hover:bg-slate-800 hover:text-white' ]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Data Peserta
        </router-link>
        <router-link to="/admin/logs" class="flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all" :class="[ $route.path === '/admin/logs' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_15px_rgba(251,191,36,0.1)]' : 'text-slate-400 hover:bg-slate-800 hover:text-white' ]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          Riwayat Unduhan
        </router-link>
      </nav>
      <div class="p-4 border-t border-slate-800">
        <button @click="handleLogout" class="flex w-full items-center justify-center px-4 py-3 text-sm font-bold text-red-400 hover:text-white hover:bg-red-500/20 rounded-xl transition-all border border-transparent hover:border-red-500/30">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col min-h-0 overflow-hidden relative">
      <!-- Background elements for main content area -->
      <div class="absolute inset-0 z-0 bg-gradient-to-b from-[#02050f] via-[#091122] to-[#122240] pointer-events-none"></div>
      <div class="absolute -top-32 -left-32 w-96 h-96 bg-indigo-900 rounded-full mix-blend-screen filter blur-[150px] opacity-30 animate-pulse-slow pointer-events-none z-0"></div>

      <!-- Mobile header -->
      <header class="h-16 flex items-center justify-between px-4 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 md:hidden z-20 shadow-md">
        <div class="font-bold text-lg text-amber-400 uppercase tracking-widest text-sm">Admin Panel</div>
        <button @click="handleLogout" class="p-2 text-slate-400 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </header>

      <nav class="bg-slate-900/50 backdrop-blur-md border-b border-slate-800 px-4 py-3 md:hidden flex space-x-2 overflow-x-auto z-20">
        <router-link to="/admin/dashboard" class="px-4 py-2 text-sm font-medium rounded-xl whitespace-nowrap transition-all" :class="[ $route.path === '/admin/dashboard' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-slate-800/80 text-slate-400' ]">Dashboard</router-link>
        <router-link to="/admin/students" class="px-4 py-2 text-sm font-medium rounded-xl whitespace-nowrap transition-all" :class="[ $route.path === '/admin/students' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-slate-800/80 text-slate-400' ]">Data Peserta</router-link>
        <router-link to="/admin/logs" class="px-4 py-2 text-sm font-medium rounded-xl whitespace-nowrap transition-all" :class="[ $route.path === '/admin/logs' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-slate-800/80 text-slate-400' ]">Riwayat Unduhan</router-link>
      </nav>

      <!-- Page Content -->
      <div class="flex-1 overflow-auto p-4 md:p-8 bg-transparent z-10 relative">
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { logout } from '../services/auth';

const router = useRouter();

/**
 * Triggers the log out process, clears the internal session,
 * and navigates the user back to the admin portal login screen.
 */
const handleLogout = () => {
  logout();
  router.push('/admin');
};
</script>
