import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
import Books from '../views/Books/Books.vue'
import AddBook from "@/views/Books/AddBook.vue";
import EditBook from "@/views/Books/EditBook.vue";
import EditMembers from "@/views/Members/EditMembers.vue";
import Transaction from "@/views/Transaction.vue";
import Reports from "@/views/Reports.vue";
import AddMembers from "@/views/Members/AddMembers.vue";
import Members from "@/views/Members/Members.vue";
import Login from "@/views/Login.vue";
import BookLayout from "@/views/Layouts/BookLayout.vue";
import MembersLayout from "@/views/Layouts/MembersLayout.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: Home},
    { path: '/login', name: 'Login', component: Login},
    { 
      path: '/books', 
      component: BookLayout, 
      children: [
        { path: '', component: Books},
        { path: 'add', component: AddBook},
        { path: 'edit/:id', component: EditBook}
      ]
    },
    {
      path: '/members',
      component: MembersLayout,
      children: [
        { path: '', component: Members},
        { path: 'add', component: AddMembers },
        { path: 'edit/:id', component: EditMembers}
      ]
  },
  { path: '/transactions', name: 'Transactions', component: Transaction },
  { path: '/reports', name: 'Reports', component: Reports },
  ]
})

export default router
