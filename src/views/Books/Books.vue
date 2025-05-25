<template>
  <div>
    <h1>Daftar Buku</h1>
    <RouterLink to="/books/add">Tambah Buku</RouterLink>
    
    <!-- Contoh dummy daftar buku -->
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.title }}
        <RouterLink :to="`/books/edit/${book.id}`">Edit</RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
const books = [
  { id: 1, title: 'Belajar Vue' },
  { id: 2, title: 'Pemrograman Lanjut' }
]
</script>
