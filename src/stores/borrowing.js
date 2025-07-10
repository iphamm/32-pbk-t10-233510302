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
        const response = await fetch('http://localhost:3000/borrowings');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.borrowings = await response.json();
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
        const response = await fetch(`http://localhost:3000/borrowings/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const borrowing = await response.json();
        return borrowing;
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
        const book = await bookStore.fetchBookById(borrowingData.bookId);

        if (!book || book.available <= 0) {
          throw new Error('Book not available or not found.');
        }

        const updatedBook = { ...book, available: book.available - 1 };
        const bookUpdateSuccess = await bookStore.updateBook(book.id, updatedBook);

        if (!bookUpdateSuccess) {
          throw new Error('Failed to update book stock.');
        }

        const response = await fetch('http://localhost:3000/borrowings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...borrowingData,
            status: 'borrowed',
          }),
        });

        if (!response.ok) {
          await bookStore.updateBook(book.id, book);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const newBorrowing = await response.json();
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
        const borrowingToReturn = await this.fetchBorrowingById(id);
        if (!borrowingToReturn || borrowingToReturn.status === 'returned') {
          throw new Error('Borrowing not found or already returned.');
        }

        const updatedBorrowing = {
          ...borrowingToReturn,
          returnDate: new Date().toISOString().split('T')[0],
          status: 'returned',
        };

        const response = await fetch(`http://localhost:3000/borrowings/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedBorrowing),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const returnedBorrowing = await response.json();

        const bookStore = useBookStore();
        const book = await bookStore.fetchBookById(returnedBorrowing.bookId);
        if (book) {
          const updatedBook = { ...book, available: book.available + 1 };
          await bookStore.updateBook(book.id, updatedBook);
        }

        const index = this.borrowings.findIndex(b => b.id === id);
        if (index !== -1) {
          this.borrowings[index] = returnedBorrowing;
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