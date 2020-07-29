<template>
  <ul v-if="items.length">
    <template v-for="item in items">
      <BaseNavItem
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
        :active-addon-class="[activeAddonClass, item.isOpen ? 'unrotate' : '']"
        :add-on-class="[addOnClass, item.isOpen ? '' : '-rotate-90']"
        @click="handleClick"
      >
        {{ item.label }}
      </BaseNavItem>
      <BaseNavList
        v-if="item.isOpen"
        :key="`${item.label}-subItems`"
        :items="item.subItems"
        :classes="[subListClasses]"
        add-on-after
        :content-container-class="subListContentContainerClasses"
        :content-class="subListContentClasses"
        :active-class="subListActiveClasses"
        :active-content-class="subListActiveContentClasses"
        :active-addon-class="subListActiveAddonClasses"
        :add-on-class="subListAddOnClasses"
      ></BaseNavList>
    </template>
  </ul>
</template>

<script>
export default {
  name: 'BaseLeveledNavList',
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
    // class(es) of the sublist
    subListClasses: [String, Array],
    // class(es) of the sublist
    subListContentContainerClasses: [String, Array],
    // class(es) of the sublist
    subListContentClasses: [String, Array],
    // class(es) of the sublist
    subListActiveClasses: [String, Array],
    // class(es) of the sublist
    subListActiveContentClasses: [String, Array],
    // class(es) of the sublist
    subListActiveAddonClasses: [String, Array],
    // class(es) of the sublist
    subListAddOnClasses: [String, Array],
  },
  methods: {
    handleClick(event) {
      this.$emit('click', event)
    },
  },
}
</script>

<style lang="scss">
.unrotate {
  transform: none !important;
}
</style>
