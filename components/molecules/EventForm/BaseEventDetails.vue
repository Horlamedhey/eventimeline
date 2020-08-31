<template>
  <div>
    <h3 class="font-medium text-1xl sm:text-2-5xl">
      Step 1:<br />Event Details
    </h3>
    <div class="mt-10 shadow-md">
      <div class="px-6 py-10 rounded shadow-outline">
        <BaseForm
          :fields="fields"
          @increment="incrementField"
          @decrement="decrementField"
          @upload="upload"
        ></BaseForm>
      </div>
    </div>

    <div class="mt-20">
      <BaseButton
        type="button"
        class="flex items-center justify-center w-56 py-3 m-auto font-medium rounded-full bg-secondary-light ripple-bg-secondary-light group"
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
export default {
  name: 'BaseEventDetails',
  props: {
    upload: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
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
          component: 'BaseFormText',
          multiName: 'eventProvisions',
          name: 'eventProvisions1',
          type: 'text',
          label: 'PROVISIONS e.g. Security...',
          incremental: true,
          classList: 'mt-8 w-full',
          inputClassList:
            'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
          validators: [{ component: 'minLength', param: 2 }],
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
          value: new Date().toLocaleDateString(),
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
          value: `01:00AM`,
        },
        {
          component: 'BaseFormFileUpload',
          fieldId: 'imageInput',
          name: 'eventImage',
          type: 'file',
          classList: 'w-full mt-8',
          validators: [{ component: 'required' }],
          value: null,
        },
      ],
    }
  },
  methods: {
    async incrementField(fieldMultiName) {
      const myFields = JSON.parse(JSON.stringify(this.fields))
      const fields = myFields.filter((v) => v.multiName === fieldMultiName)

      let inputIndex
      const fieldMultiValidators = JSON.parse(
        JSON.stringify(fields[0].validators)
      )
      const fieldMultiValue = JSON.parse(JSON.stringify(fields[0].value))
      await new Promise((resolve) => {
        for (let i = 0; i < fields.length; i++) {
          const field = fields[i]
          if (i === 0) {
            inputIndex = myFields.indexOf(field)
          }
          if (field.incremental) {
            field.incremental = false
            field.added = true
            field.validators = [
              { component: 'required' },
              ...fieldMultiValidators,
            ]
          }
        }
        const numberOfLastFieldName = parseInt(
          fields[fields.length - 1].name[
            fields[fields.length - 1].name.length - 1
          ]
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
          value: fieldMultiValue,
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
