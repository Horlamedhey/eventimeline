<template>
  <div>
    <div class="flex space-x-12 font-medium">
      <div
        class="flex flex-col items-center w-4/12 p-5 text-center dashboard-card shadow-outline-primary text-primary-variant"
      >
        <div
          class="w-12 h-10 px-3 py-2 m-auto text-center rounded bg-primary-variant-light"
        >
          <BaseDollarIcon></BaseDollarIcon>
        </div>
        <h4 class="mt-2">Total sold</h4>
        <h4 class="mt-1 text-1xl">{{ amountSold | currencyFormatter }}</h4>
      </div>
      <div
        class="flex flex-col items-center w-4/12 p-5 text-center dashboard-card shadow-outline-dashboard-accent text-dashboard-accent-variant"
      >
        <div
          class="w-12 h-10 px-3 py-2 m-auto text-center rounded bg-dashboard-accent"
        >
          <BaseWalletIcon></BaseWalletIcon>
        </div>
        <h4 class="mt-2">Available cash</h4>
        <h4 class="mt-1 text-1xl">{{ amountSold | currencyFormatter }}</h4>
      </div>
      <div class="w-4/12 text-3xl text-center">
        <div
          class="flex justify-center py-6 rounded-lg bg-accent-variant-light text-accent-variant"
        >
          <currency-input
            v-model="amountToWithdraw"
            currency="NGN"
            :auto-decimal-mode="true"
            :allow-negative="false"
            :distraction-free="false"
            locale="en-NG"
            class="w-9/12 text-center bg-transparent focus:outline-none"
          />
          <!-- -<BaseFormText
            class="w-7/12 ml-1"
            :value="amountToWithdraw"
            @input="handleWithdrawAmountInput"
          ></BaseFormText> -->
        </div>
        <BaseButton
          class="w-full py-2 mt-5 rounded-lg ripple-bg-dashboard-accent text-dashboard-accent-variant"
          :disabled="amountToWithdraw <= 0"
          @click="showBankAccountSelector = true"
        >
          <BaseLoading v-if="withdrawProcessing"></BaseLoading>
          <span v-else>Withdraw Fund</span>
        </BaseButton>
      </div>
    </div>
    <BaseBankAccountDialog
      :bank-account-dialog="showBankAccountSelector"
      :bank-accounts="bankAccounts"
      :text-content="bankAccountDialogTextContent"
      @close="() => (showBankAccountSelector = false)"
      @selectedData="withdrawFunds"
    ></BaseBankAccountDialog>
    <!-- Big screen -->
    <BaseTable
      :loading="$fetchState.pending"
      title="Bank Detail"
      :table-heads="bankAccountsHeads"
      :table-body="finalBankAccounts"
      class="hidden mt-10 lg:block"
    ></BaseTable>

    <!-- Small screen -->
    <BaseBasicCards
      :loading="$fetchState.pending"
      title="Bank Detail"
      :card-titles="bankAccountsHeads"
      :card-contents="finalBankAccounts"
      no-data-text="No bank account added yet"
      class="lg:hidden"
    ></BaseBasicCards>

    <!-- Big screen -->
    <BaseTable
      :loading="$fetchState.pending"
      title="Withdrawal History"
      :table-heads="transactionHistoryHeads"
      :table-body="transactionHistoryBody"
      :no-data="noHistory"
      no-data-text="No withdrawals yet"
      class="hidden mt-10 lg:block"
    ></BaseTable>

    <!-- Small screen -->
    <BaseBasicCards
      :loading="$fetchState.pending"
      title="Withdrawal History"
      :card-titles="transactionHistoryHeads"
      :card-contents="transactionHistoryBody"
      no-data-text="No withdrawals yet"
      class="lg:hidden"
    ></BaseBasicCards>
  </div>
</template>

