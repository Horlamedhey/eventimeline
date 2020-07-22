<template>
  <div>
    <transition>
      <router-view />
    </transition>
    <BaseLoader :loading="!$store.state.hydrated" class="z-50"></BaseLoader>
  </div>
</template>

<script>
import BaseLoader from "~/components/atoms/BaseLoader.vue";
export default {
  components: {
    BaseLoader,
  },
};
</script>
