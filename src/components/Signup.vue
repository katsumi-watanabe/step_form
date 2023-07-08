<template>
  <div class="mt-5">
    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <v-text-field
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password
      </div>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-btn
        block
        class="mb-8 template_color"
        size="large"
        variant="tonal"
      >
        Signup
      </v-btn>

    </v-card>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  data() {
    return {
      email: '',
      username: '',
      visible: false // 追加: パスワード表示トグルのための変数
    };
  },
  setup() {
    const login = () => {
      // ログインの処理を記述する
      // 例えば、APIリクエストを送信してバックエンドとの認証を行うなど
    };
    return {
      login
    };
  }
};
</script>
<style scoped>
.template_color{
  background-color: #41b883;
  color: #fff;
}
.template_color_text{
  color: #41b883;
}

</style>