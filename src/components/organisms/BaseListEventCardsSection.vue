<template>
  <div>
    <div class="flex items-center">
      <BaseButton
        class="mr-4 md:hidden focus:outline-none"
        @click="toggleSideBarOpen"
      >
        <BaseSideBarIcon
          :class="sidebarOpen ? 'text-secondary' : 'text-gray-variant'"
        ></BaseSideBarIcon>
      </BaseButton>
    </div>
    <div
      class="flex flex-wrap items-center justify-center mt-12 sm:justify-start events-container"
    >
      <BaseEventGridCard
        v-for="event in $page.events.edges"
        :key="event.node.id"
        :event="event.node"
        class="w-8/12 px-2 mb-10 sm:px-3 lg:px-5 sm:w-4/12 lg:w-3/12 xl:w-2/12"
      ></BaseEventGridCard>
    </div>

    <BaseButton
      to="/events"
      class="w-64 px-5 py-2 mx-auto mt-12 text-sm text-center text-white event-buttons bg-accent font-josefinsans focus:outline-none hover:bg-opacity-75"
    >
      See all events
    </BaseButton>
  </div>
</template>

<script>
import BaseButton from "~/components/atoms/BaseButton.vue";
import BaseSideBarIcon from "~/components/atoms/icons/BaseSideBarIcon.vue";
import BaseEventGridCard from "~/components/molecules/BaseEventGridCard.vue";
export default {
  name: "BaseListEventCardsSection",
  props: {
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
  components: {
    BaseButton,
    BaseEventGridCard,
    BaseSideBarIcon,
  },
};
</script>

<style lang="scss" scoped></style>
