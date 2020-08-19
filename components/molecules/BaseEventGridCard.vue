<template>
  <n-link :to="`/event/${event.id}`">
    <div class="relative transition duration-500 group">
      <div
        class="relative flex justify-center p-1 overflow-hidden transition duration-500 group-hover:shadow-xl rounded-xl"
      >
        <client-only>
          <cld-image
            :public-id="event.image"
            :alt="event.title"
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
        <BaseButton class="absolute top-0 right-0 mt-20 mr-5 text-white">
          <BaseHeartIcon fill="#ffc510"></BaseHeartIcon>
        </BaseButton>
        <div
          class="absolute bottom-0 flex items-center w-10/12 h-auto p-3 mb-3 shadow-2xl max-h-1/3"
          :style="{ borderRadius: '0.65rem', backgroundColor: event.color }"
        >
          <h3 :style="{ color: event.textColor }" class="text-sm font-inter">
            {{ event.title }}
          </h3>
        </div>
      </div>
      <div class="flex justify-between px-2 mt-1">
        <p class="text-sm font-inter text-black-700">{{ event.price }}</p>
        <p class="text-sm font-inter text-black-700">{{ event.date }}</p>
      </div>
      <BaseEventStatus
        class="top-0 z-0 mt-6 event-status lg:px-3"
      ></BaseEventStatus>
      <BaseCheckIcon
        v-if="event.provisions && event.provisions.length > 0"
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
