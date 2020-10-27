<template>
  <div class="relative w-full h-full pb-16">
    <div
      :style="{
        backgroundImage: `url(https://res.cloudinary.com/befittinglife/image/upload/q_auto,c_scale/v1596032411/${event.eventImage})`,
        height: '40vh',
        maxHeight: '300px',
      }"
      class="relative m-auto bg-center bg-cover lg:rounded-b lg:w-10/12 xl:w-8/12"
    >
      <div class="w-full h-full rounded blur-div"></div>
      <div class="event-status md:py-4 md:px-8">
        {{ event.soldOut ? 'SOLD OUT' : 'STILL SELLING' }}
      </div>
      <BaseEventInfoCard :event="event"></BaseEventInfoCard>
    </div>
    <div style="height: 20vh; max-height: 220px"></div>
    <article
      class="w-11/12 px-3 pb-16 m-auto bg-white shadow-outline lg:w-9/12 xl:w-7-5/12 font-quicksand"
    >
      <h2
        class="px-2 pt-6 pb-3 text-2xl font-medium border-b-2 sm:text-2-5xl text-black-variant-900"
      >
        About Event
      </h2>
      <p class="px-2 mt-8 text-base sm:text-lg text-black-800">
        {{ event.eventDescription }}
      </p>
      <h3
        class="px-2 mt-20 text-2xl font-medium sm:text-2xl text-black-variant-900"
      >
        Provisions
      </h3>
      <BaseList
        v-if="event.eventProvisions && event.eventProvisions.length > 0"
        class="px-3 sm:px-6"
      >
        <li
          v-for="provision in event.eventProvisions"
          :key="provision"
          class="flex mt-2 space-x-5 text-base sm:text-lg"
        >
          <div class="w-auto" style="padding: 0.4rem 0">
            <BaseCheckIcon class="w-4 h-4 text-success-variant"></BaseCheckIcon>
          </div>
          <span class="w-10/12 capitalize">
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
</template>

<script>
// mixins
import fetchEvent from '@/graphs/fetchEvent'
import basicMixins from '~/mixins/pagesBasicMixins.js'
export default {
  name: 'Event',
  mixins: [basicMixins],
  async asyncData({ app, params }) {
    try {
      const {
        data: { event },
      } = await app.$apolloClient.query({
        query: fetchEvent,
        variables: { eventId: params.id },
      })

      return {
        event,
      }
    } catch (error) {
      console.log('meeeee', error)
    }
  },
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
