<template>
  <v-container fluid>
    <v-card class="pa-6">
      <v-card-title class="d-flex justify-space-between align-center">
        Daftar Peminjaman
        <v-btn color="primary" :to="{ name: 'NewBorrowing' }">
          <v-icon left>mdi-plus</v-icon> Peminjaman Baru
        </v-btn>
      </v-card-title>
      <v-divider class="my-4"></v-divider>

      <v-alert v-if="borrowingStore.loading" type="info" prominent>Memuat daftar peminjaman...</v-alert>
      <v-alert v-if="borrowingStore.error" type="error" prominent>{{ borrowingStore.error }}</v-alert>

      <v-data-table
        v-if="!borrowingStore.loading && !borrowingStore.error"
        :headers="headers"
        :items="borrowingStore.borrowings"
        class="elevation-1 mt-4"
      >
        <template v-slot:item.status="{ item }">
          <v-chip :color="item.status === 'borrowed' ? 'orange' : 'green'" dark small>
            {{ item.status === 'borrowed' ? 'Dipinjam' : 'Dikembalikan' }}
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn
            v-if="item.status === 'borrowed'"
            small
            color="success"
            class="mr-2"
            @click="returnBorrowingConfirm(item.id)"
          >
            Kembalikan
          </v-btn>
          <v-icon
            v-else
            small
            color="grey"
          >
            mdi-check-all
          </v-icon>
        </template>
        <template v-slot:no-data>
          Tidak ada peminjaman yang ditemukan.
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialogReturn" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 text-center">Apakah Anda yakin ingin mengembalikan buku ini?</v-card-title>
        <v-card-text>
            Mengembalikan peminjaman dengan ID: {{ borrowingToReturnId }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" text @click="closeReturn">Batal</v-btn>
          <v-btn color="success-darken-1" text @click="returnBorrowingItem">Kembalikan</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useBorrowingStore } from '../../stores/borrowing';

const router = useRouter();
const borrowingStore = useBorrowingStore();

const dialogReturn = ref(false);
const borrowingToReturnId = ref(null);

const headers = [
  { title: 'ID Peminjaman', key: 'id' },
  { title: 'ID Buku', key: 'bookId' },
  { title: 'ID Anggota', key: 'memberId' },
  { title: 'Tanggal Pinjam', key: 'borrowDate' },
  { title: 'Tanggal Kembali', key: 'returnDate' },
  { title: 'Status', key: 'status' },
  { title: 'Aksi', key: 'actions', sortable: false },
];

const returnBorrowingConfirm = (id) => {
  borrowingToReturnId.value = id;
  dialogReturn.value = true;
};

const returnBorrowingItem = async () => {
  const success = await borrowingStore.returnBorrowing(borrowingToReturnId.value);
  if (success) {
    dialogReturn.value = false;
    alert('Buku berhasil dikembalikan!');
    await borrowingStore.fetchBorrowings();
  } else {
    alert('Gagal mengembalikan buku: ' + borrowingStore.error);
  }
};

const closeReturn = () => {
  dialogReturn.value = false;
  borrowingToReturnId.value = null;
};

onMounted(() => {
  borrowingStore.fetchBorrowings();
});
</script>