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

export function buildHtmlExample(topic: GeneratedTopic): DevExample {
  const slug = kebab(topic.id);
  const title = topic.title;
  const summary = withoutPeriod(topic.summary);
  const t = topic.id.toLowerCase();

  if (t.includes('form')) {
    const code = `<form class="${slug}-form" action="/subscribe" method="post" novalidate>
  <fieldset>
    <legend>${title}</legend>

    <label for="${slug}-email">Work email</label>
    <input
      id="${slug}-email"
      name="email"
      type="email"
      autocomplete="email"
      required
      aria-describedby="${slug}-hint"
    />
    <p id="${slug}-hint">We only use this address for the requested update.</p>

    <label for="${slug}-goal">Primary goal</label>
    <select id="${slug}-goal" name="goal" required>
      <option value="">Choose one</option>
      <option value="learn">Learn a new skill</option>
      <option value="ship">Ship a project</option>
    </select>

    <button type="submit">Request access</button>
  </fieldset>
</form>`;
    return {
      language: 'html',
      syntax: `<form method="post" action="/endpoint">\n  <label for="${slug}-field">Visible label</label>\n  <input id="${slug}-field" name="field" required />\n  <button type="submit">Submit</button>\n</form>`,
      code,
      title: `Accessible form for ${title}`,
      explanation: explanation(
        topic,
        'labels are programmatically connected to controls, the legend groups related fields, and built-in validation is reinforced with descriptive hints.'
      ),
      output: 'The browser validates the required email and select fields before submitting a POST request to /subscribe.',
    };
  }

  if (t.includes('table')) {
    const code = `<table class="${slug}-table">
  <caption>${title}: quarterly results</caption>
  <colgroup>
    <col span="1" />
    <col span="1" />
    <col span="1" />
  </colgroup>
  <thead>
    <tr>
      <th scope="col">Metric</th>
      <th scope="col">Q1</th>
      <th scope="col">Q2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Active learners</th>
      <td>1,240</td>
      <td>1,680</td>
    </tr>
    <tr>
      <th scope="row">Completion rate</th>
      <td>62%</td>
      <td>71%</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="3">Source: internal learning platform analytics</td>
    </tr>
  </tfoot>
</table>`;
    return {
      language: 'html',
      syntax: `<table>\n  <caption>${summary}</caption>\n  <thead><tr><th scope="col">Column</th></tr></thead>\n  <tbody><tr><td>Value</td></tr></tbody>\n</table>`,
      code,
      title: `Semantic data table for ${title}`,
      explanation: explanation(
        topic,
        'a caption names the table, scope attributes identify row and column headers, and colgroup documents the column structure.'
      ),
      output: 'Screen readers announce the caption and associate every data cell with its row and column header.',
    };
  }

  if (t.includes('image') || t.includes('media')) {
    const code = `<figure class="${slug}-figure">
  <picture>
    <source
      media="(min-width: 900px)"
      srcset="/media/${slug}-wide.avif 1600w, /media/${slug}-wide-800.avif 800w"
      sizes="(min-width: 900px) 70vw, 100vw"
      type="image/avif"
    />
    <img
      src="/media/${slug}-800.jpg"
      alt="Diagram illustrating ${summary}"
      width="800"
      height="450"
      loading="lazy"
      decoding="async"
    />
  </picture>
  <figcaption>${title}: choose the smallest file that still looks sharp.</figcaption>
</figure>`;
    return {
      language: 'html',
      syntax: `<img src="/image.webp" alt="Describe the purpose, not the file" width="800" height="450" loading="lazy" />`,
      code,
      title: `Responsive media block for ${title}`,
      explanation: explanation(
        topic,
        'the picture element selects a modern format at wide viewports, while width and height reserve layout space and prevent cumulative layout shift.'
      ),
      output: 'The browser downloads the smallest suitable AVIF or JPEG and reserves the correct aspect ratio before the image loads.',
    };
  }

  if (t.includes('link') || t.includes('navigation')) {
    const code = `<nav class="${slug}-nav" aria-label="Primary">
  <a class="${slug}-brand" href="/">Learn with Umar</a>
  <ul>
    <li><a href="/learning-paths">Learning paths</a></li>
    <li><a href="/docs" aria-current="page">Documentation</a></li>
    <li><a href="/projects">Projects</a></li>
    <li><a href="#${slug}-contact">Contact</a></li>
  </ul>
</nav>

<section id="${slug}-contact">
  <h2>Contact</h2>
  <p>Internal anchors move focus to a specific section without a full page reload.</p>
</section>`;
    return {
      language: 'html',
      syntax: `<a href="/relative-path">Descriptive link text</a>\n<a href="https://example.com" rel="noopener noreferrer">External link</a>\n<a href="#section-id">Jump link</a>`,
      code,
      title: `Navigable link structure for ${title}`,
      explanation: explanation(
        topic,
        'the navigation has an accessible name, the current page is exposed with aria-current, and the fragment link points to a real section id.'
      ),
      output: 'Keyboard and screen-reader users can identify the current page, traverse the links, and jump to the contact section.',
    };
  }

  if (t.includes('list')) {
    const code = `<section class="${slug}-lists">
  <h2>${title}</h2>
  <ol>
    <li>Collect the curriculum requirements.</li>
    <li>
      Choose the structure that matches the meaning.
      <ul>
        <li>Ordered list for a sequence.</li>
        <li>Unordered list for a group.</li>
        <li>Description list for term/definition pairs.</li>
      </ul>
    </li>
    <li>Validate the nesting before shipping.</li>
  </ol>

  <dl>
    <dt>HTML</dt>
    <dd>The document structure and meaning layer.</dd>
    <dt>CSS</dt>
    <dd>The presentation and layout layer.</dd>
  </dl>
</section>`;
    return {
      language: 'html',
      syntax: `<ol>\n  <li>First step</li>\n  <li>Second step</li>\n</ol>\n<dl>\n  <dt>Term</dt>\n  <dd>Definition</dd>\n</dl>`,
      code,
      title: `Meaningful list hierarchy for ${title}`,
      explanation: explanation(
        topic,
        'the list type follows the meaning of the content, and nested lists are placed inside the list item they belong to.'
      ),
      output: 'Assistive technology announces list length and position, and the description list exposes term/definition pairs.',
    };
  }

  if (t.includes('semantic')) {
    const code = `<header class="${slug}-header">
  <a href="/" aria-label="Learn with Umar home">LWU</a>
  <nav aria-label="Primary">...</nav>
</header>

<main id="main-content">
  <article>
    <header>
      <h1>${title}</h1>
      <p>Published <time datetime="2026-11-20">20 November 2026</time></p>
    </header>
    <section aria-labelledby="${slug}-overview">
      <h2 id="${slug}-overview">Overview</h2>
      <p>${summary}.</p>
    </section>
    <aside aria-label="Related notes">
      <p>Use landmarks to make the page outline obvious.</p>
    </aside>
  </article>
</main>

<footer class="${slug}-footer">© 2026 Learn with Umar</footer>`;
    return {
      language: 'html',
      syntax: `<header>…</header>\n<nav aria-label="Primary">…</nav>\n<main>\n  <article>…</article>\n</main>\n<footer>…</footer>`,
      code,
      title: `Landmark-based document for ${title}`,
      explanation: explanation(
        topic,
        'each landmark expresses a distinct page region, and headings create the outline instead of relying on styled divs.'
      ),
      output: 'Screen-reader landmark navigation lists header, navigation, main, article, complementary, and footer regions.',
    };
  }

  if (t.includes('accessibility')) {
    const code = `<a class="${slug}-skip-link" href="#main-content">Skip to main content</a>

<main id="main-content" tabindex="-1">
  <h1>${title}</h1>
  <p>${summary}.</p>

  <button type="button" aria-expanded="false" aria-controls="${slug}-details">
    Show implementation notes
  </button>

  <div id="${slug}-details" hidden>
    <h2>Implementation notes</h2>
    <p>Keep native semantics first and add ARIA only when no native element expresses the behavior.</p>
  </div>
</main>`;
    return {
      language: 'html',
      syntax: `<a href="#main-content">Skip to main content</a>\n<main id="main-content" tabindex="-1">…</main>\n<button aria-expanded="false" aria-controls="panel">Toggle</button>`,
      code,
      title: `Keyboard-first pattern for ${title}`,
      explanation: explanation(
        topic,
        'a skip link bypasses repeated navigation, the main landmark is focusable, and the toggle exposes its state and controlled region.'
      ),
      output: 'Pressing Tab reveals the skip link; activating the button announces expanded/collapsed state and shows the notes panel.',
    };
  }

  if (t.includes('seo')) {
    const code = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title} — Learn with Umar</title>
    <meta name="description" content="${summary}." />
    <link rel="canonical" href="https://learnwithumar.vercel.app/full-stack/html-complete-guide/${slug}" />
    <meta property="og:title" content="${title} — Learn with Umar" />
    <meta property="og:description" content="${summary}." />
    <meta property="og:type" content="article" />
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "${title}",
        "description": "${summary}.",
        "author": { "@type": "Person", "name": "Umar" }
      }
    </script>
  </head>
  <body>
    <main><h1>${title}</h1></main>
  </body>
</html>`;
    return {
      language: 'html',
      syntax: `<title>Primary topic — Brand</title>\n<meta name="description" content="A specific, useful summary." />\n<link rel="canonical" href="https://example.com/canonical-url" />\n<meta property="og:title" content="Social title" />`,
      code,
      title: `Search-ready metadata for ${title}`,
      explanation: explanation(
        topic,
        'the title and description are unique, the canonical URL is explicit, and JSON-LD describes the page as an Article entity.'
      ),
      output: 'Search engines can extract a unique title, snippet, canonical URL, and structured article entity from the document head.',
    };
  }

  if (t.includes('html5') || t.includes('modern')) {
    const code = `<dialog id="${slug}-dialog" aria-labelledby="${slug}-dialog-title">
  <h2 id="${slug}-dialog-title">${title}</h2>
  <p>${summary}.</p>
  <form method="dialog">
    <button value="close">Close</button>
  </form>
</dialog>

<button type="button" data-open-dialog>Open lesson notes</button>

<template id="${slug}-template">
  <article class="note">
    <h3>Reusable note</h3>
    <p>Template content stays inert until it is cloned by JavaScript.</p>
  </article>
