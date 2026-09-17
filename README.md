# Burger demo: what the ad networks actually receive

A real article page carrying real Meta, TikTok, Snapchat and Google pixels, with a
first-party capture layer underneath it and a live rail showing what each network gets.

**The comparison is the point.** Same browser, same visit:

- `?mode=baseline` behaves like an ordinary pixel install
- default runs the capture layer

The rail shows how many identifiers each holds, and for every one the capture layer gained,
why a normal install missed it.

## Setup

Edit `config.js` with your pixel IDs and redeploy. Pixel IDs are public by nature; every
site running a pixel exposes them in its page source.

## What this build cannot do

Static hosting has no server, so two things differ from production, and the page says so
rather than hiding it:

1. The visitor id cookie is written by JavaScript, not by a server as HttpOnly. Safari and
   every browser on iOS cap that at seven days, which is the durability problem the
   production design exists to solve.
2. Conversions-API payloads are built and shown, never sent. A token cannot live in a
   public page. The payloads are produced by the real shipped destination code, bundled
   for the browser and run with a stubbed fetch.

A browser also cannot see its own public IP, which Snapchat requires, so it is fetched
from a public echo as a stand-in for what a server already knows.
