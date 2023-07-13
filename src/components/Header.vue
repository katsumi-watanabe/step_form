<template>
  <header>
    <div class="container">
      <h1><img src="@/assets/logo.svg" alt="logo" class="logo"></h1>
      <div class="button-container">
        <button v-if="isLoggedIn" @click="logout" class="logout-button">ログアウト</button>
        <button v-else @click="login" class="login-button">ログイン</button>
        <button v-else @click="signup" class="signup-button">サインアップ</button>
      </div>
    </div>
  </header>
</template>


<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

const auth = getAuth();
const isLoggedIn = ref(false);
const router = useRouter();

onAuthStateChanged(auth, (user) => {
  console.log(user);
  if (user) {
    const uid = user.uid;
    isLoggedIn.value = true;
  } else {
    // User is signed out
    isLoggedIn.value = false;
    // ...
  }
});

export default {
  setup() {
    const login = () => {
      // ログイン処理を実装する必要があります
      state.isLoggedIn = true; // ログイン成功した場合にtrueに設定する例
      router.push('/login'); // ログイン後にリダイレクトする例
    };

    const signup = () => {
      router.push('/signup');
    };

    const logout = () => {
      // ログアウト処理を実装する必要があります
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          // ログアウト成功時の処理
          router.push({ path: '/login' });
        })
        .catch((error) => {
          // ログアウト失敗時の処理
          alert('ログアウト失敗');
        });
    };

    return {
      isLoggedIn,
      login,
      signup,
      logout,
    };
  }
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
