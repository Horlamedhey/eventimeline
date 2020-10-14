import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

export default ({ app, $config: { realmApiKey } }) => {
  const httpLink = new HttpLink({
    uri:
      'https://realm.mongodb.com/api/client/v2.0/app/eventimeline-jlgbq/graphql',
    credentials: 'same-origin',
  })

  // middleware
  const middlewareLink = new ApolloLink((operation, forward) => {
    const headers = process.server
      ? {
          apiKey: realmApiKey,
        }
      : {
          authorization: `Bearer ${app.$realmApp.currentUser.accessToken}`,
        }
    operation.setContext({
      headers,
    })
    return forward(operation)
  })
  const link = ApolloLink.from([
    // onError(err) =>console.log(err),
    middlewareLink,
    httpLink,
  ])
  // middlewareLink.concat(httpLink)
  return {
    link,
    cache: new InMemoryCache(),
    defaultHttpLink: false,
  }
}
