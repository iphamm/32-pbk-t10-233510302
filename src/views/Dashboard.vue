<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card class="pa-6 rounded-lg elevation-3">
          <v-card-title class="text-h5 text-primary">Selamat Datang di Dashboard Perpustakaan!</v-card-title>
          <v-card-text>
            <p class="text-body-2 text-grey-darken-1">
              Gunakan menu navigasi di sisi kiri untuk mengakses fitur manajemen buku, anggota, transaksi, dan laporan lebih lanjut.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-6"> 
      <v-col cols="12" sm="6" md="3">
        <v-card class="pa-4 text-center rounded-lg elevation-3" color="light-blue-lighten-5">
          <v-icon size="64" color="light-blue-darken-1">mdi-book-open-page-variant</v-icon>
          <v-card-title class="text-h6 mt-2 text-light-blue-darken-4">Total Buku</v-card-title>
          <v-card-text class="text-h4 font-weight-bold text-light-blue-darken-4">
            <span v-if="bookStore.loading">Memuat...</span>
            <span v-else-if="bookStore.error">Error</span>
            <span v-else>{{ bookStore.books.length }}</span>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="pa-4 text-center rounded-lg elevation-3" color="green-lighten-5">
          <v-icon size="64" color="green-darken-1">mdi-account-group</v-icon>
          <v-card-title class="text-h6 mt-2 text-green-darken-4">Total Anggota</v-card-title>
          <v-card-text class="text-h4 font-weight-bold text-green-darken-4">
            <span v-if="memberStore.loading">Memuat...</span>
            <span v-else-if="memberStore.error">Error</span>
            <span v-else>{{ memberStore.members.length }}</span>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="pa-4 text-center rounded-lg elevation-3" color="orange-lighten-5">
          <v-icon size="64" color="orange-darken-1">mdi-book-cross</v-icon>
          <v-card-title class="text-h6 mt-2 text-orange-darken-4">Buku Dipinjam</v-card-title>
          <v-card-text class="text-h4 font-weight-bold text-orange-darken-4">
            <span v-if="borrowingStore.loading">Memuat...</span>
            <span v-else-if="borrowingStore.error">Error</span>
            <span v-else>{{ borrowedBooksCount }}</span>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="pa-4 text-center rounded-lg elevation-3" color="purple-lighten-5">
          <v-icon size="64" color="purple-darken-1">mdi-book-check</v-icon>
          <v-card-title class="text-h6 mt-2 text-purple-darken-4">Buku Tersedia</v-card-title>
          <v-card-text class="text-h4 font-weight-bold text-purple-darken-4">
            <span v-if="bookStore.loading || borrowingStore.loading">Memuat...</span>
            <span v-else-if="bookStore.error || borrowingStore.error">Error</span>
            <span v-else>{{ availableBooksCount }}</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-6 justify-center"> 
      <v-col cols="12" md="6"> 
        <v-card class="pa-6 rounded-lg elevation-3">
          <v-card-title class="text-h6 text-secondary">Ringkasan Lainnya</v-card-title>
          <v-card-text>
            <v-list dense>
              <v-list-item>
                <template v-slot:prepend><v-icon color="success">mdi-account-plus</v-icon></template>
                <v-list-item-title>Anggota Baru Bulan Ini:</v-list-item-title>
                <v-list-item-subtitle>{{ memberStore.members.length }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <template v-slot:prepend><v-icon color="info">mdi-trending-up</v-icon></template>
                <v-list-item-title>Buku Paling Populer:</v-list-item-title>
                <v-list-item-subtitle>The Lord of the Rings (Dipinjam 15x)</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <template v-slot:prepend><v-icon color="warning">mdi-alert-circle</v-icon></template>
                <v-list-item-title>Peminjaman Terlambat:</v-list-item-title>
                <v-list-item-subtitle>2</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useBookStore } from '../stores/book';
import { useMemberStore } from '../stores/member';
import { useBorrowingStore } from '../stores/borrowing';

const bookStore = useBookStore();
const memberStore = useMemberStore();
const borrowingStore = useBorrowingStore();

const borrowedBooksCount = computed(() => {
  return borrowingStore.borrowings.filter(item => item.status === 'borrowed').length;
});

const availableBooksCount = computed(() => {
  return bookStore.books.reduce((sum, book) => sum + book.available, 0);
});

onMounted(async () => {
  await Promise.all([
    bookStore.fetchBooks(),
    memberStore.fetchMembers(),
    borrowingStore.fetchBorrowings()
  ]);
});
</script>