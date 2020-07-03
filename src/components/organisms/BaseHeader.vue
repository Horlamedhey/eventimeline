<template>
  <header
    class="header sm:flex sm:justify-between sm:items-center sm:px-5 sm:py-11"
  >
    <div class="flex items-center justify-between px-4 py-3 sm:p-0">
      <div>
        <g-link to="/">
          <g-image src="~/assets/images/logo.png"></g-image>
        </g-link>
      </div>
      <div class="sm:hidden">
        <button
          @click="toggleMenu"
          type="button"
          class="block text-gray-500 hover:text-white focus:text-white focus:outline-none"
        >
          <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
            <path
              v-if="menuIsOpen"
              fill-rule="evenodd"
              d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
            />
            <path
              v-if="!menuIsOpen"
              fill-rule="evenodd"
              d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
            />
          </svg>
        </button>
      </div>
    </div>

    <BaseInput
      id="search-input"
      name="search"
      type="search"
      placeholder="Search for events near you..."
      classList="bg-gray-200 sm:w-1/3 w-9/12"
      inputClassList="text-sm font-inter placeholder-gray-500"
    ></BaseInput>
    <nav :class="menuIsOpen ? 'hidden' : 'block'">
      <BaseNavList>
        <BaseNavItem>Help</BaseNavItem>
        <BaseNavItem>Create</BaseNavItem>
      </BaseNavList>
    </nav>
    <nav
      :class="menuIsOpen ? 'block' : 'hidden'"
      class="px-2 pt-2 pb-4 sm:flex sm:p-0"
    ></nav>
  </header>
</template>

<script>
export default {
  name: "BaseHeader",
  props: {
    /** An array of nav item objects. List format: { label: String, to: [String, Array], href: String } */
    navList: Array,
  },
  data() {
    return {
      menuIsOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuIsOpen = !this.menuIsOpen;
    },
  },
};
</script>

<style lang="scss"></style>
