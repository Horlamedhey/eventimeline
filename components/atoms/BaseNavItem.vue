<template>
  <li
    class="list-none"
    :class="[
      contentContainerClass,
      isCurrentRoute ? activeContentContainerClass : null,
    ]"
    @click="$emit('click', $event)"
  >
    <div
      v-if="indicator"
      :class="[isCurrentRoute ? 'bg-gray-variant2' : 'bg-transparent']"
      class="w-1 h-10 transition duration-500 ease-in group-hover:bg-gray-variant2"
    ></div>
    <a v-if="href" :href="href" target="_blank" :class="contentClass">
      <component
        :is="icon"
        v-if="icon && !addOnAfter"
        class="w-5 h-5 mr-4"
      ></component>
      <slot></slot>
      <component
        :is="icon"
        v-if="icon && addOnAfter"
        class="w-5 h-5"
      ></component>
    </a>
    <n-link
      v-else-if="to"
      :to="to"
      :exact="true"
      :class="[
        contentClass,
        Object.keys($route.query).includes(pointerKey) &&
        Object.values($route.query).includes(pointerValue)
          ? activeClass
          : '',
      ]"
    >
      <component
        :is="icon"
        v-if="icon && !addOnAfter"
        :class="[isCurrentRoute ? activeAddonClass : null, addOnClass]"
      ></component>
      <!-- ( -->
      <slot></slot>
      <component
        :is="icon"
        v-if="icon && addOnAfter"
        class="w-5 h-5"
        :class="[isCurrentRoute ? activeAddonClass : null, addOnClass]"
      ></component>
    </n-link>
    <BaseButton
      v-else
      :class="[active ? activeContentClass : null, contentClass]"
      @click="handleClick"
    >
      <component
        :is="icon"
        v-if="icon && !addOnAfter"
        class="w-5 h-5 mr-4"
      ></component>
      <slot></slot>
      <component
        :is="icon"
        v-if="icon && addOnAfter"
        class="w-5 h-5"
        :class="[active ? activeAddonClass : null, addOnClass]"
      ></component>
    </BaseButton>
  </li>
</template>

<script>
export default {
  name: 'BaseNavItem',
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
    icon: [Object, Function],
    // if is active button
    active: Boolean,
    // class(es) of the content of the list item(the main component - a/n-link/button)
    contentClass: [String, Array],
    // class(es) of the content of the list item(the main component - a/n-link/button) when active
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
  computed: {
    isCurrentRoute() {
      return (
        (Object.keys(this.$route.query).includes(this.pointerKey) &&
          Object.values(this.$route.query).includes(this.pointerValue)) ||
        (this.pointerValue === 'latest' && !this.$route.query[this.pointerKey])
      )
    },
  },
  methods: {
    handleClick(event) {
      this.$emit('click', event)
    },
  },
}
</script>
