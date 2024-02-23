module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  // setupFiles: ['dotenv/config'],
  transform: {
    "^.+\\.ts?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  testMatch: ["<rootDir>/__tests__/*.js?(x)"],
};
