<template>
  <v-container fluid>
    <v-card class="pa-6">
      <v-card-title class="text-h5 mb-4">Tambah Anggota Baru</v-card-title>
      <v-form @submit.prevent="addMember">
        <v-text-field v-model="member.name" label="Nama Anggota" required></v-text-field>
        <v-text-field v-model="member.email" label="Email" type="email" required></v-text-field>
        <v-text-field v-model="member.phone" label="Nomor Telepon" required></v-text-field>
        <v-text-field v-model="member.address" label="Alamat"></v-text-field>
        
        <v-btn color="primary" type="submit" :loading="memberStore.loading" :disabled="memberStore.loading" class="mr-2">
          Tambah
        </v-btn>
        <v-btn color="grey" @click="router.back()">Batal</v-btn>
      </v-form>
      <v-alert v-if="memberStore.error" type="error" dense class="mt-4">{{ memberStore.error }}</v-alert>
      <v-alert v-if="successMessage" type="success" dense class="mt-4">{{ successMessage }}</v-alert>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMemberStore } from '../../stores/member';

const router = useRouter();
const memberStore = useMemberStore();

const member = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
});
const successMessage = ref(null);

const addMember = async () => {
  successMessage.value = null;
  const success = await memberStore.addMember(member.value);
  if (success) {
    successMessage.value = `Anggota "${member.value.name}" berhasil ditambahkan!`;
    member.value = { name: '', email: '', phone: '', address: '' };
  } else {
    // Error message already handled by memberStore.error
  }
};
</script>