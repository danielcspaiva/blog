/**
 * Recreation of Astro's old Shiki `css-variables` theme (removed from modern
 * Shiki). Every token color resolves to a `--astro-code-*` CSS variable already
 * defined in global.css, so light/dark switching keeps working with a single
 * theme — pixel-identical to the previous Astro output.
 *
 * NOTE: the token array must be named `tokenColors` (not `settings`) so that
 * rehype-pretty-code recognises this as a single JSON theme.
 */
export const cssVariablesTheme = {
  name: "css-variables",
  type: "dark",
  colors: {
    "editor.foreground": "var(--astro-code-foreground)",
    "editor.background": "var(--astro-code-background)",
  },
  tokenColors: [
    {
      settings: {
        foreground: "var(--astro-code-foreground)",
        background: "var(--astro-code-background)",
      },
    },
    {
      scope: ["comment", "punctuation.definition.comment", "string.comment"],
      settings: { foreground: "var(--astro-code-token-comment)" },
    },
    {
      scope: [
        "constant",
        "entity.name.constant",
        "variable.other.constant",
        "variable.other.enummember",
        "variable.language",
      ],
      settings: { foreground: "var(--astro-code-token-constant)" },
    },
    {
      scope: [
        "entity.name.function",
        "meta.function-call",
        "variable.function",
        "support.function",
        "keyword.other.special-method",
      ],
      settings: { foreground: "var(--astro-code-token-function)" },
    },
    {
      scope: ["variable.parameter", "meta.parameter"],
      settings: { foreground: "var(--astro-code-token-parameter)" },
    },
    {
      scope: [
        "keyword",
        "storage.type",
        "storage.modifier",
        "keyword.control",
        "keyword.operator.new",
        "keyword.operator.expression",
        "keyword.operator.logical",
      ],
      settings: { foreground: "var(--astro-code-token-keyword)" },
    },
    {
      scope: ["string", "string.other.link", "markup.inline.raw"],
      settings: { foreground: "var(--astro-code-token-string)" },
    },
    {
      scope: [
        "string.regexp",
        "string.template",
        "meta.template.expression",
        "punctuation.definition.template-expression",
      ],
      settings: { foreground: "var(--astro-code-token-string-expression)" },
    },
    {
      scope: [
        "punctuation",
        "meta.brace",
        "punctuation.definition",
        "punctuation.separator",
        "punctuation.terminator",
      ],
      settings: { foreground: "var(--astro-code-token-punctuation)" },
    },
    {
      scope: [
        "markup.underline.link",
        "constant.other.reference.link",
        "string.other.link",
      ],
      settings: { foreground: "var(--astro-code-token-link)" },
    },
    {
      scope: ["variable", "support.variable", "meta.definition.variable"],
      settings: { foreground: "var(--astro-code-token-variable)" },
    },
    {
      scope: ["constant.numeric", "number"],
      settings: { foreground: "var(--astro-code-token-number)" },
    },
    {
      scope: ["constant.language.boolean", "constant.language"],
      settings: { foreground: "var(--astro-code-token-boolean)" },
    },
    {
      scope: ["keyword.operator", "storage.type.function.arrow"],
      settings: { foreground: "var(--astro-code-token-operator)" },
    },
    {
      scope: [
        "entity.name.type",
        "support.type",
        "entity.name.namespace",
        "support.class.builtin",
      ],
      settings: { foreground: "var(--astro-code-token-type)" },
    },
    {
      scope: [
        "entity.name.class",
        "support.class",
        "entity.other.inherited-class",
        "entity.name.type.class",
      ],
      settings: { foreground: "var(--astro-code-token-class-name)" },
    },
  ],
};
