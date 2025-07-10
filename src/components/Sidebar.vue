<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    :width="285"                  
    :mobile-breakpoint="960"      
    temporary                  
  >
    <v-list-item class="py-2">
      <v-list-item-title class="text-h6 text-primary">
          Admin Panel
        </v-list-item-title>
      </v-list-item>

    <v-list-item class="py-2">
      <template v-slot:prepend>
        <v-avatar size="60">
          <v-icon size="60">mdi-account-circle</v-icon>
        </v-avatar>
      </template>
      <v-list-item-subtitle>
        Halo, {{ authStore.user ? authStore.user.role : 'Guest' }}!
      </v-list-item-subtitle>
      <v-list-item-title class="font-weight-bold">
          {{ authStore.user ? authStore.user.username : 'Pengguna' }}
        </v-list-item-title>
      </v-list-item>
    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" to="/" exact></v-list-item>

      <v-list-group value="Buku">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" prepend-icon="mdi-book" title="Buku"></v-list-item>
        </template>
        <v-list-item prepend-icon="mdi-format-list-bulleted" title="Daftar Buku" to="/books"></v-list-item>
        <v-list-item prepend-icon="mdi-book-plus" title="Tambah Buku" to="/books/add"></v-list-item>
      </v-list-group>

      <v-list-group value="Anggota">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" prepend-icon="mdi-account-group" title="Anggota"></v-list-item>
        </template>
        <v-list-item prepend-icon="mdi-account-multiple" title="Daftar Anggota" to="/members"></v-list-item>
        <v-list-item prepend-icon="mdi-account-plus" title="Tambah Anggota" to="/members/add"></v-list-item>
      </v-list-group>

      <v-list-group value="Transaksi">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" prepend-icon="mdi-repeat-variant" title="Transaksi"></v-list-item>
        </template>
        <v-list-item prepend-icon="mdi-history" title="Daftar Peminjaman" to="/transactions"></v-list-item>
        <v-list-item prepend-icon="mdi-hand-coin" title="Peminjaman Baru" to="/transactions/new"></v-list-item>
      </v-list-group>

      <v-list-group value="Laporan">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" prepend-icon="mdi-chart-bar" title="Laporan"></v-list-item>
        </template>
        <v-list-item prepend-icon="mdi-chart-line" title="Laporan Peminjaman" to="/reports/borrowing"></v-list-item>
        <v-list-item prepend-icon="mdi-book-search" title="Ketersediaan Buku" to="/reports/book-availability"></v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useDisplay } from 'vuetify';
import { useAuthStore } from '../stores/auth';

const { mobile } = useDisplay();
const drawer = ref(!mobile.value); 
const authStore = useAuthStore();

watch(mobile, (newVal) => {
  if (!newVal) {
    drawer.value = true;
  } else {
    drawer.value = false;
  }
});

defineExpose({
  toggleDrawer() {
    drawer.value = !drawer.value;
  },
});
</script>