<template>
  <div class="mt-5">
    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <form @submit.prevent="login">
        <div class="text-subtitle-1 text-medium-emphasis">アカウント</div>

        <v-text-field
          density="compact"
          placeholder="メールアドレス"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          v-model="email"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          パスワード

          <a
            class="text-caption text-decoration-none template_color_text"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            ログインパスワードをお忘れですか？
          </a>
        </div>

        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="パスワードを入力してください"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          v-model="password"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-alert
          v-if="errorMessage"
          dense
          outlined
          type="error"
          class="mb-4"
        >
          {{ errorMessage }}
        </v-alert>

        <v-btn
          block
          class="mb-8 template_color"
          color="blue"
          size="large"
          variant="tonal"
          type="submit"
        >
          ログイン
        </v-btn>

        <v-card-text class="text-center">
          <a
            class="template_color_text text-decoration-none"
            href="/signup"
            rel="noopener noreferrer"
            target="_blank"
          >
            今すぐサインアップ <v-icon icon="mdi-chevron-right"></v-icon>
          </a>
        </v-card-text>
      </form>
    </v-card>
  </div>
</template>

<script>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const visible = ref(false);
    const router = useRouter();
    const errorMessage = ref('');
    const isAuthenticated = ref(false);

    const auth = getAuth();

    const login = () => {
      signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        isAuthenticated.value = true; // ログイン成功時にフラグをtrueにする
        router.push("/")
        })
        .catch((error) => {
          console.log('失敗', error);
          errorMessage.value = "ログインエラー" + error.code;
        });
    };
    return {
      email,
      password,
      visible,
      errorMessage,
      isAuthenticated,
      login,
    };
  },
};
</script>
