export type TokenKind =
  | 'plain'
  | 'comment'
  | 'string'
  | 'keyword'
  | 'number'
  | 'function'
  | 'tag'
  | 'attribute'
  | 'property'
  | 'operator'
  | 'punctuation';

export interface CodeToken {
  value: string;
  kind: TokenKind;
}

const JS_KEYWORDS = new Set([
  'as',
  'async',
  'await',
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'declare',
  'default',
  'delete',
  'do',
  'else',
  'enum',
  'export',
  'extends',
  'false',
  'finally',
  'for',
  'from',
  'function',
  'if',
  'implements',
  'import',
  'in',
  'instanceof',
  'interface',
  'keyof',
  'let',
  'namespace',
  'new',
  'null',
  'of',
  'private',
  'protected',
  'public',
  'readonly',
  'return',
  'satisfies',
  'static',
  'super',
  'switch',
  'this',
  'throw',
  'true',
  'try',
  'type',
  'typeof',
  'undefined',
  'var',
  'void',
  'while',
  'with',
  'yield',
]);

const SQL_KEYWORDS = new Set(
  [
    'add',
    'all',
    'alter',
    'and',
    'any',
    'as',
    'asc',
    'begin',
    'between',
    'by',
    'case',
    'check',
    'column',
    'commit',
    'constraint',
    'create',
    'cross',
    'database',
    'default',
    'delete',
    'desc',
    'distinct',
    'drop',
    'else',
    'end',
    'exists',
    'false',
    'foreign',
    'from',
    'full',
    'group',
    'having',
    'if',
    'in',
    'index',
    'inner',
    'insert',
    'into',
    'is',
    'join',
    'key',
    'left',
    'like',
    'limit',
    'not',
    'null',
    'offset',
    'on',
    'or',
    'order',
    'outer',
    'primary',
    'references',
    'returning',
    'right',
    'rollback',
    'select',
    'set',
    'table',
    'then',
    'transaction',
    'true',
    'union',
    'unique',
    'update',
    'using',
    'values',
    'when',
    'where',
    'with',
  ].map((keyword) => keyword.toLowerCase())
);

