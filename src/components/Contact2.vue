<template>
  <div class="form-section">
    <div class="container">
      <!-- 現在ページの表示 -->
      <!-- <div class="current-num">
        <div class="num-circle" :class="checkCurrentPage(1)">
          {{ checkCurrentPage(1)['passed-page'] ? "✔︎" : 1 }}
        </div>
        <div class="num-circle" :class="checkCurrentPage(2)">
          {{ checkCurrentPage(2)['passed-page'] ? "✔︎" : 2 }}
        </div>
        <div class="num-circle" :class="checkCurrentPage(3)">
          {{ checkCurrentPage(3)['passed-page'] ? "✔︎" : 3 }}
        </div>
        <div class="num-circle" :class="checkCurrentPage(4)">
          {{ checkCurrentPage(4)['passed-page'] ? "✔︎" : 4 }}
        </div>
      </div> -->

      <div class="contact-form first-form">
        <button class="check-button" @click="showRandomQuestion">
          診断を開始する！
        </button>
      </div>

      <div
        v-for="(question, index) in currentQuestions"
        :key="question.id"
        v-show="currentPage === index + 1"
        data-v-fca6c24c=""
        class="contact-form"
      >
        <div data-v-fca6c24c="" class="select">
          <h3 class="contact-title">
            {{ question.question }}
            <span class="optional" data-v-fca6c24c="">任意</span>
          </h3>
          <p class="mt20" data-v-fca6c24c="">
            <span class="t12" data-v-fca6c24c="">
              <i class="fas fa-asterisk tblue fa-fw" data-v-fca6c24c=""></i>複数選択可能
            </span>
          </p>
          <div class="grid-container">
            <div v-for="(answer, a) in question.answer" :key="i" class="selects">
              <label
                :for="'question' + question.id + a"
                class="select-button"
                data-v-fca6c24c=""
                :class="{'selected': selectedItems.includes(answer)}"
              >
                {{ answer }}
              </label>
              <input
                :id="'question' + question.id + a"
                type="checkbox"
                :value="answer"
                v-model="selectedItems"
                data-v-fca6c24c="">
            </div>
          </div>
          <div data-v-fca6c24c="" class="btn_wrap">
            <button  @click="onNext" data-v-fca6c24c="" class="b-next">次へ</button>
          </div>
        </div>
      </div>
      <label class="select-button"  style="cursor:pointer;"></label>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import questions from '@/data/questions.json'

export default {
  setup () {
    let currentPage = ref(1)

    return {
      currentPage
    }
  },
  data() {
    return {
      currentQuestions: [],
      selectedItems: [],
      // selectedItems: {
      //   page1: {},
      //   page2: {},
      //   page3: {},
      //   page4: {},
      //   page5: {},
      // }
    };
  },
  methods: {
    // 質問選択
    showRandomQuestion() {
      const questionCounts = 5;
      const shuffledQuestions = questions.slice().sort(() => Math.random() - 0.5);
      this.currentQuestions = shuffledQuestions.slice(0, questionCounts);
    },
    onNext() {
      // 現在のページのデータを保持する
      if (this.currentStep === 1) {
        this.selectedItems.page1 = { ...this.selectedItems.page1 }; // オブジェクトのコピーを作成するなど、必要な処理を追加
      } else if (this.currentStep === 2) {
        this.selectedItems.page2 = { ...this.selectedItems.page2 };
      } else if (this.currentStep === 3) {
        this.selectedItems.page3 = { ...this.selectedItems.page3 };
      }

      // 次のステップに進む処理を追加する
      this.currentStep++;
    }
  },
}
</script>

<style scoped>

.first-form {
  height: 284px;
  align-items: center;
  display: flex;
  justify-content: center;
}
.check-button {
  font-weight: bold;
  margin: 0 auto;
  width: 55%;
  height: 35%;
  font-size: 16px;
  border: 2px solid #41b883;
  border-radius: 5px;
}
.selects {
  margin-top: 0;
}
.selects .select-button.selected[data-v-fca6c24c] {
  color: #fff;
  background: #41b883;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
</style>
