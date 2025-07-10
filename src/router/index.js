import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

// Layout Components
import AdminLayout from '../layouts/AdminLayout.vue';
import AuthLayout from '../layouts/AuthLayout.vue';

// View Components
import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Auth/Login.vue';

// Books Views
import BookList from '../views/Books/Books.vue';
import AddBook from '../views/Books/AddBook.vue';
import EditBook from '../views/Books/EditBook.vue';

// Members Views
import MemberList from '../views/Members/Members.vue';
import AddMember from '../views/Members/AddMembers.vue';
import EditMember from '../views/Members/EditMembers.vue';

// Transactions Views
import BorrowingList from '../views/Transactions/Borrowings.vue';
import NewBorrowing from '../views/Transactions/NewBorrowing.vue';
import ReturnBookPage from '../views/Transactions/ReturnBook.vue'; 

// Reports Views
import BorrowingReport from '../views/Reports/BorrowingReport.vue';
import BookAvailabilityReport from '../views/Reports/BookAvailabilityReport.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/auth',
      component: AuthLayout,
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login,
        },
      ],
    },
    {
      path: '/',
      component: AdminLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: Dashboard,
        },
        {
          path: 'books',
          name: 'BookList',
          component: BookList,
        },
        {
          path: 'books/add',
          name: 'AddBook',
          component: AddBook,
        },
        {
          path: 'books/edit/:id',
          name: 'EditBook',
          component: EditBook,
          props: true,
        },
        {
          path: 'members',
          name: 'MemberList',
          component: MemberList,
        },
        {
          path: 'members/add',
          name: 'AddMember',
          component: AddMember,
        },
        {
          path: 'members/edit/:id',
          name: 'EditMember',
          component: EditMember,
          props: true,
        },
        {
          path: 'transactions',
          name: 'BorrowingList',
          component: BorrowingList,
        },
        {
          path: 'transactions/new',
          name: 'NewBorrowing',
          component: NewBorrowing,
        },
        {
          path: 'transactions/return',
          name: 'ReturnOverview',
          component: BorrowingList, 
        },
        {
          path: 'transactions/return/:id',
          name: 'ReturnBookDetail',
          component: ReturnBookPage,
          props: true,
        },
        {
          path: 'reports/borrowing',
          name: 'BorrowingReport',
          component: BorrowingReport,
        },
        {
          path: 'reports/book-availability',
          name: 'BookAvailabilityReport',
          component: BookAvailabilityReport,
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/auth/login',
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login' });
  } else if (to.name === 'Login' && authStore.isAuthenticated) {
    next({ name: 'Dashboard' });
  } else {
    next();
  }
});

export default router;