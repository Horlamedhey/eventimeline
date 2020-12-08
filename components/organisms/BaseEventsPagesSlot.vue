<template>
  <div class="bg-gray-variant4">
    <!-- :style="{
      backgroundImage: `url(${require('@/static/images/confetti.jpg')})`,
    }" -->
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
          v-if="showPaginationInfo && count > 0"
          class="flex justify-between px-6 pb-3 mt-6 font-medium bg-white shadow lg:justify-between sm:flex-wrap lg:flex-no-wrap font-quicksand text-black-800"
        >
          <div
            v-if="showPaginationInfo"
            class="flex items-center pt-3 sm:justify-center lg: sm:justify-start sm:w-full lg:w-auto"
          >
            <BaseHeartBeatIcon class="inline text-primary"></BaseHeartBeatIcon>
            <span class="ml-2">
              Showing {{ 12 * (pageNumber - 1) + 1 }}
              <span v-if="lastItemNumber > 1">
                to
                {{ lastItemNumber }}
              </span>
              of {{ count }} event<span v-if="lastItemNumber > 1">s</span>
            </span>
          </div>
          <div
            v-if="showPaginationInfo && count > 12"
            class="flex items-center sm:justify-center lg: sm:justify-start sm:mt-3 lg:mt-0 sm:w-full lg:w-auto"
          >
            <BaseButton
              v-if="pageCount > 10"
              :to="computePath(pageNumberCoefficient - 9)"
              :disabled="pageNumber < 11"
              class="inline mt-3 text-black-600"
            >
              <BaseDoubleChevronLeftIcon></BaseDoubleChevronLeftIcon>
            </BaseButton>

            <BaseButton
              :to="computePath(pageNumber - 1)"
              :disabled="pageNumber === 1"
            >
              <BaseChevronDownIcon
                class="inline mt-3 transform rotate-90 text-black-600"
              ></BaseChevronDownIcon>
            </BaseButton>

            <BaseButton
              v-for="i in Math.min(pageCount, 10)"
              :key="i"
              :to="computePath(i + pageNumberCoefficient)"
              class="mx-1 group"
            >
              <div
                :class="
                  pageNumber === i + pageNumberCoefficient
                    ? 'bg-primary'
                    : 'bg-transparent'
                "
                class="w-8 h-1 transition duration-300 rounded-b group-hover:bg-primary"
              ></div>
              <div class="mt-2 text-center">
                {{ i + pageNumberCoefficient }}
              </div>
            </BaseButton>
            <BaseButton
              :to="computePath(pageNumber + 1)"
              :disabled="pageNumber === pageCount"
            >
              <BaseChevronDownIcon
                class="inline mt-3 transform -rotate-90 text-black-600"
              ></BaseChevronDownIcon>
            </BaseButton>
            <BaseButton
              v-if="pageCount > 10"
              :disabled="pageNumberCoefficient + 10 === pageCount"
              :to="computePath(pageNumberCoefficient + 11)"
              class="inline mt-3 text-black-600"
            >
              <BaseDoubleChevronLeftIcon
                class="transform -rotate-180"
              ></BaseDoubleChevronLeftIcon>
            </BaseButton>
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
  computed: {
    pageNumber() {
      return parseInt(this.$route.query.page) || 1
    },
    pageCount() {
      return Math.ceil(this.count / 12)
    },
    lastItemNumber() {
      return Math.min(this.count, 12 * this.pageNumber)
    },
    showPaginationInfo() {
      return (
        ((!this.isMyEvents && !this.eventsLoading) ||
          (this.isMyEvents && !this.myEventsLoading)) &&
        this.events.length > 0
      )
    },
    pageNumberCoefficient() {
      return (
        Math.floor(
          (this.pageNumber % 10 === 0 ? this.pageNumber - 1 : this.pageNumber) /
            10
        ) * 10
      )
    },
  },
  methods: {
    computePath(pageNumber) {
      return {
        path: this.$route.path,
        query: {
          category: this.$route.query.category,
          timeline: this.$route.query.timeline,
          price: this.$route.query.price,
          location: this.$route.query.location,
          page: pageNumber,
        },
      }
    },
  },
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
