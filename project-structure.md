# FPICO Angular Project Structure

```
├── public
│   ├── fonts
│   │   └── Cairo
│   │       └── static
│   ├── i18n
│   ├── images
│   │   ├── about-us-page
│   │   ├── contactus
│   │   ├── contact_us_page
│   │   ├── details
│   │   ├── DownloadSection
│   │   ├── footer
│   │   ├── hero
│   │   ├── my-fav.ico
│   │   ├── not-found
│   │   ├── projects
│   │   │   └── page
│   │   ├── see_more
│   │   ├── services
│   │   │   └── page
│   │   ├── social_media_icons
│   │   └── svgs
│
├── src
│   ├── app
│   │   ├── app.component.*
│   │   ├── app.config.server.ts
│   │   ├── app.config.ts
│   │   ├── app.routes.server.ts
│   │   ├── app.routes.ts
│   │   │
│   │   ├── core
│   │   │   ├── components
│   │   │   │   ├── footer
│   │   │   │   │   ├── footer.component.html
│   │   │   │   │   └── footer.component.ts
│   │   │   │   ├── navbar
│   │   │   │   │   ├── mobile-menu.service.*
│   │   │   │   │   ├── navbar.component.*
│   │   │   │   │   ├── navbar-language
│   │   │   │   │   │   ├── navbar-language.component.html
│   │   │   │   │   │   ├── navbar-language.component.scss
│   │   │   │   │   │   └── navbar-language.component.ts
│   │   │   │   │   └── navbar-routing
│   │   │   │   │       ├── navbar-routing.component.html
│   │   │   │   │       └── navbar-routing.component.ts
│   │   │   │   └── not-found
│   │   │   │       ├── not-found.component.html
│   │   │   │       ├── not-found.component.scss
│   │   │   │       └── not-found.component.ts
│   │   │   │
│   │   │   ├── config
│   │   │   │   └── i18n
│   │   │   │       └── translate-loader.config.ts
│   │   │   │
│   │   │   ├── constants
│   │   │   │   └── WEB_SITE_BASE_URL.ts
│   │   │   │
│   │   │   ├── guards
│   │   │   │   └── only-arabic.guard.ts
│   │   │   │
│   │   │   ├── interceptors
│   │   │   │   ├── cache.interceptor.ts
│   │   │   │   ├── loading-data.interceptor.ts
│   │   │   │   └── retry.interceptor.ts
│   │   │   │
│   │   │   ├── interfaces
│   │   │   │   ├── IAboutData.ts
│   │   │   │   ├── IAllBlogs.ts
│   │   │   │   ├── IGetBlogById.ts
│   │   │   │   ├── IHomeData.ts
│   │   │   │   ├── ILinks.ts
│   │   │   │   ├── IPorjects.ts
│   │   │   │   ├── IProjectDetails.ts
│   │   │   │   ├── IProjectsData.ts
│   │   │   │   ├── IServicesData.ts
│   │   │   │   ├── IServicesDetails.ts
│   │   │   │   └── IServices.ts
│   │   │   │
│   │   │   ├── pipes
│   │   │   │   ├── insert-ad.pipe.ts
│   │   │   │   ├── remove-inline-styles.pipe.ts
│   │   │   │   └── safe-html.pipe.ts
│   │   │   │
│   │   │   ├── resolvers
│   │   │   │   ├── blogs
│   │   │   │   │   ├── blogs-all.resolver.ts
│   │   │   │   │   └── blogs-details.resolver.ts
│   │   │   │   └── home
│   │   │   │       └── home-content.resolver.ts
│   │   │   │
│   │   │   └── services
│   │   │       ├── about
│   │   │       │   └── about.service.ts
│   │   │       ├── about-us-content.service.ts
│   │   │       ├── blogs
│   │   │       │   └── blogs.service.ts
│   │   │       ├── contact-us
│   │   │       │   └── contact-us.service.ts
│   │   │       ├── core
│   │   │       │   └── flowbite.service.*
│   │   │       ├── details.service.ts
│   │   │       ├── home
│   │   │       │   └── home-data.service.ts
│   │   │       ├── our-services-content.service.ts
│   │   │       ├── projects-data.service.ts
│   │   │       ├── projects
│   │   │       │   └── projects-data.service.ts
│   │   │       ├── projects.service.ts
│   │   │       └── services
│   │   │           ├── language.service.ts
│   │   │           └── services-data.service.ts
│   │   │
│   │   ├── pages
│   │   │   └── blank-layout
│   │   │       ├── about-us
│   │   │       │   ├── about-us.component.*
│   │   │       │   ├── about-us-contact-form
│   │   │       │   │   └── about-us-contact-form.component.*
│   │   │       │   └── about-us-last-banner
│   │   │       │       └── about-us-last-banner.component.*
│   │   │       │
│   │   │       ├── blank-layout.component.*
│   │   │       │
│   │   │       ├── blogs
│   │   │       │   ├── blogs.component.*
│   │   │       │   ├── blogs-all
│   │   │       │   │   └── blogs-all.component.*
│   │   │       │   └── blogs-details
│   │   │       │       └── blogs-details.component.*
│   │   │       │
│   │   │       ├── contact-us
│   │   │       │   ├── contact-us.component.*
│   │   │       │   ├── contact-us-form
│   │   │       │   │   └── contact-us-form.component.*
│   │   │       │   └── contact-us-map
│   │   │       │       └── contact-us-map.component.*
│   │   │       │
│   │   │       ├── home
│   │   │       │   ├── a-hero-section
│   │   │       │   │   └── a-hero-section.component.*
│   │   │       │   ├── b-manager-message
│   │   │       │   │   └── b-manager-message.component.*
│   │   │       │   ├── c-about-us
│   │   │       │   │   └── c-about-us.component.*
│   │   │       │   ├── d-our-services
│   │   │       │   │   └── d-our-services.component.*
│   │   │       │   ├── e-about-us
│   │   │       │   │   └── e-about-us.component.*
│   │   │       │   ├── f-our-clients
│   │   │       │   │   └── f-our-clients.component.*
│   │   │       │   ├── g-our-projects
│   │   │       │   │   └── g-our-projects.component.*
│   │   │       │   ├── h-download-pdf-section
│   │   │       │   │   └── h-download-pdf-section.component.*
│   │   │       │   ├── home.component.*
│   │   │       │   ├── k-our-partners
│   │   │       │   │   └── k-our-partners.component.*
│   │   │       │   ├── l-our-work
│   │   │       │   │   └── l-our-work.component.*
│   │   │       │   └── m-contact-us
│   │   │       │       └── m-contact-us.component.*
│   │   │       │
│   │   │       ├── project-details
│   │   │       │   └── project-details.component.*
│   │   │       │
│   │   │       ├── projects
│   │   │       │   ├── about-banner-section
│   │   │       │   │   └── about-banner-section.component.*
│   │   │       │   └── projects.component.*
│   │   │       │
│   │   │       ├── services
│   │   │       │   └── services.component.*
│   │   │       │
│   │   │       └── services-details
│   │   │           └── services-details.component.*
│   │   │
│   │   └── shared
│   │       └── components
│   │           ├── pages-header
│   │           │   ├── pages-header.component.html
│   │           │   ├── pages-header.component.scss
│   │           │   └── pages-header.component.ts
│   │           └── social-media-links
│   │               ├── social-media-links.component.html
│   │               └── social-media-links.component.ts
│   │
│   ├── styles-css
│   │   ├── ball-beat.css
│   │   ├── ball-scale-multiple.css
│   │   ├── base.css
│   │   ├── buttons.css
│   │   ├── typography.css
│   │   ├── utilities.css
│   │   └── variables.css
│   │
│   ├── index.html
│   ├── main.server.ts
│   ├── main.ts
│   ├── server.ts
│   └── styles.css
│
├── .angular
├── .git
├── .vscode
├── dist
├── node_modules
```

## Project Structure Overview

### Main Directories

- **public/**: Static assets like images, fonts, and i18n files
- **src/**: Source code of the application
- **dist/**: Compiled output (not included in structure)
- **node_modules/**: External dependencies (not included in structure)

### Key Application Structure

- **app/**: Main application module
  - **core/**: Core functionality (services, interfaces, interceptors)
  - **pages/**: All application pages and components
  - **shared/**: Shared components across the application

### Feature Organization

- The application follows a feature-based organization
- Home page components are organized with alphabetical prefixes (a-hero-section, b-manager-message, etc.)
- Each major feature has its own directory with component files

### Special Directories

- **styles-css/**: Global CSS styles and variables
- **public/images/**: Image assets organized by feature/page
- **public/i18n/**: Internationalization files

### Components Structure

Components typically include:

- `.html` - Template files
- `.ts` - TypeScript component logic
- `.scss` or `.css` - Component-specific styles
