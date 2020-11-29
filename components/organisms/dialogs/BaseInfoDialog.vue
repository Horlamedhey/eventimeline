<template>
  <div
    ref="sideBarOverlay"
    class="absolute top-0 bottom-0 left-0 right-0 flex justify-end bg-transparent opacity-0 -z-1"
  >
    <div
      ref="centerMenu"
      class="relative px-12 py-6 m-auto transform scale-0 bg-white rounded-lg shadow-lg opacity-0"
      style="width: 95%; max-width: 350px"
      @click.stop=""
    >
      <BaseButton
        class="absolute top-0 right-0 mt-2 mr-2 sm:rounded-full focus:outline-none"
        @click="$emit('close')"
      >
        <BaseCloseIcon class="text-primary-lighter"></BaseCloseIcon>
      </BaseButton>

      <slot></slot>
      <BaseButton
        class="block m-auto mt-2 font-bold text-primary-lighter"
        @click="$emit('close')"
      >
        Ok
      </BaseButton>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseInfoDialog',
  props: {
    infoDialog: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  data() {
    return {}
  },
  watch: {
    infoDialog(curr) {
      if (curr) {
        const timeline = this.$gsap.timeline()
        timeline.to(this.$refs.sideBarOverlay, {
          zIndex: 1,
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
