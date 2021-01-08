<template>
  <radial-chart :chart-data="chartData"></radial-chart>
</template>

<script>
import RadialChart from '@/mixins/RadialChart.js'
export default {
  name: 'BaseRadialChart',
  components: {
    RadialChart,
  },
  props: {
    chartData: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
