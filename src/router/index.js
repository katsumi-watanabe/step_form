import { createRouter, createWebHistory } from 'vue-router'
import Result from '@/components/Result.vue'
import Contact2 from '@/components/Contact2.vue'

const routes = [
  {
    path: '/',
    name: 'Contact2',
    component: Contact2
  },
  {
    path: '/result-default',
    name: 'Result',
    component: Result
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
