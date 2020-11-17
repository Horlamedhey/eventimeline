<template>
  <div>
    <div class="flex items-center">
      <BaseButton
        class="mr-4 md:hidden focus:outline-none"
        @click="toggleSideBarOpen"
      >
        <BaseSideBarIcon
          :class="sidebarOpen ? 'text-accent' : 'text-primary'"
        ></BaseSideBarIcon>
      </BaseButton>
      <h1
        v-if="$route.path === '/'"
        class="pt-1 font-semibold capitalize md:pt-0 text-1xl font-josefinsans"
        style="color: #1b1b1b"
      >
        Popular
        <span
          v-if="$route.query.timeline"
          class="text-base font-normal font-quicksand"
          style="color: rgba(27, 27, 27, 0.6)"
        >
          {{ $route.query.timeline.split('-').join(' ') }}
        </span>
      </h1>
    </div>
    <div
      class="flex flex-wrap items-center justify-center mt-12 sm:justify-start events-container"
    >
      <BaseEventGridCard
        v-for="event in events"
        :key="event.id"
        :event="event"
        :is-my-events="isMyEvents"
        class="w-8/12 mx-2 mb-10 sm:mx-7 md:mx-6 lg:mx-12 sm:w-3/12 lg:w-2/12 xl:w-2/12 xl:mx-10"
      ></BaseEventGridCard>
    </div>

    <BaseButton
      v-if="$route.path === '/'"
      to="/events"
      class="w-64 px-5 py-2 mx-auto mt-12 text-sm text-center text-white event-buttons bg-accent font-josefinsans focus:outline-none hover:bg-opacity-75"
    >
      See all events
    </BaseButton>
  </div>
</template>

<script>
export default {
  name: 'BaseGridEventCardsSection',
  props: {
    isMyEvents: {
      type: Boolean,
      default: false,
    },
    events: {
      type: Array,
      default: () => [],
    },

    sidebarOpen: {
      type: Boolean,
      default: false,
    },
    toggleSideBarOpen: {
      type: Function,
      default: () => {},
    },
  },
  computed: {},
  methods: {},
}
</script>
