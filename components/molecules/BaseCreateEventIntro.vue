<template>
  <div ref="intro">
    <h2
      ref="header"
      class="w-full text-3xl font-medium sm:text-5xl text-accent3"
    >
      Create<br />New Event
    </h2>
    <p ref="description" class="w-full mt-5 text-base font-medium sm:text-2xl">
      Follow these simple steps to create your awesome event.
    </p>
    <BaseButton
      id="pricing"
      class="px-4 py-2 mt-12 text-sm font-bold bg-white rounded-lg sm:px-5 sm:py-3 sm:text-xl border-3 border-gray-variant5 ripple-bg-gray-variant4"
    >
      SEE PRICING
    </BaseButton>
  </div>
</template>

<script>
export default {
  name: 'BaseCreateEventIntro',
  mounted() {
    const timeline = this.$gsap.timeline()
    timeline.from(this.$refs.intro, {
      scale: 0.4,
      duration: 1,
      ease: 'bounce.out',
    })
    timeline.from(this.$refs.header, {
      opacity: 0,
      x: -100,
      duration: 1.5,
      ease: 'elastic.out(1, 0.3)',
    })
    timeline.from(
      this.$refs.description,
      {
        opacity: 0,
        y: 100,
        duration: 0.8,
        ease: 'power1.out',
      },
      '-=1'
    )
    timeline.from(document.getElementById('pricing'), {
      opacity: 0,
      duration: 0.6,
      ease: 'power1.out',
    })
  },
}
</script>
