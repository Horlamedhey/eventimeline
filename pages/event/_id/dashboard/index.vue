<template>
  <div>
    <div class="flex space-x-6">
      <div class="w-8/12 p-5 bg-white rounded-lg shadow-outline">
        <div class="p-2 rounded-lg bg-dashboard-accent">
          <h1 class="text-2xl font-medium text-center">23 Days</h1>
          <h3 class="text-center">Avg. Tickets Sold Per 3days.</h3>
        </div>
        <div class="p-2 mt-5">chart</div>
      </div>
      <div class="w-4/12 p-5 bg-white rounded-lg shadow-outline"></div>
    </div>
    <div class="p-5 mt-16 bg-white rounded-lg shadow-outline"></div>
  </div>
</template>

<script>
export default {
  name: 'Statistics',
  layout: 'dashboard',
}
</script>
