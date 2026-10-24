# community-calendar-api

**Build with San Antonio's tech calendar.**

The [DEVSA community calendar](https://www.devsa.community/events) lists the events of 25 San Antonio tech groups and DEVSA's partners in one place: meetups, workshops, conferences, live builds. Every group publishes to it, and all of it is open. This repo documents how to read it, with three small examples to start from.

What you build with it is up to you: a widget on your group's site, a bot for your Discord or Slack, a map, a "what's on tonight" screen for a lobby. The point of the calendar is to make the rooms easy to find. Anything that helps someone find one is a good use of it.

## The endpoints

| What | URL | Format |
|---|---|---|
| Upcoming events | `https://www.devsa.community/api/events/feed` | RSS 2.0 + `devsa:` fields |
| Past events | `https://www.devsa.community/api/events/feed/past` | RSS 2.0 + `devsa:` fields |
| The feed's contract | `https://www.devsa.community/api/events/feed/schema` | JSON |
| Subscribe in a calendar app | `https://www.devsa.community/api/events/calendar` | iCalendar (.ics) |
| The groups | `https://www.devsa.community/api/communities` | JSON |

No key, no sign-up. The RSS feed allows cross-origin requests, so it works straight from a browser.

These are the supported endpoints. The site also has an internal `/api/events` that its own pages use. It isn't documented, its shape changes without notice, and builds on it will break. Use the feed.

**Filter by group** with `communityId`, one id or several separated by commas (an event matches if any of its hosts match):

```
https://www.devsa.community/api/events/feed?communityId=alamo-python
https://www.devsa.community/api/events/feed?communityId=aws,datanauts
```

## Start here

```sh
node examples/next-events.mjs          # Node 18+
python3 examples/next_events.py        # Python 3.9+
open examples/widget.html              # a drop-in HTML widget
```

Each is the whole program, short enough to read in a minute, with no dependencies.

## What's in an event

Every `<item>` has the standard RSS `title`, `link`, `guid`, `description` (a one-line human summary) and `pubDate` (when it was listed), plus these, in the `devsa` namespace `https://www.devsa.community/ns/event-feed/1.0`:

| Field | What it holds |
|---|---|
| `devsa:eventStart` | ISO 8601 start, with the Central offset, e.g. `2026-10-27T18:00:00-05:00` |
| `devsa:eventEnd` | ISO 8601 end, when one is set |
| `devsa:eventTimezone` | Always `America/Chicago` |
| `devsa:eventType` | `in-person`, `virtual` or `hybrid` |
| `devsa:host` | A hosting group or partner; repeats for co-hosted events |
| `devsa:venue`, `devsa:address` | Where, when set |
| `devsa:description` | The event's own description, plain text, possibly shortened |
| `devsa:rsvpUrl`, `devsa:rsvpMode` | Where to RSVP, on upcoming events that take RSVPs |

Fields are left out, not sent empty, when there's no value. The [schema endpoint](https://www.devsa.community/api/events/feed/schema) is the authoritative list, including every omission rule.

## Group ids

| Group | `communityId` |
|---|---|
| .NET User Group | `dotnet-user-group` |
| ACM San Antonio | `acm-sa` |
| ACM UTSA | `acm-utsa` |
| AITX | `aitx` |
| Alamo Agents | `alamo-agents` |
| Alamo City AI | `alamo-city-ai` |
| Alamo City Locksport | `alamo-city-locksport` |
| Alamo City Unity User Group | `alamo-city-unity-user-group` |
| Alamo Python | `alamo-python` |
| Alamo Regional Data Alliance | `arda` |
| Alamo Tech Collective | `atc` |
| AWS User Group | `aws` |
| Datanauts | `datanauts` |
| DEF CON Group SATX | `defcongroup-sa` |
| Geeks && {...} | `geeks-and-drinks` |
| Google Developer Group | `gdg` |
| Greater Gaming Society | `greater-gaming-society` |
| Latinas in Tech | `latinas-in-tech` |
| Linux San Antonio | `linux-satx` |
| OWASP San Antonio | `owasp` |
| Red Hat User Group | `redhat` |
| SAHA | `saha` |
| Unreal Engine SA | `unreal-engineers-sa` |
| UTSA CyberJedis | `utsa-cyberjedis` |
| UXSA | `uxsa` |

This list changes as groups join. `/api/communities` is always current.

## Ideas

- **Your group's site.** Drop `widget.html` in, set `data-community` to your id, and your site's events list maintains itself.
- **A Discord or Slack bot.** Post tomorrow's events every evening, or a weekly roundup for your server.
- **A map.** Geocode `devsa:address` and show where San Antonio tech meets, by week or by month.
- **History.** The past feed goes back to the calendar's beginning. Which groups meet most, which months are busiest, how the scene has grown.

## Be a good neighbor

- **Cache.** Events change a few times a day at most. Fetching every few minutes is plenty; once an hour is better.
- **Link back.** Each event's `link` is its page, with the RSVP and the details. Send people there rather than copying the description.
- **Want your group on the calendar?** That's not done here: ask in the [DEVSA Discord](https://www.devsa.community/discord) or reach out through [devsa.community](https://www.devsa.community).

## Show us

Built something on the calendar? Share it in **#build-and-tell** on the [DEVSA Discord](https://www.devsa.community/discord), and add it to the showcase in [devsa-sessions](https://github.com/devsanantonio/devsa-sessions/blob/main/SHOWCASE.md).

## License

The examples are [MIT](LICENSE). The event listings belong to the groups that publish them.
