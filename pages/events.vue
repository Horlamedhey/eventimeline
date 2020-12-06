<template>
  <BaseEventsPagesSlot
    :events="events"
    :count="count"
    :loading="$fetchState.pending"
    @fetchMoreEvents="fetchMoreEvents"
  >
    <template v-slot:side-bar="{ sidebarOpen }">
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
    </template>
  </BaseEventsPagesSlot>
</template>

<script>
//
// mixins
import fetchEventsMixin from '~/mixins/fetchEventsMixin.js'
// import basicMixins from '~/mixins/pagesBasicMixins.js'
export default {
  metaInfo: {
    title: 'Events',
  },
  mixins: [fetchEventsMixin],
  data() {
    return {
      count: 0,
    }
  },
}
</script>
