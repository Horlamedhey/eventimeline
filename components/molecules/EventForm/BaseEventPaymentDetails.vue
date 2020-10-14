<template>
  <div ref="formContainer">
    <h3 ref="header" class="font-medium text-1xl sm:text-2-5xl">
      Step 3:<br />Payment Details
      <p class="text-base font-normal">(This is where remit ticket sales to)</p>
    </h3>
    <div ref="form" class="mt-10 shadow-md">
      <div class="px-6 py-10 rounded shadow-outline form-container">
        <BaseForm
          :form-name="formName"
          :fields="fields"
          :completed="completed"
          :validate="validate"
          @input="setValues"
          @incrementGroup="incrementGroup"
          @decrementGroup="decrementGroup"
        ></BaseForm>
      </div>
    </div>

    <div ref="actionBtn" class="flex items-center justify-center mt-20">
      <BaseButton
        type="button"
        class="p-3 rounded-full shadow-xl ripple-bg-gray-100"
        @click="setCurrentForm(position - 1)"
      >
        <BaseChevronDownIcon class="transform rotate-90"></BaseChevronDownIcon>
      </BaseButton>

      <BaseButton
        type="button"
        class="flex items-center justify-center w-56 py-3 ml-8 font-medium rounded-full bg-secondary-light ripple-bg-secondary-light group"
        @click="validateBeforeNext"
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
import formsAnimationMixin from '~/mixins/formsAnimationMixin'
export default {
  name: 'BaseEventPaymentDetails',
  mixins: [formsAnimationMixin],
  // TODO: convert fetch to method
  fetch() {
    const bankField = this.fields.find((v) => v.name === 'bankName')
    this.$axios
      .$get('https://api.paystack.co/bank')
      .then((res) => {
        // console.log(res)
        const banks = res.data.reduce((prev, curr) => {
          const { name: label, code: value } = curr
          return [...prev, { label, value }]
        }, [])
        bankField.options = banks
      })
      .then(() => {
        bankField.loading = false
      })
  },
  fetchOnServer: false,
  data() {
    return {
      formName: 'paymentDetails',
      fields: [
        {
          visible: true,
          multiName: 'tickets',
          group: 'tickets',
          classList: 'w-full mt-8',
          fields: [
            {
              component: 'BaseFormText',
              name: 'ticketType',
              type: 'text',
              label: 'TICKET TYPE',
              autocomplete: 'on',
              classList: 'w-full md:w-4/12 sm:pr-4',
              inputClassList:
                'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
              validators: [
                { component: 'required' },
                { component: 'minLength', param: 3 },
              ],
              value: '',
            },
            {
              component: 'BaseFormText',
              name: 'maxAvailable',
              type: 'text',
              label: 'MAX. AVAILABLE',
              autocomplete: 'on',
              classList: 'w-full mt-8 md:mt-0 md:w-4/12 sm:pr-4',
              inputClassList:
                'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
              validators: [
                { component: 'required' },
                { component: 'integer' },
                { component: 'minValue', param: 5 },
              ],
              value: null,
            },
            {
              component: 'BaseFormText',
              name: 'ticketPrice',
              type: 'text',
              label: 'TICKET PRICE',
              prefix: '#',
              autocomplete: 'on',
              incremental: true,
              classList: 'w-full mt-8 md:mt-0 md:w-4/12',
              inputClassList:
                'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
              extraInfoClassList: ' w-48 -ml-4 mt-5',
              extraInfo:
                'A valid price could be "free" or any valid amount of at least #100.',
              validators: [],
              value: '',
            },
          ],
        },
        {
          multiName: 'tickets',
          group: 'tickets_1',
          visible: false,
          classList: 'w-full mt-8',
          fields: [
            {
              component: 'BaseFormText',
              name: 'ticketType',
              type: 'text',
              label: 'TICKET TYPE',
              autocomplete: 'on',
              classList: 'w-full md:w-4/12 sm:pr-4',
              inputClassList:
                'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
              validators: [
                { component: 'required' },
                { component: 'minLength', param: 3 },
              ],
              value: '',
            },
            {
              component: 'BaseFormText',
              name: 'maxAvailable',
              type: 'text',
              label: 'MAX. AVAILABLE',
              autocomplete: 'on',
              classList: 'mt-8 md:mt-0 w-full md:w-4/12 sm:pr-4',
              inputClassList:
                'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
              validators: [
                { component: 'required' },
                { component: 'integer' },
                { component: 'minValue', param: 5 },
              ],
              value: null,
            },
            {
              component: 'BaseFormText',
              name: 'ticketPrice',
              type: 'text',
              label: 'TICKET PRICE',
              prefix: '#',
              autocomplete: 'on',
              incremental: true,
              classList: 'mt-8 md:mt-0 w-full md:w-4/12',
              inputClassList:
                'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
              extraInfoClassList: ' w-48 -ml-4 mt-5',
              extraInfo:
                'A valid price could be "free" or any valid amount of at least #100.',
              validators: [],
              value: '',
            },
          ],
        },
        {
          multiName: 'tickets',
          group: 'tickets_2',
          visible: false,
          classList: 'w-full mt-8',
          fields: [
            {
              component: 'BaseFormText',
              name: 'ticketType',
              type: 'text',
              label: 'TICKET TYPE',
              autocomplete: 'on',
              classList: 'w-full md:w-4/12 sm:pr-4',
              inputClassList:
                'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
              validators: [
                { component: 'required' },
                { component: 'minLength', param: 3 },
              ],
              value: '',
            },
            {
              component: 'BaseFormText',
              name: 'maxAvailable',
              type: 'text',
              label: 'MAX. AVAILABLE',
              autocomplete: 'on',
              classList: 'mt-8 md:mt-0 w-full md:w-4/12 sm:pr-4',
              inputClassList:
                'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
              validators: [
                { component: 'required' },
                { component: 'integer' },
                { component: 'minValue', param: 5 },
              ],
              value: null,
            },
            {
              component: 'BaseFormText',
              name: 'ticketPrice',
              type: 'text',
              label: 'TICKET PRICE',
              prefix: '#',
              autocomplete: 'on',
              incremental: true,
              classList: 'mt-8 md:mt-0 w-full md:w-4/12',
              inputClassList:
                'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
              extraInfoClassList: ' w-48 -ml-4 mt-5',
              extraInfo:
                'A valid price could be "free" or any valid amount of at least #100.',
              validators: [],
              value: '',
            },
          ],
        },
        {
          multiName: 'tickets',
          group: 'tickets_3',
          visible: false,
          classList: 'w-full mt-8',
          fields: [
            {
              component: 'BaseFormText',
              name: 'ticketType',
              type: 'text',
              label: 'TICKET TYPE',
              autocomplete: 'on',
              classList: 'w-full md:w-4/12 sm:pr-4',
              inputClassList:
                'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
              validators: [
                { component: 'required' },
                { component: 'minLength', param: 3 },
              ],
              value: '',
            },
            {
              component: 'BaseFormText',
              name: 'maxAvailable',
              type: 'text',
              label: 'MAX. AVAILABLE',
              autocomplete: 'on',
              classList: 'mt-8 md:mt-0 w-full md:w-4/12 sm:pr-4',
              inputClassList:
                'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
              validators: [
                { component: 'required' },
                { component: 'integer' },
                { component: 'minValue', param: 5 },
              ],
              value: null,
            },
            {
              component: 'BaseFormText',
              name: 'ticketPrice',
              type: 'text',
              label: 'TICKET PRICE',
              prefix: '#',
              autocomplete: 'on',
              incremental: true,
              classList: 'mt-8 md:mt-0 w-full md:w-4/12',
              inputClassList:
                'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
              extraInfoClassList: ' w-48 -ml-4 mt-5',
              extraInfo:
                'A valid price could be "free" or any valid amount of at least #100.',
              validators: [],
              value: '',
            },
          ],
        },
        {
          multiName: 'tickets',
          group: 'tickets_4',
          visible: false,
          classList: 'w-full mt-8',
          fields: [
            {
              component: 'BaseFormText',
              name: 'ticketType',
              type: 'text',
              label: 'TICKET TYPE',
              autocomplete: 'on',
              classList: 'w-full md:w-4/12 sm:pr-4',
              inputClassList:
                'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
              validators: [
                { component: 'required' },
                { component: 'minLength', param: 3 },
              ],
              value: '',
            },
            {
              component: 'BaseFormText',
              name: 'maxAvailable',
              type: 'text',
              label: 'MAX. AVAILABLE',
              autocomplete: 'on',
              classList: 'mt-8 md:mt-0 w-full md:w-4/12 sm:pr-4',
              inputClassList:
                'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
              validators: [
                { component: 'required' },
                { component: 'integer' },
                { component: 'minValue', param: 5 },
              ],
              value: null,
            },
            {
              component: 'BaseFormText',
              name: 'ticketPrice',
              type: 'text',
              label: 'TICKET PRICE',
              prefix: '#',
              autocomplete: 'on',
              incremental: true,
              classList: 'mt-8 md:mt-0 w-full md:w-4/12',
              inputClassList:
                'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
              extraInfoClassList: ' w-48 -ml-4 mt-5',
              extraInfo:
                'A valid price could be "free" or any valid amount of at least #100.',
              validators: [],
              value: '',
            },
          ],
        },
        {
          multiName: 'tickets',
          group: 'tickets_5',
          visible: false,
          classList: 'w-full mt-8',
          fields: [
            {
              component: 'BaseFormText',
              name: 'ticketType',
              type: 'text',
              label: 'TICKET TYPE',
              autocomplete: 'on',
              classList: 'w-full md:w-4/12 sm:pr-4',
              inputClassList:
                'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
              validators: [
                { component: 'required' },
                { component: 'minLength', param: 3 },
              ],
              value: '',
            },
            {
              component: 'BaseFormText',
              name: 'maxAvailable',
              type: 'text',
              label: 'MAX. AVAILABLE',
              autocomplete: 'on',
              classList: 'mt-8 md:mt-0 w-full md:w-4/12 sm:pr-4',
              inputClassList:
                'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
              validators: [
                { component: 'required' },
                { component: 'integer' },
                { component: 'minValue', param: 5 },
              ],
              value: null,
            },
            {
              component: 'BaseFormText',
              name: 'ticketPrice',
              type: 'text',
              label: 'TICKET PRICE',
              prefix: '#',
              autocomplete: 'on',
              incremental: true,
              classList: 'mt-8 md:mt-0 w-full md:w-4/12',
              inputClassList:
                'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
              extraInfoClassList: ' w-48 -ml-4 mt-5',
              extraInfo:
                'A valid price could be "free" or any valid amount of at least #100.',
              validators: [],
              value: '',
            },
          ],
        },
        {
          component: 'BaseFormSelect',
          name: 'bankName',
          options: [],
          label: 'SELECT BANK',
          loading: true,
          classList: 'w-full mt-8',
          inputClassList:
            'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full text-lg',
          validators: [{ component: 'required' }],
          emptyValueLabel: 'Choose bank',
          value: '',
          changeEvent: 'getAccountName',
        },
        {
          component: 'BaseFormText',
          name: 'accountNumber',
          type: 'text',
          label: 'ACCOUNT NUMBER',
          autocomplete: 'on',
          disabled: true,
          placeholder: 'Select bank to activate this field',
          classList: 'w-full mt-8 sm:w-1/2 sm:pr-2',
          inputClassList:
            'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
          validators: [
            { component: 'required' },
            { component: 'numeric' },
            { component: 'minLength', param: 10 },
            { component: 'maxLength', param: 10 },
          ],
          value: '',
          blurEvent: 'getAccountName',
        },
        {
          component: 'BaseFormText',
          name: 'accountName',
          type: 'text',
          label: 'ACCOUNT NAME',
          disabled: true,
          error: false,
          autocomplete: 'on',
          classList: 'w-full mt-8 sm:w-1/2 sm:pl-4',
          inputClassList:
            'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
          loading: false,
          validators: [
            { component: 'required' },
            { component: 'minLength', param: 2 },
          ],
          value: '',
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
          loading: false,
          validators: [
            { component: 'required' },
            { component: 'numeric' },
            { component: 'minLength', param: 11 },
            { component: 'maxLength', param: 11 },
          ],
          value: '',
        },
      ],
    }
  },
  methods: {
    getAccountName(accountNumber) {
      return new Promise((resolve) => {
        const accountNameField = this.fields.find(
          (v) => v.name === 'accountName'
        )
        if (
          this.prevValues.bankName === this.currValues.bankName &&
          this.prevValues.accountNumber === this.currValues.accountNumber &&
          accountNameField.value.length > 0 &&
          !accountNameField.error
        ) {
          resolve({ value: accountNameField.value, fieldToMod: 'accountName' })
        } else {
          accountNameField.loading = true
          this.$axios.onRequest((config) => {
            config.headers.common.Authorization =
              'Bearer sk_test_c3a045d0fcf18ad6b24b838350e2375125057234'
          })

          this.$axios
            .$get(
              `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${
                this.fields.find((v) => v.name === 'bankName').value
              }`
            )
            .then((res) => {
              const {
                data: { account_name: accountName },
              } = res
              accountNameField.loading = false
              accountNameField.error = false
              resolve({ value: accountName, fieldToMod: 'accountName' })
            })
            .catch((e) => {
              accountNameField.loading = false
              accountNameField.error = true
              resolve({ value: '', fieldToMod: 'accountName' })
            })
        }
      })
    },
    incrementGroup(groupName) {
      const lastGroup = this.fields.find(
        (v) => v.group && v.group === groupName
      )
      const lastGroupIndex = this.fields.indexOf(lastGroup)
      const newGroup = this.fields[lastGroupIndex + 1]
      lastGroup.fields[2].incremental = false
      lastGroup.fields[2].added = true
      if (newGroup.group !== 'undefined') {
        newGroup.visible = true
      }
    },
    decrementGroup(groupName) {
      const groups = this.fields.filter(
        (v) => v.group && v.group.split('_')[0] === groupName.split('_')[0]
      )
      const firstItemIndex = this.fields.indexOf(groups[0])
      const groupToBeRemoved = groups.find(
        (v) => v.group && v.group === groupName
      )
      // const groupToBeRemovedIndex = groups.indexOf(groupToBeRemoved)
      groupToBeRemoved.fields[2].incremental = true
      groupToBeRemoved.fields[2].added = false
      groupToBeRemoved.visible = false

      const newArray = this.moveArrayItem(
        groups,
        groups.indexOf(groupToBeRemoved),
        groups.length - 1
      )
      this.fields.splice(firstItemIndex, groups.length, ...newArray)
      console.log(newArray)
    },
    moveArrayItem(arr, oldIndex, newIndex) {
      while (oldIndex < 0) {
        oldIndex += arr.length
      }
      while (newIndex < 0) {
        newIndex += arr.length
      }
      if (newIndex >= arr.length) {
        let k = newIndex - arr.length
        while (k-- + 1) {
          arr.push(undefined)
        }
      }
      arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0])
      return arr
    },
  },
}
</script>
