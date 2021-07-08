import { OPERATOR } from '../constants/index.js'

export const toggleSign = currentStr => {
  if (currentStr === '0') {
    return currentStr;
  }
  const currentlyNegative = currentStr[0] === OPERATOR.MINUS;
  if (currentlyNegative) {
    return currentStr.slice(1);
  }

  return OPERATOR.MINUS + currentStr;
};

export const addDecimal = currentStr => {
  const hasDot = currentStr.includes(OPERATOR.DOT);
  if (hasDot) {
    return currentStr;
  }
  return currentStr + OPERATOR.DOT;
};

export const addTwoDecimals = currentStr => {
  // TODO: calculate big number
  const results = Number(currentStr) / 100.0;
  return String(results);
};

export const calucateByValue = (params) => {
  const { originalValue, newInfo, operator } = params;
  let results = 0;

  switch (operator) {
    case OPERATOR.ADD:
      results = originalValue + newInfo;
      break;
    case OPERATOR.MINUS:
      results = originalValue - newInfo;
      break
    case OPERATOR.MULTIPLY:
      results = originalValue * newInfo;
      break;
    case OPERATOR.DIVISION:
      results = originalValue / newInfo;
      break;
    default:
      break;
  }

  return results;
};

export const isNumber = value => {
  const numbersReg = /\d/g;
  return numbersReg.test(Number(value));
};
