<template>
  <div class="answer-list">
      <ul>
        <li v-for="(answer, index) in answers" :key="index">{{ answer }}</li>
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
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
};

firebase.initializeApp(firebaseConfig);
console.log(firebase.initializeApp(firebaseConfig));

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
      },
      answers: []
    };
  },
  created() {
    // Firestoreからデータを取得してanswersに設定
    const db = firebase.firestore();
    db.collection('answers')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.answers.push(doc.data().answer);
        });
      })
      .catch((error) => {
        console.error('Error getting documents: ', error);
      });
  },
}
</script>

<style>
#my-chart-id {
  max-width: 500px;
  max-height: 500px;
  margin: 0 auto;
}

.answer-list {
  margin-top: 20px;
}

.answer-list ul {
  list-style: none;
  padding: 0;
}

.answer-list li {
  margin-bottom: 10px;
  font-size: 16px;
}
</style>