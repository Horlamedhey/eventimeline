<template>
  <div class="p-5 bg-white rounded-lg shadow-outline">
    <h4 v-if="tableBody.length === 0" class="text-lg font-medium text-center">
      {{ noDataText }}
    </h4>
    <template v-else>
      <h4>{{ title }}</h4>
      <table class="w-full mt-3">
        <thead
          v-if="tableHeads.length > 0"
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
        <tbody v-if="tableHeads.length > 0">
          <tr>
            <td class="h-5"></td>
          </tr>
        </tbody>
        <tbody
          :class="tableHeads.length > 0 ? ['rounded', 'shadow-outline'] : []"
        >
          <tr v-for="(tableRow, i) in tableBody" :key="`tableRow-${i}`">
            <td
              v-for="tableRowItem in tableRow"
              :key="tableRowItem"
              class="table-body"
              :style="
                tableHeads.length === 0
                  ? { paddingLeft: '0', paddingRight: '0' }
                  : {}
              "
            >
              {{ tableRowItem }}
            </td>
            <td v-if="rowHasAction">
              <BaseButton
                class="font-medium"
                :class="[
                  actionClass,
                  icon !== null ? 'rounded-full p-1' : 'px-2 py-1 rounded',
                  { ' cursor-default': takeAction === null },
                ]"
                @click="takeAction !== null ? takeAction(i) : takeAction"
              >
                <component
                  :is="icon"
                  v-if="icon !== null"
                  :class="actionClass"
                ></component>
                <span v-else>
                  {{ actionText }}
                </span>
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
