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
      class="flex flex-wrap items-center justify-center mt-12 events-container"
    >
      <BaseEventListCard
        v-for="event in $page.listEvents.edges"
        :key="event.node.id"
        :event="event.node"
        class="w-full px-2 mb-10 lg:w-6/12"
      ></BaseEventListCard>
    </div>
  </div>
</template>

<script>
import BaseButton from "~/components/atoms/BaseButton.vue";
import BaseSideBarIcon from "~/components/atoms/icons/BaseSideBarIcon.vue";
import BaseEventListCard from "~/components/molecules/BaseEventListCard.vue";
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
    BaseEventListCard,
    BaseSideBarIcon,
  },
};
</script>

<style lang="scss" scoped></style>
