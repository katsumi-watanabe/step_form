<template>
  <header>
    <div class="container">
      <h1>
        <a href="/">
          <img src="@/assets/logo.svg" alt="logo" class="logo">
        </a>
      </h1>
      <div class="button-container">
        <button v-if="isLoggedIn !== null && isLoggedIn" @click="userInfo" class="logout-button">ユーザー情報</button>
        <button v-if="isLoggedIn !== null && isLoggedIn" @click="logout" class="logout-button">ログアウト</button>
        <button v-else-if="isLoggedIn !== null && !isLoginPage" @click="login" class="login-button">ログイン</button>
        <button v-else-if="isLoggedIn !== null && isLoginPage" @click="signup" class="signup-button">サインアップ</button>
      </div>
    </div>
  </header>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const auth = getAuth();
    const isLoggedIn = ref(null);
    const router = useRouter();

    onAuthStateChanged(auth, (user) => {
      isLoggedIn.value = !!user;
    });

    console.log(isLoggedIn);

    const isLoginPage = computed(() => router.currentRoute.value.path === '/login');
    const login = () => {
      router.push('/login');
    };

    const signup = () => {
      router.push('/signup');
    };

    const logout = () => {
      signOut(auth)
        .then(() => {
          router.push({ path: '/login' });
        })
        .catch((error) => {
          alert('ログアウト失敗');
        });
    };

    const userInfo = () => {
      router.push('/history-graph');
    };

    return {
      isLoggedIn,
      isLoginPage,
      login,
      signup,
      userInfo,
      logout,
    };
  },
};
</script>

<style scoped>
header {
  border-bottom: 2px solid #41b883;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}

.container h1 {
  margin: 0;
}

.container h1 .logo {
  /* サイズの設定例 */
  width: 50px;
  height: auto;
}

.button-container {
  display: flex;
  align-items: center;
}

.none {
  display: none;
}

.logout-button,
.login-button,
.signup-button {
  background-color: #41b883;
  color: #ffffff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}
</style>
