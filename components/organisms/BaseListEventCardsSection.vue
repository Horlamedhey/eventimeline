<template>
  <div>
    <div class="flex items-center px-3">
      <BaseButton
        class="mr-4 md:hidden focus:outline-none"
        @click="toggleSideBarOpen"
      >
        <BaseSideBarIcon
          :class="sidebarOpen ? 'text-accent' : 'text-primary'"
        ></BaseSideBarIcon>
      </BaseButton>
    </div>
    <div
      class="flex flex-wrap items-center justify-center mt-12 overflow-auto events-container"
    >
      <BaseEventListCard
        v-for="event in events"
        :key="event._id"
        :event="event"
        :is-my-events="isMyEvents"
        class="w-full px-2 mb-10 lg:w-10/12 xl:w-6/12 xl:px-8"
      ></BaseEventListCard>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseListEventCardsSection',
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
}
</script>
