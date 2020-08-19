<template>
  <div>
    <BaseEventDetails></BaseEventDetails>
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
