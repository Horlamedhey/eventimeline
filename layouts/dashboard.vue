<template>
  <div class="relative min-h-screen bg-gray-variant7">
    <BaseDashHeader
      class="bg-white border-b border-gray-variant"
    ></BaseDashHeader>
    <transition name="slide" appear>
      <main class="h-full">
        <div class="flex min-h-full p-4 md:space-x-12 font-quicksand">
          <div
            ref="sideMenu"
            :class="sidebarOpen ? 'translate-x-0 ease-out' : 'hideSideBar'"
            class="absolute min-h-full px-6 py-10 transition duration-300 transform rounded-xl w-76 min-w-76 from-primary to-primary-variant bg-gradient-to-br md:relative normalSideBar"
          >
            <!-- style="height: calc(100vh - 100px)" -->
            <BaseNavList
              :items="navItems"
              content-class="flex items-center px-4 py-5 rounded-lg hover:active-class "
              content-container-class="my-1 text-xl font-medium text-white"
              active-class="active-class"
              add-on-class="w-6 h-6 mr-6"
              @click="sidebarOpen = false"
            >
            </BaseNavList>
          </div>
          <div
            :class="
              sidebarOpen
                ? ['translate-x-11/12', 'sm:translate-x-1/2', 'ease-out']
                : 'translate-x-0 ease-in'
            "
            class="flex-grow p-1 overflow-x-hidden transition duration-300 transform md:translate-x-0"
          >
            <BaseButton
              class="mr-4 md:hidden focus:outline-none"
              @click="sidebarOpen = !sidebarOpen"
            >
              <BaseSideBarIcon
                :class="sidebarOpen ? 'text-accent' : 'text-primary'"
              ></BaseSideBarIcon>
            </BaseButton>
            <Nuxt />
          </div>
        </div>
      </main>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      sidebarOpen: false,
    }
  },
  computed: {
    navItems() {
      const eventId = this.$route.params.id
      return [
        {
          label: 'Statistics',
          icon: () => import('@/components/atoms/icons/BaseStatsIcon'),
          to: `/event/${eventId}/dashboard`,
        },
        {
          label: 'Check In',
          icon: () => import('@/components/atoms/icons/BaseCheckIcon'),
          to: `/event/${eventId}/dashboard/check-in`,
        },
        {
          label: 'Withdrawals',
          icon: () => import('@/components/atoms/icons/BaseCreditCardIcon'),
          to: `/event/${eventId}/dashboard/withdrawals`,
          show: this.$store.state.dashboardRole === 'Organiser',
        },
        {
          label: 'Agents',
          icon: () => import('@/components/atoms/icons/BaseUsersIcon'),
          to: `/event/${eventId}/dashboard/agents`,
          show: this.$store.state.dashboardRole === 'Organiser',
        },
        {
          label: 'Modify Event',
          icon: () => import('@/components/atoms/icons/BaseSettingsIcon'),
          to: `/event/${eventId}/dashboard/modify-event`,
          show: this.$store.state.dashboardRole === 'Organiser',
        },
        // {
        //   label: 'Notifications',
        //   icon: () => import('@/components/atoms/icons/BaseBellIcon'),
        //   to: `/event/${eventId}/dashboard/notifications`,
        // },
      ]
    },
  },
}
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

html {
  height: 100vh;
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
body {
  user-select: none;
  height: inherit;
  margin: 0;
  padding: 0;
  line-height: 1.5;
}
.dashboard-card {
  @apply bg-white rounded-lg;
}
.dashboard-main-title {
  @apply text-xl font-medium text-black-400;
}
.dashboard-main-subtitle {
  @apply text-base font-medium text-black-700;
}
.hideSideBar {
  --tw-translate-x: -110%;
  @apply ease-in;
}
.normalSideBar {
  @apply md:translate-x-0;
}
</style>
