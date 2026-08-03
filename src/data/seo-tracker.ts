export type SeoStatus = 'Published' | 'Planned' | 'Needs input';
export type SearchIntent = 'Hire' | 'Compare' | 'Solve' | 'Learn';

export interface SeoTarget {
  keyword: string;
  volume: number;
  intent: SearchIntent;
  audience: string;
  content: string;
  url?: string;
  type: string;
  status: SeoStatus;
  nextStep: string;
}

export const researchDate = 'August 3, 2026';
export const metricWindow = 'Last 28 days';

export const seoTargets: SeoTarget[] = [
  { keyword: 'landscaping company raleigh nc', volume: 320, intent: 'Hire', audience: 'Local homeowners comparing landscape companies', content: 'Raleigh landscaping homepage', url: '/', type: 'Commercial page', status: 'Published', nextStep: 'Measure qualified queries and inquiries' },
  { keyword: 'landscape design raleigh nc', volume: 170, intent: 'Hire', audience: 'Homeowners planning a redesign or renovation', content: 'Landscape design in Raleigh', url: '/landscape-design-raleigh/', type: 'Service page', status: 'Published', nextStep: 'Add a finished design project and testimonial' },
  { keyword: 'hardscaping raleigh nc', volume: 90, intent: 'Hire', audience: 'Homeowners comparing patio, wall and walkway contractors', content: 'Hardscaping in Raleigh', url: '/hardscaping-raleigh/', type: 'Service page', status: 'Published', nextStep: 'Add final photos from the current patio project' },
  { keyword: 'yard drainage solutions raleigh nc', volume: 10, intent: 'Solve', audience: 'Homeowners with standing water, runoff or erosion', content: 'Drainage and rain gardens', url: '/drainage-rain-gardens-raleigh/', type: 'Service page', status: 'Published', nextStep: 'Add a documented drainage transformation' },
  { keyword: 'native plants raleigh nc', volume: 30, intent: 'Learn', audience: 'Local gardeners and homeowners seeking plant expertise', content: 'Native garden design', url: '/native-garden-design-raleigh/', type: 'Service page', status: 'Published', nextStep: 'Add original plant palettes and project photography' },
  { keyword: 'what planting zone is raleigh nc', volume: 590, intent: 'Learn', audience: 'Raleigh homeowners and gardeners choosing plants', content: 'What planting zone is Raleigh, NC?', url: '/journal/what-planting-zone-is-raleigh-nc/', type: 'Homeowner guide', status: 'Published', nextStep: 'Route readers to native-garden and design services' },
  { keyword: 'low maintenance landscaping ideas', volume: 2400, intent: 'Learn', audience: 'Homeowners trying to reduce recurring yard work', content: 'Low-maintenance landscaping ideas for Raleigh', url: '/journal/low-maintenance-landscaping-ideas-raleigh/', type: 'Homeowner guide', status: 'Published', nextStep: 'Add real Raleigh before-and-after examples' },
  { keyword: 'retaining wall drainage', volume: 2900, intent: 'Solve', audience: 'Homeowners researching wall failures or a new wall', content: 'Retaining wall drainage in Raleigh', url: '/journal/retaining-wall-drainage-raleigh/', type: 'Technical guide', status: 'Published', nextStep: 'Support with a completed wall project story' },
  { keyword: 'how much does sod installation cost', volume: 590, intent: 'Compare', audience: 'Homeowners budgeting for a new lawn', content: 'Sod installation cost in Raleigh', url: '/journal/sod-installation-cost-raleigh/', type: 'Cost guide', status: 'Published', nextStep: 'Add local project quantities and annual price review' },
  { keyword: 'best plants for clay soil', volume: 260, intent: 'Learn', audience: 'Gardeners struggling with compacted or wet clay', content: 'Best plants for Raleigh clay soil', url: '/journal/best-plants-raleigh-clay-soil/', type: 'Plant guide', status: 'Published', nextStep: 'Add original soil and plant photographs' },
  { keyword: 'landscape designer vs landscape architect', volume: 260, intent: 'Compare', audience: 'Homeowners deciding which professional to hire', content: 'Landscape designer vs. landscape architect in NC', url: '/journal/landscape-designer-vs-landscape-architect/', type: 'Hiring guide', status: 'Published', nextStep: 'Maintain North Carolina licensing references' },
  { keyword: 'standing water in yard', volume: 320, intent: 'Solve', audience: 'Homeowners diagnosing persistent wet areas', content: 'How to fix standing water in a Raleigh yard', url: '/journal/fix-standing-water-raleigh-yard/', type: 'Problem guide', status: 'Published', nextStep: 'Add a real diagnostic and completed solution' },
  { keyword: 'patio drainage', volume: 1000, intent: 'Solve', audience: 'Homeowners planning or troubleshooting a patio', content: 'Patio drainage in Raleigh clay soil', url: '/journal/patio-drainage-raleigh/', type: 'Technical guide', status: 'Published', nextStep: 'Add a completed patio drainage example' },
  { keyword: 'landscape lighting ideas', volume: 2400, intent: 'Learn', audience: 'Homeowners planning evening use and curb appeal', content: 'Landscape lighting ideas and cost factors', url: '/journal/landscape-lighting-ideas-cost-raleigh/', type: 'Visual guide', status: 'Published', nextStep: 'Add original nighttime project photography' },
  { keyword: 'rain garden plants nc', volume: 50, intent: 'Learn', audience: 'Homeowners planning a rain garden', content: 'Rain-garden plants for NC sun, shade and clay', url: '/journal/rain-garden-plants-north-carolina/', type: 'Plant guide', status: 'Published', nextStep: 'Add a Garden & Art planting palette' },
  { keyword: 'raleigh rainwater rewards', volume: 40, intent: 'Compare', audience: 'Raleigh property owners considering stormwater funding', content: 'Raleigh Rainwater Rewards homeowner guide', url: '/journal/raleigh-rainwater-rewards/', type: 'Local program guide', status: 'Published', nextStep: 'Review City terms every six months' },
  { keyword: 'best time to plant trees in north carolina', volume: 50, intent: 'Learn', audience: 'NC homeowners timing a tree or shrub project', content: 'When to plant trees and shrubs in North Carolina', url: '/journal/when-to-plant-trees-shrubs-north-carolina/', type: 'Seasonal guide', status: 'Published', nextStep: 'Refresh before fall planting season' },
  { keyword: 'landscape lighting cost', volume: 140, intent: 'Compare', audience: 'Homeowners budgeting for outdoor lighting', content: 'Landscape lighting ideas and cost factors', url: '/journal/landscape-lighting-ideas-cost-raleigh/', type: 'Cost guide', status: 'Published', nextStep: 'Add defensible project ranges when available' },
  { keyword: 'cost of landscaping front yard', volume: 260, intent: 'Compare', audience: 'Homeowners setting a front-yard budget', content: 'Front-yard landscaping cost in Raleigh', type: 'Cost guide', status: 'Needs input', nextStep: 'Owner must provide defensible project ranges and inclusions' },
  { keyword: 'hardscape cost', volume: 140, intent: 'Compare', audience: 'Homeowners budgeting for patios, walks or walls', content: 'Hardscape cost in Raleigh', type: 'Cost guide', status: 'Needs input', nextStep: 'Owner must provide realistic ranges by project type' },
  { keyword: 'front yard landscaping ideas', volume: 40500, intent: 'Learn', audience: 'Broad homeowner audience seeking visual inspiration', content: 'Front-yard landscaping ideas for Raleigh homes', type: 'Visual roundup', status: 'Needs input', nextStep: 'Collect enough original finished-project photography' },
];
