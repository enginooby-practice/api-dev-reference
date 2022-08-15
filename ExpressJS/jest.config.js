/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    globals: {
        "ts-jest": {
            isolatedModules: true,
        },
    },
    transform: {
        "^.+\\.jsx?$": "babel-jest",
    },
    moduleNameMapper: {},
    // moduleDirectories: ["js", ".", "node_modules"],
    moduleDirectories: ["node_modules", __dirname]
}