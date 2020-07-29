<template>
  <div
    style="top: 58.3%; height: 83.33%;"
    class="absolute flex flex-wrap w-11/12 lg:w-9/12 lg:left-1-5/12 left-0-5/12 overflow-hidden rounded-lg shadow"
  >
    <div
      class="flex items-center justify-center hidden h-full overflow-hidden sm:w-4/12 md:w-3/12 xl:w-2-5/12 sm:block"
    >
      <img
        :src="`/images/${event.image}`"
        class="flex-shrink min-w-full min-h-full"
      />
    </div>
    <div
      class="flex flex-col justify-between w-full h-full p-4 bg-white sm:w-8/12 md:w-9/12 xl:w-9-5/12"
    >
      <div>
        <p
          class="flex justify-between text-base font-medium font-quicksand text-accent-light"
        >
          <span>{{ event.date }}</span>
          <BaseButton class="bg-transparent focus:outline-none">
            <BaseHeartIcon class="text-white" fill="#ea218d"></BaseHeartIcon>
          </BaseButton>
        </p>
        <p class="mt-2 text-xl font-semibold font-josefinsans text-black-700">
          {{ event.title }}
        </p>
      </div>

      <div class="items-end justify-between sm:flex">
        <div>
          <div class="flex items-center justify-between">
            <span class="text-lg venue-price font-quicksand">
              Venue:
            </span>
            <span
              class="text-base venue-price-values text-black-800 font-quicksand"
            >
              {{ 'Tanke, Ilorin' }}
            </span>
          </div>
          <div class="flex items-center justify-between font-quicksand sm:mt-2">
            <span class="venue-price">
              Price:
            </span>
            <span
              class="text-xl venue-price-values text-black-400 font-quicksand"
            >
              {{ event.price }}
            </span>
          </div>
        </div>

        <div
          class="flex justify-end w-full mt-4 text-sm text-white sm:text-base md:text-lg sm:mt-0 sm:w-5/12 xl:w-4/12 sm:flex-wrap"
        >
          <BaseButton
            to="/donate"
            class="flex items-center justify-around w-6/12 px-1 py-2 font-bold rounded sm:py-3 md:py-4 sm:w-full bg-primary font-quicksand focus:outline-none"
          >
            <span class="sm:w-3/4 sm:text-left sm:pl-2">
              DONATE
            </span>

            <BaseDownloadIcon class="w-4 h-4 sm:w-5 sm:h-5"></BaseDownloadIcon>
          </BaseButton>
          <BaseButton
            to="/buy-ticket"
            class="flex items-center justify-around w-6/12 px-1 py-2 ml-3 font-bold rounded sm:py-3 md:py-4 sm:ml-0 sm:w-full bg-accent sm:mt-3 font-quicksand focus:outline-none"
          >
            <span class="sm:w-3/4 sm:text-left sm:pl-2">
              BUY TICKET
            </span>

            <BaseDollarIcon class="w-4 h-4 sm:w-5 sm:h-5"></BaseDollarIcon>
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseEventInfoCard',
  props: {
    event: {
      type: Object,
      default: () => {},
    },
    image: {
      type: String,
      default: '',
    },
  },
}
</script>
