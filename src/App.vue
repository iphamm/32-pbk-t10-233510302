<template>
  <div class="page-container">
    <!-- Header -->
    <Header />

    <!-- Konten Utama dengan Sidebar dan Konten -->
    <div class="main-layout">
      <aside class="sidebar">
        <Sidebar />
      </aside>

      <main class="main-content">
        <router-view />
      </main>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import Footer from './components/Footer.vue'
</script>

<style scoped>.page-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-layout {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.sidebar {
  width: 250px;
  background-color: #375689;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.main-content {
  flex: 1; 
  background-color: #111827;
  color: white;
  padding: 20px;
  overflow-y: auto;
  min-width: 0; 
}
</style>
