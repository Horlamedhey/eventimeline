<template>
  <div class="pb-20">
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
        contentClass="text-xl font-quicksand font-medium flex transition duration-300 ease-in group-hover:text-gray-variant3 w-full px-3 justify-between items-center categories focus:outline-none py-2"
        activeClass="text-gray-variant3"
        activeContentClass="border-l-3 border-primary shadow-lg"
        activeAddonClass="transition duration-100 ease-in unrotate"
        addOnClass="group-hover:text-gray-variant3 transition duration-100 ease-in transform -rotate-90"
        @click="handleClick"
      ></BaseLeveledNavList>
    </div>
  </div>
</template>

<script>
import BaseButton from "~/components/atoms/BaseButton.vue";
import BaseLeveledNavList from "~/components/molecules/BaseLeveledNavList.vue";
import BaseChevronDownIcon from "~/components/atoms/icons/BaseChevronDownIcon.vue";
export default {
  name: "BaseFilterNav",
  components: {
    BaseButton,
    BaseLeveledNavList,
  },
  data() {
    return {
      filters: [
        {
          label: "Categories",
          icon: BaseChevronDownIcon,
          active: false,
          subItems: [
            { label: "Matriculations", to: "/events?category=birthdays" },
            { label: "Birthdays", to: "/events?category=birthdays" },
            {
              label: "Launch Parties",
              to: "/events?category=launch_parties",
            },
            { label: "Hangouts", to: "/events?category=hangouts" },
            { label: "Meetups", to: "/events?category=meetups" },
          ],
        },
        {
          label: "Date",
          icon: BaseChevronDownIcon,
          active: true,
          subItems: [
            { label: "Matriculations", to: "/events?category=birthdays" },
            { label: "Birthdays", to: "/events?category=birthdays" },
            {
              label: "Launch Parties",
              to: "/events?category=launch_parties",
            },
            { label: "Hangouts", to: "/events?category=hangouts" },
            { label: "Meetups", to: "/events?category=meetups" },
          ],
        },
        {
          label: "Price",
          icon: BaseChevronDownIcon,
          active: false,
          subItems: [
            { label: "Matriculations", to: "/events?category=birthdays" },
            { label: "Birthdays", to: "/events?category=birthdays" },
            {
              label: "Launch Parties",
              to: "/events?category=launch_parties",
            },
            { label: "Hangouts", to: "/events?category=hangouts" },
            { label: "Meetups", to: "/events?category=meetups" },
          ],
        },
        {
          label: "Location",
          icon: BaseChevronDownIcon,
          active: false,
          subItems: [
            { label: "Matriculations", to: "/events?category=birthdays" },
            { label: "Birthdays", to: "/events?category=birthdays" },
            {
              label: "Launch Parties",
              to: "/events?category=launch_parties",
            },
            { label: "Hangouts", to: "/events?category=hangouts" },
            { label: "Meetups", to: "/events?category=meetups" },
          ],
        },
      ],
    };
  },
  computed: {},
  methods: {
    handleClick(event) {
      for (let i = 0; i < this.filters.length; i++) {
        const filter = this.filters[i];
        if (filter.label === event.target.innerText) {
          filter.active = true;
        } else {
          filter.active = false;
        }
      }
    },
  },
};
</script>

<style>
.categories {
  color: rgba(18, 18, 18, 0.7);
}
.unrotate {
  transform: none !important;
}
</style>
