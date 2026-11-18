import { LessonContent, TrackId } from '@/types/curriculum';
import { FULL_STACK_MODULES } from '../full-stack-curriculum';
import { DIGITAL_MARKETING_MODULES } from '../digital-marketing-curriculum';
import { HTML_DETAILED_LESSONS } from './html-lessons';

export const DETAILED_LESSONS: Record<string, LessonContent> = {
  ...HTML_DETAILED_LESSONS,
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
      { id: 'what-is-web-development', title: 'What is Web Development?', href: '/full-stack/intro-web-dev/what-is-web-development' },
      { id: 'how-the-internet-works', title: 'How the Internet Works', href: '/full-stack/intro-web-dev/how-the-internet-works' },
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
      { id: 'introduction-to-seo', title: 'Introduction to SEO', href: '/digital-marketing/seo-fundamentals/introduction-to-seo' },
      { id: 'crawling-and-indexing', title: 'Crawling, Indexing, and Serving Mechanisms', href: '/digital-marketing/seo-fundamentals/crawling-and-indexing' },
      { id: 'ranking-factors-overview', title: 'Core Ranking Factors & Algorithms', href: '/digital-marketing/seo-fundamentals/ranking-factors-overview' },
      { id: 'serp-features-and-layout', title: 'SERP Anatomy & Rich Snippets', href: '/digital-marketing/seo-fundamentals/serp-features-and-layout' },
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

const TOPIC_ALIASES: Record<string, string> = {
  'intro-to-html': 'introduction-to-html',
  'html-lists': 'lists-and-hierarchies',
  'html-tables': 'tables-and-tabular-data',
  'forms-and-inputs': 'forms-and-input-fields',
  'html5-features': 'html5-modern-features',
  'web-accessibility': 'accessibility-in-html',
  'accessibility': 'accessibility-in-html',
};

const normalize = (s: string) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');

// Generates rich content for any topic in the curriculum so no lesson is ever an empty placeholder
export function getLessonContent(trackId: TrackId, moduleId: string, topicId: string): LessonContent {
  const canonicalTopicId = TOPIC_ALIASES[topicId] || topicId;

  // 1. Direct composite key check
  const compositeKey = `${trackId}_${moduleId}_${canonicalTopicId}`;
  if (DETAILED_LESSONS[compositeKey]) {
    return DETAILED_LESSONS[compositeKey];
  }

  // 2. Check with raw topicId
  const rawKey = `${trackId}_${moduleId}_${topicId}`;
  if (DETAILED_LESSONS[rawKey]) {
    return DETAILED_LESSONS[rawKey];
  }

  // 3. Find module details
  const modules = trackId === 'full-stack' ? FULL_STACK_MODULES : DIGITAL_MARKETING_MODULES;
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
  const isDevelopment = trackId === 'full-stack';
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

  // Context-specific verified official documentation links
  let officialDocs = [
    {
      title: isDevelopment ? 'MDN Web Docs Official Reference' : 'Google Search Central Official Reference',
      url: isDevelopment ? 'https://developer.mozilla.org' : 'https://developers.google.com/search/docs',
      description: 'Verified official documentation and reference material for modern standards and technical protocols.',
    },
  ];

  if (effectiveModuleId === 'html-complete-guide' || effectiveTopicId.includes('html')) {
    officialDocs = [
      {
        title: 'MDN Web Docs: HTML Living Standard & Reference',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
        description: 'Comprehensive guides, element reference tables, and interactive code examples maintained by Mozilla.',
      },
      {
        title: 'WHATWG HTML Living Standard Specification',
        url: 'https://html.spec.whatwg.org/multipage/',
        description: 'The canonical source specification for modern HTML syntax, parsing rules, and DOM interfaces.',
      },
      {
        title: 'W3C Web Accessibility Initiative (WAI-ARIA)',
        url: 'https://www.w3.org/WAI/standards-guidelines/aria/',
        description: 'Official accessibility technical guidelines and landmark roles for accessible HTML structuring.',
      },
    ];
  } else if (effectiveModuleId.includes('css') || effectiveTopicId.includes('css')) {
    officialDocs = [
      {
        title: 'MDN Web Docs: CSS Reference & Flexbox/Grid Guides',
        url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
        description: 'Standard reference for CSS properties, layout modes, cascade rules, and responsive design.',
      },
      {
        title: 'W3C Cascading Style Sheets Specifications',
        url: 'https://www.w3.org/Style/CSS/',
        description: 'Official W3C working group specifications for modern CSS architecture.',
      },
    ];
  } else if (effectiveModuleId.includes('react') || effectiveTopicId.includes('react')) {
    officialDocs = [
      {
        title: 'React Official Documentation (react.dev)',
        url: 'https://react.dev',
        description: 'Official interactive documentation for React 19, hooks, component lifecycles, and architecture.',
      },
      {
        title: 'React Router / Modern State Management Guide',
        url: 'https://react.dev/learn',
        description: 'Conceptual patterns for declarative UI composition and predictable unidirectional data flow.',
      },
    ];
  } else if (effectiveModuleId.includes('next') || effectiveTopicId.includes('next')) {
    officialDocs = [
      {
        title: 'Next.js App Router Documentation',
        url: 'https://nextjs.org/docs',
        description: 'Production architecture guides for Server Components, routing, layouts, and data fetching.',
      },
    ];
  } else if (effectiveModuleId.includes('seo') || effectiveTopicId.includes('seo')) {
    officialDocs = [
      {
        title: 'Google Search Central Official Documentation',
        url: 'https://developers.google.com/search/docs',
        description: 'Google’s official guidelines for crawling, indexing, ranking, and technical SEO compliance.',
      },
      {
        title: 'Schema.org Structured Data Specifications',
        url: 'https://schema.org',
        description: 'Universal schemas for structured JSON-LD entities recognized by Google and Bing.',
      },
    ];
  }

  return {
    id: topicId,
    moduleId: moduleId,
    trackId: trackId,
    title: title,
    slug: topicId,
    order: 1,
    duration: topic?.duration || '45m',
    difficulty: 'Intermediate',
    summary: summary,
    definition: isDevelopment
      ? `${title} is a core technological standard and architecture specification in modern full-stack web engineering that defines how software components, network protocols, and data structures interact reliably across client, server, and database runtimes.`
      : `${title} is an essential digital marketing discipline and quantitative framework that establishes repeatable operational processes to attract targeted audiences, drive high-intent user engagement, and optimize business conversion metrics.`,
    explanation: isDevelopment
      ? `At an architectural level, mastering ${title} requires an in-depth understanding of execution contexts, lifecycle events, and data flow contracts. Rather than writing unvalidated or brittle code, production engineers adhere to strict design patterns—guaranteeing separation of concerns, defensive error boundaries, type safety, and predictable execution under high concurrent user load.`
      : `From a performance marketing perspective, ${title} integrates quantitative analytics with qualitative messaging psychology. Instead of relying on guesswork, modern digital strategists deploy rigorous tracking attribution, continuous A/B split-testing, and automated algorithmic bidding to sustainably maximize customer lifetime value while reducing acquisition cost.`,
    whyItIsUsed: isDevelopment
      ? [
          `Enforces standardized, deterministic behavior across diverse operating systems, browsers, and edge environments.`,
          `Minimizes technical debt, memory leaks, and cascading UI rendering bottlenecks.`,
          `Facilitates modular codebase maintainability and seamless collaboration across engineering teams.`,
          `Ensures enterprise-grade security compliance, accessibility (WCAG), and reliable API response contracts.`,
        ]
      : [
          `Eliminates marketing budget wastage through algorithmic audience targeting and conversion optimization.`,
          `Establishes predictable, scalable acquisition funnels for commercial products, agencies, and SaaS platforms.`,
          `Builds sustainable organic search visibility and domain authority through technical SEO compliance.`,
          `Provides transparent, multi-touch attribution reporting for executive leadership and stakeholders.`,
        ],
    realWorldUseCases: isDevelopment
      ? [
          `Building scalable SaaS applications, e-commerce storefronts, and authenticated enterprise web platforms.`,
          `Engineering transactional backend APIs, microservices, and relational PostgreSQL/MongoDB databases.`,
          `Optimizing Core Web Vitals (LCP, INP, CLS) and real-time WebSocket communication pipelines.`,
        ]
      : [
          `Structuring multi-tiered customer acquisition campaigns across Google Search, Shopping, and Meta Ads.`,
          `Executing technical SEO audits, crawl budget optimization, and semantic structured data (Schema.org).`,
          `Designing high-converting landing pages, lead generation funnels, and automated CRM retention sequences.`,
        ],
    objectives: [
      `Understand foundational principles and technical concepts of ${title}`,
      `Analyze practical implementation patterns and industry use cases`,
      `Identify common architectural errors and production anti-patterns`,
      `Execute hands-on exercises and prepare for technical interview questions`,
    ],
    keyConcepts: [
      {
        title: `Core Fundamentals of ${title}`,
        explanation: `${title} represents an indispensable concept in professional ${isDevelopment ? 'software engineering' : 'digital marketing'}. Mastering its mechanics provides the foundational baseline for building scalable, high-performance systems and campaigns.`,
      },
      {
        title: 'Structural Architecture & Execution',
        explanation: `In enterprise environments, ${title} must be implemented with strict adherence to industry standards, maintainability guidelines, and clean design patterns. Understanding the underlying execution flow ensures predictable performance and reliability.`,
      },
      {
        title: 'Integration & Cross-System Synergy',
        explanation: `This topic interacts directly with adjacent modules across the ${trackId === 'full-stack' ? 'Full Stack Web Development' : 'Digital Marketing'} track. Proper encapsulation and clear boundaries ensure smooth team collaboration and maintainable codebases.`,
      },
      {
        title: 'Performance & Optimization Nuances',
        explanation: `Evaluating the trade-offs between speed, complexity, and scalability is critical when deploying ${title} to production environments handling thousands of active users or prospects.`,
      },
    ],
    syntaxDefinition: isDevelopment
      ? `// Standard Architectural Pattern for ${title}
import { validateInput } from '@/lib/utils';

export async function handleOperation(payload: unknown) {
  // 1. Validate payload schema
  const data = validateInput(payload);
  
  // 2. Execute domain logic
  console.log('Processing ${title}:', data);
  
  // 3. Return structured response
  return { success: true, timestamp: Date.now() };
}`
      : `// Strategic Execution Framework for ${title}
Phase 1: Research & Competitive Intelligence
Phase 2: Strategy Definition & Target Audience Mapping
Phase 3: Creative & Technical Asset Deployment
Phase 4: Multi-Variate Testing & Continuous Performance Optimization`,
    codeExamples: isDevelopment
      ? [
          {
            title: `Practical Implementation Example: ${title}`,
            language: 'typescript',
            code: `// Production implementation demonstrating ${title}
interface ServiceConfig {
  apiKey: string;
  timeoutMs: number;
  retries: number;
}

export class CoreService {
  private config: ServiceConfig;

  constructor(config: ServiceConfig) {
    this.config = config;
  }

  public async executeTask<T>(input: T): Promise<{ success: boolean; data: T }> {
    try {
      // Execute logic according to ${title} standards
      return { success: true, data: input };
    } catch (error) {
      console.error('Execution failure in ${title}:', error);
      throw error;
    }
  }
}`,
            explanation: `This modular TypeScript class encapsulates business logic for ${title}, enforcing configuration validation and centralized error handling.`,
            output: '{ success: true, data: { status: "processed" } }',
          },
        ]
      : undefined,
    strategyExamples: !isDevelopment
      ? [
          {
            title: `Enterprise Strategy Workflow: ${title}`,
            scenario: `A fast-growing company needs to deploy a scalable framework for ${title} to improve customer acquisition and digital conversion efficiency.`,
            strategy: `1) Perform comprehensive market and competitor research; 2) Develop structured content and audience targeting assets; 3) Launch measured test campaigns; 4) Monitor KPIs in real-time dashboards and iterate based on data.`,
            expectedOutcome: `Consistent 25-40% improvement in core efficiency metrics within the initial 60 days of strategic deployment.`,
          },
        ]
      : undefined,
    stepByStepGuide: [
      {
        step: 1,
        title: 'Initial Discovery & Requirements Analysis',
        details: `Define the primary objectives, input parameters, and expected deliverables for ${title} before writing code or launching campaigns.`,
      },
      {
        step: 2,
        title: 'Architecture & Foundation Setup',
        details: `Establish the foundational configuration, import dependencies or tooling, and configure your local workspace according to industry best practices.`,
      },
      {
        step: 3,
        title: 'Implementation & Configuration',
        details: `Write the core logic or configure campaign assets following the step-by-step methodologies detailed in this module.`,
      },
      {
        step: 4,
        title: 'Testing, Verification & Optimization',
        details: `Validate the implementation with automated tests or audit checklists to verify error-free execution and high performance.`,
      },
    ],
    realWorldApplication: `In commercial environments, ${title} is utilized daily by engineering and marketing teams at leading digital companies to deliver reliable, high-value outcomes for clients and end users.`,
    commonMistakes: [
      {
        mistake: `Rushing into execution without validating underlying architecture or assumptions for ${title}.`,
        solution: `Always map out requirements, interfaces, and expected data contracts before writing code or launching campaigns.`,
      },
      {
        mistake: `Ignoring edge cases and error handling during normal operation.`,
        solution: `Implement comprehensive validation, fallback UI, and structured logging to catch anomalies early.`,
      },
    ],
    bestPractices: [
      `Keep implementations modular, readable, and well-documented with clear type definitions.`,
      `Measure performance metrics regularly using industry-standard profiling tools.`,
      `Follow modern conventions and keep dependencies updated to their verified LTS releases.`,
      `Conduct peer reviews before deploying changes to live production environments.`,
    ],
    exercises: [
      {
        title: `Practical Hands-On Exercise: ${title}`,
        task: `Build a functional prototype implementing the concepts of ${title} in your development environment. Verify that all test cases pass without errors.`,
        hints: `Refer to the step-by-step guide and code examples above to structure your solution.`,
      },
    ],
    interviewQuestions: [
      {
        question: `How would you explain the core significance of ${title} to a technical team lead or client?`,
        answer: `${title} is critical because it establishes the foundational rules for scalability, performance, and maintainability. When designed correctly, it minimizes technical debt, lowers maintenance overhead, and ensures predictable, robust behavior in production.`,
      },
    ],
    miniAssignment: {
      title: `Practical Case Study: ${title}`,
      prompt: `Develop a comprehensive, 2-page implementation blueprint detailing how you would introduce and manage ${title} for a client project.`,
      deliverables: [
        'Documented architecture specification or strategy outline',
        'Step-by-step implementation plan with timeline and milestone deliverables',
      ],
    },
    relatedTopics: relatedTopics,
    officialDocs: officialDocs,
    furtherReading: [
      { title: isDevelopment ? 'W3C Web Standards Specifications' : 'Google Analytics Official Help Documentation', url: isDevelopment ? 'https://www.w3.org/' : 'https://support.google.com/analytics' },
    ],
  };
}
