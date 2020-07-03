<template>
  <li @click="$emit('click', $event)" class="list-none">
    <a v-if="href" :href="href" target="_blank" :class="contentClass">
      <slot></slot>
    </a>
    <g-link v-else-if="to" :to="to" :class="contentClass">
      <slot></slot>
    </g-link>
    <BaseButton v-else :class="contentClass">
      <slot></slot>
    </BaseButton>
  </li>
</template>

<script>
import BaseButton from "~/components/atoms/BaseButton.vue";
export default {
  name: "BaseNavItem",
  components: {
    BaseButton,
  },
  props: {
    /** to attribute for <router-link> */
    to: {
      type: [String, Object],
    },
    /** href attribute for <a> */
    href: String,
    contentClass: [String, Array],
  },
};
</script>

<style lang="scss"></style>
