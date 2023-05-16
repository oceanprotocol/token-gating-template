import numeral, { RoundingFunction } from 'numeral';
import BigNumber from 'bignumber.js';

// Here we can put the numeral settings
export const numeralFormat = (number: BigNumber, pattern: string, roundingFunction?: RoundingFunction) => {
  if (number.isLessThan(0.000001)) {
    return numeral(0.000001).format(pattern, roundingFunction);
  }
  return numeral(number.toString(10)).format(pattern, roundingFunction);
};

export const generateDigitsPattern = (numberOfDigits: number) => {
  return Array(numberOfDigits).fill(0).join('');
};
