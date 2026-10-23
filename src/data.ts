// ---------------------------------------------------------------------------
// Demo data. Everything here is fictional sample data for the proposal demo.
// Product names / SKUs / price points mirror the real Thunder Mounts catalogue
// so the client recognises their own business in the demo.
// ---------------------------------------------------------------------------

export type Product = {
  id: string
  sku: string
  name: string
  category: 'Track Mounts' | 'Opener Mounts' | 'Openers' | 'Garage Doors' | 'Storage' | 'Lighting'
  price: number
  msrp: number
  image: string
  maxLength?: number
  fits: string
  badge?: string
  stock: number
  installTime: string
  blurb: string
  includes: string[]
  rating: number
  reviews: number
}

const IMG = {
  hardware: './img/product-hardware.jpg',
  hero: './img/hero-garage.jpg',
  door: './img/door-panel.jpg',
  opener: './img/opener-unit.jpg',
  rack: './img/storage-rack.jpg',
  finished: './img/finished-garage.jpg',
}

export const products: Product[] = [
  {
    id: 'tmgts-12',
    sku: 'TMGTS-12',
    name: 'Thunder Mounts Track System — 12"',
    category: 'Track Mounts',
    price: 499.99,
    msrp: 715,
    image: IMG.hardware,
    maxLength: 12,
    fits: 'Low-ceiling garages · overhead door tracks',
    badge: 'Best seller',
    stock: 148,
    installTime: '35 min',
    blurb:
      'The shortest track mount in the range, built for low ceilings. Two channels, four cradles and vibration-isolated tubes hold both door tracks perfectly square.',
    includes: ['2 × channels', '4 × cradles', '4 × adjustable tubes', 'Vibration isolators', 'Stainless hardware', 'Finish rings'],
    rating: 4.9,
    reviews: 214,
  },
  {
    id: 'tmgtx-19',
    sku: 'TMGTX-19',
    name: 'Thunder Mounts Track System — 19"',
    category: 'Track Mounts',
    price: 499.99,
    msrp: 743,
    image: IMG.hardware,
    maxLength: 19,
    fits: 'Standard 7–8 ft ceilings · overhead door tracks',
    stock: 96,
    installTime: '40 min',
    blurb: 'The most-specified track mount. Covers the majority of residential installs with 7 inches of vertical adjustment.',
    includes: ['2 × channels', '4 × cradles', '4 × adjustable tubes', 'Vibration isolators', 'Stainless hardware', 'Finish rings'],
    rating: 4.9,
    reviews: 187,
  },
  {
    id: 'tmgtsl-24',
    sku: 'TMGTL-24',
    name: 'Thunder Mounts Track System — 24"',
    category: 'Track Mounts',
    price: 524.99,
    msrp: 743,
    image: IMG.hardware,
    maxLength: 24,
    fits: 'Vaulted / high ceilings · overhead door tracks',
    stock: 71,
    installTime: '45 min',
    blurb: 'For taller openings and exposed structure. Same engineered geometry, longer isolated tubes.',
    includes: ['2 × channels', '4 × cradles', '4 × adjustable tubes', 'Vibration isolators', 'Stainless hardware', 'Finish rings'],
    rating: 4.8,
    reviews: 92,
  },
  {
    id: 'tmgtsl-29',
    sku: 'TMGTL-29',
    name: 'Thunder Mounts Track System — 29"',
    category: 'Track Mounts',
    price: 599.99,
    msrp: 754,
    image: IMG.hero,
    maxLength: 29,
    fits: 'High ceilings · boxed channel finish option',
    badge: 'Trade favourite',
    stock: 54,
    installTime: '50 min',
    blurb: 'Our most complete track kit — includes the boxed channel covers that hide the mounting channels entirely.',
    includes: ['2 × channels', '2 × channel covers', '4 × cradles', '4 × adjustable tubes', 'Vibration isolators', 'Stainless hardware'],
    rating: 4.9,
    reviews: 61,
  },
  {
    id: 'tmgtl-34',
    sku: 'TMGTL-34',
    name: 'Thunder Mounts Track System — 34"',
    category: 'Track Mounts',
    price: 624.99,
    msrp: 765,
    image: IMG.hero,
    maxLength: 34,
    fits: 'Very high ceilings · commercial doors',
    stock: 38,
    installTime: '60 min',
    blurb: 'Maximum reach in the track range for shop and commercial builds with exposed high structure.',
    includes: ['2 × channels', '4 × cradles', '4 × adjustable tubes', 'Vibration isolators', 'Stainless hardware', 'Finish rings'],
    rating: 4.8,
    reviews: 33,
  },
  {
    id: 'tms-12',
    sku: 'TMS-12',
    name: 'Thunder Mounts Opener Mount — 12"',
    category: 'Opener Mounts',
    price: 395,
    msrp: 523,
    image: IMG.hardware,
    maxLength: 12,
    fits: 'A/C & D/C openers · LiftMaster, Chamberlain, Genie, Ryobi',
    badge: 'Fits-all',
    stock: 210,
    installTime: '25 min',
    blurb: 'The original multi-fit overhead opener mount. Replaces punched angle iron with a clean, adjustable, isolated mount.',
    includes: ['2 × channels', '4 × retainers', '4 × tubes', 'Vibration isolators', 'Stainless hardware'],
    rating: 4.9,
    reviews: 302,
  },
  {
    id: 'tmx-19',
    sku: 'TMX-19',
    name: 'Thunder Mounts Opener Mount — 19"',
    category: 'Opener Mounts',
    price: 395,
    msrp: 527,
    image: IMG.hardware,
    maxLength: 19,
    fits: 'Openers attaching at the motor flanges',
    stock: 174,
    installTime: '30 min',
    blurb: 'Attaches at the motor flanges for openers with wider mounting geometry. Opener not included.',
    includes: ['2 × channels', '4 × retainers', '4 × tubes', 'Vibration isolators', 'Stainless hardware'],
    rating: 4.8,
    reviews: 141,
  },
  {
    id: 'tml-29',
    sku: 'TML-29',
    name: 'Thunder Mounts Opener Mount — 29"',
    category: 'Opener Mounts',
    price: 420,
    msrp: 523,
    image: IMG.hero,
    maxLength: 29,
    fits: 'High ceiling opener drops · under-ceiling boxed finish',
    stock: 88,
    installTime: '35 min',
    blurb: 'Longer opener drop for tall ceilings, with the signature black powder-coated finish and chrome ring detail.',
    includes: ['2 × channels', '4 × retainers', '4 × tubes', 'Vibration isolators', 'Stainless hardware', 'Finish ring'],
    rating: 4.7,
    reviews: 74,
  },
  {
    id: 'genie-6170',
    sku: 'GENIE-6170',
    name: 'Genie 6170 Edge Mounted Opener',
    category: 'Openers',
    price: 725,
    msrp: 725,
    image: IMG.opener,
    fits: 'Wall / jackshaft mount · doors up to 850 lb',
    stock: 26,
    installTime: '90 min',
    blurb:
      'Wall-mounted jackshaft opener that clears the ceiling entirely — Aladdin Connect smart control and battery backup built in.',
    includes: ['Opener head', 'Wall bracket', 'Door lock', 'Remote + wall console', 'Battery backup'],
    rating: 4.7,
    reviews: 58,
  },
  {
    id: 'marantec-370',
    sku: 'MARANTEC-370',
    name: 'Marantec Synergy 370 Opener',
    category: 'Openers',
    price: 450,
    msrp: 450,
    image: IMG.opener,
    fits: 'DC overhead opener · pairs with TMCDC-26 base',
    stock: 19,
    installTime: '75 min',
    blurb: 'Quiet belt drive with integrated LED lighting. Pairs perfectly with the Thunder Mounts DC base plate.',
    includes: ['Opener head', 'Belt rail', '2 × remotes', 'Wall console', 'LED light module'],
    rating: 4.6,
    reviews: 41,
  },
  {
    id: 'wd-frameless',
    sku: 'WD-FRAMELESS',
    name: 'Wayne Dalton Frameless Garage Door',
    category: 'Garage Doors',
    price: 2200,
    msrp: 2200,
    image: IMG.door,
    fits: '8 × 7 ft · full-view glass option',
    stock: 6,
    installTime: '4–5 hrs',
    blurb: 'A full-view frameless door that shows off a clean garage. Quoted and scheduled as a project, not a parcel.',
    includes: ['Door sections', 'Torsion assembly', 'Tracks & rollers', 'Installation by certified crew'],
    rating: 4.8,
    reviews: 22,
  },
  {
    id: 'vevor-rack',
    sku: 'VEVOR-4X8',
    name: 'VEVOR Overhead Storage Rack 4×8',
    category: 'Storage',
    price: 198,
    msrp: 220,
    image: IMG.rack,
    fits: '600 lb capacity · 22–40" adjustable drop',
    badge: 'Add-on',
    stock: 64,
    installTime: '60 min',
    blurb: 'Turn dead ceiling space into 106 cu. ft. of storage. Bolts straight onto the Thunder Mounts channels.',
    includes: ['Rack frame', 'Wire decking', '4 × hooks', 'Mounting hardware'],
    rating: 4.5,
    reviews: 96,
  },
  {
    id: 'tm-led',
    sku: 'TM-LED-4',
    name: 'Thunder Mounts Linear LED Bar — 4 ft',
    category: 'Lighting',
    price: 129,
    msrp: 159,
    image: IMG.rack,
    fits: 'Clip-on to channels · 4000K · dimmable',
    stock: 132,
    installTime: '15 min',
    blurb: 'Clean light with no visible wiring. Clips to the underside of the Thunder Mounts channel for a finished look.',
    includes: ['LED bar', 'Channel clips', 'Driver', 'Connector cable'],
    rating: 4.8,
    reviews: 77,
  },
  {
    id: 'tm-ring',
    sku: 'TM-RING-01',
    name: 'Chrome Finish Ring (pair)',
    category: 'Track Mounts',
    price: 39,
    msrp: 49,
    image: IMG.hardware,
    fits: 'All Thunder Mounts channels',
    stock: 400,
    installTime: '2 min',
    blurb: 'The signature detail that finishes a Thunder Mounts installation. Machined, polished chrome pair.',
    includes: ['2 × polished rings', 'Fitting hardware'],
    rating: 5,
    reviews: 43,
  },
  {
    id: 'tm-powder',
    sku: 'TM-PC-SVC',
    name: 'Powder Coating Service (per part)',
    category: 'Track Mounts',
    price: 85,
    msrp: 85,
    image: IMG.hardware,
    fits: 'Door tracks & hardware · any RAL colour',
    stock: 999,
    installTime: '3–5 days',
    blurb: 'Send us your tracks and hardware — we return them coated to match the Thunder Mounts finish.',
    includes: ['Surface prep', 'Powder coat', 'Cure & QC', 'Return shipping'],
    rating: 4.9,
    reviews: 31,
  },
]

