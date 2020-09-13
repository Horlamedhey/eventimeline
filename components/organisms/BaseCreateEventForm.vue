<template>
  <div>
    <div class="flex px-1 space-x-20 overflow-auto">
      <BaseEventDetails class="w-full min-w-full"></BaseEventDetails>
      <BaseEventOrganiserDetails
        class="w-full min-w-full"
      ></BaseEventOrganiserDetails>
      <BaseEventPaymentDetails
        class="w-full min-w-full"
      ></BaseEventPaymentDetails>
      <BaseEventThirdPartyArtisans
        class="w-full min-w-full"
      ></BaseEventThirdPartyArtisans>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseCreateEventForm',
}
</script>

<style lang="scss">
.next-button-content {
  @apply duration-500;
}
</style>
