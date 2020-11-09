import assert from 'assert'
import * as Realm from 'realm-web'
// import gql from 'graphql-tag'
import InsertOneUserMutation from '@/graphs/create/InsertOneUserMutation'
import UpdateOneUserMutation from '@/graphs/update/UpdateOneUserMutation'
import InsertOneEventMutation from '@/graphs/create/InsertOneEventMutation'
import InsertOneAccountMutation from '@/graphs/create/InsertOneAccountMutation'
import fetchAccount from '@/graphs/read/fetchAccount'
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

      const finalEventDate = new Date(`${eventDate} ${eventTime}`)

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

      //   register/login
      const {
        newUser,
        user: {
          id: authId,
          accessToken,
          customData: { accounts, events },
        },
      } = await this.authenticateUser(email.toLowerCase(), adminPass)

      // collect existing data
      const allAccounts = newUser ? [] : accounts.map((v) => v.$oid)
      const allEvents = newUser ? [] : events.map((v) => v.$oid)

      //   confirm login and login apollo
      assert(authId === this.$realmApp.currentUser.id)
      this.$apolloHelpers.onLogin(accessToken)

      // create bank account mutation variables
      const accountVariables = {
        accountName,
        accountNumber,
        bankName,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      // collect bank account id
      const bankAccountId = await this.getBankAccountId(accountVariables)
      if (!allAccounts.includes(bankAccountId) && bankAccountId !== null) {
        allAccounts.unshift(bankAccountId)
      }

      // create event mutation variables
      const eventVariables = {
        authId,
        eventTitle,
        eventDescription,
        eventCategory,
        eventProvisions,
        isProvisions:
          eventProvisions !== undefined && eventProvisions.length > 0,
        tickets,
        cheapestTicket: tickets.sort((ticket1, ticket2) =>
          ticket1.ticketPrice > ticket2.ticketPrice ? 1 : -1
        )[0],
        eventLocation,
        finalEventDate,
        eventImage: eventImageAndColor[0],
        color: eventImageAndColor[1],
        textColor: getColorContrast(eventImageAndColor[1]),
        thirdPartyPerks:
          thirdPartyPerks.length > 0 ? thirdPartyPerks : undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      // collect event id
      const newEventId = await this.getNewEventId(eventVariables)

      // create user mutation variables
      const userVariables = {
        organiserName,
        phone,
        authId,
        bankAccounts: allAccounts,
        events: [newEventId, ...allEvents],
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      try {
        //   create/update user
        if (newUser) {
          await this.$apolloClient.mutate({
            mutation: InsertOneUserMutation,
            variables: userVariables,
          })
        } else {
          await this.$apolloClient.mutate({
            mutation: UpdateOneUserMutation,
            variables: userVariables,
          })
        }
        this.newEventId = newEventId
        this.loading = false
      } catch (err) {
        console.error(err.message)
      }
    },
    async authenticateUser(email, password) {
      //   create user credential
      const credentials = Realm.Credentials.emailPassword(email, password)

      try {
        // login
        const user = await this.$realmApp.logIn(credentials)
        return { user, newUser: false }
      } catch (err) {
        console.log(err)

        // register
        try {
          await this.$realmApp.emailPasswordAuth.registerUser(email, password)
          const user = await this.$realmApp.logIn(credentials)
          return { user, newUser: true }
        } catch (err) {
          console.error(err)
        }
      }
    },
    async getBankAccountId(accountVariables) {
      // proceed
      try {
        const {
          data: {
            insertOneAccount: { _id: account },
          },
        } = await this.$apolloClient.mutate({
          mutation: InsertOneAccountMutation,
          variables: accountVariables,
        })
        return account
      } catch (err) {
        // console.log(err.message)
        if (err.message.toLowerCase().includes('duplicate')) {
          try {
            const {
              data: {
                account: { _id: account },
              },
            } = await this.$apolloClient.query({
              query: fetchAccount,
              variables: accountVariables,
            })
            return account
          } catch (err) {
            console.log(err.message)
          }
        }
      }
    },
    async getNewEventId(eventVariables) {
      // proceed
      try {
        const {
          data: {
            insertOneEvent: { _id: event },
          },
        } = await this.$apolloClient.mutate({
          mutation: InsertOneEventMutation,
          variables: eventVariables,
        })
        return event
      } catch (err) {
        console.log(err.message)
      }
    },
  },
}
