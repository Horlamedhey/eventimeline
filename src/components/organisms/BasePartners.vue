<template>
  <div class="container justify-center mx-auto mt-32 lg:w-10/12 xl:w-8/12">
    <h2
      class="text-2xl font-semibold text-center font-josefinsans"
      style="color: #444357"
    >
      Our Partners
    </h2>
    <div class="flex flex-wrap mt-10 justify-evenly">
      <g-image
        v-for="i in 5"
        :key="`partner-${i}`"
        :src="require(`!!assets-loader!@images/partner${i}.png`)"
        class="m-3"
      ></g-image>
    </div>
  </div>
</template>

<script>
import BaseButton from "~/components/atoms/BaseButton.vue";
export default {
  name: "BasePartners",
};
</script>

<style lang="scss" scoped></style>
