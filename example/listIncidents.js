let PagerDutyAPI = require('..')

const PAGERDUTY_EMAIL = process.env.PAGERDUTY_EMAIL
const PAGERDUTY_TOKEN = process.env.PAGERDUTY_TOKEN

let pdapi = new PagerDutyAPI(PAGERDUTY_EMAIL, PAGERDUTY_TOKEN)

pdapi.listIncidents({statuses: ['triggered'], include: ['users','services','priorities']}).then((data) => {
    console.log(data)
})

pdapi.getUser('PQ6ASX3', {include: ['contact_methods','teams','notification_rules']}).then((data) => {
    console.log(data)
})