export const categories = ['All', 'Track Mounts', 'Opener Mounts', 'Openers', 'Garage Doors', 'Storage', 'Lighting'] as const

// ---------------------------------------------------------------------------
// Fitment finder — mirrors the "Let's measure" flow on the live site.
// ---------------------------------------------------------------------------
export const sizeSteps = [
  { max: 14, label: '12"', sku: 'TMGTS-12', product: 'tmgts-12' },
  { max: 21, label: '19"', sku: 'TMGTX-19', product: 'tmgtx-19' },
  { max: 26, label: '24"', sku: 'TMGTL-24', product: 'tmgtsl-24' },
  { max: 31, label: '29"', sku: 'TMGTL-29', product: 'tmgtsl-29' },
  { max: 40, label: '34"', sku: 'TMGTL-34', product: 'tmgtl-34' },
]

export function recommendSize(inches: number) {
  return sizeSteps.find((s) => inches <= s.max) ?? sizeSteps[sizeSteps.length - 1]
}

// ---------------------------------------------------------------------------
// Customer account
// ---------------------------------------------------------------------------
export const customer = {
  name: 'Marcus Hale',
  email: 'marcus.hale@gmail.com',
  phone: '(805) 555-0142',
  since: 'Mar 2024',
  tier: 'Homeowner · Garage Refresh',
  address: '1127 Sinaloa Rd, Simi Valley, CA 93065',
  garage: { doors: 2, ceiling: '9 ft 4 in', opener: 'LiftMaster 8500W', measured: '18 in' },
  points: 420,
  credit: 25,
}

