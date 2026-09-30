# What a row stores, and when the real site gets the script

Status: locked  
Date: 2026-09-27

A page is the path only. Each row stores the visitor id, website id, page, referring site, country, device, time, and duration when known.

Country comes from the host. Device is only desktop, mobile, or tablet.

The script may record visits. Reading the numbers requires a secret that stays on the server.

One live database. Preview deploys do not create extra ones.
