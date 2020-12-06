<template>
  <div class="mt-10">
    <h2 class="text-black-700 text-tinier font-inter">Timeline</h2>
    <BaseNavList
      :items="dates"
      content-container-class="flex items-center mt-4 overflow-x-hidden transition duration-300 ease-in rounded group content-container-class hover:shadow bg-gray-variant1 hover:bg-white"
      content-class="flex px-16 py-2 text-base font-normal whitespace-no-wrap transition duration-300 ease-in rounded font-josefinsans text-gray-variant group-hover:bg-white group-hover:text-black-600 pr-full"
      active-class="transition duration-300 ease-in important-white-bg-text"
      active-addon-class="transition duration-300 ease-in text-black-600"
      active-content-container-class="transition duration-300 ease-in shadow important-white-bg-text"
      add-on-class="w-5 h-5 mr-4 transition duration-300 ease-in group-hover:text-black-600"
    ></BaseNavList>
    <BaseButton
      class="block px-4 py-2 m-auto mt-3 transition duration-300 ease-in-out rounded cursor-pointer focus:outline-none active:bg-gray-100 hover:bg-gray-200"
    >
      <p class="text-center font-inter font-regular text-xxs text-black-500">
        Select date
      </p>
    </BaseButton>
  </div>
</template>

<script>
import BaseCalendarIcon from '~/components/atoms/icons/BaseCalendarIcon.vue'
export default {
  name: 'BaseSideDateNav',
  data() {
    return {}
  },
  computed: {
    dates() {
      return [
        {
          label: 'Today',
          icon: BaseCalendarIcon,
          to: {
            path: '/',
            query: {
              category: this.$route.query.category,
              timeline:
                this.$route.query.timeline === 'today' ? undefined : 'today',
            },
          },
          pointerKey: 'timeline',
          pointerValue: 'today',
        },
        {
          label: 'Tomorrow',
          icon: BaseCalendarIcon,
          to: {
            path: '/',
            query: {
              category: this.$route.query.category,
              timeline:
                this.$route.query.timeline === 'tomorrow'
                  ? undefined
                  : 'tomorrow',
            },
          },
          pointerKey: 'timeline',
          pointerValue: 'tomorrow',
        },
        {
          label: 'This week',
          icon: BaseCalendarIcon,
          to: {
            path: '/',
            query: {
              category: this.$route.query.category,
              timeline:
                this.$route.query.timeline === 'this-week'
                  ? undefined
                  : 'this-week',
            },
          },
          pointerKey: 'timeline',
          pointerValue: 'this-week',
        },
        {
          label: 'Next week',
          icon: BaseCalendarIcon,
          to: {
            path: '/',
            query: {
              category: this.$route.query.category,
              timeline:
                this.$route.query.timeline === 'next-week'
                  ? undefined
                  : 'next-week',
            },
          },
          pointerKey: 'timeline',
          pointerValue: 'next-week',
        },
        {
          label: 'This month',
          icon: BaseCalendarIcon,
          to: {
            path: '/',
            query: {
              category: this.$route.query.category,
              timeline:
                this.$route.query.timeline === 'this-month'
                  ? undefined
                  : 'this-month',
            },
          },
          pointerKey: 'timeline',
          pointerValue: 'this-month',
        },
        {
          label: 'Next month',
          icon: BaseCalendarIcon,
          to: {
            path: '/',
            query: {
              category: this.$route.query.category,
              timeline:
                this.$route.query.timeline === 'next-month'
                  ? undefined
                  : 'next-month',
            },
          },
          pointerKey: 'timeline',
          pointerValue: 'next-month',
        },
      ]
    },
  },
}
</script>

<style lang="scss">
.important-white-bg-text {
  background-color: white !important;
  color: rgba(0, 0, 0, 0.6) !important;
}
</style>