export type OrderStatus = 'Processing' | 'Packed' | 'Shipped' | 'Delivered' | 'Scheduled'

export const customerOrders = [
  {
    id: 'TM-10428',
    date: 'Oct 18, 2026',
    status: 'Shipped' as OrderStatus,
    total: 1099.97,
    items: ['TMGTX-19 × 1', 'TMS-12 × 1', 'Chrome Finish Ring × 1'],
    tracking: '1Z999AA10123456784',
    eta: 'Oct 25',
    dealer: 'Summit Garage Doors',
  },
  {
    id: 'TM-10391',
    date: 'Sep 30, 2026',
    status: 'Delivered' as OrderStatus,
    total: 263.99,
    items: ['VEVOR Overhead Rack × 1', 'TM-LED-4 × 1'],
    tracking: '1Z999AA10111223344',
    eta: 'Delivered Oct 4',
    dealer: 'Direct',
  },
  {
    id: 'TM-10233',
    date: 'Jun 12, 2026',
    status: 'Scheduled' as OrderStatus,
    total: 725,
    items: ['Genie 6170 Edge Opener × 1'],
    tracking: 'Install job #J-2211',
    eta: 'Nov 2 · 9:00–11:00 AM',
    dealer: 'Summit Garage Doors',
  },
]

// ---------------------------------------------------------------------------
// Dealer network (admin view)
// ---------------------------------------------------------------------------
export type Dealer = {
  id: string
  name: string
  city: string
  state: string
  tier: 'Platinum' | 'Gold' | 'Silver' | 'Applied'
  status: 'Active' | 'Onboarding' | 'Pending review'
  ytd: number
  orders: number
  installs: number
  rep: string
  since: string
  conversion: number
}

