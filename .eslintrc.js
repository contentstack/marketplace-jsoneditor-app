module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "plugin:import/typescript", "airbnb", "airbnb-typescript", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
    project: "tsconfig.json",
    createDefaultProgram: true,
    tsconfigRootDir: __dirname,
  },
  plugins: ["import", "react", "react-hooks", "@typescript-eslint"],
  rules: {
    "arrow-body-style": 0,
    "no-plusplus": 0,
    "no-underscore-dangle": 0,
    "operator-linebreak": [
      "error",
      "after",
      {
        overrides: {
          ":": "before",
        },
      },
    ],
    "react/destructuring-assignment": ["warn"],
    "func-names": [0],
    "no-console": ["error", { allow: ["warn", "error", "info"] }],
  },
  overrides: [
    {
      files: ["src/**/*.spec.{ts,tsx}", "src/test-utils/**", "src/setupTests.ts"],
      rules: {
        "import/no-extraneous-dependencies": 0,
        "import/prefer-default-export": 0,
        "react/function-component-definition": 0,
        "@typescript-eslint/lines-between-class-members": 0,
      },
    },
  ],
};
