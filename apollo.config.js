module.exports = {
  client: {
    service: {
      name: 'eventimeline',
      // URL to the GraphQL API
      url:
        'https://realm.mongodb.com/api/client/v2.0/app/eventimeline-aegna/graphql',
    },
    // Files processed by the extension
    includes: ['src/**/*.vue', 'src/**/*.js'],
  },
}
