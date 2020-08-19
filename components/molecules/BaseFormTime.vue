<template>
  <div>
    <div>
      <BaseLabel
        v-if="label"
        :html-for="`#${id}`"
        :error="error"
        :class-list="[labelClassList, 'mb-2']"
        class="text-base font-medium font-quicksand"
      >
        <template v-if="required">* </template>{{ label }}
      </BaseLabel>
    </div>

    <div :class="inputClassList">
      <div class="flex items-center justify-around h-full">
        <select
          id="hour"
          v-model="hour"
          name="hours"
          class="block px-4 leading-tight bg-transparent rounded appearance-none focus:outline-none focus:border-gray-500"
        >
          <option value="01">01</option>
          <option value="02">02</option>
          <option value="03">03</option>
          <option value="04">04</option>
          <option value="05">05</option>
          <option value="06">06</option>
          <option value="07">07</option>
          <option value="08">08</option>
          <option value="09">09</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
        <span class="mr-3 text-xl">:</span>
        <select
          id="minute"
          v-model="minute"
          name="minutes"
          class="block px-4 leading-tight bg-transparent rounded appearance-none focus:outline-none focus:border-gray-500"
        >
          <option value="00">00</option>
          <option value="15">15</option>
          <option value="30">30</option>
          <option value="45">45</option>
        </select>
        <select
          id="meridiem"
          v-model="meridiem"
          name="ampm"
          class="block px-4 leading-tight bg-transparent rounded appearance-none focus:outline-none focus:border-gray-500"
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
    </div>

    <div>
      <BaseValidationMessages :error="error" :error-messages="errorMessages" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseFormText',
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
  data() {
    return {
      hour: '01',
      minute: '00',
      meridiem: 'AM',
    }
  },
  computed: {
    id() {
      return '_' + Math.random().toString(36).substr(2, 9)
    },
  },
  watch: {
    hour(val) {
      this.emitTime(`${val}:${this.minute}${this.meridiem}`)
    },
    minute(val) {
      this.emitTime(`${this.hour}:${val}${this.meridiem}`)
    },
    meridiem(val) {
      this.emitTime(`${this.hour}:${this.minute}${val}`)
    },
  },
  methods: {
    emitTime(val) {
      this.$emit('input', val)
    },
  },
}
</script>
