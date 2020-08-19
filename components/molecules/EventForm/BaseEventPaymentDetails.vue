<template>
  <div>
    <h3 class="font-medium text-1xl sm:text-2-5xl">
      Step 3:<br />Payment Details
      <p class="text-base font-normal">
        (This is where remit ticket sales to)
      </p>
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
          One Last Step
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
  name: 'BaseEventPaymentDetails',
  data() {
    return {
      fields: [
        {
          component: 'BaseFormText',
          name: 'ticketType',
          type: 'text',
          label: 'TICKET TYPE',
          autocomplete: 'on',
          classList: 'w-full mt-8  md:w-4/12 sm:pr-4',
          inputClassList:
            'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
        },
        {
          component: 'BaseFormText',
          name: 'maxAvailable',
          type: 'number',
          label: 'MAX. AVAILABLE',
          autocomplete: 'on',
          classList: 'mt-8  w-full md:w-4/12 sm:pr-4',
          inputClassList:
            'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
        },
        {
          component: 'BaseFormText',
          name: 'ticketPrice',
          type: 'number',
          label: 'TICKET PRICE',
          autocomplete: 'on',
          incremental: true,
          classList: 'mt-8  w-full md:w-4/12',
          inputClassList:
            'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
        },
        {
          component: 'BaseFormText',
          name: 'accountName',
          type: 'text',
          label: 'ACCOUNT NAME',
          autocomplete: 'on',
          classList: 'w-full mt-8 sm:w-1/2 sm:pr-4',
          inputClassList:
            'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
        },
        {
          component: 'BaseFormText',
          name: 'accountNumber',
          type: 'number',
          label: 'ACCOUNT NUMBER',
          autocomplete: 'on',
          classList: 'w-full mt-8 sm:w-1/2 sm:pl-2',
          inputClassList:
            'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
        },
        {
          component: 'BaseFormSelect',
          name: 'bankName',
          options: [{ label: 'String', value: 'String' }],
          label: 'SELECT BANK',
          classList: 'w-full mt-8',
          inputClassList:
            'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full text-lg',
        },
        {
          component: 'BaseFormText',
          name: 'bvn',
          type: 'password',
          label: 'Bank Verification Number (BVN)',
          autocomplete: 'on',
          classList: 'mt-8 w-full',
          inputClassList:
            'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
          extraInfoClassList: 'sm:w-56 w-48 sm:ml-8 -ml-40 sm:mt-0 mt-5',
          extraInfo: 'This is to prevent fraud on our platform. You’re safe.',
        },
      ],
      values: {
        ticketType: '',
        maxAvailable: '',
        ticketPrice: '',
        accountName: '',
        accountNumber: '',
        bankName: '',
        bvn: '',
      },
      validations: {
        ticketType: { required, minLength: minLength(3) },
        maxAvailable: { required, minLength: minLength(20) },
        ticketPrice: {},
        accountName: { required },
        accountNumber: { required },
        bankName: { required },
        bvn: { required },
      },
    }
  },
}
</script>
