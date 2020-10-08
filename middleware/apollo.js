export default async function ({ app }) {
  const appToken = app.$realmApp.currentUser.accessToken
  const apolloHelpers = app.$apolloHelpers
  await apolloHelpers.onLogin(appToken)
}
