<template>
  <v-container fluid>
    <v-card class="pa-6">
      <v-card-title class="text-h5 mb-4">Peminjaman Buku Baru</v-card-title>
      <v-form @submit.prevent="addBorrowing">
        <v-select
          v-model="borrowing.bookId"
          :items="availableBooks"
          item-title="title"
          item-value="id"
          label="Pilih Buku"
          required
          :loading="bookStore.loading"
          :disabled="bookStore.loading"
        ></v-select>

        <v-select
          v-model="borrowing.memberId"
          :items="memberStore.members"
          item-title="name"
          item-value="id"
          label="Pilih Anggota"
          required
          :loading="memberStore.loading"
          :disabled="memberStore.loading"
        ></v-select>

        <v-text-field
          v-model="borrowing.borrowDate"
          label="Tanggal Peminjaman"
          type="date"
          required
        ></v-text-field>

        <v-btn color="primary" type="submit" :loading="borrowingStore.loading" :disabled="borrowingStore.loading" class="mr-2">
          Catat Peminjaman
        </v-btn>
        <v-btn color="grey" @click="router.back()">Batal</v-btn>
      </v-form>
      <v-alert v-if="borrowingStore.error" type="error" dense class="mt-4">{{ borrowingStore.error }}</v-alert>
      <v-alert v-if="successMessage" type="success" dense class="mt-4">{{ successMessage }}</v-alert>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useBorrowingStore } from '../../stores/borrowing';
import { useBookStore } from '../../stores/book';
import { useMemberStore } from '../../stores/member';

const router = useRouter();
const borrowingStore = useBorrowingStore();
const bookStore = useBookStore();
const memberStore = useMemberStore();

const borrowing = ref({
  bookId: null,
  memberId: null,
  borrowDate: new Date().toISOString().split('T')[0],
  returnDate: null,
  status: 'borrowed',
});
const successMessage = ref(null);

const availableBooks = computed(() => {
  return bookStore.books.filter(book => book.available > 0);
});

const addBorrowing = async () => {
  successMessage.value = null;
  const success = await borrowingStore.addBorrowing(borrowing.value);
  if (success) {
    successMessage.value = 'Peminjaman berhasil dicatat!';
    borrowing.value = {
      bookId: null,
      memberId: null,
      borrowDate: new Date().toISOString().split('T')[0],
      returnDate: null,
      status: 'borrowed',
    };
    await bookStore.fetchBooks();
  } else {
    // Error message already handled by borrowingStore.error
  }
};

onMounted(() => {
  bookStore.fetchBooks();
  memberStore.fetchMembers();
});
</script>