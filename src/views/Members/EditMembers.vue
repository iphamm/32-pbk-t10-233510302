<template>
  <v-container fluid>
    <v-card class="pa-6">
      <v-card-title class="text-h5 mb-4">Edit Anggota</v-card-title>
      <v-alert v-if="memberStore.loading && !member.id" type="info" prominent>Memuat data anggota...</v-alert>
      <v-alert v-if="memberStore.error && !member.id" type="error" prominent>{{ memberStore.error }}</v-alert>

      <v-form v-if="member.id" @submit.prevent="updateMember">
        <v-text-field v-model="member.name" label="Nama Anggota" required></v-text-field>
        <v-text-field v-model="member.email" label="Email" type="email" required></v-text-field>
        <v-text-field v-model="member.phone" label="Nomor Telepon" required></v-text-field>
        <v-text-field v-model="member.address" label="Alamat"></v-text-field>

        <v-btn color="primary" type="submit" :loading="memberStore.loading" :disabled="memberStore.loading" class="mr-2">
          Update
        </v-btn>
        <v-btn color="grey" @click="router.back()">Batal</v-btn>
      </v-form>
      <v-alert v-if="memberStore.error && member.id" type="error" dense class="mt-4">{{ memberStore.error }}</v-alert>
      <v-alert v-if="successMessage" type="success" dense class="mt-4">{{ successMessage }}</v-alert>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMemberStore } from '../../stores/member';

const route = useRoute();
const router = useRouter();
const memberStore = useMemberStore();

const memberId = route.params.id;

const member = ref({
  id: null,
  name: '',
  email: '',
  phone: '',
  address: '',
});

const successMessage = ref(null);

const fetchAndSetMember = async () => {
  const fetchedMember = await memberStore.fetchMemberById(memberId);
  if (fetchedMember) {
    member.value = fetchedMember;
  } else {
    // Error handled by store
  }
};

const updateMember = async () => {
  successMessage.value = null;
  const success = await memberStore.updateMember(memberId, member.value);
  if (success) {
    successMessage.value = `Anggota "${member.value.name}" berhasil diperbarui!`;
  } else {
    // Error handled by store
  }
};

onMounted(fetchAndSetMember);
</script>