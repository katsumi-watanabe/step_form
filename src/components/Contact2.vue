<template>
  <div class="form-section">
    <div class="container">
      <!-- 現在ページの表示 -->

    <button @click="showRandomQuestion">診断を開始する！</button>
    <div v-for="(question, i) in currentQuestions" :key="question.id" data-v-fca6c24c="" class="contact-form">
      <div data-v-fca6c24c="" class="select">
        <h3 class="contact-title" data-v-fca6c24c="">
          {{ question.question }}
          <!-- {{ i + 1 }} -->
          <span class="optional" data-v-fca6c24c="">任意</span>
        </h3>
        <p class="mt20" data-v-fca6c24c="">
        <span class="t12" data-v-fca6c24c="">
          <i class="fas fa-asterisk tblue fa-fw" data-v-fca6c24c="">
          </i>複数選択可能</span>
        </p>
        <div class="grid-container">
          <div v-for="answer in question.answer" :key="answer" data-v-fca6c24c="" class="selects">
            <label
              :for="question.id + answer"
              data-v-fca6c24c=""
              class="select-button"
            >
              {{ answer }}
            </label>
            <input
              :id="question.id + answer"
              data-v-fca6c24c=""
              type="checkbox"
              :name="question.id"
              :value="question.id + answer"
            >
          </div>
        </div>
          <div data-v-fca6c24c="" class="btn_wrap">
            <button data-v-fca6c24c="" class="b-next">次へ</button>
          </div>
      </div>
    </div>

        <label class="select-button"  style="cursor:pointer;"></label>
    </div>
  </div>
</template>

<script>
import questions from '@/data/questions.json';

export default {
  data() {
    return {
      currentQuestions: [],
      selectedAnswers: {},
    };

  },
  methods: {
    // 質問選択
    showRandomQuestion() {
      const questionCounts = 5;
      const shuffledQuestions = questions.slice().sort(() => Math.random() - 0.5);
      this.currentQuestions = shuffledQuestions.slice(0, questionCounts);
    }
  }
}
</script>

<style scoped>
/* .selects .select-button {
  width: 100%;
  display: inline-block;
  background-color: #fff;
  padding: .55em 0;
  border: 2px solid #ccc;
  text-align: center;
  font-size: 18px;
  cursor: pointer;
}
.selects .select-button.selected{
  color: #fff;
  background: #41b883;
}

.selects.sepa2 { */
  /* grid-template-columns: repeat(2,1fr); */
/* } */
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
