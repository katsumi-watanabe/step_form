<template>
        <router-link to="/" class="cta-button">もう一度診断する！</router-link>
</template>

<script>
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
</style>