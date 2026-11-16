// Builds src/lessons/mapdata.js from public-domain map data:
//   us-atlas (US Census Bureau state boundaries) and world-atlas (Natural Earth).
// Paths are projected and simplified here, so the app only ships small SVG path strings.
import fs from 'node:fs'
import * as d3 from 'd3-geo'
import * as topo from 'topojson-client'
import { presimplify, simplify, quantile } from 'topojson-simplify'

const load = (p) => JSON.parse(fs.readFileSync(p, 'utf8'))
const keep = (t, q) => {
  const p = presimplify(t)
  return simplify(p, quantile(p, q))
}

const usT = keep(load('node_modules/us-atlas/states-10m.json'), 0.82)
const states = topo.feature(usT, usT.objects.states).features
const w50 = keep(load('node_modules/world-atlas/countries-50m.json'), 0.6)
const countries50 = topo.feature(w50, w50.objects.countries).features
const land50 = topo.merge(w50, w50.objects.countries.geometries)
const w110 = load('node_modules/world-atlas/countries-110m.json')
const countries110 = topo.feature(w110, w110.objects.countries).features
const land110 = topo.merge(w110, w110.objects.countries.geometries)

const r1 = (n) => Math.round(n * 10) / 10
const pt = (proj, lonlat) => proj(lonlat).map(r1)

// ---------- East Coast: the 13 colonies and Revolution sites ----------
const COLONIES = {
  33: ['NH', 'New Hampshire', 'ne'], 25: ['MA', 'Massachusetts', 'ne'], 44: ['RI', 'Rhode Island', 'ne'], '09': ['CT', 'Connecticut', 'ne'],
  36: ['NY', 'New York', 'mid'], 34: ['NJ', 'New Jersey', 'mid'], 42: ['PA', 'Pennsylvania', 'mid'], 10: ['DE', 'Delaware', 'mid'],
  24: ['MD', 'Maryland', 'south'], 51: ['VA', 'Virginia', 'south'], 37: ['NC', 'North Carolina', 'south'], 45: ['SC', 'South Carolina', 'south'], 13: ['GA', 'Georgia', 'south'],
}
// Then part of another colony: Maine (Massachusetts), West Virginia (Virginia)
const PART = { 23: 'ne', 54: 'south' }
// Small states get their label out in the ocean with a leader line: [dx, dy] from the centroid
const LABEL_OUT = { 44: [42, 16], '09': [36, 40], 10: [56, 8], 34: [58, 12], 24: [66, 40], 25: [62, -6], 33: [40, -40] }

const focus = { type: 'FeatureCollection', features: states.filter((f) => COLONIES[f.id] || PART[f.id]) }
const W = 600
let east = d3.geoConicConformal().parallels([33, 45]).rotate([77, 0]).fitWidth(W - 90, focus)
const [[bx0, by0], [bx1, by1]] = d3.geoPath(east).bounds(focus)
const EH = Math.ceil(by1 - by0 + 30)
east = east.translate([east.translate()[0] - bx0 + 15, east.translate()[1] - by0 + 15]).clipExtent([[0, 0], [W, EH]])
const ePath = d3.geoPath(east).digits(1)

const eastStates = states
  .map((f) => {
    const d = ePath(f)
    if (!d) return null
    const c = COLONIES[f.id]
    const [cx, cy] = ePath.centroid(f).map(r1)
    const out = LABEL_OUT[f.id]
    return {
      id: f.id,
      name: c ? c[1] : f.properties.name,
      abbr: c ? c[0] : null,
      colony: c ? c[2] : null,
      part: PART[f.id] || null,
      d,
      label: c ? (out ? [r1(cx + out[0]), r1(cy + out[1])] : [cx, cy]) : null,
      leader: c && out ? [cx, cy] : null,
    }
  })
  .filter(Boolean)
const canada = ePath(countries50.find((f) => f.id === '124'))
const eastPlaces = {
  lexington: pt(east, [-71.29, 42.45]),
  saratoga: pt(east, [-73.64, 43.0]),
  philadelphia: pt(east, [-75.16, 39.95]),
  valleyforge: pt(east, [-75.45, 40.1]),
  yorktown: pt(east, [-76.51, 37.24]),
  jamestown: pt(east, [-76.78, 37.21]),
  boston: pt(east, [-71.06, 42.36]),
}

