<template>
  <div class="relative text-white footer sm:absolute font-quicksand">
    <div
      class="text-center pb-36 pt-full sm:pt-1/3 content-wrapper sm:text-left sm:flex sm:justify-evenly"
    >
      <div
        v-for="(footerLinksList, i) in footerLinksLists"
        :key="`footerLinksList-${i}`"
        class="mt-10"
      >
        <h2 class="text-lg font-bold">
          {{ footerLinksList.heading }}
        </h2>
        <BaseNavList
          :items="footerLinksList.links"
          contentClass="text-base block mt-2"
          class="mt-8"
        ></BaseNavList>
      </div>
    </div>
    <div class="relative z-30 z-40 flex justify-around pb-2">
      <p class="text-xs">
        {{ `© ${new Date().getFullYear()} Eventimeline` }}
      </p>
    </div>
  </div>
</template>

<script>
import BaseNavList from "~/components/molecules/BaseNavList.vue";
export default {
  name: "BaseFooter",
  components: {
    BaseNavList,
  },
  data() {
    return {
      footerLinksLists: [
        {
          heading: "Use Eventimeline",

          links: [
            { label: "How it works", to: "/how-it-works" },
            { label: "Terms & Policies", to: "/terms-and-policies" },
            { label: "FAQs", to: "/faqs" },
          ],
        },
        {
          heading: "Find Events",

          links: [
            { label: "Birthdays", to: "/?category=birthdays" },
            { label: "Launch Parties", to: "/?category=launch_parties" },
            { label: "Hangouts", to: "/?category=hangouts" },
            { label: "Meetups", to: "/?category=meetups" },
          ],
        },
        {
          heading: "Connect",

          links: [
            {
              label: "Facebook",
              href: "https://web.facebook.com/gaphar.horla1",
            },
            { label: "Twitter", href: "https://twitter.com/horlamedhey" },
            {
              label: "Instagram",
              href: "https://www.instagram.com/abdulgafarajao/",
            },
            { label: "Contact to support", to: "/support" },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.footer {
  @apply bottom-0 overflow-hidden z-10 w-full bg-transparent;
}
.content-wrapper {
  @apply w-full relative z-30;
}
.footer::after {
  content: "";
  top: 32%;
  height: 200%;
  @apply absolute w-full block transform skew-y-6 bg-black z-20;
}
@media (min-width: 600px) {
  .footer::after {
    top: 36%;
  }
}
@media (min-width: 960px) {
  .footer::after {
    top: 42%;
  }
}
@media (min-width: 1264px) {
  .footer::after {
    top: 50%;
  }
}
@media (min-width: 1904px) {
  .footer::after {
    top: 60%;
  }
}
</style>
