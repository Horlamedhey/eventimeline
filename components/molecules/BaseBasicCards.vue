<template>
  <div class="p-5 mt-16 bg-white rounded-lg shadow-outline lg:hidden">
    <h4
      v-if="cardContents.length === 0"
      class="text-lg font-medium text-center"
    >
      {{ noDataText }}
    </h4>
    <template v-else>
      <h4>{{ title }}</h4>
      <div
        class="grid grid-cols-1 gap-10 pb-4 pl-5 pr-10 mt-3 rounded shadow-outline sm:grid-cols-2 lg:grid-cols-2 pt-9"
      >
        <div
          v-for="(ticket, i) in cardContents"
          :key="`ticket-${i}`"
          class="pattern-dots-md text-primary-variant"
        >
          <div
            class="flex-col p-4 space-y-2 overflow-hidden transform translate-x-5 -translate-y-5 rounded-lg shadow bg-primary-variant"
          >
            <div
              v-for="(content, key, j) in ticket"
              :key="`content-${j}`"
              class="flex-col"
            >
              <h3 class="text-xl text-primary-variant-light whitespace-nowrap">
                {{ cardTitles[j] }}:
              </h3>
              <h4 class="text-lg font-medium text-gray-300">
                {{ content }}
              </h4>
            </div>
            <!-- <div class="flex">
              <h3 class="text-xl text-primary-variant-light">Ticket ID:</h3>
            </div>
            <div class="flex">
              <h3 class="text-xl text-primary-variant-light">Agent:</h3>
            </div>
            <div class="flex">
              <h3 class="text-xl text-primary-variant-light">Type:</h3>
            </div>
            <div class="flex">
              <h3 class="text-xl text-primary-variant-light">Amount:</h3>
            </div> -->
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'BaseBasicCards',
  props: {
    title: {
      type: String,
      default: '',
    },
    icon: {
      type: Function,
      default: null,
    },
    actionClass: {
      type: [String, Array],
      default: '',
    },
    noDataText: {
      type: String,
      default: '',
    },
    cardTitles: {
      type: Array,
      default: () => [],
    },
    cardContents: {
      type: Array,
      default: () => [],
    },
    rowHasAction: {
      type: Boolean,
      default: false,
    },
    actionText: {
      type: String,
      default: '',
    },
    takeAction: {
      type: Function,
      default: null,
    },
  },
}
</script>

<style lang="scss">
.table-head {
  &:first-child {
    border-radius: 5px 0 0 5px;
    @apply pl-5;
  }

  &:last-child {
    border-radius: 0 5px 5px 0;
    @apply pr-5;
  }
  @apply py-2;
}
.table-body {
  &:first-child {
    @apply pl-5;
  }

  &:last-child {
    @apply pr-5;
  }
  @apply py-2 font-medium text-lg;
}
</style>
