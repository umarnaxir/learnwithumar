import { LessonContent } from '@/types/curriculum';

export const HTML_EXTENDED_LESSONS: Record<string, LessonContent> = {
  'full-stack_html-complete-guide_headings-and-paragraphs': {
    id: 'headings-and-paragraphs',
    moduleId: 'html-complete-guide',
    trackId: 'full-stack',
    title: 'Headings and Paragraphs',
    slug: 'headings-and-paragraphs',
    order: 4,
    duration: '35m',
    difficulty: 'Beginner',
    summary: 'Master the typographic hierarchy of HTML documents using h1 through h6 heading tags and structural paragraph elements.',
    definition: 'HTML Headings (<h1> to <h6>) and Paragraphs (<p>) are structural block-level elements that establish semantic document hierarchy, outline structure for assistive technology, and format readable running text.',
    explanation: 'Headings communicate organizational importance. Search engine crawlers and screen readers rely on heading hierarchy to construct a document outline. Heading levels must never be skipped for visual styling—visual appearance should be controlled purely through CSS while HTML strictly reflects semantic ranking.',
    whyItIsUsed: [
      'Establishes an intuitive document outline that allows screen reader users to jump between sections using heading shortcuts (key "H").',
      'Provides primary relevance signals to search engine algorithms analyzing topic hierarchies.',
      'Enforces visual and typographic rhythm across articles, documentation, and web applications.',
      'Separates semantic content structure from responsive visual design.',
    ],
    realWorldUseCases: [
      'Structuring multi-chapter technical documentation with indexed headings.',
      'Formatting blog posts and news articles with clear section titles and lead paragraphs.',
      'Organizing SaaS dashboard panels with accessible h2 and h3 subheadings.',
    ],
    objectives: [
      'Understand the semantic significance of maintaining a strict <h1> through <h6> hierarchy',
      'Learn how screen readers parse heading outlines for in-page navigation',
      'Use the <p> element alongside inline typographic tags like <strong>, <em>, and <br>',
    ],
    keyConcepts: [
      {
        title: 'Single <h1> per Page Rule',
        explanation: 'Every distinct web document should ideally possess exactly one <h1> element representing the main topic or title of that page.',
      },
      {
        title: 'No Heading Skipping',
        explanation: 'Never jump from an <h1> directly to an <h3>. Move sequentially: <h1> -> <h2> -> <h3> to preserve the accessibility tree outline.',
      },
      {
        title: 'Paragraph Block Separation',
        explanation: 'Paragraphs (<p>) represent distinct units of thought. Never chain multiple consecutive <br> tags to simulate paragraph breaks.',
      },
    ],
    syntaxDefinition: `<!-- Typographic Hierarchy -->
<h1>Document Main Title</h1>
<p>Introductory lead paragraph explaining the page context.</p>

<h2>Major Section Heading</h2>
<p>Detailed discussion regarding the primary subject matter.</p>

<h3>Subordinate Subsection</h3>
<p>Specific examples and nuanced explanations.</p>`,
    codeExamples: [
      {
        title: 'Proper Article Heading Outline',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Understanding Serverless Architecture</title>
</head>
<body>
  <article>
    <!-- Primary page headline (Single H1) -->
    <h1>Understanding Serverless Cloud Architecture</h1>
    <p class="lead">Serverless computing allows developers to build and execute code without provisioning or managing physical server infrastructure.</p>

    <!-- First Major Topic (H2) -->
    <h2>1. Core Principles of Serverless</h2>
    <p>In a serverless model, compute resources are allocated dynamically on-demand and billed purely by execution time.</p>

    <!-- Subsection (H3) -->
    <h3>Event-Driven Execution</h3>
    <p>Functions run in ephemeral containers in response to HTTP requests, database events, or scheduled timers.</p>

    <!-- Subsection (H3) -->
    <h3>Automatic Elastic Scaling</h3>
    <p>Cloud providers spin up concurrent runtime instances seamlessly whether serving 1 or 100,000 requests per minute.</p>

    <!-- Second Major Topic (H2) -->
    <h2>2. Trade-offs and Considerations</h2>
    <p>While operationally efficient, serverless architectures introduce cold starts, vendor lock-in, and connection pooling limitations.</p>
  </article>
</body>
</html>`,
        explanation: 'This code example illustrates a clean, non-skipping heading hierarchy. The <h1> identifies the article, <h2> tags segment major chapters, and <h3> tags organize specific sub-topics.',
        output: 'Understanding Serverless Cloud Architecture (h1)\n1. Core Principles of Serverless (h2)\n  - Event-Driven Execution (h3)\n  - Automatic Elastic Scaling (h3)\n2. Trade-offs and Considerations (h2)',
      },
    ],
    stepByStepGuide: [
      { step: 1, title: 'Identify Page Primary Intent', details: 'Formulate one clear, descriptive <h1> that succinctly states what the page is about.' },
      { step: 2, title: 'Outline Major Chapters with <h2>', details: 'Divide the core topic into logical 2 to 5 primary sections marked with <h2>.' },
      { step: 3, title: 'Drill Down with <h3> where Necessary', details: 'If a major section contains sub-items or comparison points, group them beneath <h3>.' },
      { step: 4, title: 'Wrap Explanations in <p>', details: 'Place all prose inside <p> tags rather than bare text or divs to maintain standard line-height and margin spacing.' },
    ],
    realWorldApplication: 'Every production news outlet (BBC, NYT) and tech documentation site (Stripe, MDN) enforces automated CI linting rules (like axe-core and stylelint) verifying that headings never skip levels.',
    commonMistakes: [
      {
        mistake: 'Using heading tags simply to make text bigger or bolder.',
        solution: 'Use CSS font-size and font-weight instead. Headings must reflect semantic structure, not styling.',
      },
      {
        mistake: 'Using multiple <h1> elements across sub-sections.',
        solution: 'Reserve <h1> for the top-level document subject and use <h2> for subsections.',
      },
    ],
    bestPractices: [
      'Maintain exactly one <h1> per web document.',
      'Keep heading text concise, informative, and keyword-relevant for SEO and screen reader users.',
      'Never skip heading levels (e.g. from <h2> directly to <h4>).',
      'Use semantic <p> tags for text; do not emulate paragraphs with double <br> tags.',
    ],
    exercises: [
      {
        title: 'Exercise: Fix the Broken Heading Outline',
        task: 'Refactor a document that jumps from <h1> to <h4> to <h6> into a clean, consecutive <h1>, <h2>, and <h3> outline.',
        hints: 'Inspect the conceptual hierarchy and assign heading levels sequentially.',
      },
    ],
    interviewQuestions: [
      {
        question: 'Why is heading level skipping considered an accessibility failure under WCAG?',
        answer: 'Screen reader users commonly navigate web pages by jumping through heading levels. Skipping levels (e.g., from <h2> directly to <h4>) causes blind users to wonder if they missed critical parent content, breaking their mental model of document structure.',
      },
    ],
    officialDocs: [
      {
        title: 'MDN Web Docs: Heading Elements (h1-h6)',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements',
        description: 'Comprehensive technical specification and accessibility notes for HTML heading tags.',
      },
    ],
  },

  'full-stack_html-complete-guide_links-and-navigation': {
    id: 'links-and-navigation',
    moduleId: 'html-complete-guide',
    trackId: 'full-stack',
    title: 'Links and Navigation',
    slug: 'links-and-navigation',
    order: 5,
    duration: '45m',
    difficulty: 'Beginner',
    summary: 'Master anchor elements (<a>), hyperlinking, internal hash fragments, absolute vs relative paths, and security attributes like rel="noopener noreferrer".',
    definition: 'The HTML Anchor Element (<a>) creates hyperlinks to other web pages, files, email addresses, phone numbers, or locations within the same page, establishing the foundational connected topology of the World Wide Web.',
    explanation: 'Hyperlinks are the defining feature of the web. An anchor element requires the href attribute to become interactive. Modern security best practices mandate using rel="noopener noreferrer" whenever links open in a new tab (target="_blank") to protect against tab-nabbing vulnerabilities and memory sharing.',
    whyItIsUsed: [
      'Enables non-linear browsing across billions of interconnected web pages.',
      'Allows smooth in-page navigation using internal fragment identifiers (#section-id).',
      'Provides protocol handlers for triggering native communication apps (mailto:, tel:).',
      'Guides web search crawlers as they discover and index page relationships.',
    ],
    realWorldUseCases: [
      'Primary website navigation headers and footer links.',
      'Documentation table of contents jumping directly to section anchors.',
      'Direct call-to-action buttons connecting to external checkout or registration URLs.',
      'One-click phone calls and email links on contact pages.',
    ],
    objectives: [
      'Master the href attribute syntax for absolute, relative, and protocol-specific links',
      'Understand target="_blank" and the required security attribute rel="noopener noreferrer"',
      'Build internal page fragment links using HTML id attributes',
      'Learn the download attribute for direct file downloads',
    ],
    keyConcepts: [
      {
        title: 'Absolute vs Relative URLs',
        explanation: 'Absolute URLs include the complete protocol and domain (https://example.com/about). Relative URLs (/about or ../blog) resolve relative to the current site origin or current directory.',
      },
      {
        title: 'Security: Reverse Tab-Nabbing',
        explanation: 'Opening links with target="_blank" without rel="noopener" grants the target page access to window.opener, enabling malicious sites to redirect your tab to phishing pages.',
      },
      {
        title: 'Accessible Link Text',
        explanation: 'Link text should be meaningful out of context. Never use generic labels like "Click here" or "Read more". Instead, use descriptive phrases like "Download the 2026 Annual Report (PDF)".',
      },
    ],
    syntaxDefinition: `<!-- Standard Anchor Tag Syntax -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">Visit Example</a>

<!-- Internal Hash Fragment Anchor -->
<a href="#target-section">Jump to Section</a>

<!-- Native Protocol Schemes -->
<a href="mailto:support@learnwithumar.com">Email Support</a>
<a href="tel:+18005550199">Call Support</a>`,
    codeExamples: [
      {
        title: 'Comprehensive Linking & Navigation Patterns',
        language: 'html',
        code: `<!-- 1. External Link with Security Flags -->
<p>
  Read the official documentation on
  <a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">
    MDN Web Docs (opens in new tab)
  </a>.
</p>

<!-- 2. Internal Relative Navigation -->
<nav aria-label="Main Navigation">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/learning-paths">Learning Paths</a></li>
    <li><a href="/docs">Documentation</a></li>
  </ul>
</nav>

<!-- 3. In-Page Fragment Navigation -->
<p><a href="#frequently-asked-questions">Jump to FAQ section ↓</a></p>

<div style="height: 400px;"><!-- spacer --></div>

<section id="frequently-asked-questions">
  <h2>Frequently Asked Questions</h2>
  <p>Answers to common developer questions.</p>
  <a href="#top">Back to top ↑</a>
</section>

<!-- 4. Direct File Download Link -->
<p>
  <a href="/downloads/curriculum-guide.pdf" download="learnwithumar-curriculum.pdf">
    Download Curriculum Guide (PDF, 2.4MB)
  </a>
</p>`,
        explanation: 'This example illustrates external security links, internal site navigation, in-page hash jumps with smooth target ids, and direct file downloads.',
        output: 'Interactive hyperlinks rendered with underline accents, protocol-specific triggers, and accessibility annotations.',
      },
    ],
    stepByStepGuide: [
      { step: 1, title: 'Specify the Destination via href', details: 'Always provide a valid URL, relative route, or fragment identifier in the href attribute.' },
      { step: 2, title: 'Craft Descriptive Link Text', details: 'Ensure the link text describes exactly where the user will be taken.' },
      { step: 3, title: 'Apply Security Attributes for New Tabs', details: 'Whenever using target="_blank", explicitly append rel="noopener noreferrer".' },
      { step: 4, title: 'Test Keyboard Focus and Tab Order', details: 'Verify that pressing the Tab key focuses the anchor and pressing Enter activates it.' },
    ],
    realWorldApplication: 'Modern web frameworks (Next.js Link, React Router) build directly on HTML anchor semantics while intercepting client clicks to prevent unnecessary full-page browser reloads.',
    commonMistakes: [
      {
        mistake: 'Using <a href="#"> or <a href="javascript:void(0)"> for JavaScript buttons.',
        solution: 'Use native <button type="button"> for UI actions that do not navigate to a new URL.',
      },
      {
        mistake: 'Writing "click here" or "learn more" as link text.',
        solution: 'Make link text descriptive: "Explore Full Stack Web Development Curriculum".',
      },
    ],
    bestPractices: [
      'Always add rel="noopener noreferrer" whenever using target="_blank".',
      'Use descriptive anchor text rather than generic calls to action.',
      'Ensure in-page jump targets match existing element IDs (#section-name -> id="section-name").',
      'Include file type and size indicators in download links for user clarity.',
    ],
    exercises: [
      {
        title: 'Exercise: Build a Semantic In-Page Table of Contents',
        task: 'Create an article with 4 major sections and a top table of contents where each item jumps to its respective section id.',
        hints: 'Use <a href="#section-1"> and match it with <section id="section-1">.',
      },
    ],
    interviewQuestions: [
      {
        question: 'What security vulnerability does rel="noopener noreferrer" prevent?',
        answer: 'It prevents reverse tab-nabbing. Without noopener, the opened page has access to window.opener and can execute window.opener.location = "https://phishing.com", replacing your trusted original page with a malicious clone while the user is looking at the new tab.',
      },
      {
        question: 'When should you use an anchor (<a>) versus a button (<button>)?',
        answer: 'Use an <a> tag when navigating to a new URL, a different page, or an in-page section anchor. Use a <button> when triggering a JavaScript behavior or UI state change (opening a modal, submitting a form, toggling a drawer) that does not change the URL.',
      },
    ],
    officialDocs: [
      {
        title: 'MDN Web Docs: The Anchor Element (<a>)',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a',
        description: 'Complete technical reference for HTML links, protocols, security flags, and attributes.',
      },
    ],
  },
};
