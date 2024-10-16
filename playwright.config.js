// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["line"],
    ["allure-playwright", {
      detail: true,
      suiteTitle: true,
      environmentInfo: {
        node_version: process.version,
      }
    }],
    ["html", { open: 'never' }]
  ],
  use: {
    baseURL: 'https://www.tretyakovgallery.ru/?lang=ru',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

