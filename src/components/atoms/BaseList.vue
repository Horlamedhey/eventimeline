<template>
  <component :is="ordered ? 'ol' : 'ul'">
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: "BaseList",
  props: {
    /** Whether the list is an ordred list */
    ordered: Boolean,
  },
};
</script>

<style lang="scss"></style>
