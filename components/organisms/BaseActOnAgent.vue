<template>
  <div
    ref="sideBarOverlay"
    class="absolute top-0 bottom-0 left-0 right-0 flex justify-end -mt-4 -mb-4 -ml-10 -mr-4 opacity-0 -z-1 bg-black-200"
    @click="closeActOnAgent"
  >
    <div
      ref="centerMenu"
      class="relative px-24 py-6 m-auto transform scale-0 bg-white rounded-lg opacity-0"
      @click.stop=""
    >
      <BaseButton
        class="absolute top-0 right-0 mt-2 mr-2 sm:rounded-full focus:outline-none"
        @click="closeActOnAgent"
      >
        <BaseCloseIcon class="text-primary-lighter"></BaseCloseIcon>
      </BaseButton>
      <BaseButton
        class="action-button ripple-bg-primary-variant3"
        @click="copyLink"
      >
        Copy invite link
      </BaseButton>
      <BaseButton class="action-button ripple-bg-error-variant">
        Delete agent
      </BaseButton>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseActOnAgent',
  props: {
    actOnAgent: {
      type: Boolean,
      default: false,
    },
    closeActOnAgent: {
      type: Function,
      default: () => {},
    },
    copyLink: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {}
  },
  watch: {
    actOnAgent(curr) {
      if (curr) {
        const timeline = this.$gsap.timeline()
        timeline.to(this.$refs.sideBarOverlay, {
          zIndex: 0,
          duration: 0.2,
        })
        timeline.to(this.$refs.sideBarOverlay, {
          opacity: 1,
          duration: 0.3,
          ease: 'power1.out',
        })
        timeline.to(
          this.$refs.centerMenu,

          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'power1.out',
          }
        )
      } else {
        const timeline = this.$gsap.timeline()
        timeline.to(this.$refs.centerMenu, {
          opacity: 0,
          scale: 0,
          duration: 0.5,
          ease: 'power1.out',
        })
        timeline.to(this.$refs.sideBarOverlay, {
          zIndex: -1,
          opacity: 0,
          duration: 0.3,
          ease: 'power1.out',
        })
      }
    },
  },
  methods: {},
}
</script>

<style lang="scss">
.action-button {
  @apply block w-56 py-2 mt-8 text-lg font-medium text-white rounded;
}
</style>
