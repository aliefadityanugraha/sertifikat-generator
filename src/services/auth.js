import { ref } from 'vue';

/**
 * Pseudo signature key used for signing JWT tokens.
 * @constant {string}
 */
const SECRET_KEY = 'ponrom-secured-2026-smk-pgir2kediri-cuyyy'; // Pseudo signature key

/**
 * Generates a pseudo JSON Web Token (JWT) for admin authentication.
 * Uses a basic base64 encoding for header, payload, and signature logic.
 * Expires in 8 hours.
 * @returns {string} The generated JWT token string.
 */
function generateToken() {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  // Set expiration to 8 hours from now
  const payload = btoa(JSON.stringify({ 
    role: 'admin', 
    exp: Date.now() + (8 * 60 * 60 * 1000) 
  }));
  const signature = btoa(SECRET_KEY);
  return `${header}.${payload}.${signature}`;
}

/**
 * Verifies the validity of a given token string.
 * Checks structure, signature matching, and expiration time.
 * @param {string} token - The JWT token to verify.
 * @returns {boolean} True if the token is valid, otherwise false.
 */
function verifyToken(token) {
  if (!token) return false;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    
    // Verify signature part
    if (atob(parts[2]) !== SECRET_KEY) return false;

    // Verify expiration
    const payload = JSON.parse(atob(parts[1]));
    if (Date.now() > payload.exp) {
      return false; // Token expired
    }
    
    return true;
  } catch (e) {
    return false;
  }
}

// Initial check
const initialToken = localStorage.getItem('admin_token');
/**
 * Global reactive reference indicating whether the user is successfully authenticated.
 * Initialized during start up by verifying any token present in localStorage.
 * @type {import('vue').Ref<boolean>}
 */
export const isAuthenticated = ref(verifyToken(initialToken));

/**
 * Dynamically checks the token in localStorage and updates the isAuthenticated state.
 * Expected to be run before navigating to protected routes.
 * @returns {boolean} True if authenticated, false otherwise.
 */
export function checkAuth() {
  const token = localStorage.getItem('admin_token');
  const valid = verifyToken(token);
  isAuthenticated.value = valid;
  if (!valid) {
    localStorage.removeItem('admin_token');
  }
  return valid;
}

/**
 * Authenticates a user with given credentials.
 * Utilizes pseudo-security by comparing base64 encoded strings to prevent simple string matching.
 * @param {string} username - The provided username.
 * @param {string} password - The provided password.
 * @returns {boolean} True if login succeeds, false otherwise.
 */
export function login(username, password) {
  // Disguised credentials check
  const _u = btoa(username);
  const _p = btoa(password);
  
  // Base64 equivalent of indahsaptasari & indahsaptasari123
  if (_u === 'aW5kYWhzYXB0YXNhcmk=' && _p === 'aW5kYWhzYXB0YXNhcmkxMjM=') {
    const token = generateToken();
    localStorage.setItem('admin_token', token);
    isAuthenticated.value = true;
    return true;
  }
  return false;
}

/**
 * Clears the user's local session and removes authentication status.
 * @returns {void}
 */
export function logout() {
  localStorage.removeItem('admin_token');
  isAuthenticated.value = false;
}
