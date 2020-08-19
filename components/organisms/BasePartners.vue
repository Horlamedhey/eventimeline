<template>
  <div class="container justify-center mx-auto mt-32 lg:w-10/12 xl:w-8/12">
    <h2
      class="text-2xl font-semibold text-center font-josefinsans"
      style="color: #444357;"
    >
      Our Partners
    </h2>
    <div class="flex flex-wrap mt-10 justify-evenly">
      <client-only>
        <cld-image
          v-for="i in 5"
          :key="`partner-${i}`"
          :public-id="`events/partner${i}.png`"
          alt="partner"
          fetch-format="auto"
          quality="auto"
          client-hints="true"
          loading="lazy"
          crop="scale"
          width="200"
          class="m-3"
        >
          <cld-placeholder type="blur"> </cld-placeholder>
        </cld-image>
      </client-only>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BasePartners',
}
</script>
