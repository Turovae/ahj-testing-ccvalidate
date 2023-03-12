/**
 * @jest-environment jsdom
 */

import CCValidator from '../CCValidator';

let body = null;
let container = null;
let validator = null;

beforeAll(() => {
  body = document.body;

  container = document.createElement('div');
  container.classList.add('container');
  body.appendChild(container);
});

afterEach(() => {
  container.innerHTML = '';
  validator = null;
});

describe('Test append Credit Card Validator', () => {
  test('bindToDOM with container', () => {
    validator = new CCValidator();
    validator.create();
    validator.bindToDOM(container);
    expect(body.querySelector('.validator-container')).toBeInstanceOf(HTMLDivElement);
  });

  test('bindToDOM with selector', () => {
    validator = new CCValidator();
    validator.create();
    validator.bindToDOM('.container');
    expect(body.querySelector('.validator-container')).toBeInstanceOf(HTMLDivElement);
  });

  test('bindToDOM with invalid selector', () => {
    validator = new CCValidator();
    validator.create();
    expect(() => {
      validator.bindToDOM('.containerrr');
    }).toThrow('container is not HTMLElement');
  });
});

describe('Test Credit Card Validator messages', () => {
  test.each([
    ['', 'Please insert a credit card number'],
    ['4929092828303609', 'Valid card number'],
    ['522551237468246', 'Invalid card number!'],
  ])('number %s should show message %s', async (number, expected) => {
    validator = new CCValidator();
    validator.create();
    validator.bindToDOM('.container');

    const inputEl = await container.querySelector('.validate-input');
    const buttonEl = await container.querySelector('.validate-btn');
    inputEl.value = number;
    await buttonEl.click();

    const msgEl = await container.querySelector('.validate-tooltip');

    expect(msgEl.textContent).toBe(expected);
  });
});
