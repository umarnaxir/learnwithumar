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

export function buildNodeExample(topic: GeneratedTopic): DevExample {
  const slug = kebab(topic.id);
  const Title = pascal(topic.id);
  const title = topic.title;
  const summary = withoutPeriod(topic.summary);
  const t = topic.id.toLowerCase();

  if (t.includes('file-system') || t.includes('file') || t.includes('fs')) {
    const code = `import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const file = join(process.cwd(), 'data', '${slug}.json');

export async function save${Title}(value: unknown) {
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(value, null, 2), 'utf8');
}

export async function read${Title}() {
  try {
    return JSON.parse(await readFile(file, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}`;
    return {
      language: 'typescript',
      syntax: `import { readFile, writeFile } from 'node:fs/promises';\nawait writeFile(file, data, 'utf8');\nconst value = JSON.parse(await readFile(file, 'utf8'));`,
      code,
      title: `Durable file storage for ${title}`,
      explanation: explanation(
        topic,
        'the directory is created recursively, writes use the promise API, and ENOENT is treated as a missing value instead of a crash.'
      ),
      output: 'The JSON file is created on first write and read back as a parsed object on subsequent calls.',
    };
  }

  if (t.includes('stream')) {
    const code = `import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createGzip } from 'node:zlib';

export async function compress${Title}(source, destination) {
  await pipeline(
    createReadStream(source),
    createGzip(),
    createWriteStream(destination)
  );

  return destination;
}

await compress${Title}('data/source.csv', 'data/source.csv.gz');`;
    return {
      language: 'typescript',
      syntax: `await pipeline(\n  createReadStream(source),\n  createGzip(),\n  createWriteStream(destination)\n);`,
      code,
      title: `Backpressure-safe stream for ${title}`,
      explanation: explanation(
        topic,
        'pipeline forwards errors and backpressure across every stage, so a slow destination cannot exhaust memory.'
      ),
      output: 'A compressed .gz file is produced; a read or write failure rejects the promise.',
    };
  }

  if (t.includes('event-loop') || t.includes('architecture') || t.includes('async')) {
    const code = `import { setTimeout as delay } from 'node:timers/promises';

async function run${Title}() {
  const started = performance.now();

  const [profile, courses] = await Promise.all([
    delay(40, { value: 'profile' }),
    delay(60, { value: 'courses' }),
  ]);

  console.log(profile.value, courses.value);
  console.log('elapsed', Math.round(performance.now() - started), 'ms');
}

await run${Title}();`;
    return {
      language: 'typescript',
      syntax: `const [a, b] = await Promise.all([\n  fetchA(),\n  fetchB(),\n]);`,
      code,
      title: `Concurrent async work for ${title}`,
      explanation: explanation(
        topic,
        'Promise.all starts both I/O operations before awaiting, so total time is close to the slowest operation rather than the sum.'
      ),
      output: 'profile courses\nelapsed 60 ms',
    };
  }

  if (t.includes('event')) {
    const code = `import { EventEmitter } from 'node:events';

type ${Title}Events = {
  created: [id: string];
  failed: [id: string, reason: string];
};

class ${Title}Bus extends EventEmitter {
  emitCreated(id: string) {
    this.emit('created', id);
  }
}

const bus = new ${Title}Bus();
bus.once('created', (id) => console.log('created', id));
bus.emitCreated('${slug}-1');
bus.emitCreated('${slug}-2');`;
    return {
      language: 'typescript',
      syntax: `const bus = new EventEmitter();\nbus.once('created', handler);\nbus.emit('created', id);`,
      code,
      title: `Event-driven boundary for ${title}`,
      explanation: explanation(
        topic,
        'once registers a one-shot listener, while emit passes typed event payloads to every current subscriber.'
      ),
      output: `created ${slug}-1`,
    };
  }

  if (t.includes('env') || t.includes('process')) {
    const code = `const required = ['DATABASE_URL', 'JWT_SECRET', 'PORT'] as const;

function read${Title}Env() {
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error('Missing environment variables: ' + missing.join(', '));
  }

  return {
    databaseUrl: process.env.DATABASE_URL!,
    jwtSecret: process.env.JWT_SECRET!,
    port: Number(process.env.PORT ?? 3000),
  };
}

const env = read${Title}Env();
console.log('Starting on port', env.port);`;
    return {
      language: 'typescript',
      syntax: `const missing = required.filter((key) => !process.env[key]);\nif (missing.length) throw new Error('Missing: ' + missing.join(', '));`,
      code,
      title: `Validated environment for ${title}`,
      explanation: explanation(
        topic,
        'configuration is validated once at startup, and the process fails fast instead of discovering a missing secret during a request.'
      ),
      output: 'Starting on port 3000',
    };
  }

  if (t.includes('cluster') || t.includes('worker')) {
    const code = `import { Worker, isMainThread, parentPort } from 'node:worker_threads';

if (isMainThread) {
  const worker = new Worker(new URL(import.meta.url));

  worker.on('message', (result) => {
    console.log('${title} result:', result);
  });

  worker.postMessage({ values: [12, 18, 24, 30] });
} else {
  parentPort?.on('message', ({ values }) => {
    const total = values.reduce((sum, value) => sum + value, 0);
    parentPort?.postMessage(total);
  });
}`;
    return {
      language: 'typescript',
      syntax: `const worker = new Worker(new URL(import.meta.url));\nworker.postMessage(input);\nworker.on('message', handleResult);`,
      code,
      title: `Worker thread for ${title}`,
      explanation: explanation(
        topic,
        'the CPU-bound calculation runs off the main thread, keeping the event loop free to accept new connections.'
      ),
      output: `${title} result: 84`,
    };
  }

  if (t.includes('http') || t.includes('backend-app')) {
    const code = `import { createServer } from 'node:http';

const server = createServer((request, response) => {
  if (request.method === 'GET' && request.url === '/health') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ status: 'ok', topic: '${title}' }));
    return;
  }

  response.writeHead(404, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(3000, () => console.log('Listening on http://localhost:3000'));`;
    return {
      language: 'typescript',
      syntax: `const server = createServer((request, response) => {\n  response.writeHead(200, { 'Content-Type': 'application/json' });\n  response.end(JSON.stringify({ status: 'ok' }));\n});`,
      code,
      title: `Native HTTP server for ${title}`,
      explanation: explanation(
        topic,
        'the handler checks method and URL explicitly, sets the content type, and always ends the response.'
      ),
      output: `GET /health returns {"status":"ok","topic":"${title}"}; other paths return 404.`,
    };
  }

  const code = `import { createServer } from 'node:http';

export function start${Title}Server(port = 3000) {
  return createServer((request, response) => {
    const url = new URL(request.url ?? '/', 'http://localhost');

    if (url.pathname !== '/${slug}') {
      response.writeHead(404).end();
      return;
    }

    response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('${title}: ${summary}');
  }).listen(port);
}`;
  return {
    language: 'typescript',
    syntax: `import { createServer } from 'node:http';\ncreateServer(handler).listen(3000);`,
    code,
    title: `${title} server module`,
    explanation: explanation(
      topic,
      'the module exposes a start function, parses the request URL safely, and sends a single clear text response.'
    ),
    output: `GET /${slug} returns the lesson summary with a 200 status.`,
  };
}

