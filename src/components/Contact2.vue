<template>
  <div class="form-section">
    <div class="container">
      <!-- 現在ページの表示 -->

    <button @click="showRandomQuestion">診断を開始する！</button>
    <div v-for="question in currentQuestions" :key="question.id">
      <h2>{{ question.question }}</h2>
      <div v-if="question.type === 'checkbox'">
        <div v-for="answer in question.answer" :key="answer">
          <input :id="question.id + answer" :type="question.type" :name="question.id" :value="question.id + answer">
          <label :for="question.id + answer" style="cursor:pointer;">{{ answer }}</label>
        </div>
      </div>
      <div v-else-if="question.type === 'radio'">
        <div v-for="answer in question.answer" :key="answer">
          <input :id="question.id + answer" :type="question.type" :name="question.id" :value="question.id + answer">
          <label :for="question.id + answer">{{ answer }}</label>
        </div>
      </div>
      <div v-else-if="question.type === 'select'">
        <select :id="question.id">
          <option v-for="answer in question.answer" :value="answer" :key="answer">{{ answer }}</option>
        </select>
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
