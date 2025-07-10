<template>
  <v-container fluid>
    <v-card class="pa-6">
      <v-card-title class="d-flex justify-space-between align-center">
        Daftar Buku
        <v-btn color="primary" :to="{ name: 'AddBook' }">
          <v-icon left>mdi-plus</v-icon> Tambah Buku
        </v-btn>
      </v-card-title>

      <v-divider class="my-4"></v-divider>

      <v-alert v-if="bookStore.loading" type="info" prominent>Memuat daftar buku...</v-alert>
      <v-alert v-if="bookStore.error" type="error" prominent>{{ bookStore.error }}</v-alert>

      <v-data-table-server
        v-if="!bookStore.loading && !bookStore.error"
        :headers="headers"
        :items="bookStore.books"
        :items-per-page="itemsPerPage"
        :items-length="totalItems"
        class="elevation-1"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editBook(item.id)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteBookConfirm(item.id)"
          >
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <div v-if="totalItems === 0 && !bookStore.loading">
            Tidak ada buku yang ditemukan.
          </div>
        </template>
      </v-data-table-server>
    </v-card>

    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 text-center">Apakah Anda yakin ingin menghapus buku ini?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" text @click="closeDelete">Batal</v-btn>
          <v-btn color="red-darken-1" text @click="deleteBookItem">Hapus</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useBookStore } from '../../stores/book';

const router = useRouter();
const bookStore = useBookStore();

const dialogDelete = ref(false);
const bookToDelete = ref(null);

const itemsPerPage = ref(10);
const totalItems = ref(0); 

// PASTIKAN KEY INI SAMA PERSIS DENGAN NAMA PROPERTI DI OBJEK BUKU DI DB.JSON
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Judul', key: 'title' },
  { title: 'Penulis', key: 'author' },
  { title: 'ISBN', key: 'isbn' },
  { title: 'Tahun Terbit', key: 'publishedYear' },
  { title: 'Stok', key: 'stock' },
  { title: 'Tersedia', key: 'available' },
  { title: 'Aksi', key: 'actions', sortable: false },
];

const loadItems = async (options) => {
  console.log("loadItems dipanggil dengan options:", options);
  bookStore.loading = true; 
  bookStore.error = null; 
  
  try {
    const currentPage = options?.page || 1;
    const currentItemsPerPage = options?.itemsPerPage || itemsPerPage.value;
    const currentSortBy = options?.sortBy || [];

    const sortParam = currentSortBy.length > 0 ? `&_sort=${currentSortBy[0].key}&_order=${currentSortBy[0].order}` : '';
    const url = `http://localhost:3000/books?_page=${currentPage}&_limit=${currentItemsPerPage}${sortParam}`;
    
    console.log("URL Fetching:", url); 
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    const totalCount = parseInt(response.headers.get('X-Total-Count') || data.length); 
    
    bookStore.books = data; 
    totalItems.value = totalCount; 
    
    console.log("Data diterima:", data); 
    console.log("bookStore.books setelah update:", bookStore.books); 
    console.log("totalItems.value setelah update:", totalItems.value); 
    
  } catch (err) {
    bookStore.error = 'Gagal memuat buku: ' + err.message;
    console.error("Error di loadItems:", err); 
  } finally {
    bookStore.loading = false;
    console.log("bookStore.loading setelah selesai:", bookStore.loading);
  }
};

const editBook = (id) => {
  router.push({ name: 'EditBook', params: { id } });
};

const deleteBookConfirm = (id) => {
  bookToDelete.value = id;
  dialogDelete.value = true;
};

const deleteBookItem = async () => {
  const success = await bookStore.deleteBook(bookToDelete.value);
  if (success) {
    dialogDelete.value = false;
    alert('Buku berhasil dihapus!');
    await loadItems({ page: 1, itemsPerPage: itemsPerPage.value, sortBy: [] }); 
  } else {
    alert('Gagal menghapus buku: ' + bookStore.error);
  }
};

const closeDelete = () => {
  dialogDelete.value = false;
  bookToDelete.value = null;
};

onMounted(() => {
  console.log("Komponen Books.vue di-mount.");
  loadItems({ page: 1, itemsPerPage: itemsPerPage.value, sortBy: [] });
});
</script>