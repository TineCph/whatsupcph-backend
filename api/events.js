// api/events.js
import ical from 'node-ical';

const kalendere = [
  {
    navn: 'musik',
    url: 'https://calendar.google.com/calendar/ical/7ab1d437edab8e175adf462fc29cf80788bf06a526ffedcc24a07f1d2a3dcc9a%40group.calendar.google.com/public/basic.ics',
  },
  {
    navn: 'sport-outdoor',
    url: 'https://calendar.google.com/calendar/ical/b7d85e7637d8a3435cf96f1b145bd1c52d1e84dfd01b64e25250ea048a9d166b%40group.calendar.google.com/public/basic.ics',
  },
  {
    navn: 'loppe',
    url: 'https://calendar.google.com/calendar/ical/19b99fc095d802295943897256f7ca466789eec0ac593366842a4648883e700b%40group.calendar.google.com/public/basic.ics',
  },
  {
    navn: 'diverse',
    url: 'https://calendar.google.com/calendar/ical/3d9810d2d37ee9ab9c7038317801f1503797033d919f396f1d04de82bbbfc31b%40group.calendar.google.com/public/basic.ics',
  },
  {
    navn: 'kunst-kultur',
    url: 'https://calendar.google.com/calendar/ical/709cd1dfa60fe61b5ffb9dde708429e2b5f5fc4ccfcc65b77d8f4075c6a9d7ce%40group.calendar.google.com/public/basic.ics',
  },
  {
    navn: 'børn',
    url: 'https://calendar.google.com/calendar/ical/e27f8ab8cd51113c098e129b31060b84b55d1c9716e748210378b11e8efe1dab%40group.calendar.google.com/public/basic.ics',
  },
];

export default async function handler(req, res) {
  try {
    let samletEvents = [];

    for (const kalender of kalendere) {
      const data = await ical.async.fromURL(kalender.url);

      const events = Object.values(data)
        .filter(event => event.type === 'VEVENT')
        .map(event => ({
          tekst: event.summary,
          dato: event.start.toISOString().split('T')[0],
          tid: event.start.toISOString().split('T')[1].substring(0, 5),
          kategori: kalender.navn.toLowerCase(),
        }));

      samletEvents.push(...events);
    }

    res.status(200).json(samletEvents);
  } catch (err) {
    console.error('Fejl ved hentning/parsing af iCal-feeds:', err);
    res.status(500).json({ error: 'Noget gik galt med event-hentningen' });
  }
}
