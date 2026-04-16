import axios from 'axios';

declare global {
    interface Window {
        axios: typeof axios;
    }
}

// Configure axios as the global HTTP client
window.axios = axios;

// Add default headers for Laravel CSRF protection and API communication
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Optional: Add CSRF token from meta tag if it exists
const token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] =
        token.getAttribute('content');
}

export default axios;
