<template>
  <v-container fluid>
    <v-card class="pa-6">
      <v-card-title class="text-h5 mb-4">Detail Pengembalian Buku</v-card-title>
      <v-alert v-if="borrowingStore.loading && !borrowing.id" type="info" prominent>Memuat detail peminjaman...</v-alert>
      <v-alert v-if="borrowingStore.error && !borrowing.id" type="error" prominent>{{ borrowingStore.error }}</v-alert>

      <div v-if="borrowing.id">
        <v-list dense>
          <v-list-item>
            <v-list-item-title>ID Peminjaman:</v-list-item-title>
            <v-list-item-subtitle>{{ borrowing.id }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>ID Buku:</v-list-item-title>
            <v-list-item-subtitle>{{ borrowing.bookId }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>ID Anggota:</v-list-item-title>
            <v-list-item-subtitle>{{ borrowing.memberId }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Tanggal Pinjam:</v-list-item-title>
            <v-list-item-subtitle>{{ borrowing.borrowDate }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Status:</v-list-item-title>
            <v-list-item-subtitle>{{ borrowing.status }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item v-if="borrowing.returnDate">
            <v-list-item-title>Tanggal Kembali:</v-list-item-title>
            <v-list-item-subtitle>{{ borrowing.returnDate }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>

        <v-btn
          v-if="borrowing.status === 'borrowed'"
          color="success"
          @click="confirmReturnBook"
          :loading="borrowingStore.loading"
          :disabled="borrowingStore.loading"
          class="mt-4 mr-2"
        >
          Konfirmasi Pengembalian
        </v-btn>
        <v-alert v-else type="success" class="mt-4">Buku ini sudah dikembalikan.</v-alert>
        <v-btn color="grey" @click="router.back()" class="mt-4">Kembali</v-btn>
      </div>

      <v-alert v-if="successMessage" type="success" dense class="mt-4">{{ successMessage }}</v-alert>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useBorrowingStore } from '../../stores/borrowing';

const route = useRoute();
const router = useRouter();
const borrowingStore = useBorrowingStore();

const borrowingId = route.params.id;
const borrowing = ref({});
const successMessage = ref(null);

const fetchBorrowing = async () => {
  const fetchedBorrowing = await borrowingStore.fetchBorrowingById(borrowingId);
  if (fetchedBorrowing) {
    borrowing.value = fetchedBorrowing;
  }
};

const confirmReturnBook = async () => {
  if (confirm('Apakah Anda yakin ingin mengkonfirmasi pengembalian buku ini?')) {
    successMessage.value = null;
    const success = await borrowingStore.returnBorrowing(borrowingId);
    if (success) {
      successMessage.value = 'Buku berhasil dikembalikan!';
      await fetchBorrowing();
    } else {
      // Error handled by store
    }
  }
};

onMounted(fetchBorrowing);
</script>