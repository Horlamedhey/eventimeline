export default (event, email) => {
  // console.log(event, email)
  if (event.organiser && event.organiser.email === email)
    return { ...event, role: 'Organiser' }
  else if (
    event.agents &&
    event.agents.length > 0 &&
    event.agents.find((v) => v.email === email) !== undefined
  )
    return { ...event, role: 'Agent' }
  else if (
    event.thirdParties.length > 0 &&
    event.thirdParties.find((v) => v.email === email) !== undefined
  )
    return { ...event, role: 'ThirdParty' }
}
