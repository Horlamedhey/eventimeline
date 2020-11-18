<template>
  <BaseButton
    class="absolute top-0 right-0 mt-2 mr-2 sm:rounded-full focus:outline-none"
    @click="$emit('close')"
  >
    <BaseCloseIcon class="text-primary-lighter"></BaseCloseIcon>
  </BaseButton>
</template>

<script>
export default {
  name: 'BaseCloseButton',
}
</script>
