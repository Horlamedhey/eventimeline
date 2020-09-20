<template>
  <div class="relative min-h-screen bg-gray-variant7">
    <BaseDashHeader
      class="bg-white border-b border-gray-variant"
    ></BaseDashHeader>
    <transition name="slide" appear>
      <main class="h-full">
        <div class="flex min-h-full p-4 space-x-12 font-quicksand">
          <div
            class="min-h-full px-6 py-10 rounded-xl w-76 min-w-76 from-primary to-primary-variant bg-gradient-to-br"
            style="height: calc(100vh - 100px)"
          >
            <BaseNavList
              :items="navItems"
              content-class="flex items-center px-4 py-5 rounded-lg hover:active-class "
              content-container-class="my-1 text-xl font-medium text-white"
              active-class="active-class"
              add-on-class="w-6 h-6 mr-6"
            >
            </BaseNavList>
          </div>
          <div class="flex-grow">
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
  computed: {
    navItems() {
      const eventId = this.$route.params.id
      return [
        {
          label: 'Statistics',
          icon: () => import('@/components/atoms/icons/BaseStatsIcon'),
          to: `/event/${eventId}/dashboard/`,
        },
        {
          label: 'Agents',
          icon: () => import('@/components/atoms/icons/BaseUsersIcon'),
          to: `/event/${eventId}/dashboard/agents`,
        },
        {
          label: 'Withdrawals',
          icon: () => import('@/components/atoms/icons/BaseCreditCardIcon'),
          to: `/event/${eventId}/dashboard/withdrawals`,
        },
        {
          label: 'Check In',
          icon: () => import('@/components/atoms/icons/BaseCheckIcon'),
          to: `/event/${eventId}/dashboard/check-in`,
        },
        {
          label: 'Notifications',
          icon: () => import('@/components/atoms/icons/BaseBellIcon'),
          to: `/event/${eventId}/dashboard/notifications`,
        },
        {
          label: 'Modify Event',
          icon: () => import('@/components/atoms/icons/BaseSettingsIcon'),
          to: `/event/${eventId}/dashboard/modify-event`,
        },
      ]
    },
  },
}
</script>

<style>
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
.body-content {
  padding-bottom: 38rem;
}
.body-content-home {
  padding-bottom: 45rem;
}
@media (min-width: 600px) {
  .body-content {
    padding-bottom: 27rem;
  }
  .body-content-home {
    padding-bottom: 35rem;
  }
}
</style>
