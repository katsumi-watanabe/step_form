<template>
  <div class="form-section">
    <div class="container">
      <!-- 現在ページの表示 -->
      <div class="current-num" data-v-fca6c24c="">
        <div
          v-for="step in 5"
          :key="step"
          :class="getStepClass(step)"
          v-show="currentStep != 0 && currentStep < 6"
        >
          {{ currentStep > step ? "✔︎" : step }}
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
              class="selects"
            >
              <label
                :for="'question' + question.id + '_' + a"
                class="select-button"
                data-v-fca6c24c=""
                :class="{'selected': selectedItems['question' + question.id + '_' + 'answer' + (a + 1)] === true}"
              >
                {{ answer.answer_pattern }}
                <span v-if="selectedItems['question' + question.id + '_' + 'answer' + (a + 1)]" class="click_number">
                  {{ a + 1 }}
                </span>
              </label>
              <input
                :id="'question' + question.id + '_' + a"
                type="checkbox"
                :value="answer"
                v-model="selectedItems['question' + question.id + '_' + 'answer' + (a + 1)]"
                @change="toggleCheckButton"
                data-v-fca6c24c=""
              >
            </div>
          </div>
          <div data-v-fca6c24c="" class="btn_wrap">
            <button class="b-back" @click="onBack">戻る</button>
            <button @click="onNext" data-v-fca6c24c="" class="b-next">次へ</button>
          </div>
        </div>
      </div>
      <label class="select-button"  style="cursor:pointer;"></label>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import questions from '@/data/questions.json'

export default {
  setup() {
    const currentStep = ref(0)
    const currentQuestions = ref([])
    const selectedItems = reactive({});

    const showRandomQuestion = () => {
      const questionCounts = 5
      const shuffledQuestions = questions.slice().sort(() => Math.random() - 0.5)
      currentQuestions.value = shuffledQuestions.slice(0, questionCounts)
      onNext()
    }

    const toggleCheckButton = (questionId, answerId) => {
  const key = `question${questionId}_answer${answerId}`;
  const questionIndex = currentStep.value - 1;

  if (!selectedItems[questionIndex]) {
    selectedItems[questionIndex] = {};
  }

  selectedItems[questionIndex][key] = !selectedItems[questionIndex][key];
};



    const onNext = () => {
      const questionIndex = currentStep.value - 1

      if (!selectedItems[questionIndex]) {
        selectedItems[questionIndex] = []
      }

      currentStep.value++
    }

    const onBack = () => {
      currentStep.value--
    }

    const getStepClass = (step) => {
      return {
        'num-circle': true,
        unchecked: currentStep.value < step,
        current: currentStep.value === step,
        checked: currentStep.value > step
      }
    }

    return {
      currentStep,
      currentQuestions,
      selectedItems,
      showRandomQuestion,
      toggleCheckButton,
      onNext,
      onBack,
      getStepClass
    }
  }
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

.current-num .current {
  border: 3px solid #35495e;
  color: #35495e;
}
.current-num .checked {
  background-color: #41b883;
  border: 3px solid #41b883;
  color: #fff;
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
.contact-form .select h3{
  width: 70%;
  border-left: 5px solid #41b883;
  margin: 1rem 0 0 0;
  padding: .5em 0 .5em .5em;
  color: #0e271c;
}

.selects {
  margin-top: 0;
}

.selects .select-button {
  position: relative;
  align-items: center;
}
.selects .select-button.selected[data-v-fca6c24c] {
  color: #fff;
  background: #41b883;
}

.click_number {
  position: absolute;
  width: 36px;
  height: 36px;
  text-align: center;
  border-radius: 50%;
  border: 2px solid #0e271c;
  font-size: 2.8rem;
  color: #0e271c;
  line-height: 1;
  font-weight: bold;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); /* 画面中央に配置するための相対位置指定 */
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.btn_wrap .b-back{
  height: 40px;
  padding: 0 30px;
  font-size: 16px;
  font-size: 1.6rem;
  line-height: 30px;
  color: #35495e;
}
</style>