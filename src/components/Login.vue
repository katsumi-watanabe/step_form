<template>
    <v-app>
        <v-main>
        <v-container fluid class="fill-height">
            <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card>
                <v-card-title class="text-center">
                    <h2 class="text--primary">Login</h2>
                </v-card-title>
                <v-card-text>
                    <v-form @submit.prevent="login">
                    <v-text-field
                        v-model="email"
                        label="Email"
                        type="email"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="username"
                        label="Username"
                        required
                    ></v-text-field>
                    <v-btn color="primary" block type="submit">Login</v-btn>
                    </v-form>
                </v-card-text>
                </v-card>
            </v-col>
            </v-row>
        </v-container>
        </v-main>
    </v-app>
</template>
<script>
import { ref } from 'vue';
export default {
data() {
    return {
    email: '',
    username: ''
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
}
</script>