<template>
  <ul v-if="list.length">
    <BaseNavItem
      v-for="item in list"
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
    list: Array,
  },
};
</script>

<style lang="scss"></style>
