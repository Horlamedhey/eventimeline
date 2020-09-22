<template>
  <div class="bg-gray-variant4">
    <div
      ref="mainContainer"
      class="relative flex py-10 overflow-hidden md:justify-around"
      :style="{ minHeight: sideMenuHeight }"
    >
      <!-- sidebar -->
      <div
        ref="sideMenu"
        :class="
          sidebarOpen
            ? 'translate-x-0 sm:translate-x-1/12 ease-out'
            : '-translate-x-full ease-in md:translate-x-0'
        "
        class="absolute w-9/12 overflow-y-hidden transition duration-300 transform bg-white md:relative sm:w-4/12 md:w-3/12 lg:w-2/12 side-menu-container"
      >
        <div class="side-menu">
          <BaseFilterNav></BaseFilterNav>
        </div>
      </div>
      <!-- Main content -->
      <div
        ref="mainContent"
        class="w-full transition duration-300 transform md:w-8/12 lg:w-9/12"
        :class="
          sidebarOpen
            ? ['translate-x-10/12', 'sm:translate-x-5/12', 'ease-out']
            : 'translate-x-0 ease-in'
        "
      >
        <div
          style="box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2)"
          class="py-2 overflow-y-auto bg-gray-200 main-content"
        >
          <BaseListEventCardsSection
            :sidebar-open="sidebarOpen"
            :toggle-side-bar-open="toggleSideBar"
            class="hidden px-4 sm:block"
            :events="events"
          ></BaseListEventCardsSection>

          <BaseGridEventCardsSection
            :sidebar-open="sidebarOpen"
            :toggle-side-bar-open="toggleSideBar"
            class="px-4 sm:hidden"
            :events="events"
          ></BaseGridEventCardsSection>
        </div>
        <div
          class="flex items-center justify-between px-6 py-3 mt-6 bg-white shadow"
        >
          <div class="flex items-center">
            <BaseHeartBeatIcon class="inline text-primary"></BaseHeartBeatIcon>
            <span class="ml-2 font-medium font-quicksand text-black-800">
              See trending
            </span>
          </div>
          <div class="flex items-center">
            <span>1 of 3206</span>
            <BaseChevronDownIcon
              class="inline transform -rotate-90 text-black-600"
            ></BaseChevronDownIcon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//
// mixins
import basicMixins from '~/mixins/pagesBasicMixins.js'
export default {
  metaInfo: {
    title: 'Events',
  },
  mixins: [basicMixins],
  data() {
    return {}
  },
  computed: {},
}
</script>

<style lang="scss">
@media (max-width: 960px) {
  .side-menu-container {
    height: calc(100vh - 9.4rem);
  }
}
.side-menu {
  height: 95%;
  margin-top: 3%;
  overflow-y: auto;
}
.main-content {
  max-height: calc(100vh - 14rem);
}
.side-menu-container {
  max-height: calc(100vh - 9.4rem);
}
</style>
