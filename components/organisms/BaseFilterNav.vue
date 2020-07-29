<template>
  <div>
    <h2
      class="px-6 pt-5 pb-2 font-bold border-b-2 text-2-5xl text-black-700 font-quicksand text-black-variant"
    >
      Filters
    </h2>
    <div class="px-3 mt-5">
      <!-- indicator -->
      <BaseLeveledNavList
        :items="filters"
        add-on-after
        content-container-class="flex group mt-6"
        content-class="text-xl bg-white font-quicksand font-medium flex transition duration-300 ease-in group-hover:text-gray-variant3 w-full px-3 justify-between items-center categories focus:outline-none py-2"
        active-class="text-gray-variant3"
        active-content-class="border-l-3 border-primary shadow-lg active:bg-white"
        active-addon-class="transition duration-100 ease-in"
        add-on-class="group-hover:text-gray-variant3 transition duration-100 ease-in transform"
        sub-list-classes="rounded-lg -mt-2 bg-primary sub-list pt-7 pb-4 px-1"
        sub-list-content-container-classes="group mt-1"
        sub-list-content-classes="text-sm font-quicksand font-medium transition duration-300 ease-in group-hover:text-primary w-full px-3 text-black-600 focus:outline-none py-2 block"
        sub-list-active-classes="text-primary"
        @click="handleClick"
      ></BaseLeveledNavList>
    </div>
  </div>
</template>

<script>
// mixins
import Filters from '~/mixins/data/filters.js'
export default {
  name: 'BaseFilterNav',
  mixins: [Filters],
  data() {
    return {
      expanded: [],
    }
  },
  // watch: {
  //   $route(to, from) {
  //     console.log(5);
  //   },
  // },
  computed: {},
  mounted() {
    this.filters.forEach((filter) => {
      if (this.$route.query[filter.path] !== undefined) {
        this.expanded.push(filter.path)
      }
    })
  },
  methods: {
    handleClick(event) {
      const filter = this.filters.find(
        (v) =>
          v.label.toLowerCase() ===
          (event.target.textContent || event.target.parentElement.textContent)
            .toLowerCase()
            .trim()
      )

      if (this.expanded.includes(filter.path)) {
        this.expanded.splice(this.expanded.indexOf(filter.path), 1)
      } else {
        this.expanded = [filter.path]
      }
    },
  },
}
</script>

<style>
.categories {
  color: rgba(18, 18, 18, 0.7);
}
.sub-list {
  background-color: rgba(196, 196, 196, 0.25);
}
</style>
