<template>
  <n-link :to="`/event/${event._id}`">
    <div class="relative transition duration-500 group">
      <div
        class="relative flex justify-center p-1 overflow-hidden transition duration-500 group-hover:shadow-xl rounded-xl"
      >
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
            height="350"
            class="overflow-hidden transition duration-500 rounded-xl"
          >
            <cld-placeholder type="blur"> </cld-placeholder>
          </cld-image>
        </client-only>
        <BaseButton
          v-if="!isMyEvents"
          class="absolute top-0 right-0 mt-20 mr-5 text-white"
        >
          <BaseHeartIcon fill="#ffc510"></BaseHeartIcon>
        </BaseButton>
        <div
          class="absolute bottom-0 flex items-center w-10/12 h-auto p-3 mb-3 shadow-xl max-h-1/3"
          :style="{ borderRadius: '0.65rem', backgroundColor: event.color }"
        >
          <h3 :style="{ color: event.textColor }" class="text-sm font-inter">
            {{ event.eventTitle }}
          </h3>
        </div>
      </div>
      <div class="flex justify-between px-2 mt-1">
        <p
          v-if="event.cheapestTicket"
          class="text-sm font-inter text-black-700"
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
          class="text-sm underline font-inter text-black-700 text-primary"
        >
          Go to dashboard
        </BaseButton>
        <p class="text-sm font-inter text-black-700">
          {{ event.eventDate | formatShortEventDate }}
        </p>
      </div>
      <div class="top-0 z-0 mt-6 event-status lg:px-3">
        {{ event.soldOut ? 'SOLD OUT' : 'STILL SELLING' }}
      </div>
      <div v-if="isMyEvents" class="top-0 z-0 mt-16 event-status lg:px-3">
        <p class="text-sm font-inter text-black-700">{{ event.role }}</p>
      </div>
      <BaseCheckIcon
        v-if="event.isProvisions"
        class="absolute top-0 z-10 w-4 h-4 mt-5 text-success-variant provisions-indicator"
      ></BaseCheckIcon>
    </div>
  </n-link>
</template>

<script>
export default {
  name: 'BaseEventGridCard',
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
.event-status,
.provisions-indicator {
  right: -1rem;
}
</style>
