<template>
  <component
    :is="tag"
    :id="id"
    :class="{
      'opacity-50': disabled,
      'cursor-not-allowed': disabled,
      'bg-success': success,
      'bg-error': error,
      'bg-warning': warning,
      'bg-info': info,
    }"
    :href="href"
    :to="to"
    :target="computedTarget"
    :type="type"
    :disabled="disabled"
    class="cursor-pointer focus:outline-none"
    @click.stop="handleClick"
  >
    <!-- @slot Main slot used for text -->
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    /** "href" for link - renders an <a> component */
    href: String,
    /** Type attribute for button - ie type="submit" */
    type: String,
    /** ID attribute */
    id: String,
    /** "to" prop for vue-router - renders a <router-link> */
    to: {
      type: [String, Object],
    },
    /** target attrbitue for the <a> tag */
    target: String,
    /** Success mode */
    success: Boolean,
    /** Warning mode */
    warning: Boolean,
    /** Error mode */
    error: Boolean,
    /** Error mode */
    info: Boolean,
    /** Disabled mode */
    disabled: Boolean,
  },
  computed: {
    computedTarget() {
      return this.target || (this.href ? '_blank' : null)
    },
    tag() {
      if (this.href) return 'a'
      if (this.to) return 'n-link'
      return 'button'
    },
  },
  methods: {
    handleClick(event) {
      /**
       * Click event
       * @type {Event}
       */
      this.$emit('click', event)
    },
  },
}
</script>
