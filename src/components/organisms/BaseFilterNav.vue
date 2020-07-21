<template>
  <div>
    <h2
      class="px-6 pt-5 pb-2 border-b-2 text-2-5xl text-black-700 text-bold font-quicksand"
      style="color: #121212"
    >
      Filters
    </h2>
    <div class="px-3 mt-5">
      <!-- indicator -->
      <BaseLeveledNavList
        :items="filters"
        addOnAfter
        contentContainerClass="flex group mt-6"
        contentClass="text-xl bg-white font-quicksand font-medium flex transition duration-300 ease-in group-hover:text-gray-variant3 w-full px-3 justify-between items-center categories focus:outline-none py-2"
        activeClass="text-gray-variant3"
        activeContentClass="border-l-3 border-primary shadow-lg active:bg-white"
        activeAddonClass="transition duration-100 ease-in"
        addOnClass="group-hover:text-gray-variant3 transition duration-100 ease-in transform"
        subListClasses="rounded-lg -mt-2 bg-primary sub-list pt-7 pb-4 px-1"
        subListContentContainerClasses="group mt-1"
        subListContentClasses="text-sm font-quicksand font-medium transition duration-300 ease-in group-hover:text-primary w-full px-3 text-black-600 focus:outline-none py-2 block"
        subListActiveClasses="text-primary"
        @click="handleClick"
      ></BaseLeveledNavList>
    </div>
  </div>
</template>

<script>
// components
import BaseButton from "~/components/atoms/BaseButton.vue";
import BaseLeveledNavList from "~/components/molecules/BaseLeveledNavList.vue";
// mixins
import Filters from "~/mixins/data/filters.js";
export default {
  name: "BaseFilterNav",
  components: {
    BaseButton,
    BaseLeveledNavList,
  },
  mixins: [Filters],
  data() {
    return {
      expanded: [],
    };
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
        this.expanded.push(filter.path);
      }
    });
  },
  methods: {
    handleClick(event) {
      let filter = this.filters.find(
        (v) =>
          v.label.toLowerCase() ===
          (
            event.target.innerText || event.target.parentElement.innerText
          ).toLowerCase()
      );

      if (this.expanded.includes(filter.path)) {
        this.expanded.splice(this.expanded.indexOf(filter.path), 1);
      } else {
        this.expanded.push(filter.path);
      }
    },
  },
};
</script>

<style>
.categories {
  color: rgba(18, 18, 18, 0.7);
}
.sub-list {
  background-color: rgba(196, 196, 196, 0.25);
}
</style>
