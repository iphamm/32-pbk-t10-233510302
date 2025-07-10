<template>
  <v-card class="mx-auto pa-8" width="400" elevation="8">
    <v-card-title class="text-h5 text-center mb-4">Login Perpustakaan</v-card-title>
    <v-form @submit.prevent="handleLogin">
      <v-text-field
        v-model="username"
        label="Username"
        prepend-inner-icon="mdi-account"
        required
        :rules="[v => !!v || 'Username is required']"
      ></v-text-field>

      <v-text-field
        v-model="password"
        label="Password"
        prepend-inner-icon="mdi-lock"
        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:append-inner="showPassword = !showPassword"
        required
        :rules="[v => !!v || 'Password is required']"
      ></v-text-field>

      <v-btn
        color="primary"
        block
        class="mt-4"
        type="submit"
        :loading="loading"
        :disabled="loading"
      >
        Login
      </v-btn>

      <v-alert v-if="error" type="error" dense class="mt-4">{{ error }}</v-alert>
    </v-form>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth';

const username = ref('');
const password = ref('');
const loading = ref(false);
const error = ref(null);
const showPassword = ref(false);

const authStore = useAuthStore();

const handleLogin = async () => {
  loading.value = true;
  error.value = null;

  if (!username.value || !password.value) {
    error.value = 'Please enter both username and password.';
    loading.value = false;
    return;
  }

  const success = await authStore.login(username.value, password.value);
  loading.value = false;
  if (!success) {
    error.value = 'Login failed. Please check your username and password.';
  }
};
</script>