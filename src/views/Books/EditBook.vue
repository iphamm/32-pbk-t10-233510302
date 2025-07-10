<template>
  <v-container fluid>
    <v-card class="pa-6">
      <v-card-title class="text-h5 mb-4">Edit Buku</v-card-title>
      <v-alert v-if="bookStore.loading && !book.id" type="info" prominent>Memuat data buku...</v-alert>
      <v-alert v-if="bookStore.error && !book.id" type="error" prominent>{{ bookStore.error }}</v-alert>

      <v-form v-if="book.id" @submit.prevent="updateBook">
        <v-text-field v-model="book.title" label="Judul Buku" required></v-text-field>
        <v-text-field v-model="book.author" label="Penulis" required></v-text-field>
        <v-text-field v-model="book.isbn" label="ISBN" required></v-text-field>
        <v-text-field v-model="book.publishedYear" label="Tahun Terbit" type="number" required></v-text-field>
        <v-text-field v-model="book.stock" label="Stok" type="number" required></v-text-field>
        <v-text-field v-model="book.available" label="Tersedia" type="number" required></v-text-field>

        <v-btn color="primary" type="submit" :loading="bookStore.loading" :disabled="bookStore.loading" class="mr-2">
          Update
        </v-btn>
        <v-btn color="grey" @click="router.back()">Batal</v-btn>
      </v-form>
      <v-alert v-if="bookStore.error && book.id" type="error" dense class="mt-4">{{ bookStore.error }}</v-alert>
      <v-alert v-if="successMessage" type="success" dense class="mt-4">{{ successMessage }}</v-alert>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useBookStore } from '../../stores/book';

const route = useRoute();
const router = useRouter();
const bookStore = useBookStore();

const bookId = route.params.id;

const book = ref({
  id: null,
  title: '',
  author: '',
  isbn: '',
  publishedYear: null,
  stock: null,
  available: null,
});

const successMessage = ref(null);

const fetchAndSetBook = async () => {
  const fetchedBook = await bookStore.fetchBookById(bookId);
  if (fetchedBook) {
    book.value = fetchedBook;
  } else {
    // Error handled by store
  }
};

const updateBook = async () => {
  successMessage.value = null;
  const success = await bookStore.updateBook(bookId, book.value);
  if (success) {
    successMessage.value = `Buku "${book.value.title}" berhasil diperbarui!`;
  } else {
    // Error handled by store
  }
};

onMounted(fetchAndSetBook);
</script>