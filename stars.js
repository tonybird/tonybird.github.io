// Draws the sky above the visitor right now, looking straight up, using d3-celestial.
// Location is estimated from the browser's time zone, so no permission prompt is needed.
function guessLocation() {
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (ZONES[zone]) return ZONES[zone];
  return [40, -new Date().getTimezoneOffset() / 4];
}

const faint = { stroke: "#ffffff", width: 0.6, opacity: 0.12 };
const off = { show: false };

Celestial.display({
  container: "sky",
  datapath: "https://cdn.jsdelivr.net/npm/d3-celestial@0.7.35/data/",
  width: Math.ceil(Math.hypot(innerWidth, innerHeight)),
  projection: "stereographic",
  geopos: guessLocation(),
  follow: "zenith",
  interactive: false,
  disableAnimations: true,
  form: false,
  controls: false,
  stars: {
    limit: 5.5,
    colors: false,
    style: { fill: "#ffffff", opacity: 0.85 },
    designation: false,
    propername: false,
    size: 3,
    exponent: -0.3,
  },
  dsos: off,
  mw: { show: true, style: { fill: "#ffffff", opacity: 0.012 } },
  constellations: { names: false, lines: false, lineStyle: faint, bounds: false },
  planets: {
    show: true,
    which: ["sol", "mer", "ven", "lun", "mar", "jup", "sat"],
    symbolType: "disk",
    names: false,
  },
  lines: {
    graticule: { show: false, lon: { pos: [], fill: "transparent" }, lat: { pos: [], fill: "transparent" } },
    equatorial: off,
    ecliptic: off,
    galactic: off,
    supergalactic: off,
  },
  background: { fill: "#050505", opacity: 1, stroke: "#050505", width: 0 },
  horizon: { show: true, stroke: "#050505", width: 0, fill: "#050505", opacity: 1 },
  daylight: off,
});

// The library's first draw can leave the Milky Way at a stale position;
// a resize resets its projection cache, so redraw that way after every draw.
Celestial.addCallback(() => Celestial.resize());

Celestial.skyview({ date: new Date(), timezone: -new Date().getTimezoneOffset() });
setInterval(() => Celestial.date(new Date()), 60000);
addEventListener("resize", () => Celestial.resize({ width: Math.ceil(Math.hypot(innerWidth, innerHeight)) }));
