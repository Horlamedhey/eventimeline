import { Line } from 'vue-chartjs'
// const { reactiveProp } = mixins
export default {
  extends: Line,
  //   mixins: [reactiveProp],
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
  data() {
    return {
      gradient: null,
    }
  },
  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.$refs.canvas.height = 200
    this.gradient = this.$refs.canvas
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 200)

    this.gradient.addColorStop(0, 'rgba(223, 255,244, 1)')
    this.gradient.addColorStop(1, 'rgba(255, 255, 255, 1)')
    this.renderChart(
      {
        labels: [0, 1, 2, 3, 4, 5, 6],
        datasets: [
          {
            label: 'Tickets sold',
            backgroundColor: this.gradient,
            borderColor: '#22BAB1',
            borderJoinStyle: 'round',
            // fill: false,
            data: this.chartData,
          },
        ],
      },
      {
        elements: {
          point: {
            radius: 0,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                lineWidth: 0,
                zeroLineWidth: 1,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                lineWidth: 0,
                zeroLineWidth: 1,
              },
              ticks: {
                beginAtZero: true,
                maxTicksLimit: 7,
                suggestedMin: 0,
                suggestedMax: this.ticketsCount,
              },
            },
          ],
        },
        legend: {
          display: false,
        },
      }
    )
  },
}