// ---------- North America: culture regions (approximate) ----------
// Region outlines are rough lon/lat polygons, clipped to land in the app. Nations had no fixed borders.
const ring = (coords) => {
  const g = { type: 'Polygon', coordinates: [[...coords, coords[0]]] }
  if (d3.geoArea(g) > 2 * Math.PI) g.coordinates[0].reverse()
  return g
}
const REGIONS = [
  ['ne', ring([[-93, 37], [-93, 49], [-64, 48.5], [-66, 44.5], [-70, 41.3], [-76, 37]])],
  ['plains', ring([[-106, 50], [-97, 50], [-96, 31], [-100, 29], [-105, 31]])],
  ['sw', ring([[-115, 38], [-104.5, 38], [-104.5, 31.5], [-110, 29.5], [-115, 31.5]])],
  ['pnw', ring([[-125.5, 40], [-121, 40], [-120.5, 49], [-127, 55.5], [-135, 59.5], [-139, 59.5], [-136, 56], [-131, 51], [-126, 46]])],
]
const grid = (lon0, lon1, lat0, lat1) => {
  const pts = []
  for (let lon = lon0; lon <= lon1; lon += 2) for (let lat = lat0; lat <= lat1; lat += 2) pts.push([lon, lat])
  return { type: 'MultiPoint', coordinates: pts }
}
const naFocus = grid(-138, -62, 25, 62)
let na = d3.geoAzimuthalEqualArea().rotate([98, -44]).fitExtent([[0, 0], [W, 1000]], naFocus)
const [[nx0, ny0], [nx1, ny1]] = d3.geoPath(na).bounds(naFocus)
const NH = Math.ceil(ny1 - ny0)
na = na.translate([na.translate()[0] - nx0, na.translate()[1] - ny0]).clipExtent([[0, 0], [W, NH]])
const nPath = d3.geoPath(na).digits(1)
const naLand = nPath(land50)
const naBorders = nPath(topo.mesh(w50, w50.objects.countries, (a, b) => a !== b))
const naRegions = REGIONS.map(([id, g]) => ({ id, d: nPath(g), label: nPath.centroid(g).map(r1) }))
const mesaVerde = pt(na, [-108.49, 37.18])

// ---------- The Atlantic: Columbus, 1492 ----------
const atlFocus = grid(-100, 22, 5, 58)
let atl = d3.geoNaturalEarth1().rotate([40, 0]).fitExtent([[0, 0], [W, 1000]], atlFocus)
const [[ax0, ay0], [ax1, ay1]] = d3.geoPath(atl).bounds(atlFocus)
const AH = Math.ceil(ay1 - ay0)
atl = atl.translate([atl.translate()[0] - ax0, atl.translate()[1] - ay0]).clipExtent([[0, 0], [W, AH]])
const aPath = d3.geoPath(atl).digits(1)
const route = { type: 'LineString', coordinates: [[-6.95, 37.23], [-17.1, 28.1], [-74.5, 24.05]] }
const atlantic = {
  w: W,
  h: AH,
  land: aPath(land110),
  borders: aPath(topo.mesh(w110, w110.objects.countries, (a, b) => a !== b)),
  spain: aPath(countries110.find((f) => f.id === '724')),
  route: aPath(route),
  places: {
    palos: pt(atl, [-6.95, 37.23]),
    canaries: pt(atl, [-17.1, 28.1]),
    sansalvador: pt(atl, [-74.5, 24.05]),
    northAmerica: pt(atl, [-92, 44]),
    southAmerica: pt(atl, [-62, 6]),
    europe: pt(atl, [10, 50]),
    africa: pt(atl, [5, 17]),
    ocean: pt(atl, [-40, 33]),
  },
}

const out = `// GENERATED by mapbuild/build.mjs. Do not edit by hand.
// Map data: US Census Bureau state boundaries (via us-atlas) and Natural Earth (via world-atlas), both public domain.
// East Coast map shows TODAY's state borders.
export const EAST = ${JSON.stringify({ w: W, h: EH, states: eastStates, canada, places: eastPlaces })}
export const NORTH_AMERICA = ${JSON.stringify({ w: W, h: NH, land: naLand, borders: naBorders, regions: naRegions, mesaVerde })}
export const ATLANTIC = ${JSON.stringify(atlantic)}
`
fs.writeFileSync('/home/claude/app/src/lessons/mapdata.js', out)
console.log('sizes: east', EH, 'na', NH, 'atl', AH, '| file KB', Math.round(out.length / 1024))
console.log('east states drawn', eastStates.length, 'colonies', eastStates.filter((s) => s.colony).length)
