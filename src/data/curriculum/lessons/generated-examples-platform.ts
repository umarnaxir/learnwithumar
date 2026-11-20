import type { DevExample, GeneratedTopic } from './generated-types';

const clean = (value: string) => value.replace(/\s+/g, ' ').trim();
const withoutPeriod = (value: string) => clean(value).replace(/\.$/, '');
const kebab = (value: string) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
const camel = (value: string) =>
  kebab(value).replace(/-([a-z0-9])/g, (_, letter: string) => letter.toUpperCase());
const pascal = (value: string) => {
  const text = camel(value);
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : text;
};

const explanation = (topic: GeneratedTopic, focus: string) =>
  `${topic.title} in practice: ${focus} The example is intentionally small so every line can be copied, run, and verified before it is added to a larger project.`;

export function buildApiExample(topic: GeneratedTopic): DevExample {
  const slug = kebab(topic.id);
  const Title = pascal(topic.id);
  const title = topic.title;
  const summary = withoutPeriod(topic.summary);
  const t = topic.id.toLowerCase();

  if (t.includes('graphql') || t.includes('apollo')) {
    const code = `# schema.graphql
type ${Title} {
  id: ID!
  title: String!
  summary: String!
  published: Boolean!
}

type Query {
  ${camel(topic.id)}(id: ID!): ${Title}
  ${camel(topic.id)}List(limit: Int = 20): [${Title}!]!
}

type Mutation {
  create${Title}(title: String!, summary: String!): ${Title}!
}

# resolver
const resolvers = {
  Query: {
    ${camel(topic.id)}List: (_parent, { limit }, context) =>
      context.db.${camel(topic.id)}.findMany({ take: limit }),
  },
  Mutation: {
    create${Title}: (_parent, input, context) =>
      context.db.${camel(topic.id)}.create({ data: input }),
  },
};`;
    return {
      language: 'graphql',
      syntax: `type Query {\n  ${camel(topic.id)}(id: ID!): ${Title}\n}\ntype Mutation {\n  create${Title}(title: String!): ${Title}!\n}`,
      code,
      title: `GraphQL contract for ${title}`,
      explanation: explanation(
        topic,
        'the schema is the public contract, non-null fields document guarantees, and resolvers receive only the arguments the client requested.'
      ),
      output: 'A client can query one record or a bounded list and create a new record through a typed mutation.',
    };
  }

  if (t.includes('status-code') || t.includes('http-method') || t.includes('rest') || t.includes('header')) {
    const code = `// POST /api/${slug}
// Request
{
  "title": "${title}",
  "summary": "${summary}."
}

// 201 Created
// Location: /api/${slug}/ckx123
{
  "data": {
    "id": "ckx123",
    "title": "${title}",
    "summary": "${summary}.",
    "createdAt": "2026-11-20T10:00:00.000Z"
  }
}

// 422 Unprocessable Entity
{
  "type": "https://example.com/problems/validation",
  "title": "Validation failed",
  "status": 422,
  "errors": [{ "field": "title", "message": "Title is required" }]
}`;
    return {
      language: 'http',
      syntax: `POST /api/${slug}\nContent-Type: application/json\n\n201 Created\nLocation: /api/${slug}/{id}`,
      code,
      title: `HTTP contract for ${title}`,
      explanation: explanation(
        topic,
        'the success response includes the canonical Location header, while validation failures use a stable problem-details shape.'
      ),
      output: 'Clients can distinguish creation, validation failure, and missing resources without parsing prose.',
    };
  }

  if (t.includes('validation') || t.includes('error')) {
    const code = `type ApiProblem = {
  type: string;
  title: string;
  status: number;
  detail: string;
  errors?: Array<{ field: string; message: string }>;
};

export function validationProblem(
  errors: NonNullable<ApiProblem['errors']>
): ApiProblem {
  return {
    type: 'https://example.com/problems/validation',
    title: 'Request validation failed',
    status: 422,
    detail: 'One or more fields are invalid for ${title}.',
    errors,
  };
}`;
    return {
      language: 'typescript',
      syntax: `type Problem = {\n  type: string;\n  title: string;\n  status: number;\n  detail: string;\n};`,
      code,
      title: `Problem details for ${title}`,
      explanation: explanation(
        topic,
        'the response uses RFC 7807 fields and adds a field-level errors array for form mapping.'
      ),
      output: 'Clients receive a machine-readable 422 body with stable type, status, and field errors.',
    };
  }

  if (t.includes('documentation') || t.includes('swagger') || t.includes('openapi')) {
    const code = `openapi: 3.1.0
info:
  title: ${title} API
  version: 1.0.0
paths:
  /api/${slug}:
    get:
      summary: List ${title} records
      parameters:
        - name: limit
          in: query
          schema: { type: integer, minimum: 1, maximum: 100, default: 20 }
      responses:
        '200':
          description: A bounded list of records
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/${Title}'
    post:
      summary: Create a ${title} record
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/${Title}Input'
      responses:
        '201': { description: Created }
        '422': { description: Validation failed }`;
    return {
      language: 'yaml',
      syntax: `openapi: 3.1.0\ninfo:\n  title: ${title} API\npaths:\n  /api/${slug}:\n    get:\n      responses:\n        '200': { description: OK }`,
      code,
      title: `OpenAPI contract for ${title}`,
      explanation: explanation(
        topic,
        'the spec documents parameters, request bodies, and every response code so clients and tests share one contract.'
      ),
      output: 'Generated documentation and client SDKs include the list and create operations with typed schemas.',
    };
  }

  if (t.includes('resilience') || t.includes('webhook') || t.includes('integration')) {
    const code = `async function request${Title}(url: string, attempts = 3) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2_000);

    try {
      const response = await fetch(url, { signal: controller.signal });
      if (response.status >= 500) throw new Error('Upstream ' + response.status);
      return response;
    } catch (error) {
      if (attempt === attempts) throw error;
      await new Promise((resolve) => setTimeout(resolve, 250 * 2 ** attempt));
    } finally {
      clearTimeout(timeout);
    }
  }
}`;
    return {
      language: 'typescript',
      syntax: `for (let attempt = 1; attempt <= 3; attempt += 1) {\n  try { return await fetch(url); }\n  catch { await delay(2 ** attempt * 100); }\n}`,
      code,
      title: `Resilient client for ${title}`,
      explanation: explanation(
        topic,
        'each attempt has its own timeout, retries use exponential backoff, and only exhausted retries propagate the failure.'
      ),
      output: 'Transient upstream failures are retried; permanent failures surface after the final attempt.',
    };
  }

  const code = `// GET /api/${slug}?status=published&limit=20
type ${Title}Query = {
  status?: 'draft' | 'published';
  limit?: number;
  cursor?: string;
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const limit = Math.min(Number(url.searchParams.get('limit') ?? 20), 100);

  const rows = await db.${slug}.findMany({
    where: { status: url.searchParams.get('status') ?? undefined },
    take: limit + 1,
  });

  return Response.json({ data: rows.slice(0, limit) });
}`;
  return {
    language: 'typescript',
    syntax: `const url = new URL(request.url);\nconst limit = Math.min(Number(url.searchParams.get('limit') ?? 20), 100);`,
    code,
    title: `${title} API endpoint`,
    explanation: explanation(
      topic,
      'query parameters are parsed and bounded, and the extra row provides a lookahead for pagination.'
    ),
    output: `GET /api/${slug}?status=published&limit=20 returns a bounded JSON list.`,
  };
}

