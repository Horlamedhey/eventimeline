<template>
  <div>
    <BaseLandingSection></BaseLandingSection>
    <div
      ref="mainContainer"
      class="relative flex mt-48 overflow-hidden divide-x sm:mt-32"
      :style="{ minHeight: sideMenuHeight }"
    >
      <!-- sidebar -->
      <div
        ref="sideMenu"
        :class="
          sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
        "
        class="absolute w-10/12 p-4 transition duration-300 transform md:relative sm:w-6/12 md:w-4/12 lg:w-3/12 md:translate-x-0"
      >
        <BaseSideCatNav></BaseSideCatNav>
        <BaseSideDateNav></BaseSideDateNav>

        <div class="flex justify-center mt-16">
          <BaseInput
            id="search-input"
            name="search"
            type="search"
            placeholder="Search..."
            class-list="border-black-600 border xl:w-4/6 lg:w-3/6 md:w-4/6 sm:w-7/12 hidden sm:block mr-1 pr-1"
            input-class-list="text-sm font-inter placeholder-black-600 py-3"
          ></BaseInput>
        </div>
      </div>
      <!-- Main content -->
      <div
        ref="mainContent"
        class="w-full p-4 pt-0 transition duration-300 transform bg-transparent md:w-8/12 md:translate-x-0 lg:w-9/12"
        :class="
          sidebarOpen
            ? ['translate-x-10/12', 'sm:translate-x-1/2', 'ease-out']
            : 'translate-x-0 ease-in'
        "
      >
        <BaseGridEventCardsSection
          :sidebar-open="sidebarOpen"
          :toggle-side-bar-open="toggleSideBar"
          :events="events"
        ></BaseGridEventCardsSection>
      </div>
    </div>
    <BaseAnnounceDecor></BaseAnnounceDecor>
    <BasePartners></BasePartners>

    <BaseLoader :loading="loading" class="z-50"></BaseLoader>
  </div>
</template>

<script>
// mixins
import gql from 'graphql-tag'
import basicMixins from '~/mixins/pagesBasicMixins.js'
export default {
  mixins: [basicMixins],
  // middleware: ['apollo'],
  async asyncData({ app }) {
    // const appToken = app.$realmApp.currentUser.accessToken
    const apolloClient = app.apolloProvider.defaultClient
    // const apolloHelpers = app.$apolloHelpers
    // await apolloHelpers.onLogin(appToken)
    try {
      const {
        data: { events },
      } = await apolloClient.query({
        query: gql`
          query {
            events {
              _id
              category
              color
              date
              image
              location
              online
              price
              provisions
              textColor
              title
            }
          }
        `,
      })

      return {
        events,
      }
    } catch (error) {
      console.log('meeeee', error)
    }
  },
  data() {
    return {
      // events: [],
    }
  },
  metaInfo: {
    title: 'Home',
  },
  computed: {},
  mounted() {},
}
</script>

<style lang="scss">
.selfie-div {
  margin-top: -1rem;
}
@media (min-width: 600px) {
  .selfie-div {
    margin-left: -2.3rem;
    margin-top: 0 !important;
  }
}
@media (min-width: 960px) {
  .selfie-div {
    margin-left: -2.6rem;
  }
}
@media (max-width: 330px) {
  .selfie-div {
    margin-top: -0.85rem;
  }
}
.event-buttons {
  @apply block rounded transition-all duration-500 ease-in-out cursor-pointer;
}
.top-event-buttons {
  width: fit-content;
  @apply font-inter font-semibold text-base text-white;
}
</style>
