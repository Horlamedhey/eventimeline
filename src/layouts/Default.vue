<template>
  <div class="h-full">
    <BaseHeader></BaseHeader>
    <transition name="fade" appear>
      <main>
        <slot />
      </main>
    </transition>
    <BaseFooter></BaseFooter>
    <BaseLoader :loading="loading"></BaseLoader>
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
      loading: false,
    };
  },
  mounted() {
    // setTimeout(() => {
    //   this.loading = false;
    // }, 5000);
  },
  methods: {},
};
</script>
<style>
html {
  height: 100vh;
}
body {
  height: inherit;
  margin: 0;
  padding: 0;
  line-height: 1.5;
}
</style>