<script>
import fetchAccounts from '@/graphs/read/fetchAccounts'
export default {
  name: 'Withdrawals',
  props: {
    event: {
      type: Object,
      default: () => {},
    },
  },
  async fetch() {
    try {
      const {
        data: {
          user: { accounts },
        },
      } = await this.$apolloClient.query({
        query: fetchAccounts,
        variables: { authId: this.$realmApp.currentUser.customData.authId },
      })
      this.bankAccounts = accounts.map((v) => {
        const { _id, __typename, ...rest } = v
        return { ...rest, selected: false }
      })
    } catch (err) {
      console.log(err.message)
    }
  },
  data() {
    return {
      showBankAccountSelector: false,
      amountToWithdraw: 0,
      withdrawProcessing: false,
      noHistory: false,
      icon: () => import('~/components/atoms/icons/BasePencilIcon'),
      bankAccounts: [],
      bankAccountsHeads: ['Account name', 'Account number', 'Bank name'],
      transactionHistoryHeads: ['Account', 'Amount', 'Date', 'Reference'],
      transactionHistoryBody: [
        {
          acount: '0065839080',
          amount: '₦3500',
          date: 'June 28, 2020',
          reference: 'RCP_5fmsf4l6zhm46cy',
        },
      ],
      bankAccountDialogTextContent:
        'Please choose your preferred account to confirm your withdrawal.',
    }
  },
  computed: {
    amountSold() {
      return (this.event.soldTickets || []).reduce((prevVal, currVal) => {
        return (
          prevVal +
          currVal.units *
            this.event.tickets.find(
              (u) =>
                u.ticketType.toLowerCase() === currVal.ticketType.toLowerCase()
            ).ticketPrice
        )
      }, 0)
    },
    finalBankAccounts() {
      return this.bankAccounts.map((v) => {
        const { bankCode, selected, ...rest } = v
        return rest
      })
    },
  },
  methods: {
    withdrawFunds(choice) {
      console.log(choice)
      console.log(this.amountToWithdraw)
      this.showBankAccountSelector = false
      this.withdrawProcessing = true

      this.$axios.onRequest((config) => {
        config.headers.common.Authorization =
          'Bearer sk_test_9f9b5f7e353d2452b79b9c28babc2f6a24bb17cd'
      })

      this.$axios
        .$get(
          `https://api.paystack.co/bank/resolve?account_number=${choice.accountNumber}&bank_code=${choice.bankCode}`
        )
        .then((res) => {
          const {
            data: { account_name: accountName },
          } = res
          if (accountName === choice.accountName) {
            this.createReceipt(choice)
          }
        })
    },
    createReceipt(choice) {
      console.log('crreate receiot')
      this.$axios.onRequest((config) => {
        config.headers.common.Authorization =
          'Bearer sk_test_9f9b5f7e353d2452b79b9c28babc2f6a24bb17cd'
      })

      this.$axios
        .$post('https://api.paystack.co/transferrecipient', {
          type: 'nuban',
          name: choice.accountName,
          account_number: choice.accountNumber,
          bank_code: choice.bankCode,
          currency: 'NGN',
        })
        .then((res) => {
          const {
            data: { recipient_code: recipientCode, active },
          } = res
          if (active) {
            this.initiateTransfer(recipientCode, choice.accountNumber)
          }
        })
    },
    initiateTransfer(recipientCode, accountNumber) {
      console.log('initiate transfer')
      this.$axios.onRequest((config) => {
        config.headers.common.Authorization =
          'Bearer sk_test_9f9b5f7e353d2452b79b9c28babc2f6a24bb17cd'
      })

      this.$axios
        .$post('https://api.paystack.co/transfer', {
          source: 'balance',
          amount: this.amountToWithdraw * 100,
          recipient: recipientCode,
          reason: 'Event Funds Withdrawal',
        })
        .then((res) => {
          const {
            data: { status, amount, createdAt },
          } = res
          if (status === 'success') {
            this.withdrawProcessing = false
            this.transactionHistoryBody.unshift({
              acount: accountNumber,
              amount: `₦${amount / 100}`,
              reference: recipientCode,
              date: createdAt,
            })
          }
        })
    },
  },
}
</script>
