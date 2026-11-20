import { LessonContent, TrackId } from '@/types/curriculum';
import { FULL_STACK_MODULES, type ModuleWithTopics } from '../full-stack-curriculum';
import { DIGITAL_MARKETING_MODULES } from '../digital-marketing-curriculum';
import { HTML_DETAILED_LESSONS } from './html-lessons';
import { HTML_EXTENDED_LESSONS } from './html-lessons-extended';
import { generateLessonContent } from './generated-lessons';

export const DETAILED_LESSONS: Record<string, LessonContent> = {
  ...HTML_DETAILED_LESSONS,
  ...HTML_EXTENDED_LESSONS,
  // FULL STACK: Client-Server Architecture
  'full-stack_intro-web-dev_client-server-architecture': {
    id: 'client-server-architecture',
    moduleId: 'intro-web-dev',
    trackId: 'full-stack',
    title: 'Client and Server Architecture',
    slug: 'client-server-architecture',
    order: 3,
    duration: '50m',
    difficulty: 'Beginner',
    summary: 'Explore the fundamental architectural paradigm powering the global World Wide Web: how client runtimes initiate requests, how web servers process business logic, and how stateless network protocols synchronize data across distributed machines.',
    definition: 'Client-server architecture is a distributed computing model that separates the application into two cooperating roles: a client that requests services or data, and a server that hosts, validates, and fulfills those requests. The browser, mobile app, or API consumer acts as the client; the web server, application server, and database tier together act as the server.',
    explanation: 'The client owns presentation and user interaction, while the server owns shared state, business rules, and persistent data. They communicate through explicit protocols such as HTTP(S), WebSockets, or gRPC. Because the network boundary is untrusted, the server must authenticate every request, validate all input, and enforce authorization rather than relying on client-side checks. Modern systems refine this model with reverse proxies, CDNs, API gateways, background workers, and managed databases, but the core request-response contract remains the same.',
    whyItIsUsed: [
      'Separates user-interface code from sensitive business logic and database credentials so secrets never reach the browser.',
      'Allows one authoritative data source to serve many clients: web browsers, native mobile apps, partner APIs, and internal tools.',
      'Enables independent scaling of presentation, application, and database tiers behind load balancers and CDNs.',
      'Provides a stable API boundary so teams can deploy frontend and backend changes independently.',
    ],
    realWorldUseCases: [
      'A React storefront calling a Node.js API that validates inventory and creates a Stripe checkout session.',
      'A mobile banking app authenticating with short-lived tokens before querying the bank’s ledger service.',
      'A documentation site served from a CDN while search and progress data are persisted through authenticated API calls.',
    ],
    objectives: [
      'Understand the roles and responsibilities of clients (browsers, mobile apps) vs servers',
      'Trace the lifecycle of an HTTP request-response round-trip through network layers',
      'Examine statelessness and how modern web applications maintain session identity',
      'Analyze architectural trade-offs between Client-Side Rendering (CSR), Server-Side Rendering (SSR), and Edge Computing',
    ],
    keyConcepts: [
      {
        title: 'The Client (User Agent)',
        explanation: 'The client is the consumer application running on the end-user\'s hardware (laptop, smartphone, IoT device). Its primary responsibilities include rendering graphical user interfaces, capturing user input events, executing client-side scripts, and initiating network calls.',
      },
      {
        title: 'The Server (Host System)',
        explanation: 'The server is a continuously running computer process listening on dedicated network ports (e.g., 80 for HTTP, 443 for HTTPS). It validates incoming request payloads, evaluates authentication tokens, coordinates database queries, executes business logic, and serializes responses.',
      },
      {
        title: 'The Stateless Protocol Barrier',
        explanation: 'HTTP is inherently stateless: each request is treated as completely independent with no native memory of prior interactions. Web architectures use cryptographic cookies, session tokens, or JWTs in HTTP headers to bridge this stateless gap.',
      },
      {
        title: 'Network Transit & DNS Resolution',
        explanation: 'Before client data reaches the server, DNS translates the hostname into an IP address, a TCP 3-way handshake establishes a reliable socket connection, and TLS cryptographic keys are negotiated to ensure transport confidentiality.',
      },
    ],
    syntaxDefinition: `// Conceptual Request-Response Flow
[Client: Web Browser] 
       │ ── 1. DNS Resolution (learnwithumar.vercel.app -> 76.76.21.21)
       │ ── 2. TCP Handshake + TLS 1.3 Key Exchange
       │ ── 3. HTTP GET /api/v1/courses (Headers: Authorization, Accept)
       ▼
[Edge CDN / Reverse Proxy (Nginx)]
       │ ── 4. SSL Termination & DDoS Rate Limiting
       ▼
[Application Server (Node.js / Express)]
       │ ── 5. Middleware Authentication Check
       │ ── 6. Query Database (PostgreSQL / Prisma)
       │ ── 7. Serialize JSON Payload (200 OK)
       ▼
[Client: Web Browser] 
       │ ── 8. Parse JSON, Hydrate React Component Tree, Render DOM`,
    codeExamples: [
      {
        title: 'Client-Side Data Request (TypeScript / Fetch)',
        language: 'typescript',
        code: `// Client application initiating an authenticated API request
interface CoursePayload {
  id: string;
  title: string;
  modulesCount: number;
}

async function fetchStudentCourses(): Promise<CoursePayload[]> {
  try {
    const response = await fetch('/api/v1/courses', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('auth_token'),
      },
    });

    if (!response.ok) {
      throw new Error(\`Server returned status \${response.status}: \${response.statusText}\`);
    }

    const data: CoursePayload[] = await response.json();
    return data;
  } catch (error) {
    console.error('Network round-trip failed:', error);
    throw error;
  }
}`,
        explanation: 'This client-side TypeScript function dispatches an asynchronous HTTP GET request over the network with an Authorization header and validates the HTTP response status before deserializing JSON.',
        output: '[ { id: "fs-1", title: "Full Stack Web Development", modulesCount: 20 } ]',
      },
      {
        title: 'Server-Side HTTP Handler (Node.js / Express)',
        language: 'typescript',
        code: `import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

// Server endpoint listening for client requests
app.get('/api/v1/courses', async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Valid Bearer token required in Authorization header'
    });
  }

  // Simulate querying relational database
  const courses = [
    { id: 'fs-1', title: 'Full Stack Web Development', modulesCount: 20 },
    { id: 'dm-1', title: 'Digital Marketing Mastery', modulesCount: 20 },
  ];

  return res.status(200).json(courses);
});

app.listen(4000, () => {
  console.log('API Server listening on port 4000');
});`,
        explanation: 'The server listens continuously on port 4000, inspects incoming headers for authorization credentials, and returns structured JSON with an explicit HTTP 200 status code.',
        output: 'Server response headers: Content-Type: application/json; charset=utf-8; Status: 200 OK',
      },
    ],
    stepByStepGuide: [
      {
        step: 1,
        title: 'User Input & URI Entry',
        details: 'The user enters a URL into the browser navigation bar. The browser parses the protocol (https://), hostname (learnwithumar.vercel.app), port (443), and resource path (/courses).',
      },
      {
        step: 2,
        title: 'DNS Resolution & Socket Establishment',
        details: 'The operating system checks its local DNS cache. If absent, it queries recursive DNS resolvers to obtain the server\'s public IPv4/IPv6 address. A TCP socket is opened via SYN, SYN-ACK, ACK handshake.',
      },
      {
        step: 3,
        title: 'TLS Cryptographic Handshake',
        details: 'For HTTPS connections, the client and server negotiate cipher suites, authenticate the server\'s digital SSL/TLS certificate, and establish symmetric session keys for encrypted data transit.',
      },
      {
        step: 4,
        title: 'HTTP Request Transmission',
        details: 'The client formats an RFC-compliant HTTP packet with request line, headers (Host, User-Agent, Accept-Encoding), and optional body, transmitting it as binary TCP packets.',
      },
      {
        step: 5,
        title: 'Server Processing & Data Persistence',
        details: 'The server accepts the request, dispatches it through middleware pipelines, checks authentication, interacts with databases or external microservices, and constructs the response payload.',
      },
      {
        step: 6,
        title: 'Client Rendering & DOM Construction',
        details: 'The client receives the response stream, parses the HTML/JSON payload, builds the Document Object Model (DOM), loads secondary resources (CSS, JS), and executes JavaScript.',
      },
    ],
    realWorldApplication: 'Every modern enterprise application — from Netflix streaming video to Stripe processing credit card payments — relies on this strict separation of concerns. The client provides an intuitive interactive interface while the server enforces data validation, business logic, and database integrity in a secure, tamper-proof environment.',
    commonMistakes: [
      {
        mistake: 'Trusting client-side validation alone for security rules.',
        solution: 'Always enforce validation on both the client and server. Client-side validation is purely for user experience (instant feedback); server-side validation is non-negotiable because any client can bypass frontend code and send malicious raw HTTP requests via cURL or Postman.',
      },
      {
        mistake: 'Embedding private API keys or database connection strings in client-side code.',
        solution: 'Never expose server secrets in frontend code. Any variable bundled in client JavaScript is publicly inspectable in browser dev tools. Server secrets must remain in backend environment variables (.env) that never touch the browser.',
      },
      {
        mistake: 'Failing to handle network latency and connection failure states in the UI.',
        solution: 'Always design optimistic UI or explicit loading skeletons and error banners. Clients operate over variable cellular networks where packets can drop or delay.',
      },
    ],
    bestPractices: [
      'Use HTTPS everywhere with HSTS headers to prevent man-in-the-middle packet sniffing.',
      'Implement structured HTTP status codes: 200 for success, 201 for created, 400 for bad input, 401 for unauthorized, 403 for forbidden, and 500 for unhandled exceptions.',
      'Deploy Content Delivery Networks (CDNs) at the network edge to serve static assets with low latency close to users.',
      'Compress network payloads using modern Brotli or Gzip encoding to minimize byte transfer sizes.',
    ],
    exercises: [
      {
        title: 'Inspect Live Network Traffic',
        task: 'Open your browser DevTools (F12), switch to the Network tab, reload any web page, and identify: Request Method, Status Code, Remote Address IP, and Content-Type response header.',
        hints: 'Filter by "Fetch/XHR" or "Doc" to isolate main document requests.',
      },
      {
        title: 'Simulate Offline Failure',
        task: 'In your browser DevTools Network tab, set Throttling to "Offline". Trigger an action on a web app and observe how gracefully or poorly the application handles the lost connection.',
        hints: 'Write a try/catch block with user-friendly retry banners in your test app.',
      },
    ],
    interviewQuestions: [
      {
        question: 'What happens when you type https://google.com into your browser and press Enter?',
        answer: 'The process involves: 1) URL parsing; 2) DNS lookup (Browser cache -> OS cache -> Router -> ISP Resolver -> Root -> TLD -> Authoritative); 3) TCP three-way handshake (SYN, SYN-ACK, ACK); 4) TLS handshake for encryption; 5) HTTP GET request sent; 6) Server processes request and returns HTTP response (HTML); 7) Browser parses HTML, builds DOM, requests CSS/JS, constructs CSSOM, builds Render Tree, calculates Layout (reflow), and Paints pixels to the display.',
      },
      {
        question: 'Why is HTTP called a stateless protocol, and how do we maintain state in modern web applications?',
        answer: 'HTTP is stateless because each request-response transaction is completely independent and forgotten once completed. To maintain state across requests, applications use: 1) HTTP Cookies (especially HttpOnly session cookies); 2) Token-based authentication (JWTs sent in Authorization headers); 3) Server-side session stores (e.g., Redis storing user session IDs); 4) Client-side storage (localStorage, IndexedDB).',
      },
    ],
    miniAssignment: {
      title: 'Architectural Blueprint Diagram',
      prompt: 'Draw an architectural sequence diagram illustrating a user submitting a login form on the client, how the request travels through a reverse proxy, hits an API gateway, queries a database, and returns a secure JWT cookie.',
      deliverables: [
        'A clearly labeled Mermaid diagram or hand-drawn architectural flow',
        'A 1-page summary explaining the purpose of each layer and the security measures applied at each step',
      ],
    },
    relatedTopics: [
      { id: 'what-is-web-dev', title: 'What is Web Development?', href: '/full-stack/intro-web-dev/what-is-web-dev' },
      { id: 'how-internet-works', title: 'How the Internet Works', href: '/full-stack/intro-web-dev/how-internet-works' },
      { id: 'frontend-vs-backend', title: 'Frontend vs Backend Architecture', href: '/full-stack/intro-web-dev/frontend-vs-backend' },
      { id: 'http-and-https', title: 'HTTP and HTTPS Security Protocols', href: '/full-stack/intro-web-dev/http-and-https' },
    ],
    officialDocs: [
      {
        title: 'MDN Web Docs: An Overview of HTTP',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview',
        description: 'Comprehensive architectural guide to HTTP protocols, messages, sessions, and request-response semantics.',
      },
      {
        title: 'W3C: Architecture of the World Wide Web',
        url: 'https://www.w3.org/TR/webarch/',
        description: 'The foundational architectural specification defining identifiers, formats, and interaction protocols across the web.',
      },
    ],
    furtherReading: [
      { title: 'High Performance Browser Networking by Ilya Grigorik', url: 'https://hpbn.co/' },
      { title: 'RFC 9110: HTTP Semantics Specification', url: 'https://www.rfc-editor.org/rfc/rfc9110' },
    ],
  },

  // DIGITAL MARKETING: SEO Crawling, Indexing, and Ranking
  'digital-marketing_seo-fundamentals_crawling-indexing-ranking': {
    id: 'crawling-indexing-ranking',
    moduleId: 'seo-fundamentals',
    trackId: 'digital-marketing',
    title: 'Crawling, Indexing and Ranking',
    slug: 'crawling-indexing-ranking',
    order: 3,
    duration: '60m',
    difficulty: 'Beginner',
    summary: 'The three-stage technical lifecycle behind every search result: how search engine spiders discover URLs through web crawling, parse and store web page content in planetary indexes, and compute mathematical ranking signals to serve top results in milliseconds.',
    definition: 'Crawling, indexing, and ranking are the three sequential stages of search engine retrieval. Crawling discovers URLs and downloads their content; indexing parses, renders, and stores eligible pages in a searchable database; ranking orders indexed documents by relevance, usefulness, and authority for a specific query.',
    explanation: 'Search engines do not search the live web when a user types a query. Googlebot first discovers URLs through internal links, backlinks, redirects, and XML sitemaps, then fetches and renders each page while respecting robots.txt and crawl budget. The indexing pipeline extracts text, entities, links, and structured data, and decides whether the page is eligible to appear in results. At query time, retrieval systems combine the user’s intent with hundreds of signals — including topical relevance, link authority, freshness, page experience, and location — to produce a ranked SERP in milliseconds.',
    whyItIsUsed: [
      'Makes the open web discoverable without a central directory that every publisher must manually update.',
      'Allows search engines to remove spam, duplicates, and low-quality pages before they reach users.',
      'Connects specific user intent to the most relevant, trustworthy, and technically accessible pages.',
      'Gives SEO practitioners a measurable diagnostic model: fix crawling, then indexing, then ranking.',
    ],
    realWorldUseCases: [
      'An e-commerce team submits a clean XML sitemap and uses Search Console to diagnose thousands of unindexed product variants.',
      'A publisher consolidates duplicate URLs with canonical tags so link equity is not split across variants.',
      'A SaaS company improves Core Web Vitals and structured data to compete for the same commercial keywords.',
    ],
    objectives: [
      'Master the 3 distinct phases of search engine discovery: Crawling, Indexing, and Ranking',
      'Understand how search bots (Googlebot) allocate and consume website Crawl Budget',
      'Diagnose common indexation blocks including robots.txt directives, noindex tags, and canonical issues',
      'Analyze the primary ranking factor categories: Relevance, Prominence, Experience, and E-E-A-T signals',
    ],
    keyConcepts: [
      {
        title: '1. Crawling (The Discovery Phase)',
        explanation: 'Crawling is the automated discovery process where autonomous spider programs (like Googlebot) crawl the web. Spiders start with a known list of seed URLs and dynamically discover new pages by traversing hyperlinks, parsing XML sitemaps, and following HTTP redirects.',
      },
      {
        title: '2. Indexing (The Storage & Understanding Phase)',
        explanation: 'Once crawled, Googlebot parses the HTML, CSS, JavaScript, structured schema data, and visual layout. The page content is analyzed for semantic meaning, cataloged by topic entities, and stored in Google\'s massive distributed database known as the Search Index.',
      },
      {
        title: '3. Ranking (The Scoring & Retrieval Phase)',
        explanation: 'When a user enters a query, Google scans billions of indexed documents in fractions of a second. Algorithms compute hundreds of ranking signals — search intent match, keyword topical authority, Core Web Vitals, user location, backlink equity, and content freshness — to order results.',
      },
      {
        title: 'Crawl Budget & Server Response',
        explanation: 'Crawl budget is the number of URLs Googlebot can and wants to crawl on your site within a given timeframe. It is governed by Crawl Demand (how popular and frequently updated your pages are) and Crawl Capacity (how fast and stably your server responds without 500 errors).',
      },
    ],
    syntaxDefinition: `// The 3-Stage Search Engine Pipeline
[Web Universe] 
       │ ── 1. CRAWLING: Googlebot follows internal links, backlinks, and XML sitemaps.
       │    └─ Governed by: robots.txt permissions & Crawl Budget capacity.
       ▼
[Rendering Engine (Headless Chromium)]
       │ ── 2. RENDERING: Executes JavaScript, parses DOM, computes visual layout.
       ▼
[Google Search Index (The Indexing Phase)]
       │ ── 3. INDEXING: Analyzes text semantics, extracts entities, JSON-LD schema.
       │    └─ Governed by: <meta name="robots" content="noindex">, canonical tags.
       ▼
[User Query Input: "best full stack internship program"]
       │ ── 4. RANKING ALGORITHMS (RankBrain, Helpful Content, MUM, PageRank)
       │    └─ Computes: Query Intent + Topical Relevance + Backlink Authority + Speed.
       ▼
[Google SERP Display (Top 10 Results + AI Overviews + People Also Ask)]`,
    strategyExamples: [
      {
        title: 'Diagnosing an Indexation Drop for an E-Commerce Store',
        scenario: 'A commercial fashion retailer launched 5,000 new product pages, but after 30 days, only 200 pages appear in Google Search Console as indexed. Traffic has plummeted.',
        strategy: '1) Audit Google Search Console Page Indexing report to see whether URLs are in "Crawled - currently not indexed" (quality/thin content problem) or "Discovered - currently not indexed" (crawl budget or internal link distribution problem); 2) Check if dynamic faceted URL filters are generating millions of duplicate URLs that exhaust crawl budget; 3) Add clean canonical tags pointing to primary products; 4) Add noindex or Disallow in robots.txt for deep filter parameter query strings; 5) Submit an updated XML sitemap containing only primary, indexable URLs.',
        expectedOutcome: 'Googlebot stops wasting crawl budget on infinite faceted parameter loops. Within 3 weeks, crawl frequency on primary product pages increases by 400%, and indexation rates surpass 95%.',
      },
      {
        title: 'Fixing JavaScript Hydration Indexing Delay',
        scenario: 'A React Single Page Application displays client-rendered product reviews that Google takes weeks to discover and index.',
        strategy: 'Transition from pure Client-Side Rendering (CSR) to Server-Side Rendering (SSR) using Next.js App Router. Render critical product content and structured JSON-LD schema directly in the initial server HTML payload so Googlebot does not have to wait for the secondary JavaScript rendering queue.',
        expectedOutcome: 'Zero-latency indexing upon initial crawl. Rich snippet review stars appear in search results within 48 hours.',
      },
    ],
    stepByStepGuide: [
      {
        step: 1,
        title: 'URL Discovery via Crawl Paths',
        details: 'Googlebot finds your URL via an external backlink from another site, an internal link from an existing crawled page, or your submitted XML sitemap in Google Search Console.',
      },
      {
        step: 2,
        title: 'Robots.txt Permission Check',
        details: 'Before requesting the page, Googlebot fetches /robots.txt. If your file contains "Disallow: /courses/", Googlebot aborts immediately and will not crawl the page content.',
      },
      {
        step: 3,
        title: 'HTTP Fetch & Status Code Validation',
        details: 'Googlebot issues an HTTP GET request. A 200 OK proceeds to rendering. A 301 permanently redirects to the target URL. A 404 or 410 signals removal from the index. A 5xx server error causes Googlebot to back off to prevent overloading your server.',
      },
      {
        step: 4,
        title: 'Headless Chromium Rendering & DOM Execution',
        details: 'Google\'s rendering service executes JavaScript and generates the rendered DOM. Any content hidden behind user interactions (e.g., click events required to render text) may be deprioritized.',
      },
      {
        step: 5,
        title: 'Canonical Resolution & Deduplication',
        details: 'Google evaluates the rel="canonical" tag. If the page is deemed a duplicate of another existing page, only the canonical master URL is stored in the index.',
      },
      {
        step: 6,
        title: 'Query Matching & Real-Time Ranking',
        details: 'When a user searches, ranking algorithms match keywords, synonyms, and entities. BERT and MUM natural language processing models decipher semantic intent, and PageRank calculates link authority to position the final SERP list.',
      },
    ],
    realWorldApplication: 'Understanding this 3-step pipeline is what separates amateur blog writers from high-earning SEO Directors. You can write the best 5,000-word guide on the planet, but if a rogue robots.txt disallow tag blocks crawling, or a canonical mismatch blocks indexing, your organic revenue will be exactly zero.',
    commonMistakes: [
      {
        mistake: 'Using robots.txt "Disallow" to hide sensitive or duplicate pages from search results.',
        solution: 'Disallow prevents crawling, NOT indexing. If another website links to your disallowed URL, Google can and will still index the bare URL with no snippet. To guarantee a page is excluded from Google search, allow it to be crawled and add `<meta name="robots" content="noindex">`.',
      },
      {
        mistake: 'Blocking CSS and JavaScript files in robots.txt.',
        solution: 'Googlebot must be allowed to download your CSS and JavaScript files to accurately render the page layout and assess mobile-friendliness and Core Web Vitals. Never disallow assets in robots.txt.',
      },
      {
        mistake: 'Ignoring orphan pages with no internal links.',
        solution: 'If a page has zero internal links pointing to it from your navigation or content silos, search spiders will rarely crawl it and will evaluate it as unimportant.',
      },
    ],
    bestPractices: [
      'Maintain an updated, automated XML sitemap linked inside robots.txt and submitted directly to Google Search Console.',
      'Ensure server response time (TTFB) is below 200ms so Googlebot can crawl hundreds of pages per minute without latency.',
      'Adopt a flat website architecture where all valuable pages are reachable within 3 clicks from the homepage.',
      'Verify every page has a single, self-referential rel="canonical" tag unless intentionally consolidating duplicate variants.',
    ],
    exercises: [
      {
        title: 'Google Search Console Indexation Audit',
        task: 'Open Google Search Console for any website, navigate to Indexing > Pages, and categorize the URLs listed under "Why pages aren\'t indexed". Note down how many are normal (e.g. redirected or excluded) vs problematic (e.g. 5xx errors or 404s).',
        hints: 'Examine "Crawled - currently not indexed" to identify content that Google deemed low-value or thin.',
      },
      {
        title: 'Robots.txt Analysis',
        task: 'Visit the live robots.txt file of three major websites (e.g. wikipedia.org/robots.txt, nytimes.com/robots.txt). Identify their crawler-specific user-agent rules and sitemap declarations.',
        hints: 'Look for User-agent: Googlebot vs User-agent: * directives.',
      },
    ],
    interviewQuestions: [
      {
        question: 'What is the difference between "Crawled - currently not indexed" and "Discovered - currently not indexed" in Google Search Console?',
        answer: '"Discovered - currently not indexed" means Googlebot knows the URL exists (found via sitemap or link), but has not yet crawled it, typically due to site crawl budget constraints or server load. "Crawled - currently not indexed" means Googlebot successfully fetched and rendered the page, but explicitly decided NOT to add it to the index, usually due to perceived low quality, duplicate content, thin copy, or poor search intent alignment.',
      },
      {
        question: 'How does Google handle canonical tags when the canonical URL has a 404 error or a noindex tag?',
        answer: 'Google treats canonical tags as strong hints, not mandatory directives. If page A canonicalizes to page B, but page B returns a 404 error or contains a noindex tag, Google will reject the canonical tag and either index page A independently or select another URL it deems the true canonical master.',
      },
    ],
    miniAssignment: {
      title: 'Technical Crawl & Indexation Blueprint',
      prompt: 'Draft an indexation policy document for a company website with 1,000 pages including public marketing pages, user account dashboards, checkout pages, and blog archives. Specify the exact robots.txt rules, meta robots tags, and XML sitemap inclusion rules for each category.',
      deliverables: [
        'A complete, syntactically valid robots.txt file',
        'A table mapping URL patterns to their required indexing status (Index/Noindex, Follow/Nofollow, Canonical target)',
      ],
    },
    relatedTopics: [
      { id: 'intro-to-seo', title: 'Introduction to Search Engine Optimization', href: '/digital-marketing/seo-fundamentals/intro-to-seo' },
      { id: 'how-search-engines-work', title: 'How Search Engines Work', href: '/digital-marketing/seo-fundamentals/how-search-engines-work' },
      { id: 'search-algorithms', title: 'Google Search Algorithms & Updates', href: '/digital-marketing/seo-fundamentals/search-algorithms' },
      { id: 'keyword-research-methodology', title: 'Keyword Research Methodology', href: '/digital-marketing/seo-fundamentals/keyword-research-methodology' },
    ],
    officialDocs: [
      {
        title: 'Google Search Central: How Google Search Works',
        url: 'https://developers.google.com/search/docs/fundamentals/how-search-works',
        description: 'Official Google documentation detailing the technical phases of crawling, indexing, and serving search results.',
      },
      {
        title: 'Google Search Central: Robots.txt Specifications',
        url: 'https://developers.google.com/search/docs/crawling-indexing/robots/intro',
        description: 'Authoritative guide to robots exclusion protocol syntax, directives, and Googlebot crawling behavior.',
      },
    ],
    furtherReading: [
      { title: 'Google Webmaster Guidelines & Search Essentials', url: 'https://developers.google.com/search/docs/essentials' },
      { title: 'W3C Technical Architecture for Search Indexing', url: 'https://www.w3.org/' },
    ],
  },
};

