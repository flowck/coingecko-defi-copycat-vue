module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  transform: {
    "^.+\\.vue$": "vue-jest",
  },
  collectCoverage: true,
  testMatch: [
    "**/tests/unit/**/*.spec.[jt]s?(x)",
    "**/__tests__/*.[jt]s?(x)",
    "**/src/**/*.spec.[jt]s?(x)",
  ],
};
