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
        <h4 class="mt-1 text-1xl">N14500</h4>
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
        <h4 class="mt-1 text-1xl">N11000</h4>
      </div>
      <div class="w-4/12 text-3xl text-center">
        <div
          class="py-4 rounded-lg bg-accent-variant-light text-accent-variant"
        >
          N -3500
        </div>
        <BaseButton
          class="w-full py-4 mt-5 rounded-lg ripple-bg-dashboard-accent text-dashboard-accent-variant"
        >
          Withdraw Fund
        </BaseButton>
      </div>
    </div>
    <BaseTable
      title="Bank Detail"
      row-has-action
      :icon="icon"
      action-class="text-primary-variant ripple-bg-primary-variant-light"
      :table-body="bankDetails"
      :take-action="() => {}"
      class="mt-10"
    ></BaseTable>

    <BaseTable
      title="Withdrawal History"
      :table-heads="transactionHistoryHeads"
      :table-body="transactionHistoryBody"
      :no-data="noHistory"
      no-data-text="No withdrawals yet"
      class="mt-10"
    ></BaseTable>
  </div>
</template>

<script>
export default {
  name: 'Withdrawals',
  data() {
    return {
      noHistory: false,
      icon: () => import('~/components/atoms/icons/BasePencilIcon'),
      bankDetails: [
        {
          bankName: 'Kuda Microfinance Bank',
          accountNumber: '0232024073',
          accountName: 'Gafar Olamide Ajao',
        },
      ],
      transactionHistoryHeads: ['Account', 'Amount', 'Admin ID', 'Date'],
      transactionHistoryBody: [
        {
          acount: '0065839080',
          amount: 'N3500',
          adminId: 's7hnhe7h4',
          date: 'June 28, 2020',
        },
      ],
    }
  },
}
</script>
