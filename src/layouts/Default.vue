<template>
  <div class="h-full">
    <BaseHeader></BaseHeader>
    <transition name="fade" appear>
      <main>
        <slot />
      </main>
    </transition>
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
export default {
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
