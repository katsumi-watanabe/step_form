<template>
  <div class="form-section">
    <div class="container">
      <!-- 現在ページの表示 -->
      <div class="current-num" data-v-fca6c24c="">
        <div
          v-for="step in 5"
          :key="step"
          :class="['num-circle', {'current': currentStep === step, 'checked': currentStep > step}]"
          v-show="currentStep > 0 && currentStep < 6"
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
        v-show="currentStep === (index + 1)"
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
              :class="{'selected': selectedItems[currentStep - 1].includes(answer)}"
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
          <div
            data-v-fca6c24c=""
            class="btn_wrap"
            v-if="currentStep < 5"
          >
            <button class="b-back" @click="onBack" v-show="currentStep > 1">戻る</button>
            <button
              @click="onNext"
              data-v-fca6c24c=""
              class="b-next"
              :disabled="selectedItems[currentStep - 1].length < 4"
            >
              次へ
            </button>
          </div>
          <div
            data-v-fca6c24c=""
            class="btn_wrap"
            v-else
          >
            <button class="b-back" @click="onBack" v-show="currentStep > 1">戻る</button>
            <button
              class="b-next"
              data-v-fca6c24c=""
              @click="handleClick"
              :disabled="selectedItems[currentStep - 1].length < 4"
            >
              結果を見る
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
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import questions from '@/data/questions.json'
import { getAuth } from 'firebase/auth'
import { getFirestore, doc, setDoc, addDoc, collection } from 'firebase/firestore';

export default {
  setup() {
    const auth = getAuth();
    const currentUser = ref(null);
    const currentStep = ref(0)
    const currentQuestions = ref([])
    const selectedItems = reactive(Array(5).fill([]))
    const router = useRouter()

    // ユーザー情報の取得
    onMounted(() => {
      // ユーザー情報の取得
      currentUser.value = auth.currentUser;

    });

    const showRandomQuestion = () => {
      const questionCounts = 5;
      const shuffledQuestions = questions.slice().sort(() => Math.random() - 0.5);

      // 各ステップの回答を格納する新しい配列を作成する
      const newSelectedItems = Array(questionCounts).fill([]);

      selectedItems.splice(0, selectedItems.length, ...newSelectedItems);
      currentQuestions.value = shuffledQuestions.slice(0, questionCounts);
      currentStep.value = 1; // currentStepをリセットして最初のステップに戻る
    };

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

    // 結果画面に進む
    const handleClick = async () => {
      try {
        // 回答データの計算
        const { result, pointCount } = calculateResult(selectedItems);

        // Firebase Firestoreに保存する
        const db = getFirestore();
        const docRef = doc(db, "answers", currentUser.value.uid);

        // selectedItemsをフラットなオブジェクトに変換する
        const flatSelectedItems = selectedItems.reduce((acc, current, index) => {
          acc['answer' + (index + 1)] = current;
          return acc;
        }, {});

        const answersCollection = collection(db, "answers");  // 追加
        const newDocRef = await addDoc(answersCollection, {  // 追加
          uid: currentUser.value.uid,
          result: result,
          points: pointCount,
        });  // 追加

        console.log("Document written with ID: ", newDocRef.id);  // 追加

        console.log("result:", result);
        console.log("pointCount:", pointCount);

        await setDoc(docRef, {
          result: result,
          points: pointCount,
        }, { merge: true });

        // 計算結果に応じて遷移先のページを決定
        let route = ''
        if (result === 'A') {
          route = '/result-a'
        } else if (result === 'B') {
          route = '/result-b'
        } else if (result === 'C') {
          route = '/result-c'
        } else if (result === 'D') {
          route = '/result-d'
        } else {
          route = '/result-default'
        }

        // 遷移先のページに遷移
        // 結果ページに結果データを渡して遷移
        router.push({
          path: route,
          query: { result: result }
        });
      } catch (err) {
        console.error(err); // エラーメッセージを表示
      }
    }

    // 回答データの計算
    const calculateResult = (selectedItems) => {
      const pointCount = {
        A: 0,
        B: 0,
        C: 0,
        D: 0
      };

      selectedItems.forEach((answers) => {
        answers.forEach((answer, $i) => {
          if (answer.point_category === 'A') {
            pointCount['A'] += (4 - $i);
          } else if (answer.point_category === 'B') {
            pointCount['B'] += (4 - $i);
          } else if (answer.point_category === 'C') {
            pointCount['C'] += (4 - $i);
          } else if (answer.point_category === 'D') {
            pointCount['D'] += (4 - $i);
          }
        });
      });

      // 最も多い回答を返す
      const maxPoint = Math.max(...Object.values(pointCount));
      // maxPointが被った場合の優先順位
      const priority = ['A', 'D', 'C', 'B'];
      // maxPointが被った場合の優先順位に従って、resultを返す
      const result = priority.find((key) => pointCount[key] === maxPoint) || 'default';
      return { result, pointCount }; // ここでresultとpointCountをオブジェクトとして返す

    };

    return {
      currentUser,
      currentStep,
      currentQuestions,
      selectedItems,
      showRandomQuestion,
      onNext,
      onBack,
      handleClick,
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
  width: 100%;
  border-left: 5px solid #41b883;
  margin: 1rem 0 0 0;
  padding: .5em 0 .5em .5em;
  color: #0e271c;
}

.selects {
  margin-top: 0;
  border: 2px solid #ccc;
  /* 追加: コンテンツを縦方向に中央揃えにする */
  display: flex;
  align-items: center;
}
.selects.selected {
  background-color: #41b883;
}

.click_number {
  position: absolute;
  width: 36px;
  height: 36px;
  text-align: center;
  border-radius: 50%;
  border: 2px solid #0e271c;
  font-size: 1.8rem;
  color: #0e271c;
  line-height: 1;
  font-weight: bold;
  /* 修正: 水平方向に中央揃えにする */
  left: 50%;
  /* 修正: 垂直方向に中央揃えにする */
  top: 50%;
  transform: translate(-50%, -50%);
}

.selects .select-button {
  position: relative;
  align-items: center;
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

.btn_wrap .b-back{
  height: 40px;
  padding: 0 30px;
  font-size: 16px;
  font-size: 1.0rem;
  line-height: 30px;
  color: #35495e;
}
</style>
