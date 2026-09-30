# A stable cookieless visitor id

Status: locked  
Date: 2026-09-26

The visitor id is a hash of IP address, browser identity, and a server secret that stays fixed. Only the hash is stored.

The same person stays one visitor across a day, a month, a year, and the all-time total, until their network or browser changes. A secret that rotates every day would make yearly uniques a sum of days.