</template>`;
    return {
      language: 'html',
      syntax: `<dialog id="${slug}-dialog">\n  <form method="dialog"><button>Close</button></form>\n</dialog>\n<template id="${slug}-template">…</template>`,
      code,
      title: `Native HTML5 primitives for ${title}`,
      explanation: explanation(
        topic,
        'the dialog element provides built-in focus management and Escape handling, while the template element holds inert markup for reuse.'
      ),
      output: 'Opening the dialog moves focus inside it; Escape or the Close button dismisses it and returns focus to the trigger.',
    };
  }

  if (t.includes('headings') || t.includes('paragraph')) {
    const code = `<article class="${slug}-article">
  <h1>${title}</h1>
  <p class="${slug}-lede">${summary}.</p>

  <h2>Why the outline matters</h2>
  <p>Headings describe the structure of the content. They are not a styling shortcut.</p>

  <h3>Keep levels sequential</h3>
  <p>Do not skip from an h2 to an h4 just because the h4 font size looks better.</p>

  <h2>Practical check</h2>
  <p>Remove every stylesheet and confirm the page still reads in a logical order.</p>
</article>`;
    return {
      language: 'html',
      syntax: `<h1>Page topic</h1>\n<p>Opening paragraph.</p>\n<h2>Major section</h2>\n<h3>Supporting detail</h3>`,
      code,
      title: `Readable heading rhythm for ${title}`,
      explanation: explanation(
        topic,
        'one h1 names the article, h2 elements define major sections, and h3 elements only appear inside an h2 section.'
      ),
      output: 'The browser and assistive technology expose a sequential outline from h1 to h2 to h3.',
    };
  }

  if (t.includes('document-structure')) {
    const code = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title} — Learn with Umar</title>
    <meta name="description" content="${summary}." />
    <link rel="stylesheet" href="/styles/global.css" />
  </head>
  <body>
    <a href="#main-content">Skip to main content</a>
    <header><h1>${title}</h1></header>
    <main id="main-content">
      <p>${summary}.</p>
    </main>
    <footer><p>© 2026 Learn with Umar</p></footer>
  </body>
</html>`;
    return {
      language: 'html',
      syntax: `<!doctype html>\n<html lang="en">\n  <head>…metadata…</head>\n  <body>…visible content…</body>\n</html>`,
      code,
      title: `Complete document shell for ${title}`,
      explanation: explanation(
        topic,
        'the doctype triggers standards mode, the language identifies the content language, and head metadata is separated from visible body content.'
      ),
      output: 'The browser parses the document in standards mode with a valid title, viewport, stylesheet, and landmark structure.',
    };
  }

  const code = `<section class="${slug}-lesson" aria-labelledby="${slug}-title">
  <h2 id="${slug}-title">${title}</h2>
  <p>${summary}.</p>
  <p>
    Read the content, identify the element that expresses the meaning,
    then verify the result in the browser and with a screen reader.
  </p>
</section>`;
  return {
    language: 'html',
    syntax: `<section aria-labelledby="${slug}-title">\n  <h2 id="${slug}-title">${title}</h2>\n  <p>${summary}.</p>\n</section>`,
    code,
    title: `${title} markup example`,
    explanation: explanation(
      topic,
      'the section is named by its own heading, and the paragraph carries the curriculum summary rather than placeholder text.'
    ),
    output: 'A valid, labelled section that can be dropped into any HTML document.',
  };
}

