<template>
  <div class="p-5 bg-white rounded-lg shadow-outline">
    <h4 v-if="loading" class="text-lg font-medium text-center">
      Loading data...
    </h4>
    <h4
      v-else-if="tableBody.length === 0"
      class="text-lg font-medium text-center"
    >
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
            <template v-for="(tableRowItem, key) in tableRow">
              <td
                v-if="!actionFields.includes(key)"
                :key="tableRowItem"
                class="table-body"
                :class="{ 'px-0': tableHeads.length === 0 }"
              >
                {{ tableRowItem }}
              </td>
            </template>
            <td
              v-for="(actionField, key) in actionFields"
              :key="`actionField-${key}`"
              class="table-body"
              :class="{ 'px-0': tableHeads.length === 0 }"
            >
              <BaseButton
                class="font-medium"
                :class="[
                  tableRow[actionField] ? actionActiveClass : actionClass,
                  icon !== null ? 'rounded-full p-1' : 'px-2 py-1 rounded',
                ]"
                :disabled="tableRow[actionField]"
                @click="tableRow[actionField] ? null : $emit('takeAction', i)"
              >
                <component :is="icon" v-if="icon !== null"></component>
                <span v-else>
                  {{ actionText }}
                </span>
              </BaseButton>
            </td>
            <td
              v-if="rowHasAction"
              class="table-body"
              :class="{ 'px-0': tableHeads.length === 0 }"
            >
              <BaseButton
                class="font-medium"
                :class="[
                  actionClass,
                  icon !== null ? 'rounded-full p-1' : 'px-2 py-1 rounded',
                ]"
                @click="$emit('takeAction', i)"
              >
                <component :is="icon" v-if="icon !== null"></component>
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
    actionActiveClass: {
      type: [String, Array],
      default: '',
    },
    noDataText: {
      type: String,
      default: '',
    },
    actionFields: {
      type: Array,
      default: () => [],
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
    loading: {
      type: Boolean,
      default: false,
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
