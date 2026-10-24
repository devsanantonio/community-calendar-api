"""The next five San Antonio tech events. Python 3.9+, standard library only.

    python3 next_events.py
    python3 next_events.py aws,datanauts
"""
import sys
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime

NS = {"devsa": "https://www.devsa.community/ns/event-feed/1.0"}
url = "https://www.devsa.community/api/events/feed"
if len(sys.argv) > 1:
    url += "?communityId=" + sys.argv[1]

with urllib.request.urlopen(url) as res:
    channel = ET.parse(res).getroot().find("channel")

for item in channel.findall("item")[:5]:
    start = datetime.fromisoformat(item.findtext("devsa:eventStart", namespaces=NS))
    hosts = ", ".join(h.text for h in item.findall("devsa:host", NS) if h.text)
    print(f"{start:%a %b %-d, %-I:%M %p}  {item.findtext('title')}" + (f"  ({hosts})" if hosts else ""))
    print(f"  {item.findtext('link')}")