export const dealers: Dealer[] = [
  { id: 'D-1001', name: 'Summit Garage Doors', city: 'Simi Valley', state: 'CA', tier: 'Platinum', status: 'Active', ytd: 182400, orders: 214, installs: 168, rep: 'G. Estravit', since: '2019', conversion: 38.2 },
  { id: 'D-1002', name: 'Coastline Overhead', city: 'Ventura', state: 'CA', tier: 'Gold', status: 'Active', ytd: 121850, orders: 143, installs: 121, rep: 'A. Ruiz', since: '2020', conversion: 31.5 },
  { id: 'D-1003', name: 'Sierra Door & Gate', city: 'Reno', state: 'NV', tier: 'Gold', status: 'Active', ytd: 98600, orders: 118, installs: 96, rep: 'A. Ruiz', since: '2021', conversion: 29.8 },
  { id: 'D-1004', name: 'Precision Garage Works', city: 'Austin', state: 'TX', tier: 'Silver', status: 'Active', ytd: 74120, orders: 92, installs: 71, rep: 'M. Chen', since: '2022', conversion: 24.1 },
  { id: 'D-1005', name: 'Lakeshore Door Co.', city: 'Chicago', state: 'IL', tier: 'Silver', status: 'Onboarding', ytd: 41200, orders: 54, installs: 39, rep: 'M. Chen', since: '2025', conversion: 21.6 },
  { id: 'D-1006', name: 'Desert King Doors', city: 'Phoenix', state: 'AZ', tier: 'Applied', status: 'Pending review', ytd: 0, orders: 0, installs: 0, rep: 'Unassigned', since: '—', conversion: 0 },
  { id: 'D-1007', name: 'Northgate Garage Systems', city: 'Portland', state: 'OR', tier: 'Gold', status: 'Active', ytd: 88730, orders: 101, installs: 88, rep: 'A. Ruiz', since: '2021', conversion: 33.4 },
  { id: 'D-1008', name: 'Bay Line Overhead', city: 'San Jose', state: 'CA', tier: 'Platinum', status: 'Active', ytd: 156900, orders: 187, installs: 152, rep: 'G. Estravit', since: '2018', conversion: 36.7 },
]

// ---------------------------------------------------------------------------
// Admin orders
// ---------------------------------------------------------------------------
export type AdminOrder = {
  id: string
  customer: string
  channel: 'Direct' | 'Dealer' | 'Marketplace'
  dealer?: string
  items: number
  total: number
  status: 'Paid' | 'Picking' | 'Shipped' | 'Delivered' | 'Refunded' | 'Quote'
  date: string
  state: string
}

