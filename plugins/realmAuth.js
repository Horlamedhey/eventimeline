import assert from 'assert'
import * as Realm from 'realm-web'

export default async (context, inject) => {
  // console.log('plugin')
  const app = new Realm.App({ id: 'eventimeline-jlgbq', timeout: 10000 })

  // Create an anonymous credential
  const credentials = Realm.Credentials.anonymous()
  try {
    // Authenticate the user
    if (app.currentUser) {
      // console.log('if')
      // context.app.$realmAppUser = app.currentUser
      // await context.app.$apolloHelpers.onLogin(app.currentUser.accessToken)
      inject('realmApp', app)
    } else {
      // console.log('else')
      const user = await app.logIn(credentials)
      // console.log(user)
      // `App.currentUser` updates to match the logged in user
      // await context.app.$apolloHelpers.onLogin(app.currentUser.accessToken)
      assert(user.id === app.currentUser.id)
      inject('realmApp', app)
      // context.app.$realmAppUser = user
    }
  } catch (err) {
    console.error('Failed to log in', err)
  }
  // Inject $hello(msg) in Vue, context and store.
  //   context.$apolloHelpers.onLogin(context.$realmAppUser.accessToken)
}
