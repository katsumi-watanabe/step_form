<template>
  <div class="form-section">
    <div class="container">
      <!-- 現在ページの表示 -->
      <div class="current-num" data-v-fca6c24c="">
        <div class="num-circle">
          {{ currentStep >= 1 ? "✔︎" : 1 }}
        </div>
        <div class="num-circle">
          {{ currentStep >= 2 ? "✔︎" : 2 }}
        </div>
        <div class="num-circle">
          {{ currentStep >= 3 ? "✔︎" : 3 }}
        </div>
        <div class="num-circle">
          {{ currentStep >= 4 ? "✔︎" : 4 }}
        </div>
        <div class="num-circle">
          {{ currentStep >= 5 ? "✔︎" : 5 }}
        </div>
      </div>

      <div class="contact-form first-form" v-show="currentStep === 0">
        <button
          class="start-button"
          @click="showRandomQuestion"
        >
          診断を開始する！
        </button>
      </div>

      <div
        v-for="(question, index) in currentQuestions"
        :key="question.id"
        v-show="currentStep === index + 1"
        data-v-fca6c24c=""
        class="contact-form"
      >
        <div data-v-fca6c24c="" class="select">
          <h3 class="contact-title">{{ question.question }}</h3>
          <p class="mt20" data-v-fca6c24c="">
            <span class="t12" data-v-fca6c24c="">
            </span>
          </p>
          <div class="grid-container">
            <div
              v-for="(answer, a) in question.answer"
              :key="i"
              class="selects"
            >
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
import { isRuntimeOnly, ref } from 'vue'
import questions from '@/data/questions.json'

export default {
  setup () {
    let currentStep = ref(0)

    return {
      currentStep
    }
  },
  data() {
    return {
      currentQuestions: [],
      selectedItems: [],
    };
  },
  methods: {
    // 質問選択
    showRandomQuestion() {
      const questionCounts = 5;
      const shuffledQuestions = questions.slice().sort(() => Math.random() - 0.5);
      this.currentQuestions = shuffledQuestions.slice(0, questionCounts);
      this.onNext()
    },
    onNext() {
      // 現在のページのデータを保持する
      if (this.currentStep > 0) {
        this.selectedItems[this.currentStep - 1] = { ...this.selectedItems[this.currentStep - 1] };
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
.start-button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  background-color: #41b883;
  color: #ffffff;
  border-radius: 4px;
  border: none;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.current-num .num-circle {
  display: inline-block;
  width: 30px;
  height: 30px;
  border: 3px solid #ddd;
  border-radius: 15px;
  background: #ffffff;
  text-align: center;
  line-height: 26px;
  color: #bbb;
  font-weight: bold;
}
.current-num .current-page {
  border: 3px solid #35495e;
  color: #35495e;
}
.current-num .passed-page {
  background-color: #41b883;
  border: 3px solid #41b883;
  color: #fff;
}

.start-button:hover {
  background-color: #32a672;
  cursor: pointer;
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
