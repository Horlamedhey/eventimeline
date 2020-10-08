export default (
  { graphQLErrors, networkError, operation, forward },
  { app, $realmApp }
) => {
  // console.log('apollo', app.$apolloHelper, 'realm', $realmApp)
  console.log('Global error handler')
  console.log(
    'graphQLErrors',
    graphQLErrors,
    'networkError',
    networkError,
    'operation',
    operation,
    'forward',
    forward
  )
}
