<template>
  <ul v-if="items.length" :class="[classes]">
    <BaseNavItem
      v-for="item in items"
      :key="item.label"
      :to="item.to"
      :href="item.href"
      :icon="item.icon"
      :active="item.active"
      :indicator="indicator"
      :pointer-key="item.pointerKey"
      :pointer-value="item.pointerValue"
      :content-class="contentClass"
      :active-content-class="activeContentClass"
      :content-container-class="contentContainerClass"
      :active-content-container-class="activeContentContainerClass"
      :active-class="activeClass"
      :add-on-after="addOnAfter"
      :active-addon-class="activeAddonClass"
      :add-on-class="addOnClass"
      @click="handleClick"
      >{{ item.label }}</BaseNavItem
    >
  </ul>
</template>

<script>
export default {
  name: 'BaseNavList',
  props: {
    /** An array of nav item objects. List format: { label: String, to: [String, Array], href: String } */
    items: Array,
    // class(es) of the sublist
    classes: [String, Array],
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
      this.$emit('click', event)
    },
  },
}
</script>
