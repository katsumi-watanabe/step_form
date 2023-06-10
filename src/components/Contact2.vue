<template>
  <div class="form-section">
    <div class="container">
      <!-- 現在ページの表示 -->
      <div class="current-num" data-v-fca6c24c="">
        <div
          v-for="step in 5"
          :key="step"
          :class="['num-circle', {'current': currentStep === step, 'checked': currentStep > step}]"
          v-show="currentStep !== 0 && currentStep < 6"
        >
          <!-- 現在のステップよりも小さい場合はチェックマークを表示、そうでなければステップ番号を表示 -->
          {{ currentStep > step ? '✔︎' : step }}
        </div>
      </div>

      <!-- 最初のフォーム -->
      <div class="contact-form first-form" v-show="currentStep === 0">
        <button class="start-button" @click="showRandomQuestion">
          診断を開始する！
        </button>
      </div>

      <!-- 質問フォーム -->
      <div
        v-for="(question, index) in currentQuestions"
        :key="question.id"
        v-show="currentStep === index + 1"
        data-v-fca6c24c=""
        class="contact-form"
      >
        <div data-v-fca6c24c="" class="select">
          <h3 class="contact-title">{{ question.question }}</h3>
          <!-- 回答選択肢 -->
          <p class="mt20" data-v-fca6c24c="">
            <span class="t12" data-v-fca6c24c="">
            </span>
          </p>
          <div class="grid-container">
            <div
              v-for="(answer, a) in question.answer"
              :key="a"
              class="selects"
            >
              <label
                :for="'question' + question.id + '_' + a"
                data-v-fca6c24c=""
                class="select-button"
                :class="{'selected': selectedItems[currentStep - 1].includes(answer)}"
              >
                <!-- 回答パターン -->
                {{ answer.answer_pattern }}
                <!-- 選択された回答の番号 -->
                <span class="click_number" v-if="(selectedItems[currentStep - 1].indexOf(answer) + 1) > 0">
                  {{ selectedItems[currentStep - 1].indexOf(answer) + 1 }}
                </span>
              </label>
              <!-- 選択された回答をselectedItemsに追加する -->
              <input
                :id="'question' + question.id + '_' + a"
                type="checkbox"
                :value="answer"
                v-model="selectedItems[currentStep - 1]"
                data-v-fca6c24c=""
              >
            </div>
          </div>
          <div data-v-fca6c24c="" class="btn_wrap">
            <button class="b-back" @click="onBack">戻る</button>
            <button
              @click="onNext"
              data-v-fca6c24c=""
              class="b-next"
              :disabled="selectedItems[currentStep - 1].length < 4"
            >
              次へ
            </button>
          </div>
        </div>
      </div>

      <!-- 選択肢外をクリックしたときの処理 -->
      <label class="select-button" style="cursor:pointer;"></label>
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
    const selectedItems = reactive(Array(5).fill([]))

    const showRandomQuestion = () => {
      const questionCounts = 5
      const shuffledQuestions = questions.slice().sort(() => Math.random() - 0.5)
      currentQuestions.value = shuffledQuestions.slice(0, questionCounts)
      onNext()
    }

    const onNext = () => {
      const questionIndex = currentStep.value - 1

      // 現在のステップの回答が選択されていない場合は、空の配列を追加する
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
