<template>
  <header
    class="flex items-center justify-between px-2 py-3 header sm:px-11 sm:py-5"
  >
    <div class="w-auto">
      <div class="hidden md:block">
        <n-link to="/">
          <client-only>
            <cld-image
              public-id="events/logo.png"
              alt="logo"
              fetch-format="auto"
              quality="auto"
              client-hints="true"
              loading="lazy"
              width="200"
              style="max-width: 200px"
            >
              <cld-placeholder type="blur"> </cld-placeholder>
            </cld-image>
          </client-only>
        </n-link>
      </div>
      <div class="md:hidden">
        <n-link to="/">
          <client-only>
            <cld-image
              public-id="events/logo-small.png"
              alt="logo"
              fetch-format="auto"
              quality="auto"
              client-hints="true"
              loading="lazy"
              width="40"
              style="max-width: 40px"
            >
              <cld-placeholder type="blur"> </cld-placeholder>
            </cld-image>
          </client-only>
        </n-link>
      </div>
    </div>
    <div class="flex items-center justify-end w-9/12">
      <BaseInput
        field-id="search-input"
        name="search"
        type="search"
        placeholder="Search for events near you..."
        class-list="bg-gray-200 xl:w-4/6 lg:w-3/6 md:w-4/6 sm:w-7/12 hidden sm:block mr-1"
        input-class-list="text-sm font-inter placeholder-gray-500 py-3"
      ></BaseInput>

      <nav class="w-auto text-right">
        <ul class="flex items-center justify-end sm:space-x-2">
          <BaseButton class="sm:hidden">
            <BaseSearchIcon class="w-5 h-5 sm:hidden"></BaseSearchIcon>
          </BaseButton>

          <BaseNavItem
            class="ml-1 text-xs sm:text-sm font-inter"
            content-class="flex items-center px-2 py-1 text-gray-500 transition-colors duration-500 ease-in-out rounded hover:text-black hover:bg-gray-200 focus:outline-none active:bg-gray-400"
          >
            <span> Help </span>

            <BaseChevronDownIcon
              class="inline-block w-4 h-4"
            ></BaseChevronDownIcon>
          </BaseNavItem>
          <BaseNavItem
            to="/create-event"
            class="text-xs sm:text-sm font-inter text-primary"
            content-class="flex items-center px-2 py-1 whitespace-no-wrap transition-colors duration-500 ease-in-out rounded hover:bg-primary hover:text-white"
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
export default {
  name: 'BaseHeader',
  data() {
    return {
      // menuIsOpen: false,
    }
  },
  methods: {
    // toggleMenu() {
    //   this.menuIsOpen = !this.menuIsOpen;
    // },
  },
}
</script>
