<template>
  <v-app>
    <Header @toggle-drawer="sidebarRef.toggleDrawer()" />
    <Sidebar ref="sidebarRef" />

    <v-main class="bg-grey-lighten-4 app-main-content">
      <v-container fluid class="py-6 px-8">
        <router-view />
      </v-container>
    </v-main>

    <Footer />
  </v-app>
</template>

<script setup>
import Header from '../components/Header.vue';
import Sidebar from '../components/Sidebar.vue';
import Footer from '../components/Footer.vue';
import { ref } from 'vue';

const sidebarRef = ref(null);
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden; 
}

.app-main-content {
  height: 100%; 
  display: flex;
  flex-direction: column;
  overflow-y: auto; 
}

.app-main-content > .v-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.v-data-table {
  overflow-x: auto; 
}
</style>