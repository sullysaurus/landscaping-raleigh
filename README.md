# Garden & Art Landscapes - Website

Professional landscaping services website for Garden & Art Landscapes in Raleigh, NC. Built with Astro, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Modern Astro Framework**: Static site generation with component-based architecture
- **Mobile-First Design**: Responsive design optimized for all devices
- **SEO Optimized**: Comprehensive meta tags, structured data, and sitemap
- **Performance Focused**: Optimized images, prefetching, and minimal JavaScript
- **TypeScript**: Type-safe development with defined interfaces
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development

## 🚀 Project Structure

```text
/
├── public/
│   ├── img/                 # Images (portfolio, services, about)
│   ├── favicon.svg          # Custom favicon
│   └── *.png                # Additional favicon formats
├── src/
│   ├── components/          # Reusable Astro components
│   │   ├── Hero.astro
│   │   ├── Services.astro
│   │   ├── Portfolio.astro
│   │   ├── About.astro
│   │   ├── Contact.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── Layout.astro     # Main layout with SEO and schema
│   ├── pages/
│   │   ├── index.astro      # Homepage
│   │   └── robots.txt.ts    # SEO robots.txt
│   └── types/
│       └── index.ts         # TypeScript interfaces
├── astro.config.mjs         # Astro configuration
├── tailwind.config.js       # Tailwind configuration
└── tsconfig.json           # TypeScript configuration
```

## 🧞 Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Install dependencies                             |
| `npm run dev`             | Start dev server at `localhost:4321`            |
| `npm run build`           | Build production site to `./dist/`              |
| `npm run preview`         | Preview build locally                            |
| `npm run astro check`     | Run Astro diagnostics                            |

## 🎨 Components

### Hero.astro
Full-screen hero section with background image, company title, and call-to-action button.

### Services.astro
Grid of landscaping services with images, titles, and SEO-optimized descriptions for Raleigh area.

### Portfolio.astro
Responsive gallery showcasing landscape projects and custom art work.

### About.astro
Norman Rabins' biography, education, certifications, and career highlights.

### Contact.astro
Contact information, business hours, and Netlify contact form.

### Footer.astro
Company information and licensing details.

## 📱 Mobile Optimization

- Responsive typography scaling
- Optimized image sizes for different screen sizes
- Touch-friendly navigation and buttons
- Proper text wrapping and overflow handling

## 🔍 SEO Features

- **Structured Data**: LocalBusiness schema for Google Business listings
- **Open Graph**: Social media sharing optimization
- **Local SEO**: Location-specific keywords and content
- **Meta Tags**: Comprehensive title, description, and keyword tags
- **Sitemap**: Automatically generated XML sitemap

## 🏗️ Technical Details

- **Astro 5.x**: Latest version with static site generation
- **Tailwind CSS 4.x**: Latest utility-first CSS framework
- **TypeScript**: Full type safety with strict configuration
- **Sharp**: Optimized image processing
- **Netlify Forms**: Contact form handling

## 📞 Business Information

**Garden & Art Landscapes**
- Licensed Landscape Contractor #1901
- Serving: Raleigh, Durham, Chapel Hill, Cary, Holly Springs
- Phone: 919-235-2245
- Email: normanrabins@gmail.com

---

Built with ❤️ using Astro and modern web technologies.
