import { defineStore } from 'pinia';
import router from '../router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: !!localStorage.getItem('user'),
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
  actions: {
    async login(username, password) {
      try {
        const response = await fetch('http://localhost:3000/users');
        if (!response.ok) {
          throw new Error('Failed to fetch user data.');
        }
        const users = await response.json();
        const foundUser = users.find(u => u.username === username && u.password === password);

        if (foundUser) {
          this.user = foundUser;
          this.isAuthenticated = true;
          localStorage.setItem('user', JSON.stringify(foundUser));
          router.push({ name: 'Dashboard' });
          return true;
        } else {
          alert('Incorrect username or password!');
          return false;
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login.');
        return false;
      }
    },
    logout() {
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem('user');
      router.push({ name: 'Login' });
    },
  },
});