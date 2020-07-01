<template>
  <component :is="`${tag}`">
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: "BaseText",
  props: {
    /** The html tag to be used for tex wrapper */
    tag: {
      type: String,
      default: "p",
    },
  },
};
</script>

<style lang="scss"></style>