export function buildSecurityExample(topic: GeneratedTopic): DevExample {
  const Title = pascal(topic.id);
  const title = topic.title;
  const t = topic.id.toLowerCase();

  if (t.includes('jwt')) {
    const code = `import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function issue${Title}Token(userId: string) {
  return new SignJWT({ sub: userId, role: 'student' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer('learnwithumar')
    .setAudience('learnwithumar-web')
    .setExpirationTime('15m')
    .sign(secret);
}

export async function verify${Title}Token(token: string) {
  const { payload } = await jwtVerify(token, secret, {
    issuer: 'learnwithumar',
    audience: 'learnwithumar-web',
  });
  return payload;
}`;
    return {
      language: 'typescript',
      syntax: `const token = await new SignJWT({ sub: userId })\n  .setExpirationTime('15m')\n  .sign(secret);\nconst { payload } = await jwtVerify(token, secret);`,
      code,
      title: `JWT issuance and verification for ${title}`,
      explanation: explanation(
        topic,
        'issuer and audience are verified, expiration is short, and the secret is read from the environment rather than source code.'
      ),
      output: 'A signed 15-minute token verifies successfully; expired or tampered tokens throw.',
    };
  }

  if (t.includes('password') || t.includes('hash')) {
    const code = `import { hash, verify } from '@node-rs/argon2';

const options = {
  memoryCost: 19456,
  timeCost: 2,
  parallelism: 1,
};

export async function hash${Title}Password(password: string) {
  if (password.length < 12) {
    throw new Error('Password must be at least 12 characters');
  }
  return hash(password, options);
}

export async function verify${Title}Password(password: string, storedHash: string) {
  return verify(storedHash, password);
}`;
    return {
      language: 'typescript',
      syntax: `const passwordHash = await hash(password, { memoryCost: 19456, timeCost: 2 });\nconst valid = await verify(passwordHash, password);`,
      code,
      title: `Password hashing for ${title}`,
      explanation: explanation(
        topic,
        'Argon2id is memory-hard, each hash includes a unique salt, and verification uses the parameters encoded in the stored hash.'
      ),
      output: 'A unique hash is stored; correct passwords verify and incorrect passwords return false.',
    };
  }

  if (t.includes('xss')) {
    const code = `const userComment = '<img src=x onerror=alert(1)>';

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[character]!
  );

// Escape for the exact context where the value is rendered.
const safeComment = escapeHtml(userComment);
document.querySelector('[data-comment]')!.textContent = safeComment;

// React escapes text children automatically:
// <p>{userComment}</p>
//
// Avoid dangerouslySetInnerHTML. If rich HTML is required,
// sanitize it with a maintained library on the server and
// keep the Content-Security-Policy in deny-by-default mode.`;
    return {
      language: 'typescript',
      syntax: `const safe = value.replace(/[&<>"']/g, (character) =>\n  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[character]!\n);\nelement.textContent = safe;`,
      code,
      title: `Context-aware output encoding for ${title}`,
      explanation: explanation(
        topic,
        'untrusted input is escaped for the HTML text context before insertion, React text children are safe by default, and raw HTML requires explicit sanitization plus CSP.'
      ),
      output: 'The browser displays the comment as text instead of executing the injected onerror handler.',
    };
  }

  if (t.includes('csrf')) {
    const code = `import { cookies } from 'next/headers';
import { randomBytes, timingSafeEqual } from 'node:crypto';

export async function issueCsrfToken() {
  const token = randomBytes(32).toString('base64url');

  (await cookies()).set('csrf', token, {
    httpOnly: false,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });

  return token;
}

export async function assertCsrfToken(submitted: string) {
  const expected = (await cookies()).get('csrf')?.value ?? '';
  const a = Buffer.from(expected);
  const b = Buffer.from(submitted);

  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    throw Object.assign(new Error('Invalid CSRF token'), { status: 403 });
  }
}`;
    return {
      language: 'typescript',
      syntax: `const token = randomBytes(32).toString('base64url');\nconst valid = timingSafeEqual(Buffer.from(expected), Buffer.from(submitted));`,
      code,
      title: `Double-submit CSRF protection for ${title}`,
      explanation: explanation(
        topic,
        'the token is unpredictable, the cookie is SameSite=Strict, and comparison is constant-time to avoid leaking the expected value.'
      ),
      output: 'State-changing requests without a matching token are rejected with 403.',
    };
  }

  if (t.includes('xss') || t.includes('csrf') || t.includes('cors') || t.includes('injection')) {
    const code = `// Defense in depth for ${title}
const response = new Response(html, {
  headers: {
    'Content-Type': 'text/html; charset=utf-8',
    'Content-Security-Policy':
      "default-src 'self'; script-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'",
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  },
});

// Parameterized query: never concatenate user input.
const rows = await db.query(
  'SELECT id, title FROM lessons WHERE slug = $1 AND status = $2',
  [slug, 'published']
);`;
    return {
      language: 'typescript',
      syntax: `headers.set('Content-Security-Policy', "default-src 'self'");\nconst rows = await db.query('SELECT * FROM lessons WHERE slug = $1', [slug]);`,
      code,
      title: `Defense-in-depth controls for ${title}`,
      explanation: explanation(
        topic,
        'CSP limits script execution, nosniff blocks MIME confusion, HSTS enforces HTTPS, and parameterized SQL separates data from code.'
      ),
      output: 'The browser enforces the policy and the database receives the slug as a value, not executable SQL.',
    };
  }

  if (t.includes('oauth') || t.includes('session') || t.includes('cookie') || t.includes('auth')) {
    const code = `import { cookies } from 'next/headers';

export async function create${Title}Session(userId: string) {
  const sessionId = crypto.randomUUID();

  await sessionStore.set(sessionId, { userId }, { ttl: 60 * 60 * 24 * 7 });

  (await cookies()).set('session', sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function read${Title}Session() {
  const sessionId = (await cookies()).get('session')?.value;
  return sessionId ? sessionStore.get(sessionId) : null;
}`;
    return {
      language: 'typescript',
      syntax: `cookies().set('session', id, {\n  httpOnly: true,\n  secure: true,\n  sameSite: 'lax',\n  path: '/',\n});`,
      code,
      title: `Session cookie for ${title}`,
      explanation: explanation(
        topic,
        'the cookie is HttpOnly, Secure in production, SameSite=Lax, and the server stores only an opaque session id.'
      ),
      output: 'The browser sends the cookie automatically; JavaScript cannot read it.',
    };
  }

  if (t.includes('role') || t.includes('rbac') || t.includes('authorization')) {
    const code = `type Role = 'student' | 'instructor' | 'admin';
type Permission = 'lesson:read' | 'lesson:write' | 'user:manage';

const permissions: Record<Role, Permission[]> = {
  student: ['lesson:read'],
  instructor: ['lesson:read', 'lesson:write'],
  admin: ['lesson:read', 'lesson:write', 'user:manage'],
};

export function can${Title}(role: Role, permission: Permission) {
  return permissions[role].includes(permission);
}

export function assert${Title}(role: Role, permission: Permission) {
  if (!can${Title}(role, permission)) {
    throw Object.assign(new Error('Forbidden'), { status: 403 });
  }
}`;
    return {
      language: 'typescript',
      syntax: `const permissions = { student: ['lesson:read'], admin: ['user:manage'] };\nif (!permissions[role].includes(permission)) throw new Error('Forbidden');`,
      code,
      title: `Role permissions for ${title}`,
      explanation: explanation(
        topic,
        'permissions are declared once per role, and route handlers assert a capability instead of checking role strings inline.'
      ),
      output: 'Students can read lessons; only instructors and admins can write; admins can manage users.',
    };
  }

  if (t.includes('rate') || t.includes('ddos') || t.includes('abuse')) {
    const code = `type Bucket = { tokens: number; updatedAt: number };

const buckets = new Map<string, Bucket>();
const capacity = 30;
const refillPerSecond = 0.5;

export function take${Title}Token(key: string) {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { tokens: capacity, updatedAt: now };
  const elapsed = (now - bucket.updatedAt) / 1000;

  bucket.tokens = Math.min(capacity, bucket.tokens + elapsed * refillPerSecond);
  bucket.updatedAt = now;

  if (bucket.tokens < 1) {
    buckets.set(key, bucket);
    return { allowed: false, retryAfter: Math.ceil((1 - bucket.tokens) / refillPerSecond) };
  }

  bucket.tokens -= 1;
  buckets.set(key, bucket);
  return { allowed: true, retryAfter: 0 };
}`;
    return {
      language: 'typescript',
      syntax: `const bucket = buckets.get(key) ?? { tokens: 30, updatedAt: Date.now() };\nbucket.tokens = Math.min(30, bucket.tokens + elapsed * 0.5);\nif (bucket.tokens < 1) return { allowed: false };`,
      code,
      title: `Token bucket limiter for ${title}`,
      explanation: explanation(
        topic,
        'tokens refill continuously, bursts are bounded by capacity, and the retry hint tells clients when to try again.'
      ),
      output: 'The first 30 requests succeed; further requests are rejected until tokens refill.',
    };
  }

  const code = `// Threat model for ${title}
const controls = {
  authentication: 'Verify identity before reading or mutating private data.',
  authorization: 'Check object ownership on every request, not just route access.',
  input: 'Validate shape, type, length, and allowed values at the boundary.',
  output: 'Encode untrusted values for the context where they are rendered.',
  transport: 'Require HTTPS and set HSTS in production.',
  secrets: 'Load from a secret manager, never from source control.',
  logging: 'Log security events without logging passwords or tokens.',
};`;
  return {
    language: 'text',
    syntax: `// ${title}\n[ ] Identity verified\n[ ] Object ownership checked\n[ ] Input validated\n[ ] Output encoded\n[ ] Secrets externalized`,
    code,
    title: `${title} security review`,
    explanation: explanation(
      topic,
      'the review converts the topic into concrete controls that can be checked before a release.'
    ),
    output: 'A release checklist that catches missing authentication, authorization, validation, encoding, and transport controls.',
  };
}