export function buildExpressExample(topic: GeneratedTopic): DevExample {
  const slug = kebab(topic.id);
  const Title = pascal(topic.id);
  const title = topic.title;
  const summary = withoutPeriod(topic.summary);
  const t = topic.id.toLowerCase();

  if (t.includes('jwt')) {
    const code = `import jwt from 'jsonwebtoken';
import type { RequestHandler } from 'express';

const ACCESS_SECRET = process.env.JWT_SECRET!;

export const require${Title}: RequestHandler = (request, response, next) => {
  const token = request.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return response.status(401).json({ error: 'Missing bearer token' });
  }

  try {
    const payload = jwt.verify(token, ACCESS_SECRET) as { sub: string; role: string };
    (request as typeof request & { user?: typeof payload }).user = payload;
    next();
  } catch {
    response.status(401).json({ error: 'Invalid or expired token' });
  }
};

export function issue${Title}Token(userId: string, role = 'student') {
  return jwt.sign({ sub: userId, role }, ACCESS_SECRET, {
    expiresIn: '15m',
    issuer: 'learnwithumar',
  });
}`;
    return {
      language: 'typescript',
      syntax: `const token = jwt.sign({ sub: userId }, secret, { expiresIn: '15m' });\nconst payload = jwt.verify(token, secret);`,
      code,
      title: `JWT middleware for ${title}`,
      explanation: explanation(
        topic,
        'the middleware rejects missing or invalid tokens, attaches the verified payload for downstream handlers, and keeps access tokens short-lived.'
      ),
      output: 'Protected requests without a valid token receive 401; valid requests reach the controller with request.user set.',
    };
  }

  if (t.includes('error')) {
    const code = `import type { ErrorRequestHandler } from 'express';

export class ${Title}Error extends Error {
  constructor(message: string, readonly status = 400) {
    super(message);
    this.name = '${Title}Error';
  }
}

export const errorHandler${Title}: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof ${Title}Error) {
    return response.status(error.status).json({
      error: error.name,
      message: error.message,
    });
  }

  console.error('Unhandled ${title} error', error);
  response.status(500).json({ error: 'Internal Server Error' });
};`;
    return {
      language: 'typescript',
      syntax: `app.use((error, request, response, next) => {\n  response.status(error.status ?? 500).json({ error: error.message });\n});`,
      code,
      title: `Centralized error boundary for ${title}`,
      explanation: explanation(
        topic,
        'expected domain errors keep their status, unexpected errors are logged and hidden behind a generic 500 response.'
      ),
      output: 'Known validation errors return their status; unknown failures return a safe 500 JSON payload.',
    };
  }

  if (t.includes('validation')) {
    const code = `import { z } from 'zod';
import type { RequestHandler } from 'express';

const ${Title}Schema = z.object({
  title: z.string().min(3).max(120),
  summary: z.string().min(10).max(500),
});

export const validate${Title}: RequestHandler = (request, response, next) => {
  const result = ${Title}Schema.safeParse(request.body);

  if (!result.success) {
    return response.status(422).json({
      error: 'Validation failed',
      issues: result.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }

  request.body = result.data;
  next();
};`;
    return {
      language: 'typescript',
      syntax: `const result = Schema.safeParse(request.body);\nif (!result.success) return response.status(422).json(result.error);\nrequest.body = result.data;`,
      code,
      title: `Validated payloads for ${title}`,
      explanation: explanation(
        topic,
        'the schema rejects unknown or malformed payloads before the controller runs and returns field-level issues.'
      ),
      output: 'Invalid bodies receive 422 with issue paths; valid bodies are replaced by the parsed, typed value.',
    };
  }

  if (t.includes('middleware')) {
    const code = `import type { RequestHandler } from 'express';

export function ${Title}RequestContext(): RequestHandler {
  return (request, response, next) => {
    const started = performance.now();

    response.on('finish', () => {
      console.log('${title}', {
        method: request.method,
        path: request.path,
        status: response.statusCode,
        durationMs: Math.round(performance.now() - started),
      });
    });

    response.setHeader('x-topic', '${slug}');
    next();
  };
}

// app.use(${Title}RequestContext());`;
    return {
      language: 'typescript',
      syntax: `const middleware: RequestHandler = (request, response, next) => {\n  response.setHeader('x-topic', '${slug}');\n  next();\n};\napp.use(middleware);`,
      code,
      title: `Custom middleware for ${title}`,
      explanation: explanation(
        topic,
        'the middleware finishes the response lifecycle, records a structured timing event, and adds a diagnostic header.'
      ),
      output: 'Each completed request logs method, path, status, and duration.',
    };
  }

  if (t.includes('security') || t.includes('cors') || t.includes('helmet')) {
    const code = `import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

const app = express();

app.use(helmet());
app.use(cors({
  origin: ['https://learnwithumar.vercel.app'],
  credentials: true,
}));
app.use(rateLimit({
  windowMs: 60_000,
  limit: 60,
  standardHeaders: 'draft-8',
}));
app.use(express.json({ limit: '100kb' }));

app.get('/${slug}', (_request, response) => {
  response.json({ topic: '${title}' });
});`;
    return {
      language: 'typescript',
      syntax: `app.use(helmet());\napp.use(cors({ origin: ['https://example.com'], credentials: true }));\napp.use(rateLimit({ windowMs: 60_000, limit: 60 }));`,
      code,
      title: `Hardened Express baseline for ${title}`,
      explanation: explanation(
        topic,
        'security headers, an explicit CORS allowlist, request rate limits, and a body-size cap are applied before any route.'
      ),
      output: 'Responses include hardened headers; cross-origin requests outside the allowlist and bursts above 60 requests/minute are rejected.',
    };
  }

  if (t.includes('crud') || t.includes('routing') || t.includes('rest') || t.includes('project')) {
    const code = `import { Router } from 'express';

const router = Router();

router.get('/${slug}', async (_request, response) => {
  const rows = await db.${slug}.findMany();
  response.json({ data: rows });
});

router.post('/${slug}', async (request, response) => {
  const created = await db.${slug}.create({ data: request.body });
  response.status(201).json({ data: created });
});

router.patch('/${slug}/:id', async (request, response) => {
  const updated = await db.${slug}.update({
    where: { id: request.params.id },
    data: request.body,
  });
  response.json({ data: updated });
});

router.delete('/${slug}/:id', async (request, response) => {
  await db.${slug}.delete({ where: { id: request.params.id } });
  response.status(204).end();
});

export default router;`;
    return {
      language: 'typescript',
      syntax: `router.get('/${slug}', list);\nrouter.post('/${slug}', create);\nrouter.patch('/${slug}/:id', update);\nrouter.delete('/${slug}/:id', remove);`,
      code,
      title: `REST resource for ${title}`,
      explanation: explanation(
        topic,
        'each HTTP method maps to one resource operation, POST returns 201 with the created entity, and DELETE returns 204.'
      ),
      output: 'GET, POST, PATCH, and DELETE return the expected status codes and JSON payloads.',
    };
  }

  if (t.includes('auth')) {
    const code = `import type { RequestHandler } from 'express';

export const require${Title}Session: RequestHandler = (request, response, next) => {
  const session = request.cookies?.session;

  if (!session) {
    return response.status(401).json({ error: 'Authentication required' });
  }

  request.user = { id: session.userId, role: session.role };
  next();
};

export function ${Title}Route(router) {
  router.get('/${slug}/me', require${Title}Session, (request, response) => {
    response.json({ data: request.user });
  });
}`;
    return {
      language: 'typescript',
      syntax: `const requireSession = (request, response, next) => {\n  if (!request.user) return response.status(401).end();\n  next();\n};`,
      code,
      title: `Authenticated route for ${title}`,
      explanation: explanation(
        topic,
        'the middleware verifies the session before the handler and exposes only the fields downstream code needs.'
      ),
      output: 'Authenticated requests return the current user; anonymous requests receive 401.',
    };
  }

  const code = `import express from 'express';

const app = express();
app.use(express.json());

app.get('/api/${slug}', async (_request, response) => {
  response.json({
    topic: '${title}',
    summary: '${summary}.',
  });
});

app.post('/api/${slug}', async (request, response) => {
  const { value } = request.body ?? {};
  if (typeof value !== 'string' || !value.trim()) {
    return response.status(422).json({ error: 'value is required' });
  }

  return response.status(201).json({ data: { value } });
});

app.listen(4000, () => console.log('${title} API on :4000'));`;
  return {
    language: 'typescript',
    syntax: `const app = express();\napp.use(express.json());\napp.get('/api/${slug}', handler);\napp.listen(4000);`,
    code,
    title: `${title} Express route`,
    explanation: explanation(
      topic,
      'the route validates write payloads, uses explicit success statuses, and separates app setup from the handlers.'
    ),
    output: 'GET returns the topic and summary; POST returns 201 for valid input or 422 otherwise.',
  };
}

