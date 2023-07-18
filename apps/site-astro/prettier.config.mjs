import prettierAstro from "prettier-plugin-astro";

/** @type {import("prettier").Options} */
const config = {
  plugins: [prettierAstro],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};

export default config;