export const TOPIC_ALIASES: Record<string, string> = {
  'intro-to-html': 'introduction-to-html',
  'html-lists': 'lists-and-hierarchies',
  'html-tables': 'tables-and-tabular-data',
  'forms-and-inputs': 'forms-and-input-fields',
  'html5-features': 'html5-modern-features',
  'web-accessibility': 'accessibility-in-html',
  'accessibility': 'accessibility-in-html',
};

const normalize = (s: string) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');

const getTrackModules = (trackId: TrackId) =>
  trackId === 'full-stack' ? FULL_STACK_MODULES : DIGITAL_MARKETING_MODULES;

export interface ResolvedCurriculumTopic {
  module: ModuleWithTopics;
  topic: ModuleWithTopics['topics'][number];
  canonicalTopicId: string;
}

/**
 * Resolve and validate a documentation URL against the curriculum. Pages use
 * this to return a real 404 for unknown routes and to redirect legacy aliases
 * to their canonical lesson.
 */
export function resolveCurriculumTopic(
  trackId: TrackId,
  moduleId: string,
  topicId: string
): ResolvedCurriculumTopic | null {
  const modules = getTrackModules(trackId);
  const canonicalTopicId = TOPIC_ALIASES[topicId] || topicId;
  const mod =
    modules.find((item) => item.id === moduleId) ||
    modules.find((item) => normalize(item.id) === normalize(moduleId));

  if (!mod) return null;

  const topic =
    mod.topics.find((item) => item.id === canonicalTopicId) ||
    mod.topics.find((item) => normalize(item.id) === normalize(canonicalTopicId));

  if (!topic) return null;

  return { module: mod, topic, canonicalTopicId: topic.id };
}

