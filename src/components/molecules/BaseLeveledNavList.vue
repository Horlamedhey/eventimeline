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
        :activeAddonClass="activeAddonClass"
        :addOnClass="addOnClass"
        @click="handleClick"
      >
        {{ item.label }}
      </BaseNavItem>
      <BaseNavList
        v-if="item.active"
        :key="`${item.label}-subItems`"
        :items="item.subItems"
        class="rounded bg-primary"
        style="background-color: rgba(196, 196, 196, 0.25"
        addOnAfter
        contentContainerClass="flex group mt-6"
        contentClass="text-xl font-quicksand font-medium flex transition duration-300 ease-in group-hover:text-gray-variant3 w-full px-3 justify-between items-center categories focus:outline-none py-2"
        activeClass="text-gray-variant3"
        activeContentClass="border-l-3 border-primary shadow-lg"
        activeAddonClass="transition duration-100 ease-in unrotate"
        addOnClass="group-hover:text-gray-variant3 transition duration-100 ease-in transform -rotate-90"
        @click="handleClick"
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
  },
  methods: {
    handleClick(event) {
      this.$emit("click", event);
    },
  },
};
</script>

<style lang="scss"></style>
