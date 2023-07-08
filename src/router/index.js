import { createRouter, createWebHistory } from 'vue-router'
import Result from '@/components/Result.vue'
import Contact2 from '@/components/Contact2.vue'
import Login from '@/components/Login.vue'
import Signup from '@/components/Signup.vue'
import Test from '@/components/Test.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const routes = [
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
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
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// ログイン状態を取得するコード
const auth = getAuth();
let isAuthenticated = false;

onAuthStateChanged(auth, (user) => {
  isAuthenticated = !!user; // ユーザーオブジェクトが存在するかどうかでログイン状態を判断
});

// ナビゲーションガードを追加
router.beforeEach((to, from, next) => {
  // ログイン状態に応じて適切な処理を行う

  if (!isAuthenticated && to.name !== 'Login' && to.name !== 'Signup') {
    next({ name: 'Login' });
  } else {
    next();
  }
});
export default router;
