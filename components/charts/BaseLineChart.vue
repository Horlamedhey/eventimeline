<template>
  <line-chart
    :chart-data="chartData"
    :tickets-count="ticketsCount"
  ></line-chart>
</template>

<script>
import LineChart from '@/mixins/LineChart.js'
export default {
  name: 'BaseLineChart',
  components: {
    LineChart,
  },
  props: {
    chartData: {
      type: Array,
      default: () => [],
    },
    ticketsCount: {
      type: Number,
      default: 0,
    },
  },
}
</script>
