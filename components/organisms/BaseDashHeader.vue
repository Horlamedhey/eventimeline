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
    <h2 class="text-primary">{{ $store.state.dashboardRole }}</h2>
  </header>
</template>

<script>
export default {
  name: 'BaseDashHeader',
}
</script>
