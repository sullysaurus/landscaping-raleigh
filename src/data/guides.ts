export interface Guide {
  href: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  dateLabel: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
}

export const guides: Guide[] = [
  {
    href: '/journal/paver-patio-installation-in-progress/',
    title: 'A paver patio taking shape: project in progress',
    excerpt: 'A field look at the base preparation, grade transitions, planting edge and careful paver setting behind a new outdoor room.',
    category: 'Project note',
    date: '2026-08-03',
    dateLabel: 'August 3, 2026',
    image: '/img/projects/paver-patio-in-progress/paver-setting.jpg',
    imageAlt: 'Landscape crew setting gray pavers on an in-progress residential patio',
    featured: true,
  },
  {
    href: '/journal/what-planting-zone-is-raleigh-nc/',
    title: 'What planting zone is Raleigh, NC?',
    excerpt: 'Raleigh is now USDA zone 8a. Here is what that number can—and cannot—tell you about choosing plants.',
    category: 'Plant selection',
    date: '2026-08-03',
    dateLabel: 'August 3, 2026',
    image: '/img/journal/raleigh-planting-zone.jpg',
    imageAlt: 'Layered woodland garden beneath mature Raleigh trees',
  },
  {
    href: '/journal/low-maintenance-landscaping-ideas-raleigh/',
    title: 'Low-maintenance landscaping ideas for Raleigh yards',
    excerpt: 'Seven design decisions that reduce recurring work without replacing a living garden with gravel and fabric.',
    category: 'Garden design',
    date: '2026-08-03',
    dateLabel: 'August 3, 2026',
    image: '/img/journal/low-maintenance-raleigh-yard.jpg',
    imageAlt: 'Low-maintenance Raleigh front yard with layered planting and a simple walk',
  },
  {
    href: '/journal/retaining-wall-drainage-raleigh/',
    title: 'Retaining wall drainage in Raleigh',
    excerpt: 'Why water pressure matters behind a wall, what a complete drainage concept includes and when the work needs a technical team.',
    category: 'Hardscaping',
    date: '2026-08-03',
    dateLabel: 'August 3, 2026',
    image: '/img/journal/retaining-wall-drainage.jpg',
    imageAlt: 'Drainage gravel and pipe behind a segmental retaining wall under construction',
  },
  {
    href: '/journal/sod-installation-cost-raleigh/',
    title: 'How much does sod installation cost in Raleigh?',
    excerpt: 'Current North Carolina sod material averages, the preparation variables behind an installed price and how to compare estimates.',
    category: 'New lawns',
    date: '2026-08-03',
    dateLabel: 'August 3, 2026',
    image: '/img/services/sod.jpg',
    imageAlt: 'Fresh green sod installed across a prepared Raleigh lawn',
  },
  {
    href: '/journal/best-plants-raleigh-clay-soil/',
    title: 'Best plants for Raleigh clay soil',
    excerpt: 'Start with drainage, compaction and light, then investigate adaptable native trees, shrubs, grasses and perennials.',
    category: 'Plant selection',
    date: '2026-08-03',
    dateLabel: 'August 3, 2026',
    image: '/img/journal/raleigh-clay-soil-plants.jpg',
    imageAlt: 'Adaptable native plants growing in a mulched Raleigh clay-soil bed',
  },
  {
    href: '/journal/landscape-designer-vs-landscape-architect/',
    title: 'Landscape designer vs. landscape architect in NC',
    excerpt: 'Understand the licensed roles, typical project fit and the questions that reveal which professional your project needs.',
    category: 'Hiring guide',
    date: '2026-08-03',
    dateLabel: 'August 3, 2026',
    image: '/img/journal/landscape-design-professionals.jpg',
    imageAlt: 'Planting sketch and technical landscape site plan on a worktable',
  },
  {
    href: '/journal/fix-standing-water-raleigh-yard/',
    title: 'How to fix standing water in a Raleigh yard',
    excerpt: 'Trace where the water comes from, identify why it cannot leave and match the cause to an appropriate response.',
    category: 'Drainage',
    date: '2026-08-03',
    dateLabel: 'August 3, 2026',
    image: '/img/portfolio/6.jpg',
    imageAlt: 'Natural stone water garden with a small waterfall',
  },
];
