/* AIRWAVES SITE CONTENT — duplicate an item below to add a card. Images are optional. */
window.AIRWAVES_SITE = {
  /* Optional secure resolver, e.g. https://airwaves-api.example.workers.dev/youtube-duration.
     Leave blank to use the hosted YouTube iframe fallback. Never put a YouTube API key here. */
  youtubeDurationEndpoint: "",
  intro: "Songs for the last train home. Built loud, played louder, and timed down to the second.",
  about: "Airwaves is a band made for packed rooms, ringing ears, and the moment the whole crowd catches the same frequency.",
  email: "hello@airwaves.band",
  navigation: [
    { label: "AIRWAVES", path: "index.html", page: "home" }, { label: "News", path: "news.html", page: "news" },
    { label: "Media", path: "media.html", page: "media" }, { label: "Releases", path: "releases.html", page: "releases" },
    { label: "Next Show", path: "next-show.html", page: "next-show" }, { label: "Backstage Pass", path: "backstage.html", page: "backstage" }, { label: "About Us", path: "about.html", page: "about" },
    { label: "Contact", path: "contact.html", page: "contact" },
  ],
  nextShow: {
    date: "SEP 19 / 2026", venue: "THE WALL LIVE HOUSE", city: "TAIPEI, TAIWAN",
    doors: "DOORS 19:00 / AIRWAVES 21:10", note: "One room. Full volume. No wasted seconds.",
    lineup: ["AIRWAVES", "SPECIAL GUEST TBA"], ticketUrl: "#",
  },
  news: [
    { slug: "new-site-new-frequency", date: "AUG 21 / 2026", eyebrow: "BAND UPDATE", title: "NEW SITE. NEW FREQUENCY.", summary: "Airwaves is officially online. News, releases, live footage, and every set in one place.", body: ["We wanted one place that felt like the room right before the first chord: dark, tense, and ready to move.", "This is where we’ll share show announcements, new songs, behind-the-scenes footage, and whatever else survives rehearsal."], accent: "acid" },
    { slug: "next-show-announced", date: "AUG 16 / 2026", eyebrow: "LIVE", title: "TAIPEI — WE’RE COMING BACK.", summary: "The next Airwaves show lands at The Wall this September.", body: ["Taipei, clear the evening. We’re bringing a sharper set, two new songs, and absolutely no quiet parts."], accent: "hot" },
    { slug: "studio-signal", date: "JUL 30 / 2026", eyebrow: "FROM THE STUDIO", title: "THE RED LIGHT IS ON.", summary: "We’ve started tracking the next release. Here’s what we can tell you so far.", body: ["Drums are loud. Guitars are louder. The songs are starting to sound exactly as restless as we hoped."], accent: "paper" },
  ],
  media: [
    { slug: "live-at-revolver", date: "AUG 02 / 2026", eyebrow: "LIVE VIDEO", title: "LIVE AT REVOLVER", summary: "Nine songs, one overloaded room, and a camera that nearly survived.", body: ["Recorded live from the floor. No overdubs, no fixes, no distance between the band and the room."], accent: "hot", link: "https://youtube.com/" },
    { slug: "dead-frequency-session", date: "JUN 18 / 2026", eyebrow: "SESSION", title: "DEAD FREQUENCY / ROOM TAKE", summary: "A single-take version from the rehearsal room.", body: ["One camera, one take, all volume. This was the version that convinced us the song was finished."], accent: "acid", link: "https://youtube.com/" },
    { slug: "backstage-noise-01", date: "MAY 09 / 2026", eyebrow: "PHOTO SET", title: "BACKSTAGE NOISE / 01", summary: "Load-in, line check, five minutes to doors.", body: ["A few frames from the quietest part of a loud night."], accent: "paper" },
  ],
  releases: [
    { slug: "dead-frequency", date: "2026 / SINGLE", eyebrow: "LATEST RELEASE", title: "DEAD FREQUENCY", summary: "03:51 / Airwaves", body: ["Dead Frequency is about trying to reach someone who stopped listening a long time ago."], accent: "acid", tracks: ["Dead Frequency"], listenUrl: "#" },
    { slug: "neon-weather", date: "2025 / EP", eyebrow: "FIVE TRACK EP", title: "NEON WEATHER", summary: "Five songs for the last train home.", body: ["Written between late rehearsals and early trains. Neon Weather is the first complete Airwaves transmission."], accent: "hot", tracks: ["Neon Weather", "Say It Back", "Runaway Signal", "Low Battery", "Last One Out"], listenUrl: "#" },
    { slug: "first-signal", date: "2024 / DEMO", eyebrow: "ARCHIVE", title: "FIRST SIGNAL", summary: "The original three-song demo.", body: ["Three songs, two microphones, one very patient neighbor."], accent: "paper", tracks: ["Static Hearts", "After Midnight", "No Reply"] },
  ],
  members: [
    { slug: "brandon-chen", eyebrow: "DRUMMER", title: "BRANDON CHEN", summary: "Drummer for Airwaves.", body: ["Brandon Chen is the drummer for Airwaves."], accent: "hot" },
    { slug: "rahul-chakravarthi", eyebrow: "LEAD GUITARIST", title: "RAHUL CHAKRAVARTHI", summary: "Lead guitarist for Airwaves.", body: ["Rahul Chakravarthi is the lead guitarist for Airwaves."], accent: "acid" },
    { slug: "princeton-lee", eyebrow: "RHYTHM GUITAR AND SINGER", title: "PRINCETON LEE", summary: "Rhythm guitar and singer for Airwaves.", body: ["Princeton Lee plays rhythm guitar and sings for Airwaves."], accent: "paper" },
    { slug: "liam-wong", eyebrow: "BASSIST", title: "LIAM WONG", summary: "Bassist for Airwaves.", body: ["Liam Wong is the bassist for Airwaves."], accent: "hot" },
  ],
};
