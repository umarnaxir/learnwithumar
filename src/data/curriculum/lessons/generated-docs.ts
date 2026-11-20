import type { TrackId } from '@/types/curriculum';
import type { DevCategory, MarketingCategory } from './generated-types';

export interface OfficialDoc {
  title: string;
  url: string;
  description: string;
}

const DEV_DOCS: Record<DevCategory, OfficialDoc[]> = {
  foundations: [
    {
      title: 'MDN Web Docs: How the Web Works',
      url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works',
      description: 'Mozilla’s official overview of clients, servers, DNS, HTTP, and the request-response cycle.',
    },
    {
      title: 'web.dev: Learn Performance',
      url: 'https://web.dev/learn/performance',
      description: 'Google’s practical guidance on browser rendering, loading, and Core Web Vitals.',
    },
  ],
  html: [
    {
      title: 'MDN Web Docs: HTML Reference',
      url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
      description: 'Element-by-element reference, global attributes, forms, media, and accessibility guidance.',
    },
    {
      title: 'WHATWG HTML Living Standard',
      url: 'https://html.spec.whatwg.org/multipage/',
      description: 'The canonical specification for HTML parsing, semantics, and browser behavior.',
    },
    {
      title: 'W3C Web Accessibility Initiative',
      url: 'https://www.w3.org/WAI/standards-guidelines/',
      description: 'WCAG, WAI-ARIA, and accessible authoring practices maintained by the W3C.',
    },
  ],
  css: [
    {
      title: 'MDN Web Docs: CSS Reference',
      url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
      description: 'Official property reference for cascade, layout, responsive design, and animation.',
    },
    {
      title: 'web.dev: Learn CSS',
      url: 'https://web.dev/learn/css',
      description: 'Google’s structured course covering the box model, selectors, layout, and modern CSS.',
    },
  ],
  javascript: [
    {
      title: 'MDN Web Docs: JavaScript Guide',
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      description: 'Language reference, built-in objects, asynchronous programming, and DOM APIs.',
    },
    {
      title: 'ECMAScript Language Specification',
      url: 'https://tc39.es/ecma262/',
      description: 'The normative specification maintained by TC39 for every JavaScript feature.',
    },
  ],
  react: [
    {
      title: 'React Official Documentation',
      url: 'https://react.dev',
      description: 'Official guides for components, state, hooks, effects, forms, and React 19 APIs.',
    },
    {
      title: 'React API Reference',
      url: 'https://react.dev/reference/react',
      description: 'Authoritative API signatures, behavioral notes, and migration guidance.',
    },
  ],
  typescript: [
    {
      title: 'TypeScript Handbook',
      url: 'https://www.typescriptlang.org/docs/handbook/intro.html',
      description: 'Official language guide covering types, generics, narrowing, and project configuration.',
    },
    {
      title: 'TypeScript Compiler Reference',
      url: 'https://www.typescriptlang.org/tsconfig',
      description: 'Every compiler flag, including strictness, module resolution, and emit options.',
    },
  ],
  next: [
    {
      title: 'Next.js App Router Documentation',
      url: 'https://nextjs.org/docs/app',
      description: 'Official routing, rendering, caching, data fetching, and deployment documentation.',
    },
    {
      title: 'Next.js Learn Course',
      url: 'https://nextjs.org/learn',
      description: 'Hands-on official course for App Router, Server Components, and production patterns.',
    },
  ],
  node: [
    {
      title: 'Node.js Official Documentation',
      url: 'https://nodejs.org/docs/latest/api/',
      description: 'API reference for the runtime, file system, streams, events, workers, and HTTP.',
    },
    {
      title: 'Node.js Learn',
      url: 'https://nodejs.org/en/learn',
      description: 'Official introductions to the event loop, modules, diagnostics, and security.',
    },
  ],
  express: [
    {
      title: 'Express.js Official Guide',
      url: 'https://expressjs.com/en/guide/routing.html',
      description: 'Routing, middleware, request/response handling, and error management.',
    },
    {
      title: 'Express.js API Reference',
      url: 'https://expressjs.com/en/4x/api.html',
      description: 'Complete application, request, response, and router API documentation.',
    },
  ],
  nest: [
    {
      title: 'NestJS Official Documentation',
      url: 'https://docs.nestjs.com',
      description: 'Modules, controllers, providers, guards, interceptors, GraphQL, and testing.',
    },
    {
      title: 'NestJS Fundamentals Course',
      url: 'https://docs.nestjs.com/first-steps',
      description: 'Official first-steps guide for bootstrapping and structuring a Nest application.',
    },
  ],
  sql: [
    {
      title: 'PostgreSQL Official Documentation',
      url: 'https://www.postgresql.org/docs/current/',
      description: 'SQL syntax, data types, indexes, transactions, and PostgreSQL-specific features.',
    },
    {
      title: 'PostgreSQL Tutorial',
      url: 'https://www.postgresql.org/docs/current/tutorial.html',
      description: 'Official beginner-to-intermediate tutorial covering queries, joins, and aggregates.',
    },
  ],
  nosql: [
    {
      title: 'MongoDB Manual',
      url: 'https://www.mongodb.com/docs/manual/',
      description: 'Official CRUD, aggregation, indexing, schema design, and replication documentation.',
    },
    {
      title: 'MongoDB University',
      url: 'https://learn.mongodb.com',
      description: 'Free official courses and labs for data modeling and application development.',
    },
  ],
  orm: [
    {
      title: 'Prisma Documentation',
      url: 'https://www.prisma.io/docs',
      description: 'Schema modeling, migrations, client queries, relations, and deployment guidance.',
    },
    {
      title: 'Supabase Documentation',
      url: 'https://supabase.com/docs',
      description: 'Postgres, Row Level Security, authentication, realtime, and storage documentation.',
    },
  ],
  api: [
    {
      title: 'OpenAPI Specification',
      url: 'https://spec.openapis.org/oas/latest.html',
      description: 'The standard machine-readable contract format for REST APIs.',
    },
    {
      title: 'MDN Web Docs: HTTP',
      url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP',
      description: 'Methods, status codes, headers, caching, CORS, and content negotiation.',
    },
    {
      title: 'GraphQL Official Documentation',
      url: 'https://graphql.org/learn/',
      description: 'Schema design, queries, mutations, resolvers, and GraphQL execution semantics.',
    },
  ],
  security: [
    {
      title: 'OWASP Cheat Sheet Series',
      url: 'https://cheatsheetseries.owasp.org',
      description: 'Practical, peer-reviewed guidance for authentication, authorization, and input handling.',
    },
    {
      title: 'OWASP Top 10',
      url: 'https://owasp.org/www-project-top-ten/',
      description: 'The most critical web application security risks and mitigation strategies.',
    },
    {
      title: 'MDN Web Docs: Web Security',
      url: 'https://developer.mozilla.org/en-US/docs/Web/Security',
      description: 'Same-origin policy, CSP, CORS, cookies, and transport security references.',
    },
  ],
  git: [
    {
      title: 'Git Official Documentation',
      url: 'https://git-scm.com/doc',
      description: 'Reference manual, Pro Git book, and command documentation from the Git project.',
    },
    {
      title: 'GitHub Docs',
      url: 'https://docs.github.com',
      description: 'Pull requests, code review, Actions, repository security, and collaboration workflows.',
    },
  ],
  testing: [
    {
      title: 'Jest Documentation',
      url: 'https://jestjs.io/docs/getting-started',
      description: 'Official test runner configuration, matchers, mocks, and snapshot testing.',
    },
    {
      title: 'Playwright Documentation',
      url: 'https://playwright.dev/docs/intro',
      description: 'End-to-end browser testing, locators, assertions, tracing, and CI integration.',
    },
    {
      title: 'React Testing Library',
      url: 'https://testing-library.com/docs/react-testing-library/intro/',
      description: 'User-centered component testing patterns and accessibility-first queries.',
    },
  ],
  devops: [
    {
      title: 'Docker Documentation',
      url: 'https://docs.docker.com',
      description: 'Images, containers, Compose, networking, volumes, and production best practices.',
    },
    {
      title: 'GitHub Actions Documentation',
      url: 'https://docs.github.com/en/actions',
      description: 'Workflow syntax, runners, secrets, matrix builds, and deployment pipelines.',
    },
    {
      title: 'Vercel Documentation',
      url: 'https://vercel.com/docs',
      description: 'Deployments, preview environments, edge functions, caching, and observability.',
    },
  ],
  professional: [
    {
      title: 'Martin Fowler: Software Architecture Guide',
      url: 'https://martinfowler.com/architecture/',
      description: 'Foundational writing on architecture, modularity, refactoring, and system design.',
    },
    {
      title: 'web.dev: Accessibility',
      url: 'https://web.dev/learn/accessibility',
      description: 'Practical accessibility guidance covering semantics, focus, and assistive technology.',
    },
    {
      title: 'Google Engineering Practices',
      url: 'https://google.github.io/eng-practices/',
      description: 'Code review standards and change management practices used at Google.',
    },
  ],
};

