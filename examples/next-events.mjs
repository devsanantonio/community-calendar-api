// The next five San Antonio tech events. Node 18+, no dependencies.
//   node next-events.mjs                      every group
//   node next-events.mjs aws,datanauts        just these groups
const ids = process.argv[2] ? `?communityId=${process.argv[2]}` : ''
const xml = await (await fetch(`https://www.devsa.community/api/events/feed${ids}`)).text()
const decode = s => s.replace(/&(amp|lt|gt|quot|apos);/g, (_, e) => ({ amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" })[e])
const tag = (item, name) => decode(item.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`))?.[1] ?? '')
for (const item of xml.split('<item>').slice(1, 6)) {
  const start = new Date(tag(item, 'devsa:eventStart'))
  const when = start.toLocaleString('en-US', { timeZone: 'America/Chicago', weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
  console.log(`${when}  ${tag(item, 'title')}\n  ${tag(item, 'link')}`)
}
