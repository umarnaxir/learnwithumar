import type { StrategyWorkflow } from '@/types/curriculum';
import type { GeneratedTopic, MarketingCategory } from './generated-types';

const clean = (value: string) => value.replace(/\s+/g, ' ').trim();
const withoutPeriod = (value: string) => clean(value).replace(/\.$/, '');
const lowerFirst = (value: string) => {
  const text = withoutPeriod(value);
  if (!text) return text;
  if (/^[A-Z]{2}/.test(text)) return text;
  return text.charAt(0).toLowerCase() + text.slice(1);
};

interface MarketingParts {
  blueprint: string;
  strategy: StrategyWorkflow;
}

const categoryLabel: Record<MarketingCategory, string> = {
  marketing: 'marketing strategy',
  seo: 'search engine optimization',
  social: 'social media growth',
  content: 'content production',
  ads: 'paid media',
  conversion: 'conversion optimization',
  email: 'email lifecycle marketing',
  analytics: 'marketing analytics',
  agency: 'agency operations',
};

export function buildMarketingParts(
  category: MarketingCategory,
  moduleTitle: string,
  moduleDescription: string,
  topic: GeneratedTopic
): MarketingParts {
  const title = topic.title;
  const summary = withoutPeriod(topic.summary);
  const label = categoryLabel[category];
  const metric = categoryMetric(category);
  const horizon = categoryHorizon(category);
  const artifact = categoryArtifact(category);
  const firstMove = categoryFirstMove(category);

  const blueprint = `PLAYBOOK / ${title.toUpperCase()}
MODULE / ${moduleTitle}
OBJECTIVE / ${summary}.

01 — BASELINE
Document the current ${metric}, the audience segment, and the business constraint before changing anything.

02 — RESEARCH
Audit ${summary.toLowerCase()}. Record the evidence, source, and date for every assumption.

03 — BUILD
${firstMove} Produce the ${artifact} with one owner, one deadline, and one measurable success condition.

04 — LAUNCH
Ship the smallest complete version to a controlled segment. Verify tracking before increasing spend or reach.

05 — REVIEW
Review ${metric} at ${horizon}. Keep what moved the metric, fix what created friction, and retire what cannot be measured.

06 — DOCUMENT
Write the decision, the result, and the next test in the shared ${label} workspace so the work compounds.`;

  const strategy = categoryStrategy(category, title, summary, moduleTitle, moduleDescription, metric, horizon, artifact);
  return { blueprint, strategy };
}

function categoryMetric(category: MarketingCategory): string {
  switch (category) {
    case 'seo':
      return 'qualified organic sessions and ranking positions';
    case 'social':
      return 'reach, engagement rate, and follower quality';
    case 'content':
      return 'content consumption, saves, and assisted conversions';
    case 'ads':
      return 'CAC, ROAS, and conversion volume';
    case 'conversion':
      return 'conversion rate and revenue per session';
    case 'email':
      return 'deliverability, click-through rate, and revenue per subscriber';
    case 'analytics':
      return 'tracking accuracy, attribution coverage, and reported ROI';
    case 'agency':
      return 'qualified pipeline, retainer margin, and client retention';
    default:
      return 'customer acquisition cost and lifetime value';
  }
}

function categoryHorizon(category: MarketingCategory): string {
  switch (category) {
    case 'seo':
      return 'a 90-day review cadence';
    case 'social':
      return 'a weekly content review';
    case 'content':
      return 'a monthly editorial review';
    case 'ads':
      return 'a weekly optimization cycle';
    case 'conversion':
      return 'a two-week test window with a precomputed sample size';
    case 'email':
      return 'a weekly send review and a monthly deliverability audit';
    case 'analytics':
      return 'a monthly data-quality review';
    case 'agency':
      return 'a monthly client business review';
    default:
      return 'a monthly growth review';
  }
}

function categoryArtifact(category: MarketingCategory): string {
  switch (category) {
    case 'seo':
      return 'prioritized SEO action sheet';
    case 'social':
      return 'content calendar and creative brief';
    case 'content':
      return 'editorial brief and distribution plan';
    case 'ads':
      return 'campaign brief, tracking plan, and test matrix';
    case 'conversion':
      return 'hypothesis, wireframe, and measurement plan';
    case 'email':
      return 'sequence map and send checklist';
    case 'analytics':
      return 'measurement plan and dashboard specification';
    case 'agency':
      return 'scope, proposal, and delivery checklist';
    default:
      return 'one-page growth plan';
  }
}

