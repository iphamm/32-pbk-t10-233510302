import { defineStore } from 'pinia';
import { useBookStore } from './book'; 

export const useBorrowingStore = defineStore('borrowing', {
  state: () => ({
    borrowings: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchBorrowings() {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch('https://6a00b46e36fb6ad04de06be3.mockapi.io/data/1');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const result = await response.json();
        this.borrowings = result.borrowings; 
      } catch (err) {
        this.error = 'Failed to fetch borrowings: ' + err.message;
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async fetchBorrowingById(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch('https://6a00b46e36fb6ad04de06be3.mockapi.io/data/1');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const result = await response.json();
        return result.borrowings.find(b => b.id == id);
      } catch (err) {
        this.error = 'Failed to fetch borrowing: ' + err.message;
        console.error(err);
        return null;
      } finally {
        this.loading = false;
      }
    },

    async addBorrowing(borrowingData) {
      this.loading = true;
      this.error = null;
      try {
        const bookStore = useBookStore();
        const bookIndex = bookStore.books.findIndex(b => b.id == borrowingData.bookId);
        
        if (bookIndex === -1 || bookStore.books[bookIndex].available <= 0) {
          throw new Error('Book not available or not found.');
        }

        bookStore.books[bookIndex].available -= 1;

        const newBorrowing = {
          ...borrowingData,
          id: Date.now().toString(),
          status: 'borrowed',
          borrowDate: new Date().toISOString().split('T')[0],
          returnDate: null
        };

        this.borrowings.push(newBorrowing);
        return true;
      } catch (err) {
        this.error = 'Failed to add borrowing: ' + err.message;
        console.error(err);
        return false;
      } finally {
        this.loading = false;
      }
    },

    async returnBorrowing(id) {
      this.loading = true;
      this.error = null;
      try {
        const index = this.borrowings.findIndex(b => b.id == id);
        if (index === -1 || this.borrowings[index].status === 'returned') {
          throw new Error('Borrowing not found or already returned.');
        }

        this.borrowings[index].status = 'returned';
        this.borrowings[index].returnDate = new Date().toISOString().split('T')[0];

        const bookStore = useBookStore();
        const bookIndex = bookStore.books.findIndex(b => b.id == this.borrowings[index].bookId);
        if (bookIndex !== -1) {
          bookStore.books[bookIndex].available += 1;
        }

        return true;
      } catch (err) {
        this.error = 'Failed to return borrowing: ' + err.message;
        console.error(err);
        return false;
      } finally {
        this.loading = false;
      }
    },
  },
});