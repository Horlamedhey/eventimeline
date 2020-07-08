<template>
  <transition name="fade">
    <div
      v-if="loading"
      class="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-fixed bg-contain bg-primary"
      :style="{
        backgroundImage: `url(${require('~/assets/svg/confetti-49.gif')})`,
      }"
    >
      <g-image
        src="~/assets/svg/bg-logo.svg"
        alt="logo"
        immediate
        quality="100"
        class="loading-logo"
      ></g-image>
    </div>
  </transition>
</template>

<script>
export default {
  name: "BaseLoader",
  props: {
    /** Size of the loader. Options ['small', 'medium', 'large'] */
    loading: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss">
fade-enter-active,
.fade-leave-active {
  transition: all 0.8s;
}
.fade-enter,
.fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.loading-logo {
  -webkit-animation: breathing 4s ease-out infinite normal;
  animation: breathing 3s ease-out infinite normal;
}
@-webkit-keyframes breathing {
  0% {
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
  }

  25% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  60% {
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
  }

  100% {
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
  }
}

@keyframes breathing {
  0% {
    -webkit-transform: scale(0.9);
    -ms-transform: scale(0.9);
    transform: scale(0.9);
  }

  25% {
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
  }

  60% {
    -webkit-transform: scale(0.9);
    -ms-transform: scale(0.9);
    transform: scale(0.9);
  }

  100% {
    -webkit-transform: scale(0.9);
    -ms-transform: scale(0.9);
    transform: scale(0.9);
  }
}
</style>
