export const authApi = {
  async login(credentials) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Login error:', data); // 👈 CHECK BACKEND ERROR MESSAGE
      throw new Error(data.message || data.error || 'Login failed');
    }

    // ✅ STORE TOKEN
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  },

  async register(userData) {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || data.error || 'Register failed');
    }

    return data;
  },

  logout() {
    localStorage.removeItem('token');
  },

  isLoggedIn() {
    return !!localStorage.getItem('token');
  },

  getToken() {
    return localStorage.getItem('token');
  }
};