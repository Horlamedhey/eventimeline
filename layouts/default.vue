<template>
  <div class="relative min-h-screen">
    <div
      ref="content"
      :class="[
        $route.path === '/' ? 'body-content-home' : 'body-content',
        { 'bg-gray-variant6': $route.path === '/create-event' },
      ]"
    >
      <BaseHeader class="bg-white"></BaseHeader>
      <transition name="slide" appear>
        <main>
          <Nuxt />
        </main>
      </transition>
    </div>

    <BaseFooter></BaseFooter>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  // middleware: 'realmAuth',
  data() {
    return {
      windowHeight: null,
      shouldPadBottom: false,
    }
  },
  computed: {
    ...mapState(['footerHeight', 'hydrated']),
    // shouldPadBottom() {
    //   return (
    //     this.$refs.content.clientHeight > this.windowHeight - this.footerHeight
    //   );
    // },
  },
  mounted() {
    this.setWindowHeight(window.innerHeight)
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        if (this.hydrated && this.$refs.content !== undefined) {
          this.setWindowHeight(window.innerHeight)
          setTimeout(() => {
            this.shouldPadBottom =
              this.$refs.content.clientHeight >
              this.windowHeight - this.footerHeight
          }, 300)
          if (window.innerWidth >= 960) {
            this.sidebarOpen = false
          }
        }
      })
      if (this.hydrated && this.$refs.content !== undefined) {
        this.shouldPadBottom =
          this.$refs.content.clientHeight >
          this.windowHeight - this.footerHeight
      }
    })
  },
  methods: {
    setWindowHeight(val) {
      this.windowHeight = val
    },
  },
}
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

html {
  height: 100vh;
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
body {
  user-select: none;
  height: inherit;
  margin: 0;
  padding: 0;
  line-height: 1.5;
}
.body-content {
  padding-bottom: 38rem;
}
.body-content-home {
  padding-bottom: 45rem;
}
@media (min-width: 600px) {
  .body-content {
    padding-bottom: 27rem;
  }
  .body-content-home {
    padding-bottom: 35rem;
  }
}
</style>
