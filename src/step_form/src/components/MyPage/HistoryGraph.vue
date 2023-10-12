<template>
  <div class="answer-list">
      <ul>
        <!-- <li v-for="(answer, index) in answers" :key="index">{{ answer }}</li> -->
      </ul>
  </div>
  <Radar
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script>
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js'
import { Radar } from 'vue-chartjs'
import { ref, onMounted } from 'vue';
import { collection, query, where, getDocs } from "firebase/firestore"; 
import { db } from "@/firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

onAuthStateChanged(auth, async (user) => { // async を追加
  if (user) {
    const uid = user.uid; // 既存の変数を使う
    let results = [];
    let answers = [];

    const q = query(collection(db, "answers"));
    const querySnapshot = await getDocs(q); // await が使えるようになる
    querySnapshot.forEach((doc) => { // 第二引数の uid は不要
      // 自身おユーザーデータのみを取得
      if (uid === doc.id) {
        results.push(doc.data().result);
        answers.push(doc.data().points);
      }
    });
    console.log(results);
    console.log(answers[0]);
  }
});

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

export default {
  name: 'RadarChart',
  components: { Radar },
  data() {
    return {
      chartData: {
        labels: [
          'Aタイプ',
          'Bタイプ',
          'Cタイプ',
          'Dタイプ'
        ],
        datasets: [{
          label: 'My Second Dataset',
          data: [19, 96, 27, 100],
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
      },
      chartOptions: {
        responsive: true
      }
    }
  },
}
</script>

<style>
#my-chart-id {
  max-width: 500px;
  max-height: 500px;
  margin: 0 auto;
}
</style>