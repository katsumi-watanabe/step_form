<template>
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