export function buildGitExample(topic: GeneratedTopic): DevExample {
  const slug = kebab(topic.id);
  const title = topic.title;
  const summary = withoutPeriod(topic.summary);
  const t = topic.id.toLowerCase();

  if (t.includes('rebase') || t.includes('merge')) {
    return {
      language: 'bash',
      syntax: `git switch feature/${slug}\ngit fetch origin\ngit rebase origin/main\ngit push --force-with-lease`,
      code: `# Rebase the feature branch onto the latest main
git switch feature/${slug}
git fetch origin
git rebase origin/main

# Resolve conflicts in the editor, then continue
git add <resolved-file>
git rebase --continue

# Update the remote branch safely after rewriting history
git push --force-with-lease`,
      title: `Rebase workflow for ${title}`,
      explanation: explanation(
        topic,
        'the feature branch is replayed on top of main for a linear history, and force-with-lease avoids overwriting teammates’ work.'
      ),
      output: 'A linear feature history on top of origin/main, with no unrelated merge commit.',
    };
  }

  if (t.includes('conflict')) {
    return {
      language: 'bash',
      syntax: `git status\ngit diff --name-only --diff-filter=U\n# edit conflict markers\ngit add <file>\ngit rebase --continue`,
      code: `# Identify conflicted files
git status
git diff --name-only --diff-filter=U

# Conflict markers inside a file:
# <<<<<<< HEAD
# current change
# =======
# incoming change
# >>>>>>> feature/${slug}

# Resolve, stage, and continue
git add src/${slug}.ts
git rebase --continue`,
      title: `Conflict resolution for ${title}`,
      explanation: explanation(
        topic,
        'conflicted paths are listed explicitly, markers are resolved by understanding both sides, and the operation continues only after staging.'
      ),
      output: 'The rebase completes with a coherent file and no leftover conflict markers.',
    };
  }

  if (t.includes('commit') || t.includes('staging')) {
    return {
      language: 'bash',
      syntax: `git add -p\ngit commit -m "feat(${slug}): explain ${title.toLowerCase()}"`,
      code: `# Stage only the intended hunks
git add -p src/

# Verify exactly what will be committed
git diff --cached --stat
git diff --cached

# Write a conventional commit
git commit -m "feat(${slug}): add ${title.toLowerCase()} lesson" \\
  -m "Covers ${summary.toLowerCase()}."`,
      title: `Semantic commit for ${title}`,
      explanation: explanation(
        topic,
        'interactive staging keeps unrelated edits out of the commit, and the conventional prefix makes the change easy to scan.'
      ),
      output: 'A focused commit containing only the lesson change and a descriptive conventional message.',
    };
  }

  if (t.includes('stash') || t.includes('bisect') || t.includes('cherry')) {
    return {
      language: 'bash',
      syntax: `git stash push -m "${title}"\ngit stash list\ngit stash pop\ngit bisect start\ngit bisect bad\ngit bisect good <sha>`,
      code: `# Temporarily shelve unrelated work
git stash push -m "${title} work in progress"
git stash list
git stash pop

# Find the commit that introduced a regression
git bisect start
git bisect bad
git bisect good v1.4.0
# test, then mark each commit good or bad
git bisect reset

# Apply one commit from another branch
git cherry-pick <commit-sha>`,
      title: `Advanced Git recovery for ${title}`,
      explanation: explanation(
        topic,
        'stash protects local work, bisect narrows a regression to one commit in logarithmic steps, and cherry-pick copies a single change.'
      ),
      output: 'Local work is restored, the first bad commit is identified, and the selected fix is applied cleanly.',
    };
  }

  if (t.includes('pull') || t.includes('review')) {
    return {
      language: 'bash',
      syntax: `git switch -c feature/${slug}\ngit push -u origin feature/${slug}\ngh pr create --fill`,
      code: `git switch -c feature/${slug}
git add src/${slug}.ts
git commit -m "feat(${slug}): add ${title.toLowerCase()} lesson"
git push -u origin feature/${slug}

gh pr create \\
  --title "feat(${slug}): ${title}" \\
  --body "## Summary\\n- Adds ${title}\\n- Covers ${summary}\\n\\n## Verification\\n- npm run build\\n- npm run lint"`,
      title: `Pull request workflow for ${title}`,
      explanation: explanation(
        topic,
        'the branch is scoped to one change, the PR body records the summary and verification steps, and the reviewer has enough context to approve.'
      ),
      output: 'A reviewable pull request with a focused diff and reproducible verification notes.',
    };
  }

  return {
    language: 'bash',
    syntax: `git status\ngit switch -c feature/${slug}\ngit add <files>\ngit commit -m "docs(${slug}): update ${title.toLowerCase()}"`,
    code: `git status
git switch -c feature/${slug}
git add src/${slug}.ts
git commit -m "docs(${slug}): update ${title.toLowerCase()}"
git log --oneline -5`,
    title: `${title} Git workflow`,
    explanation: explanation(
      topic,
      'the workflow checks the working tree, creates a scoped branch, stages explicitly, and verifies the resulting history.'
    ),
    output: 'A clean feature branch with one descriptive commit.',
  };
}

