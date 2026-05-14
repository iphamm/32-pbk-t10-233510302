import { defineStore } from 'pinia';

export const useMemberStore = defineStore('member', {
  state: () => ({
    members: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchMembers() {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch('https://6a00b46e36fb6ad04de06be3.mockapi.io/data/1');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const result = await response.json();
        this.members = result.members;
      } catch (err) {
        this.error = 'Failed to fetch members: ' + err.message;
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async fetchMemberById(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch('https://6a00b46e36fb6ad04de06be3.mockapi.io/data/1');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const result = await response.json();
        return result.members.find(m => m.id == id);
      } catch (err) {
        this.error = 'Failed to fetch member: ' + err.message;
        console.error(err);
        return null;
      } finally {
        this.loading = false;
      }
    },

    async addMember(memberData) {
      this.loading = true;
      this.error = null;
      try {
        memberData.id = Date.now().toString(); 
        this.members.push(memberData);
        return true;
      } catch (err) {
        this.error = 'Failed to add member: ' + err.message;
        console.error(err);
        return false;
      } finally {
        this.loading = false;
      }
    },

    async updateMember(id, memberData) {
      this.loading = true;
      this.error = null;
      try {
        const index = this.members.findIndex(m => m.id == id);
        if (index !== -1) {
          this.members[index] = { ...this.members[index], ...memberData };
        }
        return true;
      } catch (err) {
        this.error = 'Failed to update member: ' + err.message;
        console.error(err);
        return false;
      } finally {
        this.loading = false;
      }
    },

    async deleteMember(id) {
      this.loading = true;
      this.error = null;
      try {
        this.members = this.members.filter(m => m.id != id);
        return true;
      } catch (err) {
        this.error = 'Failed to delete member: ' + err.message;
        console.error(err);
        return false;
      } finally {
        this.loading = false;
      }
    },
  },
});