const JS_TOKEN_REGEX =
  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|\b([A-Za-z_$][\w$]*)(?=\s*\()|\b([A-Za-z_$][\w$]*)\b|\b(\d+(?:\.\d+)?)\b|([{}()[\];,.:?=<>!&|+\-*/%^~]+)/g;

const SQL_TOKEN_REGEX =
  /(--[^\n]*|\/\*[\s\S]*?\*\/)|('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")|\b([A-Za-z_][\w$]*)\b|\b(\d+(?:\.\d+)?)\b|([(),;.*=<>!+\-/]+)/g;

const CSS_TOKEN_REGEX =
  /(\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(@[A-Za-z-]+)|(--?[A-Za-z][\w-]*(?=\s*:))|([.#][A-Za-z_][\w-]*)|([A-Za-z-]+(?=\s*:))|(\b\d+(?:\.\d+)?(?:px|rem|em|vh|vw|ch|%|s|ms|fr|deg)?\b)|([{}():;,>+~*=])/g;

function tokenizeWithRegex(
  code: string,
  regex: RegExp,
  classify: (match: RegExpExecArray) => TokenKind
): CodeToken[] {
  const tokens: CodeToken[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  regex.lastIndex = 0;
  while ((match = regex.exec(code)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ value: code.slice(lastIndex, match.index), kind: 'plain' });
    }

    tokens.push({ value: match[0], kind: classify(match) });
    lastIndex = regex.lastIndex;

    if (match[0].length === 0) regex.lastIndex += 1;
  }

  if (lastIndex < code.length) {
    tokens.push({ value: code.slice(lastIndex), kind: 'plain' });
  }

  return tokens;
}

function highlightJavaScript(code: string): CodeToken[] {
  return tokenizeWithRegex(code, JS_TOKEN_REGEX, (match) => {
    if (match[1]) return 'comment';
    if (match[2]) return 'string';
    if (match[3]) return 'function';

    if (match[4]) {
      return JS_KEYWORDS.has(match[4]) ? 'keyword' : 'plain';
    }

    if (match[5]) return 'number';
    if (match[6]) return /^[=<>!&|+\-*/%^~]+$/.test(match[6]) ? 'operator' : 'punctuation';
    return 'plain';
  });
}

function highlightSql(code: string): CodeToken[] {
  return tokenizeWithRegex(code, SQL_TOKEN_REGEX, (match) => {
    if (match[1]) return 'comment';
    if (match[2]) return 'string';
    if (match[3]) return SQL_KEYWORDS.has(match[3].toLowerCase()) ? 'keyword' : 'function';
    if (match[4]) return 'number';
    if (match[5]) return /^[=<>!+\-*/]+$/.test(match[5]) ? 'operator' : 'punctuation';
    return 'plain';
  });
}

function highlightCss(code: string): CodeToken[] {
  return tokenizeWithRegex(code, CSS_TOKEN_REGEX, (match) => {
    if (match[1]) return 'comment';
    if (match[2]) return 'string';
    if (match[3]) return 'keyword';
    if (match[4]) return 'property';
    if (match[5]) return 'tag';
    if (match[6]) return 'property';
    if (match[7]) return 'number';
    if (match[8]) return 'punctuation';
    return 'plain';
  });
}

function highlightHtml(code: string): CodeToken[] {
  const tokens: CodeToken[] = [];
  const tokenRegex = /(<!--[\s\S]*?-->)|(<\/?)([A-Za-z][\w:-]*)([^>]*?)(\/?>)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  const pushAttributeTokens = (attributeSource: string) => {
    const attributeRegex = /([A-Za-z_:][\w:.-]*)(\s*=\s*)("[^"]*"|'[^']*')?/g;
    let attributeMatch: RegExpExecArray | null;
    let attributeIndex = 0;

    while ((attributeMatch = attributeRegex.exec(attributeSource)) !== null) {
      if (attributeMatch.index > attributeIndex) {
        tokens.push({ value: attributeSource.slice(attributeIndex, attributeMatch.index), kind: 'plain' });
      }

      tokens.push({ value: attributeMatch[1], kind: 'attribute' });
      if (attributeMatch[2]) tokens.push({ value: attributeMatch[2], kind: 'operator' });
      if (attributeMatch[3]) tokens.push({ value: attributeMatch[3], kind: 'string' });
      attributeIndex = attributeRegex.lastIndex;
    }

    if (attributeIndex < attributeSource.length) {
      tokens.push({ value: attributeSource.slice(attributeIndex), kind: 'plain' });
    }
  };

  while ((match = tokenRegex.exec(code)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ value: code.slice(lastIndex, match.index), kind: 'plain' });
    }

    if (match[1]) {
      tokens.push({ value: match[1], kind: 'comment' });
    } else {
      tokens.push({ value: match[2], kind: 'punctuation' });
      tokens.push({ value: match[3], kind: 'tag' });
      pushAttributeTokens(match[4] || '');
      tokens.push({ value: match[5], kind: 'punctuation' });
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < code.length) {
    tokens.push({ value: code.slice(lastIndex), kind: 'plain' });
  }

  return tokens;
}

function highlightJson(code: string): CodeToken[] {
  const tokens: CodeToken[] = [];
  const tokenRegex =
    /("(?:\\.|[^"\\])*")(\s*:)?|\b(true|false|null)\b|\b(-?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b|([{}[\],:])/gi;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(code)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ value: code.slice(lastIndex, match.index), kind: 'plain' });
    }

    if (match[1]) {
      tokens.push({ value: match[1], kind: match[2] ? 'property' : 'string' });
      if (match[2]) tokens.push({ value: match[2], kind: 'punctuation' });
    } else if (match[3]) {
      tokens.push({ value: match[3], kind: 'keyword' });
    } else if (match[4]) {
      tokens.push({ value: match[4], kind: 'number' });
    } else {
      tokens.push({ value: match[5] || match[0], kind: 'punctuation' });
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < code.length) {
    tokens.push({ value: code.slice(lastIndex), kind: 'plain' });
  }

  return tokens;
}

export function highlightCode(code: string, language: string): CodeToken[] {
  const normalized = (language || '').toLowerCase();

  if (['html', 'xml', 'svg'].includes(normalized)) return highlightHtml(code);
  if (['css', 'scss'].includes(normalized)) return highlightCss(code);
  if (['sql', 'postgresql', 'psql'].includes(normalized)) return highlightSql(code);
  if (['json'].includes(normalized)) return highlightJson(code);

  if (
    ['js', 'javascript', 'ts', 'typescript', 'tsx', 'jsx', 'node', 'bash', 'shell'].includes(
      normalized
    )
  ) {
    return highlightJavaScript(code);
  }

  return [{ value: code, kind: 'plain' }];
}
