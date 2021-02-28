<template>
  <div>
    <div>
      <BaseLabel
        v-if="label"
        :html-for="`#${id}`"
        :error="error"
        :class-list="[labelClassList, incremental ? 'mb-1' : 'mb-2']"
        class="text-base font-medium font-quicksand"
      >
        <template v-if="required">* </template>{{ label }}
      </BaseLabel>
    </div>

    <date-picker
      :value="value"
      :default-value="new Date()"
      value-type="format"
      format="YYYY/MM/DD"
      :input-class="inputClassList"
      :disabled-date="disabledBeforeToday"
      @input="(value) => $emit('input', value)"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    ></date-picker>
    <!-- 
    <div>
      <BaseValidationMessages :error="error" :error-messages="errorMessages" />
    </div> -->
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
export default {
  name: 'BaseFormDate',
  components: { DatePicker },
  props: {
    /** Label text for the field */
    label: String,
    /** Label text for the field */
    inputClassList: [String, Array],
    labelClassList: [String, Array],
    /** Type of the text input. Options ['text', 'email', 'url', 'tel', 'search', 'password'] */
    type: {
      type: String,
      default: 'text',
    },
    /** Value of the input */
    value: {
      type: String,
      default: '',
    },
    /** Placeholder text for the input */
    placeholder: {
      type: String,
      default: '',
    },
    /** The error message shown if the input validation is failed */
    errorMessages: {
      type: [String, Array],
    },
    /** Name attribute for input */
    name: String,
    /** Whether input value is invalid */
    error: {
      type: Boolean,
      default: false,
    },
    /** Pattern attribute for input (used for mobile keypad) */
    pattern: {
      type: String,
      default: null,
    },
    /** inputmode attribute for input (used for mobile keypad) */
    inputmode: {
      type: String,
      default: null,
    },
    /** Whether the field is required */
    required: {
      type: Boolean,
      default: false,
    },
    /** Autocomplete attribute used for browser autocomplete */
    autocomplete: String,
    /** Disabled attribute for the input */
    disabled: {
      type: Boolean,
      default: false,
    },
    incremental: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    id() {
      return '_' + Math.random().toString(36).substr(2, 9)
    },
  },
  methods: {
    disabledBeforeToday(date) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      return date < today
    },
  },
}
</script>

<style lang="scss">
.mx-datepicker {
  @apply w-full;
}
.mx-calendar-content .cell.active {
  @apply bg-primary;
}
.mx-table-date .today {
  @apply text-primary-light;
}
.mx-btn:hover {
  @apply text-primary;
}
.mx-calendar-content .cell:hover {
  @apply bg-primary-variant bg-opacity-25;
}
</style>
