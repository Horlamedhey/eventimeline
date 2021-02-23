<template>
  <header
    class="flex items-center justify-between px-2 py-2 shadow-sm header sm:px-11 sm:py-3"
  >
    <div class="w-auto">
      <div class="hidden md:block">
        <n-link to="/">
          <client-only>
            <cld-image
              public-id="events/logo.png"
              alt="logo"
              fetch-format="auto"
              quality="auto"
              client-hints="true"
              loading="lazy"
              width="200"
              style="max-width: 200px"
            >
              <cld-placeholder type="blur"> </cld-placeholder>
            </cld-image>
          </client-only>
        </n-link>
      </div>
      <div class="md:hidden">
        <n-link to="/">
          <client-only>
            <cld-image
              public-id="events/logo-small.png"
              alt="logo"
              fetch-format="auto"
              quality="auto"
              client-hints="true"
              loading="lazy"
              width="40"
              style="max-width: 40px"
            >
              <cld-placeholder type="blur"> </cld-placeholder>
            </cld-image>
          </client-only>
        </n-link>
      </div>
    </div>
    <nav class="w-auto text-right">
      <ul class="flex items-center justify-end sm:space-x-2">
        <h2 class="font-bold text-primary">
          Welcome, {{ $store.state.dashboardRole }}
        </h2>
        <div></div>
        <client-only>
          <BaseNavItem
            v-if="showLogout"
            class="text-xs sm:text-sm font-inter text-error"
            content-class="hover:bg-error nav-item-content hover:text-white"
            @click="logoutConfirmation = true"
          >
            <span class="hidden font-semibold sm:inline">Logout</span>

            <BaseLogoutIcon class="inline-block w-5 h-5 ml-1"></BaseLogoutIcon>
          </BaseNavItem>
        </client-only>
      </ul>
    </nav>
    <BaseConfirmationDialog
      :confirmation-dialog="logoutConfirmation"
      confirmation-message="Are you sure you want to logout?"
      style="position: fixed"
      @close="logoutConfirmation = false"
      @confirm="logout"
    ></BaseConfirmationDialog>
  </header>
</template>

<script>
import logoutMixin from '@/mixins/logoutMixin'
export default {
  name: 'BaseDashHeader',
  mixins: [logoutMixin],
}
</script>
