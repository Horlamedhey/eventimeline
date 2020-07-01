<template>
  <div class="h-full">
    <header class="header">
      <strong>
        <g-link to="/">{{ $static.metadata.siteName }}</g-link>
      </strong>
      <nav class="nav">
        <g-link class="nav__link" to="/">Home</g-link>
        <g-link class="nav__link" to="/about/">About</g-link>
      </nav>
    </header>
    <transition name="fade" appear>
      <main>
        <slot />
      </main>
    </transition>
    <transition name="fade">
      <div
        v-if="loading"
        class="flex items-center justify-center fixed top-0 bottom-0 left-0 right-0 bg-primary"
      >
        <g-image
          src="~/assets/svg/confetti-49.gif"
          quality="100"
          fit="contain"
          class="h-full w-full"
        ></g-image>
        <g-image
          src="~/assets/svg/bg-logo.svg"
          quality="100"
          fit="contain"
          blur="90"
          class="absolute top-auto left-auto"
        ></g-image>
      </div>
    </transition>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>
<script>
export default {
  data() {
    return {
      loading: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  },
};
</script>
<style>
html {
  height: 100vh;
}
body {
  height: inherit;
  font-family: Quicksand;
  margin: 0;
  padding: 0;
  line-height: 1.5;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.8s;
}
.fade-enter,
.fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 80px;
}

.nav__link {
  margin-left: 20px;
}
</style>
