<template>
  <div>
    <h1>Daftar Anggota</h1>
    <RouterLink to="/members/add">Tambah Anggota</RouterLink>

    <ul>
      <li v-for="member in members" :key="member.id">
        {{ member.name }}
        <RouterLink :to="`/members/edit/${member.id}`">Edit</RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
const members = [
  { id: 1, name: 'Dina Kartika' },
  { id: 2, name: 'Budi Prasetyo' }
]
</script>
