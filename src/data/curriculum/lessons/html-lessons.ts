import { LessonContent } from '@/types/curriculum';

export const HTML_DETAILED_LESSONS: Record<string, LessonContent> = {
  // 1. Introduction to HTML
  'full-stack_html-complete-guide_introduction-to-html': {
    id: 'introduction-to-html',
    moduleId: 'html-complete-guide',
    trackId: 'full-stack',
    title: 'Introduction to HTML',
    slug: 'introduction-to-html',
    order: 1,
    duration: '40m',
    difficulty: 'Beginner',
    summary: 'HTML (HyperText Markup Language) is the ubiquitous backbone of the web. Explore the living standard, document object model (DOM) tree construction, tag anatomy, and browser rendering engines.',
    definition: 'HTML is the declarative standard markup language for creating web documents. It annotates content with semantic structural elements that browsers parse and translate into an interactive Document Object Model (DOM) tree.',
    explanation: 'When a web browser fetches an HTML document across HTTP, its internal parser processes the raw byte stream through character tokenization, tree construction, and DOM element instantiations. Rather than a programming language with execution logic, HTML defines content topology—specifying paragraphs, interactive buttons, hyperlinks, tables, and media embeds.',
    whyItIsUsed: [
      'Provides universal semantic structure that any web browser, device, or assistive screen reader can interpret.',
      'Acts as the structural foundation that CSS styles and JavaScript manipulates via the DOM API.',
      'Enables search engine crawlers (Googlebot) to index and rank relevant page content accurately.',
      'Delivers native accessibility (a11y) support out of the box without requiring external libraries.',
    ],
    realWorldUseCases: [
      'Architecting foundational layouts for high-traffic enterprise web applications like GitHub, Netflix, and Stripe.',
      'Structuring searchable content trees for blogs, documentation centers, and e-commerce catalogs.',
      'Enabling assistive screen readers to announce navigation landmarks, headings, and interactive elements to visually impaired users.',
    ],
    objectives: [
      'Understand how browsers parse HTML tokens into a DOM tree',
      'Distinguish between tags, elements, void elements, and attributes',
      'Learn the living standard evolution overseen by WHATWG and W3C',
      'Write clean, well-formed HTML without syntax or nesting errors',
    ],
    keyConcepts: [
      {
        title: 'Markup vs Programming',
        explanation: 'HTML does not contain variables, functions, or algorithmic loops. It is a declarative markup specification that informs user agents what kind of content each block represents.',
      },
      {
        title: 'The Tag Anatomy',
        explanation: 'An element consists of an opening tag (e.g. <p>), optional key-value attributes (class="lead"), inner content, and a closing tag (</p>).',
      },
      {
        title: 'Void Elements',
        explanation: 'Elements like <img>, <br>, <hr>, and <input> cannot contain children and do not require closing tags in modern HTML5.',
      },
      {
        title: 'WHATWG Living Standard',
        explanation: 'HTML is no longer versioned as static releases (like HTML4 in 1999). It is continuously maintained as the HTML Living Standard by WHATWG.',
      },
    ],
    syntaxDefinition: `<!-- General HTML Element Syntax -->
<tagname attribute="value" data-custom="value">
  Inner Text Content or Nested Elements
</tagname>

<!-- Void (Self-Closing) Element Syntax -->
<input type="text" name="username" placeholder="Enter username" />`,
    codeExamples: [
      {
        title: 'Semantic HTML5 Document Foundation',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Learn with Umar — Modern HTML Foundations</title>
  </head>
  <body>
    <header>
      <h1>Welcome to Learn with Umar</h1>
      <p>Mastering full-stack web development from core principles to production.</p>
    </header>
    <main>
      <article>
        <h2>Understanding the Living Standard</h2>
        <p>HTML elements inform browsers how to construct the DOM tree.</p>
      </article>
    </main>
    <footer>
      <p>&copy; 2026 Umar Nazir. All rights reserved.</p>
    </footer>
  </body>
</html>`,
        explanation: 'A fully formed HTML5 document including DOCTYPE declaration, root html element, metadata container (head), and visible viewport structure (body).',
        output: 'Renders a clean top-level heading, introductory paragraph, article section, and copyright footer.',
      },
    ],
    stepByStepGuide: [
      {
        step: 1,
        title: 'Define the Document Type',
        details: 'Always start with <!DOCTYPE html> on line 1 to force standard rendering mode across all browsers and prevent quirks mode.',
      },
      {
        step: 2,
        title: 'Establish Document Boundaries',
        details: 'Wrap everything inside <html lang="en">. Setting the lang attribute ensures correct screen reader pronunciation and spell checking.',
      },
      {
        step: 3,
        title: 'Supply Essential Metadata',
        details: 'Inside <head>, specify <meta charset="UTF-8"> for Unicode text support and the responsive viewport tag for mobile compatibility.',
      },
      {
        step: 4,
        title: 'Structure Visual Content Semantically',
        details: 'Use semantic landmarks (<header>, <nav>, <main>, <article>, <footer>) inside <body> instead of non-descriptive generic <div> tags.',
      },
    ],
    realWorldApplication: 'Every frontend framework—including React, Next.js, and Vue—compiles or hydrates down to valid HTML markup before pixels can be painted to the user display.',
    commonMistakes: [
      {
        mistake: 'Omitting <!DOCTYPE html> at the beginning of the file.',
        solution: 'Always place <!DOCTYPE html> on the first line to guarantee standards-compliant rendering.',
      },
      {
        mistake: 'Leaving tags unclosed or overlapping tags across different hierarchy levels.',
        solution: 'Properly nest tags in a last-in, first-out hierarchy. Modern linters like HTMLHint catch unclosed tags.',
      },
    ],
    bestPractices: [
      'Always include the lang attribute on the <html> root element.',
      'Use lowercase tag names and attribute names consistently.',
      'Always quote attribute values using double quotes.',
      'Validate markup using the official W3C Nu HTML Validator.',
    ],
    exercises: [
      {
        title: 'Drill 1: Build a Standards-Compliant Document Shell',
        task: 'Create an HTML5 document from scratch that includes all mandatory metadata tags, an accessible page title, and three semantic landmarks.',
        hints: 'Ensure you include DOCTYPE, html lang="en", meta charset, meta viewport, and semantic <header>, <main>, and <footer> tags.',
      },
    ],
    interviewQuestions: [
      {
        question: 'What is the purpose of the <!DOCTYPE html> declaration?',
        answer: 'The <!DOCTYPE html> declaration tells the browser that the document is written in modern HTML5. It instructs the browser\'s layout engine to render the document in "Standards Mode" rather than "Quirks Mode", preventing historical CSS and rendering quirks.',
      },
      {
        question: 'What is the Document Object Model (DOM) and how does it relate to HTML?',
        answer: 'HTML is the static source code text, while the DOM is the live, in-memory tree of nodes created by the browser after parsing the HTML. JavaScript interacts directly with the DOM to read, modify, and listen for events on elements in real time.',
      },
    ],
    officialDocs: [
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
    ],
  },

  // 2. HTML Document Structure
  'full-stack_html-complete-guide_html-document-structure': {
    id: 'html-document-structure',
    moduleId: 'html-complete-guide',
    trackId: 'full-stack',
    title: 'HTML Document Structure',
    slug: 'html-document-structure',
    order: 2,
    duration: '45m',
    difficulty: 'Beginner',
    summary: 'Master the mandatory structural scaffolding of an HTML document: DOCTYPE, the html root tag, head metadata, title tags, Open Graph meta attributes, and body layout.',
    definition: 'HTML Document Structure refers to the standardized architectural skeleton that organizes an HTML file into two distinct sections: the head (non-visible metadata, scripts, stylesheets) and the body (user-visible interface content).',
    explanation: 'Every valid HTML5 document follows a strict tree hierarchy. The document root is <!DOCTYPE html>, followed by the <html> wrapper. Inside, the <head> element contains crucial instructions for search engines, social media crawlers, and browsers, while the <body> contains all interactive visual elements.',
    whyItIsUsed: [
      'Ensures consistent parsing across modern web browsers (Chrome, Safari, Firefox, Edge).',
      'Provides crucial SEO metadata, social share previews (Open Graph), and favicon references.',
      'Defines the character set and viewport boundaries for mobile responsiveness.',
    ],
    realWorldUseCases: [
      'Setting up production Next.js / React root layouts and HTML shells.',
      'Configuring dynamic social share cards on Twitter and LinkedIn via Open Graph metadata.',
      'Optimizing page load speed by preloading critical fonts and style assets in <head>.',
    ],
    objectives: [
      'Deconstruct each line of a production-ready HTML5 skeleton',
      'Configure mobile viewport meta tags for responsive scaling',
      'Implement Open Graph and Twitter Card metadata for rich previews',
    ],
    keyConcepts: [
      {
        title: 'The Document Tree Hierarchy',
        explanation: 'HTML documents form an inverted tree starting at the document node, branching into the html root element, which then divides into exactly two primary subtrees: head and body.',
      },
      {
        title: 'Viewport Scaling & Mobile Readiness',
        explanation: 'Without a viewport meta tag, mobile browsers render pages on a simulated 980px desktop canvas and scale down. The viewport tag forces the layout viewport to match physical device width.',
      },
      {
        title: 'Metadata Optimization & Social Graph',
        explanation: 'Search crawlers and social scrapers rely on structured meta tags (charset, description, og:image, twitter:card) to parse entity information and display preview cards.',
      },
    ],
    syntaxDefinition: `<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Brief page summary" />
    <title>Descriptive Unique Page Title</title>
  </head>
  <body>
    <!-- User-facing content goes here -->
  </body>
</html>`,
    codeExamples: [
      {
        title: 'Production-Ready Metadata Header Pattern',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Character Encoding & Responsive Viewport -->
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- SEO Essentials -->
    <title>Full Stack Web Development Curriculum — Learn with Umar</title>
    <meta name="description" content="Master modern software engineering with hands-on documentation, code samples, and real-world architectures." />
    <link rel="canonical" href="https://learnwithumar.com/full-stack" />
    
    <!-- Open Graph (Facebook / LinkedIn) -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Learn with Umar — Technical Education" />
    <meta property="og:description" content="From fundamentals to enterprise architecture." />
    <meta property="og:url" content="https://learnwithumar.com" />
    <meta property="og:image" content="https://learnwithumar.com/og-image.jpg" />
  </head>
  <body>
    <main>
      <h1>Curriculum Masterclass</h1>
      <p>Explore all 20 modules and 200+ topics.</p>
    </main>
  </body>
</html>`,
        explanation: 'Demonstrates a complete modern head section featuring charset, viewport, canonical links, and Open Graph protocol tags.',
        output: 'Renders the page content while equipping crawlers and platforms with rich link preview cards.',
      },
    ],
    stepByStepGuide: [
      {
        step: 1,
        title: 'Set Character Encoding First',
        details: 'Place <meta charset="UTF-8"> immediately inside <head> so the browser decodes subsequent characters and titles accurately.',
      },
      {
        step: 2,
        title: 'Configure the Mobile Viewport',
        details: 'Include <meta name="viewport" content="width=device-width, initial-scale=1.0"> to prevent mobile devices from zooming out by default.',
      },
      {
        step: 3,
        title: 'Craft a Unique, Keyword-Rich Title',
        details: 'Use the pattern: "Page Name — Platform Name" (50-60 characters) inside the <title> tag.',
      },
      {
        step: 4,
        title: 'Supply Open Graph Social Cards',
        details: 'Add og:title, og:description, and og:image tags so links shared on Slack, WhatsApp, and LinkedIn look polished.',
      },
    ],
    realWorldApplication: 'Every production web application utilizes this structure. Next.js App Router exposes metadata objects in layout.tsx to dynamically generate these exact tags.',
    commonMistakes: [
      {
        mistake: 'Putting visible HTML tags (like <h1>, <p>, or <img>) inside the <head> element.',
        solution: 'Keep <head> strictly reserved for metadata, title, and link tags. Place all visual content inside <body>.',
      },
      {
        mistake: 'Omitting the viewport tag, causing mobile devices to render the desktop layout zoomed out.',
        solution: 'Always include <meta name="viewport" content="width=device-width, initial-scale=1.0">.',
      },
    ],
    bestPractices: [
      'Keep the <title> tag under 60 characters so it does not get truncated in Google search results.',
      'Always specify a meta description between 140 and 160 characters.',
      'Include a canonical link tag to prevent duplicate content indexing penalties.',
    ],
    exercises: [
      {
        title: 'Drill 2: Configure Complete Social Metadata',
        task: 'Build an HTML document structure with complete Open Graph and Twitter card metadata for a personal portfolio project.',
        hints: 'Include og:title, og:image, og:url, twitter:card="summary_large_image", and twitter:site.',
      },
    ],
    interviewQuestions: [
      {
        question: 'Why must <meta charset="UTF-8"> be placed within the first 1024 bytes of the HTML document?',
        answer: 'Browsers begin parsing HTML before the entire file is downloaded. If the encoding tag is not located near the start (within the first 1024 bytes), the browser might guess an incorrect encoding and re-parse the document, creating a noticeable rendering pause or broken characters.',
      },
    ],
    officialDocs: [
      {
        title: 'MDN Web Docs: The Head Element & Metadata',
        url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML',
        description: 'Detailed tutorial on structuring document head elements, titles, and responsive meta tags.',
      },
      {
        title: 'The Open Graph Protocol Standard',
        url: 'https://ogp.me/',
        description: 'Official documentation for og metadata tags used by social media networks and messaging apps.',
      },
    ],
  },

  // 3. Elements and Attributes
  'full-stack_html-complete-guide_elements-and-attributes': {
    id: 'elements-and-attributes',
    moduleId: 'html-complete-guide',
    trackId: 'full-stack',
    title: 'Elements and Attributes',
    slug: 'elements-and-attributes',
    order: 3,
    duration: '50m',
    difficulty: 'Beginner',
    summary: 'Deep dive into HTML building blocks: opening/closing tags, content models, block vs inline flow, global attributes (id, class, title, hidden), and custom data-* attributes.',
    definition: 'An HTML Element is the fundamental unit of an HTML document, consisting of tags, attributes, and content. Attributes provide additional properties, configurations, or data to elements.',
    explanation: 'Elements tell the browser what content represents. Attributes are modifiers specified inside the opening tag as name="value" pairs. Global attributes (like id, class, style, data-*) can be applied to any element, while specific attributes (like src on <img> or href on <a>) only apply to dedicated element types.',
    whyItIsUsed: [
      'Allows styling and scripting targeting via class and id selectors.',
      'Enables passing data attributes (data-*) to JavaScript cleanly without polluting global scope.',
      'Provides vital accessibility hints through ARIA attributes (aria-label, aria-expanded).',
    ],
    realWorldUseCases: [
      'Attaching custom tracking attributes (data-analytics-id) for Google Tag Manager or Mixpanel.',
      'Targeting CSS component states using custom attributes and classes.',
      'Associating label elements with form controls via the for and id attributes.',
    ],
    objectives: [
      'Differentiate between block-level and inline elements in traditional and modern layout flow',
      'Master the use of global attributes including id, class, dir, and hidden',
      'Utilize data-* attributes for seamless JavaScript DOM communication',
    ],
    keyConcepts: [
      {
        title: 'Block vs Inline Flow',
        explanation: 'Block elements (div, p, h1) take up the full available container width and start on a new line. Inline elements (span, a, strong) flow along with adjacent text and only take up the width of their content.',
      },
      {
        title: 'Global Attributes',
        explanation: 'Universal attributes that can be legally specified on any HTML element, including id, class, style, title, lang, dir, hidden, and data-*.',
      },
      {
        title: 'Boolean Attributes',
        explanation: 'Attributes where the presence of the attribute itself indicates true (e.g., disabled, required, autofocus). No value is necessary.',
      },
    ],
    syntaxDefinition: `<!-- Element with standard and custom data attributes -->
<button 
  id="submit-order-btn" 
  class="btn btn-primary" 
  type="submit" 
  data-product-id="prod_9876" 
  data-in-stock="true"
  aria-label="Submit your purchase order"
>
  Confirm & Pay
</button>`,
    codeExamples: [
      {
        title: 'Leveraging data-* Attributes in Vanilla JavaScript',
        language: 'html',
        code: `<!-- HTML Markup with Data Attributes -->
<div class="user-card" data-user-id="42" data-role="mentor" data-status="active">
  <h3>Umar Nazir</h3>
  <p>Lead Full Stack Instructor</p>
  <button id="inspect-btn">View Profile Data</button>
</div>

<script>
  // Accessing attributes via JavaScript dataset API
  const card = document.querySelector('.user-card');
  const userId = card.dataset.userId; // '42'
  const role = card.dataset.role;     // 'mentor'
  
  console.log(\`User ID: \${userId}, Role: \${role}\`);
</script>`,
        explanation: 'HTML data-* attributes automatically map to camelCase properties on the element.dataset object in JavaScript.',
        output: 'Logs "User ID: 42, Role: mentor" in browser console when inspected.',
      },
    ],
    stepByStepGuide: [
      {
        step: 1,
        title: 'Choose the Semantic Tag',
        details: 'Select the HTML tag that best describes the content (e.g. <button> for actions, <a> for navigation).',
      },
      {
        step: 2,
        title: 'Assign Unique Identifiers with Care',
        details: 'Use id only when an element is strictly unique on the entire page. Use class for styling shared components.',
      },
      {
        step: 3,
        title: 'Append Descriptive Custom Data',
        details: 'Prefix custom metadata with data- (e.g., data-category="books") so the HTML validator treats it as standard.',
      },
    ],
    realWorldApplication: 'Component-based libraries like React translate JSX props directly into HTML attributes during server rendering and hydration.',
    commonMistakes: [
      {
        mistake: 'Using duplicate id values on the same page.',
        solution: 'An id must be globally unique within the document. For multiple elements, use class instead.',
      },
      {
        mistake: 'Nesting block-level elements inside inline elements (e.g. <div> inside <span>).',
        solution: 'Follow valid content models: block elements can contain inline elements, but inline elements should not wrap block containers.',
      },
    ],
    bestPractices: [
      'Keep attribute values enclosed in double quotation marks.',
      'Use semantic boolean attributes (disabled, required, checked) rather than disabled="true".',
      'Never store sensitive user credentials or passwords in data-* attributes.',
    ],
    exercises: [
      {
        title: 'Drill 3: Create an Interactive Filterable Card with data-*',
        task: 'Build a list of three course cards with data-level and data-duration attributes, and demonstrate how to read them using element.dataset.',
        hints: 'Use document.querySelectorAll and iterate through card.dataset to extract values.',
      },
    ],
    interviewQuestions: [
      {
        question: 'What is the difference between an HTML Element and an HTML Tag?',
        answer: 'An HTML Tag is simply the syntactic bracket notation used to denote opening or closing (e.g., <p> and </p>). An HTML Element is the complete entity, which includes the opening tag, any attributes, the inner content, and the closing tag.',
      },
      {
        question: 'What are data-* attributes and why are they advantageous?',
        answer: 'Data attributes allow developers to embed custom data directly on HTML elements without hacking class names or violating W3C validation. They are directly accessible via element.dataset in JavaScript and can also be queried with CSS attribute selectors.',
      },
    ],
    officialDocs: [
      {
        title: 'MDN Web Docs: HTML Elements Reference',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element',
        description: 'Complete alphabetical and category-based list of all standard HTML elements and their valid attributes.',
      },
      {
        title: 'MDN Web Docs: Using Data Attributes',
        url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes',
        description: 'Guide to storing and reading custom data on DOM nodes via HTML5 data attributes.',
      },
    ],
  },

  // 10. Semantic HTML
  'full-stack_html-complete-guide_semantic-html': {
    id: 'semantic-html',
    moduleId: 'html-complete-guide',
    trackId: 'full-stack',
    title: 'Semantic HTML',
    slug: 'semantic-html',
    order: 10,
    duration: '60m',
    difficulty: 'Intermediate',
    summary: 'Master semantic structuring: header, nav, main, article, section, aside, and footer. Discover how semantics improve accessibility, search engine indexing, and screen reader navigation.',
    definition: 'Semantic HTML is the practice of using HTML elements that convey the meaning and purpose of their enclosed content, rather than merely dictating visual presentation.',
    explanation: 'Before HTML5, web documents were composed almost entirely of generic <div> and <span> tags with arbitrary classes (<div class="header">). Semantic HTML introduced dedicated structural landmark tags—such as <header>, <nav>, <main>, <article>, <section>, <aside>, and <footer>—that communicate explicit meaning to search crawlers and assistive technologies.',
    whyItIsUsed: [
      'Drastically enhances accessibility: screen readers allow users to jump directly between landmarks like <main> or <nav>.',
      'Improves SEO: search engine bots recognize key article content, primary headings, and author attribution effortlessly.',
      'Produces clean, readable, self-documenting codebases that are easy to maintain across engineering teams.',
    ],
    realWorldUseCases: [
      'Structuring SaaS dashboards with clear navigation sidebars (<aside>), main content areas (<main>), and top headers (<header>).',
      'Engineering editorial publishing platforms (Medium, Substack, Dev.to) using semantic <article> and <section> tags.',
      'Achieving WCAG 2.2 AA and Section 508 legal compliance for enterprise and government platforms.',
    ],
    objectives: [
      'Distinguish between <article> and <section> and know when to use each',
      'Structure an entire application layout using HTML5 landmarks',
      'Eliminate "div soup" from enterprise codebases',
    ],
    keyConcepts: [
      {
        title: 'Landmark Regions',
        explanation: 'Semantic elements like <header>, <nav>, <main>, <aside>, and <footer> automatically expose landmark roles to the Accessibility Tree, enabling keyboard navigators to skip repetitive blocks.',
      },
      {
        title: 'Document Outline & Heading Rhythm',
        explanation: 'Headings should establish a strict, unbroken logical hierarchy (h1 -> h2 -> h3). Never skip levels (such as h1 directly to h4) purely for visual styling.',
      },
      {
        title: 'Independent Syndication (<article>)',
        explanation: '<article> elements encapsulate self-contained pieces of architecture (a blog post, forum reply, or product listing) that can stand independently outside the host page.',
      },
    ],
    syntaxDefinition: `<!-- Canonical Semantic Landmark Layout -->
<header>
  <nav aria-label="Primary Navigation">...</nav>
</header>
<main>
  <article>
    <header><h1>Article Title</h1></header>
    <section><h2>Sub-topic 1</h2>...</section>
    <footer><p>Author Bio</p></footer>
  </article>
  <aside>Related Links & Sidebar</aside>
</main>
<footer>
  <p>&copy; 2026 Platform. All rights reserved.</p>
</footer>`,
    codeExamples: [
      {
        title: 'Full Semantic Blog Post Architecture',
        language: 'html',
        code: `<main>
  <article>
    <header>
      <h1>Architecting Resilient Web Applications</h1>
      <p>Published by <address style="display:inline"><a href="/author/umar">Umar Nazir</a></address> on <time datetime="2026-03-15">March 15, 2026</time></p>
    </header>
    
    <section>
      <h2>Separation of Concerns</h2>
      <p>Decoupling business logic from rendering components yields maintainable systems.</p>
    </section>

    <section>
      <h2>Performance Budgets</h2>
      <p>Enforce strict bundle size budgets during continuous integration pipelines.</p>
    </section>

    <footer>
      <p>Tagged under: <span>Web Architecture</span>, <span>Full Stack</span></p>
    </footer>
  </article>

  <aside aria-label="Supplementary Resources">
    <h3>Related Reading</h3>
    <ul>
      <li><a href="/full-stack/html-complete-guide/accessibility-in-html">Accessibility in HTML</a></li>
      <li><a href="/full-stack/html-complete-guide/html-best-practices">HTML Best Practices</a></li>
    </ul>
  </aside>
</main>`,
        explanation: 'Uses header, article, address, time, section, footer, and aside to present a structured, self-documenting publication.',
        output: 'Renders an accessible article complete with metadata and a supplementary reading sidebar.',
      },
    ],
    stepByStepGuide: [
      {
        step: 1,
        title: 'Identify the Primary Content',
        details: 'Wrap the primary, unique content of the page in a single <main> element. Never use more than one non-hidden <main> per document.',
      },
      {
        step: 2,
        title: 'Encapsulate Standalone Units in <article>',
        details: 'If content makes sense independently (e.g. blog post, card, product review), wrap it in an <article>.',
      },
      {
        step: 3,
        title: 'Group Thematic Content in <section>',
        details: 'Use <section> for chapters or thematic subsections. Each section should ideally begin with a heading (<h2>-<h6>).',
      },
      {
        step: 4,
        title: 'Designate Secondary Content with <aside>',
        details: 'Place related links, advertising, author callouts, or sidebars inside <aside>.',
      },
    ],
    realWorldApplication: 'Google search features (such as Featured Snippets and Google Discover) prioritize semantically organized content because algorithms parse entities with higher confidence.',
    commonMistakes: [
      {
        mistake: 'Using <section> as a generic wrapper for CSS styling instead of a <div>.',
        solution: 'If a wrapper is purely for styling or layout (flex/grid container), use <div>. Reserve <section> for thematic content with headings.',
      },
      {
        mistake: 'Using multiple <main> elements on the same page.',
        solution: 'There must only be one visible <main> element per HTML document.',
      },
    ],
    bestPractices: [
      'Every <section> should ideally have an associated heading element (<h2> through <h6>).',
      'Use <nav> only for major navigation link groups, not for every link list.',
      'Always use <time datetime="YYYY-MM-DD"> for dates to provide machine-readable formatting.',
    ],
    exercises: [
      {
        title: 'Drill 4: Refactor "Div Soup" into Clean Semantic HTML',
        task: 'Take a legacy layout consisting of <div id="nav">, <div class="content">, and <div id="copyright"> and refactor it into clean HTML5 semantic elements.',
        hints: 'Replace div elements with <header>, <nav>, <main>, <article>, and <footer>.',
      },
    ],
    interviewQuestions: [
      {
        question: 'What is the distinction between <article> and <section>?',
        answer: '<article> is intended for self-contained, independently distributable content (e.g., a blog post, comment, or news item) that could be syndicated in an RSS feed. <section> represents a thematic grouping of content, typically with a heading, that forms a part of a larger whole.',
      },
      {
        question: 'How does Semantic HTML improve accessibility for screen reader users?',
        answer: 'Screen readers expose keyboard shortcuts allowing users to jump directly between HTML5 landmarks (<main>, <nav>, <header>, <aside>). When semantic tags are used, blind users can bypass repeated navigation links and immediately jump to the core content without having to tab through dozens of elements.',
      },
    ],
    officialDocs: [
      {
        title: 'MDN Web Docs: HTML Semantic Elements Guide',
        url: 'https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html',
        description: 'Comprehensive overview of semantics in HTML and why semantic markup matters.',
      },
      {
        title: 'W3C Web Accessibility: Landmark Roles and Elements',
        url: 'https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/',
        description: 'Technical guidance on HTML5 landmark regions and assistive screen reader navigation patterns.',
      },
    ],
  },

  // 13. Accessibility in HTML
  'full-stack_html-complete-guide_accessibility-in-html': {
    id: 'accessibility-in-html',
    moduleId: 'html-complete-guide',
    trackId: 'full-stack',
    title: 'Accessibility in HTML',
    slug: 'accessibility-in-html',
    order: 13,
    duration: '70m',
    difficulty: 'Advanced',
    summary: 'Master digital web accessibility: WCAG 2.2 guidelines, WAI-ARIA roles and attributes, keyboard focus management, color contrast, and screen reader testing.',
    definition: 'Web Accessibility (a11y) is the practice of designing and developing web software so that people with visual, motor, auditory, cognitive, or speech disabilities can navigate, perceive, and interact with the platform seamlessly.',
    explanation: 'Accessibility is an essential engineering discipline. Browsers expose an Accessibility Tree to operating system assistive tools (like VoiceOver, NVDA, and JAWS). Using semantic HTML provides accessible names, roles, and states automatically. When custom widgets (such as modals or accordions) are constructed, WAI-ARIA attributes bridge the gap.',
    whyItIsUsed: [
      'Ensures compliance with global legal mandates (ADA Title III, European Accessibility Act, Section 508).',
      'Expands market reach to the 16% of the global population living with recognized disabilities.',
      'Improves UX for all users, including keyboard power users and mobile device operators.',
    ],
    realWorldUseCases: [
      'Building accessible design systems (like Shadcn UI, Radix, or Adobe React Spectrum).',
      'Implementing modal dialogs with keyboard focus traps and Esc key escape triggers.',
      'Ensuring checkout and authentication forms can be completed entirely using keyboard navigation.',
    ],
    objectives: [
      'Understand WCAG 2.2 Level A, AA, and AAA compliance standards',
      'Implement WAI-ARIA roles, states, and properties effectively',
      'Conduct automated accessibility audits using axe-core and Lighthouse',
    ],
    keyConcepts: [
      {
        title: 'The Accessibility Tree (AOM)',
        explanation: 'Browsers parse the DOM and construct a parallel Accessibility Tree containing roles, accessible names, values, and states consumed directly by screen reading engines.',
      },
      {
        title: 'Keyboard Focusability & Tabindex',
        explanation: 'Native interactive elements (button, a, input) are focusable by default. Non-interactive elements can receive programmatic focus via tabindex="-1" or keyboard sequence via tabindex="0".',
      },
      {
        title: 'WAI-ARIA Roles and States',
        explanation: 'ARIA attributes (aria-expanded, aria-hidden, aria-live) communicate real-time dynamic state changes in custom JavaScript widgets to assistive users.',
      },
    ],
    syntaxDefinition: `<!-- Accessible Form Element with ARIA -->
<label for="email-input">Work Email Address</label>
<input 
  id="email-input" 
  type="email" 
  required 
  aria-describedby="email-hint email-error" 
  aria-invalid="false" 
/>
<span id="email-hint" class="hint">We will never share your email.</span>
<span id="email-error" class="error" role="alert" aria-live="assertive"></span>`,
    codeExamples: [
      {
        title: 'Accessible Modal Dialog with HTML5 <dialog>',
        language: 'html',
        code: `<!-- Modern Accessible HTML5 Dialog -->
<button id="open-btn" aria-haspopup="dialog">Edit Profile</button>

<dialog id="profile-dialog" aria-labelledby="dialog-title">
  <form method="dialog">
    <header>
      <h2 id="dialog-title">Edit Personal Details</h2>
      <button type="submit" value="cancel" aria-label="Close dialog">&times;</button>
    </header>
    <main>
      <label for="username">Display Name</label>
      <input type="text" id="username" name="username" value="Umar Nazir" required />
    </main>
    <footer>
      <button type="submit" value="save">Save Changes</button>
    </footer>
  </form>
</dialog>

<script>
  const dialog = document.getElementById('profile-dialog');
  const openBtn = document.getElementById('open-btn');
  
  openBtn.addEventListener('click', () => {
    // Native showModal handles focus trapping and Esc key automatically!
    dialog.showModal();
  });
</script>`,
        explanation: 'Using the native HTML5 <dialog> element provides built-in keyboard focus management, backdrop dimming, and Esc key support.',
        output: 'Renders an accessible modal dialog that traps focus while open and returns focus to the trigger button when closed.',
      },
    ],
    stepByStepGuide: [
      {
        step: 1,
        title: 'Prefer Native HTML Semantics First',
        details: 'The first rule of ARIA: Do not use ARIA if you can use a native HTML element (<button> instead of <div role="button">).',
      },
      {
        step: 2,
        title: 'Provide Explicit Form Labels',
        details: 'Always associate form inputs with <label for="inputId"> or provide an aria-label.',
      },
      {
        step: 3,
        title: 'Verify Keyboard Navigation',
        details: 'Test your application using only the Tab, Enter, Space, and Arrow keys. Ensure focus outlines are clearly visible.',
      },
      {
        step: 4,
        title: 'Include Descriptive Alt Text for Images',
        details: 'Add meaningful alt attributes to informative images; use alt="" (empty string) for decorative graphics.',
      },
    ],
    realWorldApplication: 'Modern web companies audit accessibility in continuous deployment pipelines using tools like @axe-core/playwright to prevent regressions from reaching production.',
    commonMistakes: [
      {
        mistake: 'Using <div onClick="..."> instead of a native <button>.',
        solution: 'Non-interactive elements lack keyboard focusability and role announcements. Always use <button> for clickable actions.',
      },
      {
        mistake: 'Removing focus outlines using CSS (outline: none) without providing an alternative focus ring.',
        solution: 'Never remove default focus indicators without replacing them with high-contrast custom outline styles.',
      },
    ],
    bestPractices: [
      'Ensure a color contrast ratio of at least 4.5:1 for normal text and 3:1 for large text (WCAG AA).',
      'Always test key user workflows with a live screen reader (VoiceOver on Mac: Cmd+F5; NVDA on Windows).',
      'Provide skip-to-content links at the top of the page for keyboard navigators.',
    ],
    exercises: [
      {
        title: 'Drill 5: Audit and Fix an Inaccessible Form',
        task: 'Identify three accessibility issues in a form lacking labels and error announcements, and refactor it to meet WCAG 2.2 AA standards.',
        hints: 'Add explicit <label for=""> attributes, aria-describedby for errors, and role="alert" for live validation announcements.',
      },
    ],
    interviewQuestions: [
      {
        question: 'What is the First Rule of ARIA use?',
        answer: 'The first rule of ARIA states: If you can use a native HTML element or attribute with the semantics and behavior you require already built in, then do so. Do not re-invent an HTML button or link using ARIA unless absolutely necessary.',
      },
      {
        question: 'What is the Accessibility Tree and how do browsers generate it?',
        answer: 'The Accessibility Tree is a parallel representation of the DOM tree constructed by the browser. It contains accessible objects with specific roles, names, states, and values that OS accessibility APIs (like NSAccessibility or UI Automation) expose directly to screen readers.',
      },
    ],
    officialDocs: [
      {
        title: 'W3C Web Content Accessibility Guidelines (WCAG) 2.2',
        url: 'https://www.w3.org/TR/WCAG22/',
        description: 'The international standard specification for digital accessibility compliance.',
      },
      {
        title: 'WebAIM: Web Accessibility in Mind',
        url: 'https://webaim.org/',
        description: 'Articles, contrast checkers, and practical implementation drills for web accessibility developers.',
      },
    ],
  },
};
