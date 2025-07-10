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
        const response = await fetch('http://localhost:3000/members');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.members = await response.json();
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
        const response = await fetch(`http://localhost:3000/members/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const member = await response.json();
        return member;
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
        const response = await fetch('http://localhost:3000/members', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(memberData),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const newMember = await response.json();
        this.members.push(newMember);
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
        const response = await fetch(`http://localhost:3000/members/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(memberData),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const updatedMember = await response.json();
        const index = this.members.findIndex(member => member.id === id);
        if (index !== -1) {
          this.members[index] = updatedMember;
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
        const response = await fetch(`http://localhost:3000/members/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.members = this.members.filter(member => member.id !== id);
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