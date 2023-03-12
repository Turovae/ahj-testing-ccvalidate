/* eslint-disable import/no-extraneous-dependencies */
import puppeteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(60000);

describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;

  let form = null;
  let input = null;
  let submit = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true,
    });

    page = await browser.newPage();

    await page.goto(baseUrl);

    await page.waitForSelector('.validator-container');

    form = await page.$('.validate-form');
    input = await form.$('.validate-input');
    submit = await form.$('.validate-btn');
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  beforeEach(async () => {
    const text = await input.evaluate((el) => el.value);
    await input.focus();
    for (let i = 0; i < text.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await page.keyboard.press('Backspace');
    }
  });

  test('Should add a valid message with valid number', async () => {
    await input.type('4929092828303609');
    await submit.click();

    const messageEl = await page.waitForSelector('.validate-tooltip');

    expect(await messageEl.evaluate((el) => el.textContent)).toBe('Valid card number');
  });

  test('Should add a invalid message with valid number', async () => {
    await input.type('522551237468246');
    await submit.click();

    const messageEl = await page.waitForSelector('.validate-tooltip');

    expect(await messageEl.evaluate((el) => el.textContent)).toBe('Invalid card number!');
  });

  /**
   * Попытка протестировать исчезновение сообщения при вводе текста.
   * тест успешен, но не тестирует то что надо...
   * Хотелось бы знать, как можно протестировать
   * строки 80-88 в компоненте ./src/app/components/ValidateForm/ValidateForm.js
   */
  test('Should add a invalid message with valid number', async () => {
    await input.type('522551237468246');
    await submit.click();

    const messageEl = await page.waitForSelector('.validate-tooltip');

    expect(await messageEl.evaluate((el) => el.textContent)).toBe('Invalid card number!');
    await input.type('5');
    expect(await page.$('.validate-tooltip')).toBe(null);
  });

  test('Should disable Visa card', async () => {
    await input.type('522551237468246');
    await submit.click();

    await page.waitForSelector('.card.visa.card-disabled');
  });
});
