import { CodeSnippet, StrategyWorkflow } from '@/types/curriculum';

export interface TopicDomainKnowledge {
  definition: string;
  explanation: string;
  whyItIsUsed: string[];
  realWorldUseCases: string[];
  keyConcepts: { title: string; explanation: string }[];
  syntaxDefinition: string;
  codeSnippet?: CodeSnippet;
  strategyWorkflow?: StrategyWorkflow;
  stepByStepGuide: { step: number; title: string; details: string }[];
  realWorldApplication: string;
  commonMistakes: { mistake: string; solution: string }[];
  bestPractices: string[];
  exercise: { title: string; task: string; hints?: string };
  interviewQuestions: { question: string; answer: string }[];
  officialDocs: { title: string; url: string; description: string }[];
}

export function getDomainKnowledge(
  trackId: 'full-stack' | 'digital-marketing',
  moduleId: string,
  topicId: string,
  topicTitle: string
): TopicDomainKnowledge {
  const isDev = trackId === 'full-stack';
  const tId = (topicId || '').toLowerCase();
  const mId = (moduleId || '').toLowerCase();

  // 1. CSS & STYLING DOMAIN
  if (mId.includes('css') || tId.includes('css') || tId.includes('flexbox') || tId.includes('grid') || tId.includes('selector') || tId.includes('media-quer') || tId.includes('box-model')) {
    return {
      definition: `${topicTitle} is a foundational CSS architecture specification that dictates how browser layout engines calculate box geometry, cascading priorities, visual rendering rules, and responsive screen adaptability.`,
      explanation: `Mastering ${topicTitle} requires understanding the browser rendering pipeline: parsing HTML/CSS, computing the cascade tree, resolving computed styles, and executing layout (reflow) and paint operations. Modern CSS emphasizes fluid intrinsic layouts, container queries, and hardware-accelerated transform properties.`,
      whyItIsUsed: [
        `Provides fine-grained control over document styling without polluting markup with inline styles or brittle fixed-pixel overrides.`,
        `Enables responsive, mobile-first design across smartphones, tablets, high-resolution desktop monitors, and foldables.`,
        `Optimizes browser rendering performance by leveraging GPU-accelerated compositing layers rather than triggering expensive CPU reflows.`,
        `Promotes design system consistency through custom properties (variables), design tokens, and modular cascade layers.`,
      ],
      realWorldUseCases: [
        `Constructing responsive fluid navigation bars and sticky headers.`,
        `Engineering dynamic 12-column responsive dashboard grids with auto-fit and minmax() constraints.`,
        `Designing interactive UI micro-interactions, smooth hover transitions, and accessible focus states.`,
      ],
      keyConcepts: [
        {
          title: `The Cascade & Specificity Calculation`,
          explanation: `CSS resolves conflicting declarations using origin, cascade layers (@layer), specificity weight (Inline > ID > Class > Element), and source order.`,
        },
        {
          title: `Box Model Geometry`,
          explanation: `Every rendered element consists of content, padding, border, and margin. Configuring box-sizing: border-box ensures padding and borders are absorbed inside defined dimensions.`,
        },
        {
          title: `Hardware Acceleration & Composite Layers`,
          explanation: `Animating transform (translate, scale, rotate) and opacity allows the browser to bypass layout and paint steps, offloading rendering directly to the GPU for silky 60fps animations.`,
        },
      ],
      syntaxDefinition: `/* Modern CSS Declaration Pattern for ${topicTitle} */
.component-container {
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 2vw, 2.5rem);
  box-sizing: border-box;
  padding: 1.5rem;
  background-color: var(--surface-bg, #FFFFFF);
  border: 1px solid var(--border-color, #EAEAEA);
  border-radius: 0.5rem;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
}

.component-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
}`,
      codeSnippet: {
        title: `Production Implementation: ${topicTitle}`,
        language: 'css',
        code: `/* Responsive Component Architecture */
:root {
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --color-primary: #000000;
  --color-border: #EAEAEA;
}

.responsive-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
  width: 100%;
  max-width: 1200px;
  margin-inline: auto;
}

.card-item {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-lg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: #ffffff;
  transition: border-color 0.15s ease, transform 0.2s ease;
}

.card-item:hover {
  border-color: var(--color-primary);
  transform: translateY(-2px);
}

@media (prefers-reduced-motion: reduce) {
  .card-item {
    transition: none;
  }
}`,
        explanation: `This CSS snippet creates an intrinsically responsive grid layout using auto-fit and minmax(), completely eliminating the need for brittle media queries while respecting the user's reduced-motion preferences.`,
        output: 'Intrinsically responsive cards automatically wrapping based on available container width with zero horizontal overflow.',
      },
      stepByStepGuide: [
        { step: 1, title: 'Analyze Layout Requirements', details: `Determine whether a 1D layout (Flexbox) or 2D layout (Grid) is appropriate for ${topicTitle}.` },
        { step: 2, title: 'Establish Design Tokens & Custom Properties', details: 'Define reusable variables for spacing, color scales, and typography to maintain consistency.' },
        { step: 3, title: 'Apply Mobile-First Base Rules', details: 'Write foundational CSS for small viewports first, using min-width media queries or fluid clamp() functions for larger screens.' },
        { step: 4, title: 'Audit Performance & Accessibility', details: 'Verify responsive behavior across device widths (320px to 1440px) and check contrast ratios (minimum 4.5:1).' },
      ],
      realWorldApplication: `Every modern tech platform (Vercel, Airbnb, GitHub) utilizes automated CSS linting (stylelint) and CSS variables to enforce design system consistency while maintaining responsive performance across billions of daily page impressions.`,
      commonMistakes: [
        {
          mistake: `Hardcoding fixed pixel widths (e.g. width: 1200px) on container elements.`,
          solution: `Use max-width: 1200px combined with width: 100% and margin-inline: auto to prevent mobile viewport overflow.`,
        },
        {
          mistake: `Overusing !important to override specificity conflicts.`,
          solution: `Refactor CSS architecture to use consistent low-specificity class names (BEM) or modern cascade layers (@layer).`,
        },
      ],
      bestPractices: [
        `Always set box-sizing: border-box globally across all elements.`,
        `Use fluid typography and clamp() for proportional scaling across viewports.`,
        `Favor CSS Grid for page layouts and Flexbox for component-level alignment.`,
        `Respect accessibility preferences using @media (prefers-reduced-motion: reduce).`,
      ],
      exercise: {
        title: `Practical Exercise: ${topicTitle}`,
        task: `Build a clean, responsive component demonstrating the core concepts of ${topicTitle}. Test it on both a 375px mobile viewport and a 1440px desktop monitor.`,
        hints: `Use CSS custom properties for spacing and clamp() for fluid sizing.`,
      },
      interviewQuestions: [
        {
          question: `How does CSS specificity work and how are specificity weights calculated?`,
          answer: `Specificity is a weight calculation represented as a 3-part tuple (A, B, C): A = ID selectors (#id), B = class, attribute, and pseudo-class selectors (.class, [type], :hover), and C = element and pseudo-element selectors (div, p, ::before). Inline styles override stylesheets, and !important overrides standard specificity rules.`,
        },
        {
          question: `What is the difference between Flexbox and CSS Grid, and when should you choose one over the other?`,
          answer: `Flexbox is one-dimensional: it aligns items along a single axis (either row or column). CSS Grid is two-dimensional: it controls both rows and columns simultaneously. Choose Flexbox for navigation bars, button groups, and linear content flows; choose Grid for complex page shells, photo galleries, and card grids.`,
        },
      ],
      officialDocs: [
        {
          title: 'MDN Web Docs: CSS Reference & Guide',
          url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
          description: 'Official Mozilla reference covering CSS properties, layout specifications, and browser compatibility tables.',
        },
        {
          title: 'W3C CSS Specifications Working Group',
          url: 'https://www.w3.org/Style/CSS/',
          description: 'The international standard specification defining modern CSS properties, layout engines, and color modules.',
        },
      ],
    };
  }

  // 2. JAVASCRIPT & TYPESCRIPT DOMAIN
  if (mId.includes('javascript') || mId.includes('typescript') || tId.includes('js') || tId.includes('async') || tId.includes('promise') || tId.includes('closure') || tId.includes('array') || tId.includes('object') || tId.includes('dom') || tId.includes('type') || tId.includes('interface')) {
    return {
      definition: `${topicTitle} is an essential programming construct and runtime specification in modern JavaScript and TypeScript that governs variable scoping, execution contexts, data transformation, and type safety across web runtimes.`,
      explanation: `Writing professional JavaScript and TypeScript requires mastering memory allocation, execution contexts, the event loop, and immutable data flow. In TypeScript, compile-time type verification eliminates runtime bugs, guarantees API response contracts, and accelerates developer velocity.`,
      whyItIsUsed: [
        `Prevents unexpected runtime crashes by catching undefined references and type mismatches during development.`,
        `Improves code clarity, self-documentation, and refactoring safety across large-scale enterprise engineering teams.`,
        `Enables efficient asynchronous network requests without blocking the browser main rendering thread.`,
        `Leverages modern ECMAScript specifications to write clean, declarative, and maintainable business logic.`,
      ],
      realWorldUseCases: [
        `Transforming and filtering large datasets fetched from REST or GraphQL backend APIs.`,
        `Managing user interactions, dynamic form validation, and reactive UI state changes.`,
        `Enforcing strict domain model interfaces and DTOs (Data Transfer Objects) across full-stack applications.`,
      ],
      keyConcepts: [
        {
          title: 'Execution Context & Call Stack',
          explanation: 'JavaScript executes code inside execution contexts (Creation phase and Execution phase). Functions are pushed onto the call stack and popped off as they return.',
        },
        {
          title: 'Immutability & Pure Functions',
          explanation: 'Treating objects and arrays as immutable prevents unintended side effects. Instead of mutating in-place, modern patterns return fresh copies with updated values.',
        },
        {
          title: 'Type Safety & Structural Typing (TypeScript)',
          explanation: 'TypeScript uses structural typing ("duck typing"). If two objects share the required shape and property types, they are structurally compatible.',
        },
      ],
      syntaxDefinition: `// Standard TypeScript Implementation Pattern for ${topicTitle}
interface UserRecord {
  readonly id: string;
  name: string;
  email: string;
  role: 'admin' | 'engineer' | 'student';
}

export function processUserData(users: readonly UserRecord[]): Record<string, UserRecord[]> {
  return users.reduce<Record<string, UserRecord[]>>((acc, user) => {
    const key = user.role;
    acc[key] = acc[key] || [];
    acc[key].push(user);
    return acc;
  }, {});
}`,
      codeSnippet: {
        title: `Practical Implementation: ${topicTitle}`,
        language: 'typescript',
        code: `// Type-safe asynchronous data pipeline demonstrating ${topicTitle}
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
  inStock: boolean;
}

export async function fetchFilteredProducts(
  apiUrl: string,
  minPrice: number
): Promise<Product[]> {
  try {
    const response = await fetch(apiUrl, {
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      throw new Error(\`Network request failed with status: \${response.status}\`);
    }

    const json: ApiResponse<Product[]> = await response.json();
    
    // Declarative array transformation
    return json.data
      .filter((product) => product.inStock && product.price >= minPrice)
      .sort((a, b) => a.price - b.price);
  } catch (error) {
    console.error('Failed to process products for ${topicTitle}:', error);
    return [];
  }
}`,
        explanation: `This production-ready TypeScript snippet demonstrates strict typing with generics, safe async/await error handling, and declarative array method chaining (.filter and .sort).`,
        output: '[ { id: 104, title: "Next.js Architecture Guide", price: 49.99, inStock: true } ]',
      },
      stepByStepGuide: [
        { step: 1, title: 'Define Type Contracts', details: 'Formulate explicit interfaces or types defining input shapes and expected return signatures.' },
        { step: 2, title: 'Implement Pure Logic', details: 'Write modular functions avoiding global state mutation and relying strictly on explicit arguments.' },
        { step: 3, title: 'Handle Edge Cases & Nullability', details: 'Guard against undefined values using optional chaining (?.) and nullish coalescing (??).' },
        { step: 4, title: 'Test Execution with Automated Asserts', details: 'Verify functionality against multiple test cases including empty inputs and error responses.' },
      ],
      realWorldApplication: `Tech companies (Netflix, Stripe, Microsoft) write 100% of their production frontend and backend services in TypeScript, enforcing strict mode (noImplicitAny, strictNullChecks) to eliminate entire classes of runtime defects.`,
      commonMistakes: [
        {
          mistake: `Using 'any' type in TypeScript to bypass compiler errors.`,
          solution: `Use 'unknown' combined with type guards (typeof, instanceof, or custom type predicates) to validate data safely.`,
        },
        {
          mistake: `Mutating state arrays directly with push(), pop(), or splice() in reactive frameworks.`,
          solution: `Use non-mutating methods like map(), filter(), or the spread operator ([...arr, newItem]) to return new references.`,
        },
      ],
      bestPractices: [
        `Always enable TypeScript strict mode in tsconfig.json.`,
        `Prefer const declarations over let; completely avoid var.`,
        `Use async/await with try/catch blocks instead of raw .then() promise callbacks.`,
        `Leverage destructuring with default parameters for readable function arguments.`,
      ],
      exercise: {
        title: `Practical Exercise: ${topicTitle}`,
        task: `Create a type-safe function implementing the mechanics of ${topicTitle}. Ensure full type checking with no 'any' types and test with valid and invalid inputs.`,
        hints: `Use TypeScript interfaces and explicit return type annotations.`,
      },
      interviewQuestions: [
        {
          question: `What is the Event Loop in JavaScript and how does it manage the Call Stack and Task Queues?`,
          answer: `JavaScript is single-threaded. Synchronous code runs immediately on the Call Stack. Asynchronous tasks (timers, fetch) are delegated to browser Web APIs. When complete, their callbacks enter the Microtask Queue (Promises, queueMicrotask) or Macrotask Queue (setTimeout, I/O). The Event Loop prioritizes the microtask queue, draining it completely before processing macrotasks.`,
        },
        {
          question: `What is a Closure in JavaScript and what is a practical production use case?`,
          answer: `A closure is the combination of a function bundled together with references to its surrounding lexical environment. In practical software engineering, closures are used for data encapsulation (private variables), function currying, memoization caches, and event handler state retention.`,
        },
      ],
      officialDocs: [
        {
          title: 'MDN Web Docs: JavaScript Reference',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
          description: 'Comprehensive technical documentation for standard built-in objects, syntax, and Web APIs.',
        },
        {
          title: 'TypeScript Official Documentation',
          url: 'https://www.typescriptlang.org/docs/',
          description: 'The official TypeScript handbook covering types, generics, utility types, and compiler configuration.',
        },
      ],
    };
  }

  // 3. REACT & NEXT.JS DOMAIN
  if (mId.includes('react') || mId.includes('next') || tId.includes('react') || tId.includes('next') || tId.includes('component') || tId.includes('hook') || tId.includes('app-router')) {
    return {
      definition: `${topicTitle} is an advanced frontend architecture specification in React 19 and Next.js App Router that governs declarative component composition, reactive state lifecycles, and hybrid server/client execution.`,
      explanation: `React represents UI as a pure function of state. In Next.js App Router, components default to React Server Components (RSC), executing purely on the server with zero client bundle footprint. Client Components ('use client') provide interactive state and browser event listeners.`,
      whyItIsUsed: [
        `Dramatically improves web performance and Core Web Vitals (LCP, FID/INP) by pre-rendering HTML on the edge/server.`,
        `Eliminates massive client-side JavaScript bundle sizes by keeping heavy dependencies and data fetching on the server.`,
        `Provides an intuitive declarative mental model with unidirectional data flow and automatic DOM updates.`,
        `Enables seamless full-stack web applications with nested layouts, streaming SSR, and built-in API route handlers.`,
      ],
      realWorldUseCases: [
        `Building complex interactive web applications (SaaS dashboards, e-commerce checkouts).`,
        `Streaming real-time data using React Suspense boundaries without blocking the entire page.`,
        `Managing complex multi-step application forms with optimistic UI updates.`,
      ],
      keyConcepts: [
        {
          title: 'Server Components vs Client Components',
          explanation: 'Server Components run only on the server, can directly query databases, and add 0kb to client JS. Client Components opt into client hydration with "use client" for state and event handling.',
        },
        {
          title: 'The React Reconciliation Lifecycle',
          explanation: 'React compares new Virtual DOM trees with previous trees using its Fiber reconciler, calculating the minimal set of DOM operations required to update the UI.',
        },
        {
          title: 'Rules of React Hooks',
          explanation: 'Only call Hooks at the top level of React functions; never call them inside loops, conditions, or nested functions to ensure hook call order consistency.',
        },
      ],
      syntaxDefinition: `// React 19 / Next.js Component Pattern for ${topicTitle}
'use client';

import React, { useState, useTransition } from 'react';

interface ComponentProps {
  initialTitle: string;
  onUpdate?: (newTitle: string) => void;
}

export function ModernFeatureComponent({ initialTitle, onUpdate }: ComponentProps) {
  const [title, setTitle] = useState(initialTitle);
  const [isPending, startTransition] = useTransition();

  const handleAction = () => {
    startTransition(() => {
      const updated = title.trim();
      setTitle(updated);
      onUpdate?.(updated);
    });
  };

  return (
    <div className="component-box">
      <h2>{title}</h2>
      <button onClick={handleAction} disabled={isPending}>
        {isPending ? 'Updating...' : 'Confirm Update'}
      </button>
    </div>
  );
}`,
      codeSnippet: {
        title: `Full-Stack React & Next.js Pattern: ${topicTitle}`,
        language: 'tsx',
        code: `// Production React 19 Server/Client Composition
import React, { Suspense } from 'react';

interface MetricData {
  label: string;
  value: number;
}

// Server Component fetching data directly
async function MetricsDisplay() {
  // Direct server-side data access (0kb client bundle)
  const metrics: MetricData[] = [
    { label: 'Active Users', value: 1420 },
    { label: 'Conversion Rate', value: 3.4 },
  ];

  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      {metrics.map((m) => (
        <div key={m.label} style={{ padding: '12px', border: '1px solid #EAEAEA' }}>
          <div style={{ fontSize: '20px', fontWeight: 700 }}>{m.value}</div>
          <div style={{ fontSize: '11px', color: '#666666' }}>{m.label}</div>
        </div>
      ))}
    </div>
  );
}

export default function AnalyticsDashboardPage() {
  return (
    <main style={{ padding: '32px' }}>
      <h1>Enterprise Analytics Dashboard</h1>
      <Suspense fallback={<div>Loading live metrics...</div>}>
        <MetricsDisplay />
      </Suspense>
    </main>
  );
}`,
        explanation: `This Next.js App Router code demonstrates React Server Components fetching data directly on the server without client useEffect boilerplate, wrapped in Suspense for instant streaming.`,
        output: 'Instantly rendered HTML with zero client JavaScript hydration overhead for the static metric cards.',
      },
      stepByStepGuide: [
        { step: 1, title: 'Establish Component Boundary', details: 'Determine whether the component needs client interactivity (useState, onClick) or can remain a pure Server Component.' },
        { step: 2, title: 'Define Typed Props Interface', details: 'Specify TypeScript interfaces for all component inputs and callback handlers.' },
        { step: 3, title: 'Manage Reactive State & Hooks', details: 'Structure state cleanly, keeping state as local as possible to minimize unnecessary parent re-renders.' },
        { step: 4, title: 'Verify Performance & DevTools Profiling', details: 'Use React DevTools Profiler to ensure memoization boundaries prevent cascading render trees.' },
      ],
      realWorldApplication: `Companies like OpenAI, Target, and Hulu build their consumer web platforms with Next.js App Router to achieve near-instant initial page loads and sub-second route transitions.`,
      commonMistakes: [
        {
          mistake: `Adding 'use client' at the top of every file unnecessarily.`,
          solution: `Keep components as Server Components by default; push 'use client' down to the smallest interactive leaf nodes.`,
        },
        {
          mistake: `Missing dependencies in useEffect or useCallback dependency arrays.`,
          solution: `Always include every variable referenced inside the effect in the dependency array or refactor to avoid the effect entirely.`,
        },
      ],
      bestPractices: [
        `Default to React Server Components for maximum performance and zero client bundle size.`,
        `Colocate component state with where it is consumed; avoid global state for local UI.`,
        `Use React Suspense to stream independent parts of the page progressively.`,
        `Always provide unique, stable keys when rendering collections of elements.`,
      ],
      exercise: {
        title: `Practical Exercise: ${topicTitle}`,
        task: `Build a clean React component adhering to the specifications of ${topicTitle}. Include loading and error states and verify proper TypeScript compilation.`,
        hints: `Use React 19 patterns with proper props typing and state management.`,
      },
      interviewQuestions: [
        {
          question: `What are React Server Components (RSC) and how do they differ from traditional Client-Side Rendering (CSR) or SSR?`,
          answer: `Traditional SSR renders HTML on the server, but still sends the entire JavaScript bundle to the browser to hydrate the page. React Server Components execute ONLY on the server and their dependencies are never downloaded by the browser, reducing JavaScript bundle size to zero for server components while allowing direct access to databases and backend files.`,
        },
        {
          question: `What causes an infinite loop in a React useEffect hook and how do you prevent it?`,
          answer: `An infinite loop occurs when an effect updates a state variable that triggers a re-render, and that state variable (or an object/function reference created on every render) is listed in the effect's dependency array. To prevent it, use functional state updates (setCount(prev => prev + 1)), memoize objects with useMemo/useCallback, or remove unnecessary dependencies.`,
        },
      ],
      officialDocs: [
        {
          title: 'React Official Documentation (react.dev)',
          url: 'https://react.dev',
          description: 'The official interactive guides and API references for modern React 19 architecture.',
        },
        {
          title: 'Next.js App Router Documentation',
          url: 'https://nextjs.org/docs/app',
          description: 'Official Next.js documentation for routing, Server Components, data fetching, and layouts.',
        },
      ],
    };
  }

  // 4. BACKEND, DATABASES, & DEVOPS DOMAIN
  if (isDev) {
    return {
      definition: `${topicTitle} is an enterprise software engineering specification governing backend architectures, database persistence, API protocols, and DevOps infrastructure pipelines.`,
      explanation: `Building scalable web applications demands rock-solid backend services. From transactional ACID compliance in PostgreSQL databases to stateless microservice routing and Docker containerization, engineers adhere to strict design patterns to deliver high availability, low latency, and deterministic security.`,
      whyItIsUsed: [
        `Guarantees data persistence, transactional integrity, and consistency under high concurrent read/write loads.`,
        `Protects sensitive user data with industry-standard cryptographic hashing, JWT authentication, and RBAC authorization.`,
        `Establishes predictable API contracts allowing independent deployment of frontend web apps, mobile apps, and microservices.`,
        `Automates continuous integration and continuous deployment (CI/CD) pipelines with reproducible Docker environments.`,
      ],
      realWorldUseCases: [
        `Designing normalized relational databases (PostgreSQL) with foreign key constraints and composite indexes.`,
        `Building secure RESTful and GraphQL API gateways with token authentication and rate limiting.`,
        `Deploying containerized microservices to cloud infrastructure with automated zero-downtime rolling updates.`,
      ],
      keyConcepts: [
        {
          title: 'ACID Guarantees in Databases',
          explanation: 'Atomicity (all or nothing), Consistency (valid states), Isolation (concurrent transactions do not interfere), and Durability (committed data survives crashes).',
        },
        {
          title: 'Stateless Service Architecture',
          explanation: 'App servers store no local session state in memory; session tokens or JWTs allow any server behind a load balancer to handle incoming requests seamlessly.',
        },
        {
          title: 'Containerization & Reproducibility (Docker)',
          explanation: 'Containers package application source code, runtime binaries, system libraries, and configurations into an immutable image that runs identically across dev and production.',
        },
      ],
      syntaxDefinition: `// Standard Production Architecture Pattern for ${topicTitle}
import { Request, Response, NextFunction } from 'express';

export async function serviceHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    // Execute domain operation
    const result = { id, status: 'processed', timestamp: new Date().toISOString() };
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}`,
      codeSnippet: {
        title: `Production Implementation: ${topicTitle}`,
        language: 'typescript',
        code: `// Production Service Architecture demonstrating ${topicTitle}
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateAccountDTO {
  email: string;
  name: string;
}

export class AccountService {
  public static async createAccount(dto: CreateAccountDTO) {
    // 1. Transactional validation
    const existing = await prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });

    if (existing) {
      throw new Error('An account with this email already exists.');
    }

    // 2. Persistent atomic write
    return await prisma.user.create({
      data: {
        email: dto.email.toLowerCase(),
        name: dto.name,
        role: 'STUDENT',
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });
  }
}`,
        explanation: `This modular service encapsulates business logic for ${topicTitle}, enforcing data normalization, unique constraints, and returning sanitized response schemas without leaking password hashes.`,
        output: '{ id: "usr_991", email: "student@learnwithumar.com", name: "Alex", createdAt: "2026-11-19T00:00:00.000Z" }',
      },
      stepByStepGuide: [
        { step: 1, title: 'Define Schema & Data Contract', details: 'Model database tables or API schemas with strict column constraints, indexes, and relationship keys.' },
        { step: 2, title: 'Implement Service Layer Logic', details: 'Encapsulate database queries and business logic inside dedicated service classes rather than route handlers.' },
        { step: 3, title: 'Add Validation & Security Middleware', details: 'Sanitize all incoming client parameters and verify authentication headers before executing database writes.' },
        { step: 4, title: 'Write Unit & Integration Tests', details: 'Test endpoints with mock databases and edge-case payloads to ensure predictable error handling.' },
      ],
      realWorldApplication: `High-scale platforms (Uber, Amazon, Stripe) maintain microservices handling millions of requests per second using strong type contracts, connection pooling, and automated Docker CI/CD deployments.`,
      commonMistakes: [
        {
          mistake: `Storing plain-text passwords or secret API keys in Git repositories.`,
          solution: `Always hash passwords using bcrypt/argon2 and load environment secrets via environment variables (.env.local, AWS Secrets Manager).`,
        },
        {
          mistake: `Performing database queries inside loops (the N+1 query problem).`,
          solution: `Use SQL JOINs or ORM eager loading (include / relations) to fetch related data in a single batched query.`,
        },
      ],
      bestPractices: [
        `Always sanitize and validate external user input before querying databases.`,
        `Use database transactions when updating multiple related tables to prevent partial writes.`,
        `Log structured JSON errors with correlation IDs for efficient production debugging.`,
        `Pin container dependencies and base images to specific LTS versions in Dockerfiles.`,
      ],
      exercise: {
        title: `Practical Exercise: ${topicTitle}`,
        task: `Design and implement a robust module demonstrating the principles of ${topicTitle}. Include error handling, input validation, and clear status responses.`,
        hints: `Follow the step-by-step guide and code example above to structure your solution.`,
      },
      interviewQuestions: [
        {
          question: `What is the N+1 problem in databases and how do you resolve it?`,
          answer: `The N+1 problem occurs when an application executes 1 query to fetch a list of N parent records, and then executes N additional individual queries to fetch children for each record. It is resolved by using JOIN queries, SQL IN clauses, or ORM eager loading/batching to retrieve all related records in 1 or 2 consolidated queries.`,
        },
        {
          question: `What is the difference between Authentication (AuthN) and Authorization (AuthZ)?`,
          answer: `Authentication verifies WHO a user is (e.g., verifying an email and password or OAuth token). Authorization verifies WHAT that authenticated user has permission to do (e.g., checking if the user has an 'admin' role allowing them to delete database records).`,
        },
      ],
      officialDocs: [
        {
          title: 'Node.js Official Documentation',
          url: 'https://nodejs.org/docs/',
          description: 'Official API documentation for Node.js runtime, asynchronous I/O, events, and core libraries.',
        },
        {
          title: 'PostgreSQL Official Documentation',
          url: 'https://www.postgresql.org/docs/',
          description: 'Comprehensive technical reference for PostgreSQL relational database management and SQL dialects.',
        },
      ],
    };
  }

  // 5. DIGITAL MARKETING DOMAIN (SEO, ADS, ANALYTICS, GROWTH)
  return {
    definition: `${topicTitle} is a quantitative digital marketing framework and strategic methodology designed to systematically capture target market demand, optimize customer acquisition costs (CAC), and maximize customer lifetime value (LTV).`,
    explanation: `Modern digital marketing is an empirical science integrating search engine algorithms, multi-platform media buying, behavioral conversion psychology, and multi-touch attribution. Instead of subjective vanity metrics, performance marketing relies on verified data, structured split-testing, and measurable return on ad spend (ROAS).`,
    whyItIsUsed: [
      `Eliminates marketing budget waste by targeting high-intent prospect cohorts with algorithmic precision.`,
      `Establishes predictable customer acquisition funnels for SaaS products, e-commerce stores, and enterprise agencies.`,
      `Builds compounding organic discovery through technical search engine compliance and content authority.`,
      `Provides transparent attribution reporting connecting marketing ad spend directly to verified company revenue.`,
    ],
    realWorldUseCases: [
      `Executing full-funnel paid media campaigns across Google Search, Shopping, and Meta Ads.`,
      `Conducting technical website audits to optimize Core Web Vitals, crawl budget, and organic search rankings.`,
      `Building automated lead nurturing workflows and high-converting landing pages that improve conversion rates by 25-40%.`,
    ],
    keyConcepts: [
      {
        title: 'Search Intent & Audience Segmentation',
        explanation: 'Prospects exhibit distinct intents: Informational (learning), Navigational (finding a brand), Commercial (comparing options), and Transactional (ready to purchase). Campaign messaging must strictly match search intent.',
      },
      {
        title: 'Conversion Rate Optimization (CRO) & Heuristic Analysis',
        explanation: 'Systematically removing friction, anxiety, and distraction from user journeys while amplifying value propositions and clarity to increase the percentage of visitors who convert.',
      },
      {
        title: 'Data Attribution & Event Tracking (GA4)',
        explanation: 'Configuring event-driven analytics with custom dimensions and conversion events ensures marketing spend is attributed accurately across multi-touch customer buying journeys.',
      },
    ],
    syntaxDefinition: `// Strategic Execution Framework for ${topicTitle}
Phase 1: Market Intelligence & Competitor Audit
Phase 2: Audience Persona & Search Intent Mapping
Phase 3: Creative Asset & Campaign Architecture Deployment
Phase 4: Multi-Variate Testing & Continuous Bid/Budget Optimization`,
    strategyWorkflow: {
      title: `Strategic Playbook: ${topicTitle}`,
      scenario: `A fast-growing company needs to deploy a scalable framework for ${topicTitle} to improve customer acquisition and digital conversion efficiency.`,
      strategy: `1) Perform comprehensive market and competitor research; 2) Develop structured content and audience targeting assets; 3) Launch measured test campaigns; 4) Monitor KPIs in real-time dashboards and iterate based on verified conversion data.`,
      expectedOutcome: `Consistent 25-40% improvement in core efficiency metrics within the initial 60 days of strategic deployment.`,
    },
    stepByStepGuide: [
      { step: 1, title: 'Establish Baseline Metrics & KPIs', details: `Determine the primary conversion metric (CPA, ROAS, Organic Traffic) for ${topicTitle} before spending budget.` },
      { step: 2, title: 'Audience & Search Intent Research', details: 'Identify specific customer pain points, search queries, and competitor positioning gaps.' },
      { step: 3, title: 'Deploy Campaign Assets & Tracking', details: 'Configure pixel tracking, GA4 conversion events, and verify attribution tags before launching campaigns.' },
      { step: 4, title: 'Iterative Split-Testing & Optimization', details: 'Analyze weekly performance data, prune underperforming cohorts, and scale winning creatives and bids.' },
    ],
    realWorldApplication: `Leading growth agencies and enterprise brands deploy structured frameworks for ${topicTitle} to manage multi-million dollar annual ad spends while maintaining positive unit economics.`,
    commonMistakes: [
      {
        mistake: `Launching campaigns without verified conversion tracking and pixel firing.`,
        solution: `Always test conversion events using Google Tag Assistant and Meta Pixel Helper before putting budget behind campaigns.`,
      },
      {
        mistake: `Optimizing for vanity metrics (clicks, impressions) instead of commercial outcomes (qualified leads, revenue).`,
        solution: `Tie all campaign KPIs to actual bottom-line revenue, customer acquisition cost (CAC), and customer lifetime value (LTV).`,
      },
    ],
    bestPractices: [
      `Align landing page messaging strictly with the search intent of the ad or search query.`,
      `Conduct structured A/B tests changing only one major variable at a time (headline, offer, CTA).`,
      `Set up automated rule-based alerts to pause underperforming ads or flag sudden traffic drops.`,
      `Audit technical SEO factors (site speed, mobile responsiveness, structured data) continuously.`,
    ],
    exercise: {
      title: `Practical Exercise: ${topicTitle}`,
      task: `Develop a complete 1-page strategic execution plan applying the principles of ${topicTitle} to a target business scenario. Define target personas, KPIs, and testing roadmap.`,
      hints: `Follow the 4-phase strategic workflow detailed above.`,
    },
    interviewQuestions: [
      {
        question: `How do you calculate and interpret Customer Acquisition Cost (CAC) and Return on Ad Spend (ROAS)?`,
        answer: `CAC is total marketing and advertising spend divided by the number of new customers acquired in that period (Spend / New Customers). ROAS is gross revenue generated from advertising divided by total ad spend (Revenue / Ad Spend). A healthy business model typically requires an LTV:CAC ratio of at least 3:1, and a minimum ROAS of 300-400% depending on gross product margins.`,
      },
      {
        question: `How has Google's transition from Universal Analytics to Google Analytics 4 (GA4) impacted conversion tracking?`,
        answer: `GA4 moved from a session-based data model to an event-driven data model where every interaction (page view, click, scroll, purchase) is treated as an event with custom parameters. This provides cross-platform web and app tracking, AI-powered predictive metrics, and machine learning to model conversions that would otherwise be lost due to privacy regulations and cookie depreciation.`,
      },
    ],
    officialDocs: [
      {
        title: 'Google Search Central Official Documentation',
        url: 'https://developers.google.com/search/docs',
        description: 'Google’s official guidelines covering search engine crawling, indexing, ranking algorithms, and technical SEO standards.',
      },
      {
        title: 'Think with Google: Marketing Research & Insights',
        url: 'https://www.thinkwithgoogle.com/',
        description: 'Data-driven marketing trends, consumer behavior analyses, and digital strategy playbooks direct from Google.',
      },
    ],
  };
}