/**
 * Hand-authored lessons occasionally predate curriculum renames. Normalize
 * their identity and make sure every related-topic link points at a real
 * route instead of silently rendering a fallback lesson.
 */
function finalizeDetailedLesson(
  lesson: LessonContent,
  trackId: TrackId,
  moduleId: string,
  topicId: string
): LessonContent {
  const modules = getTrackModules(trackId);
  const mod =
    modules.find((item) => item.id === moduleId) ||
    modules.find((item) => item.topics.some((topic) => topic.id === topicId));

  if (!mod) return lesson;

  const currentTopic = mod.topics.find((topic) => topic.id === topicId);
  const validHrefs = new Set(
    modules.flatMap((item) => item.topics.map((topic) => `/${trackId}/${item.id}/${topic.id}`))
  );

  const related = (lesson.relatedTopics || [])
    .map((relatedTopic) => {
      if (validHrefs.has(relatedTopic.href)) return relatedTopic;

      const match = modules
        .flatMap((item) => item.topics.map((topic) => ({ module: item, topic })))
        .find(
          ({ topic }) =>
            topic.id === relatedTopic.id ||
            normalize(topic.id) === normalize(relatedTopic.id) ||
            normalize(topic.title) === normalize(relatedTopic.title)
        );

      return match
        ? {
            id: match.topic.id,
            title: match.topic.title,
            href: `/${trackId}/${match.module.id}/${match.topic.id}`,
          }
        : null;
    })
    .filter((relatedTopic): relatedTopic is NonNullable<typeof relatedTopic> => Boolean(relatedTopic))
    .filter(
      (relatedTopic, index, list) =>
        relatedTopic.href !== `/${trackId}/${mod.id}/${topicId}` &&
        list.findIndex((candidate) => candidate.href === relatedTopic.href) === index
    );

  for (const sibling of mod.topics) {
    if (related.length >= 4) break;
    if (sibling.id === topicId) continue;

    const href = `/${trackId}/${mod.id}/${sibling.id}`;
    if (!related.some((item) => item.href === href)) {
      related.push({ id: sibling.id, title: sibling.title, href });
    }
  }

  return {
    ...lesson,
    id: currentTopic?.id || lesson.id,
    moduleId: mod.id,
    trackId,
    title: currentTopic?.title || lesson.title,
    slug: currentTopic?.id || lesson.slug,
    duration: currentTopic?.duration || lesson.duration,
    relatedTopics: related,
  };
}