export function buildCssExample(topic: GeneratedTopic): DevExample {
  const slug = kebab(topic.id);
  const title = topic.title;
  const summary = withoutPeriod(topic.summary);
  const t = topic.id.toLowerCase();

  if (t.includes('flex')) {
    const code = `.${slug}-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem 1rem;
}

.${slug}-toolbar__primary {
  flex: 1 1 18rem;
  min-width: 0;
}

.${slug}-toolbar__actions {
  display: flex;
  gap: 0.5rem;
  margin-inline-start: auto;
}`;
    return {
      language: 'css',
      syntax: `.${slug} {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n}`,
      code,
      title: `Responsive flex toolbar for ${title}`,
      explanation: explanation(
        topic,
        'flex-wrap prevents overflow on narrow screens, min-width: 0 lets the primary region shrink, and auto margins push the actions to the end.'
      ),
      output: 'The toolbar stays on one line when space allows and wraps into a readable two-row layout on narrow viewports.',
    };
  }

  if (t.includes('grid')) {
    const code = `.${slug}-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
  grid-auto-rows: minmax(12rem, auto);
  gap: clamp(0.75rem, 1.5vw, 1.25rem);
}

.${slug}-grid__feature {
  grid-column: span 2;
}

@media (max-width: 48rem) {
  .${slug}-grid__feature {
    grid-column: auto;
  }
}`;
    return {
      language: 'css',
      syntax: `.${slug} {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));\n  gap: 1rem;\n}`,
      code,
      title: `Intrinsic grid for ${title}`,
      explanation: explanation(
        topic,
        'auto-fit creates as many tracks as fit, min() prevents a track from exceeding the viewport, and the media query removes the feature span on phones.'
      ),
      output: 'Cards reflow from multiple columns to a single column with no horizontal scrolling at 320px.',
    };
  }

  if (t.includes('selector') || t.includes('specificity') || t.includes('pseudo')) {
    const code = `.${slug}-form :is(input, select, textarea):focus-visible {
  outline: 2px solid #000000;
  outline-offset: 2px;
}

.${slug}-card:has(> img) {
  padding-block-start: 0;
}

.${slug}-card[data-state='active'] {
  border-color: #000000;
}

.${slug}-card::before {
  content: '';
  display: block;
  block-size: 2px;
  background: currentColor;
}`;
    return {
      language: 'css',
      syntax: `.${slug} :is(input, select, textarea):focus-visible {\n  outline: 2px solid currentColor;\n}\n\n.${slug}__card:has(> img) {\n  padding-block-start: 0;\n}`,
      code,
      title: `Modern selector strategy for ${title}`,
      explanation: explanation(
        topic,
        ':is() keeps specificity predictable, :focus-visible targets keyboard users without punishing mouse users, and :has() styles a parent from its children.'
      ),
      output: 'Keyboard focus is always visible, image cards lose top padding automatically, and the active card exposes a clear border.',
    };
  }

  if (t.includes('box-model')) {
    const code = `*,
*::before,
*::after {
  box-sizing: border-box;
}

.${slug}-box {
  inline-size: min(100%, 42rem);
  padding: 1.5rem;
  border: 1px solid #e5e5e5;
  margin-inline: auto;
  background: #ffffff;
}`;
    return {
      language: 'css',
      syntax: `*, *::before, *::after { box-sizing: border-box; }\n.${slug} {\n  inline-size: 100%;\n  padding: 1.5rem;\n  border: 1px solid #e5e5e5;\n}`,
      code,
      title: `Predictable box sizing for ${title}`,
      explanation: explanation(
        topic,
        'border-box makes width include padding and border, min(100%, 42rem) prevents overflow, and margin-inline auto centers the block.'
      ),
      output: 'The component remains exactly 42rem wide on desktop and shrinks to the viewport width on mobile without overflow.',
    };
  }

  if (t.includes('margin') || t.includes('padding')) {
    const code = `.${slug}-stack > * + * {
  margin-block-start: var(--${slug}-space, 1rem);
}

.${slug}-section {
  padding-block: clamp(2rem, 6vw, 5rem);
  padding-inline: clamp(1rem, 4vw, 2.5rem);
}

.${slug}-center {
  max-inline-size: 65ch;
  margin-inline: auto;
}`;
    return {
      language: 'css',
      syntax: `.${slug} {\n  padding-block: clamp(1rem, 4vw, 3rem);\n  padding-inline: 1rem;\n  margin-inline: auto;\n}`,
      code,
      title: `Logical spacing system for ${title}`,
      explanation: explanation(
        topic,
        'logical properties adapt to writing direction, the lobotomized-owl selector spaces stacked children, and clamp() keeps spacing fluid.'
      ),
      output: 'Vertical rhythm stays consistent in left-to-right and right-to-left layouts without device-specific overrides.',
    };
  }

  if (t.includes('position')) {
    const code = `.${slug}-layout {
  position: relative;
}

.${slug}-header {
  position: sticky;
  inset-block-start: 0;
  z-index: 10;
  background: #ffffff;
}

.${slug}-badge {
  position: absolute;
  inset-block-start: 0.5rem;
  inset-inline-end: 0.5rem;
}`;
    return {
      language: 'css',
      syntax: `.${slug} { position: relative; }\n.${slug}__header { position: sticky; inset-block-start: 0; }\n.${slug}__badge { position: absolute; inset-block-start: 0; }`,
      code,
      title: `Stacking and positioning for ${title}`,
      explanation: explanation(
        topic,
        'the layout establishes a positioning context, the header sticks to the viewport edge, and the badge is placed relative to its nearest positioned ancestor.'
      ),
      output: 'The header remains visible while scrolling and the badge stays pinned to the card corner.',
    };
  }

  if (t.includes('media-quer') || t.includes('responsive')) {
    const code = `.${slug}-layout {
  container-type: inline-size;
  display: grid;
  gap: 1rem;
}

@container (min-width: 42rem) {
  .${slug}-layout {
    grid-template-columns: 2fr 1fr;
    align-items: start;
  }
}

@media (prefers-reduced-motion: reduce) {
  .${slug}-layout * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`;
    return {
      language: 'css',
      syntax: `.${slug} { container-type: inline-size; }\n@container (min-width: 40rem) {\n  .${slug} { grid-template-columns: 2fr 1fr; }\n}\n@media (prefers-reduced-motion: reduce) { … }`,
      code,
      title: `Container-aware layout for ${title}`,
      explanation: explanation(
        topic,
        'container queries respond to the component’s own width, so the same component works in a sidebar and a full-width page; reduced motion is respected.'
      ),
      output: 'The two-column layout appears only when the component has enough inline space, regardless of viewport width.',
    };
  }

  if (t.includes('transition') || t.includes('animation')) {
    const code = `@keyframes ${slug}-enter {
  from {
    opacity: 0;
    transform: translateY(0.5rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.${slug}-card {
  transition: transform 180ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 180ms ease;
}

.${slug}-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}

.${slug}-card[data-entering='true'] {
  animation: ${slug}-enter 320ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

@media (prefers-reduced-motion: reduce) {
  .${slug}-card,
  .${slug}-card[data-entering='true'] {
    animation: none;
    transition: none;
  }
}`;
    return {
      language: 'css',
      syntax: `@keyframes ${slug}-enter {\n  from { opacity: 0; transform: translateY(8px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n.${slug} { animation: ${slug}-enter 300ms ease both; }`,
      code,
      title: `GPU-friendly motion for ${title}`,
      explanation: explanation(
        topic,
        'the animation only changes transform and opacity, which can be composited without layout, and reduced-motion users receive an immediate final state.'
      ),
      output: 'Cards fade and lift into place, hover interactions feel responsive, and no layout is recalculated per frame.',
    };
  }

  if (t.includes('variable') || t.includes('custom-propert')) {
    const code = `:root {
  --${slug}-surface: #ffffff;
  --${slug}-ink: #111111;
  --${slug}-accent: #000000;
  --${slug}-radius: 0.625rem;
  --${slug}-space: clamp(1rem, 2vw, 1.5rem);
}

[data-theme='dark'] {
  --${slug}-surface: #111111;
  --${slug}-ink: #f5f5f5;
  --${slug}-accent: #ffffff;
}

.${slug}-panel {
  background: var(--${slug}-surface);
  color: var(--${slug}-ink);
  border: 1px solid color-mix(in srgb, var(--${slug}-ink) 15%, transparent);
  border-radius: var(--${slug}-radius);
  padding: var(--${slug}-space);
}`;
    return {
      language: 'css',
      syntax: `:root { --${slug}-space: 1rem; }\n.${slug} { padding: var(--${slug}-space); }\n[data-theme='dark'] { --${slug}-space: 0.75rem; }`,
      code,
      title: `Themeable custom properties for ${title}`,
      explanation: explanation(
        topic,
        'component-scoped custom properties can be overridden by a theme ancestor, and color-mix derives a border from the current ink color.'
      ),
      output: 'Switching data-theme on the root updates the panel without changing any component CSS.',
    };
  }

  if (t.includes('modern')) {
    const code = `@layer ${slug}.base, ${slug}.components, ${slug}.utilities;

@layer ${slug}.components {
  .${slug}-card {
    display: grid;
    gap: 0.75rem;

    & > h3 {
      text-wrap: balance;
    }

    &[data-variant='featured'] {
      border-color: color-mix(in oklab, #000000 25%, transparent);
    }
  }
}

@layer ${slug}.utilities {
  .${slug}-flow > * + * {
    margin-block-start: 1rem;
  }
}`;
    return {
      language: 'css',
      syntax: `@layer ${slug}.base, ${slug}.components;\n@layer ${slug}.components {\n  .${slug} {\n    & > h2 { text-wrap: balance; }\n  }\n}`,
      code,
      title: `Layered modern CSS for ${title}`,
      explanation: explanation(
        topic,
        'cascade layers keep base and utility rules from fighting component styles, native nesting reduces selector repetition, and text-wrap balances headings.'
      ),
      output: 'Component overrides win in the intended layer order, and long headings wrap without a single orphaned word.',
    };
  }

  if (t.includes('typography')) {
    const code = `.${slug}-prose {
  font-family: 'Satoshi', system-ui, sans-serif;
  font-size: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  line-height: 1.65;
  letter-spacing: -0.006em;
  text-wrap: pretty;
}

.${slug}-prose h2 {
  font-size: clamp(1.5rem, 1.2rem + 1vw, 2rem);
  line-height: 1.15;
  letter-spacing: -0.03em;
  text-wrap: balance;
}

.${slug}-prose > * + * {
  margin-block-start: 1em;
}`;
    return {
      language: 'css',
      syntax: `.${slug} {\n  font-family: system-ui, sans-serif;\n  font-size: clamp(1rem, 2.5vw, 1.125rem);\n  line-height: 1.6;\n  text-wrap: pretty;\n}`,
      code,
      title: `Readable web typography for ${title}`,
      explanation: explanation(
        topic,
        'clamp() produces fluid type without discrete jumps, line-height protects body copy, and text-wrap controls widows in headings and paragraphs.'
      ),
      output: 'Text remains readable from 320px to 1440px and headings wrap with balanced line lengths.',
    };
  }

  if (t.includes('color') || t.includes('background')) {
    const code = `.${slug}-surface {
  background:
    radial-gradient(circle at 10% 10%, rgba(255, 255, 255, 0.9), transparent 40%),
    linear-gradient(135deg, oklch(0.97 0.01 250), oklch(0.93 0.02 250));
  color: oklch(0.2 0.01 250);
}

.${slug}-surface::selection {
  background: #000000;
  color: #ffffff;
}

.${slug}-surface a {
  color: inherit;
  text-decoration-color: color-mix(in srgb, currentColor 40%, transparent);
  text-underline-offset: 0.2em;
}`;
    return {
      language: 'css',
      syntax: `.${slug} {\n  background: linear-gradient(135deg, #ffffff, #f2f2f2);\n  color: #111111;\n}\n.${slug} ::selection { background: #000000; color: #ffffff; }`,
      code,
      title: `Layered color treatment for ${title}`,
      explanation: explanation(
        topic,
        'oklch produces perceptually even lightness, layered gradients add depth without images, and selection styles remain legible.'
      ),
      output: 'The surface renders a subtle two-layer background and keeps links and selected text readable.',
    };
  }

  if (t.includes('display')) {
    const code = `.${slug}-list {
  display: grid;
  gap: 0.5rem;
}

.${slug}-list__item {
  display: contents;
}

.${slug}-label {
  display: inline-block;
  min-inline-size: 8rem;
}

.${slug}-hidden {
  display: none;
}

@media (min-width: 48rem) {
  .${slug}-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}`;
    return {
      language: 'css',
      syntax: `.${slug} { display: block; }\n.${slug}__item { display: inline-block; }\n.${slug}[hidden] { display: none; }`,
      code,
      title: `Display behavior for ${title}`,
      explanation: explanation(
        topic,
        'display: contents promotes children into the parent grid, inline-block respects width on labels, and display: none removes hidden content from layout.'
      ),
      output: 'Labels align consistently and list items join the parent grid without extra wrapper boxes.',
    };
  }

  if (t.includes('styling-best') || t.includes('project')) {
    const code = `/* ${title}: token-first component styles */
.${slug}-pricing {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr));
}

.${slug}-plan {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.25rem;
  border: 1px solid #e5e5e5;
  border-radius: 0.75rem;
  background: #ffffff;
}

.${slug}-plan[data-featured='true'] {
  border-color: #000000;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}

.${slug}-plan__cta {
  margin-block-start: auto;
}`;
    return {
      language: 'css',
      syntax: `/* ${summary} */\n.${slug} {\n  display: grid;\n  gap: 1rem;\n  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));\n}`,
      code,
      title: `Production component styles for ${title}`,
      explanation: explanation(
        topic,
        'the layout is intrinsic, the featured plan is expressed with a data attribute instead of a modifier class, and the CTA is pinned to the bottom.'
      ),
      output: 'Pricing cards align to equal heights and collapse to one column on mobile.',
    };
  }

  const code = `.${slug}-component {
  display: grid;
  gap: clamp(0.5rem, 1.5vw, 1rem);
  inline-size: min(100%, 48rem);
  margin-inline: auto;
  padding: clamp(1rem, 3vw, 2rem);
  border: 1px solid #e5e5e5;
  border-radius: 0.75rem;
  background: #ffffff;
}

.${slug}-component > * {
  min-inline-size: 0;
}`;
  return {
    language: 'css',
    syntax: `.${slug} {\n  display: grid;\n  gap: 1rem;\n  padding: clamp(1rem, 3vw, 2rem);\n  max-inline-size: 48rem;\n}`,
    code,
    title: `${title} stylesheet`,
    explanation: explanation(
      topic,
      'the component uses intrinsic sizing, fluid spacing, and min-inline-size: 0 so long content cannot force horizontal overflow.'
    ),
    output: 'A responsive component container that fits any viewport without overflow.',
  };
}

