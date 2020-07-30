<template>
  <div v-if="event" class="relative w-full h-full pb-16">
    <div
      :style="{
        backgroundImage: `url(https://res.cloudinary.com/befittinglife/image/upload/w_2000,h_1400,c_scale/v1596032411/${event.image})`,
        height: '40vh',
        maxHeight: '300px',
      }"
      class="relative m-auto bg-center bg-cover lg:rounded-b lg:w-10/12 xl:w-8/12"
    >
      <div class="w-full h-full rounded blur-div"></div>
      <BaseEventStatus class="event-status md:py-4 md:px-8"></BaseEventStatus>
      <BaseEventInfoCard :event="event"></BaseEventInfoCard>
    </div>
    <div style="height: 20vh; max-height: 220px;"></div>
    <article
      class="w-11/12 px-3 pb-16 m-auto bg-white shadow-outline lg:w-9/12 xl:w-7-5/12 font-quicksand"
    >
      <h2
        class="px-2 pt-6 pb-3 text-2xl font-medium border-b-2 sm:text-2-5xl text-black-variant-900"
      >
        About Event
      </h2>
      <p class="px-2 mt-8 text-base sm:text-lg text-black-800">
        We're back at Q-Bar lounge Bar every Thursday from 7pm - 1am virtually
        during until we can get back into the bars and clubs! Take a drink, take
        a wine & have a time! Bringing back memories, learn some tunes & hear
        the best of the new tunes! The original lime to party event from Release
        D Riddim! Release D Riddim and Guest DJs!
      </p>
      <h3
        class="px-2 mt-20 text-2xl font-medium sm:text-2xl text-black-variant-900"
      >
        Provisions
      </h3>
      <BaseList
        v-if="event.provisions && event.provisions.length > 0"
        class="px-3 sm:px-6"
      >
        <li
          v-for="provision in event.provisions"
          :key="provision"
          class="flex mt-2 space-x-5 text-base sm:text-lg"
        >
          <div class="w-auto" style="padding: 0.4rem 0;">
            <BaseCheckIcon class="w-4 h-4 text-success-variant"></BaseCheckIcon>
          </div>
          <span class="w-10/12">
            {{ provision }}
          </span>
        </li>
      </BaseList>
      <p v-else class="px-6 text-lg text-black-variant-300">
        There are no additional provisions for this event.
      </p>
    </article>
    <div
      class="flex items-center justify-between w-11/12 px-3 py-3 m-auto mt-6 bg-white shadow sm:px-6 lg:w-9/12 xl:w-7-5/12"
    >
      <div>
        <span
          class="text-lg font-medium sm:text-2xl font-quicksand text-black-variant-300"
        >
          Share event on:
        </span>
      </div>
      <div class="flex items-center space-x-3 sm:space-x-8">
        <BaseFacebookIcon class="w-5 h-5 sm:w-6 sm:h-6"></BaseFacebookIcon>
        <BaseTwitterIcon class="w-5 h-5 sm:w-6 sm:h-6"></BaseTwitterIcon>
        <BaseInstagramIcon class="w-5 h-5 sm:w-6 sm:h-6"></BaseInstagramIcon>
        <BaseWhatsappIcon class="w-5 h-5 sm:w-6 sm:h-6"></BaseWhatsappIcon>
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
// mixins
import basicMixins from '~/mixins/pagesBasicMixins.js'
export default {
  name: 'Event',
  mixins: [basicMixins],
  fetch() {
    this.event = this.events.find((v) => v.id === this.$route.params.id)
  },
  data() {
    return {
      event: null,
    }
  },
  computed: {},
}
</script>

<style lang="scss" scoped>
.blur-div {
  backdrop-filter: blur(10px);
}
@media (max-width: 600px) {
  .blur-div {
    backdrop-filter: blur(3px);
  }
}
.venue-price {
  @apply text-base font-normal font-quicksand text-primary-lighter;
}
.venue-price-values {
  @apply ml-5 font-medium font-quicksand;
}
.event-status {
  left: 3rem;
  top: 9.5rem;
}
@media (min-width: 600px) {
  .event-status {
    left: 3.5rem;
    top: 10rem;
  }
}
@media (min-width: 960px) {
  .event-status {
    left: 4rem;
    top: 9.5rem;
  }
}
@media (min-width: 1264px) {
  .event-status {
    left: 11.5rem;
  }
}
@media (min-width: 1904px) {
  .event-status {
    left: 15rem;
  }
}
</style>
