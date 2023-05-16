import { RoundingFunction } from 'numeral';
import BigNumber from 'bignumber.js';
import { generateDigitsPattern, numeralFormat } from './numeral';

export const formatNumber = (
  // eslint-disable-next-line default-param-last
  number: BigNumber = new BigNumber(0),
  // eslint-disable-next-line default-param-last
  numberOfDigits = 0,
  roundFunction?: RoundingFunction,
) => {
  const defaultRoundingFunction = number.isGreaterThanOrEqualTo(0) ? Math.floor : Math.ceil;

  return numeralFormat(
    number,
    `0,0.${generateDigitsPattern(numberOfDigits)}`,
    roundFunction || defaultRoundingFunction,
  );
};
