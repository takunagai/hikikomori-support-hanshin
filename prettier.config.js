// prettier-plugin-tailwind (prettier-plugin-svelte との併用は不可)
/** @type {import("prettier").Config} */
const config = {
  trailingComma: "all",
  tabWidth: 2,
  semi: false,
  plugins: ["prettier-plugin-tailwindcss"],
}

module.exports = config
