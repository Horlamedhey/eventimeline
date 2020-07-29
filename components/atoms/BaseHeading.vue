<template>
  <component :is="type">
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'BaseHeading',
  props: {
    /** Heading level. Options[1, 2, 3, 4, 5]. For example '1' will result in a <h1> tag */
    level: {
      type: String,
      validation(val) {
        return ['1', '2', '3', '4', '5'].includes(val)
      },
      required: true,
    },
  },
  computed: {
    type() {
      return `h${this.level}`
    },
  },
}
</script>
