<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
    
    <v-toolbar-title>
      <span class="d-none d-sm-flex">Sistem Manajemen Perpustakaan</span>
      <span class="d-flex d-sm-none">Perpustakaan</span> 
    </v-toolbar-title>

    <v-spacer></v-spacer>
    <v-btn color="error" @click="logout">
      <v-icon left class="d-none d-sm-flex">mdi-logout</v-icon>
      <span class="d-none d-sm-flex">Logout</span>
      <v-icon class="d-flex d-sm-none">mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';

const emit = defineEmits(['toggle-drawer']);

const toggleDrawer = () => {
  emit('toggle-drawer');
};

const authStore = useAuthStore();
const logout = () => {
  authStore.logout();
};
</script>