export function buildNestExample(topic: GeneratedTopic): DevExample {
  const slug = kebab(topic.id);
  const Title = pascal(topic.id);
  const title = topic.title;
  const summary = withoutPeriod(topic.summary);
  const t = topic.id.toLowerCase();

  if (t.includes('module')) {
    const code = `// ${slug}.module.ts
import { Module } from '@nestjs/common';
import { ${Title}Controller } from './${slug}.controller';
import { ${Title}Service } from './${slug}.service';

@Module({
  controllers: [${Title}Controller],
  providers: [${Title}Service],
  exports: [${Title}Service],
})
export class ${Title}Module {}`;
    return {
      language: 'typescript',
      syntax: `@Module({\n  controllers: [${Title}Controller],\n  providers: [${Title}Service],\n  exports: [${Title}Service],\n})\nexport class ${Title}Module {}`,
      code,
      title: `Feature module for ${title}`,
      explanation: explanation(
        topic,
        'the module groups its controller and provider, and exporting the service lets other modules depend on it without reaching into internals.'
      ),
      output: 'Nest registers the controller routes and resolves the service through its dependency-injection container.',
    };
  }

  if (t.includes('controller')) {
    const code = `import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ${Title}Service } from './${slug}.service';
import { Create${Title}Dto } from './dto/create-${slug}.dto';

@Controller('${slug}')
export class ${Title}Controller {
  constructor(private readonly service: ${Title}Service) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: Create${Title}Dto) {
    return this.service.create(dto);
  }
}`;
    return {
      language: 'typescript',
      syntax: `@Controller('${slug}')\nexport class ${Title}Controller {\n  constructor(private readonly service: ${Title}Service) {}\n  @Get() findAll() { return this.service.findAll(); }\n}`,
      code,
      title: `HTTP controller for ${title}`,
      explanation: explanation(
        topic,
        'the controller only translates HTTP input into service calls; business rules stay in the injected service.'
      ),
      output: `GET /${slug} lists records, GET /${slug}/:id loads one, and POST /${slug} creates a record.`,
    };
  }

  if (t.includes('provider') || t.includes('service') || t.includes('dependency')) {
    const code = `import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ${Title}Service {
  constructor(private readonly repository: ${Title}Repository) {}

  async findAll() {
    return this.repository.findMany();
  }

  async findOne(id: string) {
    const record = await this.repository.findById(id);
    if (!record) {
      throw new NotFoundException('${title} record not found');
    }
    return record;
  }
}`;
    return {
      language: 'typescript',
      syntax: `@Injectable()\nexport class ${Title}Service {\n  constructor(private readonly repository: ${Title}Repository) {}\n  async findAll() { return this.repository.findMany(); }\n}`,
      code,
      title: `Injectable service for ${title}`,
      explanation: explanation(
        topic,
        'the service owns domain logic and throws an HTTP-aware exception only at the boundary of a missing resource.'
      ),
      output: 'Existing records return normally; missing ids produce a 404 response.',
    };
  }

  if (t.includes('dto') || t.includes('pipe') || t.includes('validation')) {
    const code = `import { IsString, MaxLength, MinLength } from 'class-validator';

export class Create${Title}Dto {
  @IsString()
  @MinLength(3)
  @MaxLength(120)
  title!: string;

  @IsString()
  @MinLength(10)
  @MaxLength(500)
  summary!: string;
}

// main.ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  })
);`;
    return {
      language: 'typescript',
      syntax: `export class Create${Title}Dto {\n  @IsString()\n  @MinLength(3)\n  title!: string;\n}\napp.useGlobalPipes(new ValidationPipe({ whitelist: true }));`,
      code,
      title: `Validated DTO for ${title}`,
      explanation: explanation(
        topic,
        'class-validator decorates the contract, and the global ValidationPipe strips unknown fields and rejects non-whitelisted input.'
      ),
      output: 'Valid payloads reach the controller as typed DTO instances; invalid payloads return 400 with field errors.',
    };
  }

  if (t.includes('middleware')) {
    const code = `import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class ${Title}Middleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    const started = performance.now();

    response.setHeader('x-${slug}-request', 'true');
    response.on('finish', () => {
      console.log('${title}', {
        method: request.method,
        path: request.originalUrl,
        status: response.statusCode,
        durationMs: Math.round(performance.now() - started),
      });
    });

    next();
  }
}

// app.module.ts
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(${Title}Middleware).forRoutes('*');
  }
}`;
    return {
      language: 'typescript',
      syntax: `@Injectable()\nexport class LoggerMiddleware implements NestMiddleware {\n  use(request: Request, response: Response, next: NextFunction) {\n    next();\n  }\n}\nconsumer.apply(LoggerMiddleware).forRoutes('*');`,
      code,
      title: `Nest middleware for ${title}`,
      explanation: explanation(
        topic,
        'middleware runs before the route handler, adds a request header, records completion timing, and must call next() to continue the chain.'
      ),
      output: 'Every response includes the diagnostic header and one timing log entry when the request finishes.',
    };
  }

  if (t.includes('guard') || t.includes('authorization')) {
    const code = `import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ${Title}Guard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler()) ?? [];
    if (roles.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    return roles.includes(request.user?.role);
  }
}`;
    return {
      language: 'typescript',
      syntax: `@Injectable()\nexport class RolesGuard implements CanActivate {\n  canActivate(context: ExecutionContext) {\n    return true;\n  }\n}`,
      code,
      title: `Role guard for ${title}`,
      explanation: explanation(
        topic,
        'the guard reads metadata from the route handler, allows unannotated routes, and checks the authenticated user’s role.'
      ),
      output: 'Routes with matching role metadata allow access; other authenticated users receive 403.',
    };
  }

  if (t.includes('interceptor') || t.includes('filter') || t.includes('exception')) {
    const code = `import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, type Observable } from 'rxjs';

@Injectable()
export class ${Title}Interceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const started = Date.now();

    return next.handle().pipe(
      map((data) => ({
        data,
        topic: '${title}',
        durationMs: Date.now() - started,
      }))
    );
  }
}`;
    return {
      language: 'typescript',
      syntax: `intercept(context: ExecutionContext, next: CallHandler) {\n  return next.handle().pipe(map((data) => ({ data })));\n}`,
      code,
      title: `Response interceptor for ${title}`,
      explanation: explanation(
        topic,
        'the interceptor wraps successful responses in a consistent envelope and records handler duration.'
      ),
      output: 'Every successful response includes data, topic, and durationMs.',
    };
  }

  if (t.includes('graphql')) {
    const code = `import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ${Title}Service } from './${slug}.service';
import { ${Title}Model } from './${slug}.model';

@Resolver(() => ${Title}Model)
export class ${Title}Resolver {
  constructor(private readonly service: ${Title}Service) {}

  @Query(() => [${Title}Model])
  ${camel(topic.id)}List() {
    return this.service.findAll();
  }

  @Mutation(() => ${Title}Model)
  create${Title}(
    @Args('title') title: string,
    @Args('summary') summary: string
  ) {
    return this.service.create({ title, summary });
  }
}`;
    return {
      language: 'typescript',
      syntax: `@Resolver(() => ${Title}Model)\nexport class ${Title}Resolver {\n  @Query(() => [${Title}Model])\n  list() { return this.service.findAll(); }\n}`,
      code,
      title: `GraphQL resolver for ${title}`,
      explanation: explanation(
        topic,
        'the resolver declares return types so Nest can generate the schema, and delegates persistence to the service.'
      ),
      output: `The generated schema exposes a list query and a create mutation for ${title}.`,
    };
  }

  if (t.includes('test')) {
    const code = `import { Test } from '@nestjs/testing';
import { ${Title}Service } from './${slug}.service';

describe('${Title}Service', () => {
  it('returns the curriculum summary', async () => {
    const repository = {
      findMany: jest.fn().mockResolvedValue([{ id: '${slug}', title: '${title}' }]),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        ${Title}Service,
        { provide: ${Title}Repository, useValue: repository },
      ],
    }).compile();

    const service = moduleRef.get(${Title}Service);
    await expect(service.findAll()).resolves.toHaveLength(1);
  });
});`;
    return {
      language: 'typescript',
      syntax: `const moduleRef = await Test.createTestingModule({\n  providers: [Service, { provide: Repo, useValue: mockRepo }],\n}).compile();`,
      code,
      title: `Nest testing module for ${title}`,
      explanation: explanation(
        topic,
        'the test replaces the repository with a mock and resolves the real service through the Nest container.'
      ),
      output: 'The service returns the mocked record and the assertion passes.',
    };
  }

  const code = `import { Controller, Get } from '@nestjs/common';

@Controller('${slug}')
export class ${Title}Controller {
  @Get()
  get${Title}() {
    return {
      topic: '${title}',
      summary: '${summary}.',
    };
  }
}`;
  return {
    language: 'typescript',
    syntax: `@Controller('${slug}')\nexport class ${Title}Controller {\n  @Get()\n  get() { return { topic: '${title}' }; }\n}`,
    code,
    title: `${title} Nest controller`,
    explanation: explanation(
      topic,
      'the controller exposes a single GET route and returns a plain object that Nest serializes as JSON.'
    ),
    output: `GET /${slug} returns the topic and summary JSON payload.`,
  };
}