const MARKETING_DOCS: Record<MarketingCategory, OfficialDoc[]> = {
  marketing: [
    {
      title: 'Think with Google',
      url: 'https://www.thinkwithgoogle.com/',
      description: 'Google’s research on consumer behavior, channel strategy, and marketing measurement.',
    },
    {
      title: 'Google Digital Garage',
      url: 'https://learndigital.withgoogle.com/digitalgarage',
      description: 'Free official courses covering digital marketing fundamentals and certification.',
    },
  ],
  seo: [
    {
      title: 'Google Search Central Documentation',
      url: 'https://developers.google.com/search/docs',
      description: 'Official crawling, indexing, ranking, structured data, and SEO guidance.',
    },
    {
      title: 'Google Search Essentials',
      url: 'https://developers.google.com/search/docs/essentials',
      description: 'The technical, spam, and key-best-practice requirements for appearing in Google Search.',
    },
    {
      title: 'Search Console Help',
      url: 'https://support.google.com/webmasters',
      description: 'Official help for indexing diagnostics, sitemaps, performance data, and security issues.',
    },
  ],
  social: [
    {
      title: 'Meta Business Help Center',
      url: 'https://www.facebook.com/business/help',
      description: 'Official guidance for Pages, Instagram professional accounts, ads, and audience tools.',
    },
    {
      title: 'LinkedIn Marketing Solutions Help',
      url: 'https://www.linkedin.com/help/lms',
      description: 'Official help for company pages, organic reach, and LinkedIn advertising.',
    },
    {
      title: 'YouTube Creator Academy',
      url: 'https://creatoracademy.youtube.com',
      description: 'Official lessons on audience growth, retention, Shorts, and channel strategy.',
    },
  ],
  content: [
    {
      title: 'Google Search Central: Helpful Content',
      url: 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content',
      description: 'Google’s guidance on people-first content, expertise, and quality evaluation.',
    },
    {
      title: 'Think with Google: Creative Strategy',
      url: 'https://www.thinkwithgoogle.com/marketing-strategies/',
      description: 'Research-backed creative, storytelling, and campaign planning resources.',
    },
  ],
  ads: [
    {
      title: 'Google Ads Help',
      url: 'https://support.google.com/google-ads',
      description: 'Official campaign setup, bidding, keyword, conversion tracking, and reporting help.',
    },
    {
      title: 'Meta Ads Manager Help',
      url: 'https://www.facebook.com/business/help/1643197601811404',
      description: 'Official campaign objectives, audiences, creative testing, and measurement guidance.',
    },
    {
      title: 'Google Ads Certification',
      url: 'https://skillshop.withgoogle.com',
      description: 'Free official training and certification for Search, Measurement, and PMax.',
    },
  ],
  conversion: [
    {
      title: 'Google Analytics 4 Help',
      url: 'https://support.google.com/analytics',
      description: 'Official event tracking, conversion setup, attribution, and reporting documentation.',
    },
    {
      title: 'web.dev: Learn Forms',
      url: 'https://web.dev/learn/forms',
      description: 'Accessible, high-converting form design and validation guidance from Google.',
    },
  ],
  email: [
    {
      title: 'Mailchimp Marketing Library',
      url: 'https://mailchimp.com/resources/',
      description: 'Practical guides for email strategy, automation, segmentation, and deliverability.',
    },
    {
      title: 'Google Postmaster Tools',
      url: 'https://postmaster.google.com',
      description: 'Official reputation, spam-rate, authentication, and deliverability diagnostics.',
    },
  ],
  analytics: [
    {
      title: 'Google Analytics 4 Documentation',
      url: 'https://developers.google.com/analytics/devguides/collection/ga4',
      description: 'Official event model, measurement protocol, dimensions, and reporting APIs.',
    },
    {
      title: 'Looker Studio Help',
      url: 'https://support.google.com/looker-studio',
      description: 'Official dashboard building, data connectors, calculated fields, and sharing.',
    },
  ],
  agency: [
    {
      title: 'HubSpot Agency Partner Resources',
      url: 'https://www.hubspot.com/agencies',
      description: 'Operational guidance for client acquisition, retainers, reporting, and retention.',
    },
    {
      title: 'Google Ads Agency Program',
      url: 'https://www.google.com/partners/',
      description: 'Official partner resources for agencies managing client advertising accounts.',
    },
  ],
};