function categoryFirstMove(category: MarketingCategory): string {
  switch (category) {
    case 'seo':
      return 'Fix the highest-impact crawl, intent, or content gap first.';
    case 'social':
      return 'Choose one platform and one content pillar before producing assets.';
    case 'content':
      return 'Write the promise, proof, and call to action before drafting the asset.';
    case 'ads':
      return 'Define the offer, audience, and conversion event before building the campaign.';
    case 'conversion':
      return 'Identify the single largest source of friction on the current journey.';
    case 'email':
      return 'Map the trigger, audience, and desired action for the sequence.';
    case 'analytics':
      return 'Define the decision the report must support, then choose the events.';
    case 'agency':
      return 'Clarify the client outcome, scope boundary, and reporting cadence.';
    default:
      return 'Choose the one constraint that limits growth right now.';
  }
}

function categoryStrategy(
  category: MarketingCategory,
  title: string,
  summary: string,
  moduleTitle: string,
  moduleDescription: string,
  metric: string,
  horizon: string,
  artifact: string
): StrategyWorkflow {
  const scenarioBase = `A team is investing in ${moduleTitle.toLowerCase()} and needs ${lowerFirst(title)} to produce a measurable business result rather than another isolated tactic.`;
  const outcomeBase = `A measurable improvement in ${metric}, reviewed at ${horizon}, with the ${artifact} documented for the next cycle.`;

  switch (category) {
    case 'seo':
      return {
        title: `Organic growth sprint: ${title}`,
        scenario: `${scenarioBase} The current site has impressions but not enough qualified clicks, and the team cannot tell which pages deserve investment.`,
        strategy: `1) Export 90 days of Search Console data and segment queries by intent. 2) Audit the pages that already receive impressions but underperform on CTR or depth. 3) Apply ${summary.toLowerCase()} to the highest-opportunity template first. 4) Improve internal links from authoritative pages to the target URL. 5) Track impressions, clicks, average position, and conversion-assisted sessions weekly. 6) Refresh one page per sprint instead of publishing volume without maintenance.`,
        expectedOutcome: outcomeBase,
      };
    case 'social':
      return {
        title: `Social growth experiment: ${title}`,
        scenario: `${scenarioBase} Reach is inconsistent, saves are low, and the team is unsure which format deserves more production time.`,
        strategy: `1) Pick one audience segment and one platform. 2) Produce three hooks around ${summary.toLowerCase()}. 3) Publish at consistent times for two weeks. 4) Compare 3-second retention, saves, shares, and profile visits. 5) Turn the winning hook into a repeatable series. 6) Recycle the top asset into the next format instead of starting from zero.`,
        expectedOutcome: `A repeatable format with improving retention and saves, plus a documented content calendar for the next ${horizon}.`,
      };
    case 'content':
      return {
        title: `Editorial brief: ${title}`,
        scenario: `${scenarioBase} The team can publish frequently, but the content does not create a clear next step for the reader.`,
        strategy: `1) Interview one customer or subject expert about ${summary.toLowerCase()}. 2) Write the promise in one sentence and the proof in three bullet points. 3) Draft the asset with a single call to action. 4) Add one original example, checklist, or data point that cannot be copied from a competitor. 5) Repurpose it into one social post and one email. 6) Measure scroll depth, saves, and assisted conversions.`,
        expectedOutcome: `A useful, differentiated asset with a distribution plan and a clear conversion path, reviewed at ${horizon}.`,
      };
    case 'ads':
      return {
        title: `Paid acquisition test: ${title}`,
        scenario: `${scenarioBase} The account has conversion data but no disciplined test plan, so budget moves based on opinion rather than evidence.`,
        strategy: `1) Define the conversion event and verify it end to end. 2) Isolate one audience, one offer, and one creative variable. 3) Build two to four variants that express ${summary.toLowerCase()} in different ways. 4) Run until the precomputed sample size is reached. 5) Compare CAC, ROAS, CTR, and qualified conversion rate. 6) Scale the winner gradually and document the losing hypothesis.`,
        expectedOutcome: `A statistically defensible winner with a clear CAC/ROAS trade-off, ready to scale at ${horizon}.`,
      };
    case 'conversion':
      return {
        title: `Conversion experiment: ${title}`,
        scenario: `${scenarioBase} Traffic is stable but the conversion rate is below benchmark, and previous changes were not measured.`,
        strategy: `1) Review session recordings and funnel drop-off. 2) Write one hypothesis tied to ${summary.toLowerCase()}. 3) Create a single-variable treatment and a control. 4) Precompute sample size and runtime. 5) Run the test without peeking. 6) Ship only if the result is statistically and commercially meaningful.`,
        expectedOutcome: `A validated lift or a documented null result, with the ${artifact} ready for the next experiment.`,
      };
    case 'email':
      return {
        title: `Lifecycle sequence: ${title}`,
        scenario: `${scenarioBase} The list is growing, but every subscriber receives the same blast and engagement is declining.`,
        strategy: `1) Segment by lifecycle stage and recent engagement. 2) Map the trigger, delay, and desired action for each message. 3) Write one promise per email around ${summary.toLowerCase()}. 4) Authenticate the sending domain and verify links. 5) Test subject line and send time before body copy. 6) Suppress inactive subscribers and measure revenue per recipient.`,
        expectedOutcome: `A documented sequence with healthy deliverability, improving clicks, and revenue per subscriber measured at ${horizon}.`,
      };
    case 'analytics':
      return {
        title: `Measurement plan: ${title}`,
        scenario: `${scenarioBase} Stakeholders receive reports, but the numbers disagree across platforms and no one trusts the ROI calculation.`,
        strategy: `1) List the business decisions the report must support. 2) Define one canonical event for each conversion. 3) Validate ${summary.toLowerCase()} in DebugView or the platform tester. 4) Document UTM rules and attribution windows. 5) Reconcile platform-reported conversions with backend revenue. 6) Publish a dashboard with definitions, owner, and refresh cadence.`,
        expectedOutcome: `A trusted measurement plan with reconciled numbers and an executive dashboard reviewed at ${horizon}.`,
      };
    case 'agency':
      return {
        title: `Client delivery plan: ${title}`,
        scenario: `${scenarioBase} The client wants predictable outcomes, but scope, reporting, and decision rights are unclear.`,
        strategy: `1) Restate the client’s business outcome in one sentence. 2) Define the deliverables, exclusions, and approval process. 3) Use ${summary.toLowerCase()} to build the first 30-day plan. 4) Agree on the metric, reporting cadence, and escalation path. 5) Deliver a quick win in week one. 6) Review results monthly and propose the next expansion only after the current scope is proven.`,
        expectedOutcome: `A clear scope, an early win, and a retained client with a documented expansion path at ${horizon}.`,
      };
    default:
      return {
        title: `Growth plan: ${title}`,
        scenario: `${scenarioBase} The team has more tactics than capacity and needs a defensible sequence.`,
        strategy: `1) Define the audience and the job they are trying to complete. 2) Map the funnel stage where ${summary.toLowerCase()} matters most. 3) Choose one primary channel and one supporting channel. 4) Set a baseline and a target for ${metric}. 5) Launch the smallest complete test. 6) Review at ${horizon} and reallocate budget to the evidence.`,
        expectedOutcome: `A focused growth plan with one owner, one metric, and a documented decision at ${horizon}.`,
      };
  }
}

export function buildMarketingDefinition(topic: GeneratedTopic, moduleTitle: string): string {
  return `${topic.title} is a practical ${moduleTitle.toLowerCase()} discipline focused on ${lowerFirst(topic.summary)}. It defines the inputs a team controls, the audience it serves, and the evidence used to decide whether the work created business value rather than vanity activity.`;
}

export function buildMarketingExplanation(
  topic: GeneratedTopic,
  moduleTitle: string,
  moduleDescription: string
): string {
  return `${withoutPeriod(topic.summary)}. Inside ${moduleTitle}, this topic is not a standalone trick: it connects to the customer journey, the channel’s distribution rules, and the measurement system. ${withoutPeriod(moduleDescription)}. The practical test is simple — can you explain which audience, which funnel stage, and which metric this work changes? If the answer is unclear, the tactic is not ready to scale.`;
}
