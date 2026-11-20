import type { CurriculumModule, LessonContent, TrackId } from '@/types/curriculum';
import { buildOfficialDocs } from './generated-docs';
import { buildFrontendExample } from './generated-examples';
import { buildBackendExample } from './generated-examples-backend';
import { buildPlatformExample } from './generated-examples-platform';
import { buildMarketingDefinition, buildMarketingExplanation, buildMarketingParts } from './generated-marketing';
import type {
  DevCategory,
  GeneratedTopic,
  MarketingCategory,
  RelatedTopic,
} from './generated-types';

interface GenerateLessonArgs {
  trackId: TrackId;
  module: Pick<CurriculumModule, 'id' | 'title' | 'description' | 'badge'>;
  topic: GeneratedTopic;
  order: number;
  relatedTopics: RelatedTopic[];
}

const withoutPeriod = (value: string) => value.replace(/\s+/g, ' ').trim().replace(/\.$/, '');
const lowerFirst = (value: string) => {
  const text = withoutPeriod(value);
  if (!text) return text;
  // Preserve acronyms such as INNER JOIN and SQL instead of producing iNNER JOIN.
  if (/^[A-Z]{2}/.test(text)) return text;
  return text.charAt(0).toLowerCase() + text.slice(1);
};

function titleCase(value: string): string {
  const cleaned = withoutPeriod(value).replace(/\s+/g, ' ');
  if (!cleaned) return cleaned;
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

function splitSummary(value: string): string[] {
  const parts: string[] = [];
  let current = '';
  let depth = 0;

  for (const character of value) {
    if (character === '(' || character === '[') depth += 1;
    if (character === ')' || character === ']') depth = Math.max(0, depth - 1);

    if ((character === ',' || character === ';') && depth === 0) {
      parts.push(current);
      current = '';
      continue;
    }

    current += character;
  }

  parts.push(current);
  return parts;
}

function summaryPhrases(topic: GeneratedTopic): string[] {
  const parts = splitSummary(topic.summary)
    .map((part) => withoutPeriod(part).replace(/^and\s+/i, '').trim())
    .filter((part) => part.length >= 3 && part.length <= 110);

  const unique = Array.from(new Set(parts));
  if (unique.length >= 3) return unique.slice(0, 5);

  return [
    `Core rules behind ${lowerFirst(topic.title)}`,
    `Inputs and constraints of ${lowerFirst(topic.title)}`,
    `How ${lowerFirst(topic.title)} behaves in production`,
    `Verifying ${lowerFirst(topic.title)} with evidence`,
  ];
}

function detectDevCategory(moduleId: string, topicId: string): DevCategory {
  const m = moduleId.toLowerCase();
  const t = topicId.toLowerCase();

  if (m.includes('html')) return 'html';
  if (m.includes('css')) return 'css';
  if (m.includes('javascript') || m.includes('advanced-javascript')) return 'javascript';
  if (m.includes('react')) return 'react';
  if (m.includes('typescript')) return 'typescript';
  if (m.includes('next')) return 'next';
  if (m.includes('node')) return 'node';
  if (m.includes('express')) return 'express';
  if (m.includes('nest')) return 'nest';
  if (m.includes('sql') || m.includes('relational')) return 'sql';
  if (m.includes('nosql') || m.includes('mongo')) return 'nosql';
  if (m.includes('orm') || m.includes('prisma') || m.includes('supabase') || m.includes('firebase')) return 'orm';
  if (m.includes('api')) return 'api';
  if (m.includes('auth') || m.includes('security')) return 'security';
  if (m.includes('git')) return 'git';
  if (m.includes('testing') || m.includes('debugging')) return 'testing';
  if (m.includes('deployment') || m.includes('devops')) return 'devops';
  if (m.includes('professional')) return 'professional';
  if (m.includes('intro-web-dev')) return 'foundations';

  if (t.includes('html')) return 'html';
  if (t.includes('css')) return 'css';
  if (t.includes('react')) return 'react';
  if (t.includes('next')) return 'next';

  return 'foundations';
}

function detectMarketingCategory(moduleId: string): MarketingCategory {
  const m = moduleId.toLowerCase();

  if (m.includes('seo')) return 'seo';
  if (m.includes('social')) return 'social';
  if (m.includes('content')) return 'content';
  if (m.includes('ads') || m.includes('advertising')) return 'ads';
  if (m.includes('conversion') || m.includes('lead-generation')) return 'conversion';
  if (m.includes('email') || m.includes('automation')) return 'email';
  if (m.includes('analytics')) return 'analytics';
  if (m.includes('freelancing') || m.includes('agency')) return 'agency';

  return 'marketing';
}

const DEV_FOCUS: Record<DevCategory, string> = {
  foundations: 'understanding the request path and the browser/server boundary',
  html: 'expressing meaning with the correct native element before adding styling',
  css: 'controlling layout, cascade, and responsive behavior with the smallest reliable rule set',
  javascript: 'making data flow and runtime behavior explicit and testable',
  react: 'keeping rendering pure and state transitions predictable',
  typescript: 'making invalid states unrepresentable at the type boundary',
  next: 'choosing the correct server/client boundary and cache behavior',
  node: 'respecting the event loop, streams, and process boundaries',
  express: 'keeping routing, validation, and error handling separate',
  nest: 'using dependency injection and module boundaries instead of hidden coupling',
  sql: 'protecting data integrity while keeping queries readable and indexed',
  nosql: 'modeling documents around access patterns instead of normalized tables',
  orm: 'keeping the schema, generated client, and migrations in sync',
  api: 'designing a contract that clients can depend on without reading the implementation',
  security: 'assuming every input is hostile and every boundary is untrusted',
  git: 'creating a reviewable history that explains why a change exists',
  testing: 'proving behavior through the smallest test that would fail if the behavior broke',
  devops: 'making deployments reproducible and failures observable',
  professional: 'turning technical decisions into documented, reviewable trade-offs',
};

const MARKETING_FOCUS: Record<MarketingCategory, string> = {
  marketing: 'connecting every tactic to a funnel stage and a business metric',
  seo: 'earning qualified organic demand by satisfying intent and technical requirements',
  social: 'building repeatable audience attention without buying every impression',
  content: 'creating useful, differentiated assets that earn attention and action',
  ads: 'buying measurable demand without letting acquisition costs outrun margin',
  conversion: 'removing friction between intent and completed action',
  email: 'earning permission and delivering relevance at the right lifecycle moment',
  analytics: 'turning platform data into decisions that survive reconciliation',
  agency: 'delivering scoped client outcomes that can be repeated and retained',
};

function categoryLabel(category: DevCategory | MarketingCategory): string {
  return category.replace(/-/g, ' ');
}

function buildConcepts(topic: GeneratedTopic, moduleTitle: string, focus: string) {
  const phrases = summaryPhrases(topic);
  const angles = [
    `This is the first checkpoint: name what changes when ${lowerFirst(phrases[0])} is handled well.`,
    `This is where quality is usually won or lost, because ${moduleTitle.toLowerCase()} amplifies whatever is unclear here.`,
    `Connect this to the rest of ${topic.title}; document the input, the expected result, and the failure case.`,
    `Review question: does this still hold when traffic, data, or requirements change?`,
  ];

  return phrases.slice(0, 4).map((phrase, index) => {
    const others = phrases.filter((item) => item !== phrase).slice(0, 2);
    const connection =
      others.length > 0
        ? ` It connects to ${others.map(lowerFirst).join(' and ')}, so verify it as part of the whole workflow rather than in isolation.`
        : '';

    return {
      title: titleCase(phrase),
      explanation: `${titleCase(phrase)} is one of the concrete mechanics of ${topic.title}. ${angles[index % angles.length]}${connection} The practical focus is ${focus}.`,
    };
  });
}

function buildWhyUsed(topic: GeneratedTopic, moduleTitle: string, focus: string): string[] {
  const phrases = summaryPhrases(topic);
  return [
    `Turns the ${moduleTitle} outcome into a concrete skill: ${lowerFirst(topic.summary)}.`,
    `Makes ${lowerFirst(phrases[0] ?? topic.title)} explicit, so the team can review it instead of relying on intuition.`,
    `Prevents the common failure where ${lowerFirst(topic.title)} is copied from an example without checking constraints or trade-offs.`,
    `Creates shared vocabulary for code reviews, campaign reviews, and interviews: everyone can point to the same evidence and the same focus on ${focus}.`,
  ];
}

function buildUseCases(topic: GeneratedTopic, category: string, isDev: boolean): string[] {
  if (isDev) {
    return [
      `Shipping a production feature where ${lowerFirst(topic.title)} determines whether the implementation is correct or merely working on the happy path.`,
      `Reviewing a pull request: use ${lowerFirst(topic.title)} to explain the trade-off, the failure mode, and the test that proves the behavior.`,
      `Debugging a regression: trace the problem back to ${lowerFirst(summaryPhrases(topic)[0] ?? topic.title)} before changing code.`,
    ];
  }

  return [
    `Planning a ${category} initiative where ${lowerFirst(topic.title)} decides the audience, the message, and the measurement plan.`,
    `Auditing an existing campaign or funnel: use ${lowerFirst(topic.title)} to separate a real constraint from a cosmetic problem.`,
    `Reporting to a client, founder, or marketing lead: connect ${lowerFirst(topic.title)} to a KPI, a decision, and the next test.`,
  ];
}

function buildSteps(topic: GeneratedTopic, category: string, isDev: boolean) {
  const phrases = summaryPhrases(topic);

  if (isDev) {
    return [
      {
        step: 1,
        title: 'Define the contract',
        details: `Write down what ${topic.title} must accept, return, and reject. Use ${lowerFirst(phrases[0] ?? topic.title)} as the first boundary.`,
      },
      {
        step: 2,
        title: 'Build the smallest example',
        details: `Implement one focused case that exercises ${lowerFirst(phrases[1] ?? topic.title)} without unrelated features or styling.`,
      },
      {
        step: 3,
        title: 'Handle the failure path',
        details: `Add validation and an explicit failure response for the case where ${lowerFirst(phrases[2] ?? topic.title)} is missing, malformed, or slow.`,
      },
      {
        step: 4,
        title: 'Verify with a test',
        details: `Assert the success path, the failure path, and one boundary condition. The test should fail if ${lowerFirst(topic.title)} regresses.`,
      },
      {
        step: 5,
        title: 'Review and document',
        details: `Record the decision, the trade-off, and the verification command so the next engineer can reproduce the result.`,
      },
    ];
  }

  return [
    {
      step: 1,
      title: 'Define the business outcome',
      details: `Write one sentence describing the audience, the desired action, and the metric that will move because of ${lowerFirst(topic.title)}.`,
    },
    {
      step: 2,
      title: 'Audit the current baseline',
      details: `Collect the existing data for ${lowerFirst(phrases[0] ?? topic.title)}. Separate evidence from assumptions and note the source and date.`,
    },
    {
      step: 3,
      title: 'Build the smallest complete test',
      details: `Create one asset, campaign, sequence, or workflow that applies ${lowerFirst(phrases[1] ?? topic.title)} to a single audience segment.`,
    },
    {
      step: 4,
      title: 'Verify tracking before scaling',
      details: `Test the conversion event, UTM parameters, links, and attribution window. Do not increase spend or reach until the measurement is trustworthy.`,
    },
    {
      step: 5,
      title: 'Review and document the decision',
      details: `Compare the result with the baseline, keep what moved the metric, retire what did not, and write the next test in the shared workspace.`,
    },
  ];
}

function buildMistakes(topic: GeneratedTopic, isDev: boolean) {
  if (isDev) {
    return [
      {
        mistake: `Treating ${lowerFirst(topic.title)} as a snippet to copy rather than a contract with inputs, outputs, and failure modes.`,
        solution: 'Write the contract first, then implement the smallest example that proves it.',
      },
      {
        mistake: 'Skipping the failure path because the happy path already works.',
        solution: 'Add one test for invalid input and one for a slow or unavailable dependency before shipping.',
      },
      {
        mistake: 'Adding abstraction before the behavior is understood.',
        solution: 'Keep the first implementation direct; extract a reusable pattern only after a second real use case appears.',
      },
    ];
  }

  return [
    {
      mistake: `Running ${lowerFirst(topic.title)} without a defined audience, funnel stage, or success metric.`,
      solution: 'Write the audience, desired action, and primary KPI before producing assets or spending budget.',
    },
    {
      mistake: 'Trusting platform-reported numbers without reconciling them to backend revenue or CRM data.',
      solution: 'Compare at least one platform conversion total with the source of truth before reporting ROI.',
    },
    {
      mistake: 'Changing several variables at once and calling the result a test.',
      solution: 'Isolate one meaningful variable, precompute the sample size, and document the hypothesis before launch.',
    },
  ];
}

function buildBestPractices(topic: GeneratedTopic, category: string, isDev: boolean): string[] {
  if (isDev) {
    return [
      `Start with the smallest reproducible example of ${lowerFirst(topic.title)} before integrating it into the full application.`,
      `Make ${lowerFirst(summaryPhrases(topic)[0] ?? topic.title)} explicit in code, types, or validation rather than leaving it implicit in a comment.`,
      `Verify behavior with a test that fails for the right reason, then keep the test as regression protection.`,
      `Document the trade-off and the operational consequence, especially for ${category} decisions that affect performance, security, or maintainability.`,
    ];
  }

  return [
    `Tie every ${lowerFirst(topic.title)} decision to a funnel stage, an audience segment, and a measurable KPI.`,
    `Verify tracking and links before increasing budget, reach, or send volume.`,
    `Change one meaningful variable per test; document the hypothesis, sample size, and decision rule.`,
    `Write down what was learned, including null results, so the next ${category} cycle starts from evidence instead of memory.`,
  ];
}

function buildExercises(topic: GeneratedTopic, isDev: boolean) {
  if (isDev) {
    return [
      {
        title: `Build a minimal ${topic.title} example`,
        task: `Create a focused implementation that demonstrates ${lowerFirst(topic.summary)}. Include one success case and one failure case.`,
        hints: `Keep the example small enough to explain in a code review. Add a test or a runnable command that proves it works.`,
      },
      {
        title: `Review an existing implementation`,
        task: `Find a real project or open-source repository that uses ${lowerFirst(topic.title)}. Identify one strength, one risk, and one change you would make.`,
        hints: `Use the key concepts and common mistakes from this lesson as your review checklist.`,
      },
    ];
  }

  return [
    {
      title: `Draft a one-page ${topic.title} plan`,
      task: `Define the audience, the offer or message, the channel, the primary KPI, and the first test for ${lowerFirst(topic.title)}.`,
      hints: `Use the playbook structure: baseline, research, build, launch, review, document.`,
    },
    {
      title: `Audit a real example`,
      task: `Find a live campaign, page, sequence, or report that applies ${lowerFirst(topic.title)}. Identify one strength, one friction point, and one measurable improvement.`,
      hints: `Support the recommendation with evidence you can observe, not a generic best practice.`,
    },
  ];
}

function buildInterviewQuestions(topic: GeneratedTopic, isDev: boolean) {
  const first = summaryPhrases(topic)[0] ?? topic.title;

  if (isDev) {
    return [
      {
        question: `Explain ${topic.title} and why it matters in production.`,
        answer: `${topic.title} focuses on ${lowerFirst(topic.summary)}. In production it matters because ${lowerFirst(first)} affects correctness, maintainability, or performance, and a team needs a shared contract for reviewing it.`,
      },
      {
        question: `What is the most important trade-off when applying ${topic.title}?`,
        answer: `The main trade-off is between short-term implementation speed and long-term clarity. A direct implementation is easier to review, while premature abstraction can hide the behavior. Start concrete, verify the failure path, and extract a reusable pattern only after a second real use case appears.`,
      },
      {
        question: `How would you verify that ${topic.title} is implemented correctly?`,
        answer: `Define the contract, test the success path, test the failure path, and check one boundary condition. Then review the operational evidence: logs, metrics, or a reproducible command that another engineer can run.`,
      },
    ];
  }

  return [
    {
      question: `How would you explain ${topic.title} to a business stakeholder?`,
      answer: `${topic.title} is about ${lowerFirst(topic.summary)}. The business value is a measurable change in the audience, funnel stage, or KPI it affects, not the tactic itself.`,
    },
    {
      question: `Which metric would you use to evaluate ${topic.title}, and why?`,
      answer: `Choose the metric closest to the business outcome: qualified pipeline, conversion rate, CAC, ROAS, retention, or revenue per recipient. Pair it with a diagnostic metric so you can tell whether the result came from the tactic or from traffic mix.`,
    },
    {
      question: `What would make you stop or change a ${topic.title} initiative?`,
      answer: `Stop when the evidence shows the cost of continuing exceeds the expected value, when tracking is unreliable, or when the audience is not responding after a fair test. Document the null result and reallocate budget to the next hypothesis.`,
    },
  ];
}

function buildDefinition(topic: GeneratedTopic, moduleTitle: string, isDev: boolean): string {
  if (!isDev) return buildMarketingDefinition(topic, moduleTitle);

  return `${topic.title} is a ${moduleTitle.toLowerCase()} concept concerned with ${lowerFirst(topic.summary)}. It defines the inputs a developer controls, the behavior the system must produce, and the evidence used to prove the implementation is correct under real constraints.`;
}

function buildExplanation(topic: GeneratedTopic, moduleTitle: string, moduleDescription: string, focus: string, isDev: boolean): string {
  if (!isDev) return buildMarketingExplanation(topic, moduleTitle, moduleDescription);

  return `${withoutPeriod(topic.summary)}. Inside ${moduleTitle}, the topic is part of a larger system: ${lowerFirst(moduleDescription)}. The practical focus is ${focus}. A useful way to study it is to separate the contract (what goes in and what comes out), the mechanism (how the runtime or framework produces that result), and the failure mode (what happens when an assumption is violated). That separation is what turns a definition into something you can debug, review, and test.`;
}

export function generateLessonContent({
  trackId,
  module,
  topic,
  order,
  relatedTopics,
}: GenerateLessonArgs): LessonContent {
  const isDev = trackId === 'full-stack';
  const devCategory = detectDevCategory(module.id, topic.id);
  const marketingCategory = detectMarketingCategory(module.id);
  const category = isDev ? devCategory : marketingCategory;
  const focus = isDev ? DEV_FOCUS[devCategory] : MARKETING_FOCUS[marketingCategory];

  let syntaxDefinition = '';
  let codeExamples: LessonContent['codeExamples'];
  let strategyExamples: LessonContent['strategyExamples'];

  if (isDev) {
    const example =
      devCategory === 'html' ||
      devCategory === 'css' ||
      devCategory === 'javascript' ||
      devCategory === 'react' ||
      devCategory === 'typescript' ||
      devCategory === 'next'
        ? buildFrontendExample(devCategory, topic)
        : devCategory === 'node' ||
            devCategory === 'express' ||
            devCategory === 'nest' ||
            devCategory === 'sql' ||
            devCategory === 'nosql' ||
            devCategory === 'orm'
          ? buildBackendExample(devCategory, topic)
          : buildPlatformExample(devCategory, topic);

    syntaxDefinition = example.syntax;
    codeExamples = [
      {
        title: example.title,
        language: example.language,
        code: example.code,
        explanation: example.explanation,
        output: example.output,
      },
    ];
  } else {
    const marketing = buildMarketingParts(
      marketingCategory,
      module.title,
      module.description,
      topic
    );
    syntaxDefinition = marketing.blueprint;
    strategyExamples = [marketing.strategy];
  }

  const phrases = summaryPhrases(topic);
  const docs = buildOfficialDocs(trackId, category as DevCategory & MarketingCategory, module.id, topic.id);
  const durationMinutes = Number.parseInt(topic.duration, 10) || 45;
  const difficulty: LessonContent['difficulty'] =
    durationMinutes >= 75 ? 'Advanced' : durationMinutes >= 50 ? 'Intermediate' : 'Beginner';

  return {
    id: topic.id,
    moduleId: module.id,
    trackId,
    title: topic.title,
    slug: topic.id,
    order,
    duration: topic.duration,
    difficulty,
    summary: topic.summary,
    definition: buildDefinition(topic, module.title, isDev),
    explanation: buildExplanation(
      topic,
      module.title,
      module.description,
      focus,
      isDev
    ),
    whyItIsUsed: buildWhyUsed(topic, module.title, focus),
    realWorldUseCases: buildUseCases(topic, categoryLabel(category), isDev),
    objectives: [
      `Explain ${topic.title} in your own words and connect it to ${lowerFirst(module.title)}.`,
      `Identify ${lowerFirst(phrases[0] ?? topic.title)} and the constraints that change the outcome.`,
      `Apply ${lowerFirst(topic.title)} to a small, verifiable example or campaign.`,
      `Diagnose the most common failure mode and describe the evidence that proves the fix.`,
    ],
    keyConcepts: buildConcepts(topic, module.title, focus),
    syntaxDefinition,
    codeExamples,
    strategyExamples,
    stepByStepGuide: buildSteps(topic, categoryLabel(category), isDev),
    realWorldApplication: isDev
      ? `Production teams rely on ${lowerFirst(topic.title)} whenever ${lowerFirst(focus)}. The value is not the definition — it is the ability to make a change, verify the result, and explain the trade-off to another engineer.`
      : `Growth teams rely on ${lowerFirst(topic.title)} whenever ${lowerFirst(focus)}. The work is judged by the audience it reached, the action it produced, and the evidence that the result was not accidental.`,
    commonMistakes: buildMistakes(topic, isDev),
    bestPractices: buildBestPractices(topic, categoryLabel(category), isDev),
    exercises: buildExercises(topic, isDev),
    interviewQuestions: buildInterviewQuestions(topic, isDev),
    relatedTopics,
    miniAssignment: {
      title: `Production assignment: ${topic.title}`,
      prompt: isDev
        ? `Build a small, reviewable implementation that demonstrates ${lowerFirst(topic.summary)}. Include the success path, the failure path, and a short note explaining the trade-off you made.`
        : `Create a one-page plan that applies ${lowerFirst(topic.summary)} to a real audience. Include the baseline, the proposed action, the KPI, and the decision rule for the first review.`,
      deliverables: isDev
        ? [
            'Runnable example or pull-request-sized patch',
            'Verification command or test output',
            'Short decision note covering the main trade-off and failure mode',
          ]
        : [
            'One-page plan with audience, channel, and funnel stage',
            'Measurement plan with primary and diagnostic KPIs',
            'Documented decision rule for the first review',
          ],
    },
    officialDocs: docs,
    furtherReading: docs.slice(1).map((doc) => ({ title: doc.title, url: doc.url })),
  };
}
