<template>
  <div>
    <h2 class="text-black-700 text-tinier font-inter">Categories</h2>
    <div class="py-5 mt-5 rounded bg-gray-variant1">
      <BaseNavList
        :items="categories"
        indicator
        content-container-class="flex items-center group"
        content-class="flex px-10 text-base font-normal transition duration-300 ease-in font-josefinsans text-gray-variant sm:px-16 group-hover:text-gray-variant3"
        active-class="text-gray-variant3"
        active-addon-class="transition duration-300 ease-in text-secondary-dark"
        add-on-class="w-5 h-5 mr-4 transition duration-300 ease-in group-hover:text-secondary-dark"
      ></BaseNavList>
    </div>
    <BaseButton
      to="/events"
      class="block w-16 py-2 m-auto mt-3 transition duration-300 ease-in-out rounded focus:outline-none active:bg-gray-100 hover:bg-gray-200"
    >
      <p class="text-center font-inter font-regular text-xxs text-black-500">
        See more
      </p>
    </BaseButton>
  </div>
</template>

<script>
export default {
  name: 'BaseSideCatNav',
  data() {
    return {}
  },
  computed: {
    categories() {
      return [
        {
          label: 'All',
          icon: () => import('~/components/atoms/icons/BaseAllIcon'),
          to: {
            path: '/',
            query: {
              category: 'all',
              timeline: this.$route.query.timeline,
            },
          },
          pointerKey: 'category',
          pointerValue: 'all',
        },
        {
          label: 'Matriculations',
          icon: () => import('~/components/atoms/icons/BaseAwardIcon'),
          to: {
            path: '/',
            query: {
              category: 'matriculations',
              timeline: this.$route.query.timeline,
            },
          },
          pointerKey: 'category',
          pointerValue: 'matriculations',
        },
        {
          label: 'Birthdays',
          icon: () => import('~/components/atoms/icons/BaseGiftIcon'),
          to: {
            path: '/',
            query: {
              category: 'birthdays',
              timeline: this.$route.query.timeline,
            },
          },
          pointerKey: 'category',
          pointerValue: 'birthdays',
        },
        {
          label: 'Launch Parties',
          icon: () => import('~/components/atoms/icons/BaseUsersIcon'),
          to: {
            path: '/',
            query: {
              category: 'launch-parties',
              timeline: this.$route.query.timeline,
            },
          },
          pointerKey: 'category',
          pointerValue: 'launch-parties',
        },
        {
          label: 'Hangouts',
          icon: () => import('~/components/atoms/icons/BaseUsersIcon'),
          to: {
            path: '/',
            query: {
              category: 'hangouts',
              timeline: this.$route.query.timeline,
            },
          },
          pointerKey: 'category',
          pointerValue: 'hangouts',
        },
        {
          label: 'Meetups',
          icon: () => import('~/components/atoms/icons/BaseBookmarkIcon'),
          to: {
            path: '/',
            query: {
              category: 'meetups',
              timeline: this.$route.query.timeline,
            },
          },
          pointerKey: 'category',
          pointerValue: 'meetups',
        },
      ]
    },
  },
}
</script>
