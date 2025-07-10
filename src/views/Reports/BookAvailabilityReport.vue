<template>
  <v-container fluid>
    <v-card class="pa-6">
      <v-card-title class="text-h5 mb-4">Laporan Ketersediaan Buku</v-card-title>
      <v-alert type="info" prominent>
        Laporan ini menyajikan informasi terkini mengenai status ketersediaan setiap buku di perpustakaan.
      </v-alert>
      <v-data-table
        :headers="headers"
        :items="bookAvailability"
        class="elevation-1 mt-4"
      ></v-data-table>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const headers = [
  { title: 'Judul Buku', key: 'title' },
  { title: 'Penulis', key: 'author' },
  { title: 'Total Stok', key: 'stock' },
  { title: 'Tersedia', key: 'available' },
  { title: 'Status', key: 'status' },
];

const bookAvailability = ref([
  { title: 'Harry Potter', author: 'J.K. Rowling', stock: 5, available: 3, status: 'Tersedia' },
  { title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', stock: 3, available: 0, status: 'Habis' },
  { title: 'The Hobbit', author: 'J.R.R. Tolkien', stock: 7, available: 7, status: 'Tersedia Penuh' },
]);
</script>