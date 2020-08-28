<template>
  <form class="flex flex-wrap justify-between" @submit="handleSubmit">
    <div
      v-for="field in visibleFields"
      :key="field.name"
      class=""
      :class="[
        field.classList,
        `${
          $v.formData[field.name] && $v.formData[field.name].$error
            ? 'form-error-section'
            : ''
        }`,
      ]"
    >
      <component
        :is="field.component"
        :id="field.fieldId"
        :type="field.type"
        :label="field.label"
        :prefix="field.prefix"
        :loading="field.loading"
        :extra-info="field.extraInfo"
        :extra-info-class-list="field.extraInfoClassList"
        :name="field.name.toLowerCase()"
        :options="field.options"
        :disabled="field.disabled"
        :checked="field.checked"
        :placeholder="field.placeholder"
        :autocomplete="field.autocomplete"
        :incremental="field.incremental"
        :added="field.added"
        :value="formData[field.name]"
        :error="
          field.error ||
          ($v.formData[field.name] ? $v.formData[field.name].$error : false)
        "
        :error-messages="
          field.errorMessage ||
          $getErrorMessages(
            field.name,
            field.visibleValidation,
            field.multiName
          )
        "
        :input-class-list="[
          field.inputClassList,
          { 'border-error': $v.formData[field.name].$error },
        ]"
        :label-class-list="[
          field.labelClassList,
          { 'text-error': $v.formData[field.name].$error },
        ]"
        @input="(value) => handleInput(field.name, value)"
        @change="
          (value) => {
            handleInput(field.name, value)
            if (field.changeEvent) {
              handleChangeEvent(field)
            }
          }
        "
        @blur="
          () => {
            $v.formData[field.name]
              ? $v.formData[field.name].$touch()
              : () => {}
            if (field.blurEvent) {
              handleBlurEvent(field)
            }
          }
        "
        @increment="validateAndIncrement(field.name, field.multiName)"
        @decrement="$emit('decrement', field.name)"
        @upload="$emit('upload')"
      />
    </div>
  </form>
</template>

<script>
import validationErrorMessages from '@/mixins/validationErrorMessages'
import { validationMixin } from 'vuelidate'
import * as validators from 'vuelidate/lib/validators'
import { helpers } from 'vuelidate/lib/validators'
const isPhone = helpers.regex(
  'isPhone',
  /((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/g
)
// import scrollTo from '@/mixins/scrollTo'

export default {
  name: 'BaseForm',
  components: {
    /* eslint-disable vue/no-unused-components */
    BaseFormText: () => import('@/components/molecules/BaseFormText'),
    BaseFormSelect: () => import('@/components/molecules/BaseFormSelect'),
    BaseFormTextArea: () => import('@/components/molecules/BaseFormTextArea'),
    BaseFormDate: () => import('@/components/molecules/BaseFormDate'),
    BaseFormTime: () => import('@/components/molecules/BaseFormTime'),
    BaseFormFileUpload: () =>
      import('@/components/molecules/BaseFormFileUpload'),

    // VFormRadio: () => import("molecules/VFormRadio"),
    // VFormSelect: () => import("molecules/VFormSelect"),
    // VFormCheckbox: () => import("molecules/VFormCheckbox"),
    // VFormTel: () => import("molecules/VFormTel"),
    // VFormPayment: () => import("organisms/VFormPayment"),
  },
  mixins: [validationErrorMessages, validationMixin],
  props: {
    /** An array objects. Each object represent a form field for example VFormText. */
    fields: {
      type: Array,
      required: true,
    },
    /** An object including validations of the specific */
    // validations: {
    //   type: Object,
    // },
    /** Value of the form object. Includes all form fields */
    // value: {
    //   type: Object,
    //   required: true,
    // },
  },
  data() {
    return {
      formData: this.fields.reduce(
        (prevFields, inputField) => ({
          ...prevFields,
          [inputField.name]: inputField.value,
        }),
        {}
      ),
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
    fieldRules() {
      return this.fields.reduce(
        (prevFields, inputField) => ({
          ...prevFields,
          [inputField.name]: this.generateFieldRules(inputField.validators),
        }),
        {}
      )
    },
  },
  mounted() {
    this.$emit('input', this.formData)
  },
  methods: {
    generateFieldRules(fieldValidators) {
      return fieldValidators.reduce(
        (prevValidators, validator) => ({
          ...prevValidators,
          [validator.component]: validator.param
            ? validators[validator.component](validator.param)
            : validators[validator.component],
        }),
        {}
      )
    },
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
    validateAndIncrement(fieldName, fieldMultiName) {
      this.$v.formData.$touch()
      if (this.formData[fieldName].length >= 2) {
        this.$emit('increment', fieldMultiName)
      }
    },
    handleBlurEvent(field) {
      this.$parent[field.blurEvent](this.formData[field.name]).then((res) => {
        this.formData[res.fieldToMod] = res.value
      })
    },
    handleChangeEvent(field) {
      if (!this.$v.formData.accountNumber.$invalid) {
        this.$parent[field.changeEvent](this.formData.accountNumber).then(
          (res) => {
            this.formData[res.fieldToMod] = res.value
          }
        )
      }
    },
  },
  validations() {
    return {
      formData: {
        ...this.fieldRules,
        phone: {
          required: validators.required,
          isPhone,
        },
        adminPass: {
          required: validators.required,
          minLength: validators.minLength(8),
          containsUppercase: helpers.regex('containsUppercase', /[A-Z]/),
          containsLowercase: helpers.regex('containsUppercase', /[a-z]/),
          containsNumber: helpers.regex('containsUppercase', /[0-9]/),
          containsSpecial: helpers.regex('containsUppercase', /[#?!@$%^&*-]/),
        },
        ticketPrice: {
          required: validators.required,
          validPrice: validators.or(
            helpers.regex('isFree', /free/i),
            validators.integer && validators.minValue(100)
          ),
        },
      },
    }
  },
}
</script>
