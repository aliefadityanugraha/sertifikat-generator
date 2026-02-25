<template>
  <div class="min-h-screen flex bg-gray-50">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-900 text-white flex flex-col hidden md:flex">
      <div class="h-16 flex items-center px-6 font-bold text-lg border-b border-gray-800">
        Admin Panel
      </div>
      <nav class="flex-1 px-4 py-6 space-y-2">
        <router-link to="/admin/dashboard" class="flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors" :class="[ $route.path === '/admin/dashboard' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white' ]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Dashboard
        </router-link>
        <router-link to="/admin/students" class="flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors" :class="[ $route.path === '/admin/students' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white' ]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Data Peserta
        </router-link>
      </nav>
      <div class="p-4 border-t border-gray-800">
        <button @click="handleLogout" class="flex w-full items-center justify-center px-4 py-3 text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col min-h-0 overflow-hidden">
      <!-- Mobile header -->
      <header class="h-16 flex items-center justify-between px-4 bg-white border-b border-gray-200 md:hidden">
        <div class="font-bold text-lg text-gray-900">Admin Panel</div>
        <button @click="handleLogout" class="p-2 text-gray-500 hover:text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </header>

      <nav class="bg-white border-b border-gray-200 px-4 py-3 md:hidden flex space-x-2 overflow-x-auto">
        <router-link to="/admin/dashboard" class="px-4 py-2 text-sm font-medium rounded-xl whitespace-nowrap" :class="[ $route.path === '/admin/dashboard' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600' ]">Dashboard</router-link>
        <router-link to="/admin/students" class="px-4 py-2 text-sm font-medium rounded-xl whitespace-nowrap" :class="[ $route.path === '/admin/students' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600' ]">Data Peserta</router-link>
      </nav>

      <!-- Page Content -->
      <div class="flex-1 overflow-auto p-4 md:p-8 bg-gray-50">
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { logout } from '../services/auth';

const router = useRouter();

const handleLogout = () => {
  logout();
  router.push('/admin');
};
</script>
