<template>
  <v-container fluid>
    <v-card class="pa-6">
      <v-card-title class="text-h5 mb-4">Laporan Peminjaman</v-card-title>
      
      <v-alert type="info" prominent class="mb-4">
        Laporan ini menyediakan ringkasan aktivitas peminjaman buku. Gunakan opsi filter di bawah untuk menganalisis data berdasarkan rentang tanggal tertentu.
      </v-alert>

      <v-form class="mb-4" @submit.prevent="applyFilter">
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field label="Dari Tanggal" type="date" v-model="startDate"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field label="Sampai Tanggal" type="date" v-model="endDate"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4" class="d-flex align-center">
            <v-btn color="primary" type="submit" class="mt-2 mr-2">Filter Laporan</v-btn>
            <v-btn color="grey" class="mt-2" @click="resetFilter">Reset Filter</v-btn>
          </v-col>
        </v-row>
      </v-form>

      <v-alert v-if="false" type="info" prominent>Memuat laporan...</v-alert>
      <v-alert v-if="false" type="error" prominent>Terjadi kesalahan.</v-alert>

      <v-data-table
        :headers="headers"
        :items="reports" class="elevation-1"
      >
        <template v-slot:no-data>
          Tidak ada data laporan yang ditemukan.
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'; 

const headers = [
  { title: 'ID Peminjaman', key: 'id' },
  { title: 'Judul Buku', key: 'bookTitle' },
  { title: 'Nama Anggota', key: 'memberName' },
  { title: 'Tanggal Pinjam', key: 'borrowDate' },
  { title: 'Tanggal Kembali', key: 'returnDate' },
  { title: 'Status', key: 'status' },
];

const reports = ref([
  { id: 1, bookTitle: 'The Lord of the Rings', memberName: 'Budi Santoso', borrowDate: '2024-06-15', returnDate: null, status: 'Dipinjam' },
  { id: 2, bookTitle: 'Harry Potter', memberName: 'Siti Aminah', borrowDate: '2024-07-01', returnDate: null, status: 'Dipinjam' },
  { id: 3, bookTitle: 'The Hobbit', memberName: 'Agus Salim', borrowDate: '2024-05-10', returnDate: '2024-05-20', status: 'Dikembalikan' },
]);

const startDate = ref('');
const endDate = ref('');

const applyFilter = () => {
  console.log('Apply filter clicked:', startDate.value, endDate.value);
};

const resetFilter = () => {
  startDate.value = '';
  endDate.value = '';
  console.log('Reset filter clicked');
};
</script>