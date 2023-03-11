export function isValidCardNumber(cardNumber) {
  let sum = 0;
  const nums = String(cardNumber).replace(/\D/g, '');

  if (nums.length === 0) {
    return false;
  }

  const parity = nums.length % 2;

  for (let i = 0; i < nums.length; i += 1) {
    const number = parseInt(nums[i], 10);
    if (i % 2 !== parity) {
      sum += number;
    } else if (number > 4) {
      sum += number * 2 - 9;
    } else {
      sum += number * 2;
    }
  }

  return sum % 10 === 0;
}

export function getPaySystem(cardNumber) {
  const numberStr = String(cardNumber).replace(/\D/g, '');

  if (numberStr.match(/^2/)) {
    return 'MIR';
  }

  if (numberStr.match(/^3[068]/)) {
    return 'DinersClub';
  }

  if (numberStr.match(/^3[15]/)) {
    return 'JSB';
  }

  if (numberStr.match(/^3[47]/)) {
    return 'AmericanExpress';
  }

  if (numberStr.match(/^4/)) {
    return 'Visa';
  }

  if (numberStr.match(/^5[0678]/) || numberStr.match(/^6[37]/)) {
    return 'Maestro';
  }

  if (numberStr.match(/^5[1-5]/)) {
    return 'MasterCard';
  }

  if (numberStr.match(/^60/)) {
    return 'Discover';
  }

  if (numberStr.match(/^62/)) {
    return 'UnionPay';
  }

  return null;
}
