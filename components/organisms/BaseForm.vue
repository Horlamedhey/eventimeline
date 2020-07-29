<template>
  <form @submit="handleSubmit">
    <div
      v-for="field in visibleFields"
      :key="field.name"
      :class="[
        `${
          formData[field.name] && formData[field.name].$error
            ? 'form-error-section'
            : ''
        }`,
      ]"
    >
      <component
        :is="field.component"
        :type="field.type"
        :label="field.label"
        :name="field.name.toLowerCase()"
        :options="field.options"
        :disabled="field.disabled"
        :checked="field.checked"
        :placeholder="field.placeholder"
        :autocomplete="field.autocomplete"
        :value="formData[field.name]"
        :error="formData[field.name] ? formData[field.name].$error : false"
        :error-messages="
          field.errorMessage ||
          $getErrorMessages(field.name, field.visibleValidation)
        "
        :validations="validations || null"
        :class-list="field.classList"
        @input="(value) => handleInput(field.name, value)"
        @change="(value) => handleInput(field.name, value)"
        @blur="formData[field.name] ? formData[field.name].$touch() : () => {}"
      />
    </div>

    <BaseButton type="submit">Login</BaseButton>
  </form>
</template>

<script>
import validationErrorMessages from '@/mixins/validationErrorMessages'
import scrollTo from '@/mixins/scrollTo'

export default {
  name: 'BaseForm',
  components: {
    /* eslint-disable vue/no-unused-components */
    BaseFormText: () => import('@/components/molecules/BaseFormText'),
    // VFormRadio: () => import("molecules/VFormRadio"),
    // VFormSelect: () => import("molecules/VFormSelect"),
    // VFormCheckbox: () => import("molecules/VFormCheckbox"),
    // VFormTel: () => import("molecules/VFormTel"),
    // VFormPayment: () => import("organisms/VFormPayment"),
  },
  mixins: [validationErrorMessages, scrollTo],
  props: {
    /** An array objects. Each object represent a form field for example VFormText. */
    fields: {
      type: Array,
      required: true,
    },
    /** An object including validations of the specific */
    validations: {
      type: Object,
    },
    /** Value of the form object. Includes all form fields */
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      formData: this.value,
    }
  },
  computed: {
    visibleFields() {
      return this.fields.filter((formField) => {
        if (formField && formField.conditionalRendering) {
          const { $v } = this
          const { field, operator, value } = formField.conditionalRendering
          const validationField = $v.formData[field]

          if (operator === '==') {
            return validationField.$model === value
          }

          if (operator === '!=') {
            return validationField.$model !== value
          }

          return false
        }

        return true
      })
    },
  },
  methods: {
    handleInput(name, value) {
      this.$set(this.formData, name, value)
      this.$emit('input', this.formData)
    },
    handleSubmit(e) {
      e.preventDefault()
      this.$v.formData.$touch()

      if (!this.$v.$invalid) {
        this.$emit('submit', this.formData)
      } else {
        setTimeout(() => this.$scrollTo('.form-error-section', 400, -20), 100)
      }
    },
  },
  validations() {
    return {
      formData: this.validations,
    }
  },
}
</script>