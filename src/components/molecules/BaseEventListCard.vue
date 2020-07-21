<template>
  <div class="flex space-x-8">
    <div class="w-3/12" style="border-radius: 1.25rem;">
      <g-image :src="event.image" style="width:100%" />
    </div>
    <div
      class="flex justify-between w-9/12 p-4 pb-2 bg-white rounded"
      style="box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.2); "
    >
      <div class="flex flex-col justify-between">
        <div>
          <p class="text-sm font-bold font-quicksand text-accent-light">
            {{ event.date }}
          </p>
          <p class="mt-2 text-lg font-bold font-quicksand text-black-700">
            {{ event.title }}
          </p>
        </div>
        <p class="text-lg font-bold font-quicksand text-black-300">
          {{ event.price }}
        </p>
      </div>
      <div>
        <BaseButton>
          <BaseHeartIcon class="text-white " fill="#ea218d"></BaseHeartIcon>
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import BaseHeartIcon from "~/components/atoms/icons/BaseHeartIcon.vue";
import BaseButton from "~/components/atoms/BaseButton.vue";
export default {
  name: "BaseEventListCard",
  props: {
    event: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    BaseHeartIcon,
    BaseButton,
  },
};
</script>

<style lang="scss" scoped></style>
