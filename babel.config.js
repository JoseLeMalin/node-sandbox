export default {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
};
export const api = () => {
  const isTest = api.env("test");
  // You can use isTest to determine what presets and plugins to use.
  console.log("istest: ", isTest);

  return {
    // ...
  };
};