export function buildJavaScriptExample(topic: GeneratedTopic): DevExample {
  const slug = kebab(topic.id);
  const fn = camel(topic.id);
  const Title = pascal(topic.id);
  const title = topic.title;
  const summary = withoutPeriod(topic.summary);
  const t = topic.id.toLowerCase();

  if (t.includes('closure')) {
    const code = `function create${Title}Counter() {
  let count = 0;

  return {
    increment() {
      count += 1;
      return count;
    },
    current() {
      return count;
    },
  };
}

const counter = create${Title}Counter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.current());   // 2`;
    return {
      language: 'javascript',
      syntax: `function createCounter() {\n  let count = 0;\n  return () => ++count;\n}\nconst next = createCounter();`,
      code,
      title: `Private state with a closure: ${title}`,
      explanation: explanation(
        topic,
        'count lives in the function scope, so the returned methods share it while outside code cannot mutate it directly.'
      ),
      output: '1\n2\n2',
    };
  }

  if (t.includes('promise') || t.includes('async') || t.includes('await') || t.includes('fetch')) {
    const code = `async function load${Title}(signal) {
  const response = await fetch('/api/${slug}', {
    headers: { Accept: 'application/json' },
    signal,
  });

  if (!response.ok) {
    throw new Error('Request failed with status ' + response.status);
  }

  return response.json();
}

const controller = new AbortController();
try {
  const data = await load${Title}(controller.signal);
  console.log(data);
} catch (error) {
  if (error.name !== 'AbortError') console.error(error);
}`;
    return {
      language: 'javascript',
      syntax: `async function load${Title}() {\n  const response = await fetch('/api/${slug}');\n  if (!response.ok) throw new Error(String(response.status));\n  return response.json();\n}`,
      code,
      title: `Async request flow for ${title}`,
      explanation: explanation(
        topic,
        'the function awaits the response, rejects non-2xx statuses explicitly, and uses AbortController so navigation can cancel stale work.'
      ),
      output: 'Parsed JSON on success; an AbortError is ignored when the request is cancelled, other failures are logged.',
    };
  }

  if (t.includes('array')) {
    const code = `const ${fn}Data = [
  { title: 'HTML', minutes: 40, done: true },
  { title: 'CSS', minutes: 55, done: false },
  { title: 'JavaScript', minutes: 70, done: false },
];

const completedMinutes = ${fn}Data
  .filter((item) => item.done)
  .map((item) => item.minutes)
  .reduce((total, minutes) => total + minutes, 0);

console.log(completedMinutes); // 40`;
    return {
      language: 'javascript',
      syntax: `const result = items\n  .filter((item) => item.active)\n  .map((item) => item.value)\n  .reduce((sum, value) => sum + value, 0);`,
      code,
      title: `Array pipeline for ${title}`,
      explanation: explanation(
        topic,
        'filter narrows the list, map extracts one field, and reduce collapses the values into a single total without mutating the source array.'
      ),
      output: '40',
    };
  }

  if (t.includes('object')) {
    const code = `const ${fn}Profile = {
  id: 'usr_1042',
  name: 'Alex Morgan',
  track: 'full-stack',
  completed: ['HTML', 'CSS'],
};

for (const [key, value] of Object.entries(${fn}Profile)) {
  console.log(key + ':', value);
}

const { name, track, ...rest } = ${fn}Profile;
console.log(name, track, rest);`;
    return {
      language: 'javascript',
      syntax: `const profile = { id: '1', name: 'Alex' };\nconst { name, ...rest } = profile;\nconsole.log(Object.entries(profile));`,
      code,
      title: `Object inspection for ${title}`,
      explanation: explanation(
        topic,
        'Object.entries converts own enumerable properties into key/value pairs, and rest destructuring separates named fields from the remainder.'
      ),
      output: "id: usr_1042\nname: Alex Morgan\ntrack: full-stack\ncompleted: [ 'HTML', 'CSS' ]\nAlex Morgan full-stack { id: 'usr_1042', completed: [ 'HTML', 'CSS' ] }",
    };
  }

  if (
    t.includes('event-loop') ||
    t.includes('microtask') ||
    t.includes('call-stack') ||
    t.includes('execution-context')
  ) {
    const code = `console.log('1: synchronous start');

setTimeout(() => console.log('4: macrotask'), 0);

Promise.resolve().then(() => console.log('3: microtask'));

queueMicrotask(() => console.log('2: queued microtask'));

console.log('5: synchronous end');`;
    return {
      language: 'javascript',
      syntax: `console.log('sync');\nPromise.resolve().then(() => console.log('microtask'));\nsetTimeout(() => console.log('macrotask'), 0);`,
      code,
      title: `Execution order for ${title}`,
      explanation: explanation(
        topic,
        'synchronous code runs first, the microtask queue drains before the next macrotask, and timers run in a later event-loop phase.'
      ),
      output: '1: synchronous start\n5: synchronous end\n2: queued microtask\n3: microtask\n4: macrotask',
    };
  }

  if (t.includes('dom') || t.includes('event')) {
    const code = `const list = document.querySelector('[data-${slug}-list]');

list?.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;

  const item = button.closest('li');
  if (button.dataset.action === 'remove') {
    item?.remove();
  }
});

const newItem = document.createElement('li');
newItem.textContent = '${title}';
list?.append(newItem);`;
    return {
      language: 'javascript',
      syntax: `document.querySelector('[data-list]')?.addEventListener('click', (event) => {\n  const button = event.target.closest('button');\n  if (button) console.log(button.dataset.action);\n});`,
      code,
      title: `Delegated DOM interaction for ${title}`,
      explanation: explanation(
        topic,
        'one listener on the list handles every current and future button, closest() finds the action target, and the new item requires no extra listener.'
      ),
      output: 'Clicking Remove deletes the matching list item; appended items work immediately.',
    };
  }

  if (t.includes('local-storage') || t.includes('session') || t.includes('cookie')) {
    const code = `const STORAGE_KEY = '${slug}:preferences';

function read${Title}() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function write${Title}(preferences) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
}

write${Title}({ theme: 'dark', compact: true });
console.log(read${Title}());`;
    return {
      language: 'javascript',
      syntax: `const key = '${slug}:preferences';\nlocalStorage.setItem(key, JSON.stringify({ theme: 'dark' }));\nconst value = JSON.parse(localStorage.getItem(key) || '{}');`,
      code,
      title: `Persistent preferences for ${title}`,
      explanation: explanation(
        topic,
        'JSON serializes structured data, the try/catch protects against corrupt stored values, and a namespaced key avoids collisions.'
      ),
      output: "{ theme: 'dark', compact: true }",
    };
  }

  if (t.includes('json')) {
    const code = `const payload = {
  id: 'lesson-${slug}',
  title: '${title}',
  completed: false,
  tags: ['${summary}'],
};

const json = JSON.stringify(payload, null, 2);
const parsed = JSON.parse(json, (key, value) =>
  key === 'completed' ? Boolean(value) : value
);

console.log(json);
console.log(parsed.completed); // false`;
    return {
      language: 'javascript',
      syntax: `const json = JSON.stringify(payload, null, 2);\nconst data = JSON.parse(json, (key, value) => value);`,
      code,
      title: `Safe JSON round-trip for ${title}`,
      explanation: explanation(
        topic,
        'the replacer spacing makes the payload readable, and the reviver can normalize values while parsing untrusted JSON.'
      ),
      output: 'A formatted JSON string followed by false.',
    };
  }

  if (t.includes('error')) {
    const code = `class ${Title}Error extends Error {
  constructor(message, options) {
    super(message, options);
    this.name = '${Title}Error';
  }
}

function parse${Title}(input) {
  if (typeof input !== 'string' || input.trim() === '') {
    throw new ${Title}Error('A non-empty string is required');
  }

  return input.trim();
}

try {
  parse${Title}('');
} catch (error) {
  console.error(error.name + ': ' + error.message);
}`;
    return {
      language: 'javascript',
      syntax: `class ValidationError extends Error {\n  constructor(message) {\n    super(message);\n    this.name = 'ValidationError';\n  }\n}`,
      code,
      title: `Custom error handling for ${title}`,
      explanation: explanation(
        topic,
        'a named Error subclass lets callers distinguish expected validation failures from unexpected runtime failures.'
      ),
      output: `${Title}Error: A non-empty string is required`,
    };
  }

  if (t.includes('debounc') || t.includes('throttl')) {
    const code = `function debounce${Title}(callback, delay = 300) {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
}

const search = debounce${Title}((query) => {
  console.log('Searching for:', query);
}, 250);

search('rea');
search('react');
search('react hooks');`;
    return {
      language: 'javascript',
      syntax: `function debounce(callback, delay = 300) {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => callback(...args), delay);\n  };\n}`,
      code,
      title: `Rate limiting for ${title}`,
      explanation: explanation(
        topic,
        'each call clears the previous timer, so only the final keystroke in a burst reaches the search function.'
      ),
      output: 'Searching for: react hooks',
    };
  }

  if (t.includes('scope') || t.includes('hoisting') || t.includes('variable')) {
    const code = `function ${fn}Demo() {
  if (true) {
    let blockScoped = '${title}';
    const immutable = 'visible only here';
    console.log(blockScoped, immutable);
  }

  // console.log(blockScoped); // ReferenceError
  var functionScoped = 'available throughout the function';
  console.log(functionScoped);
}

${fn}Demo();`;
    return {
      language: 'javascript',
      syntax: `function demo() {\n  if (true) {\n    const local = 'block scoped';\n    console.log(local);\n  }\n}`,
      code,
      title: `Scope boundaries for ${title}`,
      explanation: explanation(
        topic,
        'let and const are limited to the nearest block, var is function-scoped, and the commented line demonstrates the temporal dead zone after the block ends.'
      ),
      output: `${title} visible only here\navailable throughout the function`,
    };
  }

  if (t.includes('loop')) {
    const code = `const ${fn}Items = ['HTML', 'CSS', 'JavaScript'];

for (const [index, item] of ${fn}Items.entries()) {
  console.log(index + 1, item);
}

let total = 0;
for (const item of ${fn}Items) {
  total += item.length;
}
console.log('Total characters:', total);`;
    return {
      language: 'javascript',
      syntax: `for (const [index, item] of items.entries()) {\n  console.log(index, item);\n}`,
      code,
      title: `Iteration patterns for ${title}`,
      explanation: explanation(
        topic,
        'for...of reads values, entries() adds the index, and the loop body accumulates a result without manually managing a counter.'
      ),
      output: '1 HTML\n2 CSS\n3 JavaScript\nTotal characters: 16',
    };
  }

  if (t.includes('function') || t.includes('higher-order') || t.includes('functional')) {
    const code = `const ${fn}Pipeline = [
  (value) => value.trim(),
  (value) => value.toLowerCase(),
  (value) => value.replaceAll(' ', '-'),
];

function compose${Title}(...steps) {
  return (input) => steps.reduce((value, step) => step(value), input);
}

const slugify = compose${Title}(...${fn}Pipeline);
console.log(slugify('  ${title}  '));`;
    return {
      language: 'javascript',
      syntax: `const compose = (...steps) => (input) =>\n  steps.reduce((value, step) => step(value), input);`,
      code,
      title: `Composable functions for ${title}`,
      explanation: explanation(
        topic,
        'each step is a pure unary function, and reduce threads the value through the pipeline in a predictable order.'
      ),
      output: `${slug}`,
    };
  }

  if (t.includes('prototype') || t.includes('class')) {
    const code = `class ${Title}Course {
  #students = new Set();

  constructor(title) {
    this.title = title;
  }

  enroll(studentId) {
    this.#students.add(studentId);
    return this;
  }

  get size() {
    return this.#students.size;
  }
}

const course = new ${Title}Course('${title}').enroll('alex').enroll('sam');
console.log(course.title, course.size);`;
    return {
      language: 'javascript',
      syntax: `class Course {\n  #students = new Set();\n  enroll(id) { this.#students.add(id); return this; }\n  get size() { return this.#students.size; }\n}`,
      code,
      title: `Class and prototype behavior for ${title}`,
      explanation: explanation(
        topic,
        'the class syntax still uses the prototype chain for methods, while the private field keeps internal state inaccessible.'
      ),
      output: `${title} 2`,
    };
  }

  if (t.includes('destructur') || t.includes('spread') || t.includes('rest')) {
    const code = `const ${fn}Lesson = {
  id: '${slug}',
  title: '${title}',
  meta: { duration: '45m', level: 'Intermediate' },
};

const { title, meta: { duration }, ...rest } = ${fn}Lesson;
const tags = ['html', 'css'];
const nextTags = [...tags, 'javascript'];

console.log(title, duration);
console.log(nextTags);
console.log(rest);`;
    return {
      language: 'javascript',
      syntax: `const { title, ...rest } = lesson;\nconst next = [...items, newItem];\nfunction collect(...values) { return values; }`,
      code,
      title: `Destructuring and spread for ${title}`,
      explanation: explanation(
        topic,
        'nested destructuring extracts duration, rest collects the remaining properties, and spread creates a new array instead of mutating the original.'
      ),
      output: `${title} 45m\n[ 'html', 'css', 'javascript' ]\n{ id: '${slug}', meta: { level: 'Intermediate' } }`,
    };
  }

  if (t.includes('module')) {
    const code = `// math/${slug}.js
export function calculate${Title}(values) {
  return values.reduce((total, value) => total + value, 0);
}

export const ${fn}Config = Object.freeze({
  topic: '${title}',
  version: 1,
});

// app.js
import { calculate${Title}, ${fn}Config } from './math/${slug}.js';
console.log(calculate${Title}([10, 20, 30]), ${fn}Config.topic);`;
    return {
      language: 'javascript',
      syntax: `// module.js\nexport const value = 1;\nexport default function run() {}\n\n// app.js\nimport run, { value } from './module.js';`,
      code,
      title: `ES module boundary for ${title}`,
      explanation: explanation(
        topic,
        'named exports make dependencies explicit, the default export is omitted to avoid inconsistent naming, and imported bindings are live read-only views.'
      ),
      output: `60 ${title}`,
    };
  }

  if (t.includes('string')) {
    const code = `const raw${Title} = '  ${summary}  ';

const normalized = raw${Title}
  .trim()
  .replace(/\\s+/g, ' ')
  .replaceAll('${title}', '${title}');

console.log(normalized);
console.log(normalized.length);`;
    return {
      language: 'javascript',
      syntax: `const value = raw.trim().replaceAll('old', 'new');\nconsole.log(value.length);`,
      code,
      title: `String normalization for ${title}`,
      explanation: explanation(
        topic,
        'trim removes edge whitespace, the regular expression collapses internal runs, and replaceAll swaps every occurrence.'
      ),
      output: `${summary}\n` + String(summary.length),
    };
  }

  if (t.includes('number')) {
    const code = `const ${fn}Price = 1299.5;
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

console.log(formatter.format(${fn}Price));
console.log(Number.isFinite(${fn}Price));
console.log(Math.round(${fn}Price * 1.08));`;
    return {
      language: 'javascript',
      syntax: `const formatter = new Intl.NumberFormat('en-US', {\n  style: 'currency',\n  currency: 'USD',\n});\nformatter.format(1299.5);`,
      code,
      title: `Number formatting for ${title}`,
      explanation: explanation(
        topic,
        'Intl.NumberFormat handles currency symbols and grouping, while Number.isFinite rejects NaN and Infinity before arithmetic.'
      ),
      output: '$1,299.50\ntrue\n1403',
    };
  }

  const code = `function ${fn}(input) {
  const normalized = String(input ?? '').trim();

  if (!normalized) {
    throw new Error('${title} requires a non-empty input');
  }

  return {
    topic: '${title}',
    input: normalized,
    summary: '${summary}.',
  };
}

try {
  console.log(${fn}('curriculum'));
} catch (error) {
  console.error(error.message);
}`;
  return {
    language: 'javascript',
    syntax: `function ${fn}(input) {\n  if (!input) throw new Error('Input required');\n  return { topic: '${title}', input };\n}`,
    code,
    title: `${title} implementation`,
    explanation: explanation(
      topic,
      'the function validates its contract, normalizes the input, and returns a small data object that is easy to test.'
    ),
    output: `{ topic: '${title}', input: 'curriculum', summary: '${summary}.' }`,
  };
}

