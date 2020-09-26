<template>
  <div>
    <h1 class="dashboard-main-title">Notifications</h1>
    <div
      v-for="(notification, i) in notifications"
      :key="`notification-${i}`"
      class="px-5 py-3 mt-5 shadow-outline dashboard-card"
    >
      <div class="flex justify-between">
        <h2 class="text-base font-bold text-black-700">
          {{ notification.title }}
        </h2>
        <h4 class="font-medium text-black-800">{{ notification.date }}</h4>
      </div>
      <div class="mt-3 font-medium text-black-400">
        {{ notification.description }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Notifications',
  layout: 'dashboard',
  data() {
    return {
      notifications: [
        {
          title: 'SOLD OUT',
          date: 'June 24th, 2020 9:42pm',
          description:
            'This event just sold out and total revenue made estimate is $5000.',
        },
        {
          title: 'CASHOUT SUCCESSFUL',
          date: 'June 18th, 2020  7:16pm',
          description:
            'You just made a sucessful withdrawal of $3000 from your wallet.',
        },
      ],
    }
  },
}
</script>
