import ical from 'node-ical';

export default async function handler(req, res) {
  const feeds = [
    { url: 'https://calendar.google.com/calendar/ical/e27f8ab8cd51113c098e129b31060b84b55d1c9716e748210378b11e8efe1dab%40group.calendar.google.com/public/basic.ics', kategori: 'børn' },
    { url: 'https://calendar.google.com/calendar/ical/3d9810d2d37ee9ab9c7038317801f1503797033d919f396f1d04de82bbbfc31b%40group.calendar.google.com/public/basic.ics', kategori: 'diverse' },
    { url: 'https://calendar.google.com/calendar/ical/709cd1dfa60fe61b5ffb9dde708429e2b5f5fc4ccfcc65b77d8f4075c6a9d7ce%40group.calendar.google.com/public/basic.ics', kategori: 'kunst' },
    { url: 'https://calendar.google.com/calendar/ical/19b99fc095d802295943897256f7ca466789eec0ac593366842a4648883e700b%40group.calendar.google.com/public/basic.ics', kategori: 'loppe' },
    { url: 'https://calendar.google.com/calendar/ical/7ab1d437edab8e175adf462fc29cf80788bf06a526ffedcc24a07f1d2a3dcc9a%40group.calendar.google.com/public/basic.ics', kategori: 'musik' },
    { url: 'https://calendar.google.com/calendar/ical/b7d85e7637d8a3435cf96f1b145bd1c52d1e84dfd01b64e25250ea048a9d166b%40group.calendar.google.com/public/basic.ics', kategori: 'sport' },
  ];

  const allEvents = [];

  for (const feed of feeds) {
    try {
      const data = await ical.async.fromURL(feed.url);

      Object.values(data).forEach((event) => {
        if (event.type === 'VEVENT') {
          const start = new Date(event.start);
          const tid = start.toTimeString().slice(0, 5);
          const dato = start.toISOString().split('T')[0];
          const tekst = event.summary || 'Ukendt event';
          const lokation = event.location?.toLowerCase().includes('k') ? 'kbh-k' :
                           event.location?.toLowerCase().includes('v') ? 'kbh-v' :
                           event.location?.toLowerCase().includes('n') ? 'kbh-n' :
                           event.location?.toLowerCase().includes('ø') ? 'kbh-ø' :
                           event.location?.toLowerCase().includes('s') ? 'kbh-s' : 'ukendt';

          allEvents.push({ tid, tekst, kategori: feed.kategori, lokation, dato });
        }
      });
    } catch (err) {
      console.error(`Fejl ved ${feed.kategori}:`, err);
    }
  }

  res.status(200).json(allEvents);
}
Klik “Commit new file”

B) Opret endnu en fil: package.json
Gå tilbage → “Add file” → “Create new file”

Filnavn: package.json

Indsæt:

json
Kopiér
Rediger
{
  "name": "whatsupcph-backend",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "node-ical": "^0.15.0"
  }
}
