<template>
  <div>
    <div class="h-full">
      <BaseHeader></BaseHeader>
      <transition name="fade" appear>
        <main>
          <slot />
        </main>
      </transition>
      <BaseLoader :loading="loading" class="z-50"></BaseLoader>
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
import BaseLoader from "~/components/atoms/BaseLoader.vue";
export default {
  components: {
    BaseHeader,
    BaseFooter,
    BaseLoader,
  },
  data() {
    return {
      loading: true,
    };
  },
  mounted() {
    if (document && document.readyState == "complete") {
      this.loading = false;
      // fetch to next page or some code
    }
  },
  methods: {},
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
</style>