export function buildSqlExample(topic: GeneratedTopic): DevExample {
  const slug = kebab(topic.id);
  const title = topic.title;
  const summary = withoutPeriod(topic.summary);
  const t = topic.id.toLowerCase();
  const table = slug.replace(/-/g, '_');

  if (t.includes('join')) {
    const code = `SELECT
  c.id,
  c.title,
  COUNT(e.id) AS enrollment_count
FROM courses AS c
LEFT JOIN enrollments AS e
  ON e.course_id = c.id
  AND e.status = 'active'
WHERE c.published = TRUE
GROUP BY c.id, c.title
HAVING COUNT(e.id) > 0
ORDER BY enrollment_count DESC
LIMIT 20;`;
    return {
      language: 'sql',
      syntax: `SELECT c.id, COUNT(e.id)\nFROM courses c\nLEFT JOIN enrollments e ON e.course_id = c.id\nGROUP BY c.id;`,
      code,
      title: `Join and aggregate for ${title}`,
      explanation: explanation(
        topic,
        'the LEFT JOIN preserves courses without enrollments, the status filter stays in the join condition, and HAVING filters the aggregate.'
      ),
      output: 'One row per published course that has active enrollments, ordered by enrollment count.',
    };
  }

  if (t.includes('group') || t.includes('aggregate')) {
    const code = `SELECT
  date_trunc('month', enrolled_at) AS month,
  COUNT(*) AS enrollments,
  COUNT(DISTINCT student_id) AS unique_students,
  ROUND(AVG(progress_percent), 1) AS avg_progress
FROM enrollments
WHERE enrolled_at >= CURRENT_DATE - INTERVAL '6 months'
GROUP BY month
ORDER BY month ASC;`;
    return {
      language: 'sql',
      syntax: `SELECT date_trunc('month', created_at) AS month, COUNT(*)\nFROM events\nGROUP BY month\nORDER BY month;`,
      code,
      title: `Grouped reporting for ${title}`,
      explanation: explanation(
        topic,
        'date_trunc creates a stable monthly bucket, COUNT DISTINCT avoids double-counting students, and AVG is rounded for display.'
      ),
      output: 'Six monthly rows with enrollment volume, unique students, and average progress.',
    };
  }

  if (t.includes('index')) {
    const code = `-- Supports lookups and ordering for the topic feed.
CREATE INDEX CONCURRENTLY idx_${table}_published_created
  ON ${table} (published, created_at DESC)
  INCLUDE (title, summary);

EXPLAIN (ANALYZE, BUFFERS)
SELECT id, title, summary
FROM ${table}
WHERE published = TRUE
ORDER BY created_at DESC
LIMIT 20;`;
    return {
      language: 'sql',
      syntax: `CREATE INDEX CONCURRENTLY idx_${table}_lookup\n  ON ${table} (published, created_at DESC);\nEXPLAIN ANALYZE SELECT …;`,
      code,
      title: `Index design for ${title}`,
      explanation: explanation(
        topic,
        'the composite index matches the filter and sort order, INCLUDE enables an index-only scan, and CONCURRENTLY avoids blocking writes.'
      ),
      output: 'The query plan shows an index scan with fewer shared buffers than the sequential scan.',
    };
  }

  if (t.includes('transaction') || t.includes('isolation')) {
    const code = `BEGIN ISOLATION LEVEL READ COMMITTED;

UPDATE accounts
SET balance = balance - 250
WHERE id = 'acct_source' AND balance >= 250;

UPDATE accounts
SET balance = balance + 250
WHERE id = 'acct_destination';

INSERT INTO transfers (source_id, destination_id, amount, created_at)
VALUES ('acct_source', 'acct_destination', 250, NOW());

COMMIT;`;
    return {
      language: 'sql',
      syntax: `BEGIN;\nUPDATE accounts SET balance = balance - 250 WHERE id = 'source';\nUPDATE accounts SET balance = balance + 250 WHERE id = 'destination';\nCOMMIT;`,
      code,
      title: `Atomic transfer for ${title}`,
      explanation: explanation(
        topic,
        'both balance changes and the transfer record commit together; any error rolls back the entire unit of work.'
      ),
      output: 'Either all three writes commit, or none of them do.',
    };
  }

  if (t.includes('normaliz')) {
    const code = `-- 3NF: separate reusable authors from courses.
CREATE TABLE authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL
);

CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES authors(id) ON DELETE RESTRICT,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE
);

CREATE TABLE course_tags (
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (course_id, tag_id)
);`;
    return {
      language: 'sql',
      syntax: `CREATE TABLE authors (id UUID PRIMARY KEY, name TEXT NOT NULL);\nCREATE TABLE courses (\n  id UUID PRIMARY KEY,\n  author_id UUID REFERENCES authors(id)\n);`,
      code,
      title: `Normalized schema for ${title}`,
      explanation: explanation(
        topic,
        'author data is stored once, the foreign key enforces referential integrity, and the join table models the many-to-many tag relation.'
      ),
      output: 'Author names are not duplicated across courses, and tag assignments cannot reference missing rows.',
    };
  }

  if (t.includes('schema') || t.includes('table') || t.includes('primary') || t.includes('foreign')) {
    const code = `CREATE TABLE ${table} (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL CHECK (char_length(title) BETWEEN 3 AND 120),
  summary TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'published', 'archived')),
  author_id UUID NOT NULL REFERENCES authors(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_${table}_status_created
  ON ${table} (status, created_at DESC);`;
    return {
      language: 'sql',
      syntax: `CREATE TABLE ${table} (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  title TEXT NOT NULL,\n  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()\n);`,
      code,
      title: `Schema definition for ${title}`,
      explanation: explanation(
        topic,
        'the primary key uses UUIDs, check constraints encode domain rules, the foreign key protects author integrity, and the index supports the feed query.'
      ),
      output: `${table} is created with validated columns, a foreign key, and a feed index.`,
    };
  }

  if (t.includes('insert')) {
    const code = `INSERT INTO ${table} (title, summary, status)
VALUES
  ('${title}', '${summary}.', 'published'),
  ('${title} checklist', 'A practical review checklist.', 'draft')
ON CONFLICT (title) DO UPDATE
SET summary = EXCLUDED.summary,
    updated_at = NOW()
RETURNING id, title, status;`;
    return {
      language: 'sql',
      syntax: `INSERT INTO ${table} (title)\nVALUES ('${title}')\nON CONFLICT (title) DO UPDATE SET title = EXCLUDED.title\nRETURNING *;`,
      code,
      title: `Idempotent insert for ${title}`,
      explanation: explanation(
        topic,
        'the multi-row insert is atomic, the conflict target requires a unique constraint, and RETURNING avoids a second query.'
      ),
      output: 'Both rows are inserted or updated, and the affected id/title/status values are returned.',
    };
  }

  if (t.includes('update') || t.includes('delete')) {
    const code = `UPDATE ${table}
SET status = 'archived',
    updated_at = NOW()
WHERE id = '00000000-0000-0000-0000-000000000000'
  AND status = 'published'
RETURNING id, status;

DELETE FROM ${table}
WHERE status = 'archived'
  AND updated_at < NOW() - INTERVAL '90 days'
RETURNING id;`;
    return {
      language: 'sql',
      syntax: `UPDATE ${table}\nSET status = 'archived', updated_at = NOW()\nWHERE id = $1\nRETURNING id, status;`,
      code,
      title: `Safe mutation for ${title}`,
      explanation: explanation(
        topic,
        'both statements have explicit WHERE clauses, RETURNING proves which rows changed, and the delete is limited to old archived rows.'
      ),
      output: 'Only the matching row is archived; only archived rows older than 90 days are deleted.',
    };
  }

  if (t.includes('order') || t.includes('pagination')) {
    const code = `SELECT id, title, created_at
FROM ${table}
WHERE status = 'published'
  AND (created_at, id) < ('2026-11-01T00:00:00Z', '00000000-0000-0000-0000-000000000000')
ORDER BY created_at DESC, id DESC
LIMIT 21;`;
    return {
      language: 'sql',
      syntax: `SELECT id, title\nFROM ${table}\nWHERE (created_at, id) < ($1, $2)\nORDER BY created_at DESC, id DESC\nLIMIT 21;`,
      code,
      title: `Keyset pagination for ${title}`,
      explanation: explanation(
        topic,
        'the tuple comparison implements a stable cursor, and fetching 21 rows lets the API know whether another page exists.'
      ),
      output: 'The next 20 published rows after the cursor, plus one lookahead row.',
    };
  }

  const code = `SELECT id, title, summary
FROM ${table}
WHERE status = 'published'
ORDER BY created_at DESC
LIMIT 20;`;
  return {
    language: 'sql',
    syntax: `SELECT id, title, summary\nFROM ${table}\nWHERE status = 'published'\nORDER BY created_at DESC\nLIMIT 20;`,
    code,
    title: `${title} query`,
    explanation: explanation(
      topic,
      'the query selects only the columns the page needs, filters to published rows, and applies a deterministic order.'
    ),
    output: 'Up to 20 published rows with id, title, and summary.',
  };
}

