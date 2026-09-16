/* AIRWAVES SITE CONTENT — duplicate an item below to add a card. Images are optional. */
window.AIRWAVES_SITE = {
  /* Optional secure resolver, e.g. https://airwaves-api.example.workers.dev/youtube-duration.
     Leave blank to use the hosted YouTube iframe fallback. Never put a YouTube API key here. */
  youtubeDurationEndpoint: "",
  intro: "We Are AIRWAVES. Est. 2025.",
  about: "AIRWAVES was founded in 2025 by Brandon C., Liam W., Rahul C and Princeton L.",
  email: "areweairwaves@gmail.com",
  navigation: [
    { label: "AIRWAVES", path: "index.html", page: "home" }, { label: "News", path: "news.html", page: "news" },
    { label: "Media", path: "media.html", page: "media" }, { label: "Releases", path: "releases.html", page: "releases" },
    { label: "Next Show", path: "next-show.html", page: "next-show" }, { label: "Backstage Pass", path: "backstage.html", page: "backstage" }, { label: "About Us", path: "about.html", page: "about" },
    { label: "Contact", path: "contact.html", page: "contact" },
  ],
  nextShow: {
    date: "SEP 17 / 2026", venue: "THE AFTERMATH", city: "HONG KONG, HONG KONG",
    doors: "DOORS 20:30 / AIRWAVES 20:30", note: "WE'RE BACK, ON THE WAVES.",
    lineup: ["AIRWAVES"], ticketUrl: "#",
  },
  news: [
    { slug: "new-site-new-frequency", date: "AUG 21 / 2026", eyebrow: "BAND UPDATE", title: "NEW SITE. NEW FREQUENCY.", summary: "Airwaves is officially online. News, releases, live footage, and every set in one place.", body: ["We wanted one place that felt like the room right before the first chord: dark, tense, and ready to move.", "This is where we’ll share show announcements, new songs, behind-the-scenes footage, and whatever else survives rehearsal."], accent: "acid" },
    { slug: "next-show-announced", date: "SEPT 17 / 2026", eyebrow: "LIVE", title: "CENTRAL, WE'RE HERE FOR YOU.", summary: "The next Airwaves show lands at The Aftermath this September.", body: ["Hong Kong, clear the evening. We’re bringing a sharper set, two new songs, and absolutely no quiet parts."], accent: "hot" },
  ],
  media: [
    { slug: "live-at-aftermath", date: "SEPT 17 / 2026", eyebrow: "LIVE PHOTOGRAPHY", title: "LIVE AT THE AFTERMATH", summary: "WE CAME. WE SAW, WE DIDN'T CONQUER", body: ["Recorded live from the floor."], accent: "hot", link: "https://www.youtube.com/@Airwaves-HK" }
  ],
  releases: [
    { slug: "playground-song", date: "2026 / SINGLE", eyebrow: "LATEST RELEASE", title: "PLAYGROUND SONG", summary: "03:51 / Airwaves", body: ["I tried. This world is falling."], accent: "acid", tracks: ["PLAYGROUND SONG"], listenUrl: "https://www.youtube.com/watch?v=OeIPnGZFdkU&t=45s" },
    { slug: "good-mourning", date: "2026 / EP", eyebrow: "FIVE TRACK EP", title: "GOOD MOURNING", summary: "Five songs Are we Airwaves?.", body: ["WE ARE AIRWAVES."], accent: "hot", tracks: ["Playground Song, White Fangs, Nu Girl, We're Live on the Airwaves, Folks! Take Me Back (To October)"], listenUrl: "#" },
  ],
  members: [
    { slug: "brandon-chen", eyebrow: "DRUMMER", title: "BRANDON CHEN", summary: "Drummer for Airwaves.", body: ["Brandon Chen is the drummer for Airwaves."], accent: "hot" },
    { slug: "rahul-chakravarthi", eyebrow: "LEAD GUITARIST", title: "RAHUL CHAKRAVARTHI", summary: "Lead guitarist for Airwaves.", body: ["Rahul Chakravarthi is the lead guitarist for Airwaves."], accent: "acid" },
    { slug: "princeton-lee", eyebrow: "RHYTHM GUITAR AND SINGER", title: "PRINCETON LEE", summary: "Rhythm guitar and singer for Airwaves.", body: ["Princeton Lee plays rhythm guitar and sings for Airwaves."], accent: "paper" },
    { slug: "liam-wong", eyebrow: "BASSIST", title: "LIAM WONG", summary: "Bassist for Airwaves.", body: ["Liam Wong is the bassist for Airwaves."], accent: "hot" },
  ],
};
