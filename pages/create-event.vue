<template>
  <div
    class="flex flex-wrap justify-between pb-64 m-auto bg-white border-t md:flex-no-wrap font-quicksand xl:w-7/12"
  >
    <BaseCreateEventIntro
      :style="{
        backgroundImage: `url(${require('@/static/images/create-event-vector.png')})`,
      }"
      class="px-8 py-20 bg-no-repeat bg-contain w-72 sm:w-96"
    ></BaseCreateEventIntro>
    <BaseCreateEventForm
      class="w-full px-3 sm:px-0 sm:w-9/12 sm:m-auto md:w-7/12 lg:w-5/12"
    ></BaseCreateEventForm>
  </div>
</template>

<script>
// import assert from 'assert'
// import * as Realm from 'realm-web'
// import gql from 'graphql-tag'
// import InsertOneAccountMutation from '@/graphs/create/InsertOneAccountMutation'
// import fetchAccount from '@/graphs/read/fetchAccount'
export default {
  metaInfo: {
    title: 'Create Event',
  },
  // data() {
  //   return {}
  // },
  // mounted() {
  //   // this.firstDome()
  // },
  // methods: {
  //   async firstDome() {
  //     console.log(await this.dome())
  //   },
  //   async dome() {
  //     // create user credentials
  //     const credentials = Realm.Credentials.emailPassword(
  //       'Horlasco34@gmail.com',
  //       'Horlasco34@yahoo.com'
  //     )

  //     // login user
  //     const {
  //       // id: authId,
  //       // accessToken,
  //       customData,
  //     } = await this.$realmApp.logIn(credentials)
  //     console.log(customData)
  //   confirm login and login apollo
  // assert(authId === this.$realmApp.currentUser.id)
  // this.$apolloHelpers.onLogin(accessToken)

  // // collect account query and mutation variables
  // const accountVariables = {
  //   accountName: 'AJAO GAFAR OLAMIDE',
  //   accountNumber: '0232024073',
  //   bankName: '058',
  //   authId: '5f97412eb17223c8207d45f9',
  // }

  // // proceed
  // try {
  //   const {
  //     data: { _id: account },
  //   } = await this.$apolloClient.mutate({
  //     mutation: InsertOneAccountMutation,
  //     variables: accountVariables,
  //   })
  //   return account
  // } catch (err) {
  //   console.log(err.message)
  //   if (err.message.toLowerCase().includes('duplicate')) {
  //     try {
  //       const {
  //         data: { account },
  //       } = await this.$apolloClient.query({
  //         query: fetchAccount,
  //         variables: accountVariables,
  //       })
  //       return account !== null ? account._id : account
  //     } catch (err) {
  //       console.log(err.message)
  //     }
  //   }
  // }
  //   },
  // },
  head() {
    return {
      script: [{ src: 'https://widget.cloudinary.com/v2.0/global/all.js' }],
    }
  },
}
</script>
