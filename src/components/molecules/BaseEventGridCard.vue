<template>
  <div>
    <div
      class="relative flex justify-center overflow-hidden"
      style="border-radius: 1.25rem;"
    >
      <g-image :src="event.image" />
      <BaseButton>
        <BaseHeartIcon
          class="absolute text-white right-4 top-3"
          fill="#ffc510"
        ></BaseHeartIcon>
      </BaseButton>
      <div
        class="absolute flex items-center w-10/12 h-auto p-3 bottom-3 max-h-1/3"
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
  </div>
</template>

<script>
import BaseHeartIcon from "~/components/atoms/icons/BaseHeartIcon.vue";
import BaseButton from "~/components/atoms/BaseButton.vue";
export default {
  name: "BaseEventGridCard",
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
