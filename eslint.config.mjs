import stylistic from "@stylistic/eslint-plugin"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"
import { defineConfig, globalIgnores } from "eslint/config"

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "app/generated/**",
  ]),
  stylistic.configs.customize({
    indent: 2,
    quotes: "double",
    semi: false,
    jsx: true,
    quoteProps: "as-needed",
  }),
  {
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "no-restricted-syntax": [
        "error",
        {
          selector: "ImportNamespaceSpecifier",
          message: "Avoid namespace imports (`import * as X`). Use named imports instead.",
        },
        {
          selector: "ExportNamedDeclaration[declaration]",
          message: "Avoid inline named exports. Use `export { ... }` at the end of the file instead.",
        },
      ],
    },
  },
])

export default eslintConfig