export const adminOrders: AdminOrder[] = [
  { id: 'TM-10431', customer: 'Dana Whitfield', channel: 'Direct', items: 2, total: 1049.98, status: 'Paid', date: 'Oct 23', state: 'CA' },
  { id: 'TM-10430', customer: 'Summit Garage Doors', channel: 'Dealer', dealer: 'Summit Garage Doors', items: 18, total: 7420.0, status: 'Picking', date: 'Oct 23', state: 'CA' },
  { id: 'TM-10429', customer: 'Robert Nakamura', channel: 'Marketplace', items: 1, total: 395.0, status: 'Shipped', date: 'Oct 22', state: 'NV' },
  { id: 'TM-10428', customer: 'Marcus Hale', channel: 'Direct', items: 3, total: 1099.97, status: 'Shipped', date: 'Oct 18', state: 'CA' },
  { id: 'TM-10427', customer: 'Bay Line Overhead', channel: 'Dealer', dealer: 'Bay Line Overhead', items: 24, total: 9860.0, status: 'Delivered', date: 'Oct 18', state: 'CA' },
  { id: 'TM-10426', customer: 'Elena Vasquez', channel: 'Direct', items: 1, total: 624.99, status: 'Delivered', date: 'Oct 17', state: 'TX' },
  { id: 'TM-10425', customer: 'Precision Garage Works', channel: 'Dealer', dealer: 'Precision Garage Works', items: 9, total: 3980.0, status: 'Paid', date: 'Oct 17', state: 'TX' },
  { id: 'TM-10424', customer: 'Tom Braddock', channel: 'Direct', items: 2, total: 263.99, status: 'Refunded', date: 'Oct 16', state: 'AZ' },
  { id: 'TM-10423', customer: 'Hannah Cole', channel: 'Direct', items: 4, total: 1780.0, status: 'Delivered', date: 'Oct 16', state: 'OR' },
  { id: 'TM-10422', customer: 'Coastline Overhead', channel: 'Dealer', dealer: 'Coastline Overhead', items: 12, total: 5240.0, status: 'Picking', date: 'Oct 15', state: 'CA' },
]

// ---------------------------------------------------------------------------
// Dealer portal sample data
// ---------------------------------------------------------------------------
export const dealerAccount = {
  name: 'Summit Garage Doors',
  dealerId: 'D-1001',
  tier: 'Platinum',
  rep: 'Gustavo Estravit',
  discount: 32,
  terms: 'Net 30',
  creditLimit: 25000,
  creditUsed: 8420,
  ytd: 182400,
  goal: 240000,
  openQuotes: 6,
  pendingInstalls: 11,
  reorderRate: 68,
  address: '1490 E Los Angeles Ave, Simi Valley, CA 93065',
}

export const dealerOrders = [
  { id: 'SO-8841', po: 'PO-2291', date: 'Oct 23', items: 18, total: 7420, status: 'Picking', invoice: 'Net 30' },
  { id: 'SO-8838', po: 'PO-2287', date: 'Oct 21', items: 12, total: 5240, status: 'Shipped', invoice: 'Net 30' },
  { id: 'SO-8830', po: 'PO-2280', date: 'Oct 16', items: 6, total: 3110, status: 'Delivered', invoice: 'Paid' },
  { id: 'SO-8822', po: 'PO-2272', date: 'Oct 9', items: 24, total: 9860, status: 'Delivered', invoice: 'Paid' },
  { id: 'SO-8814', po: 'PO-2264', date: 'Oct 2', items: 9, total: 3980, status: 'Delivered', invoice: 'Paid' },
]

export type Quote = {
  id: string
  customer: string
  address: string
  value: number
  stage: 'New lead' | 'Site survey' | 'Quote sent' | 'Won' | 'Lost'
  owner: string
  updated: string
  source: 'Store locator' | 'Dealer site' | 'Phone' | 'Referral'
}

export const dealerQuotes: Quote[] = [
  { id: 'Q-3301', customer: 'J. Whitmore', address: 'Camarillo, CA', value: 4820, stage: 'Quote sent', owner: 'R. Diaz', updated: '2h ago', source: 'Store locator' },
  { id: 'Q-3299', customer: 'The Brennans', address: 'Thousand Oaks, CA', value: 7150, stage: 'Site survey', owner: 'R. Diaz', updated: '5h ago', source: 'Dealer site' },
  { id: 'Q-3296', customer: 'K. Osei', address: 'Moorpark, CA', value: 2190, stage: 'New lead', owner: 'Unassigned', updated: '1d ago', source: 'Store locator' },
  { id: 'Q-3290', customer: 'Vista Property Group', address: 'Oxnard, CA', value: 18600, stage: 'Quote sent', owner: 'T. Boone', updated: '2d ago', source: 'Referral' },
  { id: 'Q-3284', customer: 'M. Alvarez', address: 'Simi Valley, CA', value: 1290, stage: 'Won', owner: 'R. Diaz', updated: '3d ago', source: 'Phone' },
  { id: 'Q-3271', customer: 'S. Lindqvist', address: 'Newbury Park, CA', value: 3400, stage: 'Lost', owner: 'T. Boone', updated: '6d ago', source: 'Dealer site' },
]