export function buildTestingExample(topic: GeneratedTopic): DevExample {
  const slug = kebab(topic.id);
  const Title = pascal(topic.id);
  const title = topic.title;
  const summary = withoutPeriod(topic.summary);
  const t = topic.id.toLowerCase();

  if (t.includes('unit-testing') || t.includes('testing-pyramid')) {
    const code = `import { describe, expect, it, vi } from 'vitest';
import { calculateTotal } from './calculate-total';

// Unit: fast, isolated, no network or database.
describe('calculateTotal', () => {
  it('returns zero for an empty cart', () => {
    expect(calculateTotal([])).toBe(0);
  });

  it('adds quantity times price for every line item', () => {
    expect(
      calculateTotal([
        { price: 25, quantity: 2 },
        { price: 10, quantity: 1 },
      ])
    ).toBe(60);
  });

  it('rejects a negative price', () => {
    expect(() => calculateTotal([{ price: -1, quantity: 1 }])).toThrow(
      'price must be positive'
    );
  });
});

// Integration: one real boundary, one test double.
it('creates an order through the repository', async () => {
  const repository = {
    save: vi.fn().mockResolvedValue({ id: 'order_1' }),
  };

  const order = await createOrder({ items: [{ price: 25, quantity: 2 }] }, repository);

  expect(order.id).toBe('order_1');
  expect(repository.save).toHaveBeenCalledOnce();
});

// E2E: a small number of critical user journeys.
// test('checkout completes', async ({ page }) => { ... });`;
    return {
      language: 'typescript',
      syntax: `// Unit\nit('adds quantities', () => {\n  expect(calculateTotal(items)).toBe(60);\n});\n\n// Integration\nconst repository = { save: vi.fn().mockResolvedValue({ id: '1' }) };\n\n// E2E\ntest('checkout completes', async ({ page }) => { … });`,
      code,
      title: `Testing pyramid for ${title}`,
      explanation: explanation(
        topic,
        'many fast unit tests cover pure rules, a few integration tests prove boundaries with test doubles, and only critical journeys need a browser-level end-to-end test.'
      ),
      output: 'Unit tests finish in milliseconds, the integration test verifies the repository contract, and the e2e suite stays small and stable.',
    };
  }

  if (t.includes('playwright') || t.includes('e2e')) {
    return {
      language: 'typescript',
      syntax: `import { test, expect } from '@playwright/test';\n\ntest('${title}', async ({ page }) => {\n  await page.goto('/${slug}');\n  await expect(page.getByRole('heading', { level: 1 })).toContainText('${title}');\n});`,
      code: `import { test, expect } from '@playwright/test';

test('${title} renders and navigates', async ({ page }) => {
  await page.goto('/full-stack/${slug}');

  await expect(
    page.getByRole('heading', { level: 1 })
  ).toContainText('${title}');

  await page.getByRole('link', { name: 'Related topics' }).click();
  await expect(page).toHaveURL(/related-topics/);
});`,
      title: `End-to-end test for ${title}`,
      explanation: explanation(
        topic,
        'the test navigates like a user, asserts an accessible heading, and verifies a real URL transition instead of implementation details.'
      ),
      output: 'The test passes when the page renders and the related-topics link navigates to the expected route.',
    };
  }

  if (t.includes('react-testing') || t.includes('component')) {
    return {
      language: 'typescript',
      syntax: `render(<Component />);\nawait user.click(screen.getByRole('button', { name: /save/i }));\nexpect(screen.getByRole('status')).toHaveTextContent('Saved');`,
      code: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ${Title}Form } from './${Title}Form';

it('saves ${title} through an accessible form', async () => {
  const user = userEvent.setup();
  render(<${Title}Form />);

  await user.type(screen.getByLabelText('Note'), '${summary}');
  await user.click(screen.getByRole('button', { name: /save/i }));

  expect(await screen.findByRole('status')).toHaveTextContent('Saved');
});`,
      title: `Component test for ${title}`,
      explanation: explanation(
        topic,
        'the test queries by label and role, interacts through userEvent, and waits for the accessible status message.'
      ),
      output: 'The form accepts typed input, submits, and announces the saved state.',
    };
  }

  if (t.includes('tdd')) {
    return {
      language: 'typescript',
      syntax: `it('returns zero for an empty list', () => {\n  expect(calculateTotal([])).toBe(0);\n});`,
      code: `import { describe, expect, it } from 'vitest';
import { calculate${Title}Total } from './calculate';

describe('${title}', () => {
  it('returns zero for an empty list', () => {
    expect(calculate${Title}Total([])).toBe(0);
  });

  it('adds every value', () => {
    expect(calculate${Title}Total([10, 20, 30])).toBe(60);
  });

  it('rejects negative values', () => {
    expect(() => calculate${Title}Total([-1])).toThrow('negative');
  });
});`,
      title: `Red-green-refactor tests for ${title}`,
      explanation: explanation(
        topic,
        'the first test defines the simplest behavior, the second proves the happy path, and the third pins the invalid-input contract.'
      ),
      output: 'All three tests define the function before the implementation exists, then pass after the minimal implementation.',
    };
  }

  if (t.includes('monitor') || t.includes('debug')) {
    return {
      language: 'typescript',
      syntax: `try {\n  await run();\n} catch (error) {\n  Sentry.captureException(error);\n  throw error;\n}`,
      code: `import * as Sentry from '@sentry/nextjs';

export async function run${Title}() {
  try {
    return await execute${Title}();
  } catch (error) {
    Sentry.captureException(error, {
      tags: { topic: '${slug}' },
      contexts: { lesson: { title: '${title}' } },
    });
    throw error;
  }
}`,
      title: `Production diagnostics for ${title}`,
      explanation: explanation(
        topic,
        'the error is reported with topic tags and lesson context, then rethrown so the caller still handles the failure.'
      ),
      output: 'Failures appear in Sentry grouped by topic; local behavior remains unchanged.',
    };
  }

  return {
    language: 'typescript',
    syntax: `describe('${title}', () => {\n  it('handles the happy path', () => {\n    expect(run()).toEqual(expected);\n  });\n});`,
    code: `import { describe, expect, it } from 'vitest';

describe('${title}', () => {
  it('returns the expected result', () => {
    expect(execute${Title}('curriculum')).toEqual({
      topic: '${title}',
      summary: '${summary}.',
    });
  });

  it('rejects empty input', () => {
    expect(() => execute${Title}('')).toThrow('required');
  });
});`,
    title: `Unit tests for ${title}`,
    explanation: explanation(
      topic,
      'the suite covers one happy path and one boundary case, which is the minimum useful contract for this topic.'
    ),
    output: 'Both tests pass before the implementation is refactored.',
  };
}

export function buildDevopsExample(topic: GeneratedTopic): DevExample {
  const slug = kebab(topic.id);
  const title = topic.title;
  const t = topic.id.toLowerCase();

  if (t.includes('docker') || t.includes('compose')) {
    return {
      language: 'dockerfile',
      syntax: `FROM node:22-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\nCMD ["npm", "start"]`,
      code: `FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
USER node
EXPOSE 3000
CMD ["node", "server.js"]`,
      title: `Multi-stage container for ${title}`,
      explanation: explanation(
        topic,
        'dependencies, build, and runtime are separate stages, the final image contains only the standalone output, and the process runs as a non-root user.'
      ),
      output: 'A small production image that starts the standalone Next.js server on port 3000.',
    };
  }

  if (t.includes('cicd') || t.includes('actions')) {
    return {
      language: 'yaml',
      syntax: `name: CI\non: [push, pull_request]\njobs:\n  verify:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci\n      - run: npm run lint\n      - run: npm run build`,
      code: `name: Verify ${title}
on:
  push:
    branches: [main]
  pull_request:

jobs:
  verify:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npx tsc --noEmit
      - run: npm run build`,
      title: `CI pipeline for ${title}`,
      explanation: explanation(
        topic,
        'the workflow runs on pull requests and main, caches dependencies, and blocks merge when lint, types, or build fail.'
      ),
      output: 'A green check only after install, lint, typecheck, and production build all succeed.',
    };
  }

  if (t.includes('vercel') || t.includes('deploy') || t.includes('hosting') || t.includes('build')) {
    return {
      language: 'bash',
      syntax: `npm run build\nnpm run start\n# or\nvercel --prod`,
      code: `# Verify the production build locally
npm run build
npm run start

# Deploy with the Vercel CLI
vercel pull --yes --environment=production
vercel build --prod
vercel deploy --prebuilt --prod

# Required production environment variables
# DATABASE_URL
# NEXTAUTH_SECRET
# NEXT_PUBLIC_SITE_URL`,
      title: `Production release for ${title}`,
      explanation: explanation(
        topic,
        'the build is verified locally before deployment, and production secrets are pulled from the platform instead of committed.'
      ),
      output: 'A production deployment whose build output matches the locally verified build.',
    };
  }

  if (t.includes('nginx') || t.includes('vps') || t.includes('ssl') || t.includes('pm2') || t.includes('domain')) {
    return {
      language: 'bash',
      syntax: `sudo certbot --nginx -d example.com\nsudo nginx -t\nsudo systemctl reload nginx\npm2 start npm --name app -- start`,
      code: `# /etc/nginx/sites-available/${slug}
server {
  listen 443 ssl http2;
  server_name ${slug}.example.com;

  ssl_certificate /etc/letsencrypt/live/${slug}.example.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/${slug}.example.com/privkey.pem;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}

# Verify and reload
sudo nginx -t && sudo systemctl reload nginx`,
      title: `Reverse proxy and TLS for ${title}`,
      explanation: explanation(
        topic,
        'Nginx terminates TLS, forwards the original host and client address, and the configuration is validated before reload.'
      ),
      output: 'HTTPS requests reach the Node process on port 3000 with correct forwarded headers.',
    };
  }

  return {
    language: 'yaml',
    syntax: `name: Deploy\non:\n  push:\n    branches: [main]\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci && npm run build`,
    code: `name: Deploy ${title}
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - name: Deploy
        run: echo "Deploy the verified artifact with your provider CLI"`,
    title: `${title} deployment pipeline`,
    explanation: explanation(
      topic,
      'the pipeline only runs on main, uses a protected production environment, and deploys the same artifact that passed the build.'
    ),
    output: 'A production deployment gated on a successful build.',
  };
}

