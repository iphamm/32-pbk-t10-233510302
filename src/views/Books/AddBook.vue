<template>
  <v-container fluid>
    <v-card class="pa-6">
      <v-card-title class="text-h5 mb-4">Tambah Buku Baru</v-card-title>
      <v-form @submit.prevent="addBook">
        <v-text-field v-model="book.title" label="Judul Buku" required></v-text-field>
        <v-text-field v-model="book.author" label="Penulis" required></v-text-field>
        <v-text-field v-model="book.isbn" label="ISBN" required></v-text-field>
        <v-text-field v-model="book.publishedYear" label="Tahun Terbit" type="number" required></v-text-field>
        <v-text-field v-model="book.stock" label="Stok" type="number" required></v-text-field>
        
        <v-btn color="primary" type="submit" :loading="bookStore.loading" :disabled="bookStore.loading" class="mr-2">
          Tambah
        </v-btn>
        <v-btn color="grey" @click="router.back()">Batal</v-btn>
      </v-form>
      <v-alert v-if="bookStore.error" type="error" dense class="mt-4">{{ bookStore.error }}</v-alert>
      <v-alert v-if="successMessage" type="success" dense class="mt-4">{{ successMessage }}</v-alert>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useBookStore } from '../../stores/book';

const router = useRouter();
const bookStore = useBookStore();

const book = ref({
  title: '',
  author: '',
  isbn: '',
  publishedYear: null,
  stock: null,
});
const successMessage = ref(null);

const addBook = async () => {
  successMessage.value = null;
  const success = await bookStore.addBook(book.value);
  if (success) {
    successMessage.value = `Buku "${book.value.title}" berhasil ditambahkan!`;
    book.value = { title: '', author: '', isbn: '', publishedYear: null, stock: null };
  } else {
    // Error message already handled by bookStore.error
  }
};
</script>