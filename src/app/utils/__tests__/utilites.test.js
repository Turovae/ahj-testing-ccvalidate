import { isValidCardNumber, getPaySystem } from '../utilites';

test('valid card number to be true', () => {
  expect(isValidCardNumber('371449635398431')).toBe(true);
});

test('invalid card number to be false', () => {
  expect(isValidCardNumber('37144963539843123')).toBe(false);
});

test('empty string to be false', () => {
  expect(isValidCardNumber('')).toBe(false);
});

test('valid card number with spaces to be true', () => {
  expect(isValidCardNumber('3714 4963 5398 431')).toBe(true);
});

test.each([
  ['0000', null],
  ['2200 7702 1272 7079', 'MIR'],
  ['3623 5108 1650 44', 'DinersClub'],
  ['3014 2062 8459 08', 'DinersClub'],
  ['3814 2062 8459 08', 'DinersClub'],
  ['3814 2062 8459 08', 'DinersClub'],
  ['3140 1234 5678 9012', 'JCB'],
  ['3540 1234 5678 9012', 'JCB'],
  ['3437 1950 9806 197', 'AmericanExpress'],
  ['3712 5165 3154 765', 'AmericanExpress'],
  ['4485 2877 5763 0107', 'Visa'],
  ['6759 4547 3907 4515', 'Maestro'],
  ['6359 4547 3907 4515', 'Maestro'],
  ['5059 4547 3907 4515', 'Maestro'],
  ['5659 4547 3907 4515', 'Maestro'],
  ['5759 4547 3907 4515', 'Maestro'],
  ['5859 4547 3907 4515', 'Maestro'],
  ['6359 4547 3907 4515', 'Maestro'],
  ['6759 4547 3907 4515', 'Maestro'],
  ['5154 9672 5716 3017', 'MasterCard'],
  ['5225 0781 6020 4842', 'MasterCard'],
  ['5396 3825 9214 8277', 'MasterCard'],
  ['5420 0163 4329 2832', 'MasterCard'],
  ['5533 0364 4937 2456', 'MasterCard'],
  ['6011 3958 8524 5843', 'Discover'],
  ['6223 1588 8888 8888', 'UnionPay'],
])(
  ('testing getPaySystem with card number %s expect %s'),
  (number, expected) => {
    expect(getPaySystem(number)).toBe(expected);
  },
);
