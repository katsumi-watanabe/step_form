import { createRouter, createWebHistory } from 'vue-router'
import Result from '@/views/Result.vue'

const routes = [
  {
    path: '/',
    name: 'Result',
    component: Result
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