export function buildNoSqlExample(topic: GeneratedTopic): DevExample {
  const slug = kebab(topic.id);
  const Title = pascal(topic.id);
  const title = topic.title;
  const summary = withoutPeriod(topic.summary);
  const t = topic.id.toLowerCase();
  const collection = slug.replace(/-/g, '_');

  if (t.includes('aggregation') || t.includes('pipeline')) {
    const code = `db.${collection}.aggregate([
  { $match: { status: 'published' } },
  {
    $group: {
      _id: '$authorId',
      lessons: { $sum: 1 },
      minutes: { $sum: '$durationMinutes' },
    },
  },
  { $sort: { lessons: -1 } },
  { $limit: 10 },
  {
    $lookup: {
      from: 'authors',
      localField: '_id',
      foreignField: '_id',
      as: 'author',
    },
  },
  { $unwind: '$author' },
  { $project: { _id: 0, author: '$author.name', lessons: 1, minutes: 1 } },
]);`;
    return {
      language: 'javascript',
      syntax: `db.${collection}.aggregate([\n  { $match: { status: 'published' } },\n  { $group: { _id: '$authorId', count: { $sum: 1 } } },\n  { $sort: { count: -1 } },\n]);`,
      code,
      title: `Aggregation pipeline for ${title}`,
      explanation: explanation(
        topic,
        'match reduces the working set first, group computes per-author totals, and lookup joins the author document before projection.'
      ),
      output: 'Ten author rows with lesson counts, total minutes, and author names.',
    };
  }

  if (t.includes('index')) {
    const code = `db.${collection}.createIndex(
  { status: 1, createdAt: -1 },
  { name: '${collection}_status_created', background: true }
);

db.${collection}.createIndex(
  { title: 'text', summary: 'text' },
  { name: '${collection}_search', weights: { title: 5, summary: 1 } }
);

db.${collection}.find({ status: 'published' }).sort({ createdAt: -1 }).explain('executionStats');`;
    return {
      language: 'javascript',
      syntax: `db.${collection}.createIndex({ status: 1, createdAt: -1 });\ndb.${collection}.find(query).explain('executionStats');`,
      code,
      title: `Index strategy for ${title}`,
      explanation: explanation(
        topic,
        'the compound index matches the filter and sort, the weighted text index prioritizes titles, and explain validates the plan.'
      ),
      output: 'The query uses an index scan with a low number of examined documents.',
    };
  }

  if (t.includes('schema') || t.includes('relationship') || t.includes('model')) {
    const code = `// Embed data that is always read together; reference data that grows independently.
{
  _id: ObjectId(),
  title: '${title}',
  summary: '${summary}.',
  author: { id: ObjectId(), name: 'Umar' },
  modules: [
    { id: 'html', title: 'HTML', order: 1 },
    { id: 'css', title: 'CSS', order: 2 },
  ],
  createdAt: new Date(),
}

// Separate collection for enrollments because the array is unbounded.
db.enrollments.insertOne({
  courseId: ObjectId(),
  studentId: ObjectId(),
  progress: 0,
  enrolledAt: new Date(),
});`;
    return {
      language: 'javascript',
      syntax: `// Embed bounded, read-together data.\n// Reference unbounded, independently growing data.\ndb.enrollments.insertOne({ courseId, studentId, progress: 0 });`,
      code,
      title: `Document model for ${title}`,
      explanation: explanation(
        topic,
        'bounded module metadata is embedded for one-round-trip reads, while enrollments use a separate collection to avoid unbounded document growth.'
      ),
      output: 'Course pages read one document; enrollment queries scale independently.',
    };
  }

  if (t.includes('crud')) {
    const code = `db.${collection}.insertOne({
  title: '${title}',
  summary: '${summary}.',
  status: 'draft',
  createdAt: new Date(),
});

db.${collection}.updateOne(
  { _id: ObjectId('000000000000000000000000') },
  { $set: { status: 'published' }, $currentDate: { updatedAt: true } }
);

db.${collection}.deleteOne({ _id: ObjectId('000000000000000000000000') });`;
    return {
      language: 'javascript',
      syntax: `db.${collection}.insertOne(document);\ndb.${collection}.updateOne(filter, { $set: patch });\ndb.${collection}.deleteOne(filter);`,
      code,
      title: `Document CRUD for ${title}`,
      explanation: explanation(
        topic,
        'insertOne creates a single document, updateOne changes only the requested fields, and deleteOne removes exactly one match.'
      ),
      output: 'One document is inserted, updated, and then deleted.',
    };
  }

  if (t.includes('mongoose') || t.includes('node')) {
    const code = `import mongoose, { Schema, model } from 'mongoose';

const ${Title}Schema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    summary: { type: String, required: true, maxlength: 500 },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  },
  { timestamps: true }
);

export const ${Title}Model = model('${Title}', ${Title}Schema);

await mongoose.connect(process.env.MONGODB_URI!);
const record = await ${Title}Model.create({ title: '${title}', summary: '${summary}.' });`;
    return {
      language: 'typescript',
      syntax: `const schema = new Schema({\n  title: { type: String, required: true },\n}, { timestamps: true });\nexport const Model = model('${Title}', schema);`,
      code,
      title: `Mongoose model for ${title}`,
      explanation: explanation(
        topic,
        'the schema enforces required fields, trimming, length limits, and allowed status values before MongoDB receives the document.'
      ),
      output: 'A validated document is created with createdAt and updatedAt timestamps.',
    };
  }

  const code = `db.${collection}.insertOne({
  title: '${title}',
  summary: '${summary}.',
  status: 'draft',
  createdAt: new Date(),
});

db.${collection}.find({ status: 'published' }).sort({ createdAt: -1 }).limit(20);`;
  return {
    language: 'javascript',
    syntax: `db.${collection}.insertOne({ title, summary, status: 'draft' });\ndb.${collection}.find({ status: 'published' }).sort({ createdAt: -1 });`,
    code,
    title: `${title} document flow`,
    explanation: explanation(
      topic,
      'the document keeps related fields together and the read query uses a deterministic sort with a bounded result set.'
    ),
    output: 'A draft document is inserted and published documents are returned newest first.',
  };
}

