<template>
  <div class="form-section">
    <div class="container">
      <!-- 現在ページの表示 -->

    <button @click="showRandomQuestion">診断を開始する！</button>
    <div v-for="question in currentQuestions" :key="question.id">
      <h2>{{ question.question }}</h2>
      <div v-if="question.type === 'checkbox'">
        <input :type="question.type" :id="question.id + answer" :value="answer" v-for="answer in question.answer" :key="answer" @change="toggleCheckbox(question.id, answer)" />
        <label :for="question.id + answer" v-for="answer in question.answer" :key="answer">
          {{ answer }}
        </label>
      </div>
      <div v-else-if="question.type === 'radio'">
        <div v-for="answer in question.answer" :key="answer">
          <input :type="question.type" :id="question.id + answer" :value="answer" :name="question.id" />
          <label :for="question.id + answer" @click="handleRadioClick(question.id, answer)">
            {{ answer }}
          </label>
        </div>
      </div>
      <div v-else-if="question.type === 'select'">
        <select :id="question.id" @change="handleSelectChange(question.id, $event.target.value)">
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
