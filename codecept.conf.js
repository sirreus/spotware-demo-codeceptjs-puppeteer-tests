const { setHeadlessWhen } = require("@codeceptjs/configure");

// turn on headless mode when running with HEADLESS=true environment variable
// HEADLESS=true npx codecept run
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: "./tests/*_test.js",
  output: "./output",
  helpers: {
    Puppeteer: {
      url: "https://ct.spotware.com",
      show: true,
      windowSize: "1200x900",
      waitForTimeout: 10000,
      waitForAction: 500,
      waitForNavigation: ["domcontentloaded", "networkidle2"],
    },
    AssertWrapper: {
      require: "codeceptjs-assert",
    },
  },
  include: {
    I: "./steps_file.js",
    Auth: "./pages/authForm.js",
    Workspace: "./pages/workspace.js",
  },
  bootstrap: null,
  mocha: {},
  name: "Spotware",
  plugins: {
    retryFailedStep: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true,
    },
  },
};
