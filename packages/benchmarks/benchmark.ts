import { browser } from 'k6/browser';

export const options = {
  scenarios: {
    ui: {
      executor: 'ramping-vus',
      startVUs: 1,
      stages: [
        { target: 1, duration: '30s' },
        { target: 10, duration: '30s' },
        { target: 10, duration: '4m' },
      ],
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

export default async function () {
  const page = await browser.newPage();

  try {
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('header'); // demo-mfe-nav header
    await page.waitForSelector('footer'); // demo-mfe-nav footer
    await page.waitForSelector('h1'); // demo-mfe-product product
    await page.locator('button').click({ clickCount: 2 });
  } finally {
    await page.close();
  }
}