export function buildOrmExample(topic: GeneratedTopic): DevExample {
  const slug = kebab(topic.id);
  const Title = pascal(topic.id);
  const title = topic.title;
  const summary = withoutPeriod(topic.summary);
  const t = topic.id.toLowerCase();

  if (t.includes('schema') || t.includes('model') || t.includes('migration')) {
    const code = `// prisma/schema.prisma
model ${Title} {
  id        String   @id @default(cuid())
  title     String   @db.VarChar(120)
  summary   String
  status    ${Title}Status @default(DRAFT)
  author    User     @relation(fields: [authorId], references: [id], onDelete: Restrict)
  authorId  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([status, createdAt(sort: Desc)])
}

enum ${Title}Status {
  DRAFT
  PUBLISHED
  ARCHIVED
}

// terminal
// npx prisma migrate dev --name add_${slug}
// npx prisma generate`;
    return {
      language: 'prisma',
      syntax: `model ${Title} {\n  id    String @id @default(cuid())\n  title String\n  createdAt DateTime @default(now())\n  @@index([createdAt])\n}`,
      code,
      title: `Prisma model for ${title}`,
      explanation: explanation(
        topic,
        'the model declares a stable id, an enum status, a restrictive author relation, and a composite index for the feed query.'
      ),
      output: 'A migration is generated, the table is created, and a typed Prisma client is available.',
    };
  }

  if (t.includes('relation')) {
    const code = `model User {
  id       String @id @default(cuid())
  email    String @unique
  courses  Course[]
}

model Course {
  id        String @id @default(cuid())
  title     String
  author    User   @relation(fields: [authorId], references: [id])
  authorId  String
  students  Enrollment[]
}

model Enrollment {
  studentId String
  courseId  String
  progress  Int      @default(0)
  student   User     @relation(fields: [studentId], references: [id])
  course    Course   @relation(fields: [courseId], references: [id])

  @@id([studentId, courseId])
}`;
    return {
      language: 'prisma',
      syntax: `model Course {\n  id       String @id @default(cuid())\n  students Enrollment[]\n}\nmodel Enrollment {\n  courseId String\n  studentId String\n  @@id([studentId, courseId])\n}`,
      code,
      title: `Relational model for ${title}`,
      explanation: explanation(
        topic,
        'the explicit join model carries progress and uses a composite primary key, preventing duplicate enrollments.'
      ),
      output: 'Prisma generates relation fields and a typed Enrollment model with a unique student/course pair.',
    };
  }

  if (t.includes('query') || t.includes('crud')) {
    const code = `const published = await prisma.${camel(topic.id)}.findMany({
  where: { status: 'PUBLISHED' },
  orderBy: { createdAt: 'desc' },
  take: 20,
  select: { id: true, title: true, summary: true },
});

const record = await prisma.${camel(topic.id)}.upsert({
  where: { slug: '${slug}' },
  update: { summary: '${summary}.' },
  create: {
    slug: '${slug}',
    title: '${title}',
    summary: '${summary}.',
  },
});`;
    return {
      language: 'typescript',
      syntax: `const rows = await prisma.${camel(topic.id)}.findMany({\n  where: { status: 'PUBLISHED' },\n  take: 20,\n});`,
      code,
      title: `Typed Prisma queries for ${title}`,
      explanation: explanation(
        topic,
        'select limits the payload, take bounds the result, and upsert makes the seed operation idempotent.'
      ),
      output: 'Twenty published summaries and one created-or-updated record.',
    };
  }

  if (t.includes('next')) {
    const code = `import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}`;
    return {
      language: 'typescript',
      syntax: `const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };\nexport const prisma = globalForPrisma.prisma ?? new PrismaClient();\nif (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;`,
      code,
      title: `Prisma singleton for ${title}`,
      explanation: explanation(
        topic,
        'the global singleton survives Next.js hot reloads, preventing a new connection pool from being created on every edit.'
      ),
      output: 'Development reloads reuse one PrismaClient; production creates one client per process.',
    };
  }

  if (t.includes('supabase') || t.includes('firebase') || t.includes('neon')) {
    const code = `import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const { data, error } = await supabase
  .from('${slug.replace(/-/g, '_')}')
  .select('id, title, summary')
  .eq('status', 'published')
  .order('created_at', { ascending: false })
  .limit(20);

if (error) throw error;
console.log(data);`;
    return {
      language: 'typescript',
      syntax: `const supabase = createClient(url, anonKey);\nconst { data, error } = await supabase\n  .from('${slug.replace(/-/g, '_')}')\n  .select('*');`,
      code,
      title: `Managed backend query for ${title}`,
      explanation: explanation(
        topic,
        'the anon key is safe for the browser only because Row Level Security policies restrict what each authenticated user can read or write.'
      ),
      output: 'Published rows are returned; a policy or network failure surfaces through error.',
    };
  }

  const code = `// prisma/schema.prisma
model ${Title} {
  id        String   @id @default(cuid())
  title     String
  summary   String
  createdAt DateTime @default(now())
}

// app/api/${slug}/route.ts
const rows = await prisma.${camel(topic.id)}.findMany({
  orderBy: { createdAt: 'desc' },
  take: 20,
});`;
  return {
    language: 'typescript',
    syntax: `model ${Title} {\n  id    String @id @default(cuid())\n  title String\n}`,
    code,
    title: `${title} data model`,
    explanation: explanation(
      topic,
      'the schema is intentionally small, and the query applies a deterministic order and a bounded result set.'
    ),
    output: 'A typed model and a newest-first query ready to use from a route handler.',
  };
}

export function buildBackendExample(
  category: 'node' | 'express' | 'nest' | 'sql' | 'nosql' | 'orm',
  topic: GeneratedTopic
): DevExample {
  switch (category) {
    case 'node':
      return buildNodeExample(topic);
    case 'express':
      return buildExpressExample(topic);
    case 'nest':
      return buildNestExample(topic);
    case 'sql':
      return buildSqlExample(topic);
    case 'nosql':
      return buildNoSqlExample(topic);
    case 'orm':
      return buildOrmExample(topic);
  }
}
