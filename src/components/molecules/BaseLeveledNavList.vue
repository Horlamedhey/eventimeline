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
        :pointerKey="item.pointerKey"
        :pointerValue="item.pointerValue"
        :contentClass="contentClass"
        :activeContentClass="activeContentClass"
        :contentContainerClass="contentContainerClass"
        :activeContentContainerClass="activeContentContainerClass"
        :activeClass="activeClass"
        :addOnAfter="addOnAfter"
        :activeAddonClass="[activeAddonClass, item.isOpen ? 'unrotate' : '']"
        :addOnClass="[addOnClass, item.isOpen ? '' : '-rotate-90']"
        @click="handleClick"
      >
        {{ item.label }}
      </BaseNavItem>
      <BaseNavList
        v-if="item.isOpen"
        :key="`${item.label}-subItems`"
        :items="item.subItems"
        :classes="[subListClasses]"
        addOnAfter
        :contentContainerClass="subListContentContainerClasses"
        :contentClass="subListContentClasses"
        :activeClass="subListActiveClasses"
        :activeContentClass="subListActiveContentClasses"
        :activeAddonClass="subListActiveAddonClasses"
        :addOnClass="subListAddOnClasses"
      ></BaseNavList>
    </template>
  </ul>
</template>

<script>
import BaseNavList from "~/components/molecules/BaseNavList.vue";
import BaseNavItem from "~/components/atoms/BaseNavItem.vue";
export default {
  name: "BaseLeveledNavList",
  components: {
    BaseNavList,
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
      this.$emit("click", event);
    },
  },
};
</script>

<style lang="scss">
.unrotate {
  transform: none !important;
}
</style>