export function buildOfficialDocs(
  trackId: TrackId,
  category: DevCategory | MarketingCategory,
  moduleId: string,
  topicId: string
): OfficialDoc[] {
  if (trackId === 'full-stack') {
    const docs = DEV_DOCS[category as DevCategory] || DEV_DOCS.foundations;
    return docs.slice(0, 3);
  }

  const normalizedModule = moduleId.toLowerCase();
  const normalizedTopic = topicId.toLowerCase();

  if (normalizedModule.includes('google-ads')) {
    return MARKETING_DOCS.ads;
  }

  if (normalizedModule.includes('meta-ads')) {
    return [MARKETING_DOCS.ads[1], MARKETING_DOCS.ads[0], MARKETING_DOCS.ads[2]];
  }

  if (normalizedModule.includes('other-ad')) {
    return [
      {
        title: 'LinkedIn Marketing Solutions Help',
        url: 'https://www.linkedin.com/help/lms',
        description: 'Official B2B targeting, Sponsored Content, and Lead Gen Form documentation.',
      },
      {
        title: 'TikTok Ads Manager Help',
        url: 'https://ads.tiktok.com/help/',
        description: 'Official campaign creation, creative, targeting, and measurement guidance.',
      },
      {
        title: 'Pinterest Business Help',
        url: 'https://help.pinterest.com/en/business',
        description: 'Official Promoted Pins, shopping, targeting, and analytics documentation.',
      },
    ];
  }

  if (normalizedModule.includes('local')) {
    return [
      {
        title: 'Google Business Profile Help',
        url: 'https://support.google.com/business',
        description: 'Official verification, categories, reviews, posts, and local ranking guidance.',
      },
      ...MARKETING_DOCS.seo.slice(0, 2),
    ];
  }

  if (
    normalizedModule.includes('technical-seo') ||
    normalizedTopic.includes('core-web-vitals') ||
    normalizedTopic.includes('mobile-first')
  ) {
    return [
      MARKETING_DOCS.seo[0],
      {
        title: 'web.dev: Core Web Vitals',
        url: 'https://web.dev/articles/vitals',
        description: 'Google’s official definitions and optimization guidance for LCP, INP, and CLS.',
      },
      MARKETING_DOCS.seo[2],
    ];
  }

  if (normalizedModule.includes('seo')) {
    return MARKETING_DOCS.seo;
  }

  if (normalizedModule.includes('social')) {
    return MARKETING_DOCS.social;
  }

  if (normalizedModule.includes('content')) {
    return MARKETING_DOCS.content;
  }

  if (
    normalizedModule.includes('email') ||
    normalizedModule.includes('automation')
  ) {
    return MARKETING_DOCS.email;
  }

  if (normalizedModule.includes('analytics')) {
    return MARKETING_DOCS.analytics;
  }

  if (
    normalizedModule.includes('conversion') ||
    normalizedModule.includes('lead-generation')
  ) {
    return MARKETING_DOCS.conversion;
  }

  if (normalizedModule.includes('freelancing')) {
    return MARKETING_DOCS.agency;
  }

  return MARKETING_DOCS[category as MarketingCategory] || MARKETING_DOCS.marketing;
}
