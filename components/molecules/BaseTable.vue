<template>
  <div class="p-5 bg-white rounded-lg shadow-outline">
    <h4
      v-if="tableBody.length === 0 || noData"
      class="text-lg font-medium text-center"
    >
      {{ noDataText }}
    </h4>
    <template v-else>
      <h4>{{ title }}</h4>
      <table class="w-full mt-3">
        <thead
          class="font-bold text-1xl bg-primary-variant-light text-primary-variant"
        >
          <tr>
            <td
              v-for="(tableHead, i) in tableHeads"
              :key="`tableHead-${i}`"
              class="table-head"
            >
              {{ tableHead }}
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="h-5"></td>
          </tr>
        </tbody>
        <tbody class="rounded shadow-outline">
          <tr v-for="(tableRow, i) in tableBody" :key="`tableRow-${i}`">
            <td
              v-for="tableRowItem in tableRow"
              :key="tableRowItem"
              class="table-body"
            >
              {{ tableRowItem }}
            </td>
            <td v-if="rowHasAction">
              <BaseButton
                class="px-2 py-1 font-medium rounded text-primary-variant ripple-bg-primary-variant-light"
                @click="takeAction(i)"
              >
                {{ actionText }}
              </BaseButton>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>

<script>
export default {
  name: 'BaseTable',
  props: {
    title: {
      type: String,
      default: '',
    },
    noDataText: {
      type: String,
      default: '',
    },
    noData: {
      type: Boolean,
      default: true,
    },
    tableHeads: {
      type: Array,
      default: () => [],
    },
    tableBody: {
      type: Array,
      default: () => [],
    },
    rowHasAction: {
      type: Boolean,
      default: true,
    },
    actionText: {
      type: String,
      default: '',
    },
    takeAction: {
      type: Function,
      default: () => {},
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
