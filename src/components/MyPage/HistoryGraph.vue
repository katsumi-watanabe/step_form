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
import { getDatabase, ref as dbRef, get } from 'firebase/database';

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
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const db = getDatabase();
      const answersRef = dbRef(db, 'answers'); // 'answers' テーブルに参照を設定
      const snapshot = await get(answersRef);

      if (snapshot.exists()) {
        const fetchedData = Object.entries(snapshot.val()).map(([id, data]) => ({ id, ...data }));
        // ここで fetchedData を this.chartData.datasets[0].data にセットする
        // 例：this.chartData.datasets[0].data = fetchedData.map(item => item.someField);
      }
    }
  }
}
</script>

<style>
#my-chart-id {
  max-width: 500px;
  max-height: 500px;
  margin: 0 auto;
}
</style>