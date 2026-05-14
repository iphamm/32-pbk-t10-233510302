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
        const response = await fetch('https://6a00b46e36fb6ad04de06be3.mockapi.io/data/1');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
        const result = await response.json();
        this.books = result.books; 
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
        const response = await fetch(`https://6a00b46e36fb6ad04de06be3.mockapi.io/data/1`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const result = await response.json();
        const book = result.books.find(b => b.id == id);
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
        bookData.id = Date.now().toString(); 

        this.books.push(bookData);
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
        const index = this.books.findIndex(b => b.id == id);
        if (index !== -1) {
          this.books[index] = { ...this.books[index], ...bookData };
        }
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
        this.books = this.books.filter(b => b.id != id);
        return true;
      } catch (err) {
        this.error = 'Failed to delete book: ' + err.message;
        console.error(err);
        return false;
      } finally {
        this.loading = false;
      }
    }
  },
});