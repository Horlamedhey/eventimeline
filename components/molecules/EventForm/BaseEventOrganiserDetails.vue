<template>
  <div>
    <h3 class="font-medium text-1xl sm:text-2-5xl">
      Step 2:<br />Organiser’s Details
    </h3>
    <div class="mt-10 shadow-md">
      <div class="px-6 py-10 rounded shadow-outline">
        <BaseForm :fields="fields"></BaseForm>
      </div>
    </div>

    <div class="flex items-center justify-center mt-20">
      <BaseButton
        type="button"
        class="p-3 rounded-full shadow-xl ripple-bg-gray-100"
      >
        <BaseChevronDownIcon class="transform rotate-90"></BaseChevronDownIcon>
      </BaseButton>

      <BaseButton
        type="button"
        class="flex items-center justify-center w-56 py-3 ml-8 font-medium rounded-full bg-secondary-light ripple-bg-secondary-light group"
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
  name: 'BaseEventOrganiserDetails',
  data() {
    return {
      fields: [
        {
          component: 'BaseFormText',
          name: 'organiserName',
          type: 'text',
          label: 'ORGANISER’S NAME',
          autocomplete: 'on',
          classList: 'w-full',
          inputClassList:
            'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
          validators: [
            { component: 'required' },
            { component: 'minLength', param: 2 },
          ],
          value: '',
        },
        {
          component: 'BaseFormText',
          name: 'email',
          type: 'email',
          label: 'EMAIL',
          autocomplete: 'on',
          classList: 'mt-8 w-full',
          inputClassList:
            'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
          validators: [{ component: 'required' }, { component: 'email' }],
          value: '',
        },
        {
          component: 'BaseFormText',
          name: 'phone',
          type: 'tel',
          label: 'PHONE',
          autocomplete: 'on',
          classList: 'mt-8 w-full',
          inputClassList:
            'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
          validators: [
            // { component: 'isPhone' },
          ],
          value: '',
        },
        {
          component: 'BaseFormText',
          name: 'adminPass',
          type: 'password',
          label: 'ADMIN PASS',
          autocomplete: 'on',
          classList: 'mt-8 w-full',
          inputClassList:
            'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
          extraInfoClassList: 'sm:w-56 w-48 sm:ml-8 -ml-4 sm:mt-0 mt-5',
          extraInfo:
            'This is a secret password to access the event admin page.',
          validators: [
            // { component: 'required' },
            // { component: 'minLength', param: 8 },
          ],
          value: '',
        },
      ],
    }
  },
}
</script>
