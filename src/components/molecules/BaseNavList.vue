<template>
  <ul v-if="items.length">
    <BaseNavItem
      v-for="item in items"
      :to="item.to"
      :href="item.href"
      :key="item.label"
      :icon="item.icon"
      :active="item.active"
      :indicator="indicator"
      :pointerKey="item.pointerKey"
      :pointerValue="item.pointerValue"
      :contentClass="contentClass"
      :activeContentClass="activeContentClass"
      :contentContainerClass="contentContainerClass"
      :activeContentContainerClass="activeContentContainerClass"
      :activeClass="activeClass"
      :addOnAfter="addOnAfter"
      :activeAddonClass="activeAddonClass"
      :addOnClass="addOnClass"
      @click="handleClick"
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
    // class(es) of the content of the list item(the main component - a/g-link/button)
    contentClass: [String, Array],
    // class(es) of the content of the list item(the main component - a/g-link/button) when active
    activeContentClass: [String, Array],
    // class(es) of the list item
    contentContainerClass: [String, Array],
    // class(es) of the active link
    activeClass: [String, Array],
    // class(es) of the container of the active link
    activeContentContainerClass: [String, Array],
    // if icon should come after
    addOnAfter: Boolean,
    // class(es) of the additional icon of the active link
    activeAddonClass: [String, Array],
    // class(es) of the additional icon of each link
    addOnClass: [String, Array],
    // If indicator should be shown on active list item
    indicator: Boolean,
  },
  methods: {
    handleClick(event) {
      this.$emit("click", event);
    },
  },
};
</script>

<style lang="scss"></style>