export const dealerInventory = [
  { sku: 'TMGTX-19', name: 'Track System 19"', onHand: 14, committed: 6, reorderAt: 8, lead: '3 days', status: 'Healthy' },
  { sku: 'TMGTS-12', name: 'Track System 12"', onHand: 5, committed: 5, reorderAt: 6, lead: '3 days', status: 'Low' },
  { sku: 'TMS-12', name: 'Opener Mount 12"', onHand: 22, committed: 4, reorderAt: 10, lead: '3 days', status: 'Healthy' },
  { sku: 'TMGTL-29', name: 'Track System 29"', onHand: 2, committed: 2, reorderAt: 4, lead: '5 days', status: 'Reorder' },
  { sku: 'GENIE-6170', name: 'Genie Edge Opener', onHand: 4, committed: 3, reorderAt: 3, lead: '7 days', status: 'Low' },
  { sku: 'TM-RING-01', name: 'Chrome Finish Ring', onHand: 60, committed: 12, reorderAt: 20, lead: '3 days', status: 'Healthy' },
]

export const installs = [
  { id: 'J-2211', customer: 'Marcus Hale', address: '1127 Sinaloa Rd, Simi Valley', date: 'Nov 2', window: '9:00–11:00 AM', tech: 'R. Diaz', status: 'Scheduled', value: 725 },
  { id: 'J-2208', customer: 'Dana Whitfield', address: '88 Katherine Rd, Simi Valley', date: 'Oct 24', window: '8:00–10:00 AM', tech: 'T. Boone', status: 'In progress', value: 1049 },
  { id: 'J-2206', customer: 'P. Okafor', address: '412 Erbes Rd, Thousand Oaks', date: 'Oct 24', window: '1:00–3:00 PM', tech: 'R. Diaz', status: 'Scheduled', value: 2340 },
  { id: 'J-2205', customer: 'L. Brennan', address: '19 Las Flores, Camarillo', date: 'Oct 23', window: '10:00–12:00 PM', tech: 'T. Boone', status: 'Complete', value: 7150 },
  { id: 'J-2202', customer: 'Vista Property Group', address: '550 Oxnard Blvd', date: 'Oct 22', window: '7:00–11:00 AM', tech: 'Crew B', status: 'Complete', value: 18600 },
]

// ---------------------------------------------------------------------------
// Admin: dealers applications, leads, tickets, installers
// ---------------------------------------------------------------------------
export const applications = [
  { id: 'AP-118', name: 'Desert King Doors', city: 'Phoenix, AZ', owner: 'D. Marsh', submitted: '2d ago', docs: '4/5', status: 'Docs pending' },
  { id: 'AP-117', name: 'Front Range Overhead', city: 'Denver, CO', owner: 'D. Marsh', submitted: '4d ago', docs: '5/5', status: 'Ready to approve' },
  { id: 'AP-116', name: 'Gulf Coast Doorworks', city: 'Tampa, FL', owner: 'M. Chen', submitted: '6d ago', docs: '3/5', status: 'In review' },
]

export const tickets = [
  { id: 'T-552', subject: 'Tracking shows delivered, box missing', customer: 'Tom Braddock', priority: 'High', channel: 'Email', age: '3h', status: 'Open' },
  { id: 'T-551', subject: 'Wrong tube length for 9ft ceiling', customer: 'Elena Vasquez', priority: 'Medium', channel: 'Chat', age: '6h', status: 'Open' },
  { id: 'T-548', subject: 'Dealer invoice address change', customer: 'Lakeshore Door Co.', priority: 'Low', channel: 'Portal', age: '1d', status: 'Waiting' },
  { id: 'T-545', subject: 'Install reschedule request', customer: 'Marcus Hale', priority: 'Medium', channel: 'App', age: '1d', status: 'Waiting' },
]

export const team = [
  { name: 'Gustavo Estravit', role: 'Founder / Owner', access: 'Full access', email: 'gustavo@thundermounts.com' },
  { name: 'Marisol Chen', role: 'Ops manager', access: 'Orders, inventory, dealers', email: 'marisol@thundermounts.com' },
  { name: 'Dylan Marsh', role: 'Dealer success', access: 'Dealers, quotes', email: 'dylan@thundermounts.com' },
  { name: 'Rosa Diaz', role: 'Lead installer', access: 'Installer app only', email: 'rosa@thundermounts.com' },
]

