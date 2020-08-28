<template>
  <div>
    <BaseEventDetails :upload="$parent.openCloudinaryWidget"></BaseEventDetails>
    <BaseEventOrganiserDetails></BaseEventOrganiserDetails>
    <BaseEventPaymentDetails></BaseEventPaymentDetails>
    <BaseEventThirdPartyArtisans></BaseEventThirdPartyArtisans>
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
