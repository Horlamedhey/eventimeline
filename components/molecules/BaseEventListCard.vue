<template>
  <n-link :to="`/event/${event._id}`">
    <div class="flex items-center space-x-8 group">
      <div class="relative w-3/12 h-2/12 sm:w-40">
        <!-- <img
          :src="`/images/${event.image}`"
          style="width: 100%;"
          class="object-cover h-48 rounded-lg lg:h-40 xl:h-56"
        /> -->
        <client-only>
          <cld-image
            :public-id="event.eventImage"
            :alt="event.eventTitle"
            fetch-format="auto"
            quality="auto"
            client-hints="true"
            crop="scale"
            loading="lazy"
            width="250"
            height="300"
            class="h-48 overflow-hidden rounded-lg lg:h-48"
          >
            <cld-placeholder type="blur"> </cld-placeholder>
          </cld-image>
        </client-only>
        <div class="top-0 mt-6 event-status lg:px-3">
          {{ event.soldOut ? 'SOLD OUT' : 'STILL SELLING' }}
        </div>
      </div>
      <div
        class="flex justify-between w-9/12 p-4 transition duration-700 bg-white rounded shadow-outline group-hover:shadow-lg"
      >
        <div class="flex flex-col justify-between overflow-hidden">
          <div>
            <p class="text-sm font-bold font-quicksand text-accent-light">
              {{ event.eventDate | formatEventDate }}
            </p>
            <p class="mt-2 text-lg font-bold font-quicksand text-black-700">
              {{ event.eventTitle }}
            </p>
          </div>
          <p class="text-xs my-truncate">
            {{ event.eventDescription }}
          </p>
          <p
            v-if="event.cheapestTicket"
            class="text-lg font-bold font-quicksand text-black-300"
          >
            {{
              event.cheapestTicket.ticketPrice
                ? `N ${event.cheapestTicket.ticketPrice}`
                : 'FREE'
            }}
          </p>
          <BaseButton
            v-if="isMyEvents"
            :to="`/event/${event._id}/dashboard`"
            class="mt-2 text-sm underline font-inter text-black-700 text-primary"
          >
            Go to dashboard
          </BaseButton>
        </div>
        <div class="flex flex-col items-end justify-between">
          <p
            v-if="isMyEvents"
            class="text-lg font-bold font-quicksand text-black-300"
          >
            {{ event.role }}
          </p>
          <BaseButton v-else>
            <BaseHeartIcon class="text-white" fill="#ea218d"></BaseHeartIcon>
          </BaseButton>

          <BaseCheckIcon
            v-if="event.isProvisions"
            class="text-success-variant"
          ></BaseCheckIcon>
        </div>
      </div>
    </div>
  </n-link>
</template>

<script>
export default {
  name: 'BaseEventListCard',
  props: {
    event: {
      type: Object,
      default: () => {},
    },
    isMyEvents: {
      type: Boolean,
      default: false,
    },
  },
  computed: {},
}
</script>

<style lang="scss" scoped>
.event-status {
  right: -1rem;
}
.my-truncate {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
