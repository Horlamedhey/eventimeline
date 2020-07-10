<template>
  <li
    @click="$emit('click', $event)"
    class="list-none"
    :class="[
      contentContainerClass,
      isCurrentRoute ? activeContentContainerClass : null,
    ]"
  >
    <div
      v-if="indicator"
      :class="[isCurrentRoute ? 'bg-gray-variant2' : 'bg-transparent']"
      class="w-1 h-10 transition duration-500 ease-in group-hover:bg-gray-variant2"
    ></div>
    <a v-if="href" :href="href" target="_blank" :class="contentClass">
      <component v-if="icon" :is="icon" class="w-5 h-5 mr-4"></component>
      <slot></slot>
    </a>
    <g-link
      v-else-if="to"
      :to="to"
      :exact="false"
      :class="contentClass"
      :exact-active-class="activeClass"
    >
      <component
        v-if="icon"
        :is="icon"
        class="w-5 h-5 mr-4"
        :class="[isCurrentRoute ? activeAddonClass : null, addOnClass]"
      ></component>
      <!-- ( -->
      <slot></slot>
    </g-link>
    <BaseButton v-else :class="contentClass">
      <component v-if="icon" :is="icon" class="w-5 h-5 mr-4"></component>
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
    // attribute for url query name
    pointerKey: String,
    // attribute for url query value
    pointerValue: String,
    // additional icon component
    icon: Object,
    // class(es) of the content of the list item(the main component - a/g-link/button)
    contentClass: [String, Array],
    // class(es) of the list item
    contentContainerClass: [String, Array],
    // class(es) of the active link
    activeClass: [String, Array],
    // class(es) of the container of the active link
    activeContentContainerClass: [String, Array],
    // class(es) of the additional icon of the active link
    activeAddonClass: [String, Array],
    // class(es) of the additional icon of each link
    addOnClass: [String, Array],
    // If indicator should be shown on active list item
    indicator: Boolean,
  },
  computed: {
    isCurrentRoute() {
      return (
        (Object.keys(this.$route.query).includes(this.pointerKey) &&
          Object.values(this.$route.query).includes(this.pointerValue)) ||
        (this.pointerValue === "all" && !this.$route.query[this.pointerKey])
      );
    },
  },
};
</script>

<style lang="scss"></style>
