<template>
  <div class="container">
    <svg width="200" height="200" class="chart-container">
      <circle cx="80" cy="80" r="70" class="back" fill="none" />
      <circle cx="80" cy="80" r="70" class="front" fill="none" />

      <g class="percentage">
        <text
          ref="percentage"
          x="100"
          y="100"
          alignment-baseline="central"
          text-anchor="middle"
        >
          0%
        </text>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'BaseRadialChart',
  data() {
    return {
      percent: 30,
      counter: 0,
      intervalID: null,
    }
  },
  mounted() {
    this.intervalID = setInterval(this.updateNumber, 100)
  },
  methods: {
    updateNumber() {
      const step = 4
      if (this.counter + step >= this.percent) {
        this.counter = this.percent
        this.$refs.percentage.innerHTML = this.counter + '%'
        clearInterval(this.intervalID)
        return
      }
      this.counter += step
      this.$refs.percentage.innerHTML = this.counter + '%'
    },
  },
}
</script>

<style lang="scss" scoped>
// Color
// Notes: these are SCSS variable
$light-grey: #edf2f4;
$grey: #8d99ae;
$primary: #08415c;

// In SCSS, class inside another class is equivalent to .parent .children selection in css
.container {
  display: flex;
  justify-content: center;
  background-color: $light-grey;
  min-height: 100vh;
  font-family: 'Nunito Sans', sans-serif;

  .chart-container {
    $stroke-width: 10;

    padding: 10px;

    .back {
      stroke: $primary;
      stroke-width: $stroke-width;
      stroke-linecap: round;
      // 565.49 is the diameter of the circle (2 * PI * radius) Ideally, you should calculate it in code instead of hardcoding. 169.647 is 565.49 * 0.3
      stroke-dasharray: 149;
      transform: rotate(-21deg);
      transform-origin: center;
      animation: fill-back 2s reverse;
    }

    .front {
      stroke: $grey;
      stroke-width: $stroke-width;
      stroke-linecap: round;
      // 565.49 is the diameter of the circle (2 * PI * radius) Ideally, you should calculate it in code instead of hardcoding. 395.84 is 565.49 * 0.7
      stroke-dasharray: 395.84;
      // Without transform and transform origin, the stroke won't start in the top
      transform: rotate(-90deg);
      transform-origin: center;
      animation: fill-front 2s reverse;
    }

    .text {
      font-size: 32px;
      // darken is a SCSS convenient function to make a color darker
      fill: darken($primary, 5%);
      opacity: 0;
      transform: translateY(30%);
      animation: display 2s forwards;
    }

    @keyframes fill-back {
      // 1000000 is just a really big number to make sure there will be no "dash" inside the stroke
      to {
        stroke-dasharray: 0, 1000000;
      }
    }

    @keyframes fill-front {
      // 1000000 is just a really big number to make sure there will be no "dash" inside the stroke
      to {
        stroke-dasharray: 0, 1000000;
      }
    }

    @keyframes display {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
}
</style>
