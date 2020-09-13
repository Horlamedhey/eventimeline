<template>
  <form class="flex flex-wrap" @submit="handleSubmit">
    <div
      v-for="field in visibleFields"
      :key="field.group || field.name"
      :class="field.classList"
      class="first:mt-0"
    >
      <div v-if="field.group" class="flex flex-wrap justify-between">
        <div
          v-for="nestedField in field.fields"
          :key="`${field.group}-${nestedField.name}`"
          :class="[
            nestedField.classList,
            `${
              $v.formData[field.group][nestedField.name] &&
              $v.formData[field.group][nestedField.name].$error
                ? 'form-error-section'
                : ''
            }`,
          ]"
        >
          <component
            :is="nestedField.component"
            :id="nestedField.fieldId"
            :type="nestedField.type"
            :label="nestedField.label"
            :prefix="nestedField.prefix"
            :loading="nestedField.loading"
            :extra-info="nestedField.extraInfo"
            :extra-info-class-list="nestedField.extraInfoClassList"
            :name="nestedField.name.toLowerCase()"
            :options="nestedField.options"
            :disabled="nestedField.disabled"
            :checked="nestedField.checked"
            :placeholder="nestedField.name"
            :autocomplete="nestedField.autocomplete"
            :incremental="nestedField.incremental"
            :added="nestedField.added"
            :value="formData[field.group][nestedField.name]"
            :error="
              nestedField.error ||
              ($v.formData[field.group][nestedField.name]
                ? $v.formData[field.group][nestedField.name].$error
                : false)
            "
            :error-messages="
              nestedField.errorMessage ||
              $getErrorMessages(
                nestedField.name,
                nestedField.visibleValidation,
                undefined,
                field.group
              )
            "
            :input-class-list="[
              nestedField.inputClassList,
              {
                'border-error':
                  $v.formData[field.group][nestedField.name].$error,
              },
            ]"
            :label-class-list="[
              nestedField.labelClassList,
              {
                'text-error': $v.formData[field.group][nestedField.name].$error,
              },
            ]"
            @input="
              (value) => handleInput(nestedField.name, value, field.group)
            "
            @change="
              (value) => {
                handleInput(nestedField.name, value, field.group)
                if (nestedField.changeEvent) {
                  handleChangeEvent(field)
                }
              }
            "
            @blur="
              () => {
                $v.formData[field.group][nestedField.name]
                  ? $v.formData[field.group][nestedField.name].$touch()
                  : () => {}
                if (field.blurEvent) {
                  handleBlurEvent(field)
                }
              }
            "
            @increment="validateAndIncrementGroup(field.group)"
            @decrement="decrementGroup(field.group)"
            @upload="
              (value) => handleUpload(nestedField.name, value, field.group)
            "
          />
        </div>
      </div>
      <div
        v-else
        :class="[
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
          @upload="(value) => handleUpload(field.name, value)"
        />
      </div>
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
      formData: this.fields.reduce((prevFields, inputField) => {
        if (inputField.group) {
          return {
            ...prevFields,
            [inputField.group]: inputField.fields.reduce(
              (prevFields, inputField) => {
                return {
                  ...prevFields,
                  [inputField.name]: inputField.value,
                }
              },
              {}
            ),
          }
        } else {
          return {
            ...prevFields,
            [inputField.name]: inputField.value,
          }
        }
      }, {}),
    }
  },
  computed: {
    visibleFields() {
      return this.fields
        .filter((v) => v.visible === undefined || v.visible)
        .filter((formField) => {
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
      return this.fields.reduce((prevFields, inputField) => {
        if (inputField.group) {
          return {
            ...prevFields,
            [inputField.group]: inputField.fields.reduce(
              (prevFields, inputField) => {
                return {
                  ...prevFields,
                  [inputField.name]: this.generateFieldRules(
                    inputField.validators
                  ),
                }
              },
              {}
            ),
          }
        } else {
          return {
            ...prevFields,
            [inputField.name]: this.generateFieldRules(inputField.validators),
          }
        }
      }, {})
    },
  },
  watch: {
    fields(curr) {
      const processedCurr = curr.reduce((prevFields, inputField) => {
        if (inputField.group) {
          return {
            ...prevFields,
            [inputField.group]: inputField.fields.reduce(
              (prevFields, inputField) => {
                return {
                  ...prevFields,
                  [inputField.name]: inputField.value,
                }
              },
              {}
            ),
          }
        } else {
          return {
            ...prevFields,
            [inputField.name]: inputField.value,
          }
        }
      }, {})
      for (const key in processedCurr) {
        if (
          Object.hasOwnProperty.call(processedCurr, key) &&
          !Object.hasOwnProperty.call(this.formData, key)
        ) {
          this.formData[key] = processedCurr[key]
          // console.log(key, processedCurr[key])
        }
      }
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
    handleInput(name, value, groupName) {
      if (groupName) {
        this.$set(this.formData[groupName], name, value)
      } else {
        this.$set(this.formData, name, value)
      }
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
    async validateAndIncrementGroup(fieldGroupName) {
      const checkError = await new Promise((resolve) => {
        const errors = []
        for (const fieldName in this.$v.formData[fieldGroupName]) {
          if (fieldName.charAt(0) === '$') continue
          if (
            Object.hasOwnProperty.call(
              this.$v.formData[fieldGroupName],
              fieldName
            )
          ) {
            const element = this.$v.formData[fieldGroupName][fieldName]
            element.$touch()
            errors.push(element.$error)
          }
        }
        resolve(errors)
      })
      if (!checkError.includes(true)) {
        this.$emit('incrementGroup', fieldGroupName)
      }
    },
    decrementGroup(fieldGroupName) {
      this.$set(this.formData[fieldGroupName], 'ticketType', '')
      this.$set(this.formData[fieldGroupName], 'maxAvailable', '')
      this.$set(this.formData[fieldGroupName], 'ticketPrice', '')
      this.$emit('decrementGroup', fieldGroupName)
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
        eventImage: {
          required: validators.required,
          isValidSize: helpers.regex('isValidSize', /^((?!exceed)[\s\S])*$/),
        },
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
        ticket: {
          ...this.fieldRules.ticket,
          ticketPrice: {
            required: validators.required,
            validPrice: validators.or(
              helpers.regex('isFree', /free/i),
              validators.integer && validators.minValue(100)
            ),
          },
        },
        ticket_1: {
          ...this.fieldRules.ticket,
          ticketPrice: {
            required: validators.required,
            validPrice: validators.or(
              helpers.regex('isFree', /free/i),
              validators.integer && validators.minValue(100)
            ),
          },
        },
        ticket_2: {
          ...this.fieldRules.ticket,
          ticketPrice: {
            required: validators.required,
            validPrice: validators.or(
              helpers.regex('isFree', /free/i),
              validators.integer && validators.minValue(100)
            ),
          },
        },
        ticket_3: {
          ...this.fieldRules.ticket,
          ticketPrice: {
            required: validators.required,
            validPrice: validators.or(
              helpers.regex('isFree', /free/i),
              validators.integer && validators.minValue(100)
            ),
          },
        },
        ticket_4: {
          ...this.fieldRules.ticket,
          ticketPrice: {
            required: validators.required,
            validPrice: validators.or(
              helpers.regex('isFree', /free/i),
              validators.integer && validators.minValue(100)
            ),
          },
        },
        ticket_5: {
          ...this.fieldRules.ticket,
          ticketPrice: {
            required: validators.required,
            validPrice: validators.or(
              helpers.regex('isFree', /free/i),
              validators.integer && validators.minValue(100)
            ),
          },
        },
      },
    }
  },
}
</script>
