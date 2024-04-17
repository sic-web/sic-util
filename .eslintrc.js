module.exports = {
  env: { browser: true, es2020: true },
  root: true,
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:react-hooks/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": "warn",
    "react-hooks/exhaustive-deps": "off", // Eliminating dependency warnings for useEffect
    "import/no-unresolved": ["error", { ignore: ["iem:./modules/*"] }],
  },
};
