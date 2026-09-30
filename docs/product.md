# Owl

Owl is a simple, minimal analytics platform. A site adds one script tag. Owl stores each visit and shows metrics on a private dashboard with API access.

## Users

There is a single user of the platform — the operator. There are no accounts, teams, or signups.

| Who       | Function                                 |
| --------- | ---------------------------------------- |
| Operator  | Reads the private metrics for every site |
| Site      | Sends visits through the script tag      |
| Dashboard | Shows metrics like visitors or pageviews |

## Scope

| Feature   | Description                                                                                         |
| --------- | --------------------------------------------------------------------------------------------------- |
| Script    | A site adds one script tag with a public website id. No package or SDK on the measured site.        |
| Visits    | Each view is one row: visitor, site, page, referrer, country, device, and time.                     |
| Metrics   | Pageviews, visitors, paths, referrers, country, device, bounce rate, time on site, and time series. |
| API       | A private read client that returns platform metrics. The secret stays on the server.                |
| Dashboard | Private page behind the secret. It shows metrics & chart by calling the same client.                |

## Functionality

A page loads the script. The script posts to `/api/event`. It sends the path and the referring site on load, and again when the address changes without a full reload.

The server owns the rest. It builds the visitor identity, reads the country and device class, drops bots, strips the query string from the path, and stores one row. A visit is the same visitor until 30 minutes pass with no new pageview. That split is computed when the numbers are read.

A private read client turns those rows into the totals and charts. The dashboard and any public page both call that client. The dashboard is only a view of numbers the client already returns.
