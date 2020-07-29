<template>
  <n-link :to="`/event/${event.id}`">
    <div class="relative group">
      <div
        class="relative flex justify-center p-1 overflow-hidden transition duration-500 group-hover:shadow-xl"
      >
        <img
          :src="`/images/${event.image}`"
          style="width: 100%;"
          class="object-cover rounded-xl sm:h-64 grid-image h-60 lg:h-70"
        />
        <BaseButton>
          <BaseHeartIcon
            class="absolute text-white right-4 top-3"
            fill="#ffc510"
          ></BaseHeartIcon>
        </BaseButton>
        <div
          class="absolute flex items-center w-10/12 h-auto p-3 bottom-0 mb-3 max-h-1/3"
          :style="{ borderRadius: '0.65rem', backgroundColor: event.color }"
        >
          <h3 class="text-sm text-white font-inter">
            {{ event.title }}
          </h3>
        </div>
      </div>
      <div class="flex justify-between px-2 mt-1">
        <p class="text-sm font-inter text-black-700">{{ event.price }}</p>
        <p class="text-sm font-inter text-black-700">{{ event.date }}</p>
      </div>
      <BaseEventStatus
        class="top-0 mt-6 event-status lg:px-3 z-0"
      ></BaseEventStatus>
      <BaseCheckIcon
        v-if="event.provisions && event.provisions.length > 0"
        class="text-success-variant absolute top-0 mt-5 h-4 w-4 provisions-indicator z-10"
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