export function buildReactExample(topic: GeneratedTopic): DevExample {
  const slug = kebab(topic.id);
  const Title = pascal(topic.id);
  const title = topic.title;
  const summary = withoutPeriod(topic.summary);
  const t = topic.id.toLowerCase();

  if (t.includes('use-effect') || t.includes('lifecycle')) {
    const code = `'use client';

import { useEffect, useState } from 'react';

export function ${Title}Panel() {
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setStatus('loading');
      try {
        const response = await fetch('/api/${slug}', {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(String(response.status));
        setStatus('ready');
      } catch (error) {
        if (error.name !== 'AbortError') setStatus('error');
      }
    }

    load();
    return () => controller.abort();
  }, []);

  return <p>${title}: {status}</p>;
}`;
    return {
      language: 'tsx',
      syntax: `useEffect(() => {\n  const controller = new AbortController();\n  load(controller.signal);\n  return () => controller.abort();\n}, []);`,
      code,
      title: `Effect with cleanup: ${title}`,
      explanation: explanation(
        topic,
        'the effect owns an external subscription, guards against state updates after unmount, and has an empty dependency array because it runs once per mount.'
      ),
      output: 'The panel shows loading, then ready on success or error on failure; navigation aborts the request.',
    };
  }

  if (t.includes('use-state') || t.includes('state')) {
    const code = `'use client';

import { useState } from 'react';

export function ${Title}Counter() {
  const [count, setCount] = useState(0);

  return (
    <section aria-labelledby="${slug}-title">
      <h2 id="${slug}-title">${title}</h2>
      <p>Count: {count}</p>
      <button type="button" onClick={() => setCount((value) => value + 1)}>
        Increment
      </button>
      <button type="button" onClick={() => setCount(0)}>
        Reset
      </button>
    </section>
  );
}`;
    return {
      language: 'tsx',
      syntax: `const [count, setCount] = useState(0);\nsetCount((value) => value + 1);`,
      code,
      title: `State updates for ${title}`,
      explanation: explanation(
        topic,
        'functional updates read the latest state value, so rapid clicks cannot overwrite each other.'
      ),
      output: 'Each click increments the displayed count; Reset returns it to zero.',
    };
  }

  if (t.includes('use-ref')) {
    const code = `'use client';

import { useEffect, useRef, useState } from 'react';

export function ${Title}Timer() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return <p>${title}: {seconds}s</p>;
}`;
    return {
      language: 'tsx',
      syntax: `const timer = useRef<ReturnType<typeof setInterval> | null>(null);\ntimer.current = setInterval(tick, 1000);`,
      code,
      title: `Mutable ref for ${title}`,
      explanation: explanation(
        topic,
        'the interval id is mutable bookkeeping that should not trigger a render, so useRef is a better fit than useState.'
      ),
      output: 'The timer advances every second and is cleared when the component unmounts.',
    };
  }

  if (t.includes('use-memo')) {
    const code = `'use client';

import { useMemo, useState } from 'react';

type ${Title}Row = { id: string; title: string; minutes: number };

export function ${Title}List({ rows }: { rows: ${Title}Row[] }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return rows;
    return rows.filter((row) => row.title.toLowerCase().includes(needle));
  }, [rows, query]);

  return (
    <section>
      <input value={query} onChange={(event) => setQuery(event.target.value)} />
      <ul>
        {filtered.map((row) => (
          <li key={row.id}>{row.title} — {row.minutes}m</li>
        ))}
      </ul>
    </section>
  );
}`;
    return {
      language: 'tsx',
      syntax: `const filtered = useMemo(\n  () => rows.filter((row) => row.title.includes(query)),\n  [rows, query]\n);`,
      code,
      title: `Memoized derivation for ${title}`,
      explanation: explanation(
        topic,
        'the filtered list is derived state, and useMemo avoids repeating the filter when unrelated state changes.'
      ),
      output: 'Typing filters the list immediately; typing in an unrelated parent state does not recompute it.',
    };
  }

  if (t.includes('use-callback')) {
    const code = `'use client';

import { memo, useCallback, useState } from 'react';

const ${Title}Button = memo(function ${Title}Button({
  onSelect,
}: {
  onSelect: () => void;
}) {
  return <button type="button" onClick={onSelect}>Select ${title}</button>;
});

export function ${Title}Panel() {
  const [count, setCount] = useState(0);
  const handleSelect = useCallback(() => setCount((value) => value + 1), []);

  return (
    <section>
      <p>Selections: {count}</p>
      <${Title}Button onSelect={handleSelect} />
    </section>
  );
}`;
    return {
      language: 'tsx',
      syntax: `const handleSelect = useCallback(() => setCount((value) => value + 1), []);\n<MemoizedButton onSelect={handleSelect} />`,
      code,
      title: `Stable callback for ${title}`,
      explanation: explanation(
        topic,
        'useCallback preserves the function identity so the memoized child can skip re-rendering when only unrelated parent state changes.'
      ),
      output: 'Clicking the button increments selections; the memoized button does not re-render on unrelated parent updates.',
    };
  }

  if (t.includes('use-context') || t.includes('context')) {
    const code = `'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

type ${Title}ContextValue = { theme: 'light' | 'dark'; toggle: () => void };

const ${Title}Context = createContext<${Title}ContextValue | null>(null);

export function ${Title}Provider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const toggle = () => setTheme((value) => (value === 'light' ? 'dark' : 'light'));

  return (
    <${Title}Context.Provider value={{ theme, toggle }}>
      {children}
    </${Title}Context.Provider>
  );
}

export function use${Title}() {
  const value = useContext(${Title}Context);
  if (!value) throw new Error('use${Title} must be used inside ${Title}Provider');
  return value;
}`;
    return {
      language: 'tsx',
      syntax: `const ${Title}Context = createContext<Value | null>(null);\nconst value = useContext(${Title}Context);\nif (!value) throw new Error('Missing provider');`,
      code,
      title: `Typed context for ${title}`,
      explanation: explanation(
        topic,
        'the context has an explicit null default, and the consumer hook turns a missing provider into an immediate, readable error.'
      ),
      output: 'Consumers read the current theme and can toggle it without prop drilling.',
    };
  }

  if (t.includes('custom-hook')) {
    const code = `'use client';

import { useEffect, useState } from 'react';

export function use${Title}(key: string, initialValue: string) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const stored = window.localStorage.getItem(key);
    if (stored !== null) setValue(stored);
  }, [key]);

  useEffect(() => {
    window.localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}

export function ${Title}Field() {
  const [note, setNote] = use${Title}('${slug}:note', '');
  return <textarea value={note} onChange={(event) => setNote(event.target.value)} />;
}`;
    return {
      language: 'tsx',
      syntax: `export function use${Title}(key: string, initial: string) {\n  const [value, setValue] = useState(initial);\n  // persist and return\n  return [value, setValue] as const;\n}`,
      code,
      title: `Reusable hook for ${title}`,
      explanation: explanation(
        topic,
        'the hook encapsulates storage synchronization behind a familiar useState-shaped API and returns a readonly tuple.'
      ),
      output: 'The textarea restores its saved value after refresh and persists every edit.',
    };
  }

  if (t.includes('form') || t.includes('controlled')) {
    const code = `'use client';

import { useState, type FormEvent } from 'react';

export function ${Title}Form() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    await new Promise((resolve) => setTimeout(resolve, 400));
    setStatus('success');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="${slug}-email">Email</label>
      <input
        id="${slug}-email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <button type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Saving…' : 'Save ${title}'}
      </button>
      {status === 'success' && <p role="status">Saved.</p>}
    </form>
  );
}`;
    return {
      language: 'tsx',
      syntax: `const [email, setEmail] = useState('');\n<input value={email} onChange={(event) => setEmail(event.target.value)} />`,
      code,
      title: `Controlled form for ${title}`,
      explanation: explanation(
        topic,
        'React owns the input value, submit is prevented from reloading the page, and the status is announced through a live region.'
      ),
      output: 'The submit button is disabled while saving and a success message appears afterward.',
    };
  }

  if (t.includes('list') || t.includes('key')) {
    const code = `type ${Title}Item = { id: string; title: string };

export function ${Title}List({ items }: { items: ${Title}Item[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <a href={'/docs/' + item.id}>{item.title}</a>
        </li>
      ))}
    </ul>
  );
}`;
    return {
      language: 'tsx',
      syntax: `{items.map((item) => (\n  <li key={item.id}>{item.title}</li>\n))}`,
      code,
      title: `Stable keys for ${title}`,
      explanation: explanation(
        topic,
        'a stable database id lets React preserve the correct DOM node and state when the list is filtered or reordered.'
      ),
      output: 'Reordering the list keeps each item’s identity and local state intact.',
    };
  }

  if (t.includes('error-boundar')) {
    const code = `'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';

export class ${Title}Boundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('${title} boundary caught', error, info.componentStack);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}`;
    return {
      language: 'tsx',
      syntax: `static getDerivedStateFromError() { return { hasError: true }; }\ncomponentDidCatch(error, info) { report(error); }\nreturn hasError ? fallback : children;`,
      code,
      title: `Error boundary for ${title}`,
      explanation: explanation(
        topic,
        'the boundary converts a render-time exception into fallback UI and reports the component stack for diagnosis.'
      ),
      output: 'A crashing child displays the fallback instead of blanking the entire page.',
    };
  }

  if (t.includes('router') || t.includes('routing')) {
    const code = `import { NavLink, Route, Routes } from 'react-router-dom';

export function ${Title}Routes() {
  return (
    <Routes>
      <Route path="/" element={<${Title}Home />} />
      <Route path="/:topicId" element={<${Title}Detail />} />
      <Route path="*" element={<${Title}NotFound />} />
    </Routes>
  );
}

function ${Title}Nav() {
  return (
    <nav aria-label="${title}">
      <NavLink to="/" end>Overview</NavLink>
      <NavLink to="/${slug}">${title}</NavLink>
    </nav>
  );
}`;
    return {
      language: 'tsx',
      syntax: `<Routes>\n  <Route path="/" element={<Home />} />\n  <Route path="/:id" element={<Detail />} />\n  <Route path="*" element={<NotFound />} />\n</Routes>`,
      code,
      title: `Client route map for ${title}`,
      explanation: explanation(
        topic,
        'the route table has an explicit not-found branch, and NavLink tracks active state without manual pathname comparisons.'
      ),
      output: 'Navigating updates the URL, renders the matching view, and marks the active link.',
    };
  }

  if (t.includes('api') || t.includes('data') || t.includes('loading')) {
    const code = `'use client';

import { useEffect, useState } from 'react';

type ${Title}Data = { id: string; title: string };

export function ${Title}Fetcher() {
  const [data, setData] = useState<${Title}Data | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/${slug}', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.json() as Promise<${Title}Data>;
      })
      .then(setData)
      .catch((cause) => {
        if (cause.name !== 'AbortError') setError(cause.message);
      });

    return () => controller.abort();
  }, []);

  if (error) return <p role="alert">Could not load ${title}: {error}</p>;
  if (!data) return <p>Loading ${title}…</p>;
  return <h2>{data.title}</h2>;
}`;
    return {
      language: 'tsx',
      syntax: `if (error) return <ErrorState />;\nif (!data) return <LoadingState />;\nreturn <Content data={data} />;`,
      code,
      title: `Loading and error states for ${title}`,
      explanation: explanation(
        topic,
        'the component models idle, success, and failure explicitly, and it cancels the request when the view unmounts.'
      ),
      output: 'Loading text appears first, followed by the title or an accessible error message.',
    };
  }

  if (t.includes('action')) {
    const code = `'use client';

import { useActionState } from 'react';

async function save${Title}(_previous: string, formData: FormData) {
  const note = String(formData.get('note') || '').trim();
  if (!note) return 'A note is required.';
  await fetch('/api/${slug}', { method: 'POST', body: JSON.stringify({ note }) });
  return 'Saved.';
}

export function ${Title}Form() {
  const [message, action, pending] = useActionState(save${Title}, '');

  return (
    <form action={action}>
      <label htmlFor="${slug}-note">Note</label>
      <textarea id="${slug}-note" name="note" required />
      <button type="submit" disabled={pending}>
        {pending ? 'Saving…' : 'Save ${title}'}
      </button>
      {message && <p role="status">{message}</p>}
    </form>
  );
}`;
    return {
      language: 'tsx',
      syntax: `const [message, action, pending] = useActionState(saveNote, '');\n<form action={action}>…</form>`,
      code,
      title: `React 19 action state for ${title}`,
      explanation: explanation(
        topic,
        'useActionState binds the async action to form submission and exposes pending and returned message state.'
      ),
      output: 'Submitting shows Saving…, then Saved. or a validation message.',
    };
  }

  if (t.includes('performance') || t.includes('lazy')) {
    const code = `'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const ${Title}Chart = dynamic(() => import('./${Title}Chart'), {
  loading: () => <p>Loading chart…</p>,
  ssr: false,
});

export function ${Title}Dashboard() {
  const [showChart, setShowChart] = useState(false);

  return (
    <section>
      <button type="button" onClick={() => setShowChart((value) => !value)}>
        {showChart ? 'Hide' : 'Show'} ${title}
      </button>
      {showChart && <${Title}Chart />}
    </section>
  );
}`;
    return {
      language: 'tsx',
      syntax: `const Chart = dynamic(() => import('./Chart'), {\n  loading: () => <Skeleton />,\n  ssr: false,\n});`,
      code,
      title: `Deferred rendering for ${title}`,
      explanation: explanation(
        topic,
        'the heavy chart is removed from the initial bundle and only requested when the user asks for it.'
      ),
      output: 'The initial page loads without chart code; opening the panel streams in the chart chunk.',
    };
  }

  const code = `type ${Title}Props = {
  title: string;
  summary: string;
  onSelect?: () => void;
};

export function ${Title}Card({ title, summary, onSelect }: ${Title}Props) {
  return (
    <article>
      <h2>{title}</h2>
      <p>{summary}</p>
      {onSelect && (
        <button type="button" onClick={onSelect}>
          Open ${title}
        </button>
      )}
    </article>
  );
}

export const ${Title}Example = () => (
  <${Title}Card title="${title}" summary="${summary}." />
);`;
  return {
    language: 'tsx',
    syntax: `type ${Title}Props = { title: string; summary: string };\nexport function ${Title}Card({ title, summary }: ${Title}Props) {\n  return <article><h2>{title}</h2><p>{summary}</p></article>;\n}`,
    code,
    title: `${title} component`,
    explanation: explanation(
      topic,
      'the component is a pure function of props, keeps the optional interaction explicit, and renders semantic article markup.'
    ),
    output: 'A reusable, typed card showing the lesson title and summary.',
  };
}

