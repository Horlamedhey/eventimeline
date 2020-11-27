<template>
  <div
    ref="overlay"
    class="absolute top-0 bottom-0 left-0 right-0 flex justify-end opacity-0 -z-1 bg-black-200"
    @click="$emit('close')"
  >
    <div
      ref="centerMenu"
      class="relative px-10 py-6 m-auto transform scale-0 bg-white rounded-lg opacity-0"
      style="width: 95%; max-width: 350px"
      @click.stop=""
    >
      <p>{{ confirmationMessage }}</p>
      <div class="flex justify-between px-20 mt-4">
        <BaseButton class="font-bold text-success" @click="$emit('close')">
          No
        </BaseButton>
        <BaseButton class="font-bold text-error" @click="$emit('confirm')">
          Yes
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseConfirmationDialog',
  props: {
    confirmationDialog: {
      type: Boolean,
      default: false,
    },
    confirmationMessage: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  watch: {
    confirmationDialog(curr) {
      if (curr) {
        const timeline = this.$gsap.timeline()
        timeline.to(this.$refs.overlay, {
          zIndex: 0,
          duration: 0.2,
        })
        timeline.to(this.$refs.overlay, {
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
        timeline.to(this.$refs.overlay, {
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
