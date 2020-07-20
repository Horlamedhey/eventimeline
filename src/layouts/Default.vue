<template>
  <div class="relative min-h-full">
    <div
      ref="content"
      :class="
        shouldPadBottom
          ? [$route.path === '/' ? 'body-content-home' : 'body-content']
          : []
      "
    >
      <BaseHeader class="bg-white"></BaseHeader>
      <transition name="fade" appear>
        <main>
          <slot
            :loading="loading"
            :sidebarOpen="sidebarOpen"
            :toggleSideBar="() => (sidebarOpen = !sidebarOpen)"
          />
        </main>
      </transition>
    </div>

    <BaseFooter></BaseFooter>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>
<script>
import BaseHeader from "~/components/organisms/BaseHeader.vue";
import BaseFooter from "~/components/organisms/BaseFooter.vue";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    BaseHeader,
    BaseFooter,
  },
  data() {
    return {
      loading: true,
      sidebarOpen: false,
      windowHeight: null,
      shouldPadBottom: false,
    };
  },
  mounted() {
    this.loading = false;

    this.setWindowHeight(window.innerHeight);
    window.addEventListener("resize", () => {
      this.setWindowHeight(window.innerHeight);
      setTimeout(() => {
        this.shouldPadBottom =
          this.$refs.content.clientHeight >
          this.windowHeight - this.footerHeight;
      }, 300);
      if (window.innerWidth >= 960) {
        this.sidebarOpen = false;
      }
    });
    this.setHydrated(true);
    this.shouldPadBottom =
      this.$refs.content.clientHeight > this.windowHeight - this.footerHeight;
  },
  computed: {
    ...mapState(["footerHeight"]),
    // shouldPadBottom() {
    //   return (
    //     this.$refs.content.clientHeight > this.windowHeight - this.footerHeight
    //   );
    // },
  },
  methods: {
    ...mapMutations(["setHydrated"]),
    setWindowHeight(val) {
      this.windowHeight = val;
    },
  },
};
</script>
<style>
html {
  height: 100vh;
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
