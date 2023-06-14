import { createRouter, createWebHistory } from 'vue-router'
import Result from '@/components/Result.vue'

const routes = [
  {
    path: '/result',
    name: 'Result',
    component: Result
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
