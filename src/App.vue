<template>
  <div id="app" class="app-layout">
    <Header />
    <div class="body-layout">
      <Sidebar />
      <main class="main-content">
        <router-view />
      </main>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import Footer from './components/Footer.vue'
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.body-layout {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>
