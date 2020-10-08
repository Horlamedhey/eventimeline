export default (context, inject) => {
  return {
    httpEndpoint:
      'https://realm.mongodb.com/api/client/v2.0/app/eventimeline-jlgbq/graphql',
    tokenName: 'apollo-token',
    persisting: true,
    websocketsOnly: false,
  }
}
