# Duration from one leave signal; visits from a 30-minute gap

Status: locked  
Date: 2026-09-26

When the page is left, the browser sends one beacon with the time spent on that pageview. A random id on the pageview lets that beacon update the same row.

A visit is the same visitor id, and a new visit starts after a 30-minute gap. Bounce is one page and under 15 seconds. Time on site runs from the first view to the last signal.

There are no heartbeats and no session table. The gap is applied when the numbers are read.

If the leave beacon never arrives, that visit is left out of bounce rate and average time.
