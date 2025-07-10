import { defineStore } from 'pinia';

export const useBookStore = defineStore('book', {
  state: () => ({
    books: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchBooks() {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch('http://localhost:3000/books');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.books = await response.json();
      } catch (err) {
        this.error = 'Failed to fetch books: ' + err.message;
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async fetchBookById(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch(`http://localhost:3000/books/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const book = await response.json();
        return book;
      } catch (err) {
        this.error = 'Failed to fetch book: ' + err.message;
        console.error(err);
        return null;
      } finally {
        this.loading = false;
      }
    },

    async addBook(bookData) {
      this.loading = true;
      this.error = null;
      try {
        bookData.available = bookData.stock;

        const response = await fetch('http://localhost:3000/books', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookData),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const newBook = await response.json();
        return true;
      } catch (err) {
        this.error = 'Failed to add book: ' + err.message;
        console.error(err);
        return false;
      } finally {
        this.loading = false;
      }
    },

    async updateBook(id, bookData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch(`http://localhost:3000/books/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookData),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const updatedBook = await response.json();
        return true;
      } catch (err) {
        this.error = 'Failed to update book: ' + err.message;
        console.error(err);
        return false;
      } finally {
        this.loading = false;
      }
    },

    async deleteBook(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch(`http://localhost:3000/books/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return true;
      } catch (err) {
        this.error = 'Failed to delete book: ' + err.message;
        console.error(err);
        return false;
      } finally {
        this.loading = false;
      }
    },
  },
});