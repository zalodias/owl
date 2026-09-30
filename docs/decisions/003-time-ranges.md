# Store events, choose the chart bucket when reading

Status: locked  
Date: 2026-09-26

Every pageview keeps its exact time. Ranges are filters on those rows. The chart bucket depends on the range: hour for a day, day for a week or month, month for a year or all time, and year once all-time is long.

Owl does not keep a separate daily rollup.
