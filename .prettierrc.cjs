module.exports = {
    semi: false,
    singleQuote: false,
    tabWidth: 4,
    useTabs: false,
    trailingComma: "es5",
    printWidth: 100,
    bracketSpacing: true,
    plugins: ["@trivago/prettier-plugin-sort-imports"],
    importOrder: ["<THIRD_PARTY_MODULES>", "^@/(.*)$|^[./]"],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
}