<template>
  <li @click="$emit('click', $event)" class="list-none">
    <a v-if="href" :href="href" target="_blank">
      <slot></slot>
    </a>
    <g-link v-else-if="to" :to="to">
      <slot></slot>
    </g-link>
    <slot v-else></slot>
  </li>
</template>

<script>
export default {
  name: "BaseNavItem",
  props: {
    /** to attribute for <router-link> */
    to: {
      type: [String, Object],
    },
    /** href attribute for <a> */
    href: String,
  },
};
</script>

<style lang="scss"></style>
