module.exports = {
  // preset: "ts-jest",
  preset: "ts-jest/presets/js-with-babel",

  testEnvironment: "node",
  // setupFiles: ['dotenv/config'],
  // transform: {
  //   "^.+\\.ts?$": [
  //     "ts-jest",
  //     {
  //       // useESM: true,
  //       babelConfig: "babel.config.js",
  //     },
  //   ],
  // },
  testMatch: [
    "<rootDir>/__tests__/*.(ts|js)?(x)",
  ],
  verbose: true,
  moduleFileExtensions: ['ts', 'js'],
};
