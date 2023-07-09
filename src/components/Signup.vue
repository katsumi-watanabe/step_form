<template>
  <div class="mt-5">
    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <form @submit.prevent="signUp">
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
        </div>

        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="パスワードを入力"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          v-model="password"
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
          size="large"
          variant="tonal"
          type="submit"
        >
          登録する
        </v-btn>
      </form>
    </v-card>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import { ref } from "vue";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const visible = ref(false);
    const errorMessage = ref("");
    const auth = getAuth();
    const router = useRouter();

    const signUp = () => {
      createUserWithEmailAndPassword(auth, email.value, password.value)
        .then(() => {
          signInWithEmailAndPassword(auth, email.value, password.value)
            .then(() => {
              router.push("/");
            })
            .catch((error) => {
              errorMessage.value = "サインインエラー：" + error.message;
            });
        })
        .catch((error) => {
          errorMessage.value = "サインアップエラー：" + error.message;
        });
    };

    return {
      email,
      password,
      visible,
      errorMessage,
      signUp
    };
  }
};
</script>