export function buildProfessionalExample(topic: GeneratedTopic): DevExample {
  const slug = kebab(topic.id);
  const Title = pascal(topic.id);
  const title = topic.title;
  const summary = withoutPeriod(topic.summary);
  const t = topic.id.toLowerCase();

  if (t.includes('solid') || t.includes('clean-code') || t.includes('design-pattern')) {
    return {
      language: 'typescript',
      syntax: `interface Repository<T> {\n  findById(id: string): Promise<T | null>;\n}\n\nclass Service {\n  constructor(private readonly repository: Repository<Entity>) {}\n}`,
      code: `interface ${Title}Repository {
  findById(id: string): Promise<${Title}Record | null>;
  save(record: ${Title}Record): Promise<void>;
}

class ${Title}Service {
  constructor(private readonly repository: ${Title}Repository) {}

  async rename(id: string, title: string) {
    if (!title.trim()) throw new Error('Title is required');

    const record = await this.repository.findById(id);
    if (!record) throw new Error('Not found');

    await this.repository.save({ ...record, title: title.trim() });
  }
}`,
      title: `SOLID boundary for ${title}`,
      explanation: explanation(
        topic,
        'the service depends on an abstraction, owns one use case, and remains testable without a database.'
      ),
      output: 'A service that can be unit-tested with an in-memory repository and swapped for a real one in production.',
    };
  }

  if (t.includes('system-design') || t.includes('architecture') || t.includes('scalab')) {
    return {
      language: 'text',
      syntax: `Client -> CDN -> Load Balancer -> App Servers -> Cache -> Database\n                                      |\n                                 Background Queue`,
      code: `// ${title}: request path
//
// 1. Browser requests /full-stack/${slug}
// 2. CDN serves cached HTML when available
// 3. Load balancer routes to a stateless app instance
// 4. App checks Redis for hot data
// 5. On miss, app queries PostgreSQL with a bounded query
// 6. Slow work is queued to a background worker
// 7. Response includes cache and trace headers
//
// Capacity questions:
// - What is the read/write ratio?
// - Which data can be stale for 60 seconds?
// - What happens when Redis is unavailable?
// - How is the database protected from a traffic spike?`,
      title: `Scalable request path for ${title}`,
      explanation: explanation(
        topic,
        'the design separates static delivery, stateless compute, caching, persistence, and asynchronous work so each tier can scale independently.'
      ),
      output: 'A request path with explicit caching, failure, and capacity decisions rather than a single monolithic server.',
    };
  }

  if (t.includes('accessibility')) {
    return {
      language: 'tsx',
      syntax: `<a href="#main">Skip to main content</a>\n<main id="main" tabIndex={-1}>\n  <h1>{title}</h1>\n</main>`,
      code: `export function ${Title}Page() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <main id="main-content" tabIndex={-1}>
        <h1>${title}</h1>
        <p>${summary}.</p>
        <button type="button" aria-expanded="false" aria-controls="${slug}-panel">
          Show details
        </button>
        <div id="${slug}-panel" hidden>
          <h2>Details</h2>
          <p>Keyboard focus must remain visible at every step.</p>
        </div>
      </main>
    </>
  );
}`,
      title: `Accessible page pattern for ${title}`,
      explanation: explanation(
        topic,
        'the skip link, focusable main landmark, semantic heading, and expanded state cover the highest-impact accessibility checks.'
      ),
      output: 'Keyboard users can skip navigation, reach the heading, and operate the disclosure with visible focus.',
    };
  }

  return {
    language: 'markdown',
    syntax: `# ADR: ${title}\n\n## Context\n## Decision\n## Consequences`,
    code: `# Architecture Decision Record: ${title}

## Status
Accepted

## Context
${summary}.

## Decision
Document the approach used for ${title}, including the constraints,
alternatives considered, and the verification evidence.

## Consequences
- Positive: the team has one shared decision to review.
- Negative: the decision must be revisited if constraints change.
- Follow-up: add tests and monitoring that prove the decision holds.`,
    title: `Decision record for ${title}`,
    explanation: explanation(
      topic,
      'the record captures context, decision, and consequences so future engineers can understand why the system works this way.'
    ),
    output: 'A reviewable ADR that links the topic to concrete engineering decisions.',
  };
}

