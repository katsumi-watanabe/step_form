// store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    resultData: null // 結果データを保持する状態
  },
  mutations: {
    setResultData(state, resultData) {
      state.resultData = resultData;
    }
  }
});