// ---------------------------------------------------------------------------
// Analytics
// ---------------------------------------------------------------------------
export const revenueSeries = [
  { m: 'Nov', store: 41800, dealer: 62200, marketplace: 9800 },
  { m: 'Dec', store: 52400, dealer: 74800, marketplace: 12100 },
  { m: 'Jan', store: 38600, dealer: 58100, marketplace: 8600 },
  { m: 'Feb', store: 44100, dealer: 64300, marketplace: 10200 },
  { m: 'Mar', store: 51200, dealer: 71600, marketplace: 11800 },
  { m: 'Apr', store: 49800, dealer: 76400, marketplace: 12400 },
  { m: 'May', store: 57300, dealer: 84200, marketplace: 13600 },
  { m: 'Jun', store: 61900, dealer: 91800, marketplace: 14900 },
  { m: 'Jul', store: 66400, dealer: 97200, marketplace: 15600 },
  { m: 'Aug', store: 63100, dealer: 92400, marketplace: 14200 },
  { m: 'Sep', store: 71800, dealer: 106300, marketplace: 16900 },
  { m: 'Oct', store: 48600, dealer: 71200, marketplace: 11400 },
]

export const channelMix = [
  { name: 'Dealer network', value: 58, color: '#FFC300' },
  { name: 'Direct store', value: 30, color: '#6E6E7A' },
  { name: 'Marketplace', value: 12, color: '#33333C' },
]

export const topSkus = [
  { sku: 'TMGTX-19', units: 412, revenue: 205996 },
  { sku: 'TMS-12', units: 388, revenue: 153260 },
  { sku: 'TMGTL-24', units: 241, revenue: 126523 },
  { sku: 'TMGTS-12', units: 198, revenue: 98998 },
  { sku: 'TMGTL-29', units: 132, revenue: 79199 },
]

export const regionSplit = [
  { region: 'California', value: 46 },
  { region: 'Texas', value: 14 },
  { region: 'Nevada', value: 11 },
  { region: 'Illinois', value: 9 },
  { region: 'Arizona', value: 8 },
  { region: 'Other', value: 12 },
]

export const funnel = [
  { step: 'Sessions', value: 24800 },
  { step: 'Fitment tool', value: 6100 },
  { step: 'Add to cart', value: 2340 },
  { step: 'Checkout', value: 1480 },
  { step: 'Paid', value: 1226 },
]

// ---------------------------------------------------------------------------
// "Today vs. proposed" — the heart of the pitch
// ---------------------------------------------------------------------------
export const gaps = [
  {
    area: 'Storefront',
    today: 'Wix template with mixed legacy pages, $0.00 placeholders, 404s on /shop, and product copy that repeats across SKUs.',
    tomorrow: 'One catalogue, one design system, every SKU with fitment data, real stock, reviews and a measure-to-mount configurator.',
    impact: '+34% add-to-cart in test',
  },
  {
    area: 'Dealer network',
    today: 'No dealer login. Dealers email or call in orders; pricing, terms and availability are handled by hand.',
    tomorrow: 'Dealer portal with tiered pricing, live stock, credit terms, quotes, reorders, co-branded catalogues and lead routing.',
    impact: '~9 hrs/wk saved',
  },
  {
    area: 'Customer accounts',
    today: 'Guest checkout only. No order history, no install scheduling, no garage profile anywhere on the site.',
    tomorrow: 'Customer dashboard with orders, tracking, garage profile, fitment history, reorder and self-serve install booking.',
    impact: '-41% support tickets',
  },
  {
    area: 'Operations',
    today: 'Orders, inventory and installs live in spreadsheets and inboxes. No single view of what shipped or sold.',
    tomorrow: 'Admin console: orders, inventory, installs, dealer approvals, refunds, roles and an audit trail in one place.',
    impact: 'Real-time stock',
  },
  {
    area: 'Installer field work',
    today: 'Paper work orders, photos texted to a phone, no job status the office can see.',
    tomorrow: 'Installer app: today’s route, job checklist, before/after capture, customer signature and instant job close-out.',
    impact: '2× jobs/day visibility',
  },
  {
    area: 'Reporting',
    today: 'Wix dashboards only. No dealer vs. direct split, no product margin, no fitment conversion data.',
    tomorrow: 'Owner dashboard: revenue by channel, dealer leaderboard, SKU performance, funnel from fitment tool to paid order.',
    impact: 'Decisions in minutes',
  },
]

