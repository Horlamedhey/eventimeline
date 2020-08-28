<template>
  <div
    :class="[classList, { flex: incremental }]"
    class="relative items-center rounded"
  >
    <BaseLoading
      v-if="loading"
      class="absolute top-0 bottom-0 left-0 mt-1 ml-2"
    ></BaseLoading>
    <select
      :id="id"
      v-model="localValue"
      class="w-full leading-none bg-transparent outline-none"
      :class="[inputClassList, { 'pl-10': loading }]"
      :name="name"
      :disabled="disabled"
      @change="$emit('change', $event.target.value)"
    >
      <option disabled value="">{{ emptyValueLabel }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :selected="option.selected"
        :disabled="disabled ? disabled : option.disabled"
        >{{ option.label }}</option
      >
    </select>

    <!-- <svg
      class="v-a-select__arrow"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 284.929 284.929"
    >
      <path
        d="M282.082 76.511l-14.274-14.273c-1.902-1.906-4.093-2.856-6.57-2.856-2.471 0-4.661.95-6.563 2.856L142.466 174.441 30.262 62.241c-1.903-1.906-4.093-2.856-6.567-2.856-2.475 0-4.665.95-6.567 2.856L2.856 76.515C.95 78.417 0 80.607 0 83.082c0 2.473.953 4.663 2.856 6.565l133.043 133.046c1.902 1.903 4.093 2.854 6.567 2.854s4.661-.951 6.562-2.854L282.082 89.647c1.902-1.903 2.847-4.093 2.847-6.565 0-2.475-.945-4.665-2.847-6.571z"
      />
    </svg> -->
  </div>
</template>

<script>
export default {
  name: 'BaseSelect',
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    /** Available options for the select. A single option format is: { label: String, value: String } */
    options: {
      type: Array,
      reqruied: true,
    },
    incremental: {
      type: Boolean,
      default: false,
    },
    classList: [Array, String],
    inputClassList: [Array, String],
    addOnClassList: [Array, String],
    /** Value of Select box */
    value: {
      type: String,
      default: '',
    },
    /** Disables the select by adding "disabled" attribute */
    disabled: {
      type: Boolean,
      default: false,
    },
    /** id attribute for select */
    id: String,
    /** name attribute for select */
    name: String,
    loading: Boolean,
    /** The value of empty (default) label */
    emptyValueLabel: {
      type: String,
      default: 'Choose bank',
    },
  },
  data() {
    return {
      localValue: this.value,
    }
  },
}
</script>

<style lang="scss">
.v-a-select {
  position: relative;
  display: inline-flex;
  border: 0.1rem solid #4d31bf;
  border-radius: 0.3rem;
  &__input {
    border: 0;
    padding: 0.5rem 1rem;
    display: block;
    font-size: inherit;
    padding-right: 5rem;
    background: inherit;
    width: 100%;
    color: inherit;
    &:focus {
      box-shadow: 0 0 0.6rem rgba(0, 0, 0, 0.4);
    }
  }
  &__arrow {
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    right: 1rem;
    fill: #4d31bf;
    top: 0;
    bottom: 0;
    margin: auto;
  }
}
</style>
