import { createRouter, createWebHistory } from 'vue-router'
import Result from '@/components/Result.vue'
import Contact2 from '@/components/Contact2.vue'
import Login from '@/components/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Contact2',
    component: Contact2
  },
  {
    path: '/result-a',
    name: 'ResultA',
    component: Result
  },
  {
    path: '/result-b',
    name: 'ResultB',
    component: Result
  },
  {
    path: '/result-c',
    name: 'ResultC',
    component: Result
  },
  {
    path: '/result-d',
    name: 'ResultD',
    component: Result
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
