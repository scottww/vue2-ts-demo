module.exports = {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "ts", "vue", "json"],
  transform: {
    "^.+\\.js$": "babel-jest",
    ".*\\.vue$": "vue-jest"
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  testMatch: ["**/tests/unit/**/*.spec.js"]
};
