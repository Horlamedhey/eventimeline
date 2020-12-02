<template>
  <header
    class="relative flex items-center justify-between px-2 py-3 header sm:px-11 sm:py-5"
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
    <div class="flex items-center justify-end w-9/12">
      <BaseInput
        field-id="search-input"
        name="search"
        type="search"
        placeholder="Search for events near you..."
        class-list="bg-gray-200 xl:w-4/6 lg:w-3/6 md:w-4/6 sm:w-7/12 hidden sm:block mr-1"
        input-class-list="text-sm font-inter placeholder-gray-500 py-3"
      ></BaseInput>

      <nav class="w-auto text-right">
        <ul class="flex items-center justify-end sm:space-x-2">
          <BaseButton class="sm:hidden">
            <BaseSearchIcon class="w-5 h-5 sm:hidden"></BaseSearchIcon>
          </BaseButton>

          <BaseNavItem
            class="relative ml-1 text-xs sm:text-sm font-inter text-accent"
            content-class=" hover:bg-accent nav-item-content hover:text-white"
            @click="gotoMyEvents"
          >
            <span class="font-semibold"> My Events </span>

            <BaseEventsIcon class="inline-block w-4 h-4 ml-1"></BaseEventsIcon>
            <BaseTriangleIcon
              id="loginFormDirectionIcon"
              class="absolute top-0 right-0 mt-6 mr-12 text-accent"
              style="opacity: 0"
            ></BaseTriangleIcon>
          </BaseNavItem>

          <BaseNavItem
            to="/create-event"
            class="text-xs sm:text-sm font-inter text-primary"
            content-class="hover:bg-primary nav-item-content hover:text-white"
          >
            <span class="font-semibold">Create Event</span>

            <BaseAddIcon
              class="inline-block w-5 h-5 ml-1"
              stroke-width="2.5"
            ></BaseAddIcon>
          </BaseNavItem>
          <client-only>
            <BaseNavItem
              v-if="showLogout"
              class="text-xs sm:text-sm font-inter text-error"
              content-class="hover:bg-error nav-item-content hover:text-white"
              @click="logoutConfirmation = true"
            >
              <span class="font-semibold">Logout</span>

              <BaseLogoutIcon
                class="inline-block w-5 h-5 ml-1"
              ></BaseLogoutIcon>
            </BaseNavItem>
          </client-only>
        </ul>
      </nav>
    </div>
    <BaseLoginMenu
      :login-open="loginOpen"
      @closeLogin="loginOpen = false"
    ></BaseLoginMenu>

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
import { mapState } from 'vuex'
export default {
  name: 'BaseHeader',
  data() {
    return {
      loginOpen: false,
      logoutConfirmation: false,
      timeline: null,
    }
  },
  watch: {
    loginOpen(curr) {
      const loginFormDirectionIcon = document.getElementById(
        'loginFormDirectionIcon'
      )
      if (curr) {
        this.timeline.fromTo(
          loginFormDirectionIcon,
          {
            opacity: 0,
          },
          { opacity: 1, duration: 0.5, delay: 1, ease: 'Power1.out' }
        )
      } else {
        this.timeline.fromTo(
          loginFormDirectionIcon,
          { opacity: 1 },
          {
            opacity: 0,
            duration: 0.5,
            ease: 'Power1.out',
          }
        )
      }
    },
  },
  beforeMount() {
    this.timeline = this.$gsap.timeline()
    this.$store.commit(
      'setShowLogout',
      this.$realmApp.currentUser.customData.email !== 'admin@eventimeline.com'
    )
  },
  methods: {
    gotoMyEvents() {
      // eslint-disable-next-line eqeqeq
      if (
        this.$realmApp.currentUser.customData.email === 'admin@eventimeline.com'
      ) {
        this.openLogin()
      } else {
        this.$router.push('/my-events')
      }
    },
    openLogin() {
      this.loginOpen = true
    },
    logout() {
      this.$store.commit('setShowLogout', false)
      this.logoutConfirmation = false
      for (let i = 0; i < this.$realmApp.allUsers.length; i++) {
        const user = this.$realmApp.allUsers[i]
        if (
          user.state === 'active' &&
          user.customData.email !== 'admin@eventimeline.com'
        ) {
          user.logOut()
        }
      }
      if (this.$route.path !== '/') {
        this.$router.replace('/')
      }
    },
  },
  computed: {
    ...mapState(['showLogout']),
  },
}
</script>

<style lang="scss">
.nav-item-content {
  @apply flex items-center px-2 py-1 whitespace-no-wrap transition-colors duration-500 ease-in-out rounded;
}
</style>
