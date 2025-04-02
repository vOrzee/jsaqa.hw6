import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import prettier from "eslint-plugin-prettier";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prettierConfig = JSON.parse(
    fs.readFileSync(path.join(__dirname, ".prettierrc.json"), "utf-8"),
);

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs}", "cypress/e2e/**/*.cy.js"],
        ignores: ["node_modules"],
        extends: ["js/recommended"],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.jest,
                ...globals.node,
                ...globals.cypress,
                cy: "readonly",
                Cypress: "readonly",
            },
        },
        plugins: {
            prettier,
            js,
        },
        rules: {
            "prettier/prettier": ["error", prettierConfig],
        },
    },
]);
