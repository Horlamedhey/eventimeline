<template>
  <ul v-if="items.length">
    <BaseNavItem
      v-for="item in items"
      :to="item.to"
      :href="item.href"
      :key="item.label"
      :contentClass="contentClass"
      @click="$emit('click', $emit)"
      >{{ item.label }}</BaseNavItem
    >
  </ul>
</template>

<script>
import BaseNavItem from "~/components/atoms/BaseNavItem.vue";
export default {
  name: "BaseNavList",
  components: {
    BaseNavItem,
  },
  props: {
    /** An array of nav item objects. List format: { label: String, to: [String, Array], href: String } */
    items: Array,
    contentClass: [String, Array],
  },
};
</script>

<style lang="scss"></style>
