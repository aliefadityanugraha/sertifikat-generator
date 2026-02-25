import { ref } from 'vue';

export const isAuthenticated = ref(localStorage.getItem('admin_token') === 'true');

export function login(username, password) {
  if (username === 'indahsaptasari' && password === 'indahsaptasari123') {
    localStorage.setItem('admin_token', 'true');
    isAuthenticated.value = true;
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem('admin_token');
  isAuthenticated.value = false;
}