export const phases = [
  {
    n: '01',
    weeks: 'Weeks 1–3',
    title: 'Foundation & storefront',
    items: ['Design system + brand refresh', 'Product catalogue & fitment schema', 'Storefront, PDP, measure-to-mount tool', 'Cart, checkout, shipping rules', 'Migrate 19 products + content'],
  },
  {
    n: '02',
    weeks: 'Weeks 4–6',
    title: 'Accounts & commerce',
    items: ['Customer accounts & garage profiles', 'Order history, tracking, reorders', 'Payments, tax, returns', 'Email/SMS lifecycle', 'SEO & analytics baseline'],
  },
  {
    n: '03',
    weeks: 'Weeks 7–9',
    title: 'Dealer portal',
    items: ['Dealer application & approval flow', 'Tiered pricing, Net 30 credit', 'Quotes, POs, bulk ordering', 'Co-branded catalogues', 'Lead routing by ZIP'],
  },
  {
    n: '04',
    weeks: 'Weeks 10–12',
    title: 'Operations & field',
    items: ['Admin console & roles', 'Inventory sync', 'Install scheduling & dispatch', 'Installer mobile app', 'Owner analytics dashboard'],
  },
  {
    n: '05',
    weeks: 'Weeks 13–14',
    title: 'Launch & handover',
    items: ['QA, accessibility, performance', 'Data migration & redirects', 'Training + recorded SOPs', 'Go-live & hypercare', '30-day optimisation'],
  },
]

export const integrations = [
  { name: 'Stripe', role: 'Payments, ACH for dealers', group: 'Money' },
  { name: 'QuickBooks', role: 'Invoices, terms, reconciliation', group: 'Money' },
  { name: 'ShipStation / UPS', role: 'Labels, tracking, rates', group: 'Logistics' },
  { name: 'Twilio', role: 'SMS updates & reminders', group: 'Comms' },
  { name: 'Klaviyo', role: 'Lifecycle email flows', group: 'Comms' },
  { name: 'Google / GA4', role: 'Analytics & ads attribution', group: 'Growth' },
  { name: 'Google Business', role: 'Store locator + reviews', group: 'Growth' },
  { name: 'HubSpot', role: 'Dealer & lead CRM', group: 'Sales' },
  { name: 'Xero/QBO line items', role: 'Inventory & COGS', group: 'Money' },
  { name: 'Cloudflare', role: 'CDN, WAF, uptime', group: 'Platform' },
]

export const kpisForPitch = [
  { label: 'Weeks to launch', value: '14' },
  { label: 'Surfaces delivered', value: '6' },
  { label: 'Manual hours saved / wk', value: '~9' },
  { label: 'Product SKUs migrated', value: '19' },
]

export const statusColor: Record<string, string> = {
  Processing: 'bg-white/10 text-white/70',
  Packed: 'bg-sky-500/15 text-sky-300',
  Picking: 'bg-sky-500/15 text-sky-300',
  Shipped: 'bg-indigo-500/15 text-indigo-300',
  Paid: 'bg-emerald-500/15 text-emerald-300',
  Delivered: 'bg-emerald-500/15 text-emerald-300',
  Complete: 'bg-emerald-500/15 text-emerald-300',
  Available: 'bg-emerald-500/15 text-emerald-300',
  Healthy: 'bg-emerald-500/15 text-emerald-300',
  Won: 'bg-emerald-500/15 text-emerald-300',
  Active: 'bg-emerald-500/15 text-emerald-300',
  'In progress': 'bg-bolt/15 text-bolt',
  Scheduled: 'bg-bolt/15 text-bolt',
  'Ready to approve': 'bg-bolt/15 text-bolt',
  Low: 'bg-amber-500/15 text-amber-300',
  Waiting: 'bg-amber-500/15 text-amber-300',
  'Docs pending': 'bg-amber-500/15 text-amber-300',
  'In review': 'bg-sky-500/15 text-sky-300',
  Onboarding: 'bg-sky-500/15 text-sky-300',
  'Pending review': 'bg-amber-500/15 text-amber-300',
  Open: 'bg-sky-500/15 text-sky-300',
  Refunded: 'bg-rose-500/15 text-rose-300',
  Reorder: 'bg-rose-500/15 text-rose-300',
  Lost: 'bg-rose-500/15 text-rose-300',
  'New lead': 'bg-white/10 text-white/70',
  'Site survey': 'bg-sky-500/15 text-sky-300',
  'Quote sent': 'bg-indigo-500/15 text-indigo-300',
  Medium: 'bg-amber-500/15 text-amber-300',
  High: 'bg-rose-500/15 text-rose-300',
  Quote: 'bg-white/10 text-white/70',
  Gold: 'bg-bolt/15 text-bolt',
  Platinum: 'bg-bolt/20 text-bolt',
  Silver: 'bg-white/10 text-white/70',
  Applied: 'bg-white/10 text-white/60',
}

export const money = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: n % 1 === 0 ? 0 : 2 })
