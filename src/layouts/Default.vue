<template>
  <div>
    <div class="h-full">
      <BaseHeader></BaseHeader>
      <transition name="fade" appear>
        <main>
          <slot />
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
export default {
  components: {
    BaseHeader,
    BaseFooter,
  },
  data() {
    return {};
  },
  mounted() {},
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
