// Service interface for Services component
export interface Service {
  image: string;
  alt: string;
  title: string;
  description: string;
}

// Portfolio project interface
export interface PortfolioProject {
  src: string;
  alt: string;
}

// SEO Meta data interface for Layout
export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
}

// Contact form data interface
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// Schema.org LocalBusiness interface
export interface LocalBusinessSchema {
  '@context': string;
  '@type': string;
  name: string;
  image: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  address: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    '@type': string;
    latitude: string;
    longitude: string;
  };
  openingHoursSpecification: {
    '@type': string;
    dayOfWeek: string[];
    opens: string;
    closes: string;
  };
  serviceArea: {
    '@type': string;
    name: string;
  };
  areaServed: string[];
  priceRange: string;
  aggregateRating: {
    '@type': string;
    ratingValue: string;
    reviewCount: string;
  };
}