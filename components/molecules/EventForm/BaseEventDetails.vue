<template>
  <div>
    <h3 class="font-medium text-1xl sm:text-2-5xl">
      Step 1:<br />Event Details
    </h3>
    <div class="mt-10 shadow-md">
      <div class="px-6 py-10 rounded shadow-outline">
        <BaseForm
          :fields="fields"
          :value="values"
          :validations="validations"
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
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'BaseEventDetails',
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
        },
        {
          component: 'BaseFormTextArea',
          name: 'eventDescription',
          label: 'DESCRIPTION',
          classList: 'mt-8 w-full',
          inputClassList:
            'focus:border-2 border focus:border-accent4 border-black-200 px-2 rounded w-full py-4 text-lg',
        },
        {
          component: 'BaseFormText',
          multiName: 'eventProvisions',
          name: 'eventProvision1',
          type: 'text',
          label: 'PROVISIONS e.g. Security...',
          incremental: false,
          added: true,
          classList: 'mt-8 w-full',
          inputClassList:
            'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
        },
        {
          component: 'BaseFormText',
          multiName: 'eventProvisions',
          name: 'eventProvision2',
          type: 'text',
          incremental: true,
          classList: 'mt-8 w-full',
          inputClassList:
            'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
        },
        {
          component: 'BaseFormDate',
          name: 'eventDate',
          type: 'text',
          label: 'DATE',
          classList: 'sm:w-5-5/12 w-full mt-8',
          inputClassList:
            'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
        },
        {
          component: 'BaseFormTime',
          name: 'eventTime',
          type: 'text',
          label: 'TIME',
          classList: 'sm:w-5-5/12 w-full mt-8',
          inputClassList:
            'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
        },
        {
          component: 'BaseFormFileUpload',
          fieldId: 'imageInput',
          name: 'eventImage',
          type: 'file',
          classList: 'w-full mt-8',
        },
      ],
      values: {
        eventTitle: '',
        eventDescription: '',
        eventProvision1: '',
        eventProvision2: '',
        eventDate: new Date().toLocaleDateString(),
        eventTime: '01:00AM',
        eventImage: null,
      },
      validations: {
        eventTitle: { required, minLength: minLength(3) },
        eventDescription: { required, minLength: minLength(20) },
        eventProvision1: { required, minLength: minLength(2) },
        eventProvision2: { minLength: minLength(2) },
        eventDate: { required },
        eventTime: { required },
        eventImage: { required },
      },
    }
  },
}
</script>
