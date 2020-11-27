<template>
  <line-chart
    :chart-data="datacollection"
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
    ticketsCount: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      datacollection: null,
    }
  },
  mounted() {
    this.fillData()
  },
  methods: {
    fillData() {
      this.datacollection = [10, 20, 15, 25, 12, 22, 30]
    },
  },
}
</script>
