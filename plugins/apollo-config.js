export default (context, inject) => {
  return {
    httpEndpoint:
      'https://realm.mongodb.com/api/client/v2.0/app/eventimeline-jlgbq/graphql',
    // httpLinkOptions: {
    //   headers: {
    //     apiKey:
    //       'jjESSEtXgN6LN62HJklczqLsnYSOwsrdArjte2fncINdriB4yyrNI6hwnB7FSVDh',
    //   },
    // },
    // override HTTP endpoint in browser only
    // browserHttpEndpoint: '/graphql',
    // You can use `wss` for secure connection (recommended in production)
    // Use `null` to disable subscriptions
    // wsEndpoint: 'ws://localhost:4000',

    // LocalStorage token
    tokenName: 'apollo-token',

    // Enable Automatic Query persisting with Apollo Engine
    persisting: true,

    // Use websockets for everything (no HTTP)
    // You need to pass a `wsEndpoint` for this to work
    websocketsOnly: false,
    /*
     * For permanent authentication provide `getAuth` function.
     * The string returned will be used in all requests as authorization header
     */
    // getAuth: () => `Bearer ${$realmAppUser.accessToken}`,
  }
}