export function buildTypeScriptExample(topic: GeneratedTopic): DevExample {
  const slug = kebab(topic.id);
  const Title = pascal(topic.id);
  const title = topic.title;
  const summary = withoutPeriod(topic.summary);
  const t = topic.id.toLowerCase();

  if (t.includes('generic')) {
    const code = `type ${Title}Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

function unwrap${Title}<T>(result: ${Title}Result<T>): T {
  if (!result.ok) throw new Error(result.error);
  return result.data;
}

const value = unwrap${Title}<string[]>({
  ok: true,
  data: ['${summary}'],
});

console.log(value);`;
    return {
      language: 'typescript',
      syntax: `type Result<T> =\n  | { ok: true; data: T }\n  | { ok: false; error: string };\n\nfunction unwrap<T>(result: Result<T>): T { … }`,
      code,
      title: `Generic result type for ${title}`,
      explanation: explanation(
        topic,
        'the generic parameter preserves the payload type through the success branch, while the discriminated union makes the failure branch explicit.'
      ),
      output: `[ '${summary}' ]`,
    };
  }

  if (t.includes('interface') || t.includes('type-alias') || t.includes('object')) {
    const code = `interface ${Title}Record {
  readonly id: string;
  title: string;
  summary?: string;
  tags: readonly string[];
}

type ${Title}Patch = Partial<Pick<${Title}Record, 'title' | 'summary'>>;

function apply${Title}Patch(
  record: ${Title}Record,
  patch: ${Title}Patch
): ${Title}Record {
  return { ...record, ...patch };
}

const record: ${Title}Record = {
  id: '${slug}',
  title: '${title}',
  tags: ['curriculum'],
};

console.log(apply${Title}Patch(record, { summary: '${summary}.' }));`;
    return {
      language: 'typescript',
      syntax: `interface ${Title}Record {\n  readonly id: string;\n  title: string;\n  summary?: string;\n}\ntype ${Title}Patch = Partial<Pick<${Title}Record, 'title' | 'summary'>>;`,
      code,
      title: `Typed record for ${title}`,
      explanation: explanation(
        topic,
        'interface models the entity, readonly prevents identity mutation, and Pick/Partial derive a safe patch type.'
      ),
      output: 'A new record with the patched summary, leaving the original object unchanged.',
    };
  }

  if (t.includes('union') || t.includes('narrow') || t.includes('discrimin')) {
    const code = `type ${Title}State =
  | { status: 'idle' }
  | { status: 'loading'; startedAt: number }
  | { status: 'success'; data: string[] }
  | { status: 'error'; message: string };

function render${Title}(state: ${Title}State): string {
  switch (state.status) {
    case 'idle':
      return 'Ready to load ${title}.';
    case 'loading':
      return 'Loading since ' + state.startedAt;
    case 'success':
      return state.data.length + ' items loaded';
    case 'error':
      return 'Failed: ' + state.message;
    default: {
      const exhaustive: never = state;
      return exhaustive;
    }
  }
}`;
    return {
      language: 'typescript',
      syntax: `type State =\n  | { status: 'idle' }\n  | { status: 'success'; data: string[] }\n  | { status: 'error'; message: string };`,
      code,
      title: `Discriminated union for ${title}`,
      explanation: explanation(
        topic,
        'each state carries only the fields valid for that phase, and the never check forces future variants to be handled.'
      ),
      output: 'The switch returns a human-readable message for every state.',
    };
  }

  if (t.includes('utility')) {
    const code = `interface ${Title}Entity {
  id: string;
  title: string;
  summary: string;
  published: boolean;
}

type ${Title}Preview = Pick<${Title}Entity, 'id' | 'title'>;
type ${Title}Draft = Omit<${Title}Entity, 'id' | 'published'>;
type ${Title}Update = Partial<${Title}Draft>;

const preview: ${Title}Preview = { id: '${slug}', title: '${title}' };
const update: ${Title}Update = { summary: '${summary}.' };

console.log(preview, update);`;
    return {
      language: 'typescript',
      syntax: `type Preview = Pick<Entity, 'id' | 'title'>;\ntype Draft = Omit<Entity, 'id' | 'published'>;\ntype Update = Partial<Draft>;`,
      code,
      title: `Utility types for ${title}`,
      explanation: explanation(
        topic,
        'Pick, Omit, and Partial derive focused contracts from one canonical entity instead of duplicating fields.'
      ),
      output: 'A preview object with id/title and a partial update containing only summary.',
    };
  }

  if (t.includes('assertion') || t.includes('satisfies') || t.includes('cast')) {
    const code = `type ${Title}Config = Record<string, string | number | boolean>;

const config = {
  topic: '${title}',
  retries: 3,
  enabled: true,
} satisfies ${Title}Config;

function read${Title}Value(key: keyof typeof config) {
  return config[key];
}

console.log(read${Title}Value('retries'));

// Assertion is only for values the compiler cannot infer.
const element = document.querySelector<HTMLElement>('[data-${slug}]');
element?.setAttribute('data-ready', 'true');`;
    return {
      language: 'typescript',
      syntax: `const config = { retries: 3, enabled: true } satisfies Config;\nconst el = document.querySelector<HTMLElement>('[data-topic]');`,
      code,
      title: `Safe assertions for ${title}`,
      explanation: explanation(
        topic,
        'satisfies validates the object against the contract without widening its literal types, and the DOM generic removes the need for a cast.'
      ),
      output: '3 and the element receives data-ready="true" when present.',
    };
  }

  if (t.includes('react')) {
    const code = `import type { ReactNode } from 'react';

interface ${Title}Props {
  title: string;
  children: ReactNode;
  tone?: 'neutral' | 'accent';
  onSelect?: (id: string) => void;
}

export function ${Title}Panel({
  title,
  children,
  tone = 'neutral',
  onSelect,
}: ${Title}Props) {
  return (
    <section data-tone={tone}>
      <h2>{title}</h2>
      {children}
      {onSelect && (
        <button type="button" onClick={() => onSelect(title)}>
          Select ${title}
        </button>
      )}
    </section>
  );
}`;
    return {
      language: 'tsx',
      syntax: `interface Props {\n  title: string;\n  children: ReactNode;\n  onSelect?: (id: string) => void;\n}`,
      code,
      title: `Typed React props for ${title}`,
      explanation: explanation(
        topic,
        'ReactNode accurately accepts any renderable child, the tone union permits only supported variants, and the callback has an explicit signature.'
      ),
      output: 'A typed panel that renders children and calls onSelect with the title.',
    };
  }

  if (t.includes('zod') || t.includes('validation') || t.includes('api-response')) {
    const code = `import { z } from 'zod';

const ${Title}Schema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  published: z.boolean().default(false),
});

type ${Title} = z.infer<typeof ${Title}Schema>;

export function parse${Title}(input: unknown): ${Title} {
  return ${Title}Schema.parse(input);
}

const result = parse${Title}({
  id: '${slug}',
  title: '${title}',
  summary: '${summary}.',
});

console.log(result);`;
    return {
      language: 'typescript',
      syntax: `const Schema = z.object({\n  id: z.string().min(1),\n  published: z.boolean().default(false),\n});\ntype Entity = z.infer<typeof Schema>;`,
      code,
      title: `Runtime validation for ${title}`,
      explanation: explanation(
        topic,
        'the Zod schema is the single source of truth for both runtime validation and the inferred TypeScript type.'
      ),
      output: 'A validated entity with published defaulted to false.',
    };
  }

  if (t.includes('enum')) {
    const code = `const ${Title}Status = {
  Draft: 'draft',
  Published: 'published',
  Archived: 'archived',
} as const;

type ${Title}Status = (typeof ${Title}Status)[keyof typeof ${Title}Status];

function isPublished(status: ${Title}Status): boolean {
  return status === ${Title}Status.Published;
}

console.log(isPublished(${Title}Status.Published));`;
    return {
      language: 'typescript',
      syntax: `const Status = { Draft: 'draft', Published: 'published' } as const;\ntype Status = (typeof Status)[keyof typeof Status];`,
      code,
      title: `Const object status map for ${title}`,
      explanation: explanation(
        topic,
        'the as-const object emits no runtime enum wrapper, while the indexed access type produces the same string-literal union.'
      ),
      output: 'true',
    };
  }

  if (t.includes('advanced')) {
    const code = `type ${Title}Keys<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};

type ${Title}Source = {
  id: string;
  title: string;
  count: number;
  published: boolean;
};

type ${Title}StringKeys = ${Title}Keys<${Title}Source>;

const keys: ${Title}StringKeys = {
  id: '${slug}',
  title: '${title}',
};

console.log(keys);`;
    return {
      language: 'typescript',
      syntax: `type StringKeys<T> = {\n  [K in keyof T as T[K] extends string ? K : never]: T[K];\n};`,
      code,
      title: `Mapped types for ${title}`,
      explanation: explanation(
        topic,
        'key remapping filters the keys by their value type, producing a new object type without runtime code.'
      ),
      output: `{ id: '${slug}', title: '${title}' }`,
    };
  }

  const code = `type ${Title}Input = {
  id: string;
  title: string;
  summary: string;
};

function create${Title}(input: ${Title}Input): Readonly<${Title}Input> {
  if (!input.id.trim()) throw new Error('id is required');
  return Object.freeze({ ...input });
}

const item = create${Title}({
  id: '${slug}',
  title: '${title}',
  summary: '${summary}.',
});

console.log(item);`;
  return {
    language: 'typescript',
    syntax: `type ${Title}Input = { id: string; title: string; summary: string };\nfunction create${Title}(input: ${Title}Input): Readonly<${Title}Input> { … }`,
    code,
    title: `${title} type contract`,
    explanation: explanation(
      topic,
      'the input type makes the required fields explicit, and the readonly return type prevents callers from mutating shared data.'
    ),
    output: 'A frozen object containing the curriculum topic id, title, and summary.',
  };
}

