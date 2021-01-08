import { Doughnut } from 'vue-chartjs'
// const { reactiveProp } = mixins
export default {
  extends: Doughnut,
  //   mixins: [reactiveProp],
  props: {
    chartData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // gradient: null,
    }
  },
  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.$refs.canvas.height = 300
    // this.gradient = this.$refs.canvas
    //   .getContext('2d')
    //   .createLinearGradient(0, 0, 0, 200)

    // this.gradient.addColorStop(0, 'rgba(223, 255,244, 1)')
    // this.gradient.addColorStop(1, 'rgba(255, 255, 255, 1)')
    this.renderChart(
      {
        labels: ['remains', 'sold'],
        datasets: [
          {
            // label: 'Data One',
            // backgroundColor: this.gradient,
            // borderColor: '#22BAB1',
            // borderJoinStyle: 'round',
            // fill: false,
            backgroundColor: ['#F9BCDC', '#775FDA'],
            data: this.chartData,
          },
        ],
      },
      {
        plugins: [
          {
            afterUpdate(chart) {
              if (
                chart.config.options.elements.arc.roundedCornersFor !==
                undefined
              ) {
                const arc = chart.getDatasetMeta(0).data[
                  chart.config.options.elements.arc.roundedCornersFor
                ]
                arc.round = {
                  x: (chart.chartArea.left + chart.chartArea.right) / 2,
                  y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
                  radius: (chart.outerRadius + chart.innerRadius) / 2,
                  thickness: (chart.outerRadius - chart.innerRadius) / 2 - 1,
                  backgroundColor: arc._model.backgroundColor,
                }
              }
            },

            afterDraw(chart) {
              if (
                chart.config.options.elements.arc.roundedCornersFor !==
                undefined
              ) {
                const ctx = chart.chart.ctx
                const arc = chart.getDatasetMeta(0).data[
                  chart.config.options.elements.arc.roundedCornersFor
                ]
                const startAngle = Math.PI / 2 - arc._view.startAngle
                const endAngle = Math.PI / 2 - arc._view.endAngle

                ctx.save()
                ctx.translate(arc.round.x, arc.round.y)
                console.log(arc.round.startAngle)
                ctx.fillStyle = arc.round.backgroundColor
                ctx.beginPath()
                ctx.arc(
                  arc.round.radius * Math.sin(startAngle),
                  arc.round.radius * Math.cos(startAngle),
                  arc.round.thickness,
                  0,
                  2 * Math.PI
                )
                ctx.arc(
                  arc.round.radius * Math.sin(endAngle),
                  arc.round.radius * Math.cos(endAngle),
                  arc.round.thickness,
                  0,
                  2 * Math.PI
                )
                ctx.closePath()
                ctx.fill()
                ctx.restore()
              }
            },
          },
        ],
        elements: {
          arc: {
            roundedCornersFor: 0,
          },
        },
        cutoutPercentage: 80,
        legend: {
          display: false,
        },
      }
    )
  },
}
