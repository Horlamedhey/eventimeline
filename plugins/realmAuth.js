import * as Realm from 'realm-web'

export default (context, inject) => {
  const app = new Realm.App({ id: 'eventimeline-jlgbq', timeout: 10000 })

  // Create an anonymous credential

  inject('realmApp', app)
  inject('apolloClient', context.app.apolloProvider.defaultClient)
}
