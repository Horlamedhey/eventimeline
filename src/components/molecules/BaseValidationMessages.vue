<template>
  <div v-if="errorMessages">
    <template
      v-if="
        errorMessages instanceof Array &&
          error &&
          errorMessages.length &&
          typeof errorMessages[0] === 'string'
      "
    >
      <BaseText
        v-for="message in errorMessages"
        :key="message"
        class="text-red-600"
      >
        {{ message }}
      </BaseText>
    </template>

    <BaseText
      v-else-if="typeof errorMessages === 'string' && error"
      class="text-red-600"
    >
      {{ errorMessages }}
    </BaseText>
  </div>
</template>

<script>
export default {
  name: "BaseValidationMessages",
  props: {
    errorMessages: {
      type: [Array, String],
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss"></style>
