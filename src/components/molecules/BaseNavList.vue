<template>
  <ul v-if="items.length">
    <BaseNavItem
      v-for="item in items"
      :to="item.to"
      :href="item.href"
      :key="item.label"
      @click="$emit('click', $emit)"
      >{{ item.label }}</BaseNavItem
    >
  </ul>
</template>

<script>
export default {
  name: "BaseNavList",
  props: {
    /** An array of nav item objects. List format: { label: String, to: [String, Array], href: String } */
    items: Array,
  },
};
</script>

<style lang="scss"></style>
