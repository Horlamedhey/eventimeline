import assert from 'assert'
import * as Realm from 'realm-web'
// import gql from 'graphql-tag'
import InsertOneUserMutation from '@/graphs/InsertOneUserMutation'
import getColorContrast from '@/helpers/getColorContrast'

export default {
  methods: {
    async recordEvent() {
      // collect event data
      const {
        eventDetails: {
          eventTitle,
          eventDescription,
          eventCategory,
          eventProvisions,
          eventLocation,
          eventDate,
          eventTime,
          eventImage,
        },
        organiserDetails: { organiserName, phone, email, adminPass },
        paymentDetails: { accountName, accountNumber, bankName, tickets },
        thirdPartyArtisans: thirdPartyPerks,
      } = this.finalData

      for (let i = 0; i < tickets.length; i++) {
        const ticket = tickets[i]
        ticket.quantitySold = 0
        ticket.currency = 'naira'
        if (
          typeof ticket.ticketPrice === 'string' &&
          ticket.ticketPrice.toLowerCase() === 'free'
        ) {
          ticket.ticketPrice = 0
        } else {
          ticket.ticketPrice = parseInt(ticket.ticketPrice)
        }
      }
      //   extract event imae an color
      const eventImageAndColor = eventImage.split(' ')

      //   create user credential
      const credentials = Realm.Credentials.emailPassword(email, adminPass)

      try {
        //   register and login
        try {
          await this.$realmApp.emailPasswordAuth.registerUser(email, adminPass)
        } catch (err) {
          console.log(err)
        }
        const {
          id: authId,
          accessToken,
          //   customData,
        } = await this.$realmApp.logIn(credentials)

        //   confirm login and login apollo
        assert(authId === this.$realmApp.currentUser.id)
        this.$apolloHelpers.onLogin(accessToken)

        //   create mutation variables from event data extract
        const mutationVariables = {
          organiserName,
          phone,
          authId,
          accountName,
          accountNumber,
          bankName,
          eventTitle,
          eventDescription,
          eventCategory,
          eventProvisions,
          tickets,
          eventLocation,
          eventDate: new Date(`${eventDate} ${eventTime}`),
          eventImage: eventImageAndColor[0],
          color: eventImageAndColor[1],
          textColor: getColorContrast(eventImageAndColor[1]),
          thirdPartyPerks,
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        //   create event, register user and add user bank account
        await this.$apolloClient
          .mutate({
            mutation: InsertOneUserMutation,
            variables: mutationVariables,
          })
          .then((res) => {
            this.newEventId = res.data._id
            this.loading = false
          })
      } catch (err) {
        console.error('Failed to log in', err.message)
      }
    },
  },
}