export function buildNextExample(topic: GeneratedTopic): DevExample {
  const slug = kebab(topic.id);
  const Title = pascal(topic.id);
  const title = topic.title;
  const summary = withoutPeriod(topic.summary);
  const t = topic.id.toLowerCase();

  if (t.includes('server-action') || t.includes('actions')) {
    const code = `// app/${slug}/actions.ts
'use server';

import { revalidatePath } from 'next/cache';

export async function save${Title}(formData: FormData) {
  const note = String(formData.get('note') || '').trim();
  if (!note) return { error: 'A note is required.' };

  await db.${slug}.create({ data: { note } });
  revalidatePath('/${slug}');
  return { success: true };
}

// app/${slug}/page.tsx
import { save${Title} } from './actions';

export default function Page() {
  return (
    <form action={save${Title}}>
      <label htmlFor="note">Note</label>
      <textarea id="note" name="note" required />
      <button type="submit">Save ${title}</button>
    </form>
  );
}`;
    return {
      language: 'tsx',
      syntax: `'use server';\nexport async function action(formData: FormData) {\n  await db.create({ data: { note } });\n  revalidatePath('/path');\n}`,
      code,
      title: `Server action for ${title}`,
      explanation: explanation(
        topic,
        'the mutation runs on the server, validates the FormData payload, and invalidates the cached route after writing.'
      ),
      output: 'Submitting the form writes the note and refreshes the server-rendered page data.',
    };
  }

  if (t.includes('route-handler') || t.includes('api')) {
    const code = `// app/api/${slug}/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q') ?? '';

  const rows = await db.${slug}.findMany({
    where: query ? { title: { contains: query } } : undefined,
  });

  return NextResponse.json({ data: rows }, {
    headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (!body?.title) {
    return NextResponse.json({ error: 'title is required' }, { status: 422 });
  }

  const created = await db.${slug}.create({ data: body });
  return NextResponse.json({ data: created }, { status: 201 });
}`;
    return {
      language: 'typescript',
      syntax: `// app/api/${slug}/route.ts\nexport async function GET(request: NextRequest) {\n  return NextResponse.json({ data: [] });\n}`,
      code,
      title: `Route handler for ${title}`,
      explanation: explanation(
        topic,
        'GET and POST have explicit status codes, the request body is validated before writing, and the GET response declares a cache policy.'
      ),
      output: 'GET returns JSON data with a 200 status; POST returns 201 or 422 for invalid input.',
    };
  }

  if (t.includes('server-component') || t.includes('rsc')) {
    const code = `// app/${slug}/page.tsx
import { db } from '@/lib/db';

export default async function ${Title}Page() {
  const rows = await db.${slug}.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20,
  });

  return (
    <main>
      <h1>${title}</h1>
      <p>${summary}.</p>
      <ul>
        {rows.map((row) => (
          <li key={row.id}>{row.title}</li>
        ))}
      </ul>
    </main>
  );
}`;
    return {
      language: 'tsx',
      syntax: `export default async function Page() {\n  const data = await db.query();\n  return <main>{/* server-rendered UI */}</main>;\n}`,
      code,
      title: `Async Server Component for ${title}`,
      explanation: explanation(
        topic,
        'the component awaits the database directly on the server, so the query code never ships in the client bundle.'
      ),
      output: 'The server streams rendered HTML containing the latest rows, with no client-side database code.',
    };
  }

  if (t.includes('client-component') || t.includes('use client')) {
    const code = `'use client';

import { useState } from 'react';

export function ${Title}Toggle() {
  const [open, setOpen] = useState(false);

  return (
    <section>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="${slug}-panel"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? 'Hide' : 'Show'} ${title}
      </button>
      <div id="${slug}-panel" hidden={!open}>
        <p>${summary}.</p>
      </div>
    </section>
  );
}`;
    return {
      language: 'tsx',
      syntax: `'use client';\nimport { useState } from 'react';\nexport function Toggle() {\n  const [open, setOpen] = useState(false);\n  return <button onClick={() => setOpen(!open)}>Toggle</button>;\n}`,
      code,
      title: `Client boundary for ${title}`,
      explanation: explanation(
        topic,
        'the use client directive marks the smallest interactive boundary, while the surrounding page can remain a Server Component.'
      ),
      output: 'The disclosure toggles instantly without shipping the rest of the page as client JavaScript.',
    };
  }

  if (t.includes('dynamic') || t.includes('routing') || t.includes('file-based')) {
    const code = `// app/${slug}/[topicId]/page.tsx
import { notFound } from 'next/navigation';

type Params = { params: Promise<{ topicId: string }> };

export async function generateStaticParams() {
  return [{ topicId: '${slug}' }];
}

export default async function ${Title}DetailPage({ params }: Params) {
  const { topicId } = await params;
  if (!topicId) notFound();

  return (
    <main>
      <h1>{topicId}</h1>
      <p>${summary}.</p>
    </main>
  );
}`;
    return {
      language: 'tsx',
      syntax: `// app/${slug}/[topicId]/page.tsx\ntype Params = { params: Promise<{ topicId: string }> };\nexport default async function Page({ params }: Params) {\n  const { topicId } = await params;\n  return <h1>{topicId}</h1>;\n}`,
      code,
      title: `Dynamic route for ${title}`,
      explanation: explanation(
        topic,
        'the params promise is awaited, unknown ids call notFound(), and generateStaticParams pre-renders known lesson routes.'
      ),
      output: 'A valid topic id renders its heading; an unknown id renders the 404 page.',
    };
  }

  if (t.includes('layout')) {
    const code = `// app/${slug}/layout.tsx
import type { ReactNode } from 'react';

export default function ${Title}Layout({ children }: { children: ReactNode }) {
  return (
    <section>
      <header>
        <h1>${title}</h1>
        <p>${summary}.</p>
      </header>
      {children}
    </section>
  );
}

// app/${slug}/page.tsx
export default function Page() {
  return <p>This page is rendered inside the persistent layout.</p>;
}`;
    return {
      language: 'tsx',
      syntax: `// app/${slug}/layout.tsx\nexport default function Layout({ children }: { children: ReactNode }) {\n  return <section>{children}</section>;\n}`,
      code,
      title: `Nested layout for ${title}`,
      explanation: explanation(
        topic,
        'the layout persists across child navigation, so its header and state survive route changes inside the segment.'
      ),
      output: 'Navigating between child pages keeps the layout header mounted.',
    };
  }

  if (t.includes('loading') || t.includes('suspense')) {
    const code = `// app/${slug}/loading.tsx
export default function ${Title}Loading() {
  return (
    <div role="status" aria-live="polite">
      <p>Loading ${title}…</p>
      <div className="skeleton" aria-hidden="true" />
    </div>
  );
}

// app/${slug}/page.tsx
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<p>Loading ${title}…</p>}>
      <${Title}Content />
    </Suspense>
  );
}`;
    return {
      language: 'tsx',
      syntax: `// app/${slug}/loading.tsx\nexport default function Loading() {\n  return <p role="status">Loading…</p>;\n}`,
      code,
      title: `Streaming fallback for ${title}`,
      explanation: explanation(
        topic,
        'loading.tsx provides an instant route-level fallback, while Suspense scopes the streaming boundary to the slow content.'
      ),
      output: 'Navigation immediately shows the loading state, then replaces it with streamed content.',
    };
  }

  if (t.includes('error')) {
    const code = `// app/${slug}/error.tsx
'use client';

export default function ${Title}Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div role="alert">
      <h1>Could not load ${title}</h1>
      <p>{error.message}</p>
      {error.digest && <p>Reference: {error.digest}</p>}
      <button type="button" onClick={reset}>Try again</button>
    </div>
  );
}`;
    return {
      language: 'tsx',
      syntax: `'use client';\nexport default function Error({ error, reset }: { error: Error; reset: () => void }) {\n  return <button onClick={reset}>Try again</button>;\n}`,
      code,
      title: `Recoverable error boundary for ${title}`,
      explanation: explanation(
        topic,
        'the error boundary is a Client Component, exposes the digest for server-side correlation, and offers a reset action.'
      ),
      output: 'A runtime error renders the fallback and Try again re-attempts the route segment.',
    };
  }

  if (t.includes('data-fetch') || t.includes('caching') || t.includes('revalidat')) {
    const code = `type ${Title}Row = { id: string; title: string };

async function get${Title}(): Promise<${Title}Row[]> {
  const response = await fetch('https://api.example.com/${slug}', {
    next: { revalidate: 60, tags: ['${slug}'] },
  });

  if (!response.ok) throw new Error('Failed to load ${title}');
  return response.json();
}

export default async function ${Title}Page() {
  const [rows, meta] = await Promise.all([
    get${Title}(),
    fetch('https://api.example.com/${slug}/meta', { next: { revalidate: 300 } }).then((response) =>
      response.json()
    ),
  ]);

  return <pre>{JSON.stringify({ rows, meta }, null, 2)}</pre>;
}`;
    return {
      language: 'tsx',
      syntax: `const response = await fetch(url, {\n  next: { revalidate: 60, tags: ['${slug}'] },\n});`,
      code,
      title: `Cached data fetching for ${title}`,
      explanation: explanation(
        topic,
        'the fetch is tagged for on-demand invalidation, revalidates periodically, and independent requests run in parallel.'
      ),
      output: `The page renders cached JSON for 60 seconds; revalidateTag('${slug}') refreshes it immediately.`,
    };
  }

  if (t.includes('metadata') || t.includes('seo') || t.includes('sitemap') || t.includes('robots')) {
    const code = `import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '${title} — Learn with Umar',
  description: '${summary}.',
  alternates: {
    canonical: 'https://learnwithumar.vercel.app/full-stack/${slug}',
  },
  openGraph: {
    title: '${title}',
    description: '${summary}.',
    type: 'article',
  },
};

export default function ${Title}Page() {
  return <main><h1>${title}</h1></main>;
}`;
    return {
      language: 'tsx',
      syntax: `export const metadata: Metadata = {\n  title: '${title}',\n  description: '${summary}.',\n  alternates: { canonical: '/path' },\n};`,
      code,
      title: `Metadata for ${title}`,
      explanation: explanation(
        topic,
        'the static metadata object provides a unique title, description, canonical URL, and Open Graph tags for the route.'
      ),
      output: 'The rendered document head contains unique, crawlable metadata for the lesson.',
    };
  }

  if (t.includes('middleware')) {
    const code = `// middleware.ts
import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value;

  if (!session && request.nextUrl.pathname.startsWith('/${slug}')) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  const response = NextResponse.next();
  response.headers.set('x-${slug}-checked', 'true');
  return response;
}

export const config = {
  matcher: ['/${slug}/:path*'],
};`;
    return {
      language: 'typescript',
      syntax: `export function middleware(request: NextRequest) {\n  if (!request.cookies.get('session')) {\n    return NextResponse.redirect(new URL('/login', request.url));\n  }\n  return NextResponse.next();\n}`,
      code,
      title: `Edge middleware for ${title}`,
      explanation: explanation(
        topic,
        'the matcher limits middleware to the protected segment, the redirect preserves the intended destination, and the response adds a diagnostic header.'
      ),
      output: 'Unauthenticated requests are redirected to /login; authenticated requests continue with the header set.',
    };
  }

  if (t.includes('image')) {
    const code = `import Image from 'next/image';

export function ${Title}Hero() {
  return (
    <Image
      src="/media/${slug}.jpg"
      alt="Visual explanation of ${summary}"
      width={1600}
      height={900}
      sizes="(max-width: 768px) 100vw, 70vw"
      priority
      placeholder="blur"
      blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciLz4="
    />
  );
}`;
    return {
      language: 'tsx',
      syntax: `<Image\n  src="/media/lesson.jpg"\n  alt="Description"\n  width={1600}\n  height={900}\n  sizes="(max-width: 768px) 100vw, 70vw"\n/>`,
      code,
      title: `Optimized image for ${title}`,
      explanation: explanation(
        topic,
        'next/image generates responsive sources, reserves intrinsic dimensions, and priority marks the likely LCP image.'
      ),
      output: 'The browser receives an appropriately sized modern format with no layout shift.',
    };
  }

  const code = `// app/${slug}/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '${title} — Learn with Umar',
  description: '${summary}.',
};

export default function ${Title}Page() {
  return (
    <main>
      <h1>${title}</h1>
      <p>${summary}.</p>
      <p>This Server Component ships no client JavaScript by default.</p>
    </main>
  );
}`;
  return {
    language: 'tsx',
    syntax: `// app/${slug}/page.tsx\nexport default function Page() {\n  return <main><h1>${title}</h1></main>;\n}`,
    code,
    title: `${title} route`,
    explanation: explanation(
      topic,
      'the page is a Server Component with route-level metadata and semantic main content.'
    ),
    output: 'A statically rendered lesson route with no unnecessary client bundle.',
  };
}

export function buildFrontendExample(
  category: 'html' | 'css' | 'javascript' | 'react' | 'typescript' | 'next',
  topic: GeneratedTopic
): DevExample {
  switch (category) {
    case 'html':
      return buildHtmlExample(topic);
    case 'css':
      return buildCssExample(topic);
    case 'javascript':
      return buildJavaScriptExample(topic);
    case 'react':
      return buildReactExample(topic);
    case 'typescript':
      return buildTypeScriptExample(topic);
    case 'next':
      return buildNextExample(topic);
  }
}
