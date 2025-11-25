import { type Config } from "prettier";

const config: Config = {
  trailingComma: "none",
  semi: true,
  singleQuote: false,
  printWidth: 100,
  tabWidth: 2,
  plugins: ["prettier-plugin-tailwindcss"]
};

export default config;
