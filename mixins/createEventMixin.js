import assert from 'assert'
// import * as Realm from 'realm-web'
// import gql from 'graphql-tag'
import InsertOneUserMutation from '@/graphs/create/InsertOneUserMutation'
import UpdateOneUserMutation from '@/graphs/update/UpdateOneUserMutation'
import UpdateOneUserMutationWithAccounts from '@/graphs/update/UpdateOneUserMutationWithAccounts'
import InsertOneEventMutation from '@/graphs/create/InsertOneEventMutation'
import InsertOneAccountMutation from '@/graphs/create/InsertOneAccountMutation'
import fetchAccount from '@/graphs/read/fetchAccount'
import getColorContrast from '@/helpers/getColorContrast'
import getArrayEquality from '@/helpers/arrayEqualityChecker'

export default {
  methods: {
    async recordEvent() {
      //   register/login
      const {
        user: { id: authId, accessToken },
      } = this.authUser

      //   confirm login and login apollo
      assert(authId === this.$realmApp.currentUser.id)
      this.$apolloHelpers.onLogin(accessToken)

      // collect bank account id
      const bankAccountId = await this.getBankAccountId()

      // collect event id
      const newEventId = await this.getNewEventId()

      //  update user with new event
      await this.updateUserWithNewEvent(bankAccountId, newEventId)
      this.newEventId = newEventId
      this.loading = false
    },

    async getBankAccountId() {
      // collect event data
      const {
        paymentDetails: { accountName, accountNumber, bankName },
      } = this.finalData
      // create bank account mutation variables
      const accountVariables = {
        accountName: accountName.trim(),
        accountNumber: accountNumber.trim(),
        bankName: bankName.split('_')[1].trim(),
        bankCode: bankName.split('_')[0].trim(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
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

    async getNewEventId() {
      const eventVariables = await new Promise((resolve) => {
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
          organiserDetails: {
            email,
            // adminPass
          },
          paymentDetails: { tickets },
          thirdPartyArtisans: thirdPartyPerks,
        } = this.finalData

        for (let i = 0; i < tickets.length; i++) {
          const ticket = tickets[i]
          if (
            ticket.maxAvailable === null ||
            ticket.ticketType === '' ||
            isNaN(ticket.ticketPrice)
          ) {
            tickets.splice(i, 1)
          } else {
            ticket.quantitySold = 0
            ticket.currency = 'naira'
            ticket.ticketType = ticket.ticketType.trim()
            if (
              typeof ticket.ticketPrice === 'string' &&
              ticket.ticketPrice.toLowerCase().trim() === 'free'
            ) {
              ticket.ticketPrice = 0
            } else {
              ticket.ticketPrice = parseInt(ticket.ticketPrice)
            }
          }
        }

        const cheapestTicket = tickets.sort((ticket1, ticket2) =>
          ticket1.ticketPrice > ticket2.ticketPrice ? 1 : -1
        )[0]
        // create event mutation variables
        const finalVariables = {
          email: email.toLowerCase().trim(),
          eventTitle: eventTitle.trim(),
          eventDescription: eventDescription.trim(),
          eventCategory: eventCategory.trim(),
          eventProvisions: eventProvisions.map((v) => v.trim()),
          isProvisions:
            eventProvisions !== undefined && eventProvisions.length > 0,
          tickets,
          cheapestTicket,
          eventLocation: eventLocation.trim(),
          finalEventDate: new Date(`${eventDate} ${eventTime}`),
          eventImage: eventImage.split(' ')[0].trim(),
          color: eventImage.split(' ')[1].trim(),
          textColor: getColorContrast(eventImage.split(' ')[1].trim()),
          thirdPartyPerks:
            thirdPartyPerks.length > 0
              ? thirdPartyPerks.map((v) => v.trim())
              : undefined,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        // console.log(finalVariables)
        resolve(finalVariables)
      })
      // console.log(eventVariables)
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

    async updateUserWithNewEvent(bankAccountId, newEventId) {
      // collect event data
      const {
        organiserDetails: {
          organiserName,
          phone,
          email,
          // adminPass
        },
      } = this.finalData

      // collect user data
      const {
        newUser,
        user: {
          id: authId,
          customData: {
            name: existingName,
            phone: existingPhone,
            accounts,
            events,
          },
        },
      } = this.authUser

      const userVariables = await new Promise((resolve) => {
        const allEvents = newUser ? [] : events.map((v) => v.$oid)
        const allAccounts = newUser ? [] : accounts.map((v) => v.$oid)
        if (!allAccounts.includes(bankAccountId) && bankAccountId !== null) {
          allAccounts.unshift(bankAccountId)
        }
        // proceed
        const finalVariables = {
          organiserName:
            organiserName !== existingName ? organiserName.trim() : undefined,
          email: email.toLowerCase().trim(),
          phone: phone !== existingPhone ? phone.trim() : undefined,
          authId,
          bankAccounts: allAccounts,
          events: [newEventId, ...allEvents],
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        console.log(finalVariables)
        resolve(finalVariables)
      })

      console.log(userVariables)

      try {
        //   create/update user
        if (newUser) {
          await this.$apolloClient.mutate({
            mutation: InsertOneUserMutation,
            variables: userVariables,
          })
          await this.$realmApp.currentUser.refreshCustomData()
        } else {
          await this.$apolloClient.mutate({
            mutation:
              accounts.length !== userVariables.bankAccounts.length ||
              !(await getArrayEquality(
                accounts.map((v) => v.$oid),
                userVariables.bankAccounts
              ))
                ? UpdateOneUserMutationWithAccounts
                : UpdateOneUserMutation,
            variables: userVariables,
          })
        }
      } catch (err) {
        console.error(err.message)
      }
    },
  },
}
