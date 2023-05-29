<template>
  <div class="form-section">
    <div class="container">
      <!-- 現在ページの表示 -->

    <button @click="showRandomQuestion">診断を開始する！</button>
    <div data-v-fca6c24c="" class="contact-form">
      <div data-v-fca6c24c="" class="select">
        <h3 class="contact-title" data-v-fca6c24c="">
          ご相談内容をお選びください
          <span class="optional" data-v-fca6c24c="">任意</span>
        </h3>
        <p class="mt20" data-v-fca6c24c="">
        <span class="t12" data-v-fca6c24c="">
          <i class="fas fa-asterisk tblue fa-fw" data-v-fca6c24c="">
          </i>複数選択可能</span>
        </p>
          <div data-v-fca6c24c="" class="selects sepa2">
            <label data-v-fca6c24c="" for="select-1" class="select-button">サイト制作</label>
            <input data-v-fca6c24c="" id="select-1" type="checkbox" name="select-1">
            <label data-v-fca6c24c="" for="select-2" class="select-button">システム開発</label>
            <input data-v-fca6c24c="" id="select-2" type="checkbox" name="select-2">
            <label data-v-fca6c24c="" for="select-3" class="select-button">WEBコンサル</label>
            <input data-v-fca6c24c="" id="select-3" type="checkbox" name="select-3">
          </div>
        </div>
        <div data-v-fca6c24c="" class="btn_wrap">
          <button data-v-fca6c24c="" class="b-next">次へ</button>
      </div>
    </div>

    <div class="selects" v-for="question in currentQuestions" :key="question.id">
      <h3 class="contact-title">{{ question.question }}
        <span class="optional">任意</span>
      </h3>
      <div v-for="answer in question.answer" :key="answer">
        <input :id="question.id + answer" type="checkbox" :name="question.id" :value="question.id + answer">
        <label class="select-button" :for="question.id + answer" style="cursor:pointer;">{{ answer }}</label>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import questions from '@/data/questions.json';

export default {
  data() {
    return {
      currentQuestions: [],
      selectedAnswers: {} // 初期
    };

  },
  methods: {
    showRandomQuestion() {
      const questionCounts = 5;
      const shuffledQuestions = questions.slice().sort(() => Math.random() - 0.5);
      this.currentQuestions = shuffledQuestions.slice(0, questionCounts);
    }
  }
}
</script>

<style scoped>
.selects .select-button {
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
</style>
