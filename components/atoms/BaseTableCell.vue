<template>
  <component :is="tag">
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'BaseTableCell',
  props: {
    /** Whther this cell should be a <th> instead of <td> */
    heading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    tag() {
      return this.heading ? 'th' : 'td'
    },
  },
}
</script>
