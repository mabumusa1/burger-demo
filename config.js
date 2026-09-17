/*
 * Pixel IDs for the demo. These are PUBLIC by nature: every site that runs a pixel exposes
 * its id in the page source. Access tokens are a different matter and never appear here,
 * which is why the conversions-API payloads on this page are built and shown but not sent.
 *
 * Fill these in and redeploy.
 */
window.SFERE_CONFIG = {
  siteName: 'The Daily Grill',
  pixels: {
    meta:   '2545993665903184',   // Meta pixel / dataset id, e.g. 1234567890
    tiktok: 'DA6142BC77UC8FLJ2OIG',   // TikTok pixel code,       e.g. CABCDEFGHIJKLMNOPQRS
    snap:   '0e089d2a-b241-49a1-a657-b64caf93d66f',   // Snap pixel id,           e.g. 11111111-2222-3333-4444-555555555555
    ga4:    'G-RXQTG25Z6S',   // GA4 measurement id,      e.g. G-XXXXXXXXXX
  },
  // A browser cannot see its own public IP, and Snapchat refuses a payload without one.
  // This stands in for what a server would already know. Set to null to skip the lookup.
  ipEcho: 'https://api.ipify.org?format=json',

  // Where the Jitsu tracker posts. It appends /api/s/<method>, so a webhook collector
  // receives POSTs at /api/s/track and /api/s/page.
  jitsuHost: 'https://hook-142slz.fasthook.io',
  jitsuWriteKey: 'burgerdemo:webhookcapture',
};