export function buildFoundationsExample(topic: GeneratedTopic): DevExample {
  const slug = kebab(topic.id);
  const title = topic.title;
  const summary = withoutPeriod(topic.summary);
  const t = topic.id.toLowerCase();

  if (t.includes('client-server') || t.includes('http') || t.includes('internet') || t.includes('browser')) {
    return {
      language: 'http',
      syntax: `GET /api/courses HTTP/1.1\nHost: learnwithumar.vercel.app\nAccept: application/json\n\nHTTP/1.1 200 OK\nContent-Type: application/json`,
      code: `GET /full-stack/html-complete-guide/${slug} HTTP/1.1
Host: learnwithumar.vercel.app
Accept: text/html
Accept-Encoding: br, gzip
Connection: keep-alive

HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Cache-Control: public, max-age=0, must-revalidate
Content-Encoding: br

<!doctype html>
<html lang="en">
  <head><title>${title} — Learn with Umar</title></head>
  <body><h1>${title}</h1></body>
</html>`,
      title: `Request/response trace for ${title}`,
      explanation: explanation(
        topic,
        'the request names the resource and accepted formats; the response identifies the representation, cache policy, and compression.'
      ),
      output: 'The browser renders the HTML after decoding the compressed response.',
    };
  }

  if (t.includes('git') || t.includes('vscode') || t.includes('developer-tools')) {
    return {
      language: 'bash',
      syntax: `git init\ngit add .\ngit commit -m "chore: initialize project"\nnpm run dev`,
      code: `# ${title}: local setup
git init
git add .
git commit -m "chore: initialize learnwithumar workspace"

npm install
npm run dev

# Verify the app responds before opening a browser
curl -I http://localhost:3000`,
      title: `Local workflow for ${title}`,
      explanation: explanation(
        topic,
        'the repository is initialized, dependencies installed, and the running server verified with a real HTTP response.'
      ),
      output: 'HTTP/1.1 200 OK from the local development server.',
    };
  }

  const code = `// ${title}
// ${summary}.
//
// Request path:
// 1. Browser resolves the hostname with DNS.
// 2. TCP and TLS establish a secure connection.
// 3. HTTP requests the route.
// 4. The server returns HTML, CSS, JavaScript, and data.
// 5. The browser parses, renders, and hydrates the page.`;
  return {
    language: 'text',
    syntax: `Browser -> DNS -> TCP/TLS -> HTTP -> Server -> Response -> Render`,
    code,
    title: `${title} request flow`,
    explanation: explanation(
      topic,
      'the outline names each phase and the responsibility of the client, network, and server.'
    ),
    output: 'A complete request lifecycle that can be discussed in an interview or debugged in DevTools.',
  };
}

export function buildPlatformExample(
  category: 'foundations' | 'api' | 'security' | 'git' | 'testing' | 'devops' | 'professional',
  topic: GeneratedTopic
): DevExample {
  switch (category) {
    case 'foundations':
      return buildFoundationsExample(topic);
    case 'api':
      return buildApiExample(topic);
    case 'security':
      return buildSecurityExample(topic);
    case 'git':
      return buildGitExample(topic);
    case 'testing':
      return buildTestingExample(topic);
    case 'devops':
      return buildDevopsExample(topic);
    case 'professional':
      return buildProfessionalExample(topic);
  }
}
