<template>
  <label :for="htmlFor" class="flex items-center" :class="classList">
    <template v-if="required"
      >* </template
    ><slot></slot>
  </label>
</template>

<script>
export default {
  name: "BaseLabel",
  props: {
    /** "for" attribute for label */
    htmlFor: String,
    classList: [Array, String],
    /** If label is for a required input */
    required: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss"></style>
