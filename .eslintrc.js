module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  parser: "@typescript-eslint/parser",

  extends: [
    "eslint:recommended",

    "plugin:@typescript-eslint/recommended",

    // 'plugin:prettier/recommended',
    // Notes: This equals all these:
    // - "extends": ["prettier"]
    // - "plugins": ["prettier"],
    // - "rules": { "prettier/prettier": "error" }
    // WHY DON'T?
    // It breaks whenever the plugin and rule are added (extend doesn't matter).
    // - prettier-vscode uses prettier-eslint but doesn't respect this config,
    //   while prettier-eslint CLI does.
    // - eslint-vscode with auto-fix works but always changes result every save.
    //   This happens with conflicting rules like 'array-bracket-newline'.

    "plugin:react-hooks/recommended",
  ],

  plugins: [
    "@typescript-eslint",

    "prettier",
    // WHY DON'T? See "extends".
    // Notes: Disabling this with the rule on causes
    //   "Definition for rule 'prettier/prettier' was not found."

    "react",

    "react-hooks",

    "simple-import-sort",

    "unused-imports",
  ],

  rules: {
    "import/prefer-default-export": "off",

    "array-bracket-newline": ["error", "consistent"],

    "array-element-newline": ["error", "consistent"],

    "object-curly-newline": [
      "error",
      {
        ObjectExpression: {
          multiline: true,
          consistent: true,
        },
        ObjectPattern: {
          multiline: true,
          consistent: true,
        },
        ImportDeclaration: {
          multiline: true,
          consistent: true,
        },
        ExportDeclaration: {
          multiline: true,
          consistent: true,
        },
      },
    ],

    "object-property-newline": [
      "error",
      {
        allowAllPropertiesOnSameLine: false,
        allowMultiplePropertiesPerLine: false,
      },
    ],

    // ==> simple-import-sort
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",

    // ==> unused-imports

    // Turned on: auto-fix
    "unused-imports/no-unused-imports": "warn",
    "unused-imports/no-unused-imports-ts": "warn",

    // Turned off: no auto-fix and duplicate @typescript-eslint/no-unused-vars
    "unused-imports/no-unused-vars": "off",
    "unused-imports/no-unused-vars-ts": "off",
  },
};
