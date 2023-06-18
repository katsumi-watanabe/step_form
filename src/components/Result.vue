<template>
    <div class="result-page">
      <div class="result-content">
        <h1 class="result-title">結果画面</h1>
        <p class="result-message">ありがとうございます！</p>
        <div class="result-description">
          <p>{{ result.detail }}</p>
        </div>
        <router-link to="/" class="cta-button">もう一度診断する！</router-link>
      </div>
    </div>
</template>

<script>
import results from '@/data/results.json'  // 結果データをインポート
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const result = router.currentRoute.value.query.result;

    const getResult = (result) => {
      return results.find((item) => item.type === result);
    };

    const resultData = getResult(result);
    console.log(resultData);
    store.commit('setResultData', resultData); // Vuexストアに結果データを保存

    return {
      result: resultData
    };
  }
}
</script>

<style scoped>
.result-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  margin-top: 20px;
  background: linear-gradient(to bottom, #41b883, #32a672);
}

.result-content {
  text-align: center;
}

.result-title {
  font-size: 48px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 20px;
}

.result-message {
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  animation: scaleIn 1s ease-in-out;
  margin-bottom: 10px;
  max-width: 80%;
  margin: 0 auto;
}

.result-description {
  margin-top: 10px;
  animation: fadeIn 1s ease-in-out;
  margin-bottom: 30px;
}

.result-description p {
  font-size: 18px;
  color: #ffffff;
  margin: 0 auto;
  max-width: 80%;
}

.cta-button {
  padding: 15px 40px;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  background-color: #fff;
  color: #41b883;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cta-button:hover {
  background-color: #ddd;
}

@keyframes scaleIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>