# jsPagerDuty #

**jsPagerDuty** is a Javascript module for working with the [PagerDuty API](https://api-reference.pagerduty.com/) insipired by [Caian Ertl](https://github.com/caiertl).

## Requirements
* Tested against PagerDuty REST API v2
* For Node.js you will need the [xmlhttprequest](https://www.npmjs.com/package/xmlhttprequest) library.

## Documentation ##
### Getting Started

If you are using Node.js, install jsPagerDuty using npm:

```bash
$ npm install jspagerduty
```

You can now require and use jspagerduty like so:

```js
let PagerDutyAPI = require('jspagerduty')

const PAGERDUTY_EMAIL = process.env.PAGERDUTY_EMAIL
const PAGERDUTY_TOKEN = process.env.PAGERDUTY_TOKEN

let pdapi = new PagerDutyAPI(PAGERDUTY_EMAIL, PAGERDUTY_TOKEN)

pdapi.listIncidents({statuses: ['triggered'], include: ['users','services','priorities']}).then((data) => {
    console.log(data)
})

pdapi.getUser('PQ6ASX3', {include: ['contact_methods','teams','notification_rules']}).then((data) => {
    console.log(data)
})
```

Refer to the [PagerDuty API Documentation](https://api-reference.pagerduty.com/) and the [jsPagerDuty Examples](https://github.com/Sighmir/jsPagerDuty/tree/master/examples) for more information.  

### Browser

You can also load this script on your browser like so:

```html
<script src='https://cdn.jsdelivr.net/npm/jspagerduty/jsPagerDuty.js'></script>
```

You can now use the class PagerDutyAPI normally on the page, like you would on Node.js.

## License ##
```
jsPagerDuty - PagerDuty API Javascript Library.
Copyright (C) 2019  Guilherme Caulada (Sighmir)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
```
