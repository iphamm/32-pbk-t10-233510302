<template>
  <nav class="sidebar">
    <ul>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/">Beranda</router-link></li>
        <li><router-link to="/books">Buku</router-link></li>
        <li><router-link to="/members">Anggota</router-link></li>
        <li><router-link to="/transactions">Transaksi</router-link></li>
        <li><router-link to="/reports">Laporan</router-link></li>
    </ul>
  </nav>
</template>

<script setup>
</script>

<style scoped>
.sidebar {
  width: 200px;
  background-color: #eee;
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin-bottom: 10px;
}

.router-link-active {
  font-weight: bold;
  color: #4a90e2;
}
</style>
