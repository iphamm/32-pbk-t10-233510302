<template>
  <v-container fluid>
    <v-card class="pa-6">
      <v-card-title class="d-flex justify-space-between align-center">
        Daftar Anggota
        <v-btn color="primary" :to="{ name: 'AddMember' }">
          <v-icon left>mdi-plus</v-icon> Tambah Anggota
        </v-btn>
      </v-card-title>
      <v-divider class="my-4"></v-divider>

      <v-alert v-if="memberStore.loading" type="info" prominent>Memuat daftar anggota...</v-alert>
      <v-alert v-if="memberStore.error" type="error" prominent>{{ memberStore.error }}</v-alert>

      <v-data-table
        v-if="!memberStore.loading && !memberStore.error"
        :headers="headers"
        :items="memberStore.members"
        class="elevation-1 mt-4"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editMember(item.id)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteMemberConfirm(item.id)"
          >
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          Tidak ada anggota yang ditemukan.
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 text-center">Apakah Anda yakin ingin menghapus anggota ini?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" text @click="closeDelete">Batal</v-btn>
          <v-btn color="red-darken-1" text @click="deleteMemberItem">Hapus</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMemberStore } from '../../stores/member';

const router = useRouter();
const memberStore = useMemberStore();

const dialogDelete = ref(false);
const memberToDelete = ref(null);

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Nama', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Telepon', key: 'phone' },
  { title: 'Alamat', key: 'address' },
  { title: 'Aksi', key: 'actions', sortable: false },
];

const editMember = (id) => {
  router.push({ name: 'EditMember', params: { id } });
};

const deleteMemberConfirm = (id) => {
  memberToDelete.value = id;
  dialogDelete.value = true;
};

const deleteMemberItem = async () => {
  const success = await memberStore.deleteMember(memberToDelete.value);
  if (success) {
    dialogDelete.value = false;
    alert('Anggota berhasil dihapus!');
  } else {
    alert('Gagal menghapus anggota: ' + memberStore.error);
  }
};

const closeDelete = () => {
  dialogDelete.value = false;
  memberToDelete.value = null;
};

onMounted(() => {
  memberStore.fetchMembers();
});
</script>