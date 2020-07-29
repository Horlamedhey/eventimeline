<template>
  <n-link :to="`/event/${event.id}`">
    <div class="flex space-x-8 group">
      <div class="relative w-3/12 h-2/12 sm:w-40">
        <img
          :src="`/images/${event.image}`"
          style="width: 100%;"
          class="object-cover h-48 rounded-lg grid-image lg:h-40 xl:h-56"
        />
        <BaseEventStatus
          class="top-0 mt-6 event-status lg:px-3"
        ></BaseEventStatus>
      </div>
      <div
        class="flex justify-between w-9/12 p-4 transition duration-700 bg-white rounded shadow-outline group-hover:shadow-lg"
      >
        <div class="flex flex-col justify-between">
          <div>
            <p class="text-sm font-bold font-quicksand text-accent-light">
              {{ event.date1 }}
            </p>
            <p class="mt-2 text-lg font-bold font-quicksand text-black-700">
              {{ event.title }}
            </p>
          </div>
          <p class="text-lg font-bold font-quicksand text-black-300">
            {{ event.price }}
          </p>
        </div>
        <div class="flex-col flex justify-between">
          <BaseButton>
            <BaseHeartIcon class="text-white" fill="#ea218d"></BaseHeartIcon>
          </BaseButton>

          <BaseCheckIcon
            v-if="event.provisions && event.provisions.length > 0"
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
  },
  computed: {},
}
</script>

<style lang="scss" scoped>
.event-status {
  right: -1rem;
}
</style>