// Generates rich content for any topic in the curriculum so no lesson is ever an empty placeholder
export function getLessonContent(trackId: TrackId, moduleId: string, topicId: string): LessonContent {
  const canonicalTopicId = TOPIC_ALIASES[topicId] || topicId;

  // 1. Direct composite key check
  const compositeKey = `${trackId}_${moduleId}_${canonicalTopicId}`;
  if (DETAILED_LESSONS[compositeKey]) {
    return finalizeDetailedLesson(DETAILED_LESSONS[compositeKey], trackId, moduleId, canonicalTopicId);
  }

  // 2. Check with raw topicId
  const rawKey = `${trackId}_${moduleId}_${topicId}`;
  if (DETAILED_LESSONS[rawKey]) {
    return finalizeDetailedLesson(DETAILED_LESSONS[rawKey], trackId, moduleId, topicId);
  }

  // 3. Find module details
  const modules = getTrackModules(trackId);
  let mod = modules.find((m) => m.id === moduleId || normalize(m.id) === normalize(moduleId));
  if (!mod) {
    mod = modules.find((m) =>
      m.topics.some(
        (t) =>
          t.id === canonicalTopicId ||
          t.id === topicId ||
          normalize(t.id) === normalize(canonicalTopicId) ||
          normalize(t.id) === normalize(topicId)
      )
    );
  }

  const topic = mod?.topics.find(
    (t) =>
      t.id === canonicalTopicId ||
      t.id === topicId ||
      normalize(t.id) === normalize(canonicalTopicId) ||
      normalize(t.id) === normalize(topicId) ||
      normalize(t.title) === normalize(canonicalTopicId) ||
      normalize(t.title) === normalize(topicId)
  );

  const title = topic?.title || 'Comprehensive Lesson Overview';
  const summary = topic?.summary || 'Master this essential industry skill with complete documentation, practical patterns, real-world examples, and interview preparation.';
  const effectiveTopicId = topic?.id || canonicalTopicId;
  const effectiveModuleId = mod?.id || moduleId;

  // Sibling related topics for contextual navigation
  const relatedTopics = (mod?.topics || [])
    .filter((t) => t.id !== effectiveTopicId)
    .slice(0, 4)
    .map((t) => ({
      id: t.id,
      title: t.title,
      href: `/${trackId}/${effectiveModuleId}/${t.id}`,
    }));

  const moduleContext = mod ?? {
    id: effectiveModuleId,
    title: 'Learn with Umar Curriculum',
    description: 'A structured, documentation-driven curriculum built for production work.',
    badge: undefined,
  };

  return generateLessonContent({
    trackId,
    module: moduleContext,
    topic: {
      id: effectiveTopicId,
      title,
      summary,
      duration: topic?.duration || '45m',
    },
    order: mod ? mod.topics.findIndex((item) => item.id === effectiveTopicId) + 1 : 1,
    relatedTopics,
  });
}
