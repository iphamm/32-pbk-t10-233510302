import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAuthStore } from '../auth';
import router from '../../router';

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
    vi.spyOn(router, 'push').mockImplementation(() => {});
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  it('should initialize with no user and not authenticated', () => {
    const authStore = useAuthStore();
    expect(authStore.user).toBeNull();
    expect(authStore.isAuthenticated).toBe(false);
  });

  it('should set user and isAuthenticated on successful login', async () => {
    vi.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ id: 1, username: 'testuser', password: 'password123', role: 'user' }]),
      })
    );

    const authStore = useAuthStore();
    const success = await authStore.login('testuser', 'password123');

    expect(success).toBe(true);
    expect(authStore.user).toEqual({ id: 1, username: 'testuser', password: 'password123', role: 'user' });
    expect(authStore.isAuthenticated).toBe(true);
    expect(localStorage.getItem('user')).toBe(JSON.stringify({ id: 1, username: 'testuser', password: 'password123', role: 'user' }));
    expect(router.push).toHaveBeenCalledWith({ name: 'Dashboard' });
  });

  it('should not set user and isAuthenticated on failed login (wrong credentials)', async () => {
    vi.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ id: 1, username: 'testuser', password: 'password123', role: 'user' }]),
      })
    );

    const authStore = useAuthStore();
    const success = await authStore.login('wronguser', 'wrongpass');

    expect(success).toBe(false);
    expect(authStore.user).toBeNull();
    expect(authStore.isAuthenticated).toBe(false);
    expect(localStorage.getItem('user')).toBeNull();
    expect(window.alert).toHaveBeenCalledWith('Incorrect username or password!');
  });

  it('should clear user and isAuthenticated on logout', () => {
    const authStore = useAuthStore();
    authStore.user = { id: 1, username: 'testuser' };
    authStore.isAuthenticated = true;
    localStorage.setItem('user', JSON.stringify({ id: 1, username: 'testuser' }));

    authStore.logout();

    expect(authStore.user).toBeNull();
    expect(authStore.isAuthenticated).toBe(false);
    expect(localStorage.getItem('user')).toBeNull();
    expect(router.push).toHaveBeenCalledWith({ name: 'Login' });
  });
});