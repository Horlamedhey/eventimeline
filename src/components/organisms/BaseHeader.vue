<template>
  <header
    class="flex items-center justify-between px-5 py-3 header sm:px-11 sm:py-5"
  >
    <div class="w-auto">
      <div class="hidden md:block">
        <g-link to="/">
          <g-image src="~/assets/images/logo.png" class=""></g-image>
        </g-link>
      </div>
      <div class="md:hidden">
        <g-link to="/">
          <g-image src="~/assets/images/logo-small.png" class=""></g-image>
        </g-link>
      </div>
    </div>
    <div class="flex items-center justify-end w-9/12">
      <BaseInput
        id="search-input"
        name="search"
        type="search"
        placeholder="Search for events near you..."
        classList="bg-gray-200 xl:w-4/6 lg:w-3/6 md:w-4/6 sm:w-7/12 hidden sm:block"
        inputClassList="text-sm font-inter placeholder-gray-500 py-3"
      ></BaseInput>

      <nav class="w-auto text-right ">
        <ul class="flex items-center justify-end space-x-2">
          <BaseButton class="sm:hidden">
            <BaseSearchIcon class="w-6 h-6 sm:hidden"></BaseSearchIcon>
          </BaseButton>

          <BaseNavItem
            class="text-sm font-inter"
            contentClass=" text-gray-500 hover:text-black px-4 py-2 flex items-center  hover:bg-gray-200 rounded transition-colors duration-500 ease-in-out focus:outline-none active:bg-gray-400"
          >
            <span>
              Help
            </span>

            <BaseChevronDownIcon
              class="inline-block w-5 h-5"
            ></BaseChevronDownIcon>
          </BaseNavItem>
          <BaseNavItem
            to="/create"
            class="text-sm font-inter text-primary"
            contentClass="px-4 py-2 flex items-center  hover:bg-primary hover:text-white rounded transition-colors duration-500 ease-in-out"
          >
            <span class="font-semibold">Create Event</span>

            <BaseAddIcon
              class="inline-block w-5 h-5"
              stroke-width="2.5"
            ></BaseAddIcon>
          </BaseNavItem>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import BaseInput from "~/components/atoms/BaseInput.vue";
import BaseButton from "~/components/atoms/BaseButton.vue";
import BaseChevronDownIcon from "~/components/atoms/BaseChevronDownIcon.vue";
import BaseAddIcon from "~/components/atoms/BaseAddIcon.vue";
import BaseSearchIcon from "~/components/atoms/BaseSearchIcon.vue";
import BaseNavItem from "~/components/atoms/BaseNavItem.vue";
export default {
  name: "BaseHeader",
  components: {
    BaseInput,
    BaseButton,
    BaseChevronDownIcon,
    BaseAddIcon,
    BaseSearchIcon,
    BaseNavItem,
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
