<template>
  <div ref="formContainer">
    <h3 ref="header" class="font-medium text-1xl sm:text-2-5xl">
      Step 1:<br />Event Details
    </h3>
    <div ref="form" class="mt-10 shadow-md">
      <div class="px-6 py-10 rounded shadow-outline form-container">
        <BaseForm
          :form-name="formName"
          :fields="fields"
          :completed="completed"
          :validate="validate"
          @input="setValues"
          @increment="incrementField"
          @decrement="decrementField"
        ></BaseForm>
      </div>
    </div>

    <div ref="actionBtn" class="flex items-center justify-center mt-20">
      <BaseButton
        type="button"
        class="flex items-center justify-center w-56 py-3 m-auto font-medium rounded-full bg-secondary-light ripple-bg-secondary-light group"
        @click="validateBeforeNext"
      >
        <span
          class="next-button-content group-hover:transition group-hover:text-white"
        >
          Next Step
        </span>
        <BaseArrowRightIcon
          class="ml-2 next-button-content group-hover:transition group-hover:text-white"
        ></BaseArrowRightIcon>
      </BaseButton>
    </div>
  </div>
</template>

<script>
import formsAnimationMixin from '~/mixins/formsAnimationMixin'
export default {
  name: 'BaseEventDetails',
  mixins: [formsAnimationMixin],
  data() {
    return {
      formName: 'eventDetails',
      fields: [
        {
          component: 'BaseFormText',
          name: 'eventTitle',
          type: 'text',
          label: 'TITLE',
          autocomplete: 'on',
          classList: 'w-full',
          inputClassList:
            'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
          validators: [
            { component: 'required' },
            { component: 'minLength', param: 3 },
          ],
          value: '',
        },
        {
          component: 'BaseFormTextArea',
          name: 'eventDescription',
          label: 'DESCRIPTION',
          classList: 'mt-8 w-full',
          inputClassList:
            'focus:border-2 border focus:border-accent4 border-black-200 px-2 rounded w-full py-4 text-lg',
          validators: [
            { component: 'required' },
            { component: 'minLength', param: 20 },
          ],
          value: '',
        },
        {
          component: 'BaseFormSelect',
          name: 'eventCategory',
          options: [
            { label: 'Birthday', value: 'birthday' },
            { label: 'Conference', value: 'conference' },
            { label: 'Convocation', value: 'convocation' },
            { label: 'Dinner', value: 'dinner' },
            { label: 'Seminar', value: 'seminar' },
            { label: 'Hangout', value: 'hangout' },
            { label: 'Launch Party', value: 'launch party' },
            { label: 'Matriculation', value: 'matriculation' },
            { label: 'Meetup', value: 'meetup' },
            { label: 'Wedding', value: 'wedding' },
            { label: 'Others', value: 'others' },
          ],
          label: 'SELECT CATEGORY',
          classList: 'w-full mt-8',
          inputClassList:
            'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full text-lg',
          validators: [{ component: 'required' }],
          emptyValueLabel: 'Choose category',
          value: 'hangout',
        },
        {
          component: 'BaseFormText',
          multiName: 'eventProvisions',
          name: 'eventProvisions1',
          type: 'text',
          label: 'PROVISIONS e.g. Security... (OPTIONAL)',
          incremental: true,
          classList: 'mt-8 w-full',
          inputClassList:
            'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
          validators: [{ component: 'minLength', param: 2 }],
          value: '',
        },
        {
          component: 'BaseFormText',
          name: 'eventLocation',
          type: 'text',
          label: 'LOCATION',
          autocomplete: 'on',
          classList: 'mt-8 w-full',
          inputClassList:
            'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
          validators: [{ component: 'required' }],
          value: '',
        },
        {
          component: 'BaseFormDate',
          name: 'eventDate',
          type: 'text',
          label: 'DATE',
          classList: 'sm:w-1/2 sm:pr-2 w-full mt-8',
          inputClassList:
            'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
          validators: [{ component: 'required' }],
          value: new Date().toISOString().split('T')[0],
        },
        {
          component: 'BaseFormTime',
          name: 'eventTime',
          type: 'text',
          label: 'TIME',
          classList: 'sm:w-1/2 sm:pl-2 w-full mt-8',
          inputClassList:
            'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
          validators: [{ component: 'required' }],
          value: `01:00 AM`,
        },
        {
          component: 'BaseFormFileUpload',
          fieldId: 'imageInput',
          name: 'eventImage',
          type: 'text',
          classList: 'w-full mt-8',
          validators: [],
          value: '',
        },
      ],
    }
  },
  methods: {
    async incrementField(fieldMultiName) {
      const myFields = JSON.parse(JSON.stringify(this.fields))
      const fields = myFields.filter((v) => v.multiName === fieldMultiName)

      const inputIndex = myFields.indexOf(fields[0])
      const fieldMultiValidators = JSON.parse(
        JSON.stringify(fields[fields.length - 1].validators)
      )
      await new Promise((resolve) => {
        const lastField = fields[fields.length - 1]
        // for (let i = 0; i < fields.length; i++) {
        //   const field = fields[i]
        // if (i === 0) {
        //   inputIndex = myFields.indexOf(field)
        // }
        if (lastField.incremental) {
          lastField.incremental = false
          lastField.added = true
          lastField.validators = [
            { component: 'required' },
            ...fieldMultiValidators,
          ]
        }
        // }
        const numberOfLastFieldName = parseInt(
          lastField.name[lastField.name.length - 1]
        )
        fields.push({
          component: fields[0].component,
          multiName: fieldMultiName,
          name: `${fieldMultiName}${numberOfLastFieldName + 1}`,
          type: fields[0].type,
          incremental: true,
          classList: fields[0].classList,
          inputClassList: fields[0].inputClassList,
          validators: fieldMultiValidators,
          value: '',
        })
        resolve()
      })

      myFields.splice(inputIndex, fields.length - 1, ...fields)
      this.fields = myFields
    },
    decrementField(fieldName) {
      const indexToRemove = this.fields.indexOf(
        this.fields.find((v) => v.name === fieldName)
      )
      let label = false

      if (this.fields[indexToRemove].label) {
        label = this.fields[indexToRemove].label
      }

      this.fields.splice(indexToRemove, 1)
      if (label) {
        this.fields[indexToRemove].label = label
      }
    },
  },
}
</script>
