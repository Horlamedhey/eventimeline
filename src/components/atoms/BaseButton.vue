<template>
  <component
    :class="{
      'disabled:opacity-75': disabled,
      'bg-success': success,
      'bg-error': error,
      'bg-warning': warning,
      'bg-info': info,
    }"
    :id="id"
    :is="tag"
    :href="href"
    :to="to"
    :target="computedTarget"
    :type="type"
    :disabled="disabled"
    @click.stop="handleClick"
  >
    <!-- @slot Main slot used for text -->
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    /** "href" for link - renders an <a> component */
    href: String,
    /** Type attribute for button - ie type="submit" */
    type: String,
    /** ID attribute */
    id: String,
    /** "to" prop for vue-router - renders a <router-link> */
    to: {
      type: String,
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
  methods: {
    handleClick(event) {
      /**
       * Click event
       * @type {Event}
       */
      this.$emit("click", event);
    },
  },
  computed: {
    computedTarget() {
      return this.target || (this.href ? "_blank" : null);
    },
    tag() {
      if (this.href) return "a";
      if (this.to) return "g-link";
      return "button";
    },
  },
};
</script>

<style lang="scss"></style>
