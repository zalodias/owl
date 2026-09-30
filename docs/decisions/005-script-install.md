# A hosted script and one ingest route

Status: locked  
Date: 2026-09-26

Any site installs one script tag pointed at Owl, with a public website id. The script sends the path and referrer on load and when the address changes without a reload, and sends duration when the page is left.

The server reads the IP, browser identity, and country from that request, builds the visitor id, and writes the row. The client never sends an IP or a visitor id.

No package, no framework SDK, and no middleware on the measured site. Owl is its own project, not tied to one site’s structure.
