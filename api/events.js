// api/events.js (Vercel serverless function)

import ical from 'node-ical';

export default async function handler(req, res) {
  try {
    const url = "https://calendar.google.com/calendar/ical/whatsupcph%40gmail.com/public/basic.ics";
    const data = await ical.async.fromURL(url);

    const events = Object.values(data)
      .filter(event => event.type === 'VEVENT')
      .map(event => ({
        tekst: event.summary,
        dato: event.start.toISOString().split('T')[0],
        tid: event.start.toISOString().split('T')[1].substring(0, 5),
        kategori: event.categories?.[0]?.toLowerCase() || "diverse"
      }));

    res.status(200).json(events);
  } catch (err) {
    console.error("Fejl ved hentning/parsing af iCal:", err);
    res.status(500).json({ error: "Noget gik galt" });
  }
}
