<template>
  <div
    class="bg-gray-variant4"
    :style="{
      backgroundImage: `url(${require('@/static/images/confetti.jpg')})`,
    }"
  >
    <div
      ref="mainContainer"
      class="relative flex py-10 overflow-hidden md:justify-around"
      :style="{ minHeight: sideMenuHeight }"
    >
      <slot name="side-bar" :sidebarOpen="sidebarOpen"></slot>
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
          <div v-if="isMyEvents && myEventsLoading" class="text-center">
            Please wait while we fetch your events...
          </div>
          <div v-else-if="eventsLoading" class="text-center">
            Please wait while we fetch the events...
          </div>
          <div v-else-if="events && events.length === 0" class="text-center">
            Sorry, there are no events here at this moment.
            <br />
            Please check back later.
          </div>
          <template v-else>
            <BaseListEventCardsSection
              :sidebar-open="sidebarOpen"
              :toggle-side-bar-open="toggleSideBar"
              class="hidden px-4 sm:block"
              :events="events"
              :is-my-events="isMyEvents"
            ></BaseListEventCardsSection>

            <BaseGridEventCardsSection
              :sidebar-open="sidebarOpen"
              :toggle-side-bar-open="toggleSideBar"
              class="px-4 sm:hidden"
              :events="events"
              :is-my-events="isMyEvents"
            ></BaseGridEventCardsSection>
          </template>
        </div>
        <div
          class="flex items-center justify-between px-6 py-3 mt-6 bg-white shadow"
        >
          <div class="flex items-center">
            <BaseHeartBeatIcon class="inline text-primary"></BaseHeartBeatIcon>
            <span class="ml-2 font-medium font-quicksand text-black-800">
              Loaded items
            </span>
          </div>
          <div class="flex items-center">
            <span>{{ events.length }} of {{ count }}</span>
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
// import fetchEventsMixin from '~/mixins/fetchEventsMixin.js'
import basicMixins from '~/mixins/pagesBasicMixins.js'
export default {
  name: 'BaseEventsPagesSlot',
  mixins: [basicMixins],
  props: {
    eventsLoading: {
      type: Boolean,
      default: false,
    },
    myEventsLoading: {
      type: Boolean,
      default: true,
    },
    isMyEvents: {
      type: Boolean,
      default: false,
    },
    events: {
      type: Array,
      default: () => [],
    },
    count: {
      type: Number,
      default: 0,
    },
  },
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
